import { describe, it, expect, beforeEach, vi } from 'vitest';
import { templateManager } from '../TemplateManager';
import { store } from '../../../core/Store';
import { ElementType } from '../../models/elements/BaseElement';
import 'fake-indexeddb/auto';

describe('TemplateManager', () => {
  const mockLabel = {
    id: 'test-label-1',
    name: 'Test Label',
    config: {
      widthMM: 100,
      heightMM: 50,
      dpi: 300,
      previewScale: 1,
      backgroundColor: '#ffffff'
    },
    elements: [
      {
        id: 'el-1',
        type: ElementType.TEXT,
        name: 'Text 1',
        position: { x: 10, y: 10 },
        zIndex: 1,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        dimensions: { width: 50, height: 10 },
        content: 'Hello World',
        fontSize: 12,
        color: '#000000'
      }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  beforeEach(async () => {
    // Limpa o banco antes de cada teste se necessário (fake-indexeddb reseta entre execuções se não houver persistência real)
    await templateManager.init();
  });

  it('should save and retrieve a label', async () => {
    // Injeta label no Store
    store.loadLabel(mockLabel);
    
    // Salva
    await templateManager.saveCurrentLabel();
    
    // Lista
    const templates = await templateManager.getTemplates();
    expect(templates).toHaveLength(1);
    expect(templates[0].id).toBe(mockLabel.id);
    expect(templates[0].thumbnail).toBeDefined();
  });

  it('should update an existing label', async () => {
    store.loadLabel(mockLabel);
    await templateManager.saveCurrentLabel();

    const updatedLabel = { ...mockLabel, name: 'Updated Name' };
    store.loadLabel(updatedLabel);
    await templateManager.saveCurrentLabel();

    const templates = await templateManager.getTemplates();
    expect(templates).toHaveLength(1);
    expect(templates[0].name).toBe('Updated Name');
  });

  it('should delete a template', async () => {
    store.loadLabel(mockLabel);
    await templateManager.saveCurrentLabel();

    await templateManager.deleteTemplate(mockLabel.id);
    
    const templates = await templateManager.getTemplates();
    expect(templates).toHaveLength(0);
  });
});
