/**
 * ui-number-scrubber
 * Um input numérico de alta precisão com suporte a "scrubbing" (clique e arraste),
 * expressões matemáticas e modificadores de precisão (Shift/Alt).
 *
 * @attr {string} label - Rótulo curto (ex: X, Y, W)
 * @attr {string} value - Valor inicial
 * @attr {string} min - Valor mínimo
 * @attr {string} max - Valor máximo
 * @attr {string} step - Passo padrão (default: 1)
 * @attr {string} unit - Unidade (ex: mm, px)
 * @attr {string} property - Nome da propriedade para o evento change
 *
 * @event input - Disparado continuamente durante o arraste
 * @event change - Disparado ao finalizar o arraste ou confirmar com Enter
 *
 * @csspart wrapper - O container principal
 * @csspart input - O elemento de entrada de texto
 * @csspart label - A área de arraste
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
  #sensitivity = 5; // 5px por unidade

  static observedAttributes = ['value', 'min', 'max', 'step', 'label', 'unit'];

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: 'open' });
  }

  // --- API Pública ---

  get value(): number {
    return parseFloat(this.#input.value) || 0;
  }

  set value(v: number | string) {
    const num = typeof v === 'string' ? parseFloat(v) : v;
    this.#updateValue(num, false);
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

  // --- Lifecycle ---

  connectedCallback() {
    this.#render();
    this.#setupEventListeners();
    this.#updateProgress();
  }

  disconnectedCallback() {
    this.#controller?.abort();
  }

  attributeChangedCallback(name: string, _old: string, newVal: string) {
    if (!this.#input) return;

    if (name === 'value') this.#updateValue(parseFloat(newVal), false);
    if (name === 'label')
      this.#shadow.querySelector('.label-text')!.textContent = newVal;
    if (name === 'unit')
      this.#shadow.querySelector('.scrubber-unit')!.textContent = newVal;
  }

  // --- Lógica de Negócio ---

  #setupEventListeners() {
    this.#controller = new AbortController();
    const { signal } = this.#controller;

    const label = this.#shadow.querySelector('.scrubber-label') as HTMLElement;
    this.#input = this.#shadow.querySelector(
      '.scrubber-input',
    ) as HTMLInputElement;
    this.#wrapper = this.#shadow.querySelector(
      '.scrubber-wrapper',
    ) as HTMLDivElement;

    // 1. Scrubbing (Pointer Events)
    label.addEventListener('pointerdown', (e) => this.#onPointerDown(e), {
      signal,
    });

    // 2. Keyboard Navigation
    this.#input.addEventListener('keydown', (e) => this.#onKeyDown(e), {
      signal,
    });

    // 3. Manual Input Blur (Finalize)
    this.#input.addEventListener('blur', () => this.#finalizeChange(), {
      signal,
    });
  }

  #onPointerDown(e: PointerEvent) {
    // 1. Capture a referência IMEDIATAMENTE aqui
    const target = e.currentTarget as HTMLElement;

    this.#isDragging = true;
    this.#startX = e.clientX;
    this.#startValue = this.value;

    this.#wrapper.classList.add('is-scrubbing');
    this.#input.style.cursor = 'ew-resize';

    // 2. Use a constante 'target' ao invés de 'e.currentTarget'
    target.setPointerCapture(e.pointerId);

    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!this.#isDragging) return;
      const deltaX = moveEvent.clientX - this.#startX;
      let multiplier = moveEvent.shiftKey ? 10 : moveEvent.altKey ? 0.1 : 1;
      const change = (deltaX / this.#sensitivity) * this.step * multiplier;
      this.#updateValue(this.#startValue + change, true);
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      this.#isDragging = false;
      this.#wrapper.classList.remove('is-scrubbing');
      this.#input.style.cursor = 'text';
      document.body.style.cursor = '';
      document.body.style.userSelect = '';

      // 3. CORREÇÃO DO ERRO: Use a constante 'target' capturada no fechamento (closure)
      if (target.hasPointerCapture(upEvent.pointerId)) {
        target.releasePointerCapture(upEvent.pointerId);
      }

      this.#finalizeChange();

      // Remova os listeners temporários usando a referência correta
      target.removeEventListener('pointermove', onPointerMove);
      target.removeEventListener('pointerup', onPointerUp);
    };

    target.addEventListener('pointermove', onPointerMove);
    target.addEventListener('pointerup', onPointerUp);
  }

  #onKeyDown(e: KeyboardEvent) {
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
    } else if (e.key === 'Escape') {
      this.#input.value = this.getAttribute('value') || '0';
      this.#input.blur();
    } else if (e.key === 'Home') {
      this.#updateValue(this.min !== -Infinity ? this.min : 0, true);
    } else if (e.key === 'End') {
      this.#updateValue(this.max !== Infinity ? this.max : 100, true);
    }
  }

  #updateValue(rawVal: number, isInteractive: boolean) {
    // Clamping (Respeitar limites)
    let val = Math.min(Math.max(rawVal, this.min), this.max);

    // Precisão: Se for Alt (0.1), permite 1 casa, senão segue o step
    const precision = this.getAttribute('step')?.includes('.')
      ? 2
      : val % 1 === 0
        ? 0
        : 2;
    const formattedVal = val.toFixed(precision);

    this.#input.value = formattedVal;
    this.#updateProgress();

    if (isInteractive) {
      this.dispatchEvent(
        new CustomEvent('input', {
          detail: {
            value: parseFloat(formattedVal),
            property: this.getAttribute('property'),
          },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  #finalizeChange() {
    // Parser Matemático antes de finalizar
    const expression = this.#input.value.replace(',', '.');
    try {
      // Safe Math Evaluation (Basic arithmetic)
      // Sanitização: permite apenas números, operadores e parênteses
      if (/[^-+*/().0-9 ]/g.test(expression) === false) {
        const result = new Function(`return (${expression})`)();
        this.#updateValue(result, false);
      }
    } catch (e) {
      this.#updateValue(this.value, false); // Reverte se falhar
    }

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value, property: this.getAttribute('property') },
        bubbles: true,
        composed: true,
      }),
    );
  }

  #updateProgress() {
    if (this.min === -Infinity || this.max === Infinity) return;
    const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.style.setProperty(
      '--progress',
      `${Math.max(0, Math.min(100, percentage))}%`,
    );
  }

  #render() {
    const label = this.getAttribute('label') || '';
    const value = this.getAttribute('value') || '0';
    const unit = this.getAttribute('unit') || '';

    this.#shadow.innerHTML = `
      <style>
        ${this.#getCSS()}
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

  #getCSS() {
    return `
      :host {
        display: block;
        width: 100%;
        --progress: 0%;
        --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .scrubber-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        height: 32px;
        background-color: var(--color-canvas, #0f1115);
        border: 1px solid var(--color-border-ui, #262a33);
        border-radius: 6px;
        overflow: hidden;
        transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s var(--ease-spring);
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
      .scrubber-wrapper:hover { border-color: rgba(255, 255, 255, 0.2); }
      .scrubber-wrapper:focus-within {
        border-color: var(--color-accent-primary, #6366f1);
        box-shadow: 0 0 12px rgba(99, 102, 241, 0.25);
      }
      .scrubber-wrapper.is-scrubbing {
        border-color: var(--color-accent-primary, #6366f1);
        opacity: 0.8;
        transform: scale(0.98);
      }
      .scrubber-label {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.03);
        border-right: 1px solid var(--color-border-ui, #262a33);
        color: var(--color-text-muted, #94a3b8);
        font-family: var(--font-mono, monospace);
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
        color: var(--color-text-main, #ffffff);
        font-family: var(--font-mono, monospace);
        font-size: 11px;
        text-align: right;
        padding-right: 4px;
      }
      .scrubber-unit {
        position: relative;
        z-index: 1;
        color: rgba(148, 163, 184, 0.4);
        font-family: var(--font-mono, monospace);
        font-size: 9px;
        padding-right: 8px;
        pointer-events: none;
      }
    `;
  }
}

customElements.define('ui-number-scrubber', UINumberScrubber);
