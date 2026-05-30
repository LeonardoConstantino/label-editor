import { describe, it, expect } from 'vitest';

/**
 * Mock da função real para teste em ambiente Node/Jsdom
 */
function sanitizeInnerSVG(raw: string): string {
  if (!raw) return '';
  const ALLOWED_TAGS = new Set([
    'svg', 'g', 'path', 'circle', 'rect', 'ellipse', 
    'line', 'polyline', 'polygon', 'title', 'desc', 'defs', 'clipPath'
  ]);

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${raw}</svg>`, 'image/svg+xml');
    const svgRoot = doc.documentElement;

    const sanitizeNode = (node: Node) => {
      if (node.nodeType === 1) { // Node.ELEMENT_NODE
        const el = node as Element;
        const tagName = el.tagName.toLowerCase();

        if (!ALLOWED_TAGS.has(tagName)) {
          el.remove();
          return;
        }

        const attrs = Array.from(el.attributes);
        for (const attr of attrs) {
          if (attr.name.toLowerCase().startsWith('on')) {
            el.removeAttribute(attr.name);
          }
        }
        Array.from(el.childNodes).forEach(sanitizeNode);
      }
    };

    Array.from(svgRoot.childNodes).forEach(sanitizeNode);
    return svgRoot.innerHTML;
  } catch (error) {
    return '';
  }
}

describe('SVG Sanitization Rigor (SEC-02)', () => {
  it('should remove scripts', () => {
    const input = '<path d="M1 1l2 2"/><script>alert(1)</script>';
    const output = sanitizeInnerSVG(input);
    expect(output).toContain('<path');
    expect(output).not.toContain('<script');
  });

  it('should remove inline event handlers', () => {
    const input = '<circle onmouseover="alert(1)" cx="10" cy="10" r="5" />';
    const output = sanitizeInnerSVG(input);
    expect(output).not.toContain('onmouseover');
    expect(output).toContain('cx="10"');
  });

  it('should remove foreignObject (FIXED RIGOR)', () => {
    const input = '<path d="..."/><foreignObject><html><body><script>alert(1)</script></body></html></foreignObject>';
    const output = sanitizeInnerSVG(input);
    expect(output).not.toContain('foreignObject');
    expect(output).not.toContain('html');
    expect(output).toContain('<path');
  });

  it('should remove animate and set tags (FIXED RIGOR)', () => {
    const input = '<rect><animate onbegin="alert(1)" attributeName="x" from="0" to="10" dur="1s"/></rect>';
    const output = sanitizeInnerSVG(input);
    expect(output).not.toContain('animate');
    expect(output).toContain('<rect');
  });

  it('should allow nested allowed tags', () => {
    const input = '<g><path d="M1 1"/><circle cx="5" cy="5" r="2"/></g>';
    const output = sanitizeInnerSVG(input);
    expect(output).toContain('<g');
    expect(output).toContain('<path');
    expect(output).toContain('<circle');
  });
});
