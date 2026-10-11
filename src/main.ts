import { AppState, store } from './core/Store';
import { ElementType } from './domain/models/elements/BaseElement';
import eventBus from './core/EventBus';
import { logger, LogLevelType } from './core/Logger';
import './styles/main.css';

import { templateManager } from './domain/services/TemplateManager';
import { cloudSyncService } from './domain/services/CloudSyncService';
import { ElementFactory } from './domain/models/elements/ElementFactory';
import { shortcutService } from './core/ShortcutService';
import { Label } from './domain/models/Label';
import { DEFAULTS } from './constants/defaults';
import { MelodyOptions, NotePreset, UISM } from './core/UISoundManager';
import { ToastManager, ToastOptions } from './components/common/toast';
import { getOSInfo } from './utils/os-detection';
import './components/editor/EditorCanvas';
import './components/editor/Toolbar';
import './components/editor/AppCockpit';
import './components/editor/modules/MicroImageEditor';
import './components/editor/StatusBar';
import './components/editor/VaultGallery';
import './components/editor/WelcomeScreen';
import './components/editor/HelpCenter';
import './components/preferences/PreferencesModal';
import './components/common/modal';
import './components/common/UiDataGateway';
import './components/preview/DataSourceInput';
import './components/common/UINumberScrubber';
import './components/common/tooltip';
import './components/common/ui-hud-tips';

import helpData from './assets/data/helpData';
import { InspectorHelpData } from './utils/HelpContentProvider';
import { createTimer } from './utils/utils';
import { StatusBar } from './components/editor/StatusBar';
import { FORMATTERS } from './domain/services/DataSourceParser';
import { UserPreferences } from './domain/models/UserPreferences';

const bootTime = createTimer(logger);
bootTime.init();

const forgeOSBoot: { notes: NotePreset[]; options: MelodyOptions } = {
  notes: [
    // 1. VAZIO CÓSMICO — O som emerge do silêncio
    {
      sound: {
        freq: [55, 82.41],
        duration: 0.82,
        type: 'sine',
        volume: 0.065,
        envelope: {
          attack: 0.16,
          decay: 0.20,
          sustain: 0.42,
          release: 0.30
        },
        noise: {
          amount: 0.006,
          type: 'brown',
          duration: 0.65
        },
        filter: {
          type: 'lowpass',
          frequency: 300,
          Q: 0.7
        }
      },
      beats: 0.18
    },

    // 2. DESPERTAR — O campo harmônico se expande
    {
      sound: {
        freq: [55, 82.41, 110, 123.47],
        duration: 0.86,
        type: 'sine',
        volume: 0.055,
        envelope: {
          attack: 0.17,
          decay: 0.22,
          sustain: 0.45,
          release: 0.32
        },
        noise: {
          amount: 0.005,
          type: 'brown',
          duration: 0.65
        },
        filter: {
          type: 'lowpass',
          frequency: 460,
          Q: 0.75
        }
      },
      beats: 0.18
    },

    // 3. TRANSCENDÊNCIA — O cluster ganha corpo e luminosidade
    {
      sound: {
        freq: [82.41, 110, 123.47, 146.83, 164.81],
        duration: 0.90,
        type: 'triangle',
        volume: 0.050,
        envelope: {
          attack: 0.18,
          decay: 0.23,
          sustain: 0.46,
          release: 0.35
        },
        noise: {
          amount: 0.004,
          type: 'brown',
          duration: 0.65
        },
        filter: {
          type: 'lowpass',
          frequency: 800,
          Q: 0.8
        }
      },
      beats: 0.18
    },

    // 4. MONÓLITO — Abertura sonora, sem um golpe de clímax
    {
      sound: {
        freq: [55, 82.41, 110, 164.81, 220, 329.63],
        duration: 0.92,
        type: 'sine',
        volume: 0.045,
        envelope: {
          attack: 0.20,
          decay: 0.25,
          sustain: 0.40,
          release: 0.42
        },
        noise: {
          amount: 0.003,
          type: 'brown',
          duration: 0.60
        },
        filter: {
          type: 'lowpass',
          frequency: 1400,
          Q: 0.7
        }
      },
      beats: 0.18
    }
  ],
  options: { bpm: 60, loop: false, onComplete: () => logger.info('Main', 'Forge OS boot melody completed.') },
};

const onModulesReady = (): void => {
  const splash = document.getElementById('app-splash');
  if (!splash) return;

  splash.classList.add('splash--out');

  splash.addEventListener(
    'transitionend',
    () => {
      splash.remove();
    },
    { once: true },
  );
};

// Global Notification Listener
eventBus.on('notify', (options: ToastOptions) => {
  ToastManager.show(options);
});

// Help Center Listener
eventBus.on('ui:open:help', (options: any = {}) => {
  localStorage.setItem('has_seen_guide', 'true');
  const modal = document.getElementById('help-center-modal');
  const helpCenter = modal?.querySelector('ui-help-center') as any;
  if (modal && helpCenter) {
    if (options.tab) helpCenter?.setTab(options.tab);
    modal.setAttribute('open', '');
    UISM.play(UISM.enumPresets.OPEN);
  }
});

// Inicializa a aplicação com uma etiqueta padrão
const defaultLabel: Label = {
  id: crypto.randomUUID(),
  name: 'Nova Etiqueta',
  config: { ...DEFAULTS.CANVAS },
  elements: [
    ElementFactory.create(ElementType.TEXT, {
      content: 'Minha Nova Etiqueta',
    }),
  ],
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

document.addEventListener('DOMContentLoaded', async () => {
  const { isMac } = getOSInfo();

  // 1. Detectar OVERRIDE de debug via URL (Task 88)
  const urlParams = new URLSearchParams(window.location.search);
  const debugOverride = urlParams.get('debug');
  if (debugOverride !== null) {
    const level = parseInt(debugOverride, 10);
    if (!isNaN(level)) {
      logger.setLevel(level as LogLevelType);
      logger.info('Main', `Debug level forced via URL: ${level}`);
    }
  }

  // 2. Carrega preferências do usuário imediatamente
  const { preferenceManager } =
    await import('./domain/services/PreferenceManager');
  const prefs = await preferenceManager.getPreferences();
  store.loadPreferences(prefs);

  // Bootstrap Cloud Sync (lazy, não bloqueia o boot da app)
  if (prefs.cloudSync && prefs.gistToken) {
    cloudSyncService
      .configure(prefs.gistToken, prefs.gistId || undefined)
      .then(() => {
        // Se o GistDB criou um Gist novo, persiste o ID gerado
        const newGistId = cloudSyncService.gistId;
        if (newGistId && newGistId !== prefs.gistId) {
          preferenceManager.savePreferences({ gistId: newGistId });
        }
        // Pull dos templates e preferências da nuvem após conexão bem-sucedida
        return Promise.all([
          templateManager.syncFromCloud(),
          preferenceManager.syncFromCloud(),
        ]);
      })
      .catch((err) => {
        logger.error('Main', 'Cloud Sync bootstrap failed:', err);
        // Não exibe toast de erro no boot — o indicador na StatusBar comunica o estado
      });
  }

  // Persiste gistId gerado automaticamente sempre que o GistDB criar um Gist novo
  eventBus.on('cloud:configured', ({ gistId }) => {
    const currentPrefs = store.getState().preferences;
    if (gistId !== currentPrefs?.gistId) {
      preferenceManager.savePreferences({ gistId });
    }
  });

  // Se não houver override via URL, aplica a preferência do usuário (Task 88)
  if (debugOverride === null) {
    logger.setLevel(prefs.logLevel as LogLevelType);
  }

  // 3. Inicializa o som com base na preferência e contorna autoplay-block
  UISM.toggle(prefs.audioEnabled);

  const playTestSound = () => {
    if (UISM.play(UISM.enumPresets.TAP)) {
      document.removeEventListener('click', playTestSound);
      document.removeEventListener('keydown', playTestSound);
    }
  };
  document.addEventListener('click', playTestSound, { once: true });
  document.addEventListener('keydown', playTestSound, { once: true });

  // Helper para resolver o tema de acordo com as preferências
  const systemThemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
  const resolveAndApplyTheme = (theme: 'dark' | 'light' | 'system') => {
    const activeTheme =
      theme === 'system'
        ? systemThemeMedia.matches
          ? 'dark'
          : 'light'
        : theme;
    document.documentElement.setAttribute('data-theme', activeTheme);
  };

  // 4. Reage a mudanças de preferências em tempo real (Centralizado)
  eventBus.on('preferences:change', (updatedPrefs: UserPreferences) => {
    if (updatedPrefs.audioEnabled !== undefined) {
      UISM.toggle(updatedPrefs.audioEnabled);
    }
    if (updatedPrefs.theme) {
      resolveAndApplyTheme(updatedPrefs.theme);
    }
    if (updatedPrefs.logLevel !== undefined && debugOverride === null) {
      logger.setLevel(updatedPrefs.logLevel);
    }
  });

  // Reage a mudanças no tema do sistema operacional
  systemThemeMedia.addEventListener('change', () => {
    const currentPrefs = store.getState().preferences;
    if (currentPrefs?.theme === 'system') {
      resolveAndApplyTheme('system');
    }
  });

  // Atualiza o tema inicial
  resolveAndApplyTheme(prefs.theme);

  await templateManager.init();
  shortcutService.init(isMac);

  const allShortcuts = shortcutService.listShortcuts();
  // Injeta no SSoT de atalhos
  const { UIKeyboardShortcuts } =
    await import('./components/common/KeyboardShortcuts');
  const tempShortcuts = new UIKeyboardShortcuts();
  tempShortcuts.data = allShortcuts;

  const inspectorTips = Object.values(InspectorHelpData).flatMap((section) => [
    ...section.commands.map(
      (cmd) =>
        `${section.title}: ${cmd.key ? `[${cmd.key}] ` : ''}${cmd.label} - ${cmd.desc}`,
    ),
    ...(section.proTip ? [section.proTip.text.replace(/<[^>]*>/g, '')] : []),
  ]);

  document
    .querySelector('ui-hud-tips')
    ?.setTips([
      ...allShortcuts.map((i) => `[${i.key || i.sequence}] - ${i.description}`),
      ...helpData.proTips.map((i) => i.tip),
      ...inspectorTips,
      ...Object.keys(FORMATTERS).map(
        (key) => `Formate dados da etiqueta Use → ${FORMATTERS[key].tip}`,
      ),
      'Dica: Use [Ctrl+Z] para desfazer ações.',
      'Dica: Use as setas do teclado para mover elementos selecionados.',
    ]);

  const statusBar = new StatusBar();
  statusBar.init();

  const { sessionManager } = await import('./domain/services/SessionManager');

  // BIOS: Boot Sequence
  const lastProjectId = localStorage.getItem('last_active_project');
  const hasSeenGuide = localStorage.getItem('has_seen_guide') === 'true';
  let loadedFromSession = false;

  // 1. Tenta restaurar sessão instântanea (Auto-save)
  const savedSession = await sessionManager.getSavedSession();
  if (savedSession) {
    store.loadLabel(savedSession);
    loadedFromSession = true;
    logger.info('Main', 'Session restored from auto-save');
  }
  // 2. Fallback: Tenta restaurar último projeto ativo do Vault
  else if (lastProjectId) {
    const templates = await templateManager.getTemplates();
    const lastProject = templates.find((t) => t.id === lastProjectId);

    if (lastProject) {
      store.loadLabel(lastProject);
      loadedFromSession = true;
      logger.info('Main', `Session restored from template: ${lastProjectId}`);
    }
  }

  onModulesReady();

  // 3. Se nada foi carregado, mostra Welcome ou Blank
  if (!loadedFromSession) {
    if (!hasSeenGuide) {
      const welcomeModal = document.getElementById('welcome-modal');
      if (welcomeModal) welcomeModal.setAttribute('open', '');
      store.loadLabel(defaultLabel);
    } else {
      store.loadLabel(defaultLabel);
      logger.info('Main', 'Fresh blank session started');
    }
  }

  // Proteção de Saída (Dirty State)
  window.onbeforeunload = (e) => {
    if (store.getState().isDirty) {
      e.preventDefault();
      e.returnValue = ''; // Exibe alerta padrão do navegador
      return '';
    }
  };

  // Notifica Store sobre preferências carregadas (para sincronizar UI)
  eventBus.emit('preferences:update', prefs);

  // Monitora mudança de projeto para salvar última sessão no LocalStorage (como índice)
  eventBus.on('state:change', (state: AppState) => {
    if (state.currentLabel?.id) {
      localStorage.setItem('last_active_project', state.currentLabel.id);
    }
  });

  logger.info('Main', 'Application Initialized');
  bootTime.end('Initialization');

  eventBus.emit('notify', {
    type: 'info',
    message: 'Aplicação inicializada com sucesso!',
    duration: 5000,
    silent: true,
  });

  UISM.playMelody(forgeOSBoot.notes, forgeOSBoot.options);
});

// Listener para solicitações de som de componentes customizados
document.addEventListener('sound-request', (e: any) => {
  const detail = e.detail;
  if (detail.preset) {
    UISM.play(detail.preset);
  } else {
    UISM.playCustom(detail);
  }
});
