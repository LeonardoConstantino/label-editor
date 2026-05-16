import bwipjs from 'bwip-js';
import { IRenderer } from './IRenderer';
import { CodeElement } from '../../models/elements/SpecificElements';
import { RenderContext } from '../CanvasRenderer';
import { DataSourceParser } from '../DataSourceParser';

/**
 * CodeRenderer: Renderiza QR Codes e Barcodes de alta fidelidade (Task 58).
 * Utiliza bwip-js para geração e suporta interpolação de dados.
 */
export class CodeRenderer implements IRenderer {
  private renderCache: Map<string, HTMLCanvasElement | OffscreenCanvas> = new Map();

  render(element: CodeElement, context: RenderContext): void {
    const { ctx, scale, data } = context;

    // 1. Interpolação de conteúdo
    let content = element.content || '';
    if (data) {
      content = DataSourceParser.interpolate(content, data, context.context);
    }

    if (!content) return;

    const x = element.position.x * scale;
    const y = element.position.y * scale;
    const w = element.dimensions.width * scale;
    const h = element.dimensions.height * scale;

    // 2. Chave de Cache (evita regenerar se nada mudou)
    const cacheKey = `${element.codeType}|${content}|${element.color}|${element.backgroundColor}|${element.includeText}|${element.errorCorrection}|${w}|${h}`;
    
    let renderedCode = this.renderCache.get(cacheKey);

    if (!renderedCode) {
      const gen = this.generateCode(element, content);
      if (gen) {
        renderedCode = gen;
        this.renderCache.set(cacheKey, renderedCode);
      }
    }

    if (renderedCode) {
      ctx.save();
      // Aplica rotação se houver
      if (element.rotation) {
        const cx = x + w / 2;
        const cy = y + h / 2;
        ctx.translate(cx, cy);
        ctx.rotate((element.rotation * Math.PI) / 180);
        ctx.translate(-cx, -cy);
      }

      ctx.globalAlpha = element.opacity ?? 1;
      // Note: drawImage aceita HTMLCanvasElement ou OffscreenCanvas
      ctx.drawImage(renderedCode as any, x, y, w, h);
      ctx.restore();
    }
  }

  /**
   * Gera o código usando bwip-js.
   */
  private generateCode(
    element: CodeElement, 
    content: string
  ): HTMLCanvasElement | OffscreenCanvas | null {
    try {
      let canvas: any;
      if (typeof document !== 'undefined') {
        canvas = document.createElement('canvas');
      } else {
        canvas = new OffscreenCanvas(1, 1);
      }
      
      // Mapeamento de nomes bwip-js
      const bcid = element.codeType === 'qrcode' ? 'qrcode' : element.codeType;
      
      const options: any = {
        bcid,
        text: content,
        scale: 2,
        height: 10,
        includetext: element.includeText,
        textxalign: 'center',
        barcolor: element.color.replace('#', ''),
        backgroundcolor: element.backgroundColor === 'transparent' ? undefined : element.backgroundColor.replace('#', ''),
      };

      if (element.codeType === 'qrcode') {
        options.eclevel = element.errorCorrection;
      }

      bwipjs.toCanvas(canvas, options);

      return canvas;
    } catch (err) {
      console.error('CodeRenderer Error:', err);
      return null;
    }
  }
}
