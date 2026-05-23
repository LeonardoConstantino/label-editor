import eventBus from '../../core/EventBus';
import { ElementType } from '../../domain/models/elements/BaseElement';
import { store, AppState } from '../../core/Store';
import { UISM } from '../../core/UISoundManager';
import { UnitConverter } from '../../utils/units';
import { ElementFactory } from '../../domain/models/elements/ElementFactory';
import { templateManager } from '../../domain/services/TemplateManager';
import { UIKeyboardShortcuts } from '../common/KeyboardShortcuts';
import { sharedSheet } from '../../utils/shared-styles';
import '../common/AppButton';
import '../common/icon';
import '../common/tooltip';

/**
 * EditorToolbar: A "Pílula de Controle" flutuante do Cockpit.
 */
export class EditorToolbar extends HTMLElement {
  private unsubscribe: (() => void) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  connectedCallback(): void {
    this.render();
    this.setupListeners();
    this.updateUI(); // Estado inicial
  }

  disconnectedCallback(): void {
    if (this.unsubscribe) this.unsubscribe();
  }

  private setupListeners(): void {
    this.unsubscribe = eventBus.on('state:change', (state: AppState) => {
      this.updateUI(state);
    });

    eventBus.on('command:toolbar:upload-image', () => {
      this.shadowRoot?.getElementById('file-input')?.click();
    });
  }

  /**
   * Atualização Incremental (Task 61)
   */
  private updateUI(state: AppState = store.getState()): void {
    const shadow = this.shadowRoot;
    if (!shadow) return;

    const undoBtn = shadow.getElementById('undo') as any;
    const redoBtn = shadow.getElementById('redo') as any;

    if (undoBtn) undoBtn.toggleAttribute('disabled', !state.canUndo);
    if (redoBtn) redoBtn.toggleAttribute('disabled', !state.canRedo);
  }

  private getShortcutHTML(keyOrId: string): string {
    const rendered = UIKeyboardShortcuts.renderShortcut(keyOrId);
    return rendered ? rendered.html : `<kbd class="kbd-prism">${keyOrId}</kbd>`;
  }

  private render(): void {
    if (!this.shadowRoot || this.shadowRoot.querySelector('#add-text')) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .divider {
          width: 1px;
          height: 20px;
          background-color: var(--color-border-ui);
          margin: 0 6px;
          opacity: 0.6;
        }
        app-button {
          --btn-padding: 8px 12px;
        }
        .tooltip-rich-panel {
          width: 200px;
          padding: 4px;
        }
        @keyframes pulse-indigo {
          0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
          100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }
        .pulse-help {
          animation: pulse-indigo 2s infinite;
          border-color: var(--color-accent-primary) !important;
        }
      </style>
      
      <!-- GRUPO DE CRIAÇÃO -->
      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="add-text" variant="secondary">
          <ui-icon name="text"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Texto</span>
            ${this.getShortcutHTML('t')}
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Adiciona uma nova camada de texto. <span class="text-accent-primary opacity-80 font-bold">(Long-press)</span>
          </p>
        </div>
      </ui-tooltip>

      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="add-rect" variant="secondary">
          <ui-icon name="rect"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Retângulo</span>
            ${this.getShortcutHTML('r')}
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Desenha um retângulo. Segure ${this.getShortcutHTML('shift+r')} para quadrado. <span class="text-accent-primary opacity-80 font-bold">(Long-press)</span>
          </p>
        </div>
      </ui-tooltip>

      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="add-image" variant="secondary">
          <ui-icon name="image"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Imagem</span>
            ${this.getShortcutHTML('i')}
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Importa um logotipo local. <span class="text-accent-primary opacity-80 font-bold">(Long-press)</span>
          </p>
        </div>
      </ui-tooltip>

      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="add-border" variant="secondary">
          <ui-icon name="rect" style="transform: scale(1.2); opacity: 0.7;"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Moldura</span>
            ${this.getShortcutHTML('b')}
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Adiciona uma borda na etiqueta. <span class="text-accent-primary opacity-80 font-bold">(Long-press)</span>
          </p>
        </div>
      </ui-tooltip>

      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="add-code" variant="secondary">
          <ui-icon name="qr-code"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Código</span>
            ${this.getShortcutHTML('c')}
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Gera QR Codes ou Códigos de Barras dinâmicos.
          </p>
        </div>
      </ui-tooltip>
      
      <div class="divider"></div>
      
      <!-- GRUPO DE HISTÓRICO -->
      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="undo" variant="secondary" disabled>
          <ui-icon name="undo"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Desfazer</span>
            ${this.getShortcutHTML('ctrl+z')}
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Reverte a última modificação realizada no design.
          </p>
        </div>
      </ui-tooltip>

      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="redo" variant="secondary" disabled>
          <ui-icon name="redo"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Refazer</span>
            ${this.getShortcutHTML('ctrl+shift+z')}
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Restaura a ação que foi desfeita anteriormente.
          </p>
        </div>
      </ui-tooltip>
      
      <div class="divider"></div>
      
      <!-- AÇÕES PRIMÁRIAS -->
      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="open-help" variant="secondary" class="${!localStorage.getItem('has_seen_guide') ? 'pulse-help' : ''}">
          <ui-icon name="help"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Guia & Atalhos</span>
            ${this.getShortcutHTML('ctrl+/')}
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Acesse o centro de ajuda, tutoriais rápidos e mapa de atalhos.
          </p>
        </div>
      </ui-tooltip>

      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="open-settings" variant="secondary" style="margin-left: 4px;">
          <ui-icon name="settings"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Configurações</span>
            ${this.getShortcutHTML('ctrl+,')}
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Calibre o motor de grid, snapping e preferências globais do sistema.
          </p>
        </div>
      </ui-tooltip>

      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="save" variant="secondary">
          <ui-icon name="save"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Salvar</span>
            ${this.getShortcutHTML('ctrl+s')}
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Persiste o design localmente. <span class="text-accent-primary opacity-80 font-bold">(Long-press Deep Sync)</span>
          </p>
        </div>
      </ui-tooltip>

      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="open-project-modal" variant="secondary" style="margin-left: 4px;">
          <ui-icon name="folder"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Cofre (Vault)</span>
            ${this.getShortcutHTML('alt+v')}
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Importar ou exportar arquivos .label. <span class="text-accent-primary opacity-80 font-bold">(Long-press)</span>
          </p>
        </div>
      </ui-tooltip>
      
      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="open-batch" variant="success" style="margin-left: 4px;">
          GENERATE PDF
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Produção</span>
            ${this.getShortcutHTML('alt+p')}
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Exportação em massa. <span class="text-accent-primary opacity-80 font-bold">(Long-press)</span>
          </p>
        </div>
      </ui-tooltip>
      
      <input type="file" id="file-input" style="display: none;" accept="image/*">
    `;

    this.attachEvents();
  }

  private attachEvents(): void {
    const shadow = this.shadowRoot!;
    const fileInput = shadow.getElementById('file-input') as HTMLInputElement;

    shadow.getElementById('add-text')?.addEventListener('click', () => {
      eventBus.emit('element:add', ElementFactory.create(ElementType.TEXT));
    });

    shadow.getElementById('add-rect')?.addEventListener('click', () => {
      eventBus.emit('element:add', ElementFactory.create(ElementType.RECTANGLE));
    });

    shadow.getElementById('add-border')?.addEventListener('click', () => {
      eventBus.emit('element:add', ElementFactory.create(ElementType.BORDER));
    });

    shadow.getElementById('add-code')?.addEventListener('click', () => {
      eventBus.emit('element:add', ElementFactory.create(ElementType.CODE));
    });

    shadow
      .getElementById('add-image')
      ?.addEventListener('click', () => fileInput.click());

    fileInput?.addEventListener('change', async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const { imageProcessor } = await import('../../utils/imageProcessor');
      const processed = await imageProcessor.process(file);
      const config = store.getState().currentLabel!.config;

      eventBus.emit('element:add', ElementFactory.create(ElementType.IMAGE, {
        dimensions: {
          width: UnitConverter.pxToMm(processed.width, config.dpi),
          height: UnitConverter.pxToMm(processed.height, config.dpi),
        },
        src: processed.src
      }));
    });

    shadow.getElementById('open-help')?.addEventListener('click', () => {
      eventBus.emit('ui:open:help', { tab: 'guide' });
      const btn = shadow.getElementById('open-help');
      if (btn) btn.classList.remove('pulse-help');
    });

    shadow.getElementById('open-settings')?.addEventListener('click', () => {
      const modal = document.getElementById('settings-modal') as any;
      if (modal) modal.setAttribute('open', '');
      UISM.play(UISM.enumPresets.OPEN);
    });

    shadow
      .getElementById('undo')
      ?.addEventListener('click', () => eventBus.emit('history:undo', { source: 'toolbar' }));
    shadow
      .getElementById('redo')
      ?.addEventListener('click', () => eventBus.emit('history:redo', { source: 'toolbar' }));

    shadow.getElementById('save')?.addEventListener('click', async () => {
      const { templateManager } =
        await import('../../domain/services/TemplateManager');
      await templateManager.saveCurrentLabel();
      eventBus.emit('notify', {
        type: 'success',
        message: 'Template salvo com sucesso!',
      });
    });

    shadow.getElementById('open-batch')?.addEventListener('click', () => {
      const modal = document.getElementById('batch-modal') as any;
      if (modal) modal.setAttribute('open', '');
      UISM.play(UISM.enumPresets.OPEN);
    });

    shadow.getElementById('open-project-modal')?.addEventListener('click', () => {
      const modal = document.getElementById('project-modal') as any;
      if (modal) modal.setAttribute('open', '');
      UISM.play(UISM.enumPresets.OPEN);
    });

    // Listeners Globais para o Modal de Projeto (que reside no body)
    document.getElementById('btn-export-file')?.addEventListener('click', async () => {
      await templateManager.exportToFile();
      UISM.play(UISM.enumPresets.SUCCESS);
    });

    document.getElementById('btn-import-trigger')?.addEventListener('click', () => {
      document.getElementById('global-import-input')?.click();
    });

    document.getElementById('global-import-input')?.addEventListener('change', async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      try {
        await templateManager.importFromFile(file);
        const modal = document.getElementById('project-modal') as any;
        if (modal) modal.removeAttribute('open');
        UISM.play(UISM.enumPresets.SUCCESS);
        eventBus.emit('notify', { message: 'Projeto importado com sucesso!', type: 'success' });
      } catch (err) {
        eventBus.emit('notify', { message: 'Erro ao importar: ' + (err as Error).message, type: 'error' });
      }
    });
  }
}

customElements.define('editor-toolbar', EditorToolbar);
