import { IRenderer } from './IRenderer';
import { LineElement } from '../../models/elements/SpecificElements';
import { RenderContext } from '../CanvasRenderer';
import { BorderStyle } from '../../models/elements/BaseElement';
import { UnitConverter } from '../../../utils/units';

/**
 * LineRenderer: Desenha divisores táteis com suporte a estilos industriais (Task 90).
 */
export class LineRenderer implements IRenderer {
  render(element: LineElement, context: RenderContext): void {
    const { ctx, scale, dpi } = context;

    const x1 = element.position.x * scale;
    const y1 = element.position.y * scale;
    const x2 = element.endPosition.x * scale;
    const y2 = element.endPosition.y * scale;

    ctx.save();

    ctx.strokeStyle = element.color || '#000000';
    const lineWidth = UnitConverter.mmToPx(element.strokeWidth, dpi) * (scale / UnitConverter.mmToPx(1, dpi));
    ctx.lineWidth = lineWidth;

    // Estilo de linha (Task 90)
    if (element.style === BorderStyle.DASHED) {
      ctx.setLineDash([lineWidth * 4, lineWidth * 2]);
    } else if (element.style === BorderStyle.DOTTED) {
      ctx.setLineDash([lineWidth, lineWidth * 2]);
      ctx.lineCap = 'round';
    } else {
      ctx.setLineDash([]);
    }

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.restore();
  }
}
