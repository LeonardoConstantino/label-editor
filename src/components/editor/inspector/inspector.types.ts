import { AnyElement } from '../../../domain/models/Label';

/**
 * Protocolo de Mudança de Propriedade (Inspector -> Orquestrador)
 */
export interface InspectorChangeDetail {
  /** 
   * Caminho da propriedade (ex: 'position.x', 'content', 'fontSize')
   * Se começar com 'doc.', refere-se à configuração global da etiqueta.
   * Se começar com 'pref.', refere-se às preferências do usuário.
   */
  prop: string;
  /** Novo valor (string, number, boolean, etc) */
  value: string | number | boolean | null;
}

/**
 * Protocolo de Ações (Inspector -> Orquestrador)
 */
export type InspectorActionType = 
  | 'select' 
  | 'toggle-vis' 
  | 'toggle-lock'
  | 'up' 
  | 'del' 
  | 'open-vault';

export interface InspectorActionDetail {
  action: InspectorActionType;
  /** ID do elemento alvo da ação (opcional para ações globais) */
  id?: string;
}

/**
 * Interfaces para os sub-componentes
 */
export interface InspectorSection extends HTMLElement {
  element: AnyElement;
}

export interface InspectorSectionProps {
  element: AnyElement;
}
