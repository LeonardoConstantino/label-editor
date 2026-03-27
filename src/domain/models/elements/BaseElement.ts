export enum ElementType {
  BORDER = 'border',
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle',
  TEXT = 'text',
  IMAGE = 'image'
}

export interface Position {
  x: number; // em mm
  y: number; // em mm
}

export interface Dimensions {
  width: number;  // em mm
  height: number; // em mm
}

export interface BaseElement {
  id: string;
  type: ElementType;
  position: Position;
  zIndex: number;
  locked?: boolean;
  visible?: boolean;
}
