import { store } from './core/Store';
import { ElementType } from './domain/models/elements/BaseElement';
import './components/editor/EditorCanvas';
import './components/editor/Toolbar';
import './components/editor/ElementInspector';

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

import { templateManager } from './domain/services/TemplateManager';

document.addEventListener('DOMContentLoaded', async () => {
  await templateManager.init();
  store.loadLabel(defaultLabel);
  console.log('Application Initialized with Label:', defaultLabel.id);
});
