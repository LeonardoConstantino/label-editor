import eventBus from '../../core/EventBus';
import { store, AppState } from '../../core/Store';
import { AnyElement, Label, ElementType } from '../../domain/models/Label';
import { OverflowResult } from '../../domain/services/OverflowValidator';
import { UISM } from '../../core/UISoundManager';
import { 
  TextElement, 
  RectangleElement, 
  ImageElement, 
  BorderElement 
} from '../../domain/models/elements/SpecificElements';
import { escapeHTML } from '../../utils/sanitize';
import { logger } from '../../core/Logger';
import '../common/AppInput';
import '../common/AppButton';
import '../common/icon';
import '../common/UINumberScrubber';
import '../common/tooltip';
import { debounce } from '../../utils/utils';

const isText = (el: AnyElement): el is TextElement => el.type === ElementType.TEXT;
const isRect = (el: AnyElement): el is RectangleElement => el.type === ElementType.RECTANGLE;
const isImage = (el: AnyElement): el is ImageElement => el.type === ElementType.IMAGE;
const isBorder = (el: AnyElement): el is BorderElement => el.type === ElementType.BORDER;
const hasDimensions = (el: AnyElement): el is AnyElement & { dimensions: { width: number; height: number } } => 'dimensions' in el;
const logInputEvent = debounce((value: string | null, prop: string | null) => {
  logger.debug('Inspector', `Input Event: prop=${prop} | value=${value}`);
}, 100);

export class ElementInspector extends HTMLElement {
  private abortController: AbortController | null = null;
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
    this.cleanup();
  }

  private cleanup(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  private setupListeners(): void {
    this.cleanup();
    this.abortController = new AbortController();
    const { signal } = this.abortController;

    const offState = eventBus.on('state:change', (state: AppState) => this.handleStateChange(state));
    const offWarn = eventBus.on('element:warning', ({ id, result }) => {
      this.overflowWarnings.set(id, result);
      this.updateWarningVisuals();
    });
    const offClear = eventBus.on('element:warning:clear', ({ id }) => {
      this.overflowWarnings.delete(id);
      this.updateWarningVisuals();
    });

    signal.addEventListener('abort', () => {
      offState(); offWarn(); offClear();
    });

    const root = this.shadowRoot!;
    root.addEventListener('app-input', (e) => this.handleGenericInput(e), { signal });
    root.addEventListener('input', (e) => this.handleGenericInput(e), { signal });
    root.addEventListener('change', (e) => this.handleGenericInput(e), { signal });
    root.addEventListener('click', (e) => this.handleDelegatedClick(e), { signal });
  }

  private handleStateChange(state: AppState): void {
    const elements = state.currentLabel?.elements || [];
    const config = state.currentLabel?.config;
    const selectedId = state.selectedElementIds[0] || null;

    // REMOVIDO: e.name do hash para evitar rebuild ao renomear camada
    const elementsStructureJson = JSON.stringify(elements.map(e => ({ id: e.id, type: e.type, v: e.visible })));
    const hasStructureChanged = elementsStructureJson !== this.currentElementsJson || selectedId !== this.currentSelectedId;

    if (hasStructureChanged) {
      logger.debug('Inspector', `Rebuild disparado: Mudança na estrutura ou seleção.`);
      this.currentElementsJson = elementsStructureJson;
      this.currentSelectedId = selectedId;
      this.rebuildPanel(state.currentLabel, selectedId);
    } else {
      this.syncValues(elements, config, selectedId);
    }
  }

  private renderSkeleton(): void {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <style>
        @import "/src/styles/main.css";
        :host { display: flex; flex-direction: column; height: 100%; gap: 16px; padding: 20px; box-sizing: border-box; color: var(--color-text-main); font-family: var(--font-sans); overflow-y: scroll; }
        #panel-content { display: flex; flex-direction: column; gap: 12px; flex: 1; padding-right: 8px; }
        .row-ui { display: flex; gap: 10px; margin-bottom: 4px; align-items: flex-end; }
        .row-ui > * { flex: 1; min-width: 0; }
        .row-ui > .fixed-small { flex: none; width: 100px; }
        .tooltip-content { padding: 8px; max-width: 220px; }
        .action-icon { pointer-events: auto !important; transition: all 0.2s var(--ease-spring);
        .action-icon:hover { transform: scale(1.2); color: var(--color-accent-primary); }
        .action-icon.active { color: var(--color-accent-primary); }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      </style>
      <div class="inspector-header">
        <div class="inspector-title-group">
          <span id="panel-title" class="inspector-title">LAYERS</span>
          <span id="unit-count" class="inspector-badge">0 UNITS</span>
        </div>
        <ui-tooltip placement="bottom" offset="12">
          <button slot="target" class="help-btn" aria-label="Manual Técnico">
            <ui-icon name="help" size="md"></ui-icon>
          </button>
          <div slot="content" class="tooltip-content">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px;">
              <ui-icon name="save" size="md" style="--icon-color: var(--color-accent-primary);"></ui-icon>
              <span style="color: white; font-weight: 600; font-size: 11px; text-transform: uppercase;">Technical Manual</span>
            </div>
            <p class="label-prism" style="margin-top: 0;">Dimension Scrubbing</p>
            <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px; align-items: center;">
              <kbd class="kbd-prism">Drag</kbd> <span style="font-size: 10px; color: var(--color-text-muted);">Adjust ±1.0mm</span>
              <kbd class="kbd-prism">Shift</kbd> <span style="font-size: 10px; color: var(--color-text-muted);">Fast ±10mm</span>
              <kbd class="kbd-prism">Alt</kbd> <span style="font-size: 10px; color: var(--color-text-muted);">Fine ±0.1mm</span>
            </div>
            <div style="margin-top: 12px; padding: 8px; background: rgba(0,0,0,0.3); border-radius: 4px; border: 1px solid rgba(255,255,255,0.05); display: flex; gap: 8px;">
              <ui-icon name="text" size="sm"></ui-icon>
              <span style="font-size: 9px; color: var(--color-text-muted);">Supports math:</br><code style="color: white;">100/2 + 5</code></span>
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
    } else {
      if (title) title.textContent = 'PROPERTIES';
      if (countLabel) countLabel.textContent = `${label.elements.length} UNITS`;
      const sorted = [...label.elements].sort((a, b) => b.zIndex - a.zIndex);
      container.innerHTML = sorted.map(el => this.renderCardHtml(el, el.id === selectedId)).join('');
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
        <div class="blueprint-paper" style="width: ${simW}%; height: ${simH}%; background-color: ${escapeHTML(backgroundColor || 'white')}"></div>
        <div class="dimension-line" style="height: 1px; left: 25%; right: 25%; top: 24px;"></div>
        <div class="dimension-line" style="width: 1px; top: 25%; bottom: 25%; right: 24px;"></div>
        <div style="position: absolute; top: 4px; left: 0; right: 0; display: flex; justify-content: center;">
          <ui-number-scrubber label="W" data-doc-prop="widthMM" value="${widthMM}" unit="mm" step="1" style="width: 100px; flex: none;"></ui-number-scrubber>
        </div>
        <div style="position: absolute; right: 4px; top: 0; bottom: 0; display: flex; align-items: center;">
          <ui-number-scrubber label="H" data-doc-prop="heightMM" value="${heightMM}" unit="mm" step="1" style="width: 100px; transform: rotate(90deg); flex: none;"></ui-number-scrubber>
        </div>
      </div>
      <span class="label-prism">Canvas Setup</span>
      <div class="row-ui">
        <ui-number-scrubber label="DPI" data-doc-prop="dpi" value="${label.config.dpi}" min="72" max="600" step="1" unit="dpi"></ui-number-scrubber>
        <app-input label="Paper" type="color" data-doc-prop="backgroundColor" value="${escapeHTML(backgroundColor || '#ffffff')}" class="fixed-small"></app-input>
      </div>
      <div class="row-ui">
        <ui-number-scrubber label="Zoom" data-doc-prop="previewScale" value="${label.config.previewScale}" min="0.1" max="5" step="0.1" unit="x"></ui-number-scrubber>
      </div>
    `;
  }

  private renderCardHtml(el: AnyElement, isSelected: boolean): string {
    const id = escapeHTML(el.id);
    return `
      <div class="element-card ${isSelected ? 'selected' : ''}" data-id="${id}">
        <div class="card-header" data-action="select">
          <span class="type-tag">${escapeHTML(el.type)}</span>
          <span class="layer-name" data-layer-id="${id}">${escapeHTML(el.name || el.type)}</span>
          <span class="warning-tag" data-warn-id="${id}" style="display:none; color:var(--color-accent-warning)">⚠</span>
          <ui-icon name="${el.visible !== false ? 'eye-off' : 'eye'}" class="action-icon ${el.visible !== false ? 'active' : ''}" 
            data-action="toggle-vis" 
            style="--icon-size: 14px; cursor: pointer; opacity: ${el.visible !== false ? '1' : '0.3'};"></ui-icon>
        </div>
        <div class="card-content">
          ${isSelected ? this.renderElementProperties(el) : ''}
        </div>
      </div>
    `;
  }

  private renderElementProperties(el: AnyElement): string {
    return `
      <span class="label-prism">Identification</span>
      <div class="row-ui">
        <app-input label="Layer Name" data-prop="name" value="${escapeHTML(el.name || '')}" style="flex:1"></app-input>
      </div>

      <span class="label-prism">Transform</span>
      <div class="row-ui">
        <ui-number-scrubber label="X" data-prop="position.x" value="${el.position.x}" step="0.1" unit="mm"></ui-number-scrubber>
        <ui-number-scrubber label="Y" data-prop="position.y" value="${el.position.y}" step="0.1" unit="mm"></ui-number-scrubber>
      </div>
      
      ${hasDimensions(el) ? `
        <div class="row-ui">
          <ui-number-scrubber label="W" data-prop="dimensions.width" value="${el.dimensions.width}" min="1" step="0.1" unit="mm"></ui-number-scrubber>
          <ui-number-scrubber label="H" data-prop="dimensions.height" value="${el.dimensions.height}" min="1" step="0.1" unit="mm"></ui-number-scrubber>
        </div>
      ` : ''}

      <div class="row-ui">
        <ui-number-scrubber label="Rot" data-prop="rotation" value="${el.rotation || 0}" min="0" max="360" step="1" unit="°"></ui-number-scrubber>
        <ui-number-scrubber label="Op" data-prop="opacity" value="${el.opacity ?? 1}" min="0" max="1" step="0.05" unit="α"></ui-number-scrubber>
      </div>

      ${this.renderTypeSpecificFields(el)}

      <div style="margin-top: 16px; display: flex; gap: 8px;">
        <app-button variant="secondary" data-action="up" style="flex: 1;">UP</app-button>
        <app-button variant="danger" data-action="del" style="flex: 1;">DEL</app-button>
      </div>
    `;
  }

  private renderTypeSpecificFields(el: AnyElement): string {
    if (isText(el)) {
      return `
        <span class="label-prism">Typography</span>
        <div class="row-ui">
          <app-input label="Content" data-prop="content" value="${escapeHTML(el.content)}" style="flex:1"></app-input>
        </div>
        <div class="row-ui">
          <ui-number-scrubber label="Size" data-prop="fontSize" value="${el.fontSize}" min="1" max="200" step="1" unit="pt"></ui-number-scrubber>
          <app-input label="Color" type="color" data-prop="color" value="${escapeHTML(el.color)}" class="fixed-small"></app-input>
        </div>
        <div class="row-ui">
          <ui-number-scrubber label="Lead" data-prop="lineHeight" value="${el.lineHeight || 1.2}" min="0.5" max="3" step="0.1" unit="lh"></ui-number-scrubber>
          <app-input label="Weight" data-prop="fontWeight" value="${escapeHTML(String(el.fontWeight))}" class="fixed-small"></app-input>
        </div>
      `;
    }

    if (isRect(el)) {
      return `
        <span class="label-prism">Appearance</span>
        <div class="row-ui">
          <app-input label="Fill" type="color" data-prop="fillColor" value="${escapeHTML(el.fillColor)}" style="flex:1"></app-input>
          <app-input label="Stroke" type="color" data-prop="strokeColor" value="${escapeHTML(el.strokeColor)}" style="flex:1"></app-input>
        </div>
        <div class="row-ui">
          <ui-number-scrubber label="Radius" data-prop="borderRadius" value="${el.borderRadius || 0}" min="0" step="0.5" unit="mm"></ui-number-scrubber>
          <ui-number-scrubber label="Thick" data-prop="strokeWidth" value="${el.strokeWidth || 0}" min="0" step="0.1" unit="mm"></ui-number-scrubber>
        </div>
      `;
    }

    if (isImage(el)) {
      return `
        <span class="label-prism">Image Settings</span>
        <div class="row-ui">
          <app-input label="Fit Mode" data-prop="fit" value="${escapeHTML(el.fit)}" style="flex:1"></app-input>
        </div>
        <div class="row-ui" style="align-items: center; gap: 12px; margin-top: 8px;">
          <span style="font-family: var(--font-mono); font-size: 10px; color: var(--color-text-muted); text-transform: uppercase;">Smoothing</span>
          <input type="checkbox" data-prop="smoothing" ${el.smoothing !== false ? 'checked' : ''} style="width: auto; flex: none;">
        </div>
      `;
    }

    if (isBorder(el)) {
      return `
        <span class="label-prism">Border Style</span>
        <div class="row-ui">
          <app-input label="Style" data-prop="style" value="${escapeHTML(el.style)}" style="flex:1"></app-input>
          <app-input label="Color" type="color" data-prop="color" value="${escapeHTML(el.color)}" class="fixed-small"></app-input>
        </div>
        <div class="row-ui">
          <ui-number-scrubber label="Thick" data-prop="width" value="${el.width}" min="0.1" max="10" step="0.1" unit="mm"></ui-number-scrubber>
          <ui-number-scrubber label="Radius" data-prop="radius" value="${el.radius || 0}" min="0" step="0.5" unit="mm"></ui-number-scrubber>
        </div>
      `;
    }

    return '';
  }

  private handleGenericInput(e: Event): void {
    const target = (e.target as HTMLElement).closest('[data-prop], [data-doc-prop]') as HTMLElement;
    if (!target) return;

    // Detectamos se é um evento customizado real (nosso) ou borbulhamento nativo
    const isCustom = !!(e as any).detail && typeof (e as any).detail !== 'number';
    const isOurComponent = target.tagName.toLowerCase() === 'app-input' || target.tagName.toLowerCase() === 'ui-number-scrubber';

    // Bloqueia borbulhamento nativo redundante
    if (isOurComponent && !isCustom && (e.type === 'input' || e.type === 'change')) {
      return;
    }

    const docProp = target.getAttribute('data-doc-prop');
    const elProp = target.getAttribute('data-prop');

    let value: any;
    if (isCustom) {
      const detail = (e as any).detail;
      value = (detail && typeof detail === 'object' && 'value' in detail) ? detail.value : detail;
    } else if (target instanceof HTMLInputElement) {
      value = target.type === 'checkbox' ? target.checked : target.value;
    } else {
      value = (target as any).value;
    }

    if (value === undefined) return;

    logInputEvent((e.target as HTMLInputElement).value, docProp || elProp);

    if (docProp) {
      this.emitDocUpdate(docProp, value);
    } else if (elProp && this.currentSelectedId) {
      this.emitElUpdate(this.currentSelectedId, elProp, value);
    }
  }

  private handleDelegatedClick(e: Event): void {
    const target = e.target as HTMLElement;
    const actionBtn = target.closest('[data-action]');
    if (!actionBtn) return;

    const action = actionBtn.getAttribute('data-action');
    const card = target.closest('.element-card');
    const id = card?.getAttribute('data-id') || this.currentSelectedId;

    if (!id) return;

    if (action === 'select') {
      if (id === this.currentSelectedId) return;
      eventBus.emit('element:select', id);
      UISM.play(UISM.enumPresets.TAP);
    } else if (action === 'toggle-vis') {
      const el = store.getState().currentLabel?.elements.find(item => item.id === id);
      if (el) {
        // Toggle robusto: se for explicitamente false vira true, senão vira false
        const nextVisible = el.visible === false;
        eventBus.emit('element:update', {
          id,
          updates: { visible: nextVisible },
        });
      }
      UISM.play(UISM.enumPresets.TOGGLE);
    } else if (action === 'up') {
      eventBus.emit('element:reorder', { id, direction: 'up' });
    } else if (action === 'del') {
      eventBus.emit('element:delete', id);
    }
  }

  private emitDocUpdate(prop: string, value: any): void {
    const label = store.getState().currentLabel;
    if (!label) return;
    eventBus.emit('label:config:update', { ...label.config, [prop]: value });
  }

  private emitElUpdate(id: string, prop: string, value: any): void {
    const updates: any = {};
    if (prop.includes('.')) {
      const [parent, child] = prop.split('.');
      updates[parent] = { [child]: value };
    } else {
      updates[prop] = value;
    }
    eventBus.emit('element:update', { id, updates });
  }

  private syncValues(elements: AnyElement[], config: any, selectedId: string | null): void {
    const shadow = this.shadowRoot!;
    
    const setVal = (container: ParentNode, selector: string, val: any, isScrubber = true) => {
      const el = container.querySelector(selector) as any;
      if (!el || val === undefined) return;
      const isInteracting = shadow.activeElement === el || el.shadowRoot?.activeElement || (isScrubber && el.classList.contains('is-scrubbing'));
      if (!isInteracting && el.value !== val) el.value = val;
    };

    if (!selectedId) {
      setVal(shadow, '[data-doc-prop="widthMM"]', config.widthMM);
      setVal(shadow, '[data-doc-prop="heightMM"]', config.heightMM);
      setVal(shadow, '[data-doc-prop="dpi"]', config.dpi);
      setVal(shadow, '[data-doc-prop="previewScale"]', config.previewScale);
      setVal(shadow, '[data-doc-prop="backgroundColor"]', config.backgroundColor, false);
      return;
    }

    const card = shadow.querySelector(`.element-card[data-id="${selectedId}"]`);
    if (!card) return;

    const el = elements.find(e => e.id === selectedId);
    if (!el) return;

    // Sincroniza o nome da camada visual no header do card
    const nameLabel = card.querySelector('.layer-name');
    if (nameLabel) nameLabel.textContent = el.name || el.type;

    setVal(card, '[data-prop="name"]', el.name, false);
    setVal(card, '[data-prop="position.x"]', el.position.x);
    setVal(card, '[data-prop="position.y"]', el.position.y);
    setVal(card, '[data-prop="rotation"]', el.rotation);
    setVal(card, '[data-prop="opacity"]', el.opacity);

    if (hasDimensions(el)) {
      setVal(card, '[data-prop="dimensions.width"]', el.dimensions.width);
      setVal(card, '[data-prop="dimensions.height"]', el.dimensions.height);
    }

    if (isText(el)) {
      setVal(card, '[data-prop="content"]', el.content, false);
      setVal(card, '[data-prop="fontSize"]', el.fontSize);
      setVal(card, '[data-prop="lineHeight"]', el.lineHeight);
      setVal(card, '[data-prop="color"]', el.color, false);
      setVal(card, '[data-prop="fontWeight"]', el.fontWeight, false);
    } else if (isRect(el)) {
      setVal(card, '[data-prop="fillColor"]', el.fillColor, false);
      setVal(card, '[data-prop="strokeColor"]', el.strokeColor, false);
      setVal(card, '[data-prop="borderRadius"]', el.borderRadius);
      setVal(card, '[data-prop="strokeWidth"]', el.strokeWidth);
    } else if (isBorder(el)) {
      setVal(card, '[data-prop="style"]', el.style, false);
      setVal(card, '[data-prop="color"]', el.color, false);
      setVal(card, '[data-prop="width"]', el.width);
      setVal(card, '[data-prop="radius"]', el.radius);
    }
  }

  private updateWarningVisuals(): void {
    this.shadowRoot?.querySelectorAll('.warning-tag').forEach((el: any) => {
      const id = el.getAttribute('data-warn-id');
      el.style.display = id && this.overflowWarnings.has(id) ? 'inline' : 'none';
    });
  }
}

customElements.define('element-inspector', ElementInspector);
