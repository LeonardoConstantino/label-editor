import { BaseElement, Dimensions, BorderStyle, TextOverflow, ImageFit } from './BaseElement';

export interface TextElement extends BaseElement {
  dimensions: Dimensions;
  content: string;
  fontFamily: string;
  fontSize: number; // pt
  fontWeight: number | string;
  fontStyle: string;
  color: string;
  textAlign: 'left' | 'center' | 'right';
  verticalAlign: 'top' | 'middle' | 'bottom';
  overflow: TextOverflow;
  lineHeight: number;
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
  compositeOperation: string;
}

export interface BorderElement extends BaseElement {
  style: BorderStyle;
  width: number; // espessura em mm
  color: string;
  radius: number; // cantos em mm
}
