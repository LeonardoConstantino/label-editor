import { sharedSheet } from '../../../utils/shared-styles';
import eventBus from '../../../core/EventBus';
import { store, AppState } from '../../../core/Store';
import { UISM } from '../../../core/UISoundManager';
import { CustomFont } from '../../../domain/models/Label';
import { HelpContentProvider } from '../../../utils/HelpContentProvider';
import { FontLoader } from '../../../utils/FontLoader';

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
    container.innerHTML = allFonts.map(f => `
      <div class="font-card ${f.active ? 'active' : 'inactive'}">
        <div class="font-card-header">
          <span class="font-name">${f.name}</span>
          <div class="flex items-center gap-3">
            ${f.url ? `
              <button class="btn-delete-font" data-id="${f.id}" title="Remove font">
                <ui-icon name="trash" size="xs"></ui-icon>
              </button>
            ` : '<span class="text-[8px] text-text-muted opacity-40 uppercase font-mono">System</span>'}
            <input type="checkbox" class="font-toggle" data-id="${f.id}" ${f.active ? 'checked' : ''}>
          </div>
        </div>
        <div class="specimen-box" style="font-family: '${f.name}', sans-serif">
          <div class="specimen-text" contenteditable="true" spellcheck="false">
            The quick brown fox jumps over the lazy dog
          </div>
        </div>
      </div>
    `).join('');
  }

  private renderSkeleton() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; flex-direction: column; height: 100%; background: #0a0c10; font-family: var(--font-sans); }
        .header { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; border-bottom: 1px solid var(--color-border-ui); background: rgba(0,0,0,0.2); }
        .header-title { font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.1em; }
        
        .terminal-zone {
          padding: 20px;
          background: #050608;
          border-bottom: 1px solid var(--color-border-ui);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .input-group { display: flex; gap: 8px; }
        .input-prism { 
          flex: 1; height: 32px; 
          background: rgba(255,255,255,0.03); 
          border: 1px solid var(--color-border-ui);
          border-radius: 8px; padding: 0 12px;
          color: white; font-family: var(--font-mono); font-size: 11px;
          outline: none; transition: all 0.3s;
        }
        .input-prism:focus { border-color: var(--color-accent-primary); box-shadow: 0 0 10px var(--color-accent-primary-alpha, rgba(99, 102, 241, 0.2)); }
        
        .input-prism.scanning {
           animation: scan-pulse 0.5s infinite alternate;
        }

        @keyframes scan-pulse {
          from { border-color: var(--color-accent-primary); }
          to { border-color: var(--color-accent-success); }
        }

        #font-list-container {
          flex: 1; overflow-y: auto; padding: 20px;
          display: flex; flex-direction: column; gap: 16px;
        }

        .font-card {
          background: var(--color-surface-solid);
          border: 1px solid var(--color-border-ui);
          border-radius: 12px;
          padding: 16px;
          transition: all 0.3s var(--ease-spring);
        }
        .font-card.inactive { opacity: 0.5; filter: grayscale(0.5); }
        
        .font-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .font-name { font-family: var(--font-mono); font-size: 12px; font-weight: 600; color: var(--color-text-main); }
        
        .specimen-box {
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.03);
          border-radius: 8px;
          padding: 12px;
          min-height: 40px;
        }
        .specimen-text {
          font-size: 14px; color: var(--color-text-main); outline: none;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .btn-delete-font {
          background: transparent; border: none; color: var(--color-text-muted);
          cursor: pointer; opacity: 0; transition: all 0.2s;
        }
        .font-card:hover .btn-delete-font { opacity: 1; }
        .btn-delete-font:hover { color: var(--color-accent-danger); }
      </style>

      <div class="header">
        <span class="header-title">Typeface Engine</span>
        ${HelpContentProvider.buildTooltip('typeface', 'bottom')}
      </div>

      <div class="terminal-zone">
        <span class="label-prism">Font Ingestion Terminal</span>
        <div class="input-group">
          <input type="text" id="font-url-input" class="input-prism" placeholder="Google Fonts URL...">
          <app-button id="btn-inject" variant="secondary" style="font-size: 9px; height: 32px;">INJECT</app-button>
        </div>
      </div>

      <div id="font-list-container">
        <!-- Font cards injected here -->
      </div>
    `;
  }
}

customElements.define('typeface-engine', TypefaceEngine);
