import { db } from '../../core/Database';
import { UserPreferences, DEFAULT_PREFERENCES } from '../models/UserPreferences';
import eventBus from '../../core/EventBus';
import { cloudSyncService } from './CloudSyncService';
import { logger } from '../../core/Logger';

class PreferenceManager {
  private readonly STORE_NAME = 'preferences';
  private readonly PREF_ID = 'global';

  /**
   * Carrega as preferências do storage ou retorna as padrões.
   */
  async getPreferences(): Promise<UserPreferences> {
    try {
      const prefs = await db.get<any>(this.STORE_NAME, this.PREF_ID);
      if (prefs) {
        // Remove o ID interno para retornar apenas o objeto de preferências
        const { id, ...data } = prefs;
        return { ...DEFAULT_PREFERENCES, ...data };
      }
    } catch (e) {
      console.warn('Falha ao carregar preferências, usando padrões.', e);
    }
    return DEFAULT_PREFERENCES;
  }

  /**
   * Salva as preferências no storage.
   */
  async savePreferences(prefs: Partial<UserPreferences>): Promise<void> {
    const current = await this.getPreferences();
    const updated = { ...current, ...prefs };
    
    await db.put(this.STORE_NAME, {
      id: this.PREF_ID,
      ...updated
    });

    // Cloud Sync: remove gistToken antes de sincronizar (credencial nunca sai do dispositivo)
    if (cloudSyncService.isReady) {
      const { gistToken: _ignored, ...prefsToSync } = updated;
      cloudSyncService.pushPreferences(prefsToSync).catch((err) => {
        logger.warn('PreferenceManager', 'Cloud push failed for preferences:', err);
      });
    }

    eventBus.emit('preferences:change', updated);
  }

  /**
   * Faz pull das preferências da nuvem e mescla com as locais,
   * preservando as credenciais locais (gistToken e gistId).
   */
  async syncFromCloud(): Promise<void> {
    if (!cloudSyncService.isReady) return;

    try {
      const remotePrefs = await cloudSyncService.pullPreferences();
      if (!remotePrefs || Object.keys(remotePrefs).length === 0) return;

      const current = await this.getPreferences();
      // Mescla remotas sobre locais, mas preserva credenciais locais
      const merged: UserPreferences = {
        ...current,
        ...remotePrefs,
        gistToken: current.gistToken,
        gistId: current.gistId || (remotePrefs as any).gistId || '',
        cloudSync: current.cloudSync,
      };

      await db.put(this.STORE_NAME, {
        id: this.PREF_ID,
        ...merged
      });

      // Atualiza a store em memória sem re-disparar savePreferences/push
      const { store } = await import('../../core/Store');
      store.loadPreferences(merged);

      eventBus.emit('preferences:change', merged);
      logger.info('PreferenceManager', 'Preferences successfully synced from cloud');
    } catch (err) {
      logger.warn('PreferenceManager', 'Failed to sync preferences from cloud:', err);
    }
  }
}

export const preferenceManager = new PreferenceManager();
