import { TextElement } from '../../../../domain/models/elements/SpecificElements';
import { sharedSheet } from '../../../../utils/shared-styles';
import { dispatchInspectorChange, resolveInspectorValue } from '../inspector-events';
import { escapeHTML } from '../../../../utils/sanitize';

// Garantir registros
import '../../../common/AppInput';
import '../../../common/UINumberScrubber';
import '../../../common/tooltip';
import '../../../common/icon';

interface InputWithMetadata extends HTMLElement {
  value: string | number;
}

/**
 * InspectorSectionText: Propriedades de Tipografia e Conteúdo.
 */
export class InspectorSectionText extends HTMLElement {
  private _element: TextElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  set element(el: TextElement) {
    this._element = el;
    this.syncValues();
  }

  connectedCallback(): void {
    this.render();
    this.setupListeners();
    this.syncValues();
  }

  private render(): void {
    if (!this.shadowRoot || !this._element) return;

    const el = this._element;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; flex-direction: column; gap: 8px; }
        .row-ui { display: flex; gap: 10px; align-items: flex-end; }
        .row-ui > * { flex: 1; min-width: 0; }
        .fixed-small { flex: none; width: 100px; }
      </style>
      
      <div class="flex items-center justify-between mb-1">
        <span class="label-prism" style="margin:0">Typography</span>
        <ui-tooltip placement="left" offset="12">
          <button slot="target" class="help-btn cursor-help opacity-50" aria-label="Manual Técnico">
            <ui-icon name="help" size="sm"></ui-icon>
          </button>
          <div slot="content" class="tooltip-rich-panel w-60">
            <div class="tooltip-rich-header mb-2 pb-1.5 border-b border-white/10 flex items-center gap-1.5">
              <ui-icon name="brackets" class="w-3.5 h-3.5 text-accent-primary"></ui-icon>
              <span class="font-mono text-[10px] text-text-main font-semibold uppercase tracking-wider">
                Dynamic Interpolation
              </span>
            </div>
            <div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 items-center text-[10px] mb-1">
              <code class="font-mono text-accent-primary bg-accent-primary/10 px-1 py-0.5 rounded border border-accent-primary/20">:upper</code> 
              <span class="text-text-muted">MAIÚSCULAS</span>
              <code class="font-mono text-accent-primary bg-accent-primary/10 px-1 py-0.5 rounded border border-accent-primary/20">:currency</code> 
              <span class="text-text-muted">R$ 1.250,00</span>
              <code class="font-mono text-accent-primary bg-accent-primary/10 px-1 py-0.5 rounded border border-accent-primary/20">:date</code> 
              <span class="text-text-muted">19/04/2026</span>
              <code class="font-mono text-accent-primary bg-accent-primary/10 px-1 py-0.5 rounded border border-accent-primary/20">:trunc(N)</code> 
              <span class="text-text-muted">Limita a N chars</span>
              <code class="font-mono text-accent-warning bg-accent-warning/10 px-1 py-0.5 rounded border border-accent-warning/20">||Default</code> 
              <span class="text-text-muted">Valor reserva</span>
            </div>
          </div>
        </ui-tooltip>
      </div>

      <div class="row-ui">
        <app-input label="Content" data-prop="content" value="${escapeHTML(el.content)}" style="flex:1"></app-input>
      </div>
      <div class="row-ui">
        <ui-number-scrubber label="Size" data-prop="fontSize" value="${el.fontSize}" min="1" max="200" step="1" unit="pt"></ui-number-scrubber>
        <app-input label="Color" type="color" data-prop="color" value="${escapeHTML(el.color)}" class="fixed-small"></app-input>
      </div>
      <div class="row-ui">
        <ui-number-scrubber label="Lead" data-prop="lineHeight" value="${el.lineHeight || 1.2}" min="0.5" max="3" step="0.1" unit="lh"></ui-number-scrubber>
        <app-input label="Weight" data-prop="fontWeight" value="${escapeHTML(String(el.fontWeight))}" class="fixed-small"></app-input>
      </div>
    `;
  }

  private setupListeners(): void {
    const root = this.shadowRoot!;
    
    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      const prop = target.getAttribute('data-prop');
      if (!prop) return;

      const value = resolveInspectorValue(e);

      if (value !== undefined && value !== null) {
        dispatchInspectorChange(this, { prop, value });
      }
    };

    root.addEventListener('app-input', handler);
    root.addEventListener('input', handler);
    root.addEventListener('change', handler);
  }

  private syncValues(): void {
    if (!this._element || !this.shadowRoot) return;
    const el = this._element;
    const shadow = this.shadowRoot;

    const inputs = shadow.querySelectorAll<InputWithMetadata>('[data-prop]');
    inputs.forEach(input => {
      const prop = input.getAttribute('data-prop');
      if (!prop) return;

      const isFocused = shadow.activeElement === input || input.shadowRoot?.activeElement;
      if (isFocused) return;

      let val: string | number | undefined;
      if (prop === 'content') val = el.content;
      else if (prop === 'fontSize') val = el.fontSize;
      else if (prop === 'lineHeight') val = el.lineHeight;
      else if (prop === 'color') val = el.color;
      else if (prop === 'fontWeight') val = el.fontWeight;

      const currentVal = input.value !== undefined ? input.value : input.getAttribute('value');

      if (val !== undefined && currentVal != val) {
        input.value = val;
        input.setAttribute('value', String(val));
      }
    });
  }
}

customElements.define('inspector-section-text', InspectorSectionText);
