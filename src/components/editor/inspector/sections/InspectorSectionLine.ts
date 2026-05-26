import { LineElement } from '../../../../domain/models/elements/SpecificElements';
import { BorderStyle } from '../../../../domain/models/elements/BaseElement';
import { sharedSheet } from '../../../../utils/shared-styles';
import { dispatchInspectorChange, resolveInspectorValue } from '../inspector-events';
import { HelpContentProvider } from '../../../../utils/HelpContentProvider';

// Garantir registros
import '../../../common/UINumberScrubber';
import '../../../common/AppColorPicker';
import '../../../common/AppSelect';

/**
 * InspectorSectionLine: Painel para configuração de geometrias de linha (Task 90).
 */
export class InspectorSectionLine extends HTMLElement {
  private _element: LineElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  set element(el: LineElement) {
    this._element = el;
    this.syncValues();
  }

  connectedCallback(): void {
    this.renderSkeleton();
    this.setupListeners();
    this.syncValues();
  }

  private renderSkeleton() {
    if (!this.shadowRoot || this.shadowRoot.innerHTML) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; flex-direction: column; gap: 8px; padding-bottom: 12px; }
        .row-ui { display: flex; align-items: flex-end; gap: 10px; margin-bottom: 4px; }
        .row-ui > * { flex: 1; min-width: 0; }
        .label-prism { font-family: var(--font-mono); font-size: 10px; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 4px; display: block; }
        .control-box {
           background: var(--color-surface-elevated);
           border: 1px solid var(--color-border-ui);
           border-radius: 10px;
           padding: 12px;
           display: flex;
           flex-direction: column;
           gap: 12px;
        }
      </style>

      <div class="flex items-center justify-between mb-1">
        <span class="label-prism" style="margin:0">Line Geometry</span>
        ${HelpContentProvider.buildTooltip('line' as any)}
      </div>

      <div class="control-box">
        <span class="label-prism">End Point (mm)</span>
        <div class="row-ui">
          <ui-number-scrubber label="End X" data-prop="endPosition.x" step="0.1" unit="mm"></ui-number-scrubber>
          <ui-number-scrubber label="End Y" data-prop="endPosition.y" step="0.1" unit="mm"></ui-number-scrubber>
        </div>

        <div class="row-ui">
          <div style="flex: 1">
            <span class="label-prism">Line Color</span>
            <app-color-picker data-prop="color" no-transparent></app-color-picker>
          </div>
          <ui-number-scrubber label="Weight" data-prop="strokeWidth" min="0.1" max="10" step="0.1" unit="mm" style="flex: 1"></ui-number-scrubber>
        </div>

        <div class="row-ui">
          <app-select id="line-style" label="Style" data-prop="style" style="flex: 1"></app-select>
        </div>
      </div>
    `;

    this.setupSelect();
  }

  private setupSelect() {
    const shadow = this.shadowRoot!;
    const styleSelect = shadow.getElementById('line-style') as any;
    if (styleSelect) {
      styleSelect.options = [
              { value: BorderStyle.SOLID, label: 'Solid', sublabel: '──────' },
              { value: BorderStyle.DASHED, label: 'Dashed', sublabel: '── ── ──' },
              { value: BorderStyle.DOTTED, label: 'Dotted', sublabel: '· · · ·' },
      ];
    }
  }

  private setupListeners() {
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
    root.addEventListener('app-color-pick', handler);
    root.addEventListener('app-select', handler);
  }

  private syncValues(): void {
    if (!this._element || !this.shadowRoot) return;
    const el = this._element;
    const shadow = this.shadowRoot;

    const inputs = shadow.querySelectorAll<any>('[data-prop]');
    inputs.forEach(input => {
      const prop = input.getAttribute('data-prop');
      if (!prop) return;

      const isFocused = shadow.activeElement === input || input.shadowRoot?.activeElement;
      if (isFocused) return;

      let val: any;
      if (prop === 'endPosition.x') val = el.endPosition.x;
      else if (prop === 'endPosition.y') val = el.endPosition.y;
      else if (prop === 'strokeWidth') val = el.strokeWidth;
      else if (prop === 'color') val = el.color;
      else if (prop === 'style') val = el.style;

      if (val !== undefined && String(input.value) !== String(val)) {
        input.value = val;
      }
    });
  }
}

customElements.define('inspector-section-line', InspectorSectionLine);
