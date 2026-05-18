import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { FontTransfer } from '../FontTransfer';
import { db } from '../../core/Database';

describe('FontTransfer', () => {
  const mockFontUrl = 'https://fonts.gstatic.com/test-font.woff2';
  const mockCssUrl = 'https://fonts.googleapis.com/css?family=TestFont';
  
  beforeEach(() => {
    // Reset singleton state
    (FontTransfer as any).sessionCache.clear();
    (FontTransfer as any).fontMap = null;

    vi.stubGlobal('fetch', vi.fn(async (url: string) => {
      if (url === mockCssUrl) {
        return {
          ok: true,
          text: () => Promise.resolve(`
            @font-face {
              font-family: 'TestFont';
              src: url(${mockFontUrl}) format('woff2');
              font-weight: 400;
              font-style: normal;
            }
          `)
        };
      }
      if (url === mockFontUrl) {
        return {
          ok: true,
          arrayBuffer: () => Promise.resolve(new ArrayBuffer(8))
        };
      }
      return { ok: false, status: 404 };
    }));

    vi.spyOn(db, 'get').mockResolvedValue(null);
    vi.spyOn(db, 'put').mockResolvedValue(undefined as any);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should extract font buffers and use cache', async () => {
    const mockLink = { href: mockCssUrl, rel: 'stylesheet' };
    vi.spyOn(document, 'querySelectorAll').mockReturnValue([mockLink] as any);
    vi.spyOn(document, 'styleSheets', 'get').mockReturnValue([] as any);

    const fetchSpy = vi.spyOn(global, 'fetch');

    // Primeira chamada: Deve fazer fetch
    const fonts1 = await FontTransfer.getFontBuffers(['TestFont']);
    expect(fonts1).toHaveLength(1);
    expect(fetchSpy).toHaveBeenCalledWith(mockCssUrl);
    expect(fetchSpy).toHaveBeenCalledWith(mockFontUrl);

    // Segunda chamada: Deve usar o cache em memória
    fetchSpy.mockClear();
    const fonts2 = await FontTransfer.getFontBuffers(['TestFont']);
    expect(fonts2).toHaveLength(1);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('should restore font from IndexedDB if memory cache is empty', async () => {
    const mockLink = { href: mockCssUrl, rel: 'stylesheet' };
    vi.spyOn(document, 'querySelectorAll').mockReturnValue([mockLink] as any);
    vi.spyOn(document, 'styleSheets', 'get').mockReturnValue([] as any);

    // Simula que a fonte já existe no banco de dados
    vi.spyOn(db, 'get').mockResolvedValue({ 
      url: mockFontUrl, 
      buffer: new ArrayBuffer(32) 
    });

    const fetchSpy = vi.spyOn(global, 'fetch');

    const fonts = await FontTransfer.getFontBuffers(['TestFont']);

    expect(fonts).toHaveLength(1);
    expect(fonts[0].buffer.byteLength).toBe(32);
    // Deve dar fetch no CSS (para saber a URL), mas NÃO no binário da fonte
    expect(fetchSpy).toHaveBeenCalledWith(mockCssUrl);
    expect(fetchSpy).not.toHaveBeenCalledWith(mockFontUrl);
  });

  it('should handle @import recursion in manual fetch', async () => {
    const importUrl = 'https://external.com/import.css';
    
    vi.stubGlobal('fetch', vi.fn(async (url: string) => {
      if (url === mockCssUrl) {
        return { ok: true, text: () => Promise.resolve(`@import url("${importUrl}");`) };
      }
      if (url === importUrl) {
        return {
          ok: true,
          text: () => Promise.resolve(`@font-face { font-family: 'ImportedFont'; src: url(${mockFontUrl}); }`)
        };
      }
      if (url === mockFontUrl) {
        return { ok: true, arrayBuffer: () => Promise.resolve(new ArrayBuffer(16)) };
      }
      return { ok: false };
    }));

    vi.spyOn(document, 'querySelectorAll').mockReturnValue([{ href: mockCssUrl }] as any);
    vi.spyOn(document, 'styleSheets', 'get').mockReturnValue([] as any);

    const fonts = await FontTransfer.getFontBuffers(['ImportedFont']);

    expect(fonts).toHaveLength(1);
    expect(fonts[0].family).toBe('ImportedFont');
    expect(fonts[0].buffer.byteLength).toBe(16);
  });
});
