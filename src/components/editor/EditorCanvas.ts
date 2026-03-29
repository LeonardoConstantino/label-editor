import { store, AppState } from '../../core/Store';
import eventBus from '../../core/EventBus';
import { canvasRenderer } from '../../domain/services/CanvasRenderer';

/**
 * EditorCanvas: O Web Component que renderiza a etiqueta visualmente com layout Tactile Prism.
 */
export class EditorCanvas extends HTMLElement {
  private workspace: HTMLDivElement;
  private artboard: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private unsubscribe: (() => void) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this.workspace = document.createElement('div');
    this.artboard = document.createElement('div');
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!;
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
        @import "/src/styles/main.css";
        :host {
          display: block;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      </style>
    `;

    this.workspace.className = 'canvas-workspace';
    this.artboard.className = 'label-artboard';
    
    this.artboard.appendChild(this.canvas);
    this.workspace.appendChild(this.artboard);
    this.shadowRoot.appendChild(this.workspace);
  }

  private setupListeners(): void {
    this.unsubscribe = eventBus.on('state:change', (state: AppState) => {
      this.redraw(state);
    });

    eventBus.on('request:canvas:snapshot', (callback: (ctx: CanvasRenderingContext2D) => void) => {
      callback(this.ctx);
    });

    eventBus.on('command:canvas:restore', (imageData: ImageData) => {
      this.ctx.putImageData(imageData, 0, 0);
    });

    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
  }

  private redraw(state: AppState = store.getState()): void {
    const label = state.currentLabel;
    if (!label) return;

    const { config, elements } = label;
    const scale = (config.dpi / 25.4) * config.previewScale;

    // Atualiza dimensões da artboard (mm -> px para estilo CSS)
    this.artboard.style.width = `${label.config.widthMM}mm`;
    this.artboard.style.height = `${label.config.heightMM}mm`;

    // Ajusta o tamanho do canvas (em pixels reais baseados no DPI)
    this.canvas.width = label.config.widthMM * scale;
    this.canvas.height = label.config.heightMM * scale;
    
    // Sincroniza o tamanho visual do canvas com a artboard
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    elements
      .filter(el => el.visible !== false)
      .sort((a, b) => a.zIndex - b.zIndex)
      .forEach(element => {
        canvasRenderer.render(element, { ctx: this.ctx, scale });
        if (state.selectedElementIds.includes(element.id)) {
          this.drawSelectionOutline(element, scale);
        }
      });
  }

  private drawSelectionOutline(el: any, scale: number): void {
    if (!el.dimensions) return;
    this.ctx.save();
    this.ctx.strokeStyle = '#6366f1';
    this.ctx.lineWidth = 2 * (scale / 11.81); // Escala a largura da borda
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
    const x = ((e.clientX - rect.left) / rect.width) * this.canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * this.canvas.height;

    const state = store.getState();
    if (!state.currentLabel) return;

    const reversedElements = [...state.currentLabel.elements].sort((a, b) => b.zIndex - a.zIndex);
    const clickedElement = reversedElements.find(el => 
      canvasRenderer.hitTest(el, x, y, state.currentLabel!.config)
    );

    if (clickedElement) {
      eventBus.emit('element:select', clickedElement.id);
    } else {
      eventBus.emit('element:select', []);
    }
  }
}

customElements.define('editor-canvas', EditorCanvas);
