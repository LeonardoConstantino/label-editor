import { sharedSheet } from '../../../utils/shared-styles';
import { bridgeTheme } from '../../../utils/theme-bridge';
import eventBus from '../../../core/EventBus';
import { store, AppState } from '../../../core/Store';
import { UISM } from '../../../core/UISoundManager';
import { aiPromptBuilder } from '../../../domain/services/AIPromptBuilder';
import { DataSourceParser } from '../../../domain/services/DataSourceParser';

// Componentes reutilizáveis do Design System
import '../../common/AppButton';
import '../../common/icon';
import '../../common/tooltip';

export class PromptStudio extends HTMLElement {
  private _abortController: AbortController | null = null;
  private _themeCleanup: (() => void) | null = null;
  private _currentMode: 'create' | 'iterate' = 'create';
  private _turnIndex = 1;
  private _userInstruction = '';
  private _responseText = '';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  connectedCallback() {
    this._themeCleanup = bridgeTheme(this);
    this.renderSkeleton();
    this.setupListeners();
    this.syncValues();
  }

  disconnectedCallback() {
    this._themeCleanup?.();
    this._abortController?.abort();
  }

  private setupListeners() {
    this._abortController = new AbortController();
    const { signal } = this._abortController;
    const root = this.shadowRoot!;

    // 1. Alternância de Modos (Criar do Zero vs Iterar)
    root.querySelectorAll<HTMLButtonElement>('.mode-pill').forEach((btn) => {
      btn.addEventListener(
        'click',
        () => {
          const mode = btn.dataset.mode as 'create' | 'iterate';
          if (mode && mode !== this._currentMode) {
            this._currentMode = mode;
            UISM.play(UISM.enumPresets.TAP);
            this.syncValues();
          }
        },
        { signal }
      );
    });

    // 2. Input de Instrução do Usuário
    const instructionInput = root.getElementById('ai-instruction-input') as HTMLTextAreaElement | null;
    instructionInput?.addEventListener(
      'input',
      (e) => {
        this._userInstruction = (e.target as HTMLTextAreaElement).value;
      },
      { signal }
    );

    // 3. Input de Resposta da LLM
    const responseInput = root.getElementById('ai-response-input') as HTMLTextAreaElement | null;
    responseInput?.addEventListener(
      'input',
      (e) => {
        this._responseText = (e.target as HTMLTextAreaElement).value;
      },
      { signal }
    );

    // 4. Ação: Copiar Prompt para a Área de Transferência
    const copyPromptBtn = root.getElementById('copy-prompt-btn');
    copyPromptBtn?.addEventListener('click', () => this.handleCopyPrompt(), { signal });

    // 5. Ação: Copiar System Prompt Avulso (no modo Iterar)
    const copySystemBtn = root.getElementById('copy-system-prompt-btn');
    copySystemBtn?.addEventListener('click', () => this.handleCopySystemPrompt(), { signal });

    // 6. Ação: Aplicar JSON no Canvas
    const applyBtn = root.getElementById('apply-response-btn');
    applyBtn?.addEventListener('click', () => this.handleApplyResponse(), { signal });

    // 7. Ação: Reiniciar Sessão de Chat
    const resetChatBtn = root.getElementById('reset-chat-btn');
    resetChatBtn?.addEventListener(
      'click',
      () => {
        this._turnIndex = 1;
        this._responseText = '';
        this.syncValues();
        eventBus.emit('notify', {
          type: 'info',
          message: 'Sessão de chat com a IA reiniciada.',
          duration: 3000,
        });
        UISM.play(UISM.enumPresets.DELETE);
      },
      { signal }
    );

    // 8. Botões de Undo / Redo Rápidos
    root.getElementById('ai-undo-btn')?.addEventListener(
      'click',
      () => {
        eventBus.emit('history:undo', { source: 'ai' });
        UISM.play(UISM.enumPresets.TAP);
      },
      { signal }
    );

    root.getElementById('ai-redo-btn')?.addEventListener(
      'click',
      () => {
        eventBus.emit('history:redo', { source: 'ai' });
        UISM.play(UISM.enumPresets.TAP);
      },
      { signal }
    );

    // Escuta atualizações de estado para habilitar/desabilitar Undo e Redo
    eventBus.on(
      'state:change',
      (state: AppState) => {
        this.updateUndoRedoButtons(state.canUndo, state.canRedo);
      },
      { signal }
    );
  }

  private getAvailableVariables(): string[] {
    const currentLabel = store.getState().currentLabel;
    if (!currentLabel) return [];

    const variablesSet = new Set<string>();
    currentLabel.elements.forEach((el) => {
      if ((el as any).content && typeof (el as any).content === 'string') {
        const parsed = DataSourceParser.parseTags((el as any).content);
        parsed.forEach((tag) => variablesSet.add(tag.key));
      }
    });

    const prodData = store.getState().productionData;
    if (Array.isArray(prodData) && prodData.length > 0) {
      Object.keys(prodData[0] || {}).forEach((k) => variablesSet.add(k));
    }

    return Array.from(variablesSet);
  }

  private async handleCopyPrompt() {
    const state = store.getState();
    const currentLabel = state.currentLabel;

    if (!currentLabel) {
      eventBus.emit('notify', {
        type: 'warning',
        message: 'Nenhuma etiqueta ativa encontrada.',
      });
      return;
    }

    const availableVariables = this.getAvailableVariables();
    let promptText = '';

    if (this._currentMode === 'create' || this._turnIndex === 1) {
      promptText = aiPromptBuilder.buildSystemPrompt({
        currentLabel,
        availableVariables,
        userInstruction: this._userInstruction,
        turnIndex: this._turnIndex,
      });
    } else {
      promptText = aiPromptBuilder.buildIterationPrompt({
        currentLabel,
        availableVariables,
        userInstruction: this._userInstruction,
        turnIndex: this._turnIndex,
      });
    }

    try {
      await navigator.clipboard.writeText(promptText);
      UISM.play(UISM.enumPresets.SUCCESS);
      eventBus.emit('notify', {
        type: 'success',
        message: `Prompt copiado! Cole na sua IA (Turno #${this._turnIndex}).`,
        duration: 4000,
      });
    } catch (err) {
      eventBus.emit('notify', {
        type: 'error',
        message: 'Não foi possível copiar para a área de transferência.',
      });
    }
  }

  private async handleCopySystemPrompt() {
    const state = store.getState();
    const currentLabel = state.currentLabel;
    if (!currentLabel) return;

    const availableVariables = this.getAvailableVariables();
    const promptText = aiPromptBuilder.buildSystemPrompt({
      currentLabel,
      availableVariables,
      userInstruction: this._userInstruction,
      turnIndex: 1,
    });

    try {
      await navigator.clipboard.writeText(promptText);
      UISM.play(UISM.enumPresets.SUCCESS);
      eventBus.emit('notify', {
        type: 'success',
        message: 'System Prompt Completo copiado com sucesso!',
        duration: 4000,
      });
    } catch (err) {
      eventBus.emit('notify', {
        type: 'error',
        message: 'Falha ao copiar prompt.',
      });
    }
  }

  private handleApplyResponse() {
    const rawText = this._responseText.trim();
    if (!rawText) {
      eventBus.emit('notify', {
        type: 'warning',
        message: 'Por favor, cole a resposta JSON da IA antes de aplicar.',
      });
      UISM.play(UISM.enumPresets.WARNING);
      return;
    }

    const currentLabel = store.getState().currentLabel;
    if (!currentLabel) return;

    try {
      // 1. Faz parse resiliente
      const parsed = aiPromptBuilder.parseResponse(rawText);

      // 2. Cria snapshot no histórico antes da alteração
      const actionDesc = this._userInstruction.trim()
        ? `IA: ${this._userInstruction.trim().slice(0, 30)}...`
        : `IA Modificação (Turno #${this._turnIndex})`;
      eventBus.emit('history:snapshot', { description: actionDesc });

      // 3. Aplica o merge cirúrgico
      const mergedLabel = aiPromptBuilder.applyMerge(currentLabel, parsed);

      // 4. Carrega a nova etiqueta na Store
      store.loadLabel(mergedLabel);

      // 5. Incrementa o turno e limpa campo de resposta
      this._turnIndex++;
      this._responseText = '';
      this.syncValues();

      UISM.play(UISM.enumPresets.SUCCESS);
      eventBus.emit('notify', {
        type: 'success',
        message: 'Design atualizado no Canvas com sucesso!',
        duration: 4000,
      });
    } catch (err: any) {
      UISM.play(UISM.enumPresets.WARNING);
      eventBus.emit('notify', {
        type: 'error',
        message: err.message || 'Erro ao processar JSON da IA.',
        duration: 5000,
      });
    }
  }

  private updateUndoRedoButtons(canUndo: boolean, canRedo: boolean) {
    const root = this.shadowRoot;
    if (!root) return;

    const undoBtn = root.getElementById('ai-undo-btn') as HTMLButtonElement | null;
    const redoBtn = root.getElementById('ai-redo-btn') as HTMLButtonElement | null;

    if (undoBtn) undoBtn.disabled = !canUndo;
    if (redoBtn) redoBtn.disabled = !canRedo;
  }

  private syncValues() {
    const root = this.shadowRoot;
    if (!root) return;

    // Atualiza pills de modo
    root.querySelectorAll<HTMLButtonElement>('.mode-pill').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.mode === this._currentMode);
    });

    // Atualiza indicador de turno
    const turnBadge = root.getElementById('chat-turn-badge');
    if (turnBadge) {
      turnBadge.textContent = `Turno #${this._turnIndex}`;
    }

    // Exibe/oculta botão auxiliar de system prompt
    const auxSystemContainer = root.getElementById('aux-system-prompt-container');
    if (auxSystemContainer) {
      auxSystemContainer.style.display = this._currentMode === 'iterate' ? 'flex' : 'none';
    }

    // Textareas
    const instructionInput = root.getElementById('ai-instruction-input') as HTMLTextAreaElement | null;
    if (instructionInput && instructionInput.value !== this._userInstruction) {
      instructionInput.value = this._userInstruction;
    }

    const responseInput = root.getElementById('ai-response-input') as HTMLTextAreaElement | null;
    if (responseInput && responseInput.value !== this._responseText) {
      responseInput.value = this._responseText;
    }

    // Atualiza estado do Undo/Redo
    const state = store.getState();
    this.updateUndoRedoButtons(state.canUndo, state.canRedo);
  }

  private renderSkeleton() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 0;
          color: var(--color-text-main);
          font-family: var(--font-sans);
          overflow: hidden;
        }

        .studio-header {
          padding: 16px 20px 12px;
          border-bottom: 1px solid var(--color-border-ui);
          background: var(--color-surface-solid);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .studio-title {
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--color-accent-primary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: var(--font-mono);
        }

        .chat-turn-pill {
          font-family: var(--font-mono);
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 9999px;
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: var(--color-accent-primary);
          font-weight: 600;
        }

        .mode-selector {
          display: flex;
          gap: 4px;
          padding: 8px 20px;
          background: color-mix(in srgb, var(--color-surface-solid), transparent 40%);
          border-bottom: 1px solid var(--color-border-ui);
        }

        .mode-pill {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 6px 12px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 6px;
          color: var(--color-text-muted);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s var(--ease-spring);
        }

        .mode-pill:hover {
          color: var(--color-text-main);
          background: rgba(255, 255, 255, 0.04);
        }

        .mode-pill.active {
          background: var(--color-surface-elevated);
          color: var(--color-accent-primary);
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        }

        .studio-body {
          flex: 1;
          padding: 16px 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .studio-textarea {
          width: 100%;
          background: var(--color-surface-elevated);
          border: 1px solid var(--color-border-ui);
          border-radius: 8px;
          padding: 10px 12px;
          color: var(--color-text-main);
          font-family: var(--font-sans);
          font-size: 12px;
          line-height: 1.4;
          resize: vertical;
          min-height: 70px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .studio-textarea:focus {
          border-color: var(--color-accent-primary);
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }

        .studio-textarea.code-font {
          font-family: var(--font-mono);
          font-size: 11px;
          min-height: 90px;
        }

        .actions-row {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .history-controls {
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid var(--color-border-ui);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .btn-icon-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
        }

        .sub-link {
          font-size: 10px;
          color: var(--color-accent-primary);
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          text-decoration: underline;
          opacity: 0.85;
          transition: opacity 0.2s;
        }

        .sub-link:hover {
          opacity: 1;
        }
      </style>

      <!-- Cabeçalho Fixo -->
      <div class="studio-header">
        <div class="studio-title">
          <ui-icon name="sparkles" style="--icon-size: 16px"></ui-icon>
          <span>Prompt Studio</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="chat-turn-pill" id="chat-turn-badge">Turno #1</span>
          <button id="reset-chat-btn" class="sub-link" title="Limpa o histórico de turnos">Resetar</button>
        </div>
      </div>

      <!-- Seletor de Modo -->
      <div class="mode-selector">
        <button class="mode-pill active" data-mode="create">
          <ui-icon name="plus" style="--icon-size: 12px"></ui-icon>
          <span>Criar do Zero</span>
        </button>
        <button class="mode-pill" data-mode="iterate">
          <ui-icon name="refresh" style="--icon-size: 12px"></ui-icon>
          <span>Iterar / Editar</span>
        </button>
      </div>

      <!-- Corpo com Rolagem -->
      <div class="studio-body">
        <!-- 1. Instrução do Usuário -->
        <div class="field-group">
          <div class="field-label">
            <span>1. O que deseja fazer?</span>
          </div>
          <textarea
            id="ai-instruction-input"
            class="studio-textarea"
            placeholder="Ex: Crie uma etiqueta de alimentos 100x60mm com nome do produto em destaque, tabela e código de barras..."
          ></textarea>
        </div>

        <!-- Botão Primário: Copiar Prompt -->
        <div class="actions-row">
          <app-button id="copy-prompt-btn" variant="primary" style="width: 100%;">
            <div class="btn-icon-label">
              <ui-icon name="sparkles"></ui-icon>
              <span>Copiar Prompt p/ LLM</span>
            </div>
          </app-button>
        </div>

        <!-- Link auxiliar para copiar System Prompt no modo Iterar -->
        <div id="aux-system-prompt-container" style="display: none; justify-content: flex-end;">
          <button id="copy-system-prompt-btn" class="sub-link flex items-center gap-1">
            <ui-icon name="tag" style="--icon-size: 10px"></ui-icon>
            <span>Copiar System Prompt Completo</span>
          </button>
        </div>

        <!-- 2. Resposta da IA -->
        <div class="field-group" style="margin-top: 6px;">
          <div class="field-label">
            <span>2. Cole a resposta da IA (JSON)</span>
          </div>
          <textarea
            id="ai-response-input"
            class="studio-textarea code-font"
            placeholder="Cole o JSON ou bloco markdown gerado pelo ChatGPT/Claude aqui..."
          ></textarea>
        </div>

        <!-- Botão de Aplicação no Canvas -->
        <div class="actions-row">
          <app-button id="apply-response-btn" variant="secondary" style="width: 100%;">
            <div class="btn-icon-label">
              <ui-icon name="lightning"></ui-icon>
              <span>Aplicar no Canvas</span>
            </div>
          </app-button>
        </div>

        <!-- Controles de Histórico (Undo / Redo) -->
        <div class="history-controls">
          <div class="flex items-center gap-2">
            <app-button id="ai-undo-btn" variant="ghost" size="sm" title="Desfazer alteração da IA (Ctrl+Z)">
              <ui-icon name="arrow-uturn-down" style="--icon-size: 12px; transform: scaleX(-1);"></ui-icon>
              <span>Desfazer</span>
            </app-button>
            <app-button id="ai-redo-btn" variant="ghost" size="sm" title="Refazer alteração (Ctrl+Y)">
              <ui-icon name="arrow-uturn-down" style="--icon-size: 12px"></ui-icon>
              <span>Refazer</span>
            </app-button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('ui-prompt-studio', PromptStudio);
