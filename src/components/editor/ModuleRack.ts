import { sharedSheet } from '../../utils/shared-styles';
import { SoundPreset, UISM } from '../../core/UISoundManager';
import eventBus from '../../core/EventBus';
import { store, AppState } from '../../core/Store';
import { UIKeyboardShortcuts } from '../common/KeyboardShortcuts';
import { HelpContentProvider } from '../../utils/HelpContentProvider';

import '../common/icon';
import '../common/tooltip';

const destraqueCartucho: SoundPreset = {
  freq: 700,
  duration: 0.05,
  type: 'triangle',
  volume: 0.06,
  envelope: {
    attack: 0.005,
    decay: 0.045,
    sustain: 0,
    release: 0.005
  }
};
const encaixeThud: SoundPreset = {
  freq: [150, 200],
  duration: 0.08,
  type: 'square',
  volume: 0.075,
  envelope: {
    attack: 0.003,
    decay: 0.075,
    sustain: 0,
    release: 0.002
  },
  noise: {
    amount: 0.08,
    type: 'white',
    duration: 0.08
  },
  filter: {
    type: 'lowpass',
    frequency: 600,
    Q: 3
  }
};
const cancelamentoClick: SoundPreset = {
  freq: 100,
  duration: 0.04,
  type: 'sine',
  volume: 0.05,
  envelope: {
    attack: 0.005,
    decay: 0.035,
    sustain: 0,
    release: 0.002
  },
  noise: {
    amount: 0.12,
    type: 'brown',
    duration: 0.04
  },
  filter: {
    type: 'lowpass',
    frequency: 500,
    Q: 2
  }
};

/**
 * ModuleRack: O seletor de módulos "Cartridge Rack" do Cockpit.
 * Permite alternar entre Blueprint, Camadas e Production.
 */
export class ModuleRack extends HTMLElement {
  private _isOpen = false;
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
    this.updateActiveUI(store.getState().activeModuleId);
  }

  disconnectedCallback() {
    this._abortController?.abort();
  }
  
  private getShortcutHTML(keyOrId: string): string {
    const rendered = UIKeyboardShortcuts.renderShortcut(keyOrId);
    return rendered ? rendered.html : `<kbd class="kbd-prism">${keyOrId}</kbd>`;
  }

  private setupListeners() {
    this._abortController = new AbortController();
    const { signal } = this._abortController;
    const root = this.shadowRoot!;
    
    // Delegar click interno no Shadow Root
    root.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      
      // Clique no Trigger para abrir/fechar
      if (target.closest('#rack-trigger')) {
        this.toggle();
        return;
      }

      // Clique em um item do rack para trocar de módulo
      const item = target.closest('.rack-item');
      if (item) {
        // Ignorar se o clique foi no botão de ajuda (Task 72)
        if (target.closest('button[slot="target"]')) return;

        const id = item.getAttribute('data-id');
        if (id) {
          eventBus.emit('module:switch', { moduleId: id });
          this.close();
          UISM.playCustom(destraqueCartucho);
        }
      }
    }, { signal });

    // Fechar ao clicar fora (Document Level)
    // Usamos um listener global mas verificamos se o clique veio de fora do host
    const handleOutside = (e: MouseEvent) => {
      const path = e.composedPath();
      if (!path.includes(this) && this._isOpen) {
        this.close();
      }
    };
    document.addEventListener('click', handleOutside, { signal });

    // Sincronizar com mudanças de estado externas
    eventBus.on('state:change', (state: AppState) => {
      this.updateActiveUI(state.activeModuleId);
    }, { signal });
  }

  private toggle() {
    this._isOpen = !this._isOpen;
    this.updateVisualState();
  }

  private close() {
    if (this._isOpen) {
      this._isOpen = false;
      this.updateVisualState();
    }
  }

  private updateVisualState() {
    const rack = this.shadowRoot?.getElementById('rack-menu');
    const trigger = this.shadowRoot?.getElementById('rack-trigger');
    const triggerIcon = this.shadowRoot?.getElementById('trigger-icon');
    if (rack && trigger) {
      rack.classList.toggle('open', this._isOpen);
      trigger.classList.toggle('active', this._isOpen);
      
      // Notifica o Cockpit para aplicar o efeito de profundidade no conteúdo
      this.dispatchEvent(new CustomEvent('rack-toggle', {
        detail: { open: this._isOpen },
        bubbles: true,
        composed: true
      }));
      
      if (this._isOpen) {
        if (triggerIcon) {
          triggerIcon.style.transform = 'rotate(180deg)';
        }
        UISM.playCustom(encaixeThud);
      } else {
        if (triggerIcon) {
          triggerIcon.style.transform = 'rotate(0deg)';
        }
        UISM.playCustom(cancelamentoClick);
      }
    }
  }

  private updateActiveUI(activeId: string) {
    const root = this.shadowRoot;
    if (!root) return;

    root.querySelectorAll('.rack-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-id') === activeId);
    });

    const label = root.getElementById('active-module-name');
    const icon = root.querySelector('#active-icon ui-icon');
    
    // Mapeamento de nomes amigáveis e ícones para o display
    const moduleMap: Record<string, { label: string, icon: string }> = {
      'blueprint': { label: 'Blueprint Setup', icon: 'settings' },
      'layers': { label: 'Layer Properties', icon: 'layers' },
      'assets': { label: 'Asset Library', icon: 'image' },
      'history': { label: 'Time Machine', icon: 'clock' },
      'variables': { label: 'Variable Manager', icon: 'cpu' },
      'typeface': { label: 'Typeface Engine', icon: 'text' }
    };

    const info = moduleMap[activeId] || moduleMap['blueprint'];
    if (label) label.textContent = info.label;
    if (icon) icon.setAttribute('name', info.icon);
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; position: relative; z-index: 1000; }
        
        .rack-container {
          background: #050608;
          border-bottom: 1px solid var(--color-border-ui);
          padding: 12px 16px;
        }

        .rack-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--color-border-ui);
          border-radius: 8px;
          padding: 8px 12px;
          cursor: pointer;
          transition: all 0.2s var(--ease-spring);
          user-select: none;
        }
        .rack-trigger:hover { background: rgba(99, 102, 241, 0.05); border-color: var(--color-accent-primary); }
        .rack-trigger.active { border-color: var(--color-accent-primary); box-shadow: 0 0 15px rgba(99, 102, 241, 0.2); }

        .module-info { display: flex; align-items: center; gap: 10px; pointer-events: none; }
        .module-label { font-family: var(--font-mono); font-size: 9px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.12em; }
        .module-name { font-size: 11px; font-weight: 700; color: var(--color-text-main); }
        
        .icon-box {
          width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
          background: var(--color-surface-elevated); border-radius: 6px; border: 1px solid var(--color-border-ui);
          color: var(--color-accent-primary);
        }
        
        #trigger-icon { transition: all 0.5s var(--ease-spring); }

        .rack-menu {
          position: absolute; top: 100%; left: 0; width: 100%;
          background: rgba(10, 12, 16, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--color-border-ui);
          max-height: 0; overflow: hidden;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 30px 60px rgba(0,0,0,0.9);
          opacity: 0;
          z-index: 50;
        }
        .rack-menu.open { max-height: 500px; opacity: 1; padding: 12px 0; }

        .rack-item {
          display: flex; gap: 14px; padding: 12px 24px; cursor: pointer;
          transition: all 0.2s; border-left: 3px solid transparent;
        }
        .rack-item:hover { background: rgba(255,255,255,0.03); border-left-color: var(--color-accent-primary); }
        .rack-item.active { background: rgba(99, 102, 241, 0.05); border-left-color: var(--color-accent-primary); }

        .item-text { display: flex; flex-direction: column; gap: 2px; flex: 1; }
        .item-title { font-size: 11px; font-weight: 700; color: var(--color-text-main); pointer-events: none; }
        .item-desc { font-size: 10px; color: var(--color-text-muted); opacity: 0.8; pointer-events: none; }
      </style>

      <div class="rack-container">
        <div class="module-label mb-1">Active Module</div>
        <div class="rack-trigger" id="rack-trigger">
          <div class="module-info">
            <div class="icon-box" id="active-icon">
              <ui-icon name="settings" style="--icon-size: 14px"></ui-icon>
            </div>
            <span class="module-name" id="active-module-name">Blueprint Setup</span>
          </div>
          <ui-icon id="trigger-icon" name="chevron-down" style="opacity: 0.5; pointer-events: none;"></ui-icon>
        </div>
      </div>

      <div class="rack-menu" id="rack-menu">
        <div class="rack-item" data-id="blueprint">
          <ui-icon name="settings" class="mt-0.5 text-accent-primary" style="pointer-events: none;"></ui-icon>
          <div class="item-text">
            <div class="flex items-center justify-between">
               <div class="flex items-center gap-2">
                 <span class="item-title">Blueprint Setup</span>
                 ${HelpContentProvider.buildTooltip('setup' as any, 'bottom')}
               </div>
               ${this.getShortcutHTML('ALT+1')}
            </div>
            <span class="item-desc">Canvas dimensions, DPI and background.</span>
          </div>
        </div>

        <div class="rack-item" data-id="layers">
          <ui-icon name="layers" class="mt-0.5 text-accent-primary" style="pointer-events: none;"></ui-icon>
          <div class="item-text">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="item-title">Layer Properties</span>
                ${HelpContentProvider.buildTooltip('mod_layers' as any, 'bottom')}
              </div>
              ${this.getShortcutHTML('ALT+2')}
            </div>
            <span class="item-desc">Detailed editing for selected elements.</span>
          </div>
        </div>

        <div class="rack-item" data-id="assets">
          <ui-icon name="image" class="mt-0.5 text-accent-primary" style="pointer-events: none;"></ui-icon>
          <div class="item-text">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="item-title">Asset Library</span>
                ${HelpContentProvider.buildTooltip('mod_assets' as any, 'bottom')}
              </div>
              ${this.getShortcutHTML('ALT+3')}
            </div>
            <span class="item-desc">Project images, logos and reusable parts.</span>
          </div>
        </div>

        <div class="rack-item" data-id="history">
          <ui-icon name="clock" class="mt-0.5 text-accent-primary" style="pointer-events: none;"></ui-icon>
          <div class="item-text">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="item-title">Time Machine</span>
                ${HelpContentProvider.buildTooltip('mod_history' as any, 'bottom')}
              </div>
              ${this.getShortcutHTML('ALT+4')}
            </div>
            <span class="item-desc">Visual timeline and state restoration.</span>
          </div>
        </div>

        <div class="rack-item" data-id="variables">
          <ui-icon name="cpu" class="mt-0.5 text-accent-primary" style="pointer-events: none;"></ui-icon>
          <div class="item-text">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="item-title">Variable Manager</span>
                ${HelpContentProvider.buildTooltip('mod_variables' as any, 'bottom')}
              </div>
              ${this.getShortcutHTML('ALT+5')}
            </div>
            <span class="item-desc">Visual data pipeline and formatters.</span>
          </div>
        </div>

        <div class="rack-item" data-id="typeface">
          <ui-icon name="text" class="mt-0.5 text-accent-primary" style="pointer-events: none;"></ui-icon>
          <div class="item-text">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="item-title">Typeface Engine</span>
                ${HelpContentProvider.buildTooltip('mod_typeface' as any, 'bottom')}
              </div>
              ${this.getShortcutHTML('ALT+6')}
            </div>
            <span class="item-desc">Custom fonts and Google Fonts terminal.</span>
          </div>
        </div>

        <div class="rack-item" data-id="batch">
          <ui-icon name="lightning" class="mt-0.5 text-accent-success" style="pointer-events: none;"></ui-icon>
          <div class="item-text">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="item-title">Production Studio</span>
                ${HelpContentProvider.buildTooltip('mod_production' as any, 'bottom')}
              </div>
              ${this.getShortcutHTML('ALT+P')}
            </div>
            <span class="item-desc">Batch processing and A4 layout export.</span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('module-rack', ModuleRack);
