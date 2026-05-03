import { ImageElement } from '../../../../domain/models/elements/SpecificElements';
import { ImageFit, CompositeOperation } from '../../../../domain/models/elements/BaseElement';
import { sharedSheet } from '../../../../utils/shared-styles';
import { dispatchInspectorChange, resolveInspectorValue } from '../inspector-events';

// Garantir registros
import '../../../common/AppInput';
import '../../../common/AppSelect';

interface InputWithMetadata extends HTMLElement {
  value: string | number;
  checked?: boolean;
}

/**
 * InspectorSectionImage: Propriedades de Imagem com suporte a Blending e Fit (Task 43).
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
        :host { display: flex; flex-direction: column; gap: 8px; padding-bottom: 16px; }
        .row-ui { display: flex; gap: 10px; align-items: flex-end; }
        .row-ui > * { flex: 1; min-width: 0; }
        
        .switch-row { 
          display: flex; justify-content: space-between; align-items: center;
          padding: 8px 12px; background: var(--color-surface-elevated);
          border: 1px solid var(--color-border-ui); border-radius: 8px;
        }
      </style>
      
      <span class="label-prism">Image Configuration</span>
      
      <div class="row-ui">
        <app-select id="fit-mode" label="Fit Strategy" data-prop="fit" value="${el.fit}"></app-select>
      </div>

      <div class="row-ui">
        <app-select id="blend-mode" label="Blending" data-prop="compositeOperation" value="${el.compositeOperation || CompositeOperation.SOURCE_OVER}"></app-select>
      </div>

      <div class="switch-row">
        <span class="font-mono text-[10px] text-text-muted uppercase">Smoothing</span>
        <input type="checkbox" data-prop="smoothing" ${el.smoothing !== false ? 'checked' : ''}>
      </div>
    `;

    this.setupSelects();
  }

  private setupSelects() {
    const shadow = this.shadowRoot!;
    
    const fitSelect = shadow.getElementById('fit-mode') as any;
    if (fitSelect) {
      fitSelect.options = [
        { value: ImageFit.CONTAIN, label: 'Contain', sublabel: 'Fit inside box' },
        { value: ImageFit.COVER, label: 'Cover', sublabel: 'Fill and crop' },
        { value: ImageFit.FILL, label: 'Stretch', sublabel: 'Distort to fill' },
        { value: ImageFit.NONE, label: 'Original', sublabel: 'No scaling' }
      ];
    }

    const blendSelect = shadow.getElementById('blend-mode') as any;
    if (blendSelect) {
      blendSelect.options = [
        { value: CompositeOperation.SOURCE_OVER, label: 'Normal', sublabel: 'Standard overlay' },
        { value: CompositeOperation.MULTIPLY, label: 'Multiply', sublabel: 'Darken interaction' },
        { value: CompositeOperation.SCREEN, label: 'Screen', sublabel: 'Lighten interaction' },
        { value: CompositeOperation.OVERLAY, label: 'Overlay', sublabel: 'High contrast' },
        { value: CompositeOperation.DARKEN, label: 'Darken', sublabel: 'Keep darkest pixels' },
        { value: CompositeOperation.LIGHTEN, label: 'Lighten', sublabel: 'Keep lightest pixels' },
        { value: CompositeOperation.COLOR_DODGE, label: 'Color Dodge', sublabel: 'Brighten pixels' },
        { value: CompositeOperation.COLOR_BURN, label: 'Color Burn', sublabel: 'Darken with contrast' },
        { value: CompositeOperation.HARD_LIGHT, label: 'Hard Light', sublabel: 'Sharp contrast' },
        { value: CompositeOperation.SOFT_LIGHT, label: 'Soft Light', sublabel: 'Subtle contrast' },
        { value: CompositeOperation.DIFFERENCE, label: 'Difference', sublabel: 'Invert differences' },
        { value: CompositeOperation.EXCLUSION, label: 'Exclusion', sublabel: 'Lower contrast diff' }
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

    const inputs = shadow.querySelectorAll<InputWithMetadata>('[data-prop]');
    inputs.forEach(input => {
      const prop = input.getAttribute('data-prop');
      if (!prop) return;

      const isFocused = shadow.activeElement === input || input.shadowRoot?.activeElement;
      if (isFocused) return;

      let val: any;
      if (prop === 'fit') val = el.fit;
      else if (prop === 'compositeOperation') val = el.compositeOperation || CompositeOperation.SOURCE_OVER;
      else if (prop === 'smoothing') val = el.smoothing !== false;

      if (input instanceof HTMLInputElement && input.type === 'checkbox') {
        if (input.checked !== !!val) input.checked = !!val;
      } else {
        const currentVal = (input as any).value !== undefined ? (input as any).value : input.getAttribute('value');
        if (val !== undefined && String(currentVal) !== String(val)) {
          (input as any).value = val;
          input.setAttribute('value', String(val));
        }
      }
    });
  }
}

customElements.define('inspector-section-image', InspectorSectionImage);
