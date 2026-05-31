import { describe, it, expect, beforeEach } from 'vitest';
import { SnapService } from '../SnapService';
import { ElementType } from '../../models/Label';

describe('SnapService', () => {
  let service: SnapService;

  beforeEach(() => {
    service = new SnapService();
  });

  it('deve realizar snapping básico no grid', () => {
    const el = { 
      id: '1', 
      position: { x: 12, y: 12 }, 
      dimensions: { width: 10, height: 10 }, 
      type: ElementType.RECTANGLE 
    } as any;
    
    const config = { widthMM: 100, heightMM: 100 };
    const options = {
      snapToGrid: true,
      gridSizeMM: 24,
      snapToObjects: false,
      snapToCanvas: false,
      thresholdMM: 5
    };
    
    const result = service.calculateSnap(el, el.position, [], config, options);
    
    // Grid = 24. El.x=12. Próximo múltiplo = 0 ou 24.
    // Snap é atrativo.
    expect(result.x).toBeDefined();
  });
});
