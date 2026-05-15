import eventBus from '../../core/EventBus';
import { store, AppState } from '../../core/Store';
import { historyManager } from '../../domain/services/HistoryManager';
import { UISM } from '../../core/UISoundManager';
import { UnitConverter } from '../../utils/units';
import { getOSInfo } from '../../utils/os-detection';

/**
 * StatusBar: Gerencia a barra de telemetria baseada em IDs no DOM global.
 * Agora com suporte a feedback de produção em segundo plano (Task 24 Juice).
 */
export class StatusBar {
  private clickCount = 0;
  private clickTimer: any;
  private abortController = new AbortController();
  private lastRenderTime = 0;
  private lastFps = 0;
  private frameCount = 0;
  private lastFpsUpdate = performance.now();

  // Cache de elementos do DOM global
  private get led() { return document.getElementById('sys-led'); }
  private get statusText() { return document.getElementById('sys-status-text'); }
  private get prodContainer() { return document.getElementById('production-status-container'); }
  private get prodPercent() { return document.getElementById('production-percent'); }
  private get renderTimeEl() { return document.getElementById('render-time'); }
  private get elCountEl() { return document.getElementById('el-count'); }
  private get zoomLvlEl() { return document.getElementById('zoom-lvl'); }
  private get tpl() { return document.getElementById('telemetric-balloon') as HTMLTemplateElement; }

  init(): void {
    const { signal } = this.abortController;

    eventBus.on('state:change', (state: AppState) => this.updateTelemetry(state), { signal });
    
    eventBus.on('perf:render', (data: { duration: number }) => {
      this.lastRenderTime = data.duration;
      this.updatePerfMetrics();
    }, { signal });

    // --- PRODUCTION FEEDBACK (JUICE) ---
    eventBus.on('production:start', () => {
      if (this.prodContainer) {
        this.prodContainer.style.display = 'flex';
        if (this.statusText) this.statusText.textContent = 'PRODUCING';
        if (this.led) this.led.style.backgroundColor = 'var(--color-accent-primary)';
      }
    }, { signal });

    eventBus.on('production:progress', (data) => {
      if (this.prodPercent) {
        this.prodPercent.textContent = `${data.progress}%`;
      }
    }, { signal });

    eventBus.on('production:complete', () => {
      this.resetProductionUI('COMPLETED');
      UISM.play(UISM.enumPresets.SUCCESS);
      setTimeout(() => this.resetProductionUI(), 3000);
    }, { signal });

    eventBus.on('production:error', (data) => {
      this.resetProductionUI('ERROR');
      if (this.led) this.led.style.backgroundColor = 'var(--color-accent-danger)';
      console.error('[StatusBar] Production Error:', data.message);
      setTimeout(() => this.resetProductionUI(), 5000);
    }, { signal });

    this.led?.addEventListener('click', () => this.handleLedClick());

    this.startFpsLoop();
    this.updateTelemetry(store.getState());
  }

  private resetProductionUI(tempText?: string) {
    if (this.prodContainer) this.prodContainer.style.display = 'none';
    if (this.statusText) this.statusText.textContent = tempText || 'SYS OK';
    if (this.led) {
      this.led.style.backgroundColor = ''; // Volta ao CSS original (success)
    }
  }

  destroy(): void {
    this.abortController.abort();
  }

  private startFpsLoop() {
    const loop = () => {
      this.frameCount++;
      const now = performance.now();
      if (now - this.lastFpsUpdate >= 1000) {
        this.lastFps = Math.round((this.frameCount * 1000) / (now - this.lastFpsUpdate));
        this.frameCount = 0;
        this.lastFpsUpdate = now;
        this.updatePerfMetrics();
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  private handleLedClick() {
    this.clickCount++;
    clearTimeout(this.clickTimer);
    
    this.clickTimer = setTimeout(() => { this.clickCount = 0; }, 1000);

    if (this.clickCount === 5) {
      this.led?.classList.add('dev-mode-magenta');
      console.log('%c[LABEL FORGE OS] Developer Mode Unlocked', 'color: #d946ef; font-weight: bold; font-size: 14px;');
      console.table(store.getState());
      UISM.play(UISM.enumPresets.NOTIFY);
      this.clickCount = 0;
    }
  }

  private updatePerfMetrics() {
    const timeStr = `${this.lastRenderTime.toFixed(2)}MS`;
    if (this.renderTimeEl) this.renderTimeEl.textContent = timeStr;

    if (this.tpl) {
      const c = this.tpl.content;
      const fps = c.querySelector('#fps-lvl');
      const tip = c.querySelector('#render-time-tip');
      if (fps) fps.textContent = `${this.lastFps} FPS`;
      if (tip) tip.textContent = timeStr;
    }
  }

  private updateTelemetry(state: AppState) {
    if (!state.currentLabel) return;

    const count = state.currentLabel.elements.length;
    const zoom = Math.round(state.currentLabel.config.previewScale * 100);
    const nodes = historyManager.getStackSize();
    const maxNodes = historyManager.getMaxSize();
    const wPx = Math.round(UnitConverter.mmToPx(state.currentLabel.config.widthMM, state.currentLabel.config.dpi));
    const hPx = Math.round(UnitConverter.mmToPx(state.currentLabel.config.heightMM, state.currentLabel.config.dpi));
    const { isMac, isMobile } = getOSInfo();

    if (this.elCountEl) this.elCountEl.textContent = String(count).padStart(2, '0');
    if (this.zoomLvlEl) this.zoomLvlEl.textContent = String(zoom);

    if (this.tpl) {
      const c = this.tpl.content;
      const res = c.querySelector('#canvas-res');
      const hist = c.querySelector('#hist-nodes');
      const env = c.querySelector('#os-info');
      const breakEl = c.querySelector('#breakdown');

      if (res) res.textContent = `${wPx}x${hPx} PX`;
      if (hist) hist.textContent = `${nodes} / ${maxNodes} Nodes`;
      if (env) env.textContent = `${isMac ? 'macOS' : 'Windows/Linux'} (${isMobile ? 'Mobile' : 'Desktop'})`;
      
      if (breakEl) {
        const breakdown = state.currentLabel.elements.reduce((acc, el) => {
          acc[el.type] = (acc[el.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        breakEl.textContent = Object.entries(breakdown).map(([t, n]) => `${t[0].toUpperCase()}:${n}`).join(' ');
      }
    }
  }
}
