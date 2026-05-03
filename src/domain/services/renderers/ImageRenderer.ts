import { IRenderer } from './IRenderer';
import { ImageElement } from '../../models/elements/SpecificElements';
import { RenderContext } from '../CanvasRenderer';

/**
 * ImageRenderer: Renderiza imagens otimizadas no canvas com suporte a Blending e Fit.
 */
export class ImageRenderer implements IRenderer {
  private imageCache: Map<string, HTMLImageElement> = new Map();

  render(element: ImageElement, context: RenderContext): void {
    if (!element.src) return;
    const { ctx, scale } = context;

    const x = element.position.x * scale;
    const y = element.position.y * scale;
    const w = element.dimensions.width * scale;
    const h = element.dimensions.height * scale;

    let img = this.imageCache.get(element.src);

    if (!img) {
      img = new Image();
      img.src = element.src;
      this.imageCache.set(element.src, img);
    }

    if (img.complete) {
      ctx.save();
      
      // 1. Aplica Blending Mode (Task 43)
      if (element.compositeOperation) {
        ctx.globalCompositeOperation = element.compositeOperation as GlobalCompositeOperation;
      }

      // 2. Aplica Suavização (Task 43)
      ctx.imageSmoothingEnabled = element.smoothing !== false;
      ctx.imageSmoothingQuality = 'high';

      // 3. Desenha com Fit
      this.drawImageScaled(ctx, img, x, y, w, h, element.fit);

      ctx.restore();
    } else {
      img.onload = () => {
        // Redraw ocorrerá no próximo frame da Store
      };
    }
  }

  private drawImageScaled(
    ctx: CanvasRenderingContext2D, 
    img: HTMLImageElement, 
    x: number, y: number, w: number, h: number, 
    fit: string
  ): void {
    // Limpa a região onde a imagem será desenhada
    ctx.clearRect(x, y, w, h);

    if (fit === 'fill') {
      ctx.drawImage(img, x, y, w, h);
      return;
    }

    if (fit === 'none') {
      ctx.drawImage(img, x, y);
      return;
    }

    const imgRatio = img.width / img.height;
    const containerRatio = w / h;
    let renderW = w;
    let renderH = h;
    let offsetX = 0;
    let offsetY = 0;

    if (fit === 'contain') {
      if (imgRatio > containerRatio) {
        renderH = w / imgRatio;
        offsetY = (h - renderH) / 2;
      } else {
        renderW = h * imgRatio;
        offsetX = (w - renderW) / 2;
      }
    } else if (fit === 'cover') {
      // No modo cover, recortamos a imagem para preencher a área sem distorcer
      let sw, sh, sx, sy;
      if (imgRatio > containerRatio) {
        sh = img.height;
        sw = img.height * containerRatio;
        sx = (img.width - sw) / 2;
        sy = 0;
      } else {
        sw = img.width;
        sh = img.width / containerRatio;
        sx = 0;
        sy = (img.height - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
      return;
    }

    ctx.drawImage(img, x + offsetX, y + offsetY, renderW, renderH);
  }
}
