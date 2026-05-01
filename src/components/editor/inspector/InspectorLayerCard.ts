import { AnyElement, ElementType } from '../../../domain/models/Label';
import { sharedSheet } from '../../../utils/shared-styles';
import { dispatchInspectorAction, dispatchInspectorChange } from './inspector-events';
import { escapeHTML } from '../../../utils/sanitize';
import { InspectorSection } from './inspector.types';

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
    this._element = el;
    
    if (prevId !== el.id) {
      this.render();
    } else {
      this.updateHeader();
      this.syncSections();
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

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; margin-bottom: 8px; }
        .card-content { display: ${isSelected ? 'flex' : 'none'}; flex-direction: column; gap: 12px; padding: 12px 8px; }
      </style>

      <div class="element-card ${isSelected ? 'selected' : ''}" data-id="${id}">
        <div class="card-header" id="header-select" style="cursor: pointer;">
          <span class="type-tag">${escapeHTML(el.type)}</span>
          <span class="layer-name" id="label-name">${escapeHTML(el.name || el.type)}</span>
          <span class="warning-tag" id="warning-tag" style="display: ${this._hasOverflow ? 'inline' : 'none'}; color: var(--color-accent-warning)">⚠</span>
          
          <button id="btn-toggle-vis" class="p-1 hover:bg-white/10 rounded transition-colors" style="margin-left: auto; background: transparent; border: none; cursor: pointer;">
            <ui-icon name="${el.visible !== false ? 'eye-off' : 'eye'}" 
              class="action-icon ${el.visible !== false ? 'active' : ''}" 
              style="--icon-size: 14px; opacity: ${el.visible !== false ? '1' : '0.3'};">
            </ui-icon>
          </button>
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
      if ((e.target as HTMLElement).closest('#btn-toggle-vis')) return;
      dispatchInspectorAction(this, { action: 'select', id });
    });

    // Toggle Visibilidade
    root.getElementById('btn-toggle-vis')?.addEventListener('click', (e) => {
      e.stopPropagation();
      dispatchInspectorAction(this, { action: 'toggle-vis', id });
    });

    if (this._selected) {
      const container = root.getElementById('sections-container')!;
      
      // Captura mudanças no campo Identification (name)
      container.addEventListener('app-input', (e: Event) => {
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

      // Delegar ações de rodapé (UP/DEL)
      container.addEventListener('click', (e) => {
        const btn = (e.target as HTMLElement).closest('[data-card-action]');
        if (btn) {
          const action = btn.getAttribute('data-card-action') as any;
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

    const transform = document.createElement('inspector-section-transform') as InspectorSection;
    transform.element = el;
    container.appendChild(transform);

    if (el.type === ElementType.TEXT) {
      const section = document.createElement('inspector-section-text') as InspectorSection;
      section.element = el;
      container.appendChild(section);
    } else if (el.type === ElementType.RECTANGLE) {
      const section = document.createElement('inspector-section-rect') as InspectorSection;
      section.element = el;
      container.appendChild(section);
    } else if (el.type === ElementType.IMAGE) {
      const section = document.createElement('inspector-section-image') as InspectorSection;
      section.element = el;
      container.appendChild(section);
    } else if (el.type === ElementType.BORDER) {
      const section = document.createElement('inspector-section-border') as InspectorSection;
      section.element = el;
      container.appendChild(section);
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

    const visIcon = this.shadowRoot.querySelector('#btn-toggle-vis ui-icon') as ActionIcon;
    if (visIcon) {
      visIcon.setAttribute('name', el.visible !== false ? 'eye-off' : 'eye');
      visIcon.style.opacity = el.visible !== false ? '1' : '0.3';
      visIcon.classList.toggle('active', el.visible !== false);
    }
    
    this.updateWarningTag();
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

    shadow.querySelectorAll<InspectorSection>('[element]').forEach(section => {
      section.element = el;
    });
  }
}

customElements.define('inspector-layer-card', InspectorLayerCard);
