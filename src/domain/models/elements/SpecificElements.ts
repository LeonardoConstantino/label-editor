import { BaseElement, Dimensions, Position, BorderStyle, TextOverflow, ImageFit, CompositeOperation } from './BaseElement';

export type TextAlign = 'left' | 'center' | 'right';
export type VerticalAlign = 'top' | 'middle' | 'bottom';
export type TextTransform = 'none' | 'uppercase' | 'lowercase';

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
  letterSpacing: number; // mm
  textTransform: TextTransform;
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

export type CodeType = 'qrcode' | 'code128' | 'ean13' | 'upca' | 'datamatrix';

export interface CodeElement extends BaseElement {
  dimensions: Dimensions;
  content: string; // Suporta interpolação {{key}}
  codeType: CodeType;
  color: string;
  backgroundColor: string;
  includeText: boolean; // Para barcodes: mostrar o texto legível abaixo
  errorCorrection: 'L' | 'M' | 'Q' | 'H'; // Apenas para QR
}

export interface LineElement extends BaseElement {
  endPosition: Position; // Ponto final em mm
  strokeWidth: number;   // Espessura em mm
  color: string;
  style: BorderStyle;
}
