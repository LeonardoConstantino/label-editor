import { sharedSheet } from '../../utils/shared-styles';
import { UISM } from '../../core/UISoundManager';

export interface SelectOption {
  value: string;
  label: string;
  sublabel?: string;
}

/**
 * AppSelect: Componente de seleção customizado com visual Tactile Prism.
 * Versão robusta com suporte a acessibilidade (teclado) e glassmorphism.
 */
export class AppSelect extends HTMLElement {
  private _options: SelectOption[] = [];
  private _value: string = '';
  private _label: string = '';
  private _isOpen: boolean = false;
  private _abortController: AbortController | null = null;

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
      this.updateSelectionVisuals();
    }
  }

  get value(): string {
    return this._value;
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  disconnectedCallback() {
    this._abortController?.abort();
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
        // Focus na opção selecionada ou na primeira
        const selected = this.shadowRoot?.querySelector('.select-option.selected') as HTMLElement;
        const first = this.shadowRoot?.querySelector('.select-option') as HTMLElement;
        (selected || first)?.focus();
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
    if (this._value !== val) {
      this._value = val;
      // Evento específico para o componente
      this.dispatchEvent(new CustomEvent('app-select', { 
        detail: { value: val },
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
    this.close();
    this.updateSelectionVisuals();
    UISM.play(UISM.enumPresets.TAP);
  }

  private setupListeners() {
    this._abortController = new AbortController();
    const { signal } = this._abortController;
    const root = this.shadowRoot!;

    root.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      
      const triggerClick = target.closest('.select-trigger');
      if (triggerClick) {
        e.stopPropagation();
        this.toggle();
        return;
      }

      const option = target.closest('.select-option');
      if (option) {
        const val = option.getAttribute('data-value');
        if (val !== null) {
          this.selectOption(val);
          (root.querySelector('.select-trigger') as HTMLElement)?.focus();
        }
      }
    }, { signal });

    // Keyboard handling
    root.addEventListener('keydown', (e: Event) => {
      const ke = e as KeyboardEvent;
      const target = e.target as HTMLElement;
      const trigger = root.querySelector('.select-trigger') as HTMLElement;
      const isTrigger = target.classList.contains('select-trigger');
      const isOption = target.classList.contains('select-option');

      if (isTrigger) {
        if (ke.key === 'Enter' || ke.key === ' ') {
          ke.preventDefault();
          this.toggle();
        }
        if (ke.key === 'ArrowDown' && !this._isOpen) {
          ke.preventDefault();
          this.toggle();
        }
      }

      if (isOption) {
        if (ke.key === 'Enter' || ke.key === ' ') {
          ke.preventDefault();
          const val = target.getAttribute('data-value');
          if (val) this.selectOption(val);
          trigger.focus();
        }

        if (ke.key === 'ArrowDown') {
          ke.preventDefault();
          const next = target.nextElementSibling as HTMLElement;
          if (next) next.focus();
        }

        if (ke.key === 'ArrowUp') {
          ke.preventDefault();
          const prev = target.previousElementSibling as HTMLElement;
          if (prev) prev.focus();
          else {
            this.close();
            trigger.focus();
          }
        }
      }

      if (ke.key === 'Escape' && this._isOpen) {
        this.close();
        trigger.focus();
      }
    }, { signal });

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
    
    const selectedOption = this._options.find(o => o.value === this._value);
    const labelSpan = shadow.querySelector('.select-trigger span');
    if (labelSpan) labelSpan.textContent = selectedOption ? selectedOption.label : 'Select...';
    
    shadow.querySelectorAll('.select-option').forEach(opt => {
      opt.classList.toggle('selected', opt.getAttribute('data-value') === this._value);
      opt.setAttribute('aria-selected', (opt.getAttribute('data-value') === this._value).toString());
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
          font-family: var(--font-mono); font-size: 10px; color: var(--color-text-muted);
          text-transform: uppercase; margin-bottom: 4px; display: block;
        }

        .select-trigger {
          background: var(--color-surface-elevated); border: 1px solid var(--color-border-ui);
          border-radius: 8px; padding: 6px 12px; color: var(--color-text-main);
          font-size: 11px; display: flex; align-items: center; justify-content: space-between;
          cursor: pointer; transition: all 0.2s var(--ease-spring); user-select: none;
          min-height: 32px; outline: none;
        }

        .select-trigger:hover, .select-trigger:focus-visible {
          border-color: var(--color-accent-primary); background: var(--color-surface-solid);
        }

        .select-trigger.open {
          border-color: var(--color-accent-primary);
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
        }

        .arrow { font-size: 8px; opacity: 0.5; transition: transform 0.3s; pointer-events: none; }
        .open .arrow { transform: rotate(180deg); }

        .select-dropdown {
          position: absolute; top: calc(100% + 4px); left: 0; width: 100%;
          min-width: 160px; background: #1a1d24; border: 1px solid var(--color-border-ui);
          border-radius: 8px; z-index: 50; max-height: 200px; overflow-y: auto;
          display: none; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
        }

        .select-option {
          padding: 8px 12px; font-size: 11px; cursor: pointer; transition: all 0.15s;
          display: flex; flex-direction: column; gap: 2px; outline: none;
        }

        .select-option:hover, .select-option:focus-visible {
          background: var(--color-accent-primary); color: white;
        }

        .select-option.selected {
          color: var(--color-accent-primary); font-weight: 600;
          background: rgba(99, 102, 241, 0.1);
        }

        .select-option.selected:hover, .select-option.selected:focus-visible { color: white; background: var(--color-accent-primary); }

        .sublabel { font-size: 9px; opacity: 0.6; pointer-events: none; }

        .select-dropdown::-webkit-scrollbar { width: 4px; }
        .select-dropdown::-webkit-scrollbar-thumb { background: var(--color-border-ui); border-radius: 2px; }
      </style>

      ${this._label ? `<span class="select-label">${this._label}</span>` : ''}
      
      <div class="select-trigger" tabindex="0" role="combobox" aria-expanded="false" aria-haspopup="listbox">
        <span>${displayLabel}</span>
        <span class="arrow">▼</span>
      </div>

      <div class="select-dropdown" role="listbox">
        ${this._options.map(opt => `
          <div class="select-option ${opt.value === this._value ? 'selected' : ''}" 
               data-value="${opt.value}" 
               tabindex="-1" 
               role="option" 
               aria-selected="${opt.value === this._value}">
            <span class="label">${opt.label}</span>
            ${opt.sublabel ? `<span class="sublabel">${opt.sublabel}</span>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }
}

customElements.define('app-select', AppSelect);
