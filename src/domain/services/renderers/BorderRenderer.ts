import { IRenderer } from './IRenderer';
import { BorderElement } from '../../models/elements/SpecificElements';
import { RenderContext } from '../CanvasRenderer';
import { BorderStyle } from '../../models/elements/BaseElement';
import { UnitConverter } from '../../../utils/units';

/**
 * BorderRenderer: Desenha uma moldura técnica ao redor da etiqueta.
 * Suporta estilos profissionais: solid, dashed, dotted e double.
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

    if (w <= 0 || h <= 0) return;

    ctx.save();
    
    ctx.strokeStyle = element.color || '#000000';
    const lineWidth = UnitConverter.mmToPx(element.width, dpi) * (scale / UnitConverter.mmToPx(1, dpi));
    ctx.lineWidth = lineWidth;

    // Estilo de linha
    if (element.style === BorderStyle.DASHED) {
      ctx.setLineDash([lineWidth * 4, lineWidth * 2]);
    } else if (element.style === BorderStyle.DOTTED) {
      ctx.setLineDash([lineWidth, lineWidth * 2]);
      ctx.lineCap = 'round';
    } else {
      ctx.setLineDash([]);
    }

    if (element.style === BorderStyle.DOUBLE) {
      /**
       * Para o estilo DOUBLE (concéntrico):
       * A linha de referência (element.radius) deve ficar no meio do par de linhas.
       * Ri = Re - Espaçamento
       */
      const gap = lineWidth * 1.5; // Espaçamento entre as linhas proporcional à espessura
      
      // Borda Externa (Re = R + gap/2)
      const outerOffset = gap / 2;
      this.drawRoundedRect(
        ctx, 
        x - outerOffset, y - outerOffset, 
        w + outerOffset * 2, h + outerOffset * 2, 
        element.radius + outerOffset / scale, // Passamos em mm para o helper escalar
        scale
      );

      // Borda Interna (Ri = R - gap/2)
      const innerOffset = gap / 2;
      this.drawRoundedRect(
        ctx, 
        x + innerOffset, y + innerOffset, 
        w - innerOffset * 2, h - innerOffset * 2, 
        Math.max(0, element.radius - innerOffset / scale), 
        scale
      );
    } else {
      this.drawRoundedRect(ctx, x, y, w, h, element.radius, scale);
    }

    ctx.restore();
  }

  /**
   * Helper para desenhar retângulo arredondado (Stroke)
   */
  private drawRoundedRect(
    ctx: CanvasRenderingContext2D, 
    x: number, y: number, 
    w: number, h: number, 
    radiusMM: number, 
    scale: number
  ): void {
    const radiusPx = radiusMM * scale;
    
    if (radiusPx <= 0) {
      ctx.strokeRect(x, y, w, h);
      return;
    }

    // Garante que o raio não exceda metade das dimensões
    const r = Math.min(radiusPx, w / 2, h / 2);

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
  }
}
