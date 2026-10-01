import { describe, test, expect, beforeAll, beforeEach } from 'vitest';
import { GistTransport } from '../src/GistTransport.js';
import { TypedEventEmitter } from '../src/EventEmitter.js';

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
});

// Mock de API simplificada que simula a GistAPI sem fazer chamadas reais de rede
function makeMockApi(initialFiles: Record<string, any> = {}) {
  const _files: Record<string, any> = { ...initialFiles };
  const calls = {
    updateGist: [] as any[],
    deleteFile: [] as any[],
    getGist: [] as any[],
  };
  let _failNext = 0;
  let _onFail: (() => void) | null = null;

  return {
    calls,
    get failNext() { return _failNext; },
    set failNext(n: number) { _failNext = n; },
    get onFail() { return _onFail; },
    set onFail(fn: (() => void) | null) { _onFail = fn; },
    async getGist(id: string) {
      calls.getGist.push([id]);
      const files: Record<string, any> = {};
      Object.entries(_files).forEach(([k, v]) => {
        files[k] = { content: typeof v === 'string' ? v : JSON.stringify(v) };
      });
      return { id, files };
    },
    async updateGist(id: string, files: Record<string, any>) {
      if (_failNext > 0) {
        _failNext--;
        if (_onFail) _onFail();
        throw new Error('network error');
      }
      Object.entries(files).forEach(([k, v]) => {
        if (v === null) delete _files[k];
        else _files[k] = v.content;
      });
      calls.updateGist.push([id, files]);
    },
    async deleteFile(id: string, filename: string) {
      delete _files[filename];
      calls.deleteFile.push([id, filename]);
    },
    async listGists() {
      return [{ id: 'gist-123', description: 'gistdb:app' }];
    },
    async createGist() {
      return 'gist-123';
    },
  };
}

describe('GistTransport', () => {
  test('putFile() chama updateGist com filename e content', async () => {
    const api = makeMockApi();
    const transport = new GistTransport(api, { retries: 2, timeout: 5000 });
    transport.setGistId('gist-123');
    await transport.putFile('gistdb_app_todos_1.json', { titulo: 'x' });
    expect(api.calls.updateGist.length).toBe(1);
    const [, files] = api.calls.updateGist[0];
    expect(Object.prototype.hasOwnProperty.call(files, 'gistdb_app_todos_1.json')).toBe(true);
  });

  test('getFile() retorna null para arquivo inexistente', async () => {
    const api = makeMockApi({});
    const transport = new GistTransport(api, { retries: 2, timeout: 5000 });
    transport.setGistId('gist-123');
    const r = await transport.getFile('nao-existe.json');
    expect(r).toBeNull();
  });

  test('getFile() parseia JSON corretamente', async () => {
    const data = { _id: '1', titulo: 'olá' };
    const api = makeMockApi({ 'f.json': JSON.stringify(data) });
    const transport = new GistTransport(api, { retries: 2, timeout: 5000 });
    transport.setGistId('gist-123');
    const r = await transport.getFile('f.json');
    expect(r.titulo).toBe('olá');
  });

  test('deleteFile() chama deleteFile na API', async () => {
    const api = makeMockApi();
    const transport = new GistTransport(api, { retries: 2, timeout: 5000 });
    transport.setGistId('gist-123');
    await transport.deleteFile('arquivo.json');
    expect(api.calls.deleteFile.length).toBe(1);
  });

  test('listFiles() filtra por collection corretamente', async () => {
    const files = {
      'gistdb_app_todos_1.json': JSON.stringify({ _id: '1' }),
      'gistdb_app_todos_2.json': JSON.stringify({ _id: '2' }),
      'gistdb_app_users_1.json': JSON.stringify({ _id: 'u1' }),
    };
    const api = makeMockApi(files);
    const transport = new GistTransport(api, { retries: 2, timeout: 5000 });
    transport.setGistId('gist-123');
    const todos = await transport.listFiles('todos');
    expect(todos.length).toBe(2);
  });

  test('retry: tenta novamente após falha de rede', async () => {
    let tentativas = 0;
    const api = makeMockApi();
    api.failNext = 1;
    api.onFail = () => tentativas++;
    const transport = new GistTransport(api, { retries: 2, timeout: 5000 });
    transport.setGistId('gist-123');
    await transport.putFile('f.json', { x: 1 });
    expect(tentativas).toBe(1);
    expect(api.calls.updateGist.length).toBe(1);
  });

  test('initGist(true): reaproveita gist existente se encontrado (autoConnect)', async () => {
    const api = makeMockApi();
    const transport = new GistTransport(api, { retries: 2, timeout: 5000 });
    const id = await transport.initGist(true);
    expect(id).toBe('gist-123');
  });

  test('initGist(false): ignora gists existentes e cria um novo', async () => {
    let criouGist = false;
    const api = makeMockApi();
    api.createGist = async () => {
      criouGist = true;
      return 'gist-novo-456';
    };
    const transport = new GistTransport(api, { retries: 2, timeout: 5000 });
    const id = await transport.initGist(false);
    expect(criouGist).toBe(true);
    expect(id).toBe('gist-novo-456');
  });

  test('timeout: repassa AbortSignal para as chamadas de API', async () => {
    let signalRecebido: AbortSignal | undefined;
    const api = makeMockApi();
    api.getGist = async (_id: string, signal?: AbortSignal) => {
      signalRecebido = signal;
      return { id: _id, files: {} };
    };

    const transport = new GistTransport(api, { retries: 0, timeout: 1000 });
    transport.setGistId('gist-123');
    await transport.getFile('test.json');

    expect(signalRecebido).toBeDefined();
    expect(signalRecebido instanceof AbortSignal).toBe(true);
  });

  test('timeout: cancela a requisição quando estoura o limite de tempo', async () => {
    let foiAbortado = false;
    const api = makeMockApi();
    api.getGist = async (_id: string, signal?: AbortSignal) => {
      return new Promise((_, reject) => {
        if (signal) {
          signal.addEventListener('abort', () => {
            foiAbortado = true;
            reject(new Error('aborted'));
          });
        }
      });
    };

    const transport = new GistTransport(api, { retries: 0, timeout: 50 });
    transport.setGistId('gist-123');

    await expect(transport.getFile('test.json')).rejects.toThrow();
    expect(foiAbortado).toBe(true);
  });

  describe('Task 14: Eventos de Fila Offline', () => {
    test('emite queue:enqueue ao salvar operações em modo offline', async () => {
      const api = makeMockApi();
      const emitter = new TypedEventEmitter();
      const enqueued: any[] = [];
      emitter.on('queue:enqueue', (payload) => { enqueued.push(payload); });

      const transport = new GistTransport(api, { emitter });
      transport.setGistId('gist-123');

      // Simular offline
      const originalNavigator = (globalThis as any).navigator;
      (globalThis as any).navigator = { onLine: false };

      try {
        await transport.putFile('offline_file.json', { a: 1 });
        expect(enqueued.length).toBe(1);
        expect(enqueued[0]).toMatchObject({
          type: 'PUT',
          filename: 'offline_file.json',
        });
        expect(typeof enqueued[0].enqueuedAt).toBe('number');
      } finally {
        (globalThis as any).navigator = originalNavigator;
      }
    });

    test('emite queue:flush:start, queue:flush:item e queue:flushed no flushQueue()', async () => {
      const api = makeMockApi();
      const emitter = new TypedEventEmitter();
      const events: string[] = [];
      const flushItems: any[] = [];
      let flushedCount = 0;

      emitter.on('queue:flush:start', () => { events.push('flush:start'); });
      emitter.on('queue:flush:item', (item) => {
        events.push('flush:item');
        flushItems.push(item);
      });
      emitter.on('queue:flushed', (payload) => {
        events.push('flushed');
        flushedCount = payload.processedCount;
      });

      const transport = new GistTransport(api, { emitter });
      transport.setGistId('gist-123');

      // Enfileirar offline
      const originalNavigator = (globalThis as any).navigator;
      (globalThis as any).navigator = { onLine: false };
      await transport.putFile('item1.json', { x: 1 });
      await transport.deleteFile('item2.json');

      // Voltar online e executar flush
      (globalThis as any).navigator = { onLine: true };
      try {
        const res = await transport.flushQueue();
        expect(res.flushed).toBe(2);
        expect(events).toEqual(['flush:start', 'flush:item', 'flush:item', 'flushed']);
        expect(flushItems).toEqual([
          { key: 'item1.json', action: 'PUT' },
          { key: 'item2.json', action: 'DELETE' },
        ]);
        expect(flushedCount).toBe(2);
      } finally {
        (globalThis as any).navigator = originalNavigator;
      }
    });
  });
});

