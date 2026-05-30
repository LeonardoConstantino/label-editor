import { sharedSheet } from '../../../utils/shared-styles';
import eventBus from '../../../core/EventBus';
import { db } from '../../../core/Database';
import { UISM } from '../../../core/UISoundManager';
import { imageProcessor } from '../../../utils/imageProcessor';
import { DataSanitizer } from '../../../core/DataSanitizer';
import { logger } from '../../../core/Logger';
import { HelpContentProvider } from '../../../utils/HelpContentProvider';
import { confirmDialog } from '../../common/confirm';

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

/**
 * AssetLibrary: Gerenciador de recursos visuais (The Parts Bin).
 * Implementa Drag & Drop nativo para o Canvas (Task 78).
 */
export class AssetLibrary extends HTMLElement {
  private _abortController: AbortController | null = null;
  private _assets: Asset[] = [];
  private _activeCategory: string = 'all';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  connectedCallback() {
    this.renderSkeleton();
    this.loadAssets();
    this.setupListeners();
  }

  disconnectedCallback() {
    this._abortController?.abort();
  }

  private setupListeners() {
    this._abortController = new AbortController();
    const { signal } = this._abortController;
    const root = this.shadowRoot!;

    // 1. Upload manual via Browse
    root.getElementById('btn-browse')?.addEventListener('click', () => {
      (root.getElementById('asset-upload-input') as HTMLInputElement).click();
    }, { signal });

    root.getElementById('asset-upload-input')?.addEventListener('change', async (e: any) => {
      const file = e.target.files?.[0];
      if (file) await this.handleFileUpload(file);
    }, { signal });

    // 2. Filtros e Ações
    root.addEventListener('click', async (e: Event) => {
      const target = e.target as HTMLElement;
      
      const filterBtn = target.closest('.filter-pill');
      if (filterBtn) {
        this._activeCategory = filterBtn.getAttribute('data-cat') || 'all';
        this.renderGrid();
        UISM.play(UISM.enumPresets.TAP);
        return;
      }

      const deleteBtn = target.closest('.btn-delete-asset');
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

      const editBtn = target.closest('.btn-edit-asset');
      if (editBtn) {
        e.stopPropagation();
        const id = editBtn.getAttribute('data-id')!;
        const asset = this._assets.find(a => a.id === id);
        if (asset) {
          this.openEditor(asset);
        }
      }
    }, { signal });

    // 3. Drag Logic
    root.getElementById('asset-grid')?.addEventListener('dragstart', (e: DragEvent) => {
      const target = e.target as HTMLElement;
      const item = target.closest('.asset-item');
      if (item && e.dataTransfer) {
        const id = item.getAttribute('data-id');
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
          item.classList.add('is-dragging');
        }
      }
    }, { signal });

    root.getElementById('asset-grid')?.addEventListener('dragend', (e: DragEvent) => {
      const target = e.target as HTMLElement;
      target.closest('.asset-item')?.classList.remove('is-dragging');
    }, { signal });

    
    // const modal = document.getElementById('image-editor-modal') as any;
    eventBus.on('ui:modal:close', (data) => {
      if (data.id === 'image-editor-modal') {
        this.loadAssets();
      }
    }, { signal });
  }

  private openEditor(asset: Asset) {
    const modal = document.getElementById('image-editor-modal') as any;
    const editor = modal?.querySelector('micro-image-editor') as any;
    if (modal && editor) {
      editor.asset = asset;
      modal.setAttribute('open', '');
      UISM.play(UISM.enumPresets.OPEN);
    }
  }

  private async loadAssets() {
    try {
      this._assets = await db.getAll<Asset>('assets');
      this.renderGrid();
    } catch (err) {
      logger.error('AssetLibrary', 'Failed to load assets', err);
    }
  }

  private async handleFileUpload(file: File) {
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
      
      // Lógica de Categorização Inteligente
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

  private async deleteAsset(id: string) {
    await db.delete('assets', id);
    this._assets = this._assets.filter(a => a.id !== id);
    this.renderGrid();
    UISM.play(UISM.enumPresets.DELETE);
  }

  private renderGrid() {
    const grid = this.shadowRoot?.getElementById('asset-grid');
    if (!grid) return;

    this.shadowRoot!.querySelectorAll('.filter-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === this._activeCategory);
    });

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

    grid.innerHTML = filtered.map(asset => {
      const safeId = DataSanitizer.escapeHTML(asset.id);
      const safeName = DataSanitizer.escapeHTML(asset.name);
      return `
        <div class="asset-item" draggable="true" data-id="${safeId}">
          <div class="asset-preview">
            <img src="${asset.src}" alt="${safeName}" loading="lazy">
          </div>
          <div class="asset-overlay">
             <span class="asset-name">${safeName}</span>
             <div class="flex gap-1">
               <button class="btn-action btn-edit-asset" data-id="${safeId}" title="Edit Image">
                  <ui-icon name="edit" size="xs" style="transform: scale(0.8)"></ui-icon>
               </button>
               <button class="btn-action btn-delete-asset" data-id="${safeId}" title="Delete">
                  <ui-icon name="trash" size="xs"></ui-icon>
               </button>
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
        :host { display: flex; flex-direction: column; height: 100%; background: var(--color-canvas); font-family: var(--font-sans); }
        .header { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; border-bottom: 1px solid var(--color-border-ui); background: color-mix(in srgb, var(--color-canvas), black 20%); }
        .header-title { font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.1em; }
        .upload-zone { padding: 20px; border-bottom: 1px solid var(--color-border-ui); background: linear-gradient(to bottom, var(--color-surface-solid), var(--color-canvas)); }
        .drop-target { border: 1px dashed var(--color-border-ui); border-radius: 12px; height: 80px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: var(--color-text-muted); cursor: pointer; transition: all 0.3s; }
        .drop-target:hover { border-color: var(--color-accent-primary); background: color-mix(in srgb, var(--color-accent-primary), transparent 95%); color: var(--color-text-main); }
        .drop-target ui-icon { --icon-size: 20px; opacity: 0.5; }
        .filter-bar { display: flex; gap: 8px; padding: 12px 20px; overflow-x: auto; scrollbar-width: none; border-bottom: 1px solid var(--color-border-ui); }
        .filter-pill { padding: 4px 12px; border-radius: 20px; background: color-mix(in srgb, var(--color-text-main), transparent 97%); border: 1px solid var(--color-border-ui); color: var(--color-text-muted); font-family: var(--font-mono); font-size: 9px; text-transform: uppercase; cursor: pointer; white-space: nowrap; transition: all 0.2s; }
        .filter-pill:hover { background: color-mix(in srgb, var(--color-text-main), transparent 92%); }
        .filter-pill.active { background: var(--color-accent-primary); border-color: var(--color-accent-primary); color: white; box-shadow: 0 0 10px color-mix(in srgb, var(--color-accent-primary), transparent 80%); }
        #asset-grid { flex: 1; overflow-y: auto; padding: 20px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; align-content: start; }
        .asset-item { aspect-ratio: 1; background: var(--color-surface-solid); border: 1px solid var(--color-border-ui); border-radius: 10px; overflow: hidden; position: relative; cursor: grab; transition: all 0.3s var(--ease-spring); }
        .asset-item:hover { transform: scale(1.05); border-color: var(--color-accent-primary); box-shadow: 0 5px 15px rgba(0,0,0,0.4); }
        .asset-item.is-dragging { opacity: 0.4; transform: scale(0.9); }
        .asset-preview { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 10px; }
        .asset-preview img { max-width: 100%; max-height: 100%; object-fit: contain; pointer-events: none; }
        .asset-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); opacity: 0; transition: opacity 0.2s; display: flex; align-items: flex-end; justify-content: space-between; padding: 8px; }
        .asset-item:hover .asset-overlay { opacity: 1; }
        .asset-name { font-size: 8px; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 60%; }
        
        .btn-action { width: 22px; height: 22px; border: none; border-radius: 4px; cursor: pointer; display: grid; place-items: center; transition: all 0.2s; }
        .btn-edit-asset { background: color-mix(in srgb, var(--color-accent-primary), transparent 80%); color: var(--color-accent-primary); }
        .btn-edit-asset:hover { background: var(--color-accent-primary); color: white; }
        .btn-delete-asset { background: color-mix(in srgb, var(--color-accent-danger), transparent 80%); color: var(--color-accent-danger); }
        .btn-delete-asset:hover { background: var(--color-accent-danger); color: white; }
        .empty-state { grid-column: 1 / -1; padding: 40px 0; text-align: center; color: var(--color-text-muted); font-size: 11px; }
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
        <button class="filter-pill" data-cat="svg">SVGs</button>
        <button class="filter-pill" data-cat="logo">Logos</button>
        <button class="filter-pill" data-cat="upload">Uploads</button>
      </div>

      <div id="asset-grid">
        <!-- Assets grid here -->
      </div>
    `;
  }
}

customElements.define('asset-library', AssetLibrary);
