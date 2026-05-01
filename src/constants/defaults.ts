import { ElementType, BorderStyle, TextOverflow, ImageFit } from '../domain/models/elements/BaseElement';

/**
 * DEBUG: Flag global para ativar/desativar logs de debug detalhados.
 * Deve ser false em produção para evitar poluição de logs e impacto de performance.
 * Pode ser sobrescrito por instâncias específicas do EventBus ou Logger.
 * Sincronizado com definition_elements.md
 */
const debug = {
  state: false,
};

/**
 * setDebug: Função para alterar o valor da flag de debug em tempo de execução.
 * Útil para ativar logs detalhados durante desenvolvimento ou troubleshooting sem precisar recompilar.
 * Exemplo de uso: setDebug(true) para ativar, setDebug(false) para desativar.
 */
export const setDebug = (value: boolean) => {
  debug.state = value;
};

export const getDebug = () => debug.state;

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

  /**
   * LIMITS: Restrições técnicas para garantir estabilidade e performance.
   * Evita estouro de memória RAM ao renderizar em 300 DPI.
   */
  LIMITS: {
    MAX_WIDTH_MM: 500,  // 0.5 metro
    MAX_HEIGHT_MM: 500,
    MIN_DIMENSION_MM: 5,
    MAX_DPI: 600,
    MIN_DPI: 72
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
