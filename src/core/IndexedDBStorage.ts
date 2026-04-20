import { logger } from './Logger';

export interface StoreConfig {
  name: string;
  keyPath: string;
  indices?: { name: string; keyPath: string; unique?: boolean }[];
}

/**
 * Gerenciamento de storage persistente usando IndexedDB.
 * Suporta múltiplos object stores e índices.
 */
export class IndexedDBStorage {
  private _db: IDBDatabase | null = null;

  constructor(
    private dbName: string,
    private version: number,
    private stores: StoreConfig[]
  ) {}

  async initialize(): Promise<void> {
    if (this._db) return;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (e: any) => {
        const db = e.target.result;
        this.stores.forEach(config => {
          if (!db.objectStoreNames.contains(config.name)) {
            const store = db.createObjectStore(config.name, { keyPath: config.keyPath });
            config.indices?.forEach(index => {
              store.createIndex(index.name, index.keyPath, { unique: index.unique ?? false });
            });
          }
        });
      };

      request.onsuccess = () => {
        this._db = request.result;
        logger.debug('Storage', `DB ${this.dbName} inicializado com sucesso.`);
        resolve();
      };

      request.onerror = () => {
        logger.error('Storage', `Erro ao abrir DB ${this.dbName}: ${request.error}`);
        reject(request.error);
      };
    });
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async get<T>(storeName: string, key: string | number): Promise<T | null> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  }

  async put<T>(storeName: string, value: T): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(value);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName: string, key: string | number): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private async getDB(): Promise<IDBDatabase> {
    if (!this._db) {
      await this.initialize();
    }
    return this._db!;
  }
}
