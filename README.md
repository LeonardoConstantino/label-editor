# Label Editor | Tactile Prism | [🚀 Live Demo](https://leonardoconstantino.github.io/label-editor/)

Um editor avançado de etiquetas com interface moderna, suporte a múltiplos elementos, persistência local e exportação em PDF.

## 🎯 Visão Geral

O Label Editor é uma aplicação web completa para criação e edição de etiquetas, desenvolvida com TypeScript e Vite. O projeto oferece uma experiência de design visual intuitiva com suporte a elementos de texto, imagens, retângulos e bordas, além de funcionalidades avançadas como importação de dados CSV, histórico de alterações e biblioteca de ativos.

## 🚀 Funcionalidades Principais

- ✨ **Design Visual Moderno**: Interface com Tailwind CSS e componentes customizados
- 🎨 **Elementos Editoriais**: Suporte a texto, imagens, retângulos e bordas
- 💾 **Persistência Local**: Armazenamento com IndexedDB para salvar trabalhos
- 📊 **Importação de Dados**: Integração com PapaParse para importação CSV
- 📄 **Exportação PDF**: Geração direta de etiquetas em formato PDF
- 🎵 **Feedback Sonoro**: Sistema de interação áudio para melhor UX
- 🔄 **Histórico de Alterações**: Undo/Redo completo com gerenciamento de estados
- 🗄️ **Biblioteca de Ativos**: Vault Gallery para gerenciar imagens e templates
- 📱 **Responsivo**: Interface adaptável para diferentes tamanhos de tela
- ♿ **Acessibilidade**: Suporte a atalhos de teclado e navegação

## 🛠️ Tecnologias

### Frontend
- **TypeScript** - Tipagem estática e segurança
- **Vite** - Build tool rápido e moderno
- **Tailwind CSS v4.2** - Framework de utilitários-first
- **Canvas API** - Renderização gráfica das etiquetas
- **IndexedDB** - Armazenamento local persistente

### Bibliotecas
- **jsPDF** - Geração de PDFs
- **PapaParse** - Parsing de arquivos CSV
- **Canvas-txt** - Renderização de texto em canvas
- **fake-indexeddb** - Simulação de IndexedDB para testes

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/LeonardoConstantino/label-editor.git

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Execute os testes
npm test
```

## 🎮 Como Usar

1. **Criar Nova Etiqueta**
   - Abra a aplicação e uma etiqueta padrão será carregada
   - Use as ferramentas da barra superior para adicionar elementos
   - Ajuste as dimensões e DPI conforme necessário

2. **Adicionar Elementos**
   - Clique nos botões da barra de ferramentas para adicionar:
     - Texto com formatação
     - Imagens da biblioteca
     - Retângulos e bordas
   - Selecione elementos para editar propriedades

3. **Importar Dados**
   - Acesse o "Production Cockpit" para importar arquivos CSV
   - Mapeie colunas para elementos dinâmicos
   - Visualize a prévia antes da exportação

4. **Exportar**
   - Gere PDFs individuais ou lotes
   - Suporte a múltiplos formatos de impressão
   - Exporte templates para reutilização

## 📁 Estrutura de Arquivos

```
src/
├── components/           # Componentes UI
│   ├── common/          # Componentes compartilhados
│   ├── editor/          # Componentes do editor principal
│   └── preview/         # Componentes de visualização
├── core/               # Lógica central
│   ├── Store.ts        # Gerenciamento de estado
│   ├── EventBus.ts     # Sistema de eventos
│   └── Database.ts     # Acesso a dados
├── domain/             # Domínio do negócio
│   ├── models/         # Modelos de dados
│   ├── services/       # Serviços
│   └── validators/     # Validações
├── styles/             # Estilos globais
└── utils/              # Utilitários
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Prévia do build
- `npm run deploy` - Deploy com gh-pages
- `npm run test` - Executa testes com Vitest

## 🎨 Design System

O projeto segue rigorosamente o Design System definido em:
- `Design_System.md` - Princípios visuais e componentes
- `Layout_UX_Guide.md` - Diretrizes de layout e UX
- `definition_elements.md` - Definição de elementos

## 🚀 Desenvolvimento

### Branching Strategy
Cada nova funcionalidade deve ser desenvolvida em uma branch específica:
```bash
git checkout -b task/NUM-descricao
```

### Padrões de Código
- TypeScript estrito ativado
- Componentes modulares com responsabilidades claras
- Event-driven architecture
- Histórico completo de alterações

## 📈 Roadmap

- [ ] Implementação de templates avançados
- [ ] Suporte a múltiplos formatos de exportação
- [ ] Sistema de colaboração em tempo real
- [ ] Melhorias em acessibilidade
- [ ] Otimizações de performance

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abra um Pull Request

## 📄 Licença

ISC

---

**Desenvolvido com 💙 pela Tactile Prism**

*Atualizado em 20/04/2026*
