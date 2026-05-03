# Task 72: Padronização de Tooltips de Ajuda (Contextual Help)

## Objetivo
Padronizar a experiência de ajuda rápida no Inspector, adicionando tooltips ricas em todas as seções especialistas. Em vez de poluir o componente com HTML cru, implementaremos uma arquitetura de **"Content Provider + Builder"** para gerar o HTML estático dinamicamente, mantendo o código limpo e a performance intacta.

## Workflow
1. `git checkout -b task/72-help-tooltips`
2. **Criar o Utilitário de Ajuda:**
   - Criar `src/utils/HelpContentProvider.ts`.
   - Definir uma interface TypeScript rigorosa (`HelpTooltipConfig`) para garantir que toda ajuda tenha Título, Ícone, Comandos/Props e uma Pro Tip.
3. **Mapeamento de Conteúdo Estático:**
   - **Transform:** Explicar atalhos de scrubbing (Shift/Alt) e suporte a fórmulas matemáticas.
   - **Rect:** Explicar comportamento de Border Radius e Stroke.
   - **Image:** Detalhar a diferença entre os Fit Modes e o impacto do Smoothing.
   - **Border:** Listar estilos de borda suportados e lógica de arredondamento.
   - **Identificar outros locais** Identificar na interface locais onde um tip de ajuda seja importante de forma coerente
4. **Implementar a Factory Function (`buildHelpTooltip`):**
   - Criar uma função que recebe o objeto de configuração e devolve uma *Template String* contendo o `<ui-tooltip>` envelopado no layout "Tactile Prism" (usando classes globais como `.tooltip-rich-panel` e `.kbd-prism`).
5. **Integração no Inspector:**
   - Injetar a chamada da função nos cabeçalhos das seções (`<div class="section-header">`) dentro do `ElementInspector.ts`.

## Status
- [ ] **Pendente:** Aprofundar a documentação dos formatadores do interpolador dinâmico (`DataSourceParser.ts`) nas tooltips de texto e nas HUD Tips.

## Critérios de Aceite
- [x] O componente Inspector não possui HTML cru de tooltips (tudo via Provider).
- [x] Todas as seções possuem o ícone `[?]` com comportamento de `delay="200"`.
- [x] A formatação visual (Teclas 3D, Dicas com ícone, Header) é idêntica em todos os painéis.
- [x] Zero impacto de performance (apenas interpolação de strings no render).
- [x] Integração do `InspectorHelpData` com o console de dicas `ui-hud-tips`.
- [ ] Documentação exaustiva de todos os formatadores (currency, date, truncate, etc).

---

## 💻 Exemplos de Implementação (Referência Técnica)

### 1. O Arquivo `HelpContentProvider.ts`
Este arquivo concentra os dados estáticos e a lógica de montagem do HTML.

```typescript
// Interface rigorosa para forçar o padrão
export interface HelpTooltipConfig {
  title: string;
  icon: string; // Ícone do header
  commands: { key?: string; label: string; desc: string }[];
  proTip?: { icon: string; text: string; isSuccess?: boolean };
}

// O Banco de Dados Estático de Ajuda
export const InspectorHelpData: Record<string, HelpTooltipConfig> = {
  transform: {
    title: 'Transform Settings',
    icon: 'maximize',
    commands: [
      { key: 'Shift', label: 'Drag', desc: 'Salto rápido (±10mm)' },
      { key: 'Alt', label: 'Drag', desc: 'Ajuste fino (±0.1mm)' }
    ],
    proTip: {
      icon: 'calculator',
      text: 'Inputs aceitam matemática. Ex: <code class="text-accent-success/80">100/2 + 15</code>',
      isSuccess: true
    }
  },
  image: {
    title: 'Image Properties',
    icon: 'image',
    commands: [
      { label: 'Cover', desc: 'Preenche o espaço cortando sobras.' },
      { label: 'Contain', desc: 'Ajusta a imagem sem cortar.' },
    ],
    proTip: {
      icon: 'zap',
      text: 'Desligue "Smoothing" para códigos de barras nítidos.',
      isSuccess: false // Fica com a cor primária (Indigo)
    }
  }
  // Adicionar Rect, Border, etc...
};

// A Factory Function que constrói a UI no padrão Tactile Prism
export class HelpContentProvider {
  static buildTooltip(configId: keyof typeof InspectorHelpData, placement: string = 'left'): string {
    const config = InspectorHelpData[configId];
    if (!config) return '';

    // Considerar viabilidade do uso do método static renderShortcut do componente ui-keyboard-shortcuts
    // Monta a lista de comandos (Grid)
    const commandsHtml = config.commands.map(cmd => `
      <div class="flex items-center gap-2">
        ${cmd.key ? `<kbd class="kbd-prism">${cmd.key}</kbd>` : ''}
        <span class="font-mono text-[9px] text-accent-primary bg-accent-primary/10 px-1 rounded border border-accent-primary/20">${cmd.label}</span>
      </div>
      <span class="text-text-muted leading-tight">${cmd.desc}</span>
    `).join('');

    // Monta a Pro Tip (se existir)
    const tipColorClass = config.proTip?.isSuccess ? 'text-accent-success' : 'text-accent-primary';
    const proTipHtml = config.proTip ? `
      <div class="mt-3 pt-2 border-t border-white/5 flex gap-2 items-start text-[10px]">
        <ui-icon name="${config.proTip.icon}" class="w-3.5 h-3.5 ${tipColorClass} shrink-0 mt-0.5"></ui-icon>
        <span class="text-text-muted">${config.proTip.text}</span>
      </div>
    ` : '';

    // Envelopa no Web Component
    return `
      <ui-tooltip placement="${placement}" variant="primary" delay="200">
        <button slot="target" class="text-text-muted hover:text-accent-primary hover:bg-accent-primary/10 w-5 h-5 flex items-center justify-center rounded transition-colors cursor-help">
          <ui-icon name="help-circle" class="w-3.5 h-3.5"></ui-icon>
        </button>
        
        <div slot="content" class="tooltip-rich-panel w-[260px]">
          <div class="tooltip-rich-header mb-2 pb-1.5 border-b border-white/10 flex items-center gap-1.5">
            <ui-icon name="${config.icon}" class="w-3.5 h-3.5 text-accent-primary"></ui-icon>
            <span class="font-bold">${config.title}</span>
          </div>
          
          <div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2.5 items-center mt-1 text-[11px]">
            ${commandsHtml}
          </div>
          
          ${proTipHtml}
        </div>
      </ui-tooltip>
    `;
  }
}
```

### 2. Uso no `ElementInspector.ts`
Veja como o render do componente principal fica absolutamente limpo e expressivo:

```typescript
import { HelpContentProvider } from '../../utils/HelpContentProvider';

class ElementInspector extends HTMLElement {
  // ...
  
  renderTransformSection() {
    return `
      <div class="mb-4">
        <div class="flex items-center justify-between mb-3">
          <h4 class="font-mono text-[10px] text-text-muted uppercase tracking-wider font-bold">Transform</h4>
          <!-- Chamada limpa do Builder -->
          ${HelpContentProvider.buildTooltip('transform')}
        </div>
        
        <div class="grid grid-cols-2 gap-3">
          <!-- Seus inputs scruber entram aqui -->
        </div>
      </div>
    `;
  }
}
