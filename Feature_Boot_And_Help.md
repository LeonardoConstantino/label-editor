# 🚀 Guia de Implementação: Boot Sequence & Help Center
**Design System:** Tactile Prism

## 🧠 1. Lógica de Inicialização (Boot Logic)

O arquivo `src/main.ts` atuará como a "BIOS" do sistema.
1. O app carrega e consulta o `IndexedDB` pela chave `last_active_project`.
2. **Se existir:** Pula a tela de boas-vindas, carrega o label no Canvas, emite o som de `notify` (Sistema Pronto) e mostra um Toast verde: *"Sessão anterior restaurada"*.
3. **Se NÃO existir:** Exibe o modal `<ui-welcome-screen>`.

---

## 🖥️ 2. A Tela Inicial (Welcome Screen / Task 36)

**Contexto:** O usuário abriu o app e não há trabalho pendente.
**Visual:** Um "Takeover Modal" centralizado e limpo, saudando o usuário e oferecendo os 3 caminhos principais, com a estética de um painel de controle ligando.

**Instruções de HTML/Tailwind para a IA:**
```html
<ui-modal id="welcome-modal" prevent-close="true"> <!-- prevent-close obriga ele a escolher uma ação -->
  <div slot="body" class="p-4 flex flex-col items-center text-center">
    
    <!-- Ícone Hero e Saudação -->
    <div class="w-16 h-16 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center mb-6 shadow-neon-primary">
      <ui-icon name="layers" class="w-8 h-8 text-accent-primary"></ui-icon>
    </div>
    <h2 class="font-sans text-2xl font-bold text-text-main mb-2">Label Forge OS</h2>
    <p class="text-sm text-text-muted mb-8 max-w-sm leading-relaxed">
      Bem-vindo ao seu ambiente de precisão. O que vamos construir hoje?
    </p>

    <!-- As 3 Ações Principais (Task 36) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
      
      <!-- Ação 1: Novo (Destaque) -->
      <button id="action-new" class="group flex flex-col items-center justify-center gap-3 p-6 bg-surface-solid border border-accent-primary/50 rounded-xl hover:bg-accent-primary/10 hover:border-accent-primary transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.15)] hover:-translate-y-1">
        <ui-icon name="file-plus" class="w-6 h-6 text-accent-primary group-hover:scale-110 transition-transform"></ui-icon>
        <span class="font-mono text-[11px] text-text-main uppercase tracking-widest font-bold">New Blueprint</span>
      </button>

      <!-- Ação 2: The Vault -->
      <button id="action-vault" class="group flex flex-col items-center justify-center gap-3 p-6 bg-black/20 border border-border-ui rounded-xl hover:bg-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer hover:-translate-y-1">
        <ui-icon name="package" class="w-6 h-6 text-text-muted group-hover:text-text-main transition-colors"></ui-icon>
        <span class="font-mono text-[11px] text-text-muted group-hover:text-text-main uppercase tracking-widest font-bold">Open Vault</span>
      </button>

      <!-- Ação 3: Import -->
      <button id="action-import" class="group flex flex-col items-center justify-center gap-3 p-6 bg-black/20 border border-border-ui rounded-xl hover:bg-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer hover:-translate-y-1">
        <ui-icon name="upload-cloud" class="w-6 h-6 text-text-muted group-hover:text-text-main transition-colors"></ui-icon>
        <span class="font-mono text-[11px] text-text-muted group-hover:text-text-main uppercase tracking-widest font-bold">Import File</span>
      </button>

    </div>

  </div>
</ui-modal>
```

---

## 🛟 3. O "Help Center" Modal (Atalho + Guia Rápido)

Como você definiu:
* `Ctrl+/`: Abre focado na lista de atalhos.
* `Botão [?] na Toolbar`: Abre mostrando a "Ajuda Inicial (Quick Start)", com a opção de ver os atalhos.

Para resolver isso de forma elegante, criaremos um **Modal com Abas (Tabs)**.

**Estrutura do HTML para o Modal de Ajuda:**
```html
<ui-modal id="help-center-modal" class="w-[800px]"> <!-- Modal largo -->
  
  <div slot="header" class="flex items-center gap-6 border-b border-border-ui pb-0">
    <!-- Abas de Navegação (Tabs) -->
    <button class="tab-btn active font-mono text-[11px] uppercase tracking-wider pb-3 border-b-2 border-accent-primary text-text-main" data-target="tab-guide">
      Quick Start Guide
    </button>
    <button class="tab-btn font-mono text-[11px] uppercase tracking-wider pb-3 border-b-2 border-transparent text-text-muted hover:text-text-main" data-target="tab-shortcuts">
      Keyboard Shortcuts
    </button>
  </div>

  <div slot="body" class="pt-4 h-[500px] overflow-hidden relative">
    
    <!-- ABA 1: Quick Start Guide (O "Boas-vindas" do 1º acesso) -->
    <div id="tab-guide" class="h-full overflow-y-auto pr-2 flex flex-col gap-6">
      
      <div class="p-5 bg-accent-primary/5 border border-accent-primary/20 rounded-lg flex gap-4">
        <ui-icon name="info" class="w-6 h-6 text-accent-primary shrink-0"></ui-icon>
        <div>
          <h3 class="text-text-main font-semibold mb-1">Como o Sistema Funciona?</h3>
          <p class="text-sm text-text-muted leading-relaxed">
            O Canvas infinito é onde a mágica acontece. Adicione elementos usando a Toolbar superior. Ajuste dimensões milimétricas usando o painel "Layers & Precision" à direita. Seus designs são salvos automaticamente.
          </p>
        </div>
      </div>

      <!-- Grid de Dicas Rituais -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-black/20 p-4 border border-border-ui rounded-lg">
          <ui-icon name="move" class="w-4 h-4 mb-2 text-text-muted"></ui-icon>
          <strong class="block text-xs text-text-main mb-1">Navegação</strong>
          <span class="text-xs text-text-muted">Segure espaço para arrastar o Canvas. Use a roda do mouse com o Ctrl para Zoom.</span>
        </div>
        <div class="bg-black/20 p-4 border border-border-ui rounded-lg">
          <ui-icon name="printer" class="w-4 h-4 mb-2 text-text-muted"></ui-icon>
          <strong class="block text-xs text-text-main mb-1">Geração de Lote</strong>
          <span class="text-xs text-text-muted">Injete variáveis como <code class="text-accent-primary">{{nome}}</code> no texto. O gerador de lote criará uma etiqueta por registro.</span>
        </div>
      </div>

    </div>

    <!-- ABA 2: Atalhos de Teclado (Injeta o componente que criamos) -->
    <div id="tab-shortcuts" class="h-full hidden">
      <!-- Usamos o componente pronto aqui! -->
      <ui-keyboard-shortcuts variant="default" enable-search="true"></ui-keyboard-shortcuts>
    </div>

  </div>
</ui-modal>
```

### 🧠 Como a IA vai gerenciar isso (Lógica do JS):

1. **Ações dos Botões:**
   - Clicar em `[?]` na toolbar dispara `openHelpModal(activeTab: 'tab-guide')`.
   - Apertar `Ctrl+/` dispara `openHelpModal(activeTab: 'tab-shortcuts')`.
2. **A Lógica das Abas (Tabs):**
   - O JS do modal simplesmente altera a classe `hidden` entre a `div#tab-guide` e a `div#tab-shortcuts`.
   - Adiciona a classe de borda Indigo na aba ativa.
3. **Primeiro Acesso Real (Opcional):**
   - No `main.ts`, além de checar `last_active_project`, ele pode checar um `localStorage.getItem('has_seen_guide')`. Se não existir, ele abre a Welcome Screen normalmente, mas adiciona um badge "(?) Veja como começar" pulsante no botão da toolbar.

   Perfeito. Com os dados chegando de forma estruturada, não precisamos fazer um "Hardcode" de dicas no HTML. Podemos transformar a aba "Quick Start Guide" em um painel dinâmico e expansível gerado pelo TypeScript.

Aproveitando a estética industrial e imersiva do *Tactile Prism*, aqui está como a IA deve processar esse `helpData` e gerar o visual da aba de Ajuda.

### 🎨 Design da Aba "Quick Start Guide" (Gerada via JS)

A aba será dividida em três blocos que descem em "cascata" para o usuário:

1. **Apresentação (Tutorial Section):** Blocos de texto maiores com placeholders para imagens (com cara de *Blueprint/Wireframe*).
2. **Pro Tips (Dicas de Ouro):** Uma faixa de destaque com fundo em neon/glassmorphism e um sistema de carrossel ou grid de dicas curtas.
3. **FAQ (Accordion Compacto):** Perguntas frequentes escondidas por trás de expansões simples.

---

### 💻 A Lógica de Injeção (Para a IA)

O JavaScript do seu Modal de Ajuda deve receber o `helpData` e injetar o conteúdo dentro de `<div id="tab-guide">`.

```javascript
// Renderização dinâmica da Aba de Guia
function renderQuickStartGuide(data) {
  const container = document.getElementById('tab-guide');
  
  container.innerHTML = `
    
    <!-- 1. SEÇÃO DE TUTORIAIS (Visão Geral) -->
    <div class="flex flex-col gap-8 mb-10">
      ${data.tutorialSection.map((section, index) => `
        
        <div class="flex flex-col md:flex-row gap-6 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} items-center">
          
          <!-- O Texto -->
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <span class="flex items-center justify-center w-6 h-6 rounded bg-black/40 border border-white/10 font-mono text-[10px] text-accent-primary font-bold">
                0${index + 1}
              </span>
              <h3 class="font-sans text-lg font-bold text-text-main">${section.title}</h3>
            </div>
            <p class="text-sm text-text-muted leading-relaxed pl-9">
              ${section.content}
            </p>
          </div>

          <!-- O Blueprint (Imagem Placeholder Simulada) -->
          <div class="flex-1 w-full relative">
            <div class="aspect-video bg-[#0a0c10] border border-border-ui rounded-xl overflow-hidden relative flex flex-col items-center justify-center group shadow-inner">
              
              <!-- Fundo Grid Técnico -->
              <div class="absolute inset-0 pointer-events-none opacity-20" style="background-image: radial-gradient(var(--color-border-ui) 1px, transparent 0); background-size: 12px 12px;"></div>
              
              <ui-icon name="image" class="w-8 h-8 text-white/10 mb-2 group-hover:text-accent-primary/50 transition-colors"></ui-icon>
              
              <!-- Texto da descrição da imagem centralizado -->
              <span class="font-mono text-[9px] text-text-muted uppercase tracking-wider text-center px-4 max-w-[80%]">
                ${section.imageDescription}
              </span>
            </div>
          </div>

        </div>

      `).join('')}
    </div>

    <!-- 2. PRO TIPS (A Faixa de Ouro) -->
    <div class="mb-10 bg-accent-primary/5 border border-accent-primary/20 rounded-xl p-5 shadow-[inset_0_0_20px_rgba(99,102,241,0.05)]">
      <div class="flex items-center gap-2 mb-4 pb-2 border-b border-accent-primary/10">
        <ui-icon name="zap" class="w-4 h-4 text-accent-primary fill-accent-primary/20"></ui-icon>
        <h4 class="font-mono text-[11px] text-accent-primary uppercase tracking-widest font-bold">Pro Tips</h4>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${data.proTips.map(tip => `
          <div class="flex gap-3 items-start">
            <div class="mt-0.5 p-1.5 bg-black/30 rounded border border-white/5 shrink-0">
              <ui-icon name="${tip.icon}" class="w-3.5 h-3.5 text-text-muted"></ui-icon>
            </div>
            <p class="text-xs text-text-main leading-relaxed">
              ${tip.tip}
            </p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 3. FAQ (Perguntas Frequentes) -->
    <div>
      <h4 class="font-mono text-[11px] text-text-muted uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
        <ui-icon name="help-circle" class="w-4 h-4"></ui-icon>
        Perguntas Frequentes
      </h4>
      
      <div class="flex flex-col gap-2">
        ${data.faqItens.map((faq, i) => `
          
          <details class="group bg-black/20 border border-border-ui rounded-lg overflow-hidden [&_summary::-webkit-details-marker]:hidden">
            
            <summary class="flex items-center justify-between p-4 cursor-pointer font-sans text-sm text-text-main font-semibold hover:bg-white/5 transition-colors select-none">
              ${faq.q}
              <ui-icon name="chevron-down" class="w-4 h-4 text-text-muted group-open:rotate-180 transition-transform"></ui-icon>
            </summary>
            
            <div class="p-4 pt-0 text-sm text-text-muted leading-relaxed border-t border-transparent group-open:border-white/5 group-open:bg-black/10">
              ${faq.a}
            </div>

          </details>

        `).join('')}
      </div>
    </div>
  `;
}
```

### 🧠 Decisões de "Juice Supremo" nesta Aba:

1. **O Layout "Z-Pattern" nos Tutoriais:** 
   O uso de `index % 2 !== 0 ? 'md:flex-row-reverse' : ''` faz com que o texto e a imagem fiquem se alternando entre direita e esquerda conforme o usuário desce. Isso é padrão em *Landing Pages* premium e quebra a monotonia visual da leitura.
2. **Imagens Falsas como Blueprints:** 
   Como você forneceu `imageDescription` em vez de uma URL de imagem direta, o código renderiza uma caixa com o fundo de "Grid Técnico" do Canvas, simulando o ambiente de trabalho, e centraliza a descrição com a fonte monoespaçada do sistema. Fica com cara de rascunho de engenharia!
3. **Pro Tips em Destaque:** 
   Eles ficam isolados num bloco com leve tom Indigo (`bg-accent-primary/5`), pois dicas pró são recompensas para quem está lendo a documentação.
4. **FAQ Nativo (`<details>` e `<summary>`):**
   A melhor forma de fazer *accordions* (sanfonas) rápidos e nativos no HTML5. Usei Tailwind para customizar. A setinha `chevron-down` roda suavemente quando a pergunta é aberta (`group-open:rotate-180`), e o fundo do texto explicativo fica levemente mais escuro (`group-open:bg-black/10`) para criar profundidade em relação ao título da pergunta.