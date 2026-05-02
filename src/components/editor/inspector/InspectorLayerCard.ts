import { AnyElement, ElementType } from '../../../domain/models/Label';
import { sharedSheet } from '../../../utils/shared-styles';
import { dispatchInspectorAction, dispatchInspectorChange } from './inspector-events';
import { escapeHTML } from '../../../utils/sanitize';
import { InspectorSection, InspectorActionType } from './inspector.types';

// Garantir registros
import '../../common/icon';
import '../../common/AppButton';

// Import das seções de Nível 3
import './sections/InspectorSectionTransform';
import './sections/InspectorSectionText';
import './sections/InspectorSectionRect';
import './sections/InspectorSectionImage';
import './sections/InspectorSectionBorder';

interface ActionIcon extends HTMLElement {
  name: string;
}

interface GenericInput extends HTMLElement {
  value: string | number;
}

/**
 * InspectorLayerCard: Container de Nível 2 que representa uma camada e suas propriedades.
 */
export class InspectorLayerCard extends HTMLElement {
  private _element: AnyElement | null = null;
  private _selected: boolean = false;
  private _hasOverflow: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  set element(el: AnyElement) {
    const prevId = this._element?.id;
    const prevLocked = this._element?.locked;
    this._element = el;
    
    if (prevId !== el.id) {
      this.render();
    } else {
      this.updateHeader();
      this.syncSections();
      if (prevLocked !== el.locked) {
        this.updateLockState();
      }
    }
  }

  get element(): AnyElement | null {
    return this._element;
  }

  set selected(val: boolean) {
    if (this._selected !== val) {
      this._selected = val;
      this.render();
    }
  }

  set hasOverflow(val: boolean) {
    this._hasOverflow = val;
    this.updateWarningTag();
  }

  connectedCallback(): void {
    this.render();
  }

  private render(): void {
    if (!this.shadowRoot || !this._element) return;

    const el = this._element;
    const id = escapeHTML(el.id);
    const isSelected = this._selected;
    const isLocked = el.locked === true;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; margin-bottom: 8px; position: relative; }
        :host(.elevated) { z-index: 100; }
        .card-content { display: ${isSelected ? 'flex' : 'none'}; flex-direction: column; gap: 12px; padding: 12px 8px; }
        .is-locked #sections-container { pointer-events: none; opacity: 0.6; filter: grayscale(0.5); }
        .action-btn { background: transparent; border: none; cursor: pointer; padding: 4px; border-radius: 4px; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
        .action-btn:hover { background: rgba(255, 255, 255, 0.1); }
        .action-btn.active ui-icon { color: var(--color-accent-primary); opacity: 1 !important; }
        .action-btn.warning ui-icon { color: var(--color-accent-warning); opacity: 1 !important; }
      </style>

      <div class="element-card ${isSelected ? 'selected' : ''} ${isLocked ? 'is-locked' : ''}" data-id="${id}">
        <div class="card-header" id="header-select" style="cursor: pointer;">
          <span class="type-tag">${escapeHTML(el.type)}</span>
          <span class="layer-name" id="label-name">${escapeHTML(el.name || el.type)}</span>
          <span class="warning-tag" id="warning-tag" style="display: ${this._hasOverflow ? 'inline' : 'none'}; color: var(--color-accent-warning)">⚠</span>
          
          <div class="flex items-center gap-1" style="margin-left: auto;">
            <button id="btn-toggle-lock" class="action-btn ${isLocked ? 'warning active' : ''}" title="${isLocked ? 'Unlock Layer' : 'Lock Layer'}">
              <ui-icon name="${isLocked ? 'lock' : 'unlock'}" style="--icon-size: 14px; opacity: ${isLocked ? '1' : '0.4'};"></ui-icon>
            </button>
            <button id="btn-toggle-vis" class="action-btn ${el.visible !== false ? 'active' : ''}" title="Toggle Visibility">
              <ui-icon name="${el.visible !== false ? 'eye-off' : 'eye'}" style="--icon-size: 14px; opacity: ${el.visible !== false ? '1' : '0.4'};"></ui-icon>
            </button>
          </div>
        </div>

        <div class="card-content" id="sections-container">
          <!-- Seções injetadas via JS -->
        </div>
      </div>
    `;

    this.setupListeners();
    if (isSelected) {
      this.renderSections();
    }
  }

  private setupListeners(): void {
    const root = this.shadowRoot!;
    const id = this._element?.id;
    if (!id) return;

    // Seleção de Card
    root.getElementById('header-select')?.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('.action-btn')) return;
      dispatchInspectorAction(this, { action: 'select', id });
    });

    // Toggle Visibilidade
    root.getElementById('btn-toggle-vis')?.addEventListener('click', (e) => {
      e.stopPropagation();
      dispatchInspectorAction(this, { action: 'toggle-vis', id });
    });

    // Toggle Lock
    root.getElementById('btn-toggle-lock')?.addEventListener('click', (e) => {
      e.stopPropagation();
      dispatchInspectorAction(this, { action: 'toggle-lock', id });
    });

    // Gerenciamento de Z-Index para Selects (Task 44/69 Fix)
    root.addEventListener('ui-select:open', () => {
      this.classList.add('elevated');
    });
    root.addEventListener('ui-select:close', () => {
      this.classList.remove('elevated');
    });

    if (this._selected) {
      const container = root.getElementById('sections-container')!;
      
      container.addEventListener('app-input', (e: Event) => {
        if (this._element?.locked) return;
        const target = e.target as HTMLElement;
        const prop = target.getAttribute('data-prop');
        if (prop === 'name') {
          const detail = (e as CustomEvent).detail;
          const value = (detail !== null && typeof detail === 'object' && 'value' in detail) ? detail.value : detail;
          if (value !== undefined) {
            dispatchInspectorChange(this, { prop, value });
          }
        }
      });

      container.addEventListener('click', (e) => {
        if (this._element?.locked) return;
        const btn = (e.target as HTMLElement).closest('[data-card-action]');
        if (btn) {
          const action = btn.getAttribute('data-card-action') as InspectorActionType;
          dispatchInspectorAction(this, { action, id });
        }
      });
    }
  }

  private renderSections(): void {
    const container = this.shadowRoot?.getElementById('sections-container');
    if (!container || !this._element) return;

    const el = this._element;

    const idSection = document.createElement('div');
    idSection.innerHTML = `
      <span class="label-prism">Identification</span>
      <div class="row-ui">
        <app-input label="Layer Name" data-prop="name" value="${escapeHTML(this._element.name || '')}" style="flex:1"></app-input>
      </div>
    `;
    container.appendChild(idSection);

    const createSection = (tagName: string): InspectorSection => {
      const sec = document.createElement(tagName) as InspectorSection;
      sec.setAttribute('data-inspector-section', ''); 
      sec.element = el;
      return sec;
    };

    container.appendChild(createSection('inspector-section-transform'));

    if (el.type === ElementType.TEXT) {
      container.appendChild(createSection('inspector-section-text'));
    } else if (el.type === ElementType.RECTANGLE) {
      container.appendChild(createSection('inspector-section-rect'));
    } else if (el.type === ElementType.IMAGE) {
      container.appendChild(createSection('inspector-section-image'));
    } else if (el.type === ElementType.BORDER) {
      container.appendChild(createSection('inspector-section-border'));
    }

    const footer = document.createElement('div');
    footer.style.marginTop = '16px';
    footer.style.display = 'flex';
    footer.style.gap = '8px';
    footer.innerHTML = `
      <app-button variant="secondary" data-card-action="up" style="flex: 1;">UP</app-button>
      <app-button variant="danger" data-card-action="del" style="flex: 1;">DEL</app-button>
    `;
    container.appendChild(footer);

    this.syncSections();
  }

  private updateHeader(): void {
    if (!this.shadowRoot || !this._element) return;
    const el = this._element;
    
    const labelName = this.shadowRoot.getElementById('label-name');
    if (labelName) labelName.textContent = el.name || el.type;

    const visBtn = this.shadowRoot.getElementById('btn-toggle-vis');
    const visIcon = visBtn?.querySelector('ui-icon') as ActionIcon;
    if (visIcon) {
      visIcon.setAttribute('name', el.visible !== false ? 'eye-off' : 'eye');
      visIcon.style.opacity = el.visible !== false ? '1' : '0.4';
      visBtn?.classList.toggle('active', el.visible !== false);
    }

    const lockBtn = this.shadowRoot.getElementById('btn-toggle-lock');
    const lockIcon = lockBtn?.querySelector('ui-icon') as ActionIcon;
    const isLocked = el.locked === true;
    if (lockIcon) {
      lockIcon.setAttribute('name', isLocked ? 'lock' : 'unlock');
      lockIcon.style.opacity = isLocked ? '1' : '0.4';
      lockBtn?.classList.toggle('active', isLocked);
      lockBtn?.classList.toggle('warning', isLocked);
    }
    
    this.updateWarningTag();
  }

  private updateLockState(): void {
    if (!this.shadowRoot || !this._element) return;
    const isLocked = this._element.locked === true;
    const card = this.shadowRoot.querySelector('.element-card');
    card?.classList.toggle('is-locked', isLocked);
  }

  private updateWarningTag(): void {
    const tag = this.shadowRoot?.getElementById('warning-tag');
    if (tag) tag.style.display = this._hasOverflow ? 'inline' : 'none';
  }

  private syncSections(): void {
    if (!this._selected || !this.shadowRoot || !this._element) return;
    
    const el = this._element;
    const shadow = this.shadowRoot;

    const nameInput = shadow.querySelector('[data-prop="name"]') as GenericInput;
    if (nameInput && shadow.activeElement !== nameInput && !nameInput.shadowRoot?.activeElement) {
      nameInput.value = el.name || '';
      nameInput.setAttribute('value', el.name || '');
    }

    shadow.querySelectorAll<InspectorSection>('[data-inspector-section]').forEach(section => {
      section.element = el;
    });
  }
}

customElements.define('inspector-layer-card', InspectorLayerCard);
