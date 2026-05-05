import { AnyElement } from '../models/Label';

export type AlignAction =
  | 'alignLeft'
  | 'alignCenter'
  | 'alignRight'
  | 'alignTop'
  | 'alignMiddle'
  | 'alignBottom'
  | 'distributeHorizontal'
  | 'distributeVertical';

type ElementWithDimensions = AnyElement & {
  dimensions: { width: number; height: number };
};

type BoundingBox = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

type UpdateResult = { id: string; updates: Partial<AnyElement> }[];

/**
 * LayoutService: Centraliza a lógica matemática para alinhamento e distribuição de elementos.
 */
export class LayoutService {
  /**
   * Calcula as novas posições para um conjunto de elementos baseado na ação desejada.
   */
  public calculateNewPositions(
    elements: AnyElement[],
    action: AlignAction,
    toCanvas: boolean = false,
    canvasConfig?: { widthMM: number; heightMM: number },
  ): UpdateResult {
    const validElements = this.filterValidElements(elements);
    if (validElements.length === 0) return [];

    const refBox =
      toCanvas && canvasConfig
        ? this.createCanvasBox(canvasConfig)
        : this.calculateBoundingBox(validElements);

    return this.applyAction(
      validElements,
      action,
      refBox,
      toCanvas,
      canvasConfig,
    );
  }

  // ============================================================
  // FILTROS E TYPE GUARDS
  // ============================================================

  private filterValidElements(elements: AnyElement[]): ElementWithDimensions[] {
    return elements.filter(this.hasDimensions);
  }

  private hasDimensions(el: AnyElement): el is ElementWithDimensions {
    return (
      'dimensions' in el &&
      typeof el.dimensions === 'object' &&
      'width' in el.dimensions &&
      'height' in el.dimensions
    );
  }

  // ============================================================
  // CÁLCULO DE BOUNDING BOX
  // ============================================================

  private createCanvasBox(config: {
    widthMM: number;
    heightMM: number;
  }): BoundingBox {
    return { minX: 0, minY: 0, maxX: config.widthMM, maxY: config.heightMM };
  }

  private calculateBoundingBox(elements: ElementWithDimensions[]): BoundingBox {
    const box: BoundingBox = {
      minX: Infinity,
      minY: Infinity,
      maxX: -Infinity,
      maxY: -Infinity,
    };

    for (const el of elements) {
      const { x, y } = el.position;
      const { width, height } = el.dimensions;

      box.minX = Math.min(box.minX, x);
      box.minY = Math.min(box.minY, y);
      box.maxX = Math.max(box.maxX, x + width);
      box.maxY = Math.max(box.maxY, y + height);
    }

    return box;
  }

  // ============================================================
  // APLICAÇÃO DE AÇÕES
  // ============================================================

  private applyAction(
    elements: ElementWithDimensions[],
    action: AlignAction,
    refBox: BoundingBox,
    toCanvas: boolean,
    canvasConfig?: { widthMM: number; heightMM: number },
  ): UpdateResult {
    switch (action) {
      case 'alignLeft':
        return this.mapUpdates(elements, (el) => ({
          x: refBox.minX,
          y: el.position.y,
        }));

      case 'alignCenter':
        return this.mapUpdates(elements, (el) => ({
          x: (refBox.minX + refBox.maxX) / 2 - el.dimensions.width / 2,
          y: el.position.y,
        }));

      case 'alignRight':
        return this.mapUpdates(elements, (el) => ({
          x: refBox.maxX - el.dimensions.width,
          y: el.position.y,
        }));

      case 'alignTop':
        return this.mapUpdates(elements, (el) => ({
          x: el.position.x,
          y: refBox.minY,
        }));

      case 'alignMiddle':
        return this.mapUpdates(elements, (el) => ({
          x: el.position.x,
          y: (refBox.minY + refBox.maxY) / 2 - el.dimensions.height / 2,
        }));

      case 'alignBottom':
        return this.mapUpdates(elements, (el) => ({
          x: el.position.x,
          y: refBox.maxY - el.dimensions.height,
        }));

      case 'distributeHorizontal':
        return toCanvas && canvasConfig
          ? this.distributeToCanvas(elements, 'x', canvasConfig.widthMM)
          : this.distributeInSelection(elements, 'x');

      case 'distributeVertical':
        return toCanvas && canvasConfig
          ? this.distributeToCanvas(elements, 'y', canvasConfig.heightMM)
          : this.distributeInSelection(elements, 'y');
    }
  }

  // ============================================================
  // HELPERS DE ATUALIZAÇÃO
  // ============================================================

  private mapUpdates(
    elements: ElementWithDimensions[],
    calcPosition: (el: ElementWithDimensions) => { x: number; y: number },
  ): UpdateResult {
    return elements.map((el) => ({
      id: el.id,
      updates: { position: calcPosition(el) },
    }));
  }

  // ============================================================
  // DISTRIBUIÇÃO
  // ============================================================

  private distributeToCanvas(
    elements: ElementWithDimensions[],
    axis: 'x' | 'y',
    canvasDimension: number,
  ): UpdateResult {
    const sorted = this.sortByAxis(elements, axis);
    const dimProp = axis === 'x' ? 'width' : 'height';

    const totalContentSize = sorted.reduce(
      (sum, el) => sum + el.dimensions[dimProp],
      0,
    );
    const gap = (canvasDimension - totalContentSize) / (sorted.length + 1);

    let currentPos = gap;

    return sorted.map((el) => {
      const position = { ...el.position, [axis]: currentPos };
      currentPos += el.dimensions[dimProp] + gap;

      return { id: el.id, updates: { position } };
    });
  }

  private distributeInSelection(
    elements: ElementWithDimensions[],
    axis: 'x' | 'y',
  ): UpdateResult {
    if (elements.length < 3) return [];

    const sorted = this.sortByAxis(elements, axis);
    const dimProp = axis === 'x' ? 'width' : 'height';

    const first = sorted[0];
    const last = sorted[sorted.length - 1];

    const firstEnd = first.position[axis] + first.dimensions[dimProp];
    const lastStart = last.position[axis];

    const middleElements = sorted.slice(1, -1);
    const totalMiddleSize = middleElements.reduce(
      (sum, el) => sum + el.dimensions[dimProp],
      0,
    );

    const availableSpace = lastStart - firstEnd;
    const gap = (availableSpace - totalMiddleSize) / (sorted.length - 1);

    let currentPos = firstEnd + gap;

    return middleElements.map((el) => {
      const position = { ...el.position, [axis]: currentPos };
      currentPos += el.dimensions[dimProp] + gap;

      return { id: el.id, updates: { position } };
    });
  }

  private sortByAxis(
    elements: ElementWithDimensions[],
    axis: 'x' | 'y',
  ): ElementWithDimensions[] {
    return [...elements].sort((a, b) => a.position[axis] - b.position[axis]);
  }
}

export const layoutService = new LayoutService();
