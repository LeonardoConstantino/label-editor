import { logger } from '../core/Logger';
import { db } from '../core/Database';
import { SecurityPolicy } from '../core/SecurityPolicy';

/**
 * FontData: Estrutura de transporte de binários de fonte.
 */
export interface FontData {
  /** Nome da família tipográfica */
  family: string;
  /** Buffer binário do arquivo .woff2 ou similar */
  buffer: ArrayBuffer;
  /** Peso da fonte (ex: '400', 'bold') */
  weight?: string;
  /** Estilo da fonte (ex: 'normal', 'italic') */
  style?: string;
  /** URL original da fonte */
  url?: string;
}

/**
 * FontTransfer: Utilitário de alta resiliência e performance para extrair fontes da Main Thread.
 * Implementa cache multinível (Memória + IndexedDB) para garantir fidelidade visual em Web Workers.
 * 
 * Este serviço resolve o problema de SOP (Same-Origin Policy) e CORS ao capturar fontes do Google Fonts.
 */
export class FontTransfer {
  /** Cache em memória para evitar hits repetidos no IDB na mesma sessão */
  private static sessionCache = new Map<string, FontData[]>();
  /** Cache do mapeamento CSS para evitar varreduras custosas no DOM */
  private static fontMap: Map<string, any[]> | null = null;

  /**
   * Obtém os binários das fontes especificadas, utilizando cache ou download.
   * 
   * @param families Lista de nomes de fontes a serem capturadas.
   * @returns Promessa com array de FontData contendo os buffers.
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
        logger.warn('FontTransfer', `Font family not found in any stylesheet: ${familyKey}`);
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
            // C) Download (Caso de uso inicial)
            SecurityPolicy.validateUrl(info.url); // ✅ SSRF Protection (Task DET-06)
            // fallow-ignore-next-line security-sink
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
            buffer: buffer.slice(0) // Clone para evitar problemas de transferência de ownership
          });
        } catch (err) {
          logger.error('FontTransfer', `Failed to obtain font binary: ${info.url}`, err);
        }
      }

      // Alimenta Cache em Memória da sessão
      if (familyVariants.length > 0) {
        this.sessionCache.set(familyKey, familyVariants);
        results.push(...familyVariants);
      }
    }

    return results;
  }

  /**
   * Varre todas as fontes possíveis: styleSheets, links e @imports.
   * Utiliza fetch manual para arquivos CSS bloqueados por CORS.
   */
  private static async scanAllSources(): Promise<Map<string, { family: string, url: string, weight: string, style: string }[]>> {
    const map = new Map<string, any[]>();
    const sheets = Array.from(document.styleSheets);
    
    for (const sheet of sheets) {
      await this.processStyleSheet(sheet, map);
    }

    // Varre links no DOM (segurança extra para links injetados dinamicamente)
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[];
    for (const link of links) {
      if (link.href && !sheets.some(s => s.href === link.href)) {
        await this.fetchAndParseManual(link.href, map);
      }
    }

    return map;
  }

  /**
   * Tenta processar nativamente uma folha de estilo ou recorre ao fetch manual.
   */
  private static async processStyleSheet(sheet: CSSStyleSheet, map: Map<string, any[]>) {
    try {
      const rules = sheet.cssRules || sheet.rules;
      if (rules) {
        await this.parseRules(Array.from(rules), map);
      }
    } catch (e) {
      // Erro de Segurança (CORS) ao acessar cssRules: Recorre ao download do arquivo texto
      if (sheet.href) {
        await this.fetchAndParseManual(sheet.href, map);
      }
    }
  }

  /**
   * Faz o download do CSS como texto e realiza parsing manual via Regex.
   * Suporta recursão para @import externos.
   */
  private static async fetchAndParseManual(url: string, map: Map<string, any[]>) {
    try {
      SecurityPolicy.validateUrl(url); // ✅ SSRF Protection (Task DET-06)
      // fallow-ignore-next-line security-sink
      const response = await fetch(url);
      const text = await response.text();
      this.parseCssText(text, map);

      // Procura @import recursivos
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

  /**
   * Parse de regras nativas CSSFontFaceRule.
   */
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

  /**
   * Parser via Regex para blocos @font-face dentro de strings CSS.
   */
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
