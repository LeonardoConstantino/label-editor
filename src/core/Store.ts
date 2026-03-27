import { Label, AnyElement } from '../domain/models/Label';
import eventBus from './EventBus';

export interface AppState {
  currentLabel: Label | null;
  selectedElementIds: string[];
  clipboard: AnyElement[];
  history: Label[];
  historyIndex: number;
}

export class Store {
  private state: AppState;

  constructor() {
    this.state = {
      currentLabel: null,
      selectedElementIds: [],
      clipboard: [],
      history: [],
      historyIndex: -1
    };

    this.registerEvents();
  }

  private registerEvents(): void {
    // Adição de elemento
    eventBus.on('element:add', (element: AnyElement) => {
      if (!this.state.currentLabel) return;
      this.state.currentLabel.elements.push(element);
      this.pushHistory();
      this.emit();
    });

    // Atualização de elemento
    eventBus.on('element:update', ({ id, updates }: { id: string; updates: Partial<AnyElement> }) => {
      if (!this.state.currentLabel) return;
      const index = this.state.currentLabel.elements.findIndex(el => el.id === id);
      if (index !== -1) {
        this.state.currentLabel.elements[index] = {
          ...this.state.currentLabel.elements[index],
          ...updates
        };
        this.pushHistory();
        this.emit();
      }
    });

    // Remoção de elemento
    eventBus.on('element:delete', (id: string) => {
      if (!this.state.currentLabel) return;
      this.state.currentLabel.elements = this.state.currentLabel.elements.filter(el => el.id !== id);
      this.state.selectedElementIds = this.state.selectedElementIds.filter(elId => elId !== id);
      this.pushHistory();
      this.emit();
    });

    // Seleção de elemento
    eventBus.on('element:select', (ids: string | string[]) => {
      this.state.selectedElementIds = Array.isArray(ids) ? ids : [ids];
      this.emit();
    });

    // Comandos de Histórico
    eventBus.on('history:undo', () => this.undo());
    eventBus.on('history:redo', () => this.redo());
  }

  private pushHistory(): void {
    if (!this.state.currentLabel) return;
    
    const snapshot = JSON.parse(JSON.stringify(this.state.currentLabel));
    
    // Remove o histórico futuro se houve uma nova ação após um undo
    this.state.history = this.state.history.slice(0, this.state.historyIndex + 1);
    this.state.history.push(snapshot);
    
    // Limita o histórico (ex: 50 estados)
    if (this.state.history.length > 50) {
      this.state.history.shift();
    } else {
      this.state.historyIndex++;
    }
  }

  private emit(): void {
    eventBus.emit('state:change', this.getState());
  }

  public getState(): Readonly<AppState> {
    return Object.freeze(JSON.parse(JSON.stringify(this.state)));
  }

  public loadLabel(label: Label): void {
    this.state.currentLabel = label;
    this.state.history = [JSON.parse(JSON.stringify(label))];
    this.state.historyIndex = 0;
    this.state.selectedElementIds = [];
    this.emit();
  }

  public undo(): void {
    if (this.state.historyIndex > 0) {
      this.state.historyIndex--;
      this.state.currentLabel = JSON.parse(JSON.stringify(this.state.history[this.state.historyIndex]));
      this.emit();
    }
  }

  public redo(): void {
    if (this.state.historyIndex < this.state.history.length - 1) {
      this.state.historyIndex++;
      this.state.currentLabel = JSON.parse(JSON.stringify(this.state.history[this.state.historyIndex]));
      this.emit();
    }
  }
}

// Exporta uma instância única (Singleton)
export const store = new Store();
