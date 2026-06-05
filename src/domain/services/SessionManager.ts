import { db } from '../../core/Database';
import { Label } from '../models/Label';
import eventBus from '../../core/EventBus';
import { logger } from '../../core/Logger';

/**
 * SessionManager: Gerencia a persistência automática (Auto-save) da sessão ativa.
 * Garante que o trabalho seja restaurado após um crash ou F5 involuntário.
 */
class SessionManager {
  private readonly STORE_NAME = 'sessions';
  private readonly SESSION_KEY = 'current_session';
  private autoSaveTimer: any = null;

  constructor() {
    this.setupListeners();
  }

  private setupListeners(): void {
    // Escuta mudanças de estado para disparar o auto-save
    eventBus.on('state:change', (state) => {
      if (state.currentLabel) {
        this.scheduleAutoSave(state.currentLabel);
      }
    });
  }

  /**
   * Agenda um salvamento automático com debounce para não impactar performance.
   */
  private scheduleAutoSave(label: Label): void {
    if (this.autoSaveTimer) {
      clearTimeout(this.autoSaveTimer);
    }

    this.autoSaveTimer = setTimeout(async () => {
      await this.saveSession(label);
      this.autoSaveTimer = null;
    }, 1000); // 1 segundo de debounce
  }

  /**
   * Salva o estado atual da etiqueta no store de sessões.
   */
  private async saveSession(label: Label): Promise<void> {
    try {
      const sessionData = {
        id: this.SESSION_KEY,
        label: JSON.parse(JSON.stringify(label)),
        timestamp: Date.now()
      };
      await db.put(this.STORE_NAME, sessionData);
      logger.debug('SessionManager', 'Auto-save completed');
    } catch (err) {
      logger.error('SessionManager', 'Failed to auto-save session:', err);
    }
  }

  /**
   * Recupera a última sessão salva, se existir.
   */
  async getSavedSession(): Promise<Label | null> {
    try {
      const data = await db.get<any>(this.STORE_NAME, this.SESSION_KEY);
      if (data && data.label) {
        return data.label as Label;
      }
    } catch (err) {
      logger.error('SessionManager', 'Failed to retrieve saved session:', err);
    }
    return null;
  }

  /**
   * Limpa a sessão ativa (usado ao iniciar um projeto do zero).
   */
  async clearSession(): Promise<void> {
    try {
      await db.delete(this.STORE_NAME, this.SESSION_KEY);
    } catch (err) {
      logger.error('SessionManager', 'Failed to clear session:', err);
    }
  }
}

export const sessionManager = new SessionManager();
