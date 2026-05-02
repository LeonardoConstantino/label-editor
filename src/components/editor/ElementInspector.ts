import eventBus from '../../core/EventBus';
import { store, AppState } from '../../core/Store';
import { Label, AnyElement } from '../../domain/models/Label';
import { OverflowResult } from '../../domain/services/OverflowValidator';
import { UISM } from '../../core/UISoundManager';
import { debounce } from '../../utils/utils';
import { sharedSheet } from '../../utils/shared-styles';

// Imports dos Componentes de UI básicos
import '../common/AppInput';
import '../common/AppButton';
import '../common/icon';
import '../common/UINumberScrubber';
import '../common/tooltip';

// Imports dos Componentes Nível 2
import './inspector/InspectorDocumentSetup';
import './inspector/InspectorLayerCard';
import { INSPECTOR_CHANGE, INSPECTOR_ACTION } from './inspector/inspector-events';
import { InspectorChangeDetail, InspectorActionDetail } from './inspector/inspector.types';
import { InspectorDocumentSetup } from './inspector/InspectorDocumentSetup';
import { InspectorLayerCard } from './inspector/InspectorLayerCard';

interface EventWarning { id: string; result: OverflowResult; }
interface EventWarningClear { id: string; }

/**
 * ElementInspector: Orquestrador (Nível 1)
 * Atua como ponte entre a Store/EventBus e os sub-componentes especialistas.
 */
export class ElementInspector extends HTMLElement {
  private abortController: AbortController | null = null;
  private currentElementsJson: string = '';
  private currentSelectedId: string | null = null;
  private currentThumbnail: string = '';
  private overflowWarnings: Map<string, OverflowResult> = new Map();

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  connectedCallback(): void {
    this.renderSkeleton();
    this.setupListeners();
    this.handleStateChange(store.getState());
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

    eventBus.on('state:change', (state: AppState) => this.handleStateChange(state), { signal });
    
    eventBus.on<EventWarning>('element:warning', ({ id, result }) => {
      this.overflowWarnings.set(id, result);
      this.syncOverflowStatus();
    }, { signal });

    eventBus.on<EventWarningClear>('element:warning:clear', ({ id }) => {
      this.overflowWarnings.delete(id);
      this.syncOverflowStatus();
    }, { signal });

    const root = this.shadowRoot!;
    root.addEventListener(INSPECTOR_CHANGE, (e) => this.onInspectorChange(e as CustomEvent<InspectorChangeDetail>), { signal });
    root.addEventListener(INSPECTOR_ACTION, (e) => this.onInspectorAction(e as CustomEvent<InspectorActionDetail>), { signal });
  }

  private handleStateChange(state: AppState): void {
    const label = state.currentLabel;
    if (!label) return;

    const elements = label.elements;
    const selectedId = state.selectedElementIds[0] || null;

    const elementsStructureJson = JSON.stringify(elements.map(e => ({ id: e.id, v: e.visible })));
    const hasStructureChanged = elementsStructureJson !== this.currentElementsJson || selectedId !== this.currentSelectedId;

    if (hasStructureChanged) {
      this.currentElementsJson = elementsStructureJson;
      this.currentSelectedId = selectedId;
      this.rebuildPanel(label, state);
    } else {
      this.syncValues(label, state);
    }
    this.updateDigitalTwin(label);
  }

  private renderSkeleton(): void {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; flex-direction: column; height: 100%; gap: 16px; padding: 20px; box-sizing: border-box; color: var(--color-text-main); font-family: var(--font-sans); overflow-y: scroll; }
        #panel-content { display: flex; flex-direction: column; gap: 12px; flex: 1; padding: 0 8px 120px 8px; }
      </style>
      <div class="inspector-header">
        <div class="inspector-title-group">
          <span id="panel-title" class="inspector-title">LAYERS</span>
          <span id="unit-count" class="inspector-badge">0 UNITS</span>
        </div>
        <ui-tooltip placement="bottom" offset="8">
          <button slot="target" class="help-btn" aria-label="Manual Técnico"><ui-icon name="help" size="md"></ui-icon></button>
          <div slot="content" class="tooltip-content p-2 text-[10px] leading-relaxed">
             <strong class="text-accent-primary uppercase">Manual Técnico</strong><br/>
             Arraste os números para ajustar (Shift: ±10 | Alt: ±0.1)<br/>
             Suporta fórmulas: <code class="text-white">100/2 + 5</code>
          </div>
        </ui-tooltip>
      </div>
      <div id="panel-content"></div>
    `;
  }

  private rebuildPanel(label: Label, state: AppState): void {
    const container = this.shadowRoot?.getElementById('panel-content');
    const title = this.shadowRoot?.getElementById('panel-title');
    const countLabel = this.shadowRoot?.getElementById('unit-count');
    if (!container) return;

    container.innerHTML = '';
    const selectedId = this.currentSelectedId;

    if (!selectedId) {
      if (title) title.textContent = 'LABEL SETUP';
      if (countLabel) countLabel.textContent = 'BLUEPRINT';
      
      const docSetup = document.createElement('inspector-document-setup') as InspectorDocumentSetup;
      docSetup.labelConfig = label.config;
      docSetup.preferences = state.preferences;
      docSetup.thumbnailUrl = this.currentThumbnail;
      container.appendChild(docSetup);
    } else {
      if (title) title.textContent = 'PROPERTIES';
      if (countLabel) countLabel.textContent = `${label.elements.length} UNITS`;
      
      [...label.elements].sort((a, b) => b.zIndex - a.zIndex).forEach(el => {
        const card = document.createElement('inspector-layer-card') as InspectorLayerCard;
        card.element = el;
        card.selected = el.id === selectedId;
        card.hasOverflow = this.overflowWarnings.has(el.id);
        container.appendChild(card);
      });
    }
  }

  private syncValues(label: Label, state: AppState): void {
    const root = this.shadowRoot!;
    const selectedId = this.currentSelectedId;

    if (!selectedId) {
      const docSetup = root.querySelector('inspector-document-setup') as InspectorDocumentSetup;
      if (docSetup) {
        docSetup.labelConfig = label.config;
        docSetup.preferences = state.preferences;
      }
    } else {
      root.querySelectorAll<InspectorLayerCard>('inspector-layer-card').forEach(card => {
        const el = label.elements.find(e => e.id === card.element?.id);
        if (el) {
          card.element = el;
          card.hasOverflow = this.overflowWarnings.has(el.id);
        }
      });
    }
  }

  private onInspectorChange(e: CustomEvent<InspectorChangeDetail>): void {
    const { prop, value } = e.detail;
    
    if (prop.startsWith('doc.')) {
      const label = store.getState().currentLabel;
      if (label) {
        eventBus.emit('label:config:update', { ...label.config, [prop.replace('doc.', '')]: value });
      }
    } else if (prop.startsWith('pref.')) {
      eventBus.emit('preferences:update', { [prop.replace('pref.', '')]: value });
    } else {
      const target = e.target as HTMLElement;
      const card = target.closest('inspector-layer-card') as InspectorLayerCard;
      const id = card?.element?.id || this.currentSelectedId;
      if (id) {
        this.emitElementUpdate(id, prop, value);
      }
    }
  }

  private onInspectorAction(e: CustomEvent<InspectorActionDetail>): void {
    const { action, id } = e.detail;

    if (action === 'open-vault') {
      const modal = document.getElementById('vault-modal') as HTMLElement;
      if (modal) modal.setAttribute('open', '');
      UISM.play(UISM.enumPresets.OPEN);
      return;
    }

    if (!id) return;

    switch (action) {
      case 'select':
        if (id !== this.currentSelectedId) {
          eventBus.emit('element:select', id);
          UISM.play(UISM.enumPresets.TAP);
        }
        break;
      case 'toggle-vis':
        const elVis = store.getState().currentLabel?.elements.find(item => item.id === id);
        if (elVis) {
          eventBus.emit('element:update', { id, updates: { visible: elVis.visible === false } });
        }
        UISM.play(UISM.enumPresets.TOGGLE);
        break;
      case 'toggle-lock':
        const elLock = store.getState().currentLabel?.elements.find(item => item.id === id);
        if (elLock) {
          eventBus.emit('element:update', { id, updates: { locked: !elLock.locked } });
        }
        UISM.play(UISM.enumPresets.TOGGLE);
        break;
      case 'up':
        eventBus.emit('element:reorder', { id, direction: 'up' });
        break;
      case 'del':
        eventBus.emit('element:delete', id);
        break;
    }
  }

  private emitElementUpdate(id: string, prop: string, value: unknown): void {
    const updates: Partial<AnyElement> = {};
    if (prop.includes('.')) {
      const [parent, child] = prop.split('.');
      (updates as any)[parent] = { ...((updates as any)[parent] || {}), [child]: value };
    } else {
      (updates as any)[prop] = value;
    }
    eventBus.emit('element:update', { id, updates });
  }

  private updateDigitalTwin = debounce(async (label: Label | null) => {
    if (!label) return;
    const { templateManager } = await import('../../domain/services/TemplateManager');
    this.currentThumbnail = await templateManager.captureThumbnail(label);
    
    const docSetup = this.shadowRoot?.querySelector('inspector-document-setup') as InspectorDocumentSetup;
    if (docSetup) docSetup.thumbnailUrl = this.currentThumbnail;
  }, 1000);

  private syncOverflowStatus(): void {
    const cards = this.shadowRoot?.querySelectorAll<InspectorLayerCard>('inspector-layer-card');
    cards?.forEach(card => {
      if (card.element) {
        card.hasOverflow = this.overflowWarnings.has(card.element.id);
      }
    });
  }
}

customElements.define('element-inspector', ElementInspector);
