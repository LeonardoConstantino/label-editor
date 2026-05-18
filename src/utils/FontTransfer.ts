import { logger } from '../core/Logger';
import { db } from '../core/Database';

export interface FontData {
  family: string;
  buffer: ArrayBuffer;
  weight?: string;
  style?: string;
  url?: string;
}

/**
 * FontTransfer: Utilitário de alta resiliência e performance para extrair fontes.
 * Implementa cache em memória e persistência em IndexedDB para evitar downloads redundantes.
 */
export class FontTransfer {
  private static sessionCache = new Map<string, FontData[]>();
  private static fontMap: Map<string, any[]> | null = null;

  /**
   * Obtém os binários das fontes especificadas.
   */
  static async getFontBuffers(families: string[]): Promise<FontData[]> {
    const uniqueFamilies = families.map(f => f.toLowerCase().replace(/['"]/g, '').trim());
    const results: FontData[] = [];
    
    // 1. Carrega o mapa de fontes do CSS apenas uma vez por sessão
    if (!this.fontMap) {
      this.fontMap = await this.scanAllSources();
    }

    for (const familyKey of uniqueFamilies) {
      // A) Tenta Cache em Memória
      if (this.sessionCache.has(familyKey)) {
        results.push(...this.sessionCache.get(familyKey)!);
        continue;
      }

      const fontInfos = this.fontMap.get(familyKey);
      if (!fontInfos) {
        logger.warn('FontTransfer', `Font family not found: ${familyKey}`);
        continue;
      }

      const familyVariants: FontData[] = [];

      for (const info of fontInfos) {
        try {
          // B) Tenta Cache Persistente (IndexedDB)
          const cached = await db.get<any>('fonts', info.url);
          let buffer: ArrayBuffer;

          if (cached && cached.buffer) {
            buffer = cached.buffer;
            logger.debug('FontTransfer', `Restored from IDB: ${info.family} (${info.weight})`);
          } else {
            // C) Download (Apenas se não houver em nenhum cache)
            const response = await fetch(info.url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            buffer = await response.arrayBuffer();
            
            // Salva no IDB para a próxima vez
            await db.put('fonts', { url: info.url, buffer });
            logger.debug('FontTransfer', `Downloaded and Persisted: ${info.family} (${info.weight})`);
          }

          familyVariants.push({
            family: info.family,
            weight: info.weight,
            style: info.style,
            buffer: buffer.slice(0) // Clone para transferência
          });
        } catch (err) {
          logger.error('FontTransfer', `Failed to obtain font binary: ${info.url}`, err);
        }
      }

      // Alimenta Cache em Memória
      if (familyVariants.length > 0) {
        this.sessionCache.set(familyKey, familyVariants);
        results.push(...familyVariants);
      }
    }

    return results;
  }

  /**
   * Varre todas as fontes possíveis: styleSheets, links e imports.
   */
  private static async scanAllSources(): Promise<Map<string, { family: string, url: string, weight: string, style: string }[]>> {
    const map = new Map<string, any[]>();
    const sheets = Array.from(document.styleSheets);
    
    for (const sheet of sheets) {
      await this.processStyleSheet(sheet, map);
    }

    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[];
    for (const link of links) {
      if (link.href && !sheets.some(s => s.href === link.href)) {
        await this.fetchAndParseManual(link.href, map);
      }
    }

    return map;
  }

  private static async processStyleSheet(sheet: CSSStyleSheet, map: Map<string, any[]>) {
    try {
      const rules = sheet.cssRules || sheet.rules;
      if (rules) {
        await this.parseRules(Array.from(rules), map);
      }
    } catch (e) {
      if (sheet.href) {
        await this.fetchAndParseManual(sheet.href, map);
      }
    }
  }

  private static async fetchAndParseManual(url: string, map: Map<string, any[]>) {
    try {
      const response = await fetch(url);
      const text = await response.text();
      this.parseCssText(text, map);

      const importRegex = /@import\s+(?:url\()?['"]?([^'"]+)['"]?\)?[^;]*;/gi;
      let match;
      while ((match = importRegex.exec(text)) !== null) {
        let importUrl = match[1];
        if (!importUrl.startsWith('http')) {
           importUrl = new URL(importUrl, url).href;
        }
        await this.fetchAndParseManual(importUrl, map);
      }
    } catch (err) {
      logger.error('FontTransfer', `Manual fetch failed for ${url}`, err);
    }
  }

  private static async parseRules(rules: CSSRule[], map: Map<string, any[]>) {
    for (const rule of rules) {
      if (rule instanceof CSSFontFaceRule) {
        const family = rule.style.getPropertyValue('font-family').replace(/['"]/g, '').trim();
        const src = rule.style.getPropertyValue('src');
        const weight = rule.style.getPropertyValue('font-weight').trim() || '400';
        const style = rule.style.getPropertyValue('font-style').trim() || 'normal';

        const urlMatch = src.match(/url\(([^)]+)\)/);
        if (urlMatch) {
          const url = urlMatch[1].replace(/['"]/g, '').trim();
          const key = family.toLowerCase();
          if (!map.has(key)) map.set(key, []);
          map.get(key)!.push({ family, url, weight, style });
        }
      } else if (rule instanceof CSSImportRule && rule.styleSheet) {
        await this.processStyleSheet(rule.styleSheet, map);
      }
    }
  }

  private static parseCssText(text: string, map: Map<string, any[]>) {
    const fontFaceRegex = /@font-face\s*\{([^}]+)\}/gi;
    let match;

    while ((match = fontFaceRegex.exec(text)) !== null) {
      const content = match[1];
      const familyMatch = content.match(/font-family:\s*([^;]+)/i);
      const srcMatch = content.match(/src:\s*[^;]*url\(([^)]+)\)/i);
      const weightMatch = content.match(/font-weight:\s*([^;]+)/i);
      const styleMatch = content.match(/font-style:\s*([^;]+)/i);

      if (familyMatch && srcMatch) {
        const family = familyMatch[1].replace(/['"]/g, '').trim();
        const url = srcMatch[1].replace(/['"]/g, '').trim();
        const weight = weightMatch ? weightMatch[1].trim() : '400';
        const style = styleMatch ? styleMatch[1].trim() : 'normal';
        
        const key = family.toLowerCase();
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push({ family, url, weight, style });
      }
    }
  }
}
