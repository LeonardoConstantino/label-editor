/**
 * types.ts — Contratos e definições de tipos para o GistDB SDK.
 */

export interface GistDBConfig {
  /** GitHub Personal Access Token (obrigatório) */
  token: string;
  /** Prefixo para isolar chaves no Gist (obrigatório) */
  prefix: string;
  /** ID opcional do Gist se já existente */
  gistId?: string | null;
  /** Senha para criptografia AES-GCM (opcional) */
  password?: string;
  /** Esquema de validação por collection */
  schema?: Record<string, (data: any) => boolean>;
  /** Estratégia de resolução de conflitos */
  conflictResolver?:
    | 'last-write-wins'
    | 'merge'
    | ((local: any, remote: any) => any);
  /** TTL do cache local em milissegundos */
  ttl?: number;
  /** Descoberta automática de Gist pelo prefixo se gistId for omitido (padrão: true) */
  autoConnect?: boolean;
  /** Sincronização automática orientada a eventos do ciclo de vida da janela */
  autoSync?:
    | boolean
    | {
        onFocus?: boolean;
        onReconnect?: boolean;
        onUnload?: boolean;
      };
  /** Nome amigável do dispositivo atual (opcional) */
  deviceName?: string;
}

export interface DeviceInfo {
  id: string;
  name: string;
  platform: string;
  lastSeenAt: string;
  isCurrent?: boolean;
}

export interface CacheEntry<T = any> {
  data: T;
  version: string;
  cachedAt: number;
}

export interface TransportPayload {
  key: string;
  value: any;
  version: string;
  timestamp: number;
  action: 'set' | 'delete';
}

export interface EncryptedPayload {
  __encrypted: true;
  iv: string;
  ciphertext: string;
  salt: string;
}

// ─── Sistema Reativo de Eventos ──────────────────────────────────────────────

export type EventMap = Record<string, any>;

export interface GistDBEvents {
  // CRUD & Collection Events
  'change': { collection: string; id: string; action: 'set' | 'update' | 'delete'; data?: any };
  'record:set': { collection: string; id: string; data: any; version?: string };
  'record:update': { collection: string; id: string; partialData?: any; data?: any; version?: string };
  'record:delete': { collection: string; id: string };
  'collection:clear': { collection: string };
  'db:clear': void;

  // Queue & Offline Events
  'queue:enqueue': { type: string; filename: string; enqueuedAt: number };
  'queue:flush:start': void;
  'queue:flush:item': { key: string; action: string };
  'queue:flushed': { processedCount: number };

  // Network & Sync Lifecycle Events
  'network:online': void;
  'network:offline': void;
  'sync:start': void;
  'sync:success': { syncedAt: string; durationMs: number; flushedOperations?: number };
  'sync:error': { error: any; durationMs?: number };

  // Device Presence Events
  'device:registered': DeviceInfo;
  'device:seen': DeviceInfo;

  // Conflict, Crypto & API Events
  'conflict:detected': { collection: string; id: string; localVersion?: string; remoteVersion?: string };
  'conflict:resolved': { collection: string; id: string; strategy: string; result: any };
  'crypto:error': { collection?: string; id?: string; error: any; attemptSaltRestore?: boolean };
  'auth:error': { error: any; status?: number };
  'ratelimit': { remaining: number; resetAt: Date | number | string; limit: number };

  // Suporte a canais dinâmicos por collection: change:<collection>
  [key: `change:${string}`]: { id: string; action: 'set' | 'update' | 'delete'; data?: any };
}

export type EventKey<T extends EventMap> = string & keyof T;

export type EventCallback<T extends EventMap, K extends keyof T = keyof T> = (
  payload: T[K]
) => void | Promise<void>;

export interface ListenerOptions {
  /** Signal para cancelar o listener de forma reativa quando o controller abortar */
  signal?: AbortSignal;
}

export interface IEventEmitterLogger {
  debug(module: string, message: string, meta?: any): void;
  info?(module: string, message: string, meta?: any): void;
  warn?(module: string, message: string, meta?: any): void;
  error?(module: string, message: string, meta?: any): void;
}

export interface TypedEventEmitterOptions {
  /** Instância de logger customizado (opcional, padrão Logger do SDK) */
  logger?: IEventEmitterLogger;
  /** Habilitar logs detalhados de observabilidade (padrão: false) */
  enableLogging?: boolean;
}
