import { store, AppState } from '../../core/Store';
import eventBus from '../../core/EventBus';
import { canvasRenderer } from '../../domain/services/CanvasRenderer';
import { SoundPreset, UISM } from '../../core/UISoundManager';
import { UnitConverter } from '../../utils/units';
import { sharedSheet } from '../../utils/shared-styles';
import { snapService, SnapResult } from '../../domain/services/SnapService';

const gridSnapFeedback: SoundPreset = {
  freq: 1100,
  duration: 0.04,
  type: 'square',
  volume: 0.03,
  envelope: {
    attack: 0.005,
    decay: 0.025,
    sustain: 0,
    release: 0.01,
  },
};

/**
 * EditorCanvas: O Web Component que renderiza a etiqueta visualmente com layout Tactile Prism.
 * Agora com suporte a Drag-and-Drop e Smart Snapping (Task 63).
 */
export class EditorCanvas extends HTMLElement {
  private workspace: HTMLDivElement;
  private artboard: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private selectionOutlineBorderWidth = 1.5; // em pontos
  private unsubscribe: (() => void) | null = null;

  // Estado de Arraste (Drag-and-Drop)
  private isDragging = false;
  private dragElementId: string | null = null;
  private dragOffsetX = 0; // mm
  private dragOffsetY = 0; // mm
  private activeSnapGuides: SnapResult['guides'] | null = null;
  private lastSnappedX: number | null = null;
  private lastSnappedY: number | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }

    this.workspace = document.createElement('div');
    this.artboard = document.createElement('div');
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', {
      willReadFrequently: true,
      alpha: true,
    })!;
  }

  connectedCallback(): void {
    this.render();
    this.setupListeners();
    this.redraw();
  }

  disconnectedCallback(): void {
    if (this.unsubscribe) this.unsubscribe();
    // Limpa listeners globais
    window.removeEventListener('mousemove', this.handleMouseMoveBound);
    window.removeEventListener('mouseup', this.handleMouseUpBound);
  }

  private render(): void {
    if (!this.shadowRoot || this.shadowRoot.querySelector('.canvas-workspace'))
      return;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; width: 100%; height: 100%; overflow: auto; background-color: var(--color-canvas); }
        .canvas-workspace { display: flex; min-width: 100%; min-height: 100%; padding: 150px; box-sizing: border-box; }
        .artboard-scaler { display: block; margin: auto; position: relative; }
        .label-artboard {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5), 0 18px 36px -18px rgba(0, 0, 0, 0.5);
          transition: transform 0.2s var(--ease-spring); background-color: white; flex: none;
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

  private handleMouseMoveBound = (e: MouseEvent) => this.handleMouseMove(e);
  private handleMouseUpBound = (e: MouseEvent) => this.handleMouseUp(e);

  private setupListeners(): void {
    this.unsubscribe = eventBus.on('state:change', (state: AppState) => {
      this.redraw(state);
    });

    eventBus.on(
      'request:canvas:snapshot',
      (callback: (ctx: CanvasRenderingContext2D) => void) => {
        callback(this.ctx);
      },
    );

    eventBus.on('command:canvas:restore', (imageData: ImageData) => {
      this.ctx.putImageData(imageData, 0, 0);
    });

    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    window.addEventListener('mousemove', this.handleMouseMoveBound);
    window.addEventListener('mouseup', this.handleMouseUpBound);
  }

  private redraw(state: AppState = store.getState()): void {
    const label = state.currentLabel;
    if (!label) return;

    const { config, elements } = label;
    const zoom = config.previewScale;
    const scale = UnitConverter.mmToPx(1, config.dpi);
    const screenDPI = window.devicePixelRatio * 96;
    const dpiCorrection = screenDPI / config.dpi;

    const wPx = UnitConverter.mmToPx(label.config.widthMM, config.dpi);
    const hPx = UnitConverter.mmToPx(label.config.heightMM, config.dpi);

    this.artboard.style.width = `${wPx}px`;
    this.artboard.style.height = `${hPx}px`;
    this.artboard.style.backgroundColor = config.backgroundColor || '#ffffff';

    const finalZoom = zoom * dpiCorrection;
    this.artboard.style.transform = `translate(-50%, -50%) scale(${finalZoom})`;

    const scaler = this.shadowRoot?.getElementById('scaler');
    if (scaler) {
      scaler.style.width = `${wPx * finalZoom}px`;
      scaler.style.height = `${hPx * finalZoom}px`;
    }

    this.canvas.width = wPx;
    this.canvas.height = hPx;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = config.backgroundColor || '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    elements
      .filter((el) => el.visible !== false)
      .sort((a, b) => a.zIndex - b.zIndex)
      .forEach((element) => {
        canvasRenderer.render(element, {
          ctx: this.ctx,
          scale,
          dpi: config.dpi,
        });
        if (state.selectedElementIds.includes(element.id)) {
          this.drawSelectionOutline(element, scale, config.dpi);
        }
      });

    if (state.preferences.showGrid) {
      this.drawGridOverlay(state, scale);
    }

    if (this.activeSnapGuides) {
      this.drawSnapGuides(this.activeSnapGuides, scale);
    }
  }

  private drawGridOverlay(state: AppState, scale: number): void {
    const { gridSizeMM, gridColor, gridOpacity } = state.preferences;
    const { widthMM, heightMM } = state.currentLabel!.config;
    const step = gridSizeMM * scale;
    const width = widthMM * scale;
    const height = heightMM * scale;

    this.ctx.save();

    // ═══════════════════════════════════════════════════════════
    // 1. Subdivisões (linhas secundárias mais sutis)
    // ═══════════════════════════════════════════════════════════
    this.ctx.strokeStyle = gridColor || 'rgba(99, 102, 241, 0.08)';
    this.ctx.globalAlpha = (gridOpacity ?? 0.3) * 0.4;
    this.ctx.lineWidth = 1.5;
    this.ctx.setLineDash([2, 4]);
    this.ctx.beginPath();

    for (let x = step / 2; x < width; x += step) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
    }
    for (let y = step / 2; y < height; y += step) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
    }
    this.ctx.stroke();

    // ═══════════════════════════════════════════════════════════
    // 2. Linhas principais (grid original, mais destacado)
    // ═══════════════════════════════════════════════════════════
    this.ctx.strokeStyle = gridColor || 'rgba(99, 102, 241, 0.2)';
    this.ctx.globalAlpha = gridOpacity ?? 0.3;
    this.ctx.lineWidth = 1.5;
    this.ctx.setLineDash([4, 2]);
    this.ctx.beginPath();

    for (let x = 0; x <= width; x += step) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += step) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
    }
    this.ctx.stroke();

    // ═══════════════════════════════════════════════════════════
    // 3. Pontos de interseção (âncoras visuais)
    // ═══════════════════════════════════════════════════════════
    this.ctx.fillStyle = gridColor || 'rgba(99, 102, 241, 0.4)';
    this.ctx.globalAlpha = (gridOpacity ?? 0.3) * 1.2;
    this.ctx.setLineDash([]);

    for (let x = 0; x <= width; x += step) {
      for (let y = 0; y <= height; y += step) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    // ═══════════════════════════════════════════════════════════
    // 4. Borda com gradiente sutil (profundidade)
    // ═══════════════════════════════════════════════════════════
    const gradient = this.ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(
      0,
      gridColor?.replace(/[\d.]+\)$/g, '0.05)') || 'rgba(99, 102, 241, 0.05)',
    );
    gradient.addColorStop(0.5, 'transparent');
    gradient.addColorStop(
      1,
      gridColor?.replace(/[\d.]+\)$/g, '0.05)') || 'rgba(99, 102, 241, 0.05)',
    );

    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = 2;
    this.ctx.globalAlpha = gridOpacity ?? 0.3;
    this.ctx.strokeRect(0, 0, width, height);

    this.ctx.restore();
  }

  private drawSnapGuides(guides: SnapResult['guides'], scale: number): void {
    if (guides.x.length === 0 && guides.y.length === 0) return;

    this.ctx.save();

    // ═══════════════════════════════════════════════════════════
    // 1. Sombra/Glow das guias (profundidade)
    // ═══════════════════════════════════════════════════════════
    this.ctx.shadowColor = '#f59e0b';
    this.ctx.shadowBlur = 8;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;

    // ═══════════════════════════════════════════════════════════
    // 2. Linha principal com animação de dash (movimento sutil)
    // ═══════════════════════════════════════════════════════════
    const dashOffset = (Date.now() / 50) % 12; // Animação suave
    this.ctx.strokeStyle = '#f59e0b';
    this.ctx.lineWidth = 1.5;
    this.ctx.setLineDash([8, 4]);
    this.ctx.lineDashOffset = -dashOffset;

    // Guias verticais
    guides.x.forEach((x) => {
      const xPos = x * scale;
      this.ctx.beginPath();
      this.ctx.moveTo(xPos, 0);
      this.ctx.lineTo(xPos, this.canvas.height);
      this.ctx.stroke();
    });

    // Guias horizontais
    guides.y.forEach((y) => {
      const yPos = y * scale;
      this.ctx.beginPath();
      this.ctx.moveTo(0, yPos);
      this.ctx.lineTo(this.canvas.width, yPos);
      this.ctx.stroke();
    });

    // ═══════════════════════════════════════════════════════════
    // 3. Linha secundária mais sutil (efeito de camada)
    // ═══════════════════════════════════════════════════════════
    this.ctx.shadowBlur = 0;
    this.ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
    this.ctx.lineWidth = 3;
    this.ctx.setLineDash([]);

    guides.x.forEach((x) => {
      const xPos = x * scale;
      this.ctx.beginPath();
      this.ctx.moveTo(xPos, 0);
      this.ctx.lineTo(xPos, this.canvas.height);
      this.ctx.stroke();
    });

    guides.y.forEach((y) => {
      const yPos = y * scale;
      this.ctx.beginPath();
      this.ctx.moveTo(0, yPos);
      this.ctx.lineTo(this.canvas.width, yPos);
      this.ctx.stroke();
    });

    // ═══════════════════════════════════════════════════════════
    // 4. Indicadores nas extremidades (âncoras visuais)
    // ═══════════════════════════════════════════════════════════
    this.ctx.fillStyle = '#f59e0b';
    this.ctx.setLineDash([]);

    guides.x.forEach((x) => {
      const xPos = x * scale;
      // Topo
      this.ctx.beginPath();
      this.ctx.arc(xPos, 0, 4, 0, Math.PI * 2);
      this.ctx.fill();
      // Base
      this.ctx.beginPath();
      this.ctx.arc(xPos, this.canvas.height, 4, 0, Math.PI * 2);
      this.ctx.fill();
    });

    guides.y.forEach((y) => {
      const yPos = y * scale;
      // Esquerda
      this.ctx.beginPath();
      this.ctx.arc(0, yPos, 4, 0, Math.PI * 2);
      this.ctx.fill();
      // Direita
      this.ctx.beginPath();
      this.ctx.arc(this.canvas.width, yPos, 4, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.restore();
  }

  private drawSelectionOutline(el: any, scale: number, dpi: number): void {
    if (!el.dimensions) return;

    const x = el.position.x * scale;
    const y = el.position.y * scale;
    const w = el.dimensions.width * scale;
    const h = el.dimensions.height * scale;
    const borderWidth =
      UnitConverter.ptToPx(this.selectionOutlineBorderWidth, dpi) *
      (scale / UnitConverter.mmToPx(1, dpi));

    this.ctx.save();

    // ═══════════════════════════════════════════════════════════
    // 1. Glow externo (destaque vibrante)
    // ═══════════════════════════════════════════════════════════
    this.ctx.shadowColor = '#f43f5e';
    this.ctx.shadowBlur = 12;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;

    // ═══════════════════════════════════════════════════════════
    // 2. Borda principal animada
    // ═══════════════════════════════════════════════════════════
    const dashOffset = (Date.now() / 40) % 15;
    this.ctx.strokeStyle = '#f43f5e';
    this.ctx.lineWidth = borderWidth;
    this.ctx.setLineDash([10, 5]);
    this.ctx.lineDashOffset = -dashOffset;
    this.ctx.strokeRect(x, y, w, h);

    // ═══════════════════════════════════════════════════════════
    // 3. Borda interna sutil (profundidade)
    // ═══════════════════════════════════════════════════════════
    this.ctx.shadowBlur = 0;
    this.ctx.strokeStyle = 'rgba(244, 63, 94, 0.3)';
    this.ctx.lineWidth = borderWidth * 2;
    this.ctx.setLineDash([]);
    this.ctx.strokeRect(x, y, w, h);

    // ═══════════════════════════════════════════════════════════
    // 4. Handles de redimensionamento nos cantos
    // ═══════════════════════════════════════════════════════════
    const handleSize = 8;
    const corners = [
      { x: x, y: y }, // Superior esquerdo
      { x: x + w, y: y }, // Superior direito
      { x: x, y: y + h }, // Inferior esquerdo
      { x: x + w, y: y + h }, // Inferior direito
    ];

    this.ctx.fillStyle = '#ffffff';
    this.ctx.strokeStyle = '#f43f5e';
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([]);

    corners.forEach((corner) => {
      // Fundo branco
      this.ctx.fillRect(
        corner.x - handleSize / 2,
        corner.y - handleSize / 2,
        handleSize,
        handleSize,
      );
      // Borda colorida
      this.ctx.strokeRect(
        corner.x - handleSize / 2,
        corner.y - handleSize / 2,
        handleSize,
        handleSize,
      );
    });

    // ═══════════════════════════════════════════════════════════
    // 5. Handles laterais (opcional, para escala proporcional)
    // ═══════════════════════════════════════════════════════════
    const midPoints = [
      { x: x + w / 2, y: y }, // Topo
      { x: x + w / 2, y: y + h }, // Base
      { x: x, y: y + h / 2 }, // Esquerda
      { x: x + w, y: y + h / 2 }, // Direita
    ];

    this.ctx.fillStyle = '#f43f5e';
    midPoints.forEach((point) => {
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.restore();
  }

  private handleMouseDown(e: MouseEvent): void {
    const coords = this.getMouseMM(e);
    const pxCoords = this.getMousePx(e);
    const state = store.getState();
    if (!state.currentLabel) return;

    const clickedElement = [...state.currentLabel.elements]
      .sort((a, b) => b.zIndex - a.zIndex)
      .find((el) =>
        canvasRenderer.hitTest(
          el,
          pxCoords.x,
          pxCoords.y,
          state.currentLabel!.config,
        ),
      );

    if (clickedElement) {
      if (clickedElement.locked) {
        UISM.play(UISM.enumPresets.WARNING);
        return;
      }
      if (e.shiftKey) {
        const currentIds = state.selectedElementIds;
        const newIds = currentIds.includes(clickedElement.id)
          ? currentIds.filter((id) => id !== clickedElement.id)
          : [...currentIds, clickedElement.id];
        eventBus.emit('element:select', newIds);
      } else {
        eventBus.emit('element:select', clickedElement.id);
        this.isDragging = true;
        this.dragElementId = clickedElement.id;
        this.dragOffsetX = coords.x - clickedElement.position.x;
        this.dragOffsetY = coords.y - clickedElement.position.y;
      }
      UISM.play(UISM.enumPresets.SELECT);
    } else {
      if (!e.shiftKey) eventBus.emit('element:select', []);
    }
  }

  private handleMouseMove(e: MouseEvent): void {
    if (!this.isDragging || !this.dragElementId) return;
    const state = store.getState();
    const label = state.currentLabel;
    if (!label) return;

    const element = label.elements.find((el) => el.id === this.dragElementId);
    if (!element) return;

    const coords = this.getMouseMM(e);
    const rawX = coords.x - this.dragOffsetX;
    const rawY = coords.y - this.dragOffsetY;

    const snapResult = snapService.calculateSnap(
      element,
      { x: rawX, y: rawY },
      label.elements,
      label.config,
      {
        snapToGrid: state.preferences.showGrid && state.preferences.snapToGrid,
        gridSizeMM: state.preferences.gridSizeMM,
        snapToObjects: state.preferences.snapToObjects,
        snapToCanvas: state.preferences.snapToCanvas,
        thresholdMM: state.preferences.snapThresholdMM,
      },
    );

    const finalX = snapResult.x !== null ? snapResult.x : rawX;
    const finalY = snapResult.y !== null ? snapResult.y : rawY;

    if (
      (snapResult.x !== null && this.lastSnappedX === null) ||
      (snapResult.y !== null && this.lastSnappedY === null)
    ) {
      UISM.playCustom(gridSnapFeedback);
    }
    this.lastSnappedX = snapResult.x;
    this.lastSnappedY = snapResult.y;
    this.activeSnapGuides = snapResult.guides;

    eventBus.emit('element:update', {
      id: this.dragElementId,
      updates: {
        position: {
          x: Number(finalX.toFixed(2)),
          y: Number(finalY.toFixed(2)),
        },
      },
    });
  }

  private handleMouseUp(_e: MouseEvent): void {
    if (this.isDragging) {
      eventBus.emit('history:snapshot', { description: 'Move Element' });
      UISM.play(UISM.enumPresets.CLICK);
    }
    this.isDragging = false;
    this.dragElementId = null;
    this.activeSnapGuides = null;
    this.lastSnappedX = null;
    this.lastSnappedY = null;
    this.redraw();
  }

  private getMouseMM(e: MouseEvent): { x: number; y: number } {
    const px = this.getMousePx(e);
    const state = store.getState();
    if (!state.currentLabel) return { x: 0, y: 0 };
    const scale = UnitConverter.mmToPx(1, state.currentLabel.config.dpi);
    return { x: px.x / scale, y: px.y / scale };
  }

  private getMousePx(e: MouseEvent): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * this.canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * this.canvas.height,
    };
  }
}

customElements.define('editor-canvas', EditorCanvas);
