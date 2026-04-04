import { ElementType, AnyElement } from '../Label';
import { DEFAULTS } from '../../../constants/defaults';

/**
 * ElementFactory: Centraliza a criação de novos elementos garantindo 
 * a integridade dos dados e a geração de IDs únicos.
 */
export class ElementFactory {
  /**
   * Cria uma nova instância de elemento baseada no tipo.
   */
  public static create(type: ElementType, overrides: Partial<AnyElement> = {}): AnyElement {
    const defaultData = DEFAULTS[type] || {};
    const commonData = {
      ...DEFAULTS.COMMON,
      id: crypto.randomUUID(),
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${Date.now().toString().slice(-4)}`
    };

    return {
      ...commonData,
      ...defaultData,
      ...overrides
    } as AnyElement;
  }
}
