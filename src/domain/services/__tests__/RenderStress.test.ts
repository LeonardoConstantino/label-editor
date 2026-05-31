import { describe, it, expect } from 'vitest';
import { CanvasRenderer } from '../CanvasRenderer';
import { ElementType } from '../../models/elements/BaseElement';
import { AnyElement } from '../../models/Label';

describe('Render Stress Test (TST-02)', () => {
  const renderer = new CanvasRenderer();
  it('deve lidar graciosamente com coordenadas inválidas (NaN/Infinity)', () => {
    const invalidElement: AnyElement = {
      id: 'crash-test',
      type: ElementType.TEXT,
      position: { x: NaN, y: Infinity },
      dimensions: { width: 10, height: 10 },
      rotation: 0,
      opacity: 1,
      visible: true,
      zIndex: 0,
      locked: false,
      keepRatio: true,
      effects: { enabled: false, blur: 0, color: '', offsetX: 0, offsetY: 0 },
      content: 'I will not crash the app'
    } as any;

    expect(() => renderer.render(invalidElement, { 
        ctx: { 
            save: () => {}, 
            restore: () => {}, 
            translate: () => {}, 
            rotate: () => {}, 
            globalAlpha: 1,
            fillRect: () => {},
            fillText: () => {}
        } as any, 
        scale: 1,
        dpi: 96
    })).not.toThrow();
  });

  it('deve processar texto longo com segurança (Binary Search check)', () => {
    const longTextElement: AnyElement = {
      id: 'long-text',
      type: ElementType.TEXT,
      position: { x: 0, y: 0 },
      dimensions: { width: 10, height: 10 },
      rotation: 0,
      opacity: 1,
      visible: true,
      zIndex: 0,
      locked: false,
      keepRatio: true,
      effects: { enabled: false, blur: 0, color: '', offsetX: 0, offsetY: 0 },
      content: 'A'.repeat(5000)
    } as any;

    expect(() => renderer.render(longTextElement, { 
        ctx: { 
            save: () => {}, 
            restore: () => {}, 
            translate: () => {}, 
            rotate: () => {}, 
            globalAlpha: 1,
            fillRect: () => {},
            fillText: () => {}
        } as any, 
        scale: 1,
        dpi: 96
    })).not.toThrow();
  });
});
