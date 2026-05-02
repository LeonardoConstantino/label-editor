import { TextElement } from '../../../../domain/models/elements/SpecificElements';
import { TextOverflow } from '../../../../domain/models/elements/BaseElement';
import { sharedSheet } from '../../../../utils/shared-styles';
import { dispatchInspectorChange, resolveInspectorValue } from '../inspector-events';
import { escapeHTML } from '../../../../utils/sanitize';

// Garantir registros
import '../../../common/AppInput';
import '../../../common/AppSelect';
import '../../../common/UINumberScrubber';
import '../../../common/tooltip';
import '../../../common/icon';

/**
 * InspectorSectionText: Propriedades de Tipografia e Conteúdo.
 * Implementa alinhamentos e overflow profissionais (Task 44) usando AppSelect.
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
    const isScaleMode = el.overflow === TextOverflow.SCALE;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; flex-direction: column; gap: 8px; padding-bottom: 16px; }
        .row-ui { display: flex; gap: 10px; align-items: flex-end; }
        .row-ui > * { flex: 1; min-width: 0; }
        .fixed-small { flex: none; width: 100px; }
        .divider { height: 1px; background: var(--color-border-ui); margin: 4px 0; opacity: 0.3; }
        .checkbox-row { display: flex; items-center justify-between; padding: 4px 0; }
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
                Technical Guide
              </span>
            </div>
            <div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 items-center text-[10px] mb-1">
              <code class="font-mono text-accent-primary bg-accent-primary/10 px-1 py-0.5 rounded border border-accent-primary/20">Scale</code> 
              <span class="text-text-muted">Auto-shrinks font to fit</span>
              <code class="font-mono text-accent-primary bg-accent-primary/10 px-1 py-0.5 rounded border border-accent-primary/20">Justify</code> 
              <span class="text-text-muted">Aligns to both edges</span>
            </div>
          </div>
        </ui-tooltip>
      </div>

      <div class="row-ui">
        <app-input label="Content" data-prop="content" value="${escapeHTML(el.content)}" style="flex:1"></app-input>
      </div>

      <div class="row-ui">
        <app-select id="font-family" label="Font Family" data-prop="fontFamily" value="${el.fontFamily}"></app-select>
      </div>

      <div class="row-ui">
        <app-select id="font-weight" label="Weight" data-prop="fontWeight" value="${el.fontWeight}"></app-select>
        <app-select id="font-style" label="Style" data-prop="fontStyle" value="${el.fontStyle}"></app-select>
      </div>

      <div class="row-ui">
        <ui-number-scrubber id="font-size-scrubber" label="Size" data-prop="fontSize" value="${el.fontSize}" min="1" max="200" step="1" unit="pt" ${isScaleMode ? 'disabled' : ''}></ui-number-scrubber>
        <app-input label="Color" type="color" data-prop="color" value="${escapeHTML(el.color)}" class="fixed-small"></app-input>
      </div>

      <div class="row-ui">
        <ui-number-scrubber label="Lead" data-prop="lineHeight" value="${el.lineHeight || 1.2}" min="0.5" max="3" step="0.1" unit="lh"></ui-number-scrubber>
        <div class="flex flex-col gap-1 justify-end items-center pb-1">
           <span class="font-mono text-[9px] text-text-muted uppercase">Justify</span>
           <input type="checkbox" data-prop="justify" ${el.justify ? 'checked' : ''}>
        </div>
      </div>

      <div class="divider"></div>

      <div class="row-ui">
        <app-select id="text-align" label="Horizontal" data-prop="textAlign" value="${el.textAlign}"></app-select>
        <app-select id="vertical-align" label="Vertical" data-prop="verticalAlign" value="${el.verticalAlign}"></app-select>
      </div>

      <div class="row-ui">
        <app-select id="text-overflow" label="Overflow Strategy" data-prop="overflow" value="${el.overflow}"></app-select>
      </div>
    `;

    this.setupSelects();
  }

  private setupSelects() {
    const shadow = this.shadowRoot!;
    
    const fontSelect = shadow.getElementById('font-family') as any;
    if (fontSelect) {
      fontSelect.options = [
        { value: 'Inter', label: 'Inter', sublabel: 'Sans-Serif (Default)' },
        { value: 'JetBrains Mono', label: 'JetBrains Mono', sublabel: 'Monospace (Data)' },
        { value: 'Arial', label: 'Arial', sublabel: 'System' },
        { value: 'Times New Roman', label: 'Times New Roman', sublabel: 'Serif' },
        { value: 'Geist', label: 'Geist', sublabel: 'Modern Sans' }
      ];
    }

    const weightSelect = shadow.getElementById('font-weight') as any;
    if (weightSelect) {
      weightSelect.options = [
        { value: '100', label: 'Thin' },
        { value: '300', label: 'Light' },
        { value: '400', label: 'Normal' },
        { value: '500', label: 'Medium' },
        { value: '600', label: 'Semi Bold' },
        { value: '700', label: 'Bold' },
        { value: '900', label: 'Black' }
      ];
    }

    const styleSelect = shadow.getElementById('font-style') as any;
    if (styleSelect) {
      styleSelect.options = [
        { value: 'normal', label: 'Normal' },
        { value: 'italic', label: 'Italic' }
      ];
    }

    const hAlign = shadow.getElementById('text-align') as any;
    if (hAlign) {
      hAlign.options = [
        { value: 'left', label: 'Left', sublabel: 'Flush start' },
        { value: 'center', label: 'Center', sublabel: 'Middle alignment' },
        { value: 'right', label: 'Right', sublabel: 'Flush end' }
      ];
    }

    const vAlign = shadow.getElementById('vertical-align') as any;
    if (vAlign) {
      vAlign.options = [
        { value: 'top', label: 'Top', sublabel: 'Anchor ceiling' },
        { value: 'middle', label: 'Middle', sublabel: 'Anchor center' },
        { value: 'bottom', label: 'Bottom', sublabel: 'Anchor floor' }
      ];
    }

    const overflow = shadow.getElementById('text-overflow') as any;
    if (overflow) {
      overflow.options = [
        { value: TextOverflow.WRAP, label: 'Wrap', sublabel: 'Multi-line break' },
        { value: TextOverflow.CLIP, label: 'Clip', sublabel: 'Hard cut content' },
        { value: TextOverflow.ELLIPSIS, label: 'Ellipsis', sublabel: 'Add "..." at end' },
        { value: TextOverflow.SCALE, label: 'Scale to Fit', sublabel: 'Auto-shrink font' }
      ];
    }
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
    root.addEventListener('app-select', handler);
    root.addEventListener('input', handler);
    root.addEventListener('change', handler);
  }

  private syncValues(): void {
    if (!this._element || !this.shadowRoot) return;
    const el = this._element;
    const shadow = this.shadowRoot;

    const isScaleMode = el.overflow === TextOverflow.SCALE;
    const sizeScrubber = shadow.getElementById('font-size-scrubber') as any;
    if (sizeScrubber) {
      if (isScaleMode) sizeScrubber.setAttribute('disabled', '');
      else sizeScrubber.removeAttribute('disabled');
    }

    const inputs = shadow.querySelectorAll<HTMLElement & { value?: any, checked?: boolean }>('[data-prop]');
    inputs.forEach(input => {
      const prop = input.getAttribute('data-prop');
      if (!prop) return;

      const isFocused = shadow.activeElement === input || input.shadowRoot?.activeElement;
      if (isFocused) return;

      let val: any;
      if (prop === 'content') val = el.content;
      else if (prop === 'fontSize') val = el.fontSize;
      else if (prop === 'lineHeight') val = el.lineHeight;
      else if (prop === 'color') val = el.color;
      else if (prop === 'fontWeight') val = String(el.fontWeight);
      else if (prop === 'fontStyle') val = el.fontStyle;
      else if (prop === 'justify') val = el.justify;
      else if (prop === 'fontFamily') val = el.fontFamily;
      else if (prop === 'textAlign') val = el.textAlign;
      else if (prop === 'verticalAlign') val = el.verticalAlign;
      else if (prop === 'overflow') val = el.overflow;

      if (input instanceof HTMLInputElement && input.type === 'checkbox') {
        if (input.checked !== !!val) input.checked = !!val;
      } else {
        const currentVal = input.value !== undefined ? input.value : input.getAttribute('value');
        if (val !== undefined && String(currentVal) !== String(val)) {
          input.value = val;
          input.setAttribute('value', String(val));
        }
      }
    });
  }
}

customElements.define('inspector-section-text', InspectorSectionText);
