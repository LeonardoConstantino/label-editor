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

    // 1. Input de Instrução do Usuário
    const instructionInput = root.getElementById('ai-instruction-input') as HTMLTextAreaElement | null;
    instructionInput?.addEventListener(
      'input',
      (e) => {
        this._userInstruction = (e.target as HTMLTextAreaElement).value;
      },
      { signal }
    );

    // 2. Input de Resposta da LLM
    const responseInput = root.getElementById('ai-response-input') as HTMLTextAreaElement | null;
    responseInput?.addEventListener(
      'input',
      (e) => {
        this._responseText = (e.target as HTMLTextAreaElement).value;
      },
      { signal }
    );

    // 3. Ação: Copiar Prompt para a Área de Transferência
    const copyPromptBtn = root.getElementById('copy-prompt-btn');
    copyPromptBtn?.addEventListener('click', () => this.handleCopyPrompt(), { signal });

    // 4. Ação: Copiar System Prompt Avulso (no modo Iterar)
    const copySystemBtn = root.getElementById('copy-system-prompt-btn');
    copySystemBtn?.addEventListener('click', () => this.handleCopySystemPrompt(), { signal });

    // 5. Ação: Aplicar JSON no Canvas
    const applyBtn = root.getElementById('apply-response-btn');
    applyBtn?.addEventListener('click', () => this.handleApplyResponse(), { signal });

    // 6. Ação: Reiniciar Sessão de Chat
    const resetChatBtn = root.getElementById('reset-chat-btn');
    resetChatBtn?.addEventListener(
      'click',
      () => {
        this._turnIndex = 1;
        this._responseText = '';
        store.updateLabelIAIndex(1);
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

    // 7. Botões de Undo / Redo Rápidos
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

    // 8. Validação live do JSON + habilitação do btn-apply
    const jsonStatus    = root.getElementById('json-status');
    const jsonStatusTxt = root.getElementById('json-status-text');
    const applyBtnEl    = root.getElementById('apply-response-btn') as HTMLButtonElement | null;

    responseInput?.addEventListener('input', () => {
      const val = (responseInput as HTMLTextAreaElement).value.trim();

      if (!val) {
        if (jsonStatus)  jsonStatus.className = 'json-status';
        if (applyBtnEl)  applyBtnEl.disabled = true;
        return;
      }

      try {
        JSON.parse(val);
        if (jsonStatus)  { jsonStatus.className = 'json-status visible valid'; }
        if (jsonStatusTxt) jsonStatusTxt.textContent = 'JSON válido — pronto para aplicar';
        if (applyBtnEl)  applyBtnEl.disabled = false;
      } catch {
        if (jsonStatus)  { jsonStatus.className = 'json-status visible invalid'; }
        if (jsonStatusTxt) jsonStatusTxt.textContent = 'JSON inválido — verifique a sintaxe';
        if (applyBtnEl)  applyBtnEl.disabled = true;
      }
    }, { signal });

    // Escuta atualizações de estado para habilitar/desabilitar Undo e Redo
    eventBus.on(
      'state:change',
      (state: AppState) => {
        this.updateUndoRedoButtons(state.canUndo, state.canRedo);
      },
      { signal }
    );
  }

  private setFooterState(state: 'idle' | 'applying' | 'error') {
    const led    = this.shadowRoot?.getElementById('studio-led');
    const status = this.shadowRoot?.getElementById('studio-status');
    if (!led || !status) return;

    const map = {
      idle:     { color: 'var(--color-accent-success)', glow: 'rgba(16,185,129,0.5)',  text: 'pronto para receber prompt' },
      applying: { color: 'var(--color-accent-primary)', glow: 'rgba(99,102,241,0.5)',  text: 'aplicando no canvas…'       },
      error:    { color: 'var(--color-accent-danger)',  glow: 'rgba(244,63,94,0.5)',   text: 'erro ao aplicar'            },
    };

    const cfg = map[state];
    led.style.background = cfg.color;
    led.style.boxShadow  = `0 0 6px ${cfg.glow}`;
    status.textContent   = cfg.text;

    // LED pulsa apenas em idle — nos outros estados é estático
    led.classList.toggle('animate-pulse-led', state === 'idle');
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

    if (this._turnIndex === 1) {
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
    this.setFooterState('applying');
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
      const mergedLabel = aiPromptBuilder.applyMerge(currentLabel, parsed, this._turnIndex + 1);

      // 4. Carrega a nova etiqueta na Store
      store.loadLabel(mergedLabel);

      // 5. Incrementa o turno e limpa campo de resposta
      this._turnIndex++;
      this._responseText = '';
      this.syncValues();

      this.setFooterState('idle');

      UISM.play(UISM.enumPresets.SUCCESS);
      eventBus.emit('notify', {
        type: 'success',
        message: 'Design atualizado no Canvas com sucesso!',
        duration: 4000,
      });
    } catch (err: any) {
      this.setFooterState('error');

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

    // Atualiza turnIndex na Store para referência futura
    const state = store.getState();
    const currentLabel = state.currentLabel;

    if (currentLabel) {
      this._turnIndex = currentLabel.iaTurnIndex ?? 1;
    }

    // Atualiza indicador de turno
    const turnBadge = root.getElementById('chat-turn-badge');
    if (turnBadge) {
      turnBadge.textContent = `Turno #${this._turnIndex}`;
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
          overflow: hidden;
        }

        .step-number {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--color-accent-primary) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--color-accent-primary) 30%, transparent);
          color: var(--color-accent-primary);
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .btn-copy {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 9px 14px;
          border-radius: 8px;
          border: 1px dashed color-mix(in srgb, var(--color-accent-primary) 35%, transparent);
          background: color-mix(in srgb, var(--color-accent-primary) 4%, transparent);
          color: var(--color-accent-primary);
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.18s ease-out;
        }
        .btn-copy:hover {
          border-style: solid;
          border-color: color-mix(in srgb, var(--color-accent-primary) 60%, transparent);
          background: color-mix(in srgb, var(--color-accent-primary) 10%, transparent);
          box-shadow: var(--shadow-neon-primary);
        }
        .btn-copy:active {
          transform: translateY(1px);
          filter: brightness(0.9);
        }

        .code-input {
          font-family: var(--font-mono) !important;
          font-size: 11px !important;
          min-height: 80px;
          background: color-mix(in srgb, var(--color-canvas) 60%, transparent) !important;
          color: var(--color-accent-primary) !important;
        }
        .code-input::placeholder {
          font-family: var(--font-sans) !important;
          color: var(--color-text-muted) !important;
          opacity: 0.4 !important;
        }

        .json-status {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 5px;
          font-family: var(--font-mono);
          font-size: 9px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .json-status.visible { opacity: 1; }
        .json-status.valid   { color: var(--color-accent-success); }
        .json-status.invalid { color: var(--color-accent-danger); }
        .json-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
          flex-shrink: 0;
        }

        .section-divider {
          height: 1px;
          background: var(--color-border-ui);
          margin: 0 -20px;
          opacity: 0.6;
        }

        .studio-footer {
          padding: 10px 16px;
          border-top: 1px solid var(--color-border-ui);
          background: var(--color-surface-solid);
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        .footer-led {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-accent-success);
          box-shadow: 0 0 6px color-mix(in srgb, var(--color-accent-success) 50%, transparent);
          flex-shrink: 0;
          transition: background 0.2s ease-out, box-shadow 0.2s ease-out;
          /* A classe animate-pulse-led já existe no design system global */
        }

        /* Botões desabilitados: padrão Tactile Prism */
        button:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* Apply btn: largura total, ação primária máxima */
        #apply-response-btn {
          width: 100%;
          font-size: 12px;
          padding: 10px 16px;
        }
        .footer-status {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--color-text-muted);
          opacity: 0.6;
          flex: 1;
        }
        .footer-model {
          font-family: var(--font-mono);
          font-size: 8px;
          padding: 2px 6px;
          border-radius: 4px;
          background: var(--color-surface-elevated);
          border: 1px solid var(--color-border-ui);
          color: var(--color-text-muted);
        }
      </style>

      <!-- Cabeçalho -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-border-ui bg-surface-solid shrink-0">
        <div class="flex items-center gap-2.5">
          <span class="text-sm font-semibold text-text-main tracking-tight">Prompt Studio</span>
          <!-- Badge BETA: discreto, mono, opacidade reduzida -->
          <span class="inspector-badge" style="opacity: 0.5;">BETA</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="variable-badge" id="chat-turn-badge">Turno #1</span>
          <button id="reset-chat-btn" class="link-prism link-prism-external text-[10px]" title="Reiniciar sessão de chat">
            Resetar
          </button>
        </div>
      </div>

      <!-- Corpo -->
      <div class="flex-1 overflow-y-auto flex flex-col gap-4 p-5 min-h-0">

        <!-- Step 1 -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <div class="step-number">1</div>
            <span class="text-[11px] font-medium text-text-muted">O que deseja fazer?</span>
          </div>
          <textarea
            id="ai-instruction-input"
            class="input-prism resize-none"
            placeholder="Ex: Crie uma etiqueta 100×60mm com nome do produto em destaque e código de barras..."
            rows="5"
          ></textarea>
        </div>

        <!-- Copiar prompt -->
        <button class="btn-copy" id="copy-prompt-btn">
          <ui-icon name="copy" style="--icon-size: 13px"></ui-icon>
          <span>Copiar Prompt para LLM</span>
        </button>

        <!-- Divider -->
        <div class="section-divider"></div>

        <!-- Step 2 -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <div class="step-number">2</div>
            <span class="text-[11px] font-medium text-text-muted">Cole a resposta da IA</span>
          </div>
          <textarea
            id="ai-response-input"
            class="input-prism code-input"
            placeholder='{ "elements": [ … ] }'
            rows="5"
          ></textarea>
          <div class="json-status" id="json-status">
            <div class="json-status-dot"></div>
            <span id="json-status-text"></span>
          </div>
        </div>

        <!-- Aplicar -->
        <button class="btn-prism btn-primary w-full" id="apply-response-btn" disabled>
          <ui-icon name="zap" style="--icon-size: 14px; --icon-stroke-width: 2px"></ui-icon>
          Aplicar no Canvas
        </button>

        <!-- Histórico: secundários em hierarquia, com kbd-prism para atalhos -->
        <div class="grid grid-cols-2 gap-1.5">
          <button class="btn-prism btn-secondary gap-1.5 text-[10px] justify-between px-3" id="ai-undo-btn" disabled>
            <div class="flex items-center gap-1.5">
              <ui-icon name="undo-2" style="--icon-size: 12px"></ui-icon>
              <span>Desfazer</span>
            </div>
            <kbd class="kbd-prism">Z</kbd>
          </button>
          <button class="btn-prism btn-secondary gap-1.5 text-[10px] justify-between px-3" id="ai-redo-btn" disabled>
            <div class="flex items-center gap-1.5">
              <ui-icon name="redo-2" style="--icon-size: 12px"></ui-icon>
              <span>Refazer</span>
            </div>
            <kbd class="kbd-prism">Y</kbd>
          </button>
        </div>

      </div>

      <!-- Rodapé: LED à esquerda, status centralizado, badge do modelo à direita -->
      <div class="studio-footer">
        <div class="footer-led animate-pulse-led" id="studio-led"></div>
        <span class="footer-status" id="studio-status">pronto para receber prompt</span>
        <span class="footer-model" id="studio-model">gpt-4o</span>
      </div>
    `;
  }
}

customElements.define('ui-prompt-studio', PromptStudio);