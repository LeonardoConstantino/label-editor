import { UISM } from '../../core/UISoundManager';
import { templateManager } from '../../domain/services/TemplateManager';
import { Label } from '../../domain/models/Label';
import { formatDate } from '../../utils/utils';
import '../common/AppButton';
import '../common/icon';
import { confirmDialog } from '../common/confirm';

/**
 * VaultGallery: Interface de gerenciamento de templates (The Vault).
 * Implementa o Takeover Modal com atualização cirúrgica do DOM.
 */
export class VaultGallery extends HTMLElement {
  private templates: Label[] = [];
  private filter: 'all' | 'recent' = 'all';
  private abortController: AbortController | null = null;
  private isSkeletonRendered = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.loadAndRender();
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

  async loadAndRender(): Promise<void> {
    this.templates = await templateManager.getTemplates();
    this.render();
  }

  private render(): void {
    if (!this.shadowRoot) return;

    if (!this.isSkeletonRendered) {
      this.renderSkeleton();
      this.isSkeletonRendered = true;
    }

    this.cleanup();
    this.abortController = new AbortController();
    const { signal } = this.abortController;

    this.updateSidebarUI();
    this.renderGrid(signal);
  }

  private renderSkeleton(): void {
    this.shadowRoot!.innerHTML = `
    <style>
      @import "/src/styles/main.css";
      :host { display: block; height: 100%; }
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { 
        background-color: var(--color-border-ui); 
        border-radius: 99px; 
        border: 2px solid var(--color-canvas); 
      }
      ::-webkit-scrollbar-thumb:hover { background-color: var(--color-accent-primary); }
      
      @keyframes scanline-scroll {
        0% { background-position: 0 0; }
        100% { background-position: 0 4px; }
      }
      .crt-scanline {
        background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px);
        animation: scanline-scroll 0.8s linear infinite;
      }
      
      .cartridge-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 32px;
        position: relative;
        z-index: 10;
      }

      .fade-out {
        opacity: 0;
        transform: scale(0.9) translateY(10px);
        transition: all 0.4s var(--ease-spring);
        pointer-events: none;
      }
    </style>

    <div class="flex h-full w-full -m-6 bg-[#0a0c10] overflow-hidden">
      <aside id="sidebar" class="w-64 border-r border-border-ui bg-surface-solid/40 p-6 flex flex-col gap-6 backdrop-blur-md relative z-10 shadow-[10px_0_30px_rgba(0,0,0,0.5)]"></aside>
      <main class="flex-1 p-8 md:p-10 overflow-y-auto relative bg-canvas">
        <div class="absolute inset-0 pointer-events-none opacity-20" style="background-image: radial-gradient(var(--color-border-ui) 1px, transparent 0); background-size: 24px 24px;"></div>
        <div id="cartridge-grid" class="cartridge-grid"></div>
      </main>
    </div>
    `;
  }

  private updateSidebarUI(): void {
    const sidebar = this.shadowRoot!.getElementById('sidebar')!;
    sidebar.innerHTML = `
      <div class="flex items-center gap-2 mb-2 pb-4 border-b border-white/5">
        <ui-icon name="database" class="text-accent-primary drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] w-5 h-5"></ui-icon>
        <h3 class="font-mono text-[11px] text-text-main uppercase tracking-[0.25em] font-bold">The Vault</h3>
      </div>
      
      <div class="flex flex-col gap-2">
        <button class="filter-btn text-left font-sans text-sm px-4 py-2.5 rounded-lg border transition-all duration-300 cursor-pointer ${this.filter === 'all' ? 'text-accent-primary bg-accent-primary/10 border-accent-primary/30 shadow-[0_0_15px_rgba(99,102,241,0.15)] scale-[1.02]' : 'text-text-muted border-transparent hover:text-text-main hover:bg-white/5 hover:translate-x-1'}" data-filter="all">
          <div class="flex items-center gap-2">
            <ui-icon name="grid" class="w-4 h-4"></ui-icon>
            All Cartridges
          </div>
        </button>

        <button class="filter-btn text-left font-sans text-sm px-4 py-2.5 rounded-lg border transition-all duration-300 cursor-pointer ${this.filter === 'recent' ? 'text-accent-primary bg-accent-primary/10 border-accent-primary/30 shadow-[0_0_15px_rgba(99,102,241,0.15)] scale-[1.02]' : 'text-text-muted border-transparent hover:text-text-main hover:bg-white/5 hover:translate-x-1'}" data-filter="recent">
          <div class="flex items-center gap-2">
            <ui-icon name="clock" class="w-4 h-4"></ui-icon>
            Recent Activity
          </div>
        </button>
      </div>

      <div class="mt-auto p-4 bg-black/40 rounded-xl border border-border-ui shadow-inner relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-accent-primary/50 to-transparent"></div>
        <p class="text-[10px] text-text-muted leading-relaxed font-mono">
          <strong class="text-accent-primary uppercase tracking-widest flex items-center gap-1 mb-1">
            <div class="w-1.5 h-1.5 rounded-full bg-accent-success animate-pulse"></div> Online
          </strong>
          All designs are securely stored in your local cartrige bays.
        </p>
      </div>
    `;
  }

  private renderGrid(signal: AbortSignal): void {
    const grid = this.shadowRoot!.getElementById('cartridge-grid')!;
    const filtered = this.filter === 'recent'
      ? [...this.templates].sort((a, b) => b.updatedAt - a.updatedAt)
      : this.templates;

    grid.innerHTML = `
      <button id="btn-new-template" class="w-full h-full min-h-65 rounded-2xl border-2 border-dashed border-border-ui bg-black/20 flex flex-col items-center justify-center gap-5 text-text-muted hover:text-accent-primary hover:border-accent-primary/50 hover:bg-accent-primary/5 hover:shadow-[inset_0_0_30px_rgba(99,102,241,0.05)] transition-all duration-500 cursor-pointer group">
        <div class="w-16 h-16 rounded-full bg-surface-solid border border-border-ui flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-(--ease-spring) relative">
          <ui-icon name="plus" class="w-6 h-6"></ui-icon>
          <div class="absolute inset-0 rounded-full border border-accent-primary opacity-0 group-hover:animate-ping"></div>
        </div>
        <div class="text-center">
          <span class="block font-mono text-[11px] uppercase tracking-widest font-bold mb-1">New Blueprint</span>
          <span class="text-[9px] font-sans opacity-60">Initialize empty workspace</span>
        </div>
      </button>
      ${filtered.map(label => this.renderCartridgeHtml(label)).join('')}
    `;

    this.attachEvents(signal);
  }

  private renderCartridgeHtml(label: Label): string {
    const timeAgo = formatDate(new Date(label.updatedAt).toISOString(), { isRelative: true });
    const ratio = label.config.widthMM / label.config.heightMM;

    return `
    <div class="group relative bg-surface-solid border border-border-ui rounded-2xl overflow-hidden shadow-panel transition-all duration-300 ease-spring hover:border-accent-primary hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_15px_rgba(99,102,241,0.2)]" data-id="${label.id}">
        
        <!-- O DISPLAY DO CARTUCHO -->
        <div class="bg-black w-full h-44 flex items-center justify-center p-6 relative border-b border-border-ui overflow-hidden shadow-inner">
          
          <img src="${label.thumbnail || ''}" 
              class="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-[1.03] z-10" 
              style="aspect-ratio: ${ratio}; max-width: 100%; max-height: 100%;" />

          <div class="absolute inset-0 z-20 pointer-events-none crt-scanline"></div>
          <div class="absolute inset-0 z-20 pointer-events-none bg-linear-to-b from-white/5 to-transparent"></div>

          <!-- ========================================= -->
          <!-- OVERLAY DE AÇÕES (CORRIGIDO E REFINADO) -->
          <!-- ========================================= -->
          
          <!-- Fundo Glass mais suave: permite ver a silhueta da etiqueta atrás -->
          <div class="absolute inset-0 bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-3 transition-all duration-300 z-30">
            
            <!-- Primary Action (Load) - Agora é um Ghost Button Elegante -->
            <div class="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-75 w-[75%]">
              <!-- Usei <button> nativo aqui para garantir o tamanho e estilo exato sem conflito com o app-button global -->
              <button class="action-load w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-mono text-[11px] font-bold tracking-widest uppercase border border-accent-success text-accent-success bg-accent-success/10 hover:bg-accent-success hover:text-black hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-200 cursor-pointer" data-id="${label.id}">
                <ui-icon name="download" class="w-4 h-4"></ui-icon> Load Asset
              </button>
            </div>
            
            <!-- Secondary Actions (Perfeitamente alinhados) -->
            <div class="flex gap-2.5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-100">
              
              <button class="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer bg-black/60 border border-white/10 text-text-muted hover:text-white hover:border-white/30 hover:bg-white/10 transition-all action-duplicate" title="Duplicate" data-id="${label.id}">
                <ui-icon name="copy" class="w-4 h-4"></ui-icon>
              </button>
              
              <button class="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer bg-black/60 border border-white/10 text-text-muted hover:text-accent-danger hover:border-accent-danger/50 hover:bg-accent-danger/10 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all action-delete" title="Delete" data-id="${label.id}">
                <ui-icon name="trash" class="w-4 h-4"></ui-icon>
              </button>
              
            </div>

          </div>
          <!-- FIM DO OVERLAY -->

        </div>

        <!-- METADADOS DO CARTUCHO -->
        <div class="p-4 bg-surface-solid">
          <h4 class="font-sans text-[13px] font-bold text-text-main truncate mb-2.5 group-hover:text-accent-primary transition-colors" title="${label.name}">
            ${label.name}
          </h4>
          <div class="flex items-center justify-between">
            <span class="px-2 py-1 rounded bg-black/40 border border-white/5 text-[9px] font-mono text-text-muted uppercase tracking-widest shadow-inner">
              ${label.config.widthMM} × ${label.config.heightMM}mm
            </span>
            <span class="font-mono text-[9px] text-text-muted/50 uppercase flex items-center gap-1">
              <ui-icon name="clock" class="w-3 h-3"></ui-icon>
              ${timeAgo}
            </span>
          </div>
        </div>

      </div>
    `;
  }

  private attachEvents(signal: AbortSignal): void {
    const shadow = this.shadowRoot!;

    shadow.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.addEventListener('click', (e: any) => {
        const target = e.currentTarget as HTMLElement;
        this.filter = (target.dataset.filter as any) || 'all';
        UISM.play(UISM.enumPresets.TAP);
        this.render(); // Re-renderiza o grid e sidebar (sem flicker do skeleton)
      }, { signal });
    });

    shadow.getElementById('btn-new-template')?.addEventListener('click', () => {
      templateManager.createNewProject();
      this.closeVault();
      UISM.play(UISM.enumPresets.OPEN);
    }, { signal });

    shadow.addEventListener('click', async (e: any) => {
      const target = e.target as HTMLElement;
      const loadBtn = target.closest('.action-load');
      const dupBtn = target.closest('.action-duplicate');
      const delBtn = target.closest('.action-delete');

      if (loadBtn) {
        const id = (loadBtn as HTMLElement).dataset.id!;
        await templateManager.loadTemplate(id);
        UISM.play(UISM.enumPresets.SUCCESS);
        this.closeVault();
      }

      if (dupBtn) {
        const id = (dupBtn as HTMLElement).dataset.id!;
        await templateManager.duplicateTemplate(id);
        UISM.play(UISM.enumPresets.TAP);
        this.loadAndRender(); // Atualiza apenas o grid
      }

      if (delBtn) {
        const id = (delBtn as HTMLElement).dataset.id!;
        const ok = await confirmDialog.ask(
          'Excluir template?',
          'Esta ação não pode ser desfeita.',
          {
            variant: 'danger',
            confirmText: 'Excluir definitivamente',
            cancelText: 'Cancelar',
            countdown: 3,
          },
        );
        
        if (ok) {
          const card = target.closest('.cartridge-card') as HTMLElement;
          if (card) card.classList.add('fade-out');
          
          setTimeout(async () => {
            await templateManager.deleteTemplate(id);
            UISM.play(UISM.enumPresets.DELETE);
            this.loadAndRender();
          }, 400);
        }
      }
    }, { signal });
  }

  private closeVault(): void {
    const modal = document.getElementById('vault-modal') as any;
    if (modal) modal.removeAttribute('open');
  }
}

customElements.define('vault-gallery', VaultGallery);
