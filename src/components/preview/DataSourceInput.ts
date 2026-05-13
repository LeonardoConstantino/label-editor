import eventBus from '../../core/EventBus';
import { store } from '../../core/Store';
import { UISM } from '../../core/UISoundManager';
import { canvasRenderer } from '../../domain/services/CanvasRenderer';
import { ElementType } from '../../domain/models/elements/BaseElement';
import '../common/AppButton';
import '../common/icon';
import '../common/UINumberScrubber';
import '../common/ui-variable-badge';
import '../common/UiDataGateway';
import { DEFAULTS } from '../../constants/defaults';
import { sharedSheet } from '../../utils/shared-styles';
import { escapeHTML } from '../../utils/sanitize';

interface A4Config {
  marginMM: number;
  gapMM: number;
  columns: number;
  showCropMarks: boolean;
  bleedMM: number;
  zoom: number;
}

/**
 * DataSourceInput: Production Cockpit (Takeover Interface)
 * Implementa o fluxo de geração em lote com Live Preview em A4 e o novo Data Gateway.
 */
export class DataSourceInput extends HTMLElement {
  private dataList: Record<string, any>[] = [];
  private currentFileName = '';
  private dataFields: string[] = []; // Campos vindo do CSV/JSON/Manual
  private labelPlaceholders: string[] = []; // {{vars}} extraídas da Etiqueta

  private a4Config: A4Config = {
    marginMM: 10,
    gapMM: 5,
    columns: 2,
    showCropMarks: true,
    bleedMM: 2,
    zoom: 0.45,
  };

  private _abortController: AbortController | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  connectedCallback(): void {
    this.render();
  }

  disconnectedCallback() {
    this._abortController?.abort();
  }

  /**
   * Varre a etiqueta atual em busca de padrões {{variavel}} nos elementos de texto.
   */
  private refreshLabelPlaceholders(): void {
    const label = store.getState().currentLabel;
    if (!label) return;

    const vars = new Set<string>();
    const regex = /\{\{\s*([\w\s."'-]+)(?::([\w,()\s.:-]+))?(?:\|\|([^}]+))?\s*\}\}/g;

    label.elements.forEach((el) => {
      if (el.type === ElementType.TEXT && (el as any).content) {
        const content = (el as any).content;
        let match;
        while ((match = regex.exec(content)) !== null) {
          vars.add(match[1].trim());
        }
      }
    });
    this.labelPlaceholders = Array.from(vars);
  }

  private render(): void {
    if (!this.shadowRoot) return;

    this.refreshLabelPlaceholders();

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; height: 100%; }
        
        .bleed-preview-box {
          position: absolute;
          inset: calc(var(--bleed) * -1mm);
          border: 1px dashed rgba(99, 102, 241, 0.3);
          pointer-events: none;
          z-index: 1;
        }

        .crop-mark {
          position: absolute;
          width: 4mm;
          height: 4mm;
          border: 0.1mm solid rgba(16, 185, 129, 0.4);
          pointer-events: none;
          z-index: 2;
        }
        .mark-tl { top: -5mm; left: -5mm; border-right: none; border-bottom: none; }
        .mark-tr { top: -5mm; right: -5mm; border-left: none; border-bottom: none; }
        .mark-bl { bottom: -5mm; left: -5mm; border-right: none; border-top: none; }
        .mark-br { bottom: -5mm; right: -5mm; border-left: none; border-top: none; }
      </style>

      <div class="studio-container">
        <div class="studio-main">
          <!-- SIDEBAR: Controls & Upload -->
          <div class="studio-sidebar">
            
            <div class="flex flex-col gap-3">
              <h4 class="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-1">1. Data Source</h4>
              
              <div id="upload-container">
                ${
                  this.currentFileName
                    ? `
                    <div class="w-full p-4 bg-accent-success/10 border border-accent-success/20 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300">
                      <div class="flex items-center gap-3">
                        <ui-icon name="text" style="color: var(--color-accent-success)"></ui-icon>
                        <div class="flex flex-col">
                          <span class="text-xs font-semibold truncate max-w-45">${this.currentFileName}</span>
                          <span class="text-[10px] text-text-muted">${this.dataList.length} records detected</span>
                        </div>
                      </div>
                      <button class="p-1.5 rounded-lg hover:bg-accent-danger/20 text-accent-danger transition-colors cursor-pointer" id="btn-remove-file" title="Remove data">
                        <ui-icon name="trash" size="md"></ui-icon>
                      </button>
                    </div>
                  `
                    : `
                    <ui-data-gateway id="data-gateway"></ui-data-gateway>
                  `
                }
              </div>

              ${
                this.dataFields.length > 0
                  ? `
                <div class="mt-2">
                  <span class="label-prism" style="font-size: 8px">Fields available in file:</span>
                  <div class="flex flex-wrap gap-2 mb-2">
                    ${this.dataFields
                      .map((f) => {
                        const isUsed = this.labelPlaceholders.includes(f);
                        return `<ui-variable-badge state="${isUsed ? 'used' : 'missing'}">
                          ${escapeHTML(f)}
                        </ui-variable-badge>`;
                      })
                      .join('')}
                  </div>
                </div>
              `
                  : ''
              }

              ${
                this.labelPlaceholders.length > 0
                  ? `
                <div class="mt-1">
                  <span class="label-prism" style="font-size: 8px">Variables needed by template:</span>
                  <div class="flex flex-wrap gap-2 mb-2">
                    ${this.labelPlaceholders
                      .map((p) => {
                        const isAvailable = this.dataFields.includes(p);
                        return `<span class="variable-badge ${isAvailable ? '' : 'missing'}">
                        {{${escapeHTML(p)}}} ${isAvailable ? '' : '⚠️'}
                      </span>`;
                      })
                      .join('')}
                  </div>
                </div>
              `
                  : ''
              }
            </div>

            <div class="flex flex-col gap-3">
              <h4 class="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-1">2. A4 Page Layout</h4>
              <div class="grid grid-cols-2 gap-4">
                <ui-number-scrubber id="cfg-cols" label="COL" value="${this.a4Config.columns}" min="1" max="10" step="1.0" unit="Col"></ui-number-scrubber>
                <ui-number-scrubber id="cfg-gap" label="GAP" value="${this.a4Config.gapMM}" min="0" max="50" step="1.0" unit="mm"></ui-number-scrubber>
                <ui-number-scrubber id="cfg-margin" label="MAR" value="${this.a4Config.marginMM}" min="0" max="50" step="1.0" unit="mm"></ui-number-scrubber>
                <ui-number-scrubber id="cfg-bleed" label="BLD" value="${this.a4Config.bleedMM}" min="0" max="10" step="0.5" unit="mm"></ui-number-scrubber>
                
                <div class="flex flex-col justify-center items-center bg-black/20 rounded-lg p-2 border border-border-ui/50 col-span-2">
                   <div class="flex items-center justify-between w-full px-4">
                     <span class="label-prism" style="margin-bottom: 0; font-size: 10px;">Show Crop Marks</span>
                     <input type="checkbox" id="cfg-crop" ${this.a4Config.showCropMarks ? 'checked' : ''}>
                   </div>
                </div>
              </div>
            </div>

            <!-- Data Summary -->
            <div class="data-preview-container" id="data-summary-box">
               ${this.dataList.length > 0 ? '' : '<div class="status-badge">Waiting for data...</div>'}
            </div>
          </div>

          <!-- MAIN PREVIEW: A4 Sheet -->
          <div class="studio-preview">
            <div class="absolute bottom-6 right-10 z-20 flex items-center gap-3 bg-surface-solid/80 backdrop-blur-md p-2 px-4 rounded-2xl border border-border-ui shadow-panel">
              <ui-number-scrubber id="cfg-zoom" label="Zoom" value="${Math.round(this.a4Config.zoom * 100)}" min="10" max="200" step="5.0" unit="%"></ui-number-scrubber>
            </div>

            <div class="a4-viewport">
              <div id="a4-sheet" class="a4-sheet" style="
                --a4-margin: ${this.a4Config.marginMM}mm;
                --a4-gap: ${this.a4Config.gapMM}mm;
                --a4-cols: ${this.a4Config.columns};
                transform: scale(${this.a4Config.zoom});
              ">
                <!-- Labels will be injected here -->
              </div>
            </div>
          </div>
        </div>

        <div class="studio-footer">
          <div class="flex items-center gap-6">
             <div class="status-badge" id="batch-summary">
               ${this.dataList.length > 0 ? `BATCH SIZE: ${this.dataList.length} UNITS` : 'READY TO PROCESS'}
             </div>
             ${this.dataList.length > 0 ? `<div class="status-badge" style="color: var(--color-accent-primary)" id="pages-est">ESTIMATED PAGES: ${Math.ceil(this.dataList.length / 12)}</div>` : ''}
          </div>
          <div style="display: flex; gap: 12px;">
            <app-button id="btn-close" variant="secondary">CLOSE STUDIO</app-button>
            <app-button id="btn-generate" variant="success" style="padding: 0 40px;">
              ⚡ GENERATE PDF
            </app-button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
    if (this.dataList.length > 0) {
      this.updateDataSummary();
    }
    this.updatePreview();
  }

  private attachEvents(): void {
    const shadow = this.shadowRoot!;
    this._abortController = new AbortController();
    const { signal } = this._abortController;

    const gateway = shadow.getElementById('data-gateway');
    const btnRemove = shadow.getElementById('btn-remove-file');

    if (gateway) {
      gateway.addEventListener('data-ready', (e: any) => {
        this.dataList = e.detail.data;
        this.currentFileName = e.detail.sourceName;
        this.dataFields = Object.keys(this.dataList[0]);
        eventBus.emit('notify', { type: 'success', message: `${this.dataList.length} records detected.` });
        this.render();
      }, { signal });

      gateway.addEventListener('data-error', (e: any) => {
        eventBus.emit('notify', { type: 'error', message: e.detail.message });
      }, { signal });
    }

    if (btnRemove) {
      btnRemove.addEventListener('click', () => {
        this.dataList = [];
        this.dataFields = [];
        this.currentFileName = '';
        UISM.play(UISM.enumPresets.DELETE);
        this.render();
      }, { signal });
    }

    this.setupConfigListeners(shadow, signal);

    shadow.getElementById('cfg-crop')?.addEventListener('change', (e: any) => {
      this.a4Config.showCropMarks = e.target.checked;
      UISM.play(UISM.enumPresets.TAP);
      this.updatePreview();
    }, { signal });

    shadow.getElementById('btn-close')?.addEventListener('click', () => {
      const modal = document.getElementById('batch-modal') as any;
      if (modal) modal.removeAttribute('open');
    }, { signal });

    shadow
      .getElementById('btn-generate')
      ?.addEventListener('click', async () => {
        if (this.dataList.length === 0) {
          eventBus.emit('notify', { type: 'warning', message: 'Input or upload data first.' });
          return;
        }

        const missing = this.labelPlaceholders.filter((p) => !this.dataFields.includes(p));
        if (missing.length > 0) {
          eventBus.emit('notify', {
            type: 'warning',
            message: `Warning: Template needs {{${missing.join('}}, {{')}}}, but some aren't in your data.`,
          });
        }

        const { pdfGenerator } = await import('../../domain/services/PDFGenerator');
        const label = store.getState().currentLabel;
        if (label) {
          UISM.play(UISM.enumPresets.SUCCESS);
          await pdfGenerator.generateLotePDF(label, this.dataList, this.a4Config);
        }
      }, { signal });
  }

  private setupConfigListeners(shadow: ShadowRoot, signal: AbortSignal): void {
    const configHandlers: Record<string, (value: any) => void> = {
      'cfg-cols': (value) => {
        this.a4Config.columns = value || 1;
        this.updatePreview();
      },
      'cfg-gap': (value) => {
        this.a4Config.gapMM = value || 0;
        this.updatePreview();
      },
      'cfg-margin': (value) => {
        this.a4Config.marginMM = value || 0;
        this.updatePreview();
      },
      'cfg-bleed': (value) => {
        this.a4Config.bleedMM = value || 0;
        this.updatePreview();
      },
      'cfg-zoom': (value) => {
        this.a4Config.zoom = (value || 45) / 100;
        const sheet = shadow.getElementById('a4-sheet')!;
        if (sheet) sheet.style.transform = `scale(${this.a4Config.zoom})`;
      },
    };

    Object.entries(configHandlers).forEach(([id, handler]) => {
      const element = shadow.getElementById(id);
      if (!element) return;
      const listener = (e: any) => handler(e.detail.value);
      element.addEventListener('change', listener, { signal });
      element.addEventListener('input', listener, { signal });
    });
  }

  private updateDataSummary(): void {
    const box = this.shadowRoot!.getElementById('data-summary-box')!;
    if (!this.dataList.length) return;

    const headers = Object.keys(this.dataList[0]);
    const displayHeaders = headers.slice(0, 4);

    box.innerHTML = `
      <div class="flex flex-col gap-3 animate-in fade-in duration-500">
        <h4 class="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-1">Data Preview (First 3)</h4>
        <div class="overflow-x-auto border border-border-ui/30 rounded-lg">
          <table class="data-mini-table">
            <thead>
              <tr>${displayHeaders.map((h) => `<th>${escapeHTML(h)}</th>`).join('')}${headers.length > 4 ? '<th>...</th>' : ''}</tr>
            </thead>
            <tbody>
              ${this.dataList
                .slice(0, 3)
                .map(
                  (row) => `
                <tr>
                  ${displayHeaders.map((h) => `<td>${escapeHTML(String(row[h]))}</td>`).join('')}
                  ${headers.length > 4 ? '<td class="text-text-muted">...</td>' : ''}
                </tr>
              `,
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  private updatePreview(): void {
    const shadow = this.shadowRoot!;
    const sheet = shadow.getElementById('a4-sheet')!;
    const label = store.getState().currentLabel;

    if (!sheet) return;

    sheet.style.setProperty('--a4-margin', `${this.a4Config.marginMM}mm`);
    sheet.style.setProperty('--a4-gap', `${this.a4Config.gapMM}mm`);
    sheet.style.setProperty('--a4-cols', `${this.a4Config.columns}`);

    if (!label || this.dataList.length === 0) {
      sheet.innerHTML = `
        <div style="grid-column: 1/-1; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ccc; font-family: var(--font-mono); opacity: 0.2; text-transform: uppercase;">
          <ui-icon name="image" style="--icon-size: 80px; margin-bottom: 20px;"></ui-icon>
          <span style="font-size: 24px; letter-spacing: 0.5em;">Cockpit Preview</span>
        </div>
      `;
      return;
    }

    sheet.innerHTML = '';

    const PAGE_WIDTH = 210;
    const PAGE_HEIGHT = 297;
    const availableWidth = PAGE_WIDTH - this.a4Config.marginMM * 2;
    const availableHeight = PAGE_HEIGHT - this.a4Config.marginMM * 2;

    const colWidth = label.config.widthMM;
    const rowHeight = label.config.heightMM;

    const maxCols = Math.floor((availableWidth + this.a4Config.gapMM) / (colWidth + this.a4Config.gapMM));
    const maxRows = Math.floor((availableHeight + this.a4Config.gapMM) / (rowHeight + this.a4Config.gapMM));

    const effectiveCols = Math.min(this.a4Config.columns, maxCols || 1);
    const labelsPerPage = effectiveCols * (maxRows || 1);

    const estPages = Math.ceil(this.dataList.length / labelsPerPage);
    const estEl = shadow.getElementById('pages-est');
    if (estEl) estEl.textContent = `ESTIMATED PAGES: ${estPages}`;

    const toRender = this.dataList.slice(0, labelsPerPage);

    toRender.forEach((data) => {
      const container = document.createElement('div');
      container.className = 'label-artboard';
      container.style.width = `${label.config.widthMM}mm`;
      container.style.height = `${label.config.heightMM}mm`;
      container.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      container.style.border = '1px solid rgba(0,0,0,0.05)';
      container.style.position = 'relative';
      container.style.overflow = 'visible';

      if (this.a4Config.bleedMM > 0) {
        const bleedBox = document.createElement('div');
        bleedBox.className = 'bleed-preview-box';
        bleedBox.style.setProperty('--bleed', this.a4Config.bleedMM.toString());
        container.appendChild(bleedBox);
      }

      if (this.a4Config.showCropMarks) {
        this.addVisualCropMarks(container);
      }

      const canvas = document.createElement('canvas');
      container.appendChild(canvas);
      sheet.appendChild(container);

      this.renderLabelThumb(canvas, label, data);
    });
  }

  private addVisualCropMarks(container: HTMLElement): void {
    const positions = ['tl', 'tr', 'bl', 'br'];
    positions.forEach(pos => {
      const mark = document.createElement('div');
      mark.className = `crop-mark mark-${pos}`;
      container.appendChild(mark);
    });
  }

  private renderLabelThumb(canvas: HTMLCanvasElement, label: any, data: any): void {
    const ctx = canvas.getContext('2d', { alpha: true })!;
    const currentDpi = label.config.dpi || DEFAULTS.CANVAS.dpi;

    const renderScale = 4;
    canvas.width = label.config.widthMM * renderScale;
    canvas.height = label.config.heightMM * renderScale;

    canvas.style.width = '100%';
    canvas.style.height = '100%';

    ctx.fillStyle = label.config.backgroundColor || DEFAULTS.CANVAS.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    label.elements.forEach((el: any) => {
      canvasRenderer.render(el, {
        ctx,
        scale: renderScale,
        dpi: currentDpi,
        data,
      });
    });
  }
}

customElements.define('data-source-input', DataSourceInput);
