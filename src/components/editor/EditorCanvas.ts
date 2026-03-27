import { store, AppState } from '../../core/Store';
import eventBus from '../../core/EventBus';
import { canvasRenderer } from '../../domain/services/CanvasRenderer';

/**
 * EditorCanvas: O Web Component que renderiza a etiqueta visualmente.
 */
export class EditorCanvas extends HTMLElement {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private unsubscribe: (() => void) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  connectedCallback(): void {
    this.render();
    this.setupListeners();
    this.redraw();
  }

  disconnectedCallback(): void {
    if (this.unsubscribe) this.unsubscribe();
  }

  private render(): void {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: var(--color-canvas, #0f1115);
          overflow: auto;
          padding: 40px;
        }
        canvas {
          background-color: white;
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
          cursor: crosshair;
        }
      </style>
    `;
    this.shadowRoot.appendChild(this.canvas);
  }

  private setupListeners(): void {
    // Subscreve-se às mudanças de estado no EventBus (emitidas pelo Store)
    this.unsubscribe = eventBus.on('state:change', (state: AppState) => {
      this.redraw(state);
    });

    // Detecta cliques para seleção de elementos
    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
  }

  private redraw(state: AppState = store.getState()): void {
    const label = state.currentLabel;
    if (!label) return;

    const { config, elements } = label;
    const scale = (config.dpi / 25.4) * config.previewScale;

    // Ajusta o tamanho do canvas (em pixels) baseado no mm e DPI
    this.canvas.width = label.config.widthMM * scale;
    this.canvas.height = label.config.heightMM * scale;

    // Limpa o canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Renderiza cada elemento
    elements
      .filter(el => el.visible !== false)
      .sort((a, b) => a.zIndex - b.zIndex)
      .forEach(element => {
        canvasRenderer.render(element, { ctx: this.ctx, scale });
        
        // Se estiver selecionado, desenha um outline
        if (state.selectedElementIds.includes(element.id)) {
          this.drawSelectionOutline(element, scale);
        }
      });
  }

  private drawSelectionOutline(el: any, scale: number): void {
    if (!el.dimensions) return;
    
    this.ctx.save();
    this.ctx.strokeStyle = '#6366f1'; // Indigo accent do DS
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([5, 5]);
    this.ctx.strokeRect(
      el.position.x * scale, 
      el.position.y * scale, 
      el.dimensions.width * scale, 
      el.dimensions.height * scale
    );
    this.ctx.restore();
  }

  private handleMouseDown(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const state = store.getState();
    if (!state.currentLabel) return;

    // Encontra o elemento clicado (do topo para baixo)
    const reversedElements = [...state.currentLabel.elements].sort((a, b) => b.zIndex - a.zIndex);
    const clickedElement = reversedElements.find(el => 
      canvasRenderer.hitTest(el, x, y, state.currentLabel!.config)
    );

    if (clickedElement) {
      eventBus.emit('element:select', clickedElement.id);
    } else {
      eventBus.emit('element:select', []); // Deseleciona ao clicar no fundo
    }
  }
}

customElements.define('editor-canvas', EditorCanvas);
