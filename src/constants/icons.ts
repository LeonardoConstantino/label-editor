import {
  ICON_REGISTRY,
  ICON_TOKEN_INDEX,
  IconDefinition,
} from './icons.generated';

export type { IconDefinition };
export { ICON_REGISTRY, ICON_TOKEN_INDEX };

export const DEFAULT_ICON_NAME = 'alert-triangle';

export const ICON_SYNONYMS: Record<string, string[]> = {
  // --- Original ---
  caixa: ['box', 'package', 'archive', 'container'],
  perigo: ['triangle-alert', 'circle-alert', 'zap', 'shield-alert'],
  alerta: ['bell', 'bell-ring', 'circle-alert', 'megaphone'],
  seguranca: ['shield', 'shield-check', 'lock', 'key-round'],
  lixo: ['trash', 'trash-2', 'delete'],
  reciclagem: ['refresh-cw', 'leaf', 'recycle'],
  fogo: ['flame', 'sparkles'],
  etiqueta: ['tag', 'tags', 'badge-dollar-sign'],
  codigo: ['code', 'braces', 'terminal', 'qr-code', 'barcode'],
  loja: ['store', 'shopping-bag', 'shopping-cart'],
  carrinho: ['shopping-cart', 'shopping-basket'],
  aviao: ['plane', 'send'],
  caminhao: ['truck'],
  navio: ['ship'],
  trem: ['train'],
  casa: ['house', 'home', 'layout-dashboard'],
  usuario: ['user', 'user-round', 'users', 'circle-user'],
  configuracao: ['settings', 'settings-2', 'sliders', 'wrench'],
  busca: ['search', 'zoom-in', 'scan'],
  ajuda: ['circle-help', 'info', 'book-open'],

  // --- Interface ---
  salvar: ['save', 'check', 'hard-drive'],
  editar: ['pencil', 'square-pen', 'file-text'],
  adicionar: ['plus', 'circle-plus', 'square-plus'],
  fechar: ['x', 'circle-x', 'square-x'],
  voltar: ['arrow-left', 'chevron-left', 'undo'],
  avancar: ['arrow-right', 'chevron-right', 'redo'],
  download: ['download', 'arrow-down-to-line', 'cloud-download'],
  upload: ['upload', 'arrow-up-from-line', 'cloud-upload'],
  compartilhar: ['share-2', 'external-link', 'forward'],
  link: ['link', 'link-2', 'paperclip'],
  remover: ['minus', 'circle-minus', 'square-minus'],
  copiar: ['copy', 'clipboard-copy', 'files'],
  colar: ['clipboard-paste', 'clipboard'],
  filtro: ['filter', 'funnel', 'list-filter', 'sliders-horizontal'],
  ordenar: ['arrow-up-down', 'arrow-down-a-z', 'arrow-up-narrow-wide'],
  menu: ['menu', 'ellipsis', 'ellipsis-vertical', 'layout-list'],
  atualizar: ['refresh-cw', 'rotate-cw', 'refresh-ccw'],
  desfazer: ['undo', 'undo-2', 'rotate-ccw'],
  refazer: ['redo', 'redo-2'],
  expandir: ['maximize', 'expand', 'chevrons-up-down'],
  recolher: ['minimize', 'shrink', 'chevrons-down-up'],
  imprimir: ['printer'],
  entrar: ['log-in'],
  sair: ['log-out', 'door-open'],
  fixar: ['pin', 'map-pin'],
  bloquear: ['lock', 'lock-keyhole', 'ban'],
  desbloquear: ['lock-open', 'key'],
  visivel: ['eye', 'scan-eye'],
  oculto: ['eye-off', 'eye-closed'],
  mais: ['plus', 'ellipsis'],
  grade: ['grid-3x3', 'layout-grid', 'table'],
  lista: ['list', 'list-checks', 'list-todo'],

  // --- Dados e Finanças ---
  dinheiro: ['dollar-sign', 'coins', 'hand-coins', 'wallet', 'credit-card'],
  grafico: ['chart-candlestick', 'chart-spline', 'trending-up', 'activity'],
  banco: ['landmark', 'building', 'vault'],
  calendario: ['calendar', 'calendar-days', 'clock'],
  arquivo: ['file', 'file-text', 'notebook', 'clipboard'],
  pasta: ['folder', 'folder-open', 'folder-archive'],
  relatorio: ['file-chart-column', 'chart-bar', 'chart-pie', 'clipboard-list'],
  tabela: ['table', 'table-2', 'sheet'],
  banco_dados: ['database', 'server', 'hard-drive'],
  pagamento: ['credit-card', 'banknote', 'receipt'],
  fatura: ['receipt', 'file-text', 'receipt-text'],
  desconto: ['percent', 'badge-percent', 'ticket-percent'],
  lucro: ['trending-up', 'piggy-bank', 'circle-dollar-sign'],
  prejuizo: ['trending-down', 'chart-no-axes-combined'],
  meta: ['target', 'flag', 'goal'],
  calculadora: ['calculator', 'sigma'],

  // --- Comunicação e Mídia ---
  email: ['mail', 'send', 'inbox'],
  mensagem: ['message-square', 'message-circle', 'messages-square'],
  telefone: ['phone', 'smartphone', 'phone-call'],
  imagem: ['image', 'camera', 'images'],
  video: ['video', 'play', 'clapperboard'],
  audio: ['volume-2', 'mic', 'music'],
  notificacao: ['bell', 'bell-dot', 'message-circle-warning'],
  comentario: ['message-square-text', 'message-square-more', 'quote'],
  microfone: ['mic', 'mic-off'],
  camera: ['camera', 'video', 'aperture'],
  musica: ['music', 'headphones', 'disc-3'],
  pausar: ['pause', 'circle-pause'],
  tocar: ['play', 'circle-play'],
  parar: ['square', 'circle-stop'],
  livro: ['book', 'book-open', 'library'],
  noticia: ['newspaper', 'rss', 'megaphone'],

  // --- Status e Feedback ---
  sucesso: ['circle-check', 'check', 'badge-check'],
  erro: ['circle-x', 'ban', 'shield-x'],
  favorito: ['star', 'heart', 'bookmark'],
  olhar: ['eye', 'eye-off', 'scan-eye'],
  aviso: ['triangle-alert', 'circle-alert', 'info'],
  informacao: ['info', 'badge-info'],
  carregando: ['loader', 'loader-circle', 'hourglass'],
  pendente: ['clock', 'hourglass', 'circle-dashed'],
  concluido: ['circle-check-big', 'check-check', 'square-check'],
  cancelado: ['circle-slash', 'x', 'ban'],
  novo: ['sparkles', 'badge-plus', 'circle-plus'],
  curtir: ['thumbs-up', 'heart'],
  descurtir: ['thumbs-down', 'heart-off'],
  premio: ['award', 'trophy', 'medal'],

  // --- Natureza e Clima ---
  nuvem: ['cloud', 'cloud-sun', 'cloud-lightning'],
  sol: ['sun', 'lightbulb'],
  lua: ['moon'],
  chuva: ['cloud-rain', 'umbrella', 'droplets'],
  neve: ['snowflake', 'cloud-snow'],
  vento: ['wind', 'tornado'],
  agua: ['droplet', 'droplets', 'waves'],
  arvore: ['tree-pine', 'tree-deciduous', 'trees'],
  planta: ['sprout', 'leaf', 'flower'],
  terra: ['globe', 'earth', 'mountain'],
  temperatura: ['thermometer', 'thermometer-sun', 'thermometer-snowflake'],
  raio: ['zap', 'cloud-lightning'],

  // --- Pessoas e Organização ---
  equipe: ['users', 'users-round', 'handshake'],
  perfil: ['circle-user', 'user-round', 'id-card'],
  empresa: ['building-2', 'briefcase', 'factory'],
  trabalho: ['briefcase', 'briefcase-business', 'hammer'],
  escola: ['graduation-cap', 'school', 'book-open'],
  saude: ['heart-pulse', 'stethoscope', 'cross'],
  hospital: ['hospital', 'ambulance', 'syringe'],
  medicamento: ['pill', 'syringe', 'tablets'],

  // --- Transporte e Logística ---
  carro: ['car', 'car-front'],
  onibus: ['bus', 'bus-front'],
  bicicleta: ['bike'],
  moto: ['bike', 'motorbike'],
  entrega: ['truck', 'package-check', 'package-open'],
  estoque: ['warehouse', 'package', 'boxes'],
  mapa: ['map', 'map-pin', 'navigation'],
  localizacao: ['map-pin', 'locate', 'compass'],
  rota: ['route', 'milestone', 'signpost'],
  combustivel: ['fuel', 'gauge'],
  estacionamento: ['circle-parking', 'square-parking'],

  // --- Tecnologia ---
  computador: ['monitor', 'laptop', 'computer'],
  celular: ['smartphone', 'tablet-smartphone'],
  rede: ['network', 'wifi', 'globe'],
  wifi: ['wifi', 'wifi-off', 'router'],
  bluetooth: ['bluetooth', 'bluetooth-connected'],
  bateria: ['battery', 'battery-charging', 'battery-full'],
  energia: ['zap', 'plug', 'power'],
  servidor: ['server', 'server-cog', 'cloud'],
  bug: ['bug', 'bug-off'],
  chave: ['key', 'key-round', 'fingerprint'],
  senha: ['key-round', 'lock', 'asterisk'],
  robo: ['bot', 'cpu', 'brain-circuit'],
  ferramenta: ['wrench', 'hammer', 'drill'],

  // --- Casa, Comida e Lazer ---
  comida: ['utensils', 'pizza', 'sandwich'],
  restaurante: ['utensils-crossed', 'chef-hat', 'concierge-bell'],
  cafe: ['coffee', 'cup-soda'],
  bebida: ['wine', 'beer', 'glass-water'],
  presente: ['gift', 'package-open', 'party-popper'],
  festa: ['party-popper', 'cake', 'music'],
  jogo: ['gamepad-2', 'dices', 'puzzle'],
  esporte: ['dumbbell', 'trophy', 'volleyball'],
  viagem: ['luggage', 'plane', 'tent'],
  hotel: ['hotel', 'bed-double', 'key-round'],
  cama: ['bed', 'bed-double', 'bed-single'],
  relogio: ['clock', 'alarm-clock', 'timer'],
  tempo: ['timer', 'hourglass', 'history'],
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

function validateIconSynonyms(): void {
  // Todos os nomes de ícones existentes (valores do índice, sem duplicatas)
  const validIcons = new Set(Object.values(ICON_TOKEN_INDEX).flat());

  for (const [chave, nomes] of Object.entries(ICON_SYNONYMS)) {
    for (const nome of nomes) {
      if (!validIcons.has(nome)) {
        console.warn(
          `[ICON_SYNONYMS] Ícone inexistente: "${nome}" (chave "${chave}")`,
        );
      }
    }
  }
}

// Roda uma única vez, na carga do módulo, apenas em desenvolvimento
if (import.meta.env.DEV) validateIconSynonyms();
