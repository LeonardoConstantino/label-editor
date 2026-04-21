import { AnyElement, ElementType } from '../models/Label';
import { DEFAULTS } from '../../constants/defaults';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class ElementValidator {
  private static readonly HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;

  public static validate(element: AnyElement): ValidationResult {
    const errors: string[] = [];

    // Validações Base
    if (element.opacity < 0 || element.opacity > 1) {
      errors.push('Opacidade deve estar entre 0 e 1.');
    }

    // Validações Específicas
    switch (element.type) {
      case ElementType.TEXT:
        this.validateText(element, errors);
        break;
      case ElementType.RECTANGLE:
        this.validateRectangle(element, errors);
        break;
      case ElementType.IMAGE:
        this.validateImage(element, errors);
        break;
      case ElementType.BORDER:
        this.validateBorder(element, errors);
        break;
    }

    // Validações de Dimensões (para os que possuem)
    if ('dimensions' in element) {
      if (element.dimensions.width <= 0) errors.push('Largura deve ser maior que zero.');
      if (element.dimensions.height <= 0) errors.push('Altura deve ser maior que zero.');
      
      if (element.dimensions.width > DEFAULTS.LIMITS.MAX_WIDTH_MM) {
        errors.push(`Largura excede o limite de ${DEFAULTS.LIMITS.MAX_WIDTH_MM}mm.`);
      }
      if (element.dimensions.height > DEFAULTS.LIMITS.MAX_HEIGHT_MM) {
        errors.push(`Altura excede o limite de ${DEFAULTS.LIMITS.MAX_HEIGHT_MM}mm.`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private static validateText(el: any, errors: string[]): void {
    if (el.fontSize <= 0) errors.push('Tamanho da fonte deve ser maior que zero.');
    if (!this.isValidHex(el.color)) errors.push('Cor do texto inválida.');
    if (el.lineHeight < 0) errors.push('Espaçamento entre linhas não pode ser negativo.');
  }

  private static validateRectangle(el: any, errors: string[]): void {
    if (!this.isValidHex(el.fillColor)) errors.push('Cor de preenchimento inválida.');
    if (!this.isValidHex(el.strokeColor)) errors.push('Cor da borda inválida.');
    if (el.strokeWidth < 0) errors.push('Espessura da borda não pode ser negativa.');
    if (el.borderRadius < 0) errors.push('Raio da borda não pode ser negativo.');
  }

  private static validateImage(_el: any, _errors: string[]): void {
    // Para imagens, src pode estar vazio inicialmente se estivermos esperando upload
    // Mas se houver algo, talvez validar se é uma URL ou Base64 básica?
  }

  private static validateBorder(el: any, errors: string[]): void {
    if (el.width <= 0) errors.push('Espessura da moldura deve ser maior que zero.');
    if (!this.isValidHex(el.color)) errors.push('Cor da moldura inválida.');
    if (el.radius < 0) errors.push('Raio da moldura não pode ser negativo.');
  }

  private static isValidHex(color: string): boolean {
    return this.HEX_COLOR_REGEX.test(color);
  }
}

export const elementValidator = ElementValidator;
