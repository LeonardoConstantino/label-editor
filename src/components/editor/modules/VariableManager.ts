import { sharedSheet } from '../../../utils/shared-styles';
import eventBus from '../../../core/EventBus';
import { store, AppState } from '../../../core/Store';
import { UISM } from '../../../core/UISoundManager';
import { DataSourceParser, ParsedTag } from '../../../domain/services/DataSourceParser';
import { TextElement } from '../../../domain/models/elements/SpecificElements';
import { ElementType } from '../../../domain/models/elements/BaseElement';
import { HelpContentProvider } from '../../../utils/HelpContentProvider';
import { DataSanitizer } from '../../../core/DataSanitizer';

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

      const sysBadge = target.closest('.sys-badge') as HTMLElement;
      if (sysBadge) {
        const text = sysBadge.getAttribute('data-copy');
        if (text) {
          navigator.clipboard.writeText(text);
          eventBus.emit('notify', { message: `Copied ${text} to clipboard`, type: 'info' });
          UISM.play(UISM.enumPresets.TAP);
        }
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
        
        // Task DET-05: Construção imperativa para evitar innerHTML dinâmico
        const header = document.createElement('div');
        header.className = 'var-header';

        const tagSpan = document.createElement('span');
        tagSpan.className = 'var-tag';
        tagSpan.textContent = `{{ ${v.key} }}`;

        const usageSpan = document.createElement('span');
        usageSpan.className = 'usage-badge';
        usageSpan.textContent = `${v.tags.length} ${v.tags.length === 1 ? 'USAGE' : 'USAGES'}`;

        header.appendChild(tagSpan);
        header.appendChild(usageSpan);

        const pipelineArea = document.createElement('div');
        pipelineArea.className = 'pipeline-area';
        const pipelineLine = document.createElement('div');
        pipelineLine.className = 'pipeline-line';
        pipelineArea.appendChild(pipelineLine);

        const pipelineMid = document.createElement('div');
        pipelineMid.className = 'pipeline-dynamic-steps';
        pipelineMid.id = `pipeline-mid-${v.key}`;
        pipelineArea.appendChild(pipelineMid);

        const addArea = document.createElement('div');
        addArea.className = 'add-area';
        const sel = document.createElement('app-select') as any;
        sel.className = 'add-formatter-select';
        sel.setAttribute('data-key', v.key);
        sel.options = formatterOptions;
        sel.value = 'none';
        addArea.appendChild(sel);

        const fallbackArea = document.createElement('div');
        fallbackArea.className = 'fallback-area';
        const fallbackInput = document.createElement('app-input');
        fallbackInput.className = 'fallback-input';
        fallbackInput.setAttribute('data-key', v.key);
        fallbackInput.setAttribute('label', 'Fallback Value');
        fallbackInput.setAttribute('placeholder', 'Ex: N/A');
        fallbackInput.setAttribute('value', v.tags[0].tag.fallback || '');
        fallbackArea.appendChild(fallbackInput);

        card.appendChild(header);
        card.appendChild(pipelineArea);
        card.appendChild(addArea);
        card.appendChild(fallbackArea);
        
        container.appendChild(card);
      }

      this.syncCardData(card, v);
    });
  }

  private syncCardData(card: HTMLElement, v: GroupedVariable) {
    const baseTag = v.tags[0].tag;
    const usageCount = v.tags.length;
    const safeKey = DataSanitizer.escapeHTML(v.key);

    const badge = card.querySelector('.usage-badge');
    if (badge) badge.textContent = `${usageCount} ${usageCount === 1 ? 'LAYER' : 'LAYERS'}`;

    const pipelineMid = card.querySelector('.pipeline-dynamic-steps');
    if (pipelineMid) {
      const currentFmts = Array.from(pipelineMid.querySelectorAll('.formatter-block')).map(b => b.getAttribute('data-fmt'));
      const newFmts = baseTag.formatters;

      if (JSON.stringify(currentFmts) !== JSON.stringify(newFmts)) {
        // Task DET-05: Usar fragmento para evitar innerHTML dinâmico no pipeline
        const fragment = document.createDocumentFragment();

        newFmts.forEach(f => {
          const safeF = DataSanitizer.escapeHTML(f);
          const tip = DataSourceParser.getFormatterTip(f.split('(')[0].trim());
          
          const step = document.createElement('div');
          step.className = 'pipeline-step';
          
          const dot = document.createElement('div');
          dot.className = 'step-dot active';
          
          const block = document.createElement('div');
          block.className = 'formatter-block';
          block.setAttribute('data-fmt', safeF);
          block.title = tip; // title is safe

          const nameSpan = document.createElement('span');
          nameSpan.className = 'formatter-name';
          nameSpan.textContent = `:${safeF}`;

          const btnRemove = document.createElement('button');
          btnRemove.className = 'btn-remove-formatter';
          btnRemove.setAttribute('data-key', safeKey);
          btnRemove.setAttribute('data-formatter', safeF);
          btnRemove.textContent = '×';

          block.appendChild(nameSpan);
          block.appendChild(btnRemove);
          step.appendChild(dot);
          step.appendChild(block);
          fragment.appendChild(step);
        });

        pipelineMid.innerHTML = '';
        pipelineMid.appendChild(fragment);
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

  private renderSkeleton() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; flex-direction: column; height: 100%; background: var(--color-canvas); font-family: var(--font-sans); }
        .header { display: flex; align-items: center; justify-content: space-between; padding: var(--spacing-4) var(--spacing-5); border-bottom: 1px solid var(--color-border-ui); background: var(--color-surface); backdrop-filter: blur(8px); z-index: 10; }
        .header-title { font-family: var(--font-mono); font-size: var(--text-sm); font-weight: 700; color: var(--color-text-main); text-transform: uppercase; letter-spacing: 0.15em; }
        
        .system-tray {
          padding: var(--spacing-4) var(--spacing-5);
          background: color-mix(in srgb, var(--color-accent-primary), transparent 97%);
          border-bottom: 1px solid var(--color-border-ui);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2_5);
        }
        .system-badges { display: flex; flex-wrap: wrap; gap: var(--spacing-2); }
        .sys-badge {
          font-family: var(--font-mono); font-size: var(--text-xs); font-weight: bold;
          color: var(--color-accent-primary);
          background: color-mix(in srgb, var(--color-accent-primary), transparent 90%);
          padding: var(--spacing-1) var(--spacing-2); border-radius: var(--spacing-1_5); border: 1px solid color-mix(in srgb, var(--color-accent-primary), transparent 80%);
          cursor: pointer; transition: all 0.2s;
        }
        .sys-badge:hover { background: color-mix(in srgb, var(--color-accent-primary), transparent 80%); border-color: var(--color-accent-primary); transform: translateY(-1px); }

        #vars-container { flex: 1; overflow-y: auto; padding: var(--spacing-5); display: flex; flex-direction: column; gap: var(--spacing-6); }
        .var-card { background: color-mix(in srgb, var(--color-text-main), transparent 98%); border: 1px solid var(--color-border-ui); border-radius: 12px; padding: var(--spacing-4); margin-bottom: var(--spacing-2); }
        .var-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--spacing-4); }
        .var-tag { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-accent-primary); background: color-mix(in srgb, var(--color-accent-primary), transparent 90%); padding: var(--spacing-1) var(--spacing-2); border-radius: var(--spacing-1_5); border: 1px solid color-mix(in srgb, var(--color-accent-primary), transparent 80%); }
        .usage-badge { font-family: var(--font-mono); font-size: var(--text-tiny); color: var(--color-text-muted); padding: var(--spacing-0_5) var(--spacing-1_5); border-radius: var(--spacing-1); background: color-mix(in srgb, var(--color-text-main), transparent 95%); }
        .pipeline-area { position: relative; padding-left: var(--spacing-5); display: flex; flex-direction: column; gap: var(--spacing-3); margin-bottom: var(--spacing-5); }
        .pipeline-line { position: absolute; left: 3px; top: var(--spacing-2); bottom: var(--spacing-2); width: 2px; background: var(--color-border-ui); opacity: 0.3; }
        .pipeline-step { display: flex; align-items: center; gap: var(--spacing-3); position: relative; min-height: 24px; }
        .step-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-border-ui); border: 2px solid var(--color-surface-solid); position: absolute; left: -20px; z-index: 2; }
        .step-dot.active { background: var(--color-accent-primary); box-shadow: 0 0 8px var(--color-accent-primary); }
        .step-dot.plus { background: var(--color-text-muted); }
        .step-dot.success { background: var(--color-accent-success); box-shadow: 0 0 8px var(--color-accent-success); }
        .step-label { font-family: var(--font-mono); font-size: var(--text-2xs); color: var(--color-text-muted); text-transform: uppercase; }
        .formatter-block { display: flex; align-items: center; gap: var(--spacing-2); background: var(--color-surface-elevated); border: 1px solid var(--color-border-ui); padding: var(--spacing-1) var(--spacing-2); border-radius: var(--spacing-1_5); transition: all 0.2s; }
        .formatter-block:hover { border-color: var(--color-accent-primary); }
        .formatter-name { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-text-main); }
        .btn-remove-formatter { background: transparent; border: none; color: var(--color-text-muted); cursor: pointer; font-size: 14px; padding: 0 var(--spacing-1); }
        .btn-remove-formatter:hover { color: var(--color-accent-danger); }
        .add-area { opacity: 0.7; transition: opacity 0.2s; }
        .add-area:hover { opacity: 1; }
        .fallback-area { margin-top: var(--spacing-4); padding-top: var(--spacing-4); border-top: 1px dashed var(--color-border-ui); }
        .empty-state { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: var(--spacing-10); }
        .empty-title { font-family: var(--font-mono); font-size: var(--text-sm); font-weight: 700; color: var(--color-text-main); margin-bottom: var(--spacing-2); }
        .empty-desc { font-size: var(--text-xs); color: var(--color-text-muted); max-width: 200px; line-height: 1.4; }
        .pipeline-dynamic-steps { display: flex; flex-direction: column; gap: var(--spacing-3); }
      </style>

      <div class="header">
        <span class="header-title">Variable Manager</span>
        ${HelpContentProvider.buildTooltip('mod_variables', 'bottom')}
      </div>

      <div class="system-tray">
        <span class="label-prism" style="margin:0">System Metadata</span>
        <div class="system-badges">
          <ui-tooltip tooltip="The zero-based index of the label in the batch." placement="top">
            <span class="sys-badge" slot="target" data-copy="{{index}}">{{index}}</span>
          </ui-tooltip>
          <ui-tooltip tooltip="The total number of labels in the current batch." placement="top">
            <span class="sys-badge" slot="target" data-copy="{{total}}">{{total}}</span>
          </ui-tooltip>
          <ui-tooltip tooltip="The current generation date/time." placement="top">
            <span class="sys-badge" slot="target" data-copy="{{date}}">{{date}}</span>
          </ui-tooltip>
        </div>
        <p class="text-2xs text-text-muted italic">Click to copy or type them in any text layer.</p>
      </div>

      <div id="vars-container"></div>
    `;
  }
}

customElements.define('variable-manager', VariableManager);
