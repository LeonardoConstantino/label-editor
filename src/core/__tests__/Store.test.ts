import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest';
import { store } from '../Store';
import eventBus from '../EventBus';
import { ElementType } from '../../domain/models/elements/BaseElement';

describe('Store', () => {
  const mockLabel = {
    id: '1',
    name: 'Test Label',
    config: { widthMM: 100, heightMM: 50, dpi: 300, previewScale: 1 },
    elements: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  beforeAll(() => {
    // Mock do callback do canvas para snapshots funcionarem nos testes
    eventBus.on('request:canvas:snapshot', (callback: (ctx: CanvasRenderingContext2D) => void) => {
      // Mock ctx com getImageData retornando ImageData mockado
      const mockImageData = {
        data: new Uint8ClampedArray(4),
        width: 100,
        height: 100
      } as ImageData;
      const mockCtx = {
        getImageData: vi.fn(() => mockImageData),
        putImageData: vi.fn(),
        canvas: { width: 100, height: 100 }
      } as any;
      callback(mockCtx);
    });
  });

  beforeEach(() => {
    // Reset do store para cada teste (re-loading a base label)
    store.loadLabel(JSON.parse(JSON.stringify(mockLabel)));
  });

  it('should add an element and push to history', () => {
    const newElement = {
      id: 'el1',
      type: ElementType.TEXT,
      position: { x: 10, y: 10 },
      zIndex: 1,
      dimensions: { width: 50, height: 10 },
      content: 'Hello',
      fontSize: 12,
      color: '#000000',
      opacity: 1
    };

    eventBus.emit('element:add', newElement);

    const state = store.getState();
    expect(state.currentLabel?.elements).toHaveLength(1);
    expect(state.currentLabel?.elements[0].id).toBe('el1');
    expect(state.canUndo).toBe(true);
  });

  it('should update an element', () => {
    const newElement = {
      id: 'el1',
      type: ElementType.TEXT,
      position: { x: 10, y: 10 },
      zIndex: 1,
      dimensions: { width: 50, height: 10 },
      content: 'Hello',
      fontSize: 12,
      color: '#000000',
      opacity: 1
    };
    eventBus.emit('element:add', newElement);

    eventBus.emit('element:update', { id: 'el1', updates: { content: 'Updated' } });

    const state = store.getState();
    expect((state.currentLabel?.elements[0] as any).content).toBe('Updated');
  });

  it('should reject invalid updates', () => {
    const newElement = {
      id: 'el1',
      type: ElementType.TEXT,
      position: { x: 10, y: 10 },
      zIndex: 1,
      dimensions: { width: 50, height: 10 },
      content: 'Hello',
      color: '#000000',
      fontSize: 12,
      opacity: 1
    };
    eventBus.emit('element:add', newElement);

    // Tentativa de update inválido (cor mal formatada)
    const notifySpy = vi.fn();
    eventBus.on('notify', notifySpy);

    eventBus.emit('element:update', { id: 'el1', updates: { color: 'invalid-color' } });

    const state = store.getState();
    expect((state.currentLabel?.elements[0] as any).color).toBe('#000000'); // Não deve ter mudado
    expect(notifySpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'error' }));
  });

  it('should undo and redo changes', () => {
    const newElement = {
      id: 'el1',
      type: ElementType.TEXT,
      position: { x: 10, y: 10 },
      zIndex: 1,
      dimensions: { width: 50, height: 10 },
      content: 'Hello',
      fontSize: 12,
      color: '#000000',
      opacity: 1
    };

    // Após loadLabel, temos snapshot inicial (estado vazio)
    // Adicionar elemento cria snapshot 1
    eventBus.emit('element:add', newElement);
    expect(store.getState().currentLabel?.elements).toHaveLength(1);
    expect(store.getState().canUndo).toBe(true);

    // Undo volta para snapshot inicial (estado vazio)
    eventBus.emit('history:undo');
    expect(store.getState().currentLabel?.elements).toHaveLength(0);
    expect(store.getState().canUndo).toBe(false);

    // Redo volta para snapshot com elemento
    eventBus.emit('history:redo');
    expect(store.getState().currentLabel?.elements).toHaveLength(1);
    expect(store.getState().canRedo).toBe(false);
  });

  it('should manage selection', () => {
    eventBus.emit('element:select', 'el1');
    expect(store.getState().selectedElementIds).toContain('el1');

    eventBus.emit('element:select', ['el1', 'el2']);
    expect(store.getState().selectedElementIds).toHaveLength(2);
  });
});
