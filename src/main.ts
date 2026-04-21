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
import './components/editor/EditorCanvas';
import './components/editor/Toolbar';
import './components/editor/ElementInspector';
import './components/editor/VaultGallery';
import './components/common/modal';
import './components/preview/DataSourceInput';
import './components/common/UINumberScrubber';
import './components/common/tooltip';

// Global Notification Listener
eventBus.on('notify', (options: any) => {
  ToastManager.show(options);
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
  shortcutService.init();

  const shortcuts = shortcutService.listShortcuts();
  eventBus.emit('shortcuts:list:', shortcuts);
  console.log('shortcuts :', shortcuts);

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
