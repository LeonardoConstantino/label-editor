import { describe, it, expect } from 'vitest';
import { DataSourceParser } from '../DataSourceParser';

describe('DataSourceParser - Pro Enhancements (Task 84)', () => {
  
  describe('Dynamic Locales', () => {
    const data = { valor: 1234.56 };

    it('should format currency with default locale (pt-BR)', () => {
      const result = DataSourceParser.interpolate('{{valor:currency}}', data);
      // expect(result).toBe('R$ 1.234,56'); // Note: Intl spacing can vary by environment
      expect(result).toContain('1.234,56');
    });

    it('should format currency with US locale', () => {
      const result = DataSourceParser.interpolate('{{valor:currency(en-US,USD)}}', data);
      expect(result).toContain('$1,234.56');
    });

    it('should format numbers with German locale', () => {
      const result = DataSourceParser.interpolate('{{valor:number(de-DE)}}', data);
      expect(result).toBe('1.234,56');
    });

    it('should format percent with US locale', () => {
      const dataPercent = { ratio: 0.125 };
      const result = DataSourceParser.interpolate('{{ratio:percent(en-US)}}', dataPercent);
      expect(result).toBe('12.5%');
    });
  });

  describe('Date Arithmetic (Offsets)', () => {
    const data = { fab: '2026-05-20' };

    it('should add 30 days correctly', () => {
      // {{fab:date_add(30,days):date}} -> adds 30 days then formats as BR date
      const result = DataSourceParser.interpolate('{{fab:date_add(30,days):date}}', data);
      expect(result).toBe('19/06/2026');
    });

    it('should subtract 1 year correctly', () => {
      const result = DataSourceParser.interpolate('{{fab:date_sub(1,year):date}}', data);
      expect(result).toBe('20/05/2025');
    });

    it('should format custom date style', () => {
      const result = DataSourceParser.interpolate('{{fab:date_format(en-US,long)}}', data);
      expect(result).toBe('May 20, 2026');
    });
  });

  describe('JSON Safety', () => {
    it('should sanitize and stringify JSON objects without crashing', () => {
      const complex = { 
        a: 1, 
        b: { c: 2, d: { e: "too deep" } } 
      };
      // DataSanitizer.MAX_RECURSION_DEPTH is 2.
      // root (depth 1) -> b (depth 2) -> d (depth 3, limit hit)
      const result = DataSourceParser.interpolate('{{obj:json}}', { obj: complex });
      const parsed = JSON.parse(result);
      expect(parsed.b.d).toBe('[NESTED_OBJECT_LIMIT]');
    });
  });

  describe('Fallback & Robustness', () => {
    it('should handle non-numeric values in numeric formatters gracefully', () => {
      const result = DataSourceParser.interpolate('{{val:currency}}', { val: 'not a number' });
      expect(result).toContain('0,00');
    });

    it('should return original value on invalid date input', () => {
      const result = DataSourceParser.interpolate('{{val:date_add(10,days)}}', { val: 'invalid' });
      expect(result).toBe('invalid');
    });
  });
});
