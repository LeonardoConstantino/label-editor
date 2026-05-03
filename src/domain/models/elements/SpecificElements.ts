import { BaseElement, Dimensions, BorderStyle, TextOverflow, ImageFit, CompositeOperation } from './BaseElement';

export type TextAlign = 'left' | 'center' | 'right';
export type VerticalAlign = 'top' | 'middle' | 'bottom';

export interface TextElement extends BaseElement {
  dimensions: Dimensions;
  content: string;
  fontFamily: string;
  fontSize: number; // pt
  fontWeight: number | string;
  fontStyle: string;
  color: string;
  textAlign: TextAlign;
  verticalAlign: VerticalAlign;
  overflow: TextOverflow;
  lineHeight: number;
  justify: boolean;
}

export interface RectangleElement extends BaseElement {
  dimensions: Dimensions;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  borderRadius: number;
}

export interface ImageElement extends BaseElement {
  dimensions: Dimensions;
  src: string;
  fit: ImageFit;
  smoothing: boolean;
  compositeOperation: CompositeOperation;
}

export interface BorderElement extends BaseElement {
  style: BorderStyle;
  width: number; // espessura em mm
  color: string;
  radius: number; // cantos em mm
}
