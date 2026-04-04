import { ElementType, BorderStyle, TextOverflow, ImageFit } from '../domain/models/elements/BaseElement';

/**
 * DEFAULTS: Valores padrão para criação de novos elementos.
 * Sincronizado com definition_elements.md
 */
export const DEFAULTS = {
  CANVAS: {
    widthMM: 100,
    heightMM: 60,
    dpi: 300,
    previewScale: 1,
    backgroundColor: '#ffffff'
  },
  
  COMMON: {
    position: { x: 10, y: 10 },
    zIndex: 0,
    rotation: 0,
    opacity: 1,
    locked: false,
    visible: true
  },

  [ElementType.TEXT]: {
    dimensions: { width: 60, height: 12 },
    content: 'Nova Camada de Texto',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: 400,
    fontStyle: 'normal',
    color: '#000000',
    textAlign: 'center',
    verticalAlign: 'middle',
    overflow: TextOverflow.CLIP,
    lineHeight: 1.2
  },

  [ElementType.RECTANGLE]: {
    dimensions: { width: 40, height: 30 },
    fillColor: '#6366f1',
    strokeColor: '#262a33',
    strokeWidth: 0.5,
    borderRadius: 0
  },

  [ElementType.IMAGE]: {
    dimensions: { width: 40, height: 40 },
    src: '',
    fit: ImageFit.CONTAIN,
    smoothing: true,
    compositeOperation: 'source-over'
  },

  [ElementType.BORDER]: {
    style: BorderStyle.SOLID,
    width: 1,
    color: '#000000',
    radius: 0
  }
} as const;
