import { logger } from './Logger';

// Type-only imports para evitar ciclos de dependência em runtime
import type { AppState } from './Store';
import type { AnyElement, CanvasConfig, Label } from '../domain/models/Label';
import type { UserPreferences } from '../domain/models/UserPreferences';
import type { OverflowResult } from '../domain/services/OverflowValidator';

/**
 * Payload Types
 */
export interface ProductionDataUpdatePayload {
  data: Record<string, unknown>[];
  sourceName: string;
}

export interface ElementUpdatePayload {
  id: string;
  updates: Partial<AnyElement>;
  silent?: boolean;
}

export interface ModuleSwitchPayload {
  moduleId: AppState['activeModuleId'];
}

/**
 * EventMap: Definição rigorosa de todos os eventos do sistema e seus payloads.
 * Atua como o contrato central de comunicação do Label Forge OS.
 */
export interface EventMap {
  // Store & State
  'state:change': AppState;
  'history:undo': { source?: string };
  'history:redo': { source?: string };
  'history:jump': { index: number };
  'history:snapshot': { description?: string };

  // UI & Feedback
  'notify': { 
    message: string; 
    type: 'success' | 'error' | 'info' | 'warning'; 
    duration?: number 
  };
  'perf:render': { duration: number };
  'ui:modal:open': { id: string };
  'ui:modal:close': { id: string };
  'ui:open:help': { tab?: string; source?: string };
  'module:switch': ModuleSwitchPayload;

  // Production & Batch
  'production:data:update': ProductionDataUpdatePayload;
  'production:preview:index': { index: number };
  'production:print:open': {};
  'production:config:update': Partial<import('../domain/services/PDFGenerator').BatchLayoutOptions>;
  'production:progress': { current: number; total: number; progress: number; message: string };
  'production:start': { total: number };
  'production:complete': {};
  'production:error': { message: string };

  // Element Manipulation
  'element:add': AnyElement;
  'element:update': ElementUpdatePayload;
  'elements:update': { id: string; updates: Partial<AnyElement> }[];
  'element:delete': string;
  'element:select': string | string[];
  'element:reorder': { id: string; direction: 'up' | 'down' };
  'element:duplicate': string;
  'element:warning': { id: string; result: OverflowResult };
  'element:warning:clear': { id: string };

  // Document & Persistence
  'label:config:update': CanvasConfig;
  'label:opened': Label;
  'preferences:update': Partial<UserPreferences>;
  'preferences:change': UserPreferences;
  'template:save': { source?: string };
  'template:saved': Label;
  'asset:edit': import('../components/editor/modules/AssetLibrary').Asset;
  
  // Commands
  'command:toolbar:upload-image': { source?: string };
  'command:canvas:drop-asset': { x: number; y: number; asset: { type: string, src: string, name: string } };
  'request:canvas:snapshot': (ctx: CanvasRenderingContext2D) => void;
  'command:canvas:restore': ImageData;
}

/**
 * Tipos de configuração do EventBus
 */
interface EventBusOptions {
  maxListeners?: number;
  debug?: boolean;
  logger?: typeof logger;
}

/**
 * Opções para registro de eventos
 */
interface EventOptions {
  signal?: AbortSignal;
}

/**
 * Opções para emissão assíncrona
 */
interface EmitAsyncOptions {
  signal?: AbortSignal;
}

/**
 * Tipo genérico para callbacks de eventos baseado no EventMap
 */
type EventCallback<K extends keyof EventMap> = (data: EventMap[K]) => void | Promise<void>;

/**
 * Função de cleanup para remover listeners
 */
type UnsubscribeFn = () => void;

/**
 * EventBus: Orquestrador desacoplado e tipado.
 * Implementa Type Safety para garantir que eventos e payloads estejam sincronizados.
 */
class EventBus {
  private events: Map<keyof EventMap, Set<EventCallback<keyof EventMap>>>;
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
  private _validateCallback<K extends keyof EventMap>(
    callback: unknown,
  ): asserts callback is EventCallback<K> {
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
  on<K extends keyof EventMap>(
    event: K, 
    callback: EventCallback<K>, 
    options?: EventOptions
  ): UnsubscribeFn {
    this._validateCallback<K>(callback);

    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    const listeners = this.events.get(event) as Set<EventCallback<K>>;

    // Aviso de possível memory leak
    if (listeners.size >= this.maxListeners) {
      if (this.debug) {
        console.warn(
          `[EventBus] Possible memory leak detected: ${listeners.size} listeners for "${event}"`
        );
      }
    }

    listeners.add(callback);
    this._log('Registered', event, { listenerCount: listeners.size });

    // Cleanup automático com AbortSignal
    const unsubscribe = () => this.off(event, callback);

    if (options?.signal) {
      if (options.signal.aborted) {
        unsubscribe();
        return () => {};
      }
      options.signal.addEventListener('abort', unsubscribe, { once: true });
    }

    return unsubscribe;
  }

  /**
   * Registra um listener que executa apenas uma vez
   */
  once<K extends keyof EventMap>(
    event: K, 
    callback: EventCallback<K>, 
    options?: EventOptions
  ): UnsubscribeFn {
    this._validateCallback<K>(callback);

    const onceWrapper: EventCallback<K> = (data) => {
      callback(data);
      this.off(event, onceWrapper);
    };

    return this.on(event, onceWrapper, options);
  }

  /**
   * Remove um listener específico
   */
  off<K extends keyof EventMap>(event: K, callback: EventCallback<K>): void {
    if (!this.events.has(event)) return;

    const listeners = this.events.get(event) as Set<EventCallback<K>>;
    listeners.delete(callback);

    if (listeners.size === 0) {
      this.events.delete(event);
    }

    this._log('Unregistered', event, { listenerCount: listeners.size });
  }

  /**
   * Emite um evento para todos os listeners (síncrono)
   */
  emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void {
    if (!this.events.has(event)) {
      this._log('Emit (no listeners)', event, data);
      return;
    }

    this._log('Emit', event, data);
    const listeners = this.events.get(event) as Set<EventCallback<K>>;

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
  async emitAsync<K extends keyof EventMap>(
    event: K, 
    data: EventMap[K], 
    options?: EmitAsyncOptions
  ): Promise<void> {
    if (!this.events.has(event)) return;

    if (options?.signal?.aborted) {
      this._log('EmitAsync aborted (before start)', event, data);
      return;
    }

    this._log('EmitAsync', event, data);
    const listeners = this.events.get(event) as Set<EventCallback<K>>;

    const promises = Array.from(listeners).map(async (callback) => {
      try {
        if (options?.signal?.aborted) {
          this._log('EmitAsync callback skipped (aborted)', event);
          return;
        }
        await callback(data);
      } catch (error) {
        console.error(
          `[EventBus] Error in async listener for "${event}":`,
          error
        );
      }
    });

    await Promise.all(promises);
  }

  /**
   * Remove todos os listeners de um evento
   */
  clear(event?: keyof EventMap): void {
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
  listenerCount(event: keyof EventMap): number {
    return this.events.has(event) ? this.events.get(event)!.size : 0;
  }

  /**
   * Lista todos os eventos registrados
   */
  eventNames(): string[] {
    return Array.from(this.events.keys());
  }
}

// Exporta instância global padrão
export default new EventBus({ debug: true, logger });
