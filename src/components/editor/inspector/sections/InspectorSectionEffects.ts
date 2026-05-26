import { AnyElement } from '../../../../domain/models/Label';
import { sharedSheet } from '../../../../utils/shared-styles';
import { dispatchInspectorChange, resolveInspectorValue } from '../inspector-events';
import { UISM } from '../../../../core/UISoundManager';
import { HelpContentProvider } from '../../../../utils/HelpContentProvider';

// Garantir registros
import '../../../common/UINumberScrubber';
import '../../../common/AppColorPicker';
import '../../../common/icon';

/**
 * InspectorSectionEffects: Painel para controle de Sombras e Brilhos (Task 39).
 * Oferece controles táteis para desfoque, deslocamento e cor.
 */
export class InspectorSectionEffects extends HTMLElement {
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
    const effects = el.effects || { enabled: false, color: '#000000', blur: 1, offsetX: 0, offsetY: 0 };

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; flex-direction: column; gap: 8px; border-top: 1px solid var(--color-border-ui); padding-top: 12px; margin-top: 4px; }
        .row-ui { display: flex; gap: 10px; align-items: flex-end; }
        .row-ui > * { flex: 1; min-width: 0; }
        
        .switch-row { 
          display: flex; justify-content: space-between; align-items: center;
          padding: 8px 12px; background: rgba(0,0,0,0.2);
          border: 1px solid var(--color-border-ui); border-radius: 8px;
          margin-bottom: 4px;
        }

        .effects-controls {
          display: ${effects.enabled ? 'flex' : 'none'};
          flex-direction: column;
          gap: 12px;
          animation: slide-down 0.2s ease-out;
        }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .preset-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          margin-top: 4px;
        }

        .preset-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--color-border-ui);
          border-radius: 4px;
          color: var(--color-text-muted);
          font-family: var(--font-mono);
          font-size: 8px;
          padding: 4px;
          cursor: pointer;
          transition: all 0.2s;
          text-transform: uppercase;
        }

        .preset-btn:hover {
          background: rgba(99, 102, 241, 0.1);
          border-color: var(--color-accent-primary);
          color: var(--color-text-main);
        }
      </style>
      
      <div class="flex items-center justify-between mb-1">
        <span class="label-prism" style="margin:0">Prism Effects</span>
        ${HelpContentProvider.buildTooltip('effects')}
      </div>

      <div class="switch-row">
        <span class="font-mono text-[9px] text-text-muted uppercase">Enable Shadow/Glow</span>
        <input type="checkbox" data-prop="effects.enabled" ${effects.enabled ? 'checked' : ''}>
      </div>

      <div id="effects-controls" class="effects-controls">
        <div class="row-ui">
          <div style="flex: 1">
            <span class="label-prism">Color</span>
            <app-color-picker data-prop="effects.color" value="${effects.color}" no-transparent></app-color-picker>
          </div>
          <ui-number-scrubber label="Blur" data-prop="effects.blur" value="${effects.blur}" min="0" max="20" step="0.1" unit="mm"></ui-number-scrubber>
        </div>

        <div class="row-ui">
          <ui-number-scrubber label="Offset X" data-prop="effects.offsetX" value="${effects.offsetX}" min="-20" max="20" step="0.1" unit="mm"></ui-number-scrubber>
          <ui-number-scrubber label="Offset Y" data-prop="effects.offsetY" value="${effects.offsetY}" min="-20" max="20" step="0.1" unit="mm"></ui-number-scrubber>
        </div>

        <div class="preset-grid">
          <button class="preset-btn" data-preset="soft">Soft Drop</button>
          <button class="preset-btn" data-preset="glow">Neon Glow</button>
          <button class="preset-btn" data-preset="hard">Hard Edge</button>
        </div>
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
        // Lógica de Objeto Aninhado (effects.prop)
        if (prop.startsWith('effects.')) {
          const subProp = prop.split('.')[1];
          const newEffects = { ...this._element?.effects, [subProp]: value };
          dispatchInspectorChange(this, { prop: 'effects', value: newEffects });

          if (subProp === 'enabled') {
            UISM.play(UISM.enumPresets.TOGGLE);
          }
        }
      }
    };

    root.addEventListener('input', handler);
    root.addEventListener('change', handler);
    root.addEventListener('app-color-pick', handler);

    // Presets Listener
    root.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('.preset-btn') as HTMLButtonElement;
      if (!btn) return;

      const preset = btn.getAttribute('data-preset');
      let values = {};

      switch (preset) {
        case 'soft':
          values = { enabled: true, color: '#000000', blur: 2, offsetX: 1, offsetY: 1 };
          break;
        case 'glow':
          values = { enabled: true, color: '#6366f1', blur: 3, offsetX: 0, offsetY: 0 };
          break;
        case 'hard':
          values = { enabled: true, color: '#000000', blur: 0, offsetX: 1.5, offsetY: 1.5 };
          break;
      }

      dispatchInspectorChange(this, { prop: 'effects', value: values });
      UISM.play(UISM.enumPresets.SELECT);
    });
  }

  private syncValues(): void {
    if (!this._element || !this.shadowRoot) return;

    const el = this._element;
    const effects = el.effects || { enabled: false, color: '#000000', blur: 1, offsetX: 0, offsetY: 0 };
    const shadow = this.shadowRoot;

    // Toggle visibilidade dos controles
    const controls = shadow.getElementById('effects-controls');
    if (controls) controls.style.display = effects.enabled ? 'flex' : 'none';

    const inputs = shadow.querySelectorAll<any>('[data-prop]');
    inputs.forEach(input => {
      const prop = input.getAttribute('data-prop');
      if (!prop) return;

      const isFocused = shadow.activeElement === input || input.shadowRoot?.activeElement;
      if (isFocused) return;

      let val: any;
      if (prop === 'effects.enabled') val = effects.enabled;
      else if (prop === 'effects.color') val = effects.color;
      else if (prop === 'effects.blur') val = effects.blur;
      else if (prop === 'effects.offsetX') val = effects.offsetX;
      else if (prop === 'effects.offsetY') val = effects.offsetY;

      if (input instanceof HTMLInputElement && input.type === 'checkbox') {
        if (input.checked !== !!val) input.checked = !!val;
      } else {
        if (val !== undefined && String(input.value) !== String(val)) {
          input.value = val;
        }
      }
    });
  }
}

customElements.define('inspector-section-effects', InspectorSectionEffects);
