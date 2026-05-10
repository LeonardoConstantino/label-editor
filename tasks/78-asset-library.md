# Task 78: Asset Library Module (The Parts Bin)

## Objetivo
Criar o módulo "Asset Library" no Rack de Cartuchos. Ele servirá como um gerenciador de recursos visuais (Imagens, SVGs, Logotipos, Códigos de Barras placeholder), organizados em categorias. A experiência principal deve suportar "Drag and Drop" nativo: o usuário clica em um asset no painel lateral e o arrasta diretamente para o Canvas, criando uma nova camada instantaneamente.

## Workflow
1. `git checkout -b task/78-asset-library`
2. **Criação do Componente:** Criar `src/components/editor/modules/AssetLibrary.ts`.
3. **Engine de Arraste:** Implementar a API HTML5 de Drag & Drop (`dragstart`, `dragover`, `drop`) comunicando o Módulo Lateral com o componente `EditorCanvas.ts`.
4. **Gerenciamento de Estado:** O Canvas deve converter os dados "dropados" em um novo `ImageElement` ou `SvgElement` e registrar a ação no Histórico.

## Detalhamento de UI/UX (Tactile Prism)

### 1. O Cabeçalho (Filters & Upload)
- **Filtros Rápidos:** Botões estilo *Pill* horizontais (`[All]`, `[SVGs]`, `[Logos]`, `[Uploads]`). Eles deslizam horizontalmente se houver muitos (hide scrollbar).
- **Upload Zone:** Um botão tracejado fino (`border-dashed border-white/20`) no topo fixo, escrito `"Drag files here or Browse"`.
  - Ao fazer hover ou arrastar um arquivo do computador por cima, ele acende em Indigo.

### 2. O Grid de Assets (A Caixa de Peças)
- **Visual:** Um layout *Masonry* compacto de 2 colunas. Fundo escuro.
- **Os Itens (Parts):**
  - Cada miniatura vive em um quadrado perfeito (`aspect-square`) com fundo preto profundo (`bg-[#050608]`) e borda sutil.
  - O asset (ex: Logo da empresa) fica centralizado no meio.
  - *Juice de Hover:* Ao passar o mouse, a imagem sofre uma leve expansão (`scale(1.05)`) e a borda ilumina. O cursor MUDA para `grab` (uma mãozinha aberta).

### 3. A Mecânica de Drag & Drop (O Juice Tátil)
- **O Agarre (`dragstart`):** 
  - Quando o usuário clica e segura a imagem (o cursor vira `grabbing`), o navegador gera o "Fantasma" do arraste nativo.
  - Passamos os dados base64 ou a URL da imagem no `dataTransfer`.
- **Sobre o Canvas (`dragover`):** 
  - O Canvas precisa indicar que está "Pronto para receber a peça". O grid do Canvas pode emitir um leve *glow* ou a borda do Workspace acender em Verde Neon (`accent-success`).
- **A Soltura (`drop`):**
  - O Canvas calcula as coordenadas `clientX / clientY` do mouse e converte para o espaço de coordenadas da Etiqueta.
  - A nova camada de imagem nasce exatamente onde a ponta do mouse soltou.
  - **Efeito Visual:** Uma pequena animação de poeira ou flash rápido na posição de queda.

### 4. Integração Sonora (UISoundManager)
- **Início do Arraste (Grab):** Som de um velcro ou adesivo sendo descolado rápido. `sound.playCustom({ freq: 800, duration: 0.05, type: 'sawtooth', volume: 0.02 })`.
- **Soltura (Drop):** Som de impacto mecânico. Aquela peça "bateu" na mesa. (O mesmo som "THUD" usado no encaixe de módulos).

## Critérios de Aceite
- [ ] O usuário consegue importar imagens locais usando o botão de upload do módulo.
- [ ] As miniaturas renderizam corretamente em 2 colunas no painel com proporções padronizadas.
- [ ] Arrastar a miniatura para fora do painel altera o cursor e ativa a área de drop do Canvas.
- [ ] Soltar a miniatura cria um novo Elemento de Imagem *na posição correta do mouse*, calculando a compensação de zoom/pan atual do Canvas.
- [ ] O evento de Drop registra um único snapshot de histórico (permitindo Undo na mesma hora).

---

**Com este módulo, o editor de etiquetas transcende a formatação de dados e vira uma ferramenta criativa completa.**
