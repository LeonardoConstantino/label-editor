import { BaseElement, ElementType } from '../models/elements/BaseElement';
import { CanvasConfig } from '../models/Label';
import { CodeValidator } from '../../utils/CodeValidator';
import { CodeElement } from '../models/elements/SpecificElements';

export interface OverflowResult {
  overflow: boolean;
  axis?: 'x' | 'y' | 'both';
  amountX?: number;
  amountY?: number;
  message?: string; // Task 58 Pro: Mensagem de erro de formato
}

/**
 * OverflowValidator: Valida se elementos estão dentro dos limites físicos da etiqueta (mm)
 * e agora também valida integridade de formato para elementos complexos (ex: Barcodes).
 */
export class OverflowValidator {
  /**
   * Verifica se um elemento extrapola os limites ou possui erros de formato.
   */
  public check(element: BaseElement, config: CanvasConfig): OverflowResult {
    const result: OverflowResult = { overflow: false };

    // 1. Validação de Formato (Task 58)
    if (element.type === ElementType.CODE) {
      const el = element as CodeElement;
      if (!CodeValidator.isValid(el.content, el.codeType) && !el.content.includes('{{')) {
        result.overflow = true;
        result.message = CodeValidator.getErrorMessage(el.codeType);
      }
    }

    // 2. Validação de Limites Físicos
    if ('dimensions' in element) {
      const el = element as any;
      const rightEdge = el.position.x + el.dimensions.width;
      const bottomEdge = el.position.y + el.dimensions.height;

      const overflowX = rightEdge > config.widthMM || el.position.x < 0;
      const overflowY = bottomEdge > config.heightMM || el.position.y < 0;

      if (overflowX || overflowY) {
        result.overflow = true;
        result.axis = overflowX && overflowY ? 'both' : overflowX ? 'x' : 'y';
        result.amountX = overflowX ? (el.position.x < 0 ? -el.position.x : rightEdge - config.widthMM) : 0;
        result.amountY = overflowY ? (el.position.y < 0 ? -el.position.y : bottomEdge - config.heightMM) : 0;
        
        if (!result.message) {
          result.message = 'Element out of bounds.';
        }
      }
    }

    return result;
  }
}

export const overflowValidator = new OverflowValidator();
