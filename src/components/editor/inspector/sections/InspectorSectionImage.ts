import { ImageElement } from '../../../../domain/models/elements/SpecificElements';
import { sharedSheet } from '../../../../utils/shared-styles';
import { dispatchInspectorChange, resolveInspectorValue } from '../inspector-events';
import { escapeHTML } from '../../../../utils/sanitize';

// Garantir registros
import '../../../common/AppInput';

interface InputWithMetadata extends HTMLElement {
  value: string | number;
  checked?: boolean;
  type?: string;
}

/**
 * InspectorSectionImage: Propriedades de Imagem.
 */
export class InspectorSectionImage extends HTMLElement {
  private _element: ImageElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  set element(el: ImageElement) {
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
        .row-ui { display: flex; gap: 10px; align-items: center; }
        .row-ui > * { flex: 1; min-width: 0; }
      </style>
      
      <span class="label-prism">Image Settings</span>
      <div class="row-ui">
        <app-input label="Fit Mode" data-prop="fit" value="${escapeHTML(el.fit)}" style="flex:1"></app-input>
      </div>
      <div class="row-ui" style="margin-top: 4px;">
        <span style="font-family: var(--font-mono); font-size: 10px; color: var(--color-text-muted); text-transform: uppercase;">Smoothing</span>
        <input type="checkbox" data-prop="smoothing" ${el.smoothing !== false ? 'checked' : ''} style="width: auto; flex: none;">
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

      if (prop === 'fit') {
        const currentVal = input.value !== undefined ? input.value : input.getAttribute('value');
        if (currentVal != el.fit) {
          input.value = el.fit;
          input.setAttribute('value', el.fit);
        }
      } else if (prop === 'smoothing') {
        const val = el.smoothing !== false;
        if (input.checked !== val) input.checked = val;
      }
    });
  }
}

customElements.define('inspector-section-image', InspectorSectionImage);
