import eventBus from '../../core/EventBus';
import { ElementType } from '../../domain/models/elements/BaseElement';

/**
 * Toolbar: Componente superior com botões de ação
 */
export class EditorToolbar extends HTMLElement {
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
        :host {
          display: flex;
          gap: 12px;
          height: 100%;
          align-items: center;
        }

        button {
          background: transparent;
          border: 1px solid var(--color-border-ui, #262a33);
          color: #94a3b8;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        button:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border-color: var(--color-accent, #6366f1);
          transform: translateY(-1px);
        }

        button:active {
          transform: scale(0.95);
        }

        .divider {
          width: 1px;
          height: 20px;
          background-color: var(--color-border-ui, #262a33);
          margin: 0 4px;
        }
      </style>
      
      <button id="add-text">Add Text</button>
      <button id="add-rect">Add Rect</button>
      <button id="add-image">Add Image</button>
      <div class="divider"></div>
      <button id="undo">Undo</button>
      <button id="redo">Redo</button>
      <div class="divider"></div>
      <button id="save" style="border-color: #10b981; color: #10b981;">Save</button>
      <button id="export-pdf" style="border-color: #f59e0b; color: #f59e0b;">Export PDF</button>
      <input type="file" id="file-input" style="display: none;" accept="image/*">
    `;

    this.attachEvents();
  }

  private attachEvents(): void {
    const shadow = this.shadowRoot!;
    const fileInput = shadow.getElementById('file-input') as HTMLInputElement;

    shadow.getElementById('export-pdf')?.addEventListener('click', async () => {
      const { pdfGenerator } = await import('../../domain/services/PDFGenerator');
      const { store } = await import('../../core/Store');
      const label = store.getState().currentLabel;
      if (label) {
        await pdfGenerator.generateLotePDF(label, [{}]); // Exporta etiqueta única
        alert('PDF gerado com sucesso!');
      }
    });

    shadow.getElementById('add-image')?.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput?.addEventListener('change', async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const { imageProcessor } = await import('../../utils/imageProcessor');
      const { store } = await import('../../core/Store');
      
      const processed = await imageProcessor.process(file);
      const config = store.getState().currentLabel!.config;
      
      // Converte pixels processados para mm para o modelo de domínio
      // Assumindo que o maxWidth de 1200px é o teto, usamos o DPI configurado.
      const scale = config.dpi / 25.4;

      eventBus.emit('element:add', {
        id: 'img-' + Date.now(),
        type: ElementType.IMAGE,
        position: { x: 5, y: 5 },
        zIndex: 5,
        dimensions: { 
          width: processed.width / scale, 
          height: processed.height / scale 
        },
        src: processed.src,
        fit: 'contain'
      });
    });

    shadow.getElementById('save')?.addEventListener('click', async () => {
      const { templateManager } = await import('../../domain/services/TemplateManager');
      await templateManager.saveCurrentLabel();
      alert('Etiqueta salva com sucesso!');
    });

    shadow.getElementById('add-text')?.addEventListener('click', () => {
      eventBus.emit('element:add', {
        id: 'txt-' + Date.now(),
        type: ElementType.TEXT,
        position: { x: 10, y: 10 },
        zIndex: 10,
        dimensions: { width: 40, height: 8 },
        content: 'New Text',
        fontFamily: 'sans-serif',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#000000',
        textAlign: 'left'
      });
    });

    shadow.getElementById('add-rect')?.addEventListener('click', () => {
      eventBus.emit('element:add', {
        id: 'rect-' + Date.now(),
        type: ElementType.RECTANGLE,
        position: { x: 10, y: 10 },
        zIndex: 5,
        dimensions: { width: 30, height: 20 },
        fillColor: '#e2e8f0',
        strokeColor: '#64748b',
        strokeWidth: 1
      });
    });

    shadow.getElementById('undo')?.addEventListener('click', () => {
      eventBus.emit('history:undo');
    });

    shadow.getElementById('redo')?.addEventListener('click', () => {
      eventBus.emit('history:redo');
    });
  }
}

customElements.define('editor-toolbar', EditorToolbar);
