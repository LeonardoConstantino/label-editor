import { RectangleElement } from '../../../../domain/models/elements/SpecificElements';
import { sharedSheet } from '../../../../utils/shared-styles';
import { dispatchInspectorChange, resolveInspectorValue } from '../inspector-events';
import { escapeHTML } from '../../../../utils/sanitize';
import { HelpContentProvider } from '../../../../utils/HelpContentProvider';

// Garantir registros
import '../../../common/AppInput';
import '../../../common/UINumberScrubber';

interface InputWithMetadata extends HTMLElement {
  value: string | number;
}

/**
 * InspectorSectionRect: Propriedades de Formas Retangulares.
 */
export class InspectorSectionRect extends HTMLElement {
  private _element: RectangleElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  set element(el: RectangleElement) {
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
      </style>
      
      <div class="flex items-center justify-between mb-1">
        <span class="label-prism" style="margin:0">Appearance</span>
        ${HelpContentProvider.buildTooltip('rect')}
      </div>
      <div class="row-ui">
        <app-input label="Fill" type="color" data-prop="fillColor" value="${escapeHTML(el.fillColor)}" style="flex:1"></app-input>
        <app-input label="Stroke" type="color" data-prop="strokeColor" value="${escapeHTML(el.strokeColor)}" style="flex:1"></app-input>
      </div>
      <div class="row-ui">
        <ui-number-scrubber label="Radius" data-prop="borderRadius" value="${el.borderRadius || 0}" min="0" step="0.5" unit="mm"></ui-number-scrubber>
        <ui-number-scrubber label="Thick" data-prop="strokeWidth" value="${el.strokeWidth || 0}" min="0" step="0.1" unit="mm"></ui-number-scrubber>
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
      if (prop === 'fillColor') val = el.fillColor;
      else if (prop === 'strokeColor') val = el.strokeColor;
      else if (prop === 'borderRadius') val = el.borderRadius;
      else if (prop === 'strokeWidth') val = el.strokeWidth;

      const currentVal = input.value !== undefined ? input.value : input.getAttribute('value');

      if (val !== undefined && currentVal != val) {
        input.value = val;
        input.setAttribute('value', String(val));
      }
    });
  }
}

customElements.define('inspector-section-rect', InspectorSectionRect);
