import { logger } from './Logger';

/**
 * DataSanitizer: O guardião da integridade de dados do Label Forge OS.
 * Implementa políticas de "Zero Trust" para todas as entradas de usuário.
 */
export class DataSanitizer {
  /** Limite de caracteres para renderização segura de uma única string/campo */
  public static readonly MAX_SAFE_TEXT_LENGTH = 4000;
  
  /** Limite de registros em uma única fonte de dados (CSV/JSON/TXT) */
  public static readonly MAX_RECORDS = 5000;
  
  /** Limite total de bytes para um arquivo de texto (DoS Protection) */
  public static readonly MAX_FILE_SIZE_BYTES = 1024 * 1024 * 2; // 2MB

  private static readonly MAX_RECURSION_DEPTH = 2;

  /**
   * Escapa HTML de forma ultra-rápida sem usar o DOM (seguro para Workers).
   */
  public static escapeHTML(str: string): string {
    if (typeof str !== 'string') return String(str);
    
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Sanitiza um valor de dado bruto vindo de CSV/JSON.
   * Foca em integridade física (tamanho, caracteres de controle).
   */
  public static sanitizeValue(value: any, depth: number = 1): any {
    if (value === null || value === undefined) return '';
    
    if (typeof value === 'string') {
      // 1. Limite de tamanho (DoS Protection)
      if (value.length > this.MAX_SAFE_TEXT_LENGTH) {
        logger.warn('Sanitizer', 'Field too large, truncating...');
        value = value.substring(0, this.MAX_SAFE_TEXT_LENGTH) + ' [TRUNCATED]';
      }

      // 2. Remove caracteres de controle perigosos
      // eslint-disable-next-line no-control-regex
      value = value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

      return value;
    }

    if (typeof value === 'object') {
       return this.sanitizeObject(value, depth);
    }

    return value;
  }

  /**
   * Sanitiza um objeto recursivamente com limite de profundidade.
   */
  private static sanitizeObject(obj: any, depth: number): any {
    if (depth > this.MAX_RECURSION_DEPTH) return '[NESTED_OBJECT_LIMIT]';
    
    if (Array.isArray(obj)) {
      return obj.map(v => this.sanitizeValue(v, depth + 1));
    }

    const sanitized: Record<string, any> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const safeKey = this.escapeHTML(key);
        sanitized[safeKey] = this.sanitizeValue(obj[key], depth + 1);
      }
    }
    return sanitized;
  }

  /**
   * Verifica se um conteúdo SVG é seguro.
   */
  public static isSafeSVG(svgContent: string): boolean {
    const maliciousPatterns = [
      /<script/i,
      /on\w+=/i,
      /javascript:/i,
      /data:/i,
      /<foreignObject/i
    ];

    for (const pattern of maliciousPatterns) {
      if (pattern.test(svgContent)) {
        logger.error('Sanitizer', `Malicious pattern detected in SVG: ${pattern}`);
        return false;
      }
    }

    return true;
  }
}
