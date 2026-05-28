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
 * Centralizado e padronizado para o Design System Tactile Prism (Task 72).
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
    title: 'Blueprint Engine',
    icon: 'settings',
    commands: [
      { label: 'Canvas', desc: 'Dimensões físicas da etiqueta.' },
      { label: 'DPI', desc: 'Resolução (300 para impressão).' },
      { label: 'Presets', desc: 'Tamanhos comuns do mercado.' }
    ],
    proTip: {
      icon: 'database',
      text: 'Designs são salvos localmente em tempo real no Vault.',
      isSuccess: true
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
  },
  line: {
    title: 'Line Geometry',
    icon: 'move',
    commands: [
      { label: 'Weight', desc: 'Define a espessura da linha.' },
      { label: 'Points', desc: 'Ajuste fino de início e fim.' },
      { label: 'Styles', desc: 'Sólido, tracejado ou pontilhado.' }
    ],
    proTip: {
      icon: 'sparkles',
      text: 'Combine com Prism Effects para criar divisores neon.',
      isSuccess: true
    }
  },
  pref_general: {
    title: 'System Environment',
    icon: 'settings',
    commands: [
      { label: 'Theme', desc: 'Alterna entre Dark, Light ou System.' },
      { label: 'Unit', desc: 'Define a unidade base (mm, px, pt).' },
      { label: 'DPI', desc: 'Resolução padrão para novos designs.' }
    ],
    proTip: {
      icon: 'music',
      text: 'O áudio tátil ajuda na percepção de encaixe (Snapping).',
      isSuccess: false
    }
  },
  pref_grid: {
    title: 'Grid Calibration',
    icon: 'rect',
    commands: [
      { label: 'Precision', desc: 'Ajusta o tamanho das células da grade.' },
      { label: 'Chromatics', desc: 'Altera a cor e visibilidade do guia.' }
    ],
    proTip: {
      icon: 'lightbulb',
      text: 'Use cores contrastantes para designs complexos.',
      isSuccess: false
    }
  },
  pref_snapping: {
    title: 'Magnetic Alignment',
    icon: 'move',
    commands: [
      { label: 'Objects', desc: 'Alinha bordas com outras camadas.' },
      { label: 'Canvas', desc: 'Atrai elementos para as bordas do papel.' },
      { label: 'Threshold', desc: 'Sensibilidade da força de atração.' }
    ],
    proTip: {
      icon: 'sparkles',
      text: 'O Snapping garante precisão milimétrica sem esforço.',
      isSuccess: true
    }
  },
  pref_ui: {
    title: 'Selection & Workspace',
    icon: 'image',
    commands: [
      { label: 'Selection', desc: 'Customiza o visual do foco ativo.' },
      { label: 'Auto Lock', desc: 'Trava camadas novas por segurança.' },
      { label: 'Default Font', desc: 'Fonte inicial para novos textos.' }
    ],
    proTip: {
      icon: 'eye',
      text: 'A cor de seleção deve ser vibrante para fácil localização.',
      isSuccess: false
    }
  },
  pref_perf: {
    title: 'Engine Performance',
    icon: 'cpu',
    commands: [
      { label: 'Sensitivity', desc: 'Delay de gravação do histórico (Undo).' },
      { label: 'Max Steps', desc: 'Profundidade máxima de memória do Undo.' },
      { label: 'Log Level', desc: 'Nível de detalhes técnicos no console.' }
    ],
    proTip: {
      icon: 'database',
      text: 'Muitos passos de histórico consomem mais RAM no navegador.',
      isSuccess: false
    }
  },
  layers_meta: {
    title: 'Layer Management',
    icon: 'layers',
    commands: [
      { label: 'Reorder', desc: 'Arraste para mudar a ordem visual.' },
      { label: 'Lock', desc: 'Impede edições acidentais na camada.' },
      { label: 'Visibility', desc: 'Oculta o elemento do canvas e export.' }
    ],
    proTip: {
      icon: 'mouse-pointer',
      text: 'Multi-seleção: Use os checkboxes ou arraste no canvas.',
      isSuccess: false
    }
  },
  layer_id: {
    title: 'Layer Identity',
    icon: 'tag',
    commands: [
      { label: 'Name', desc: 'Nome tático para identificação rápida.' },
      { label: 'Z-Index', desc: 'Prioridade de profundidade na pilha.' }
    ],
    proTip: {
      icon: 'lightbulb',
      text: 'Nomes claros ajudam na organização de etiquetas complexas.',
      isSuccess: false
    }
  },
  mod_layers: {
    title: 'Layer Properties',
    icon: 'layers',
    commands: [
      { label: 'Transform', desc: 'Posição, escala e rotação.' },
      { label: 'Style', desc: 'Cores, bordas e opacidade.' },
      { label: 'Prism', desc: 'Efeitos de sombra e brilho.' }
    ],
    proTip: {
      icon: 'sparkles',
      text: 'Clique duas vezes em um elemento no Canvas para abrir esta aba.',
      isSuccess: false
    }
  },
  mod_assets: {
    title: 'The Parts Bin',
    icon: 'image',
    commands: [
      { label: 'Bin', desc: 'Biblioteca de SVGs e Logotipos.' },
      { label: 'Uploads', desc: 'Suas imagens salvas no IndexedDB.' },
      { label: 'Drop', desc: 'Arraste para injetar no Canvas.' }
    ],
    proTip: {
      icon: 'link',
      text: 'Imagens SVG não perdem qualidade ao serem esticadas.',
      isSuccess: true
    }
  },
  mod_history: {
    title: 'Timeline Console',
    icon: 'clock',
    commands: [
      { label: 'Snapshots', desc: 'Cada ação gera um ponto de restauração.' },
      { label: 'Travel', desc: 'Salte para qualquer ponto no tempo.' },
      { label: 'Clean', desc: 'Limpa memória sem perder o estado atual.' }
    ],
    proTip: {
      icon: 'cpu',
      text: 'O histórico é persistente até você recarregar a página.',
      isSuccess: false
    }
  },
  mod_variables: {
    title: 'Data Pipeline',
    icon: 'cpu',
    commands: [
      { label: 'Interpolate', desc: 'Injeta dados do CSV no design.' },
      { label: 'Formatters', desc: 'Processamento de strings em tempo real.' },
      { label: 'Metadata', desc: 'Contadores e datas automáticas.' }
    ],
    proTip: {
      icon: 'lightning',
      text: 'Um único formatador pode mudar milhares de etiquetas no lote.',
      isSuccess: true
    }
  },
  mod_typeface: {
    title: 'Typeface Terminal',
    icon: 'text',
    commands: [
      { label: 'Injection', desc: 'Conecta fontes do Google via URL.' },
      { label: 'Specimen', desc: 'Preview interativo de cada família.' },
      { label: 'Sync', desc: 'Carregamento binário para o PDF Worker.' }
    ],
    proTip: {
      icon: 'pencil-ruler',
      text: 'Mantenha apenas as fontes necessárias para otimizar o carregamento.',
      isSuccess: false
    }
  },
  mod_production: {
    title: 'Production Studio',
    icon: 'lightning',
    commands: [
      { label: 'Batching', desc: 'Geração massiva de PDF em background.' },
      { label: 'Imposition', desc: 'Organização em folhas A4.' },
      { label: 'Preview', desc: 'Verificação de cada registro do lote.' }
    ],
    proTip: {
      icon: 'check-circle',
      text: 'Use DPI 300 para garantir a leitura de códigos de barras.',
      isSuccess: true
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
        <button slot="target" class="text-text-muted hover:text-accent-primary hover:bg-accent-primary/10 w-5 h-5 flex items-center justify-center rounded transition-colors cursor-help" aria-label="Quick Help" style="pointer-events: auto !important; position: relative; z-index: 10;">
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
