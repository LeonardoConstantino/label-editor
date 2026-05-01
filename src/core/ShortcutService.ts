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
 */
class ShortcutService {
  private manager: KeyboardShortcutManager;
  private isInitialized = false;
  private propClipboard: PropClipboard | null = null;
  private metaKeyName: string = 'ctrl';

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
    logger.info('ShortcutService', 'Serviço de atalhos refinado e inicializado.');
  }

  private setupModalListeners(): void {
    eventBus.on('ui:modal:open', () => {
      this.pushContext('modal');
    });

    eventBus.on('ui:modal:close', () => {
      this.popContext();
    });
  }

  private registerDefaults(): void {
    // --- GESTÃO DE PROJETO ---
    this.manager.register(`${this.metaKeyName}+s`, (_e) => {
      eventBus.emit('template:save', { source: 'shortcut' });
      UISM.play(UISM.enumPresets.SUCCESS);
      eventBus.emit('notify', { message: 'Etiqueta salva com sucesso!', type: 'success' });
    }, { description: 'Salvar Template', category: 'Projeto', preventDefault: true });

    this.manager.register(`${this.metaKeyName}+alt+n`, (_e) => {
      templateManager.createNewProject();
      UISM.play(UISM.enumPresets.OPEN);
      eventBus.emit('notify', { message: 'Novo projeto criado', type: 'info' });
    }, { description: 'Novo Projeto', category: 'Projeto', preventDefault: true });

    // --- HISTÓRICO ---
    this.manager.register(`${this.metaKeyName}+z`, () => eventBus.emit('history:undo', { source: 'shortcut' }), 
      { description: 'Desfazer', category: 'Edição', preventDefault: true });
    
    this.manager.register(`${this.metaKeyName}+shift+z`, () => eventBus.emit('history:redo', { source: 'shortcut' }), 
      { description: 'Refazer', category: 'Edição', preventDefault: true });

    // --- MANIPULAÇÃO DE ELEMENTOS ---
    this.manager.register('delete', () => this.handleDelete(), {
      description: 'Excluir Elemento', 
      context: 'no-input',
      preventDefault: true 
    });
    this.manager.register('backspace', () => this.handleDelete(), { description: 'Excluir Elemento', context: 'no-input', preventDefault: true });
    
    this.manager.register(`${this.metaKeyName}+d`, () => {
      const id = store.getState().selectedElementIds[0];
      if (id) eventBus.emit('element:duplicate', id);
    }, { description: 'Duplicar', category: 'Edição', context: 'no-input', preventDefault: true });

    // --- PROP CLIPBOARD ---
    this.manager.register(`${this.metaKeyName}+alt+c`, () => this.copyProperties(), 
      { description: 'Copiar Propriedades', category: 'Edição', context: 'no-input', preventDefault: true });
    
    this.manager.register(`${this.metaKeyName}+alt+v`, () => this.pasteProperties(), 
      { description: 'Colar Propriedades', category: 'Edição', context: 'no-input', preventDefault: true });

    // --- ORGANIZAÇÃO DE CAMADAS ---
    this.manager.register(`${this.metaKeyName}+[`, () => this.reorder('down'), { description: 'Recuar Camada', category: 'Organizar' });
    this.manager.register(`${this.metaKeyName}+]`, () => this.reorder('up'), { description: 'Avançar Camada', category: 'Organizar' });

    // --- VISIBILIDADE & BLOQUEIO ---
    this.manager.register(`${this.metaKeyName}+l`, () => this.toggleProp('locked'), { description: 'Bloquear/Desbloquear', category: 'Edição' });
    this.manager.register(`${this.metaKeyName}+shift+h`, () => this.toggleProp('visible'), { description: 'Ocultar/Mostrar', category: 'Edição' });

    // --- SELEÇÃO ---
    this.manager.register('escape', () => eventBus.emit('element:select', []), { description: 'Limpar Seleção' });

    // --- MOVIMENTAÇÃO COM MULTIPLICADORES ---
    this.registerMovementShortcuts();

    // --- TOOLBAR RÁPIDA ---
    this.registerToolbarShortcuts();

    // --- AJUDA ---
    this.manager.register(`${this.metaKeyName}+/`, () => {
      eventBus.emit('ui:open:help', { source: 'shortcut' });
    }, { description: 'Mostrar Atalhos', category: 'Ajuda', preventDefault: true });

    //   logger.debug('ShortcutService', `Modo debug ${getDebug() ? 'ativado' : 'desativado'}!`);
    //   eventBus.emit('notify', { message: `Modo debug ${getDebug() ? 'ativado' : 'desativado'}! Ver console para detalhes.`, type: 'warning', duration: 5000 });

    //   logger.setDeveloperMode(getDebug());
    //   eventBus.setLog(getDebug());
    //   this.manager.setDebug(getDebug());
    // }, { description: 'Ativar Modo Debug', category: 'Easter Egg' });

    this.manager.registerSequence(['t', 'e', 's', 't', 'e'], () => {
      logger.debug('ShortcutService', 'Sequência de teste ativada!');
      eventBus.emit('notify', { message: 'Sequência secreta ativada!', type: 'success', duration: 5000 });
    }, { description: 'Sequência de Teste', category: 'Easter Egg' });
  }

  private registerMovementShortcuts(): void {
    const keys = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
    const deltas: Record<string, { x: number, y: number }> = {
      arrowup: { x: 0, y: -1 },
      arrowdown: { x: 0, y: 1 },
      arrowleft: { x: -1, y: 0 },
      arrowright: { x: 1, y: 0 }
    };
    const descriptionMap: Record<string, string> = {
      arrowup: 'Mover para cima',
      arrowdown: 'Mover para baixo',
      arrowleft: 'Mover para a esquerda',
      arrowright: 'Mover para a direita'
    };

    keys.forEach(key => {
      // Registrar combinações para cada tecla de seta
      // Alt (0.1) | Normal (1.0) | Shift (10.0)
      this.manager.register(key, (e) => {
        let multiplier = 1;
        if (e.shiftKey) multiplier = 10;
        if (e.altKey) multiplier = 0.1;
        const d = deltas[key];
        this.moveSelectedElement(d.x * multiplier, d.y * multiplier);
      }, {description: descriptionMap[key], context: 'no-input', preventDefault: true });

      this.manager.register(`shift+${key}`, (_e) => {
        const d = deltas[key];
        this.moveSelectedElement(d.x * 10, d.y * 10);
      }, { description: `${descriptionMap[key]} rápido`, context: 'no-input', preventDefault: true });

      this.manager.register(`alt+${key}`, (_e) => {
        const d = deltas[key];
        this.moveSelectedElement(d.x * 0.1, d.y * 0.1);
      }, { description: `${descriptionMap[key]} lento`, context: 'no-input', preventDefault: true });
    });
  }

  private async registerToolbarShortcuts(): Promise<void> {
    this.manager.registerLongPress('t', () => this.addElement(ElementType.TEXT), 
      { description: 'Adicionar Texto', category: 'Toolbar', duration: 300 });

    this.manager.registerLongPress('r', () => this.addElement(ElementType.RECTANGLE), 
      { description: 'Adicionar Retângulo', category: 'Toolbar', duration: 300 });
    
    this.manager.register('shift+r', () => this.addElement(ElementType.RECTANGLE, { dimensions: { width: 40, height: 40 } }), 
      { description: 'Adicionar Quadrado', category: 'Toolbar', context: 'no-input' });

    this.manager.registerLongPress('i', () => {
      eventBus.emit('command:toolbar:upload-image', { source: 'shortcut' });
    }, { description: 'Adicionar Imagem', category: 'Toolbar', duration: 300 });

    this.manager.registerLongPress('b', () => this.addElement(ElementType.BORDER), 
      { description: 'Adicionar Moldura', category: 'Toolbar', duration: 300 });

    this.manager.registerLongPress('v', () => {
      const modal = document.getElementById('vault-modal') as any;
      if (modal) modal.setAttribute('open', '');
      UISM.play(UISM.enumPresets.OPEN);
    }, { description: 'Abrir Vault', category: 'Toolbar', duration: 300 });

    this.manager.registerLongPress('p', () => {
      const modal = document.getElementById('batch-modal') as any;
      if (modal) modal.setAttribute('open', '');
      UISM.play(UISM.enumPresets.OPEN);
    }, { description: 'Produção (A4/Lote)', category: 'Toolbar', duration: 300 });
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

    const el = state.currentLabel.elements.find(e => e.id === id);
    if (!el || el.locked) return;

    eventBus.emit('element:update', {
      id,
      updates: {
        position: {
          x: Number((el.position.x + dx).toFixed(2)),
          y: Number((el.position.y + dy).toFixed(2))
        }
      }
    });
  }

  private copyProperties(): void {
    const state = store.getState();
    const id = state.selectedElementIds[0];
    const el = state.currentLabel?.elements.find(e => e.id === id);
    if (!el) return;

    this.propClipboard = {
      type: el.type,
      position: { ...el.position },
      dimensions: 'dimensions' in el ? { ...el.dimensions } : undefined,
      styles: this.extractStyles(el)
    };

    UISM.play(UISM.enumPresets.TAP);
    eventBus.emit('notify', { message: 'Propriedades copiadas', type: 'info' });
  }

  private pasteProperties(): void {
    if (!this.propClipboard) return;
    const state = store.getState();
    const id = state.selectedElementIds[0];
    if (!id) return;

    const el = state.currentLabel?.elements.find(e => e.id === id);
    if (el?.locked) {
      UISM.play(UISM.enumPresets.WARNING);
      eventBus.emit('notify', { message: 'Elemento bloqueado', type: 'warning' });
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
    const keys = ['color', 'fillColor', 'strokeColor', 'strokeWidth', 'opacity', 'fontSize', 'fontWeight', 'fontFamily', 'borderRadius', 'textAlign'];
    
    keys.forEach(k => {
      if (k in el) styles[k] = (el as any)[k];
    });

    return styles;
  }

  private toggleProp(prop: 'locked' | 'visible'): void {
    const id = store.getState().selectedElementIds[0];
    if (!id) return;
    const el = store.getState().currentLabel?.elements.find(e => e.id === id);
    if (!el) return;

    const val = prop === 'locked' ? !el.locked : (el.visible === false);
    eventBus.emit('element:update', { id, updates: { [prop]: val } });
    UISM.play(UISM.enumPresets.TOGGLE);
  }

  private reorder(direction: 'up' | 'down'): void {
    const state = store.getState();
    const id = state.selectedElementIds[0];
    if (!id) return;

    const el = state.currentLabel?.elements.find(e => e.id === id);
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

    const el = state.currentLabel?.elements.find(e => e.id === id);
    if (el?.locked) {
      UISM.play(UISM.enumPresets.WARNING);
      eventBus.emit('notify', { message: 'Impossível excluir camada bloqueada', type: 'warning' });
      return;
    }

    eventBus.emit('element:delete', id);
    UISM.play(UISM.enumPresets.DELETE);
  }

  listShortcuts(){
    return this.manager.listShortcuts();
  }

  pushContext(ctx: string): void { this.manager.pushContext(ctx); }
  popContext(): void { this.manager.popContext(); }
}

export const shortcutService = new ShortcutService();
