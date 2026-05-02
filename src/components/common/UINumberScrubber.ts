import { UISM } from '../../core/UISoundManager';
import { sharedSheet } from '../../utils/shared-styles';

/**
 * ui-number-scrubber
 * Um input numérico de alta precisão com suporte a "scrubbing" (clique e arraste),
 * expressões matemáticas e modificadores de precisão (Shift/Alt).
 */
export class UINumberScrubber extends HTMLElement {
  #shadow: ShadowRoot;
  #input!: HTMLInputElement;
  #wrapper!: HTMLDivElement;
  #controller: AbortController | null = null;

  // Estado de Arraste
  #isDragging = false;
  #startX = 0;
  #startValue = 0;
  #sensitivity = 5;
  #initialValue: number = 0;

  static observedAttributes = ['value', 'min', 'max', 'step', 'label', 'unit', 'disabled'];

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: 'open' });
    this.#shadow.adoptedStyleSheets = [sharedSheet];
  }

  get value(): number {
    if (!this.#input) return this.#initialValue;
    return parseFloat(this.#input.value) || 0;
  }

  set value(v: number | string) {
    const num = typeof v === 'string' ? parseFloat(v) : v;
    this.#initialValue = num;
    if (this.#input) {
      this.#updateValue(num, false);
    }
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  set disabled(val: boolean) {
    if (val) this.setAttribute('disabled', '');
    else this.removeAttribute('disabled');
  }

  get min(): number {
    return parseFloat(this.getAttribute('min') || '-Infinity');
  }
  get max(): number {
    return parseFloat(this.getAttribute('max') || 'Infinity');
  }
  get step(): number {
    return parseFloat(this.getAttribute('step') || '1');
  }

  connectedCallback() {
    this.#render();
    this.#setupEventListeners();
    this.#updateProgress();
    this.#syncDisabled();
  }

  disconnectedCallback() {
    this.#controller?.abort();
  }

  attributeChangedCallback(name: string, _old: string, newVal: string) {
    if (!this.#input) return;
    if (name === 'value') this.#updateValue(parseFloat(newVal), false);
    if (name === 'label') this.#shadow.querySelector('.label-text')!.textContent = newVal;
    if (name === 'unit') this.#shadow.querySelector('.scrubber-unit')!.textContent = newVal;
    if (name === 'disabled') this.#syncDisabled();
  }

  #syncDisabled() {
    if (!this.#input) return;
    const isDisabled = this.disabled;
    this.#input.disabled = isDisabled;
    this.#wrapper.classList.toggle('is-disabled', isDisabled);
  }

  #setupEventListeners() {
    this.#controller = new AbortController();
    const { signal } = this.#controller;

    const label = this.#shadow.querySelector('.scrubber-label') as HTMLElement;
    this.#input = this.#shadow.querySelector('.scrubber-input') as HTMLInputElement;
    this.#wrapper = this.#shadow.querySelector('.scrubber-wrapper') as HTMLDivElement;

    label.addEventListener('pointerdown', (e) => this.#onPointerDown(e), { signal });
    this.#input.addEventListener('keydown', (e) => this.#onKeyDown(e), { signal });
    this.#input.addEventListener('input', () => UISM.play(UISM.enumPresets.TAP), { signal });
    this.#input.addEventListener('blur', () => this.#finalizeChange(), { signal });
  }

  #onPointerDown(e: PointerEvent) {
    if (this.disabled) return;
    const target = e.currentTarget as HTMLElement;
    this.#isDragging = true;
    this.#startX = e.clientX;
    this.#startValue = this.value;

    this.#wrapper.classList.add('is-scrubbing');
    this.#input.style.cursor = 'ew-resize';
    target.setPointerCapture(e.pointerId);

    UISM.play(UISM.enumPresets.TAP);

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!this.#isDragging) return;
      const deltaX = moveEvent.clientX - this.#startX;
      let multiplier = moveEvent.shiftKey ? 10 : moveEvent.altKey ? 0.1 : 1;
      const change = (deltaX / this.#sensitivity) * this.step * multiplier;
      const newVal = this.#startValue + change;
      
      if (Math.abs(newVal - this.value) >= this.step) {
        UISM.play(UISM.enumPresets.TAP);
      }
      
      this.#updateValue(newVal, true);
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      this.#isDragging = false;
      this.#wrapper.classList.remove('is-scrubbing');
      this.#input.style.cursor = 'text';
      if (target.hasPointerCapture(upEvent.pointerId)) {
        target.releasePointerCapture(upEvent.pointerId);
      }
      this.#finalizeChange();
      target.removeEventListener('pointermove', onPointerMove);
      target.removeEventListener('pointerup', onPointerUp);
    };

    target.addEventListener('pointermove', onPointerMove);
    target.addEventListener('pointerup', onPointerUp);
  }

  #onKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;
    let multiplier = 1;
    if (e.shiftKey) multiplier = 10;
    if (e.altKey) multiplier = 0.1;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.#updateValue(this.value + this.step * multiplier, true);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.#updateValue(this.value - this.step * multiplier, true);
    } else if (e.key === 'Enter') {
      this.#input.blur();
    }
  }

  #updateValue(rawVal: number, isInteractive: boolean) {
    let val = Math.min(Math.max(rawVal, this.min), this.max);
    const precision = this.getAttribute('step')?.includes('.') ? 2 : val % 1 === 0 ? 0 : 2;
    const formattedVal = val.toFixed(precision);

    if (this.#input.value !== formattedVal) {
      this.#input.value = formattedVal;
      this.#updateProgress();

      if (isInteractive) {
        this.dispatchEvent(new CustomEvent('input', {
          detail: { value: parseFloat(formattedVal), property: this.getAttribute('property') },
          bubbles: true, composed: true
        }));
      }
    }
  }

  #finalizeChange() {
    const expression = this.#input.value.replace(',', '.');
    try {
      if (/[^-+*/().0-9 ]/g.test(expression) === false) {
        const result = new Function(`return (${expression})`)();
        this.#updateValue(result, false);
      }
    } catch (e) {
      this.#updateValue(this.value, false);
    }

    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value, property: this.getAttribute('property') },
      bubbles: true, composed: true
    }));
  }

  #updateProgress() {
    if (this.min === -Infinity || this.max === Infinity) return;
    const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.style.setProperty('--progress', `${Math.max(0, Math.min(100, percentage))}%`);
  }

  #render() {
    const label = this.getAttribute('label') || '';
    const value = this.getAttribute('value') || '0';
    const unit = this.getAttribute('unit') || '';

    this.#shadow.innerHTML = `
      <style>
        :host { display: block; width: 100%; --progress: 0%; }
        
        .scrubber-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          height: 32px;
          background-color: var(--color-surface-solid);
          border: 1px solid var(--color-border-ui);
          border-radius: 6px;
          overflow: hidden;
          transition: all 0.2s var(--ease-spring);
        }

        .scrubber-wrapper.is-disabled {
          opacity: 0.5;
          cursor: not-allowed;
          filter: grayscale(1);
          pointer-events: none;
        }
        
        .scrubber-wrapper::before {
          content: '';
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: var(--progress);
          background: linear-gradient(90deg, rgba(99,102,241,0.05) 0%, rgba(99,102,241,0.15) 100%);
          pointer-events: none;
          border-right: 1px solid rgba(99,102,241,0.3);
          z-index: 0;
        }

        .scrubber-wrapper:not(.is-disabled):hover { border-color: rgba(255, 255, 255, 0.2); }
        
        .scrubber-wrapper:focus-within:not(.is-disabled) {
          border-color: var(--color-accent-primary);
          box-shadow: var(--shadow-neon-primary);
        }

        .scrubber-wrapper.is-scrubbing {
          border-color: var(--color-accent-primary);
          transform: scale(0.98);
          background: rgba(99, 102, 241, 0.05);
        }

        .scrubber-label {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 100%;
          background: rgba(255, 255, 255, 0.03);
          border-right: 1px solid var(--color-border-ui);
          color: var(--color-text-muted);
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: bold;
          cursor: ew-resize;
          user-select: none;
        }

        .scrubber-input {
          position: relative;
          z-index: 1;
          flex: 1;
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: var(--color-text-main);
          font-family: var(--font-mono);
          font-size: 11px;
          text-align: right;
          padding-right: 4px;
        }

        .scrubber-unit {
          position: relative;
          z-index: 1;
          color: rgba(148, 163, 184, 0.4);
          font-family: var(--font-mono);
          font-size: 9px;
          padding-right: 8px;
          pointer-events: none;
        }
      </style>
      <div class="scrubber-wrapper" part="wrapper">
        <div class="scrubber-label" part="label">
          <span class="label-text">${label}</span>
        </div>
        <input type="text" class="scrubber-input" part="input" value="${value}" spellcheck="false" autocomplete="off" />
        <span class="scrubber-unit">${unit}</span>
      </div>
    `;
  }
}

customElements.define('ui-number-scrubber', UINumberScrubber);
