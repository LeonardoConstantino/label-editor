import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import 'fake-indexeddb/auto';
import { db } from '../../../../../core/Database';
import { store } from '../../../../../core/Store';
import { AnyElement, ElementType } from '../../../../../domain/models/Label';
import { INSPECTOR_CHANGE } from '../../inspector-events';
import '../InspectorSectionIcon';
import { InspectorSectionIcon } from '../InspectorSectionIcon';
import '../../InspectorLayerCard';
import { ElementFactory } from '../../../../../domain/models/elements/ElementFactory';

// Mocks de dependências
vi.mock('../../../../../core/UISoundManager', () => ({
  UISM: {
    play: vi.fn(),
    playCustom: vi.fn(),
    enumPresets: { TAP: 'tap', TOGGLE: 'toggle', DELETE: 'delete', OPEN: 'open' }
  }
}));

describe('InspectorSectionIcon - Task 103', () => {
  let section: InspectorSectionIcon;
  let mockElement: AnyElement;

  beforeEach(async () => {
    vi.clearAllMocks();
    try {
      await db.delete('preferences', 'recent_icons');
    } catch {}

    mockElement = ElementFactory.create(ElementType.ICON, {
      id: 'icon-test-1',
      name: 'Icon 1',
      zIndex: 1,
      visible: true,
      locked: false,
      position: { x: 20, y: 20 },
      dimensions: { width: 16, height: 16 },
      rotation: 0,
      opacity: 1,
      iconName: 'alert-triangle',
      color: '#000000',
      strokeWidth: 2
    });

    section = document.createElement('inspector-section-icon') as InspectorSectionIcon;
    section.element = mockElement;
    document.body.appendChild(section);
    await new Promise((resolve) => setTimeout(resolve, 50));
  });

  afterEach(() => {
    section.remove();
  });

  it('renders inputs and synchronizes initial values (Atomic Sync)', () => {
    const shadow = section.shadowRoot!;
    const nameInput = shadow.getElementById('input-icon-name') as HTMLInputElement;
    const colorPicker = shadow.querySelector<HTMLElement & { value: string }>('app-color-picker');

    expect(nameInput).toBeDefined();
    expect(nameInput.getAttribute('value')).toBe('alert-triangle');
    expect(colorPicker).toBeDefined();
    // app-color-picker syncs via property .value and setAttribute — check either
    const colorVal = colorPicker?.value ?? colorPicker?.getAttribute('value');
    expect(colorVal).toBe('#000000');
  });

  it('displays strokeWidth row conditionally for stroke icons and hides for solid fill icons', () => {
    const shadow = section.shadowRoot!;
    const strokeRow = shadow.getElementById('stroke-row');

    // alert-triangle tem stroke: true
    expect(strokeRow?.style.display).toBe('flex');

    // Altera para biohazard (stroke: false)
    section.element = {
      ...mockElement,
      iconName: 'biohazard'
    };

    expect(strokeRow?.style.display).toBe('none');
  });

  it('dispatches inspector:change when color is modified in AppColorPicker', () => {
    const changeSpy = vi.fn();
    section.addEventListener(INSPECTOR_CHANGE, (e: any) => changeSpy(e.detail));

    const colorPicker = section.shadowRoot!.querySelector('app-color-picker')!;
    colorPicker.dispatchEvent(
      new CustomEvent('app-color-pick', {
        detail: { value: '#e11d48' },
        bubbles: true,
        composed: true
      })
    );

    expect(changeSpy).toHaveBeenCalledWith({
      prop: 'color',
      value: '#e11d48'
    });
  });

  it('dispatches inspector:change when strokeWidth is modified', () => {
    const changeSpy = vi.fn();
    section.addEventListener(INSPECTOR_CHANGE, (e: any) => changeSpy(e.detail));

    const scrubber = section.shadowRoot!.querySelector('ui-number-scrubber')!;
    scrubber.dispatchEvent(
      new CustomEvent('app-input', {
        detail: { value: 3.5 },
        bubbles: true,
        composed: true
      })
    );

    expect(changeSpy).toHaveBeenCalledWith({
      prop: 'strokeWidth',
      value: 3.5
    });
  });

  it('supports dynamic variables in iconName and renders visual validation hint', () => {
    const shadow = section.shadowRoot!;
    const hint = shadow.getElementById('icon-hint');

    // Ícone regular do catálogo
    expect(hint?.className).toContain('valid');
    expect(hint?.textContent).toContain('Alert Triangle');

    // Variável dinâmica interpolada
    section.element = {
      ...mockElement,
      iconName: '{{simbolo_perigo}}'
    };

    expect(hint?.className).toContain('variable');
    expect(hint?.textContent).toContain('simbolo_perigo');

    // Ícone desconhecido
    section.element = {
      ...mockElement,
      iconName: 'simbolo_inexistente_xyz'
    };

    expect(hint?.className).toContain('warning');
  });

  it('toggles quick picker popover and allows selecting symbol', async () => {
    const shadow = section.shadowRoot!;
    const btnPicker = shadow.getElementById('btn-quick-picker');
    const popover = shadow.getElementById('quick-picker-popover');

    expect(popover?.style.display).toBe('none');

    btnPicker?.click();
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(popover?.style.display).toBe('flex');

    const changeSpy = vi.fn();
    section.addEventListener(INSPECTOR_CHANGE, (e: any) => changeSpy(e.detail));

    // Clica em um ícone de sugestão
    const firstCell = shadow.querySelector<HTMLElement>('.quick-icon-cell');
    expect(firstCell).toBeDefined();
    const key = firstCell?.getAttribute('data-icon-key');

    firstCell?.click();

    expect(changeSpy).toHaveBeenCalledWith({
      prop: 'iconName',
      value: key
    });
    expect(popover?.style.display).toBe('none');
  });

  it('integrates with production dataset to bind batch variables via badges', async () => {
    // Configura dataset fictício no Store
    (store as any).state.productionData = [
      { id: 101, codigo_risco: 'biohazard', setor: 'Químico' }
    ];

    section.element = { ...mockElement };
    await new Promise((resolve) => setTimeout(resolve, 30));

    const shadow = section.shadowRoot!;
    const varSection = shadow.getElementById('variables-section');
    expect(varSection?.style.display).toBe('flex');

    const badges = shadow.querySelectorAll<HTMLElement>('ui-variable-badge');
    expect(badges.length).toBe(3);

    const changeSpy = vi.fn();
    section.addEventListener(INSPECTOR_CHANGE, (e: any) => changeSpy(e.detail));

    // Clica no badge 'codigo_risco'
    const riscoBadge = Array.from(badges).find((b) => b.textContent?.includes('codigo_risco'));
    expect(riscoBadge).toBeDefined();

    riscoBadge?.click();

    expect(changeSpy).toHaveBeenCalledWith({
      prop: 'iconName',
      value: '{{codigo_risco}}'
    });

    // Limpa store de produção
    (store as any).state.productionData = [];
  });

  it('integrates properly with InspectorLayerCard', () => {
    const card = document.createElement('inspector-layer-card') as any;
    card.element = mockElement;
    document.body.appendChild(card);

    const iconSection = card.shadowRoot?.querySelector('inspector-section-icon');
    expect(iconSection).toBeDefined();

    card.remove();
  });
});


