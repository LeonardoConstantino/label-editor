// scripts/curate-icons.mjs
// Filtra os SVGs do Lucide por categorias relevantes para etiquetas genéricas.
// Uso: node scripts/curate-icons.mjs
// Saída: scripts/vendor/lucide-curated/ com apenas os SVGs selecionados

import { readdir, copyFile, mkdir } from 'node:fs/promises';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, 'vendor/lucide');
const DEST = join(__dirname, 'vendor/lucide-curated');

// ─── Categorias e palavras-chave semânticas ───────────────────────────────────
// Edite à vontade para incluir ou excluir grupos.
const CATEGORIES = {
  alertas: [
    'alert',
    'warning',
    'danger',
    'caution',
    'ban',
    'x-circle',
    'skull',
    'flame',
    'zap',
    'radiation',
    'biohazard',
  ],
  setas: [
    'arrow',
    'chevron',
    'corner',
    'move',
    'redirect',
    'return',
    'undo',
    'redo',
  ],
  comunicacao: ['mail', 'phone', 'message', 'chat', 'send', 'inbox', 'contact'],
  comercio: [
    'tag',
    'barcode',
    'qr-code',
    'receipt',
    'cart',
    'bag',
    'store',
    'shop',
    'price',
    'percent',
    'discount',
    'gift',
  ],
  logistica: [
    'package',
    'box',
    'truck',
    'ship',
    'plane',
    'train',
    'warehouse',
    'container',
    'weight',
    'scale',
    'ruler',
  ],
  identificacao: ['user', 'badge', 'id', 'fingerprint', 'scan', 'shield'],
  localização: [
    'map',
    'pin',
    'location',
    'navigation',
    'compass',
    'globe',
    'home',
    'building',
  ],
  tempo: ['clock', 'timer', 'calendar', 'hourglass', 'watch', 'alarm'],
  arquivo: [
    'file',
    'folder',
    'document',
    'clipboard',
    'printer',
    'download',
    'upload',
    'save',
    'copy',
    'pdf',
  ],
  midia: ['image', 'camera', 'photo', 'video', 'film', 'music', 'volume'],
  natureza: [
    'leaf',
    'tree',
    'sun',
    'moon',
    'cloud',
    'snowflake',
    'wind',
    'drop',
    'recycle',
  ],
  simbolos: [
    'star',
    'heart',
    'check',
    'circle',
    'square',
    'triangle',
    'plus',
    'minus',
    'hash',
    'at-sign',
    'infinity',
  ],
  tecnologia: [
    'cpu',
    'wifi',
    'bluetooth',
    'battery',
    'plug',
    'monitor',
    'smartphone',
    'laptop',
    'server',
    'database',
  ],
  industria: [
    'factory',
    'cog',
    'settings',
    'tool',
    'wrench',
    'hammer',
    'bolt',
    'nut',
    'circuit',
  ],
  saude: [
    'heart-pulse',
    'pill',
    'syringe',
    'stethoscope',
    'thermometer',
    'cross',
    'ambulance',
    'hospital',
  ],
  alimentacao: [
    'apple',
    'coffee',
    'pizza',
    'utensils',
    'beer',
    'wine',
    'cake',
    'egg',
    'carrot',
  ],
};

// ─── Monta Set com todos os termos para lookup O(1) ─────────────────────────
const ALL_TERMS = new Set(Object.values(CATEGORIES).flat());

function isRelevant(filename) {
  // Checa se algum termo é substring do nome do arquivo
  for (const term of ALL_TERMS) {
    if (filename.includes(term)) return true;
  }
  return false;
}

async function main() {
  await mkdir(DEST, { recursive: true });

  const files = await readdir(SRC);
  const svgs = files.filter((f) => f.endsWith('.svg'));

  let copied = 0;
  for (const file of svgs) {
    const key = basename(file, '.svg');
    if (isRelevant(key)) {
      await copyFile(join(SRC, file), join(DEST, file));
      copied++;
    }
  }

  const skipped = svgs.length - copied;
  console.log(`Total:     ${svgs.length}`);
  console.log(`Copiados:  ${copied}`);
  console.log(`Ignorados: ${skipped}`);
  console.log(`Saída:     ${DEST}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
