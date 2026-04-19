import { describe, it, expect } from 'vitest';
import { elementValidator } from '../ElementValidator';
import { ElementType } from '../../models/elements/BaseElement';

describe('ElementValidator', () => {
  it('should validate a correct text element', () => {
    const el: any = {
      type: ElementType.TEXT,
      opacity: 1,
      fontSize: 12,
      color: '#000000',
      lineHeight: 1.2,
      dimensions: { width: 50, height: 10 }
    };
    const result = elementValidator.validate(el);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail on invalid hex color', () => {
    const el: any = {
      type: ElementType.TEXT,
      opacity: 1,
      fontSize: 12,
      color: 'not-a-color',
      lineHeight: 1.2,
      dimensions: { width: 50, height: 10 }
    };
    const result = elementValidator.validate(el);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Cor do texto inválida.');
  });

  it('should fail on negative font size', () => {
    const el: any = {
      type: ElementType.TEXT,
      opacity: 1,
      fontSize: -5,
      color: '#000000',
      lineHeight: 1.2,
      dimensions: { width: 50, height: 10 }
    };
    const result = elementValidator.validate(el);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Tamanho da fonte deve ser maior que zero.');
  });

  it('should fail on zero or negative dimensions', () => {
    const el: any = {
      type: ElementType.RECTANGLE,
      opacity: 1,
      fillColor: '#ffffff',
      strokeColor: '#000000',
      strokeWidth: 1,
      borderRadius: 0,
      dimensions: { width: 0, height: 10 }
    };
    const result = elementValidator.validate(el);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Largura deve ser maior que zero.');
  });

  it('should fail if dimensions exceed limits', () => {
    const el: any = {
      type: ElementType.RECTANGLE,
      opacity: 1,
      fillColor: '#ffffff',
      strokeColor: '#000000',
      strokeWidth: 1,
      borderRadius: 0,
      dimensions: { width: 1000, height: 10 }
    };
    const result = elementValidator.validate(el);
    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toMatch(/Largura excede o limite/);
  });

  it('should validate opacity range', () => {
    const el: any = {
      type: ElementType.TEXT,
      opacity: 1.5,
      fontSize: 12,
      color: '#000000',
      lineHeight: 1.2,
      dimensions: { width: 50, height: 10 }
    };
    const result = elementValidator.validate(el);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Opacidade deve estar entre 0 e 1.');
  });
});
