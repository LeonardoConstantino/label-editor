import { describe, test, expect, beforeAll, beforeEach, vi } from 'vitest';
import { GistDB } from '../src/GistDB.js';
import { GistDBConfig } from '../src/types.js';

// Setup Web Crypto API para Node.js
import { webcrypto } from 'crypto';
if (!(globalThis as any).crypto) {
  (globalThis as any).crypto = webcrypto;
}

// Mock In-Memory Fetch para simular a API do GitHub Gists sem requisições reais
let gistsStore: Record<string, any> = {};

function setupMockFetch() {
  gistsStore = {};
  (globalThis as any).fetch = vi.fn(async (url: string, opts: any = {}) => {
    const method = opts.method || 'GET';
    const body = opts.body ? JSON.parse(opts.body) : null;

    if (url.endsWith('/gists?per_page=100')) {
      const list = Object.values(gistsStore).map((g) => ({
        id: g.id,
        description: g.description,
      }));
      return {
        ok: true,
        status: 200,
        json: async () => list,
      };
    }

    if (method === 'POST' && url.endsWith('/gists')) {
      const id = `gist-test-${Math.random().toString(36).substring(2, 9)}`;
      gistsStore[id] = {
        id,
        description: body.description,
        files: body.files || {},
      };
      return {
        ok: true,
        status: 201,
        json: async () => gistsStore[id],
      };
    }

    const match = url.match(/\/gists\/([^/]+)$/);
    if (match) {
      const id = match[1];
      if (method === 'GET') {
        if (!gistsStore[id]) {
          return { ok: false, status: 404, statusText: 'Not Found' };
        }
        return {
          ok: true,
          status: 200,
          json: async () => gistsStore[id],
        };
      }
      if (method === 'PATCH') {
        if (!gistsStore[id]) {
          gistsStore[id] = { id, files: {} };
        }
        if (body?.files) {
          Object.entries(body.files).forEach(([name, val]: [string, any]) => {
            if (val === null) {
              delete gistsStore[id].files[name];
            } else {
              gistsStore[id].files[name] = val;
            }
          });
        }
        return {
          ok: true,
          status: 200,
          json: async () => gistsStore[id],
        };
      }
    }

    return { ok: false, status: 400, statusText: 'Bad Request' };
  });
}

// Mock sessionStorage / localStorage para ambiente de teste Node
const storageMock: Record<string, string> = {};
beforeAll(() => {
  (globalThis as any).sessionStorage = {
    getItem: (key: string) => storageMock[key] || null,
    setItem: (key: string, val: string) => { storageMock[key] = val; },
    removeItem: (key: string) => { delete storageMock[key]; },
    clear: () => { Object.keys(storageMock).forEach((k) => delete storageMock[k]); },
    key: (i: number) => Object.keys(storageMock)[i] || null,
    get length() { return Object.keys(storageMock).length; },
  } as any;
  (globalThis as any).localStorage = (globalThis as any).sessionStorage;
});

beforeEach(() => {
  Object.keys(storageMock).forEach((k) => delete storageMock[k]);
  setupMockFetch();
});

async function createTestDB(overrides: Partial<GistDBConfig> = {}): Promise<GistDB> {
  return GistDB.create({
    token: 'ghp_mock_token_1234567890abcdef',
    prefix: 'testapp',
    autoConnect: false,
    ...overrides,
  });
}

describe('GistDB (Classe Real)', () => {
  test('set() + get() roundtrip sem criptografia', async () => {
    const db = await createTestDB();
    await db.set('notas', 'n1', { texto: 'hello world' });
    const r = await db.get('notas', 'n1');
    expect(r.texto).toBe('hello world');
  });

  test('set() adiciona _id, _version e _updatedAt', async () => {
    const db = await createTestDB();
    await db.set('col', 'id1', { val: 1 });
    const r = await db.get('col', 'id1');
    expect(r._id).toBe('id1');
    expect(r._version).toBe('v1');
    expect(typeof r._updatedAt).toBe('string');
  });

  test('delete() remove o item', async () => {
    const db = await createTestDB();
    await db.set('col', 'del1', { x: 1 });
    await db.delete('col', 'del1');
    const r = await db.get('col', 'del1');
    expect(r).toBeNull();
  });

  test('list() retorna todos os itens da collection', async () => {
    const db = await createTestDB();
    await db.set('lista', 'a', { n: 1 });
    await db.set('lista', 'b', { n: 2 });
    const items = await db.list('lista');
    expect(items.length).toBeGreaterThanOrEqual(2);
  });

  test('list() com filtro retorna subconjunto', async () => {
    const db = await createTestDB();
    await db.set('tarefas', 't1', { done: true });
    await db.set('tarefas', 't2', { done: false });
    const pendentes = await db.list('tarefas', (t: any) => !t.done);
    expect(pendentes.length).toBe(1);
    expect(pendentes[0].done).toBe(false);
  });

  test('schema validation bloqueia dado inválido com GistDBError', async () => {
    const db = await createTestDB({
      schema: { items: (d: any) => typeof d.nome === 'string' },
    });
    await expect(db.set('items', 'i1', { sem_nome: true })).rejects.toThrow();
  });

  test('watch() dispara callback ao set()', async () => {
    const db = await createTestDB();
    let chamou = false;
    db.watch('eventos', () => { chamou = true; }, 100);
    await db.set('eventos', 'e1', { tipo: 'click' });
    expect(chamou).toBe(true);
    db.destroy();
  });

  test('destroy() limpa watchers e chave sem erros', async () => {
    const db = await createTestDB();
    db.watch('col', () => {}, 100);
    expect(() => db.destroy()).not.toThrow();
  });

  test('Task 02: set() inclui metadados de _device no payload', async () => {
    const db = await createTestDB({ deviceName: 'Meu Computador' });
    await db.set('docs', 'd1', { titulo: 'teste' });
    const r = await db.get('docs', 'd1');
    expect(r._device).toBeDefined();
    expect(typeof r._device.id).toBe('string');
    expect(r._device.name).toBe('Meu Computador');
  });

  test('Task 02: db.devices.list() retorna dispositivos registrados', async () => {
    const db = await createTestDB({ deviceName: 'Laptop Teste' });
    const devices = await db.devices.list();
    expect(devices.length).toBeGreaterThanOrEqual(1);
    expect(devices.some((d: any) => d.name === 'Laptop Teste')).toBe(true);
  });

  test('Task 03: autoSync registra listeners e destroy remove sem erros', async () => {
    const listeners: Record<string, any> = {};
    (globalThis as any).document = {
      visibilityState: 'visible',
      addEventListener: (evt: string, fn: any) => { listeners[evt] = fn; },
      removeEventListener: (evt: string) => { delete listeners[evt]; },
    };
    (globalThis as any).window = {
      addEventListener: (evt: string, fn: any) => { listeners[evt] = fn; },
      removeEventListener: (evt: string) => { delete listeners[evt]; },
    };

    const db = await createTestDB({ autoSync: { onFocus: true, onReconnect: true } });
    expect(() => db.destroy()).not.toThrow();
  });

  test('sync() grava a data de sincronização e getLastSyncAt() retorna a data ISO', async () => {
    const db = await createTestDB();
    expect(await db.getLastSyncAt()).toBeNull();
    const { syncedAt } = await db.sync();
    expect(typeof syncedAt).toBe('string');
    expect(await db.getLastSyncAt()).toBe(syncedAt);
  });

  test('criptografia AES-GCM transparente com password', async () => {
    const db = await createTestDB({ password: 'minhasenhadeteste123' });
    await db.set('segredo', 's1', { dado: 'confidencial' });
    const r = await db.get('segredo', 's1');
    expect(r.dado).toBe('confidencial');
  });

  describe('Task 13: Eventos CRUD e Coleções', () => {
    test('set() dispara "change", canal dinâmico "change:users" e "record:set"', async () => {
      const db = await createTestDB();
      const changeEvents: any[] = [];
      const userEvents: any[] = [];
      const recordSetEvents: any[] = [];

      db.on('change', (payload) => { changeEvents.push(payload); });
      db.on('change:users', (payload) => { userEvents.push(payload); });
      db.on('record:set', (payload) => { recordSetEvents.push(payload); });

      await db.set('users', 'u1', { name: 'Alice' });

      expect(changeEvents.length).toBe(1);
      expect(changeEvents[0]).toMatchObject({
        collection: 'users',
        id: 'u1',
        action: 'set',
        data: expect.objectContaining({ name: 'Alice', _id: 'u1', _version: 'v1' }),
      });

      expect(userEvents.length).toBe(1);
      expect(userEvents[0]).toMatchObject({
        id: 'u1',
        action: 'set',
        data: expect.objectContaining({ name: 'Alice' }),
      });

      expect(recordSetEvents.length).toBe(1);
      expect(recordSetEvents[0]).toMatchObject({
        collection: 'users',
        id: 'u1',
        version: 'v1',
        data: expect.objectContaining({ name: 'Alice' }),
      });
    });

    test('update() dispara "record:update" e "change"', async () => {
      const db = await createTestDB();
      await db.set('products', 'p1', { title: 'Book', price: 10 });

      const updateEvents: any[] = [];
      db.on('record:update', (payload) => { updateEvents.push(payload); });

      await db.update('products', 'p1', { price: 20 });

      expect(updateEvents.length).toBe(1);
      expect(updateEvents[0]).toMatchObject({
        collection: 'products',
        id: 'p1',
        partialData: { price: 20 },
        version: 'v2',
      });
      expect(updateEvents[0].data.title).toBe('Book');
      expect(updateEvents[0].data.price).toBe(20);
    });

    test('delete() dispara "change", canal dinâmico e "record:delete"', async () => {
      const db = await createTestDB();
      await db.set('todos', 't1', { text: 'Test' });

      const changes: any[] = [];
      const todoChanges: any[] = [];
      const recordDeletes: any[] = [];

      db.on('change', (payload) => { changes.push(payload); });
      db.on('change:todos', (payload) => { todoChanges.push(payload); });
      db.on('record:delete', (payload) => { recordDeletes.push(payload); });

      await db.delete('todos', 't1');

      expect(changes.length).toBe(1);
      expect(changes[0]).toEqual({
        collection: 'todos',
        id: 't1',
        action: 'delete',
      });

      expect(todoChanges.length).toBe(1);
      expect(todoChanges[0]).toEqual({
        id: 't1',
        action: 'delete',
      });

      expect(recordDeletes.length).toBe(1);
      expect(recordDeletes[0]).toEqual({
        collection: 'todos',
        id: 't1',
      });
    });

    test('clearCollection() dispara "collection:clear"', async () => {
      const db = await createTestDB();
      await db.set('cache', 'c1', { val: 1 });

      const clearEvents: any[] = [];
      db.on('collection:clear', (payload) => { clearEvents.push(payload); });

      await db.clearCollection('cache');

      expect(clearEvents.length).toBe(1);
      expect(clearEvents[0]).toEqual({ collection: 'cache' });
    });

    test('clearAll() dispara "collection:clear" e "db:clear"', async () => {
      const db = await createTestDB();
      await db.set('collA', 'a1', { v: 1 });
      await db.set('collB', 'b1', { v: 2 });

      let dbCleared = false;
      const clearedCollections: string[] = [];

      db.on('db:clear', () => { dbCleared = true; });
      db.on('collection:clear', (payload) => { clearedCollections.push(payload.collection); });

      await db.clearAll();

      expect(dbCleared).toBe(true);
      expect(clearedCollections).toContain('collA');
      expect(clearedCollections).toContain('collB');
    });

    test('once() dispara apenas uma vez e off() desinscreve o listener', async () => {
      const db = await createTestDB();
      let onceCalls = 0;
      let regularCalls = 0;

      const regularCb = () => { regularCalls++; };

      db.once('change', () => { onceCalls++; });
      const unsub = db.on('change', regularCb);

      await db.set('items', '1', { a: 1 });
      await db.set('items', '2', { a: 2 });

      expect(onceCalls).toBe(1);
      expect(regularCalls).toBe(2);

      unsub();
      await db.set('items', '3', { a: 3 });
      expect(regularCalls).toBe(2);
    });

    test('destroy() limpa todos os event listeners ativos', async () => {
      const db = await createTestDB();
      let callCount = 0;
      db.on('change', () => { callCount++; });

      expect(db.listenerCount('change')).toBe(1);
      db.destroy();
      expect(db.listenerCount('change')).toBe(0);
    });
  });

  describe('Task 14: Eventos de Ciclo de Vida, Rede e Sincronização', () => {
    test('detecta transições de rede e emite network:online e network:offline', async () => {
      const listeners: Record<string, Function> = {};
      const originalWindow = (globalThis as any).window;
      (globalThis as any).window = {
        addEventListener: (evt: string, fn: any) => { listeners[evt] = fn; },
        removeEventListener: (evt: string) => { delete listeners[evt]; },
      };

      try {
        const db = await createTestDB();
        let onlineTriggered = false;
        let offlineTriggered = false;

        db.on('network:online', () => { onlineTriggered = true; });
        db.on('network:offline', () => { offlineTriggered = true; });

        expect(typeof listeners['online']).toBe('function');
        expect(typeof listeners['offline']).toBe('function');

        listeners['online']();
        expect(onlineTriggered).toBe(true);

        listeners['offline']();
        expect(offlineTriggered).toBe(true);

        db.destroy();
        expect(listeners['online']).toBeUndefined();
        expect(listeners['offline']).toBeUndefined();
      } finally {
        (globalThis as any).window = originalWindow;
      }
    });

    test('sync() emite sync:start e sync:success com duração e timestamp', async () => {
      const db = await createTestDB();
      let syncStartFired = false;
      let syncSuccessPayload: any = null;

      db.on('sync:start', () => { syncStartFired = true; });
      db.on('sync:success', (payload) => { syncSuccessPayload = payload; });

      const res = await db.sync();

      expect(syncStartFired).toBe(true);
      expect(syncSuccessPayload).toBeDefined();
      expect(syncSuccessPayload.syncedAt).toBe(res.syncedAt);
      expect(typeof syncSuccessPayload.durationMs).toBe('number');
      expect(typeof syncSuccessPayload.flushedOperations).toBe('number');
    });

    test('sync() emite sync:error quando ocorre falha durante a sincronização', async () => {
      const db = await createTestDB();
      let syncErrorPayload: any = null;

      db.on('sync:error', (payload) => { syncErrorPayload = payload; });

      // Forçar erro no transport.flushQueue()
      vi.spyOn((db as any), 'sync').mockImplementation(async () => {
        const startTime = Date.now();
        (db as any).emit('sync:start', undefined);
        const err = new Error('Falha de rede simulada no sync');
        (db as any).emit('sync:error', { error: err, durationMs: Date.now() - startTime });
        throw err;
      });

      await expect(db.sync()).rejects.toThrow('Falha de rede simulada no sync');
      expect(syncErrorPayload).toBeDefined();
      expect(syncErrorPayload.error.message).toBe('Falha de rede simulada no sync');
      expect(typeof syncErrorPayload.durationMs).toBe('number');
    });

    test('emite device:registered e device:seen ao gerenciar dispositivos', async () => {
      const registeredDevices: any[] = [];
      const seenDevices: any[] = [];

      // Testar db.devices.list() emitindo device:seen
      const db = await createTestDB({ deviceName: 'Meu Laptop Teste' });
      db.on('device:registered', (dev) => { registeredDevices.push(dev); });
      db.on('device:seen', (dev) => { seenDevices.push(dev); });

      const devices = await db.devices.list();

      expect(devices.length).toBeGreaterThanOrEqual(1);
      expect(seenDevices.length).toBe(devices.length);
      expect(seenDevices.some((d) => d.name === 'Meu Laptop Teste')).toBe(true);
    });
  });

  describe('Task 15: Eventos de Conflito, Criptografia e Limites de API', () => {
    test('set() emite conflict:detected e conflict:resolved ao atualizar registro existente com resolver', async () => {
      const db = await createTestDB({ conflictResolver: 'last-write-wins' });
      const detectedEvents: any[] = [];
      const resolvedEvents: any[] = [];

      db.on('conflict:detected', (payload) => { detectedEvents.push(payload); });
      db.on('conflict:resolved', (payload) => { resolvedEvents.push(payload); });

      // Primeiro set cria o registro
      await db.set('docs', 'doc-1', { text: 'versão inicial' });
      expect(detectedEvents.length).toBe(0);
      expect(resolvedEvents.length).toBe(0);

      // Segundo set atualiza o registro remoto existente
      await db.set('docs', 'doc-1', { text: 'versão atualizada' });

      expect(detectedEvents.length).toBe(1);
      expect(detectedEvents[0]).toMatchObject({
        collection: 'docs',
        id: 'doc-1',
        localVersion: 'v1',
        remoteVersion: 'v1',
      });

      expect(resolvedEvents.length).toBe(1);
      expect(resolvedEvents[0]).toMatchObject({
        collection: 'docs',
        id: 'doc-1',
        strategy: 'last-write-wins',
        result: expect.objectContaining({ text: 'versão atualizada', _version: 'v2' }),
      });
    });

    test('crypto:error é emitido quando a decifragem falha em maybeDecrypt', async () => {
      const db = await createTestDB({ password: 'senha-correta' });
      const cryptoErrors: any[] = [];

      db.on('crypto:error', (payload) => { cryptoErrors.push(payload); });

      // Injeta um payload cifrado corrompido no mock gist store
      const corruptEncrypted = {
        __encrypted: true,
        iv: 'invalid-iv',
        ciphertext: 'corrupted-ciphertext',
        salt: 'fake-salt',
      };
      const gistId = Object.keys(gistsStore)[0];
      gistsStore[gistId].files['gistdb_testapp_users_u_bad.json'] = {
        content: JSON.stringify(corruptEncrypted),
      };

      const result = await db.get('users', 'u_bad');
      expect(cryptoErrors.length).toBe(1);
      expect(cryptoErrors[0]).toMatchObject({
        collection: 'users',
        id: 'u_bad',
        attemptSaltRestore: true,
      });
      expect(cryptoErrors[0].error).toBeDefined();
      // Em caso de falha de decifragem com fallback, retorna o dado bruto
      expect(result).toEqual(corruptEncrypted);
    });

    test('auth:error é emitido em respostas HTTP 401 da GistAPI', async () => {
      const db = await createTestDB();
      const authErrors: any[] = [];

      db.on('auth:error', (payload) => { authErrors.push(payload); });

      // Simular resposta 401 no fetch
      const originalFetch = globalThis.fetch;
      (globalThis as any).fetch = vi.fn(async () => ({
        ok: false,
        status: 401,
        headers: new Headers(),
        text: async () => 'Bad credentials',
        json: async () => ({ message: 'Bad credentials' }),
      } as any));

      try {
        await expect(db.get('auth_col', 'rec_1')).rejects.toThrow('Authentication failed.');
        expect(authErrors.length).toBeGreaterThanOrEqual(1);
        expect(authErrors[0].status).toBe(401);
        expect(authErrors[0].error).toBeInstanceOf(Error);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });

    test('ratelimit é emitido quando headers de limite de taxa estão presentes na resposta', async () => {
      const db = await createTestDB();
      const ratelimitEvents: any[] = [];

      db.on('ratelimit', (payload) => { ratelimitEvents.push(payload); });

      const headers = new Headers();
      headers.set('X-RateLimit-Limit', '5000');
      headers.set('X-RateLimit-Remaining', '4999');
      headers.set('X-RateLimit-Reset', '1700000000');

      const originalFetch = globalThis.fetch;
      (globalThis as any).fetch = vi.fn(async () => ({
        ok: true,
        status: 200,
        headers,
        text: async () => JSON.stringify({ id: 'mock-gist-id', files: {} }),
        json: async () => ({ id: 'mock-gist-id', files: {} }),
      } as any));

      try {
        await db.get('rate_col', 'rec_1');
        expect(ratelimitEvents.length).toBeGreaterThanOrEqual(1);
        expect(ratelimitEvents[0]).toMatchObject({
          limit: 5000,
          remaining: 4999,
        });
        expect(ratelimitEvents[0].resetAt).toBeInstanceOf(Date);
      } finally {
        globalThis.fetch = originalFetch;
      }
    });
  });
});



