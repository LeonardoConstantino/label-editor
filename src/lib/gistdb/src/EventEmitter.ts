/**
 * EventEmitter.ts — TypedEventEmitter agnóstico para o GistDB SDK.
 *
 * Suporta tipagem estrita, canais dinâmicos, disparo único (once),
 * cancelamento via função retornada ou AbortSignal, isolamento de exceções
 * em handlers e observabilidade configurável com logger injetável.
 */

// @ts-ignore
import { Logger } from './Logger.js';
import type {
  EventMap,
  EventCallback,
  ListenerOptions,
  TypedEventEmitterOptions,
  IEventEmitterLogger,
  GistDBEvents,
} from './types.js';

interface ListenerEntry {
  originalCallback: Function;
  listener: Function;
  once: boolean;
  signal?: AbortSignal;
  signalCleanup?: () => void;
}

export class TypedEventEmitter<Events extends EventMap = GistDBEvents> {
  #events = new Map<string, Set<ListenerEntry>>();
  #logger: IEventEmitterLogger;
  #loggingEnabled: boolean;

  constructor(options?: TypedEventEmitterOptions) {
    this.#logger = options?.logger ?? Logger;
    this.#loggingEnabled = options?.enableLogging ?? false;
  }

  /**
   * Ativa ou desativa logs de observabilidade para o EventEmitter.
   */
  enableLogging(enabled = true): this {
    this.#loggingEnabled = enabled;
    return this;
  }

  /**
   * Desativa logs de observabilidade.
   */
  disableLogging(): this {
    this.#loggingEnabled = false;
    return this;
  }

  /**
   * Informa se o logging de eventos está ativo.
   */
  isLoggingEnabled(): boolean {
    return this.#loggingEnabled;
  }

  /**
   * Define um logger customizado após instanciação.
   */
  setLogger(logger: IEventEmitterLogger): this {
    this.#logger = logger;
    return this;
  }

  #log(level: 'debug' | 'info' | 'warn' | 'error', message: string, meta?: any): void {
    if (!this.#loggingEnabled) return;
    try {
      if (typeof (this.#logger as any)[level] === 'function') {
        (this.#logger as any)[level]('EventEmitter', message, meta);
      } else if (typeof this.#logger.debug === 'function') {
        this.#logger.debug('EventEmitter', `[${level.toUpperCase()}] ${message}`, meta);
      }
    } catch {
      // Isolamento contra possíveis erros no logger externo
    }
  }

  /**
   * Registra um ouvinte para o evento especificado.
   * Retorna uma função para cancelar a inscrição.
   */
  on<E extends keyof Events>(
    event: E,
    callback: EventCallback<Events, E>,
    options?: ListenerOptions,
  ): () => void;
  on<E extends string>(
    event: E,
    callback: (payload: any) => void,
    options?: ListenerOptions,
  ): () => void;
  on(event: string, callback: Function, options?: ListenerOptions): () => void {
    return this.#addListener(event, callback, false, options);
  }

  /**
   * Registra um ouvinte de execução única para o evento especificado.
   * Retorna uma função para cancelar a inscrição.
   */
  once<E extends keyof Events>(
    event: E,
    callback: EventCallback<Events, E>,
    options?: ListenerOptions,
  ): () => void;
  once<E extends string>(
    event: E,
    callback: (payload: any) => void,
    options?: ListenerOptions,
  ): () => void;
  once(event: string, callback: Function, options?: ListenerOptions): () => void {
    return this.#addListener(event, callback, true, options);
  }

  #addListener(
    event: string,
    callback: Function,
    once: boolean,
    options?: ListenerOptions,
  ): () => void {
    if (typeof callback !== 'function') {
      throw new TypeError(
        `Listener callback must be a function. Received ${typeof callback}`,
      );
    }

    const signal = options?.signal;

    // Se o signal já estiver abortado, retorna noop sem registrar
    if (signal?.aborted) {
      this.#log(
        'debug',
        `Ignored listener registration for event '${event}': signal already aborted`,
        { event, once },
      );
      return () => {};
    }

    if (!this.#events.has(event)) {
      this.#events.set(event, new Set());
    }
    const set = this.#events.get(event)!;

    let entry: ListenerEntry;

    const unsubscribe = () => {
      if (entry.signalCleanup) {
        entry.signalCleanup();
        entry.signalCleanup = undefined;
      }
      const deleted = set.delete(entry);
      if (set.size === 0) {
        this.#events.delete(event);
      }
      if (deleted) {
        this.#log('debug', `Listener removed for event: ${event}`, {
          event,
          remainingCount: this.listenerCount(event),
        });
      }
    };

    let signalCleanup: (() => void) | undefined;
    if (signal) {
      const onAbort = () => {
        this.#log(
          'debug',
          `Listener aborted via AbortSignal for event: ${event}`,
          { event },
        );
        unsubscribe();
      };
      signal.addEventListener('abort', onAbort, { once: true });
      signalCleanup = () => {
        signal.removeEventListener('abort', onAbort);
      };
    }

    const listener = once
      ? (...args: any[]) => {
          unsubscribe();
          return callback(...args);
        }
      : callback;

    entry = {
      originalCallback: callback,
      listener,
      once,
      signal,
      signalCleanup,
    };

    set.add(entry);

    this.#log('debug', `Listener registered for event: ${event}`, {
      event,
      once,
      hasSignal: Boolean(signal),
      listenerCount: set.size,
    });

    return unsubscribe;
  }

  /**
   * Remove um listener previamente registrado para o evento.
   */
  off<E extends keyof Events>(event: E, callback: Function): this;
  off<E extends string>(event: E, callback: Function): this;
  off(event: string, callback: Function): this {
    const set = this.#events.get(event);
    if (!set) return this;

    for (const entry of Array.from(set)) {
      if (entry.originalCallback === callback || entry.listener === callback) {
        if (entry.signalCleanup) {
          entry.signalCleanup();
        }
        set.delete(entry);
        this.#log('debug', `Listener removed for event: ${event}`, {
          event,
          remainingCount: set.size,
        });
        break;
      }
    }

    if (set.size === 0) {
      this.#events.delete(event);
    }

    return this;
  }

  /**
   * Emite um evento passando o payload aos ouvintes registrados.
   * O disparo é isolado com try/catch para garantir resiliência.
   * Retorna true se houver ao menos 1 ouvinte cadastrado, false caso contrário.
   */
  emit<E extends keyof Events>(event: E, payload: Events[E]): boolean;
  emit<E extends string>(event: E, payload?: any): boolean;
  emit(event: string, payload?: any): boolean {
    const set = this.#events.get(event);
    const count = set ? set.size : 0;

    this.#log('debug', `Emitted event: ${event}`, {
      event,
      listenerCount: count,
      payload,
    });

    if (!set || set.size === 0) {
      return false;
    }

    // Cópia defensiva para suportar mutações de listeners dentro do próprio callback
    const entries = Array.from(set);
    for (const entry of entries) {
      try {
        entry.listener(payload);
      } catch (err) {
        this.#log(
          'error',
          `Error in listener for event '${event}': ${(err as any)?.message || err}`,
          {
            event,
            error: err,
          },
        );
      }
    }

    return true;
  }

  /**
   * Remove todos os listeners registrados para um evento específico, ou para todos os eventos.
   */
  removeAllListeners<E extends keyof Events | string>(event?: E): this {
    if (event !== undefined) {
      const strEvent = String(event);
      const set = this.#events.get(strEvent);
      if (set) {
        for (const entry of set) {
          if (entry.signalCleanup) {
            entry.signalCleanup();
          }
        }
        this.#events.delete(strEvent);
        this.#log('debug', `Removed all listeners for event: ${strEvent}`, {
          event: strEvent,
        });
      }
    } else {
      for (const [, set] of this.#events.entries()) {
        for (const entry of set) {
          if (entry.signalCleanup) {
            entry.signalCleanup();
          }
        }
      }
      this.#events.clear();
      this.#log('debug', 'Removed all listeners for all events');
    }
    return this;
  }

  /**
   * Retorna o número de listeners registrados para um evento.
   */
  listenerCount<E extends keyof Events | string>(event: E): number {
    const set = this.#events.get(String(event));
    return set ? set.size : 0;
  }

  /**
   * Retorna os nomes de todos os eventos que possuem ouvintes ativos.
   */
  eventNames(): string[] {
    return Array.from(this.#events.keys());
  }

  /**
   * Retorna as referências aos callbacks originais de um determinado evento.
   */
  rawListeners<E extends keyof Events | string>(event: E): Function[] {
    const set = this.#events.get(String(event));
    if (!set) return [];
    return Array.from(set).map((e) => e.originalCallback);
  }
}
