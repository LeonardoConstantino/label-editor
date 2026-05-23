import { Label, AnyElement } from '../domain/models/Label';
import { UserPreferences, DEFAULT_PREFERENCES } from '../domain/models/UserPreferences';
import eventBus from './EventBus';
import { historyManager, HistorySnapshot } from '../domain/services/HistoryManager';
import { UISM } from './UISoundManager';
import { overflowValidator } from '../domain/services/OverflowValidator';
import { elementValidator } from '../domain/validators/ElementValidator';
import { DEFAULTS } from '../constants/defaults';
import type { BatchLayoutOptions } from '../domain/services/PDFGenerator';

export interface AppState {
  currentLabel: Label | null;
  selectedElementIds: string[];
  clipboard: AnyElement[];
  canUndo: boolean;
  canRedo: boolean;
  isDirty: boolean;
  preferences: UserPreferences;
  activeModuleId: 'blueprint' | 'layers' | 'assets' | 'history' | 'variables' | 'batch';
  
  // Production State
  productionData: any[];
  productionPreviewIndex: number;
  productionSourceName: string;
  printConfig: BatchLayoutOptions;
}

/**
 * Store: Gerenciador de estado centralizado com suporte a Histórico Otimizado (Task 59)
 * e Visualizador de Histórico (Task 80).
 */
export class Store {
  private state: AppState;
  private snapshotTimer: any = null;
  private pendingDescription: string = 'Ação';

  constructor() {
    this.state = {
      currentLabel: null,
      selectedElementIds: [],
      clipboard: [],
      canUndo: false,
      canRedo: false,
      isDirty: false,
      preferences: DEFAULT_PREFERENCES,
      activeModuleId: 'blueprint',
      
      productionData: [],
      productionPreviewIndex: 0,
      productionSourceName: '',
      printConfig: {
        marginMM: 10,
        gapMM: 5,
        columns: 2,
        showCropMarks: true,
        bleedMM: 2,
        paperFormat: 'a4',
        orientation: 'portrait',
        zoom: 0.45,
        exportFormat: 'jpeg',
        exportQuality: 0.8
      }
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
      }, { immediate: true, description: `Adicionou ${element.type}` });
    });

    eventBus.on('element:update', ({ id, updates, silent }: { id: string; updates: Partial<AnyElement>, silent?: boolean }) => {
      if (!this.state.currentLabel) return;
      const index = this.state.currentLabel.elements.findIndex(el => el.id === id);
      if (index === -1) return;

      const current = this.state.currentLabel.elements[index];
      const newElement = this.mergeUpdates(current, updates as any);

      const validation = elementValidator.validate(newElement);
      if (!validation.isValid) {
        eventBus.emit('notify', { type: 'error', message: validation.errors[0] });
        UISM.play(UISM.enumPresets.WARNING);
        return;
      }

      const propName = Object.keys(updates)[0] || 'propriedade';

      this.performAction(() => {
        this.state.currentLabel!.elements[index] = newElement;

        const result = overflowValidator.check(newElement, this.state.currentLabel!.config);
        if (result.overflow) {
          eventBus.emit('element:warning', { id, result });
          UISM.play(UISM.enumPresets.WARNING);
        } else {
          eventBus.emit('element:warning:clear', { id });
        }
      }, { immediate: false, silent, description: `Alterou ${propName}` });
    });

    eventBus.on('elements:update', (batch: { id: string; updates: Partial<AnyElement> }[]) => {
      if (!this.state.currentLabel || batch.length === 0) return;

      this.performAction(() => {
        batch.forEach(({ id, updates }) => {
          const index = this.state.currentLabel!.elements.findIndex(el => el.id === id);
          if (index === -1) return;

          const current = this.state.currentLabel!.elements[index];
          const newElement = this.mergeUpdates(current, updates as any);

          const validation = elementValidator.validate(newElement);
          if (validation.isValid) {
            this.state.currentLabel!.elements[index] = newElement;
          }
        });
      }, { immediate: true, description: 'Atualização em lote' });
    });

    eventBus.on('element:reorder', ({ id, direction }: { id: string, direction: 'up' | 'down' }) => {
      this.performAction(() => {
        if (!this.state.currentLabel) return;
        const el = this.state.currentLabel.elements.find(e => e.id === id);
        if (!el) return;
        el.zIndex += (direction === 'up' ? 1 : -1);
        UISM.play(UISM.enumPresets.SWOOSHIN);
      }, { immediate: true, description: 'Reordenou camada' });
    });

    eventBus.on('element:delete', (id: string) => {
      this.performAction(() => {
        if (!this.state.currentLabel) return;
        this.state.currentLabel.elements = this.state.currentLabel.elements.filter(el => id !== el.id);
        this.state.selectedElementIds = this.state.selectedElementIds.filter(elId => elId !== id);
        UISM.play(UISM.enumPresets.DELETE);
      }, { immediate: true, description: 'Removeu camada' });
    });

    eventBus.on('element:duplicate', (id: string) => {
      this.performAction(() => {
        if (!this.state.currentLabel) return;
        const original = this.state.currentLabel.elements.find(el => el.id === id);
        if (!original) return;

        const copy = JSON.parse(JSON.stringify(original));
        copy.id = crypto.randomUUID();
        copy.name = `${original.name || original.type} (Copy)`;
        copy.position.x += 5;
        copy.position.y += 5;
        copy.zIndex = Math.max(...this.state.currentLabel.elements.map(e => e.zIndex), 0) + 1;

        this.state.currentLabel.elements.push(copy);
        this.state.selectedElementIds = [copy.id];
        UISM.play(UISM.enumPresets.COPY);
      }, { immediate: true, description: 'Duplicou camada' });
    });

    eventBus.on('element:select', (ids: string | string[]) => {
      this.state.selectedElementIds = Array.isArray(ids) ? ids : [ids];
      this.emit();
    });

    eventBus.on('history:undo', () => this.undo());
    eventBus.on('history:redo', () => this.redo());
    eventBus.on('history:jump', ({ index }) => this.jumpTo(index));
    
    eventBus.on('label:config:update', (config: any) => {
      this.performAction(() => {
        if (!this.state.currentLabel) return;
        
        const { LIMITS } = DEFAULTS;
        let hasClamped = false;

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
      }, { immediate: true, description: 'Configuração do documento' });
    });

    eventBus.on('preferences:update', (prefs: Partial<UserPreferences>) => {
      this.state.preferences = { ...this.state.preferences, ...prefs };
      this.emit();
      import('../domain/services/PreferenceManager').then(m => {
        m.preferenceManager.savePreferences(this.state.preferences);
      });
    });

    eventBus.on('history:snapshot', (data) => this.takeSnapshot(true, data?.description));

    eventBus.on('module:switch', ({ moduleId }: { moduleId: any }) => {
      this.state.activeModuleId = moduleId;
      this.emit();
    });

    eventBus.on('template:saved', () => {
      this.state.isDirty = false;
      this.emit();
    });

    // --- PRODUCTION EVENTS ---
    eventBus.on('production:data:update', ({ data, sourceName }) => {
      this.state.productionData = data;
      this.state.productionSourceName = sourceName;
      this.state.productionPreviewIndex = 0;
      this.emit();
    });

    eventBus.on('production:preview:index', ({ index }) => {
      this.state.productionPreviewIndex = index;
      this.emit();
    });

    eventBus.on('production:config:update', (updates) => {
      this.state.printConfig = { ...this.state.printConfig, ...updates };
      this.emit();
    });
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

  private performAction(action: () => void, options: { immediate?: boolean; silent?: boolean; description?: string } = {}): void {
    if (!this.state.currentLabel) return;
    this.state.isDirty = true;
    action();
    
    if (!options.silent) {
      this.takeSnapshot(options.immediate ?? true, options.description);
    }
    
    this.state.currentLabel.updatedAt = Date.now();
    this.emit();
  }

  private takeSnapshot(immediate: boolean = true, description: string = 'Ação'): void {
    if (!this.state.currentLabel) return;
    this.pendingDescription = description;

    if (immediate) {
      if (this.snapshotTimer) {
        clearTimeout(this.snapshotTimer);
        this.snapshotTimer = null;
      }
      this._doSnapshot(this.pendingDescription);
      return;
    }

    if (this.snapshotTimer) clearTimeout(this.snapshotTimer);
    
    const ms = this.state.preferences.historySensitivity ?? 400;
    
    if (ms <= 0) {
      this._doSnapshot(this.pendingDescription);
    } else {
      this.snapshotTimer = setTimeout(() => {
        this._doSnapshot(this.pendingDescription);
        this.snapshotTimer = null;
      }, ms);
    }
  }

  private _doSnapshot(description: string): void {
    if (!this.state.currentLabel) return;
    eventBus.emit('request:canvas:snapshot', (ctx: CanvasRenderingContext2D) => {
      historyManager.snapshot(ctx, this.state.currentLabel!.elements, description);
      this.updateHistoryStatus();
    });
  }

  private undo(): void {
    if (this.snapshotTimer) {
      clearTimeout(this.snapshotTimer);
      this.snapshotTimer = null;
    }

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

  private jumpTo(index: number): void {
    if (this.snapshotTimer) {
      clearTimeout(this.snapshotTimer);
      this.snapshotTimer = null;
    }

    const snapshot = historyManager.jumpTo(index);
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
    // Otimização: Não usamos mais JSON.stringify em todo o estado.
    // productionData pode ser enorme e travar a Main Thread.
    return Object.freeze({
      ...this.state,
      // Clonamos profundamente apenas o design (Label) para garantir imutabilidade da estrutura
      currentLabel: this.state.currentLabel ? JSON.parse(JSON.stringify(this.state.currentLabel)) : null,
      // productionData é tratado como somente-leitura por convenção na UI
    });
  }

  public loadLabel(label: Label): void {
    this.state.currentLabel = label;
    historyManager.clear();
    this.state.selectedElementIds = [];
    this.state.isDirty = false;
    this.takeSnapshot(true, 'Abriu etiqueta');
    eventBus.emit('label:opened', label); // Task 85: Avisa os interessados (ex: Font Injection)
    this.emit();
  }

  public loadPreferences(prefs: UserPreferences): void {
    this.state.preferences = { ...prefs };
    this.emit();
  }
}

export const store = new Store();
