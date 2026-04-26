import { store, AppState } from '../../core/Store';
import eventBus from '../../core/EventBus';
import { canvasRenderer } from '../../domain/services/CanvasRenderer';
import { UISM } from '../../core/UISoundManager';
import { UnitConverter } from '../../utils/units';
import { sharedSheet } from '../../utils/shared-styles';

/**
 * EditorCanvas: O Web Component que renderiza a etiqueta visualmente com layout Tactile Prism.
 */
export class EditorCanvas extends HTMLElement {
  private workspace: HTMLDivElement;
  private artboard: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private selectionOutlineBorderWidth = 1.5; // em pontos, convertido para pixels no desenho
  private unsubscribe: (() => void) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
    
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
    if (!this.shadowRoot || this.shadowRoot.querySelector('.canvas-workspace')) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: var(--color-canvas);
        }

        /* Container principal que permite o scroll */
        .canvas-workspace {
          display: flex;
          min-width: 100%;
          min-height: 100%;
          padding: 150px; /* Respiro fixo (Task 66) */
          box-sizing: border-box;
        }

        /* Camada de centralização que cresce com o conteúdo */
        .artboard-scaler {
          display: block;
          margin: auto; /* Truque mestre para centralizar com scroll funcional */
          position: relative;
        }

        .label-artboard {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5), 0 18px 36px -18px rgba(0, 0, 0, 0.5);
          transition: transform 0.2s var(--ease-spring);
          background-color: white;
          flex: none;
        }
      </style>
    `;

    this.workspace.className = 'canvas-workspace';
    const scaler = document.createElement('div');
    scaler.className = 'artboard-scaler';
    scaler.id = 'scaler';

    this.artboard.className = 'label-artboard';
    
    this.artboard.appendChild(this.canvas);
    scaler.appendChild(this.artboard);
    this.workspace.appendChild(scaler);
    this.shadowRoot.appendChild(this.workspace);
  }

  private setupListeners(): void {
    this.unsubscribe = eventBus.on('state:change', (state: AppState) => {
      this.redraw(state);
      this.updateWorkspaceVisuals(state);
    });

    eventBus.on('request:canvas:snapshot', (callback: (ctx: CanvasRenderingContext2D) => void) => {
      callback(this.ctx);
    });

    eventBus.on('command:canvas:restore', (imageData: ImageData) => {
      this.ctx.putImageData(imageData, 0, 0);
    });

    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
  }

  private updateWorkspaceVisuals(_state: AppState): void {
    // O grid do workspace (background) pode ficar sempre ligado para dar a sensação de Cockpit
  }

  private redraw(state: AppState = store.getState()): void {
    const label = state.currentLabel;
    if (!label) return;

    const { config, elements } = label;
    const zoom = config.previewScale;
    const scale = UnitConverter.mmToPx(1, config.dpi);

    // 1. Atualiza as dimensões REAIS da artboard (1:1 com DPI)
    const wPx = UnitConverter.mmToPx(label.config.widthMM, config.dpi);
    const hPx = UnitConverter.mmToPx(label.config.heightMM, config.dpi);
    
    this.artboard.style.width = `${wPx}px`;
    this.artboard.style.height = `${hPx}px`;
    this.artboard.style.backgroundColor = config.backgroundColor || '#ffffff';
    
    // 2. Aplica o Zoom Visual (mantendo a centralização no scaler)
    this.artboard.style.transform = `translate(-50%, -50%) scale(${zoom})`;

    // 3. ATUALIZA O SCALER (A chave para o Gutter funcionar em etiquetas pequenas)
    // O scaler ocupa o espaço visual total que a etiqueta toma com o zoom.
    const scaler = this.shadowRoot?.getElementById('scaler');
    if (scaler) {
      scaler.style.width = `${wPx * zoom}px`;
      scaler.style.height = `${hPx * zoom}px`;
    }

    // Ajusta o tamanho do canvas (em pixels reais baseados no DPI)
    this.canvas.width = wPx;
    this.canvas.height = hPx;
    
    // Sincroniza o tamanho visual do canvas com a artboard
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = config.backgroundColor || '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    elements
      .filter(el => el.visible !== false)
      .sort((a, b) => a.zIndex - b.zIndex)
      .forEach(element => {
        canvasRenderer.render(element, { 
          ctx: this.ctx, 
          scale, 
          dpi: config.dpi 
        });
        
        if (state.selectedElementIds.includes(element.id)) {
          this.drawSelectionOutline(element, scale, config.dpi);
        }
      });

    if (state.preferences.showGrid) {
      this.drawGridOverlay(state, scale);
    }
  }

  private drawGridOverlay(state: AppState, scale: number): void {
    const { gridSizeMM, gridColor, gridOpacity } = state.preferences;
    const { widthMM, heightMM } = state.currentLabel!.config;
    const step = gridSizeMM * scale;

    this.ctx.save();
    this.ctx.beginPath();
    
    // Converte HEX para RGBA com a opacidade desejada
    this.ctx.strokeStyle = gridColor || 'rgba(99, 102, 241, 0.15)'; 
    this.ctx.globalAlpha = gridOpacity ?? 0.3;
    this.ctx.lineWidth = 0.5;

    // Linhas Verticais
    for (let x = 0; x <= widthMM * scale; x += step) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, heightMM * scale);
    }

    // Linhas Horizontais
    for (let y = 0; y <= heightMM * scale; y += step) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(widthMM * scale, y);
    }

    this.ctx.stroke();
    this.ctx.restore();
  }

  private drawSelectionOutline(el: any, scale: number, dpi: number): void {
    if (!el.dimensions) return;
    this.ctx.save();
    this.ctx.strokeStyle = '#6366f1';
    
    // Borda de seleção técnica: 1.5pt de espessura convertida para pixels
    this.ctx.lineWidth = UnitConverter.ptToPx(this.selectionOutlineBorderWidth, dpi) * (scale / UnitConverter.mmToPx(1, dpi)); 
    
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
    
    // CORREÇÃO SELEÇÃO (Task 54): 
    // rect.width/height já refletem o tamanho escalonado pelo CSS transform.
    // Ao dividir a distância do clique (clientX - rect.left) pela largura visual (rect.width),
    // obtemos a porcentagem do clique no canvas.
    // Multiplicando pelo tamanho interno do canvas (this.canvas.width), voltamos à coordenada real.
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
      UISM.play(UISM.enumPresets.SELECT);
    } else {
      eventBus.emit('element:select', []);
    }
  }
}

customElements.define('editor-canvas', EditorCanvas);
