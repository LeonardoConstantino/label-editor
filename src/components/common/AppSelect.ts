import { sharedSheet } from '../../utils/shared-styles';

export interface SelectOption {
  value: string;
  label: string;
  sublabel?: string;
}

/**
 * AppSelect: Componente de seleção customizado com visual Tactile Prism.
 * Versão robusta usando posicionamento absoluto e z-index controlado pelo pai.
 */
export class AppSelect extends HTMLElement {
  private _options: SelectOption[] = [];
  private _value: string = '';
  private _label: string = '';
  private _isOpen: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  static get observedAttributes() {
    return ['value', 'label'];
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'value') {
      this._value = newValue;
      this.updateSelectionVisuals();
    }
    if (name === 'label') {
      this._label = newValue;
      this.render();
    }
  }

  set options(opts: SelectOption[]) {
    this._options = opts;
    this.render();
  }

  get options(): SelectOption[] {
    return this._options;
  }

  set value(val: string) {
    if (this._value !== val) {
      this._value = val;
      this.render();
    }
  }

  get value(): string {
    return this._value;
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  private toggle() {
    this._isOpen = !this._isOpen;
    const dropdown = this.shadowRoot?.querySelector('.select-dropdown') as HTMLElement;
    const trigger = this.shadowRoot?.querySelector('.select-trigger') as HTMLElement;
    
    if (dropdown && trigger) {
      dropdown.style.display = this._isOpen ? 'block' : 'none';
      trigger.classList.toggle('open', this._isOpen);
      
      if (this._isOpen) {
        this.dispatchEvent(new CustomEvent('ui-select:open', { bubbles: true, composed: true }));
      } else {
        this.dispatchEvent(new CustomEvent('ui-select:close', { bubbles: true, composed: true }));
      }
    }
  }

  private close() {
    if (this._isOpen) {
      this._isOpen = false;
      const dropdown = this.shadowRoot?.querySelector('.select-dropdown') as HTMLElement;
      const trigger = this.shadowRoot?.querySelector('.select-trigger') as HTMLElement;
      if (dropdown) dropdown.style.display = 'none';
      if (trigger) trigger.classList.remove('open');
      this.dispatchEvent(new CustomEvent('ui-select:close', { bubbles: true, composed: true }));
    }
  }

  private selectOption(val: string) {
    this._value = val;
    this.close();
    this.render(); // Redesenha para atualizar o label do trigger
    
    // Evento específico para o componente
    this.dispatchEvent(new CustomEvent('app-select', { 
      detail: val,
      bubbles: true, 
      composed: true 
    }));
    
    // Evento padrão de mudança para o orquestrador
    this.dispatchEvent(new CustomEvent('change', { 
      detail: { value: val },
      bubbles: true,
      composed: true
    }));
  }

  private setupListeners() {
    this.shadowRoot?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      
      const trigger = target.closest('.select-trigger');
      if (trigger) {
        e.stopPropagation();
        this.toggle();
        return;
      }

      const option = target.closest('.select-option');
      if (option) {
        const val = option.getAttribute('data-value');
        if (val !== null) {
          this.selectOption(val);
        }
      }
    });

    // Fechar ao clicar fora (no documento)
    const handleOutsideClick = (e: MouseEvent) => {
      if (!this.contains(e.target as Node)) {
        this.close();
      }
    };
    document.addEventListener('click', handleOutsideClick);
  }

  private updateSelectionVisuals() {
    const shadow = this.shadowRoot;
    if (!shadow) return;
    
    // Atualiza o label do trigger sem re-renderizar tudo se possível
    const selectedOption = this._options.find(o => o.value === this._value);
    const labelSpan = shadow.querySelector('.select-trigger span');
    if (labelSpan) labelSpan.textContent = selectedOption ? selectedOption.label : 'Select...';
    
    // Atualiza classes das opções
    shadow.querySelectorAll('.select-option').forEach(opt => {
      opt.classList.toggle('selected', opt.getAttribute('data-value') === this._value);
    });
  }

  private render() {
    if (!this.shadowRoot) return;

    const selectedOption = this._options.find(o => o.value === this._value);
    const displayLabel = selectedOption ? selectedOption.label : 'Select...';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; position: relative; font-family: var(--font-sans); }
        
        .select-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--color-text-muted);
          text-transform: uppercase;
          margin-bottom: 4px;
          display: block;
        }

        .select-trigger {
          background: var(--color-surface-elevated);
          border: 1px solid var(--color-border-ui);
          border-radius: 8px;
          padding: 6px 12px;
          color: var(--color-text-main);
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.2s var(--ease-spring);
          user-select: none;
          min-height: 32px;
        }

        .select-trigger:hover {
          border-color: var(--color-accent-primary);
          background: var(--color-surface-solid);
        }

        .select-trigger.open {
          border-color: var(--color-accent-primary);
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
        }

        .arrow { font-size: 8px; opacity: 0.5; transition: transform 0.3s; }
        .open .arrow { transform: rotate(180deg); }

        .select-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          width: 100%;
          min-width: 160px;
          background: #1a1d24; /* Solid para evitar problemas de transparência em camadas */
          border: 1px solid var(--color-border-ui);
          border-radius: 8px;
          z-index: 10000;
          max-height: 200px;
          overflow-y: auto;
          display: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
        }

        .select-option {
          padding: 8px 12px;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .select-option:hover {
          background: var(--color-accent-primary);
          color: white;
        }

        .select-option.selected {
          color: var(--color-accent-primary);
          font-weight: 600;
          background: rgba(99, 102, 241, 0.1);
        }

        .select-option.selected:hover { color: white; background: var(--color-accent-primary); }

        .sublabel { font-size: 9px; opacity: 0.6; }

        .select-dropdown::-webkit-scrollbar { width: 4px; }
        .select-dropdown::-webkit-scrollbar-thumb { background: var(--color-border-ui); border-radius: 2px; }
      </style>

      ${this._label ? `<span class="select-label">${this._label}</span>` : ''}
      
      <div class="select-trigger">
        <span>${displayLabel}</span>
        <span class="arrow">▼</span>
      </div>

      <div class="select-dropdown">
        ${this._options.map(opt => `
          <div class="select-option ${opt.value === this._value ? 'selected' : ''}" data-value="${opt.value}">
            <span class="label">${opt.label}</span>
            ${opt.sublabel ? `<span class="sublabel">${opt.sublabel}</span>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }
}

customElements.define('app-select', AppSelect);
