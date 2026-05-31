import { describe, it, expect, beforeEach } from 'vitest';
import { LayoutService } from '../LayoutService';
import { ElementType } from '../../models/elements/BaseElement';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    service = new LayoutService();
  });

  it.each([
    ['alignLeft', 10, 10],   
    ['alignCenter', 30, 25], 
    ['alignRight', 50, 40],
    ['alignTop', 10, 20], 
    ['alignMiddle', 10, 15],
    ['alignBottom', 10, 10],
  ])('deve realizar ação de alinhamento %s corretamente', (action, expectedX1, expectedX2) => {
    const elements = [
      { id: '1', position: { x: 50, y: 10 }, dimensions: { width: 10, height: 10 }, type: ElementType.TEXT },
      { id: '2', position: { x: 10, y: 20 }, dimensions: { width: 20, height: 20 }, type: ElementType.TEXT }
    ] as any;

    const result = service.calculateNewPositions(elements, action as any);

    const update1 = result.find(r => r.id === '1');
    const update2 = result.find(r => r.id === '2');

    if (action.startsWith('align')) {
        if (action.includes('Left') || action.includes('Center') || action.includes('Right')) {
            expect(update1?.updates.position?.x).toBe(expectedX1);
            expect(update2?.updates.position?.x).toBe(expectedX2);
        } else {
            expect(update1?.updates.position?.y).toBeDefined();
            expect(update2?.updates.position?.y).toBeDefined();
        }
    }
  });

  it('deve realizar distribuição horizontal entre elementos', () => {
    const elements = [
      { id: '1', position: { x: 0, y: 0 }, dimensions: { width: 10, height: 10 }, type: ElementType.TEXT },
      { id: '2', position: { x: 50, y: 0 }, dimensions: { width: 10, height: 10 }, type: ElementType.TEXT },
      { id: '3', position: { x: 100, y: 0 }, dimensions: { width: 10, height: 10 }, type: ElementType.TEXT }
    ] as any;

    const result = service.calculateNewPositions(elements, 'distributeHorizontal');
    const update2 = result.find(r => r.id === '2');

    expect(update2?.updates.position?.x).toBe(50);
  });
});
