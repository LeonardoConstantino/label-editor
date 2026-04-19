import { store } from './core/Store';
import { ElementType } from './domain/models/elements/BaseElement';
import eventBus from './core/EventBus';
import { logger } from './core/Logger';
import './styles/main.css';

import { templateManager } from './domain/services/TemplateManager';
import {UISM} from './core/UISoundManager';
import { ToastManager } from './components/common/toast';
import './components/editor/EditorCanvas';
import './components/editor/Toolbar';
import './components/editor/ElementInspector';
import './components/common/modal';
import './components/preview/DataSourceInput';
import './components/common/UINumberScrubber';
import './components/common/tooltip';

// Global Notification Listener
eventBus.on('notify', (options: any) => {
  ToastManager.show(options);
});

// Inicializa a aplicação com uma etiqueta padrão
const defaultLabel = {
  id: 'new-label-' + Date.now(),
  name: 'Nova Etiqueta',
  config: {
    widthMM: 100,
    heightMM: 60,
    dpi: 300,
    previewScale: 1
  },
  elements: [
    {
      id: 'default-text',
      type: ElementType.TEXT,
      position: { x: 25, y: 15 },
      zIndex: 1,
      dimensions: { width: 50, height: 10 },
      content: 'Minha Etiqueta',
      fontFamily: 'sans-serif',
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000000',
      textAlign: 'center'
    }
  ],
  createdAt: Date.now(),
  updatedAt: Date.now()
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
  store.loadLabel(defaultLabel);
  logger.info('Main', `Application Initialized with Label: ${defaultLabel.id}`);

  eventBus.emit('notify', {
    type: 'info',
    message: 'Aplicação inicializada com sucesso!',
    duration: 5000
  });

});
