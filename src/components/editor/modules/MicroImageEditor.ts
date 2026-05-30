import { sharedSheet } from '../../../utils/shared-styles';
import eventBus from '../../../core/EventBus';
import { store } from '../../../core/Store';
import { db } from '../../../core/Database';
import { UISM } from '../../../core/UISoundManager';
import { logger } from '../../../core/Logger';
import { Asset } from './AssetLibrary';

// Sub-componentes
import '../../common/icon';
import '../../common/AppButton';

/**
 * MicroImageEditor: Utilitário profissional para processar imagens da Asset Library (Task 86).
 * V3: Crop Interativo com Feedback Imediato e Filtros via Checkbox.
 */
export class MicroImageEditor extends HTMLElement {
  private _asset: Asset | null = null;
  private _abortController: AbortController | null = null;
  
  // Canvases
  private _previewCanvas: HTMLCanvasElement | null = null;
  private _previewCtx: CanvasRenderingContext2D | null = null;
  
  // O buffer contém a imagem com rotação e filtros, mas SEM o overlay de crop
  private _bufferCanvas: HTMLCanvasElement = document.createElement('canvas');
  private _bufferCtx = this._bufferCanvas.getContext('2d', { alpha: true })!;
  
  private _image: HTMLImageElement | null = null;

  // Estado da edição
  private _rotation = 0;
  private _grayscale = false;
  private _invert = false;
  private _isCropping = false;
  
  // Crop area (em pixels do buffer)
  private _cropRect = { x: 0, y: 0, w: 0, h: 0 };
  private _isDrawingCrop = false;
  private _startPos = { x: 0, y: 0 };

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  set asset(asset: Asset) {
    this._asset = asset;
    this.resetState();
    if (this.isConnected) this.loadImage(); // guard
  }

  connectedCallback() {
    this.renderSkeleton();
    this.setupListeners();
    this.syncUI();
    if (this._asset) this.loadImage(); // carrega se foi setado antes
  }

  disconnectedCallback() {
    this._abortController?.abort();
  }

  private resetState() {
    this._rotation = 0;
    this._grayscale = false;
    this._invert = false;
    this._isCropping = false;
    this._isDrawingCrop = false;
    this._cropRect = { x: 0, y: 0, w: 0, h: 0 };
  }

  private setupListeners() {
    this._abortController?.abort(); // garante limpeza antes de re-registrar
    this._abortController = new AbortController();

    const { signal } = this._abortController;
    const root = this.shadowRoot!;

    // 1. Geometric Tools
    root.getElementById('btn-rotate-cw')?.addEventListener('click', () => {
      this._rotation = (this._rotation + 90) % 360;
      this.applyProcessing();
      UISM.play(UISM.enumPresets.TAP);
    }, { signal });

    root.getElementById('btn-toggle-crop')?.addEventListener('click', () => {
      this._isCropping = !this._isCropping;
      this.syncUI();
      this.drawPreview();
      UISM.play(UISM.enumPresets.SELECT);
    }, { signal });

    // 2. Filtros
    root.getElementById('chk-grayscale')?.addEventListener('change', (e: any) => {
      this._grayscale = e.target.checked;
      this.applyProcessing();
      UISM.play(UISM.enumPresets.TAP);
    }, { signal });

    root.getElementById('chk-invert')?.addEventListener('change', (e: any) => {
      this._invert = e.target.checked;
      this.applyProcessing();
      UISM.play(UISM.enumPresets.TAP);
    }, { signal });

    // 3. Ações de Recorte
    root.getElementById('btn-apply-crop')?.addEventListener('click', () => {
      this.commitCrop();
    }, { signal });

    // 4. Salvar/Sair
    root.getElementById('btn-save')?.addEventListener('click', () => this.saveAsset(), { signal });
    root.getElementById('btn-cancel')?.addEventListener('click', () => this.close(), { signal });

    // 5. Mouse Interaction
    const canvas = root.getElementById('editor-canvas') as HTMLCanvasElement;
    
    canvas.addEventListener('mousedown', (e) => {
      if (!this._isCropping) return;
      this._isDrawingCrop = true;
      this._startPos = this.getMousePos(e);
      this._cropRect = { x: this._startPos.x, y: this._startPos.y, w: 0, h: 0 };
      this.syncUI();
    }, { signal });

    window.addEventListener('mousemove', (e) => {
      if (!this._isDrawingCrop) return;
      const current = this.getMousePos(e);
      
      this._cropRect.x = Math.min(this._startPos.x, current.x);
      this._cropRect.y = Math.min(this._startPos.y, current.y);
      this._cropRect.w = Math.abs(current.x - this._startPos.x);
      this._cropRect.h = Math.abs(current.y - this._startPos.y);
      
      this.drawPreview();
    }, { signal });

    window.addEventListener('mouseup', () => {
      if (this._isDrawingCrop) {
        this._isDrawingCrop = false;
        if (this._cropRect.w < 10 || this._cropRect.h < 10) {
           this._cropRect = { x: 0, y: 0, w: 0, h: 0 };
        }
        this.syncUI();
        this.drawPreview();
      }
    }, { signal });
  }

  private getMousePos(e: MouseEvent) {
    const rect = this._previewCanvas!.getBoundingClientRect();
    const scaleX = this._previewCanvas!.width / rect.width;
    const scaleY = this._previewCanvas!.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  private loadImage() {
    if (!this._asset) return;
    this._image = new Image();
    this._image.src = this._asset.src;
    this._image.onload = () => {
      this.applyProcessing();
    };
  }

  /**
   * Aplica rotação e filtros ao BufferCanvas (Dados Reais).
   */
  private applyProcessing() {
    if (!this._image) return;
    const img = this._image;

    const isVertical = this._rotation === 90 || this._rotation === 270;
    this._bufferCanvas.width = isVertical ? img.height : img.width;
    this._bufferCanvas.height = isVertical ? img.width : img.height;

    const ctx = this._bufferCtx;
    ctx.clearRect(0, 0, this._bufferCanvas.width, this._bufferCanvas.height);
    
    ctx.save();
    ctx.translate(this._bufferCanvas.width / 2, this._bufferCanvas.height / 2);
    ctx.rotate((this._rotation * Math.PI) / 180);
    ctx.translate(-img.width / 2, -img.height / 2);

    let filter = '';
    if (this._grayscale) filter += 'grayscale(100%) ';
    if (this._invert) filter += 'invert(100%) ';
    ctx.filter = filter || 'none';

    ctx.drawImage(img, 0, 0);
    ctx.restore();

    this.drawPreview();
  }

  /**
   * Transfere o buffer para o PreviewCanvas e adiciona UI de Crop se necessário.
   */
  private drawPreview() {
    if (!this._previewCanvas || !this._previewCtx) return;
    
    const canvas = this._previewCanvas;
    const ctx = this._previewCtx;

    canvas.width = this._bufferCanvas.width;
    canvas.height = this._bufferCanvas.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this._bufferCanvas, 0, 0);

    if (this._isCropping) {
      this.drawCropOverlay(ctx, canvas);
    }
  }

  private drawCropOverlay(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const rect = this._cropRect;
    
    // Escurece fora do crop
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    if (rect.w > 0) {
      ctx.rect(rect.x, rect.y, rect.w, rect.h);
    }
    ctx.fill('evenodd');

    if (rect.w > 0) {
      // Linhas de guia
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      // Terços
      ctx.moveTo(rect.x + rect.w/3, rect.y); ctx.lineTo(rect.x + rect.w/3, rect.y + rect.h);
      ctx.moveTo(rect.x + 2*rect.w/3, rect.y); ctx.lineTo(rect.x + 2*rect.w/3, rect.y + rect.h);
      ctx.moveTo(rect.x, rect.y + rect.h/3); ctx.lineTo(rect.x + rect.w, rect.y + rect.h/3);
      ctx.moveTo(rect.x, rect.y + 2*rect.h/3); ctx.lineTo(rect.x + rect.w, rect.y + 2*rect.h/3);
      ctx.stroke();

      // Borda neon
      ctx.strokeStyle = 'var(--color-accent-primary)';
      ctx.lineWidth = 2;
      ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
      
      // Handles
      ctx.fillStyle = 'white';
      const hs = 10;
      ctx.fillRect(rect.x - hs/2, rect.y - hs/2, hs, hs);
      ctx.fillRect(rect.x + rect.w - hs/2, rect.y - hs/2, hs, hs);
      ctx.fillRect(rect.x - hs/2, rect.y + rect.h - hs/2, hs, hs);
      ctx.fillRect(rect.x + rect.w - hs/2, rect.y + rect.h - hs/2, hs, hs);
    }
  }

  private commitCrop() {
    if (this._cropRect.w <= 0) return;

    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = this._cropRect.w;
    cropCanvas.height = this._cropRect.h;
    const cropCtx = cropCanvas.getContext('2d')!;

    cropCtx.drawImage(this._bufferCanvas, 
      this._cropRect.x, this._cropRect.y, this._cropRect.w, this._cropRect.h, 
      0, 0, this._cropRect.w, this._cropRect.h
    );

    // O buffer agora é a imagem recortada
    this._bufferCanvas.width = cropCanvas.width;
    this._bufferCanvas.height = cropCanvas.height;
    this._bufferCtx.clearRect(0, 0, this._bufferCanvas.width, this._bufferCanvas.height);
    this._bufferCtx.drawImage(cropCanvas, 0, 0);

    // Sai do modo crop e reseta seleção
    this._isCropping = false;
    this._cropRect = { x: 0, y: 0, w: 0, h: 0 };
    
    this.syncUI();
    this.drawPreview();
    UISM.play(UISM.enumPresets.SUCCESS);
  }

  private async saveAsset() {
    if (!this._asset) return;

    const base64 = this._bufferCanvas.toDataURL('image/webp', 0.95);
    
    try {
      const updatedAsset: Asset = {
        ...this._asset,
        src: base64,
        width: this._bufferCanvas.width,
        height: this._bufferCanvas.height
      };

      await db.put('assets', updatedAsset);
      eventBus.emit('notify', { type: 'success', message: 'Asset updated successfully' });
      UISM.play(UISM.enumPresets.SUCCESS);
      this.close();
      eventBus.emit('state:change', store.getState()); 
    } catch (err) {
      logger.error('MicroEditor', 'Save failed', err);
    }
  }

  private syncUI() {
    const root = this.shadowRoot!;
    
    const cropBtn = root.getElementById('btn-toggle-crop');
    cropBtn?.classList.toggle('active', this._isCropping);

    const applyRow = root.getElementById('apply-crop-row');
    if (applyRow) {
      applyRow.style.display = (this._isCropping && this._cropRect.w > 0) ? 'flex' : 'none';
    }

    const hint = root.getElementById('crop-hint');
    if (hint) {
      hint.style.display = this._isCropping ? 'block' : 'none';
    }

    (root.getElementById('chk-grayscale') as HTMLInputElement).checked = this._grayscale;
    (root.getElementById('chk-invert') as HTMLInputElement).checked = this._invert;
  }

  private close() {
    const modal = document.getElementById('image-editor-modal') as any;
    if (modal) modal.removeAttribute('open');
  }

  private renderSkeleton() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; height: 600px; background: var(--color-canvas); color: white; font-family: var(--font-sans); }
        
        .panel-controls { 
          width: 280px; border-right: 1px solid var(--color-border-ui); 
          padding: 24px; display: flex; flex-direction: column; gap: 24px;
          background: rgba(0,0,0,0.2);
        }

        .panel-preview { 
          flex: 1; display: flex; align-items: center; justify-content: center; 
          background: #050608; overflow: hidden; padding: 32px;
          position: relative;
        }

        canvas { 
          max-width: 100%; max-height: 100%; 
          box-shadow: 0 0 50px rgba(0,0,0,0.8); 
          background-image: 
            linear-gradient(45deg, #111 25%, transparent 25%), 
            linear-gradient(-45deg, #111 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #111 75%), 
            linear-gradient(-45deg, transparent 75%, #111 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
        
        :host([is-cropping]) canvas { cursor: crosshair; }

        .section-title { font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 12px; }
        
        .switch-row { 
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 14px; background: rgba(255,255,255,0.03);
          border: 1px solid var(--color-border-ui); border-radius: 8px;
          margin-bottom: 8px; transition: all 0.2s;
        }
        .switch-label { font-family: var(--font-mono); font-size: 9px; color: var(--color-text-muted); text-transform: uppercase; }

        .btn-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        
        app-button.active { --btn-bg: var(--color-accent-primary); color: white; }

        .footer { margin-top: auto; display: flex; flex-direction: column; gap: 12px; }
        
        .hint { font-size: 10px; color: var(--color-accent-primary); text-align: center; margin-top: 12px; font-weight: bold; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }

        #apply-crop-row { margin-top: 8px; }
      </style>

      <div class="panel-controls">
        <div>
          <div class="section-title">Geometric Tools</div>
          <div class="btn-grid">
            <app-button id="btn-rotate-cw" variant="secondary" title="Rotate 90° CW">
              <ui-icon name="rotate-cw" size="sm"></ui-icon>
            </app-button>
            <app-button id="btn-toggle-crop" variant="secondary" title="Crop Tool">
              <ui-icon name="maximize" size="sm"></ui-icon>
            </app-button>
          </div>
          <p id="crop-hint" class="hint" style="display:none">DRAG ON IMAGE TO SELECT AREA</p>
          
          <div id="apply-crop-row" style="display:none">
            <app-button id="btn-apply-crop" variant="success" style="width:100%; height:32px; font-size:10px;">
               APPLY CROP SELECTION
            </app-button>
          </div>
        </div>

        <div>
          <div class="section-title">Color Processing</div>
          <label class="switch-row">
            <span class="switch-label">Grayscale</span>
            <input type="checkbox" id="chk-grayscale">
          </label>
          <label class="switch-row">
            <span class="switch-label">Invert</span>
            <input type="checkbox" id="chk-invert">
          </label>
        </div>

        <div class="footer">
          <app-button id="btn-save" variant="primary" style="height: 44px; font-weight: bold;">SAVE ASSET</app-button>
          <app-button id="btn-cancel" variant="secondary">CANCEL</app-button>
        </div>
      </div>

      <div class="panel-preview">
        <canvas id="editor-canvas"></canvas>
      </div>
    `;

    this._previewCanvas = this.shadowRoot.getElementById('editor-canvas') as HTMLCanvasElement;
    this._previewCtx = this._previewCanvas.getContext('2d', { alpha: true });
  }
}

customElements.define('micro-image-editor', MicroImageEditor);
