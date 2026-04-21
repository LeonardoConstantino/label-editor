import { ElementType } from './elements/BaseElement';
import { 
  TextElement, 
  ImageElement, 
  RectangleElement, 
  BorderElement 
} from './elements/SpecificElements';

// Re-exportando para facilitar o acesso de outros componentes
export { ElementType };

export type AnyElement = TextElement | ImageElement | RectangleElement | BorderElement;

export interface CanvasConfig {
  widthMM: number;
  heightMM: number;
  dpi: number;
  previewScale: number;
  backgroundColor: string;
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
