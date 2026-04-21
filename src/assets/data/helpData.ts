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
      id: 't2',
      title: 'Automação de Lote',
      content:
        'Transforme designs estáticos em produção em massa. Ao utilizar chaves como {{nome}} ou {{preco}}, você prepara o terreno para o Gerador de Lote. Importe uma planilha CSV no Cockpit de Produção e o sistema gerará um PDF otimizado com um registro por etiqueta.',
      imageDescription: 'Integração de dados: Mapeamento de variáveis para impressão em lote',
    },
    {
      id: 't3',
      title: 'The Vault (Biblioteca)',
      content:
        'Não perca seus ativos. O Vault armazena todos os seus cartuchos de etiquetas localmente. Você pode duplicar projetos para variações rápidas ou carregar designs antigos instantaneamente sem precisar de arquivos externos.',
      imageDescription: 'The Vault: Sua galeria local de ativos de design',
    },
  ],
  faqItens: [
    {
      q: 'Onde meus arquivos são salvos?',
      a: 'Tudo é armazenado no banco de dados local do seu navegador (IndexedDB). Não enviamos seus dados para servidores externos, garantindo privacidade total e acesso offline.',
    },
    {
      q: 'Como funciona a unidade de medida?',
      a: 'O sistema utiliza Milímetros (mm) como padrão para garantir que o que você vê na tela seja exatamente o que sairá na impressora, respeitando o DPI configurado.',
    },
    {
      q: 'O PDF gerado está em qual tamanho?',
      a: 'O gerador de lote organiza suas etiquetas automaticamente em folhas A4 (210x297mm), calculando a melhor disposição para evitar desperdício de papel.',
    },
  ],
  proTips: [
    {
      icon: 'sparkles',
      tip: 'Aperte Ctrl+/ para ver a lista completa de atalhos e acelerar seu fluxo de trabalho.',
    },
    {
      icon: 'move',
      tip: 'Segure a tecla Alt enquanto arrasta com as setas para mover elementos com precisão de 0.1mm.',
    },
    {
      icon: 'copy',
      tip: 'Use Ctrl+Alt+C e Ctrl+Alt+V para copiar estilos de uma camada para outra instantaneamente.',
    },
    {
      icon: 'layers',
      tip: 'Mantenha camadas importantes bloqueadas (Ctrl+L) para evitar movimentos acidentais durante o design.',
    },
  ],
};

export default helpData;
