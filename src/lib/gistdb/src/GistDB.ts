// @ts-ignore
import { CryptoManager } from './CryptoManager.js';
import { GistTransport } from './GistTransport.js';
// @ts-ignore
import { GistAPI } from './GistAPI.js';
import { LocalCacheAdapter } from './LocalCacheAdapter.js';
// @ts-ignore
import { ConflictResolver } from './ConflictResolver.js';
// @ts-ignore
import { KeyVault } from './KeyVault.js';
import { GistDBError } from './errors.js';
import { DeviceIdentity } from './DeviceIdentity.js';
import {
  DeviceInfo,
  GistDBConfig,
  GistDBEvents,
  EventCallback,
  ListenerOptions,
} from './types.js';
import { Logger } from './Logger.js';
import { TypedEventEmitter } from './EventEmitter.js';


export class GistDB {
  #crypto: any = null;
  #transport: GistTransport | null = null;
  #cache: LocalCacheAdapter | null = null;
  #resolver: any = null;
  #password: string | null = null;
  #prefix = '';
  #gistId: string | null = null;
  #watchers = new Map<string, Set<(id: string, data: any) => void>>();
  #pollIntervals = new Map<string, any>();
  #schema: Record<string, (data: any) => boolean> = {};
  #deviceInfo: DeviceInfo | null = null;
  #autoSyncCleanups: Array<() => void> = [];
  #emitter = new TypedEventEmitter<GistDBEvents>();

  constructor() {
    // Use GistDB.create() — não instancie diretamente
  }

  get deviceId(): string {
    return this.#deviceInfo?.id || '';
  }

  get devices() {
    return {
      list: async (): Promise<DeviceInfo[]> => {
        this.#assertReady();
        const list = await this.list('__devices__').catch(() => []);
        const mapped: DeviceInfo[] = list.map((dev: any) => ({
          id: dev._id || dev.id,
          name: dev.name,
          platform: dev.platform,
          lastSeenAt: dev.lastSeenAt || dev._updatedAt,
          isCurrent: dev._id === this.deviceId || dev.id === this.deviceId,
        }));

        for (const dev of mapped) {
          this.#emitter.emit('device:seen', dev);
        }

        return mapped;
      },
    };
  }

  /**
   * Factory assíncrono. Único ponto de entrada público.
   */
  static async create({
    token,
    prefix,
    gistId = null,
    password = undefined,
    schema = {},
    conflictResolver = 'last-write-wins',
    ttl = 5 * 60 * 1000,
    autoConnect = true,
    autoSync = false,
    deviceName = undefined,
  }: GistDBConfig): Promise<GistDB> {
    if (!token)
      throw new GistDBError('TOKEN_REQUIRED', 'Forneça um GitHub token.');
    if (!prefix)
      throw new GistDBError('PREFIX_REQUIRED', 'Forneça um prefix único.');

    const db = new GistDB();
    db.#prefix = prefix;
    db.#gistId = gistId;
    db.#deviceInfo = DeviceIdentity.getDeviceInfo(deviceName);

    KeyVault.store(token);

    if (password) {
      db.#crypto = await CryptoManager.fromPassword(password);
      db.#password = password;
    }

    const api = new GistAPI(KeyVault.retrieve, prefix, db.#emitter);
    db.#transport = new GistTransport(api, { emitter: db.#emitter });
    db.#cache = new LocalCacheAdapter({ ttl, prefix });
    db.#resolver = new ConflictResolver(conflictResolver);
    db.#schema = schema;

    if (!gistId) {
      db.#gistId = await db.#transport.initGist(autoConnect);
    }

    db.#transport.setGistId(db.#gistId!);

    db.#setupNetworkAndLifecycleEvents(autoSync);

    // Registo silencioso do dispositivo na collection reservada __devices__
    await db.set('__devices__', db.#deviceInfo.id, {
      name: db.#deviceInfo.name,
      platform: db.#deviceInfo.platform,
      lastSeenAt: db.#deviceInfo.lastSeenAt,
    }).catch(() => {});

    db.#emitter.emit('device:registered', db.#deviceInfo);

    return db;
  }

  // ─── EVENTOS ─────────────────────────────────────────────────

  on<E extends keyof GistDBEvents>(
    event: E,
    callback: EventCallback<GistDBEvents, E>,
    options?: ListenerOptions,
  ): () => void;
  on<E extends string>(
    event: E,
    callback: (payload: any) => void,
    options?: ListenerOptions,
  ): () => void;
  on(event: string, callback: Function, options?: ListenerOptions): () => void {
    return this.#emitter.on(event as any, callback as any, options);
  }

  once<E extends keyof GistDBEvents>(
    event: E,
    callback: EventCallback<GistDBEvents, E>,
    options?: ListenerOptions,
  ): () => void;
  once<E extends string>(
    event: E,
    callback: (payload: any) => void,
    options?: ListenerOptions,
  ): () => void;
  once(event: string, callback: Function, options?: ListenerOptions): () => void {
    return this.#emitter.once(event as any, callback as any, options);
  }

  off<E extends keyof GistDBEvents | string>(event: E, callback: Function): this {
    this.#emitter.off(event as any, callback);
    return this;
  }

  removeAllListeners<E extends keyof GistDBEvents | string>(event?: E): this {
    this.#emitter.removeAllListeners(event as any);
    return this;
  }

  listenerCount<E extends keyof GistDBEvents | string>(event: E): number {
    return this.#emitter.listenerCount(event as any);
  }

  eventNames(): string[] {
    return this.#emitter.eventNames();
  }

  rawListeners<E extends keyof GistDBEvents | string>(event: E): Function[] {
    return this.#emitter.rawListeners(event as any);
  }

  emit<E extends keyof GistDBEvents>(event: E, payload: GistDBEvents[E]): boolean;
  emit<E extends string>(event: E, payload?: any): boolean;
  emit(event: string, payload?: any): boolean {
    return this.#emitter.emit(event as any, payload);
  }

  // ─── CRUD ────────────────────────────────────────────────────

  async get(collection: string, id: string): Promise<any> {
    this.#assertReady();
    const traceId = Logger.createTraceId();
    const startTime = Date.now();
    Logger.debug('GistDB', `get() initiated for ${collection}/${id}`, undefined, traceId);

    const cacheKey = this.#key(collection, id);

    const cached = await this.#cache!.read(cacheKey);
    if (cached) {
      const durationMs = Date.now() - startTime;
      Logger.info('GistDB', `get() resolved via cache for ${collection}/${id}`, { durationMs, fromCache: true }, traceId);
      return cached.data;
    }

    const raw = await this.#transport!.getFile(this.#filename(collection, id));
    if (!raw) {
      const durationMs = Date.now() - startTime;
      Logger.info('GistDB', `get() record not found for ${collection}/${id}`, { durationMs, found: false }, traceId);
      return null;
    }

    const data = await this.#maybeDecrypt(raw, { collection, id });
    await this.#cache!.write(cacheKey, data, raw._version);

    const durationMs = Date.now() - startTime;
    Logger.info('GistDB', `get() resolved via remote for ${collection}/${id}`, { durationMs, fromCache: false, version: raw._version }, traceId);
    return data;
  }

  async set(
    collection: string,
    id: string,
    data: any,
  ): Promise<{ id: string; version: string; updatedAt: string }> {
    this.#assertReady();
    this.#validate(collection, data);

    const traceId = Logger.createTraceId();
    const startTime = Date.now();
    Logger.debug('GistDB', `set() initiated for ${collection}/${id}`, undefined, traceId);

    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

    // Se estiver offline, pula a leitura remota/resolução de conflito imediata da API
    let remote: any = null;
    if (isOnline) {
      remote = await this.#transport!.getFile(
        this.#filename(collection, id),
      ).catch(() => null);
    }

    const cached = await this.#cache!.read(this.#key(collection, id));
    const currentVersion = remote?._version || cached?.version || 'v0';
    const version = this.#nextVersion(currentVersion);

    const payload = {
      ...data,
      _id: id,
      _version: version,
      _updatedAt: new Date().toISOString(),
      _device: this.#deviceInfo,
    };

    let remoteDecrypted = null;
    if (remote) {
      try {
        remoteDecrypted = await this.#maybeDecrypt(remote, { collection, id });
      } catch (err) {
        Logger.warn(
          'GistDB',
          'set: falha ao descriptografar remote, usando payload bruto',
          err,
          traceId,
        );
        remoteDecrypted = remote;
      }
    }

    const resolved = remote
      ? (() => {
          // Emit conflict detected event before resolution
          this.#emitter.emit('conflict:detected', {
            collection,
            id,
            localVersion: cached?.version || currentVersion,
            remoteVersion: remote._version,
          });
          const result = this.#resolver.resolve(payload, remoteDecrypted, { version });
          // Emit conflict resolved event after resolution
          this.#emitter.emit('conflict:resolved', {
            collection,
            id,
            strategy: this.#resolver.strategy,
            result,
          });
          return result;
        })()
      : payload;

    const toWrite = await this.#maybeEncrypt(resolved);
    await this.#transport!.putFile(this.#filename(collection, id), toWrite);
    await this.#cache!.write(this.#key(collection, id), resolved, version);

    this.#notifyWatchers(collection, id, resolved);

    this.#emitter.emit('change', {
      collection,
      id,
      action: 'set',
      data: resolved,
    });
    this.#emitter.emit(`change:${collection}`, {
      id,
      action: 'set',
      data: resolved,
    });
    this.#emitter.emit('record:set', {
      collection,
      id,
      data: resolved,
      version,
    });

    const durationMs = Date.now() - startTime;
    Logger.info('GistDB', `set() completed for ${collection}/${id}`, { durationMs, version, isOnline }, traceId);

    return { id, version, updatedAt: resolved._updatedAt };
  }

  async update(
    collection: string,
    id: string,
    partialData: any,
  ): Promise<{ id: string; version: string; updatedAt: string }> {
    this.#assertReady();
    const existing = await this.get(collection, id);
    if (!existing) {
      throw new GistDBError(
        'NOT_FOUND',
        `Registro não encontrado para update em ${collection}/${id}.`,
      );
    }
    const merged = { ...existing, ...partialData };
    const res = await this.set(collection, id, merged);
    this.#emitter.emit('record:update', {
      collection,
      id,
      partialData,
      data: { ...merged, _id: id, _version: res.version, _updatedAt: res.updatedAt },
      version: res.version,
    });
    return res;
  }

  async has(collection: string, id: string): Promise<boolean> {
    this.#assertReady();
    const cached = await this.#cache!.read(this.#key(collection, id));
    if (cached) return true;

    const remote = await this.#transport!.getFile(
      this.#filename(collection, id),
    );
    return !!remote;
  }

  async clearCollection(collection: string): Promise<void> {
    this.#assertReady();
    const items = await this.#transport!.listFiles(collection);
    for (const item of items) {
      const id = item._id || item.id;
      const filename = item.__filename || (id ? this.#filename(collection, id) : null);
      if (filename) {
        await this.#transport!.deleteFile(filename);
      }
      if (id) {
        await this.#cache!.invalidate(this.#key(collection, id));
        this.#notifyWatchers(collection, id, null);
      }
    }
    this.#emitter.emit('collection:clear', { collection });
  }

  async clearCache(): Promise<void> {
    this.#assertReady();
    await this.#cache!.clear();
  }

  async clearAll(): Promise<void> {
    this.#assertReady();
    await this.clearCache();
    const collections = new Set<string>();
    const items = await this.#transport!.listFiles('');
    for (const item of items) {
      const filename = item.__filename;
      if (filename) {
        const parts = filename.split('_');
        if (parts.length >= 4) {
          const collection = parts[2];
          collections.add(collection);
        }
        await this.#transport!.deleteFile(filename);
      }
      const id = item._id || item.id;
      if (id) {
        const collection = item.__filename?.split('_')?.[2] || '';
        if (collection) {
          await this.#cache!.invalidate(this.#key(collection, id));
        }
      }
    }
    for (const collection of collections) {
      this.#notifyWatchers(collection, '', null);
      this.#emitter.emit('collection:clear', { collection });
    }
    this.#emitter.emit('db:clear', undefined);
  }

  async delete(collection: string, id: string): Promise<boolean> {
    this.#assertReady();
    await this.#transport!.deleteFile(this.#filename(collection, id));
    await this.#cache!.invalidate(this.#key(collection, id));
    this.#notifyWatchers(collection, id, null);

    this.#emitter.emit('change', {
      collection,
      id,
      action: 'delete',
    });
    this.#emitter.emit(`change:${collection}`, {
      id,
      action: 'delete',
    });
    this.#emitter.emit('record:delete', {
      collection,
      id,
    });
    return true;
  }

  async list(
    collection: string,
    filterFn: ((item: any) => boolean) | null = null,
  ): Promise<any[]> {
    this.#assertReady();
    const files = await this.#transport!.listFiles(collection);
    const results = await Promise.all(
      files.map(async (f) => {
        const data = await this.#maybeDecrypt(f);
        return data;
      }),
    );
    return filterFn ? results.filter(filterFn) : results;
  }

  // ─── SYNC ────────────────────────────────────────────────────

  async sync(): Promise<{ syncedAt: string }> {
    this.#assertReady();
    const startTime = Date.now();
    this.#emitter.emit('sync:start', undefined);

    try {
      await this.#cache!.clear();
      const flushResult = await this.#transport!.flushQueue();
      const syncedAt = new Date().toISOString();
      await this.#cache!.write('__meta__', { lastSyncAt: syncedAt }, 'v1');
      const durationMs = Date.now() - startTime;

      this.#emitter.emit('sync:success', {
        syncedAt,
        durationMs,
        flushedOperations: flushResult?.flushed ?? 0,
      });

      return { syncedAt };
    } catch (error) {
      const durationMs = Date.now() - startTime;
      this.#emitter.emit('sync:error', { error, durationMs });
      throw error;
    }
  }

  async getLastSyncAt(): Promise<string | null> {
    const meta = await this.#cache!.read('__meta__');
    return meta?.data?.lastSyncAt ?? null;
  }

  /**
   * Observa mudanças em uma collection via polling.
   */
  watch(
    collection: string,
    callback: (id: string, data: any) => void,
    interval = 30_000,
  ): () => void {
    if (!this.#watchers.has(collection)) {
      this.#watchers.set(collection, new Set());
    }
    this.#watchers.get(collection)!.add(callback);

    if (!this.#pollIntervals.has(collection)) {
      const timer = setInterval(
        () => this.#pollCollection(collection),
        interval,
      );
      this.#pollIntervals.set(collection, timer);
    }

    return () => this.#unwatch(collection, callback);
  }

  #unwatch(
    collection: string,
    callback: (id: string, data: any) => void,
  ): void {
    const callbacks = this.#watchers.get(collection);
    if (callbacks) {
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        this.#watchers.delete(collection);
        const timer = this.#pollIntervals.get(collection);
        if (timer) {
          clearInterval(timer as any);
          this.#pollIntervals.delete(collection);
        }
      }
    }
  }

  destroy(): void {
    this.#pollIntervals.forEach((t) => clearInterval(t as any));
    this.#pollIntervals.clear();
    this.#watchers.clear();
    this.#emitter.removeAllListeners();
    this.#autoSyncCleanups.forEach((cleanup) => cleanup());
    this.#autoSyncCleanups = [];
    KeyVault.clear();
  }

  #setupNetworkAndLifecycleEvents(
    opts:
      | boolean
      | {
          onFocus?: boolean;
          onReconnect?: boolean;
          onUnload?: boolean;
        },
  ): void {
    const win =
      typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
        ? (globalThis as any)
        : null;
    const doc =
      typeof document !== 'undefined'
        ? document
        : typeof globalThis !== 'undefined'
        ? (globalThis as any).document
        : null;

    if (win && typeof win.addEventListener === 'function') {
      const handleOnline = () => {
        Logger.info('GistDB', 'network: online detectado');
        this.#emitter.emit('network:online', undefined);
      };
      const handleOffline = () => {
        Logger.warn('GistDB', 'network: offline detectado');
        this.#emitter.emit('network:offline', undefined);
      };

      win.addEventListener('online', handleOnline);
      win.addEventListener('offline', handleOffline);

      this.#autoSyncCleanups.push(() => {
        if (typeof win.removeEventListener === 'function') {
          win.removeEventListener('online', handleOnline);
          win.removeEventListener('offline', handleOffline);
        }
      });
    }

    if (!opts) return;
    const cfg =
      typeof opts === 'boolean'
        ? { onFocus: true, onReconnect: true, onUnload: true }
        : {
            onFocus: opts.onFocus ?? true,
            onReconnect: opts.onReconnect ?? true,
            onUnload: opts.onUnload ?? true,
          };

    if (cfg.onFocus && doc && typeof doc.addEventListener === 'function') {
      const handleVisibility = () => {
        if (doc.visibilityState === 'visible') {
          Logger.info('GistDB', 'autoSync: ganho de foco da janela detectado, disparando sync()');
          this.sync().catch(() => {});
        }
      };
      doc.addEventListener('visibilitychange', handleVisibility);
      this.#autoSyncCleanups.push(() => {
        if (typeof doc.removeEventListener === 'function') {
          doc.removeEventListener('visibilitychange', handleVisibility);
        }
      });
    }

    if (cfg.onReconnect && win && typeof win.addEventListener === 'function') {
      const handleReconnectSync = () => {
        this.sync().catch(() => {});
      };
      win.addEventListener('online', handleReconnectSync);
      this.#autoSyncCleanups.push(() => {
        if (typeof win.removeEventListener === 'function') {
          win.removeEventListener('online', handleReconnectSync);
        }
      });
    }

    if (cfg.onUnload && win && typeof win.addEventListener === 'function') {
      const handleUnload = () => {
        this.sync().catch(() => {});
      };
      win.addEventListener('beforeunload', handleUnload);
      this.#autoSyncCleanups.push(() => {
        if (typeof win.removeEventListener === 'function') {
          win.removeEventListener('beforeunload', handleUnload);
        }
      });
    }
  }

  // ─── INTERNOS ────────────────────────────────────────────────

  #key(collection: string, id: string): string {
    return `${this.#prefix}:${collection}:${id}`;
  }

  #filename(collection: string, id: string): string {
    return `gistdb_${this.#prefix}_${collection}_${id}.json`;
  }

  #nextVersion(current: string | null | undefined): string {
    const n = parseInt(current?.split('v')[1] ?? '0', 10);
    return `v${isNaN(n) ? 1 : n + 1}`;
  }

  async #maybeEncrypt(data: any): Promise<any> {
    if (!this.#crypto) return data;
    return this.#crypto.encrypt(data);
  }

  async #maybeDecrypt(data: any, meta?: { collection?: string; id?: string }): Promise<any> {
    if (!this.#crypto) return data;

    // Attempt direct decryption
    try {
      const decrypted = await this.#crypto.decrypt(data);
      return decrypted;
    } catch (err) {
      // Emit crypto error event
      this.#emitter.emit('crypto:error', {
        collection: meta?.collection,
        id: meta?.id,
        error: err,
        attemptSaltRestore: !!(data?.salt && this.#password),
      });
      Logger.warn('GistDB', 'decrypt failed, attempting restore via salt', {
        hasSalt: !!data?.salt,
        passwordPresent: !!this.#password,
        payload: CryptoManager.analyzePayload(data),
      });
      if (data?.salt && this.#password) {
        const restoredData = await this.#tryRestoreAndVerify(data);
        if (restoredData !== null) return restoredData;
      }
      return data;
    }
  }



  async #tryRestoreAndVerify(data: any): Promise<any | null> {
    try {
      const restored = await CryptoManager.restore(this.#password!, data.salt);
      this.#crypto = restored;

      const verified = await restored.verify(data).catch(() => false);
      Logger.info('GistDB', 'verify after restore', { verified });

      if (verified) {
        return await restored.decrypt(data);
      }
      Logger.warn(
        'GistDB',
        'payload verification failed after restore, returning raw payload',
      );
    } catch (err: any) {
      Logger.warn('GistDB', 'restore via salt failed, returning raw payload', {
        err: err?.message || String(err),
      });
    }
    return null;
  }

  #validate(collection: string, data: any): void {
    const validator = this.#schema?.[collection];
    if (validator && !validator(data)) {
      throw new GistDBError(
        'VALIDATION_ERROR',
        `Dados inválidos para collection "${collection}".`,
      );
    }
  }

  #assertReady(): void {
    if (!this.#gistId)
      throw new GistDBError('NOT_INITIALIZED', 'GistDB não inicializado.');
  }

  async #pollCollection(collection: string): Promise<void> {
    const files = await this.#transport!.listFiles(collection).catch(() => []);
    for (const f of files) {
      const data = await this.#maybeDecrypt(f);
      const cached = await this.#cache!.read(this.#key(collection, data._id));
      if (cached?.version !== data._version) {
        await this.#cache!.write(
          this.#key(collection, data._id),
          data,
          data._version,
        );
        this.#notifyWatchers(collection, data._id, data);
        this.#emitter.emit('change', {
          collection,
          id: data._id,
          action: 'set',
          data,
        });
        this.#emitter.emit(`change:${collection}`, {
          id: data._id,
          action: 'set',
          data,
        });
        this.#emitter.emit('record:set', {
          collection,
          id: data._id,
          data,
          version: data._version,
        });
      }
    }
  }

  #notifyWatchers(collection: string, id: string, data: any): void {
    const callbacks = this.#watchers.get(collection);
    if (!callbacks) return;
    callbacks.forEach((cb) => cb(id, data));
  }
}

export { Logger };
