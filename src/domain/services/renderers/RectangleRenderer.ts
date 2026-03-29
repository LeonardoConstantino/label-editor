import { IRenderer } from './IRenderer';
import { RectangleElement } from '../../models/elements/SpecificElements';
import { RenderContext } from '../CanvasRenderer';

/**
 * RectangleRenderer: Desenha formas retangulares com suporte a stroke e fill.
 */
export class RectangleRenderer implements IRenderer {
  render(element: RectangleElement, context: RenderContext): void {
    const { ctx, scale } = context;

    const x = element.position.x * scale;
    const y = element.position.y * scale;
    const w = element.dimensions.width * scale;
    const h = element.dimensions.height * scale;

    ctx.save();

    if (element.fillColor) {
      ctx.fillStyle = element.fillColor;
      ctx.fillRect(x, y, w, h);
    }

    if (element.strokeColor && element.strokeWidth) {
      ctx.strokeStyle = element.strokeColor;
      ctx.lineWidth = element.strokeWidth * scale;
      ctx.strokeRect(x, y, w, h);
    }

    ctx.restore();
  }
}
