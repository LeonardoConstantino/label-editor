/**
 * index.ts — Exportações principais do GistDB SDK.
 */

export { GistDB } from './GistDB.js';
export { TypedEventEmitter } from './EventEmitter.js';
export { Logger } from './Logger.js';
export { CryptoManager } from './CryptoManager.js';
export { LocalCacheAdapter } from './LocalCacheAdapter.js';
export { ConflictResolver } from './ConflictResolver.js';
export { GistTransport } from './GistTransport.js';
export { KeyVault } from './KeyVault.js';
export { DeviceIdentity } from './DeviceIdentity.js';
export { GistDBError, ERROR_CODES } from './errors.js';

export type {
  GistDBConfig,
  DeviceInfo,
  CacheEntry,
  TransportPayload,
  EncryptedPayload,
  EventMap,
  GistDBEvents,
  EventKey,
  EventCallback,
  ListenerOptions,
  IEventEmitterLogger,
  TypedEventEmitterOptions,
} from './types.js';
