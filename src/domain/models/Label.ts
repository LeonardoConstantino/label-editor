import { ElementType } from './elements/BaseElement';
import { 
  TextElement, 
  ImageElement, 
  RectangleElement, 
  BorderElement,
  CodeElement
} from './elements/SpecificElements';

// Re-exportando para facilitar o acesso de outros componentes
export { ElementType };

export type AnyElement = TextElement | ImageElement | RectangleElement | BorderElement | CodeElement;

export interface CustomFont {
  id: string;
  name: string;
  url: string;
  active: boolean;
}

export interface CanvasConfig {
  widthMM: number;
  heightMM: number;
  dpi: number;
  previewScale: number;
  backgroundColor: string;
  customFonts?: CustomFont[]; // Task 85: Fontes externas injetadas
}

export interface Label {
  id: string;
  name: string;
  config: CanvasConfig;
  elements: AnyElement[];
  thumbnail?: string; // Imagem base64 para preview
  createdAt: number;
  updatedAt: number;
}
