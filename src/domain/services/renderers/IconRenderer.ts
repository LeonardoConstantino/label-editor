import { IRenderer } from './IRenderer';
import { IconElement } from '../../models/elements/SpecificElements';
import { RenderContext } from './renderer-types';
import { DataSourceParser } from '../DataSourceParser';
import { getIcon } from '../../../constants/icons';

/**
 * IconRenderer: Renderizador vetorial nativo de símbolos e ícones (Task 100).
 * Opera via Path2D com interpolação de lote e 100% de paridade no BatchWorker.
 */
export class IconRenderer implements IRenderer {
  private readonly pathCache: Map<string, Path2D[]> = new Map();

  public render(element: IconElement, context: RenderContext): void {
    const { ctx, scale, data } = context;

    // 1. Interpolação de variáveis dinâmicas de lote (Task 100 / Task 58 standard)
    let iconKey = element.iconName || '';
    if (data && iconKey.includes('{{')) {
      iconKey = DataSourceParser.interpolate(iconKey, data, context.context);
    }

    if (!iconKey || iconKey.includes('{{')) return;

    // 2. Busca da definição no catálogo indexado
    const iconDef = getIcon(iconKey.trim());
    if (!iconDef || !iconDef.paths || iconDef.paths.length === 0) return;

    const x = element.position.x * scale;
    const y = element.position.y * scale;
    const w = element.dimensions.width * scale;
    const h = element.dimensions.height * scale;

    const [vx, vy, vw, vh] = iconDef.viewBox;
    if (vw <= 0 || vh <= 0) return;

    // 3. Cache de instâncias Path2D
    let paths = this.pathCache.get(iconKey);
    if (!paths) {
      paths = iconDef.paths.map((d) => new Path2D(d));
      this.pathCache.set(iconKey, paths);
    }

    ctx.save();

    // 4. Transformação afim para posicionar e escalar o viewBox nas dimensões do elemento
    ctx.translate(x, y);
    ctx.scale(w / vw, h / vh);
    ctx.translate(-vx, -vy);

    // 5. Renderização vetorial (stroke ou fill)
    const color = element.color || '#000000';

    if (iconDef.stroke) {
      const strokeWidth = element.strokeWidth !== undefined ? element.strokeWidth : 2;
      // Compensa a escala para manter o strokeWidth visualmente consistente em relação ao viewBox
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth * (vw / Math.max(w, 1));
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (let i = 0; i < paths.length; i++) {
        ctx.stroke(paths[i]);
      }
    } else {
      ctx.fillStyle = color;
      for (let i = 0; i < paths.length; i++) {
        ctx.fill(paths[i]);
      }
    }

    ctx.restore();
  }
}
