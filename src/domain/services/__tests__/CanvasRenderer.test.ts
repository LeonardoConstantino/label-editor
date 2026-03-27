import { describe, it, expect, vi, beforeEach } from 'vitest';
import { canvasRenderer } from '../CanvasRenderer';
import { ElementType } from '../../models/elements/BaseElement';

describe('CanvasRenderer', () => {
  let mockCtx: any;

  beforeEach(() => {
    mockCtx = {
      save: vi.fn(),
      restore: vi.fn(),
      fillText: vi.fn(),
      fillRect: vi.fn(),
      strokeRect: vi.fn(),
      drawImage: vi.fn(),
      beginPath: vi.fn(),
      closePath: vi.fn(),
    };
  });

  it('should render a text element at correct pixel coordinates', () => {
    const textElement = {
      type: ElementType.TEXT,
      position: { x: 10, y: 10 },
      zIndex: 1,
      dimensions: { width: 50, height: 10 },
      content: 'Label',
      color: '#000',
      fontFamily: 'Arial',
      fontSize: 12,
      fontWeight: 'normal',
      textAlign: 'left'
    };

    // scale: 300 DPI / 25.4mm = 11.81 px/mm
    const scale = 300 / 25.4; 
    canvasRenderer.render(textElement as any, { ctx: mockCtx, scale });

    expect(mockCtx.fillText).toHaveBeenCalledWith('Label', 10 * scale, 10 * scale);
    expect(mockCtx.save).toHaveBeenCalled();
    expect(mockCtx.restore).toHaveBeenCalled();
  });

  it('should perform hitTest correctly', () => {
    const element = {
      position: { x: 10, y: 10 },
      dimensions: { width: 50, height: 10 }
    };
    const config = { dpi: 300, previewScale: 1 };
    const scale = (300 / 25.4);

    // Ponto dentro (15mm, 15mm -> converter para pixels)
    expect(canvasRenderer.hitTest(element as any, 15 * scale, 15 * scale, config as any)).toBe(true);
    
    // Ponto fora
    expect(canvasRenderer.hitTest(element as any, 5 * scale, 5 * scale, config as any)).toBe(false);
  });
});
