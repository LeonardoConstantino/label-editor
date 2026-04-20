import { db } from '../../core/Database';
import { UserPreferences, DEFAULT_PREFERENCES } from '../models/UserPreferences';
import eventBus from '../../core/EventBus';

export class PreferenceManager {
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
    
    eventBus.emit('preferences:change', updated);
  }
}

export const preferenceManager = new PreferenceManager();
