import KeyboardShortcutManager from './KeyboardShortcutManager';
import eventBus from './EventBus';
import { store } from './Store';
import { UISM } from './UISoundManager';
import { logger } from './Logger';
import { templateManager } from '../domain/services/TemplateManager';
import { AnyElement, ElementType } from '../domain/models/Label';
import { ElementFactory } from '../domain/models/elements/ElementFactory';
import { getDebug } from '../constants/defaults';

/**
 * PropClipboard: Armazena propriedades copiadas de um elemento.
 */
interface PropClipboard {
  type: string;
  position?: { x: number; y: number };
  dimensions?: { width: number; height: number };
  styles: Record<string, any>;
}

/**
 * ShortcutService: Orquestrador central de atalhos do Label Editor.
 * Refatorado para usar o sistema de contextos nativo do KeyboardShortcutManager (Task 23).
 */
class ShortcutService {
  private manager: KeyboardShortcutManager;
  private isInitialized = false;
  private propClipboard: PropClipboard | null = null;
  private metaKeyName: string = 'ctrl';
  private prismMode: boolean = false;
  private readonly ZOOM_LEVELS = [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5];

  constructor() {
    this.manager = new KeyboardShortcutManager({
      debug: getDebug(),
      enableSequences: true,
      enableLongPress: true,
      debounceDelay: 50,
      logger: logger,
    });
  }

  init(isMac: boolean): void {
    if (this.isInitialized) return;

    this.metaKeyName = isMac ? 'meta' : 'ctrl';

    this.manager.init();
    this.registerDefaults();
    this.setupModalListeners();
    this.isInitialized = true;
    logger.info(
      'ShortcutService',
      'Serviço de atalhos refinado e inicializado.',
    );
  }

  private setupModalListeners(): void {
    eventBus.on('ui:modal:open', () => {
      this.pushContext('modal');
    });

    eventBus.on('ui:modal:close', () => {
      this.popContext();
    });

    // Estratégia para AppSelect: Protege atalhos quando um dropdown está aberto
    document.addEventListener('ui-select:open', () => {
      this.pushContext('input');
    });

    document.addEventListener('ui-select:close', () => {
      this.popContext();
    });
  }

  /**
   * Helpers de contexto funcionais para o Manager.
   */
  // private hasSelection = () => store.getState().selectedElementIds.length > 0;
  private noSelection = () => store.getState().selectedElementIds.length === 0;

  private registerDefaults(): void {
    // --- NAVEGAÇÃO DE MÓDULOS (Global) ---
    this.registerModuleNavigationShortcuts();
    // --- GESTÃO DE PROJETO ---
    this.projectManagementShortcuts();
    // --- MODAIS ---
    this.registerModaisManagementShortcuts();
    // --- HISTÓRICO ---
    this.registerHistoryManagementShortcuts();
    // --- GESTÃO DE ELEMENTOS (Contexto: no-input) ---
    this.registerElementManagementShortcuts();
    // --- PROP CLIPBOARD ---
    this.registerClipboardShortcuts();
    // --- VISIBILIDADE & BLOQUEIO ---
    this.registerVisibilityAndLockShortcuts();
    // --- AJUDA ---
    this.registerHelp();
    // --- MOVIMENTAÇÃO E REDIMENSIONAMENTO (Contextos Inteligentes) ---
    this.registerTransformShortcuts();
    // --- TOOLBAR (Global) ---
    this.registerToolbarShortcuts();
    // --- ZOOM (Global) ---
    this.registerZoomShortcuts();
    // --- EASTER EGGS ---
    this.registerEasterEggs();
  }

  private registerModuleNavigationShortcuts() {
    const modules = [
      'blueprint',
      'layers',
      'assets',
      'history',
      'variables',
      'typeface',
    ];
    modules.forEach((id, i) => {
      this.manager.register(
        `alt+${i + 1}`,
        () => {
          eventBus.emit('module:switch', { moduleId: id });
          UISM.play(UISM.enumPresets.TAP);
        },
        { description: `Ir para módulo ${id}`, category: 'Navegação' },
      );
    });

    this.manager.register('pageup', () => this.cycleModule('prev'), {
      description: 'Módulo anterior',
      context: () => this.noSelection(),
      category: 'Navegação',
    });
    this.manager.register('pagedown', () => this.cycleModule('next'), {
      description: 'Próximo módulo',
      context: () => this.noSelection(),
      category: 'Navegação',
    });

    // Navegação de produção via Ctrl + setas
    this.manager.register(
      `${this.metaKeyName}+arrowleft`,
      () => this.navProduction('prev'),
      {
        description: 'Registro anterior',
        context: () => this.noSelection(),
        category: 'Produção',
      },
    );
    this.manager.register(
      `${this.metaKeyName}+arrowright`,
      () => this.navProduction('next'),
      {
        description: 'Próximo registro',
        context: () => this.noSelection(),
        category: 'Produção',
      },
    );
  }

  private projectManagementShortcuts() {
    this.manager.register(
      `${this.metaKeyName}+s`,
      (_e) => {
        eventBus.emit('template:save', { source: 'shortcut' });
        UISM.play(UISM.enumPresets.SUCCESS);
        eventBus.emit('notify', {
          message: 'Etiqueta salva com sucesso!',
          type: 'success',
        });
      },
      {
        description: 'Salvar Template',
        category: 'Projeto',
        preventDefault: true,
      },
    );

    this.manager.registerLongPress(
      's',
      () => {
        UISM.play(UISM.enumPresets.SUCCESS);
        eventBus.emit('template:save', { source: 'shortcut' });
        eventBus.emit('notify', {
          message: 'Deep Sync em andamento...',
          type: 'info',
        });
      },
      { description: 'Sincronização Atômica', category: 'Easter Egg' },
    );

    this.manager.register(
      `${this.metaKeyName}+alt+n`,
      (_e) => {
        templateManager.createNewProject();
        UISM.play(UISM.enumPresets.OPEN);
        eventBus.emit('notify', {
          message: 'Novo projeto criado',
          type: 'info',
        });
      },
      {
        description: 'Novo Projeto',
        category: 'Projeto',
        preventDefault: true,
      },
    );
  }

  private registerModaisManagementShortcuts() {
    this.manager.register(
      'alt+v',
      () => {
        const modal = document.getElementById('vault-modal') as any;
        if (modal) modal.setAttribute('open', '');
        UISM.play(UISM.enumPresets.OPEN);
      },
      { description: 'Abrir Vault', category: 'Projeto' },
    );

    this.manager.register(
      'alt+p',
      () => {
        const modal = document.getElementById('batch-modal') as any;
        if (modal) modal.setAttribute('open', '');
        UISM.play(UISM.enumPresets.OPEN);
      },
      { description: 'Abrir Produção', category: 'Produção' },
    );
  }

  private registerHistoryManagementShortcuts() {
    this.manager.register(
      `${this.metaKeyName}+z`,
      () => eventBus.emit('history:undo', { source: 'shortcut' }),
      { description: 'Desfazer', category: 'Edição', preventDefault: true },
    );

    this.manager.register(
      `${this.metaKeyName}+shift+z`,
      () => eventBus.emit('history:redo', { source: 'shortcut' }),
      { description: 'Refazer', category: 'Edição', preventDefault: true },
    );
  }

  private registerElementManagementShortcuts() {
    this.manager.register('delete', () => this.handleDelete(), {
      description: 'Excluir',
      context: 'no-input',
      preventDefault: true,
    });
    this.manager.register('backspace', () => this.handleDelete(), {
      description: 'Excluir',
      context: 'no-input',
      preventDefault: true,
    });

    // this.manager.register('v', () => eventBus.emit('element:select', []), {
    //   description: 'deselecionar elementos',
    //   context: 'no-input',
    // });

    this.manager.register('escape', () => eventBus.emit('element:select', []), {
      description: 'deselecionar elementos',
      context: 'no-input',
    });

    this.manager.register('.', () => this.cycleSelection('next'), {
      description: 'Próxima camada',
      context: 'no-input',
    });
    this.manager.register(',', () => this.cycleSelection('prev'), {
      description: 'Camada anterior',
      context: 'no-input',
    });

    this.manager.register('[', () => this.reorder('down'), {
      description: 'Recuar Camada',
      context: 'no-input',
    });
    this.manager.register(']', () => this.reorder('up'), {
      description: 'Avançar Camada',
      context: 'no-input',
    });

    this.manager.register(
      `${this.metaKeyName}+d`,
      () => {
        const id = store.getState().selectedElementIds[0];
        if (id) eventBus.emit('element:duplicate', id);
      },
      {
        description: 'Duplicar',
        category: 'Edição',
        context: 'no-input',
        preventDefault: true,
      },
    );
  }

  private registerClipboardShortcuts() {
    this.manager.register(
      `${this.metaKeyName}+alt+c`,
      () => this.copyProperties(),
      {
        description: 'Copiar Propriedades',
        category: 'Edição',
        context: 'no-input',
        preventDefault: true,
      },
    );

    this.manager.register(
      `${this.metaKeyName}+alt+v`,
      () => this.pasteProperties(),
      {
        description: 'Colar Propriedades',
        category: 'Edição',
        context: 'no-input',
        preventDefault: true,
      },
    );
  }

  private registerVisibilityAndLockShortcuts() {
    this.manager.register(
      `${this.metaKeyName}+l`,
      () => this.toggleProp('locked'),
      { description: 'Bloquear/Desbloquear', category: 'Edição' },
    );
    this.manager.register(
      `${this.metaKeyName}+shift+h`,
      () => this.toggleProp('visible'),
      { description: 'Ocultar/Mostrar', category: 'Edição' },
    );
  }

  private registerHelp() {
    this.manager.register(
      `${this.metaKeyName}+/`,
      () => {
        eventBus.emit('ui:open:help', { source: 'shortcut', tab: 'shortcuts' });
      },
      {
        description: 'Mostrar Atalhos',
        category: 'Ajuda',
        preventDefault: true,
      },
    );

    this.manager.register(
      `${this.metaKeyName}+,`,
      () => {
        const modal = document.getElementById('settings-modal') as any;
        if (modal) modal.setAttribute('open', '');
        UISM.play(UISM.enumPresets.OPEN);
      },
      { description: 'Configurações', category: 'Ajuda', preventDefault: true },
    );
  }

  private registerEasterEggs = () => {
    // Easter Egg: Konami Code para Modo Prism
    this.manager.registerKonamiCode(
      () => {
        logger.info(
          'ShortcutService',
          'Sera implementado em breve... (Konami Code)',
        );
      },
      { description: 'Em desenvolvimento...', category: 'Easter Egg' },
    );

    this.manager.registerSequence(
      ['p', 'r', 'i', 's', 'm'],
      () => {
        eventBus.emit('notify', {
          message: `PRISM MODE ${this.prismMode ? 'DESATIVADO' : 'ATIVADO'}!`,
          type: 'success',
        });

        if (this.prismMode) {
          document.body.style.filter = '';
          this.prismMode = false;
          return;
        }

        document.body.style.filter = 'hue-rotate(90deg) contrast(1.2)';
        this.prismMode = true;
      },
      { description: 'Modo Prism', category: 'Easter Egg' },
    );

    // Easter Egg: Fibonacci Sequence
    this.manager.registerFibonacciSequence(() => {
      logger.info(
        'ShortcutService',
        'Sera implementado em breve... (Fibonacci Sequence)',
      );
    },
      { description: 'Em desenvolvimento...', category: 'Easter Egg' },
    );
  };

  private registerTransformShortcuts(): void {
    const keys = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
    const deltas: Record<string, { x: number; y: number }> = {
      arrowup: { x: 0, y: -1 },
      arrowdown: { x: 0, y: 1 },
      arrowleft: { x: -1, y: 0 },
      arrowright: { x: 1, y: 0 },
    };
    const moveDescriptionMap: Record<string, string> = {
      arrowup: 'Mover para cima',
      arrowdown: 'Mover para baixo',
      arrowleft: 'Mover para a esquerda',
      arrowright: 'Mover para a direita',
    };
    const resizeDescriptionMap: Record<string, string> = {
      arrowup: 'Redimensionar altura',
      arrowdown: 'Redimensionar altura',
      arrowleft: 'Redimensionar largura',
      arrowright: 'Redimensionar largura',
    };

    keys.forEach((key) => {
      const d = deltas[key];
      // Registrar combinações para cada tecla de seta
      // Alt (0.1) | Normal (1.0) | Shift (10.0)
      this.manager.register(
        key,
        (_e) => {
          this.moveSelectedElement(d.x * 1, d.y * 1);
        },
        {
          description: moveDescriptionMap[key],
          category: 'Edição movimentação',
          context: 'no-input',
          preventDefault: true,
        },
      );

      this.manager.register(
        `shift+${key}`,
        (_e) => {
          this.moveSelectedElement(d.x * 10, d.y * 10);
        },
        {
          description: `${moveDescriptionMap[key]} rápido`,
          category: 'Edição movimentação',
          context: 'no-input',
          preventDefault: true,
        },
      );

      this.manager.register(
        `alt+${key}`,
        (_e) => {
          this.moveSelectedElement(d.x * 0.1, d.y * 0.1);
        },
        {
          description: `${moveDescriptionMap[key]} lento`,
          category: 'Edição movimentação',
          context: 'no-input',
          preventDefault: true,
        },
      );

      // Redimensionar Elemento (Ctrl + Arrows)
      this.manager.register(
        `${this.metaKeyName}+${key}`,
        (_e) => {
          this.resizeSelectedElement(d.x * 1, d.y * 1);
        },
        {
          description: `${resizeDescriptionMap[key]}`,
          category: 'Edição redimensionamento',
          context: 'no-input',
          preventDefault: true,
        },
      );

      this.manager.register(
        `${this.metaKeyName}+shift+${key}`,
        (_e) => {
          this.resizeSelectedElement(d.x * 10, d.y * 10);
        },
        {
          description: `${resizeDescriptionMap[key]} rápido`,
          category: 'Edição redimensionamento',
          context: 'no-input',
          preventDefault: true,
        },
      );

      this.manager.register(
        `${this.metaKeyName}+alt+${key}`,
        (_e) => {
          this.resizeSelectedElement(d.x * 0.1, d.y * 0.1);
        },
        {
          description: `${resizeDescriptionMap[key]} lento`,
          category: 'Edição redimensionamento',
          context: 'no-input',
          preventDefault: true,
        },
      );
    });
  }

  private registerZoomShortcuts(): void {
    this.manager.register(
      `${this.metaKeyName}+=`,
      () => {
        this.zoomToNextLevel(1);
      },
      {
        description: 'Aumentar Zoom',
        category: 'Navegação',
        preventDefault: true,
      },
    );

    this.manager.register(
      `${this.metaKeyName}+-`,
      () => {
        this.zoomToNextLevel(-1);
      },
      {
        description: 'Diminuir Zoom',
        category: 'Navegação',
        preventDefault: true,
      },
    );

    this.manager.register(
      `${this.metaKeyName}+0`,
      () => {
        this.setZoomLevel(1);
      },
      {
        description: 'Resetar Zoom (100%)',
        category: 'Navegação',
        preventDefault: true,
      },
    );
  }

  private zoomToNextLevel(direction: 1 | -1): void {
    const state = store.getState();
    const label = state.currentLabel;
    if (!label || label.elements.length === 0) return;

    const currentZoom = label?.config.previewScale || 1;

    let currentIndex = this.ZOOM_LEVELS.findIndex(
      (level) => level >= currentZoom,
    );
    if (currentIndex === -1) currentIndex = this.ZOOM_LEVELS.length - 1;

    const nextIndex = Math.max(
      0,
      Math.min(this.ZOOM_LEVELS.length - 1, currentIndex + direction),
    );

    this.setZoomLevel(this.ZOOM_LEVELS[nextIndex]);
  }

  private setZoomLevel(zoom: number): void {
    const state = store.getState();
    const label = state.currentLabel;
    if (!label) return;

    eventBus.emit('label:config:update', {
      ...label.config,
      previewScale: zoom,
    });
  }

  private cycleModule(dir: 'next' | 'prev') {
    const modules = [
      'blueprint',
      'layers',
      'assets',
      'history',
      'variables',
      'typeface',
    ];
    const current = store.getState().activeModuleId;
    let idx = modules.indexOf(current as any);
    if (dir === 'next') idx = (idx + 1) % modules.length;
    else idx = (idx - 1 + modules.length) % modules.length;
    eventBus.emit('module:switch', { moduleId: modules[idx] });
    UISM.play(UISM.enumPresets.TAP);
  }

  private cycleSelection(dir: 'next' | 'prev') {
    const state = store.getState();
    const label = state.currentLabel;
    if (!label || label.elements.length === 0) return;

    const elements = [...label.elements].sort((a, b) => b.zIndex - a.zIndex);
    const currentId = state.selectedElementIds[0];
    let idx = elements.findIndex((el) => el.id === currentId);

    if (dir === 'next') idx = (idx + 1) % elements.length;
    else idx = (idx - 1 + elements.length) % elements.length;

    eventBus.emit('element:select', elements[idx].id);
    UISM.play(UISM.enumPresets.SELECT);
  }

  private navProduction(dir: 'next' | 'prev') {
    const state = store.getState();
    if (state.productionData.length === 0) return;
    let newIndex = state.productionPreviewIndex;
    if (dir === 'next')
      newIndex = Math.min(state.productionData.length - 1, newIndex + 1);
    else newIndex = Math.max(0, newIndex - 1);
    eventBus.emit('production:preview:index', { index: newIndex });
    UISM.play(UISM.enumPresets.TAP);
  }

  private resizeSelectedElement(dw: number, dh: number) {
    const state = store.getState();
    const id = state.selectedElementIds[0];
    const el = state.currentLabel?.elements.find((e) => e.id === id);
    if (!el || el.locked || !('dimensions' in el)) return;

    eventBus.emit('element:update', {
      id,
      updates: {
        dimensions: {
          width: Math.max(1, Number((el.dimensions.width + dw).toFixed(2))),
          height: Math.max(1, Number((el.dimensions.height + dh).toFixed(2))),
        },
      },
    });
  }

  private async registerToolbarShortcuts(): Promise<void> {
    this.manager.registerLongPress(
      't',
      () => this.addElement(ElementType.TEXT),
      { description: 'Adicionar Texto', category: 'Toolbar', duration: 300 },
    );

    this.manager.registerLongPress(
      'r',
      () => this.addElement(ElementType.RECTANGLE),
      {
        description: 'Adicionar Retângulo',
        category: 'Toolbar',
        duration: 300,
      },
    );

    this.manager.register(
      'shift+r',
      () =>
        this.addElement(ElementType.RECTANGLE, {
          dimensions: { width: 40, height: 40 },
        }),
      {
        description: 'Adicionar Quadrado',
        category: 'Toolbar',
        context: 'no-input',
      },
    );

    this.manager.registerLongPress(
      'i',
      () => {
        eventBus.emit('command:toolbar:upload-image', { source: 'shortcut' });
      },
      { description: 'Adicionar Imagem', category: 'Toolbar', duration: 300 },
    );

    this.manager.registerLongPress(
      'b',
      () => this.addElement(ElementType.BORDER),
      { description: 'Adicionar Moldura', category: 'Toolbar', duration: 300 },
    );

    this.manager.registerLongPress(
      'v',
      () => {
        const modal = document.getElementById('vault-modal') as any;
        if (modal) modal.setAttribute('open', '');
        UISM.play(UISM.enumPresets.OPEN);
      },
      { description: 'Abrir Vault', category: 'Toolbar', duration: 300 },
    );

    this.manager.registerLongPress(
      'p',
      () => {
        const modal = document.getElementById('batch-modal') as any;
        if (modal) modal.setAttribute('open', '');
        UISM.play(UISM.enumPresets.OPEN);
      },
      { description: 'Produção (A4/Lote)', category: 'Toolbar', duration: 300 },
    );
  }

  private addElement(type: any, overrides: any = {}): void {
    const element = ElementFactory.create(type, overrides);
    eventBus.emit('element:add', element);
    UISM.play(UISM.enumPresets.SWOOSHIN);
  }

  private moveSelectedElement(dx: number, dy: number): void {
    const state = store.getState();
    const id = state.selectedElementIds[0];
    if (!id || !state.currentLabel) return;

    const el = state.currentLabel.elements.find((e) => e.id === id);
    if (!el || el.locked) return;

    eventBus.emit('element:update', {
      id,
      updates: {
        position: {
          x: Number((el.position.x + dx).toFixed(2)),
          y: Number((el.position.y + dy).toFixed(2)),
        },
      },
    });
  }

  private copyProperties(): void {
    const state = store.getState();
    const id = state.selectedElementIds[0];
    const el = state.currentLabel?.elements.find((e) => e.id === id);
    if (!el) return;

    this.propClipboard = {
      type: el.type,
      position: { ...el.position },
      dimensions: 'dimensions' in el ? { ...el.dimensions } : undefined,
      styles: this.extractStyles(el),
    };

    UISM.play(UISM.enumPresets.TAP);
    eventBus.emit('notify', { message: 'Propriedades copiadas', type: 'info' });
  }

  private pasteProperties(): void {
    if (!this.propClipboard) return;
    const state = store.getState();
    const id = state.selectedElementIds[0];
    if (!id) return;

    const el = state.currentLabel?.elements.find((e) => e.id === id);
    if (el?.locked) {
      UISM.play(UISM.enumPresets.WARNING);
      eventBus.emit('notify', {
        message: 'Elemento bloqueado',
        type: 'warning',
      });
      return;
    }

    const updates: any = {
      position: this.propClipboard.position,
    };

    if (this.propClipboard.dimensions) {
      updates.dimensions = this.propClipboard.dimensions;
    }

    Object.assign(updates, this.propClipboard.styles);

    eventBus.emit('element:update', { id, updates });
    UISM.play(UISM.enumPresets.REPLACE);
  }

  private extractStyles(el: AnyElement): Record<string, any> {
    const styles: Record<string, any> = {};
    const keys = [
      'color',
      'fillColor',
      'strokeColor',
      'strokeWidth',
      'opacity',
      'fontSize',
      'fontWeight',
      'fontFamily',
      'borderRadius',
      'textAlign',
    ];

    keys.forEach((k) => {
      if (k in el) styles[k] = (el as any)[k];
    });

    return styles;
  }

  private toggleProp(prop: 'locked' | 'visible'): void {
    const id = store.getState().selectedElementIds[0];
    if (!id) return;
    const el = store.getState().currentLabel?.elements.find((e) => e.id === id);
    if (!el) return;

    const val = prop === 'locked' ? !el.locked : el.visible === false;
    eventBus.emit('element:update', { id, updates: { [prop]: val } });
    UISM.play(UISM.enumPresets.TOGGLE);
  }

  private reorder(direction: 'up' | 'down'): void {
    const state = store.getState();
    const id = state.selectedElementIds[0];
    if (!id) return;

    const el = state.currentLabel?.elements.find((e) => e.id === id);
    if (el?.locked) {
      UISM.play(UISM.enumPresets.WARNING);
      return;
    }

    eventBus.emit('element:reorder', { id, direction });
  }

  private handleDelete(): void {
    const state = store.getState();
    const id = state.selectedElementIds[0];
    if (!id) return;

    const el = state.currentLabel?.elements.find((e) => e.id === id);
    if (el?.locked) {
      UISM.play(UISM.enumPresets.WARNING);
      eventBus.emit('notify', {
        message: 'Impossível excluir camada bloqueada',
        type: 'warning',
      });
      return;
    }

    eventBus.emit('element:delete', id);
    UISM.play(UISM.enumPresets.DELETE);
  }

  listShortcuts() {
    return this.manager.listShortcuts();
  }

  pushContext(ctx: string): void {
    this.manager.pushContext(ctx);
  }
  popContext(): void {
    this.manager.popContext();
  }
}

export const shortcutService = new ShortcutService();
