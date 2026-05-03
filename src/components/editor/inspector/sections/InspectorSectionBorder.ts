import { BorderElement } from '../../../../domain/models/elements/SpecificElements';
import { BorderStyle } from '../../../../domain/models/elements/BaseElement';
import { sharedSheet } from '../../../../utils/shared-styles';
import { dispatchInspectorChange, resolveInspectorValue } from '../inspector-events';
import { escapeHTML } from '../../../../utils/sanitize';
import { HelpContentProvider } from '../../../../utils/HelpContentProvider';

// Garantir registros
import '../../../common/AppInput';
import '../../../common/AppSelect';
import '../../../common/UINumberScrubber';

/**
 * InspectorSectionBorder: Propriedades de Molduras e Bordas.
 */
export class InspectorSectionBorder extends HTMLElement {
  private _element: BorderElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  set element(el: BorderElement) {
    this._element = el;
    this.syncValues();
  }

  get element(): BorderElement | null {
    return this._element;
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
        :host { display: flex; flex-direction: column; gap: 8px; padding-bottom: 16px; }
        .row-ui { display: flex; gap: 10px; align-items: flex-end; }
        .row-ui > * { flex: 1; min-width: 0; }
        .fixed-small { flex: none; width: 100px; }
      </style>
      
      <div class="flex items-center justify-between mb-1">
        <span class="label-prism" style="margin:0">Border Frame</span>
        ${HelpContentProvider.buildTooltip('border')}
      </div>
      
      <div class="row-ui">
        <app-select id="border-style" label="Line Style" data-prop="style" value="${el.style}"></app-select>
      </div>

      <div class="row-ui">
        <app-input label="Color" type="color" data-prop="color" value="${escapeHTML(el.color)}" style="flex: 1"></app-input>
        <ui-number-scrubber label="Inset" data-prop="position.x" value="${el.position.x}" step="0.5" unit="mm" style="flex: 1"></ui-number-scrubber>
      </div>

      <div class="row-ui">
        <ui-number-scrubber label="Thick" data-prop="width" value="${el.width}" min="0.1" max="10" step="0.1" unit="mm"></ui-number-scrubber>
        <ui-number-scrubber label="Radius" data-prop="radius" value="${el.radius || 0}" min="0" step="0.5" unit="mm"></ui-number-scrubber>
      </div>
    `;

    this.setupSelects();
  }

  private setupSelects() {
    const shadow = this.shadowRoot!;
    const styleSelect = shadow.getElementById('border-style') as any;
    if (styleSelect) {
      styleSelect.options = [
        { value: BorderStyle.SOLID, label: 'Solid', sublabel: 'Continuous line' },
        { value: BorderStyle.DASHED, label: 'Dashed', sublabel: 'Long dashes' },
        { value: BorderStyle.DOTTED, label: 'Dotted', sublabel: 'Round dots' },
        { value: BorderStyle.DOUBLE, label: 'Double', sublabel: 'Two parallel lines' }
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
        // Para Border, mantemos X e Y sincronizados como um "inset" único inicialmente
        if (prop === 'position.x') {
          dispatchInspectorChange(this, { prop: 'position', value: { x: Number(value), y: Number(value) } });
          return;
        }
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

    const inputs = shadow.querySelectorAll<HTMLElement & { value?: any }>('[data-prop]');
    inputs.forEach(input => {
      const prop = input.getAttribute('data-prop');
      if (!prop) return;

      const isFocused = shadow.activeElement === input || input.shadowRoot?.activeElement;
      if (isFocused) return;

      let val: any;
      if (prop === 'style') val = el.style;
      else if (prop === 'color') val = el.color;
      else if (prop === 'width') val = el.width;
      else if (prop === 'radius') val = el.radius;
      else if (prop === 'position.x') val = el.position.x;

      const currentVal = input.value !== undefined ? input.value : input.getAttribute('value');

      if (val !== undefined && String(currentVal) !== String(val)) {
        input.value = val;
        input.setAttribute('value', String(val));
      }
    });
  }
}

customElements.define('inspector-section-border', InspectorSectionBorder);
