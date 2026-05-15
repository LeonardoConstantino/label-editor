import { store, AppState } from '../../core/Store';
import { UISM } from '../../core/UISoundManager';
import { canvasRenderer } from '../../domain/services/CanvasRenderer';
import { PaperFormat, pdfGenerator } from '../../domain/services/PDFGenerator';
import '../common/AppButton';
import '../common/icon';
import '../common/UINumberScrubber';
import '../common/ui-variable-badge';
import '../common/UiDataGateway';
import '../common/AppSelect';
import { sharedSheet } from '../../utils/shared-styles';

/**
 * DataSourceInput: Production Cockpit (Fiel e Robusto)
 * Refatorado para Sincronização Granular e integração com Sidebar.
 */
export class DataSourceInput extends HTMLElement {
  private _abortController: AbortController | null = null;
  private _isProcessing = false;
  private _progress = 0;
  private _progressMessage = '';

  private readonly PAPER_SIZES: Record<PaperFormat, { w: number, h: number }> = {
    'a4': { w: 210, h: 297 },
    'a3': { w: 297, h: 420 },
    'letter': { w: 215.9, h: 279.4 }
  };

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  connectedCallback(): void {
    this.renderSkeleton();
    this.setupListeners();
    this.syncAll();
  }

  disconnectedCallback() {
    this._abortController?.abort();
  }

  private async setupListeners() {
    this._abortController = new AbortController();
    const { signal } = this._abortController;
    const root = this.shadowRoot!;
    
    const { default: eventBus } = await import('../../core/EventBus');

    // Reage a mudanças de estado sem reconstruir o DOM inteiro
    eventBus.on('state:change', (_state: AppState) => {
      this.syncAll();
    }, { signal });

    // Gateway local
    root.addEventListener('data-ready', (e: any) => {
      const { data, sourceName } = e.detail;
      eventBus.emit('production:data:update', { data, sourceName });
    }, { signal });

    // Botão Fechar
    root.getElementById('btn-close')?.addEventListener('click', () => {
      const modal = document.getElementById('batch-modal') as any;
      if (modal) modal.removeAttribute('open');
    }, { signal });

    // Escuta progresso do Worker
    eventBus.on('production:progress', (data) => {
      this._isProcessing = true;
      this._progress = data.progress;
      this._progressMessage = data.message;
      this.syncAll();
    }, { signal });

    // Botão Gerar
    root.getElementById('btn-generate')?.addEventListener('click', async () => {
      const state = store.getState();
      if (state.productionData.length === 0) return;
      
      const label = state.currentLabel;
      if (label) {
        this._isProcessing = true;
        this._progress = 0;
        this._progressMessage = 'Starting Worker...';
        this.syncAll();

        UISM.play(UISM.enumPresets.SUCCESS);
        
        try {
          await pdfGenerator.generateLotePDFWorker(label, state.productionData, state.printConfig);
        } catch (err: any) {
          eventBus.emit('notify', { type: 'error', message: 'PDF Error: ' + err.message });
        } finally {
          this._isProcessing = false;
          this.syncAll();
        }
      }
    }, { signal });

    this.setupConfigListeners(root, signal);
  }

  private async setupConfigListeners(root: ShadowRoot, signal: AbortSignal) {
    const { default: eventBus } = await import('../../core/EventBus');

    const handlers: Record<string, (v: any) => void> = {
      'cfg-cols': (v) => eventBus.emit('production:config:update', { columns: v }),
      'cfg-gap': (v) => eventBus.emit('production:config:update', { gapMM: v }),
      'cfg-margin': (v) => eventBus.emit('production:config:update', { marginMM: v }),
      'cfg-bleed': (v) => eventBus.emit('production:config:update', { bleedMM: v }),
      'cfg-format': (v) => eventBus.emit('production:config:update', { paperFormat: v }),
      'cfg-orientation': (v) => eventBus.emit('production:config:update', { orientation: v }),
      'cfg-zoom': (v) => eventBus.emit('production:config:update', { zoom: v / 100 }),
      'cfg-quality': (v) => {
        if (v === 'draft') eventBus.emit('production:config:update', { exportFormat: 'jpeg', exportQuality: 0.5 });
        else if (v === 'standard') eventBus.emit('production:config:update', { exportFormat: 'jpeg', exportQuality: 0.8 });
        else if (v === 'high') eventBus.emit('production:config:update', { exportFormat: 'png', exportQuality: 1.0 });
      }
    };

    const changeHandler = (e: any) => {
      const target = e.target as HTMLElement;
      const id = target.id;
      const handler = handlers[id];
      if (handler) {
        const val = e.detail?.value !== undefined ? e.detail.value : (target as any).value;
        handler(val);
      }
    };

    root.addEventListener('change', changeHandler, { signal });
    root.addEventListener('input', changeHandler, { signal });
    root.addEventListener('app-select', changeHandler, { signal });

    root.getElementById('cfg-crop')?.addEventListener('change', (e: any) => {
      eventBus.emit('production:config:update', { showCropMarks: e.target.checked });
      UISM.play(UISM.enumPresets.TAP);
    }, { signal });
  }

  private syncAll() {
    const state = store.getState();
    const shadow = this.shadowRoot!;
    if (!shadow) return;

    // Se estiver processando, mostra overlay de progresso
    const overlay = shadow.getElementById('processing-overlay');
    if (overlay) {
      overlay.style.display = this._isProcessing ? 'flex' : 'none';
      const bar = shadow.getElementById('progress-bar-fill');
      const msg = shadow.getElementById('progress-msg');
      if (bar) bar.style.width = `${this._progress}%`;
      if (msg) msg.textContent = this._progressMessage;
    }

    const { productionData, productionSourceName, printConfig } = state;

    // 1. Sync Data Source Card
    const uploadContainer = shadow.getElementById('upload-container')!;
    const hasData = productionData.length > 0;

    if (hasData) {
      if (!uploadContainer.querySelector('.active-connection')) {
        uploadContainer.innerHTML = `
          <div class="active-connection w-full p-4 bg-accent-success/10 border border-accent-success/20 rounded-xl flex items-center justify-between animate-in fade-in duration-300">
            <div class="flex items-center gap-3">
              <ui-icon name="database" style="color: var(--color-accent-success)"></ui-icon>
              <div class="flex flex-col">
                <span class="text-xs font-semibold truncate max-w-45" id="source-name-display"></span>
                <span class="text-[10px] text-text-muted" id="records-count-display"></span>
              </div>
            </div>
          </div>
        `;
      }
      const nameEl = shadow.getElementById('source-name-display');
      const countEl = shadow.getElementById('records-count-display');
      if (nameEl) nameEl.textContent = productionSourceName;
      if (countEl) countEl.textContent = `${productionData.length} records connected`;
    } else {
      if (!uploadContainer.querySelector('ui-data-gateway')) {
        uploadContainer.innerHTML = `<ui-data-gateway id="data-gateway" style="height: 180px;"></ui-data-gateway>`;
      }
    }

    // 2. Sync Inputs (Focus Protection)
    const syncInput = (id: string, val: any, isCheckbox = false) => {
      const el = shadow.getElementById(id) as any;
      if (!el) return;
      const isFocused = shadow.activeElement === el || el.shadowRoot?.activeElement;
      if (isFocused && !isCheckbox) return;

      if (isCheckbox) {
        if (el.checked !== val) el.checked = val;
      } else {
        if (el.value != val) el.value = val;
      }
    };

    syncInput('cfg-cols', printConfig.columns);
    syncInput('cfg-gap', printConfig.gapMM);
    syncInput('cfg-margin', printConfig.marginMM);
    syncInput('cfg-bleed', printConfig.bleedMM);
    syncInput('cfg-format', printConfig.paperFormat);
    syncInput('cfg-orientation', printConfig.orientation);
    syncInput('cfg-zoom', Math.round(printConfig.zoom * 100));
    syncInput('cfg-crop', printConfig.showCropMarks, true);

    // Sincroniza o preset de qualidade
    const qualitySelect = shadow.getElementById('cfg-quality') as any;
    if (qualitySelect) {
      let qVal = 'standard';
      if (printConfig.exportFormat === 'png') qVal = 'high';
      else if (printConfig.exportQuality <= 0.5) qVal = 'draft';
      if (qualitySelect.value !== qVal) qualitySelect.value = qVal;
    }

    // 3. Sync Footer
    const batchSummary = shadow.getElementById('batch-summary')!;
    if (batchSummary) batchSummary.textContent = hasData ? `ACTIVE BATCH: ${productionData.length} UNITS` : 'AWAITING DATA SOURCE';
    
    const btnGen = shadow.getElementById('btn-generate') as any;
    if (btnGen) btnGen.disabled = !hasData;

    // 4. Trigger Canvas Update
    this.updatePreview();
  }

  private updatePreview(): void {
    const shadow = this.shadowRoot!;
    const sheet = shadow.getElementById('a4-sheet')!;
    const infoLabel = shadow.getElementById('sheet-info-label');
    const state = store.getState();
    const label = state.currentLabel;
    const { printConfig, productionData } = state;

    if (!sheet || !label) return;

    const paper = this.PAPER_SIZES[printConfig.paperFormat];
    const isPortrait = printConfig.orientation === 'portrait';
    const pW = isPortrait ? paper.w : paper.h;
    const pH = isPortrait ? paper.h : paper.w;

    if (infoLabel) {
      infoLabel.textContent = `${printConfig.paperFormat.toUpperCase()} ${printConfig.orientation.toUpperCase()} (${pW}x${pH}mm)`;
    }

    sheet.style.width = `${pW}mm`;
    sheet.style.height = `${pH}mm`;
    sheet.style.padding = `${printConfig.marginMM}mm`;
    sheet.style.display = 'grid';
    sheet.style.gridTemplateColumns = `repeat(${printConfig.columns}, ${label.config.widthMM}mm)`;
    sheet.style.gap = `${printConfig.gapMM}mm`;
    sheet.style.transform = `scale(${printConfig.zoom})`;

    if (productionData.length === 0) {
      sheet.innerHTML = `<div style="grid-column: 1/-1; height: 100%; display: flex; align-items: center; justify-content: center; color: #ccc; opacity: 0.5; font-size: 24px; font-family: var(--font-mono); letter-spacing: 0.5em;">WIREBOARD PREVIEW</div>`;
      const pagesEst = shadow.getElementById('pages-est');
      if (pagesEst) pagesEst.textContent = '';
      return;
    }

    sheet.innerHTML = '';
    const availableH = pH - (printConfig.marginMM * 2);
    const rows = Math.floor((availableH + printConfig.gapMM) / (label.config.heightMM + printConfig.gapMM));
    const labelsPerPage = printConfig.columns * (rows || 1);

    const estPages = Math.ceil(productionData.length / labelsPerPage);
    const estEl = shadow.getElementById('pages-est');
    if (estEl) estEl.textContent = `ESTIMATED PAGES: ${estPages}`;

    const toRender = productionData.slice(0, labelsPerPage);

    toRender.forEach((data) => {
      const container = document.createElement('div');
      container.className = 'label-artboard';
      container.style.width = `${label.config.widthMM}mm`;
      container.style.height = `${label.config.heightMM}mm`;
      container.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
      container.style.background = label.config.backgroundColor || 'white';
      container.style.position = 'relative';
      container.style.overflow = 'visible'; // Essencial para mostrar sangria e marcas fora da borda

      if (printConfig.bleedMM > 0) {
        const bleedBox = document.createElement('div');
        bleedBox.className = 'bleed-preview-box';
        bleedBox.style.setProperty('--bleed', printConfig.bleedMM.toString());
        container.appendChild(bleedBox);
      }
      
      if (printConfig.showCropMarks) {
        this.addVisualCropMarks(container);
      }

      const canvas = document.createElement('canvas');
      canvas.style.position = 'relative';
      canvas.style.zIndex = '2';
      container.appendChild(canvas);
      sheet.appendChild(container);

      this.renderLabelThumb(canvas, label, data);
    });
  }

  private addVisualCropMarks(container: HTMLElement): void {
    ['tl', 'tr', 'bl', 'br'].forEach(pos => {
      const mark = document.createElement('div');
      mark.className = `crop-mark mark-${pos}`;
      container.appendChild(mark);
    });
  }

  private renderLabelThumb(canvas: HTMLCanvasElement, label: any, data: any): void {
    const ctx = canvas.getContext('2d', { alpha: true })!;
    const dpi = 150;
    const renderScale = (dpi / 25.4);
    
    canvas.width = label.config.widthMM * renderScale;
    canvas.height = label.config.heightMM * renderScale;
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    label.elements.forEach((el: any) => {
      canvasRenderer.render(el, { ctx, scale: renderScale, dpi, data });
    });
  }

  private renderSkeleton(): void {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; height: 100%; position: relative; }

        /* Overlay de Processamento (Task 24) */
        .processing-overlay {
          position: absolute; inset: 0; background: rgba(10, 12, 16, 0.95);
          display: none; flex-direction: column; align-items: center; justify-content: center;
          z-index: 1000; backdrop-filter: blur(12px);
        }
        .progress-container { width: 300px; height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px; overflow: hidden; margin-bottom: 12px; }
        .progress-bar-fill { height: 100%; background: var(--color-accent-primary); width: 0%; transition: width 0.3s; box-shadow: 0 0 10px var(--color-accent-primary); }
        .progress-msg { font-family: var(--font-mono); font-size: 10px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.1em; }
        
        .bleed-preview-box {
          position: absolute;
          inset: calc(var(--bleed) * -1mm);
          border: 1px dashed rgba(244, 63, 94, 0.4);
          pointer-events: none;
          z-index: 1;
        }

        .crop-mark {
          position: absolute;
          width: 4mm; height: 4mm;
          border: 0.1mm solid rgba(16, 185, 129, 0.4);
          pointer-events: none; z-index: 2;
        }
        .mark-tl { top: -5mm; left: -5mm; border-right: none; border-bottom: none; }
        .mark-tr { top: -5mm; right: -5mm; border-left: none; border-bottom: none; }
        .mark-bl { bottom: -5mm; left: -5mm; border-right: none; border-top: none; }
        .mark-br { bottom: -5mm; right: -5mm; border-left: none; border-top: none; }

        .sheet-info-badge {
          position: absolute; top: -30px; left: 0;
          font-family: var(--font-mono); font-size: 10px; color: var(--color-text-muted);
          text-transform: uppercase; letter-spacing: 0.1em;
        }
      </style>

      <div class="studio-container">
        <!-- OVERLAY DE PROCESSAMENTO -->
        <div class="processing-overlay" id="processing-overlay">
          <ui-icon name="lightning" style="--icon-size: 40px; margin-bottom: 20px;" class="text-accent-primary animate-pulse"></ui-icon>
          <div class="progress-container">
            <div class="progress-bar-fill" id="progress-bar-fill"></div>
          </div>
          <div class="progress-msg" id="progress-msg">Initializing Engine...</div>
        </div>

        <div class="studio-main">
          <div class="studio-sidebar">
            
            <div class="flex flex-col gap-3">
              <h4 class="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-1">1. Data Connection</h4>
              <div id="upload-container"></div>
            </div>

            <div class="flex flex-col gap-3">
              <h4 class="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-1">2. Sheet Configuration</h4>
              <div class="grid grid-cols-2 gap-4">
                <app-select id="cfg-format" data-prop="paperFormat" label="Paper Size" class="col-span-2"></app-select>
                <app-select id="cfg-orientation" data-prop="orientation" label="Layout Direction" class="col-span-2"></app-select>
                <ui-number-scrubber id="cfg-cols" label="COL" min="1" max="20" step="1" unit="Col"></ui-number-scrubber>
                <ui-number-scrubber id="cfg-gap" label="GAP" min="0" max="50" step="1" unit="mm"></ui-number-scrubber>
                <ui-number-scrubber id="cfg-margin" label="MAR" min="0" max="100" step="1" unit="mm"></ui-number-scrubber>
                <ui-number-scrubber id="cfg-bleed" label="BLD" min="0" max="10" step="0.5" unit="mm"></ui-number-scrubber>
                <div class="flex items-center justify-between bg-black/20 rounded-lg p-2 px-4 border border-border-ui/50 col-span-2">
                   <span class="label-prism" style="margin:0; font-size: 10px;">Render Crop Marks</span>
                   <input type="checkbox" id="cfg-crop">
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-3">
              <h4 class="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-1">3. Output Quality</h4>
              <div class="control-group">
                <app-select id="cfg-quality" label="Export Preset"></app-select>
              </div>
            </div>
          </div>

          <div class="studio-preview">
            <div class="absolute bottom-6 right-10 z-20 flex items-center gap-3 bg-surface-solid/80 backdrop-blur-md p-2 px-4 rounded-2xl border border-border-ui shadow-panel">
              <ui-number-scrubber id="cfg-zoom" label="zoom" value="1" min="10" max="200" step="5" unit="%"></ui-number-scrubber>
            </div>

            <div class="a4-viewport">
              <div class="sheet-info-badge" id="sheet-info-label">...</div>
              <div id="a4-sheet" class="a4-sheet"></div>
            </div>
          </div>
        </div>

        <div class="studio-footer">
          <div class="flex items-center gap-6">
             <div class="status-badge" id="batch-summary">...</div>
             <div class="status-badge" style="color: var(--color-accent-primary)" id="pages-est"></div>
          </div>
          <div style="display: flex; gap: 12px;">
            <app-button id="btn-close" variant="secondary">RETURN TO EDITOR</app-button>
            <app-button id="btn-generate" variant="success" style="padding: 0 40px;">
              ⚡ GENERATE FINAL PDF
            </app-button>
          </div>
        </div>
      </div>
    `;

    // Inicializa as opções dos selects (uma vez apenas)
    const formatSelect = this.shadowRoot.getElementById('cfg-format') as any;
    if (formatSelect) {
      formatSelect.options = [
        { value: 'a4', label: 'ISO A4', sublabel: '210 x 297 mm' },
        { value: 'a3', label: 'ISO A3', sublabel: '297 x 420 mm' },
        { value: 'letter', label: 'US Letter', sublabel: '215.9 x 279.4 mm' }
      ];
    }

    const orientSelect = this.shadowRoot.getElementById('cfg-orientation') as any;
    if (orientSelect) {
      orientSelect.options = [
        { value: 'portrait', label: 'Portrait', sublabel: 'Vertical' },
        { value: 'landscape', label: 'Landscape', sublabel: 'Horizontal' }
      ];
    }

    const qualitySelect = this.shadowRoot.getElementById('cfg-quality') as any;
    if (qualitySelect) {
      qualitySelect.options = [
        { value: 'draft', label: 'Draft', sublabel: 'Fast / Small (JPEG 0.5)' },
        { value: 'standard', label: 'Standard', sublabel: 'Balanced (JPEG 0.8)' },
        { value: 'high', label: 'High-Res', sublabel: 'Print Ready (PNG Lossless)' }
      ];
    }
  }
}

customElements.define('data-source-input', DataSourceInput);
