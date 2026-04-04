import eventBus from '../../core/EventBus';
import { store, AppState } from '../../core/Store';
import { AnyElement, Label, ElementType } from '../../domain/models/Label';
import { OverflowResult } from '../../domain/services/OverflowValidator';
import { UISM } from '../../core/UISoundManager';
import { BorderStyle } from '../../domain/models/elements/BaseElement';
import '../common/AppInput';
import '../common/AppButton';
import '../common/icon';
import '../common/UINumberScrubber';
import '../common/tooltip';

/**
 * ElementInspector: Painel inteligente e modular de propriedades.
 * Refatorado para suportar o inventário completo de elementos (v1.1).
 */
export class ElementInspector extends HTMLElement {
  private unsubscribe: (() => void) | null = null;
  private currentElementsJson: string = '';
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

      // Detecta mudanças estruturais para reconstruir o painel
      const elementsStructureJson = JSON.stringify(elements.map(e => ({ id: e.id, type: e.type, name: e.name, v: e.visible })));
      const hasStructureChanged = elementsStructureJson !== this.currentElementsJson || selectedId !== this.currentSelectedId;

      if (hasStructureChanged) {
        this.currentElementsJson = elementsStructureJson;
        this.currentSelectedId = selectedId;
        this.rebuildPanel(state.currentLabel, selectedId);
      } else {
        // Apenas atualiza valores nos campos existentes
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
        #panel-content { display: flex; flex-direction: column; gap: 8px; overflow-y: auto; flex: 1; padding-right: 4px; }
        .help-btn { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; border-radius: 4px; color: var(--color-text-muted); cursor: help; background: transparent; border: none; transition: all 0.2s; }
        .help-btn:hover { color: var(--color-accent-primary); background: rgba(99, 102, 241, 0.1); }
        .tooltip-content { padding: 4px; border: 1px solid var(--color-border-ui); }
      </style>
      <div class="inspector-header">
        <div class="inspector-title-group">
          <span id="panel-title" class="inspector-title">LAYERS & PRECISION</span>
          <span id="unit-count" class="inspector-badge">0 UNITS</span>
        </div>
        
        <ui-tooltip placement="bottom" offset="12">
          <button slot="target" class="help-btn">
            <ui-icon name="help" size="md"></ui-icon>
          </button>
          <div slot="content" class="tooltip-content">
            <div class="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
              <ui-icon name="save" size="md" style="--icon-color: var(--color-accent-primary);"></ui-icon>
              <span style="color: white; font-weight: 600; font-size: 11px;">Technical Manual</span>
            </div>
            <div class="space-y-3">
              <div>
                <p class="label-prism" style="margin-top: 0;">Dimension Scrubbing</p>
                <div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 items-center">
                  <kbd class="kbd-prism">Drag</kbd> <span class="text-[10px] text-text-muted">Adjust ±1.0mm</span>
                  <kbd class="kbd-prism">Shift</kbd> <span class="text-[10px] text-text-muted">Fast ±10mm</span>
                  <kbd class="kbd-prism">Alt</kbd> <span class="text-[10px] text-text-muted">Fine ±0.1mm</span>
                </div>
              </div>
              <div class="p-2 bg-black/30 rounded border border-white/5 flex gap-2">
                <ui-icon name="text" size="sm"></ui-icon>
                <span class="text-[9px] text-text-muted">Supports math: <code class="text-white">100/2 + 5</code></span>
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
      if (title) title.textContent = 'UNIT PROPERTIES';
      if (countLabel) countLabel.textContent = `${label.elements.length} UNITS`;
      const sorted = [...label.elements].sort((a, b) => b.zIndex - a.zIndex);
      container.innerHTML = sorted.map(el => this.renderCardHtml(el, el.id === selectedId)).join('');
      this.attachCardEvents(label.elements);
    }
    this.updateWarningVisuals();
  }

  private renderDocumentSetup(label: Label): string {
    const { widthMM, heightMM, backgroundColor } = label.config;
    const ratio = widthMM / heightMM;
    let simW = 60;
    let simH = 60 / ratio;
    if (simH > 40) { simH = 40; simW = 40 * ratio; }

    return `
      <div class="blueprint-box">
        <div class="blueprint-grid"></div>
        <div class="blueprint-paper" style="width: ${simW}%; height: ${simH}%; background-color: ${backgroundColor || 'white'}"></div>
        <div class="dimension-line" style="height: 1px; left: 25%; right: 25%; top: 24px;"></div>
        <div class="dimension-line" style="width: 1px; top: 25%; bottom: 25%; right: 24px;"></div>
        <div class="absolute top-1 flex justify-center w-full">
          <ui-number-scrubber label="W" property="widthMM" id="doc-width" value="${widthMM}" unit="mm" step="1" style="width: 100px;"></ui-number-scrubber>
        </div>
        <div class="absolute right-1 top-0 bottom-0 flex items-center">
          <ui-number-scrubber label="H" property="heightMM" id="doc-height" value="${heightMM}" unit="mm" step="1" style="width: 100px; transform: rotate(90deg);"></ui-number-scrubber>
        </div>
      </div>
      <div class="label-prism">Global Configuration</div>
      <div class="row-ui">
        <ui-number-scrubber label="DPI" property="dpi" id="doc-dpi" value="${label.config.dpi}" min="72" max="600" step="1" unit="dpi"></ui-number-scrubber>
        <app-input label="Paper" type="color" id="doc-bg" value="${backgroundColor || '#ffffff'}" style="width: 80px"></app-input>
      </div>
      <div class="row-ui">
        <ui-number-scrubber label="Zoom" property="previewScale" id="doc-zoom" value="${label.config.previewScale}" min="0.1" max="5" step="0.1" unit="x"></ui-number-scrubber>
      </div>
    `;
  }

  private renderCardHtml(el: AnyElement, isSelected: boolean): string {
    return `
      <div class="element-card ${isSelected ? 'selected' : ''}" data-id="${el.id}">
        <div class="card-header">
          <span class="type-tag">${el.type}</span>
          <span class="layer-name">${el.name || el.type}</span>
          <span class="warning-tag" data-warn-id="${el.id}" style="display:none; color:var(--color-accent-warning)">⚠</span>
          <ui-icon name="text" class="action-icon ${el.visible !== false ? 'active' : ''}" data-action="toggle-vis" data-id="${el.id}" style="--icon-size: 14px; cursor: pointer; opacity: ${el.visible !== false ? '1' : '0.3'};"></ui-icon>
        </div>
        <div class="card-content">
          ${isSelected ? this.renderElementProperties(el) : ''}
        </div>
      </div>
    `;
  }

  private renderElementProperties(el: AnyElement): string {
    return `
      <div class="label-prism">Identification</div>
      <div class="row-ui">
        <app-input label="Layer Name" id="name-${el.id}" value="${el.name || ''}" style="flex:1"></app-input>
      </div>

      <div class="label-prism">Transform (mm)</div>
      <div class="row-ui">
        <ui-number-scrubber label="X" property="position.x" id="pos-x-${el.id}" value="${el.position.x}" step="0.1" unit="mm"></ui-number-scrubber>
        <ui-number-scrubber label="Y" property="position.y" id="pos-y-${el.id}" value="${el.position.y}" step="0.1" unit="mm"></ui-number-scrubber>
      </div>
      
      ${'dimensions' in el ? `
        <div class="row-ui">
          <ui-number-scrubber label="W" property="dimensions.width" id="dim-w-${el.id}" value="${(el as any).dimensions.width}" min="1" step="0.1" unit="mm"></ui-number-scrubber>
          <ui-number-scrubber label="H" property="dimensions.height" id="dim-h-${el.id}" value="${(el as any).dimensions.height}" min="1" step="0.1" unit="mm"></ui-number-scrubber>
        </div>
      ` : ''}

      <div class="row-ui">
        <ui-number-scrubber label="Rot" property="rotation" id="rot-${el.id}" value="${el.rotation || 0}" min="0" max="360" step="1" unit="°"></ui-number-scrubber>
        <ui-number-scrubber label="Op" property="opacity" id="op-${el.id}" value="${el.opacity ?? 1}" min="0" max="1" step="0.05" unit="α"></ui-number-scrubber>
      </div>

      ${this.renderTypeSpecificFields(el)}

      <div style="margin-top: 16px; display: flex; gap: 8px;">
        <app-button variant="secondary" data-action="up" data-id="${el.id}" style="flex: 1;">
          <ui-icon name="undo" style="transform: rotate(90deg)"></ui-icon> UP
        </app-button>
        <app-button variant="danger" data-action="del" data-id="${el.id}" style="flex: 1;">
          <ui-icon name="trash"></ui-icon> DEL
        </app-button>
      </div>
    `;
  }

  private renderTypeSpecificFields(el: AnyElement): string {
    switch (el.type) {
      case ElementType.TEXT:
        const t = el as any;
        return `
          <div class="label-prism">Typography</div>
          <div class="row-ui">
            <app-input label="Content" id="content-${el.id}" value="${t.content}" style="flex:1"></app-input>
          </div>
          <div class="row-ui">
            <ui-number-scrubber label="Size" property="fontSize" id="font-size-${el.id}" value="${t.fontSize}" min="1" max="200" step="1" unit="pt"></ui-number-scrubber>
            <app-input label="Color" type="color" id="color-${el.id}" value="${t.color}" style="width: 80px"></app-input>
          </div>
          <div class="row-ui">
            <ui-number-scrubber label="Leading" property="lineHeight" id="line-h-${el.id}" value="${t.lineHeight || 1.2}" min="0.5" max="3" step="0.1" unit="lh"></ui-number-scrubber>
            <app-input label="Weight" id="weight-${el.id}" value="${t.fontWeight}" style="width: 80px"></app-input>
          </div>
        `;

      case ElementType.RECTANGLE:
        const r = el as any;
        return `
          <div class="label-prism">Appearance</div>
          <div class="row-ui">
            <app-input label="Fill" type="color" id="fill-${el.id}" value="${r.fillColor}" style="flex:1"></app-input>
            <app-input label="Stroke" type="color" id="stroke-${el.id}" value="${r.strokeColor}" style="flex:1"></app-input>
          </div>
          <div class="row-ui">
            <ui-number-scrubber label="Radius" property="borderRadius" id="radius-${el.id}" value="${r.borderRadius || 0}" min="0" step="0.5" unit="mm"></ui-number-scrubber>
            <ui-number-scrubber label="Thick" property="strokeWidth" id="stroke-w-${el.id}" value="${r.strokeWidth || 0}" min="0" step="0.1" unit="mm"></ui-number-scrubber>
          </div>
        `;

      case ElementType.IMAGE:
        const i = el as any;
        return `
          <div class="label-prism">Image Settings</div>
          <div class="row-ui">
            <app-input label="Fit Mode" id="fit-${el.id}" value="${i.fit}" style="flex:1"></app-input>
          </div>
          <div class="row-ui" style="align-items: center; gap: 12px;">
            <span class="text-[10px] text-text-muted uppercase font-mono">Smoothing</span>
            <input type="checkbox" id="smooth-${el.id}" ${i.smoothing !== false ? 'checked' : ''}>
          </div>
        `;

      case ElementType.BORDER:
        const b = el as any;
        return `
          <div class="label-prism">Border Style</div>
          <div class="row-ui">
            <app-input label="Style" id="border-style-${el.id}" value="${b.style}" style="flex:1"></app-input>
            <app-input label="Color" type="color" id="border-color-${el.id}" value="${b.color}" style="width: 80px"></app-input>
          </div>
          <div class="row-ui">
            <ui-number-scrubber label="Thick" property="width" id="border-w-${el.id}" value="${b.width}" min="0.1" max="10" step="0.1" unit="mm"></ui-number-scrubber>
            <ui-number-scrubber label="Radius" property="radius" id="border-radius-${el.id}" value="${b.radius || 0}" min="0" step="0.5" unit="mm"></ui-number-scrubber>
          </div>
        `;

      default: return '';
    }
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

    const setInput = (id: string, val: any) => {
      const i = shadow.getElementById(id) as any;
      if (i && val !== undefined && i.value !== val) {
        if (shadow.activeElement !== i && shadow.activeElement?.id !== id) i.value = val;
      }
    };

    if (!selectedId) {
      setScrubber('doc-width', config.widthMM);
      setScrubber('doc-height', config.heightMM);
      setScrubber('doc-dpi', config.dpi);
      setScrubber('doc-zoom', config.previewScale);
      setInput('doc-bg', config.backgroundColor);
      const thumb = shadow.querySelector('.blueprint-paper') as HTMLElement;
      if (thumb) {
        thumb.style.backgroundColor = config.backgroundColor || 'white';
        const ratio = config.widthMM / config.heightMM;
        let simW = 60; let simH = 60 / ratio;
        if (simH > 40) { simH = 40; simW = 40 * ratio; }
        thumb.style.width = `${simW}%`; thumb.style.height = `${simH}%`;
      }
      return;
    }

    const el = elements.find(e => e.id === selectedId);
    if (!el) return;

    setInput(`name-${el.id}`, el.name);
    setScrubber(`pos-x-${el.id}`, el.position.x);
    setScrubber(`pos-y-${el.id}`, el.position.y);
    setScrubber(`rot-${el.id}`, el.rotation || 0);
    setScrubber(`op-${el.id}`, el.opacity ?? 1);

    if ('dimensions' in el) {
      setScrubber(`dim-w-${el.id}`, (el as any).dimensions.width);
      setScrubber(`dim-h-${el.id}`, (el as any).dimensions.height);
    }

    if (el.type === ElementType.TEXT) {
      setInput(`content-${el.id}`, (el as any).content);
      setScrubber(`font-size-${el.id}`, (el as any).fontSize);
      setScrubber(`line-h-${el.id}`, (el as any).lineHeight);
      setInput(`color-${el.id}`, (el as any).color);
      setInput(`weight-${el.id}`, (el as any).fontWeight);
    } else if (el.type === ElementType.RECTANGLE) {
      setInput(`fill-${el.id}`, (el as any).fillColor);
      setInput(`stroke-${el.id}`, (el as any).strokeColor);
      setScrubber(`radius-${el.id}`, (el as any).borderRadius);
      setScrubber(`stroke-w-${el.id}`, (el as any).strokeWidth);
    } else if (el.type === ElementType.BORDER) {
      setInput(`border-style-${el.id}`, (el as any).style);
      setInput(`border-color-${el.id}`, (el as any).color);
      setScrubber(`border-w-${el.id}`, (el as any).width);
      setScrubber(`border-radius-${el.id}`, (el as any).radius);
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
    const handleDocUpdate = (e: any) => {
      const property = e.detail?.property || (e.target.id === 'doc-bg' ? 'backgroundColor' : null);
      const value = e.detail?.value !== undefined ? e.detail.value : e.target.value;
      if (!property) return;
      const label = store.getState().currentLabel;
      if (label) {
        eventBus.emit('label:config:update', { ...label.config, [property]: value });
      }
    };

    ['doc-width', 'doc-height', 'doc-dpi', 'doc-zoom'].forEach(id => {
      const s = shadow.getElementById(id);
      s?.addEventListener('input', handleDocUpdate);
      s?.addEventListener('change', handleDocUpdate);
    });

    shadow.getElementById('doc-bg')?.addEventListener('app-input', handleDocUpdate);
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

      card?.querySelector('[data-action="toggle-vis"]')?.addEventListener('click', (e: any) => {
        e.stopPropagation();
        eventBus.emit('element:update', { id: el.id, updates: { visible: el.visible === false } });
        UISM.play(UISM.enumPresets.TOGGLE);
      });

      if (el.id === this.currentSelectedId) {
        const handleUpdate = (e: any) => {
          const prop = e.detail?.property || e.target.id.split('-')[0];
          const value = e.detail?.value !== undefined ? e.detail.value : (e.target.type === 'checkbox' ? e.target.checked : e.detail);
          
          const updates = prop.includes('.') 
            ? { [prop.split('.')[0]]: { ...(el as any)[prop.split('.')[0]], [prop.split('.')[1]]: value } }
            : { [prop]: value };
          
          eventBus.emit('element:update', { id: el.id, updates });
        };

        ['pos-x', 'pos-y', 'dim-w', 'dim-h', 'rot', 'op', 'font-size', 'line-h', 'radius', 'stroke-w', 'border-w', 'border-radius'].forEach(id => {
          const s = shadow.getElementById(`${id}-${el.id}`);
          s?.addEventListener('input', handleUpdate);
          s?.addEventListener('change', handleUpdate);
        });

        ['name', 'content', 'color', 'weight', 'fill', 'stroke', 'fit', 'border-style', 'border-color'].forEach(id => {
          shadow.getElementById(`${id}-${el.id}`)?.addEventListener('app-input', handleUpdate);
        });

        shadow.getElementById(`smooth-${el.id}`)?.addEventListener('change', handleUpdate);

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
