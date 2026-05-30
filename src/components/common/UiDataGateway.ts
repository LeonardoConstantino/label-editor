import { sharedSheet } from '../../utils/shared-styles';
import { UISM } from '../../core/UISoundManager';
import { dataSourceParser } from '../../domain/services/DataSourceParser';
import { DataSanitizer } from '../../core/DataSanitizer';
import eventBus from '../../core/EventBus';

/**
 * UiDataGateway: Portal de entrada unificado para dados (Manual + Arquivo).
 * Implementa a 'Metamorfose Visual' para scanner de arquivos.
 */
export class UiDataGateway extends HTMLElement {
  private _isDragging = false;
  private _abortController: AbortController | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  disconnectedCallback() {
    this._abortController?.abort();
  }

  private setupListeners() {
    this._abortController = new AbortController();
    const { signal } = this._abortController;
    const root = this.shadowRoot!;

    const container = root.getElementById('gateway-container');
    const textarea = root.getElementById('manual-input') as HTMLTextAreaElement;
    const fileInput = root.getElementById('hidden-file-input') as HTMLInputElement;

    // 1. Drag & Drop Listeners
    container?.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!this._isDragging) {
        this._isDragging = true;
        this.updateVisualState();
      }
    }, { signal });

    container?.addEventListener('dragleave', (e) => {
      e.preventDefault();
      const rect = container.getBoundingClientRect();
      if (
        e.clientX <= rect.left || e.clientX >= rect.right ||
        e.clientY <= rect.top || e.clientY >= rect.bottom
      ) {
        this._isDragging = false;
        this.updateVisualState();
      }
    }, { signal });

    container?.addEventListener('drop', (e) => {
      e.preventDefault();
      this._isDragging = false;
      this.updateVisualState();
      
      const file = e.dataTransfer?.files[0];
      if (file) this.processFile(file);
    }, { signal });

    // 2. Click to Upload
    root.getElementById('btn-browse')?.addEventListener('click', () => {
      fileInput.click();
    }, { signal });

    textarea?.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        fileInput.click();
      }
    }, { signal });

    fileInput.addEventListener('change', () => {
      if (fileInput.files?.[0]) {
        this.processFile(fileInput.files[0]);
      }
    }, { signal });

    // 3. Manual Input
    textarea?.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        this.processManualText();
      }
    }, { signal });

    root.getElementById('btn-process-manual')?.addEventListener('click', () => {
      this.processManualText();
    }, { signal });
  }

  private async processFile(file: File) {
    try {
      const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
      let data: any[] = [];

      if (ext === '.csv') data = await dataSourceParser.parseCSV(file);
      else if (ext === '.json') data = await dataSourceParser.parseJSON(file);
      else if (ext === '.txt') data = await dataSourceParser.parseTXT(file);
      else throw new Error('Unsupported format. Use CSV, JSON or TXT.');

      if (data.length > 0) {
        this.emitDataReady(data, file.name);
        UISM.play(UISM.enumPresets.SUCCESS);
      } else {
        throw new Error('File is empty.');
      }
    } catch (err: any) {
      this.emitError(err.message);
      UISM.play(UISM.enumPresets.WARNING);
    }
  }

  private processManualText() {
    const textarea = this.shadowRoot?.getElementById('manual-input') as HTMLTextAreaElement;
    const text = textarea?.value.trim();
    
    if (!text) return;

    let lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    
    if (lines.length > DataSanitizer.MAX_RECORDS) {
      eventBus.emit('notify', { 
        type: 'warning', 
        message: `Input too large. Limited to ${DataSanitizer.MAX_RECORDS} lines.` 
      });
      lines = lines.slice(0, DataSanitizer.MAX_RECORDS);
    }

    const data = lines.map(line => DataSanitizer.sanitizeValue({ nome: line }));

    if (data.length > 0) {
      this.emitDataReady(data, 'Manual List');
      UISM.play(UISM.enumPresets.SUCCESS);
    }
  }

  private emitDataReady(data: any[], sourceName: string) {
    this.dispatchEvent(new CustomEvent('data-ready', {
      detail: { data, sourceName },
      bubbles: true,
      composed: true
    }));
  }

  private emitError(message: string) {
    this.dispatchEvent(new CustomEvent('data-error', {
      detail: { message },
      bubbles: true,
      composed: true
    }));
  }

  private updateVisualState() {
    const container = this.shadowRoot?.getElementById('gateway-container');
    if (container) {
      container.classList.toggle('is-dragging', this._isDragging);
    }
    if (this._isDragging) {
      UISM.playCustom({ freq: 800, duration: 0.1, type: 'sine', volume: 0.05 });
    }
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        @import "/src/styles/main.css";
        
        :host {
          display: block;
          width: 100%;
          min-height: 240px;
        }

        .gateway-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 240px;
          background: color-mix(in srgb, var(--color-canvas), black 30%);
          border: 1px solid var(--color-border-ui);
          border-radius: var(--spacing-3);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: all 0.3s var(--ease-spring);
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);
        }

        .gateway-container.is-dragging {
          border-color: var(--color-accent-primary);
          box-shadow: 0 0 20px color-mix(in srgb, var(--color-accent-primary), transparent 80%);
        }

        /* MODO NOTEPAD (BASE) */
        .manual-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        textarea {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--color-text-main);
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          line-height: 1.6;
          resize: none;
          padding: var(--spacing-4);
          transition: background 0.2s;
        }
        
        textarea:focus {
          background: color-mix(in srgb, var(--color-text-main), transparent 98%);
        }

        textarea::placeholder {
          color: var(--color-text-muted);
          opacity: 0.5;
        }

        /* A BARRA DE COMANDO (RODAPÉ) */
        .actions-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-2_5) var(--spacing-4);
          background: color-mix(in srgb, black, transparent 60%);
          border-top: 1px solid color-mix(in srgb, var(--color-text-main), transparent 95%);
          flex-shrink: 0;
        }

        /* BOTÕES LOCAIS (Corrigidos) */
        .cmd-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-2);
          height: 32px; /* Aumentei um pouco para respirar */
          padding: 0 var(--spacing-4);
          border-radius: var(--spacing-1_5);
          font-family: var(--font-sans);
          font-size: var(--text-xs);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.2s var(--ease-spring);
          user-select: none;
          
          /* AS 3 REGRAS SALVADORAS: */
          white-space: nowrap; /* Proíbe o texto de quebrar linha */
          flex-shrink: 0;      /* Proíbe o flexbox de esmagar o botão */
          min-width: max-content; /* Garante que ele tenha a largura do texto */
        }

        .cmd-btn:active {
          transform: translateY(1.5px) scale(0.95);
        }

        /* Variante Primária (Process List) */
        .cmd-btn.primary {
          background: var(--color-accent-primary-alpha, rgba(99, 102, 241, 0.15));
          color: var(--color-accent-primary);
          border: 1px solid var(--color-accent-primary-alpha, rgba(99, 102, 241, 0.3));
        }
        .cmd-btn.primary:hover {
          background: var(--color-accent-primary);
          color: #fff;
          box-shadow: 0 0 12px rgba(99, 102, 241, 0.4);
        }

        /* Variante Secundária (Browse) */
        .cmd-btn.secondary {
          background: rgba(255,255,255,0.05);
          color: var(--color-text-muted);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .cmd-btn.secondary:hover {
          background: rgba(255,255,255,0.1);
          color: var(--color-text-main);
        }

        /* MODO SCANNER (DRAGGING) */
        .scanner-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 12, 16, 0.9);
          backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 10;
        }

        .is-dragging .scanner-overlay {
          opacity: 1;
        }

        .scanner-line {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 2px;
          background: var(--color-accent-primary);
          box-shadow: 0 0 20px 4px var(--color-accent-primary);
          animation: scan 2s ease-in-out infinite alternate;
          display: none;
        }

        .is-dragging .scanner-line { display: block; }

        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(240px); }
        }

        .scanner-icon {
          color: var(--color-accent-primary);
          filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.6));
          transition: transform 0.5s var(--ease-spring);
        }
        .is-dragging .scanner-icon { transform: scale(1.3); }

        .scanner-text {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: bold;
          color: var(--color-text-main);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          text-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
        }

        #hidden-file-input { display: none; }
      </style>

      <div class="gateway-container" id="gateway-container">
        
        <!-- MODO NOTEPAD -->
        <div class="manual-area">
          <textarea id="manual-input" 
                    placeholder="Type or paste a list of data (one per line)...&#10;&#10;Or drop a CSV / JSON file anywhere in this box to inject it."></textarea>
          
          <div class="actions-bar">
            
            <!-- AÇÃO PRINCIPAL E ATALHO -->
              <button id="btn-process-manual" class="cmd-btn primary" title="Process the manual input (Ctrl + Enter)">
                <!-- Adicionado style inline garantindo o ícone -->
                <ui-icon name="lightning"></ui-icon> 
                Process List
              </button>
            
            <!-- AÇÃO SECUNDÁRIA -->
            <button id="btn-browse" class="cmd-btn secondary" title="Browse for a file (Ctrl + O)">
               <!-- Adicionado style inline garantindo o ícone -->
              <ui-icon name="folder-open"></ui-icon> 
              Browse
            </button>

          </div>
        </div>

        <!-- MODO SCANNER (DRAGGING) -->
        <div class="scanner-overlay">
          <div class="scanner-line"></div>
          <ui-icon name="database" style="--icon-size: 48px;" class="scanner-icon"></ui-icon>
          <div class="scanner-text">Drop to Inject Data</div>
        </div>

        <input type="file" id="hidden-file-input" accept=".csv,.json,.txt">
      </div>
    `;
  }
}

customElements.define('ui-data-gateway', UiDataGateway);
