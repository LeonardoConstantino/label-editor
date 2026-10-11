#!/usr/bin/env node
/**
 * Lê SVGs de um diretório + JSON custom e gera src/constants/icons.generated.ts.
 * Uso: node scripts/generate-icons.mjs [diretório-de-svgs]
 *      node scripts/generate-icons.mjs node_modules/lucide-static/icons
 */
import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const SVG_DIR = process.argv[2] || join(ROOT, 'scripts/vendor/lucide');
const CUSTOM_FILE = join(ROOT, 'scripts/vendor/icons-custom.json');
const OUTPUT = join(ROOT, 'src/constants/icons.generated.ts');

const NUM = (v) => (v === undefined ? 0 : parseFloat(v));

function parseAttrs(str) {
  const attrs = {};
  const re = /([\w:-]+)\s*=\s*["']([^"']*)["']/g;
  let m;
  while ((m = re.exec(str))) attrs[m[1]] = m[2];
  return attrs;
}

function elementToPath(tag, a) {
  switch (tag) {
    case 'path':
      return a.d;
    case 'line':
      return `M ${NUM(a.x1)} ${NUM(a.y1)} L ${NUM(a.x2)} ${NUM(a.y2)}`;
    case 'polyline':
    case 'polygon': {
      const pts = (a.points || '')
        .trim()
        .split(/[\s,]+/)
        .map(Number);
      if (pts.length < 4) return null;
      let d = `M ${pts[0]} ${pts[1]}`;
      for (let i = 2; i < pts.length; i += 2) d += ` L ${pts[i]} ${pts[i + 1]}`;
      return tag === 'polygon' ? d + ' Z' : d;
    }
    case 'circle': {
      const cx = NUM(a.cx),
        cy = NUM(a.cy),
        r = NUM(a.r);
      return `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${r * 2} 0 a ${r} ${r} 0 1 0 ${-r * 2} 0`;
    }
    case 'ellipse': {
      const cx = NUM(a.cx),
        cy = NUM(a.cy),
        rx = NUM(a.rx),
        ry = NUM(a.ry);
      return `M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`;
    }
    case 'rect': {
      const x = NUM(a.x),
        y = NUM(a.y),
        w = NUM(a.width),
        h = NUM(a.height);
      return `M ${x} ${y} h ${w} v ${h} h ${-w} z`;
    }
    default:
      return null;
  }
}

function parseSvg(svg) {
  const svgTag = svg.match(/<svg\b([^>]*)>/)?.[1] || '';
  const svgAttrs = parseAttrs(svgTag);
  const viewBox = svgAttrs.viewBox
    ? svgAttrs.viewBox.trim().split(/\s+/).map(Number)
    : [0, 0, 24, 24];
  const stroke = svgAttrs.stroke === 'currentColor' || svgAttrs.fill === 'none';

  const paths = [];
  const re = /<(path|line|polyline|polygon|circle|ellipse|rect)\b([^>]*?)\/?>/g;
  let m;
  while ((m = re.exec(svg))) {
    const d = elementToPath(m[1], parseAttrs(m[2]));
    if (d) paths.push(d.trim());
  }
  return { viewBox, paths, stroke };
}

function titleCase(kebab) {
  return kebab
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');
}

async function loadFromDir(dir) {
  const out = {};
  let files = [];
  try {
    files = await readdir(dir);
  } catch {
    return out;
  }
  for (const f of files) {
    if (!f.endsWith('.svg')) continue;
    const key = basename(f, '.svg');
    const svg = await readFile(join(dir, f), 'utf8');
    const parsed = parseSvg(svg);
    if (!parsed.paths.length) continue;
    out[key] = { name: titleCase(key), ...parsed };
  }
  return out;
}

async function loadCustom(file) {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch {
    return {};
  }
}

async function main() {
  console.log(`SVGs de: ${SVG_DIR}`);
  const base = await loadFromDir(SVG_DIR);
  const custom = await loadCustom(CUSTOM_FILE);
  const merged = { ...base, ...custom };
  const keys = Object.keys(merged).sort();

  console.log(
    `Total: ${keys.length} (${Object.keys(base).length} base + ${Object.keys(custom).length} custom)`,
  );

  // ── 1. Gera o registry linha a linha (evita JSON.stringify gigante em memória)
  const registryLines = keys.map(
    (k) => `  ${JSON.stringify(k)}: ${JSON.stringify(merged[k])}`,
  );

  // ── 2. Monta o índice invertido em build time
  //       token → chaves que o contêm (busca por substring exata em runtime)
  const tokenIndex = {};

  for (const key of keys) {
    const def = merged[key];
    const tokens = new Set([
      key,
      def.name.toLowerCase(),
      ...(def.tags ?? []).map((t) => t.toLowerCase()),
    ]);

    for (const token of tokens) {
      if (!tokenIndex[token]) tokenIndex[token] = [];
      tokenIndex[token].push(key);
    }
  }

  const body = `// GERADO AUTOMATICAMENTE — NÃO EDITAR À MÃO.
// Regerar: node scripts/generate-icons.mjs [diretório-de-svgs]

export interface IconDefinition {
  name: string;
  viewBox: [number, number, number, number];
  paths: string[];
  stroke?: boolean;
  tags?: string[];
}

export const ICON_REGISTRY: Record<string, IconDefinition> = {
${registryLines.join(',\n')}
};

// Índice invertido: token → chaves. Gerado em build time para busca O(tokens) em vez de O(22k).
export const ICON_TOKEN_INDEX: Record<string, string[]> = ${JSON.stringify(tokenIndex, null, 2)};
`;

  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, body);
  console.log(`Escrito: ${OUTPUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
