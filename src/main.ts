import { store } from './core/Store';
import { ElementType } from './domain/models/elements/BaseElement';
import eventBus from './core/EventBus';
import { logger } from './core/Logger';
import './styles/main.css';

import { templateManager } from './domain/services/TemplateManager';
import { Label } from './domain/models/Label';
import { DEFAULTS } from './constants/defaults';
import { ElementFactory } from './domain/models/elements/ElementFactory';
import { UISM } from './core/UISoundManager';
import { shortcutService } from './core/ShortcutService';
import { ToastManager } from './components/common/toast';
import { getOSInfo } from './utils/os-detection';
import './components/editor/EditorCanvas';
import './components/editor/Toolbar';
import './components/editor/ElementInspector';
import './components/editor/VaultGallery';
import './components/editor/WelcomeScreen';
import './components/editor/HelpCenter';
import './components/common/modal';
import './components/preview/DataSourceInput';
import './components/common/UINumberScrubber';
import './components/common/tooltip';

// Global Notification Listener
eventBus.on('notify', (options: any) => {
  ToastManager.show(options);
});
// Help Center Listener
eventBus.on('ui:open:help', (options: any = {}) => {
  localStorage.setItem('has_seen_guide', 'true');
  const modal = document.getElementById('help-center-modal') as any;
  const helpCenter = modal?.querySelector('ui-help-center') as any;
  if (modal && helpCenter) {
    if (options.tab) helpCenter.setTab(options.tab);
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
  const { isMac } = getOSInfo(); // Detecta o sistema operacional e ajusta variáveis globais
  // Inicializa o som e contorna autoplay-block
  UISM.toggle(true);

  const playTestSound = () => {
    UISM.play(UISM.enumPresets.TAP);
    document.removeEventListener('click', playTestSound);
    document.removeEventListener('keydown', playTestSound);
  };
  document.addEventListener('click', playTestSound, { once: true });
  document.addEventListener('keydown', playTestSound, { once: true });

  await templateManager.init();
  shortcutService.init(isMac);

  // BIOS: Boot Sequence
  const lastProjectId = localStorage.getItem('last_active_project');
  const hasSeenGuide = localStorage.getItem('has_seen_guide') === 'true';
  let loadedFromSession = false;

  if (lastProjectId) {
    const templates = await templateManager.getTemplates();
    const lastProject = templates.find((t) => t.id === lastProjectId);

    if (lastProject) {
      store.loadLabel(lastProject);
      loadedFromSession = true;

      eventBus.emit('notify', {
        type: 'success',
        message: 'Sessão anterior restaurada.',
        duration: 3000,
      });
      UISM.play(UISM.enumPresets.SUCCESS);
    }
  }

  // Se não carregou sessão e nunca viu o guia, mostra Welcome
  if (!loadedFromSession && !hasSeenGuide) {
    const welcomeModal = document.getElementById('welcome-modal') as any;
    if (welcomeModal) welcomeModal.setAttribute('open', '');
  } else if (!loadedFromSession) {
    // Se já viu o guia mas não tem sessão, apenas carrega a etiqueta padrão
    store.loadLabel(defaultLabel);
    logger.info('Main', `Standard session initialized: ${defaultLabel.id}`);
  }

  // Monitora mudança de projeto para salvar última sessão
  eventBus.on('state:change', (state: any) => {
    if (state.currentLabel?.id) {
      localStorage.setItem('last_active_project', state.currentLabel.id);
    }
  });

  const shortcuts = shortcutService.listShortcuts();
  eventBus.emit('shortcuts:list:', shortcuts);

  // Carrega preferências do usuário
  const { preferenceManager } =
    await import('./domain/services/PreferenceManager');
  const prefs = await preferenceManager.getPreferences();
  eventBus.emit('preferences:update', prefs);

  store.loadLabel(defaultLabel);
  logger.info('Main', `Application Initialized with Label: ${defaultLabel.id}`);

  eventBus.emit('notify', {
    type: 'info',
    message: 'Aplicação inicializada com sucesso!',
    duration: 5000,
  });
});
