# Task 77: Production Studio Module (Batch Data & Imposition)

## Objetivo
Criar o módulo "Production Studio" no Rack de Cartuchos. Ele atua como um terminal de injeção de dados (para mapeamento de variáveis e *Live Preview* individual no Canvas). A ação final do painel não exporta o PDF direto, mas abre o **"Print Matrix Modal"**, um ambiente de calibração que mostra a imposição das etiquetas em folhas A4/Letter com opções físicas de margem e sangria.

## Workflow
1. `git checkout -b task/77-production-studio`
2. **O Módulo Lateral (Data Terminal):** Criar `src/components/editor/modules/ProductionStudio.ts`.
3. **O Modal de Calibração:** Migrar/Adaptar a lógica de geração para `src/components/preview/PrintMatrixModal.ts`.
4. **Modificação do Render:** O `CanvasRenderer` deve aceitar um contexto de preview (`previewData`), permitindo que a etiqueta principal atualize seus textos com base no paginador sem corromper as chaves `{{var}}` no State.

## Detalhamento de UI/UX (Tactile Prism)

### FASE 1: O Módulo Lateral (Preparação dos Dados)
- **Data Terminal:** Um `<textarea>` monoespaçado para colar dados ou input de arquivo (CSV). Um botão `[ Parse Data ]` valida o formato.
- **Data Mapper & Paginador:** 
  - Exibe quais variáveis `{{key}}` foram conectadas com sucesso.
  - Controle de paginação: `[ < ] RECORD 001 / 500 [ > ]`. Navegar aqui atualiza o Canvas principal em tempo real (Live Preview do item isolado).
- **Rodapé do Módulo:** Botão herói `.btn-primary` (Indigo) escrito `[ CONFIGURE PRINT MATRIX ]`.

### FASE 2: O "Print Matrix Modal" (Calibração Física)
Quando o botão acima é clicado, o fundo escurece e abre-se o Takeover Modal. Ele é dividido em duas colunas:

#### A. Coluna Direita: O Live A4 Blueprint (A Visão da Impressora)
- Fundo escuro intenso (`bg-canvas`).
- No centro, o desenho de uma folha de papel branca (proporcional, ex: A4 210x297mm).
- As etiquetas são renderizadas como caixas de wireframe dentro do papel, respeitando as configurações atuais de colunas e margens. O usuário vê exatamente quantas cabem por folha.
- *Juice Visual:* Exibir marcações de corte cruzadas nos cantos (Crop Marks) com linhas finas vermelhas ou azuis (`#f43f5e`).

#### B. Coluna Esquerda: O Painel de Controle Físico
Controles numéricos (`<ui-number-scrubber>`) altamente responsivos. Se o usuário arrastar os valores, o desenho da folha A4 ao lado atualiza na hora.
- **Sheet Setup:** `<ui-select>` para Tamanho da Folha (A4, Letter, Custom) e Orientação (Portrait, Landscape).
- **Layout Matrix:** Colunas (Num) x Linhas (Num).
- **Margins (mm):** Top, Bottom, Left, Right.
- **Spacing (mm):** Gap Horizontal e Vertical entre as etiquetas.
- **Ação Final:** Botão `.btn-success` pulsante: `[ EXPORT 500 LABELS TO PDF ]`. Somente este botão dispara o motor `jsPDF`.

## Critérios de Aceite
- [ ] O paginador do painel lateral altera a renderização da etiqueta no canvas sem perder as variáveis de template.
- [ ] O Modal de "Print Matrix" renderiza a prévia visual correta (Quantas cabem numa folha) baseado nas margens digitadas.
- [ ] Arrastar os sliders/scrubbers de margem recalcula o layout do papel A4 em tempo real (sem lentidão/engasgos extremos).
- [ ] O botão final exporta o PDF com o grid milimétrico perfeito configurado no modal.
