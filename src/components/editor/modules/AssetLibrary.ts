import { sharedSheet } from '../../../utils/shared-styles';
import { bridgeTheme } from '../../../utils/theme-bridge';
import eventBus from '../../../core/EventBus';
import { db } from '../../../core/Database';
import { UISM } from '../../../core/UISoundManager';
import { imageProcessor } from '../../../utils/imageProcessor';
import { DataSanitizer } from '../../../core/DataSanitizer';
import { logger } from '../../../core/Logger';
import { HelpContentProvider } from '../../../utils/HelpContentProvider';
import { confirmDialog } from '../../common/confirm';
import { ICON_REGISTRY, IconDefinition } from '../../../constants/icons';

// Sub-componentes
import '../../common/icon';
import '../../common/AppButton';

export interface Asset {
  id: string;
  name: string;
  src: string; // base64
  category: 'all' | 'svg' | 'logo' | 'upload';
  width: number;
  height: number;
  createdAt: number;
}

export type AssetCategory = 'all' | 'svg' | 'logo' | 'upload' | 'symbols';
export type SymbolNiche = 'all' | 'alertas' | 'logistica' | 'sustentabilidade' | 'comercio' | 'geral';

const NICHE_KEYWORDS: Record<Exclude<SymbolNiche, 'all' | 'geral'>, string[]> = {
  alertas: ['alert', 'warning', 'danger', 'caution', 'ban', 'x-circle', 'skull', 'flame', 'zap', 'radiation', 'biohazard', 'hazard', 'safety'],
  logistica: ['package', 'box', 'truck', 'ship', 'plane', 'train', 'warehouse', 'container', 'weight', 'scale', 'ruler'],
  sustentabilidade: ['leaf', 'tree', 'sun', 'moon', 'cloud', 'snowflake', 'wind', 'recycle', 'iso', 'ce-mark', 'europe', 'certification'],
  comercio: ['tag', 'barcode', 'qr-code', 'receipt', 'cart', 'bag', 'store', 'shop', 'price', 'percent', 'discount', 'gift']
};

/**
 * AssetLibrary: Gerenciador de recursos visuais (The Parts Bin).
 * Implementa Drag & Drop nativo para o Canvas e feed virtual de símbolos (Tasks 78 & 101).
 */
export class AssetLibrary extends HTMLElement {
  private _abortController: AbortController | null = null;
  private _assets: Asset[] = [];
  private _activeCategory: AssetCategory = 'all';
  private _activeNiche: SymbolNiche = 'all';
  private _themeCleanup: (() => void) | null = null;

  // Virtual Feed State (Task 101)
  private _iconKeys: string[] = [];
  private _renderedIconCount: number = 0;
  private readonly _iconBatchSize: number = 48;
  private _iconObserver: IntersectionObserver | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  connectedCallback(): void {
    this._themeCleanup = bridgeTheme(this);
    this.renderSkeleton();
    this.loadAssets();
    this.setupListeners();
  }

  disconnectedCallback(): void {
    this._themeCleanup?.();
    this._abortController?.abort();
    this.disconnectIconObserver();
  }

  private disconnectIconObserver(): void {
    if (this._iconObserver) {
      this._iconObserver.disconnect();
      this._iconObserver = null;
    }
  }

  private setupListeners(): void {
    this._abortController = new AbortController();
    const { signal } = this._abortController;
    const root = this.shadowRoot!;

    // 1. Upload manual via Browse
    root.getElementById('btn-browse')?.addEventListener('click', () => {
      (root.getElementById('asset-upload-input') as HTMLInputElement).click();
    }, { signal });

    root.getElementById('asset-upload-input')?.addEventListener('change', async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) await this.handleFileUpload(file);
    }, { signal });

    // 2. Filtros de Categoria e Sub-Pills de Nicho
    root.addEventListener('click', async (e: Event) => {
      const target = e.target as HTMLElement;

      const filterBtn = target.closest<HTMLElement>('.filter-pill');
      if (filterBtn) {
        const cat = filterBtn.getAttribute('data-cat') as AssetCategory;
        if (cat) {
          this._activeCategory = cat;
          this.renderGrid();
          UISM.play(UISM.enumPresets.TAP);
          return;
        }
      }

      const nicheBtn = target.closest<HTMLElement>('.niche-pill');
      if (nicheBtn) {
        const niche = nicheBtn.getAttribute('data-niche') as SymbolNiche;
        if (niche) {
          this._activeNiche = niche;
          this.initIconFeed();
          UISM.play(UISM.enumPresets.TAP);
          return;
        }
      }

      const deleteBtn = target.closest<HTMLElement>('.btn-delete-asset');
      if (deleteBtn) {
        e.stopPropagation();
        const id = deleteBtn.getAttribute('data-id')!;
        const asset = this._assets.find(a => a.id === id);

        const isConfirmed = await confirmDialog.ask(
          'Delete Asset',
          `Are you sure you want to remove "${asset?.name}" from your library?`,
          {
            variant: 'danger',
            confirmText: 'Delete',
            cancelText: 'Cancel',
            countdown: 1
          }
        );

        if (isConfirmed) {
          this.deleteAsset(id);
        }
        return;
      }

      const editBtn = target.closest<HTMLElement>('.btn-edit-asset');
      if (editBtn) {
        e.stopPropagation();
        const id = editBtn.getAttribute('data-id')!;
        const asset = this._assets.find(a => a.id === id);
        if (asset) {
          this.openEditor(asset);
        }
      }
    }, { signal });

    // 3. Drag Logic (Delegação para imagens e ícones)
    root.getElementById('asset-grid')?.addEventListener('dragstart', (e: DragEvent) => {
      const target = e.target as HTMLElement;

      // Arraste de Ícones (Task 101)
      const iconItem = target.closest<HTMLElement>('.icon-cell');
      if (iconItem && e.dataTransfer) {
        const iconKey = iconItem.getAttribute('data-icon-key');
        const iconName = iconItem.getAttribute('data-icon-name') || iconKey || 'Icon';
        if (iconKey) {
          e.dataTransfer.setData('application/json', JSON.stringify({
            type: 'icon',
            iconName: iconKey,
            name: iconName,
            widthPx: 60,
            heightPx: 60
          }));
          e.dataTransfer.effectAllowed = 'copy';
          UISM.playCustom({ freq: 800, duration: 0.05, type: 'sawtooth', volume: 0.02 });
          iconItem.classList.add('is-dragging');
        }
        return;
      }

      // Arraste de Imagens existentes
      const assetItem = target.closest<HTMLElement>('.asset-item');
      if (assetItem && e.dataTransfer) {
        const id = assetItem.getAttribute('data-id');
        const asset = this._assets.find(a => a.id === id);
        if (asset) {
          e.dataTransfer.setData('application/json', JSON.stringify({
            type: 'image',
            src: asset.src,
            name: asset.name,
            widthPx: asset.width,
            heightPx: asset.height
          }));
          e.dataTransfer.effectAllowed = 'copy';
          UISM.playCustom({ freq: 800, duration: 0.05, type: 'sawtooth', volume: 0.02 });
          assetItem.classList.add('is-dragging');
        }
      }
    }, { signal });

    root.getElementById('asset-grid')?.addEventListener('dragend', (e: DragEvent) => {
      const target = e.target as HTMLElement;
      target.closest('.icon-cell')?.classList.remove('is-dragging');
      target.closest('.asset-item')?.classList.remove('is-dragging');
    }, { signal });

    const nicheBar = root.querySelector<HTMLElement>('.niche-bar');
    nicheBar?.addEventListener('wheel', (evt: WheelEvent) => {
      // If vertical scroll is detected, convert it to horizontal scroll
      if (evt.deltaY !== 0) {
        evt.preventDefault();
        nicheBar.scrollLeft += evt.deltaY;
      }
    }, { passive: false, signal });

    eventBus.on('ui:modal:close', (data: { id?: string }) => {
      if (data?.id === 'image-editor-modal') {
        this.loadAssets();
      }
    }, { signal });
  }

  private openEditor(asset: Asset): void {
    const modal = document.getElementById('image-editor-modal') as HTMLElement & { asset?: Asset; setAttribute(name: string, value: string): void };
    const editor = modal?.querySelector('micro-image-editor') as HTMLElement & { asset?: Asset };
    if (modal && editor) {
      editor.asset = asset;
      modal.setAttribute('open', '');
      UISM.play(UISM.enumPresets.OPEN);
    }
  }

  private async loadAssets(): Promise<void> {
    try {
      this._assets = await db.getAll<Asset>('assets');
      this.renderGrid();
    } catch (err) {
      logger.error('AssetLibrary', 'Failed to load assets', err);
    }
  }

  private async handleFileUpload(file: File): Promise<void> {
    try {
      const fileName = file.name.toLowerCase();

      // Validação de Segurança para SVGs (Task 87)
      if (fileName.endsWith('.svg')) {
        const text = await file.text();
        if (!DataSanitizer.isSafeSVG(text)) {
          eventBus.emit('notify', {
            type: 'error',
            message: 'Unsafe SVG detected. Script injection blocked.'
          });
          return;
        }
      }

      const processed = await imageProcessor.process(file, 0.8, 800);

      let category: Asset['category'] = 'upload';
      if (fileName.endsWith('.svg')) {
        category = 'svg';
      } else if (fileName.includes('logo')) {
        category = 'logo';
      }

      const newAsset: Asset = {
        id: crypto.randomUUID(),
        name: file.name,
        src: processed.src,
        category,
        width: processed.width,
        height: processed.height,
        createdAt: Date.now()
      };

      await db.put('assets', newAsset);
      this._assets.unshift(newAsset);
      this.renderGrid();
      UISM.play(UISM.enumPresets.SUCCESS);

      if (category === 'logo' || category === 'svg') {
        eventBus.emit('notify', {
          type: 'info',
          message: `Asset categorized as ${category.toUpperCase()} based on name.`
        });
      }
    } catch (err) {
      eventBus.emit('notify', { type: 'error', message: 'Upload failed' });
    }
  }

  private async deleteAsset(id: string): Promise<void> {
    await db.delete('assets', id);
    this._assets = this._assets.filter(a => a.id !== id);
    this.renderGrid();
    UISM.play(UISM.enumPresets.DELETE);
  }

  /**
   * Constrói SVG DOM adaptativo ao tema usando currentColor (Task 101).
   */
  private buildAdaptiveSvg(def: IconDefinition): SVGSVGElement {
    const [vx, vy, vw, vh] = def.viewBox;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `${vx} ${vy} ${vw} ${vh}`);
    svg.setAttribute('class', 'icon-svg');

    for (let i = 0; i < def.paths.length; i++) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', def.paths[i]);
      if (def.stroke) {
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'currentColor');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
      } else {
        path.setAttribute('fill', 'currentColor');
      }
      svg.appendChild(path);
    }

    return svg;
  }

  /**
   * Inicializa o feed de ícones da categoria 'symbols' com suporte a Nichos.
   */
  private initIconFeed(): void {
    const grid = this.shadowRoot?.getElementById('asset-grid');
    if (!grid) return;

    this.disconnectIconObserver();

    // Sincroniza pills de nicho
    this.shadowRoot!.querySelectorAll('.niche-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-niche') === this._activeNiche);
    });

    // Filtra chaves de acordo com o nicho ativo
    const allKeys = Object.keys(ICON_REGISTRY);

    if (this._activeNiche === 'all') {
      this._iconKeys = allKeys;
    } else if (this._activeNiche === 'geral') {
      // Itens que não caíram em nenhum nicho específico
      const specializedWords = new Set<string>();
      Object.values(NICHE_KEYWORDS).forEach(words => words.forEach(w => specializedWords.add(w)));

      this._iconKeys = allKeys.filter(key => {
        const def = ICON_REGISTRY[key];
        const tokens = [key, def.name.toLowerCase(), ...(def.tags || []).map(t => t.toLowerCase())];
        return !tokens.some(t => [...specializedWords].some(sw => t.includes(sw)));
      });
    } else {
      const keywords = NICHE_KEYWORDS[this._activeNiche];
      this._iconKeys = allKeys.filter(key => {
        const def = ICON_REGISTRY[key];
        const tokens = [key, def.name.toLowerCase(), ...(def.tags || []).map(t => t.toLowerCase())];
        return tokens.some(t => keywords.some(kw => t.includes(kw)));
      });
    }

    grid.className = 'icon-mode';
    grid.innerHTML = '';
    this._renderedIconCount = 0;

    if (this._iconKeys.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <ui-icon name="alert-triangle" style="--icon-size: 32px; opacity: 0.2;"></ui-icon>
          <p>Nenhum símbolo encontrado neste nicho</p>
        </div>
      `;
      return;
    }

    // Cria contêiner para os itens e sentinela de scroll
    const container = document.createElement('div');
    container.id = 'icon-container';
    container.className = 'icon-cells-grid';
    grid.appendChild(container);

    const sentinel = document.createElement('div');
    sentinel.id = 'icon-scroll-sentinel';
    grid.appendChild(sentinel);

    // Renderiza primeiro lote de 48 ícones
    this.appendIconBatch();

    // Configura IntersectionObserver para scroll infinito a 60 FPS
    this._iconObserver = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        this.appendIconBatch();
      }
    }, {
      root: grid,
      rootMargin: '200px',
      threshold: 0.1
    });

    this._iconObserver.observe(sentinel);
  }

  /**
   * Adiciona o próximo lote de 48 ícones no DOM de forma atômica.
   */
  private appendIconBatch(): void {
    const container = this.shadowRoot?.getElementById('icon-container');
    if (!container) return;

    if (this._renderedIconCount >= this._iconKeys.length) {
      this.disconnectIconObserver();
      return;
    }

    const nextBatch = this._iconKeys.slice(
      this._renderedIconCount,
      this._renderedIconCount + this._iconBatchSize
    );

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < nextBatch.length; i++) {
      const key = nextBatch[i];
      const def = ICON_REGISTRY[key];
      if (!def) continue;

      const cell = document.createElement('div');
      cell.className = 'icon-cell';
      cell.draggable = true;
      cell.setAttribute('data-icon-key', key);
      cell.setAttribute('data-icon-name', def.name);
      cell.title = `${def.name} (${key})`;

      const svgEl = this.buildAdaptiveSvg(def);
      const label = document.createElement('span');
      label.className = 'icon-label';
      label.textContent = def.name;

      cell.appendChild(svgEl);
      cell.appendChild(label);
      fragment.appendChild(cell);
    }

    container.appendChild(fragment);
    this._renderedIconCount += nextBatch.length;

    if (this._renderedIconCount >= this._iconKeys.length) {
      this.disconnectIconObserver();
    }
  }

  private renderGrid(): void {
    const shadow = this.shadowRoot;
    if (!shadow) return;

    const grid = shadow.getElementById('asset-grid');
    if (!grid) return;

    this.disconnectIconObserver();

    // Sincroniza visual das pills principais
    shadow.querySelectorAll('.filter-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === this._activeCategory);
    });

    const uploadZone = shadow.querySelector<HTMLElement>('.upload-zone');
    const nicheBar = shadow.querySelector<HTMLElement>('.niche-bar');

    // Alterna visibilidade da barra de upload e sub-filtros de nicho
    if (this._activeCategory === 'symbols') {
      if (uploadZone) uploadZone.style.display = 'none';
      if (nicheBar) nicheBar.style.display = 'flex';
      this.initIconFeed();
      return;
    }

    // Modo Imagem / Uploads
    if (uploadZone) uploadZone.style.display = 'block';
    if (nicheBar) nicheBar.style.display = 'none';
    grid.className = 'asset-mode';

    const filtered = this._activeCategory === 'all'
      ? this._assets
      : this._assets.filter(a => a.category === this._activeCategory);

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <ui-icon name="image" style="--icon-size: 32px; opacity: 0.1;"></ui-icon>
          <p>No assets in this category</p>
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();

    filtered.forEach(asset => {
      const item = document.createElement('div');
      item.className = 'asset-item';
      item.draggable = true;
      item.setAttribute('data-id', asset.id);

      const preview = document.createElement('div');
      preview.className = 'asset-preview';

      const img = document.createElement('img');
      img.src = asset.src;
      img.alt = asset.name;
      img.loading = 'lazy';
      preview.appendChild(img);

      const overlay = document.createElement('div');
      overlay.className = 'asset-overlay';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'asset-name';
      nameSpan.textContent = asset.name;

      const actions = document.createElement('div');
      actions.className = 'flex gap-1';

      const btnEdit = document.createElement('button');
      btnEdit.className = 'btn-action btn-edit-asset';
      btnEdit.setAttribute('data-id', asset.id);
      btnEdit.title = 'Edit Image';
      btnEdit.innerHTML = '<ui-icon name="edit" size="xs" style="transform: scale(0.8)"></ui-icon>';

      const btnDel = document.createElement('button');
      btnDel.className = 'btn-action btn-delete-asset';
      btnDel.setAttribute('data-id', asset.id);
      btnDel.title = 'Delete';
      btnDel.innerHTML = '<ui-icon name="trash" size="xs"></ui-icon>';

      actions.appendChild(btnEdit);
      actions.appendChild(btnDel);

      overlay.appendChild(nameSpan);
      overlay.appendChild(actions);

      item.appendChild(preview);
      item.appendChild(overlay);

      fragment.appendChild(item);
    });

    grid.innerHTML = '';
    grid.appendChild(fragment);
  }

  private renderSkeleton(): void {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host { 
          display: flex; 
          flex-direction: column; 
          height: 100%; 
          background: var(--color-canvas); 
          font-family: var(--font-sans); 
          color: var(--color-text-main);
        }

        .header { 
          display: flex; 
          align-items: center; 
          justify-content: space-between; 
          padding: 12px 20px; 
          border-bottom: 1px solid var(--color-border-ui); 
          background: color-mix(in srgb, var(--color-canvas), black 20%); 
        }
        .header-title { 
          font-family: var(--font-mono); 
          font-size: 10px; 
          font-weight: 700; 
          color: var(--color-text-muted); 
          text-transform: uppercase; 
          letter-spacing: 0.1em; 
        }

        .upload-zone { 
          padding: 16px 20px; 
          border-bottom: 1px solid var(--color-border-ui); 
          background: linear-gradient(to bottom, var(--color-surface-solid), var(--color-canvas)); 
        }
        .drop-target { 
          border: 1px dashed var(--color-border-ui); 
          border-radius: 12px; 
          height: 64px; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          gap: 6px; 
          color: var(--color-text-muted); 
          cursor: pointer; 
          transition: all 0.3s; 
        }
        .drop-target:hover { 
          border-color: var(--color-accent-primary); 
          background: color-mix(in srgb, var(--color-accent-primary), transparent 95%); 
          color: var(--color-text-main); 
        }
        .drop-target ui-icon { --icon-size: 20px; opacity: 0.5; }

        .filter-bar { 
          display: flex; 
          gap: 6px; 
          padding: 10px 16px; 
          overflow-x: auto; 
          scrollbar-width: none; 
          border-bottom: 1px solid var(--color-border-ui); 
        }
        .filter-pill { 
          padding: 4px 10px; 
          border-radius: 20px; 
          background: color-mix(in srgb, var(--color-text-main), transparent 97%); 
          border: 1px solid var(--color-border-ui); 
          color: var(--color-text-muted); 
          font-family: var(--font-mono); 
          font-size: 9px; 
          text-transform: uppercase; 
          cursor: pointer; 
          white-space: nowrap; 
          transition: all 0.2s; 
        }
        .filter-pill:hover { 
          background: color-mix(in srgb, var(--color-text-main), transparent 92%); 
          color: var(--color-text-main);
        }
        .filter-pill.active { 
          background: var(--color-accent-primary); 
          border-color: var(--color-accent-primary); 
          color: #ffffff; 
          box-shadow: 0 0 10px color-mix(in srgb, var(--color-accent-primary), transparent 80%); 
        }

        /* Sub-filtros por Nicho para Símbolos (Task 101) */
        .niche-bar {
          display: none;
          gap: 6px;
          padding: 8px 16px;
          background: color-mix(in srgb, var(--color-canvas), black 10%);
          border-bottom: 1px solid var(--color-border-ui);
          overflow-x: auto;

          /* Cria o efeito de fade nas bordas para indicar scroll */
          mask-image: linear-gradient(to right, 
            transparent, 
            var(--color-text-main) 20px, 
            var(--color-text-main) calc(100% - 20px), 
            transparent
          );
          -webkit-mask-image: linear-gradient(to right, 
            transparent, 
            var(--color-text-main) 20px, 
            var(--color-text-main) calc(100% - 20px), 
            transparent
          );
          
          /* Esconde a scrollbar por padrão */
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
        }

        /* Esconde a scrollbar no Chrome/Safari por padrão */
        .niche-bar::-webkit-scrollbar {
          height: 4px;
          display: none;
        }

        /* 2. Scrollbar que aparece no Hover */
        .niche-bar:hover {
          scrollbar-width: thin; /* Firefox */
        }

        .niche-bar:hover::-webkit-scrollbar {
          display: block;
        }
          
        .niche-pill {
          padding: 3px 8px;
          border-radius: 6px;
          background: var(--color-surface-elevated);
          border: 1px solid var(--color-border-ui);
          color: var(--color-text-muted);
          font-family: var(--font-mono);
          font-size: 8.5px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s ease;
        }
        .niche-pill:hover {
          color: var(--color-text-main);
          border-color: var(--color-accent-primary);
        }
        .niche-pill.active {
          background: color-mix(in srgb, var(--color-accent-primary) 20%, var(--color-surface-elevated));
          border-color: var(--color-accent-primary);
          color: var(--color-accent-primary);
          font-weight: 700;
        }

        #asset-grid { 
          flex: 1; 
          overflow-y: auto; 
          padding: 16px; 
          align-content: start; 
        }

        /* Modo Imagem (Grid 2 colunas) */
        #asset-grid.asset-mode {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .asset-item { 
          aspect-ratio: 1; 
          background: var(--color-surface-solid); 
          border: 1px solid var(--color-border-ui); 
          border-radius: 10px; 
          overflow: hidden; 
          position: relative; 
          cursor: grab; 
          transition: all 0.25s var(--ease-spring); 
        }
        .asset-item:hover { 
          transform: scale(1.04); 
          border-color: var(--color-accent-primary); 
          box-shadow: 0 4px 12px rgba(0,0,0,0.3); 
        }
        .asset-item.is-dragging { opacity: 0.35; transform: scale(0.9); }
        .asset-preview { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 10px; }
        .asset-preview img { max-width: 100%; max-height: 100%; object-fit: contain; pointer-events: none; }
        .asset-overlay { 
          position: absolute; 
          inset: 0; 
          background: linear-gradient(to top, rgba(0,0,0,0.85), transparent); 
          opacity: 0; 
          transition: opacity 0.2s; 
          display: flex; 
          align-items: flex-end; 
          justify-content: space-between; 
          padding: 8px; 
        }
        .asset-item:hover .asset-overlay { opacity: 1; }
        .asset-name { font-size: 8px; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 60%; }
        .btn-action { width: 22px; height: 22px; border: none; border-radius: 4px; cursor: pointer; display: grid; place-items: center; transition: all 0.2s; }
        .btn-edit-asset { background: color-mix(in srgb, var(--color-accent-primary), transparent 80%); color: var(--color-accent-primary); }
        .btn-edit-asset:hover { background: var(--color-accent-primary); color: white; }
        .btn-delete-asset { background: color-mix(in srgb, var(--color-accent-danger), transparent 80%); color: var(--color-accent-danger); }
        .btn-delete-asset:hover { background: var(--color-accent-danger); color: white; }

        /* Modo Símbolos & Ícones (Grid de 4 colunas - Task 101) */
        #asset-grid.icon-mode {
          display: flex;
          flex-direction: column;
          padding: 12px 14px;
        }
        .icon-cells-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
        }

        /* Colorização Dinâmica no DOM via Tema (Task 101) */
        .icon-cell {
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 4px;
          background: var(--color-surface-elevated);
          border: 1px solid var(--color-border-ui);
          border-radius: 8px;
          color: var(--color-text-muted);
          cursor: grab;
          user-select: none;
          transition: color 0.15s ease, border-color 0.15s ease, background-color 0.15s ease, transform 0.15s var(--ease-spring);
        }
        .icon-cell:hover {
          color: var(--color-text-main);
          border-color: var(--color-accent-primary);
          background-color: color-mix(in srgb, var(--color-accent-primary) 8%, var(--color-surface-elevated));
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.25);
        }
        .icon-cell.is-dragging {
          opacity: 0.35;
          transform: scale(0.92);
        }
        .icon-svg {
          width: 24px;
          height: 24px;
          display: block;
          pointer-events: none;
        }
        .icon-label {
          font-family: var(--font-mono);
          font-size: 8px;
          color: inherit;
          max-width: 90%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          pointer-events: none;
        }

        #icon-scroll-sentinel {
          height: 16px;
          width: 100%;
        }

        .empty-state { 
          grid-column: 1 / -1; 
          padding: 40px 0; 
          text-align: center; 
          color: var(--color-text-muted); 
          font-size: 11px; 
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        #asset-upload-input { display: none; }
      </style>

      <div class="header">
        <span class="header-title">Asset Library</span>
        ${HelpContentProvider.buildTooltip('mod_assets', 'bottom')}
      </div>

      <div class="upload-zone">
        <div class="drop-target" id="btn-browse">
           <ui-icon name="image"></ui-icon>
           <span class="text-[10px] font-mono uppercase opacity-70">Browse Files</span>
        </div>
        <input type="file" id="asset-upload-input" accept="image/*,.svg">
      </div>

      <div class="filter-bar">
        <button class="filter-pill active" data-cat="all">All</button>
        <button class="filter-pill" data-cat="symbols">Symbols</button>
        <button class="filter-pill" data-cat="svg">SVGs</button>
        <button class="filter-pill" data-cat="logo">Logos</button>
        <button class="filter-pill" data-cat="upload">Uploads</button>
      </div>

      <div class="niche-bar">
        <button class="niche-pill active" data-niche="all">Todos</button>
        <button class="niche-pill" data-niche="alertas">Alertas</button>
        <button class="niche-pill" data-niche="logistica">Logística</button>
        <button class="niche-pill" data-niche="sustentabilidade">Sustentabilidade</button>
        <button class="niche-pill" data-niche="comercio">Comércio</button>
        <button class="niche-pill" data-niche="geral">Geral</button>
      </div>

      <div id="asset-grid" class="asset-mode">
        <!-- Assets & Icons grid here -->
      </div>
    `;
  }
}

customElements.define('asset-library', AssetLibrary);
