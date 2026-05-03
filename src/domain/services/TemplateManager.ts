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

    eventBus.emit('template:saved', labelToSave);

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
   * Exporta uma etiqueta como um arquivo JSON (.label).
   * Se não passar label, usa a atual do store.
   */
  async exportToFile(label?: Label): Promise<void> {
    const targetLabel = label || store.getState().currentLabel;
    if (!targetLabel) return;

    const data = JSON.stringify(targetLabel, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${targetLabel.name.replace(/\s+/g, '_')}.label`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);

    logger.info('TemplateManager', 'Label exported to file:', targetLabel.name);
  }

  /**
   * Importa uma etiqueta de um arquivo JSON.
   */
  async importFromFile(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string;
          const label = JSON.parse(content) as Label;

          // Validação básica de schema
          if (!label.id || !label.config || !Array.isArray(label.elements)) {
            throw new Error('Arquivo .label inválido ou corrompido.');
          }

          // Injeta no Store
          store.loadLabel(label);
          logger.info('TemplateManager', 'Label imported from file:', label.name);
          resolve();
        } catch (err) {
          logger.error('TemplateManager', 'Failed to import file:', err);
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('Erro ao ler o arquivo.'));
      reader.readAsText(file);
    });
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
      const ctx = canvas.getContext('2d', { alpha: true });
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
