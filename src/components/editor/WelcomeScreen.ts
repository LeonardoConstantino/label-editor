import { UISM } from '../../core/UISoundManager';
import { templateManager } from '../../domain/services/TemplateManager';
import eventBus from '../../core/EventBus';
import '../common/icon';
import { sharedSheet } from '../../utils/shared-styles';

/**
 * WelcomeScreen: Tela inicial do Label Forge OS.
 * Exibida quando não há projetos ativos detectados.
 */
export class WelcomeScreen extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  connectedCallback(): void {
    this.render();
    this.setupEvents();
  }

  private render(): void {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }

        .action-btn:hover {
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), var(--shadow-neon-primary);
        }
      </style>

      <div class="p-6 flex flex-col items-center text-center">
        <!-- Ícone Hero -->
        <div class="w-20 h-20 rounded-4xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center mb-8 shadow-neon-primary animate-pulse">
          <ui-icon name="layers" size="lg" class="text-accent-primary"></ui-icon>
        </div>

        <h2 class="font-sans text-3xl font-bold text-text-main mb-3 tracking-tight">Label Forge OS</h2>
        <p class="text-sm text-text-muted mb-10 max-w-md leading-relaxed">
          Bem-vindo ao seu ambiente de precisão técnica. <br>
          <span class="opacity-60 font-mono text-[10px] uppercase tracking-widest">System Status: Ready for Input</span>
        </p>

        <!-- As 3 Ações Principais -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full mt-2">
          
          <!-- NOVO BLUEPRINT -->
          <button id="action-new" class="group flex flex-col items-center justify-center gap-4 p-8 bg-surface-solid border border-border-ui rounded-2xl transition-all duration-300 cursor-pointer shadow-panel hover:border-accent-primary hover:-translate-y-1.5">
            <div class="w-14 h-14 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-accent-primary/30">
              <ui-icon name="file-plus" class="text-accent-primary"></ui-icon>
            </div>
            <div class="flex flex-col gap-1">
              <span class="font-mono text-[11px] text-text-main uppercase tracking-[0.2em] font-bold">New Blueprint</span>
              <span class="text-[9px] text-text-muted opacity-60">Start from defaults</span>
            </div>
          </button>

          <!-- OPEN VAULT -->
          <button id="action-vault" class="group flex flex-col items-center justify-center gap-4 p-8 bg-surface-solid border border-border-ui rounded-2xl transition-all duration-300 cursor-pointer shadow-panel hover:border-accent-primary hover:-translate-y-1.5">
            <div class="w-14 h-14 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-accent-primary/30">
              <ui-icon name="package" class="text-text-muted group-hover:text-text-main transition-colors"></ui-icon>
            </div>
            <div class="flex flex-col gap-1">
              <span class="font-mono text-[11px] text-text-muted group-hover:text-text-main uppercase tracking-[0.2em] font-bold transition-colors">Open Vault</span>
              <span class="text-[9px] text-text-muted opacity-60">Load saved assets</span>
            </div>
          </button>

          <!-- IMPORT FILE -->
          <button id="action-import" class="group flex flex-col items-center justify-center gap-4 p-8 bg-surface-solid border border-border-ui rounded-2xl transition-all duration-300 cursor-pointer shadow-panel hover:border-accent-primary hover:-translate-y-1.5">
            <div class="w-14 h-14 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-accent-primary/30">
              <ui-icon name="upload-cloud" class="text-text-muted group-hover:text-text-main transition-colors"></ui-icon>
            </div>
            <div class="flex flex-col gap-1">
              <span class="font-mono text-[11px] text-text-muted group-hover:text-text-main uppercase tracking-[0.2em] font-bold transition-colors">Import File</span>
              <span class="text-[9px] text-text-muted opacity-60">External .label data</span>
            </div>
          </button>

        </div>
      </div>
    `;
  }

  private setupEvents(): void {
    const shadow = this.shadowRoot!;

    shadow.getElementById('action-new')?.addEventListener('click', () => {
      templateManager.createNewProject();
      this.closeWelcome();
      UISM.play(UISM.enumPresets.OPEN);
    });

    shadow.getElementById('action-vault')?.addEventListener('click', () => {
      this.closeWelcome();
      const vaultModal = document.getElementById('vault-modal') as any;
      if (vaultModal) vaultModal.setAttribute('open', '');
      UISM.play(UISM.enumPresets.OPEN);
    });

    shadow.getElementById('action-import')?.addEventListener('click', () => {
      const input = document.getElementById('global-import-input') as HTMLInputElement;
      if (input) {
        input.click();
        
        // Listener temporário para fechar o welcome após importação bem sucedida
        const onImport = () => {
          this.closeWelcome();
          eventBus.off('state:change', onImport);
        };
        eventBus.on('state:change', onImport);
      }
      UISM.play(UISM.enumPresets.TAP);
    });
  }

  private closeWelcome(): void {
    const modal = document.getElementById('welcome-modal') as any;
    if (modal) modal.removeAttribute('open');
  }
}

customElements.define('ui-welcome-screen', WelcomeScreen);
