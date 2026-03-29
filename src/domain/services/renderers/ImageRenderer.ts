import { IRenderer } from './IRenderer';
import { ImageElement } from '../../models/elements/SpecificElements';
import { RenderContext } from '../CanvasRenderer';

/**
 * ImageRenderer: Renderiza imagens otimizadas no canvas.
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
      this.drawImageScaled(ctx, img, x, y, w, h, element.fit);
    } else {
      img.onload = () => {
        // Força um redraw global quando a imagem carregar
        context.ctx.drawImage(img!, x, y, w, h);
      };
    }
  }

  private drawImageScaled(
    ctx: CanvasRenderingContext2D, 
    img: HTMLImageElement, 
    x: number, y: number, w: number, h: number, 
    fit: string
  ): void {
    if (fit === 'fill') {
      ctx.drawImage(img, x, y, w, h);
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
    }

    ctx.drawImage(img, x + offsetX, y + offsetY, renderW, renderH);
  }
}
