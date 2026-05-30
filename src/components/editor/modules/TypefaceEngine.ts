import { sharedSheet } from '../../../utils/shared-styles';
import eventBus from '../../../core/EventBus';
import { store, AppState } from '../../../core/Store';
import { UISM } from '../../../core/UISoundManager';
import { CustomFont } from '../../../domain/models/Label';
import { HelpContentProvider } from '../../../utils/HelpContentProvider';
import { FontLoader } from '../../../utils/FontLoader';
import { DataSanitizer } from '../../../core/DataSanitizer';

// Importar sub-componentes se necessário
import { confirmDialog } from '../../common/confirm';
import '../../common/icon';
import '../../common/AppButton';

/**
 * TypefaceEngine: Módulo de gestão de fontes customizadas (Task 85).
 * Permite injetar Google Fonts e gerenciar a biblioteca tipográfica do documento.
 */
export class TypefaceEngine extends HTMLElement {
  private _abortController: AbortController | null = null;
  private _systemFonts: CustomFont[] = [
    { id: 'font-inter', name: 'Inter', url: '', active: true },
    { id: 'font-jetbrains', name: 'JetBrains Mono', url: '', active: true },
    { id: 'font-arial', name: 'Arial', url: '', active: true }
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  connectedCallback() {
    this.renderSkeleton();
    this.setupListeners();
    this.syncValues();
  }

  disconnectedCallback() {
    this._abortController?.abort();
  }

  private setupListeners() {
    this._abortController = new AbortController();
    const { signal } = this._abortController;
    const root = this.shadowRoot!;

    // Escuta mudanças no estado global para re-sincronizar a lista
    eventBus.on('state:change', (_state: AppState) => {
      this.syncValues();
    }, { signal });

    // Injeção de Fonte
    root.getElementById('btn-inject')?.addEventListener('click', () => {
      this.handleInjection();
    });

    root.getElementById('font-url-input')?.addEventListener('keydown', (e: any) => {
      if (e.key === 'Enter') this.handleInjection();
    });

    // Cliques delegados (Toggle Active, Delete)
    root.addEventListener('click', async (e: Event) => {
      const target = e.target as HTMLElement;
      
      const btnDelete = target.closest('.btn-delete-font');
      if (btnDelete) {
        const id = btnDelete.getAttribute('data-id')!;
        await this.deleteFont(id);
        return;
      }

      const toggle = target.closest('.font-toggle') as HTMLInputElement;
      if (toggle) {
        const id = toggle.getAttribute('data-id')!;
        this.toggleFont(id, toggle.checked);
      }
    });
  }

  private handleInjection() {
    const input = this.shadowRoot?.getElementById('font-url-input') as HTMLInputElement;
    const url = input?.value.trim();
    if (!url) return;

    // Regex para extrair nome da família do Google Fonts
    const match = url.match(/family=([^:&]+)/);
    if (match) {
      const fontName = match[1].replace(/\+/g, ' ');
      this.addCustomFont(fontName, url);
      input.value = '';
      
      // Feedback Juice
      input.classList.add('scanning');
      setTimeout(() => input.classList.remove('scanning'), 1000);
      UISM.play(UISM.enumPresets.SUCCESS);
    } else {
      eventBus.emit('notify', { type: 'error', message: 'Invalid Google Fonts URL' });
      UISM.play(UISM.enumPresets.WARNING);
    }
  }

  private addCustomFont(name: string, url: string) {
    const state = store.getState();
    const label = state.currentLabel;
    if (!label) return;

    const customFonts = [...(label.config.customFonts || [])];
    
    // Evita duplicatas
    if (customFonts.some(f => f.url === url)) {
      eventBus.emit('notify', { type: 'info', message: 'Font already injected' });
      return;
    }

    const newFont: CustomFont = {
      id: crypto.randomUUID(),
      name,
      url,
      active: true
    };

    customFonts.push(newFont);

    // Injeta no HEAD imediatamente
    FontLoader.inject(url);

    // Salva no Store
    eventBus.emit('label:config:update', {
      ...label.config,
      customFonts
    });
  }

  private toggleFont(id: string, active: boolean) {
    const state = store.getState();
    const label = state.currentLabel;
    if (!label) return;

    const customFonts = (label.config.customFonts || []).map(f => 
      f.id === id ? { ...f, active } : f
    );

    eventBus.emit('label:config:update', {
      ...label.config,
      customFonts
    });
    
    UISM.play(UISM.enumPresets.TAP);
  }

  private async deleteFont(id: string) {
    const state = store.getState();
    const label = state.currentLabel;
    if (!label) return;

    const font = label.config.customFonts?.find(f => f.id === id);
    if (!font) return;

    const ok = await confirmDialog.ask(
      'Excluir fonte?',
      'Tem certeza que deseja excluir esta fonte? Esta ação é irreversível.',
      {
        variant: 'danger',
        confirmText: 'Excluir definitivamente',
        cancelText: 'Cancelar',
        countdown: 1,
      },
    );

    if (ok) {
      const customFonts = label.config.customFonts?.filter(f => f.id !== id);
      
      // Remove o link do head
      if (font.url) FontLoader.remove(font.url);
      
      eventBus.emit('label:config:update', {
        ...label.config,
        customFonts
      });

      UISM.play(UISM.enumPresets.DELETE);
    }
  }

  private syncValues() {
    const state = store.getState();
    const label = state.currentLabel;
    if (!label || !this.shadowRoot) return;

    const container = this.shadowRoot.getElementById('font-list-container');
    if (!container) return;

    const customFonts = label.config.customFonts || [];
    const allFonts = [...this._systemFonts, ...customFonts];

    // Diferenciação simples (nativas vs custom)
    container.innerHTML = allFonts.map(f => {
      const safeName = DataSanitizer.escapeHTML(f.name);
      const safeId = DataSanitizer.escapeHTML(f.id);

      return `
        <div class="font-card ${f.active ? 'active' : 'inactive'}">

          <div class="font-card-header">
            <span class="font-name">${safeName}</span>
            <div class="flex items-center gap-4"> <!-- Aumentei o gap -->

              ${f.url ? `
                <button class="btn-delete-font" data-id="${safeId}" title="Remove font">
                  <ui-icon name="trash" class="w-3.5 h-3.5"></ui-icon>
                </button>
              ` : '<span class="text-[8px] text-text-muted opacity-40 uppercase font-mono tracking-widest bg-white/5 px-2 py-1 rounded">System</span>'}

              <!-- APLIQUEI O NOSSO CHECKBOX GLOBAL TÁTIL AQUI -->
              <input type="checkbox" class="font-toggle" data-id="${safeId}" ${f.active ? 'checked' : ''} title="Habilitar/Desabilitar Fonte">

            </div>
          </div>

          <div class="specimen-box" style="font-family: '${safeName}', sans-serif">
            <div class="specimen-text" contenteditable="true" spellcheck="false" title="Clique para testar o seu texto">
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  private renderSkeleton() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; flex-direction: column; height: 100%; background: #0a0c10; font-family: var(--font-sans); }
        .header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--color-border-ui); background: rgba(22, 25, 32, 0.5); backdrop-filter: blur(8px); z-index: 10; }
        .header-title { font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: var(--color-text-main); text-transform: uppercase; letter-spacing: 0.15em; }
        
        /* -------------------------------------------
           TERMINAL ZONE
           ------------------------------------------- */
        .terminal-zone {
          padding: 24px 20px;
          background: #050608;
          border-bottom: 1px solid var(--color-border-ui);
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: inset 0 2px 15px rgba(0,0,0,0.5);
        }

        .label-prism { font-family: var(--font-mono); font-size: 9px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold; }

        .input-group { display: flex; gap: 8px; position: relative; }
        
        .input-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--color-text-muted); opacity: 0.5; pointer-events: none; }
        
        .input-prism { 
          flex: 1; height: 36px; /* Levemente maior */
          background: rgba(255,255,255,0.02); 
          border: 1px solid var(--color-border-ui);
          border-radius: 8px; padding: 0 12px 0 34px; /* Espaço para o ícone */
          color: white; font-family: var(--font-mono); font-size: 11px;
          outline: none; transition: all 0.3s;
        }
        
        .input-prism:focus { 
          border-color: var(--color-accent-primary); 
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.15); 
          background: rgba(255,255,255,0.04);
        }
        .input-prism:focus + .input-icon { color: var(--color-accent-primary); opacity: 1; }
        
        .input-prism.scanning { animation: scan-pulse 0.4s infinite alternate; }

        @keyframes scan-pulse {
          from { border-color: var(--color-accent-primary); box-shadow: 0 0 10px rgba(99, 102, 241, 0.4); }
          to { border-color: var(--color-accent-success); box-shadow: 0 0 20px rgba(16, 185, 129, 0.6); }
        }

        /* -------------------------------------------
           FONT CARDS (The Inventory)
           ------------------------------------------- */
        #font-list-container {
          flex: 1; overflow-y: auto; padding: 24px 20px;
          display: flex; flex-direction: column; gap: 16px;
        }

        .font-card {
          background: var(--color-surface-solid);
          border: 1px solid var(--color-border-ui);
          border-radius: 12px;
          padding: 16px;
          transition: all 0.4s var(--ease-spring);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        
        .font-card:hover { border-color: rgba(255,255,255,0.1); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
        
        /* O "Glitch" sutil quando desativada */
        .font-card.inactive { 
          opacity: 0.5; filter: grayscale(1); 
          border-color: transparent; background: rgba(0,0,0,0.2); 
        }
        
        .font-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        
        .font-name { font-family: var(--font-mono); font-size: 13px; font-weight: bold; color: var(--color-text-main); letter-spacing: 0.02em; }
        
        /* -------------------------------------------
           THE SPECIMEN BOX (Live Preview)
           ------------------------------------------- */
        .specimen-box {
          background: #050608;
          border: 1px solid rgba(255,255,255,0.03);
          border-radius: 8px;
          padding: 16px;
          min-height: 48px;
          transition: all 0.2s ease;
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.4);
        }
        
        .specimen-box:focus-within {
          border-color: var(--color-accent-primary);
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.4), 0 0 0 1px var(--color-accent-primary);
        }

        .specimen-text {
          font-size: 18px; /* Maior para o usuário "sentir" a fonte */
          color: var(--color-text-main); outline: none;
          line-height: 1.4;
          /* Deixa o texto quebrar de linha se for muito longo */
          word-break: break-word; 
        }
        .font-card.inactive .specimen-text { text-decoration: line-through; opacity: 0.5; }

        /* -------------------------------------------
           DELETE BUTTON (Juice)
           ------------------------------------------- */
        .btn-delete-font {
          background: rgba(244,63,94,0.1); border: 1px solid rgba(244,63,94,0.2); color: var(--color-accent-danger);
          cursor: pointer; opacity: 0; transform: translateX(10px); transition: all 0.3s var(--ease-spring);
          padding: 6px; border-radius: 6px; display: flex; align-items: center; justify-content: center;
        }
        .font-card:hover .btn-delete-font { opacity: 1; transform: translateX(0); }
        .btn-delete-font:hover { background: var(--color-accent-danger); color: white; box-shadow: 0 0 10px rgba(244,63,94,0.4); }
      </style>

      <div class="header">
        <span class="header-title">Typeface Engine</span>
        ${HelpContentProvider.buildTooltip('mod_typeface', 'bottom')}
      </div>

      <div class="terminal-zone">
        <span class="label-prism">Font Ingestion Terminal</span>
        <div class="input-group">
          <ui-icon name="link" class="input-icon w-4 h-4"></ui-icon> <!-- ÍCONE AQUI -->
          <input type="text" id="font-url-input" class="input-prism" placeholder="Google Fonts URL...">
          <!-- app-button nativo (use a classe "primary" no JS ao invés de "secondary" se quiser ele aceso) -->
          <app-button id="btn-inject" variant="primary" style="font-size: 10px; height: 36px; padding: 0 16px;">INJECT</app-button>
        </div>
      </div>

      <div id="font-list-container">
        <!-- Font cards injected here -->
      </div>
    `;
  }
}

customElements.define('typeface-engine', TypefaceEngine);
