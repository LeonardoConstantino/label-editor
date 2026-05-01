import { Label } from '../../../domain/models/Label';
import { UserPreferences } from '../../../domain/models/UserPreferences';
import { sharedSheet } from '../../../utils/shared-styles';
import { dispatchInspectorChange, dispatchInspectorAction, resolveInspectorValue } from './inspector-events';
import { escapeHTML } from '../../../utils/sanitize';
import { LABEL_PRESETS } from '../../../constants/defaults';

// Garantir registros
import '../../common/AppInput';
import '../../common/UINumberScrubber';
import '../../common/AppSelect';

interface InputWithMetadata extends HTMLElement {
  value: string | number;
  checked?: boolean;
}

/**
 * InspectorDocumentSetup: Container de Nível 2 para configuração global.
 */
export class InspectorDocumentSetup extends HTMLElement {
  private _labelConfig: Label['config'] | null = null;
  private _preferences: UserPreferences | null = null;
  private _thumbnailUrl: string = '';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  set labelConfig(config: Label['config']) {
    this._labelConfig = config;
    this.syncValues();
  }

  set preferences(prefs: UserPreferences) {
    this._preferences = prefs;
    this.syncValues();
  }

  set thumbnailUrl(url: string) {
    this._thumbnailUrl = url;
    this.syncDigitalTwin();
  }

  connectedCallback(): void {
    this.render();
    this.setupListeners();
    this.syncValues();
    this.syncDigitalTwin();
  }

  private render(): void {
    if (!this.shadowRoot || !this._labelConfig || !this._preferences) return;

    const { widthMM, heightMM, backgroundColor, dpi, previewScale } = this._labelConfig;
    const prefs = this._preferences;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; flex-direction: column; gap: 12px; }
        .row-ui { display: flex; gap: 10px; margin-bottom: 4px; align-items: flex-end; }
        .row-ui > * { flex: 1; min-width: 0; }
        .fixed-small { flex: none; width: 100px; }
        
        .monitor-container {
          position: relative; width: 100%; height: 192px; 
          background: #0a0c10; border: 1px solid var(--color-border-ui);
          border-radius: 12px; display: flex; align-items: center; 
          justify-content: center; margin-bottom: 24px; overflow: hidden;
          cursor: pointer; transition: all 0.3s var(--ease-spring);
        }
        .monitor-container:hover { border-color: var(--color-accent-primary); }
        .monitor-container:hover .monitor-overlay { opacity: 1; }
        
        .digital-twin {
          position: relative; background: white; 
          box-shadow: 0 0 15px rgba(0,0,0,0.8); transition: all 0.3s;
          aspect-ratio: ${widthMM} / ${heightMM};
          max-height: 80%; max-width: 80%;
        }
        
        .monitor-overlay {
          position: absolute; inset: 0; background: rgba(99, 102, 241, 0.1);
          opacity: 0; display: flex; align-items: center; 
          justify-content: center; transition: opacity 0.3s;
        }

        .scanlines {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.1;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px);
        }

        .cota-badge {
          position: absolute; background: rgba(255, 255, 255, 0.1);
          border: 1px solid var(--color-accent-primary); color: white;
          font-family: var(--font-mono); font-size: 10px; padding: 2px 6px;
          border-radius: 4px; pointer-events: none; opacity: 0.6;
        }
      </style>

      <!-- DIGITAL TWIN MONITOR -->
      <div class="monitor-container" id="btn-open-vault">
        <div class="digital-twin">
          <img id="monitor-img" src="${this._thumbnailUrl}" 
               class="w-full h-full object-contain" 
               style="${!this._thumbnailUrl ? `background-color: ${backgroundColor || 'white'}` : ''}" />
          <div class="scanlines"></div>
        </div>

        <div class="monitor-overlay">
          <div class="bg-surface-solid border border-accent-primary text-text-main font-mono text-[10px] px-3 py-1.5 rounded uppercase tracking-widest shadow-neon-primary">
            [ Open Vault ]
          </div>
        </div>

        <div class="cota-badge" style="top: 8px;">${widthMM}mm</div>
        <div class="cota-badge" style="right: 8px; writing-mode: vertical-rl;">${heightMM}mm</div>
      </div>
      
      <span class="label-prism">Canvas Setup</span>
      
      <div class="row-ui">
        <app-select id="select-preset" label="Dimensions Preset"></app-select>
      </div>

      <div class="row-ui">
        <ui-number-scrubber label="W" data-prop="doc.widthMM" value="${widthMM}" unit="mm" step="1"></ui-number-scrubber>
        <ui-number-scrubber label="H" data-prop="doc.heightMM" value="${heightMM}" unit="mm" step="1"></ui-number-scrubber>
      </div>
      <div class="row-ui">
        <ui-number-scrubber label="DPI" data-prop="doc.dpi" value="${dpi}" min="72" max="600" step="1" unit="dpi"></ui-number-scrubber>
        <app-input label="Paper" type="color" data-prop="doc.backgroundColor" value="${escapeHTML(backgroundColor || '#ffffff')}" class="fixed-small"></app-input>
      </div>
      <div class="row-ui">
        <ui-number-scrubber label="Zoom" data-prop="doc.previewScale" value="${previewScale}" min="0.1" max="5" step="0.1" unit="x"></ui-number-scrubber>
      </div>

      <span class="label-prism" style="margin-top: 12px;">Preferences</span>
      <div class="card-module" style="padding: 12px; display: flex; flex-direction: column; gap: 10px;">
        <div class="flex justify-between items-center">
          <span class="font-mono text-[11px] text-text-muted">AUDIO ENABLED</span>
          <input type="checkbox" data-prop="pref.audioEnabled" ${prefs.audioEnabled ? 'checked' : ''}>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-mono text-[11px] text-text-muted">SHOW GRID</span>
          <input type="checkbox" data-prop="pref.showGrid" ${prefs.showGrid ? 'checked' : ''}>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-mono text-[11px] text-text-muted">GRID SIZE</span>
          <ui-number-scrubber data-prop="pref.gridSizeMM" value="${prefs.gridSizeMM}" min="1" max="50" step="1" unit="mm" style="width: 80px; flex: none;"></ui-number-scrubber>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-mono text-[11px] text-text-muted">UNIT</span>
          <select data-prop="pref.unit" class="input-prism" style="width: 80px; padding: 2px 6px; height: 24px; font-size: 10px;">
            <option value="mm" ${prefs.unit === 'mm' ? 'selected' : ''}>MM</option>
            <option value="px" ${prefs.unit === 'px' ? 'selected' : ''}>PX</option>
            <option value="pt" ${prefs.unit === 'pt' ? 'selected' : ''}>PT</option>
          </select>
        </div>
      </div>
    `;

    // Injeta as opções no select
    const select = this.shadowRoot.getElementById('select-preset') as any;
    if (select) {
      select.options = LABEL_PRESETS;
    }
  }

  private setupListeners(): void {
    const root = this.shadowRoot!;
    
    const changeHandler = (e: Event) => {
      const target = e.target as HTMLElement;
      const prop = target.getAttribute('data-prop');
      
      // Se mudar W ou H manualmente, reseta o select para custom
      if (prop === 'doc.widthMM' || prop === 'doc.heightMM') {
         const select = root.getElementById('select-preset') as any;
         if (select) select.value = 'custom';
      }

      if (!prop) return;

      const value = resolveInspectorValue(e);
      
      if (value !== undefined) {
        dispatchInspectorChange(this, { prop, value });
      }
    };

    root.addEventListener('app-input', changeHandler);
    root.addEventListener('input', changeHandler);
    root.addEventListener('change', changeHandler);

    // Listener para o Preset Select
    root.getElementById('select-preset')?.addEventListener('app-select', (e: any) => {
      const presetId = e.detail;
      const preset = LABEL_PRESETS.find(p => p.value === presetId);
      
      if (preset && preset.value !== 'custom') {
        // Dispara as mudanças de W e H simultaneamente
        dispatchInspectorChange(this, { prop: 'doc.widthMM', value: preset.w });
        dispatchInspectorChange(this, { prop: 'doc.heightMM', value: preset.h });
      }
    });

    root.getElementById('btn-open-vault')?.addEventListener('click', () => {
      dispatchInspectorAction(this, { action: 'open-vault' });
    });
  }

  private syncValues(): void {
    if (!this.shadowRoot || !this._labelConfig || !this._preferences) return;

    const shadow = this.shadowRoot;
    const config = this._labelConfig;
    const prefs = this._preferences;

    // Sincroniza o Select Preset
    const select = shadow.getElementById('select-preset') as any;
    if (select) {
      const currentPreset = LABEL_PRESETS.find(p => p.w === config.widthMM && p.h === config.heightMM);
      const val = currentPreset ? currentPreset.value : 'custom';
      if (select.value !== val) select.value = val;
    }

    const inputs = shadow.querySelectorAll<InputWithMetadata>('[data-prop]');
    inputs.forEach(input => {
      const prop = input.getAttribute('data-prop');
      if (!prop) return;

      const isCheckbox = input instanceof HTMLInputElement && input.type === 'checkbox';
      const isFocused = shadow.activeElement === input || input.shadowRoot?.activeElement;
      
      if (isFocused && !isCheckbox) return;

      if (prop === 'doc.widthMM') {
         if (input.value != config.widthMM) input.value = config.widthMM;
      }
      else if (prop === 'doc.heightMM') {
         if (input.value != config.heightMM) input.value = config.heightMM;
      }
      else if (prop === 'doc.dpi') {
         if (input.value != config.dpi) input.value = config.dpi;
      }
      else if (prop === 'doc.previewScale') {
         if (input.value != config.previewScale) input.value = config.previewScale;
      }
      else if (prop === 'doc.backgroundColor') {
         const color = config.backgroundColor || '#ffffff';
         if (input.value != color) input.value = color;
      }
      else if (prop === 'pref.audioEnabled') {
         if (input.checked !== prefs.audioEnabled) input.checked = prefs.audioEnabled;
      }
      else if (prop === 'pref.showGrid') {
         if (input.checked !== prefs.showGrid) input.checked = prefs.showGrid;
      }
      else if (prop === 'pref.gridSizeMM') {
         if (input.value != prefs.gridSizeMM) input.value = prefs.gridSizeMM;
      }
      else if (prop === 'pref.unit' && input instanceof HTMLSelectElement) {
         if (input.value !== prefs.unit) input.value = prefs.unit;
      }
    });
  }

  private syncDigitalTwin(): void {
    const img = this.shadowRoot?.getElementById('monitor-img') as HTMLImageElement;
    if (img) img.src = this._thumbnailUrl;
  }
}

customElements.define('inspector-document-setup', InspectorDocumentSetup);
