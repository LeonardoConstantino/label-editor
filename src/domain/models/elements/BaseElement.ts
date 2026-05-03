export enum ElementType {
  BORDER = 'border',
  RECTANGLE = 'rectangle',
  TEXT = 'text',
  IMAGE = 'image'
}

export enum BorderStyle {
  SOLID = 'solid',
  DASHED = 'dashed',
  DOTTED = 'dotted',
  DOUBLE = 'double'
}

export enum TextOverflow {
  CLIP = 'clip',
  ELLIPSIS = 'ellipsis',
  WRAP = 'wrap',
  SCALE = 'scale'
}

export enum ImageFit {
  COVER = 'cover',
  CONTAIN = 'contain',
  FILL = 'fill',
  NONE = 'none'
}

/**
 * CompositeOperation: Modos de mesclagem (Blending Modes) do Canvas.
 */
export enum CompositeOperation {
  SOURCE_OVER = 'source-over',
  MULTIPLY = 'multiply',
  SCREEN = 'screen',
  OVERLAY = 'overlay',
  DARKEN = 'darken',
  LIGHTEN = 'lighten',
  COLOR_DODGE = 'color-dodge',
  COLOR_BURN = 'color-burn',
  HARD_LIGHT = 'hard-light',
  SOFT_LIGHT = 'soft-light',
  DIFFERENCE = 'difference',
  EXCLUSION = 'exclusion'
}

export interface Position {
  x: number; // em mm
  y: number; // em mm
}

export interface Dimensions {
  width: number;  // em mm
  height: number; // em mm
}

/**
 * BaseElement: Propriedades universais de todo elemento.
 * Sincronizado com definition_elements.md (v1.1) + Task 55
 */
export interface BaseElement {
  id: string;
  type: ElementType;
  name: string;
  position: Position;
  zIndex: number;
  rotation: number; // 0-360
  opacity: number;  // 0-1
  locked: boolean;
  visible: boolean;
  keepRatio: boolean; // Task 55: Vínculo de proporção
}
