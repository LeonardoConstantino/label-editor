import { IconElement } from '../../../../domain/models/elements/SpecificElements';
import { sharedSheet } from '../../../../utils/shared-styles';
import { bridgeTheme } from '../../../../utils/theme-bridge';
import { dispatchInspectorChange, resolveInspectorValue } from '../inspector-events';
import { HelpContentProvider } from '../../../../utils/HelpContentProvider';
import { getIcon, searchIcons, IconDefinition, ICON_REGISTRY } from '../../../../constants/icons';
import { store } from '../../../../core/Store';
import { db } from '../../../../core/Database';
import { UISM } from '../../../../core/UISoundManager';
import { AnyElement } from '../../../../domain/models/Label';

// Garantir registros de componentes
import '../../../common/icon';
import '../../../common/AppInput';
import '../../../common/AppColorPicker';
import '../../../common/UINumberScrubber';
import '../../../common/ui-variable-badge';

interface InputWithMetadata extends HTMLElement {
  value: string | number;
}

/**
 * InspectorSectionIcon: Seção de Nível 3 para edição de propriedades de IconElement.
 * Utiliza Sincronização Atômica (renderSkeleton & syncValues) para evitar perda de foco (Task 103).
 */
export class InspectorSectionIcon extends HTMLElement {
  private _element: IconElement | null = null;
  private _themeCleanup: (() => void) | null = null;
  private _quickPickerOpen: boolean = false;
  private _outsideClickListener: ((e: MouseEvent) => void) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  set element(el: IconElement | AnyElement) {
    this._element = el as IconElement;
    this.syncValues();
  }

  connectedCallback(): void {
    this._themeCleanup = bridgeTheme(this);
    this.renderSkeleton();
    this.setupListeners();
    this.syncValues();
  }

  disconnectedCallback(): void {
    this._themeCleanup?.();
    if (this._outsideClickListener) {
      window.removeEventListener('click', this._outsideClickListener);
      this._outsideClickListener = null;
    }
  }

  private buildAdaptiveSvg(def: IconDefinition): SVGSVGElement {
    const [vx, vy, vw, vh] = def.viewBox;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `${vx} ${vy} ${vw} ${vh}`);

    for (let i = 0; i < def.paths.length; i++) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', def.paths[i]);
      if (def.stroke) {
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'currentColor');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
      } else {
        path.setAttribute('fill', 'currentColor');
      }
      svg.appendChild(path);
    }

    return svg;
  }

  private renderSkeleton(): void {
    if (!this.shadowRoot || this.shadowRoot.innerHTML) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host { 
          display: flex; 
          flex-direction: column; 
          gap: 10px; 
          position: relative;
        }
        .row-ui { 
          display: flex; 
          gap: 10px; 
          align-items: flex-end; 
        }
        .row-ui > * { 
          flex: 1; 
          min-width: 0; 
        }
        .row-ui-icon {
          display: flex;
          gap: 8px;
          align-items: flex-end;
          position: relative;
        }
        .picker-wrapper {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .quick-picker-btn {
          height: 32px;
          padding: 0 6px;
          background: var(--color-surface-solid);
          border: 1px solid var(--color-border-ui);
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          color: var(--color-text-main);
          transition: all 0.2s ease;
        }
        .quick-picker-btn:hover {
          border-color: var(--color-accent-primary);
          background: color-mix(in srgb, var(--color-accent-primary) 8%, var(--color-surface-solid));
        }
        .picker-preview-box {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-main);
        }
        .picker-preview-box svg, .picker-preview-box ui-icon {
          width: 18px;
          height: 18px;
          display: block;
        }
        .validation-hint {
          font-size: 9.5px;
          font-family: var(--font-mono);
          padding: 4px 8px;
          border-radius: 4px;
          display: none;
          line-height: 1.3;
        }
        .validation-hint.valid {
          display: block;
          background: color-mix(in srgb, var(--color-accent-primary) 10%, transparent);
          color: var(--color-accent-primary);
          border: 1px solid color-mix(in srgb, var(--color-accent-primary) 20%, transparent);
        }
        .validation-hint.variable {
          display: block;
          background: color-mix(in srgb, var(--color-accent-success, #10b981) 10%, transparent);
          color: var(--color-accent-success, #10b981);
          border: 1px solid color-mix(in srgb, var(--color-accent-success, #10b981) 20%, transparent);
        }
        .validation-hint.warning {
          display: block;
          background: color-mix(in srgb, var(--color-accent-warning, #f59e0b) 10%, transparent);
          color: var(--color-accent-warning, #f59e0b);
          border: 1px solid color-mix(in srgb, var(--color-accent-warning, #f59e0b) 20%, transparent);
        }

        /* Quick Picker Popover */
        .quick-picker-popover {
          position: absolute;
          top: 66px;
          left: 0;
          width: 250px;
          max-height: 320px;
          background: var(--color-surface-elevated);
          border: 1px solid var(--color-border-ui);
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 1px 1px var(--color-border-ui);
          z-index: 50;
          display: flex;
          flex-direction: column;
          padding: 10px;
          gap: 8px;
        }
        .quick-picker-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .quick-picker-title {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
        }
        .btn-close-popover {
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
          border-radius: 4px;
        }
        .btn-close-popover:hover {
          color: var(--color-text-main);
        }
        .quick-search-box {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          background: var(--color-surface-solid);
          border: 1px solid var(--color-border-ui);
          border-radius: 6px;
        }
        .quick-search-box input {
          flex: 1;
          min-width: 0;
          background: transparent;
          border: none;
          outline: none;
          color: var(--color-text-main);
          font-size: 11px;
          font-family: var(--font-sans);
        }
        .quick-picker-body {
          overflow-y: auto;
          max-height: 220px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          scrollbar-width: thin;
        }
        .quick-section-label {
          font-family: var(--font-mono);
          font-size: 8px;
          color: var(--color-text-muted);
          text-transform: uppercase;
          margin-bottom: 4px;
          display: block;
        }
        .quick-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 6px;
        }
        .quick-icon-cell {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-surface-solid);
          border: 1px solid var(--color-border-ui);
          border-radius: 6px;
          color: var(--color-text-muted);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .quick-icon-cell:hover {
          color: var(--color-text-main);
          border-color: var(--color-accent-primary);
          background: color-mix(in srgb, var(--color-accent-primary) 12%, var(--color-surface-solid));
          transform: scale(1.08);
        }
        .quick-icon-cell svg {
          width: 18px;
          height: 18px;
          display: block;
          pointer-events: none;
        }

        /* Variables badges */
        .variables-section {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 8px;
          background: color-mix(in srgb, var(--color-canvas), black 10%);
          border: 1px solid var(--color-border-ui);
          border-radius: 8px;
        }
        .variables-badges-container {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
      </style>

      <div class="flex items-center justify-between mb-1">
        <span class="label-prism" style="margin:0">Symbol Properties</span>
        ${HelpContentProvider.buildTooltip('symbols')}
      </div>

      <div class="row-ui-icon">
        <div class="picker-wrapper">
          <button type="button" id="btn-quick-picker" class="quick-picker-btn" title="Choose symbol from quick picker">
            <div id="quick-picker-preview" class="picker-preview-box">
              <ui-icon name="alert-triangle"></ui-icon>
            </div>
            <ui-icon name="chevron-down" style="--icon-size: 10px; opacity: 0.6;"></ui-icon>
          </button>
        </div>
        <app-input id="input-icon-name" label="Symbol Name / Key" data-prop="iconName" style="flex: 1;"></app-input>
      </div>

      <div id="icon-hint" class="validation-hint"></div>

      <!-- Quick Picker Popover -->
      <div id="quick-picker-popover" class="quick-picker-popover" style="display: none;">
        <div class="quick-picker-header">
          <span class="quick-picker-title">Quick Picker</span>
          <button type="button" id="btn-close-popover" class="btn-close-popover" title="Close">
            <ui-icon name="close" style="--icon-size: 12px;"></ui-icon>
          </button>
        </div>
        <div class="quick-search-box">
          <ui-icon name="search" style="--icon-size: 12px; color: var(--color-text-muted);"></ui-icon>
          <input type="text" id="quick-search-input" placeholder="Search symbols..." autocomplete="off" />
        </div>
        <div class="quick-picker-body">
          <div id="quick-recents-section" style="display: none;">
            <span class="quick-section-label">Recent</span>
            <div id="quick-recents-grid" class="quick-grid"></div>
          </div>
          <div id="quick-results-section">
            <span class="quick-section-label" id="quick-results-label">Suggestions</span>
            <div id="quick-results-grid" class="quick-grid"></div>
          </div>
        </div>
      </div>

      <!-- Color Picker -->
      <div class="row-ui">
        <app-color-picker label="Vector Color" data-prop="color" no-transparent></app-color-picker>
      </div>

      <!-- Stroke Width (Condicional) -->
      <div class="row-ui" id="stroke-row" style="display: none;">
        <ui-number-scrubber label="Stroke Width" data-prop="strokeWidth" min="0.5" max="10" step="0.5" unit="px"></ui-number-scrubber>
      </div>

      <!-- Variáveis Dinâmicas de Lote -->
      <div class="variables-section" id="variables-section" style="display: none;">
        <div class="flex items-center justify-between">
          <span class="label-prism" style="margin:0">Batch Variables</span>
          <span class="text-2xs text-text-muted">Click to bind</span>
        </div>
        <div class="variables-badges-container" id="variables-badges-container"></div>
      </div>
    `;
  }

  private setupListeners(): void {
    const root = this.shadowRoot!;

    // 1. Mudança de Propriedades padrão via inputs/pickers
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
    root.addEventListener('input', handler);
    root.addEventListener('change', handler);

    // 2. Controle do Quick Picker Popover
    const btnQuickPicker = root.getElementById('btn-quick-picker');
    const popover = root.getElementById('quick-picker-popover');
    const btnClose = root.getElementById('btn-close-popover');
    const quickSearchInput = root.getElementById('quick-search-input') as HTMLInputElement | null;

    btnQuickPicker?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleQuickPicker();
    });

    btnClose?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.closeQuickPicker();
    });

    popover?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      // Seleção de ícone dentro do Quick Picker
      const cell = target.closest<HTMLElement>('.quick-icon-cell');
      if (cell) {
        const key = cell.getAttribute('data-icon-key');
        if (key) {
          UISM.play(UISM.enumPresets.TAP);
          dispatchInspectorChange(this, { prop: 'iconName', value: key });
          this.closeQuickPicker();
        }
        e.stopPropagation();
        return;
      }

      // Prevent closing from popover body clicks
      e.stopPropagation();
    });

    quickSearchInput?.addEventListener('input', () => {
      const query = quickSearchInput.value.trim();
      this.renderQuickResults(query);
    });

    // 3. Seleção via badges de variáveis e cliques gerais
    root.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;

      // Inserção rápida através de badge de variável
      const badge = target.closest<HTMLElement>('ui-variable-badge');
      if (badge) {
        const varName = badge.textContent?.trim();
        if (varName) {
          const varSyntax = `{{${varName}}}`;
          UISM.play(UISM.enumPresets.TAP);
          dispatchInspectorChange(this, { prop: 'iconName', value: varSyntax });
        }
      }
    });

    this._outsideClickListener = () => {
      if (this._quickPickerOpen) {
        this.closeQuickPicker();
      }
    };
    window.addEventListener('click', this._outsideClickListener);
  }

  private async toggleQuickPicker(): Promise<void> {
    if (this._quickPickerOpen) {
      this.closeQuickPicker();
    } else {
      await this.openQuickPicker();
    }
  }

  private async openQuickPicker(): Promise<void> {
    const popover = this.shadowRoot?.getElementById('quick-picker-popover');
    if (!popover) return;

    this._quickPickerOpen = true;
    popover.style.display = 'flex';
    UISM.play(UISM.enumPresets.TAP);

    // Carrega recentes
    await this.loadQuickRecents();
    // Renderiza sugestões iniciais
    this.renderQuickResults('');

    const searchInput = this.shadowRoot?.getElementById('quick-search-input') as HTMLInputElement | null;
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
  }

  private closeQuickPicker(): void {
    const popover = this.shadowRoot?.getElementById('quick-picker-popover');
    if (!popover) return;
    this._quickPickerOpen = false;
    popover.style.display = 'none';
  }

  private async loadQuickRecents(): Promise<void> {
    const recentsSection = this.shadowRoot?.getElementById('quick-recents-section');
    const recentsGrid = this.shadowRoot?.getElementById('quick-recents-grid');
    if (!recentsSection || !recentsGrid) return;

    try {
      const record = await db.get<{ id: string; keys: string[] }>('preferences', 'recent_icons');
      const keys = (record?.keys || []).filter(k => !!ICON_REGISTRY[k]).slice(0, 5);

      if (keys.length === 0) {
        recentsSection.style.display = 'none';
        recentsGrid.innerHTML = '';
        return;
      }

      recentsSection.style.display = 'block';
      recentsGrid.innerHTML = '';

      const fragment = document.createDocumentFragment();
      for (const key of keys) {
        const def = ICON_REGISTRY[key];
        if (!def) continue;

        const cell = document.createElement('div');
        cell.className = 'quick-icon-cell';
        cell.setAttribute('data-icon-key', key);
        cell.title = `${def.name} (${key})`;
        cell.appendChild(this.buildAdaptiveSvg(def));
        fragment.appendChild(cell);
      }

      recentsGrid.appendChild(fragment);
    } catch {
      recentsSection.style.display = 'none';
    }
  }

  private renderQuickResults(query: string): void {
    const resultsGrid = this.shadowRoot?.getElementById('quick-results-grid');
    const resultsLabel = this.shadowRoot?.getElementById('quick-results-label');
    if (!resultsGrid || !resultsLabel) return;

    resultsGrid.innerHTML = '';

    const results = query
      ? searchIcons(query).slice(0, 15)
      : Object.entries(ICON_REGISTRY).slice(0, 15);

    resultsLabel.textContent = query ? `Results (${results.length})` : 'Popular Symbols';

    if (results.length === 0) {
      resultsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; font-size: 10px; color: var(--color-text-muted); text-align: center; padding: 12px 0;">
          No symbols found
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();
    for (const [key, def] of results) {
      const cell = document.createElement('div');
      cell.className = 'quick-icon-cell';
      cell.setAttribute('data-icon-key', key);
      cell.title = `${def.name} (${key})`;
      cell.appendChild(this.buildAdaptiveSvg(def));
      fragment.appendChild(cell);
    }

    resultsGrid.appendChild(fragment);
  }

  /**
   * Sincronização Atômica das propriedades do IconElement (Atomic Sync).
   */
  private syncValues(): void {
    if (!this._element || !this.shadowRoot) return;
    const el = this._element;
    const shadow = this.shadowRoot;

    // 1. Sincroniza inputs preservando foco ativo
    const inputs = shadow.querySelectorAll<InputWithMetadata>('[data-prop]');
    inputs.forEach(input => {
      const prop = input.getAttribute('data-prop');
      if (!prop) return;

      const isFocused = shadow.activeElement === input || input.shadowRoot?.activeElement;
      if (isFocused) return;

      let val: string | number | undefined;
      if (prop === 'iconName') val = el.iconName;
      else if (prop === 'color') val = el.color;
      else if (prop === 'strokeWidth') val = el.strokeWidth ?? 2;

      const currentVal = input.value !== undefined ? input.value : input.getAttribute('value');

      if (val !== undefined && currentVal != val) {
        input.value = val;
        input.setAttribute('value', String(val));
      }
    });

    // 2. Preview do Ícone Atual e Verificação de Traço (Stroke)
    const previewBox = shadow.getElementById('quick-picker-preview');
    const strokeRow = shadow.getElementById('stroke-row');
    const def = getIcon(el.iconName);

    if (previewBox) {
      previewBox.innerHTML = '';
      if (def) {
        previewBox.appendChild(this.buildAdaptiveSvg(def));
      } else if (el.iconName?.startsWith('{{')) {
        previewBox.innerHTML = '<ui-icon name="code" style="--icon-size: 16px;"></ui-icon>';
      } else {
        previewBox.innerHTML = '<ui-icon name="alert-triangle" style="--icon-size: 16px; opacity: 0.5;"></ui-icon>';
      }
    }

    // Exibe controle de Stroke Width apenas para ícones que possuem traço configurado
    if (strokeRow) {
      if (def && def.stroke) {
        strokeRow.style.display = 'flex';
      } else {
        strokeRow.style.display = 'none';
      }
    }

    // 3. Validação Visual do Campo iconName
    const hint = shadow.getElementById('icon-hint');
    if (hint) {
      const iconVal = el.iconName?.trim() || '';
      if (iconVal.startsWith('{{') && iconVal.endsWith('}}')) {
        const varName = iconVal.slice(2, -2).trim();
        const batchData = store.getState().productionData;
        const hasColumn = batchData.length > 0 && varName in batchData[0];

        hint.className = 'validation-hint variable';
        hint.textContent = hasColumn
          ? `✓ Dynamic variable: linked to "${varName}"`
          : `⚡ Dynamic variable: {{${varName}}}`;
      } else if (def) {
        hint.className = 'validation-hint valid';
        hint.textContent = `✓ Symbol: ${def.name}`;
      } else if (iconVal) {
        hint.className = 'validation-hint warning';
        hint.textContent = `⚠ Symbol "${iconVal}" not found in catalog`;
      } else {
        hint.className = 'validation-hint';
        hint.textContent = '';
      }
    }

    // 4. Seção de Variáveis do Dataset de Produção
    const varSection = shadow.getElementById('variables-section');
    const badgesContainer = shadow.getElementById('variables-badges-container');
    const batchData = store.getState().productionData;

    if (varSection && badgesContainer) {
      if (batchData.length > 0) {
        const fields = Object.keys(batchData[0]);
        varSection.style.display = 'flex';
        badgesContainer.innerHTML = '';

        fields.forEach(f => {
          const badge = document.createElement('ui-variable-badge');
          badge.textContent = f;
          badge.title = `Click to bind {{${f}}}`;
          badgesContainer.appendChild(badge);
        });
      } else {
        varSection.style.display = 'none';
      }
    }
  }
}

customElements.define('inspector-section-icon', InspectorSectionIcon);
