import Papa from 'papaparse';

/**
 * DataSourceParser: Processa arquivos externos para geração em lote.
 */
export class DataSourceParser {
  /**
   * Converte um arquivo CSV em um array de objetos usando PapaParse.
   */
  public async parseCSV(file: File): Promise<Record<string, string>[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data as Record<string, string>[]);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  /**
   * Converte um arquivo JSON em um array de objetos.
   */
  public async parseJSON(file: File): Promise<Record<string, any>[]> {
    const text = await file.text();
    const data = JSON.parse(text);
    return Array.isArray(data) ? data : [data];
  }

  public async parseTXT(file: File): Promise<Record<string, any>[]> {
    const text = await file.text();
    const trimmedText = text.trim();
    return trimmedText
      ? trimmedText.split('\n').map((v) => ({ nome: v.trim() }))
      : [];
  }

  /**
   * Aplica os dados em uma string substituindo variáveis {{key}}
   * Suporta formatadores: {{ valor:currency }}
   * Suporta valores padrão: {{ nome||Anônimo }}
   * Suporta encadeamento: {{ texto:trim:upper }}
   */
  public static interpolate(
    template: string,
    data: Record<string, any>,
  ): string {
    if (!template) return '';

    // Regex para: {{ variavel : formatador(params) || valor_padrao }}
    // Captura 1: variavel (incluindo espaços, pontos, hífens e aspas)
    // Captura 2: formatadores (opcional, pode ser múltiplos separados por :)
    // Captura 3: valor padrão (opcional, após ||)
    const regex = /\{\{\s*([\w\s."'-]+)(?::([\w,()\s.:-]+))?(?:\|\|([^}]+))?\s*\}\}/g;

    return template.replace(
      regex,
      (match, keyRaw, formattersStr, defaultValue) => {
        const key = keyRaw.trim();
        let value = data[key];

        // Se valor não existe ou é nulo/undefined, usa valor padrão se disponível
        if (value === undefined || value === null) {
          if (defaultValue !== undefined) {
            return defaultValue.trim();
          }
          return match; // Mantém a tag original se não houver valor padrão
        }

        // Aplica formatadores se houver
        if (formattersStr) {
          const formatters = formattersStr.split(':');
          for (const f of formatters) {
            if (f.trim()) {
              value = this.applyFormatter(value, f.trim());
            }
          }
        }

        return String(value);
      },
    );
  }

  /**
   * Executa a lógica de formatação para um valor.
   */
  private static applyFormatter(value: any, formatter: string): any {
    // Regex para capturar nome do formatador e parâmetros entre parênteses
    const parts = formatter.match(/^(\w+)(?:\((.*)\))?$/);
    if (!parts) return value;

    const name = parts[1].toLowerCase();
    const params = parts[2] ? parts[2].split(',').map((p) => p.trim()) : [];

    switch (name) {
      case 'upper':
        return String(value).toUpperCase();
      case 'lower':
        return String(value).toLowerCase();
      case 'trim':
        return String(value).trim();
      case 'capitalize': {
        const s = String(value);
        return s.charAt(0).toUpperCase() + s.slice(1);
      }
      case 'title':
        return String(value).replace(/\w\S*/g, (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      case 'currency':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(parseFloat(value) || 0);
      case 'number':
        return new Intl.NumberFormat('pt-BR').format(parseFloat(value) || 0);
      case 'percent':
        return new Intl.NumberFormat('pt-BR', {
          style: 'percent',
        }).format(parseFloat(value) || 0);
      case 'truncate': {
        const limit = parseInt(params[0]) || 20;
        const str = String(value);
        return str.length > limit ? str.substring(0, limit) + '...' : str;
      }
      case 'date':
        return this.formatDate(value, false);
      case 'datetime':
        return this.formatDate(value, true);
      case 'json':
        return JSON.stringify(value, null, 2);
      default:
        return value;
    }
  }

  /**
   * Helper para formatação de datas (padrão brasileiro).
   */
  private static formatDate(value: any, showTime: boolean): string {
    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) return String(value);

      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };
      if (showTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
      }
      return new Intl.DateTimeFormat('pt-BR', options).format(date);
    } catch {
      return String(value);
    }
  }
}

export const dataSourceParser = new DataSourceParser();
