/**
 * @component ui-hud-tips
 * @description HUD Tip Console flutuante, estilo cockpit/Blender.
 *              Exibe dicas rotativas com parser de atalhos de teclado,
 *              animação de flipper e comportamento fantasma/foco.
 *
 * @attributes  (nenhum atributo observado — API totalmente imperativa)
 *
 * @slots       (nenhum — conteúdo gerado internamente)
 *
 * @events
 *   - hud-close  → CustomEvent, bubbles + composed. Disparado ao fechar o banner.
 *                  detail: { permanent: false }
 *
 * @parts
 *   - banner     → O container pill clicável / hoverable
 *   - icon       → O ui-icon de lâmpada
 *   - tip-text   → O span com o texto parseado
 *   - close-btn  → O botão X
 *
 * @css-vars
 *   --hud-z-index           → z-index do host (default: 40)
 *   --hud-ghost-bg          → bg no estado fantasma (default: rgba(10,12,16,0.25))
 *   --hud-focus-bg          → bg no estado foco/hover (default: rgba(22,25,32,0.95))
 *   --hud-border-ghost      → borda no estado fantasma (default: rgba(255,255,255,0.05))
 *   --hud-border-focus      → borda no estado foco (default: rgba(99,102,241,0.45))
 *   --hud-glow-color        → cor do glow neon no foco (default: rgba(99,102,241,0.18))
 *   --hud-tip-interval-ms   → intervalo de rotação em ms (default: 15000)
 *
 * @methods (API pública)
 *   setTips(tips: string[])  → Injeta e embaralha o array de dicas
 *   pause()                  → Pausa a rotação programaticamente
 *   resume()                 → Retoma a rotação programaticamente
 *
 * @key-syntax (Parser de atalhos)
 *   [Ctrl+S]           → combinação de teclas (separador +)
 *   [t]                → tecla única (pressionamento longo destacado)
 *   [t → e → s → t]   → sequência de teclas (separador →)
 */

import { sharedSheet } from '../../utils/shared-styles.js';

// ─────────────────────────────────────────────
// Constructable Stylesheet exclusiva do componente
// ─────────────────────────────────────────────
const hudSheet = new CSSStyleSheet();
hudSheet.replaceSync(`
  /* ── Host ── */
  :host {
    display: block;
    z-index: var(--hud-z-index, 40);
    pointer-events: auto;
  }

  :host([hidden]) {
    display: none !important;
  }

  /* ── Banner Pill ── */
  .hud-banner {
    display:         flex;
    align-items:     center;
    gap:             10px;
    padding:         6px 14px 6px 10px;
    border-radius:   9999px;
    cursor:          default;
    user-select:     none;
    background:      var(--hud-ghost-bg, rgba(10, 12, 16, 0.25));
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border:          1px solid var(--hud-border-ghost, rgba(255, 255, 255, 0.05));
    transition:
      background     0.4s var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
      border-color   0.4s var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
      box-shadow     0.4s var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
      transform      0.4s var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
    will-change: transform, box-shadow;
  }

  /* Estado foco (hover real + foco de teclado) */
  .hud-banner:hover,
  .hud-banner:focus-within {
    background:    var(--hud-focus-bg, rgba(22, 25, 32, 0.95));
    border-color:  var(--hud-border-focus, rgba(99, 102, 241, 0.45));
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.55),
      0 0 18px var(--hud-glow-color, rgba(99, 102, 241, 0.18));
    transform: translateY(-2px);
  }

  /* ── Ícone de lâmpada ── */
  .hud-icon {
    flex-shrink: 0;
    width:   14px;
    height:  14px;
    opacity: 0.45;
    color:   var(--color-accent-primary, #6366f1);
    transition: opacity 0.3s ease, transform 0.4s var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
  }

  .hud-banner:hover .hud-icon,
  .hud-banner:focus-within .hud-icon {
    opacity: 1;
    transform: scale(1.15) rotate(-8deg);
  }

  /* ── Viewport de texto (máscara de overflow) ── */
  .tip-viewport {
    position:   relative;
    overflow:   hidden;
    height:     18px;
    display:    flex;
    align-items: center;
    min-width:  120px;
    max-width:  520px;
  }

  /* ── Linha de texto ── */
  .tip-text {
    display:     inline-flex;
    align-items: center;
    gap:         4px;
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size:   12px;
    line-height: 1;
    white-space: nowrap;
    color:       var(--color-text-muted, rgba(148, 163, 184, 0.5));
    transition:
      color     0.3s ease,
      transform 0.45s cubic-bezier(0.4, 0, 0.2, 1),
      opacity   0.45s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, opacity;
  }

  .hud-banner:hover .tip-text,
  .hud-banner:focus-within .tip-text {
    color: var(--color-text-main, rgba(226, 232, 240, 0.9));
  }

  /* Estados de animação (aplicados via JS) */
  .tip-text[data-state="visible"] {
    transform: translateY(0);
    opacity:   1;
  }

  .tip-text[data-state="exit-up"] {
    transform: translateY(-110%);
    opacity:   0;
  }

  .tip-text[data-state="enter-from-bottom"] {
    transform: translateY(110%);
    opacity:   0;
  }

  /* ── Prefixo "Dica:" ── */
  .tip-prefix {
    text-transform:  uppercase;
    letter-spacing:  0.08em;
    font-weight:     700;
    color:           var(--color-accent-primary, #6366f1);
    opacity:         0.75;
    margin-right:    4px;
    flex-shrink:     0;
  }

  .hud-banner:hover .tip-prefix,
  .hud-banner:focus-within .tip-prefix {
    opacity: 1;
  }

  /* ── KBD Inline ── */
  .kbd-hud {
    display:        inline-flex;
    align-items:    center;
    justify-content: center;
    font-family:    var(--font-mono, 'JetBrains Mono', monospace);
    font-size:      10px;
    font-weight:    600;
    line-height:    1;
    padding:        1px 4px;
    border-radius:  3px;
    background:     rgba(99, 102, 241, 0.12);
    border:         1px solid rgba(99, 102, 241, 0.35);
    border-bottom:  2px solid rgba(99, 102, 241, 0.5);
    color:          var(--color-accent-primary, #6366f1);
    vertical-align: middle;
    white-space:    nowrap;
    flex-shrink:    0;
    box-shadow:     0 1px 0 rgba(0,0,0,0.4);
  }

  /* KBD para tecla única (pressionamento longo) — destaque diferente */
  .kbd-hud[data-type="single"] {
    background:  rgba(245, 158, 11, 0.10);
    border-color: rgba(245, 158, 11, 0.35);
    border-bottom-color: rgba(245, 158, 11, 0.55);
    color:       var(--color-accent-warning, #f59e0b);
  }

  /* Separador de combinação (+) e sequência (→) */
  .kbd-sep {
    font-size:   9px;
    opacity:     0.4;
    margin:      0 1px;
    color:       var(--color-text-muted, #94a3b8);
    flex-shrink: 0;
  }

  /* Grupo de teclas (combinação ou sequência) */
  .kbd-group {
    display:     inline-flex;
    align-items: center;
    gap:         0;
    margin:      0 3px;
  }

  /* ── Botão de Fechar ── */
  .btn-close {
    display:         flex;
    align-items:     center;
    justify-content: center;
    width:           18px;
    height:          18px;
    border-radius:   50%;
    border:          none;
    background:      transparent;
    color:           var(--color-text-muted, #94a3b8);
    cursor:          pointer;
    margin-left:     4px;
    flex-shrink:     0;
    opacity:         0;
    transform:       scale(0.7);
    transition:
      opacity   0.25s ease,
      transform 0.25s var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
      background 0.2s ease,
      color      0.2s ease;
    /* Garante que seja focável mesmo invisível para a/11y */
    pointer-events: none;
  }

  .hud-banner:hover .btn-close,
  .hud-banner:focus-within .btn-close {
    opacity:        1;
    transform:      scale(1);
    pointer-events: auto;
  }

  .btn-close:hover {
    background: rgba(255, 255, 255, 0.1);
    color:      var(--color-text-main, #e2e8f0);
    transform:  scale(1.15) rotate(90deg);
  }

  .btn-close:focus-visible {
    outline:        2px solid var(--color-accent-primary, #6366f1);
    outline-offset: 2px;
  }

  /* ── Dot pulsante de "ao vivo" ── */
  .live-dot {
    width:         5px;
    height:        5px;
    border-radius: 50%;
    background:    var(--color-accent-primary, #6366f1);
    opacity:       0.4;
    flex-shrink:   0;
    animation:     hud-pulse 3s ease-in-out infinite;
  }

  @keyframes hud-pulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50%       { opacity: 0.9; transform: scale(1.4); }
  }

  /* Pausa a pulsação quando não há dicas */
  :host([data-empty]) .live-dot {
    animation: none;
    opacity:   0.15;
  }
`);

// ─────────────────────────────────────────────
// Template estático (clonado uma vez)
// ─────────────────────────────────────────────
const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
  <div
    class="hud-banner"
    part="banner"
    role="region"
    aria-label="Dicas do editor"
    aria-live="polite"
    aria-atomic="true"
  >
    <!-- Dot pulsante -->
    <span class="live-dot" aria-hidden="true"></span>

    <!-- Ícone de lâmpada -->
    <ui-icon
      part="icon"
      name="lightbulb"
      class="hud-icon"
      aria-hidden="true"
    ></ui-icon>

    <!-- Viewport com máscara de overflow -->
    <div class="tip-viewport" aria-hidden="true">
      <span
        id="tip-text"
        class="tip-text"
        part="tip-text"
        data-state="visible"
      ></span>
    </div>

    <!-- Texto para leitores de tela (fora do viewport animado) -->
    <span
      id="sr-text"
      class="sr-only"
      style="
        position: absolute;
        width: 1px; height: 1px;
        padding: 0; margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;
      "
    ></span>

    <!-- Botão fechar -->
    <button
      id="btn-close"
      class="btn-close"
      part="close-btn"
      type="button"
      aria-label="Fechar painel de dicas"
      tabindex="0"
    >
      <ui-icon name="close" size="xs" aria-hidden="true"></ui-icon>
    </button>
  </div>
`;

// ─────────────────────────────────────────────
// Helpers de parsing
// ─────────────────────────────────────────────

/**
 * Cria um nó <span class="kbd-hud"> para uma tecla.
 * @param {string} key  - Nome da tecla (ex: "Ctrl", "S", "t")
 * @param {"combo"|"single"|"seq"} type
 * @returns {string} HTML string
 */
function kbdHtml(
  key: string,
  type: 'combo' | 'single' | 'seq' = 'combo',
): string {
  const dataType = type === 'single' ? 'data-type="single"' : '';
  return `<kbd class="kbd-hud" ${dataType}>${escapeHtml(key.trim())}</kbd>`;
}

/**
 * Escapa HTML para evitar XSS nos nomes de teclas.
 * @param {string} str - String a ser escapada
 * @returns {string} String escapada
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Parseia um bloco de teclas e retorna HTML.
 *
 * Formatos suportados:
 *   [Ctrl+S]          → combinação  (sep: +)
 *   [t]               → tecla única (pressionamento longo)
 *   [t → e → s → t]  → sequência   (sep: →)
 *
 * @param {string} inner - Conteúdo entre colchetes
 * @returns {string} HTML
 */
function parseKeyBlock(inner: string): string {
  const trimmed = inner.trim();

  // Sequência: contém " → " (espaços obrigatórios para distinguir de seta no texto)
  if (trimmed.includes(' → ')) {
    const keys = trimmed.split(' → ');
    const parts = keys.map((k, i) => {
      const sep =
        i < keys.length - 1
          ? `<span class="kbd-sep" aria-hidden="true">→</span>`
          : '';
      return `${kbdHtml(k, 'combo')}${sep}`;
    });
    return `<span class="kbd-group" aria-label="Sequência: ${escapeHtml(trimmed)}">${parts.join('')}</span>`;
  }

  // Combinação: contém "+"
  if (trimmed.includes('+')) {
    const keys = trimmed.split('+');
    const parts = keys.map((k, i) => {
      const sep =
        i < keys.length - 1
          ? `<span class="kbd-sep" aria-hidden="true">+</span>`
          : '';
      return `${kbdHtml(k, 'combo')}${sep}`;
    });
    return `<span class="kbd-group" aria-label="Atalho: ${escapeHtml(trimmed)}">${parts.join('')}</span>`;
  }

  // Tecla única (pressionamento longo)
  return `<span class="kbd-group" aria-label="Tecla: ${escapeHtml(trimmed)}">${kbdHtml(trimmed, 'single')}</span>`;
}

/**
 * Converte uma string de dica em HTML seguro,
 * substituindo [padrões] por <kbd> estilizados.
 *
 * @param {string} raw - Texto bruto da dica
 * @returns {string} HTML parseado
 */
function parseTip(raw: string): string {
  // Escapa o texto base (exceto os blocos de teclas que processamos separadamente)
  // Divide o texto em segmentos: texto livre e blocos [...]
  const segments = [];
  let last = 0;
  const RE = /\[([^\]]+)\]/g;
  let match;

  while ((match = RE.exec(raw)) !== null) {
    // Texto livre antes do bloco
    if (match.index > last) {
      segments.push(`<span>${escapeHtml(raw.slice(last, match.index))}</span>`);
    }
    // Bloco de tecla(s)
    segments.push(parseKeyBlock(match[1]));
    last = RE.lastIndex;
  }

  // Texto livre restante
  if (last < raw.length) {
    segments.push(`<span>${escapeHtml(raw.slice(last))}</span>`);
  }

  return segments.join('');
}

/**
 * Extrai o texto puro de uma dica (para aria / leitores de tela).
 * Remove colchetes, mantém nomes das teclas legíveis.
 *
 * @param {string} raw
 * @returns {string}
 */
function plainText(raw: string): string {
  return raw.replace(/\[([^\]]+)\]/g, (_, inner) => {
    if (inner.includes(' → ')) return `Sequência: ${inner}`;
    if (inner.includes('+')) return `Atalho ${inner}`;
    return `Tecla ${inner}`;
  });
}

/**
 * Embaralha um array usando o algoritmo de Fisher-Yates.
 *
 * @param {string[]} arr
 * @returns {string[]} Novo array embaralhado
 */
function shuffle(arr: string[]): string[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─────────────────────────────────────────────
// O Componente
// ─────────────────────────────────────────────
export class UiHudTips extends HTMLElement {
  // ── Campos privados ──────────────────────────
  #shadow;
  #controller = new AbortController();

  /** @type {string[]} */
  #tips: string[] = [];
  #currentIndex = 0;

  /** @type {number|null} */
  #intervalId: number | null = null;

  #isHovered = false;
  #isPaused = false; // pausa programática (API pública)
  #isAnimating = false;

  /** Intervalo em ms (lido uma vez em connectedCallback) */
  #intervalMs = 15_000;

  // ── Referências ao DOM interno ────────────────
  /** @type {HTMLElement|null} */ #tipTextEl: HTMLElement | null = null;
  /** @type {HTMLElement|null} */ #srTextEl: HTMLElement | null = null;
  /** @type {HTMLElement  |null} */ #btnClose: HTMLElement | null = null;

  // ─────────────────────────────────────────────
  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: 'open' });

    // Injeta as stylesheets: compartilhada + própria
    this.#shadow.adoptedStyleSheets = [sharedSheet, hudSheet];

    // Clona o template estático
    this.#shadow.appendChild(TEMPLATE.content.cloneNode(true));

    // Guarda referências
    this.#tipTextEl = this.#shadow.getElementById('tip-text');
    this.#srTextEl = this.#shadow.getElementById('sr-text');
    this.#btnClose = this.#shadow.getElementById('btn-close');
  }

  // ─────────────────────────────────────────────
  // Lifecycle
  // ─────────────────────────────────────────────
  connectedCallback() {
    const sig = this.#controller.signal;
    const banner = this.#shadow.querySelector('.hud-banner');

    // Lê variável CSS de intervalo (se definida externamente)
    const cssInterval = parseInt(
      getComputedStyle(this).getPropertyValue('--hud-tip-interval-ms').trim(),
      10,
    );
    if (!isNaN(cssInterval) && cssInterval > 0) {
      this.#intervalMs = cssInterval;
    }

    // Hover → pausa suave (sem pausar o timer, só impede troca)
    banner?.addEventListener(
      'mouseenter',
      () => {
        this.#isHovered = true;
      },
      { signal: sig },
    );
    banner?.addEventListener(
      'mouseleave',
      () => {
        this.#isHovered = false;
      },
      { signal: sig },
    );

    // Botão fechar
    this.#btnClose?.addEventListener('click', () => this.#close(), {
      signal: sig,
    });

    // Inicia rotação se já houver dicas
    if (this.#tips.length > 0) {
      this.#showCurrent(false);
      this.#startRotation();
    }
  }

  disconnectedCallback() {
    this.#controller.abort();
    this.#stopRotation();
  }

  // ─────────────────────────────────────────────
  // API Pública
  // ─────────────────────────────────────────────

  /**
   * Injeta o array de dicas, embaralha e inicia a exibição.
   * Pode ser chamado múltiplas vezes para atualizar as dicas.
   *
   * @param {string[]} tips
   */
  setTips(tips: string[]) {
    if (!Array.isArray(tips) || tips.length === 0) {
      this.setAttribute('data-empty', '');
      return;
    }
    this.removeAttribute('data-empty');
    this.#tips = shuffle(tips);
    this.#currentIndex = 0;
    this.#showCurrent(false);

    // Inicia a rotação se o componente já estiver conectado
    if (this.isConnected) {
      this.#stopRotation();
      this.#startRotation();
    }
  }

  /**
   * Pausa a rotação automática programaticamente.
   * (Ex: quando um modal está aberto)
   */
  pause() {
    this.#isPaused = true;
    this.#stopRotation();
  }

  /**
   * Retoma a rotação automática após `pause()`.
   */
  resume() {
    if (!this.#isPaused) return;
    this.#isPaused = false;
    this.#startRotation();
  }

  // ─────────────────────────────────────────────
  // Métodos privados
  // ─────────────────────────────────────────────

  #startRotation() {
    if (this.#intervalId !== null) return;
    if (this.#tips.length <= 1) return;

    this.#intervalId = window.setInterval(() => {
      // Não troca se o mouse estiver em cima OU se pausado externamente
      if (this.#isHovered || this.#isPaused || this.#isAnimating) return;

      this.#currentIndex = (this.#currentIndex + 1) % this.#tips.length;
      this.#showCurrent(true);
    }, this.#intervalMs);
  }

  #stopRotation() {
    if (this.#intervalId !== null) {
      clearInterval(this.#intervalId);
      this.#intervalId = null;
    }
  }

  /**
   * Atualiza o texto exibido, com ou sem animação de flipper.
   *
   * @param {boolean} animate
   */
  #showCurrent(animate: boolean) {
    const el = this.#tipTextEl;
    const sr = this.#srTextEl;
    if (!el || this.#tips.length === 0) return;

    const raw = this.#tips[this.#currentIndex];
    const html = parseTip(raw);
    const readable = plainText(raw);

    // Atualiza o texto para leitores de tela imediatamente
    // (aria-live="polite" no banner cuidará do anúncio)
    if (sr) sr.textContent = `Dica: ${readable}`;

    if (!animate) {
      el.innerHTML = this.#buildInnerHtml(html);
      el.dataset.state = 'visible';
      return;
    }

    // Animação de flipper: sai pra cima → entra de baixo
    this.#isAnimating = true;

    el.dataset.state = 'exit-up';

    setTimeout(() => {
      el.innerHTML = this.#buildInnerHtml(html);
      el.dataset.state = 'enter-from-bottom';

      // Força reflow para a transição funcionar
      void el.offsetWidth;

      el.dataset.state = 'visible';

      // Aguarda a transição CSS terminar (450ms definido no CSS)
      setTimeout(() => {
        this.#isAnimating = false;
      }, 450);
    }, 450);
  }

  /**
   * Monta o HTML interno da dica com o prefixo "Dica:".
   *
   * @param {string} parsedHtml - HTML das teclas já parseado
   * @returns {string}
   */
  #buildInnerHtml(parsedHtml: string): string {
    return `<span class="tip-prefix" aria-hidden="true">Dica:</span>${parsedHtml}`;
  }

  /** Fecha e remove o componente do DOM, disparando o evento. */
  #close() {
    this.style.opacity = '0';
    this.style.transform = 'translateY(8px)';
    this.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    this.dispatchEvent(
      new CustomEvent('hud-close', {
        detail: { permanent: false },
        bubbles: true,
        composed: true,
      }),
    );

    setTimeout(() => {
      this.#stopRotation();
      this.remove();
    }, 300);
  }
}

customElements.define('ui-hud-tips', UiHudTips);

declare global {
  interface HTMLElementTagNameMap {
    'ui-hud-tips': UiHudTips;
  }
}