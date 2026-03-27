import eventBus from '../../core/EventBus';
import { store, AppState } from '../../core/Store';
import { AnyElement } from '../../domain/models/Label';

/**
 * ElementInspector: Painel lateral para editar propriedades do elemento selecionado.
 */
export class ElementInspector extends HTMLElement {
  private unsubscribe: (() => void) | null = null;
  private selectedElement: AnyElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.render();
    this.setupListeners();
  }

  disconnectedCallback(): void {
    if (this.unsubscribe) this.unsubscribe();
  }

  private setupListeners(): void {
    this.unsubscribe = eventBus.on('state:change', (state: AppState) => {
      const selectedId = state.selectedElementIds[0];
      const element = state.currentLabel?.elements.find(el => el.id === selectedId) || null;
      
      if (element !== this.selectedElement) {
        this.selectedElement = element;
        this.updateInspector();
      }
    });
  }

  private render(): void {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 16px;
          color: #f8fafc;
          font-size: 13px;
        }
        .header {
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-accent, #6366f1);
          margin-bottom: 20px;
          font-size: 11px;
        }
        .group {
          margin-bottom: 16px;
        }
        label {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 4px;
        }
        input {
          width: 100%;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid #262a33;
          color: white;
          padding: 6px;
          border-radius: 4px;
          box-sizing: border-box;
          outline: none;
        }
        input:focus {
          border-color: var(--color-accent, #6366f1);
        }
        .row {
          display: flex;
          gap: 8px;
        }
        .row > div {
          flex: 1;
        }
      </style>
      <div id="content">Selecione um elemento para editar</div>
    `;
  }

  private updateInspector(): void {
    const container = this.shadowRoot!.getElementById('content')!;
    
    if (!this.selectedElement) {
      container.innerHTML = 'Selecione um elemento para editar';
      return;
    }

    const el = this.selectedElement as any;
    
    container.innerHTML = `
      <div class="header">Propriedades do Elemento</div>
      
      <div class="group">
        <label>Posição (X, Y) mm</label>
        <div class="row">
          <input type="number" id="pos-x" value="${el.position.x}">
          <input type="number" id="pos-y" value="${el.position.y}">
        </div>
      </div>

      ${el.dimensions ? `
      <div class="group">
        <label>Dimensões (W, H) mm</label>
        <div class="row">
          <input type="number" id="dim-w" value="${el.dimensions.width}">
          <input type="number" id="dim-h" value="${el.dimensions.height}">
        </div>
      </div>
      ` : ''}

      ${el.content !== undefined ? `
      <div class="group">
        <label>Conteúdo</label>
        <input type="text" id="content-input" value="${el.content}">
      </div>
      ` : ''}

      ${el.color !== undefined || el.fillColor !== undefined ? `
      <div class="group">
        <label>Cor</label>
        <input type="color" id="color-input" value="${el.color || el.fillColor}">
      </div>
      ` : ''}
    `;

    this.attachInputEvents();
  }

  private attachInputEvents(): void {
    const shadow = this.shadowRoot!;
    const elId = this.selectedElement!.id;

    const update = (updates: any) => {
      eventBus.emit('element:update', { id: elId, updates });
    };

    shadow.getElementById('pos-x')?.addEventListener('input', (e: any) => 
      update({ position: { ...this.selectedElement!.position, x: Number(e.target.value) } })
    );
    shadow.getElementById('pos-y')?.addEventListener('input', (e: any) => 
      update({ position: { ...this.selectedElement!.position, y: Number(e.target.value) } })
    );
    shadow.getElementById('dim-w')?.addEventListener('input', (e: any) => 
      update({ dimensions: { ...(this.selectedElement as any).dimensions, width: Number(e.target.value) } })
    );
    shadow.getElementById('dim-h')?.addEventListener('input', (e: any) => 
      update({ dimensions: { ...(this.selectedElement as any).dimensions, height: Number(e.target.value) } })
    );
    shadow.getElementById('content-input')?.addEventListener('input', (e: any) => 
      update({ content: e.target.value })
    );
    shadow.getElementById('color-input')?.addEventListener('input', (e: any) => {
      const field = (this.selectedElement as any).color !== undefined ? 'color' : 'fillColor';
      update({ [field]: e.target.value });
    });
  }
}

customElements.define('element-inspector', ElementInspector);
