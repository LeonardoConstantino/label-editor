import bwipjs from 'bwip-js';
import { IRenderer } from './IRenderer';
import { CodeElement } from '../../models/elements/SpecificElements';
import { RenderContext } from '../CanvasRenderer';
import { DataSourceParser } from '../DataSourceParser';
import { CodeValidator } from '../../../utils/CodeValidator';
import { logger } from '../../../core/Logger';

/**
 * CodeRenderer: Renderiza QR Codes e Barcodes de alta fidelidade (Task 58).
 * Utiliza bwip-js para geração e suporta interpolação de dados.
 * Agora com proteção contra dados inválidos e fallback visual (Task 58 Pro).
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

    // 2. Validação de dados (Proteção industrial)
    const isValid = CodeValidator.isValid(content, element.codeType);

    if (!isValid) {
      this.renderErrorPlaceholder(ctx, x, y, w, h, element.codeType);
      return;
    }

    // 3. Chave de Cache (evita regenerar se nada mudou)
    const cacheKey = `${element.codeType}|${content}|${element.color}|${element.backgroundColor}|${element.includeText}|${element.errorCorrection}|${w}|${h}`;
    
    let renderedCode = this.renderCache.get(cacheKey);

    if (!renderedCode) {
      const gen = this.generateCode(element, content);
      if (gen) {
        renderedCode = gen;
        this.renderCache.set(cacheKey, renderedCode);
      } else {
        // Se a lib bwip-js falhar internamente mesmo com validação, mostra erro
        this.renderErrorPlaceholder(ctx, x, y, w, h, element.codeType);
        return;
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
      ctx.drawImage(renderedCode as any, x, y, w, h);
      ctx.restore();
    }
  }

  /**
   * Renderiza um placeholder elegante de erro caso os dados sejam inválidos.
   */
  private renderErrorPlaceholder(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    x: number, y: number, w: number, h: number,
    type: string
  ) {
    ctx.save();
    // Fundo cinza tátil
    ctx.fillStyle = '#1a1d24';
    ctx.strokeStyle = '#f43f5e'; // Danger neon
    ctx.lineWidth = 2;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);

    // Linhas cruzadas de "erro"
    ctx.beginPath();
    ctx.moveTo(x, y); ctx.lineTo(x + w, y + h);
    ctx.moveTo(x + w, y); ctx.lineTo(x, y + h);
    ctx.stroke();

    // Texto de aviso
    ctx.fillStyle = '#f43f5e';
    ctx.font = `bold ${Math.max(8, w/10)}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('INVALID DATA', x + w/2, y + h/2);
    ctx.font = `${Math.max(6, w/15)}px monospace`;
    ctx.fillText(type.toUpperCase(), x + w/2, y + h/2 + (w/10));
    ctx.restore();
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
      logger.error('CodeRenderer', 'CodeRenderer Error (bwip-js):', err);
      return null;
    }
  }
}
