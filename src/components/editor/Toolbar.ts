import eventBus from '../../core/EventBus';
import { ElementType } from '../../domain/models/elements/BaseElement';
import { store, AppState } from '../../core/Store';
import { UISM } from '../../core/UISoundManager';
import { UnitConverter } from '../../utils/units';
import { ElementFactory } from '../../domain/models/elements/ElementFactory';
import { templateManager } from '../../domain/services/TemplateManager';
import '../common/AppButton';
import '../common/icon';
import '../common/tooltip';
import { sharedSheet } from '../../utils/shared-styles';

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
  }

  disconnectedCallback(): void {
    if (this.unsubscribe) this.unsubscribe();
  }

  private setupListeners(): void {
    this.unsubscribe = eventBus.on('state:change', (state: AppState) => {
      const undoBtn = this.shadowRoot?.getElementById('undo');
      const redoBtn = this.shadowRoot?.getElementById('redo');
      if (undoBtn) undoBtn.toggleAttribute('disabled', !state.canUndo);
      if (redoBtn) redoBtn.toggleAttribute('disabled', !state.canRedo);
    });

    eventBus.on('command:toolbar:upload-image', () => {
      this.shadowRoot?.getElementById('file-input')?.click();
    });
  }

  private render(): void {
    if (!this.shadowRoot) return;

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
            <kbd class="kbd-prism">T</kbd>
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Adiciona uma nova camada de texto dinâmico ou estático.
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
            <kbd class="kbd-prism">R</kbd>
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Desenha um retângulo no canvas. Segure <kbd class="kbd-prism text-[8px] px-1 py-0 shadow-none">Shift</kbd> para quadrado.
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
            <kbd class="kbd-prism">I</kbd>
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Importa um arquivo local de imagem ou logotipo para a etiqueta.
          </p>
        </div>
      </ui-tooltip>

      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="add-border" variant="secondary">
          <ui-icon name="rect" style="transform: scale(1.2); opacity:
          0.7;"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold
          tracking-wide">Moldura</span>
            <kbd class="kbd-prism">B</kbd>
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Adiciona uma borda decorativa ao redor de toda a etiqueta.
          </p>
        </div>
      </ui-tooltip
      
      <div class="divider"></div>
      
      <!-- GRUPO DE HISTÓRICO -->
      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="undo" variant="secondary" disabled>
          <ui-icon name="undo"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Desfazer</span>
            <div class="flex gap-1">
              <kbd class="kbd-prism">Ctrl</kbd><span class="text-text-muted">+</span><kbd class="kbd-prism">Z</kbd>
            </div>
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
            <div class="flex gap-1">
              <kbd class="kbd-prism">Ctrl</kbd><span class="text-text-muted">+</span><kbd class="kbd-prism">Shift</kbd><span class="text-text-muted">+</span><kbd class="kbd-prism">Z</kbd>
            </div>
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
            <kbd class="kbd-prism">Ctrl</kbd><span class="text-text-muted">+</span><kbd class="kbd-prism">/</kbd>
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Acesse o centro de ajuda, tutoriais rápidos e mapa de atalhos.
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
            <div class="flex gap-1">
              <kbd class="kbd-prism">Ctrl</kbd><span class="text-text-muted">+</span><kbd class="kbd-prism">S</kbd>
            </div>
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Persiste o design atual no banco de dados local do navegador.
          </p>
        </div>
      </ui-tooltip>

      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="open-project-modal" variant="secondary" style="margin-left: 4px;">
          <ui-icon name="folder"></ui-icon>
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Projeto</span>
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Importar ou exportar arquivos de design (.label) para backup ou compartilhamento.
          </p>
        </div>
      </ui-tooltip>
      
      <ui-tooltip placement="bottom" delay="300">
        <app-button slot="target" id="open-batch" variant="success" style="margin-left: 4px;">
          GENERATE PDF
        </app-button>
        <div slot="content" class="tooltip-rich-panel">
          <div class="flex items-center justify-between mb-1.5">
            <span class="text-text-main text-[12px] font-semibold tracking-wide">Gerar Lote</span>
            <div class="flex gap-1">
              <kbd class="kbd-prism">P</kbd>
            </div>
          </div>
          <p class="text-text-muted text-[10px] leading-relaxed">
            Renderiza múltiplas etiquetas em alta qualidade para impressão.
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

    shadow
      .getElementById('undo')
      ?.addEventListener('click', () => eventBus.emit('history:undo'));
    shadow
      .getElementById('redo')
      ?.addEventListener('click', () => eventBus.emit('history:redo'));

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
