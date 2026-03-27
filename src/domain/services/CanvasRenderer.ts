import { AnyElement, CanvasConfig } from '../models/Label';
import { ElementType } from '../models/elements/BaseElement';
import { TextElement, ImageElement, RectangleElement } from '../models/elements/SpecificElements';

export interface RenderContext {
  ctx: CanvasRenderingContext2D;
  scale: number; // mm -> px
  data?: Record<string, any>; // Para variáveis dinâmicas futuramente
}

export class CanvasRenderer {
  /**
   * Renderiza um elemento individual no canvas
   */
  public render(element: AnyElement, context: RenderContext): void {
    if (element.visible === false) return;

    const { ctx, scale } = context;
    ctx.save();

    switch (element.type) {
      case ElementType.TEXT:
        this.renderText(element as TextElement, context);
        break;
      case ElementType.IMAGE:
        this.renderImage(element as ImageElement, context);
        break;
      case ElementType.RECTANGLE:
        this.renderRectangle(element as RectangleElement, context);
        break;
    }

    ctx.restore();
  }

  private renderText(el: TextElement, { ctx, scale }: RenderContext): void {
    const x = el.position.x * scale;
    const y = el.position.y * scale;

    ctx.fillStyle = el.color;
    ctx.font = `${el.fontWeight} ${el.fontSize * (scale / 3.78)}px ${el.fontFamily}`; // pt to px approx
    ctx.textBaseline = 'top';
    ctx.textAlign = el.textAlign as CanvasTextAlign;

    ctx.fillText(el.content, x, y);
  }

  private renderRectangle(el: RectangleElement, { ctx, scale }: RenderContext): void {
    const x = el.position.x * scale;
    const y = el.position.y * scale;
    const w = el.dimensions.width * scale;
    const h = el.dimensions.height * scale;

    if (el.fillColor) {
      ctx.fillStyle = el.fillColor;
      ctx.fillRect(x, y, w, h);
    }

    if (el.strokeColor && el.strokeWidth) {
      ctx.strokeStyle = el.strokeColor;
      ctx.lineWidth = el.strokeWidth * scale;
      ctx.strokeRect(x, y, w, h);
    }
  }

  private renderImage(el: ImageElement, { ctx, scale }: RenderContext): void {
    if (!el.src) return;

    const x = el.position.x * scale;
    const y = el.position.y * scale;
    const w = el.dimensions.width * scale;
    const h = el.dimensions.height * scale;

    const img = new Image();
    img.src = el.src;

    // Nota: Em um ambiente real, a imagem deve estar pré-carregada.
    // Para o renderer síncrono, assumimos que o browser já tem o cache ou o base64 está pronto.
    if (img.complete) {
      ctx.drawImage(img, x, y, w, h);
    } else {
      img.onload = () => ctx.drawImage(img, x, y, w, h);
    }
  }

  /**
   * Verifica se um ponto (x,y em pixels) está dentro do elemento
   */
  public hitTest(element: AnyElement, pxX: number, pxY: number, config: CanvasConfig): boolean {
    const scale = (config.dpi / 25.4) * config.previewScale;
    const elX = element.position.x * scale;
    const elY = element.position.y * scale;

    // Verificação simplificada baseada em bounding box
    if ('dimensions' in element) {
      const elW = (element as any).dimensions.width * scale;
      const elH = (element as any).dimensions.height * scale;
      return pxX >= elX && pxX <= elX + elW && pxY >= elY && pxY <= elY + elH;
    }

    return false;
  }
}

export const canvasRenderer = new CanvasRenderer();
