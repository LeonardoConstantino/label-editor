import { sharedSheet } from '../../utils/shared-styles';
import eventBus from '../../core/EventBus';
import { store, AppState } from '../../core/Store';
import { debounce } from '../../utils/utils';
import { Label } from '../../domain/models/Label';
import { INSPECTOR_CHANGE, INSPECTOR_ACTION } from './inspector/inspector-events';
import { InspectorChangeDetail, InspectorActionDetail } from './inspector/inspector.types';
import { UISM } from '../../core/UISoundManager';

// Import dos componentes de módulos
import './ModuleRack';
import './ElementInspector';
import './inspector/InspectorDocumentSetup';

/**
 * AppCockpit: O orquestrador central do painel lateral (Aside).
 * Gerencia a troca de módulos no "Active Slot" com efeitos de profundidade.
 */
export class AppCockpit extends HTMLElement {
  private _activeModuleId: string = 'blueprint';
  private _currentThumbnail: string = '';
  private _abortController: AbortController | null = null;

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
    this.syncModule(store.getState().activeModuleId);
    this.updateDigitalTwin(store.getState().currentLabel);
  }

  disconnectedCallback() {
    this._abortController?.abort();
  }

  private setupListeners() {
    this._abortController = new AbortController();
    const { signal } = this._abortController;
    const root = this.shadowRoot!;

    // Juice: Depth Effect ao abrir o rack
    root.addEventListener('rack-toggle', (e: any) => {
      const workspace = root.getElementById('module-workspace');
      if (workspace) {
        workspace.classList.toggle('workspace-pushed-back', e.detail.open);
      }
    }, { signal });

    // Orquestração de troca de módulos e atualização de thumbnail
    eventBus.on('state:change', (state: AppState) => {
      if (state.activeModuleId !== this._activeModuleId) {
        this.syncModule(state.activeModuleId);
      }
      this.updateDigitalTwin(state.currentLabel);
    }, { signal });

    // Sugestão inteligente: trocar para 'layers' se um elemento for selecionado no canvas
    eventBus.on('element:select', (ids) => {
      const hasSelection = Array.isArray(ids) ? ids.length > 0 : !!ids;
      if (hasSelection && store.getState().activeModuleId !== 'layers') {
        eventBus.emit('module:switch', { moduleId: 'layers' });
      }
    }, { signal });

    // Captura eventos borbulhados dos módulos (Nível 2)
    root.addEventListener(INSPECTOR_CHANGE, (e: any) => this.onInspectorChange(e), { signal });
    root.addEventListener(INSPECTOR_ACTION, (e: any) => this.onInspectorAction(e), { signal });
  }

  private onInspectorChange(e: CustomEvent<InspectorChangeDetail>): void {
    const { prop, value } = e.detail;
    
    // AppCockpit orquestra mudanças globais (Doc e Prefs)
    if (prop.startsWith('doc.')) {
      const label = store.getState().currentLabel;
      if (label) {
        eventBus.emit('label:config:update', { ...label.config, [prop.replace('doc.', '')]: value });
      }
    } else if (prop.startsWith('pref.')) {
      eventBus.emit('preferences:update', { [prop.replace('pref.', '')]: value });
    }
  }

  private onInspectorAction(e: CustomEvent<InspectorActionDetail>): void {
    const { action } = e.detail;

    if (action === 'open-vault') {
      const modal = document.getElementById('vault-modal') as HTMLElement;
      if (modal) modal.setAttribute('open', '');
      UISM.play(UISM.enumPresets.OPEN);
    }
  }

  /**
   * Captura o thumbnail do canvas para o Digital Twin no Blueprint Setup.
   */
  private updateDigitalTwin = debounce(async (label: Label | null) => {
    if (!label) return;
    const { templateManager } = await import('../../domain/services/TemplateManager');
    this._currentThumbnail = await templateManager.captureThumbnail(label);
    
    // Se o módulo atual for blueprint, atualiza o componente injetado no slot
    const slot = this.shadowRoot?.getElementById('active-slot');
    const docSetup = slot?.querySelector('inspector-document-setup') as any;
    if (docSetup) {
      docSetup.thumbnailUrl = this._currentThumbnail;
    }
  }, 1000);

  private syncModule(moduleId: string) {
    this._activeModuleId = moduleId;
    const slot = this.shadowRoot?.getElementById('active-slot');
    if (!slot) return;

    // Caso especial: Production Studio abre o modal
    if (moduleId === 'batch') {
      const modal = document.getElementById('batch-modal') as any;
      if (modal) modal.setAttribute('open', '');
      // Volta para o módulo anterior no cockpit para não ficar com o slot vazio ou errado
      setTimeout(() => eventBus.emit('module:switch', { moduleId: 'blueprint' }), 100);
      return;
    }

    slot.innerHTML = '';
    let component: HTMLElement;

    if (moduleId === 'layers') {
      component = document.createElement('element-inspector');
    } else {
      // Default: blueprint
      component = document.createElement('inspector-document-setup');
      const state = store.getState();
      if (state.currentLabel) {
        // Precisamos setar as propriedades ANTES de injetar para que o render inicial funcione
        (component as any).labelConfig = state.currentLabel.config;
        (component as any).preferences = state.preferences;
        (component as any).thumbnailUrl = this._currentThumbnail;
      }
    }

    slot.appendChild(component);
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }

        #module-workspace {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: center top;
        }

        #module-workspace.workspace-pushed-back {
          transform: scale(0.96) translateY(10px);
          filter: blur(4px) brightness(0.5);
          pointer-events: none;
        }

        #active-slot {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
      </style>

      <module-rack></module-rack>
      
      <div id="module-workspace">
        <div id="active-slot"></div>
      </div>
    `;
  }
}

customElements.define('app-cockpit', AppCockpit);
