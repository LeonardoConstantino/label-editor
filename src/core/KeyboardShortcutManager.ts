/**
 * KeyboardShortcutManager v2.0
 * Sistema robusto para gerenciamento de atalhos, sequências e Easter Eggs
 *
 * CORREÇÕES IMPLEMENTADAS:
 * ✓ Eliminação de vazamentos de memória
 * ✓ Prevenção de race conditions
 * ✓ Normalização consistente de teclas
 * ✓ Otimização com Trie para sequências
 * ✓ Validação rigorosa de parâmetros
 * ✓ API consistente
 * ✓ Debounce configurável
 * ✓ Gerenciamento de contextos com stack
 */

// ==================== INTERFACES E TIPOS ====================

interface KeyboardShortcutOptions {
  enableSequences?: boolean;
  enableLongPress?: boolean;
  sequenceTimeout?: number;
  longPressDuration?: number;
  debounceDelay?: number;
  debug?: boolean;
  logger?: Logger;
}

interface Logger {
  info(...args: unknown[]): void;
  log(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  error(...args: unknown[]): void;
}

interface ShortcutConfig {
  description?: string;
  context?: string | ((currentContext: string) => boolean);
  preventDefault?: boolean;
  stopPropagation?: boolean;
  priority?: number;
  debounce?: boolean;
  category?: string;
}

interface SequenceConfig {
  description?: string;
  resetOnError?: boolean;
  caseSensitive?: boolean;
  category?: string;
}

interface LongPressConfig {
  duration?: number;
  description?: string;
  category?: string;
}

interface ShortcutHandler {
  handler: (event: KeyboardEvent, context: HandlerContext) => void | false;
  config: Required<ShortcutConfig>;
}

interface HandlerContext {
  key?: string;
  context?: string;
  sequence?: string[];
  duration?: number;
  config?: SequenceConfig | LongPressConfig | null;
}

interface KeyInfo {
  code: string;
  key: string;
  normalizedKey: string;
}

interface PressedKeyState {
  timestamp: number;
  timer: ReturnType<typeof setTimeout> | null;
}

interface TrieNode {
  children: Map<string, TrieNode>;
  handler: ((context: HandlerContext) => void) | null;
  config: SequenceConfig | null;
}

interface SequenceSearchResult {
  match: boolean;
  hasPrefix: boolean;
  handler?: ((context: HandlerContext) => void) | null;
  config?: SequenceConfig | null;
}

interface ShortcutListItem {
  type: 'shortcut' | 'sequence' | 'longpress';
  key?: string;
  sequence?: string;
  description: string;
  context?: string | ((currentContext: string) => boolean);
  priority?: number;
  duration?: number;
  category: string;
}

interface MemoryStatus {
  activeShortcuts: number;
  activeSequences: number;
  activeLongPress: number;
  pressedKeys: number;
  pendingDebounce: number;
  hasSequenceTimer: boolean;
  currentSequence: number;
  initialized: boolean;
}

// ==================== CLASSE PRINCIPAL ====================

class KeyboardShortcutManager {
  private options: Required<KeyboardShortcutOptions>;
  private logger: Logger;
  private shortcuts: Map<string, ShortcutHandler[]>;
  private sequences: SequenceTrie;
  private longPressHandlers: Map<string, { handler: (event: KeyboardEvent, context: HandlerContext) => void; config: Required<LongPressConfig> }>;
  private currentSequence: string[];
  private sequenceTimer: ReturnType<typeof setTimeout> | null;
  private pressedKeys: Map<string, PressedKeyState>;
  private debounceTimers: Map<string, ReturnType<typeof setTimeout>>;
  private contextStack: string[];
  private initialized: boolean;

  constructor(options: KeyboardShortcutOptions = {}) {
    // Validação de opções
    if (options && typeof options !== 'object') {
      throw new TypeError('Options must be an object');
    }

    // Configurações padrão
    this.options = {
      enableSequences: true,
      enableLongPress: true,
      sequenceTimeout: 1000,
      longPressDuration: 3000,
      debounceDelay: 50,
      debug: false,
      logger: console,
      ...options,
    };

    this.logger = this.options.logger;

    // Armazenamento de atalhos registrados
    this.shortcuts = new Map();
    this.sequences = new SequenceTrie();
    this.longPressHandlers = new Map();

    // Estado interno com cleanup rigoroso
    this.currentSequence = [];
    this.sequenceTimer = null;
    this.pressedKeys = new Map();
    this.debounceTimers = new Map();

    // Stack de contextos
    this.contextStack = ['global'];

    // Estado de inicialização
    this.initialized = false;

    // Bind dos métodos
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.logger.info('KeyboardShortcutManager', 'KeyboardShortcutManager v2.0 criado');
  }

  // ==================== INICIALIZAÇÃO ====================

  /**
   * Inicializa os event listeners
   * @returns {KeyboardShortcutManager} Retorna this para encadeamento
   */
  init(): KeyboardShortcutManager {
    if (this.initialized) {
      this._log('Já inicializado, ignorando');
      return this;
    }

    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);

    // Prevenção de vazamento: limpa estado quando janela perde foco
    window.addEventListener('blur', this.handleBlur);

    this.initialized = true;
    this._log('Event listeners registrados');

    if (this.options.debug) {
      setInterval(() => {
        const status = this.getMemoryStatus();
        if (status.pressedKeys > 5 || status.pendingDebounce > 10) {
          console.warn('⚠️ Possível vazamento detectado:', status);
        }
      }, 30000);
    }
    return this;
  }

  /**
   * Configura o modo debug
   */
  setDebug(enabled: boolean): KeyboardShortcutManager {
    this.options.debug = enabled;
    return this;
  }


  /**
   * Remove os event listeners e limpa todos os recursos
   * @returns {KeyboardShortcutManager} Retorna this para consistência
   */
  destroy(): KeyboardShortcutManager {
    if (!this.initialized) {
      return this;
    }

    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('blur', this.handleBlur);

    // Limpa todos os recursos
    this.shortcuts.clear();
    this.sequences.clear();
    this.longPressHandlers.clear();
    this._clearAllTimers();

    // Limpa debounce timers
    for (const timer of this.debounceTimers.values()) {
      clearTimeout(timer);
    }
    this.debounceTimers.clear();

    this.initialized = false;
    this._log('KeyboardShortcutManager destruído');
    return this;
  }

  // ==================== REGISTRO DE ATALHOS ====================

  /**
   * Registra um atalho simples
   * @param {string} key - Tecla ou combinação
   * @param {Function} handler - Callback a ser executado
   * @param {Object} options - Opções do atalho
   * @returns {KeyboardShortcutManager} Retorna this para encadeamento
   */
  register(
    key: string,
    handler: (event: KeyboardEvent, context: HandlerContext) => void | false,
    options: ShortcutConfig = {}
  ): KeyboardShortcutManager {
    // Validação rigorosa
    this._validateKey(key);
    this._validateHandler(handler);
    this._validateOptions(options);

    const config: Required<ShortcutConfig> = {
      description: '',
      context: 'global',
      preventDefault: true,
      stopPropagation: false,
      priority: 0,
      debounce: false,
      category: 'Geral',
      ...options,
    };

    const normalizedKey = this._normalizeKeyString(key);

    if (!this.shortcuts.has(normalizedKey)) {
      this.shortcuts.set(normalizedKey, []);
    }

    this.shortcuts.get(normalizedKey)!.push({
      handler,
      config,
    });

    // Ordena por prioridade
    this.shortcuts
      .get(normalizedKey)!
      .sort((a, b) => b.config.priority - a.config.priority);

    this._log(`Atalho registrado: ${normalizedKey}`, config);
    return this;
  }

  /**
   * Registra uma sequência de teclas
   * @param {Array<string>} sequence - Array de teclas
   * @param {Function} handler - Callback
   * @param {Object} options - Opções
   * @returns {KeyboardShortcutManager}
   */
  registerSequence(
    sequence: string[],
    handler: (context: HandlerContext) => void,
    options: SequenceConfig = {}
  ): KeyboardShortcutManager {
    // Validação
    this._validateSequence(sequence);
    this._validateHandler(handler);
    this._validateOptions(options);

    const config: SequenceConfig = {
      description: '',
      resetOnError: true,
      caseSensitive: false,
      category: 'Geral',
      ...options,
    };

    const normalizedSequence = sequence.map((key) =>
      config.caseSensitive ? key : key.toLowerCase()
    );

    // Usa Trie para O(1) lookup
    this.sequences.insert(normalizedSequence, handler, config);

    this._log(`Sequência registrada: ${normalizedSequence.join(' → ')}`, config);
    return this;
  }

  /**
   * Registra um handler para long press
   * @param {string} key - Tecla
   * @param {Function} handler - Callback
   * @param {Object} options - Opções
   * @returns {KeyboardShortcutManager}
   */
  registerLongPress(
    key: string,
    handler: (event: KeyboardEvent, context: HandlerContext) => void,
    options: LongPressConfig = {}
  ): KeyboardShortcutManager {
    this._validateKey(key);
    this._validateHandler(handler);

    const config: Required<LongPressConfig> = {
      duration: this.options.longPressDuration,
      description: '',
      category: 'Geral',
      ...options,
    };

    const normalizedKey = this._normalizeKeyString(key);
    this.longPressHandlers.set(normalizedKey, {
      handler,
      config,
    });

    this._log(`Long press registrado: ${normalizedKey} (${config.duration}ms)`, config);
    return this;
  }

  // ==================== HELPERS PARA SEQUÊNCIAS ====================

  registerKonamiCode(
    handler: (context: HandlerContext) => void,
    options: SequenceConfig = {}
  ): KeyboardShortcutManager {
    return this.registerSequence(
      [
        'ArrowUp',
        'ArrowUp',
        'ArrowDown',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'ArrowLeft',
        'ArrowRight',
        'b',
        'a',
      ],
      handler,
      { description: 'Konami Code', ...options }
    );
  }

  registerFibonacciSequence(
    handler: (context: HandlerContext) => void,
    options: SequenceConfig = {}
  ): KeyboardShortcutManager {
    return this.registerSequence(['1', '1', '2', '3', '5', '8'], handler, {
      description: 'Sequência de Fibonacci',
      ...options,
    });
  }

  // ==================== EVENT HANDLERS ====================

  /**
   * Handler principal do keydown
   */
  handleKeyDown(e: KeyboardEvent): void {
    if (!this.initialized) return;
    if (!e.key) return;

    // Ignora key repeat para long press
    if (e.repeat && this.options.enableLongPress) {
      if (!this.options.enableSequences) {
        return;
      }
    }

    // Normalização consistente
    const keyInfo = this._extractKeyInfo(e);
    const { code, key, normalizedKey } = keyInfo;

    this._log(`Keydown: ${normalizedKey} (code: ${code}, key: ${key})`);

    const isInputFocused = this._isInputFocused();
    const currentContext = isInputFocused ? 'no-input' : this.getCurrentContext();

    // === 1. LONG PRESS ===
    // Bloqueia long press se input estiver focado para evitar interferência na digitação
    if (this.options.enableLongPress && !isInputFocused) {
      this._handleLongPress(code, key, e);
    }

    // === 2. SEQUÊNCIAS ===
    if (this.options.enableSequences && !isInputFocused) {
      this._processSequence(key);
    }

    // === 3. ATALHOS NORMAIS ===
    this._executeShortcuts(normalizedKey, e, isInputFocused, currentContext);
  }

  /**
   * Handler do keyup
   */
  handleKeyUp(e: KeyboardEvent): void {
    if (!this.initialized) return;
    if (!e.key) return;

    const { code } = this._extractKeyInfo(e);

    // Cancela long press de forma segura
    this._cancelLongPress(code);
  }

  /**
   * Handler quando janela perde foco
   */
  handleBlur(): void {
    this._clearAllTimers();
    this.currentSequence = [];
    this.pressedKeys.clear();
  }

  // ==================== EXECUÇÃO DE ATALHOS ====================

  /**
   * Executa handlers de atalhos com debounce
   */
  private _executeShortcuts(
    normalizedKey: string,
    event: KeyboardEvent,
    isInputFocused: boolean,
    currentContext: string
  ): void {
    const handlers = this.shortcuts.get(normalizedKey);
    if (!handlers) return;

    for (const { handler, config } of handlers) {
      // Verifica contexto
      if (!this._checkContext(config.context, isInputFocused, normalizedKey)) {
        continue;
      }

      // Previne comportamento padrão
      if (config.preventDefault) {
        event.preventDefault();
      }

      if (config.stopPropagation) {
        event.stopPropagation();
      }

      // Aplica debounce se configurado
      if (config.debounce) {
        this._executeWithDebounce(normalizedKey, handler, event, currentContext);
      } else {
        const result = handler(event, {
          key: normalizedKey,
          context: currentContext,
        });

        if (result === false) break;
      }
    }
  }

  /**
   * Executa handler com debounce
   */
  private _executeWithDebounce(
    key: string,
    handler: (event: KeyboardEvent, context: HandlerContext) => void | false,
    event: KeyboardEvent,
    context: string
  ): void {
    // Cancela timer anterior
    if (this.debounceTimers.has(key)) {
      clearTimeout(this.debounceTimers.get(key)!);
    }

    const timer = setTimeout(() => {
      handler(event, { key, context });
      this.debounceTimers.delete(key);
    }, this.options.debounceDelay);

    this.debounceTimers.set(key, timer);
  }

  // ==================== PROCESSAMENTO DE SEQUÊNCIAS ====================

  /**
   * Processa sequência com Trie
   */
  private _processSequence(key: string): void {
    const normalizedKey = key.toLowerCase();
    this.currentSequence.push(normalizedKey);

    // Limpa timer anterior de forma segura
    this._clearSequenceTimer();

    // Busca no Trie
    const result = this.sequences.search(this.currentSequence);

    if (result.match) {
      // Sequência completa encontrada
      this._log(`Sequência completada: ${this.currentSequence.join(' → ')}`);
      result.handler!({
        sequence: [...this.currentSequence],
        config: result.config,
      });
      this.currentSequence = [];
      return;
    }

    if (!result.hasPrefix) {
      // Nenhuma sequência possível
      this._clearSequenceTimer();
      this.currentSequence = [];
      return;
    }

    // Define novo timer
    this.sequenceTimer = setTimeout(() => {
      this._log('Sequência expirou');
      this.currentSequence = [];
      this.sequenceTimer = null;
    }, this.options.sequenceTimeout);
  }

  /**
   * Limpa timer de sequência de forma segura
   */
  private _clearSequenceTimer(): void {
    if (this.sequenceTimer !== null) {
      clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    }
  }

  // ==================== LONG PRESS ====================

  /**
   * Gerencia long press com prevenção de race condition
   */
  private _handleLongPress(code: string, key: string, event: KeyboardEvent): void {
    // Verifica se tecla já está pressionada (ignora repeat)
    if (this.pressedKeys.has(code)) {
      return;
    }

    const simplifiedKey = this._normalizeKeyString(key);
    const longPressConfig = this.longPressHandlers.get(simplifiedKey);

    if (!longPressConfig) {
      // Apenas rastreia sem timer
      this.pressedKeys.set(code, {
        timestamp: Date.now(),
        timer: null,
      });
      return;
    }

    // Cria timer e salva ANTES do setTimeout
    const timer = setTimeout(() => {
      this._log(`Long press: ${simplifiedKey}`);
      longPressConfig.handler(event, {
        key: simplifiedKey,
        duration: longPressConfig.config.duration,
      });

      // Remove da lista após disparar
      this.pressedKeys.delete(code);
    }, longPressConfig.config.duration);

    // SALVA o timer em pressedKeys
    this.pressedKeys.set(code, {
      timestamp: Date.now(),
      timer: timer,
    });
  }

  /**
   * Cancela long press de forma segura
   */
  private _cancelLongPress(code: string): void {
    const keyState = this.pressedKeys.get(code);
    if (!keyState) {
      return;
    }

    if (keyState.timer !== null) {
      clearTimeout(keyState.timer);
    }

    this.pressedKeys.delete(code);
  }

  // ==================== GERENCIAMENTO DE CONTEXTOS ====================

  /**
   * Adiciona um contexto à pilha
   */
  pushContext(context: string): KeyboardShortcutManager {
    this._validateContext(context);
    this.contextStack.push(context);
    this._log(`Contexto adicionado: ${context}`, this.contextStack);
    return this;
  }

  /**
   * Remove o contexto atual da pilha
   */
  popContext(): KeyboardShortcutManager {
    if (this.contextStack.length <= 1) {
      this._log('Não é possível remover contexto global');
      return this;
    }
    const removed = this.contextStack.pop();
    this._log(`Contexto removido: ${removed}`, this.contextStack);
    return this;
  }

  /**
   * Obtém o contexto atual (topo da pilha)
   */
  getCurrentContext(): string {
    return this.contextStack[this.contextStack.length - 1];
  }

  /**
   * Verifica se contexto permite execução
   */
  private _checkContext(
    requiredContext: string | ((currentContext: string) => boolean),
    isInputFocused: boolean,
    normalizedKey: string
  ): boolean {
    // Regra de Proteção de Input (Task 51):
    const hasModifiers = normalizedKey.includes('+');
    
    if (isInputFocused && !hasModifiers) {
      this._log(`Atalho [${normalizedKey}] BLOQUEADO: Foco em input detectado.`);
      return false;
    }

    if (requiredContext === 'global') return true;
    if (requiredContext === 'no-input') return !isInputFocused;

    if (typeof requiredContext === 'function') {
      return requiredContext(this.getCurrentContext());
    }

    // Verifica se contexto requerido está na stack
    if (typeof requiredContext === 'string') {
      return this.contextStack.includes(requiredContext);
    }

    return true;
  }

  // ==================== NORMALIZAÇÃO E VALIDAÇÃO ====================

  /**
   * Extrai informações da tecla de forma consistente
   */
  private _extractKeyInfo(event: KeyboardEvent): KeyInfo {
    const code = event.code;
    const key = event.key;

    // Constrói lista de modificadores
    const modifiers: string[] = [];

    if (event.ctrlKey) modifiers.push('ctrl');
    if (event.altKey) modifiers.push('alt');
    if (event.shiftKey) modifiers.push('shift');
    if (event.metaKey) modifiers.push('meta');

    // Identifica a tecla principal
    let mainKey = key.toLowerCase();
    
    // Se houver modificadores (Ctrl/Alt), prefira usar o 'code' para letras
    // para evitar caracteres especiais de layouts internacionais (ex: AltGr + C = ©)
    if ((event.ctrlKey || event.altKey || event.metaKey) && code.startsWith('Key')) {
      mainKey = code.replace('Key', '').toLowerCase();
    }

    // Filtra modificadores da tecla principal se eles vieram no 'key'
    if (['control', 'alt', 'shift', 'meta'].includes(mainKey)) {
      mainKey = '';
    }

    // Combina e ordena para consistência (ex: alt+ctrl+c vira ctrl+alt+c)
    const allParts = [...new Set(modifiers)];
    if (mainKey) allParts.push(mainKey);
    
    // Ordenação fixa para modificadores, mantendo a tecla principal no fim
    const sortedModifiers = allParts.filter(p => ['ctrl', 'alt', 'shift', 'meta'].includes(p)).sort();
    const finalKey = allParts.filter(p => !['ctrl', 'alt', 'shift', 'meta'].includes(p));
    
    const normalizedKey = [...sortedModifiers, ...finalKey].join('+');

    return {
      code,
      key,
      normalizedKey,
    };
  }

  /**
   * Normaliza string de tecla registrada (ex: "ALT + CTRL + S" -> "alt+ctrl+s")
   */
  private _normalizeKeyString(keyString: string): string {
    const parts = keyString
      .toLowerCase()
      .replace(/command|cmd/g, 'meta')
      .replace(/option/g, 'alt')
      .split(/[\s+]+/)
      .filter(p => p.trim() !== '');

    const modifiers = parts.filter(p => ['ctrl', 'alt', 'shift', 'meta'].includes(p)).sort();
    const mainKeys = parts.filter(p => !['ctrl', 'alt', 'shift', 'meta'].includes(p));
    
    return [...modifiers, ...mainKeys].join('+');
  }

  /**
   * Verifica se foco está em input (Suporta Shadow DOM)
   */
  private _isInputFocused(): boolean {
    let el = document.activeElement;
    
    // Perfura o Shadow DOM para encontrar o elemento real com foco
    while (el && el.shadowRoot && el.shadowRoot.activeElement) {
      el = el.shadowRoot.activeElement;
    }

    return (
      ['INPUT', 'TEXTAREA', 'SELECT'].includes(el?.tagName || '') ||
      (el as HTMLElement)?.isContentEditable === true
    );
  }

  // ==================== VALIDAÇÕES ====================

  private _validateKey(key: unknown): asserts key is string {
    if (typeof key !== 'string' || key.trim() === '') {
      throw new TypeError('Key must be a non-empty string');
    }
  }

  private _validateHandler(handler: unknown): asserts handler is Function {
    if (typeof handler !== 'function') {
      throw new TypeError('Handler must be a function');
    }
  }

  private _validateSequence(sequence: unknown): asserts sequence is string[] {
    if (!Array.isArray(sequence) || sequence.length === 0) {
      throw new TypeError('Sequence must be a non-empty array');
    }
    sequence.forEach((key, index) => {
      if (typeof key !== 'string') {
        throw new TypeError(`Sequence[${index}] must be a string`);
      }
    });
  }

  private _validateOptions(options: unknown): asserts options is object {
    if (options && typeof options !== 'object') {
      throw new TypeError('Options must be an object');
    }
  }

  private _validateContext(context: unknown): asserts context is string {
    if (typeof context !== 'string' || context.trim() === '') {
      throw new TypeError('Context must be a non-empty string');
    }
  }

  // ==================== LIMPEZA DE RECURSOS ====================

  /**
   * Limpa todos os timers ativos
   */
  private _clearAllTimers(): void {
    // Limpa timer de sequência
    this._clearSequenceTimer();

    // Limpa todos os long press timers
    for (const keyState of this.pressedKeys.values()) {
      if (keyState.timer !== null) {
        clearTimeout(keyState.timer);
      }
    }
    this.pressedKeys.clear();

    // Limpa debounce timers
    for (const timer of this.debounceTimers.values()) {
      clearTimeout(timer);
    }
    this.debounceTimers.clear();
  }

  // ==================== REMOÇÃO DE HANDLERS ====================

  unregister(key: string): KeyboardShortcutManager {
    const normalized = this._normalizeKeyString(key);
    const deleted = this.shortcuts.delete(normalized);
    if (deleted) {
      this._log(`Atalho removido: ${normalized}`);
    }
    return this;
  }

  unregisterSequence(sequence: string[]): KeyboardShortcutManager {
    const normalized = sequence.map((k) => k.toLowerCase());
    const deleted = this.sequences.delete(normalized);
    if (deleted) {
      this._log(`Sequência removida: ${normalized.join(' → ')}`);
    }
    return this;
  }

  unregisterLongPress(key: string): KeyboardShortcutManager {
    const normalized = this._normalizeKeyString(key);
    const deleted = this.longPressHandlers.delete(normalized);
    if (deleted) {
      this._log(`Long press removido: ${normalized}`);
    }
    return this;
  }

  // ==================== UTILITÁRIOS ====================

  /**
   * Lista todos os atalhos
   * @returns {Array} Lista de atalhos registrados
   */
  listShortcuts(): ShortcutListItem[] {
    const list: ShortcutListItem[] = [];

    for (const [key, handlers] of this.shortcuts) {
      handlers.forEach(({ config }) => {
        list.push({
          type: 'shortcut',
          key,
          description: config.description,
          context: config.context,
          priority: config.priority,
          category: config.category,
        });
      });
    }

    // Lista sequências do Trie
    this.sequences.forEach((sequence, _, config) => {
      list.push({
        type: 'sequence',
        sequence: sequence.join(' → '),
        description: config?.description || '',
        category: config?.category || 'Geral',
      });
    });

    for (const [key, { config }] of this.longPressHandlers) {
      list.push({
        type: 'longpress',
        key,
        description: config.description,
        duration: config.duration,
        category: config.category,
      });
    }

    return list;
  }

  /**
   * Log interno
   */
  private _log(...args: unknown[]): void {
    if (this.options.debug) {
      this.logger.log('KeyboardShortcutManager', ...args);
    }
  }

  /**
   * Método de diagnóstico - verifica se há timers pendentes
   * @returns {Object} Status da memória
   */
  getMemoryStatus(): MemoryStatus {
    return {
      activeShortcuts: this.shortcuts.size,
      activeSequences: this.sequences.root.children.size,
      activeLongPress: this.longPressHandlers.size,
      pressedKeys: this.pressedKeys.size,
      pendingDebounce: this.debounceTimers.size,
      hasSequenceTimer: this.sequenceTimer !== null,
      currentSequence: this.currentSequence.length,
      initialized: this.initialized,
    };
  }
}

// ==================== SEQUENCE TRIE ====================

/**
 * Estrutura de dados Trie otimizada para busca de sequências
 */
class SequenceTrie {
  root: TrieNode;

  constructor() {
    this.root = { children: new Map(), handler: null, config: null };
  }

  /**
   * Insere uma sequência no Trie
   */
  insert(
    sequence: string[],
    handler: (context: HandlerContext) => void,
    config: SequenceConfig
  ): void {
    let node = this.root;

    for (const key of sequence) {
      if (!node.children.has(key)) {
        node.children.set(key, {
          children: new Map(),
          handler: null,
          config: null,
        });
      }
      node = node.children.get(key)!;
    }

    node.handler = handler;
    node.config = config;
  }

  /**
   * Busca uma sequência no Trie
   */
  search(sequence: string[]): SequenceSearchResult {
    let node = this.root;

    for (const key of sequence) {
      if (!node.children.has(key)) {
        return { match: false, hasPrefix: false };
      }
      node = node.children.get(key)!;
    }

    return {
      match: node.handler !== null,
      hasPrefix: node.children.size > 0 || node.handler !== null,
      handler: node.handler,
      config: node.config,
    };
  }

  /**
   * Remove uma sequência
   */
  delete(sequence: string[]): boolean {
    const path: Array<{ node: TrieNode; key: string }> = [];
    let node = this.root;

    // Encontra o caminho
    for (const key of sequence) {
      if (!node.children.has(key)) {
        return false;
      }
      path.push({ node, key });
      node = node.children.get(key)!;
    }

    // Remove handler
    if (node.handler === null) {
      return false;
    }

    node.handler = null;
    node.config = null;

    // Remove nós desnecessários de baixo para cima
    for (let i = path.length - 1; i >= 0; i--) {
      const { node: parent, key } = path[i];
      const child = parent.children.get(key)!;

      if (child.children.size === 0 && child.handler === null) {
        parent.children.delete(key);
      } else {
        break;
      }
    }

    return true;
  }

  /**
   * Itera sobre todas as sequências
   */
  forEach(
    callback: (
      sequence: string[],
      handler: ((context: HandlerContext) => void) | null,
      config: SequenceConfig | null
    ) => void
  ): void {
    this._traverse(this.root, [], callback);
  }

  private _traverse(
    node: TrieNode,
    currentSequence: string[],
    callback: (
      sequence: string[],
      handler: ((context: HandlerContext) => void) | null,
      config: SequenceConfig | null
    ) => void
  ): void {
    if (node.handler !== null) {
      callback(currentSequence, node.handler, node.config);
    }

    for (const [key, child] of node.children) {
      this._traverse(child, [...currentSequence, key], callback);
    }
  }

  /**
   * Limpa o Trie
   */
  clear(): void {
    this.root.children.clear();
  }
}

// ==================== EXPORTAÇÃO ====================

export default KeyboardShortcutManager;