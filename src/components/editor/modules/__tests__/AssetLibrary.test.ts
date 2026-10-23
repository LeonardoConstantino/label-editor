import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import 'fake-indexeddb/auto';
import { db } from '../../../../core/Database';
import eventBus from '../../../../core/EventBus';
import { UISM } from '../../../../core/UISoundManager';
import { ElementType } from '../../../../domain/models/Label';
import '../AssetLibrary';
import { AssetLibrary } from '../AssetLibrary';

// Mock IntersectionObserver
if (typeof IntersectionObserver === 'undefined') {
  (global as any).IntersectionObserver = class {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  };
}

// Mock UISM
vi.mock('../../../../core/UISoundManager', () => ({
  UISM: {
    play: vi.fn(),
    playCustom: vi.fn(),
    enumPresets: {
      TAP: 'tap',
      TOGGLE: 'toggle',
      DELETE: 'delete',
      OPEN: 'open',
      SUCCESS: 'success'
    }
  }
}));

describe('AssetLibrary - Task 102 (Instant Search & Recents Engine)', () => {
  let library: AssetLibrary;

  beforeEach(async () => {
    vi.clearAllMocks();
    // Limpa dados de teste
    try {
      await db.delete('preferences', 'recent_icons');
    } catch {}

    library = document.createElement('asset-library') as AssetLibrary;
    document.body.appendChild(library);
    await new Promise((resolve) => setTimeout(resolve, 50));
  });

  afterEach(() => {
    library.remove();
  });

  it('renders search input when symbols tab is active', () => {
    const shadow = library.shadowRoot!;
    const symbolsBtn = shadow.querySelector<HTMLElement>('.filter-pill[data-cat="symbols"]');
    expect(symbolsBtn).toBeDefined();

    symbolsBtn?.click();

    const searchBar = shadow.getElementById('icon-search-bar');
    expect(searchBar?.style.display).toBe('block');

    const searchInput = shadow.getElementById('icon-search-input') as HTMLInputElement;
    expect(searchInput).toBeDefined();
  });

  it('filters icons by query and displays matching items', async () => {
    const shadow = library.shadowRoot!;
    const symbolsBtn = shadow.querySelector<HTMLElement>('.filter-pill[data-cat="symbols"]');
    symbolsBtn?.click();

    const searchInput = shadow.getElementById('icon-search-input') as HTMLInputElement;
    searchInput.value = 'bio';
    searchInput.dispatchEvent(new Event('input'));

    // Aguarda debounce de 150ms
    await new Promise((resolve) => setTimeout(resolve, 200));

    const cells = shadow.querySelectorAll('.icon-cell');
    expect(cells.length).toBeGreaterThan(0);
    const keys = Array.from(cells).map((c) => c.getAttribute('data-icon-key'));
    expect(keys).toContain('biohazard');
  });

  it('shows empty state with suggestions when no symbols match', async () => {
    const shadow = library.shadowRoot!;
    const symbolsBtn = shadow.querySelector<HTMLElement>('.filter-pill[data-cat="symbols"]');
    symbolsBtn?.click();

    const searchInput = shadow.getElementById('icon-search-input') as HTMLInputElement;
    searchInput.value = 'termoinexistente12345';
    searchInput.dispatchEvent(new Event('input'));

    await new Promise((resolve) => setTimeout(resolve, 200));

    const emptyState = shadow.querySelector('.empty-state');
    expect(emptyState).toBeDefined();
    expect(emptyState?.textContent).toContain('termoinexistente12345');

    const suggestions = shadow.querySelectorAll('.suggestion-term');
    expect(suggestions.length).toBeGreaterThan(0);
  });

  it('persists recent icons in IndexedDB and re-renders recent rack', async () => {
    const shadow = library.shadowRoot!;
    const symbolsBtn = shadow.querySelector<HTMLElement>('.filter-pill[data-cat="symbols"]');
    symbolsBtn?.click();

    // Simula emissão de element:add com um ícone
    eventBus.emit('element:add', {
      id: 'el-icon-1',
      type: ElementType.ICON,
      name: 'Biohazard',
      iconName: 'biohazard'
    } as any);

    await new Promise((resolve) => setTimeout(resolve, 80));

    // Verifica persistência no IDB
    const saved = await db.get<{ id: string; keys: string[] }>('preferences', 'recent_icons');
    expect(saved).toBeDefined();
    expect(saved?.keys).toContain('biohazard');

    const recentItems = shadow.querySelectorAll('.recent-icon-item');
    expect(recentItems.length).toBe(1);
    expect(recentItems[0].getAttribute('data-icon-key')).toBe('biohazard');
  });

  it('limits recents to 8 items and deduplicates recent icons', async () => {
    const iconsToTest = [
      'alert-triangle',
      'biohazard',
      'ce-mark',
      'box',
      'alarm-clock',
      'activity-square',
      'a-arrow-down',
      'a-arrow-up',
      'alarm-check' // 9th icon
    ];

    for (const icon of iconsToTest) {
      eventBus.emit('element:add', {
        id: `el-${icon}`,
        type: ElementType.ICON,
        name: icon,
        iconName: icon
      } as any);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    const saved = await db.get<{ id: string; keys: string[] }>('preferences', 'recent_icons');
    expect(saved?.keys.length).toBe(8);
    // O mais recente deve estar no topo
    expect(saved?.keys[0]).toBe('alarm-check');

    // Re-adicionar um ícone existente deve movê-lo para o topo sem duplicar
    eventBus.emit('element:add', {
      id: 'el-biohazard-repeat',
      type: ElementType.ICON,
      name: 'Biohazard',
      iconName: 'biohazard'
    } as any);
    await new Promise((resolve) => setTimeout(resolve, 20));

    const updated = await db.get<{ id: string; keys: string[] }>('preferences', 'recent_icons');
    expect(updated?.keys.length).toBe(8);
    expect(updated?.keys[0]).toBe('biohazard');
  });

  it('reloads saved recent icons after page reload / re-instantiation', async () => {
    // Salva previamente no IndexedDB
    await db.put('preferences', {
      id: 'recent_icons',
      keys: ['biohazard', 'ce-mark']
    });

    const newLibrary = document.createElement('asset-library') as AssetLibrary;
    document.body.appendChild(newLibrary);
    await new Promise((resolve) => setTimeout(resolve, 80));

    const shadow = newLibrary.shadowRoot!;
    const symbolsBtn = shadow.querySelector<HTMLElement>('.filter-pill[data-cat="symbols"]');
    symbolsBtn?.click();

    const recentRack = shadow.getElementById('recent-icons-rack');
    expect(recentRack).toBeDefined();

    const recentItems = shadow.querySelectorAll('.recent-icon-item');
    expect(recentItems.length).toBe(2);
    expect(recentItems[0].getAttribute('data-icon-key')).toBe('biohazard');
    expect(recentItems[1].getAttribute('data-icon-key')).toBe('ce-mark');

    newLibrary.remove();
  });

  it('clicking an icon emits element:add and plays TAP sound', async () => {
    const shadow = library.shadowRoot!;
    const symbolsBtn = shadow.querySelector<HTMLElement>('.filter-pill[data-cat="symbols"]');
    symbolsBtn?.click();

    const searchInput = shadow.getElementById('icon-search-input') as HTMLInputElement;
    searchInput.value = 'biohazard';
    searchInput.dispatchEvent(new Event('input'));
    await new Promise((resolve) => setTimeout(resolve, 200));

    const elementAddSpy = vi.fn();
    eventBus.on('element:add', elementAddSpy);

    const cell = shadow.querySelector<HTMLElement>('.icon-cell[data-icon-key="biohazard"]');
    expect(cell).toBeDefined();

    cell?.click();

    expect(UISM.play).toHaveBeenCalledWith(UISM.enumPresets.TAP);
    expect(elementAddSpy).toHaveBeenCalled();
    const createdEl = elementAddSpy.mock.calls[0][0];
    expect(createdEl.type).toBe(ElementType.ICON);
    expect(createdEl.iconName).toBe('biohazard');
  });
});
