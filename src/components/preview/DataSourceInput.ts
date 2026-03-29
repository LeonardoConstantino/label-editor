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
        
        :host {
          display: flex;
          flex-direction: column;
          height: 80vh;
          width: 1000px;
          max-width: 90vw;
          margin: -24px;
          background: var(--color-canvas);
          overflow: hidden;
        }

        .studio-layout {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .data-sidebar {
          width: 320px;
          background: var(--color-surface);
          border-right: 1px solid var(--color-border-ui);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

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

        .preview-workspace {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          background-image: radial-gradient(var(--color-border-ui) 1px, transparent 0);
          background-size: 20px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 32px;
          width: 100%;
        }

        .preview-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          animation: popIn 0.4s var(--ease-spring) both;
        }

        .label-thumb {
          background: white;
          box-shadow: 0 15px 35px rgba(0,0,0,0.6);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }

        .studio-footer {
          height: 72px;
          background: var(--color-surface-solid);
          border-top: 1px solid var(--color-border-ui);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          z-index: 10;
        }

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

        @keyframes popIn {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      </style>

      <div class="studio-layout">
        <div class="data-sidebar">
          <div>
            <h4 class="label-prism">Data Source</h4>
            <p style="font-size: 11px; color: var(--color-text-muted); margin-bottom: 12px;">
              Enter one name per line to substitute <kbd class="kbd-prism">{{nome}}</kbd>
            </p>
          </div>
          <textarea id="data-input" placeholder="Line 1&#10;Line 2&#10;..."></textarea>
          <div class="status-badge" id="data-status">0 records detected</div>
        </div>

        <div class="preview-workspace">
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
      item.className = 'preview-item';
      
      const thumb = document.createElement('div');
      thumb.className = 'label-thumb';
      thumb.style.width = '100%';
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
