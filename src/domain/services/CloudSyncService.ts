import { GistDB } from '../../lib/gistdb/src/index';
import type { Label } from '../models/Label';
import type { UserPreferences } from '../models/UserPreferences';
import eventBus from '../../core/EventBus';
import { logger } from '../../core/Logger';

export type SyncStatus = 'idle' | 'syncing' | 'error' | 'offline' | 'unconfigured';

export class CloudSyncService {
  #db: GistDB | null = null;
  #status: SyncStatus = 'unconfigured';

  /**
   * Re(inicializa) a instância GistDB com novas credenciais.
   * Destrói a instância anterior antes de criar uma nova.
   */
  public async configure(token: string, gistId?: string): Promise<void> {
    this.#db?.destroy();
    this.#db = null;

    if (!token) {
      this.#setStatus('unconfigured');
      return;
    }

    this.#setStatus('syncing');

    try {
      this.#db = await GistDB.create({
        token,
        prefix: 'label-editor',
        gistId: gistId ?? null,
        ttl: 5 * 60 * 1000,
        conflictResolver: 'last-write-wins',
        autoSync: { onFocus: true, onReconnect: true, onUnload: false },
        deviceName: typeof navigator !== 'undefined' ? navigator.platform : 'Web Client',
      });

      // Escuta eventos de rede do GistDB e repassa para o EventBus
      this.#db.on('network:offline', () => this.#setStatus('offline'));
      this.#db.on('network:online', () => this.#setStatus('idle'));
      this.#db.on('sync:error', () => this.#setStatus('error'));
      this.#db.on('sync:success', () => this.#setStatus('idle'));

      const configuredGistId = this.#db.gistId;
      if (configuredGistId) {
        eventBus.emit('cloud:configured', { gistId: configuredGistId });
      }

      this.#setStatus('idle');
      logger.info('CloudSyncService', `GistDB configured. GistId: ${configuredGistId ?? 'unknown'}`);
    } catch (err) {
      this.#setStatus('error');
      logger.error('CloudSyncService', 'Configuration failed:', err);
      throw err;
    }
  }

  /**
   * Retorna true se a instância estiver instanciada e pronta para operações.
   */
  public get isReady(): boolean {
    return this.#db !== null && (this.#status === 'idle' || this.#status === 'syncing' || this.#status === 'offline');
  }

  /**
   * Retorna o ID do Gist associado.
   */
  public get gistId(): string | null {
    return this.#db?.gistId ?? null;
  }

  /**
   * Retorna o estado atual da sincronização.
   */
  public get status(): SyncStatus {
    return this.#status;
  }

  // ─── TEMPLATES ─────────────────────────────────────────────────────────────

  public async pushTemplate(label: Label): Promise<void> {
    if (!this.#db) return;
    try {
      eventBus.emit('cloud:sync:start', { collection: 'templates' });
      await this.#db.set('templates', label.id, label);
      eventBus.emit('cloud:sync:done', { collection: 'templates', count: 1 });
      logger.debug('CloudSyncService', `Template pushed to cloud: ${label.name} (${label.id})`);
    } catch (err) {
      eventBus.emit('cloud:sync:error', { collection: 'templates', error: err });
      logger.warn('CloudSyncService', `Failed to push template ${label.id}:`, err);
      throw err;
    }
  }

  public async pullTemplates(): Promise<Label[]> {
    if (!this.#db) return [];
    try {
      eventBus.emit('cloud:sync:start', { collection: 'templates' });
      const items = await this.#db.list('templates');
      eventBus.emit('cloud:sync:done', { collection: 'templates', count: items.length });
      return items as Label[];
    } catch (err) {
      eventBus.emit('cloud:sync:error', { collection: 'templates', error: err });
      logger.warn('CloudSyncService', 'Failed to pull templates:', err);
      throw err;
    }
  }

  public async deleteTemplate(id: string): Promise<void> {
    if (!this.#db) return;
    try {
      eventBus.emit('cloud:sync:start', { collection: 'templates' });
      await this.#db.delete('templates', id);
      eventBus.emit('cloud:sync:done', { collection: 'templates', count: 1 });
      logger.debug('CloudSyncService', `Template deleted from cloud: ${id}`);
    } catch (err) {
      eventBus.emit('cloud:sync:error', { collection: 'templates', error: err });
      logger.warn('CloudSyncService', `Failed to delete template ${id} from cloud:`, err);
      throw err;
    }
  }

  // ─── PREFERÊNCIAS ──────────────────────────────────────────────────────────

  public async pushPreferences(prefs: Record<string, unknown>): Promise<void> {
    if (!this.#db) return;
    try {
      eventBus.emit('cloud:sync:start', { collection: 'preferences' });
      await this.#db.set('preferences', 'global', prefs);
      eventBus.emit('cloud:sync:done', { collection: 'preferences', count: 1 });
      logger.debug('CloudSyncService', 'Preferences pushed to cloud');
    } catch (err) {
      eventBus.emit('cloud:sync:error', { collection: 'preferences', error: err });
      logger.warn('CloudSyncService', 'Failed to push preferences to cloud:', err);
      throw err;
    }
  }

  public async pullPreferences(): Promise<Partial<UserPreferences> | null> {
    if (!this.#db) return null;
    try {
      eventBus.emit('cloud:sync:start', { collection: 'preferences' });
      const prefs = await this.#db.get('preferences', 'global');
      eventBus.emit('cloud:sync:done', { collection: 'preferences', count: prefs ? 1 : 0 });
      return prefs as Partial<UserPreferences> | null;
    } catch (err) {
      eventBus.emit('cloud:sync:error', { collection: 'preferences', error: err });
      logger.warn('CloudSyncService', 'Failed to pull preferences from cloud:', err);
      throw err;
    }
  }

  // ─── SESSÃO ────────────────────────────────────────────────────────────────

  public async pushSession(label: Omit<Label, 'thumbnail'>): Promise<void> {
    if (!this.#db) return;
    try {
      eventBus.emit('cloud:sync:start', { collection: 'session' });
      await this.#db.set('session', 'current', label);
      eventBus.emit('cloud:sync:done', { collection: 'session', count: 1 });
      logger.debug('CloudSyncService', 'Session state pushed to cloud');
    } catch (err) {
      eventBus.emit('cloud:sync:error', { collection: 'session', error: err });
      logger.warn('CloudSyncService', 'Failed to push session to cloud:', err);
      throw err;
    }
  }

  public async pullSession(): Promise<Omit<Label, 'thumbnail'> | null> {
    if (!this.#db) return null;
    try {
      eventBus.emit('cloud:sync:start', { collection: 'session' });
      const session = await this.#db.get('session', 'current');
      eventBus.emit('cloud:sync:done', { collection: 'session', count: session ? 1 : 0 });
      return session as Omit<Label, 'thumbnail'> | null;
    } catch (err) {
      eventBus.emit('cloud:sync:error', { collection: 'session', error: err });
      logger.warn('CloudSyncService', 'Failed to pull session from cloud:', err);
      throw err;
    }
  }

  // ─── CLEANUP ───────────────────────────────────────────────────────────────

  public destroy(): void {
    this.#db?.destroy();
    this.#db = null;
    this.#setStatus('unconfigured');
  }

  #setStatus(status: SyncStatus): void {
    this.#status = status;
    eventBus.emit('cloud:status:change', { status });
  }
}

export const cloudSyncService = new CloudSyncService();
