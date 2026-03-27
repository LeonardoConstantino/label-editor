import { BaseElement } from './elements/BaseElement';
import { TextElement, ImageElement, RectangleElement } from './elements/SpecificElements';

export type AnyElement = TextElement | ImageElement | RectangleElement | BaseElement;

export interface CanvasConfig {
  widthMM: number;
  heightMM: number;
  dpi: number;
  previewScale: number;
}

export interface Label {
  id: string;
  name: string;
  config: CanvasConfig;
  elements: AnyElement[];
  createdAt: number;
  updatedAt: number;
}
