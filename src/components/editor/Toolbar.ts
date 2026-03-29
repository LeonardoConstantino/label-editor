import eventBus from '../../core/EventBus';
import { ElementType } from '../../domain/models/elements/BaseElement';
import { store, AppState } from '../../core/Store';
import { UISM } from '../../core/UISoundManager';
import '../common/AppButton';
import '../common/icon';

/**
 * EditorToolbar: A "Pílula de Controle" flutuante do Cockpit.
 */
export class EditorToolbar extends HTMLElement {
  private unsubscribe: (() => void) | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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
  }

  private render(): void {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        @import "/src/styles/main.css";
        :host {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .divider {
          width: 1px;
          height: 24px;
          background-color: var(--color-border-ui);
          margin: 0 8px;
          opacity: 0.5;
        }
        app-button {
          --btn-padding: 8px 12px;
        }
        #open-batch {
          margin-left: 4px;
        }
      </style>
      
      <!-- Grupo de Criação -->
      <app-button id="add-text" variant="secondary" title="Add Text">
        <ui-icon name="text"></ui-icon>
      </app-button>
      <app-button id="add-rect" variant="secondary" title="Add Rectangle">
        <ui-icon name="rect"></ui-icon>
      </app-button>
      <app-button id="add-image" variant="secondary" title="Add Image">
        <ui-icon name="image"></ui-icon>
      </app-button>
      
      <div class="divider"></div>
      
      <!-- Grupo de Histórico -->
      <app-button id="undo" variant="secondary" disabled title="Undo">
        <ui-icon name="undo"></ui-icon>
      </app-button>
      <app-button id="redo" variant="secondary" disabled title="Redo">
        <ui-icon name="redo"></ui-icon>
      </app-button>
      
      <div class="divider"></div>
      
      <!-- Ações Primárias -->
      <app-button id="save" variant="secondary" title="Save Template">
        <ui-icon name="save"></ui-icon>
      </app-button>
      
      <app-button id="open-batch" variant="success">
        GENERATE PDF
      </app-button>
      
      <input type="file" id="file-input" style="display: none;" accept="image/*">
    `;

    this.attachEvents();
  }

  private attachEvents(): void {
    const shadow = this.shadowRoot!;
    const fileInput = shadow.getElementById('file-input') as HTMLInputElement;

    shadow.getElementById('add-text')?.addEventListener('click', () => {
      eventBus.emit('element:add', {
        id: 'txt-' + Date.now(),
        type: ElementType.TEXT,
        position: { x: 10, y: 10 },
        zIndex: 10,
        dimensions: { width: 40, height: 10 },
        content: 'Label Unit 01',
        fontFamily: 'sans-serif',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#000000',
        textAlign: 'center',
      });
    });

    shadow.getElementById('add-rect')?.addEventListener('click', () => {
      eventBus.emit('element:add', {
        id: 'rect-' + Date.now(),
        type: ElementType.RECTANGLE,
        position: { x: 10, y: 10 },
        zIndex: 5,
        dimensions: { width: 30, height: 20 },
        fillColor: '#e2e8f0',
        strokeColor: '#6366f1',
        strokeWidth: 0.5,
      });
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
      const scale = config.dpi / 25.4;

      eventBus.emit('element:add', {
        id: 'img-' + Date.now(),
        type: ElementType.IMAGE,
        position: { x: 5, y: 5 },
        zIndex: 8,
        dimensions: {
          width: processed.width / scale,
          height: processed.height / scale,
        },
        src: processed.src,
        fit: 'contain',
      });
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
      const { ToastManager } = await import('../common/toast');
      ToastManager.show({
        type: 'success',
        message: 'Template salvo com sucesso!',
      });
    });

    shadow.getElementById('open-batch')?.addEventListener('click', () => {
      const modal = document.getElementById('batch-modal') as any;
      if (modal) modal.setAttribute('open', '');
      UISM.play(UISM.enumPresets.OPEN);
    });
  }
}

customElements.define('editor-toolbar', EditorToolbar);
