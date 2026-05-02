import { describe, it, expect, beforeEach } from 'vitest';
import { templateManager } from '../TemplateManager';
import { store } from '../../../core/Store';
import { ElementType, TextOverflow } from '../../models/elements/BaseElement';
import 'fake-indexeddb/auto';
import { Label } from '../../models/Label';

describe('TemplateManager', () => {
  const mockLabel: Label = {
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
        color: '#000000',
        fontFamily: 'Inter',
        fontWeight: 400,
        fontStyle: 'normal',
        textAlign: 'center',
        verticalAlign: 'middle',
        overflow: TextOverflow.CLIP,
        lineHeight: 1.2,
        keepRatio: false
      }
    ],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  beforeEach(async () => {
    await templateManager.init();
  });

  it('should save and retrieve a label', async () => {
    store.loadLabel(mockLabel);
    await templateManager.saveCurrentLabel();
    
    const templates = await templateManager.getTemplates();
    expect(templates).toHaveLength(1);
    expect(templates[0].id).toBe(mockLabel.id);
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
