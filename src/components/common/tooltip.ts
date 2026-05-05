/**
 * @element ui-tooltip-manager
 * @description Gerenciador global de tooltips (deve ser adicionado uma vez no documento)
 */

import { sharedSheet } from "../../utils/shared-styles";

/**
 * @element ui-tooltip
 * @description Tooltip wrapper com slots (mantém funcionalidade original)
 *
 * @attr {string}  trigger      - Gatilhos: "hover", "focus", "click" ou combinados (padrão: "hover focus")
 * @attr {string}  placement    - Posição: "top" | "bottom" | "left" | "right" (padrão: "top")
 * @attr {string}  tooltip      - Texto simples (prioridade 1)
 * @attr {string}  tooltip-ref  - ID de template (prioridade 2)
 * @attr {string}  variant      - Variante: "info" | "success" | "warning" | "error"
 * @attr {number}  delay        - Delay em ms (padrão: 200)
 * @attr {number}  offset       - Distância em px (padrão: 8)
 *
 * @slot target  - Elemento que dispara o tooltip
 * @slot content - Conteúdo rico (prioridade 3)
 */

type Placement = 'top' | 'bottom' | 'left' | 'right';
type Trigger =
  | 'hover'
  | 'focus'
  | 'click'
  | 'manual'
  | 'keyboard'
  | 'click-outside';

interface Coordinates {
  top: number;
  left: number;
}

interface TooltipConfig {
  text?: string;
  templateRef?: string;
  contentSlot?: DocumentFragment;
  placement: Placement;
  variant?: string;
  delay: number;
  offset: number;
  triggers: Trigger[];
}

const PLACEMENTS: Placement[] = ['top', 'bottom', 'left', 'right'];

/* ══════════════════════════════════════════════════════════════
   TOOLTIP BALLOON (elemento renderizado no body)
   ══════════════════════════════════════════════════════════════ */

// Stylesheet compartilhado (criado uma vez, reutilizado por todas as instâncias)
const balloonStyles = new CSSStyleSheet();
balloonStyles.replaceSync(`
  :host {
    position: fixed;
    z-index: 10001;
    max-width: 320px;
    padding: 12px;
    border-radius: 8px;
    font-family: var(--font-sans, 'Inter', sans-serif);
    font-size: 11px;
    font-weight: 500;
    line-height: 1.5;
    pointer-events: none;
    user-select: none;

    /* Tactile Prism: Glassmorphism */
    background: rgba(22, 25, 32, 0.95);
    backdrop-filter: blur(12px);
    border: 1px solid var(--color-border-ui, #262a33);
    color: var(--color-text-main, #ffffff);
    box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(99, 102, 241, 0.1);

    /* Física de Mola */
    opacity: 0;
    transform: scale(0.95) translateY(4px);
    transition:
      opacity 150ms ease,
      transform 250ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
    visibility: hidden;
  }

  :host(.is-visible) {
    opacity: 1;
    transform: scale(1) translateY(0px);
    visibility: visible;
  }

  /* Variantes com Glow Neon */
  :host([variant="primary"]) { border-color: var(--color-accent-primary); box-shadow: 0 0 20px rgba(99, 102, 241, 0.2); }
  :host([variant="success"]) { border-color: var(--color-accent-success); box-shadow: 0 0 20px rgba(16, 185, 129, 0.2); }
  :host([variant="warning"]) { border-color: #f59e0b; box-shadow: 0 0 20px rgba(245, 158, 11, 0.2); }
  :host([variant="error"])   { border-color: var(--color-accent-danger); box-shadow: 0 0 20px rgba(244, 63, 94, 0.2); }

  [part="arrow"] {
    position: absolute;
    width: 8px; height: 8px;
    background: inherit;
    border: inherit;
    border-top: none; border-left: none;
  }

  :host([data-placement="top"])    [part="arrow"] { bottom: -5px; left: var(--arrow-offset, 50%); transform: translateX(-50%) rotate(45deg); }
  :host([data-placement="bottom"]) [part="arrow"] { top: -5px;    left: var(--arrow-offset, 50%); transform: translateX(-50%) rotate(-135deg); }
  :host([data-placement="left"])   [part="arrow"] { right: -5px;  top:  var(--arrow-offset, 50%); transform: translateY(-50%) rotate(-45deg); }
  :host([data-placement="right"])  [part="arrow"] { left: -5px;   top:  var(--arrow-offset, 50%); transform: translateY(-50%) rotate(135deg); }

  [part="content"] {
    display: block;
    padding: 8px;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  }

  /* Estilos internos para conteúdo rico */
  [part="content"] .tooltip-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  [part="content"] .tooltip-header ui-icon {
    color: var(--color-accent-primary);
  }

  [part="content"] .tooltip-header span {
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted, #94a3b8);
    font-weight: 500;
  }

  [part="content"] .tooltip-section {
    margin-bottom: 12px;
  }

  [part="content"] .tooltip-section:last-child {
    margin-bottom: 0;
  }

  [part="content"] .section-title {
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-accent-primary);
    margin-bottom: 8px;
  }

  [part="content"] .controls-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px 12px;
    align-items: center;
  }

  [part="content"] kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  [part="content"] .control-desc {
    font-size: 11px;
    color: var(--color-text-muted, #94a3b8);
  }

  [part="content"] .math-note {
    margin-top: 12px;
    padding: 8px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    display: flex;
    gap: 8px;
    align-items: flex-start;
    font-size: 10px;
    color: var(--color-text-muted, #94a3b8);
  }

  [part="content"] .math-note ui-icon {
    color: var(--color-accent-primary);
    flex-shrink: 0;
  }

  [part="content"] .math-note code {
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    color: var(--color-text-main);
  }
`);

class TooltipBalloon extends HTMLElement {
  #shadow: ShadowRoot;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: 'open' });

    // Aplica stylesheets (o global primeiro, depois o específico do balão)
    this.#shadow.adoptedStyleSheets = [sharedSheet, balloonStyles];

    // Adiciona estrutura HTML
    const container = document.createElement('div');
    container.innerHTML = `
      <span part="arrow"></span>
      <span part="content"></span>
    `;
    this.#shadow.appendChild(container);
  }

  setContent(content: string | DocumentFragment): void {
    const contentEl = this.#shadow.querySelector('[part="content"]')!;
    contentEl.innerHTML = '';

    if (typeof content === 'string') {
      contentEl.textContent = content;
    } else {
      contentEl.appendChild(content);
    }
  }

  show(): void {
    this.classList.add('is-visible');
  }

  hide(): void {
    this.classList.remove('is-visible');
    this.addEventListener(
      'transitionend',
      () => {
        if (!this.classList.contains('is-visible')) {
          this.remove();
        }
      },
      { once: true },
    );
  }

  position(targetRect: DOMRect, placement: Placement, offset: number): void {
    const tipRect = this.getBoundingClientRect();
    const arrowSize = 6;
    const margin = 18; // distância mínima da borda da viewport
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const order = [placement, ...PLACEMENTS.filter((p) => p !== placement)];
    let chosen: Placement | null = null;
    let coords: Coordinates | null = null;

    for (const p of order) {
      const c = this.#calcCoords(targetRect, tipRect, p, offset, arrowSize);
      if (
        c.top >= margin &&
        c.left >= margin &&
        c.top + tipRect.height <= vh - margin &&
        c.left + tipRect.width <= vw - margin
      ) {
        chosen = p;
        coords = c;
        break;
      }
    }

    if (!chosen) {
      chosen = placement;
      coords = this.#calcCoords(
        targetRect,
        tipRect,
        placement,
        offset,
        arrowSize,
      );
    }

    // --- NOVO: clamp dentro da viewport com margem de segurança ---
    const raw = coords!;
    const clampedLeft = Math.min(
      Math.max(raw.left, margin),
      vw - tipRect.width - margin,
    );
    const clampedTop = Math.min(
      Math.max(raw.top, margin),
      vh - tipRect.height - margin,
    );

    // Calcula o offset da seta para compensar o deslocamento do clamp.
    // Para placements top/bottom: seta segue o centro horizontal do target.
    // Para placements left/right: seta segue o centro vertical do target.
    const arrowMinPct = 10; // evita seta colada no canto do balloon (em %)
    const arrowMaxPct = 90;

    if (chosen === 'top' || chosen === 'bottom') {
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const arrowPct = ((targetCenterX - clampedLeft) / tipRect.width) * 100;
      const safePct = Math.min(Math.max(arrowPct, arrowMinPct), arrowMaxPct);
      this.style.setProperty('--arrow-offset', `${safePct}%`);
    } else {
      const targetCenterY = targetRect.top + targetRect.height / 2;
      const arrowPct = ((targetCenterY - clampedTop) / tipRect.height) * 100;
      const safePct = Math.min(Math.max(arrowPct, arrowMinPct), arrowMaxPct);
      this.style.setProperty('--arrow-offset', `${safePct}%`);
    }
    // --- FIM do bloco novo ---

    this.setAttribute('data-placement', chosen);
    this.style.top = `${clampedTop}px`;
    this.style.left = `${clampedLeft}px`;
  }

  #calcCoords(
    targetRect: DOMRect,
    tipRect: DOMRect,
    placement: Placement,
    offset: number,
    arrowSize: number,
  ): Coordinates {
    const gap = offset + arrowSize; // Offset do usuário + espaço para a seta
    switch (placement) {
      case 'top':
        return {
          top: targetRect.top - tipRect.height - gap,
          left: targetRect.left + (targetRect.width - tipRect.width) / 2,
        };
      case 'bottom':
        return {
          top: targetRect.bottom + gap,
          left: targetRect.left + (targetRect.width - tipRect.width) / 2,
        };
      case 'left':
        return {
          top: targetRect.top + (targetRect.height - tipRect.height) / 2,
          left: targetRect.left - tipRect.width - gap,
        };
      case 'right':
        return {
          top: targetRect.top + (targetRect.height - tipRect.height) / 2,
          left: targetRect.right + gap,
        };
    }
  }
}

customElements.define('tooltip-balloon', TooltipBalloon);

/* ══════════════════════════════════════════════════════════════
   TOOLTIP MANAGER (serviço global)
   ══════════════════════════════════════════════════════════════ */
class UiTooltipManager extends HTMLElement {
  #observer: MutationObserver | null = null;
  #activeTooltips = new WeakMap<HTMLElement, TooltipInstance>();

  connectedCallback(): void {
    this.#scanExisting();
    this.#observeNew();
    this.#setupGlobalListeners();
  }

  disconnectedCallback(): void {
    this.#observer?.disconnect();
  }

  #scanExisting(): void {
    document.querySelectorAll('[data-tooltip]').forEach((el) => {
      this.#attachTooltip(el as HTMLElement);
    });
  }

  #observeNew(): void {
    // Agrupa mutações em lotes via requestAnimationFrame para evitar
    // processamento repetitivo quando muitos elementos são adicionados de uma vez
    let pending: Set<HTMLElement> = new Set();
    let rafId: number | null = null;

    this.#observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.hasAttribute('data-tooltip')) {
              pending.add(node);
            }
            node.querySelectorAll('[data-tooltip]').forEach((el) => {
              pending.add(el as HTMLElement);
            });
          }
        });
      });

      // Debounce: processa tudo em um único frame
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        pending.forEach((el) => this.#attachTooltip(el));
        pending.clear();
        rafId = null;
      });
    });

    this.#observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  #attachTooltip(target: HTMLElement): void {
    if (this.#activeTooltips.has(target)) return;

    const config: TooltipConfig = {
      text: target.getAttribute('data-tooltip') || undefined,
      templateRef: target.getAttribute('data-tooltip-ref') || undefined,
      placement:
        (target.getAttribute('data-tooltip-placement') as Placement) || 'top',
      variant: target.getAttribute('data-tooltip-variant') || undefined,
      delay: Number(target.getAttribute('data-tooltip-delay') || 200),
      offset: Number(target.getAttribute('data-tooltip-offset') || 8),
      triggers: (
        target.getAttribute('data-tooltip-trigger') || 'hover focus'
      ).split(/\s+/) as Trigger[],
    };

    const instance = new TooltipInstance(target, config);
    this.#activeTooltips.set(target, instance);
  }

  #setupGlobalListeners(): void {
    document.addEventListener(
      'mouseenter',
      (e) => {
        // composedPath() retorna todos os elementos atravessando shadow boundaries
        const path = e.composedPath() as HTMLElement[];
        const target = path.find(
          (el) =>
            el instanceof HTMLElement && el.hasAttribute?.('data-tooltip'),
        );
        if (target && !this.#activeTooltips.has(target)) {
          this.#attachTooltip(target);
        }
      },
      { capture: true, passive: true },
    );

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document
          .querySelectorAll('tooltip-balloon')
          .forEach((b) => (b as any).hide());
      }
    });
  }
}

customElements.define('ui-tooltip-manager', UiTooltipManager);

/* ══════════════════════════════════════════════════════════════
   TOOLTIP INSTANCE (lógica por elemento)
   ══════════════════════════════════════════════════════════════ */
class TooltipInstance {
  #target: HTMLElement;
  #config: TooltipConfig;
  #balloon: TooltipBalloon | null = null;
  #controller = new AbortController();
  #openTimer: ReturnType<typeof setTimeout> | null = null;
  #closeTimer: ReturnType<typeof setTimeout> | null = null;
  #isOpen = false;

  constructor(target: HTMLElement, config: TooltipConfig) {
    this.#target = target;
    this.#config = config;
    this.#bind(); // Vincula listeners (auto-cleanup via AbortController)
  }

  #bind(): void {
    const { signal } = this.#controller;
    const { triggers } = this.#config;

    if (triggers.includes('hover')) {
      this.#target.addEventListener('mouseenter', () => this.#scheduleOpen(), {
        signal,
      });
      this.#target.addEventListener('mouseleave', () => this.#scheduleClose(), {
        signal,
      });
    }

    if (triggers.includes('focus')) {
      this.#target.addEventListener('focusin', () => this.#scheduleOpen(), {
        signal,
      });
      this.#target.addEventListener('focusout', () => this.#scheduleClose(), {
        signal,
      });
    }

    if (triggers.includes('click')) {
      this.#target.addEventListener(
        'click',
        (e) => {
          e.stopPropagation();
          this.#isOpen ? this.close() : this.open();
        },
        { signal },
      );

      // Click-outside com verificação inteligente (capture phase para melhor detecção)
      document.addEventListener(
        'click',
        (e) => {
          if (
            this.#isOpen &&
            !this.#target.contains(e.target as Node) &&
            !this.#balloon?.contains(e.target as Node)
          ) {
            this.close();
          }
        },
        { signal, capture: true },
      );
    }
  }

  #scheduleOpen(): void {
    // Cancela timer de fechamento pendente
    if (this.#closeTimer) {
      clearTimeout(this.#closeTimer);
      this.#closeTimer = null;
    }

    // Evita múltiplos timers de abertura simultâneos
    if (this.#openTimer) return;

    this.#openTimer = setTimeout(() => {
      this.#open();
      this.#openTimer = null;
    }, this.#config.delay);
  }

  #scheduleClose(): void {
    // Cancela timer de abertura pendente
    if (this.#openTimer) {
      clearTimeout(this.#openTimer);
      this.#openTimer = null;
    }

    // Evita múltiplos timers de fechamento simultâneos
    if (this.#closeTimer) return;

    this.#closeTimer = setTimeout(() => {
      this.#close();
      this.#closeTimer = null;
    }, 100);
  }

  #open(): void {
    if (this.#isOpen) return;
    this.#isOpen = true;

    const id = `tip-${Math.random().toString(36).slice(2, 9)}`;
    this.#balloon = document.createElement('tooltip-balloon') as TooltipBalloon;
    this.#balloon.id = id;

    // Vincula o target ao tooltip para leitores de tela
    this.#target.setAttribute('aria-describedby', id);

    if (this.#config.variant) {
      this.#balloon.setAttribute('variant', this.#config.variant);
    }

    // Define conteúdo (prioridade: text > templateRef > contentSlot)
    const content = this.#resolveContent();
    if (content) {
      this.#balloon.setContent(content);
    }

    document.body.appendChild(this.#balloon);

    // Posiciona após render (aguarda próximo frame para garantir dimensões corretas)
    // DEPOIS — dois frames: frame 1 = layout do shadow, frame 2 = dimensões estáveis
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const rect = this.#target.getBoundingClientRect();
        this.#balloon!.position(rect, this.#config.placement, this.#config.offset);
        this.#balloon!.show();
      });
    });
  }

  #close(): void {
    if (!this.#isOpen || !this.#balloon) return;
    this.#isOpen = false;
    this.#target.removeAttribute('aria-describedby'); // Remove o vínculo
    this.#balloon.hide();
    this.#balloon = null;
  }

  #resolveContent(): string | DocumentFragment | null {
    if (this.#config.text) {
      return this.#config.text;
    }

    if (this.#config.templateRef) {
      // Busca no documento global primeiro, depois no shadow root do target
      const root = this.#target.getRootNode() as Document | ShadowRoot;
      const tpl =
        (root.getElementById?.(this.#config.templateRef) ??
        root.querySelector?.(`#${this.#config.templateRef}`)) as HTMLTemplateElement | null
        ?? document.getElementById(this.#config.templateRef) as HTMLTemplateElement | null;

      if (tpl instanceof HTMLTemplateElement) {
        return tpl.content.cloneNode(true) as DocumentFragment;
      }
    }

    if (this.#config.contentSlot) {
      return this.#config.contentSlot.cloneNode(true) as DocumentFragment;
    }

    return null;
  }

  /* ── API Pública ── */

  /** Abre o tooltip imediatamente (cancela delays pendentes) */
  open(): void {
    if (this.#openTimer) {
      clearTimeout(this.#openTimer);
      this.#openTimer = null;
    }
    if (this.#closeTimer) {
      clearTimeout(this.#closeTimer);
      this.#closeTimer = null;
    }
    this.#open();
  }

  /** Fecha o tooltip imediatamente (cancela delays pendentes) */
  close(): void {
    if (this.#openTimer) {
      clearTimeout(this.#openTimer);
      this.#openTimer = null;
    }
    if (this.#closeTimer) {
      clearTimeout(this.#closeTimer);
      this.#closeTimer = null;
    }
    this.#close();
  }

  /** Atualiza configuração sem recriar a instância completa */
  updateConfig(newConfig: Partial<TooltipConfig>): void {
    Object.assign(this.#config, newConfig);

    // Se está aberto, atualiza conteúdo dinamicamente
    // DEPOIS — reposiciona após dois frames (dimensões do novo conteúdo)
    if (this.#isOpen && this.#balloon) {
      const content = this.#resolveContent();
      if (content) {
        this.#balloon.setContent(content);

        const balloon = this.#balloon;
        const rect = this.#target.getBoundingClientRect();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            balloon.position(rect, this.#config.placement, this.#config.offset);
          });
        });
      }

      if (newConfig.variant !== undefined) {
        if (newConfig.variant) {
          this.#balloon.setAttribute('variant', newConfig.variant);
        } else {
          this.#balloon.removeAttribute('variant');
        }
      }
    }
  }

  /** Limpa timers e listeners */
  destroy(): void {
    if (this.#openTimer) {
      clearTimeout(this.#openTimer);
      this.#openTimer = null;
    }
    if (this.#closeTimer) {
      clearTimeout(this.#closeTimer);
      this.#closeTimer = null;
    }
    this.#controller.abort();
    this.#close();
  }
}

/* ══════════════════════════════════════════════════════════════
   TOOLTIP WRAPPER (mantém API original com slots)
   ══════════════════════════════════════════════════════════════ */
const TEMPLATE_WRAPPER = document.createElement('template');
TEMPLATE_WRAPPER.innerHTML = `
<style>
  :host { display: contents; }
</style>
<slot name="target"></slot>
<slot name="content" style="display: none;"></slot>
`;

class UiTooltip extends HTMLElement {
  #shadow: ShadowRoot;
  #targetSlot: HTMLSlotElement;
  #contentSlot: HTMLSlotElement;
  #instance: TooltipInstance | null = null;

  static observedAttributes = [
    'trigger',
    'placement',
    'tooltip',
    'tooltip-ref',
    'variant',
    'delay',
    'offset',
  ];

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: 'open' });
    this.#shadow.adoptedStyleSheets = [sharedSheet];
    this.#shadow.appendChild(TEMPLATE_WRAPPER.content.cloneNode(true));
    this.#targetSlot = this.#shadow.querySelector('slot[name="target"]')!;
    this.#contentSlot = this.#shadow.querySelector('slot[name="content"]')!;
  }

  connectedCallback(): void {
    this.#targetSlot.addEventListener('slotchange', () => this.#init());
    this.#init();
  }

  disconnectedCallback(): void {
    this.#instance?.destroy();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ): void {
    if (oldValue === newValue || !this.#instance) return;

    // Otimização: apenas reconfigura ao invés de destruir/recriar para mudanças leves
    if (['tooltip', 'tooltip-ref', 'variant'].includes(name)) {
      this.#instance.updateConfig(this.#buildConfig());
    } else {
      // Recria apenas para mudanças estruturais (triggers, placement, etc)
      this.#init();
    }
  }

  #init(): void {
    const targets = this.#targetSlot.assignedElements({ flatten: true });
    if (!targets.length) return;

    this.#instance?.destroy();

    const target = targets[0] as HTMLElement;
    const config = this.#buildConfig();

    this.#instance = new TooltipInstance(target, config);
  }

  #buildConfig(): TooltipConfig {
    const contentNodes = this.#contentSlot.assignedNodes({ flatten: true });
    const contentSlot =
      contentNodes.length > 0 ? this.#extractContent(contentNodes) : undefined;

    return {
      text: this.getAttribute('tooltip') || undefined,
      templateRef: this.getAttribute('tooltip-ref') || undefined,
      contentSlot,
      placement: (this.getAttribute('placement') as Placement) || 'top',
      variant: this.getAttribute('variant') || undefined,
      delay: Number(this.getAttribute('delay') || 200),
      offset: Number(this.getAttribute('offset') || 8),
      triggers: (this.getAttribute('trigger') || 'hover focus').split(
        /\s+/,
      ) as Trigger[],
    };
  }

  #extractContent(nodes: Node[]): DocumentFragment {
    const frag = document.createDocumentFragment();
    const wrapper = document.createElement('div');

    // Função recursiva para clonar elementos preservando custom elements
    const cloneNodeDeep = (node: Node): Node => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.cloneNode(false);
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element;
        const clone = document.createElement(el.nodeName.toLowerCase());

        // Copia todos os atributos
        for (const attr of Array.from(el.attributes)) {
          clone.setAttribute(attr.name, attr.value);
        }

        // Copia children recursivamente
        for (const child of Array.from(el.childNodes)) {
          clone.appendChild(cloneNodeDeep(child));
        }

        return clone;
      }

      return node.cloneNode(false);
    };

    nodes.forEach((n) => {
      wrapper.appendChild(cloneNodeDeep(n));
    });

    // Transforma classes utilitárias em estrutura semântica para o balloon
    // Header do tooltip
    const header = wrapper.querySelector(
      '[class*="tooltip-header"], [class*="header"]',
    );
    if (header) {
      header.classList.add('tooltip-header');
    }

    // Títulos de seção
    wrapper
      .querySelectorAll('[class*="section-title"], [class*="title"]')
      .forEach((el) => {
        el.classList.add('section-title');
      });

    // Grid de controles
    wrapper.querySelectorAll('[class*="grid"]').forEach((el) => {
      el.classList.add('controls-grid');
    });

    // Kbd elements
    wrapper.querySelectorAll('kbd, [class*="kbd"]').forEach((el) => {
      el.classList.add('kbd');
    });

    // Descrições de controles
    wrapper
      .querySelectorAll('[class*="desc"], [class*="text-muted"]')
      .forEach((el) => {
        if (!el.classList.contains('section-title')) {
          el.classList.add('control-desc');
        }
      });

    // Math notes
    wrapper
      .querySelectorAll('[class*="note"], [class*="math"]')
      .forEach((el) => {
        el.classList.add('math-note');
      });

    // Seções
    wrapper
      .querySelectorAll('[class*="mb-"], [class*="section"]')
      .forEach((el) => {
        el.classList.add('tooltip-section');
      });

    frag.appendChild(wrapper);
    return frag;
  }

  /* ── API Pública ── */

  open(): void {
    this.#instance?.open();
  }

  close(): void {
    this.#instance?.close();
  }

  get isOpen(): boolean {
    return (this.#instance as any)?.['#isOpen'] ?? false;
  }
}

customElements.define('ui-tooltip', UiTooltip);
