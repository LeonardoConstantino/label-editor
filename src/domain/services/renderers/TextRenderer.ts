import { CanvasTextConfig, drawText } from 'canvas-txt';
import { IRenderer } from './IRenderer';
import { TextElement } from '../../models/elements/SpecificElements';
import { TextOverflow } from '../../models/elements/BaseElement';
import { RenderContext } from '../CanvasRenderer';
import { DataSourceParser } from '../DataSourceParser';
import { UnitConverter } from '../../../utils/units';

/**
 * TextRenderer: Utiliza a biblioteca canvas-txt para renderização profissional de texto.
 * Suporta alinhamento vertical, múltiplos modos de overflow e tipografia avançada (Task 44).
 */
export class TextRenderer implements IRenderer {
  // Canvas offline compartilhado para medições de performance
  private static offscreenCanvas: HTMLCanvasElement | null = null;

  render(element: TextElement, context: RenderContext): void {
    const { ctx, scale, dpi, data } = context;

    // Coordenadas e dimensões em pixels internos
    const x = element.position.x * scale;
    const y = element.position.y * scale;
    const width = element.dimensions.width * scale;
    const height = element.dimensions.height * scale;

    // Fator de escala para fontes (mm -> px -> previewScale)
    const previewScale = scale / UnitConverter.mmToPx(1, dpi);
    let fontSizePx = UnitConverter.ptToPx(element.fontSize, dpi) * previewScale;

    // Interpolação de variáveis
    let content = element.content || '';
    if (data) {
      content = DataSourceParser.interpolate(content, data);
    }

    ctx.save();
    ctx.fillStyle = element.color || '#000000';

    if (typeof drawText === 'function') {
      const commonProps = {
        font: element.fontFamily || 'Inter, sans-serif',
        fontWeight: String(element.fontWeight || '400'),
        fontStyle: element.fontStyle || 'normal',
        lineHeight: (element.lineHeight || 1.2),
        justify: !!element.justify
      };

      // 1. Lógica de SCALE: Calcula o tamanho ideal usando canvas offline
      if (element.overflow === TextOverflow.SCALE) {
        fontSizePx = this.calculateFontSize(content, {
          width,
          height,
          ...commonProps
        });
      }

      // 2. Lógica de ELLIPSIS manual (visto que a lib não suporta)
      // Se não for WRAP nem SCALE, e for ELLIPSIS, tentamos truncar a string
      if (element.overflow === TextOverflow.ELLIPSIS) {
        content = this.applyEllipsis(content, {
          width,
          height,
          fontSize: fontSizePx,
          ...commonProps
        });
      }

      const config: CanvasTextConfig = {
        x,
        y,
        width,
        height,
        fontSize: fontSizePx,
        align: element.textAlign || 'center',
        vAlign: element.verticalAlign || 'middle',
        debug: false,
        ...commonProps,
        lineHeight: commonProps.lineHeight * fontSizePx
      };

      // 3. Lógica de CLIP: Aplicamos a máscara no contexto real
      if (element.overflow === TextOverflow.CLIP || element.overflow === TextOverflow.ELLIPSIS) {
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.clip();
      }

      drawText(ctx, content, config);
    } else {
      // Fallback robusto
      ctx.font = `${element.fontStyle || ''} ${element.fontWeight || 400} ${fontSizePx}px ${element.fontFamily || 'sans-serif'}`;
      ctx.textBaseline = this.mapVAlignToBaseline(element.verticalAlign);
      ctx.textAlign = element.textAlign as CanvasTextAlign;
      
      let drawX = x;
      let drawY = y;

      if (element.textAlign === 'center') drawX += width / 2;
      else if (element.textAlign === 'right') drawX += width;

      if (element.verticalAlign === 'middle') drawY += height / 2;
      else if (element.verticalAlign === 'bottom') drawY += height;

      ctx.fillText(content, drawX, drawY);
    }

    ctx.restore();
  }

  /**
   * Obtém ou cria o canvas offline para medições sem poluir o canvas principal.
   */
  private getOffscreenContext(): CanvasRenderingContext2D {
    if (!TextRenderer.offscreenCanvas) {
      TextRenderer.offscreenCanvas = document.createElement('canvas');
    }
    return TextRenderer.offscreenCanvas.getContext('2d', { willReadFrequently: true })!;
  }

  /**
   * Calcula o tamanho ideal da fonte para caber na caixa usando um canvas fantasma.
   */
  private calculateFontSize(
    text: string, 
    options: { width: number, height: number, font: string, fontWeight: string, lineHeight: number, justify: boolean, fontStyle: string }
  ): number {
    const { width, height, font, fontWeight, lineHeight, justify, fontStyle } = options;
    const dummyCtx = this.getOffscreenContext();
    
    let minFontSize = 6;  
    let maxFontSize = 500; 
    let iterations = 0;

    while (minFontSize <= maxFontSize && iterations < 50) {
      const fontSize = (minFontSize + maxFontSize) / 2;
      
      // Medimos no dummyCtx (não polui o canvas principal)
      const result = drawText(dummyCtx, text, {
        x: 0, y: 0, width, height, 
        fontSize, font, fontWeight, fontStyle,
        lineHeight: lineHeight * fontSize,
        justify,
      } as any);

      if (result.height > height) {
        maxFontSize = fontSize - 0.1;
      } else {
        minFontSize = fontSize + 0.1;
      }
      iterations++;
    }

    return Math.floor(maxFontSize);
  }

  /**
   * Trunca o texto com "..." se ele transbordar a caixa.
   */
  private applyEllipsis(
    text: string, 
    options: { width: number, height: number, fontSize: number, font: string, fontWeight: string, lineHeight: number, justify: boolean, fontStyle: string }
  ): string {
    const dummyCtx = this.getOffscreenContext();
    const { width, height, fontSize, font, fontWeight, lineHeight, justify, fontStyle } = options;

    const testFit = (t: string) => drawText(dummyCtx, t, {
      x: 0, y: 0, width, height, 
      fontSize, font, fontWeight, fontStyle,
      lineHeight: lineHeight * fontSize,
      justify,
    } as any);

    let result = testFit(text);
    if (result.height <= height) return text;

    // Se não coube, vamos diminuindo a string até caber com "..."
    let currentText = text;
    while (currentText.length > 0) {
      currentText = currentText.slice(0, -1);
      const truncated = currentText + '...';
      result = testFit(truncated);
      if (result.height <= height) return truncated;
    }

    return '...';
  }

  private mapVAlignToBaseline(vAlign: string): CanvasTextBaseline {
    switch (vAlign) {
      case 'top': return 'top';
      case 'bottom': return 'bottom';
      default: return 'middle';
    }
  }
}
