import { BaseElement, ElementType, Dimensions } from './BaseElement';

export interface TextElement extends BaseElement {
  type: ElementType.TEXT;
  dimensions: Dimensions;
  content: string;
  fontFamily: string;
  fontSize: number; // em pt
  fontWeight: string | number;
  color: string;
  textAlign: 'left' | 'center' | 'right';
}

export interface ImageElement extends BaseElement {
  type: ElementType.IMAGE;
  dimensions: Dimensions;
  src: string; // base64
  fit: 'cover' | 'contain' | 'fill';
}

export interface RectangleElement extends BaseElement {
  type: ElementType.RECTANGLE;
  dimensions: Dimensions;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}
