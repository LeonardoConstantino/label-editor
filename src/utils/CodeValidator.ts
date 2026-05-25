/**
 * CodeValidator: Utilitário para validar formatos rígidos de códigos de barras (Task 58).
 */
export class CodeValidator {
  /**
   * Valida se o conteúdo é compatível com o tipo de código selecionado.
   * Suporta detecção de tags {{key}} que são sempre consideradas válidas na edição,
   * pois o valor real só existirá no momento da renderização.
   */
  public static isValid(content: string, type: string): boolean {
    if (!content) return false;

    // Se o conteúdo contiver uma tag de interpolação, permitimos passar
    // para não bloquear o usuário durante a edição do template.
    if (content.includes('{{') && content.includes('}}')) {
      return true;
    }

    switch (type) {
      case 'ean13':
        // EAN-13 deve ter 12 ou 13 dígitos numéricos
        return /^\d{12,13}$/.test(content);
      
      case 'upca':
        // UPC-A deve ter 11 ou 12 dígitos numéricos
        return /^\d{11,12}$/.test(content);
      
      case 'code128':
        // Code 128 aceita qualquer caractere ASCII padrão (0-127)
        // eslint-disable-next-line no-control-regex
        return /^[\x00-\x7F]+$/.test(content);
      
      case 'qrcode':
      case 'datamatrix':
        // 2D codes são flexíveis, validamos apenas se não está vazio
        return content.length > 0;
      
      default:
        return true;
    }
  }

  /**
   * Retorna uma mensagem de erro amigável para o formato.
   */
  public static getErrorMessage(type: string): string {
    switch (type) {
      case 'ean13': return 'EAN-13 requires exactly 12 or 13 digits.';
      case 'upca': return 'UPC-A requires exactly 11 or 12 digits.';
      case 'code128': return 'Invalid characters for Code 128.';
      default: return 'Invalid data for selected format.';
    }
  }
}
