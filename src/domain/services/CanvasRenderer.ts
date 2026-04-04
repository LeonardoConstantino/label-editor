import { AnyElement, CanvasConfig } from '../models/Label';
import { ElementType } from '../models/elements/BaseElement';
import { IRenderer } from './renderers/IRenderer';
import { TextRenderer } from './renderers/TextRenderer';
import { RectangleRenderer } from './renderers/RectangleRenderer';
import { ImageRenderer } from './renderers/ImageRenderer';
import { UnitConverter } from '../../utils/units';

export interface RenderContext {
  ctx: CanvasRenderingContext2D;
  scale: number; // mm -> px (incluindo previewScale se houver)
  dpi: number;
  data?: Record<string, any>;
}

/**
 * CanvasRenderer: Orquestrador da renderização utilizando o padrão Strategy.
 */
export class CanvasRenderer {
  private renderers: Map<ElementType, IRenderer> = new Map();

  constructor() {
    this.renderers.set(ElementType.TEXT, new TextRenderer());
    this.renderers.set(ElementType.RECTANGLE, new RectangleRenderer());
    this.renderers.set(ElementType.IMAGE, new ImageRenderer());
  }

  /**
   * Renderiza todos os elementos visíveis de uma etiqueta.
   */
  public renderAll(elements: AnyElement[], context: RenderContext): void {
    elements
      .filter(el => el.visible !== false)
      .sort((a, b) => a.zIndex - b.zIndex)
      .forEach(element => this.render(element, context));
  }

  /**
   * Renderiza um elemento individual delegando para o renderer específico.
   */
  public render(element: AnyElement, context: RenderContext): void {
    const renderer = this.renderers.get(element.type);
    if (renderer) {
      renderer.render(element, context);
    }
  }

  /**
   * Verifica se um ponto (px) está dentro de um elemento (hit test).
   */
  public hitTest(element: AnyElement, pxX: number, pxY: number, config: CanvasConfig): boolean {
    // Escala combinada: DPI + Zoom de Preview
    const scale = UnitConverter.mmToPx(1, config.dpi) * config.previewScale;
    
    const elX = element.position.x * scale;
    const elY = element.position.y * scale;

    if ('dimensions' in element) {
      const elW = (element as any).dimensions.width * scale;
      const elH = (element as any).dimensions.height * scale;
      return pxX >= elX && pxX <= elX + elW && pxY >= elY && pxY <= elY + elH;
    }

    return false;
  }
}

export const canvasRenderer = new CanvasRenderer();
