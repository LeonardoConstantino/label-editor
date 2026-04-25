import { UISM } from '../../core/UISoundManager';
import helpData from '../../assets/data/helpData';
import { shortcutService } from '../../core/ShortcutService';
import '../common/icon';
import '../common/KeyboardShortcuts';
import { sharedSheet } from '../../utils/shared-styles';

/**
 * HelpCenter: Hub de conhecimento dinâmico.
 * Integra Quick Start Guide e Keyboard Shortcuts em abas.
 */
export class HelpCenter extends HTMLElement {
  private activeTab: 'guide' | 'shortcuts' = 'guide';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  connectedCallback(): void {
    this.render();
  }

  public setTab(tab: 'guide' | 'shortcuts'): void {
    this.activeTab = tab;
    this.render();
  }

  private render(): void {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; height: 100%; }
        .tab-btn.active {
          text-shadow: 0 0 10px rgba(99,102,241,0.5);
        }

        /* FAQ Accordion Juice */
        details summary::-webkit-details-marker { display: none; }
      </style>

      <div class="flex flex-col h-full -m-6 bg-[#0a0c10] overflow-hidden">
        <!-- TABS -->
        <nav class="flex items-center gap-8 px-8 border-b border-border-ui bg-surface-solid/40 backdrop-blur-md">
          <button class="font-mono text-[11px] uppercase tracking-[0.2em] pb-4 pt-6 border-b-2 transition-all duration-300 cursor-pointer ${this.activeTab === 'guide' ? 'border-accent-primary text-text-main font-bold' : 'border-transparent text-text-muted hover:text-text-main'}" data-tab="guide">
            Quick Start Guide
          </button>
          <button class="font-mono text-[11px] uppercase tracking-[0.2em] pb-4 pt-6 border-b-2 transition-all duration-300 cursor-pointer ${this.activeTab === 'shortcuts' ? 'border-accent-primary text-text-main font-bold' : 'border-transparent text-text-muted hover:text-text-main'}" data-tab="shortcuts">
            Keyboard Shortcuts
          </button>
        </nav>

        <!-- CONTENT -->
        <main class="flex-1 overflow-y-auto p-10 bg-canvas relative">
          <div class="absolute inset-0 pointer-events-none opacity-10" style="background-image: radial-gradient(var(--color-border-ui) 1px, transparent 0); background-size: 32px 32px;"></div>
          
          <div class="relative z-10 max-w-4xl mx-auto">
            ${this.activeTab === 'guide' ? this.renderGuide() : this.renderShortcuts()}
          </div>
        </main>
      </div>
    `;

    this.setupEvents();
  }

  private renderGuide(): string {
    return `
      <!-- TUTORIAL SECTIONS (Z-Pattern) -->
      <div class="flex flex-col gap-16 mb-16">
        ${helpData.tutorialSection.map((section, index) => `
          <div class="flex flex-col md:flex-row gap-10 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}">
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-4">
                <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-primary/10 border border-accent-primary/30 font-mono text-xs text-accent-primary font-bold shadow-neon-primary">
                  0${index + 1}
                </span>
                <h3 class="font-sans text-xl font-bold text-text-main tracking-tight">${section.title}</h3>
              </div>
              <p class="text-sm text-text-muted leading-relaxed pl-12">
                ${section.content}
              </p>
            </div>

            <div class="flex-1 w-full">
              <div class="aspect-video bg-[#050608] border border-border-ui rounded-2xl overflow-hidden relative flex flex-col items-center justify-center group shadow-panel">
                <div class="absolute inset-0 pointer-events-none opacity-20 crt-scanline" style="background-image: radial-gradient(var(--color-border-ui) 1px, transparent 0); background-size: 12px 12px;"></div>
                <ui-icon name="image" size="2xl" class="text-white/5 group-hover:text-accent-primary/40 transition-all duration-500 group-hover:scale-110"></ui-icon>
                <span class="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] text-center px-8 mt-4 leading-loose opacity-60">
                  ${section.imageDescription}
                </span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- PRO TIPS GRID -->
      <div class="mb-16 bg-accent-primary/5 border border-accent-primary/20 rounded-2xl p-8 shadow-panel relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        
        <div class="flex items-center gap-3 mb-8 pb-4 border-b border-accent-primary/10 relative z-10">
          <ui-icon name="sparkles" class="text-accent-primary fill-accent-primary/20"></ui-icon>
          <h4 class="font-mono text-xs text-accent-primary uppercase tracking-[0.3em] font-bold">Pro-Level Tactics</h4>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
          ${helpData.proTips.map(tip => `
            <div class="flex gap-4 items-start group">
              <div class="mt-1 p-2 bg-black/40 rounded-xl border border-white/5 shrink-0 group-hover:border-accent-primary/30 transition-colors">
                <ui-icon name="${tip.icon}" size="sm" class="text-text-muted group-hover:text-accent-primary transition-colors"></ui-icon>
              </div>
              <p class="text-xs text-text-main leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                ${tip.tip}
              </p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- FAQ ACCORDION -->
      <div class="max-w-2xl">
        <h4 class="font-mono text-[10px] text-text-muted uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-3 opacity-60">
          <ui-icon name="help" size="sm"></ui-icon>
          Frequent Inquiries
        </h4>
        
        <div class="flex flex-col gap-3">
          ${helpData.faqItens.map(faq => `
            <details class="group bg-surface-solid/50 border border-border-ui rounded-xl overflow-hidden transition-all duration-300">
              <summary class="flex items-center justify-between p-5 cursor-pointer font-sans text-sm text-text-main font-semibold hover:bg-white/5 transition-colors select-none">
                ${faq.q}
                <ui-icon name="chevron-down" size="sm" class="text-text-muted group-open:rotate-180 transition-transform duration-300"></ui-icon>
              </summary>
              <div class="p-5 pt-0 text-sm text-text-muted leading-relaxed border-t border-white/5 bg-black/20">
                ${faq.a}
              </div>
            </details>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderShortcuts(): string {
    return `
      <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <ui-keyboard-shortcuts id="shortcut-viewer" enable-search="true"></ui-keyboard-shortcuts>
      </div>
    `;
  }

  private setupEvents(): void {
    const shadow = this.shadowRoot!;
    
    // Tab switching
    shadow.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', (e: any) => {
        const tab = e.target.dataset.tab;
        if (tab !== this.activeTab) {
          this.activeTab = tab;
          UISM.play(UISM.enumPresets.TAP);
          this.render();
        }
      });
    });

    // Injeta dados nos atalhos se a aba for shortcuts
    if (this.activeTab === 'shortcuts') {
      const viewer = shadow.getElementById('shortcut-viewer') as any;
      if (viewer) {
        viewer.data = shortcutService.listShortcuts();
      }
    }
  }
}

customElements.define('ui-help-center', HelpCenter);
