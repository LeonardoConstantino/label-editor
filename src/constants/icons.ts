import { ICON_REGISTRY, ICON_TOKEN_INDEX, IconDefinition } from './icons.generated';

export type { IconDefinition };
export { ICON_REGISTRY, ICON_TOKEN_INDEX };

export const DEFAULT_ICON_NAME = 'alert-triangle';

export const ICON_SYNONYMS: Record<string, string[]> = {
  caixa: ['box', 'package', 'archive', 'container'],
  perigo: ['danger', 'hazard', 'alert', 'warning', 'biohazard'],
  alerta: ['alert', 'warning', 'bell'],
  seguranca: ['safety', 'shield', 'lock'],
  lixo: ['trash', 'delete', 'recycle'],
  reciclagem: ['recycle', 'leaf'],
  fogo: ['flame', 'fire'],
  etiqueta: ['tag', 'barcode', 'label'],
  codigo: ['code', 'barcode', 'qr-code'],
  loja: ['store', 'shop', 'cart', 'bag'],
  carrinho: ['cart', 'shopping-cart'],
  aviao: ['plane'],
  caminhao: ['truck'],
  navio: ['ship'],
  trem: ['train'],
  casa: ['home', 'house'],
  usuario: ['user', 'users'],
  configuracao: ['settings', 'gear', 'sliders'],
  busca: ['search', 'find'],
  ajuda: ['help', 'info', 'question']
};

export function getIcon(name: string): IconDefinition | undefined {
  return ICON_REGISTRY[name];
}

/**
 * Busca por nome, chave ou tags semânticas com complexidade O(tokens).
 * Case-insensitive e com suporte a sinônimos comuns.
 */
export function searchIcons(query: string): Array<[string, IconDefinition]> {
  const q = query.trim().toLowerCase();
  if (!q) return Object.entries(ICON_REGISTRY);

  const searchTerms = new Set<string>([q]);
  if (ICON_SYNONYMS[q]) {
    for (const syn of ICON_SYNONYMS[q]) {
      searchTerms.add(syn);
    }
  }

  const terms = Array.from(searchTerms);
  const matched = new Set<string>();

  for (const [token, keys] of Object.entries(ICON_TOKEN_INDEX)) {
    for (let i = 0; i < terms.length; i++) {
      if (token.includes(terms[i])) {
        for (let j = 0; j < keys.length; j++) {
          matched.add(keys[j]);
        }
        break;
      }
    }
  }

  const results: Array<[string, IconDefinition]> = [];
  for (const key of matched) {
    const def = ICON_REGISTRY[key];
    if (def) {
      results.push([key, def]);
    }
  }

  return results;
}
