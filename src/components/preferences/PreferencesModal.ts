import { sharedSheet } from '../../utils/shared-styles';
import eventBus from '../../core/EventBus';
import { store, AppState } from '../../core/Store';
import { UISM } from '../../core/UISoundManager';
import { UserPreferences } from '../../domain/models/UserPreferences';

// Registrar componentes necessários
import '../common/AppButton';
import '../common/AppInput';
import '../common/AppSelect';
import '../common/UINumberScrubber';
import '../common/icon';
import '../common/tooltip';

const settingsSheet = new CSSStyleSheet();
settingsSheet.replaceSync(`
  :host {
    display: block;
    width: 100%;
    height: 68dvh;
  }

  .settings-container {
    display: flex;
    height: 100%;
    background-color: #0a0c10;
    overflow: hidden;
  }

  /* Sidebar Styles */
  .sidebar {
    width: 200px;
    background-color: rgba(0, 0, 0, 0.4);
    border-right: 1px solid var(--color-border-ui);
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    backdrop-filter: blur(10px);
  }

  .sidebar-item {
    padding: 12px 24px;
    font-family: var(--font-mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
    cursor: pointer;
    transition: all 0.2s var(--ease-spring);
    border-left: 2px solid transparent;
    display: flex;
    align-items: center;
    gap: 12px;
    user-select: none;
  }

  .sidebar-item:hover {
    background-color: rgba(99, 102, 241, 0.03);
    color: var(--color-text-main);
  }

  .sidebar-item.active {
    background-color: rgba(99, 102, 241, 0.08);
    color: var(--color-accent-primary);
    border-left-color: var(--color-accent-primary);
    font-weight: 700;
    text-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
  }

  /* Content Area Styles */
  .content-area {
    flex: 1;
    padding: 40px 60px;
    overflow-y: auto;
    scroll-behavior: smooth;
    background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent 40%);
  }

  /* Visibility Control */
  .settings-section {
    display: none;
  }
  .settings-section.active {
    display: block;
    animation: fade-in 0.3s ease-out;
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .section-title {
    font-family: var(--font-mono);
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-text-main);
  }

  .card-module {
    background-color: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--color-border-ui);
    border-radius: 12px;
    padding: 28px;
    margin-bottom: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  .setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .setting-row:last-child {
    margin-bottom: 0;
  }

  .setting-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .setting-label {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    color: var(--color-text-main);
    text-transform: uppercase;
  }

  .setting-desc {
    font-size: 10px;
    color: var(--color-text-muted);
  }

  .setting-control {
    width: 240px;
    display: flex;
    justify-content: flex-end;
  }

  /* Segmented Control */
  .segmented-control {
    display: flex;
    background-color: rgba(255, 255, 255, 0.05);
    padding: 4px;
    border-radius: 8px;
    border: 1px solid var(--color-border-ui);
  }

  .segment-btn {
    padding: 6px 12px;
    font-size: 10px;
    font-family: var(--font-mono);
    text-transform: uppercase;
    color: var(--color-text-muted);
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .segment-btn.active {
    background-color: var(--color-surface-solid);
    color: var(--color-accent-primary);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  /* Grid Preview */
  .grid-preview {
    height: 100px;
    background-color: #0f1115;
    border: 1px solid var(--color-border-ui);
    border-radius: 8px;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
  }

  .grid-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  /* Custom Range */
  input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    background: transparent;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: var(--track-color, #6366f1);
    opacity: 0.3;
    border-radius: 2px;
  }

  input[type="range"]::-webkit-slider-thumb {
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: var(--track-color, #6366f1);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5px;
    box-shadow: 0 0 10px var(--track-color, #6366f1);
    transition: all 0.2s;
  }

  /* Toggle Switch */
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 36px;
    height: 20px;
  }

  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(255, 255, 255, 0.1);
    transition: .4s;
    border-radius: 20px;
    border: 1px solid var(--color-border-ui);
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 12px;
    width: 12px;
    left: 3px;
    bottom: 3px;
    background-color: var(--color-text-muted);
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: rgba(99, 102, 241, 0.2);
    border-color: var(--color-accent-primary);
  }

  input:checked + .slider:before {
    transform: translateX(16px);
    background-color: var(--color-accent-primary);
    box-shadow: 0 0 8px var(--color-accent-primary);
  }
`);

export class PreferencesModal extends HTMLElement {
  private _preferences: UserPreferences | null = null;
  private _abortController: AbortController | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet, settingsSheet];
    }
  }

  connectedCallback() {
    this._preferences = store.getState().preferences;
    this.renderSkeleton();
    this.setupListeners();
    this.syncValues();
  }

  disconnectedCallback() {
    this._abortController?.abort();
  }

  private setupListeners() {
    this._abortController = new AbortController();
    const { signal } = this._abortController;

    eventBus.on('state:change', (state: AppState) => {
      this._preferences = state.preferences;
      this.syncValues();
    }, { signal });

    const root = this.shadowRoot!;
    
    // Sidebar Navigation
    root.querySelectorAll('.sidebar-item').forEach(item => {
      item.addEventListener('click', () => {
        const sectionId = item.getAttribute('data-section');
        if (sectionId) {
          this.switchSection(sectionId);
          UISM.play(UISM.enumPresets.TAP);
        }
      });
    });

    // Delegated setting changes
    root.addEventListener('change', (e: Event) => this.handleSettingChange(e));
    root.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'UI-NUMBER-SCRUBBER') {
        const detail = (e as CustomEvent).detail;
        this.updateStore(target.getAttribute('data-prop')!, detail.value);
      } else {
        this.handleSettingChange(e);
      }
    });

    root.addEventListener('app-select', (e: any) => {
      this.updateStore(e.target.getAttribute('data-prop'), e.detail.value);
      UISM.play(UISM.enumPresets.TAP);
    });

    root.addEventListener('app-input', (e: any) => {
      this.updateStore(e.target.getAttribute('data-prop'), e.detail.value);
    });
  }

  private switchSection(sectionId: string) {
    const root = this.shadowRoot!;
    
    // Atualiza Sidebar
    root.querySelectorAll('.sidebar-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-section') === sectionId);
    });

    // Atualiza Seção
    root.querySelectorAll('.settings-section').forEach(section => {
      section.classList.toggle('active', section.id === `section-${sectionId}`);
    });

    if (sectionId === 'grid') {
      requestAnimationFrame(() => this.drawGridPreview());
    }
  }

  private handleSettingChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const prop = target.getAttribute('data-prop');
    if (!prop) return;

    let value: any;
    if (target.type === 'checkbox') {
      value = target.checked;
      if (prop === 'audioEnabled') UISM.toggle(value);
      UISM.play(UISM.enumPresets.TOGGLE);
    } else if (target.type === 'range') {
      value = parseFloat(target.value);
    } else {
      value = target.value;
    }

    this.updateStore(prop, value);
  }

  private updateStore(prop: string, value: any) {
    eventBus.emit('preferences:update', { [prop]: value });
  }

  private syncValues() {
    if (!this.shadowRoot || !this._preferences) return;
    const prefs = this._preferences;
    const root = this.shadowRoot;

    // Sincroniza inputs que não estão em foco
    root.querySelectorAll<any>('[data-prop]').forEach(input => {
      const prop = input.getAttribute('data-prop') as keyof UserPreferences;
      const val = prefs[prop];
      
      const isFocused = root.activeElement === input || input.shadowRoot?.activeElement;
      if (isFocused) return;

      if (input.type === 'checkbox') {
        if (input.checked !== val) input.checked = val;
      } else if (input.tagName === 'APP-SELECT' || input.tagName === 'UI-NUMBER-SCRUBBER' || input.tagName === 'APP-INPUT') {
        if (input.value !== val) input.value = val;
      } else {
        if (input.value != val) input.value = val;
      }
    });

    // Sincroniza Segmented Control (Theme)
    root.querySelectorAll('.segment-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-val') === prefs.theme);
    });

    // Preview
    this.drawGridPreview();
  }

  private drawGridPreview() {
    const canvas = this.shadowRoot?.querySelector('#grid-preview-canvas') as HTMLCanvasElement;
    if (!canvas || !this._preferences) return;

    const ctx = canvas.getContext('2d')!;
    const { gridSizeMM, gridColor, gridOpacity, showGrid } = this._preferences;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!showGrid) return;

    ctx.beginPath();
    ctx.strokeStyle = gridColor;
    ctx.globalAlpha = gridOpacity;
    ctx.lineWidth = 0.5;

    const step = gridSizeMM * 2;
    for (let x = 0; x <= canvas.width; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); }
    for (let y = 0; y <= canvas.height; y += step) { ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); }
    ctx.stroke();
  }

  private renderSkeleton() {
    if (!this.shadowRoot || !this._preferences) return;
    const {audioEnabled, showGrid, gridSizeMM, gridColor, gridOpacity, snapToGrid, snapToObjects, snapToCanvas, snapThresholdMM, unit} = this._preferences;

    this.shadowRoot.innerHTML = `
      <div class="settings-container">
        <aside class="sidebar">
          <div class="sidebar-item active" data-section="general">
            <ui-icon name="settings" style="--icon-size: 14px"></ui-icon> General
          </div>
          <div class="sidebar-item" data-section="grid">
            <ui-icon name="rect" style="--icon-size: 14px"></ui-icon> Grid Engine
          </div>
          <div class="sidebar-item" data-section="snapping">
            <ui-icon name="move" style="--icon-size: 14px"></ui-icon> Magnetic Snapping
          </div>
          <div class="sidebar-item" data-section="perf">
            <ui-icon name="cpu" style="--icon-size: 14px"></ui-icon> Performance
          </div>
        </aside>

        <main class="content-area">
          <!-- SECTION: GENERAL -->
          <section id="section-general" class="settings-section active">
            <div class="section-header">
              <ui-icon name="settings" class="text-accent-primary" style="--icon-size: 24px"></ui-icon>
              <h2 class="section-title">System & Environment</h2>
            </div>
            <div class="card-module">
              <div class="setting-row">
                <div class="setting-info">
                  <span class="setting-label">Visual Theme</span>
                  <span class="setting-desc">Configure the look and feel of the interface.</span>
                </div>
                <div class="setting-control">
                  <div class="segmented-control">
                    <button class="segment-btn" data-val="dark">Dark</button>
                    <button class="segment-btn" data-val="light">Light</button>
                    <button class="segment-btn" data-val="system">System</button>
                  </div>
                </div>
              </div>
              <div class="setting-row">
                <div class="setting-info">
                  <span class="setting-label">Audio Feedback</span>
                  <span class="setting-desc">Enable plasma-star tactile sound interactions.</span>
                </div>
                <div class="setting-control">
                  <label class="toggle-switch">
                    <input type="checkbox" data-prop="audioEnabled" ${audioEnabled ? 'checked' : ''}>
                    <span class="slider"></span>
                  </label>
                </div>
              </div>
              <div class="setting-row">
                <div class="setting-info">
                  <span class="setting-label">Measurement Unit</span>
                  <span class="setting-desc">Default unit for all design calculations.</span>
                </div>
                <div class="setting-control">
                  <app-select id="unit-select" data-prop="unit" value="${unit}" style="width: 140px"></app-select>
                </div>
              </div>
              <div class="setting-row">
                <div class="setting-info">
                  <span class="setting-label">Print Resolution</span>
                  <span class="setting-desc">Default DPI for high-fidelity exports.</span>
                </div>
                <div class="setting-control">
                  <app-select id="dpi-select" data-prop="lastUsedDpi" style="width: 140px"></app-select>
                </div>
              </div>
            </div>
          </section>

          <!-- SECTION: GRID -->
          <section id="section-grid" class="settings-section">
            <div class="section-header">
              <ui-icon name="rect" class="text-accent-primary" style="--icon-size: 24px"></ui-icon>
              <h2 class="section-title">Grid Engine</h2>
            </div>
            <div class="card-module">
              <div class="grid-preview"><canvas id="grid-preview-canvas" class="grid-canvas"></canvas></div>
              <div class="setting-row">
                <div class="setting-info">
                  <span class="setting-label">Holographic Grid</span>
                  <span class="setting-desc">Display a precise technical overlay on the canvas.</span>
                </div>
                <div class="setting-control">
                  <label class="toggle-switch"><input type="checkbox" data-prop="showGrid" ${showGrid ? 'checked' : ''}><span class="slider"></span></label>
                </div>
              </div>
              <div class="setting-row">
                <div class="setting-info"><span class="setting-label">Grid Precision</span><span class="setting-desc">Distance between lines in mm.</span></div>
                <div class="setting-control"><ui-number-scrubber data-prop="gridSizeMM" value="${gridSizeMM}" min="1" max="50" step="1" unit="mm" style="width: 120px"></ui-number-scrubber></div>
              </div>
              <div class="setting-row">
                <div class="setting-info"><span class="setting-label">Grid Chromatics</span><span class="setting-desc">Pick a color for your grid.</span></div>
                <div class="setting-control"><app-input type="color" data-prop="gridColor" value="${gridColor}" style="width: 120px"></app-input></div>
              </div>
              <div class="setting-row">
                <div class="setting-info"><span class="setting-label">Opacity</span><span class="setting-desc">Visibility intensity.</span></div>
                <div class="setting-control"><input type="range" data-prop="gridOpacity" value="${gridOpacity}" min="0.05" max="1" step="0.05" style="width: 120px"></div>
              </div>
            </div>
          </section>

          <!-- SECTION: SNAPPING -->
          <section id="section-snapping" class="settings-section">
            <div class="section-header">
              <ui-icon name="move" class="text-accent-primary" style="--icon-size: 24px"></ui-icon>
              <h2 class="section-title">Magnetic Snapping</h2>
            </div>
            <div class="card-module">
              <div class="setting-row">
                <div class="setting-info"><span class="setting-label">Snap to Grid</span><span class="setting-desc">Attract elements to grid lines.</span></div>
                <div class="setting-control"><label class="toggle-switch"><input type="checkbox" data-prop="snapToGrid" ${snapToGrid ? 'checked' : ''}><span class="slider"></span></label></div>
              </div>
              <div class="setting-row">
                <div class="setting-info"><span class="setting-label">Snap to Objects</span><span class="setting-desc">Align with other layers.</span></div>
                <div class="setting-control"><label class="toggle-switch"><input type="checkbox" data-prop="snapToObjects" ${snapToObjects ? 'checked' : ''}><span class="slider"></span></label></div>
              </div>
              <div class="setting-row">
                <div class="setting-info"><span class="setting-label">Snap to Canvas</span><span class="setting-desc">Pull towards board borders.</span></div>
                <div class="setting-control"><label class="toggle-switch"><input type="checkbox" data-prop="snapToCanvas" ${snapToCanvas ? 'checked' : ''}><span class="slider"></span></label></div>
              </div>
              <div class="setting-row">
                <div class="setting-info"><span class="setting-label">Threshold</span><span class="setting-desc">Magnetic pull distance (mm).</span></div>
                <div class="setting-control"><ui-number-scrubber data-prop="snapThresholdMM" value="${snapThresholdMM}" min="0.5" max="10" step="0.5" unit="mm" style="width: 120px"></ui-number-scrubber></div>
              </div>
            </div>
          </section>

          <!-- SECTION: PERFORMANCE -->
          <section id="section-perf" class="settings-section">
            <div class="section-header">
              <ui-icon name="cpu" class="text-accent-primary" style="--icon-size: 24px"></ui-icon>
              <h2 class="section-title">Engine & History</h2>
            </div>
            <div class="card-module">
              <div class="setting-row">
                <div class="setting-info">
                  <span class="setting-label">History Sensitivity</span>
                  <span class="setting-desc">Debounce time for continuous actions (Undo stack optimization).</span>
                </div>
                <div class="setting-control">
                  <app-select id="history-sensitivity-select" data-prop="historySensitivity" style="width: 160px"></app-select>
                </div>
              </div>
              <div class="setting-row">
                <div class="setting-info">
                  <span class="setting-label">Log Level (Console)</span>
                  <span class="setting-desc">Configure technical logging verbosity in browser console.</span>
                </div>
                <div class="setting-control">
                  <app-select id="log-level-select" data-prop="logLevel" style="width: 160px"></app-select>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    `;

    this.initWidgets();
    
    // Theme buttons listener
    this.shadowRoot.querySelectorAll('.segment-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.updateStore('theme', btn.getAttribute('data-val'));
        UISM.play(UISM.enumPresets.TAP);
      });
    });
  }

  private initWidgets() {
    const root = this.shadowRoot!;
    const unitSelect = root.getElementById('unit-select') as any;
    if (unitSelect) {
      unitSelect.options = [
        { value: 'mm', label: 'Millimeters (mm)' },
        { value: 'px', label: 'Pixels (px)' },
        { value: 'pt', label: 'Points (pt)' }
      ];
    }

    const dpiSelect = root.getElementById('dpi-select') as any;
    if (dpiSelect) {
      dpiSelect.options = [
        { value: '72', label: '72 DPI', sublabel: 'Web Standard' },
        { value: '150', label: '150 DPI', sublabel: 'Draft Quality' },
        { value: '300', label: '300 DPI', sublabel: 'Print Quality' },
        { value: '600', label: '600 DPI', sublabel: 'Ultra High-Res' }
      ];
    }

    const histSelect = root.getElementById('history-sensitivity-select') as any;
    if (histSelect) {
      histSelect.options = [
        { value: '0', label: 'Instant', sublabel: 'No debounce (Raw)' },
        { value: '400', label: 'Agile', sublabel: 'Default speed' },
        { value: '800', label: 'Balanced', sublabel: 'Optimized stack' },
        { value: '1500', label: 'Conservative', sublabel: 'Long delays' }
      ];
    }

    const logSelect = root.getElementById('log-level-select') as any;
    if (logSelect) {
      logSelect.options = [
        { value: '0', label: 'Silent', sublabel: 'No console logs' },
        { value: '1', label: 'Errors Only', sublabel: 'Critical failures' },
        { value: '2', label: 'Warnings', sublabel: 'Stability alerts' },
        { value: '3', label: 'Standard (Info)', sublabel: 'General workflow' },
        { value: '4', label: 'Full Debug', sublabel: 'Technical payloads' }
      ];
    }
  }
}

customElements.define('preferences-modal', PreferencesModal);
