import { describe, it, expect, vi, beforeEach } from 'vitest';
import 'fake-indexeddb/auto'; // Mock do IndexedDB para o JSDOM
import { ElementInspector } from '../ElementInspector';
import { store } from '../../../core/Store';
import eventBus from '../../../core/EventBus';
import { ElementType } from '../../../domain/models/Label';

// Mock do CSSStyleSheet para o JSDOM
if (typeof CSSStyleSheet === 'undefined') {
  (global as any).CSSStyleSheet = class {
    replaceSync() {}
  };
}

// Mocks de dependências
vi.mock('../../../core/UISoundManager', () => ({
  UISM: {
    play: vi.fn(),
    enumPresets: { TAP: 'tap', TOGGLE: 'toggle', DELETE: 'delete', OPEN: 'open' }
  }
}));

vi.mock('../../../core/Logger', () => ({
  logger: {
    debug: vi.fn(),
    error: vi.fn()
  }
}));

// Mock dos componentes filhos para evitar erros de custom element não definido
const defineMock = (tag: string) => {
  if (!customElements.get(tag)) {
    customElements.define(tag, class extends HTMLElement {
      private _val: any;
      set value(v: any) { this._val = v; }
      get value() { return this._val; }
      constructor() { super(); this.attachShadow({mode:'open'}); }
    });
  }
};

['app-input', 'ui-number-scrubber', 'ui-icon', 'ui-tooltip', 'app-button'].forEach(defineMock);

describe('ElementInspector Smoke Tests (Refatorado)', () => {
  let inspector: ElementInspector;

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
    inspector = new ElementInspector();
    document.body.appendChild(inspector);
  });

  it('deve renderizar o SETUP DO DOCUMENTO quando não há elemento selecionado', () => {
    const label = {
      config: { widthMM: 100, heightMM: 50, dpi: 300, backgroundColor: '#ffffff', previewScale: 1 },
      elements: []
    };
    
    vi.spyOn(store, 'getState').mockReturnValue({
      currentLabel: label,
      selectedElementIds: [],
      preferences: { audioEnabled: true, showGrid: false, gridSizeMM: 5, unit: 'mm' }
    } as any);

    eventBus.emit('state:change', store.getState());

    const shadow = inspector.shadowRoot!;
    expect(shadow.textContent).toContain('LABEL SETUP');
    
    const docSetup = shadow.querySelector('inspector-document-setup');
    expect(docSetup).toBeTruthy();
    
    const inputW = docSetup!.shadowRoot!.querySelector('[data-prop="doc.widthMM"]');
    expect(inputW).toBeTruthy();
  });

  it('deve emitir preferences:update ao alternar um checkbox no DocumentSetup', () => {
    const label = { config: { widthMM: 100 }, elements: [] };
    vi.spyOn(store, 'getState').mockReturnValue({
      currentLabel: label,
      selectedElementIds: [],
      preferences: { audioEnabled: true }
    } as any);

    eventBus.emit('state:change', store.getState());
    const spy = vi.spyOn(eventBus, 'emit');

    const shadow = inspector.shadowRoot!;
    const docSetup = shadow.querySelector('inspector-document-setup')!;
    const audioCheckbox = docSetup.shadowRoot!.querySelector('[data-prop="pref.audioEnabled"]') as HTMLInputElement;

    // Simula clique no checkbox (evento nativo 'change')
    audioCheckbox.checked = false;
    audioCheckbox.dispatchEvent(new Event('change', { bubbles: true }));

    expect(spy).toHaveBeenCalledWith('preferences:update', expect.objectContaining({
      audioEnabled: false
    }));
  });

  it('deve renderizar PROPRIEDADES quando um elemento está selecionado', () => {
    const el = {
      id: 'el1',
      type: ElementType.TEXT,
      name: 'Teste Text',
      position: { x: 10, y: 10 },
      rotation: 0,
      opacity: 1,
      content: 'Hello',
      fontSize: 12,
      color: '#000000',
      zIndex: 1
    };

    vi.spyOn(store, 'getState').mockReturnValue({
      currentLabel: { elements: [el], config: {} },
      selectedElementIds: ['el1'],
      preferences: {}
    } as any);

    eventBus.emit('state:change', store.getState());

    const shadow = inspector.shadowRoot!;
    expect(shadow.textContent).toContain('PROPERTIES');
    
    const card = shadow.querySelector('inspector-layer-card');
    expect(card).toBeTruthy();

    const textSection = card!.shadowRoot!.querySelector('inspector-section-text');
    expect(textSection).toBeTruthy();
    
    const contentInput = textSection!.shadowRoot!.querySelector('[data-prop="content"]');
    expect(contentInput).toBeTruthy();
  });

  it('deve emitir element:update ao mudar um valor de input (via inspector:change)', () => {
    const el = { id: 'el1', type: ElementType.TEXT, zIndex: 1 };
    vi.spyOn(store, 'getState').mockReturnValue({
      currentLabel: { elements: [el], config: {} },
      selectedElementIds: ['el1'],
      preferences: {}
    } as any);

    eventBus.emit('state:change', store.getState());
    const spy = vi.spyOn(eventBus, 'emit');
    
    const shadow = inspector.shadowRoot!;
    const card = shadow.querySelector('inspector-layer-card')!;
    
    card.dispatchEvent(new CustomEvent('inspector:change', {
      detail: { prop: 'content', value: 'New Val' },
      bubbles: true,
      composed: true
    }));

    expect(spy).toHaveBeenCalledWith('element:update', expect.objectContaining({
      id: 'el1',
      updates: { content: 'New Val' }
    }));
  });
});
