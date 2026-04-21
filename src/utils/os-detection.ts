export let metaKey: string = 'Ctrl'; // Label para exibição
export let metaKeyName: string = 'Control'; // Nome para eventos de teclado (event.key)
export let isMac: boolean = false;
export let isMobile: boolean = false;

/**
 * Detecta o sistema operacional e ajusta as variáveis globais
 * Deve ser chamado no init() da aplicação
 */
export const detectOS = (): void => {
  if (typeof navigator !== 'undefined') {
    // Verifica se é Mac (macOS, iPhone, iPad)
    // navigator.platform é deprecated mas ainda o método mais confiável cross-browser para isso
    const platform = navigator.platform.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();

    isMac = platform.includes('mac') || userAgent.includes('mac os');

    if (isMac) {
      metaKey = '⌘'; // Símbolo bonito para UI
      metaKeyName = 'Meta'; // Nome técnico do evento JS
    } else {
      metaKey = 'Ctrl';
      metaKeyName = 'Control';
    }
  }
};

/**
 * Verifica se o dispositivo atual é um dispositivo móvel.
 */
export const detectIsMobile = (): void => {
  // Verifica se o user agent contém 'Mobi' ou 'Android' ou se a largura da janela é menor ou igual a 768 pixels.
  isMobile =
    /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
};

/**
 * Interface para o retorno consolidado das informações de detecção
 */
export interface OSDetectionInfo {
  metaKey: string;
  metaKeyName: string;
  isMac: boolean;
  isMobile: boolean;
  platform: string;
  userAgent: string;
}

/**
 * Retorna todas as informações de detecção consolidadas
 * Executa as detecções automaticamente se ainda não foram executadas
 */
export const getOSInfo = (): OSDetectionInfo => {
  // Executa detecções se necessário
  detectOS();
  detectIsMobile();

  return {
    metaKey,
    metaKeyName,
    isMac,
    isMobile,
    platform: typeof navigator !== 'undefined' ? navigator.platform : 'unknown',
    userAgent:
      typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
  };
};
