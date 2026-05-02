import { ElementType, BorderStyle, TextOverflow, ImageFit } from '../domain/models/elements/BaseElement';

/**
 * DEBUG: Flag global para ativar/desativar logs de debug detalhados.
 */
const debug = {
  state: true,
};

export const setDebug = (value: boolean) => {
  debug.state = value;
};

export const getDebug = () => debug.state;

/**
 * LABEL_PRESETS: Dimensões comuns de etiquetas do mercado.
 */
export const LABEL_PRESETS = [
  { value: 'custom', label: 'Custom Size', sublabel: 'Manual Dimensions' },
  { value: 'small', label: 'Small Address', sublabel: '30 x 20 mm', w: 30, h: 20 },
  { value: 'medium', label: 'Standard Product', sublabel: '50 x 30 mm', w: 50, h: 30 },
  { value: 'large', label: 'Large Asset', sublabel: '100 x 50 mm', w: 100, h: 50 },
  { value: 'shipping', label: 'Shipping Label', sublabel: '100 x 150 mm', w: 100, h: 150 },
  { value: 'a4', label: 'A4 Full Sheet', sublabel: '210 x 297 mm', w: 210, h: 297 },
  { value: 'business-card', label: 'Business Card', sublabel: '85 x 55 mm', w: 85, h: 55 }
];

/**
 * DEFAULTS: Valores padrão para criação de novos elementos e configuração do canvas.
 * Sincronizado com definition_elements.md (v1.1)
 */
export const DEFAULTS = {
  CANVAS: {
    widthMM: 100,
    heightMM: 60,
    dpi: 300,
    previewScale: 1,
    backgroundColor: '#ffffff'
  },

  LIMITS: {
    MAX_WIDTH_MM: 500,
    MAX_HEIGHT_MM: 500,
    MIN_DIMENSION_MM: 5,
    MAX_DPI: 600,
    MIN_DPI: 72
  },
  
  /**
   * COMMON: Propriedades universais de todo elemento (BaseElement).
   */
  COMMON: {
    position: { x: 10, y: 10 },
    zIndex: 0,
    rotation: 0,
    opacity: 1,
    locked: false,
    visible: true,
    keepRatio: false
  },

  [ElementType.TEXT]: {
    dimensions: { width: 60, height: 12 },
    content: 'Nova Camada de Texto',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: 400,
    fontStyle: 'normal',
    color: '#000000',
    textAlign: 'center' as const,
    verticalAlign: 'middle' as const,
    overflow: TextOverflow.WRAP,
    lineHeight: 1.2,
    justify: false
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
    compositeOperation: 'source-over',
    keepRatio: true
  },

  [ElementType.BORDER]: {
    position: { x: 5, y: 5 }, // Override para margem de 5mm por padrão
    style: BorderStyle.SOLID,
    width: 1,
    color: '#000000',
    radius: 0
  }
} as const;
