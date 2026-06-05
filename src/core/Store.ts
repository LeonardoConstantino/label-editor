import { Label, AnyElement, CanvasConfig } from '../domain/models/Label';
import { UserPreferences, DEFAULT_PREFERENCES } from '../domain/models/UserPreferences';
import eventBus, { ElementUpdatePayload, ModuleSwitchPayload, ProductionDataUpdatePayload } from './EventBus';
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
  activeModuleId: 'blueprint' | 'layers' | 'assets' | 'history' | 'variables' | 'batch' | 'typeface';
  
  // Production State
  productionData: Record<string, unknown>[];
  productionPreviewIndex: number;
  productionSourceName: string;
  printConfig: BatchLayoutOptions;
}

/**
 * Store: Gerenciador de estado centralizado com suporte a Histórico Otimizado (Task 59)
 * e Visualizador de Histórico (Task 80).
 */
class Store {
  private state: AppState;
  private snapshotTimer: ReturnType<typeof setTimeout> | null = null;
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

    eventBus.on('element:update', ({ id, updates, silent }: ElementUpdatePayload) => {
      if (!this.state.currentLabel) return;
      const index = this.state.currentLabel.elements.findIndex(el => el.id === id);
      if (index === -1) return;

      const current = this.state.currentLabel.elements[index];
      const newElement = this.mergeUpdates(current, updates);

      // Validação de Integridade Física (Sistema)
      const validation = elementValidator.validate(newElement);
      if (!validation.isValid) {
        eventBus.emit('notify', { type: 'error', message: validation.errors[0] });
        UISM.play(UISM.enumPresets.WARNING);
        return;
      }

      const propName = Object.keys(updates)[0] || 'propriedade';

      this.performAction(() => {
        this.state.currentLabel!.elements[index] = newElement;

        // Sistema de Avisos (Overflow e Formato)
        const overflowResult = overflowValidator.check(newElement, this.state.currentLabel!.config);
        
        if (overflowResult.overflow) {
          eventBus.emit('element:warning', { id, result: overflowResult });
          UISM.play(UISM.enumPresets.WARNING);
        } else {
          // Limpa avisos se tudo estiver OK
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
          const newElement = this.mergeUpdates(current, updates);

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

        const copy = JSON.parse(JSON.stringify(original)) as AnyElement;
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
    
    eventBus.on('label:config:update', (config: CanvasConfig) => {
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
      
      // Sincroniza componentes dependentes
      if (prefs.historyMaxSteps !== undefined) {
        historyManager.setMaxSize(prefs.historyMaxSteps);
      }

      eventBus.emit('preferences:change', this.state.preferences);
      this.emit();

      import('../domain/services/PreferenceManager').then(m => {
        m.preferenceManager.savePreferences(this.state.preferences);
      });
    });

    eventBus.on('history:snapshot', (data) => this.takeSnapshot(true, data?.description));

    eventBus.on('module:switch', ({ moduleId }: ModuleSwitchPayload) => {
      this.state.activeModuleId = moduleId;
      this.emit();
    });

    eventBus.on('template:saved', () => {
      this.state.isDirty = false;
      this.emit();
    });

    // --- PRODUCTION EVENTS ---
    eventBus.on('production:data:update', ({ data, sourceName }: ProductionDataUpdatePayload) => {
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

  /**
   * Realiza merge de atualizações em um elemento de forma segura e tipada.
   */
  private mergeUpdates(current: AnyElement, updates: Partial<AnyElement>): AnyElement {
    // Clone raso inicial mantendo o tipo
    const next = { ...current } as AnyElement;

    Object.keys(updates).forEach(key => {
      const k = key as keyof AnyElement;
      const val = updates[k];
      
      if (val === undefined) return;

      // Merge de objetos aninhados (position, dimensions, effects, endPosition)
      if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        const currentVal = next[k];
        if (typeof currentVal === 'object' && currentVal !== null && !Array.isArray(currentVal)) {
          // @ts-ignore - TS tem dificuldade em inferir o merge de tipos em Uniões, 
          // mas garantimos que as chaves batem com os modelos de elementos.
          next[k] = { ...currentVal, ...val };
          return;
        }
      }

      // @ts-ignore - Atribuição direta segura para as demais chaves, considerando os tipos definidos.
      next[k] = val;
    });

    return next;
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
    // Task 39: Self-Healing / Migração de Schema
    // Garante que elementos antigos recebam novas propriedades (como 'effects')
    label.elements = label.elements.map(el => {
      const base = {
        ...DEFAULTS.COMMON,
        ...el,
      };

      // Garantir que effects esteja presente e completo
      base.effects = { 
        ...DEFAULTS.COMMON.effects, 
        ...(el.effects || {}) 
      };

      return base as AnyElement;
    });

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
