import { ICON_REGISTRY, IconDefinition } from '../../constants/icons';
import { DataSourceParser } from './DataSourceParser';
import { RenderContext } from './renderers/renderer-types';

const ICON_SCHEME = 'icon:';
const dataUrlCache = new Map<string, string>();

export function isVendorIcon(src: string): boolean {
  return typeof src === 'string' && src.startsWith(ICON_SCHEME);
}

export function extractIconName(src: string): string | null {
  return isVendorIcon(src) ? src.slice(ICON_SCHEME.length) : null;
}

export function makeVendorRef(iconKey: string): string {
  return ICON_SCHEME + iconKey;
}

function buildSvgDataUrl(def: IconDefinition, color = '#000000'): string {
  const [vx, vy, vw, vh] = def.viewBox;
  const body = def.paths
    .map((d) =>
      def.stroke
        ? `<path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
        : `<path d="${d}" fill="${color}"/>`,
    )
    .join('');
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vx} ${vy} ${vw} ${vh}" ` +
    `width="${vw}" height="${vh}">${body}</svg>`;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

/**
 * Converte um src de Asset (persistido) em um src renderizável.
 * - 'icon:<key>' → data URL do ICON_REGISTRY (cacheado)
 * - qualquer outro → devolvido inalterado (data URL, blob, http)
 */
export function resolveAssetSrc(src: string): string {
  if (!isVendorIcon(src)) return src;

  const key = src.slice(ICON_SCHEME.length);
  const cached = dataUrlCache.get(key);
  if (cached) return cached;

  const def = ICON_REGISTRY[key];
  if (!def) return '';

  const dataUrl = buildSvgDataUrl(def);
  dataUrlCache.set(key, dataUrl);
  return dataUrl;
}

export function getAssetDisplayName(src: string): string {
  const key = extractIconName(src);
  if (!key) return src;
  return ICON_REGISTRY[key]?.name ?? key;
}

/**
 * Pré-carrega imagens resolvidas em um cache compartilhado (RenderContext.images).
 * Nunca rejeita — falha silenciosa para um asset não travar o render.
 */
export function preloadAssets(
  srcs: string[],
  cache: Map<string, HTMLImageElement | ImageBitmap>
): Promise<void> {
  const tasks: Promise<void>[] = [];

  for (const raw of srcs) {
    const resolved = resolveAssetSrc(raw);
    if (!resolved || cache.has(resolved)) continue;

    if (typeof Image !== 'undefined') {
      // Main thread
      tasks.push(new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => { cache.set(resolved, img); resolve(); };
        img.onerror = () => resolve();
        img.src = resolved;
      }));
    } else if (
      typeof fetch !== 'undefined' &&
      typeof createImageBitmap !== 'undefined'
    ) {
      // Worker
      tasks.push(
        fetch(resolved)
          .then((r) => r.blob())
          .then((blob) => createImageBitmap(blob))
          .then((bitmap) => { cache.set(resolved, bitmap); })
          .catch(() => undefined)
      );
    }
  }

  return Promise.all(tasks).then(() => undefined);
}

/**
 * resolveElementSrc: pipeline canônico de resolução de `src`.
 *   1. Interpola {{tags}} usando data + context
 *   2. Resolve o scheme `icon:` para data URL
 *
 * Se alguma tag permanecer não resolvida ({{...}}), retorna ''
 * para o renderer pular o desenho em vez de exibir texto bruto.
 */
export function resolveElementSrc(
  rawSrc: string,
  ctx: Pick<RenderContext, 'data' | 'context'>
): string {
  if (!rawSrc) return '';

  const interpolated = DataSourceParser.interpolate(
    rawSrc,
    (ctx.data as Record<string, unknown>) ?? {},
    (ctx.context as Record<string, unknown>) ?? {}
  );

  // Tag não resolvida → src inválido. Devolve '' para não renderizar lixo.
  if (interpolated.includes('{{')) return '';

  return resolveAssetSrc(interpolated);
}

/**
 * Atalho para saber se um src depende de dados (útil para forçar
 * re-render quando o registro atual muda).
 */
export function hasDynamicSrc(rawSrc: string): boolean {
  return typeof rawSrc === 'string' && rawSrc.includes('{{');
}