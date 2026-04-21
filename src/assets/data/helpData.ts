const helpData = {
  tutorialSection: [
    {
      id: 't1',
      title: 'Criar e editar etiqueta',
      content:
        'Abra a aplicação, carregue a etiqueta padrão ou selecione uma salva no Vault Gallery. Use a barra de ferramentas para inserir Texto, Imagem, Retângulo ou Borda. Ajuste propriedades (posição, tamanho, cor, fonte) no Element Inspector. As alterações são salvas automaticamente em IndexedDB.',
      imageDescription:
        'Tela principal com canvas, barra de ferramentas e inspector aberto',
    },
    {
      id: 't2',
      title: 'Exportar e importar lotes',
      content:
        'Clique no botão Exportar PDF para baixar a etiqueta atual. Para gerar múltiplas etiquetas, abra o modal Production Cockpit (Batch & A4), importe um arquivo CSV e mapeie as colunas para os campos de texto. Visualize a pré‑visualização e exporte o lote em PDF.',
      imageDescription: 'Modal de importação de CSV com tabela de mapeamento',
    },
  ],
  faqItens: [
    {
      q: 'Por que a etiqueta não é salva?',
      a: 'O IndexedDB pode estar desativado (navegação privada ou configuração do navegador). Abra a aplicação em janela normal ou permita o armazenamento local.',
    },
    {
      q: 'Como remover um elemento?',
      a: 'Selecione o elemento no canvas ou no inspector e pressione a tecla Delete ou clique no ícone de lixeira na barra de ferramentas.',
    },
    {
      q: 'Como ajustar o DPI da etiqueta?',
      a: 'No Element Inspector, edite o campo DPI na seção Canvas Config. A alteração reflete imediatamente no preview.',
    },
  ],
  proTips: [
    {
      icon: 'trash-2',
      tip: 'Use Delete para remover rapidamente elementos indesejados sem abrir o inspector.',
    },
    {
      icon: 'plus',
      tip: 'Adicionar múltiplos textos é mais rápido usando Ctrl+Click no botão de Texto da barra.',
    },
    {
      icon: 'settings',
      tip: "Desative sons de UI via eventBus.emit('preferences:update', { sound: false }) para um ambiente silencioso.",
    },
    {
      icon: 'check',
      tip: 'Após editar propriedades, pressione Enter para confirmar e salvar imediatamente.',
    },
    {
      icon: 'arrow-right',
      tip: 'Navegue entre elementos usando as setas do teclado; o inspector segue o foco.',
    },
    {
      icon: 'x',
      tip: 'Cancelar uma importação de CSV aborta o modal sem alterar a etiqueta atual.',
    },
    {
      icon: 'image',
      tip: 'Imagens inseridas são armazenadas como blobs no IndexedDB; limpe a galeria periodicamente para economizar espaço.',
    },
  ],
};

export default helpData;