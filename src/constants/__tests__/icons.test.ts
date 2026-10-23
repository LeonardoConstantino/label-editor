import { describe, it, expect } from 'vitest';
import { searchIcons, getIcon, ICON_REGISTRY } from '../icons';

describe('Icons Engine & Search', () => {
  it('returns all icons when query is empty or whitespace', () => {
    const all = searchIcons('');
    expect(all.length).toBe(Object.keys(ICON_REGISTRY).length);
    expect(all.length).toBeGreaterThan(100);

    const whitespace = searchIcons('   ');
    expect(whitespace.length).toBe(all.length);
  });

  it('finds icons by substring in key or name (e.g. "bio")', () => {
    const results = searchIcons('bio');
    const keys = results.map(([k]) => k);
    expect(keys).toContain('biohazard');
  });

  it('finds icons by semantic tags (e.g. "hazard", "europe", "warning")', () => {
    // "hazard" should match biohazard (tag: ['iso', 'hazard', 'safety'])
    const hazardResults = searchIcons('hazard');
    expect(hazardResults.map(([k]) => k)).toContain('biohazard');

    // "europe" should match ce-mark (tag: ['certification', 'iso', 'europe'])
    const europeResults = searchIcons('europe');
    expect(europeResults.map(([k]) => k)).toContain('ce-mark');

    // "warning" should match alert-triangle / alert
    const warningResults = searchIcons('warning');
    expect(warningResults.length).toBeGreaterThan(0);
  });

  it('supports Portuguese synonyms (e.g. "caixa", "perigo")', () => {
    const caixaResults = searchIcons('caixa');
    const caixaKeys = caixaResults.map(([k]) => k);
    expect(caixaKeys.some((k) => k.includes('box') || k.includes('package'))).toBe(true);

    const perigoResults = searchIcons('perigo');
    const perigoKeys = perigoResults.map(([k]) => k);
    expect(perigoKeys.some((k) => k.includes('alert') || k.includes('biohazard'))).toBe(true);
  });

  it('returns empty array when query does not match any tokens', () => {
    const results = searchIcons('xyznonexistenttoken12345');
    expect(results).toEqual([]);
  });

  it('executes search filter in less than 5ms (O(tokens))', () => {
    const start = performance.now();
    for (let i = 0; i < 10; i++) {
      searchIcons('hazard');
      searchIcons('caixa');
      searchIcons('alert');
    }
    const elapsed = performance.now() - start;
    const avgPerSearch = elapsed / 30;
    expect(avgPerSearch).toBeLessThan(5);
  });

  it('retrieves single icon by key with getIcon', () => {
    const icon = getIcon('biohazard');
    expect(icon).toBeDefined();
    expect(icon?.name).toBe('Biohazard');
  });
});
