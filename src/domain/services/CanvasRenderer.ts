import { AnyElement, CanvasConfig } from '../models/Label';
import { ElementType } from '../models/elements/BaseElement';
import { IRenderer } from './renderers/IRenderer';
import { TextRenderer } from './renderers/TextRenderer';
import { RectangleRenderer } from './renderers/RectangleRenderer';
import { ImageRenderer } from './renderers/ImageRenderer';
import { BorderRenderer } from './renderers/BorderRenderer';
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
    this.renderers.set(ElementType.BORDER, new BorderRenderer());
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
   * Renderiza um elemento individual aplicando transformações universais (rotação, opacidade).
   */
  public render(element: AnyElement, context: RenderContext): void {
    const renderer = this.renderers.get(element.type);
    if (!renderer) return;

    const { ctx, scale } = context;

    ctx.save();

    // 1. Aplica Opacidade Universal
    ctx.globalAlpha = element.opacity ?? 1;

    // 2. Aplica Rotação Universal
    // Para rotacionar ao redor do centro do elemento, precisamos saber as dimensões
    const x = element.position.x * scale;
    const y = element.position.y * scale;

    if (element.rotation && element.rotation !== 0) {
      let centerX = x;
      let centerY = y;

      if ('dimensions' in element) {
        centerX = x + (element.dimensions.width * scale) / 2;
        centerY = y + (element.dimensions.height * scale) / 2;
      }

      ctx.translate(centerX, centerY);
      ctx.rotate((element.rotation * Math.PI) / 180);
      ctx.translate(-centerX, -centerY);
    }

    // 3. Renderização Específica
    renderer.render(element, context);

    ctx.restore();
  }

  /**
   * Verifica se um ponto (px) está dentro de um elemento (hit test).
   * Suporta elementos rotacionados.
   */
  public hitTest(element: AnyElement, pxX: number, pxY: number, config: CanvasConfig): boolean {
    const scale = UnitConverter.mmToPx(1, config.dpi);
    
    const x = element.position.x * scale;
    const y = element.position.y * scale;

    let targetX = pxX;
    let targetY = pxY;

    // Se houver rotação, precisamos rotacionar o ponto do mouse inversamente 
    // ao redor do centro do elemento para testar contra o retângulo alinhado aos eixos.
    if (element.rotation && element.rotation !== 0 && 'dimensions' in element) {
      const centerX = x + (element.dimensions.width * scale) / 2;
      const centerY = y + (element.dimensions.height * scale) / 2;
      
      const angle = (-element.rotation * Math.PI) / 180;
      const dx = pxX - centerX;
      const dy = pxY - centerY;
      
      targetX = centerX + (dx * Math.cos(angle) - dy * Math.sin(angle));
      targetY = centerY + (dx * Math.sin(angle) + dy * Math.cos(angle));
    }

    if ('dimensions' in element) {
      const w = element.dimensions.width * scale;
      const h = element.dimensions.height * scale;
      return targetX >= x && targetX <= x + w && targetY >= y && targetY <= y + h;
    }

    if (element.type === ElementType.BORDER) {
      const canvasW = UnitConverter.mmToPx(config.widthMM, config.dpi);
      const canvasH = UnitConverter.mmToPx(config.heightMM, config.dpi);
      const margin = element.position.x * scale;
      const isNearEdge = (
        (Math.abs(pxX - margin) < 10 || Math.abs(pxX - (canvasW - margin)) < 10) && pxY >= margin && pxY <= canvasH - margin
      ) || (
        (Math.abs(pxY - margin) < 10 || Math.abs(pxY - (canvasH - margin)) < 10) && pxX >= margin && pxX <= canvasW - margin
      );
      return isNearEdge;
    }

    return false;
  }
}

export const canvasRenderer = new CanvasRenderer();
