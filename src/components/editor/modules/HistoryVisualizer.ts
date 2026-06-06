import { sharedSheet } from '../../../utils/shared-styles';
import eventBus from '../../../core/EventBus';
import { historyManager, HistorySnapshot } from '../../../domain/services/HistoryManager';
import { UISM } from '../../../core/UISoundManager';
import { AppState } from '../../../core/Store';
import { formatDate } from '../../../utils/utils';
import { HelpContentProvider } from '../../../utils/HelpContentProvider';
import { confirmDialog } from '../../common/confirm';

/**
 * HistoryVisualizer: Módulo "Time Machine" para navegação visual do histórico.
 */
export class HistoryVisualizer extends HTMLElement {
  private _abortController: AbortController | null = null;
  private _thumbnails: Map<number, string> = new Map();

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
    this.syncHistory();
  }

  disconnectedCallback() {
    this._abortController?.abort();
  }

  private setupListeners() {
    this._abortController = new AbortController();
    const { signal } = this._abortController;

    eventBus.on('state:change', (_state: AppState) => {
      // Re-sincroniza se o histórico mudar (canUndo/canRedo mudam no Store)
      this.syncHistory();
    }, { signal });

    // Listener de scroll para o som de "micro-tic"
    const container = this.shadowRoot?.getElementById('history-container');
    if (container) {
      let lastScrollTop = 0;
      container.addEventListener('scroll', () => {
        const diff = Math.abs(container.scrollTop - lastScrollTop);
        if (diff > 20) {
          UISM.playCustom({ freq: 1200, duration: 0.005, type: 'square', volume: 0.01 });
          lastScrollTop = container.scrollTop;
        }
      }, { signal });
    }

    // Clique delegado para os itens da linha do tempo
    this.shadowRoot?.addEventListener('click', async (e: Event) => {
      const target = e.target as HTMLElement;
      const item = target.closest('.history-node');
      if (item) {
        const index = parseInt(item.getAttribute('data-index') || '-1');
        if (!isNaN(index) && index >= 0) {
          eventBus.emit('history:jump', { index });
          UISM.play(UISM.enumPresets.CLICK);
        }
        return;
      }

      if (target.closest('#btn-clear-history')) {
        const ok = await confirmDialog.ask('Clear History Cache', 'Deseja limpar o cache do histórico? Isso economizará memória mas removerá os pontos de desfazer.', 
          {
            variant: 'danger',
            confirmText: 'Excluir snapshots',
            cancelText: 'Manter snapshots',
            countdown: 1,
          },);
        if (ok) {
          historyManager.clear();
          eventBus.emit('history:snapshot', { description: 'Genesis' });
          UISM.play(UISM.enumPresets.DELETE);
        }
      }
    }, { signal });
  }

  private syncHistory() {
    const history = historyManager.getFullHistory();
    const currentIndex = historyManager.getCurrentIndex();
    this.renderList(history, currentIndex);
  }

  /**
   * Gera miniatura a partir do ImageData (em memória)
   */
  private async getThumbnail(snapshot: HistorySnapshot): Promise<string> {
    if (this._thumbnails.has(snapshot.timestamp)) {
      return this._thumbnails.get(snapshot.timestamp)!
    }

    // Desenha em um canvas temporário pequeno
    const canvas = document.createElement('canvas');
    canvas.width = 120;
    canvas.height = 120;
    const ctx = canvas.getContext('2d')!;
    
    // Scale down image data
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = snapshot.imageData.width;
    tempCanvas.height = snapshot.imageData.height;
    tempCanvas.getContext('2d')!.putImageData(snapshot.imageData, 0, 0);

    ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
    const url = canvas.toDataURL('image/jpeg', 0.6);
    
    this._thumbnails.set(snapshot.timestamp, url);
    return url;
  }

  private async renderList(history: readonly HistorySnapshot[], currentIndex: number) {
    const container = this.shadowRoot?.getElementById('history-container');
    if (!container) return;

    if (history.length === 0) {
      container.innerHTML = '<div class="p-8 text-center text-text-muted text-[10px] font-mono">NO HISTORY DATA</div>';
      return;
    }

    // Task DET-05: Usar fragmento para evitar innerHTML dinâmico
    const fragment = document.createDocumentFragment();
    
    // Invertemos para mostrar o mais recente no topo
    const reversedHistory = [...history].reverse();
    const totalCount = history.length;

    for (let i = 0; i < reversedHistory.length; i++) {
      const snapshot = reversedHistory[i];
      const originalIndex = totalCount - 1 - i;
      const isCurrent = originalIndex === currentIndex;
      const isFuture = originalIndex > currentIndex;
      const thumb = await this.getThumbnail(snapshot);
      
      const dateStr = snapshot.timestamp ? `${formatDate(new Date(snapshot.timestamp).toISOString(), { onlyTime: true })} ~ ${formatDate(new Date(snapshot.timestamp).toISOString(), { isRelative: true })}` : '';

      const node = document.createElement('div');
      node.className = `history-node ${isCurrent ? 'active' : ''} ${isFuture ? 'future-branch' : ''}`;
      node.setAttribute('data-index', String(originalIndex));

      const line = document.createElement('div');
      line.className = 'node-line';
      const dot = document.createElement('div');
      dot.className = 'node-dot';
      line.appendChild(dot);

      const card = document.createElement('div');
      card.className = 'node-card';

      const thumbContainer = document.createElement('div');
      thumbContainer.className = 'node-thumb';
      const img = document.createElement('img');
      img.src = thumb;
      img.alt = 'Preview';
      thumbContainer.appendChild(img);
      if (isFuture) {
        const glitch = document.createElement('div');
        glitch.className = 'glitch-overlay';
        thumbContainer.appendChild(glitch);
      }

      const info = document.createElement('div');
      info.className = 'node-info';
      const desc = document.createElement('span');
      desc.className = 'node-desc';
      desc.textContent = snapshot.description; // ✅ Seguro
      const time = document.createElement('span');
      time.className = 'node-time';
      time.textContent = dateStr; // ✅ Seguro

      info.appendChild(desc);
      info.appendChild(time);
      card.appendChild(thumbContainer);
      card.appendChild(info);

      node.appendChild(line);
      node.appendChild(card);
      fragment.appendChild(node);
    }

    container.innerHTML = '';
    container.appendChild(fragment);
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #0a0c10;
          font-family: var(--font-sans);
          overflow: hidden; /* Mantém tudo dentro do host */
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid var(--color-border-ui);
          background: rgba(22, 25, 32, 0.5); /* Leve translúcido */
          backdrop-filter: blur(8px);
          z-index: 10;
        }

        .header-title {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--color-text-main);
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        #history-container {
          flex: 1;
          overflow-y: auto;
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          /* Sombra interna para dar profundidade na rolagem */
          box-shadow: inset 0 10px 20px -10px rgba(0,0,0,0.5), inset 0 -10px 20px -10px rgba(0,0,0,0.5);
        }

        /* -------------------------------------------
           A LINHA DO TEMPO (The Tape) 
           ------------------------------------------- */
        .history-node {
          display: flex;
          gap: 20px;
          padding: 0 20px;
          cursor: pointer;
          position: relative;
        }

        /* Para a linha não ficar com buracos, o margin e padding precisam alinhar */
        .node-line {
          width: 2px;
          /* Fio de luz base */
          background: var(--color-border-ui); 
          position: relative;
          display: flex;
          justify-content: center;
          margin-left: 14px;
        }

        /* Faz a linha do último nó não descer até o infinito */
        .history-node:last-child .node-line {
          background: linear-gradient(to bottom, var(--color-border-ui) 30px, transparent 100%);
        }

        .node-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--color-border-ui);
          border: 2px solid #0a0c10;
          position: absolute;
          top: 18px; /* Alinha com o meio da miniatura */
          z-index: 2;
          transition: all 0.3s var(--ease-spring);
        }

        /* O Nó Atual (Genesis) */
        .history-node.active .node-line {
          /* A linha a partir do ponto atual fica acesa */
          background: var(--color-accent-success);
          box-shadow: 0 0 8px var(--color-accent-success);
        }

        .history-node.active .node-dot {
          background: var(--color-accent-success);
          border-color: #0a0c10;
          box-shadow: 0 0 15px var(--color-accent-success);
          transform: scale(1.4);
        }

        /* -------------------------------------------
           O CARD DO SNAPSHOT 
           ------------------------------------------- */
        .node-card {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 16px;
          padding-bottom: 24px;
          transition: all 0.2s var(--ease-spring);
        }

        /* Miniatura (The Frame) */
        .node-thumb {
          width: 72px;
          height: 48px; /* Aspect Ratio Wide para parecer película de filme */
          background: #000;
          border: 1px solid var(--color-border-ui);
          border-radius: 6px;
          overflow: hidden;
          position: relative;
          transition: transform 0.4s var(--ease-spring), border-color 0.2s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }

        .node-thumb img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }

        /* Interações (Juice) */
        .history-node:hover .node-card {
          transform: translateX(4px); /* Puxa levemente para a direita */
        }
        
        .history-node:hover .node-thumb {
          transform: scale(1.1);
          border-color: var(--color-accent-primary);
          box-shadow: 0 8px 20px rgba(0,0,0,0.8), 0 0 10px rgba(99,102,241,0.3);
        }
        .history-node:hover .node-thumb img { opacity: 0.9; }

        .history-node:hover .node-dot {
          background: var(--color-accent-primary);
          box-shadow: 0 0 10px var(--color-accent-primary);
          transform: scale(1.2);
        }

        /* Estado Atual (Active) */
        .history-node.active .node-thumb {
          border-color: var(--color-accent-success);
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
        }
        .history-node.active .node-thumb img { opacity: 1; }

        /* Infos */
        .node-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .node-desc {
          font-size: 12px;
          font-weight: 600;
          color: var(--color-text-main);
          letter-spacing: 0.02em;
        }
        .node-time {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--color-text-muted);
          opacity: 0.7;
        }

        /* -------------------------------------------
           O FUTURO ALTERNATIVO (The Glitch)
           ------------------------------------------- */
        .future-branch {
          opacity: 0.35;
          transition: opacity 0.3s ease;
        }
        .future-branch:hover { opacity: 0.8; }
        
        .future-branch .node-thumb {
          filter: grayscale(1) sepia(0.5);
          border-color: rgba(255,255,255,0.1);
        }
        
        .glitch-overlay {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(244,63,94,0.15) 2px, rgba(244,63,94,0.15) 4px);
          pointer-events: none;
          mix-blend-mode: color-burn;
        }

        /* -------------------------------------------
           RODAPÉ (Danger Zone)
           ------------------------------------------- */
        .footer {
          padding: 16px 20px;
          border-top: 1px solid var(--color-border-ui);
          background: rgba(22, 25, 32, 0.8);
          z-index: 10;
        }
      </style>

      <div class="header">
        <span class="header-title">Chronological Tape</span>
        ${HelpContentProvider.buildTooltip('mod_history', 'bottom')}
      </div>

      <div id="history-container">
        <!-- List dynamic content -->
      </div>

      <div class="footer">
        <app-button id="btn-clear-history" variant="danger" style="width: 100%; font-size: 9px;">
          CLEAR HISTORY CACHE
        </app-button>
      </div>
    `;
  }
}

customElements.define('history-visualizer', HistoryVisualizer);
