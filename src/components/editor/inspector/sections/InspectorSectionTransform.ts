import { AnyElement } from '../../../../domain/models/Label';
import { sharedSheet } from '../../../../utils/shared-styles';
import { dispatchInspectorChange, resolveInspectorValue } from '../inspector-events';
import { UISM } from '../../../../core/UISoundManager';

// Garantir registros
import '../../../common/UINumberScrubber';
import '../../../common/icon';

interface InputWithMetadata extends HTMLElement {
  value: string | number;
  classList: DOMTokenList;
}

/**
 * Type Guard para verificar se o elemento possui dimensões.
 */
function hasDimensions(el: AnyElement): el is AnyElement & { dimensions: { width: number; height: number } } {
  return 'dimensions' in el;
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
    const isLocked = el.keepRatio === true;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; flex-direction: column; gap: 8px; }
        .row-ui { display: flex; gap: 10px; align-items: flex-end; }
        .row-ui > * { flex: 1; min-width: 0; }
        
        .ratio-link-container {
          flex: none; width: 12px; display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .btn-link {
          background: transparent; border: none; cursor: pointer; padding: 4px;
          border-radius: 4px; color: var(--color-text-muted); transition: all 0.2s;
          display: flex; align-items: center; justify-content: center;
          z-index: 2;
        }
        .btn-link:hover { background: rgba(255, 255, 255, 0.05); color: var(--color-text-main); }
        .btn-link.active { color: var(--color-accent-primary); filter: drop-shadow(0 0 5px var(--color-accent-primary)); opacity: 1; }
        .btn-link:not(.active) { opacity: 0.4; }

        .link-line {
          position: absolute; width: 6px; height: 1px; background: currentColor; opacity: 0.1;
          pointer-events: none; z-index: 1;
        }
        .link-line.left { right: 100%; margin-right: 3px; }
        .link-line.right { left: 100%; margin-left: 3px; }
        .active .link-line { opacity: 0.5; color: var(--color-accent-primary); }
      </style>
      
      <span class="label-prism">Transform</span>
      <div class="row-ui">
        <ui-number-scrubber label="X" data-prop="position.x" value="${el.position.x}" step="0.1" unit="mm"></ui-number-scrubber>
        <ui-number-scrubber label="Y" data-prop="position.y" value="${el.position.y}" step="0.1" unit="mm"></ui-number-scrubber>
      </div>
      
      ${hasDimensions(el) ? `
        <div class="row-ui items-center">
          <ui-number-scrubber label="W" data-prop="dimensions.width" value="${el.dimensions.width}" min="1" step="0.1" unit="mm"></ui-number-scrubber>
          <div class="ratio-link-container ${isLocked ? 'active' : ''}">
            <span class="link-line left"></span>
            <button id="btn-toggle-ratio" class="btn-link ${isLocked ? 'active' : ''}" title="Lock Aspect Ratio">
               <ui-icon name="link" style="--icon-size: 12px;"></ui-icon>
            </button>
            <span class="link-line right"></span>
          </div>
          <ui-number-scrubber label="H" data-prop="dimensions.height" value="${el.dimensions.height}" min="1" step="0.1" unit="mm"></ui-number-scrubber>
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
        // Lógica de Proporção (Task 55)
        if (this._element && this._element.keepRatio && hasDimensions(this._element)) {
           const el = this._element;
           const currentW = el.dimensions.width;
           const currentH = el.dimensions.height;
           const ratio = currentH !== 0 ? currentW / currentH : 1;

           if (prop === 'dimensions.width') {
             const newW = Number(value);
             const newH = Number((newW / ratio).toFixed(2));
             dispatchInspectorChange(this, { prop: 'dimensions', value: { width: newW, height: newH } });
             return;
           }
           if (prop === 'dimensions.height') {
             const newH = Number(value);
             const newW = Number((newH * ratio).toFixed(2));
             dispatchInspectorChange(this, { prop: 'dimensions', value: { width: newW, height: newH } });
             return;
           }
        }

        dispatchInspectorChange(this, { prop, value });
      }
    };

    root.addEventListener('input', handler);
    root.addEventListener('change', handler);
    root.addEventListener('app-input', handler);

    root.getElementById('btn-toggle-ratio')?.addEventListener('click', () => {
      if (!this._element) return;
      const newVal = !this._element.keepRatio;
      dispatchInspectorChange(this, { prop: 'keepRatio', value: newVal });
      UISM.play(UISM.enumPresets.TOGGLE);
    });
  }

  private syncValues(): void {
    if (!this._element || !this.shadowRoot) return;

    const el = this._element;
    const shadow = this.shadowRoot;

    // Atualiza o estado visual do botão de link e do container (para as linhas)
    const btnLink = shadow.getElementById('btn-toggle-ratio');
    const container = shadow.querySelector('.ratio-link-container');
    if (btnLink && container) {
      const isActive = el.keepRatio === true;
      btnLink.classList.toggle('active', isActive);
      container.classList.toggle('active', isActive);
      btnLink.setAttribute('title', isActive ? 'Unlock Aspect Ratio' : 'Lock Aspect Ratio');
    }

    const inputs = shadow.querySelectorAll<InputWithMetadata>('[data-prop]');
    inputs.forEach(input => {
      const prop = input.getAttribute('data-prop');
      if (!prop) return;

      const isFocused = shadow.activeElement === input || input.shadowRoot?.activeElement;
      const isScrubbing = input.classList.contains('is-scrubbing');
      
      if (!isFocused && !isScrubbing) {
        let val: number | string | undefined;
        if (prop === 'position.x') val = el.position.x;
        else if (prop === 'position.y') val = el.position.y;
        else if (prop === 'rotation') val = el.rotation;
        else if (prop === 'opacity') val = el.opacity;
        else if (prop === 'dimensions.width' && hasDimensions(el)) val = el.dimensions.width;
        else if (prop === 'dimensions.height' && hasDimensions(el)) val = el.dimensions.height;

        const currentVal = input.value !== undefined ? input.value : input.getAttribute('value');

        if (val !== undefined && String(currentVal) !== String(val)) {
          input.value = val;
          input.setAttribute('value', String(val));
        }
      }
    });
  }
}

customElements.define('inspector-section-transform', InspectorSectionTransform);
