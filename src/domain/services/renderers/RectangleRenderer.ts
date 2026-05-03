import { IRenderer } from './IRenderer';
import { RectangleElement } from '../../models/elements/SpecificElements';
import { RenderContext } from '../CanvasRenderer';
import { UnitConverter } from '../../../utils/units';

/**
 * RectangleRenderer: Desenha formas retangulares com suporte a stroke, fill e borderRadius.
 */
export class RectangleRenderer implements IRenderer {
  render(element: RectangleElement, context: RenderContext): void {
    const { ctx, scale, dpi } = context;

    // Posição x,y (já escaladas pelo multiplicador mm -> px do contexto)
    const x = element.position.x * scale;
    const y = element.position.y * scale;
    const w = element.dimensions.width * scale;
    const h = element.dimensions.height * scale;

    ctx.save();

    // Estilos de traço
    if (element.strokeColor && element.strokeWidth > 0) {
      ctx.strokeStyle = element.strokeColor;
      ctx.lineWidth = UnitConverter.mmToPx(element.strokeWidth, dpi) * (scale / UnitConverter.mmToPx(1, dpi));
    }

    if (element.fillColor) {
      ctx.fillStyle = element.fillColor;
    }

    if (element.borderRadius > 0) {
      this.drawRoundedPath(ctx, x, y, w, h, element.borderRadius * scale);
      if (element.fillColor && element.fillColor !== 'transparent') ctx.fill();
      if (element.strokeColor && element.strokeWidth > 0) ctx.stroke();
    } else {
      if (element.fillColor && element.fillColor !== 'transparent') ctx.fillRect(x, y, w, h);
      if (element.strokeColor && element.strokeWidth > 0) ctx.strokeRect(x, y, w, h);
    }

    ctx.restore();
  }

  private drawRoundedPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
    // Garante que o raio não ultrapasse metade da largura ou altura
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}
