import { sharedSheet } from '../../../utils/shared-styles';
import eventBus from '../../../core/EventBus';
import { store, AppState } from '../../../core/Store';
import { UISM } from '../../../core/UISoundManager';
import { DataSourceParser, ParsedTag } from '../../../domain/services/DataSourceParser';
import { TextElement } from '../../../domain/models/elements/SpecificElements';
import { ElementType } from '../../../domain/models/elements/BaseElement';
import { HelpContentProvider } from '../../../utils/HelpContentProvider';

// Importar componentes de UI necessários
import '../../common/AppButton';
import '../../common/AppSelect';
import '../../common/icon';
import '../../common/tooltip';
import '../../common/AppInput';

interface GroupedVariable {
  key: string;
  tags: { elementId: string; tag: ParsedTag }[];
}

/**
 * VariableManager: Módulo de gestão visual do pipeline de dados (Task 79).
 * Otimizado para sincronização granular e manutenção de foco.
 */
export class VariableManager extends HTMLElement {
  private _abortController: AbortController | null = null;
  private _variables: GroupedVariable[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = [sharedSheet];
    }
  }

  connectedCallback() {
    this.renderSkeleton();
    this.setupListeners();
    this.scanVariables();
  }

  disconnectedCallback() {
    this._abortController?.abort();
  }

  private setupListeners() {
    this._abortController = new AbortController();
    const { signal } = this._abortController;

    eventBus.on('state:change', (_state: AppState) => {
      this.scanVariables();
    }, { signal });

    const root = this.shadowRoot!;

    root.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const btnRemove = target.closest('.btn-remove-formatter');
      if (btnRemove) {
        const key = btnRemove.getAttribute('data-key')!;
        const formatter = btnRemove.getAttribute('data-formatter')!;
        this.removeFormatter(key, formatter);
        return;
      }
    }, { signal });

    root.addEventListener('app-input', (e: any) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('fallback-input')) {
        const key = target.getAttribute('data-key')!;
        const value = e.detail.value;
        this.updateFallback(key, value);
      }
    }, { signal });

    root.addEventListener('app-select', (e: any) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('add-formatter-select')) {
        const key = target.getAttribute('data-key')!;
        const formatter = e.detail.value;
        if (formatter && formatter !== 'none') {
          this.addFormatter(key, formatter);
          (target as any).value = 'none';
        }
      }
    }, { signal });
  }

  private scanVariables() {
    const state = store.getState();
    const label = state.currentLabel;
    if (!label) return;

    const textElements = label.elements.filter(el => el.type === ElementType.TEXT) as TextElement[];
    const grouped: Map<string, GroupedVariable> = new Map();

    textElements.forEach(el => {
      const tags = DataSourceParser.parseTags(el.content);
      tags.forEach((tag: ParsedTag) => {
        if (!grouped.has(tag.key)) {
          grouped.set(tag.key, { key: tag.key, tags: [] });
        }
        grouped.get(tag.key)!.tags.push({ elementId: el.id, tag });
      });
    });

    this._variables = Array.from(grouped.values());
    this.updateUI();
  }

  private async addFormatter(key: string, formatter: string) {
    const variable = this._variables.find(v => v.key === key);
    if (!variable) return;

    UISM.playCustom({ freq: 1200, duration: 0.04, type: 'square', volume: 0.1 });

    variable.tags.forEach(({ elementId, tag }) => {
      if (!tag.formatters.includes(formatter)) {
        const newTag = { ...tag, formatters: [...tag.formatters, formatter] };
        this.updateElementTag(elementId, tag.fullMatch, newTag);
      }
    });
  }

  private async removeFormatter(key: string, formatter: string) {
    const variable = this._variables.find(v => v.key === key);
    if (!variable) return;

    UISM.play(UISM.enumPresets.DELETE);

    variable.tags.forEach(({ elementId, tag }) => {
      const newTag = { ...tag, formatters: tag.formatters.filter(f => f !== formatter) };
      this.updateElementTag(elementId, tag.fullMatch, newTag);
    });
  }

  private updateFallback(key: string, fallback: string) {
    const variable = this._variables.find(v => v.key === key);
    if (!variable) return;

    variable.tags.forEach(({ elementId, tag }) => {
      const newTag = { ...tag, fallback };
      this.updateElementTag(elementId, tag.fullMatch, newTag);
    });
  }

  private updateElementTag(elementId: string, oldMatch: string, newTag: Omit<ParsedTag, 'fullMatch'>) {
    const state = store.getState();
    const el = state.currentLabel?.elements.find(e => e.id === elementId) as TextElement;
    if (!el) return;

    const newTagString = DataSourceParser.rebuildTag(newTag);
    const newContent = el.content.replace(oldMatch, newTagString);

    if (newContent !== el.content) {
      eventBus.emit('element:update', { 
        id: elementId, 
        updates: { content: newContent },
        silent: true 
      });
    }
  }

  private updateUI() {
    const shadow = this.shadowRoot!;
    const container = shadow.getElementById('vars-container');
    if (!container) return;

    if (this._variables.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <ui-icon name="cpu" style="--icon-size: 24px; opacity: 0.2; margin-bottom: 12px;"></ui-icon>
          <div class="empty-title">NO DATA-LINKS DETECTED</div>
          <div class="empty-desc">Use double braces {{variable}} in text layers to create dynamic links.</div>
        </div>
      `;
      return;
    }

    if (container.querySelector('.empty-state')) container.innerHTML = '';

    const currentKeys = new Set(this._variables.map(v => v.key));
    
    container.querySelectorAll('.var-card').forEach(card => {
      const key = card.getAttribute('data-key');
      if (key && !currentKeys.has(key)) card.remove();
    });

    const formatterOptions = [
      { value: 'none', label: '+ ADD FORMATTER' },
      ...DataSourceParser.getFormatterOptions()
    ];

    this._variables.forEach(v => {
      let card = container.querySelector(`.var-card[data-key="${v.key}"]`) as HTMLElement;
      
      if (!card) {
        card = document.createElement('div');
        card.className = 'var-card';
        card.setAttribute('data-key', v.key);
        card.innerHTML = this.getCardTemplate(v);
        container.appendChild(card);
        
        const sel = card.querySelector('.add-formatter-select') as any;
        if (sel) {
          sel.options = formatterOptions;
          sel.value = 'none';
        }
      }

      this.syncCardData(card, v);
    });
  }

  private syncCardData(card: HTMLElement, v: GroupedVariable) {
    const baseTag = v.tags[0].tag;
    const usageCount = v.tags.length;

    const badge = card.querySelector('.usage-badge');
    if (badge) badge.textContent = `${usageCount} ${usageCount === 1 ? 'LAYER' : 'LAYERS'}`;

    const pipelineMid = card.querySelector('.pipeline-dynamic-steps');
    if (pipelineMid) {
      const currentFmts = Array.from(pipelineMid.querySelectorAll('.formatter-block')).map(b => b.getAttribute('data-fmt'));
      const newFmts = baseTag.formatters;

      if (JSON.stringify(currentFmts) !== JSON.stringify(newFmts)) {
        pipelineMid.innerHTML = newFmts.map(f => `
          <div class="pipeline-step">
            <div class="step-dot active"></div>
            <div class="formatter-block" data-fmt="${f}">
              <span class="formatter-name">:${f}</span>
              <button class="btn-remove-formatter" data-key="${v.key}" data-formatter="${f}">×</button>
            </div>
          </div>
        `).join('');
      }
    }

    const input = card.querySelector('.fallback-input') as any;
    if (input) {
      const isFocused = this.shadowRoot!.activeElement === input || input.shadowRoot?.activeElement;
      if (!isFocused && input.value !== (baseTag.fallback || '')) {
        input.value = baseTag.fallback || '';
      }
    }
  }

  private getCardTemplate(v: GroupedVariable) {
    return `
      <div class="var-header">
        <span class="var-tag">{{${v.key}}}</span>
        <span class="usage-badge">...</span>
      </div>

      <div class="pipeline-area">
        <div class="pipeline-line"></div>
        
        <div class="pipeline-step">
          <div class="step-dot"></div>
          <div class="step-label">RAW INPUT</div>
        </div>

        <div class="pipeline-dynamic-steps"></div>

        <div class="pipeline-step">
          <div class="step-dot plus"></div>
          <div class="add-area">
            <app-select 
              class="add-formatter-select" 
              data-key="${v.key}" 
              placeholder="+ ADD FORMATTER"
              style="width: 140px; --select-height: 24px;"
            ></app-select>
          </div>
        </div>

        <div class="pipeline-step">
          <div class="step-dot success"></div>
          <div class="step-label text-accent-success">FORMATTED OUTPUT</div>
        </div>
      </div>

      <div class="fallback-area">
        <app-input 
          class="fallback-input" 
          data-key="${v.key}" 
          label="Fallback Value" 
          placeholder="Ex: N/A"
        ></app-input>
      </div>
    `;
  }

  private renderSkeleton() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; flex-direction: column; height: 100%; background: #0a0c10; font-family: var(--font-sans); }
        .header { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; border-bottom: 1px solid var(--color-border-ui); background: rgba(0,0,0,0.2); }
        .header-title { font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.1em; }
        #vars-container { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 24px; }
        .var-card { background: rgba(255,255,255,0.02); border: 1px solid var(--color-border-ui); border-radius: 12px; padding: 16px; margin-bottom: 8px; }
        .var-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .var-tag { font-family: var(--font-mono); font-size: 12px; color: var(--color-accent-primary); background: rgba(99, 102, 241, 0.1); padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(99, 102, 241, 0.2); }
        .usage-badge { font-family: var(--font-mono); font-size: 8px; color: var(--color-text-muted); padding: 2px 6px; border-radius: 4px; background: rgba(255,255,255,0.05); }
        .pipeline-area { position: relative; padding-left: 20px; display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
        .pipeline-line { position: absolute; left: 3px; top: 8px; bottom: 8px; width: 2px; background: var(--color-border-ui); opacity: 0.3; }
        .pipeline-step { display: flex; align-items: center; gap: 12px; position: relative; min-height: 24px; }
        .step-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-border-ui); border: 2px solid #161920; position: absolute; left: -20px; z-index: 2; }
        .step-dot.active { background: var(--color-accent-primary); box-shadow: 0 0 8px var(--color-accent-primary); }
        .step-dot.plus { background: var(--color-text-muted); }
        .step-dot.success { background: var(--color-accent-success); box-shadow: 0 0 8px var(--color-accent-success); }
        .step-label { font-family: var(--font-mono); font-size: 9px; color: var(--color-text-muted); text-transform: uppercase; }
        .formatter-block { display: flex; align-items: center; gap: 8px; background: var(--color-surface-elevated); border: 1px solid var(--color-border-ui); padding: 4px 8px; border-radius: 6px; transition: all 0.2s; }
        .formatter-block:hover { border-color: var(--color-accent-primary); }
        .formatter-name { font-family: var(--font-mono); font-size: 10px; color: var(--color-text-main); }
        .btn-remove-formatter { background: transparent; border: none; color: var(--color-text-muted); cursor: pointer; font-size: 14px; padding: 0 4px; }
        .btn-remove-formatter:hover { color: var(--color-accent-danger); }
        .add-area { opacity: 0.7; transition: opacity 0.2s; }
        .add-area:hover { opacity: 1; }
        .fallback-area { margin-top: 16px; padding-top: 16px; border-top: 1px dashed var(--color-border-ui); }
        .empty-state { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px; }
        .empty-title { font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: var(--color-text-main); margin-bottom: 8px; }
        .empty-desc { font-size: 10px; color: var(--color-text-muted); max-width: 200px; line-height: 1.4; }
        .pipeline-dynamic-steps { display: flex; flex-direction: column; gap: 12px; }
      </style>

      <div class="header">
        <span class="header-title">Variable Manager</span>
        ${HelpContentProvider.buildTooltip('variables', 'bottom')}
      </div>

      <div id="vars-container"></div>
    `;
  }
}

customElements.define('variable-manager', VariableManager);
