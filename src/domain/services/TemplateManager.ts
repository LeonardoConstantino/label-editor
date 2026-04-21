import { db } from '../../core/Database';
import { Label, ElementType } from '../models/Label';
import { store } from '../../core/Store';
import { canvasRenderer } from './CanvasRenderer';
import { DEFAULTS } from '../../constants/defaults';
import { ElementFactory } from '../models/elements/ElementFactory';
import eventBus from '../../core/EventBus';
import { logger } from '../../core/Logger';

export class TemplateManager {
  private readonly STORE_NAME = 'templates';

  constructor() {
    this.setupListeners();
  }

  private setupListeners(): void {
    eventBus.on('template:save', () => this.saveCurrentLabel());
  }

  /**
   * Inicializa o storage.
   */
  async init(): Promise<void> {
    await db.initialize();
  }

  /**
   * Salva a etiqueta atual no IndexedDB com geração de thumbnail.
   */
  async saveCurrentLabel(): Promise<void> {
    const currentLabel = store.getState().currentLabel;
    if (!currentLabel) return;

    const thumbnail = await this.generateThumbnail(currentLabel);

    const labelToSave: Label = {
      ...JSON.parse(JSON.stringify(currentLabel)),
      thumbnail,
      updatedAt: Date.now()
    };

    await db.put(this.STORE_NAME, labelToSave);
    logger.debug('TemplateManager', 'Label saved to IndexedDB:', labelToSave.name);
  }

  /**
   * Retorna todos os templates salvos.
   */
  async getTemplates(): Promise<Label[]> {
    return await db.getAll<Label>(this.STORE_NAME);
  }

  /**
   * Carrega um template pelo ID e injeta no Store.
   */
  async loadTemplate(id: string): Promise<void> {
    const label = await db.get<Label>(this.STORE_NAME, id);
    if (label) {
      store.loadLabel(label);
    }
  }

  /**
   * Remove um template pelo ID.
   */
  async deleteTemplate(id: string): Promise<void> {
    await db.delete(this.STORE_NAME, id);
  }

  /**
   * Duplica um template existente.
   */
  async duplicateTemplate(id: string): Promise<void> {
    const original = await db.get<Label>(this.STORE_NAME, id);
    if (!original) return;

    const copy: Label = {
      ...JSON.parse(JSON.stringify(original)),
      id: crypto.randomUUID(),
      name: `${original.name} (Copy)`,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    await db.put(this.STORE_NAME, copy);
  }

  /**
   * Inicializa um novo projeto limpo usando DEFAULTS.
   */
  createNewProject(): void {
    const newLabel: Label = {
      id: crypto.randomUUID(),
      name: 'Nova Etiqueta',
      config: { ...DEFAULTS.CANVAS },
      elements: [
        ElementFactory.create(ElementType.TEXT, {
          content: 'Minha Nova Etiqueta'
        })
      ],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    store.loadLabel(newLabel);
  }

  /**
   * Gera uma imagem base64 do design atual de forma pública.
   */
  public async captureThumbnail(label: Label): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve('');
        return;
      }

      const targetSize = 400; 
      const ratio = label.config.widthMM / label.config.heightMM;
      let w = targetSize;
      let h = targetSize / ratio;

      if (h > targetSize) {
        h = targetSize;
        w = targetSize * ratio;
      }

      canvas.width = w;
      canvas.height = h;

      const scale = w / label.config.widthMM;

      ctx.fillStyle = label.config.backgroundColor || '#ffffff';
      ctx.fillRect(0, 0, w, h);

      canvasRenderer.renderAll(label.elements, {
        ctx,
        scale,
        dpi: 72
      });

      resolve(canvas.toDataURL('image/webp', 0.8));
    });
  }

  /**
   * Gera uma imagem base64 do design atual.
   */
  private async generateThumbnail(label: Label): Promise<string> {
    return this.captureThumbnail(label);
  }
}

export const templateManager = new TemplateManager();
