/**
 * @component app-color-picker
 * @description Seletor de cor técnico com suporte a transparente e histórico por instância.
 *
 * @attr {string}  label           - Label exibida acima do swatch (ex: "Fill").
 * @attr {string}  value           - Cor atual em qualquer formato CSS válido. Use "transparent" para sem cor.
 * @attr {boolean} no-transparent  - Quando presente, oculta o swatch fixo de transparente.
 *
 * @property {string} value - Getter/Setter programático da cor atual.
 *
 * @fires app-color-pick - CustomEvent com { detail: { value: string } }.
 *                         Valor é sempre um HEX (#rrggbb) ou "transparent".
 *                         bubbles: true, composed: true.
 *
 * @csspart label         - O elemento de label (`.label-prism`).
 * @csspart trigger       - O botão swatch principal (clicável).
 * @csspart swatch-color  - O quadrado colorido dentro do trigger.
 * @csspart recent-swatch - Cada swatch do histórico recente.
 *
 * @cssprop --color-picker-swatch-size - Tamanho do swatch principal (padrão: 32px).
 * @cssprop --color-picker-gap         - Gap interno do layout (padrão: 6px).
 */

import { sharedSheet } from '../../utils/shared-styles';

// ---------------------------------------------------------------------------
// Constantes
// ---------------------------------------------------------------------------

const TRANSPARENT = 'transparent';
const MAX_RECENT = 3;
const EVENT_NAME = 'app-color-pick';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Converte qualquer cor CSS para HEX (#rrggbb) via canvas offscreen. */
function toHex(color: string): string {
  if (color === TRANSPARENT) return TRANSPARENT;
  try {
    const canvas = new OffscreenCanvas(1, 1);
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`;
  } catch {
    return color;
  }
}

/** Retorna true se a cor for considerada "escura" (para contraste do ícone). */
function isDark(hex: string): boolean {
  if (hex === TRANSPARENT) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

// ---------------------------------------------------------------------------
// Estilos encapsulados
// ---------------------------------------------------------------------------

const styles = new CSSStyleSheet();
styles.replaceSync(/* css */`
  /* ── Host ─────────────────────────────────────────────────────────────── */
  :host {
    display: block;
    container-type: inline-size;
    container-name: color-picker;
    position: relative;
    width: 100%;
    --_swatch-size: var(--color-picker-swatch-size, 32px);
    --_gap: var(--color-picker-gap, 6px);
  }

  /* ── Label ─────────────────────────────────────────────────────────────── */
  .label-prism {
    display: block;
    margin-bottom: 4px;
  }

  /* ── Wrapper (trigger + recentes inline) ──────────────────────────────── */
  .picker-row {
    display: flex;
    align-items: center;
    gap: var(--_gap);
  }

  /* ── Trigger (swatch principal) ───────────────────────────────────────── */
  .trigger {
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
    height: var(--_swatch-size);
    padding: 0 8px 0 4px;
    border-radius: 6px;
    border: 1px solid var(--border-ui, #262a33);
    background: var(--bg-black-20, rgba(0,0,0,0.2));
    cursor: pointer;
    flex-shrink: 0;
    transition: border-color 200ms ease, box-shadow 200ms ease;
    outline: none;
    font-family: var(--font-mono, 'JetBrains Mono', monospace);
    font-size: 10px;
    color: var(--text-muted, #64748b);
    white-space: nowrap;
    -webkit-user-select: none;
    user-select: none;
  }

  .trigger:hover {
    border-color: var(--accent-primary, #6366f1);
  }

  .trigger:focus-visible {
    border-color: var(--accent-primary, #6366f1);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.25);
  }

  .trigger:active {
    transform: scale(0.96);
  }

  /* ── Swatch Color (quadrado colorido dentro do trigger) ───────────────── */
  .swatch-color {
    width: calc(var(--_swatch-size) - 10px);
    height: calc(var(--_swatch-size) - 10px);
    border-radius: 4px;
    border: 1px solid rgba(255,255,255,0.08);
    flex-shrink: 0;
    transition: background-color 150ms ease;
    /* padrão xadrez para representar transparente */
    background-image:
      linear-gradient(45deg, #3a3a3a 25%, transparent 25%),
      linear-gradient(-45deg, #3a3a3a 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #3a3a3a 75%),
      linear-gradient(-45deg, transparent 75%, #3a3a3a 75%);
    background-size: 8px 8px;
    background-position: 0 0, 0 4px, 4px -4px, -4px 0;
  }

  .swatch-color[data-color]:not([data-color="transparent"]) {
    background-image: none;
    background-color: var(--_current-color, #000);
  }

  /* ── Hex text (oculto no modo compacto via container query) ──────────── */
  .hex-text {
    display: none;
  }

  /* ── Recentes (swatches pequenos ao lado do trigger) ─────────────────── */
  .recents {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .recent-swatch {
    width: calc(var(--_swatch-size) - 10px);
    height: calc(var(--_swatch-size) - 10px);
    border-radius: 4px;
    border: 1px solid rgba(255,255,255,0.08);
    cursor: pointer;
    flex-shrink: 0;
    transition:
      border-color 150ms ease,
      transform 200ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
    outline: none;
  }

  .recent-swatch:hover {
    border-color: rgba(255,255,255,0.3);
    transform: scale(1.15);
  }

  .recent-swatch:focus-visible {
    border-color: var(--accent-primary, #6366f1);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.25);
  }

  /* Swatch "Transparente" fixo */
  .swatch-transparent {
    background-image:
      linear-gradient(45deg, #3a3a3a 25%, transparent 25%),
      linear-gradient(-45deg, #3a3a3a 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #3a3a3a 75%),
      linear-gradient(-45deg, transparent 75%, #3a3a3a 75%);
    background-size: 8px 8px;
    background-position: 0 0, 0 4px, 4px -4px, -4px 0;
  }

  /* ── Native color input (invisível, acionado programaticamente) ───────── */
  .native-input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }

  /* ── Container Queries ────────────────────────────────────────────────── */

  /* Expandido: mostra o valor HEX e swatches maiores */
  @container color-picker (min-width: 160px) {
    .hex-text {
      display: block;
    }
    .trigger {
      flex: 1; /* ocupa o espaço disponível */
    }
    .swatch-color {
      width: calc(var(--_swatch-size) - 8px);
      height: calc(var(--_swatch-size) - 8px);
    }
    .recent-swatch {
      width: calc(var(--_swatch-size) - 8px);
      height: calc(var(--_swatch-size) - 8px);
    }
  }

  /* Muito expandido: aumenta o swatch principal */
  @container color-picker (min-width: 240px) {
    .swatch-color {
      width: calc(var(--_swatch-size) - 4px);
      height: calc(var(--_swatch-size) - 4px);
      border-radius: 5px;
    }
  }
`);

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------

export class AppColorPicker extends HTMLElement {

  // ── Campos privados ──────────────────────────────────────────────────────
  #shadow: ShadowRoot;
  #controller: AbortController | null = null;

  // Elementos internos
  #labelEl!: HTMLElement;
  #triggerEl!: HTMLButtonElement;
  #swatchColorEl!: HTMLSpanElement;
  #hexTextEl!: HTMLSpanElement;
  #recentsEl!: HTMLElement;
  #nativeInput!: HTMLInputElement;

  #currentValue: string = '#000000';

  /** Histórico exclusivo desta instância — não compartilhado entre componentes. */
  #recentColors: string[] = [];

  // ── API declarativa ──────────────────────────────────────────────────────
  static observedAttributes = ['label', 'value', 'no-transparent'];

  // ── Constructor ──────────────────────────────────────────────────────────
  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: 'open' });
    this.#shadow.adoptedStyleSheets = [sharedSheet, styles];
    this.#buildDOM();
  }

  // ── Lifecycle ────────────────────────────────────────────────────────────

  connectedCallback(): void {
    this.#controller = new AbortController();
    this.#setupListeners();
    this.#syncFromAttributes();
  }

  disconnectedCallback(): void {
    this.#controller?.abort();
    this.#controller = null;
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string): void {
    if (oldVal === newVal) return;

    if (name === 'label') {
      this.#labelEl.textContent = newVal;
    }

    if (name === 'value') {
      this.#applyColor(newVal, false);
    }

    if (name === 'no-transparent') {
      // Só re-renderiza se o componente já estiver conectado ao DOM.
      // attributeChangedCallback pode disparar antes de connectedCallback,
      // quando o #controller ainda é null.
      if (this.#controller) this.#renderRecents();
    }
  }

  // ── API pública ──────────────────────────────────────────────────────────

  /** Cor atual. Retorna HEX (#rrggbb) ou "transparent". */
  get value(): string {
    return this.#currentValue;
  }

  set value(val: string) {
    const hex = toHex(val);
    if (hex === this.#currentValue) return;
    this.#applyColor(hex, false);
    this.setAttribute('value', hex);
  }

  // ── Construção do DOM ────────────────────────────────────────────────────

  #buildDOM(): void {
    // Label
    this.#labelEl = document.createElement('span');
    this.#labelEl.className = 'label-prism';
    this.#labelEl.setAttribute('part', 'label');

    // Row
    const row = document.createElement('div');
    row.className = 'picker-row';

    // Trigger
    this.#triggerEl = document.createElement('button');
    this.#triggerEl.type = 'button';
    this.#triggerEl.className = 'trigger';
    this.#triggerEl.setAttribute('part', 'trigger');
    this.#triggerEl.setAttribute('aria-label', 'Selecionar cor');
    this.#triggerEl.setAttribute('aria-haspopup', 'dialog');

    // Swatch color (quadrado)
    this.#swatchColorEl = document.createElement('span');
    this.#swatchColorEl.className = 'swatch-color';
    this.#swatchColorEl.setAttribute('part', 'swatch-color');
    this.#swatchColorEl.setAttribute('aria-hidden', 'true');

    // Hex text
    this.#hexTextEl = document.createElement('span');
    this.#hexTextEl.className = 'hex-text';

    this.#triggerEl.appendChild(this.#swatchColorEl);
    this.#triggerEl.appendChild(this.#hexTextEl);

    // Input nativo (invisível)
    this.#nativeInput = document.createElement('input');
    this.#nativeInput.type = 'color';
    this.#nativeInput.className = 'native-input';
    this.#nativeInput.setAttribute('aria-hidden', 'true');
    this.#nativeInput.tabIndex = -1;

    this.#triggerEl.appendChild(this.#nativeInput);

    // Recentes
    this.#recentsEl = document.createElement('div');
    this.#recentsEl.className = 'recents';
    this.#recentsEl.setAttribute('aria-label', 'Cores recentes');

    row.appendChild(this.#triggerEl);
    row.appendChild(this.#recentsEl);

    this.#shadow.appendChild(this.#labelEl);
    this.#shadow.appendChild(row);
  }

  // ── Listeners ────────────────────────────────────────────────────────────

  #setupListeners(): void {
    const sig = { signal: this.#controller!.signal };

    // Clique no trigger → abre o color picker nativo
    this.#triggerEl.addEventListener('click', () => {
      this.#nativeInput.click();
    }, sig);

    // Mudança no input nativo (picker fechado com cor escolhida)
    this.#nativeInput.addEventListener('change', () => {
      const hex = this.#nativeInput.value;
      this.#applyColor(hex, true);
    }, sig);

    // Input contínuo (enquanto o picker está aberto — live preview)
    this.#nativeInput.addEventListener('input', () => {
      const hex = this.#nativeInput.value;
      this.#applyColor(hex, false); // não commita no histórico ainda
    }, sig);
  }

  // ── Lógica interna ───────────────────────────────────────────────────────

  /**
   * Aplica uma cor ao estado interno e à UI.
   * @param color - Cor em formato HEX ou "transparent".
   * @param commit - Se true, adiciona ao histórico e dispara o evento.
   */
  #applyColor(color: string, commit: boolean): void {
    const normalized = color === TRANSPARENT ? TRANSPARENT : toHex(color);
    this.#currentValue = normalized;

    // Atualiza swatch principal
    if (normalized === TRANSPARENT) {
      this.#swatchColorEl.removeAttribute('data-color');
      this.#swatchColorEl.style.removeProperty('--_current-color');
      this.#hexTextEl.textContent = 'None';
    } else {
      this.#swatchColorEl.setAttribute('data-color', normalized);
      this.#swatchColorEl.style.setProperty('--_current-color', normalized);
      this.#hexTextEl.textContent = normalized.toUpperCase();
      // Sincroniza o input nativo (para a próxima abertura do picker)
      if (this.#nativeInput.value !== normalized) {
        this.#nativeInput.value = normalized;
      }
    }

    // Atualiza aria-label do trigger
    this.#triggerEl.setAttribute(
      'aria-label',
      `Cor atual: ${normalized === TRANSPARENT ? 'transparente' : normalized}`
    );

    if (commit) {
      // Histórico exclusivo desta instância
      if (normalized !== TRANSPARENT) {
        this.#recentColors = [
          normalized,
          ...this.#recentColors.filter(c => c !== normalized),
        ].slice(0, MAX_RECENT);
      }
      this.#renderRecents();
      this.#dispatchChange(normalized);
    }
  }

  /** Renderiza os swatches de histórico + o fixo "Transparente" (se habilitado). */
  #renderRecents(): void {
    this.#recentsEl.innerHTML = '';
    // O signal pode ser null se chamado antes de connectedCallback — listeners
    // adicionados sem signal são limpos manualmente via innerHTML = '' na próxima chamada.
    const signal = this.#controller?.signal;
    const sig = signal ? { signal } : {};

    // Swatch fixo: Transparente — omitido se o atributo no-transparent estiver presente
    if (!this.hasAttribute('no-transparent')) {
      const transparentBtn = this.#makeRecentSwatch(TRANSPARENT, 'Transparente', true);
      transparentBtn.addEventListener('click', () => {
        this.#applyColor(TRANSPARENT, true);
      }, sig);
      this.#recentsEl.appendChild(transparentBtn);
    }

    // Swatches do histórico desta instância
    for (const color of this.#recentColors) {
      const btn = this.#makeRecentSwatch(color, color.toUpperCase(), false);
      btn.addEventListener('click', () => {
        this.#applyColor(color, true);
      }, sig);
      this.#recentsEl.appendChild(btn);
    }
  }

  /** Cria um botão-swatch para o painel de recentes. */
  #makeRecentSwatch(
    color: string,
    ariaLabel: string,
    isTransparent: boolean
  ): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `recent-swatch${isTransparent ? ' swatch-transparent' : ''}`;
    btn.setAttribute('part', 'recent-swatch');
    btn.setAttribute('aria-label', ariaLabel);
    btn.title = ariaLabel;

    if (!isTransparent) {
      btn.style.backgroundColor = color;
      btn.style.borderColor = isDark(color)
        ? 'rgba(255,255,255,0.12)'
        : 'rgba(0,0,0,0.15)';
    }

    return btn;
  }

  /** Despacha o evento público. */
  #dispatchChange(value: string): void {
    this.dispatchEvent(
      new CustomEvent(EVENT_NAME, {
        detail: { value },
        bubbles: true,
        composed: true,
      })
    );
  }

  /** Sincronização inicial a partir dos atributos HTML. */
  #syncFromAttributes(): void {
    const label = this.getAttribute('label') || '';
    const value = this.getAttribute('value') || '#000000';

    this.#labelEl.textContent = label;
    this.#applyColor(value, false);
    this.#renderRecents(); // renderiza recentes (pode já ter histórico de outra instância)
  }
}

customElements.define('app-color-picker', AppColorPicker);

/*
┌─────────────────────────────────────────────────────────────┐
│ CHECKLIST DE VALIDAÇÃO                                      │
│                                                             │
│ ✅ Shadow DOM encapsulado (adoptedStyleSheets)              │
│ ✅ Listeners limpos via AbortController no disconnect       │
│ ✅ Atributos 'label', 'value', 'no-transparent' observados  │
│ ✅ Evento app-color-pick com { detail: { value } }          │
│ ✅ CSS vars expostas: --color-picker-swatch-size, --gap     │
│ ✅ Parts expostos: label, trigger, swatch-color,            │
│    recent-swatch                                            │
│ ✅ Acessibilidade: aria-label, aria-haspopup, title         │
│ ✅ Container queries para layout compacto/expandido         │
│ ✅ sharedSheet integrado (mesmo padrão do projeto)          │
│ ✅ Histórico #recentColors isolado por instância            │
│ ✅ no-transparent oculta apenas o swatch visual             │
│ ✅ Transparente como valor CSS válido ("transparent")       │
│ ✅ toHex via OffscreenCanvas (sem dependências)             │
└─────────────────────────────────────────────────────────────┘
*/

/*
══════════════════════════════════════════════════════════════
EXEMPLO DE USO
══════════════════════════════════════════════════════════════

── Modo compacto (grid 2 colunas) — históricos independentes ─

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 200px;">
  <app-color-picker label="Fill"   value="#6366f1" data-prop="fillColor"></app-color-picker>
  <app-color-picker label="Stroke" value="#10b981" data-prop="strokeColor" no-transparent></app-color-picker>
</div>

  Resultado: cada instância mantém seu próprio histórico de 3 cores.
  "Stroke" não exibe o swatch de transparente.


── Modo expandido (painel lateral) ─────────────────────────

<app-color-picker
  label="Background"
  value="#ffffff"
  no-transparent
  style="width: 280px;"
  data-prop="bgColor"
></app-color-picker>


── Transparente como valor inicial (swatch habilitado) ──────

<app-color-picker label="Fill" value="transparent" data-prop="fillColor"></app-color-picker>


── Toggle dinâmico do swatch de transparente ────────────────

const picker = document.querySelector('app-color-picker');
picker.setAttribute('no-transparent', '');   // oculta
picker.removeAttribute('no-transparent');    // restaura


── Integração com o InspectorSectionRect ───────────────────

// No render():
<app-color-picker label="Fill"   data-prop="fillColor"   value="${el.fillColor}"></app-color-picker>
<app-color-picker label="Stroke" data-prop="strokeColor" value="${el.strokeColor}" no-transparent></app-color-picker>

// No setupListeners() — usa o mesmo handler existente:
root.addEventListener('app-color-pick', handler);

// No resolveInspectorValue(e):
if (e instanceof CustomEvent && e.type === 'app-color-pick') {
  return (e as CustomEvent).detail.value;
}


── Customização via CSS vars ────────────────────────────────

app-color-picker {
  --color-picker-swatch-size: 28px;
  --color-picker-gap: 4px;
}

══════════════════════════════════════════════════════════════
*/