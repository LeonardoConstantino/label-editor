/**
 * @element ui-variable-badge
 * @description Badge clicável para variáveis de template com feedback de cópia.
 *
 * @attr {"default" | "missing" | "used"} state - Estado visual do badge
 * @attr {string} [data-copied]  - Atributo transitório (1.5s) aplicado após cópia bem-sucedida.
 *                                 Usado como gatilho CSS para o estilo de feedback verde.
 * @attr {string} [data-error]   - Atributo transitório (2s) aplicado quando navigator.clipboard falha.
 *                                 Exige contexto seguro (HTTPS). Em HTTP/file:// o fallback é disparado.
 *
 * @slot (default) - Texto da variável: exibido no badge e copiado ao clicar.
 *
 * @event {CustomEvent<{ value: string }>} ui-badge-copied
 *   Disparado após cópia bem-sucedida. bubbles + composed (atravessa shadow boundary).
 *
 * @event {CustomEvent<{ reason: unknown }>} ui-badge-copy-error
 *   Disparado quando navigator.clipboard falha. bubbles + composed.
 *
 * @cssvar --badge-transition-duration - Duração base das transições (default: 200ms)
 *
 * @part root  - Container principal do badge
 * @part label - Texto da variável
 * @part icon  - Ícone de ação (copy / check / alert-circle)
 *
 * @dependency <ui-icon> - Componente de ícone vetorial do Design System.
 *   Utiliza os ícones: "copy", "check", "alert-circle" com size="xs".
 */

// ── Constantes ───────────────────────────────────────────────────────────────

const COPIED_FEEDBACK_DURATION_MS = 1_500;
const ERROR_FEEDBACK_DURATION_MS = 2_000;

const ICON = {
  copy: '<ui-icon name="copy"  size="xs"></ui-icon>',
  check: '<ui-icon name="check-circle" size="xs"></ui-icon>',
  error: '<ui-icon name="alert-circle" size="xs"></ui-icon>',
} as const;

const ARIA_STATE_LABEL: Record<string, string> = {
  missing: 'variável ausente no template',
  used: 'variável mapeada',
  default: 'variável disponível',
};

// ── Template ─────────────────────────────────────────────────────────────────

const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
  <style>
    :host {
      display: inline-flex;
      cursor: pointer;
      outline: none;
      --badge-transition-duration: 200ms;
      --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    /* ── Root ── */
    [part="root"] {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border-radius: 4px;
      border: 1px solid transparent;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      line-height: 1;
      user-select: none;
      transition:
        background-color var(--badge-transition-duration) ease,
        border-color     var(--badge-transition-duration) ease,
        color            var(--badge-transition-duration) ease,
        transform        200ms var(--ease-spring),
        box-shadow       var(--badge-transition-duration) ease;
    }

    /* ── Estados base ── */
    :host([state="default"]) [part="root"],
    :host(:not([state]))     [part="root"] {
      background-color: rgba(99, 102, 241, 0.10);
      border-color:     rgba(99, 102, 241, 0.20);
      color:            #6366f1;
    }

    :host([state="missing"]) [part="root"] {
      background-color: rgba(244, 63, 94, 0.10);
      border-color:     rgba(244, 63, 94, 0.20);
      color:            #f43f5e;
      opacity: 0.65;
    }

    :host([state="used"]) [part="root"] {
      background-color: rgba(16, 185, 129, 0.10);
      border-color:     rgba(16, 185, 129, 0.25);
      color:            #10b981;
    }

    /* ── Hover ── */
    :host([state="default"]:hover) [part="root"],
    :host(:not([state]):hover)     [part="root"] {
      background-color: rgba(99, 102, 241, 0.18);
      border-color:     rgba(99, 102, 241, 0.45);
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.20);
      transform: translateY(-1px);
    }

    :host([state="missing"]:hover) [part="root"] {
      background-color: rgba(244, 63, 94, 0.18);
      border-color:     rgba(244, 63, 94, 0.45);
      box-shadow: 0 0 10px rgba(244, 63, 94, 0.20);
      transform: translateY(-1px);
      opacity: 0.85;
    }

    :host([state="used"]:hover) [part="root"] {
      background-color: rgba(16, 185, 129, 0.18);
      border-color:     rgba(16, 185, 129, 0.45);
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.20);
      transform: translateY(-1px);
    }

    /* ── Active (tátil) ── */
    :host(:active) [part="root"] {
      transform: scale(0.93) translateY(0);
      transition-duration: 80ms;
    }

    /* ── Focus-visible (acessibilidade teclado) ── */
    :host(:focus-visible) [part="root"] {
      outline: 2px solid #6366f1;
      outline-offset: 2px;
    }
    :host([state="missing"]:focus-visible) [part="root"] { outline-color: #f43f5e; }
    :host([state="used"]:focus-visible)    [part="root"] { outline-color: #10b981; }

    /* ── Ícone (oculto por padrão, visível no hover/focus/feedback) ── */
    [part="icon"] {
      display: none;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      --icon-size: 10px;
      transition:
        opacity  150ms ease,
        transform 200ms var(--ease-spring);
    }

    :host(:hover)         [part="icon"],
    :host(:focus-visible) [part="icon"] {
      display: inline-flex;
    }

    /* ── Feedback: copiado ── */
    :host([data-copied]) [part="root"] {
      background-color: rgba(16, 185, 129, 0.15) !important;
      border-color:     rgba(16, 185, 129, 0.50) !important;
      color:            #10b981 !important;
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.25) !important;
      transform: scale(1.04) !important;
    }

    :host([data-copied]) [part="icon"] {
      display: inline-flex;
      transform: scale(1.2);
    }

    /* ── Feedback: erro ── */
    :host([data-error]) [part="root"] {
      background-color: rgba(244, 63, 94, 0.15) !important;
      border-color:     rgba(244, 63, 94, 0.50) !important;
      color:            #f43f5e !important;
      box-shadow: 0 0 12px rgba(244, 63, 94, 0.25) !important;
      opacity: 1 !important;
    }

    :host([data-error]) [part="icon"] {
      display: inline-flex;
    }

    /* ── Slot ── */
    ::slotted(*) { pointer-events: none; }
  </style>

  <span part="root" role="button" tabindex="0">
    <span part="label"><slot></slot></span>
    <span part="icon" aria-hidden="true">${ICON.copy}</span>
  </span>
`;

// ── Tipos ─────────────────────────────────────────────────────────────────────

type BadgeState = 'default' | 'missing' | 'used';

// ── Componente ────────────────────────────────────────────────────────────────

class UiVariableBadge extends HTMLElement {
  // ── Campos privados (cache de elementos e controle de estado) ──

  readonly #shadow: ShadowRoot;
  #controller: AbortController | null = null;
  #feedbackTimer: ReturnType<typeof setTimeout> | null = null;

  // Cache de referências DOM — evita re-query a cada interação
  readonly #rootEl: HTMLElement;
  readonly #iconEl: HTMLElement;
  readonly #slotEl: HTMLSlotElement;

  // ── API declarativa ──────────────────────────────────────────────────────────

  static observedAttributes = ['state'] as const;

  // ── Constructor: apenas setup imutável ──────────────────────────────────────

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: 'open' });
    this.#shadow.appendChild(TEMPLATE.content.cloneNode(true));

    // Cache centralizado — única query por elemento
    this.#rootEl = this.#shadow.querySelector<HTMLElement>('[part="root"]')!;
    this.#iconEl = this.#shadow.querySelector<HTMLElement>('[part="icon"]')!;
    this.#slotEl = this.#shadow.querySelector<HTMLSlotElement>('slot')!;
  }

  // ── Lifecycle ────────────────────────────────────────────────────────────────

  connectedCallback(): void {
    this.#controller = new AbortController();
    const { signal } = this.#controller;

    this.#rootEl.addEventListener('click', () => this.#handleCopy(), {
      signal,
    });

    this.#rootEl.addEventListener(
      'keydown',
      (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.#handleCopy();
        }
      },
      { signal },
    );

    // Atualiza aria-label se o conteúdo do slot mudar dinamicamente
    this.#slotEl.addEventListener('slotchange', () => this.#syncAria(), {
      signal,
    });

    this.#syncAria();
  }

  disconnectedCallback(): void {
    this.#controller?.abort();
    this.#controller = null;

    // Limpa timer pendente para não vazar referências após remoção do DOM
    if (this.#feedbackTimer !== null) {
      clearTimeout(this.#feedbackTimer);
      this.#feedbackTimer = null;
    }
  }

  attributeChangedCallback(
    name: string,
    oldVal: string | null,
    newVal: string | null,
  ): void {
    if (name === 'state' && oldVal !== newVal) {
      this.#syncAria();
    }
  }

  // ── API pública ──────────────────────────────────────────────────────────────

  /** Estado visual do badge: "default" | "missing" | "used" */
  get state(): BadgeState {
    return (this.getAttribute('state') as BadgeState) ?? 'default';
  }

  set state(value: BadgeState) {
    this.setAttribute('state', value);
  }

  // ── Métodos privados ─────────────────────────────────────────────────────────

  /**
   * Resolve o texto do slot de forma eficiente via textContent.
   * Usa assignedNodes para acessar apenas os nós projetados no slot.
   */
  #resolveText(): string {
    return this.#slotEl
      .assignedNodes({ flatten: true })
      .map((n) => n.textContent ?? '')
      .join('')
      .trim();
  }

  async #handleCopy(): Promise<void> {
    const text = this.#resolveText();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      this.#showFeedback('copied');

      this.dispatchEvent(
        new CustomEvent<{ value: string }>('ui-badge-copied', {
          detail: { value: text },
          bubbles: true,
          composed: true,
        }),
      );
    } catch (reason: unknown) {
      // Fallback: navigator.clipboard requer contexto seguro (HTTPS).
      // Em HTTP ou file://, a cópia falha silenciosamente sem este bloco.
      this.#showFeedback('error');
      console.warn(
        '[ui-variable-badge] Falha ao copiar para área de transferência:',
        reason,
      );

      this.dispatchEvent(
        new CustomEvent<{ reason: unknown }>('ui-badge-copy-error', {
          detail: { reason },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  #showFeedback(type: 'copied' | 'error'): void {
    // Cancela qualquer feedback anterior para evitar race condition
    // quando o usuário clica múltiplas vezes rapidamente
    if (this.#feedbackTimer !== null) {
      clearTimeout(this.#feedbackTimer);
      this.removeAttribute('data-copied');
      this.removeAttribute('data-error');
    }

    const isCopied = type === 'copied';
    const duration = isCopied
      ? COPIED_FEEDBACK_DURATION_MS
      : ERROR_FEEDBACK_DURATION_MS;
    const dataAttr = isCopied ? 'data-copied' : 'data-error';
    const ariaMsg = isCopied ? 'Copiado!' : 'Falha ao copiar';

    // Alterna aria-pressed para true durante o feedback (acessibilidade)
    this.#rootEl.setAttribute('aria-pressed', 'true');
    this.#iconEl.innerHTML = isCopied ? ICON.check : ICON.error;
    this.setAttribute(dataAttr, '');
    this.#rootEl.setAttribute('aria-label', ariaMsg);

    this.#feedbackTimer = setTimeout(() => {
      this.removeAttribute(dataAttr);
      this.#iconEl.innerHTML = ICON.copy;
      this.#rootEl.setAttribute('aria-pressed', 'false');
      this.#syncAria();
      this.#feedbackTimer = null;
    }, duration);
  }

  /** Sincroniza aria-label com o estado atual e o texto do slot. */
  #syncAria(): void {
    const text = this.#resolveText();
    const stateDesc = ARIA_STATE_LABEL[this.state] ?? 'variável';
    const label = `${text || 'badge'} — ${stateDesc}. Clique para copiar.`;

    this.#rootEl.setAttribute('aria-label', label);
    this.#rootEl.setAttribute('aria-pressed', 'false');
  }
}

customElements.define('ui-variable-badge', UiVariableBadge);
