const helpData = {
  tutorialSection: [
    {
      id: 't1',
      title: 'Design de Precisão',
      content:
        'O Label Forge OS opera com medidas milimétricas reais. Utilize a Toolbar superior para inserir elementos e o Inspetor à direita para ajustes finos de posição, rotação e tipografia. Seus designs são salvos automaticamente no seu navegador enquanto você trabalha.',
      imageDescription:
        'Visão geral do Cockpit: Canvas centralizado com ferramentas de precisão',
    },
    {
      id: 't4',
      title: 'Active Slot (Cockpit)',
      content:
        'O painel lateral é modular. Utilize o "Rack de Cartuchos" no topo para alternar entre configurações de Blueprint, Propriedades de Camada e a Máquina do Tempo. Cada módulo é especializado e otimiza o espaço de trabalho.',
      imageDescription: 'Sistema de Navegação Modular: Alternância dinâmica de ferramentas',
    },
    {
      id: 't6',
      title: 'Visual Data Pipeline',
      content:
        'O Variable Manager permite visualizar o fluxo do seu dado. Arraste formatadores para criar pipelines complexos. Transforme um número bruto em uma moeda formatada ou uma data ISO em um padrão nacional instantaneamente.',
      imageDescription: 'Variable Manager: Interface tátil para transformação de dados em tempo real',
    },
    {
      id: 't5',
      title: 'Time Machine (Histórico)',
      content:
        'Navegue visualmente por todas as suas alterações. O Time Machine exibe miniaturas de cada estado anterior do design. Basta um clique para saltar no tempo e restaurar o projeto exatamente como ele estava.',
      imageDescription: 'Visual History: Fita cronológica com previews em tempo real',
    },
    {
      id: 't2',
      title: 'Automação de Lote',
      content:
        'Transforme designs estáticos em produção em massa. Ao utilizar chaves como {{nome}}, você prepara o terreno para o Gerador de Lote. O sistema utiliza Web Workers para renderizar PDFs massivos em segundo plano sem travar a interface.',
      imageDescription: 'Batch Processing: Motor de renderização híbrido para alta performance',
    },
    {
      id: 't7',
      title: 'Typeface Engine',
      content:
        'Não se limite às fontes do sistema. O Typeface Engine permite injetar Google Fonts diretamente no projeto. Teste cada fonte com espécimes editáveis e garanta que sua identidade visual seja preservada até no PDF final.',
      imageDescription: 'Typeface Engine: Gestão dinâmica de fontes e fidelidade visual 100%',
    },
    {
      id: 't3',
      title: 'The Vault (Biblioteca)',
      content:
        'O Vault armazena todos os seus cartuchos de etiquetas localmente no IndexedDB v3. Você pode duplicar projetos para variações rápidas ou carregar designs antigos instantaneamente sem precisar de arquivos externos.',
      imageDescription: 'The Vault: Sua galeria local de ativos de design',
    },
  ],
  faqItens: [
    {
      q: 'Onde meus arquivos são salvos?',
      a: 'Tudo é armazenado no banco de dados local do seu navegador (IndexedDB v3). Não enviamos seus dados para servidores externos, garantindo privacidade total e acesso offline.',
    },
    {
      q: 'Como funciona a unidade de medida?',
      a: 'O sistema utiliza Milímetros (mm) como padrão para garantir que o que você vê na tela seja exatamente o que sairá na impressora, respeitando o DPI configurado.',
    },
    {
      q: 'A aplicação trava ao gerar muitos registros?',
      a: 'Não. Utilizamos um motor híbrido com Web Workers e OffscreenCanvas. Toda a renderização pesada ocorre em uma thread separada, permitindo que você continue editando enquanto o lote é processado.',
    },
    {
      q: 'Como funciona o histórico ao saltar no tempo?',
      a: 'Ao selecionar um estado passado, o app viaja para aquele momento. Se você fizer uma nova alteração dali, um novo "futuro" é criado e os estados que estavam à frente são descartados.',
    },
    {
      q: 'Minhas fontes personalizadas aparecem no PDF?',
      a: 'Sim. Implementamos um motor de fidelidade tipográfica que captura os binários das fontes e os injeta no Web Worker, garantindo 100% de paridade visual no PDF.',
    },
  ],
  proTips: [
    {
      icon: 'lightning',
      tip: 'Use {{index:add(1)}} para criar numeração sequencial humana (1, 2, 3...) em suas etiquetas.',
    },
    {
      icon: 'calendar',
      tip: 'Calcule datas de validade automaticamente com formatadores de offset, ex: {{data_fab:date_add(30,days)}}.',
    },
    {
      icon: 'sparkles',
      tip: 'Aperte [Ctrl+/] para ver a lista completa de atalhos e acelerar seu fluxo de trabalho.',
    },
    {
      icon: 'move',
      tip: 'Segure a tecla [Alt] enquanto arrasta com as setas para mover elementos com precisão de 0.1mm.',
    },
    {
      icon: 'copy',
      tip: 'Use [Ctrl+Alt+C] e [Ctrl+Alt+V] para copiar estilos de uma camada para outra instantaneamente.',
    },
    {
      icon: 'layers',
      tip: 'Mantenha camadas importantes bloqueadas [Ctrl+L] para evitar movimentos acidentais.',
    },
    {
      icon: 'brackets',
      tip: 'Use {{var||Valor}} para definir um fallback caso o dado esteja vazio no CSV.',
    },
    {
      icon: 'lightning',
      tip: 'O sistema reconhece variáveis globais como {{total}} e {{date}} em qualquer camada de texto.',
    },
    {
      icon: 'text',
      tip: 'No Typeface Engine, clique no texto do cartão para digitar seu próprio exemplo e testar a fonte.',
    },
    {
      icon: 'pencil-ruler',
      tip: 'Você pode encadear formatadores complexos: {{valor:math(*1.1):currency(pt-BR,BRL)}}.',
    },
  ],
  aboutSection: {
    version: '4.0.0-Beta (Tactile Prism)',
    mission: 'Empoderar designers e produtores com ferramentas de alta precisão que respeitam a privacidade e operam localmente.',
    socials: [
      { name: 'GitHub', url: 'https://github.com/LeonardoConstantino', icon: 'github' },
      { name: 'Portfolio', url: 'https://github.com/LeonardoConstantino?tab=repositories', icon: 'globe' }
    ],
    privacy: {
      title: 'Privacy Policy (Local-Only)',
      content: 'O Label Forge OS é uma aplicação "Privacy-First". Todos os seus designs, dados importados e imagens são processados e armazenados exclusivamente no seu dispositivo através do IndexedDB. Não há telemetria, cookies de rastreamento ou upload de dados para servidores externos.'
    },
    terms: {
      title: 'Terms of Use',
      content: 'Ferramenta de código aberto sob licença ISC. O usuário é responsável pela legalidade dos dados inseridos e pelo uso final dos arquivos gerados.'
    }
  }
};

export default helpData;
