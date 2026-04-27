import { sharedSheet } from "../../utils/shared-styles";
import { escapeHTML } from "../../utils/sanitize";

export interface ShortcutItem {
  type: 'shortcut' | 'longpress' | "sequence";
  key?: string;
  sequence?: string; // Para atalhos do tipo "sequence"
  description: string;
  context?: string | ((currentContext: string) => boolean);
  priority?: number;
  category: string;
  duration?: number;
}

export class UIKeyboardShortcuts extends HTMLElement {
  private static shortcutsData: ShortcutItem[] = [];
  private searchQuery: string = '';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  /**
   * single source of truth: Renderiza um atalho formatado a partir do ID/Chave.
   * Só funciona se os dados já foram injetados via UIKeyboardShortcuts.data = [...]
   */
  public static renderShortcut(keyOrId: string, _variant: string = 'default'): { html: string, description: string } | null {
    if (!this.shortcutsData.length) return null;

    const cleanKey = keyOrId.toLowerCase();
    const item = this.shortcutsData.find(s => 
      (s.key && s.key.toLowerCase() === cleanKey) || 
      (s.sequence && s.sequence.toLowerCase() === cleanKey)
    );

    if (!item) return null;

    const formatter = new UIKeyboardShortcuts();
    return {
      html: formatter.formatKey((item.sequence || item.key)!, item.type),
      description: item.description
    };
  }

  // Permite injetar o array de atalhos via JS
  set data(shortcuts: ShortcutItem[]) {
    UIKeyboardShortcuts.shortcutsData = shortcuts;
    this.render();
  }

  get shortcuts(): ShortcutItem[] {
    return UIKeyboardShortcuts.shortcutsData;
  }

  get variant() {
    return this.getAttribute('variant') || 'default';
  }

  get categoryFilter() {
    return this.getAttribute('category-filter');
  }

  get enableSearch() {
    return (
      this.hasAttribute('enable-search') &&
      this.getAttribute('enable-search') !== 'false'
    );
  }

  connectedCallback() {
    this.render();
    this.setupEvents();
  }

  private setupEvents() {
    this.shadowRoot?.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      if (target.id === 'search-input') {
        this.searchQuery = target.value.toLowerCase();
        this.renderShortcuts(); // Re-renderiza apenas a lista
      }
    });
  }

  // ==========================================
  // PARSER E TRADUTOR VISUAL
  // ==========================================
  private formatKey(keyStr: string, type: 'shortcut' | 'longpress' | "sequence"): string {
    const parts = type === "sequence" ? keyStr.split(' → ') : keyStr.split('+');

    // Dicionário visual para teclas feias/especiais
    const visualMap: Record<string, string> = {
      arrowup: '↑',
      arrowdown: '↓',
      arrowleft: '←',
      arrowright: '→',
      escape: 'Esc',
      delete: 'Del',
      backspace: '⌫',
      shift: 'Shift',
      ctrl: 'Ctrl',
      alt: 'Alt',
    };

    const kbds = parts.map((p) => {
      const clean = p.toLowerCase();
      // Aplica o mapa visual ou capitaliza a primeira letra (ex: 's' -> 'S')
      const text =
        visualMap[clean] ||
        (clean.length === 1
          ? clean.toUpperCase()
          : clean.charAt(0).toUpperCase() + clean.slice(1));
      return `<kbd class="kbd-prism">${text}</kbd>`;
    });

    if (type === 'longpress') {
      return `${kbds[0]} <span class="font-mono text-[8px] text-accent-primary uppercase tracking-widest ml-1.5 opacity-80 border border-accent-primary/30 px-1 py-px rounded bg-accent-primary/10">Segure</span>`;
    }

    if (type === 'sequence') {
      return kbds.join(
        '<span class="text-text-muted/50 mx-1 text-[10px]">→</span>',
      );
    }

    // Une as teclas com um '+' sutil
    return kbds.join(
      '<span class="text-text-muted/50 mx-1 text-[10px]">+</span>',
    );
  }

  // Preenche descrições vazias
  private getDescription(item: ShortcutItem): string {
    if (item.description) return item.description;
    const fallbackMap: Record<string, string> = {
      delete: 'Excluir Seleção',
      backspace: 'Apagar Elemento',
    };
    return fallbackMap[(item.key || item.sequence || '').toLowerCase()] || 'Ação Desconhecida';
  }

  // ==========================================
  // RENDERIZAÇÃO
  // ==========================================

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; width: 100%; }

        /* O truque do pontilhado "Menu de Restaurante" para a variante Default */
        .dot-leader {
          flex: 1;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
          margin: 0 12px;
          position: relative;
          top: -4px; /* Alinha com o meio do texto */
        }
        
        /* Masonry Layout nativo usando columns */
        .masonry-grid {
          column-count: 1;
          column-gap: 2rem;
        }
        @media (min-width: 768px) { .masonry-grid { column-count: 2; } }
        @media (min-width: 1024px) { .masonry-grid { column-count: 3; } }
        
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 1.5rem;
        }

        /* Scrollbar customizada para se tiver tamanho fixo */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: var(--color-border-ui); border-radius: 4px; }
      </style>

      <div class="shortcut-container w-full h-full flex flex-col text-text-main">
        ${
          this.variant === 'default' && this.enableSearch
            ? `
          <div class="mb-6 relative">
            <ui-icon name="search" size="sm" class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"></ui-icon>
            <input type="text" id="search-input" placeholder="Buscar atalhos..." autocomplete="off"
                   class="w-full bg-black/20 border border-border-ui rounded-lg pl-10 pr-4 py-2.5 text-sm font-sans text-text-main placeholder:text-text-muted outline-none focus:border-accent-primary focus:shadow-[0_0_12px_rgba(99,102,241,0.2)] transition-all">
          </div>
        `
            : ''
        }
        
        <div id="shortcuts-wrapper" class="${this.variant === 'default' ? 'masonry-grid' : 'flex flex-col gap-1'}">
          <!-- O JS injeta aqui -->
        </div>
      </div>
    `;

    this.renderShortcuts();
  }

  private renderShortcuts() {
    const wrapper = this.shadowRoot?.getElementById('shortcuts-wrapper');
    if (!wrapper) return;

    let filtered = this.shortcuts;

    // 1. Filtra por Query (Busca)
    if (this.searchQuery) {
      filtered = filtered.filter(
        (s) =>
          this.getDescription(s).toLowerCase().includes(this.searchQuery) ||
          (s.key || s.sequence || '').toLowerCase().includes(this.searchQuery),
      );
    }

    // 2. Filtra por Categoria (Propriedade category-filter)
    if (this.categoryFilter) {
      filtered = filtered.filter(
        (s) => s.category.toLowerCase() === this.categoryFilter?.toLowerCase(),
      );
    }

    // Se estiver vazio
    if (filtered.length === 0) {
      wrapper.innerHTML = `<div class="text-center text-text-muted text-xs py-4 font-mono">Nenhum atalho encontrado.</div>`;
      return;
    }

    // ==========================================
    // VARIANTE: SLIM (HUD Compacto)
    // ==========================================
    if (this.variant === 'slim') {
      wrapper.innerHTML = filtered
        .map(
          (s) => `
        <div class="flex items-center gap-3 p-1.5 hover:bg-white/5 rounded transition-colors">
          <div class="min-w-15 flex justify-end">${this.formatKey((s.sequence || s.key)!, s.type)}</div>
          <span class="text-[11px] text-text-muted truncate">${escapeHTML(this.getDescription(s))}</span>
        </div>
      `,
        )
        .join('');
      return;
    }

    // ==========================================
    // VARIANTE: DEFAULT (Planta Baixa / Masonry)
    // ==========================================

    // Agrupa por Categoria
    const grouped = filtered.reduce(
      (acc, curr) => {
        if (!acc[curr.category]) acc[curr.category] = [];
        acc[curr.category].push(curr);
        return acc;
      },
      {} as Record<string, ShortcutItem[]>,
    );

    let html = '';

    for (const [category, items] of Object.entries(grouped)) {
      html += `
        <div class="masonry-item bg-surface-solid/50 border border-border-ui rounded-xl p-5 shadow-panel">
          
          <h3 class="font-mono text-[10px] text-accent-primary uppercase tracking-[0.15em] font-bold mb-4 flex items-center gap-2">
            <ui-icon name="folder" size="sm" class="opacity-80"></ui-icon>
            ${escapeHTML(category)}
          </h3>
          
          <div class="flex flex-col gap-3.5">
            ${items
              .map(
                (s) => `
              <div class="flex items-center text-[12px] group">
                <span class="text-text-main group-hover:text-white transition-colors">${escapeHTML(this.getDescription(s))}</span>
                <span class="dot-leader"></span>
                <span class="shrink-0 flex items-center justify-end">${this.formatKey((s.sequence || s.key)!, s.type)}</span>
              </div>
            `,
              )
              .join('')}
          </div>

        </div>
      `;
    }

    wrapper.innerHTML = html;
  }
}

customElements.define('ui-keyboard-shortcuts', UIKeyboardShortcuts);
