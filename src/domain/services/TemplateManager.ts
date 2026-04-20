import { db } from '../../core/Database';
import { Label } from '../models/Label';
import { store } from '../../core/Store';
import { canvasRenderer } from './CanvasRenderer';

export class TemplateManager {
  private readonly STORE_NAME = 'templates';

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
    console.log('Label saved to IndexedDB:', labelToSave.name);
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
   * Gera uma imagem base64 do design atual.
   */
  private async generateThumbnail(label: Label): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve('');
        return;
      }

      const targetSize = 300;
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

      resolve(canvas.toDataURL('image/webp', 0.7));
    });
  }
}

export const templateManager = new TemplateManager();
