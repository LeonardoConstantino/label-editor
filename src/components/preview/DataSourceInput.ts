import eventBus from '../../core/EventBus';
import { store } from '../../core/Store';
import { UISM } from '../../core/UISoundManager';
import { canvasRenderer } from '../../domain/services/CanvasRenderer';
import { dataSourceParser } from '../../domain/services/DataSourceParser';
import '../common/AppButton';

interface A4Config {
  marginMM: number;
  gapMM: number;
  columns: number;
  showCropMarks: boolean;
}

/**
 * DataSourceInput: Batch Generation Studio (Takeover Interface)
 * Implementa o fluxo de geração em lote com Live Preview em A4 e Upload UX.
 */
export class DataSourceInput extends HTMLElement {
  private dataList: Record<string, any>[] = [];
  private a4Config: A4Config = {
    marginMM: 10,
    gapMM: 5,
    columns: 2,
    showCropMarks: true
  };
  private isDragging = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();
  }

  private render(): void {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <style>
        @import "/src/styles/main.css";
        
        :host { --a4-scale: 0.45; }

        .config-section {
          @apply flex flex-col gap-4 p-4 bg-black/10 rounded-xl border border-border-ui/50;
        }

        .config-grid {
          @apply grid grid-cols-2 gap-3;
        }

        .a4-viewport {
          @apply w-full flex justify-center items-start py-10 bg-canvas/50 rounded-2xl border border-border-ui/30 overflow-auto;
          height: 100%;
        }

        .data-preview-container {
          @apply mt-auto pt-4 border-t border-border-ui/30;
        }
      </style>

      <div class="studio-container">
        <div class="studio-main">
          <!-- SIDEBAR: Controls & Upload -->
          <div class="studio-sidebar">
            <div>
              <h4 class="label-prism">Batch Setup</h4>
              <p style="font-size: 11px; color: var(--color-text-muted); margin-bottom: 12px;">
                Upload CSV/JSON or use the quick input.
              </p>
            </div>

            <!-- Upload Zone -->
            <div id="drop-zone" class="drop-zone">
              <ui-icon name="upload-cloud"></ui-icon>
              <div style="text-align: center">
                <span style="display: block; font-size: 12px; font-weight: 600;">Drop file here</span>
                <span style="font-size: 10px; color: var(--color-text-muted);">CSV or JSON supported</span>
              </div>
              <input type="file" id="file-input" accept=".csv,.json" style="display: none;">
            </div>

            <!-- A4 Layout Config -->
            <div class="config-section">
              <span class="label-prism">A4 Layout</span>
              <div class="config-grid">
                <div>
                  <label class="label-prism">Columns</label>
                  <input type="number" id="cfg-cols" class="input-prism" value="${this.a4Config.columns}" min="1" max="10">
                </div>
                <div>
                  <label class="label-prism">Gap (mm)</label>
                  <input type="number" id="cfg-gap" class="input-prism" value="${this.a4Config.gapMM}" min="0" max="50">
                </div>
                <div>
                  <label class="label-prism">Margin (mm)</label>
                  <input type="number" id="cfg-margin" class="input-prism" value="${this.a4Config.marginMM}" min="0" max="50">
                </div>
                <div style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center; padding-bottom: 8px;">
                   <label class="label-prism" style="margin-bottom: 8px">Crop Marks</label>
                   <input type="checkbox" id="cfg-crop" ${this.a4Config.showCropMarks ? 'checked' : ''}>
                </div>
              </div>
            </div>

            <!-- Data Summary -->
            <div class="data-preview-container" id="data-summary-box">
               <div class="status-badge">No data loaded</div>
            </div>
          </div>

          <!-- MAIN PREVIEW: A4 Sheet -->
          <div class="studio-preview">
            <div class="a4-viewport">
              <div id="a4-sheet" class="a4-sheet" style="
                --a4-margin: ${this.a4Config.marginMM}mm;
                --a4-gap: ${this.a4Config.gapMM}mm;
                --a4-cols: ${this.a4Config.columns};
                transform: scale(var(--a4-scale));
              ">
                <!-- Labels will be injected here -->
              </div>
            </div>
          </div>
        </div>

        <div class="studio-footer">
          <div class="status-badge" id="batch-summary">READY TO PROCESS</div>
          <div style="display: flex; gap: 12px;">
            <app-button id="btn-close" variant="secondary">CANCEL</app-button>
            <app-button id="btn-generate" variant="success" style="padding: 0 32px;">
              ⚡ GENERATE PDF
            </app-button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
    this.updatePreview();
  }

  private attachEvents(): void {
    const shadow = this.shadowRoot!;
    const dropZone = shadow.getElementById('drop-zone')!;
    const fileInput = shadow.getElementById('file-input') as HTMLInputElement;

    // Drag & Drop
    dropZone.addEventListener('click', () => fileInput.click());
    
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!this.isDragging) {
        this.isDragging = true;
        dropZone.classList.add('active');
      }
    });

    dropZone.addEventListener('dragleave', () => {
      this.isDragging = false;
      dropZone.classList.remove('active');
    });

    dropZone.addEventListener('drop', async (e) => {
      e.preventDefault();
      this.isDragging = false;
      dropZone.classList.remove('active');
      
      const file = e.dataTransfer?.files[0];
      if (file) this.handleFile(file);
    });

    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];
      if (file) this.handleFile(file);
    });

    // Config Inputs
    shadow.getElementById('cfg-cols')?.addEventListener('input', (e: any) => {
      this.a4Config.columns = e.detail.value || 1;
      this.updatePreview();
    });

    shadow.getElementById('cfg-gap')?.addEventListener('input', (e: any) => {
      this.a4Config.gapMM = e.detail.value || 0;
      this.updatePreview();
    });

    shadow.getElementById('cfg-margin')?.addEventListener('input', (e: any) => {
      this.a4Config.marginMM = e.detail.value || 0;
      this.updatePreview();
    });

    shadow.getElementById('cfg-crop')?.addEventListener('change', (e: any) => {
      this.a4Config.showCropMarks = e.target.checked;
      this.updatePreview();
    });

    // Action Buttons
    shadow.getElementById('btn-close')?.addEventListener('click', () => {
      const modal = document.getElementById('batch-modal') as any;
      if (modal) modal.removeAttribute('open');
    });

    shadow.getElementById('btn-generate')?.addEventListener('click', async () => {
      if (this.dataList.length === 0) {
        eventBus.emit('notify', { type: 'warning', message: 'Please upload a data file first.' });
        return;
      }
      
      const { pdfGenerator } = await import('../../domain/services/PDFGenerator');
      const label = store.getState().currentLabel;
      if (label) {
        UISM.play(UISM.enumPresets.SUCCESS);
        await pdfGenerator.generateLotePDF(label, this.dataList, this.a4Config);
      }
    });
  }

  private async handleFile(file: File): Promise<void> {
    try {
      let data: Record<string, any>[] = [];
      if (file.name.endsWith('.csv')) {
        data = await dataSourceParser.parseCSV(file);
      } else if (file.name.endsWith('.json')) {
        data = await dataSourceParser.parseJSON(file);
      } else {
        throw new Error('Unsupported file format');
      }

      this.dataList = data;
      UISM.play(UISM.enumPresets.NOTIFY);
      this.updateDataSummary();
      this.updatePreview();
      
      eventBus.emit('notify', { 
        type: 'success', 
        message: `Successfully loaded ${data.length} records.` 
      });
    } catch (error: any) {
      console.error(error);
      UISM.play(UISM.enumPresets.WARNING);
      eventBus.emit('notify', { 
        type: 'error', 
        message: 'Failed to parse file: ' + error.message 
      });
    }
  }

  private updateDataSummary(): void {
    const box = this.shadowRoot!.getElementById('data-summary-box')!;
    const summary = this.shadowRoot!.getElementById('batch-summary')!;

    if (this.dataList.length === 0) {
      box.innerHTML = '<div class="status-badge">No data loaded</div>';
      summary.textContent = 'READY TO PROCESS';
      return;
    }

    const headers = Object.keys(this.dataList[0]);
    const rows = this.dataList.slice(0, 3).map(row => `
      <tr>
        ${headers.map(h => `<td>${row[h]}</td>`).join('')}
      </tr>
    `).join('');

    box.innerHTML = `
      <span class="label-prism">${this.dataList.length} Records Detected</span>
      <table class="data-mini-table">
        <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
      ${this.dataList.length > 3 ? `<p style="font-size: 9px; color: var(--color-text-muted); margin-top: 8px;">+ ${this.dataList.length - 3} more...</p>` : ''}
    `;

    summary.textContent = `BATCH SIZE: ${this.dataList.length} UNITS`;
  }

  private updatePreview(): void {
    const sheet = this.shadowRoot!.getElementById('a4-sheet')!;
    const label = store.getState().currentLabel;

    sheet.style.setProperty('--a4-margin', `${this.a4Config.marginMM}mm`);
    sheet.style.setProperty('--a4-gap', `${this.a4Config.gapMM}mm`);
    sheet.style.setProperty('--a4-cols', `${this.a4Config.columns}`);

    if (!label || this.dataList.length === 0) {
      sheet.innerHTML = '<div style="grid-column: 1/-1; height: 100%; display: flex; align-items: center; justify-content: center; color: #ccc; font-family: var(--font-mono); opacity: 0.3; text-transform: uppercase;">A4 Preview Area</div>';
      return;
    }

    sheet.innerHTML = '';
    
    // Calculamos quantas etiquetas cabem em uma folha A4 (simplificado para o preview)
    const maxOnSheet = 50; 
    const toRender = this.dataList.slice(0, maxOnSheet);

    toRender.forEach((data, i) => {
      const container = document.createElement('div');
      container.className = 'label-artboard';
      container.style.width = `${label.config.widthMM}mm`;
      container.style.height = `${label.config.heightMM}mm`;
      container.style.boxShadow = 'none';
      container.style.border = '1px solid #eee';

      const canvas = document.createElement('canvas');
      container.appendChild(canvas);
      sheet.appendChild(container);

      this.renderLabelThumb(canvas, label, data);
    });
  }

  private renderLabelThumb(canvas: HTMLCanvasElement, label: any, data: any): void {
    const ctx = canvas.getContext('2d')!;
    const scale = 1.5; 
    
    canvas.width = label.config.widthMM * scale;
    canvas.height = label.config.heightMM * scale;
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    label.elements.forEach((el: any) => {
      canvasRenderer.render(el, { ctx, scale, data });
    });
  }
}

customElements.define('data-source-input', DataSourceInput);
