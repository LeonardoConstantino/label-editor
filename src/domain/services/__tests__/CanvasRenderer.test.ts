import { describe, it, expect, vi, beforeEach } from 'vitest';
import { canvasRenderer } from '../CanvasRenderer';
import { ElementType } from '../../models/elements/BaseElement';

// Mock do canvas-txt
vi.mock('canvas-txt', () => ({
  drawText: vi.fn((ctx, text, config) => {
    ctx.save();
    ctx.fillStyle = config.fillStyle || '#000';
    ctx.font = `${config.fontWeight || 'normal'} ${config.fontSize}px ${config.fontFamily}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = config.align || 'left';
    ctx.fillText(text, config.x + config.width / 2, config.y + config.height / 2);
    ctx.restore();
  })
}));

describe('CanvasRenderer', () => {
  let mockCtx: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockCtx = {
      save: vi.fn(),
      restore: vi.fn(),
      fillText: vi.fn(),
      fillRect: vi.fn(),
      strokeRect: vi.fn(),
      drawImage: vi.fn(),
      beginPath: vi.fn(),
      closePath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      clip: vi.fn(),
      arcTo: vi.fn(),
      fillStyle: '#000',
      font: '',
      textBaseline: 'middle',
      textAlign: 'left',
      globalAlpha: 1,
      globalCompositeOperation: 'source-over'
    };
  });

  it('should render a text element delegating to TextRenderer', () => {
    const textElement = {
      type: ElementType.TEXT,
      position: { x: 10, y: 10 },
      zIndex: 1,
      rotation: 0,
      opacity: 1,
      dimensions: { width: 50, height: 10 },
      content: 'Label',
      color: '#000',
      fontFamily: 'Arial',
      fontSize: 12,
      fontWeight: 'normal',
      textAlign: 'left'
    };

    const scale = 300 / 25.4;
    const x = textElement.position.x * scale;
    const y = textElement.position.y * scale;
    const width = textElement.dimensions.width * scale;
    const height = textElement.dimensions.height * scale;

    canvasRenderer.render(textElement as any, { ctx: mockCtx, scale, dpi: 300 });

    expect(mockCtx.fillText).toHaveBeenCalledWith(
      'Label',
      x + width / 2,
      y + height / 2
    );
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

    expect(canvasRenderer.hitTest(element as any, 15 * scale, 15 * scale, config as any)).toBe(true);
    expect(canvasRenderer.hitTest(element as any, 5 * scale, 5 * scale, config as any)).toBe(false);
  });
});
