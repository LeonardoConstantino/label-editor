import { AnyElement } from '../../../../domain/models/Label';
import { sharedSheet } from '../../../../utils/shared-styles';
import { dispatchInspectorChange, resolveInspectorValue } from '../inspector-events';

// Garantir registros
import '../../../common/UINumberScrubber';

interface InputWithMetadata extends HTMLElement {
  value: string | number;
  classList: DOMTokenList;
}

/**
 * InspectorSectionTransform: Seção de propriedades espaciais (X, Y, W, H, Rot, Op).
 */
export class InspectorSectionTransform extends HTMLElement {
  private _element: AnyElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  set element(el: AnyElement) {
    this._element = el;
    this.syncValues();
  }

  get element(): AnyElement | null {
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
    const hasDimensions = 'dimensions' in el;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; flex-direction: column; gap: 8px; }
        .row-ui { display: flex; gap: 10px; align-items: flex-end; }
        .row-ui > * { flex: 1; min-width: 0; }
      </style>
      
      <span class="label-prism">Transform</span>
      <div class="row-ui">
        <ui-number-scrubber label="X" data-prop="position.x" value="${el.position.x}" step="0.1" unit="mm"></ui-number-scrubber>
        <ui-number-scrubber label="Y" data-prop="position.y" value="${el.position.y}" step="0.1" unit="mm"></ui-number-scrubber>
      </div>
      
      ${hasDimensions ? `
        <div class="row-ui">
          <ui-number-scrubber label="W" data-prop="dimensions.width" value="${(el as any).dimensions.width}" min="1" step="0.1" unit="mm"></ui-number-scrubber>
          <ui-number-scrubber label="H" data-prop="dimensions.height" value="${(el as any).dimensions.height}" min="1" step="0.1" unit="mm"></ui-number-scrubber>
        </div>
      ` : ''}

      <div class="row-ui">
        <ui-number-scrubber label="Rot" data-prop="rotation" value="${el.rotation || 0}" min="0" max="360" step="1" unit="°"></ui-number-scrubber>
        <ui-number-scrubber label="Op" data-prop="opacity" value="${el.opacity ?? 1}" min="0" max="1" step="0.05" unit="α"></ui-number-scrubber>
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

    root.addEventListener('input', handler);
    root.addEventListener('change', handler);
    root.addEventListener('app-input', handler);
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
      const isScrubbing = input.classList.contains('is-scrubbing');
      
      if (!isFocused && !isScrubbing) {
        let val: number | undefined;
        if (prop === 'position.x') val = el.position.x;
        else if (prop === 'position.y') val = el.position.y;
        else if (prop === 'rotation') val = el.rotation;
        else if (prop === 'opacity') val = el.opacity;
        else if (prop === 'dimensions.width' && 'dimensions' in el) val = el.dimensions.width;
        else if (prop === 'dimensions.height' && 'dimensions' in el) val = el.dimensions.height;

        const currentVal = input.value !== undefined ? input.value : input.getAttribute('value');

        if (val !== undefined && currentVal != val) {
          input.value = val;
          input.setAttribute('value', String(val));
        }
      }
    });
  }
}

customElements.define('inspector-section-transform', InspectorSectionTransform);
