# 🗺️ Guia de Layout e UX (Tactile Prism)

Este documento define o posicionamento espacial, a hierarquia visual e o comportamento das interfaces do Gerador de Etiquetas. A interface adota a filosofia **"Canvas-First / Cockpit"**, maximizando a área de visualização e mantendo os controles em painéis flutuantes translúcidos.

## 📐 1. Macro-Layout (A Estação de Trabalho)

O layout não usa barras laterais fixas e sólidas. O Canvas ocupa `100vw` e `100vh`, e a interface flutua sobre ele, criando uma sensação de profundidade infinita.

```text
+-------------------------------------------------------------+
|  [ T Text ] [ Rect ] [ Image ] | Undo | Save | Generate PDF |  <-- Toolbar (Flutuante Top-Left)
|                                                             |
|                                            +--------------+ |
|                                            | LAYERS &     | |
|                                            | PRECISION    | | <-- Painel Direito (Flutuante/Fixo)
|                                            |              | |     (Smart Accordion)
|             [ CANVAS INFINITO ]            | [> Image ]   | |
|               (Grid tátil)                 |              | |
|                                            | [v Text  ⚠️] | |
|               [ ETIQUETA ]                 |   X: 60mm    | |
|                                            |   Y: 15mm    | |
|                                            |   [Delete]   | |
|                                            +--------------+ |
+-------------------------------------------------------------+
```

### Regras Globais:

- **O Canvas (`.canvas-workspace`)**: Ocupa a tela toda (`h-dvh w-full absolute inset-0`).
- **A Etiqueta (`.label-artboard`)**: Centralizada no canvas, com sombra extrema (`box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.9)`) para criar a ilusão de que flutua a centímetros da mesa.

---

## 🛠️ 2. A Ilha de Ferramentas (Toolbar Superior)

**Componente da Arquitetura:** `Toolbar.ts`

Sai a barra fixa de ponta a ponta, entra a "Pílula de Controle".

- **Posicionamento:** Flutuante no topo esquerdo (`absolute top-6 left-6 z-50`).
- **Visual:** Container com `.bg-surface-solid/90`, `.backdrop-blur-md`, bordas arredondadas `.rounded-2xl` e sombra `.shadow-panel`.
- **Organização Interna (Flex com divisores):**
  - **Grupo de Criação:** Botões secundários (`T Text`, `Rect`, `Image`).
  - **Divisor:** Uma linha vertical sutil (`w-px h-6 bg-border-ui mx-2`).
  - **Grupo de Histórico:** `Undo` / `Redo`.
  - **Ações Primárias:** `Save` e o botão herói `.btn-success` ("Generate PDF").

---

## 🎛️ 3. O Painel Direito (Smart Accordion Inspector)

**Componentes da Arquitetura:** Fusão do `LayerPanel.ts` e `ElementInspector.ts`

Esta é a peça central da UX. Ele lista os elementos ordenados pelo Z-Index real. Quando um elemento é clicado (no canvas ou na lista), o card correspondente se expande revelando as propriedades.

- **Posicionamento do Painel:** Fixo na direita (`absolute top-0 right-0 h-full w-[340px] z-40`).
- **Visual:** Glassmorphism escuro (`.panel-glass` -> `bg-surface/80 backdrop-blur-xl border-l border-border-ui`).
- **Header do Painel:** Título minúsculo `font-mono text-[10px] text-text-muted` ("LAYERS & PRECISION") e um contador de elementos ("3 UNITS").

### Os Estados do Card de Camada (Accordion Item)

#### Estado 1: Inativo / Colapsado

- **Visual:** Fundo `.bg-black/20`, borda `.border-border-ui`, cantos `.rounded-lg`.
- **Conteúdo visível (Flex Row):**
  - Ícone da ferramenta (pequeno, colorido sutilmente).
  - Nome da camada (`font-sans text-sm text-text-main truncate`).
  - Ícone de Warning ⚠️ (Oculto, a menos que haja erro de Overflow).
  - Ícone de "Travar" ou "Ocultar" (Visíveis no hover do card).
- **Interação:** No hover, a borda acende suavemente (`hover:border-white/20`).

#### Estado 2: Ativo / Expandido (Juice Aplicado)

- **Animação de Entrada:** O card selecionado deve "saltar" para frente e acender.
- **Classes Principais:** `.bg-surface-solid`, borda `.border-accent-primary`, escala `.scale-[1.02]`, e um glow neon `.shadow-[0_0_20px_rgba(99,102,241,0.15)]`. Transição de `300ms var(--ease-spring)`.
- **Conteúdo Interno Revelado:**
  - Aparecem os agrupamentos de controles de precisão (Transformação, Conteúdo, Cores).

  ## 🎛️ 3.1. O Estado "Zero" do Painel Direito (Document Setup & Blueprint)

Quando **nenhum elemento está selecionado** no Canvas, o painel direito (Accordion) muda de contexto. Ele deixa de ser o "Element Inspector" e se torna o **"Document Setup"**.

A grande estrela deste painel não são inputs soltos, mas um **Desenho de Engenharia Interativo (Blueprint)** que ilustra fisicamente as proporções da etiqueta.

**Estrutura do Document Setup:**

1. **Header:** "LABEL SETUP" (mesmo padrão visual das camadas).
2. **O Blueprint (Visual CAD):**
   - Uma caixa com fundo de grid escuro (`bg-canvas border border-white/5 rounded-lg p-4 flex items-center justify-center relative`).
   - No centro, um retângulo branco proporcional (ex: simulando a proporção 100x150).
   - **Linhas de Cota (Dimension Lines):** Linhas finas azuis (`border-accent-primary`) com setas nas pontas flanqueando o retângulo.
   - Os inputs numéricos (`ui-number-scrubber`) ficam **embutidos nas linhas de cota** do blueprint. O input de largura (W) fica acima da linha horizontal, e o de altura (H) ao lado da linha vertical.
3. **Outras Configurações Gerais:**
   - **Corner Radius:** Raio da borda da etiqueta (útil para pré-visualizar etiquetas arredondadas).
   - **Background Color:** Cor de fundo do papel (útil para quem imprime em rolos de etiquetas coloridas).

**Exemplo de UX do Blueprint (Instrução para a IA):**

```html
<!-- O Blueprint Container -->
<div
  class="relative w-full h-48 bg-[#0a0c10] border border-border-ui rounded-lg flex items-center justify-center mb-6"
>
  <!-- A Etiqueta Simulada -->
  <div
    class="bg-white shadow-lg transition-all duration-300"
    style="width: 60%; height: 40%;"
  ></div>

  <!-- Cota Topo (Largura) -->
  <div class="absolute top-2 left-0 right-0 flex justify-center">
    <ui-number-scrubber
      label="W"
      unit="mm"
      value="100"
      class="w-24 shadow-panel"
    ></ui-number-scrubber>
  </div>

  <!-- Cota Direita (Altura) -->
  <div class="absolute right-2 top-0 bottom-0 flex items-center">
    <ui-number-scrubber
      label="H"
      unit="mm"
      value="50"
      class="w-24 shadow-panel rotate-90 origin-center"
    ></ui-number-scrubber>
  </div>
</div>
```

---

## 🎨 4. Anatomia Interna do Card Expandido (Inputs e UX)

Dentro do Accordion expandido, o layout deve maximizar a precisão. Os inputs devem parecer painéis de um maquinário CAD.

**Diretrizes Críticas para a IA gerar o HTML do Inspetor:**

1. **Labels de Grupo:** Usar `font-mono text-[10px] uppercase text-text-muted mb-2` (Ex: "TRANSFORM (MM)").
2. **Inputs Numéricos (X, Y, Width, Height):**
   - Devem ficar lado a lado em um Grid (`grid grid-cols-2 gap-3`).
   - A fonte dos números digitados deve ser `font-mono` para alinhamento perfeito.
3. **A Unidade Absoluta ("mm"):**
   - É obrigatório que inputs de medida tenham o sufixo numérico injetado dentro da caixa de texto para dar confiança ao usuário.

**Exemplo de HTML para o Agrupamento de Transformação:**

```html
<div class="mb-4">
  <h4 class="label-prism">Transform</h4>
  <div class="grid grid-cols-2 gap-3">
    <!-- Eixo X -->
    <div>
      <label class="block text-[10px] text-text-muted mb-1">X</label>
      <div class="relative">
        <input type="number" class="input-prism pr-8 font-mono" value="60" />
        <span
          class="absolute right-3 top-2.5 text-[10px] text-text-muted font-mono pointer-events-none"
          >mm</span
        >
      </div>
    </div>

    <!-- Eixo Y -->
    <div>
      <label class="block text-[10px] text-text-muted mb-1">Y</label>
      <div class="relative">
        <input type="number" class="input-prism pr-8 font-mono" value="15" />
        <span
          class="absolute right-3 top-2.5 text-[10px] text-text-muted font-mono pointer-events-none"
          >mm</span
        >
      </div>
    </div>
  </div>
</div>
```

---

## ⚠️ 5. Feedback de Validação (Overflow)

A arquitetura valida limites (`OverflowValidator`). A UX deve tratar isso da forma mais elegante e silenciosa possível, sem modais bloqueantes.

1. **Aviso no Header do Card (Visão Global):**
   - Se a camada "Texto 1" estiver fora da etiqueta, um ícone de alerta `<ui-icon name="alert-triangle">` amarelo brilhante (`text-accent-warning drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]`) deve aparecer no header do card, ao lado do nome, mesmo se o Accordion estiver fechado.
2. **Aviso no Input Específico (Visão Local):**
   - Se o Accordion estiver aberto, o input exato que causou o problema (ex: o input de `X`) deve ganhar uma borda amarela pulsante (`border-accent-warning`).
   - Opcional: O tooltip nativo (`title="..."`) no ícone pode dizer: "Elemento vaza pelo eixo X".

---

## 🚀 6. Fluxo de Geração de Lote e Preview Visuais (Takeover Modal)

Gerar um lote de 500 etiquetas às cegas é um risco alto (desperdício de papel/tinta). O fluxo de Geração não deve ser um modal pequeno, mas um **"Takeover Modal" (Tela Cheia ou Max-W-6xl)** que atua como um _Print Preview_ verdadeiro.

**O Layout do Batch Generation (3 Colunas Lógicas):**

1. **Coluna Esquerda (Data Source & Mapping - `w-1/3`):**
   - **Entrada:** Um `<textarea>` escuro grande para colar os dados (Lista simples ou CSV).
   - **Variáveis Detectadas:** Badges indicando as variáveis encontradas no template (Ex: `<kbd class="kbd-prism">{{nome}}</kbd>`).
   - **Status:** Feedback em tempo real: "50 registros detectados".

2. **Área Central (The Live Preview Grid - `w-2/3`):**
   - Fundo escuro profundo (`bg-canvas`).
   - **O Grid:** Um layout em grade (`grid-cols-2` ou `grid-cols-3` dependendo do tamanho) mostrando as **etiquetas reais renderizadas** com os dados injetados.
   - O usuário deve ver exatamente como a Etiqueta #1 e a Etiqueta #50 vão sair.
   - **Juice Visual:** As etiquetas devem ter uma sombra pesada (`shadow-2xl`) para saltarem da tela, e o container deve ter um scroll suave (`overflow-y-auto`).

3. **Barra de Controle (Rodapé Fixo):**
   - Fica presa na parte inferior do modal (`sticky bottom-0 bg-surface-solid border-t border-border-ui p-4`).
   - Lado Esquerdo: "Mostrando preview de 1-6 de 500 etiquetas".
   - Lado Direito: Botão "Cancelar" (`.btn-secondary`) e Botão de Ação "⚡ Gerar PDF (500 pág)" (`.btn-success px-8`).

**Instruções de CSS para o Preview Grid (Para a IA):**

```html
<div
  class="batch-preview-workspace bg-[#0a0c10] p-8 overflow-y-auto h-[60vh] border border-border-ui rounded-lg shadow-inner"
>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
    <!-- Cada item é uma renderização Offscreen do Canvas -->
    <div class="preview-item flex flex-col items-center gap-2">
      <span class="font-mono text-[10px] text-text-muted">#001</span>
      <div
        class="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.8)] pointer-events-none"
        style="width: 100mm; height: 50mm; transform: scale(0.5); transform-origin: top;"
      >
        <!-- Canvas renderizado com "Dado 1" -->
      </div>
    </div>

    <!-- ... repete para amostras ... -->
  </div>
</div>
```

---
