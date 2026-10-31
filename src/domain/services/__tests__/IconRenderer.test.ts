import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IconRenderer } from '../renderers/IconRenderer';
import { ElementType } from '../../models/elements/BaseElement';
import { IconElement } from '../../models/elements/SpecificElements';

// Mock Path2D para ambiente de teste Node/jsdom
class MockPath2D {
  public d: string;
  constructor(d?: string) {
    this.d = d || '';
  }
}
// @ts-ignore
global.Path2D = MockPath2D;

describe('IconRenderer', () => {
  let renderer: IconRenderer;
  let mockCtx: any;

  beforeEach(() => {
    renderer = new IconRenderer();
    mockCtx = {
      save: vi.fn(),
      restore: vi.fn(),
      translate: vi.fn(),
      scale: vi.fn(),
      stroke: vi.fn(),
      strokeRect: vi.fn(),
      fill: vi.fn(),
      fillRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      setTransform: vi.fn(),
      fillText: vi.fn(),
      font: '',
      textAlign: '',
      textBaseline: '',
      fillStyle: '#000000',
      strokeStyle: '#000000',
      lineWidth: 1,
      lineCap: 'butt',
      lineJoin: 'miter'
    };
  });

  it('renders a stroke icon (Lucide) with correct transformations and color', () => {
    const element: IconElement = {
      id: 'icon-1',
      name: 'Alert Icon',
      type: ElementType.ICON,
      position: { x: 10, y: 10 },
      dimensions: { width: 20, height: 20 },
      zIndex: 1,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      keepRatio: true,
      effects: { enabled: false, color: '#000', blur: 0, offsetX: 0, offsetY: 0 },
      iconName: 'alert-triangle',
      color: '#EF4444',
      strokeWidth: 2
    };

    const scale = 300 / 25.4;
    renderer.render(element, { ctx: mockCtx, scale, dpi: 300 });

    expect(mockCtx.save).toHaveBeenCalled();
    expect(mockCtx.translate).toHaveBeenCalledWith(10 * scale, 10 * scale);
    expect(mockCtx.strokeStyle).toBe('#EF4444');
    expect(mockCtx.stroke).toHaveBeenCalled();
    expect(mockCtx.restore).toHaveBeenCalled();
  });

  it('renders a solid fill icon (custom Biohazard) with fillStyle', () => {
    const element: IconElement = {
      id: 'icon-2',
      name: 'Hazard Icon',
      type: ElementType.ICON,
      position: { x: 5, y: 5 },
      dimensions: { width: 30, height: 30 },
      zIndex: 1,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      keepRatio: true,
      effects: { enabled: false, color: '#000', blur: 0, offsetX: 0, offsetY: 0 },
      iconName: 'biohazard',
      color: '#F59E0B'
    };

    const scale = 300 / 25.4;
    renderer.render(element, { ctx: mockCtx, scale, dpi: 300 });

    expect(mockCtx.fillStyle).toBe('#F59E0B');
    expect(mockCtx.fill).toHaveBeenCalled();
  });

  it('interpolates dynamic variables in iconName with batch data', () => {
    const element: IconElement = {
      id: 'icon-3',
      name: 'Dynamic Icon',
      type: ElementType.ICON,
      position: { x: 0, y: 0 },
      dimensions: { width: 15, height: 15 },
      zIndex: 1,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      keepRatio: true,
      effects: { enabled: false, color: '#000', blur: 0, offsetX: 0, offsetY: 0 },
      iconName: '{{hazard_type}}',
      color: '#10B981'
    };

    const scale = 300 / 25.4;
    renderer.render(element, {
      ctx: mockCtx,
      scale,
      dpi: 300,
      data: { hazard_type: 'biohazard' }
    });

    expect(mockCtx.fillStyle).toBe('#10B981');
    expect(mockCtx.fill).toHaveBeenCalled();
  });

  it('renders error placeholder when icon name is an unresolved dynamic variable', () => {
    const element: IconElement = {
      id: 'icon-4',
      name: 'Unresolved Icon',
      type: ElementType.ICON,
      position: { x: 0, y: 0 },
      dimensions: { width: 15, height: 15 },
      zIndex: 1,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      keepRatio: true,
      effects: { enabled: false, color: '#000', blur: 0, offsetX: 0, offsetY: 0 },
      iconName: '{{missing_field}}',
      color: '#000000'
    };

    renderer.render(element, { ctx: mockCtx, scale: 1, dpi: 300, data: {} });

    // placeholder desenhado (fundo + contorno)
    expect(mockCtx.fillRect).toHaveBeenCalled();
    expect(mockCtx.strokeRect).toHaveBeenCalled();
    // rótulo visível
    expect(mockCtx.fillText).toHaveBeenCalledWith(
      'IMAGE',
      expect.any(Number),
      expect.any(Number)
    );
  });
});
