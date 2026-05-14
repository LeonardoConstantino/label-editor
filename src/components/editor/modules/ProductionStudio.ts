import { sharedSheet } from '../../../utils/shared-styles';
import eventBus from '../../../core/EventBus';
import { store, AppState } from '../../../core/Store';
import { UISM } from '../../../core/UISoundManager';
import { HelpContentProvider } from '../../../utils/HelpContentProvider';
import { ElementType } from '../../../domain/models/elements/BaseElement';
import { escapeHTML } from '../../../utils/sanitize';

// Importar sub-componentes
import '../../common/AppButton';
import '../../common/icon';
import '../../common/UiDataGateway';
import '../../common/ui-variable-badge';

/**
 * ProductionStudio: Terminal de injeção de dados e controle de lote (Task 77).
 */
export class ProductionStudio extends HTMLElement {
  private _abortController: AbortController | null = null;
  private _labelPlaceholders: string[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
    this.refreshLabelPlaceholders();
  }

  disconnectedCallback() {
    this._abortController?.abort();
  }

  private setupListeners() {
    this._abortController = new AbortController();
    const { signal } = this._abortController;
    const root = this.shadowRoot!;

    // 1. Escuta mudanças no Store
    eventBus.on('state:change', (_state: AppState) => {
      this.refreshLabelPlaceholders();
      this.render();
    }, { signal });

    // 2. Gateway Event: Dados carregados
    root.addEventListener('data-ready', (e: any) => {
      const { data, sourceName } = e.detail;
      eventBus.emit('production:data:update', { data, sourceName });
      UISM.play(UISM.enumPresets.SUCCESS);
    }, { signal });

    // 3. Paginador e Controles
    root.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const state = store.getState();

      if (target.closest('#btn-prev')) {
        const newIndex = Math.max(0, state.productionPreviewIndex - 1);
        eventBus.emit('production:preview:index', { index: newIndex });
        UISM.play(UISM.enumPresets.TAP);
      }

      if (target.closest('#btn-next')) {
        const newIndex = Math.min(state.productionData.length - 1, state.productionPreviewIndex + 1);
        eventBus.emit('production:preview:index', { index: newIndex });
        UISM.play(UISM.enumPresets.TAP);
      }

      if (target.closest('#btn-clear-data')) {
        if (confirm('Deseja remover os dados carregados?')) {
          eventBus.emit('production:data:update', { data: [], sourceName: '' });
          UISM.play(UISM.enumPresets.DELETE);
        }
      }

      if (target.closest('#btn-open-matrix')) {
        const modal = document.getElementById('batch-modal') as any;
        if (modal) modal.setAttribute('open', '');
        UISM.play(UISM.enumPresets.OPEN);
      }
    }, { signal });
  }

  private refreshLabelPlaceholders(): void {
    const label = store.getState().currentLabel;
    if (!label) return;

    const vars = new Set<string>();
    const regex = /\{\{\s*([\w\s."'-]+)(?::([\w,()\s.:-]+))?(?:\|\|([^}]+))?\s*\}\}/g;

    label.elements.forEach((el) => {
      if (el.type === ElementType.TEXT && (el as any).content) {
        const content = (el as any).content;
        let match;
        while ((match = regex.exec(content)) !== null) {
          vars.add(match[1].trim());
        }
      }
    });
    this._labelPlaceholders = Array.from(vars);
  }

  private render() {
    if (!this.shadowRoot) return;
    const state = store.getState();
    const hasData = state.productionData.length > 0;
    const dataFields = hasData ? Object.keys(state.productionData[0]) : [];

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; flex-direction: column; height: 100%; background: #0a0c10; font-family: var(--font-sans); }
        .header { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; border-bottom: 1px solid var(--color-border-ui); background: rgba(0,0,0,0.2); }
        .header-title { font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.1em; }
        
        .content { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 24px; }

        .paginator-card {
          background: rgba(99, 102, 241, 0.05);
          border: 1px solid var(--color-accent-primary-alpha, rgba(99, 102, 241, 0.2));
          border-radius: 12px; padding: 16px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .paginator-controls { display: flex; align-items: center; justify-content: space-between; }
        .page-info { font-family: var(--font-mono); font-size: 11px; color: var(--color-text-main); font-weight: bold; }
        .source-tag { font-size: 9px; color: var(--color-text-muted); opacity: 0.6; text-transform: uppercase; }

        .btn-nav {
          width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--color-border-ui);
          background: rgba(255,255,255,0.03); color: white; cursor: pointer; display: grid; place-items: center;
          transition: all 0.2s;
        }
        .btn-nav:hover { background: var(--color-accent-primary); border-color: var(--color-accent-primary); box-shadow: 0 0 10px var(--color-accent-primary); }
        .btn-nav:disabled { opacity: 0.2; cursor: not-allowed; }

        .variable-section { display: flex; flex-direction: column; gap: 8px; }
        .badge-list { display: flex; flex-wrap: wrap; gap: 8px; }

        .action-area { margin-top: auto; padding: 20px; border-top: 1px solid var(--color-border-ui); background: rgba(0,0,0,0.1); }
      </style>

      <div class="header">
        <span class="header-title">Production Studio</span>
        ${HelpContentProvider.buildTooltip('production', 'bottom')}
      </div>

      <div class="content">
        ${!hasData ? `
          <div class="flex flex-col gap-2">
            <span class="label-prism">1. DATA ENTRY GATEWAY</span>
            <ui-data-gateway id="gateway" style="height: 300px;"></ui-data-gateway>
          </div>
        ` : `
          <div class="paginator-card">
            <div class="flex flex-col gap-1">
              <span class="label-prism" style="margin:0">Live Preview Paginator</span>
              <span class="source-tag">${state.productionSourceName}</span>
            </div>
            
            <div class="paginator-controls">
              <button class="btn-nav" id="btn-prev" ${state.productionPreviewIndex === 0 ? 'disabled' : ''}>
                <ui-icon name="maximize" style="transform: rotate(-90deg); --icon-size: 12px;"></ui-icon>
              </button>
              
              <div class="page-info">
                RECORD ${String(state.productionPreviewIndex + 1).padStart(3, '0')} / ${state.productionData.length}
              </div>
              
              <button class="btn-nav" id="btn-next" ${state.productionPreviewIndex >= state.productionData.length - 1 ? 'disabled' : ''}>
                <ui-icon name="maximize" style="transform: rotate(90deg); --icon-size: 12px;"></ui-icon>
              </button>
            </div>

            <app-button id="btn-clear-data" variant="danger" style="width: 100%; font-size: 9px; margin-top: 8px;">
              DISCONNECT DATA SOURCE
            </app-button>
          </div>

          <div class="variable-section">
            <span class="label-prism">Data Mapping</span>
            <div class="badge-list">
              ${dataFields.map(f => {
                const isUsed = this._labelPlaceholders.includes(f);
                return `<ui-variable-badge state="${isUsed ? 'used' : 'missing'}">${escapeHTML(f)}</ui-variable-badge>`;
              }).join('')}
            </div>
          </div>
        `}

        <div class="variable-section">
          <span class="label-prism">Required by Template</span>
          <div class="badge-list">
            ${this._labelPlaceholders.map(p => {
              const isAvailable = dataFields.includes(p);
              return `<span class="variable-badge ${isAvailable ? '' : 'missing'}">
                {{${escapeHTML(p)}}} ${isAvailable ? '' : '⚠️'}
              </span>`;
            }).join('')}
          </div>
        </div>
      </div>

      ${hasData ? `
        <div class="action-area">
          <app-button id="btn-open-matrix" variant="primary" style="width: 100%; height: 44px; letter-spacing: 0.1em; font-weight: bold;">
            <ui-icon name="zap" class="mr-2"></ui-icon> OPEN PRODUCTION COCKPIT
          </app-button>
        </div>
      ` : ''}
    `;
  }
}

customElements.define('production-studio', ProductionStudio);
