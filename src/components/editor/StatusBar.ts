import eventBus from '../../core/EventBus';
import { store, AppState } from '../../core/Store';
import { historyManager } from '../../domain/services/HistoryManager';
import { UISM } from '../../core/UISoundManager';
import { UnitConverter } from '../../utils/units';
import { getOSInfo } from '../../utils/os-detection';

export class StatusBar {
  #clickCount = 0;
  #clickTimer: ReturnType<typeof setTimeout> | null = null;
  #controller = new AbortController();
  #lastRenderTime = 0;
  #lastFps = 0;
  #frameCount = 0;
  #lastFpsUpdate = performance.now();

  // Elementos da barra (DOM global)
  #led        = document.getElementById('sys-led')!;
  #renderTime = document.getElementById('render-time')!;
  #elCount    = document.getElementById('el-count')!;
  #zoomLvl    = document.getElementById('zoom-lvl')!;

  // Elementos do template (DOM global — acessíveis diretamente)
  #tpl        = document.getElementById('telemetric-balloon') as HTMLTemplateElement;

  init(): void {
    const { signal } = this.#controller;

    eventBus.on('state:change', (state: AppState) => this.#updateTelemetry(state), { signal });
    eventBus.on('perf:render', (data: { duration: number }) => {
      this.#lastRenderTime = data.duration;
      this.#updatePerfMetrics();
    }, { signal });

    this.#led?.addEventListener('click', () => this.#handleLedClick(), { signal });

    this.#startFpsLoop();
    this.#updateTelemetry(store.getState());
  }

  destroy(): void {
    this.#controller.abort();
  }

  #startFpsLoop(): void {
    const loop = () => {
      this.#frameCount++;
      const now = performance.now();
      if (now - this.#lastFpsUpdate >= 1000) {
        this.#lastFps = Math.round((this.#frameCount * 1000) / (now - this.#lastFpsUpdate));
        this.#frameCount = 0;
        this.#lastFpsUpdate = now;
        this.#updatePerfMetrics();
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  #handleLedClick(): void {
    this.#clickCount++;
    if (this.#clickTimer) clearTimeout(this.#clickTimer);
    this.#clickTimer = setTimeout(() => { this.#clickCount = 0; }, 1000);

    if (this.#clickCount === 5) {
      this.#led?.classList.add('dev-mode');
      console.log('%c[LABEL FORGE OS] Developer Mode Unlocked', 'color: #d946ef; font-weight: bold; font-size: 14px;');
      console.table(store.getState());
      UISM.play(UISM.enumPresets.NOTIFY);
      this.#clickCount = 0;
    }
  }

  #updatePerfMetrics(): void {
    const timeStr = `${this.#lastRenderTime.toFixed(2)}MS`;

    // Barra inferior
    if (this.#renderTime) this.#renderTime.textContent = timeStr;

    // Template — atualiza antes do próximo cloneNode no hover
    if (!this.#tpl) return;
    const c = this.#tpl.content;
    const fps = c.querySelector('#fps-lvl');
    const tip = c.querySelector('#render-time-tip');
    if (fps) fps.textContent = `${this.#lastFps} FPS`;
    if (tip) tip.textContent = timeStr;
  }

  #updateTelemetry(state: AppState): void {
    if (!state.currentLabel) return;

    const count   = state.currentLabel.elements.length;
    const zoom    = Math.round(state.currentLabel.config.previewScale * 100);
    const nodes   = historyManager.getStackSize();
    const max     = historyManager.getMaxSize();
    const wPx     = Math.round(UnitConverter.mmToPx(state.currentLabel.config.widthMM,  state.currentLabel.config.dpi));
    const hPx     = Math.round(UnitConverter.mmToPx(state.currentLabel.config.heightMM, state.currentLabel.config.dpi));
    const { isMac, isMobile } = getOSInfo();

    const breakdown = state.currentLabel.elements.reduce((acc, el) => {
      acc[el.type] = (acc[el.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const breakdownStr = Object.entries(breakdown)
      .map(([t, n]) => `${t[0].toUpperCase()}:${n}`)
      .join(' ') || '...';

    // Barra inferior
    if (this.#elCount)  this.#elCount.textContent  = String(count).padStart(2, '0');
    if (this.#zoomLvl)  this.#zoomLvl.textContent  = String(zoom);

    // Template
    if (!this.#tpl) return;
    const c = this.#tpl.content;
    const q = (id: string) => c.querySelector(id);
    if (q('#canvas-res'))  q('#canvas-res')!.textContent  = `${wPx}x${hPx} PX`;
    if (q('#breakdown'))   q('#breakdown')!.textContent   = breakdownStr;
    if (q('#hist-nodes'))  q('#hist-nodes')!.textContent  = `${nodes} / ${max} Nodes`;
    if (q('#os-info'))     q('#os-info')!.textContent     = `${isMac ? 'macOS' : 'Windows/Linux'} (${isMobile ? 'Mobile' : 'Desktop'})`;
  }
}