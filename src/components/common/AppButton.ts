import { UISM } from '../../core/UISoundManager';

/**
 * AppButton: Botão tátil seguindo o Design System Tactile Prism.
 */
export class AppButton extends HTMLElement {
  private button: HTMLButtonElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.button = document.createElement('button');
  }

  static get observedAttributes() {
    return ['variant', 'disabled'];
  }

  connectedCallback(): void {
    this.render();
    this.setupEvents();
  }

  attributeChangedCallback(): void {
    this.render();
  }

  private setupEvents(): void {
    this.button.addEventListener('click', () => {
      if (this.hasAttribute('disabled')) return;
      UISM.play(UISM.enumPresets.TAP);
    });
  }

  private render(): void {
    if (!this.shadowRoot) return;

    const variant = this.getAttribute('variant') || 'secondary';
    const isDisabled = this.hasAttribute('disabled');

    this.shadowRoot.innerHTML = `
      <style>
        @import "/src/styles/main.css";

        :host {
          display: inline-block;
        }

        button {
          width: 100%;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          filter: grayscale(1);
        }
      </style>
    `;

    this.button.className = `btn-prism btn-${variant}`;
    this.button.disabled = isDisabled;
    this.button.innerHTML = `<slot></slot>`;
    
    this.shadowRoot.appendChild(this.button);
  }
}

customElements.define('app-button', AppButton);
