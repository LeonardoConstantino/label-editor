import { BaseElement } from '../../models/elements/BaseElement';
import { RenderContext } from './renderer-types';

/**
 * Interface comum para todos os renderers de elementos.
 */
export interface IRenderer {
  render(element: BaseElement, context: RenderContext): void;
}
