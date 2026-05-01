import { InspectorChangeDetail, InspectorActionDetail } from './inspector.types';

export const INSPECTOR_CHANGE = 'inspector:change';
export const INSPECTOR_ACTION = 'inspector:action';

/**
 * Helper para disparar mudanças de propriedades.
 */
export function dispatchInspectorChange(
  target: HTMLElement, 
  detail: InspectorChangeDetail
): void {
  target.dispatchEvent(new CustomEvent<InspectorChangeDetail>(INSPECTOR_CHANGE, {
    detail,
    bubbles: true,
    composed: true
  }));
}

/**
 * Helper para disparar ações de comando.
 */
export function dispatchInspectorAction(
  target: HTMLElement, 
  detail: InspectorActionDetail
): void {
  target.dispatchEvent(new CustomEvent<InspectorActionDetail>(INSPECTOR_ACTION, {
    detail,
    bubbles: true,
    composed: true
  }));
}

/**
 * resolveInspectorValue: Filtro de Contrato de Componentes.
 * Extrai o valor legítimo do evento, ignorando o ruído nativo (borbulhamento).
 */
export function resolveInspectorValue(e: Event): string | number | boolean | null | undefined {
  const target = e.target as HTMLElement;
  const tagName = target.tagName.toLowerCase();
  const detail = (e as CustomEvent).detail;

  // 1. Caso APP-INPUT: Aceita apenas o evento customizado, ignora o ruído 'input'/'change'
  if (tagName === 'app-input') {
    return e.type === 'app-input' ? detail : undefined;
  }

  // 2. Caso SCRUBBER: Extrai obrigatoriamente do contrato detail.value
  if (tagName === 'ui-number-scrubber') {
    return (detail && typeof detail === 'object' && 'value' in detail) ? detail.value : undefined;
  }

  // 3. Caso NATIVO (Checkbox, Select ou Input real fora do shadow DOM)
  if (e.type === 'change' || e.type === 'input') {
    // Checkbox deve ser verificado ANTES de 'value' pois ele também possui a propriedade 'value'
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      return target.checked;
    }
    if ('value' in target) {
      return (target as any).value;
    }
  }

  return undefined;
}
