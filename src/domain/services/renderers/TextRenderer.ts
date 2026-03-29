import { IRenderer } from './IRenderer';
import { TextElement } from '../../models/elements/SpecificElements';
import { RenderContext } from '../CanvasRenderer';
import { DataSourceParser } from '../DataSourceParser';

// Declaração global para o canvas-txt carregado via CDN
declare const canvasTxt: any;

/**
 * TextRenderer: Utiliza a biblioteca canvas-txt para renderização profissional de texto.
 * Corrigido para API v4 (ctx, text, config).
 */
export class TextRenderer implements IRenderer {
  render(element: TextElement, context: RenderContext): void {
    const { ctx, scale, data } = context;

    const x = element.position.x * scale;
    const y = element.position.y * scale;
    const width = element.dimensions.width * scale;
    const height = element.dimensions.height * scale;

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
        fontSize: element.fontSize * (scale / 3.78), // Conversão pt -> px
        fontFamily: element.fontFamily || 'sans-serif',
        fontWeight: element.fontWeight || 'normal',
        align: element.textAlign || 'center',
        vAlign: 'middle',
        justify: false,
        debug: false // Defina como true se precisar ver a bounding box
      });
    } else {
      // Fallback robusto caso a lib falhe
      const fontSize = element.fontSize * (scale / 3.78);
      ctx.font = `${element.fontWeight || 'normal'} ${fontSize}px ${element.fontFamily || 'sans-serif'}`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = element.textAlign as CanvasTextAlign;
      ctx.fillText(content, x + width / 2, y + height / 2);
    }

    ctx.restore();
  }
}
