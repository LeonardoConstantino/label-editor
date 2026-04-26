import { logger } from './Logger';

/**
 * Sistema avançado de eventos (pub/sub) com recursos modernos
 * Permite comunicação desacoplada entre componentes
 */

/**
 * Tipos de configuração do EventBus
 */
interface EventBusOptions {
  maxListeners?: number;
  debug?: boolean;
  logger?: typeof logger;
}

/**
 * Tipo genérico para callbacks de eventos
 */
type EventCallback<T = unknown> = (data: T) => void | Promise<void>;

/**
 * Função de cleanup para remover listeners
 */
type UnsubscribeFn = () => void;

class EventBus {
  private events: Map<string, Set<EventCallback>>;
  private maxListeners: number;
  private debug: boolean;
  private logger: typeof logger;

  constructor(options: EventBusOptions = {}) {
    this.events = new Map();
    this.maxListeners = options.maxListeners ?? 35;
    this.debug = options.debug ?? false;
    this.logger = options.logger ?? logger;
  }

  /**
   * Valida se o callback é uma função
   */
  private _validateCallback(
    callback: unknown,
  ): asserts callback is EventCallback {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function');
    }
  }

  /**
   * Loga eventos em modo debug
   */
  private _log(
    action: string,
    event: string | null,
    data: unknown = null,
  ): void {
    if (this.debug) {
      this.logger.debug('EventBus', `${action}:`, event, data);
    }
  }

  /**
   * Configura o modo debug
   */
  setLog(enabled: boolean): void {
    this.debug = enabled;
  }

  /**
   * Registra um listener para um evento
   */
  on<T = unknown>(event: string, callback: EventCallback<T>): UnsubscribeFn {
    this._validateCallback(callback);

    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    const listeners = this.events.get(event)!;

    // Aviso de possível memory leak
    if (listeners.size >= this.maxListeners) {
      if (this.debug) {
        this.logger.warn(
          'EventBus',
          'Possible memory leak detected: ',
          `${listeners.size} listeners for "${event}"`,
        );
      }
    }

    listeners.add(callback as EventCallback);
    this._log('Registered', event, { listenerCount: listeners.size });

    // Retorna função para cleanup
    return () => this.off(event, callback);
  }

  /**
   * Registra um listener que executa apenas uma vez
   */
  once<T = unknown>(event: string, callback: EventCallback<T>): UnsubscribeFn {
    this._validateCallback(callback);

    const onceWrapper: EventCallback<T> = (data) => {
      callback(data);
      this.off(event, onceWrapper);
    };

    return this.on(event, onceWrapper);
  }

  /**
   * Remove um listener específico
   */
  off<T = unknown>(event: string, callback: EventCallback<T>): void {
    if (!this.events.has(event)) return;

    const listeners = this.events.get(event)!;
    listeners.delete(callback as EventCallback);

    // Remove entry vazia para economizar memória
    if (listeners.size === 0) {
      this.events.delete(event);
    }

    this._log('Unregistered', event, { listenerCount: listeners.size });
  }

  /**
   * Emite um evento para todos os listeners (síncrono)
   */
  emit<T = unknown>(event: string, data: T): void {
    if (!this.events.has(event)) {
      this._log('Emit (no listeners)', event, data);
      return;
    }

    this._log('Emit', event, data);
    const listeners = this.events.get(event)!;

    // Usa for...of para melhor performance
    for (const callback of listeners) {
      try {
        callback(data);
      } catch (error) {
        this.logger.error(
          'EventBus',
          `Error in listener for "${event}":`,
          error,
        );
      }
    }
  }

  /**
   * Emite um evento de forma assíncrona
   */
  async emitAsync<T = unknown>(event: string, data: T): Promise<void> {
    if (!this.events.has(event)) return;

    this._log('EmitAsync', event, data);
    const listeners = this.events.get(event)!;

    // Executa callbacks em paralelo
    const promises = Array.from(listeners).map(async (callback) => {
      try {
        await callback(data);
      } catch (error) {
        this.logger.error(
          'EventBus',
          `Error in async listener for "${event}":`,
          error,
        );
      }
    });

    await Promise.all(promises);
  }

  /**
   * Remove todos os listeners de um evento
   */
  clear(event?: string): void {
    if (event) {
      this.events.delete(event);
      this._log('Cleared', event);
    } else {
      this.events.clear();
      this._log('Cleared all events', null);
    }
  }

  /**
   * Retorna contagem de listeners para um evento
   */
  listenerCount(event: string): number {
    return this.events.has(event) ? this.events.get(event)!.size : 0;
  }

  /**
   * Lista todos os eventos registrados
   */
  eventNames(): string[] {
    return Array.from(this.events.keys());
  }
}

// Exporta uma factory function em vez de instância única
export const createEventBus = (options?: EventBusOptions): EventBus =>
  new EventBus(options);

// Exporta instância global padrão
export default new EventBus({ debug: true, logger });
