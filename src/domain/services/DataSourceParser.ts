import Papa from 'papaparse';
import { DataSanitizer } from '../../core/DataSanitizer';
import eventBus from '../../core/EventBus';
import { logger } from '../../core/Logger';

/**
 * ParsedTag: Representação estruturada de uma tag de interpolação.
 * Ex: {{ preco:currency(BRL)||0.00 }}
 */
export interface ParsedTag {
  /** A string original completa da tag */
  fullMatch: string;
  /** A chave da variável (ex: 'preco') */
  key: string;
  /** Lista de formatadores encadeados (ex: ['currency(BRL)']) */
  formatters: string[];
  /** Valor de fallback se a chave não existir nos dados */
  fallback?: string;
}

/**
 * FormatterDef: Definição de um formatador no registro central.
 */
export interface FormatterDef {
  /** Identificador único do formatador */
  name: string;
  /** Nome amigável para a UI */
  label: string;
  /** Exemplo de transformação para a UI */
  sublabel: string;
  /** Dica de uso detalhada (ex: :currency(locale, symbol)) */
  tip?: string;
  /** Função de execução: recebe o valor bruto e parâmetros opcionais */
  fn: (value: any, params: string[]) => any;
}

/**
 * Registro central de formatadores do sistema.
 * Adicione novos formatadores aqui para que apareçam automaticamente no VariableManager.
 */
export const FORMATTERS: Record<string, FormatterDef> = {
  upper: {
    name: 'upper',
    label: 'UPPERCASE',
    sublabel: 'TEXT -> TEXT',
    tip: ':upper (No parameters)',
    fn: (v) => String(v).toUpperCase()
  },
  lower: {
    name: 'lower',
    label: 'lowercase',
    sublabel: 'TEXT -> text',
    tip: ':lower (No parameters)',
    fn: (v) => String(v).toLowerCase()
  },
  trim: {
    name: 'trim',
    label: 'Trim Space',
    sublabel: ' text -> text',
    tip: ':trim (Removes start/end spaces)',
    fn: (v) => String(v).trim()
  },
  capitalize: {
    name: 'capitalize',
    label: 'Capitalize',
    sublabel: 'text -> Text',
    tip: ':capitalize (Only first letter)',
    fn: (v) => {
      const s = String(v);
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
  },
  title: {
    name: 'title',
    label: 'Title Case',
    sublabel: 'tEXt -> Text',
    tip: ':title (Capitalizes Every Word)',
    fn: (v) => String(v).replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
  },
  currency: {
    name: 'currency',
    label: 'Currency (Locale)',
    sublabel: '12.5 -> R$ 12,50',
    tip: ':currency(locale, currencyCode) - e.g. :currency(en-US, USD)',
    fn: (v, params) => {
      const locale = params[0] || 'pt-BR';
      const currency = params[1] || 'BRL';
      return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(parseFloat(v) || 0);
    }
  },
  number: {
    name: 'number',
    label: 'Number (Locale)',
    sublabel: '1250.5 -> 1.250,50',
    tip: ':number(locale) - e.g. :number(de-DE)',
    fn: (v, params) => {
      const locale = params[0] || 'pt-BR';
      return new Intl.NumberFormat(locale).format(parseFloat(v) || 0);
    }
  },
  percent: {
    name: 'percent',
    label: 'Percent (Locale)',
    sublabel: '0.12 -> 12%',
    tip: ':percent(locale) - e.g. :percent(en-US)',
    fn: (v, params) => {
      const locale = params[0] || 'pt-BR';
      return new Intl.NumberFormat(locale, { 
        style: 'percent', 
        minimumFractionDigits: 0,
        maximumFractionDigits: 2 
      }).format(parseFloat(v) || 0);
    }
  },
  truncate: {
    name: 'truncate',
    label: 'Truncate...',
    sublabel: 'Long text -> Long...',
    tip: ':truncate(length) - e.g. :truncate(15)',
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
    tip: ':date (Short Brazilian format)',
    fn: (v) => DataSourceParser.formatDate(v, false)
  },
  datetime: {
    name: 'datetime',
    label: 'DateTime (BR)',
    sublabel: '2023-01... -> 01/01... 12:00',
    tip: ':datetime (BR date with hours)',
    fn: (v) => DataSourceParser.formatDate(v, true)
  },
  date_format: {
    name: 'date_format',
    label: 'Date Format (Custom)',
    sublabel: 'ISO -> Locale String',
    tip: ':date_format(locale, style) - style: long | full',
    fn: (v, params) => {
      const locale = params[0] || 'pt-BR';
      const options: Intl.DateTimeFormatOptions = { timeZone: 'UTC' };
      if (params[1] === 'long') {
        options.dateStyle = 'long';
      } else if (params[1] === 'full') {
        options.dateStyle = 'full';
      }
      try {
        const d = DataSourceParser.parseDateSafe(v);
        if (!d) return v;
        return new Intl.DateTimeFormat(locale, options).format(d);
      } catch { return v; }
    }
  },
  date_add: {
    name: 'date_add',
    label: 'Date: Add Offset',
    sublabel: 'Today -> +30 days',
    tip: ':date_add(amount, unit) - unit: days | months | years',
    fn: (v, params) => DataSourceParser.applyDateOffset(v, params, 'add')
  },
  date_sub: {
    name: 'date_sub',
    label: 'Date: Sub Offset',
    sublabel: 'Today -> -7 days',
    tip: ':date_sub(amount, unit) - unit: days | months | years',
    fn: (v, params) => DataSourceParser.applyDateOffset(v, params, 'sub')
  },
  json: {
    name: 'json',
    label: 'JSON Raw',
    sublabel: '{obj} -> {"a":1}',
    tip: ':json (Format object as JSON string)',
    fn: (v) => {
      try {
        const safeObj = DataSanitizer.sanitizeValue(v);
        return JSON.stringify(safeObj, null, 2);
      } catch {
        return '[JSON_ERROR]';
      }
    }
  },
  add: {
    name: 'add',
    label: 'Math: Add',
    sublabel: '10 -> 11',
    tip: ':add(number) - e.g. :add(1)',
    fn: (v, params) => (parseFloat(v) || 0) + (parseFloat(params[0]) || 0)
  },
  sub: {
    name: 'sub',
    label: 'Math: Subtract',
    sublabel: '10 -> 9',
    tip: ':sub(number) - e.g. :sub(1)',
    fn: (v, params) => (parseFloat(v) || 0) - (parseFloat(params[0]) || 0)
  },
  mul: {
    name: 'mul',
    label: 'Math: Multiply',
    sublabel: '10 -> 20',
    tip: ':mul(number) - e.g. :mul(2)',
    fn: (v, params) => (parseFloat(v) || 0) * (parseFloat(params[0]) || 1)
  },
  div: {
    name: 'div',
    label: 'Math: Divide',
    sublabel: '10 -> 5',
    tip: ':div(number) - e.g. :div(2)',
    fn: (v, params) => {
      const divisor = parseFloat(params[0]) || 1;
      return divisor !== 0 ? (parseFloat(v) || 0) / divisor : v;
    }
  }
};

/**
 * DataSourceParser: O "Sistema de Infiltração" de dados do Label Forge OS.
 * Responsável por parsing de arquivos (CSV, JSON, TXT) e interpolação dinâmica de tags.
 */
export class DataSourceParser {
  /** Regex para identificar tags: {{ chave : formatador : ... || fallback }} */
  private static readonly TAG_REGEX = /\{\{\s*([\w\s."'-]+)(?::([\w,()\s.:-]+))?(?:\|\|([^}]+))?\s*\}\}/g;

  /**
   * Converte um arquivo CSV em um array de objetos usando PapaParse.
   * @param file Arquivo vindo de um input file ou drag-drop.
   */
  public async parseCSV(file: File): Promise<Record<string, string>[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          let rows = results.data as any[];
          
          if (rows.length > DataSanitizer.MAX_RECORDS) {
            eventBus.emit('notify', { 
              type: 'warning', 
              message: `File too large. Limited to first ${DataSanitizer.MAX_RECORDS} records.` 
            });
            rows = rows.slice(0, DataSanitizer.MAX_RECORDS);
          }

          const sanitizedData = rows.map(row => 
            DataSanitizer.sanitizeValue(row)
          );
          resolve(sanitizedData);
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
    
    // Guardião de tamanho total (Task 87)
    if (text.length > DataSanitizer.MAX_FILE_SIZE_BYTES) {
       eventBus.emit('notify', { type: 'error', message: 'File is too large for memory.' });
       return [];
    }

    const data = JSON.parse(text);
    let list = Array.isArray(data) ? data : [data];

    if (list.length > DataSanitizer.MAX_RECORDS) {
      eventBus.emit('notify', { 
        type: 'warning', 
        message: `JSON too large. Limited to ${DataSanitizer.MAX_RECORDS} records.` 
      });
      list = list.slice(0, DataSanitizer.MAX_RECORDS);
    }

    return list.map(row => DataSanitizer.sanitizeValue(row));
  }

  /**
   * Converte um arquivo de texto em lista de nomes (um por linha).
   */
  public async parseTXT(file: File): Promise<Record<string, any>[]> {
    const text = await file.text();
    
    // Guardião de tamanho total (Task 87)
    if (text.length > DataSanitizer.MAX_FILE_SIZE_BYTES) {
       eventBus.emit('notify', { type: 'error', message: 'File is too large for processing.' });
       return [];
    }

    const trimmedText = text.trim();
    if (!trimmedText) return [];

    let lines = trimmedText.split('\n');
    
    if (lines.length > DataSanitizer.MAX_RECORDS) {
      eventBus.emit('notify', { 
        type: 'warning', 
        message: `TXT too large. Limited to ${DataSanitizer.MAX_RECORDS} lines.` 
      });
      lines = lines.slice(0, DataSanitizer.MAX_RECORDS);
    }

    return lines.map((v) => 
      DataSanitizer.sanitizeValue({ nome: v.trim() })
    );
  }

  /**
   * Retorna a lista de formatadores mapeados para o componente AppSelect.
   */
  public static getFormatterOptions() {
    return Object.values(FORMATTERS).map(f => ({
      value: f.name,
      label: f.label,
      sublabel: f.sublabel
    }));
  }

  /**
   * Retorna a dica de uso de um formatador específico.
   */
  public static getFormatterTip(name: string): string {
    return FORMATTERS[name]?.tip || 'No instructions available.';
  }

  /**
   * Identifica todas as tags de interpolação em um texto e as retorna estruturadas.
   * Útil para o mapeamento visual no VariableManager.
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
   * Reconstrói uma string de tag a partir de um objeto ParsedTag.
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
   * Aplica os dados em uma string substituindo variáveis {{key}}.
   * Suporta uma hierarquia de dados (registro atual > contexto global).
   * 
   * @param template Texto com tags a ser processado.
   * @param data Objeto de dados do registro atual (ex: linha do CSV).
   * @param context Objeto de contexto global (ex: {{index}}, {{total}}).
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
   * Localiza e executa a lógica de formatação de um valor.
   * Suporta parâmetros via parênteses, ex: truncate(10).
   */
  private static applyFormatter(value: any, formatter: string): any {
    const parts = formatter.match(/^(\w+)(?:\((.*)\))?$/);
    if (!parts) return value;

    const name = parts[1].toLowerCase();
    const params = parts[2] ? parts[2].split(',').map((p) => p.trim()) : [];

    const def = FORMATTERS[name];
    if (def) {
      try {
        return def.fn(value, params);
      } catch (err) {
        logger.error('Parser', `Formatter error: ${name}`, err);
        return value;
      }
    }

    return value;
  }

  /**
   * Tenta converter um valor para Date de forma segura e determinística.
   */
  public static parseDateSafe(value: any): Date | null {
    if (!value) return null;
    try {
      const d = new Date(value);
      if (!isNaN(d.getTime())) return d;
      
      // Fallback para strings que o JS as vezes falha (YYYY-MM-DD)
      if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
         return new Date(value + 'T00:00:00Z');
      }
      return null;
    } catch { return null; }
  }

  /**
   * Helper para formatação de datas (Padrão Brasileiro).
   * @param value String de data ISO ou timestamp.
   * @param showTime Se deve incluir horas e minutos.
   */
  public static formatDate(value: any, showTime: boolean): string {
    try {
      const date = this.parseDateSafe(value);
      if (!date) return String(value);

      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'UTC' // Forçamos UTC para strings ISO sem tempo
      };
      if (showTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
        delete options.timeZone; // Se tem tempo, usamos o local ou o do dado
      }
      return new Intl.DateTimeFormat('pt-BR', options).format(date);
    } catch {
      return String(value);
    }
  }

  /**
   * Aplica offset de data (adição ou subtração).
   */
  public static applyDateOffset(value: any, params: string[], mode: 'add' | 'sub'): string {
    try {
      const amount = parseInt(params[0]) || 0;
      const unit = (params[1] || 'days').toLowerCase();
      
      const date = this.parseDateSafe(value);
      if (!date) return String(value);

      const sign = mode === 'add' ? 1 : -1;

      if (unit.startsWith('day')) {
        date.setUTCDate(date.getUTCDate() + (amount * sign));
      } else if (unit.startsWith('month')) {
        date.setUTCMonth(date.getUTCMonth() + (amount * sign));
      } else if (unit.startsWith('year')) {
        date.setUTCFullYear(date.getUTCFullYear() + (amount * sign));
      }

      return date.toISOString();
    } catch {
      return String(value);
    }
  }
}

export const dataSourceParser = new DataSourceParser();
