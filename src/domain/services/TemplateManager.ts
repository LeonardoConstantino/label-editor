import { IndexedDBStorage } from '../../core/IndexedDBStorage';
import { Label } from '../models/Label';
import { store } from '../../core/Store';

export class TemplateManager {
  private storage: IndexedDBStorage<Label[]>;

  constructor() {
    this.storage = new IndexedDBStorage<Label[]>('label_templates', []);
  }

  /**
   * Inicializa o storage e carrega os templates existentes
   */
  async init(): Promise<void> {
    await this.storage.initialize();
  }

  /**
   * Salva a etiqueta atual no IndexedDB
   */
  async saveCurrentLabel(): Promise<void> {
    const currentLabel = store.getState().currentLabel;
    if (!currentLabel) return;

    const labelToSave: Label = {
      ...JSON.parse(JSON.stringify(currentLabel)),
      updatedAt: Date.now()
    };

    const templates = this.storage.getValue();
    const index = templates.findIndex(t => t.id === labelToSave.id);

    if (index !== -1) {
      templates[index] = labelToSave;
    } else {
      templates.push(labelToSave);
    }

    await this.storage.setValue(templates);
    console.log('Label saved to IndexedDB:', labelToSave.name);
  }

  /**
   * Retorna todos os templates salvos
   */
  getTemplates(): Label[] {
    return this.storage.getValue();
  }

  /**
   * Remove um template pelo ID
   */
  async deleteTemplate(id: string): Promise<void> {
    const templates = this.storage.getValue().filter(t => t.id !== id);
    await this.storage.setValue(templates);
  }
}

export const templateManager = new TemplateManager();
