import { IRenderer } from './IRenderer';
import { TextElement } from '../../models/elements/SpecificElements';
import { RenderContext } from '../CanvasRenderer';
import { DataSourceParser } from '../DataSourceParser';
import { UnitConverter } from '../../../utils/units';

// Declaração global para o canvas-txt carregado via CDN
declare const canvasTxt: any;

/**
 * TextRenderer: Utiliza a biblioteca canvas-txt para renderização profissional de texto.
 * Utiliza o UnitConverter para precisão tipográfica.
 */
export class TextRenderer implements IRenderer {
  render(element: TextElement, context: RenderContext): void {
    const { ctx, scale, dpi, data } = context;

    // Coordenadas e dimensões em pixels (já escaladas pelo previewScale no context.scale)
    const x = element.position.x * scale;
    const y = element.position.y * scale;
    const width = element.dimensions.width * scale;
    const height = element.dimensions.height * scale;

    // Fator de escala do preview para fontes
    const previewScale = scale / UnitConverter.mmToPx(1, dpi);
    const fontSizePx = UnitConverter.ptToPx(element.fontSize, dpi) * previewScale;

    // Interpolação de variáveis usando o DataSourceParser unificado
    let content = element.content || '';
    if (data) {
      content = DataSourceParser.interpolate(content, data);
    }

    ctx.save();
    
    // Configuração do estilo de preenchimento
    ctx.fillStyle = element.color || '#000000';

    if (typeof canvasTxt !== 'undefined') {
      // API v4: ctx, text, config object
      canvasTxt.drawText(ctx, content, {
        x,
        y,
        width,
        height,
        fontSize: fontSizePx,
        fontFamily: element.fontFamily || 'sans-serif',
        fontWeight: element.fontWeight || 'normal',
        align: element.textAlign || 'center',
        vAlign: 'middle',
        justify: false,
        debug: false
      });
    } else {
      // Fallback robusto caso a lib falhe
      ctx.font = `${element.fontWeight || 'normal'} ${fontSizePx}px ${element.fontFamily || 'sans-serif'}`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = element.textAlign as CanvasTextAlign;
      ctx.fillText(content, x + width / 2, y + height / 2);
    }

    ctx.restore();
  }
}
