import { logger } from '../core/Logger';

/**
 * FontLoader: Utilitário para gerenciar a injeção de fontes externas no head do documento.
 */
export class FontLoader {
  /**
   * Injeta uma URL de CSS (geralmente Google Fonts) no head.
   */
  static inject(url: string): void {
    if (!url || typeof document === 'undefined') return;
    
    // Evita injeção duplicada
    if (document.querySelector(`link[href="${url}"]`)) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
    logger.debug('FontLoader', `Font link injected: ${url}`);
  }

  /**
   * Remove um link de fonte injetado.
   */
  static remove(url: string): void {
    if (!url || typeof document === 'undefined') return;
    const link = document.querySelector(`link[href="${url}"]`);
    if (link) {
      document.head.removeChild(link);
      logger.debug('FontLoader', `Font link removed: ${url}`);
    }
  }
}
