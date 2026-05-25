import { CodeElement } from '../../../../domain/models/elements/SpecificElements';
import { sharedSheet } from '../../../../utils/shared-styles';
import { dispatchInspectorChange, resolveInspectorValue } from '../inspector-events';
import { HelpContentProvider } from '../../../../utils/HelpContentProvider';
import { CodeValidator } from '../../../../utils/CodeValidator';

// Garantir registros
import '../../../common/AppInput';
import '../../../common/AppSelect';
import '../../../common/AppColorPicker';
import '../../../common/UINumberScrubber';

/**
 * InspectorSectionCode: Painel de Nível 3 para elementos de Código (QR/Barcode).
 * Utiliza Sincronização Atômica para manter o foco e performance (Task 58 Pro).
 */
export class InspectorSectionCode extends HTMLElement {
  private _element: CodeElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  set element(el: CodeElement) {
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
        .row-ui { display: flex; align-items: center; gap: 12px; margin-bottom: 4px; }
        .label-prism { font-family: var(--font-mono); font-size: 10px; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 4px; display: block; }
        .switch-row { 
          display: flex; justify-content: space-between; align-items: center;
          padding: 8px 12px; background: rgba(0,0,0,0.2);
          border: 1px solid var(--color-border-ui); border-radius: 8px;
          margin-top: 8px;
        }
        .control-box {
           background: var(--color-surface-elevated);
           border: 1px solid var(--color-border-ui);
           border-radius: 10px;
           padding: 12px;
           display: flex;
           flex-direction: column;
           gap: 12px;
        }
        .validation-hint {
          font-size: 9px;
          color: var(--color-accent-warning);
          margin-top: -8px;
          margin-bottom: 4px;
          display: none;
          font-style: italic;
        }
        .validation-hint.error { color: var(--color-accent-danger); display: block; }
      </style>

      <div class="flex items-center justify-between mb-1">
        <span class="label-prism" style="margin:0">Code Properties</span>
        ${HelpContentProvider.buildTooltip('code')}
      </div>

      <div class="control-box">
        <div class="row-ui">
          <app-input label="Content" data-prop="content" style="flex: 1"></app-input>
        </div>
        <div id="hint-text" class="validation-hint"></div>

        <div class="row-ui">
          <app-select id="code-type" label="Format" data-prop="codeType" style="flex: 1"></app-select>
          <app-select id="error-ecc" label="ECC (QR)" data-prop="errorCorrection" style="flex: 0.6"></app-select>
        </div>

        <div class="row-ui">
          <div style="flex: 1">
            <span class="label-prism">Color</span>
            <app-color-picker data-prop="color" no-transparent></app-color-picker>
          </div>
          <div style="flex: 1">
            <span class="label-prism">BG Color</span>
            <app-color-picker data-prop="backgroundColor" no-transparent></app-color-picker>
          </div>
        </div>

        <div class="switch-row">
          <span class="font-mono text-[9px] text-text-muted uppercase">Human Readable</span>
          <input type="checkbox" data-prop="includeText">
        </div>
      </div>
    `;

    this.setupSelects();
  }

  private setupSelects() {
    const shadow = this.shadowRoot!;
    
    const typeSelect = shadow.getElementById('code-type') as any;
    if (typeSelect) {
      typeSelect.options = [
        { value: 'qrcode', label: 'QR Code', sublabel: 'Fast 2D Scan' },
        { value: 'code128', label: 'Code 128', sublabel: 'Standard Barcode' },
        { value: 'ean13', label: 'EAN-13', sublabel: 'Retail (13 digits)' },
        { value: 'upca', label: 'UPC-A', sublabel: 'US Retail (12 digits)' },
        { value: 'datamatrix', label: 'Data Matrix', sublabel: 'Industrial 2D' }
      ];
    }

    const eccSelect = shadow.getElementById('error-ecc') as any;
    if (eccSelect) {
      eccSelect.options = [
        { value: 'L', label: 'Low (7%)' },
        { value: 'M', label: 'Medium (15%)' },
        { value: 'Q', label: 'Quartile (25%)' },
        { value: 'H', label: 'High (30%)' }
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

    root.addEventListener('app-input', handler);
    root.addEventListener('app-color-pick', handler);
    root.addEventListener('app-select', handler);
    root.addEventListener('input', handler);
    root.addEventListener('change', handler);
  }

  private syncValues(): void {
    if (!this._element || !this.shadowRoot) return;
    const el = this._element;
    const shadow = this.shadowRoot;

    // 1. Validação Dinâmica da UI
    const hint = shadow.getElementById('hint-text');
    if (hint) {
      const isValid = CodeValidator.isValid(el.content, el.codeType);
      if (!isValid && !el.content.includes('{{')) {
        hint.textContent = CodeValidator.getErrorMessage(el.codeType);
        hint.classList.add('error');
      } else {
        hint.classList.remove('error');
      }
    }

    // 2. Habilita/Desabilita ECC baseado no tipo de código
    const eccSelect = shadow.getElementById('error-ecc') as any;
    if (eccSelect) {
      if (el.codeType !== 'qrcode') eccSelect.setAttribute('disabled', '');
      else eccSelect.removeAttribute('disabled');
    }

    // 3. Sincronização de Inputs
    const inputs = shadow.querySelectorAll<HTMLElement & { value?: any, checked?: boolean }>('[data-prop]');
    inputs.forEach(input => {
      const prop = input.getAttribute('data-prop');
      if (!prop) return;

      const isFocused = shadow.activeElement === input || input.shadowRoot?.activeElement;
      if (isFocused) return;

      let val: any;
      if (prop === 'content') val = el.content;
      else if (prop === 'codeType') val = el.codeType;
      else if (prop === 'errorCorrection') val = el.errorCorrection;
      else if (prop === 'color') val = el.color;
      else if (prop === 'backgroundColor') val = el.backgroundColor;
      else if (prop === 'includeText') val = el.includeText;

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

customElements.define('inspector-section-code', InspectorSectionCode);
