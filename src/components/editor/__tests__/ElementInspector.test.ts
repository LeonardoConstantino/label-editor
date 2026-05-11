import { describe, it, expect, vi, beforeEach } from 'vitest';
import 'fake-indexeddb/auto'; 
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

['app-input', 'ui-number-scrubber', 'ui-icon', 'ui-tooltip', 'app-button', 'ui-align-cluster', 'inspector-layer-card'].forEach(defineMock);

describe('ElementInspector Smoke Tests (Refatorado)', () => {
  let inspector: ElementInspector;

  const baseElement = {
    id: 'el1',
    type: ElementType.TEXT,
    name: 'Layer 1',
    zIndex: 1,
    visible: true,
    locked: false,
    position: { x: 10, y: 10 },
    dimensions: { width: 50, height: 10 },
    rotation: 0,
    opacity: 1
  };

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
    inspector = new ElementInspector();
    document.body.appendChild(inspector);
  });

  it('deve renderizar a lista de camadas mesmo sem elemento selecionado', () => {
    const el = { ...baseElement };
    const label = {
      config: { widthMM: 100, heightMM: 50, dpi: 300, backgroundColor: '#ffffff', previewScale: 1 },
      elements: [el]
    };
    
    vi.spyOn(store, 'getState').mockReturnValue({
      currentLabel: label,
      selectedElementIds: [],
      preferences: {}
    } as any);

    eventBus.emit('state:change', store.getState());

    const shadow = inspector.shadowRoot!;
    expect(shadow.textContent).toContain('PROPERTIES');
    
    const card = shadow.querySelector('inspector-layer-card');
    expect(card).toBeTruthy();
  });

  it('deve renderizar MULTI-SELECTION quando múltiplos elementos estão selecionados', () => {
    const el1 = { ...baseElement, id: 'el1' };
    const el2 = { ...baseElement, id: 'el2', zIndex: 2 };

    vi.spyOn(store, 'getState').mockReturnValue({
      currentLabel: { elements: [el1, el2], config: {} },
      selectedElementIds: ['el1', 'el2'],
      preferences: {}
    } as any);

    eventBus.emit('state:change', store.getState());

    const shadow = inspector.shadowRoot!;
    expect(shadow.textContent).toContain('MULTI-SELECTION');
    
    const alignCluster = shadow.querySelector('ui-align-cluster');
    expect(alignCluster).toBeTruthy();

    const cards = shadow.querySelectorAll('inspector-layer-card');
    expect(cards).toHaveLength(2);
  });

  it('deve emitir element:update ao mudar um valor de input (via inspector:change)', () => {
    const el = { ...baseElement };
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
