import Papa from 'papaparse';

export interface ParsedTag {
  fullMatch: string;
  key: string;
  formatters: string[];
  fallback?: string;
}

export interface FormatterDef {
  name: string;
  label: string;
  sublabel: string;
  fn: (value: any, params: string[]) => any;
}

/**
 * Registro central de formatadores do sistema.
 */
export const FORMATTERS: Record<string, FormatterDef> = {
  upper: {
    name: 'upper',
    label: 'UPPERCASE',
    sublabel: 'TEXT -> TEXT',
    fn: (v) => String(v).toUpperCase()
  },
  lower: {
    name: 'lower',
    label: 'lowercase',
    sublabel: 'TEXT -> text',
    fn: (v) => String(v).toLowerCase()
  },
  trim: {
    name: 'trim',
    label: 'Trim Space',
    sublabel: ' text -> text',
    fn: (v) => String(v).trim()
  },
  capitalize: {
    name: 'capitalize',
    label: 'Capitalize',
    sublabel: 'text -> Text',
    fn: (v) => {
      const s = String(v);
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
  },
  title: {
    name: 'title',
    label: 'Title Case',
    sublabel: 'tEXt -> Text',
    fn: (v) => String(v).replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
  },
  currency: {
    name: 'currency',
    label: 'Currency R$',
    sublabel: '12.5 -> R$ 12,50',
    fn: (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(v) || 0)
  },
  number: {
    name: 'number',
    label: 'Number (BR)',
    sublabel: '1250.5 -> 1.250,50',
    fn: (v) => new Intl.NumberFormat('pt-BR').format(parseFloat(v) || 0)
  },
  percent: {
    name: 'percent',
    label: 'Percent %',
    sublabel: '0.12 -> 12%',
    fn: (v) => new Intl.NumberFormat('pt-BR', { style: 'percent' }).format(parseFloat(v) || 0)
  },
  truncate: {
    name: 'truncate(20)',
    label: 'Truncate...',
    sublabel: 'Long text -> Long...',
    fn: (v, params) => {
      const limit = parseInt(params[0]) || 20;
      const str = String(v);
      return str.length > limit ? str.substring(0, limit) + '...' : str;
    }
  },
  date: {
    name: 'date',
    label: 'Date (BR)',
    sublabel: '2023-01 -> 01/01/2023',
    fn: (v) => DataSourceParser.formatDate(v, false)
  },
  datetime: {
    name: 'datetime',
    label: 'DateTime (BR)',
    sublabel: '2023-01... -> 01/01... 12:00',
    fn: (v) => DataSourceParser.formatDate(v, true)
  },
  json: {
    name: 'json',
    label: 'JSON Raw',
    sublabel: '{obj} -> {"a":1}',
    fn: (v) => JSON.stringify(v, null, 2)
  },
  add: {
    name: 'add(1)',
    label: 'Math: Add',
    sublabel: '10 -> 11',
    fn: (v, params) => (parseFloat(v) || 0) + (parseFloat(params[0]) || 0)
  },
  sub: {
    name: 'sub(1)',
    label: 'Math: Subtract',
    sublabel: '10 -> 9',
    fn: (v, params) => (parseFloat(v) || 0) - (parseFloat(params[0]) || 0)
  },
  mul: {
    name: 'mul(2)',
    label: 'Math: Multiply',
    sublabel: '10 -> 20',
    fn: (v, params) => (parseFloat(v) || 0) * (parseFloat(params[0]) || 1)
  },
  div: {
    name: 'div(2)',
    label: 'Math: Divide',
    sublabel: '10 -> 5',
    fn: (v, params) => {
      const divisor = parseFloat(params[0]) || 1;
      return divisor !== 0 ? (parseFloat(v) || 0) / divisor : v;
    }
  }
};

/**
 * DataSourceParser: Processa arquivos externos para geração em lote.
 */
export class DataSourceParser {
  private static readonly TAG_REGEX = /\{\{\s*([\w\s."'-]+)(?::([\w,()\s.:-]+))?(?:\|\|([^}]+))?\s*\}\}/g;

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
   * Retorna a lista de formatadores para o AppSelect.
   */
  public static getFormatterOptions() {
    return Object.values(FORMATTERS).map(f => ({
      value: f.name,
      label: f.label,
      sublabel: f.sublabel
    }));
  }

  /**
   * Encontra todas as tags em uma string e as retorna estruturadas.
   */
  public static parseTags(text: string): ParsedTag[] {
    const tags: ParsedTag[] = [];
    let match;
    
    this.TAG_REGEX.lastIndex = 0;

    while ((match = this.TAG_REGEX.exec(text)) !== null) {
      tags.push({
        fullMatch: match[0],
        key: match[1].trim(),
        formatters: match[2] ? match[2].split(':').map(f => f.trim()).filter(Boolean) : [],
        fallback: match[3]?.trim()
      });
    }

    return tags;
  }

  /**
   * Reconstrói uma tag a partir de seus componentes.
   */
  public static rebuildTag(tag: Omit<ParsedTag, 'fullMatch'>): string {
    let result = `{{ ${tag.key}`;
    
    if (tag.formatters.length > 0) {
      result += `:${tag.formatters.join(':')}`;
    }
    
    if (tag.fallback !== undefined && tag.fallback !== '') {
      result += `||${tag.fallback}`;
    }
    
    result += ' }}';
    return result;
  }

  /**
   * Aplica os dados em uma string substituindo variáveis {{key}}
   * Agora suporta um objeto de contexto global (Task 50).
   */
  public static interpolate(
    template: string,
    data: Record<string, any>,
    context: Record<string, any> = {}
  ): string {
    if (!template) return '';

    return template.replace(
      this.TAG_REGEX,
      (match, keyRaw, formattersStr, defaultValue) => {
        const key = keyRaw.trim();
        
        // Prioridade 1: Dados do registro (row)
        // Prioridade 2: Contexto global (index, total, date...)
        let value = data[key];
        if (value === undefined || value === null) {
          value = context[key];
        }

        if (value === undefined || value === null) {
          if (defaultValue !== undefined) {
            return defaultValue.trim();
          }
          return match;
        }

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
   * Executa a lógica de formatação para um valor usando o registro central.
   */
  private static applyFormatter(value: any, formatter: string): any {
    const parts = formatter.match(/^(\w+)(?:\((.*)\))?$/);
    if (!parts) return value;

    const name = parts[1].toLowerCase();
    const params = parts[2] ? parts[2].split(',').map((p) => p.trim()) : [];

    const def = FORMATTERS[name];
    if (def) {
      return def.fn(value, params);
    }

    return value;
  }

  /**
   * Helper para formatação de datas (padrão brasileiro).
   */
  public static formatDate(value: any, showTime: boolean): string {
    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) return String(value);

      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };
      if (showTime) {
        options.hour = '2-digit',
        options.minute = '2-digit'
      }
      return new Intl.DateTimeFormat('pt-BR', options).format(date);
    } catch {
      return String(value);
    }
  }
}

export const dataSourceParser = new DataSourceParser();
