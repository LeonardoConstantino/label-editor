import { IRenderer } from './IRenderer';
import { BorderElement } from '../../models/elements/SpecificElements';
import { RenderContext } from '../CanvasRenderer';
import { BorderStyle } from '../../models/elements/BaseElement';
import { UnitConverter } from '../../../utils/units';

/**
 * BorderRenderer: Desenha uma moldura técnica ao redor da etiqueta.
 */
export class BorderRenderer implements IRenderer {
  render(element: BorderElement, context: RenderContext): void {
    const { ctx, scale, dpi } = context;
    
    // Para BorderElement, a posição x,y define o "inset" (recuo) em relação ao canvas
    const x = element.position.x * scale;
    const y = element.position.y * scale;
    
    // As dimensões da borda são o canvas menos o recuo duplo
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    const w = canvasWidth - (x * 2);
    const h = canvasHeight - (y * 2);

    ctx.save();
    
    // Opacidade global
    ctx.globalAlpha = element.opacity ?? 1;

    // Rotação (no centro do canvas)
    if (element.rotation) {
      ctx.translate(canvasWidth / 2, canvasHeight / 2);
      ctx.rotate((element.rotation * Math.PI) / 180);
      ctx.translate(-canvasWidth / 2, -canvasHeight / 2);
    }

    ctx.strokeStyle = element.color || '#000000';
    ctx.lineWidth = UnitConverter.mmToPx(element.width, dpi) * (scale / UnitConverter.mmToPx(1, dpi));

    // Estilo de linha
    if (element.style === BorderStyle.DASHED) {
      ctx.setLineDash([15 * scale, 10 * scale]);
    } else if (element.style === BorderStyle.DOTTED) {
      ctx.setLineDash([2 * scale, 4 * scale]);
    }

    // Desenho com cantos arredondados (radius)
    if (element.radius > 0) {
      const r = element.radius * scale;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.stroke();
    } else {
      ctx.strokeRect(x, y, w, h);
    }

    ctx.restore();
  }
}
