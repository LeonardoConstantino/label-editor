import eventBus from '../../core/EventBus';
import { store } from '../../core/Store';
import { UISM } from '../../core/UISoundManager';
import { canvasRenderer } from '../../domain/services/CanvasRenderer';
import '../common/AppButton';

/**
 * DataSourceInput: Batch Generation Studio (Takeover Interface)
 * Implementa o fluxo de geração em lote com Live Preview Grid.
 */
export class DataSourceInput extends HTMLElement {
  private dataList: Record<string, any>[] = [];

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
        
        textarea {
          flex: 1;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--color-border-ui);
          border-radius: 8px;
          color: white;
          font-family: var(--font-mono);
          font-size: 12px;
          padding: 12px;
          resize: none;
          outline: none;
          transition: border-color 0.2s;
        }
        textarea:focus { border-color: var(--color-accent-primary); }

        .status-badge {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .index-tag { font-family: var(--font-mono); font-size: 9px; color: var(--color-text-muted); text-transform: uppercase; }
      </style>

      <div class="studio-container">
        <div class="studio-main">
          <div class="studio-sidebar">
            <div>
              <h4 class="label-prism">Data Source</h4>
              <p style="font-size: 11px; color: var(--color-text-muted); margin-bottom: 12px;">
                Enter one name per line to substitute <kbd class="kbd-prism">{{nome}}</kbd>
              </p>
            </div>
            <textarea id="data-input" placeholder="Line 1&#10;Line 2&#10;..."></textarea>
            <div class="status-badge" id="data-status">0 records detected</div>
          </div>

          <div class="studio-preview">
            <div id="preview-grid" class="preview-grid">
              <div style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); margin-top: 100px;">
                Waiting for data...
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
  }

  private attachEvents(): void {
    const shadow = this.shadowRoot!;
    const textarea = shadow.getElementById('data-input') as HTMLTextAreaElement;
    const grid = shadow.getElementById('preview-grid')!;
    const status = shadow.getElementById('data-status')!;
    const summary = shadow.getElementById('batch-summary')!;

    textarea.addEventListener('input', () => {
      const raw = textarea.value.trim();
      this.dataList = raw ? raw.split('\n').map(v => ({ nome: v.trim() })) : [];
      
      status.textContent = `${this.dataList.length} records detected`;
      summary.textContent = this.dataList.length > 0 
        ? `BATCH SIZE: ${this.dataList.length} UNITS` 
        : 'READY TO PROCESS';

      this.updatePreviewGrid(grid);
    });

    shadow.getElementById('btn-close')?.addEventListener('click', () => {
      const modal = document.getElementById('batch-modal') as any;
      if (modal) modal.removeAttribute('open');
    });

    shadow.getElementById('btn-generate')?.addEventListener('click', async () => {
      if (this.dataList.length === 0) return;
      
      const { pdfGenerator } = await import('../../domain/services/PDFGenerator');
      const label = store.getState().currentLabel;
      if (label) {
        UISM.play(UISM.enumPresets.SUCCESS);
        await pdfGenerator.generateLotePDF(label, this.dataList);
      }
    });
  }

  private updatePreviewGrid(container: HTMLElement): void {
    const label = store.getState().currentLabel;
    if (!label || this.dataList.length === 0) {
      container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); margin-top: 100px;">Waiting for data...</div>';
      return;
    }

    container.innerHTML = '';
    const maxPreviews = 12;

    this.dataList.slice(0, maxPreviews).forEach((data, i) => {
      const item = document.createElement('div');
      item.className = 'preview-card';
      
      const thumb = document.createElement('div');
      thumb.className = 'label-thumbnail';
      thumb.style.aspectRatio = `${label.config.widthMM} / ${label.config.heightMM}`;
      
      const canvas = document.createElement('canvas');
      thumb.appendChild(canvas);
      
      item.innerHTML = `<span class="index-tag">#${String(i+1).padStart(3, '0')}</span>`;
      item.appendChild(thumb);
      container.appendChild(item);

      this.renderLabelThumb(canvas, label, data);
    });

    if (this.dataList.length > maxPreviews) {
      const more = document.createElement('div');
      more.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 20px; color: var(--color-text-muted); font-size: 11px;';
      more.textContent = `+ ${this.dataList.length - maxPreviews} more labels...`;
      container.appendChild(more);
    }
  }

  private renderLabelThumb(canvas: HTMLCanvasElement, label: any, data: any): void {
    const ctx = canvas.getContext('2d')!;
    const scale = 2; 
    
    canvas.width = label.config.widthMM * scale;
    canvas.height = label.config.heightMM * scale;
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Passamos o 'data' no contexto da renderização
    label.elements.forEach((el: any) => {
      canvasRenderer.render(el, { ctx, scale, data });
    });
  }
}

customElements.define('data-source-input', DataSourceInput);
