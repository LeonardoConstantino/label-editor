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
import './components/common/ui-hud-tips';
import helpData from './assets/data/helpData';
import { InspectorHelpData } from './utils/HelpContentProvider';

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

  // 1. Carrega preferências do usuário imediatamente
  const { preferenceManager } = await import('./domain/services/PreferenceManager');
  const prefs = await preferenceManager.getPreferences();

  // 2. Inicializa o som com base na preferência e contorna autoplay-block
  UISM.toggle(prefs.audioEnabled);

  const playTestSound = () => {
    if (UISM.play(UISM.enumPresets.TAP)) {
      document.removeEventListener('click', playTestSound);
      document.removeEventListener('keydown', playTestSound);
    }
  };
  document.addEventListener('click', playTestSound, { once: true });
  document.addEventListener('keydown', playTestSound, { once: true });

  // 3. Reage a mudanças de preferências de som em tempo real
  eventBus.on('preferences:change', (updatedPrefs: any) => {
    if (updatedPrefs.audioEnabled !== undefined) {
      UISM.toggle(updatedPrefs.audioEnabled);
    }
  });

  await templateManager.init();
  shortcutService.init(isMac);

  const allShortcuts = shortcutService.listShortcuts();
  // Injeta no SSoT de atalhos
  const { UIKeyboardShortcuts } = await import('./components/common/KeyboardShortcuts');
  const tempShortcuts = new UIKeyboardShortcuts();
  tempShortcuts.data = allShortcuts;

  const inspectorTips = Object.values(InspectorHelpData).flatMap(section => [
    ...section.commands.map(cmd => `${section.title}: ${cmd.key ? `[${cmd.key}] ` : ''}${cmd.label} - ${cmd.desc}`),
    ...(section.proTip ? [section.proTip.text.replace(/<[^>]*>/g, '')] : [])
  ]);

  document.querySelector('ui-hud-tips')?.setTips([
    ...allShortcuts.map(i => `[${i.key||i.sequence}] - ${i.description}`),
    ...helpData.proTips.map(i => i.tip),
    ...inspectorTips,
    'Dica: Use [Ctrl+Z] para desfazer ações.',
    'Dica: Use as setas do teclado para mover elementos selecionados.',
  ]);

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
    store.loadLabel(defaultLabel);
  } else if (!loadedFromSession) {
    // Se já viu o guia mas não tem sessão, apenas carrega a etiqueta padrão
    store.loadLabel(defaultLabel);
    logger.info('Main', `Standard session initialized: ${defaultLabel.id}`);
  }

  // Notifica Store sobre preferências carregadas (para sincronizar UI)
  eventBus.emit('preferences:update', prefs);

  // Monitora mudança de projeto para salvar última sessão
  eventBus.on('state:change', (state: any) => {
    if (state.currentLabel?.id) {
      localStorage.setItem('last_active_project', state.currentLabel.id);
    }
  });

  logger.info('Main', 'Application Initialized');

  eventBus.emit('notify', {
    type: 'info',
    message: 'Aplicação inicializada com sucesso!',
    duration: 5000,
  });
});
