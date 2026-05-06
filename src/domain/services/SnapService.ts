import { AnyElement } from '../models/Label';
import { Position } from '../models/elements/BaseElement';

export interface SnapResult {
  x: number | null;
  y: number | null;
  guides: {
    x: number[]; // Coordenadas X onde desenhar linhas verticais
    y: number[]; // Coordenadas Y onde desenhar linhas horizontais
  };
}

/**
 * SnapService: Gerencia a lógica de atração magnética (Snapping).
 * Alinha elementos ao grid, bordas/centros de outros elementos e ao canvas.
 */
export class SnapService {
  /**
   * Calcula as coordenadas "snapped" e as guias visuais.
   */
  public calculateSnap(
    draggingElement: AnyElement,
    rawPos: Position,
    allElements: AnyElement[],
    canvasConfig: { widthMM: number; heightMM: number },
    options: {
      snapToGrid: boolean;
      gridSizeMM: number;
      snapToObjects: boolean;
      snapToCanvas: boolean;
      thresholdMM: number;
    }
  ): SnapResult {
    const { widthMM, heightMM } = canvasConfig;
    const threshold = options.thresholdMM;
    
    // Dimensões do elemento sendo arrastado
    const elW = 'dimensions' in draggingElement ? draggingElement.dimensions.width : 0;
    const elH = 'dimensions' in draggingElement ? draggingElement.dimensions.height : 0;

    const snappedPos: SnapResult = {
      x: null,
      y: null,
      guides: { x: [], y: [] }
    };

    // --- SNAP VERTICAL (X) ---
    const xSnaps = new Set<number>();
    
    // 1. Canvas Edges & Center
    if (options.snapToCanvas) {
      xSnaps.add(0); // Left
      xSnaps.add(widthMM); // Right
      xSnaps.add(widthMM / 2); // Center X
    }

    // 2. Other Objects
    if (options.snapToObjects) {
      allElements.forEach(other => {
        if (other.id === draggingElement.id || !other.visible) return;
        const otherW = 'dimensions' in other ? other.dimensions.width : 0;
        
        xSnaps.add(other.position.x); // Other Left
        xSnaps.add(other.position.x + otherW); // Other Right
        xSnaps.add(other.position.x + otherW / 2); // Other Center
      });
    }

    // 3. Grid
    if (options.snapToGrid) {
      const step = options.gridSizeMM;
      const nearGridX = Math.round(rawPos.x / step) * step;
      xSnaps.add(nearGridX);
    }

    this.evaluateSnap(rawPos.x, elW, xSnaps, threshold, snappedPos, 'x');

    // --- SNAP HORIZONTAL (Y) ---
    const ySnaps = new Set<number>();

    if (options.snapToCanvas) {
      ySnaps.add(0); // Top
      ySnaps.add(heightMM); // Bottom
      ySnaps.add(heightMM / 2); // Center Y
    }

    if (options.snapToObjects) {
      allElements.forEach(other => {
        if (other.id === draggingElement.id || !other.visible) return;
        const otherH = 'dimensions' in other ? other.dimensions.height : 0;
        
        ySnaps.add(other.position.y); // Other Top
        ySnaps.add(other.position.y + otherH); // Other Bottom
        ySnaps.add(other.position.y + otherH / 2); // Other Center
      });
    }

    if (options.snapToGrid) {
      const step = options.gridSizeMM;
      const nearGridY = Math.round(rawPos.y / step) * step;
      ySnaps.add(nearGridY);
    }

    this.evaluateSnap(rawPos.y, elH, ySnaps, threshold, snappedPos, 'y');

    return snappedPos;
  }

  private evaluateSnap(
    rawCoord: number,
    dim: number,
    targets: Set<number>,
    threshold: number,
    result: SnapResult,
    axis: 'x' | 'y'
  ) {
    let minDiff = threshold;
    let finalSnapped: number | null = null;
    const guides: number[] = [];

    targets.forEach(target => {
      const diffStart = Math.abs(rawCoord - target);
      if (diffStart < minDiff) {
        minDiff = diffStart;
        finalSnapped = target;
        guides.push(target);
      }

      const diffEnd = Math.abs((rawCoord + dim) - target);
      if (diffEnd < minDiff) {
        minDiff = diffEnd;
        finalSnapped = target - dim;
        guides.push(target);
      }

      const diffCenter = Math.abs((rawCoord + dim / 2) - target);
      if (diffCenter < minDiff) {
        minDiff = diffCenter;
        finalSnapped = target - dim / 2;
        guides.push(target);
      }
    });

    if (finalSnapped !== null) {
      result[axis] = finalSnapped;
      result.guides[axis] = [guides[guides.length - 1]];
    }
  }
}

export const snapService = new SnapService();
