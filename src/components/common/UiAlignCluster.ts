/**
 * @element ui-align-cluster
 */

import { HelpContentProvider } from '../../utils/HelpContentProvider';
import { sharedSheet } from '../../utils/shared-styles';

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type AlignAction =
  | 'alignLeft'
  | 'alignCenter'
  | 'alignRight'
  | 'alignTop'
  | 'alignMiddle'
  | 'alignBottom'
  | 'distributeHorizontal'
  | 'distributeVertical';

interface PadConfig {
  action: AlignAction;
  title: string;
  icon: string; // SVG path (viewBox 0 0 16 16)
}

// ─── Ícones SVG inline (16×16, stroke-based) ──────────────────────────────────

const ICONS: Record<AlignAction, string> = {
  alignLeft: `<line x1="2" y1="2" x2="2" y2="14"/><rect x="4" y="4" width="6" height="3" rx="1"/><rect x="4" y="9" width="9" height="3" rx="1"/>`,
  alignCenter: `<line x1="8" y1="2" x2="8" y2="14"/><rect x="3" y="4" width="10" height="3" rx="1"/><rect x="5" y="9" width="6" height="3" rx="1"/>`,
  alignRight: `<line x1="14" y1="2" x2="14" y2="14"/><rect x="6" y="4" width="6" height="3" rx="1"/><rect x="3" y="9" width="9" height="3" rx="1"/>`,
  alignTop: `<line x1="2" y1="2" x2="14" y2="2"/><rect x="4" y="4" width="3" height="6" rx="1"/><rect x="9" y="4" width="3" height="9" rx="1"/>`,
  alignMiddle: `<line x1="2" y1="8" x2="14" y2="8"/><rect x="4" y="3" width="3" height="10" rx="1"/><rect x="9" y="5" width="3" height="6" rx="1"/>`,
  alignBottom: `<line x1="2" y1="14" x2="14" y2="14"/><rect x="4" y="6" width="3" height="6" rx="1"/><rect x="9" y="3" width="3" height="9" rx="1"/>`,
  distributeHorizontal: `<line x1="2" y1="2" x2="2" y2="14"/><line x1="14" y1="2" x2="14" y2="14"/><rect x="5" y="5" width="6" height="6" rx="1"/>`,
  distributeVertical: `<line x1="2" y1="2" x2="14" y2="2"/><line x1="2" y1="14" x2="14" y2="14"/><rect x="5" y="5" width="6" height="6" rx="1"/>`,
};

function makeSvg(paths: string): string {
  return `<svg viewBox="0 0 16 16" width="14" height="14" fill="none"
    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true">${paths}</svg>`;
}

const ROWS: { label: string; pads: PadConfig[]; distribute: PadConfig }[] = [
  {
    label: 'Horizontal',
    pads: [
      { action: 'alignLeft', title: 'Align Left', icon: ICONS.alignLeft },
      { action: 'alignCenter', title: 'Align Center', icon: ICONS.alignCenter },
      { action: 'alignRight', title: 'Align Right', icon: ICONS.alignRight },
    ],
    distribute: {
      action: 'distributeHorizontal',
      title: 'Distribute Horizontally',
      icon: ICONS.distributeHorizontal,
    },
  },
  {
    label: 'Vertical',
    pads: [
      { action: 'alignTop', title: 'Align Top', icon: ICONS.alignTop },
      { action: 'alignMiddle', title: 'Align Middle', icon: ICONS.alignMiddle },
      { action: 'alignBottom', title: 'Align Bottom', icon: ICONS.alignBottom },
    ],
    distribute: {
      action: 'distributeVertical',
      title: 'Distribute Vertically',
      icon: ICONS.distributeVertical,
    },
  },
];

const sheet = new CSSStyleSheet();
sheet.replaceSync(/* css */ `
  :host([hidden]) { display: none !important; }

  :host {
    display: block;
    width: 100%;
    margin-bottom: 16px;
    --_accent:      var(--align-cluster-accent, var(--color-accent-primary, #6366f1));
    --_btn-size:    var(--align-cluster-btn-size, 32px);
    --_btn-radius:  var(--align-cluster-btn-radius, 6px);
    --_gap:         var(--align-cluster-gap, 4px);
  }

  .cluster-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .cluster-label {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-muted, #6b7280);
  }
  
  .cluster-board {
    background-color: rgba(10, 12, 16, 0.8);
    border: 1px solid var(--color-border-ui, #262a33);
    border-radius: 8px;
    padding: 6px;
    box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    gap: var(--_gap);
  }

  .cluster-row { display: flex; align-items: center; gap: var(--_gap); }

  .cluster-divider {
    width: 1px; height: 20px;
    background-color: var(--color-border-ui, #262a33);
    margin: 0 2px; flex-shrink: 0;
  }

  .pad-btn {
    width: var(--_btn-size); height: var(--_btn-size);
    display: flex; align-items: center; justify-content: center;
    background-color: transparent; border: 1px solid transparent;
    border-radius: var(--_btn-radius); color: var(--color-text-muted, #6b7280);
    cursor: pointer; user-select: none;
    transition: all 0.2s var(--ease-spring);
  }

  .pad-btn:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
    color: var(--color-text-main, #e5e7eb);
  }
  
  .pad-btn:active {
    transform: translateY(1.5px) scale(0.91);
    background-color: color-mix(in srgb, var(--_accent) 15%, transparent);
    border-color: var(--_accent); color: var(--_accent);
  }

  .options-row {
    margin-top: 8px; padding: 4px 8px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(255,255,255,0.02); border-radius: 4px;
  }

  .checkbox-label {
    display: flex; align-items: center; gap: 8px;
    font-family: var(--font-mono); font-size: 9px;
    color: var(--color-text-muted); cursor: pointer;
  }
`);

export class UiAlignCluster extends HTMLElement {
  #shadow: ShadowRoot;
  #controller: AbortController | null = null;
  #toCanvas: boolean = false;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: 'open' });
    this.#buildTemplate();
  }

  connectedCallback(): void {
    this.#shadow.adoptedStyleSheets = [sharedSheet, sheet];
    this.#controller = new AbortController();
    const { signal } = this.#controller;

    const board = this.#shadow.querySelector('.cluster-board');
    board?.addEventListener('click', this.#handleClick, { signal });

    this.#shadow.getElementById('chk-canvas')?.addEventListener('change', (e: any) => {
      this.#toCanvas = e.target.checked;
    }, { signal });
  }

  disconnectedCallback(): void {
    this.#controller?.abort();
    this.#controller = null;
  }

  #buildTemplate(): void {
    const header = document.createElement('div');
    header.className = 'cluster-header';
    header.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="cluster-label">Power Layout</span>
        ${HelpContentProvider.buildTooltip('layout', 'left')}
      </div>
      <span class="font-mono text-[9px] text-accent-primary bg-accent-primary/10 px-1.5 rounded border border-accent-primary/20">MULTI</span>
    `;

    const board = document.createElement('div');
    board.className = 'cluster-board';
    board.setAttribute('part', 'cluster-board');

    for (const rowConfig of ROWS) {
      const row = document.createElement('div');
      row.className = 'cluster-row';
      for (const pad of rowConfig.pads) {
        row.appendChild(this.#createPadButton(pad));
      }
      row.appendChild(this.#createDivider());
      row.appendChild(this.#createPadButton(rowConfig.distribute));
      board.appendChild(row);
    }

    const options = document.createElement('div');
    options.className = 'options-row';
    options.innerHTML = `
      <label class="checkbox-label">
        <input type="checkbox" id="chk-canvas">
        <span>Align to Canvas</span>
      </label>
    `;

    this.#shadow.appendChild(header);
    this.#shadow.appendChild(board);
    this.#shadow.appendChild(options);
  }

  #createPadButton(config: PadConfig): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = 'pad-btn';
    btn.dataset.action = config.action;
    btn.title = config.title;
    btn.type = 'button';
    btn.innerHTML = makeSvg(config.icon);
    return btn;
  }

  #createDivider(): HTMLSpanElement {
    const div = document.createElement('span');
    div.className = 'cluster-divider';
    return div;
  }

  readonly #handleClick = (e: Event): void => {
    const target = (e.target as HTMLElement).closest<HTMLButtonElement>('.pad-btn');
    if (!target) return;

    const action = target.dataset.action as AlignAction | undefined;
    if (!action) return;

    this.dispatchEvent(new CustomEvent('layout-action', {
      detail: { action, toCanvas: this.#toCanvas },
      bubbles: true,
      composed: true,
    }));

    this.dispatchEvent(new CustomEvent('sound-request', {
      detail: { preset: 'replace' },
      bubbles: true,
      composed: true,
    }));
  };
}

customElements.define('ui-align-cluster', UiAlignCluster);
