import { ICON_REGISTRY, ICON_TOKEN_INDEX,  IconDefinition } from './icons.generated';

export type { IconDefinition };
export { ICON_REGISTRY, ICON_TOKEN_INDEX };

export const DEFAULT_ICON_NAME = 'alert-triangle';

export function getIcon(name: string): IconDefinition | undefined {
  return ICON_REGISTRY[name];
}

/**
 * Busca por nome, chave ou tags. Case-insensitive.
 */
export function searchIcons(query: string): Array<[string, IconDefinition]> {
  const q = query.trim().toLowerCase();
  if (!q) return Object.entries(ICON_REGISTRY);

  // Filtra apenas tokens que contêm a query — muito menor que 22k iterações
  const matched = new Set<string>();
  for (const [token, keys] of Object.entries(ICON_TOKEN_INDEX)) {
    if (token.includes(q)) keys.forEach((k) => matched.add(k));
  }

  return [...matched].map((key) => [key, ICON_REGISTRY[key]]);
}
