import { describe, it, expect } from 'vitest';
import { DataSourceParser } from '../../domain/services/DataSourceParser';
import { DataSanitizer } from '../../core/DataSanitizer';

describe('Security Audit: Data Integrity (Task 87)', () => {
  
  describe('DataSanitizer: escapeHTML', () => {
    it('should correctly escape malicious HTML tags', () => {
      const input = "<script>alert('xss')</script>";
      const output = DataSanitizer.escapeHTML(input);
      expect(output).toBe("&lt;script&gt;alert(&#039;xss&#039;)&lt;/script&gt;");
    });
  });

  describe('DataSanitizer: sanitizeValue', () => {
    it('should truncate extremely large strings (DoS protection)', () => {
      const hugeString = "A".repeat(1024 * 600); // > 512KB
      const sanitized = DataSanitizer.sanitizeValue(hugeString);
      expect(sanitized.length).toBeLessThan(1024 * 600);
      expect(sanitized).toContain("[TRUNCATED]");
    });

    it('should remove control characters', () => {
      const input = "Hello\x00World\x1F!";
      const sanitized = DataSanitizer.sanitizeValue(input);
      expect(sanitized).toBe("HelloWorld!");
    });

    it('should limit recursion in nested objects', () => {
      const nested = { a: { b: { c: { d: "too deep" } } } };
      const sanitized = DataSanitizer.sanitizeValue(nested);
      // depth 1 (root), depth 2 (a), depth 3 (b) -> limited
      expect(sanitized.a.b).toBe("[NESTED_OBJECT_LIMIT]");
    });
  });

  describe('DataSanitizer: isSafeSVG', () => {
    it('should identify malicious SVGs', () => {
      const maliciousSVG = `
        <svg xmlns="http://www.w3.org/2000/svg">
          <script>alert(1)</script>
          <rect width="100" height="100" onmouseover="alert(2)" />
        </svg>
      `;
      expect(DataSanitizer.isSafeSVG(maliciousSVG)).toBe(false);
    });

    it('should allow clean SVGs', () => {
      const cleanSVG = `
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="red" />
        </svg>
      `;
      expect(DataSanitizer.isSafeSVG(cleanSVG)).toBe(true);
    });
  });

  describe('DataSourceParser: Integrated Security', () => {
    it('should automatically sanitize and escape manual input objects', async () => {
      // simulate manual text processing in UiDataGateway
      const rawRow = { nome: "<script>dangerous</script>", large: "A".repeat(1024 * 600) };
      const sanitized = DataSanitizer.sanitizeValue(rawRow);
      
      // Task SEC-01: sanitizeValue now MUST escape HTML for the value
      expect(sanitized.nome).toBe("&lt;script&gt;dangerous&lt;/script&gt;");
      expect(sanitized.large).toContain("[TRUNCATED]");
    });

    it('should NOT allow nested interpolation to create infinite loops', () => {
      const template = "{{loop}}";
      const data = { loop: "{{loop}}" };
      const result = DataSourceParser.interpolate(template, data);
      expect(result).toBe("{{loop}}"); // Only one pass
    });
  });
});
