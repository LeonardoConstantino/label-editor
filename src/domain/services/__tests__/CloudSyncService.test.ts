import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { CloudSyncService } from '../CloudSyncService';
import { GistDB } from '../../../lib/gistdb/src/index';
import eventBus from '../../../core/EventBus';
import type { Label } from '../../models/Label';

vi.mock('../../../lib/gistdb/src/index', () => {
  return {
    GistDB: {
      create: vi.fn(),
    },
  };
});

describe('CloudSyncService', () => {
  let service: CloudSyncService;
  let mockGistDBInstance: any;

  const mockLabel: Label = {
    id: 'test-label-1',
    name: 'Sample Label',
    config: {
      widthMM: 50,
      heightMM: 30,
      dpi: 300,
      previewScale: 1,
      backgroundColor: '#ffffff',
    },
    elements: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    service = new CloudSyncService();

    mockGistDBInstance = {
      gistId: 'gist-12345',
      destroy: vi.fn(),
      on: vi.fn(),
      set: vi.fn().mockResolvedValue({ id: 'test', version: 'v1', updatedAt: new Date().toISOString() }),
      get: vi.fn().mockResolvedValue(null),
      list: vi.fn().mockResolvedValue([]),
      delete: vi.fn().mockResolvedValue(true),
    };

    (GistDB.create as any).mockResolvedValue(mockGistDBInstance);
  });

  afterEach(() => {
    service.destroy();
  });

  it('deve iniciar com status unconfigured e isReady como false', () => {
    expect(service.status).toBe('unconfigured');
    expect(service.isReady).toBe(false);
    expect(service.gistId).toBeNull();
  });

  it('deve configurar status como unconfigured se token for vazio', async () => {
    const statusSpy = vi.fn();
    eventBus.on('cloud:status:change', statusSpy);

    await service.configure('');

    expect(service.status).toBe('unconfigured');
    expect(service.isReady).toBe(false);
    expect(statusSpy).toHaveBeenCalledWith({ status: 'unconfigured' });
  });

  it('deve inicializar GistDB com sucesso e emitir cloud:configured', async () => {
    const statusSpy = vi.fn();
    const configSpy = vi.fn();

    eventBus.on('cloud:status:change', statusSpy);
    eventBus.on('cloud:configured', configSpy);

    await service.configure('ghp_valid_token', 'gist-existing');

    expect(GistDB.create).toHaveBeenCalledWith(
      expect.objectContaining({
        token: 'ghp_valid_token',
        prefix: 'label-editor',
        gistId: 'gist-existing',
      })
    );

    expect(service.status).toBe('idle');
    expect(service.isReady).toBe(true);
    expect(service.gistId).toBe('gist-12345');
    expect(configSpy).toHaveBeenCalledWith({ gistId: 'gist-12345' });
  });

  it('deve tratar erro na configuração e emitir status error', async () => {
    (GistDB.create as any).mockRejectedValueOnce(new Error('Invalid token'));

    const statusSpy = vi.fn();
    eventBus.on('cloud:status:change', statusSpy);

    await expect(service.configure('invalid_token')).rejects.toThrow('Invalid token');

    expect(service.status).toBe('error');
    expect(service.isReady).toBe(false);
    expect(statusSpy).toHaveBeenCalledWith({ status: 'error' });
  });

  it('deve realizar pushTemplate e emitir eventos de sync', async () => {
    await service.configure('valid_token');

    const startSpy = vi.fn();
    const doneSpy = vi.fn();
    eventBus.on('cloud:sync:start', startSpy);
    eventBus.on('cloud:sync:done', doneSpy);

    await service.pushTemplate(mockLabel);

    expect(mockGistDBInstance.set).toHaveBeenCalledWith('templates', mockLabel.id, mockLabel);
    expect(startSpy).toHaveBeenCalledWith({ collection: 'templates' });
    expect(doneSpy).toHaveBeenCalledWith({ collection: 'templates', count: 1 });
  });

  it('deve realizar pullTemplates com sucesso', async () => {
    mockGistDBInstance.list.mockResolvedValueOnce([mockLabel]);
    await service.configure('valid_token');

    const templates = await service.pullTemplates();

    expect(mockGistDBInstance.list).toHaveBeenCalledWith('templates');
    expect(templates).toEqual([mockLabel]);
  });

  it('deve deletar template da nuvem', async () => {
    await service.configure('valid_token');

    await service.deleteTemplate(mockLabel.id);

    expect(mockGistDBInstance.delete).toHaveBeenCalledWith('templates', mockLabel.id);
  });

  it('deve realizar push e pull de preferências', async () => {
    const mockPrefs = { theme: 'dark' as const, audioEnabled: true };
    mockGistDBInstance.get.mockResolvedValueOnce(mockPrefs);

    await service.configure('valid_token');

    await service.pushPreferences(mockPrefs);
    expect(mockGistDBInstance.set).toHaveBeenCalledWith('preferences', 'global', mockPrefs);

    const pulled = await service.pullPreferences();
    expect(mockGistDBInstance.get).toHaveBeenCalledWith('preferences', 'global');
    expect(pulled).toEqual(mockPrefs);
  });

  it('deve realizar push e pull de sessão', async () => {
    const sessionData = { ...mockLabel };
    delete (sessionData as any).thumbnail;
    mockGistDBInstance.get.mockResolvedValueOnce(sessionData);

    await service.configure('valid_token');

    await service.pushSession(sessionData);
    expect(mockGistDBInstance.set).toHaveBeenCalledWith('session', 'current', sessionData);

    const pulled = await service.pullSession();
    expect(mockGistDBInstance.get).toHaveBeenCalledWith('session', 'current');
    expect(pulled).toEqual(sessionData);
  });

  it('deve chamar destroy no GistDB e resetar o serviço', async () => {
    await service.configure('valid_token');
    expect(service.isReady).toBe(true);

    service.destroy();

    expect(mockGistDBInstance.destroy).toHaveBeenCalled();
    expect(service.isReady).toBe(false);
    expect(service.status).toBe('unconfigured');
  });
});
