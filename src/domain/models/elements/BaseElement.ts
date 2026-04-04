export enum ElementType {
  BORDER = 'border',
  RECTANGLE = 'rectangle',
  TEXT = 'text',
  IMAGE = 'image'
}

export enum BorderStyle {
  SOLID = 'solid',
  DASHED = 'dashed',
  DOTTED = 'dotted'
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
  FILL = 'fill'
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
 */
export interface BaseElement {
  id: string;
  type: ElementType;
  name: string;
  position: Position;
  zIndex: number;
  rotation: number;
  opacity: number;
  locked: boolean;
  visible: boolean;
}
