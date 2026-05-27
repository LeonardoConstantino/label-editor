import { ElementType, AnyElement } from '../Label';
import { DEFAULTS } from '../../../constants/defaults';
import { store } from '../../../core/Store';

/**
 * ElementFactory: Centraliza a criação de novos elementos garantindo 
 * a integridade dos dados e a geração de IDs únicos.
 */
export class ElementFactory {
  /**
   * Cria uma nova instância de elemento baseada no tipo.
   */
  public static create(type: ElementType, overrides: Partial<AnyElement> = {}): AnyElement {
    const prefs = store.getState().preferences;
    const defaultData = { ...(DEFAULTS[type] || {}) };
    
    // Aplica preferências de design (Task 75 Roadmap)
    if (type === ElementType.TEXT && prefs.defaultFontFamily) {
      (defaultData as any).fontFamily = prefs.defaultFontFamily;
    }

    const commonData = {
      ...DEFAULTS.COMMON,
      id: crypto.randomUUID(),
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${Date.now().toString().slice(-4)}`,
      locked: prefs.autoLockOnCreation ?? DEFAULTS.COMMON.locked
    };

    return {
      ...commonData,
      ...defaultData,
      ...overrides
    } as AnyElement;
  }
}
