import eventBus from '../../core/EventBus';
import { store, AppState } from '../../core/Store';
import { AnyElement, Label } from '../../domain/models/Label';
import { OverflowResult } from '../../domain/services/OverflowValidator';
import { UISM } from '../../core/UISoundManager';
import '../common/AppInput';
import '../common/AppButton';
import '../common/icon';
import '../common/UINumberScrubber';
import '../common/tooltip';

/**
 * ElementInspector: Painel tátil de Camadas, Propriedades e Document Setup.
 * Otimizado para manter o foco e o estado de arraste (scrubbing).
 */
export class ElementInspector extends HTMLElement {
  private unsubscribe: (() => void) | null = null;
  private currentElementsJson: string = '';
  private currentConfigJson: string = '';
  private currentSelectedId: string | null = null;
  private overflowWarnings: Map<string, OverflowResult> = new Map();

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.renderSkeleton();
    this.setupListeners();
  }

  disconnectedCallback(): void {
    if (this.unsubscribe) this.unsubscribe();
  }

  private setupListeners(): void {
    this.unsubscribe = eventBus.on('state:change', (state: AppState) => {
      const elements = state.currentLabel?.elements || [];
      const config = state.currentLabel?.config;
      const selectedId = state.selectedElementIds[0] || null;

      const elementsStructureJson = JSON.stringify(elements.map(e => ({ id: e.id, z: e.zIndex, type: e.type, v: e.visible })));
      const configJson = JSON.stringify(config);

      const hasStructureChanged = elementsStructureJson !== this.currentElementsJson || selectedId !== this.currentSelectedId;

      if (hasStructureChanged) {
        this.currentElementsJson = elementsStructureJson;
        this.currentSelectedId = selectedId;
        this.rebuildPanel(state.currentLabel, selectedId);
      } else {
        this.syncValues(elements, config, selectedId);
      }
    });

    eventBus.on('element:warning', ({ id, result }) => {
      this.overflowWarnings.set(id, result);
      this.updateWarningVisuals();
    });

    eventBus.on('element:warning:clear', ({ id }) => {
      this.overflowWarnings.delete(id);
      this.updateWarningVisuals();
    });
  }

  private renderSkeleton(): void {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <style>
        @import "/src/styles/main.css";
        :host { display: flex; flex-direction: column; height: 100%; gap: 16px; padding: 24px; box-sizing: border-box; }
        .header-main { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .title-group { display: flex; align-items: center; gap: 8px; }
        .panel-title { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; color: var(--color-text-muted); letter-spacing: 0.1em; }
        .unit-count { font-family: var(--font-mono); font-size: 9px; color: var(--color-text-muted); opacity: 0.5; background: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 4px; }
        
        #panel-content { display: flex; flex-direction: column; gap: 8px; overflow-y: auto; flex: 1; padding-right: 4px; }
        
        /* Blueprint & Cards Styles */
        .blueprint-container { position: relative; width: 100%; height: 180px; background: #0a0c10; border: 1px solid var(--color-border-ui); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; overflow: hidden; }
        .blueprint-grid { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 0); background-size: 16px 16px; pointer-events: none; }
        .blueprint-label { background: white; box-shadow: var(--shadow-panel); transition: all 0.4s var(--ease-spring); border-radius: 2px; }
        .dimension-line { position: absolute; background: var(--color-accent-primary); opacity: 0.6; }
        .dim-h { width: 1px; top: 25%; bottom: 25%; right: 24px; }
        .dim-w { height: 1px; left: 25%; right: 25%; top: 24px; }
        
        .element-card { background: var(--color-surface-solid); border: 1px solid var(--color-border-ui); border-radius: 12px; overflow: hidden; transition: all 0.4s var(--ease-spring); }
        .element-card.selected { border-color: var(--color-accent-primary); box-shadow: var(--shadow-neon-primary); scale: 1.02; z-index: 10; }
        .card-header { padding: 12px; display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }
        .card-header:hover { background: rgba(255, 255, 255, 0.03); }
        .type-badge { font-family: var(--font-mono); font-size: 8px; padding: 2px 6px; border-radius: 4px; background: rgba(99, 102, 241, 0.1); color: var(--color-accent-primary); text-transform: uppercase; }
        .element-name { flex: 1; font-size: 12px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .card-content { padding: 0 12px 16px 12px; display: none; border-top: 1px solid var(--color-border-ui); margin-top: 4px; animation: slideDown 0.3s var(--ease-spring); }
        .element-card.selected .card-content { display: block; }
        .warning-tag { color: var(--color-accent-warning); font-size: 10px; display: none; margin-right: 4px; }
        .action-icon { opacity: 0.4; transition: opacity 0.2s; cursor: pointer; }
        .action-icon.active { opacity: 1; color: var(--color-accent-primary); }
        .section-title { font-family: var(--font-mono); font-size: 9px; text-transform: uppercase; color: var(--color-text-muted); margin: 16px 0 8px 0; }
        .row { display: flex; gap: 10px; margin-bottom: 8px; }
        
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        .help-btn { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; border-radius: 4px; color: var(--color-text-muted); cursor: help; background: transparent; border: none; transition: all 0.2s; }
        .help-btn:hover { color: var(--color-accent-primary); background: rgba(99, 102, 241, 0.1); }
        .tooltip-content { padding: 4px; max-width: 200px; }
        .tooltip-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; font-size: 11px; }
        .tooltip-section { margin-bottom: 12px; }
        .controls-grid { display: grid; grid-template-columns: auto 1fr; gap: 8px; align-items: center; }
        .control-desc { font-size: 10px; color: var(--color-text-muted); }
        .math-note { display: flex; gap: 6px; margin-top: 8px; font-size: 9px; opacity: 0.8; }
      </style>
      <div class="header-main">
        <div class="title-group">
          <span id="panel-title" class="panel-title">LAYERS & PRECISION</span>
          <span id="unit-count" class="unit-count">0 UNITS</span>
        </div>
        
        <ui-tooltip placement="bottom" offset="12">
          <button slot="target" class="help-btn">
            <ui-icon name="help" style="--icon-size: 14px;"></ui-icon>
          </button>
          <div slot="content" class="tooltip-content">
            <div class="tooltip-header">
              <ui-icon name="save" style="--icon-size: 14px; color: var(--color-accent-primary);"></ui-icon>
              <span style="color: white; font-weight: 600;">Technical Manual</span>
            </div>
            <div class="tooltip-section">
              <p class="section-title" style="margin-top: 0;">Dimension Scrubbing</p>
              <div class="controls-grid">
                <kbd class="kbd-prism">Drag</kbd> <span class="control-desc">Adjust ±1.0mm</span>
                <kbd class="kbd-prism">Shift</kbd> <span class="control-desc">Fast ±10mm</span>
                <kbd class="kbd-prism">Alt</kbd> <span class="control-desc">Fine ±0.1mm</span>
              </div>
              <div class="math-note">
                <ui-icon name="text" style="--icon-size: 10px;"></ui-icon>
                <span>Supports math: <code style="color:white">100/2 + 5</code></span>
              </div>
            </div>
          </div>
        </ui-tooltip>
      </div>
      <div id="panel-content"></div>
    `;
  }

  private rebuildPanel(label: Label | null, selectedId: string | null): void {
    const container = this.shadowRoot?.getElementById('panel-content');
    const title = this.shadowRoot?.getElementById('panel-title');
    const countLabel = this.shadowRoot?.getElementById('unit-count');
    if (!container || !label) return;

    if (!selectedId) {
      if (title) title.textContent = 'LABEL SETUP';
      if (countLabel) countLabel.textContent = 'BLUEPRINT';
      container.innerHTML = this.renderDocumentSetup(label);
      this.attachDocumentEvents();
    } else {
      if (title) title.textContent = 'LAYERS & PRECISION';
      if (countLabel) countLabel.textContent = `${label.elements.length} UNITS`;
      const sorted = [...label.elements].sort((a, b) => b.zIndex - a.zIndex);
      container.innerHTML = sorted.map(el => this.renderCardHtml(el, el.id === selectedId)).join('');
      this.attachCardEvents(label.elements);
    }
    this.updateWarningVisuals();
  }

  private renderDocumentSetup(label: Label): string {
    const { widthMM, heightMM } = label.config;
    const ratio = widthMM / heightMM;
    let simW = 60;
    let simH = 60 / ratio;
    if (simH > 40) { simH = 40; simW = 40 * ratio; }

    return `
      <div class="blueprint-container">
        <div class="blueprint-grid"></div>
        <div class="blueprint-label" style="width: ${simW}%; height: ${simH}%;"></div>
        <div class="dimension-line dim-w" style="top: 20px;"></div>
        <div class="dimension-line dim-h" style="right: 20px;"></div>
        <div class="absolute top-1 flex justify-center w-full">
          <ui-number-scrubber label="W" property="widthMM" id="doc-width" value="${widthMM}" unit="mm" step="1" style="width: 100px;"></ui-number-scrubber>
        </div>
        <div class="absolute right-1 top-0 bottom-0 flex items-center">
          <ui-number-scrubber label="H" property="heightMM" id="doc-height" value="${heightMM}" unit="mm" step="1" style="width: 100px; transform: rotate(90deg);"></ui-number-scrubber>
        </div>
      </div>
      <div class="section-title">Global Configuration</div>
      <div class="row">
        <ui-number-scrubber label="DPI" property="dpi" id="doc-dpi" value="${label.config.dpi}" min="72" max="600" step="1" unit="dpi"></ui-number-scrubber>
      </div>
      <div class="row">
        <ui-number-scrubber label="Zoom" property="previewScale" id="doc-zoom" value="${label.config.previewScale}" min="0.1" max="5" step="0.1" unit="x"></ui-number-scrubber>
      </div>
    `;
  }

  private renderCardHtml(el: AnyElement, isSelected: boolean): string {
    const content = (el as any).content || el.type;
    return `
      <div class="element-card ${isSelected ? 'selected' : ''}" data-id="${el.id}">
        <div class="card-header">
          <span class="type-badge">${el.type}</span>
          <span class="element-name">${content}</span>
          <span class="warning-tag" data-warn-id="${el.id}">⚠</span>
          <ui-icon name="text" class="action-icon ${el.visible !== false ? 'active' : ''}" data-action="toggle-vis" data-id="${el.id}" style="--icon-size: 14px;"></ui-icon>
        </div>
        <div class="card-content">
          <div class="section-title">Transform (mm)</div>
          <div class="row">
            <ui-number-scrubber label="X" property="position.x" id="pos-x-${el.id}" value="${el.position.x}" step="0.1" unit="mm"></ui-number-scrubber>
            <ui-number-scrubber label="Y" property="position.y" id="pos-y-${el.id}" value="${el.position.y}" step="0.1" unit="mm"></ui-number-scrubber>
          </div>
          ${(el as any).dimensions ? `
            <div class="row">
              <ui-number-scrubber label="W" property="dimensions.width" id="dim-w-${el.id}" value="${(el as any).dimensions.width}" min="1" step="0.1" unit="mm"></ui-number-scrubber>
              <ui-number-scrubber label="H" property="dimensions.height" id="dim-h-${el.id}" value="${(el as any).dimensions.height}" min="1" step="0.1" unit="mm"></ui-number-scrubber>
            </div>
          ` : ''}
          <div class="section-title">Properties</div>
          ${(el as any).content !== undefined ? `<app-input label="Content" type="text" id="content-${el.id}" value="${(el as any).content}"></app-input>` : ''}
          ${(el as any).color || (el as any).fillColor ? `<app-input label="Color" type="color" id="color-${el.id}" value="${(el as any).color || (el as any).fillColor}"></app-input>` : ''}
          <div style="margin-top: 16px; display: flex; gap: 8px;">
            <app-button variant="secondary" data-action="up" data-id="${el.id}" style="flex: 1;">Up</app-button>
            <app-button variant="danger" data-action="del" data-id="${el.id}" style="flex: 1;">Delete</app-button>
          </div>
        </div>
      </div>
    `;
  }

  private syncValues(elements: AnyElement[], config: any, selectedId: string | null): void {
    const shadow = this.shadowRoot!;
    const setScrubber = (id: string, val: any) => {
      const s = shadow.getElementById(id) as any;
      if (s && val !== undefined && s.value !== val) {
        const isInteracting = shadow.activeElement === s || s.shadowRoot?.activeElement || s.matches('.is-scrubbing');
        if (!isInteracting) s.value = val;
      }
    };

    if (!selectedId) {
      setScrubber('doc-width', config.widthMM);
      setScrubber('doc-height', config.heightMM);
      setScrubber('doc-dpi', config.dpi);
      setScrubber('doc-zoom', config.previewScale);
      const thumb = shadow.querySelector('.blueprint-label') as HTMLElement;
      if (thumb) {
        const ratio = config.widthMM / config.heightMM;
        let simW = 60; let simH = 60 / ratio;
        if (simH > 40) { simH = 40; simW = 40 * ratio; }
        thumb.style.width = `${simW}%`; thumb.style.height = `${simH}%`;
      }
      return;
    }

    const el = elements.find(e => e.id === selectedId);
    if (!el) return;

    setScrubber(`pos-x-${el.id}`, el.position.x);
    setScrubber(`pos-y-${el.id}`, el.position.y);
    if ((el as any).dimensions) {
      setScrubber(`dim-w-${el.id}`, (el as any).dimensions.width);
      setScrubber(`dim-h-${el.id}`, (el as any).dimensions.height);
    }
  }

  private updateWarningVisuals(): void {
    this.shadowRoot?.querySelectorAll('.warning-tag').forEach((el: any) => {
      const id = el.getAttribute('data-warn-id');
      el.style.display = this.overflowWarnings.has(id) ? 'inline' : 'none';
    });
  }

  private attachDocumentEvents(): void {
    const shadow = this.shadowRoot!;
    const handleDocScrub = (e: any) => {
      if (!e.detail || !e.detail.property) return;
      const label = store.getState().currentLabel;
      if (label) {
        eventBus.emit('label:config:update', { ...label.config, [e.detail.property]: e.detail.value });
      }
    };

    ['doc-width', 'doc-height', 'doc-dpi', 'doc-zoom'].forEach(id => {
      const s = shadow.getElementById(id);
      s?.addEventListener('input', handleDocScrub);
      s?.addEventListener('change', handleDocScrub);
    });
  }

  private attachCardEvents(elements: AnyElement[]): void {
    const shadow = this.shadowRoot!;
    elements.forEach(el => {
      const card = shadow.querySelector(`.element-card[data-id="${el.id}"]`);
      card?.querySelector('.card-header')?.addEventListener('click', (e: any) => {
        if (e.target.closest('[data-action]')) return;
        eventBus.emit('element:select', el.id);
        UISM.play(UISM.enumPresets.TAP);
      });

      card?.querySelector('[data-action="toggle-vis"]')?.addEventListener('click', () => {
        eventBus.emit('element:update', { id: el.id, updates: { visible: el.visible === false } });
        UISM.play(UISM.enumPresets.TOGGLE);
      });

      if (el.id === this.currentSelectedId) {
        const handleScrub = (e: any) => {
          if (!e.detail || !e.detail.property) return;
          const propertyPath = e.detail.property.split('.');
          const value = e.detail.value;
          const freshEl = store.getState().currentLabel?.elements.find(item => item.id === el.id);
          if (!freshEl) return;
          const updates = propertyPath.length === 2 
            ? { [propertyPath[0]]: { ...(freshEl as any)[propertyPath[0]], [propertyPath[1]]: value } } 
            : { [propertyPath[0]]: value };
          eventBus.emit('element:update', { id: el.id, updates });
        };

        ['pos-x', 'pos-y', 'dim-w', 'dim-h'].forEach(id => {
          const s = shadow.getElementById(`${id}-${el.id}`);
          s?.addEventListener('input', handleScrub);
          s?.addEventListener('change', handleScrub);
        });

        shadow.querySelector(`[data-action="up"][data-id="${el.id}"]`)?.addEventListener('click', () => {
          eventBus.emit('element:update', { id: el.id, updates: { zIndex: el.zIndex + 1 } });
          UISM.play(UISM.enumPresets.SWOOSHIN);
        });

        shadow.querySelector(`[data-action="del"][data-id="${el.id}"]`)?.addEventListener('click', () => {
          eventBus.emit('element:delete', el.id);
        });
      }
    });
  }
}

customElements.define('element-inspector', ElementInspector);
