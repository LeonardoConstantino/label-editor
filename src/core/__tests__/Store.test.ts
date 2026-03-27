import { describe, it, expect, beforeEach, vi } from 'vitest';
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
      content: 'Hello'
    };

    eventBus.emit('element:add', newElement);

    const state = store.getState();
    expect(state.currentLabel?.elements).toHaveLength(1);
    expect(state.currentLabel?.elements[0].id).toBe('el1');
    expect(state.historyIndex).toBe(1);
  });

  it('should update an element', () => {
    const newElement = {
      id: 'el1',
      type: ElementType.TEXT,
      position: { x: 10, y: 10 },
      zIndex: 1,
      dimensions: { width: 50, height: 10 },
      content: 'Hello'
    };
    eventBus.emit('element:add', newElement);

    eventBus.emit('element:update', { id: 'el1', updates: { content: 'Updated' } });

    const state = store.getState();
    expect((state.currentLabel?.elements[0] as any).content).toBe('Updated');
  });

  it('should undo and redo changes', () => {
    const newElement = {
      id: 'el1',
      type: ElementType.TEXT,
      position: { x: 10, y: 10 },
      zIndex: 1,
      dimensions: { width: 50, height: 10 },
      content: 'Hello'
    };
    
    eventBus.emit('element:add', newElement); // state 1
    expect(store.getState().currentLabel?.elements).toHaveLength(1);

    eventBus.emit('history:undo'); // volta para state 0
    expect(store.getState().currentLabel?.elements).toHaveLength(0);

    eventBus.emit('history:redo'); // volta para state 1
    expect(store.getState().currentLabel?.elements).toHaveLength(1);
  });

  it('should manage selection', () => {
    eventBus.emit('element:select', 'el1');
    expect(store.getState().selectedElementIds).toContain('el1');

    eventBus.emit('element:select', ['el1', 'el2']);
    expect(store.getState().selectedElementIds).toHaveLength(2);
  });
});
