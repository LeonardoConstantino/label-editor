/**
 * AppInput: Campo de entrada técnico com label integrada.
 * Otimizado para manter o foco durante atualizações.
 */
export class AppInput extends HTMLElement {
  private input: HTMLInputElement;
  private labelElement: HTMLElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // Cria os elementos uma única vez
    this.labelElement = document.createElement('label');
    this.labelElement.className = 'label-prism';
    
    this.input = document.createElement('input');
    this.input.className = 'input-prism';
  }

  static get observedAttributes() {
    return ['label', 'type', 'value', 'placeholder'];
  }

  connectedCallback(): void {
    this.setupBaseStyles();
    this.render();
    this.setupEvents();
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string): void {
    if (oldVal === newVal) return;
    this.updateValues();
  }

  private setupBaseStyles(): void {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <style>
        @import "/src/styles/main.css";
        :host {
          display: block;
          margin-bottom: 12px;
          width: 100%;
        }
      </style>
    `;
    this.shadowRoot.appendChild(this.labelElement);
    this.shadowRoot.appendChild(this.input);
  }

  private render(): void {
    this.updateValues();
  }

  private updateValues(): void {
    const label = this.getAttribute('label') || '';
    const type = this.getAttribute('type') || 'text';
    const value = this.getAttribute('value') || '';
    const placeholder = this.getAttribute('placeholder') || '';

    this.labelElement.textContent = label;
    this.input.type = type;
    this.input.placeholder = placeholder;
    
    // Crucial: Só atualiza o value se ele for realmente diferente do que o usuário digitou
    // para não quebrar o cursor durante a digitação.
    if (this.input.value !== value) {
      this.input.value = value;
    }
  }

  private setupEvents(): void {
    this.input.addEventListener('input', (e: any) => {
      this.dispatchEvent(new CustomEvent('app-input', {
        detail: e.target.value,
        bubbles: true,
        composed: true
      }));
    });
  }
}

customElements.define('app-input', AppInput);
