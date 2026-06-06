import { CanvasTextConfig, drawText } from 'canvas-txt';
import { IRenderer } from './IRenderer';
import { TextElement } from '../../models/elements/SpecificElements';
import { TextOverflow } from '../../models/elements/BaseElement';
import { RenderContext } from './renderer-types';
import { DataSourceParser } from '../DataSourceParser';
import { UnitConverter } from '../../../utils/units';
import { DataSanitizer } from '../../../core/DataSanitizer';

/**
 * TextRenderer: Renderiza elementos de texto com suporte a Scale, Wrap e Variáveis.
 * Utiliza a biblioteca canvas-txt para quebra de linha profissional.
 * Otimizado para fontes customizadas e ambientes Worker (Task 83/85).
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
      content = DataSourceParser.interpolate(content, data, context.context);
    }

    // Task 38: Text Transform
    if (element.textTransform === 'uppercase') content = content.toUpperCase();
    if (element.textTransform === 'lowercase') content = content.toLowerCase();

    // Guardião de Performance (Task 87): Se o texto for absurdamente longo,
    // forçamos o truncamento imediato para evitar DoS no motor de quebra de linha.
    if (content.length > DataSanitizer.MAX_SAFE_TEXT_LENGTH) {
      content = content.substring(0, DataSanitizer.MAX_SAFE_TEXT_LENGTH) + '...';
    }

    ctx.save();
    ctx.fillStyle = element.color || '#000000';

    // Task 38: Letter Spacing (Tracking)
    // Converte mm para px
    const spacingPx = (element.letterSpacing || 0) * (dpi / 25.4);
    (ctx as any).letterSpacing = `${spacingPx}px`;

    const fontFamily = element.fontFamily || 'Inter';
    const quotedFont = fontFamily.includes(' ') ? `"${fontFamily}"` : fontFamily;

    if (typeof drawText === 'function') {
      const commonProps = {
        font: quotedFont,
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

      drawText(ctx as any, content, config);
    } else {
      // Fallback robusto
      ctx.font = `${element.fontStyle || ''} ${element.fontWeight || 400} ${fontSizePx}px ${quotedFont}, sans-serif`;
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
  private getOffscreenContext(): OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D {
    if (!TextRenderer.offscreenCanvas) {
      if (typeof document !== 'undefined') {
        TextRenderer.offscreenCanvas = document.createElement('canvas') as any;
      } else {
        // Fallback para Worker
        TextRenderer.offscreenCanvas = new OffscreenCanvas(1, 1) as any;
      }
    }
    return TextRenderer.offscreenCanvas!.getContext('2d', { willReadFrequently: true, alpha: true }) as any;
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

    const quotedFont = font.includes(' ') ? `"${font}"` : font;

    while (minFontSize <= maxFontSize && iterations < 50) {
      const fontSize = (minFontSize + maxFontSize) / 2;
      
      // Medimos no dummyCtx (não polui o canvas principal)
      const result = drawText(dummyCtx as any, text, {
        x: 0, y: 0, width, height, 
        fontSize, font: quotedFont, fontWeight, fontStyle,
        lineHeight: lineHeight * fontSize,
        justify,
        debug: false
      });

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
   * Otimizado com busca binária para evitar loops lineares lentos (Task 87).
   */
  private applyEllipsis(
    text: string, 
    options: { width: number, height: number, fontSize: number, font: string, fontWeight: string, lineHeight: number, justify: boolean, fontStyle: string }
  ): string {
    const dummyCtx = this.getOffscreenContext();
    const { width, height, fontSize, font, fontWeight, lineHeight, justify, fontStyle } = options;

    const testFit = (t: string) => drawText(dummyCtx as any, t, {
      x: 0, y: 0, width, height, 
      fontSize, font, fontWeight, fontStyle,
      lineHeight: lineHeight * fontSize,
      justify,
    } as any);

    let result = testFit(text);
    if (result.height <= height) return text;

    // Busca Binária pelo ponto de corte ideal
    let low = 0;
    let high = text.length;
    let bestTruncated = '...';

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const test = text.substring(0, mid) + '...';
      const res = testFit(test);

      if (res.height <= height) {
        bestTruncated = test;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return bestTruncated;
  }

  private mapVAlignToBaseline(vAlign: string): CanvasTextBaseline {
    switch (vAlign) {
      case 'top': return 'top';
      case 'bottom': return 'bottom';
      default: return 'middle';
    }
  }
}
