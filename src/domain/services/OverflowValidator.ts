import { BaseElement } from '../models/elements/BaseElement';
import { CanvasConfig } from '../models/Label';

export interface OverflowResult {
  overflow: boolean;
  axis?: 'x' | 'y' | 'both';
  amountX?: number;
  amountY?: number;
}

/**
 * OverflowValidator: Valida se elementos estão dentro dos limites físicos da etiqueta (mm).
 */
export class OverflowValidator {
  /**
   * Verifica se um elemento extrapola os limites do canvas.
   */
  public check(element: BaseElement, config: CanvasConfig): OverflowResult {
    if (!('dimensions' in element)) return { overflow: false };

    const el = element as any;
    const rightEdge = el.position.x + el.dimensions.width;
    const bottomEdge = el.position.y + el.dimensions.height;

    const overflowX = rightEdge > config.widthMM || el.position.x < 0;
    const overflowY = bottomEdge > config.heightMM || el.position.y < 0;

    if (!overflowX && !overflowY) {
      return { overflow: false };
    }

    return {
      overflow: true,
      axis: overflowX && overflowY ? 'both' : overflowX ? 'x' : 'y',
      amountX: overflowX ? (el.position.x < 0 ? -el.position.x : rightEdge - config.widthMM) : 0,
      amountY: overflowY ? (el.position.y < 0 ? -el.position.y : bottomEdge - config.heightMM) : 0
    };
  }
}

export const overflowValidator = new OverflowValidator();
