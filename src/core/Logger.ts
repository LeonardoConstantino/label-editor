/**
 * @fileoverview Sistema de logging centralizado com níveis, namespaces, grupos, persistência e exportação
 */

/**
 * Níveis de log disponíveis
 */
export const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4,
} as const;

/**
 * Tipo derivado dos níveis de log
 */
export type LogLevelType = typeof LogLevel[keyof typeof LogLevel];

/**
 * Formato de estilo para cada nível de log
 */
interface LogFormatConfig {
  style: string;
  emoji: string;
}

/**
 * Entrada individual de log
 */
interface LogEntry {
  level: LogLevelType;
  namespace: string;
  message: string;
  args: unknown[];
  timestamp: string;
  group: string[] | null;
  stack: string | null;
}

/**
 * Opções de configuração do Logger
 */
interface LoggerOptions {
  level?: LogLevelType;
  prefix?: string;
  persist?: boolean;
  maxEntries?: number;
  devMode?: boolean;
}

/**
 * Formatos de exportação disponíveis
 */
type ExportFormat = 'json' | 'csv' | 'text';

export class Logger {
  private level: LogLevelType;
  private prefix: string;
  private persist: boolean;
  private maxEntries: number;
  private devMode: boolean;
  private logFormat: Readonly<Record<'debug' | 'log' | 'info' | 'warn' | 'error', LogFormatConfig>>;
  private entries: LogEntry[];
  private activeGroups: string[];

  /**
   * @param options - Configurações do logger
   */
  constructor(options: LoggerOptions = {}) {
    this.level = options.level ?? LogLevel.INFO;
    this.prefix = options.prefix ?? '[Logger]';
    this.persist = options.persist ?? false;
    this.maxEntries = options.maxEntries ?? 100;
    this.devMode = options.devMode ?? false;

    this.logFormat = Object.freeze({
      debug: { style: 'color: #888; font-weight: normal;', emoji: '🐛' },
      log: { style: 'color: #50777E; font-weight: normal;', emoji: '📄' },
      info: { style: 'color: #2196F3; font-weight: bold;', emoji: 'ℹ️' },
      warn: { style: 'color: #FF9800; font-weight: bold;', emoji: '⚠️' },
      error: { style: 'color: #F44336; font-weight: bold;', emoji: '❌' },
    });

    this.entries = [];
    this.activeGroups = [];

    // Carregar logs persistidos (se habilitado)
    if (this.persist && typeof localStorage !== 'undefined') {
      this._loadFromStorage();
    }
  }

  /**
   * Verifica se o nível de log atual permite a exibição da mensagem
   */
  shouldLog(level: LogLevelType): boolean {
    return level >= this.level;
  }

  /**
   * Formata a mensagem de log com prefixo, namespace e timestamp
   */
  format(namespace: string, msg: string): string {
    const timestamp = new Intl.DateTimeFormat('pt-br', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      hour12: false,
    }).format(new Date());

    return `${this.prefix} [${namespace}] ${msg} (${timestamp})`;
  }

  /**
   * Define o nível mínimo de log
   */
  setLevel(level: LogLevelType): void {
    this.level = level;
  }

  /**
   * Captura stack trace do chamador
   */
  private _captureStackTrace(): string | null {
    if (!this.devMode) return null;

    const stack = new Error().stack;
    if (!stack) return null;

    // Remove as primeiras linhas (Error + método interno do Logger)
    const lines = stack.split('\n').slice(3);
    return lines.join('\n');
  }

  /**
   * Salva entrada no histórico interno
   */
  private _saveEntry(
    level: LogLevelType,
    namespace: string,
    msg: string,
    args: unknown[]
  ): void {
    const entry: LogEntry = {
      level,
      namespace,
      message: msg,
      args,
      timestamp: new Date().toISOString(),
      group: this.activeGroups.length > 0 ? [...this.activeGroups] : null,
      stack: this._captureStackTrace(),
    };

    this.entries.push(entry);

    // Limitar tamanho do histórico
    if (this.entries.length > this.maxEntries) {
      this.entries.shift();
    }

    // Persistir se habilitado
    if (this.persist && typeof localStorage !== 'undefined') {
      this._saveToStorage();
    }
  }

  /**
   * Salva logs no localStorage
   */
  private _saveToStorage(): void {
    try {
      localStorage.setItem(`${this.prefix}_logs`, JSON.stringify(this.entries));
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Erro desconhecido';
      console.warn('Falha ao persistir logs:', message);
    }
  }

  /**
   * Carrega logs do localStorage
   */
  private _loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(`${this.prefix}_logs`);
      if (stored) {
        this.entries = JSON.parse(stored) as LogEntry[];
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Erro desconhecido';
      console.warn('Falha ao carregar logs persistidos:', message);
    }
  }

  /**
   * Exibe stack trace se devMode estiver ativo
   */
  private _logStackTrace(): void {
    if (this.devMode) {
      const stack = this._captureStackTrace();
      if (stack) {
        console.groupCollapsed(
          '%c📍 Stack Trace',
          'color: #9E9E9E; font-style: italic;'
        );
        console.log(stack);
        console.groupEnd();
      }
    }
  }

  /**
   * Registra uma mensagem de log no nível DEBUG
   */
  debug(namespace: string, msg: string, ...args: unknown[]): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(
        `%c${this.logFormat.debug.emoji} ${this.format(namespace, msg)}`,
        this.logFormat.debug.style,
        ...args
      );
      this._logStackTrace();
      this._saveEntry(LogLevel.DEBUG, namespace, msg, args);
    }
  }

  /**
   * Registra uma mensagem de log genérica (nível DEBUG) para compatibilidade com console.log
   */
  log(namespace: string, msg: string, ...args: unknown[]): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(
        `%c${this.logFormat.log.emoji} ${this.format(namespace, msg)}`,
        this.logFormat.log.style,
        ...args
      );
      this._logStackTrace();
      this._saveEntry(LogLevel.DEBUG, namespace, msg, args);
    }
  }

  /**
   * Registra uma mensagem de log no nível INFO
   */
  info(namespace: string, msg: string, ...args: unknown[]): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(
        `%c${this.logFormat.info.emoji} ${this.format(namespace, msg)}`,
        this.logFormat.info.style,
        ...args
      );
      this._logStackTrace();
      this._saveEntry(LogLevel.INFO, namespace, msg, args);
    }
  }

  /**
   * Registra uma mensagem de log no nível WARN
   */
  warn(namespace: string, msg: string, ...args: unknown[]): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(
        `%c${this.logFormat.warn.emoji} ${this.format(namespace, msg)}`,
        this.logFormat.warn.style,
        ...args
      );
      this._logStackTrace();
      this._saveEntry(LogLevel.WARN, namespace, msg, args);
    }
  }

  /**
   * Registra uma mensagem de log no nível ERROR
   */
  error(namespace: string, msg: string, ...args: unknown[]): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(
        `%c${this.logFormat.error.emoji} ${this.format(namespace, msg)}`,
        this.logFormat.error.style,
        ...args
      );
      this._logStackTrace();
      this._saveEntry(LogLevel.ERROR, namespace, msg, args);
    }
  }

  /**
   * Inicia um grupo de logs
   */
  group(label: string): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      this.activeGroups.push(label);
      console.group(label);
    }
  }

  /**
   * Inicia um grupo de logs colapsado
   */
  groupCollapsed(label: string): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      this.activeGroups.push(label);
      console.groupCollapsed(label);
    }
  }

  /**
   * Encerra o grupo de logs ativo
   */
  groupEnd(): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      this.activeGroups.pop();
      console.groupEnd();
    }
  }

  /**
   * Exporta logs em formato especificado
   */
  export(format: ExportFormat = 'json'): string {
    switch (format.toLowerCase() as ExportFormat) {
      case 'json':
        return JSON.stringify(this.entries, null, 2);

      case 'csv': {
        const headers = 'Timestamp,Level,Namespace,Message,Group,Stack\n';
        const rows = this.entries
          .map((e) => {
            const levelName =
              (Object.keys(LogLevel) as Array<keyof typeof LogLevel>).find(
                (k) => LogLevel[k] === e.level
              ) ?? 'UNKNOWN';
            const group = e.group ? e.group.join(' > ') : '';
            const stack = e.stack ? e.stack.replace(/"/g, '""') : '';
            return `"${e.timestamp}","${levelName}","${e.namespace}","${e.message}","${group}","${stack}"`;
          })
          .join('\n');
        return headers + rows;
      }

      case 'text':
        return this.entries
          .map((e) => {
            const levelName =
              (Object.keys(LogLevel) as Array<keyof typeof LogLevel>).find(
                (k) => LogLevel[k] === e.level
              ) ?? 'UNKNOWN';
            const group = e.group ? ` [${e.group.join(' > ')}]` : '';
            const stack = e.stack ? `\n${e.stack}` : '';
            return `[${e.timestamp}] ${levelName} ${this.prefix} [${e.namespace}]${group}: ${e.message}${stack}`;
          })
          .join('\n\n');

      default:
        throw new Error(`Formato desconhecido: ${format}`);
    }
  }

  /**
   * Limpa histórico de logs
   */
  clear(): void {
    this.entries = [];
    if (this.persist && typeof localStorage !== 'undefined') {
      localStorage.removeItem(`${this.prefix}_logs`);
    }
  }

  /**
   * Retorna cópia do histórico de logs
   */
  getEntries(): LogEntry[] {
    return [...this.entries];
  }
}
// Instância única para o app
export const logger = new Logger({ level: LogLevel.DEBUG, prefix: '[LabelEditor]', devMode: false });
