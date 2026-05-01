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

        /* Animação Orgânica do Núcleo (Substitui o animate-pulse genérico) */
        @keyframes core-breathe {
          0%, 100% { 
            box-shadow: 0 0 15px rgba(99, 102, 241, 0.2), inset 0 0 10px rgba(99, 102, 241, 0.1); 
            transform: translateY(0);
          }
          50% { 
            box-shadow: 0 0 35px rgba(99, 102, 241, 0.5), inset 0 0 20px rgba(99, 102, 241, 0.2); 
            transform: translateY(-2px);
          }
        }
        .hero-core {
          animation: core-breathe 4s ease-in-out infinite;
        }

        /* Cursor de Terminal piscando */
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .cursor-blink { animation: blink 1s step-end infinite; display: inline-block; width: 4px; height: 10px; background-color: var(--color-accent-success); vertical-align: middle; margin-left: 4px; }

        /* Juice base para os botões */
        .action-card {
          transition: all 0.4s var(--ease-spring);
        }
        .action-card:hover {
          transform: translateY(-4px) scale(1.02);
        }
      </style>

      <div class="p-8 flex flex-col items-center text-center relative overflow-hidden rounded-2xl bg-[#0a0c10]">
        
        <!-- Fundo de Grid Técnico (Subliminar) -->
        <div class="absolute inset-0 pointer-events-none opacity-[0.03]" style="background-image: linear-gradient(var(--color-border-ui) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-ui) 1px, transparent 1px); background-size: 20px 20px;"></div>
        
        <!-- Luz de Fundo Radial (Glow Atmosférico) -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-accent-primary/20 blur-[80px] pointer-events-none rounded-full"></div>

        <!-- Ícone Hero (O Núcleo) -->
        <div class="hero-core w-20 h-20 rounded-3xl bg-surface-solid border border-accent-primary/40 flex items-center justify-center mb-6 relative z-10">
          <!-- Reflexo interno estilo vidro -->
          <div class="absolute inset-0 rounded-3xl bg-linear-to-b from-white/10 to-transparent pointer-events-none"></div>
          <ui-icon name="layers" size="lg" class="text-accent-primary drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]"></ui-icon>
        </div>

        <h2 class="font-sans text-3xl font-bold mb-2 tracking-tight relative z-10 text-transparent bg-clip-text bg-linear-to-b from-white to-white/70">
          Label Forge OS
        </h2>
        <p class="text-sm text-text-muted mb-10 max-w-md leading-relaxed relative z-10">
          Bem-vindo ao seu ambiente de precisão técnica. <br>
          <span class="mt-2 inline-flex items-center px-2 py-1 bg-black/40 border border-white/5 rounded font-mono text-[9px] uppercase tracking-widest text-accent-success/80">
            System Status: Ready for Input <span class="cursor-blink"></span>
          </span>
        </p>

        <!-- As 3 Ações Principais -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full mt-2 relative z-10">
          
          <!-- AÇÃO 1: NOVO BLUEPRINT (O Protagonista) -->
          <!-- Usa fundo levemente indigo e borda acesa por padrão -->
          <button id="action-new" class="action-card group flex flex-col items-center justify-center gap-4 p-8 bg-surface-solid border border-accent-primary/40 rounded-2xl cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-accent-primary hover:bg-accent-primary/10 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(99,102,241,0.2)]">
            <div class="w-14 h-14 rounded-2xl bg-[#050608] border border-accent-primary/50 flex items-center justify-center transition-all duration-400 group-hover:scale-110 group-hover:bg-accent-primary/20 group-hover:border-accent-primary shadow-inner">
              <ui-icon name="file-plus" class="text-accent-primary"></ui-icon>
            </div>
            <div class="flex flex-col gap-1.5">
              <span class="font-mono text-[11px] text-text-main uppercase tracking-[0.15em] font-bold">New Blueprint</span>
              <span class="text-[9px] text-accent-primary/70 uppercase tracking-wider font-mono">Start from scratch</span>
            </div>
          </button>

          <!-- AÇÃO 2: OPEN VAULT (Acesso Secundário) -->
          <!-- Escuro por padrão, acorda no hover -->
          <button id="action-vault" class="action-card group flex flex-col items-center justify-center gap-4 p-8 bg-black/40 border border-white/5 rounded-2xl cursor-pointer shadow-inner hover:border-white/20 hover:bg-surface-solid hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
            <div class="w-14 h-14 rounded-2xl bg-surface-solid border border-white/5 flex items-center justify-center transition-all duration-400 group-hover:scale-110 group-hover:border-white/30 group-hover:bg-black/40 shadow-inner">
              <ui-icon name="package" class="text-text-muted group-hover:text-text-main transition-colors"></ui-icon>
            </div>
            <div class="flex flex-col gap-1.5">
              <span class="font-mono text-[11px] text-text-muted group-hover:text-text-main uppercase tracking-[0.15em] font-bold transition-colors">Open Vault</span>
              <span class="text-[9px] text-text-muted/50 uppercase tracking-wider font-mono">Load saved assets</span>
            </div>
          </button>

          <!-- AÇÃO 3: IMPORT FILE (Acesso Secundário) -->
          <button id="action-import" class="action-card group flex flex-col items-center justify-center gap-4 p-8 bg-black/40 border border-white/5 rounded-2xl cursor-pointer shadow-inner hover:border-white/20 hover:bg-surface-solid hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
            <div class="w-14 h-14 rounded-2xl bg-surface-solid border border-white/5 flex items-center justify-center transition-all duration-400 group-hover:scale-110 group-hover:border-white/30 group-hover:bg-black/40 shadow-inner">
              <ui-icon name="upload-cloud" class="text-text-muted group-hover:text-text-main transition-colors"></ui-icon>
            </div>
            <div class="flex flex-col gap-1.5">
              <span class="font-mono text-[11px] text-text-muted group-hover:text-text-main uppercase tracking-[0.15em] font-bold transition-colors">Import File</span>
              <span class="text-[9px] text-text-muted/50 uppercase tracking-wider font-mono">External .label data</span>
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
