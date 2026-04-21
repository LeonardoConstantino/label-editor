import { Label, AnyElement } from '../domain/models/Label';
import { UserPreferences, DEFAULT_PREFERENCES } from '../domain/models/UserPreferences';
import eventBus from './EventBus';
import { historyManager, HistorySnapshot } from '../domain/services/HistoryManager';
import { UISM } from './UISoundManager';
import { overflowValidator } from '../domain/services/OverflowValidator';
import { elementValidator } from '../domain/validators/ElementValidator';
import { DEFAULTS } from '../constants/defaults';

export interface AppState {
  currentLabel: Label | null;
  selectedElementIds: string[];
  clipboard: AnyElement[];
  canUndo: boolean;
  canRedo: boolean;
  preferences: UserPreferences;
}

export class Store {
  private state: AppState;

  constructor() {
    this.state = {
      currentLabel: null,
      selectedElementIds: [],
      clipboard: [],
      canUndo: false,
      canRedo: false,
      preferences: DEFAULT_PREFERENCES
    };

    this.registerEvents();
  }

  private registerEvents(): void {
    eventBus.on('element:add', (element: AnyElement) => {
      const validation = elementValidator.validate(element);
      if (!validation.isValid) {
        eventBus.emit('notify', { type: 'error', message: validation.errors[0] });
        UISM.play(UISM.enumPresets.WARNING);
        return;
      }

      this.performAction(() => {
        if (!this.state.currentLabel) return;
        this.state.currentLabel.elements.push(element);
        UISM.play(UISM.enumPresets.SWOOSHIN);
      });
    });

    eventBus.on('element:update', ({ id, updates }: { id: string; updates: any }) => {
      if (!this.state.currentLabel) return;
      const index = this.state.currentLabel.elements.findIndex(el => el.id === id);
      if (index === -1) return;

      const current = this.state.currentLabel.elements[index];
      const newElement = this.mergeUpdates(current, updates);

      const validation = elementValidator.validate(newElement);
      if (!validation.isValid) {
        eventBus.emit('notify', { type: 'error', message: validation.errors[0] });
        UISM.play(UISM.enumPresets.WARNING);
        return;
      }

      this.performAction(() => {
        this.state.currentLabel!.elements[index] = newElement;

        const result = overflowValidator.check(newElement, this.state.currentLabel!.config);
        if (result.overflow) {
          eventBus.emit('element:warning', { id, result });
          UISM.play(UISM.enumPresets.WARNING);
        } else {
          eventBus.emit('element:warning:clear', { id });
        }
      });
    });

    eventBus.on('element:reorder', ({ id, direction }: { id: string, direction: 'up' | 'down' }) => {
      this.performAction(() => {
        if (!this.state.currentLabel) return;
        const el = this.state.currentLabel.elements.find(e => e.id === id);
        if (!el) return;
        el.zIndex += (direction === 'up' ? 1 : -1);
        UISM.play(UISM.enumPresets.SWOOSHIN);
      });
    });

    eventBus.on('element:delete', (id: string) => {
      this.performAction(() => {
        if (!this.state.currentLabel) return;
        this.state.currentLabel.elements = this.state.currentLabel.elements.filter(el => id !== el.id);
        this.state.selectedElementIds = this.state.selectedElementIds.filter(elId => elId !== id);
        UISM.play(UISM.enumPresets.DELETE);
      });
    });

    eventBus.on('element:duplicate', (id: string) => {
      this.performAction(() => {
        if (!this.state.currentLabel) return;
        const original = this.state.currentLabel.elements.find(el => el.id === id);
        if (!original) return;

        const copy = JSON.parse(JSON.stringify(original));
        copy.id = crypto.randomUUID();
        copy.name = `${original.name || original.type} (Copy)`;
        copy.position.x += 5; // Offset visual
        copy.position.y += 5;
        copy.zIndex = Math.max(...this.state.currentLabel.elements.map(e => e.zIndex)) + 1;

        this.state.currentLabel.elements.push(copy);
        this.state.selectedElementIds = [copy.id];
        UISM.play(UISM.enumPresets.COPY);
      });
    });

    eventBus.on('element:select', (ids: string | string[]) => {
      this.state.selectedElementIds = Array.isArray(ids) ? ids : [ids];
      this.emit();
    });

    eventBus.on('history:undo', () => this.undo());
    eventBus.on('history:redo', () => this.redo());
    
    eventBus.on('label:config:update', (config: any) => {
      this.performAction(() => {
        if (!this.state.currentLabel) return;
        
        const { LIMITS } = DEFAULTS;
        let hasClamped = false;

        // Clamping de dimensões
        const width = Math.min(Math.max(config.widthMM, LIMITS.MIN_DIMENSION_MM), LIMITS.MAX_WIDTH_MM);
        const height = Math.min(Math.max(config.heightMM, LIMITS.MIN_DIMENSION_MM), LIMITS.MAX_HEIGHT_MM);
        const dpi = Math.min(Math.max(config.dpi, LIMITS.MIN_DPI), LIMITS.MAX_DPI);

        if (width !== config.widthMM || height !== config.heightMM || dpi !== config.dpi) {
          hasClamped = true;
        }

        this.state.currentLabel.config = {
          ...config,
          widthMM: width,
          heightMM: height,
          dpi: dpi
        };

        if (hasClamped) {
          UISM.play(UISM.enumPresets.WARNING);
        }
      });
    });

    eventBus.on('preferences:update', (prefs: Partial<UserPreferences>) => {
      this.state.preferences = { ...this.state.preferences, ...prefs };
      this.emit();
      // Persiste via PreferenceManager (import dinâmico para evitar circular dependency)
      import('../domain/services/PreferenceManager').then(m => {
        m.preferenceManager.savePreferences(this.state.preferences);
      });
    });

    eventBus.on('history:snapshot', () => this.takeSnapshot());
  }

  private mergeUpdates(current: AnyElement, updates: any): AnyElement {
    const newElement = { ...current } as any;
    for (const key in updates) {
      if (typeof updates[key] === 'object' && updates[key] !== null && !Array.isArray(updates[key])) {
        newElement[key] = { ...newElement[key], ...updates[key] };
      } else {
        newElement[key] = updates[key];
      }
    }
    return newElement;
  }

  private performAction(action: () => void): void {
    if (!this.state.currentLabel) return;
    action();
    this.takeSnapshot();
    this.state.currentLabel.updatedAt = Date.now();
    this.emit();
  }

  private takeSnapshot(): void {
    if (!this.state.currentLabel) return;
    eventBus.emit('request:canvas:snapshot', (ctx: CanvasRenderingContext2D) => {
      historyManager.snapshot(ctx, this.state.currentLabel!.elements);
      this.updateHistoryStatus();
    });
  }

  private undo(): void {
    const snapshot = historyManager.undo();
    if (snapshot) {
      this.applySnapshot(snapshot);
      UISM.play(UISM.enumPresets.REPLACE);
    }
  }

  private redo(): void {
    const snapshot = historyManager.redo();
    if (snapshot) {
      this.applySnapshot(snapshot);
      UISM.play(UISM.enumPresets.REPLACE);
    }
  }

  private applySnapshot(snapshot: HistorySnapshot): void {
    if (!this.state.currentLabel) return;
    this.state.currentLabel.elements = JSON.parse(JSON.stringify(snapshot.elements));
    eventBus.emit('command:canvas:restore', snapshot.imageData);
    this.updateHistoryStatus();
    this.emit();
  }

  private updateHistoryStatus(): void {
    this.state.canUndo = historyManager.canUndo();
    this.state.canRedo = historyManager.canRedo();
  }

  private emit(): void {
    eventBus.emit('state:change', this.getState());
  }

  public getState(): Readonly<AppState> {
    return Object.freeze(JSON.parse(JSON.stringify(this.state)));
  }

  public loadLabel(label: Label): void {
    this.state.currentLabel = label;
    historyManager.clear();
    this.state.selectedElementIds = [];
    this.takeSnapshot();
    this.emit();
  }
}

export const store = new Store();
