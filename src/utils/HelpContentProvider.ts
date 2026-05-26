/**
 * HelpTooltipConfig: Interface rigorosa para forçar o padrão de conteúdo de ajuda.
 */
export interface HelpTooltipConfig {
  title: string;
  icon: string; // Ícone do header
  commands: { key?: string; label: string; desc: string }[];
  proTip?: { icon: string; text: string; isSuccess?: boolean };
}

/**
 * InspectorHelpData: O Banco de Dados Estático de Ajuda para o Cockpit.
 */
export const InspectorHelpData: Record<string, HelpTooltipConfig> = {
  transform: {
    title: 'Transform Settings',
    icon: 'maximize',
    commands: [
      { label: 'Position', desc: 'Define as coordenadas X e Y.' },
      { label: 'Scale', desc: 'Define largura (W) e altura (H).' },
      { label: 'Rotation', desc: 'Gira o elemento em graus.' }
    ],
    proTip: {
      icon: 'link',
      text: 'Use o ícone de corrente para manter a proporção original.',
      isSuccess: false
    }
  },
  text: {
    title: 'Typography Pro',
    icon: 'text',
    commands: [
      { label: 'Scale', desc: 'Ajusta fonte para caber na caixa.' },
      { label: 'Wrap', desc: 'Quebra texto em múltiplas linhas.' },
      { label: 'Lead', desc: 'Espaçamento entre linhas (multiplicador).' },
      { label: 'Justify', desc: 'Distribui o texto entre as bordas.' }
    ],
    proTip: {
      icon: 'brackets',
      text: 'Formatadores: <code class="text-accent-primary/80">:upper</code>, <code class="text-accent-primary/80">:currency</code>, <code class="text-accent-primary/80">:date</code>. Ex: <code class="text-accent-primary/80">{{valor:currency}}</code>',
      isSuccess: false
    }
  },
  rect: {
    title: 'Shape Properties',
    icon: 'rect',
    commands: [
      { label: 'Radius', desc: 'Arredonda os cantos da forma.' },
      { label: 'Stroke', desc: 'Espessura do contorno externo.' }
    ],
    proTip: {
      icon: 'lightbulb',
      text: 'Defina cor de preenchimento como transparente se desejar apenas o contorno.',
      isSuccess: false
    }
  },
  image: {
    title: 'Image Intelligence',
    icon: 'image',
    commands: [
      { label: 'Cover', desc: 'Preenche a área cortando as sobras.' },
      { label: 'Contain', desc: 'Ajusta a imagem sem realizar cortes.' },
      { label: 'Blend', desc: 'Mescla a imagem com as camadas inferiores.' }
    ],
    proTip: {
      icon: 'sparkles',
      text: 'Desative "Smoothing" para códigos de barras ou pixel art nítidos.',
      isSuccess: false
    }
  },
  border: {
    title: 'Frame Decoration',
    icon: 'blocks',
    commands: [
      { label: 'Inset', desc: 'Recuo da moldura em relação ao canvas.' },
      { label: 'Double', desc: 'Cria uma moldura concêntrica dupla.' }
    ],
    proTip: {
      icon: 'pencil-ruler',
      text: 'O raio da borda interna é calculado para ser harmônico com a externa.',
      isSuccess: false
    }
  },
  code: {
    title: 'Code Generation',
    icon: 'qr-code',
    commands: [
      { label: 'Format', desc: 'QR Code, Code 128, EAN-13 e outros.' },
      { label: 'Dynamic', desc: 'Injete variáveis {{key}} no conteúdo.' },
      { label: 'ECC', desc: 'Nível de correção de erros para QR Codes.' }
    ],
    proTip: {
      icon: 'sparkles',
      text: 'Use códigos de barras para logística e QR Codes para links ou pagamentos.',
      isSuccess: false
    }
  },
  setup: {
    title: 'Document Setup',
    icon: 'settings',
    commands: [
      { label: 'Presets', desc: 'Tamanhos de etiquetas do mercado.' },
      { label: 'DPI', desc: 'Resolução (300 para impressão).' },
      { label: 'Bleed', desc: 'Sangria para evitar bordas brancas.' }
    ],
    proTip: {
      icon: 'database',
      text: ' Designs são salvos localmente em tempo real.',
      isSuccess: false
    }
  },
  layout: {
    title: 'Power Layout',
    icon: 'move',
    commands: [
      { label: 'Align', desc: 'Alinha elementos pelas bordas ou centro.' },
      { label: 'Distribute', desc: 'Equaliza o espaço entre 3+ elementos.' },
      { label: 'Canvas', desc: 'Usa as bordas da etiqueta como âncora.' }
    ],
    proTip: {
      icon: 'layers',
      text: 'Alinhamentos funcionam melhor com elementos de dimensões similares.',
      isSuccess: false
    }
  },
  global: {
    title: 'Technical Guide',
    icon: 'cpu',
    commands: [
      { key: 'Alt+1..6', label: 'Modules', desc: 'Troca rápida de abas.' },
      { key: '.', label: 'Cycle', desc: 'Seleciona próxima camada.' },
      { key: '[ ]', label: 'Z-Index', desc: 'Avança/Recua camada.' },
      { key: 'Shift', label: 'Arrows', desc: 'Ajuste rápido (±10mm)' },
      { key: 'Alt', label: 'Arrows', desc: 'Ajuste fino (±0.1mm)' }
    ],
    proTip: {
      icon: 'keyboard',
      text: 'Pressione <kbd class="kbd-prism">Ctrl</kbd>+<kbd class="kbd-prism">/</kbd> para o mapa completo de atalhos.',
      isSuccess: false
    }
  },
  production: {
    title: 'Production Studio',
    icon: 'lightning',
    commands: [
      { label: 'CSV Link', desc: 'Mapeia colunas da planilha para o design.' },
      { label: 'Paginator', desc: 'Navega pelos registros para Live Preview.' },
      { label: 'Imposition', desc: 'Organiza etiquetas no A4 para impressão.' }
    ],
    proTip: {
      icon: 'lightning',
      text: 'O modo Production protege as variáveis {{var}} de edições acidentais.',
      isSuccess: true
    }
  },
  assets: {
    title: 'Asset Library',
    icon: 'image',
    commands: [
      { label: 'Bin', desc: 'Onde suas peças e logotipos ficam guardados.' },
      { label: 'Drag-Drop', desc: 'Arraste uma peça diretamente para o Canvas.' }
    ],
    proTip: {
      icon: 'sparkles',
      text: 'Arquivos SVG mantêm a nitidez infinita durante o redimensionamento.',
      isSuccess: false
    }
  },
  history: {
    title: 'Time Machine',
    icon: 'clock',
    commands: [
      { label: 'Timeline', desc: 'Fita cronológica de todas as suas ações.' },
      { label: 'Jump', desc: 'Clique em um nó para viajar no tempo.' },
      { label: 'Memory', desc: 'Limpe o cache para liberar RAM no navegador.' }
    ],
    proTip: {
      icon: 'cpu',
      text: 'Novas edições após um salto no tempo criam um novo futuro alternativo.',
      isSuccess: false
    }
  },
  variables: {
    title: 'Variable Manager',
    icon: 'cpu',
    commands: [
      { label: 'Pipeline', desc: 'Visualiza o fluxo do dado bruto ao formatado.' },
      { label: 'Formatters', desc: 'Aplica filtros como Moeda, Data ou Caixa Alta.' },
      { label: 'Fallback', desc: 'Define um valor padrão caso o dado falte.' },
      { label: 'Metadata', desc: 'Use {{index}}, {{total}}, {{date}} para informações dinâmicas.' }
    ],
    proTip: {
      icon: 'lightning',
      text: 'Alterar um formatador aqui atualiza todas as camadas que usam essa variável.',
      isSuccess: true
    }
  },
  typeface: {
    title: 'Typeface Engine',
    icon: 'text',
    commands: [
      { label: 'Inject', desc: 'Cole URLs do Google Fonts para expandir a biblioteca.' },
      { label: 'Specimen', desc: 'Edite o texto do card para testar a fonte.' },
      { label: 'Toggle', desc: 'Habilite/Desabilite fontes para otimizar performance.' }
    ],
    proTip: {
      icon: 'sparkles',
      text: 'Fontes customizadas são salvas no arquivo da etiqueta automaticamente.',
      isSuccess: true
    }
  },
  effects: {
    title: 'Prism Effects',
    icon: 'sparkles',
    commands: [
      { label: 'Blur', desc: 'Desfoque da sombra ou brilho.' },
      { label: 'Offsets', desc: 'Deslocamento horizontal e vertical.' },
      { label: 'Presets', desc: 'Estilos rápidos como Neon ou Soft.' }
    ],
    proTip: {
      icon: 'lightbulb',
      text: 'Use Offsets em zero com Blur alto para criar um efeito de brilho (Glow).',
      isSuccess: false
    }
  }
};

/**
 * HelpContentProvider: Constrói a UI de ajuda no padrão Tactile Prism.
 */
export class HelpContentProvider {
  /**
   * Constrói o HTML de um tooltip de ajuda baseado em um ID de configuração.
   */
  static buildTooltip(configId: keyof typeof InspectorHelpData, placement: string = 'left'): string {
    const config = InspectorHelpData[configId];
    if (!config) return '';

    // Monta a lista de comandos (Grid)
    const commandsHtml = config.commands.map(cmd => `
      <div class="flex items-center gap-2">
        ${cmd.key ? `<kbd class="kbd-prism">${cmd.key}</kbd>` : ''}
        <span class="font-mono text-[9px] text-accent-primary bg-accent-primary/10 px-1 rounded border border-accent-primary/20 whitespace-nowrap">${cmd.label}</span>
      </div>
      <span class="text-text-muted leading-tight">${cmd.desc}</span>
    `).join('');

    // Monta a Pro Tip (se existir)
    const tipColorClass = config.proTip?.isSuccess ? 'text-accent-success' : 'text-accent-primary';
    const proTipHtml = config.proTip ? `
      <div class="mt-3 pt-2 border-t border-white/5 flex gap-2 items-start text-[10px]">
        <ui-icon name="${config.proTip.icon}" size="sm" class="${tipColorClass} shrink-0 mt-0.5"></ui-icon>
        <span class="text-text-muted">${config.proTip.text}</span>
      </div>
    ` : '';

    // Envelopa no Web Component ui-tooltip
    return `
      <ui-tooltip placement="${placement}" delay="200">
        <button slot="target" class="text-text-muted hover:text-accent-primary hover:bg-accent-primary/10 w-5 h-5 flex items-center justify-center rounded transition-colors cursor-help" aria-label="Quick Help">
          <ui-icon name="help-circle" size="sm"></ui-icon>
        </button>
        
        <div slot="content" class="tooltip-rich-panel w-65">
          <div class="tooltip-rich-header">
            <ui-icon name="${config.icon}" size="sm" class="text-accent-primary cursor-help"></ui-icon>
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
