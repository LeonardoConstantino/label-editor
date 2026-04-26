/**
 * @fileoverview Gerenciador de sons UI via Web Audio API com suporte a acordes, ruído colorido, filtros e envelopes ADSR
 * @module UISoundManager
 */

import { logger } from "./Logger";

/**
 * Configuração de envelope ADSR
 */
export interface Envelope {
  /** Tempo de ataque em segundos (padrão: 0.005) */
  attack?: number;
  /** Tempo de decay em segundos */
  decay?: number;
  /** Nível de sustain (0-1, padrão: 0) */
  sustain?: number;
  /** Tempo de release em segundos (padrão: 0.05) */
  release?: number;
}

/**
 * Configuração de ruído colorido
 */
export interface NoiseConfig {
  /** Volume do ruído (0-1, padrão: 0.1) */
  amount?: number;
  /** Tipo de ruído (padrão: 'white') */
  type?: 'white' | 'pink' | 'brown';
  /** Duração do ruído em segundos (padrão: duração do som) */
  duration?: number;
}

/**
 * Configuração de filtro
 */
export interface FilterConfig {
  /** Tipo de filtro (padrão: 'lowpass') */
  type?: 'lowpass' | 'highpass' | 'bandpass' | 'notch';
  /** Frequência de corte em Hz (padrão: 1000) */
  frequency?: number;
  /** Fator de qualidade (padrão: 1) */
  Q?: number;
}

/**
 * Configuração de sweep de frequência
 */
export interface SweepConfig {
  /** Frequência inicial em Hz (20-20000) */
  from: number;
  /** Frequência final em Hz (20-20000) */
  to: number;
}

/**
 * Preset de som configurável
 */
export interface SoundPreset {
  /** Frequências em Hz (acorde ou tom único) */
  freq?: number[] | number;
  /** Configuração de sweep de frequência */
  sweep?: SweepConfig;
  /** Duração total em segundos */
  duration: number;
  /** Forma de onda (padrão: 'sine') */
  type?: 'sine' | 'square' | 'sawtooth' | 'triangle';
  /** Volume (0-1, padrão: 0.2) */
  volume?: number;
  /** Envelope ADSR */
  envelope?: Envelope;
  /** Configuração de ruído */
  noise?: NoiseConfig;
  /** Configuração de filtro */
  filter?: FilterConfig;
}

/**
 * Nomes de presets disponíveis
 */
export type PresetName =
  | 'click'
  | 'tap'
  | 'success'
  | 'notify'
  | 'warning'
  | 'error'
  | 'swooshIn'
  | 'swooshOut'
  | 'delete'
  | 'undo'
  | 'save'
  | 'toggle'
  | 'open'
  | 'close'
  | 'new'
  | 'cut'
  | 'copy'
  | 'paste'
  | 'select'
  | 'zoomIn'
  | 'zoomOut'
  | 'find'
  | 'replace'
  | 'export';

/**
 * Opções de inicialização do UISoundManager
 */
export interface UISoundManagerOptions {
  /** Ativa/desativa sons (padrão: true) */
  enabled?: boolean;
  /** Intervalo mínimo entre sons do mesmo preset em ms (padrão: 50) */
  throttle?: number;
  /** Logger customizado (padrão: console) */
  logger?: {
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    debug: (...args: any[]) => void;
  };
}

/**
 * Estrutura interna de rastreamento de nós de áudio
 */
interface SoundNodes {
  masterGain: GainNode;
  filterNode: BiquadFilterNode | null;
  sources: (OscillatorNode | AudioBufferSourceNode)[];
  noiseGain?: GainNode;
}

export class UISoundManager {
  /**
   * Presets de sons otimizados para interfaces modernas
   */
  static readonly PRESETS: Record<PresetName, SoundPreset> = {
    // Click básico: tom único com ruído branco muito suave (textura de "toque")
    click: {
      freq: [1200],
      duration: 0.06,
      type: 'sine',
      volume: 0.15,
      envelope: { attack: 0.001, decay: 0.04, sustain: 0, release: 0 },
      noise: { amount: 0.02, type: 'white', duration: 0.02 },
    },

    // Tap: mais agudo, ainda mais curto
    tap: {
      freq: [2000],
      duration: 0.03,
      type: 'sine',
      volume: 0.1,
      envelope: { attack: 0.001, decay: 0.025 },
    },

    // Success: acorde maior (Dó maior: 523, 659, 784) com envelope suave
    success: {
      freq: [523, 659, 784],
      duration: 0.35,
      type: 'triangle',
      volume: 0.15,
      envelope: { attack: 0.008, decay: 0.25, sustain: 0.05 },
    },

    // Notify: acorde de sétima (dissonância suave) para chamar atenção
    notify: {
      freq: [880, 1100, 1320],
      duration: 0.2,
      type: 'sine',
      volume: 0.18,
      envelope: { attack: 0.008, decay: 0.15 },
    },

    // Warning: intervalo de segunda menor com filtro lowpass para suavizar
    warning: {
      freq: [440, 466],
      duration: 0.3,
      type: 'sawtooth',
      volume: 0.16,
      filter: { type: 'lowpass', frequency: 800, Q: 1 },
      envelope: { attack: 0.01, decay: 0.25 },
    },

    // Error: trítono com ruído rosa e filtro bandpass
    error: {
      freq: [400, 566],
      duration: 0.4,
      type: 'square',
      volume: 0.18,
      noise: { amount: 0.1, type: 'pink', duration: 0.3 },
      filter: { type: 'bandpass', frequency: 500, Q: 2 },
      envelope: { attack: 0.005, decay: 0.3 },
    },

    // SwooshIn: sweep ascendente com filtro passa-baixa
    swooshIn: {
      sweep: { from: 200, to: 1200 },
      duration: 0.15,
      type: 'sine',
      volume: 0.15,
      filter: { type: 'lowpass', frequency: 1200, Q: 0.5 },
      envelope: { attack: 0.004, decay: 0.12 },
    },

    // SwooshOut: sweep descendente
    swooshOut: {
      sweep: { from: 1200, to: 200 },
      duration: 0.15,
      type: 'sine',
      volume: 0.15,
      filter: { type: 'lowpass', frequency: 800, Q: 0.5 },
      envelope: { attack: 0.004, decay: 0.12 },
    },

    // Delete: ruído marrom + tons graves (simula objeto caindo/papel amassado)
    delete: {
      freq: [150, 180],
      duration: 0.2,
      type: 'triangle',
      volume: 0.16,
      noise: { amount: 0.3, type: 'brown', duration: 0.2 },
      filter: { type: 'lowpass', frequency: 400 },
      envelope: { attack: 0.01, decay: 0.18 },
    },

    // Undo: acorde ascendente curto (dois tons)
    undo: {
      freq: [600, 750],
      duration: 0.12,
      type: 'sine',
      volume: 0.16,
      envelope: { attack: 0.002, decay: 0.1 },
    },

    // Save: acorde maior (Ré, Fá#, Lá) com sustain curto
    save: {
      freq: [600, 750, 900],
      duration: 0.3,
      type: 'triangle',
      volume: 0.2,
      envelope: { attack: 0.006, decay: 0.25 },
    },

    // Toggle: dois tons simultâneos suaves
    toggle: {
      freq: [900, 1200],
      duration: 0.1,
      type: 'sine',
      volume: 0.14,
      envelope: { attack: 0.003, decay: 0.08 },
    },

    // Open: sweep ascendente com envelope
    open: {
      sweep: { from: 400, to: 1100 },
      duration: 0.18,
      type: 'sine',
      volume: 0.18,
      envelope: { attack: 0.004, decay: 0.15 },
    },

    // Close: sweep descendente
    close: {
      sweep: { from: 1100, to: 400 },
      duration: 0.18,
      type: 'sine',
      volume: 0.18,
      envelope: { attack: 0.004, decay: 0.15 },
    },

    new: {
      freq: [600, 800, 1000],
      duration: 0.3,
      type: 'triangle',
      volume: 0.2,
      envelope: { attack: 0.01, decay: 0.25 },
    },
    cut: {
      freq: [1500],
      duration: 0.06,
      type: 'sine',
      volume: 0.12,
      noise: { amount: 0.25, type: 'white', duration: 0.06 },
      envelope: { attack: 0.001, decay: 0.05 },
    },
    copy: {
      freq: [1000],
      duration: 0.05,
      type: 'sine',
      volume: 0.14,
      envelope: { attack: 0.001, decay: 0.04 },
    },
    paste: {
      sweep: { from: 800, to: 400 },
      duration: 0.08,
      type: 'sine',
      volume: 0.16,
      envelope: { attack: 0.002, decay: 0.07 },
    },
    select: {
      freq: [2000],
      duration: 0.02,
      type: 'sine',
      volume: 0.1,
      noise: { amount: 0.01, type: 'white', duration: 0.01 },
      envelope: { attack: 0.001, decay: 0.018 },
    },
    zoomIn: {
      sweep: { from: 200, to: 1000 },
      duration: 0.1,
      type: 'sine',
      volume: 0.15,
      envelope: { attack: 0.002, decay: 0.08 },
    },
    zoomOut: {
      sweep: { from: 1000, to: 200 },
      duration: 0.1,
      type: 'sine',
      volume: 0.15,
      envelope: { attack: 0.002, decay: 0.08 },
    },
    find: {
      freq: [900, 1100],
      duration: 0.18,
      type: 'sine',
      volume: 0.17,
      envelope: { attack: 0.005, decay: 0.15 },
    },
    replace: {
      freq: [800, 1000],
      duration: 0.22,
      type: 'triangle',
      volume: 0.19,
      noise: { amount: 0.05, type: 'pink', duration: 0.15 },
      envelope: { attack: 0.008, decay: 0.2 },
    },
    export: {
      sweep: { from: 400, to: 1200 },
      duration: 0.25,
      type: 'triangle',
      volume: 0.18,
      envelope: { attack: 0.01, decay: 0.22 },
    },
  };

  private context: AudioContext | null;
  private enabled: boolean;
  private throttleMs: number;
  private logger: UISoundManagerOptions['logger'];
  private lastPlayTime: Map<string, number>;
  private activeSounds: Set<SoundNodes>;

  /**
   * Cria gerenciador de sons UI com Web Audio API
   */
  constructor(options: UISoundManagerOptions = {}) {
    const AudioContextClass =
      (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) {
      console.warn('Web Audio API não suportada');
      this.context = null;
      this.enabled = false;
      this.throttleMs = 50;
      this.logger = console;
      this.lastPlayTime = new Map();
      this.activeSounds = new Set();
      return;
    }

    this.context = new AudioContextClass();
    this.enabled = options.enabled ?? true;
    this.throttleMs = options.throttle ?? 50;
    this.logger = options.logger || console;
    this.lastPlayTime = new Map();
    this.activeSounds = new Set();

    this.logger.info('UISoundManager', 'Instância criada com Web Audio API');
  }

  /**
   * Reproduz preset de som
   * @param presetName - Nome do preset (ex: 'click', 'success', 'error')
   * @returns true se reproduzido, false se throttled/desabilitado
   */
  play(presetName: string): boolean {
    if (!this.context || !this.enabled) return false;

    const preset = UISoundManager.PRESETS[presetName as PresetName];
    if (!preset) {
      this.logger!.warn('UISoundManager', `Preset "${presetName}" não existe`);
      return false;
    }

    const now = Date.now();
    const lastPlay = this.lastPlayTime.get(presetName) || 0;

    if (now - lastPlay < this.throttleMs) return false;
    this.lastPlayTime.set(presetName, now);

    this.synthesize(preset);
    return true;
  }

  /**
   * Reproduz som customizado com validação de parâmetros
   *
   * Requer: `duration` + (`freq` OU `sweep`)
   *
   * @param config - Configuração do som
   * @returns true se reproduzido, false se inválido/desabilitado
   *
   * @example
   * manager.playCustom({
   *   freq: [440, 554],
   *   duration: 0.2,
   *   type: 'sine'
   * });
   */
  playCustom(config: SoundPreset): boolean {
    if (!this.context || !this.enabled) return false;

    if (!config || typeof config.duration !== 'number') {
      this.logger!.warn(
        'UISoundManager',
        'playCustom requer "duration" (número)',
      );
      return false;
    }

    const hasSweep =
      config.sweep &&
      typeof config.sweep.from === 'number' &&
      typeof config.sweep.to === 'number';
    const hasFreq = config.freq !== undefined;

    if (!hasSweep && !hasFreq) {
      this.logger!.warn(
        'UISoundManager',
        'playCustom requer "freq" ou "sweep"',
      );
      return false;
    }

    // Valida frequências se fornecidas
    if (hasFreq) {
      const freqArray = Array.isArray(config.freq)
        ? config.freq
        : [config.freq];
      if (
        freqArray.some(
          (f) => typeof f !== 'number' || isNaN(f) || f < 20 || f > 20000,
        )
      ) {
        this.logger!.warn(
          'UISoundManager',
          'Frequências inválidas (devem ser números entre 20Hz e 20kHz)',
        );
        return false;
      }
    }

    // Valida sweep se fornecido
    if (hasSweep) {
      const { from, to } = config.sweep!;
      if (
        isNaN(from) ||
        isNaN(to) ||
        from < 20 ||
        from > 20000 ||
        to < 20 ||
        to > 20000
      ) {
        this.logger!.warn(
          'UISoundManager',
          'Valores de sweep inválidos (devem ser números entre 20Hz e 20kHz)',
        );
        return false;
      }
    }

    if (config.duration <= 0 || config.duration > 5) {
      this.logger!.warn(
        'UISoundManager',
        'Duração deve estar entre 0 e 5 segundos',
      );
      return false;
    }

    const validTypes = ['sine', 'square', 'sawtooth', 'triangle'];
    if (config.type && !validTypes.includes(config.type)) {
      this.logger!.warn(
        'UISoundManager',
        `Tipo "${config.type}" inválido. Use: ${validTypes.join(', ')}`,
      );
      return false;
    }

    // Normaliza configuração para preset temporário
    const freqValue = config.freq;
    const preset: SoundPreset = {
      ...config,
      freq:
        freqValue !== undefined
          ? Array.isArray(freqValue)
            ? freqValue
            : [freqValue]
          : undefined,
      sweep: hasSweep ? config.sweep : undefined,
      type: config.type || 'sine',
      volume: Math.max(0, Math.min(1, config.volume ?? 0.2)),
      envelope: config.envelope || {
        attack: 0.005,
        decay: config.duration * 0.8,
      },
    };

    this.logger!.debug(
      'UISoundManager',
      'Reproduzindo som customizado com configuração:',
      preset,
    );

    this.synthesize(preset);
    return true;
  }

  /**
   * Síntese avançada com suporte a múltiplas vozes, ruído, filtro, sweep e envelope ADSR.
   */
  private synthesize(preset: SoundPreset): void {
    if (!this.context) return;

    if (this.context.state === 'suspended') {
      this.context.resume();
    }

    const now = this.context.currentTime;
    const duration = preset.duration;
    const volume = preset.volume!;
    const envelope = preset.envelope || {
      attack: 0.005,
      decay: duration * 0.8,
    };

    // Cria nó de ganho mestre para este som
    const masterGain = this.context.createGain();
    masterGain.gain.value = 0;

    // Cria filtro se necessário
    let filterNode: BiquadFilterNode | null = null;
    if (preset.filter) {
      filterNode = this.context.createBiquadFilter();
      filterNode.type = preset.filter.type || 'lowpass';
      filterNode.frequency.value = preset.filter.frequency || 1000;
      filterNode.Q.value = preset.filter.Q || 1;
    }

    // Conecta: (osciladores/ruído) → (filtro) → masterGain → destino
    const inputStage = filterNode || masterGain;
    if (filterNode) {
      filterNode.connect(masterGain);
    }
    masterGain.connect(this.context.destination);

    // Rastreia nós para cleanup
    const soundNodes: SoundNodes = {
      masterGain,
      filterNode,
      sources: [],
    };
    this.activeSounds.add(soundNodes);

    // Cria osciladores
    if (preset.sweep) {
      const osc = this.context.createOscillator();
      osc.type = preset.type!;
      osc.frequency.setValueAtTime(preset.sweep.from, now);
      osc.frequency.linearRampToValueAtTime(preset.sweep.to, now + duration);
      osc.connect(inputStage);
      osc.start(now);
      osc.stop(now + duration);
      soundNodes.sources.push(osc);
    } else if (preset.freq) {
      const freqArray = Array.isArray(preset.freq)
        ? preset.freq
        : [preset.freq];
      freqArray.forEach((f) => {
        const osc = this.context!.createOscillator();
        osc.type = preset.type!;
        osc.frequency.value = f;
        osc.connect(inputStage);
        osc.start(now);
        osc.stop(now + duration);
        soundNodes.sources.push(osc);
      });
    }

    // Adiciona ruído se solicitado
    if (preset.noise) {
      const noiseDuration = preset.noise.duration || duration;
      const noiseBuffer = this.createNoiseBuffer(
        preset.noise.type || 'white',
        noiseDuration,
      );
      const noiseSource = this.context.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const noiseGain = this.context.createGain();
      noiseGain.gain.value = preset.noise.amount || 0.1;

      noiseSource.connect(noiseGain);
      noiseGain.connect(inputStage);
      noiseSource.start(now);
      noiseSource.stop(now + noiseDuration);

      soundNodes.sources.push(noiseSource);
      soundNodes.noiseGain = noiseGain;
    }

    // Aplica envelope ADSR
    this.applyEnvelope(masterGain, volume, envelope, now, duration);

    // Cleanup usando evento nativo do AudioContext
    this.scheduleCleanup(soundNodes, now + duration);
  }

  /**
   * Aplica envelope ADSR ao ganho
   *
   * Timeline: 0→attack (linear) → attack+decay (exp) → sustain → duration-release → duration (exp to 0)
   * - Se sustain=0, vai direto para decay → 0
   * - Garante que gain nunca seja zero para evitar erros em exponentialRamp
   */
  private applyEnvelope(
    gainNode: GainNode,
    volume: number,
    envelope: Envelope,
    startTime: number,
    duration: number,
  ): void {
    const attack = envelope.attack ?? 0.005;
    const decay = envelope.decay ?? 0.1;
    const sustain = envelope.sustain ?? 0;
    const release = envelope.release ?? 0.05;

    // Garante valores válidos para exponentialRamp (nunca zero)
    const MIN_GAIN = 0.0001;
    const sustainLevel = Math.max(MIN_GAIN, volume * sustain);
    const peakVolume = Math.max(MIN_GAIN, volume);

    gainNode.gain.setValueAtTime(MIN_GAIN, startTime);
    gainNode.gain.linearRampToValueAtTime(peakVolume, startTime + attack);

    if (sustain > 0) {
      // Attack → Decay → Sustain → Release
      gainNode.gain.exponentialRampToValueAtTime(
        sustainLevel,
        startTime + attack + decay,
      );
      gainNode.gain.setValueAtTime(
        sustainLevel,
        startTime + duration - release,
      );
      gainNode.gain.exponentialRampToValueAtTime(
        MIN_GAIN,
        startTime + duration,
      );
    } else {
      // Attack → Decay → silêncio (sem sustain)
      gainNode.gain.exponentialRampToValueAtTime(
        MIN_GAIN,
        startTime + attack + decay,
      );
    }
  }

  /**
   * Agenda limpeza de nós de áudio via BufferSource.onended
   */
  private scheduleCleanup(soundNodes: SoundNodes, stopTime: number): void {
    if (!this.context) return;

    // Cria um buffer silencioso de 1 sample para usar como timer
    const cleanupBuffer = this.context.createBuffer(
      1,
      1,
      this.context.sampleRate,
    );
    const cleanupSource = this.context.createBufferSource();
    cleanupSource.buffer = cleanupBuffer;

    // Conecta ao destino (silencioso, apenas para triggerar onended)
    const silentGain = this.context.createGain();
    silentGain.gain.value = 0;
    cleanupSource.connect(silentGain);
    silentGain.connect(this.context.destination);

    cleanupSource.start(stopTime);

    cleanupSource.onended = () => {
      // Desconecta e limpa todos os nós
      soundNodes.sources.forEach((source) => {
        try {
          source.disconnect();
        } catch (e) {}
      });

      if (soundNodes.noiseGain) {
        try {
          soundNodes.noiseGain.disconnect();
        } catch (e) {}
      }

      if (soundNodes.filterNode) {
        try {
          soundNodes.filterNode.disconnect();
        } catch (e) {}
      }

      try {
        soundNodes.masterGain.disconnect();
      } catch (e) {}
      try {
        cleanupSource.disconnect();
      } catch (e) {}
      try {
        silentGain.disconnect();
      } catch (e) {}

      this.activeSounds.delete(soundNodes);
    };
  }

  /**
   * Gera buffer de ruído colorido
   */
  private createNoiseBuffer(
    type: 'white' | 'pink' | 'brown',
    duration: number,
  ): AudioBuffer {
    if (!this.context) throw new Error('AudioContext não disponível');

    const sampleRate = this.context.sampleRate;
    const bufferSize = Math.ceil(sampleRate * duration);
    const buffer = this.context.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    if (type === 'white') {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    } else if (type === 'pink') {
      // Algoritmo Voss-McCartney para pink noise
      // Fonte: https://www.firstpr.com.au/dsp/pink-noise/
      let b0 = 0,
        b1 = 0,
        b2 = 0,
        b3 = 0,
        b4 = 0,
        b5 = 0,
        b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.969 * b2 + white * 0.153852;
        b3 = 0.8665 * b3 + white * 0.3104856;
        b4 = 0.55 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.016898;
        data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        b6 = white * 0.115926;
      }
    } else if (type === 'brown') {
      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.5;
      }
    }

    return buffer;
  }

  /**
   * Silencia todos os sons
   */
  mute(): void {
    this.logger!.debug('UISoundManager', 'Silenciando todos os sons');
    this.enabled = false;
  }

  /**
   * Habilita reprodução de sons
   */
  unmute(): void {
    this.logger!.debug('UISoundManager', 'Habilitando sons');
    this.enabled = true;
  }

  /**
   * Alterna estado de reprodução
   * @param force - Se fornecido, define estado explicitamente (true = habilitado, false = desabilitado)
   * @returns Novo estado (true = habilitado)
   */
  toggle(force?: boolean): boolean {
    if (typeof force === 'boolean') {
      this.enabled = force;
    } else {
      this.enabled = !this.enabled;
    }

    this.logger!.debug(
      'UISoundManager',
      `Alterando estado para ${this.enabled ? 'habilitado' : 'desabilitado'}`,
    );
    return this.enabled;
  }

  /**
   * Gera enum dos presets disponíveis para autocomplete
   * @returns Mapa de PRESET_NAME → "presetName"
   *
   * @example
   * manager.enumPresets.CLICK // "click"
   * manager.enumPresets.SUCCESS // "success"
   */
  get enumPresets(): Record<Uppercase<PresetName>, PresetName> {
    return Object.keys(UISoundManager.PRESETS).reduce(
      (enum_, key) => {
        enum_[key.toUpperCase() as Uppercase<PresetName>] = key as PresetName;
        return enum_;
      },
      {} as Record<Uppercase<PresetName>, PresetName>,
    );
  }

  /**
   * Destrói instância e libera recursos do AudioContext
   *
   * Interrompe sons ativos e fecha contexto de áudio
   */
  destroy(): void {
    this.logger!.debug(
      'UISoundManager',
      'Destruindo instância e liberando recursos',
    );

    this.enabled = false;

    // Limpa sons ativos imediatamente
    this.activeSounds.forEach((soundNodes) => {
      soundNodes.sources.forEach((source) => {
        try {
          source.stop();
          source.disconnect();
        } catch (e) {}
      });

      if (soundNodes.noiseGain) {
        try {
          soundNodes.noiseGain.disconnect();
        } catch (e) {}
      }

      if (soundNodes.filterNode) {
        try {
          soundNodes.filterNode.disconnect();
        } catch (e) {}
      }

      try {
        soundNodes.masterGain.disconnect();
      } catch (e) {}
    });

    this.activeSounds.clear();
    this.lastPlayTime.clear();

    if (this.context?.state !== 'closed') {
      this.context?.close();
    }

    this.logger!.debug('UISoundManager', 'Recursos liberados com sucesso');
  }
}

export const UISM = new UISoundManager({enabled: false, logger: logger});