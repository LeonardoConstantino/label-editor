import { AnyElement, ElementType } from '../models/Label';
import { 
  TextElement, 
  RectangleElement, 
  ImageElement, 
  BorderElement 
} from '../models/elements/SpecificElements';
import { DEFAULTS } from '../../constants/defaults';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * ElementValidator: Garante a integridade dos dados dos elementos antes da persistência ou renderização.
 */
export class ElementValidator {
  private static readonly HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;

  public static validate(element: AnyElement): ValidationResult {
    const errors: string[] = [];

    // Validações Base (Propriedades Universais)
    if (element.opacity < 0 || element.opacity > 1) {
      errors.push('Opacidade deve estar entre 0 e 1.');
    }
    
    if (element.rotation < 0 || element.rotation > 360) {
      errors.push('Rotação deve estar entre 0 e 360 graus.');
    }

    if (!element.id) errors.push('Elemento deve possuir um ID único.');
    if (!element.name) errors.push('Elemento deve possuir um nome.');

    // Validações Específicas por Tipo
    switch (element.type) {
      case ElementType.TEXT:
        this.validateText(element as TextElement, errors);
        break;
      case ElementType.RECTANGLE:
        this.validateRectangle(element as RectangleElement, errors);
        break;
      case ElementType.IMAGE:
        this.validateImage(element as ImageElement, errors);
        break;
      case ElementType.BORDER:
        this.validateBorder(element as BorderElement, errors);
        break;
    }

    // Validações de Dimensões (para elementos que as possuem)
    if ('dimensions' in element) {
      const el = element as any; // Cast temporário para acessar dimensions de forma genérica
      if (el.dimensions.width <= 0) errors.push('Largura deve ser maior que zero.');
      if (el.dimensions.height <= 0) errors.push('Altura deve ser maior que zero.');
      
      if (el.dimensions.width > DEFAULTS.LIMITS.MAX_WIDTH_MM) {
        errors.push(`Largura excede o limite de ${DEFAULTS.LIMITS.MAX_WIDTH_MM}mm.`);
      }
      if (el.dimensions.height > DEFAULTS.LIMITS.MAX_HEIGHT_MM) {
        errors.push(`Altura excede o limite de ${DEFAULTS.LIMITS.MAX_HEIGHT_MM}mm.`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private static validateText(el: TextElement, errors: string[]): void {
    if (el.fontSize <= 0) errors.push('Tamanho da fonte deve ser maior que zero.');
    if (!this.isValidHex(el.color)) errors.push('Cor do texto inválida.');
    if (el.lineHeight < 0) errors.push('Espaçamento entre linhas não pode ser negativo.');
    if (el.content.trim() === '') errors.push('Conteúdo do texto não pode estar vazio.');
  }

  private static validateRectangle(el: RectangleElement, errors: string[]): void {
    if (el.fillColor !== 'transparent' && !this.isValidHex(el.fillColor)) {
      errors.push('Cor de preenchimento inválida.');
    }
    if (!this.isValidHex(el.strokeColor)) errors.push('Cor da borda inválida.');
    if (el.strokeWidth < 0) errors.push('Espessura da borda não pode ser negativa.');
    if (el.borderRadius < 0) errors.push('Raio da borda não pode ser negativo.');
  }

  private static validateImage(el: ImageElement, errors: string[]): void {
    const validFits = ['cover', 'contain', 'fill', 'none'];
    if (!validFits.includes(el.fit)) {
      errors.push('Modo de ajuste de imagem inválido.');
    }
  }

  private static validateBorder(el: BorderElement, errors: string[]): void {
    if (el.width <= 0) errors.push('Espessura da moldura deve ser maior que zero.');
    if (!this.isValidHex(el.color)) errors.push('Cor da moldura inválida.');
    if (el.radius < 0) errors.push('Raio da moldura não pode ser negativo.');
  }

  private static isValidHex(color: string): boolean {
    return this.HEX_COLOR_REGEX.test(color);
  }
}

export const elementValidator = ElementValidator;
