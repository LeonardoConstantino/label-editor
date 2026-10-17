# Task 100 — Icon Engine & Pure Vector Renderer (Path2D Core)

- **Branch:** `task/100-icon-engine-core`
- **Prioridade:** 08
- **Dependências:** Nenhuma (Core Domain & Rendering)
- **Bloqueia:** 101, 102, 103

---

## 🎯 Objetivo

Implementar o elemento de primeira classe `IconElement` e seu motor de renderização vetorial puro `IconRenderer`. O renderizador opera de forma síncrona tanto na Main Thread quanto no `BatchWorker` (OffscreenCanvas) através da API nativa `Path2D`, eliminando o overhead de I/O assíncrono e rasterização SVG em lote. Suporta cores dinâmicas no Canvas e resolução de variáveis dinâmicas de lote (`{{simbolo}}`).

---

## 🏗️ Análise Técnica e Arquitetura

1. **Modelo de Dados:**
   - Adicionar `ElementType.ICON = 'icon'` em `src/domain/models/elements/BaseElement.ts`.
   - Adicionar interface `IconElement` em `src/domain/models/elements/SpecificElements.ts`:
     ```typescript
     export interface IconElement extends BaseElement {
       dimensions: Dimensions; // Largura e Altura em mm
       iconName: string;       // Chave do ícone (ex: 'biohazard') ou variável ('{{icon_var}}')
       color: string;          // Cor de preenchimento ou traço (ex: '#EF4444')
       strokeWidth?: number;   // Espessura do traço (quando stroke: true)
     }
     ```
   - Atualizar `ElementFactory.ts` e `defaults.ts` com as propriedades padrão de criação do ícone.

2. **Geração e Registro do Catálogo de Ícones:**
   - Atualizar e consolidar o script `scripts/generate-icons.mjs` para ler os SVGs curados de `scripts/vendor/lucide-curated` e `scripts/vendor/icons-custom.json`.
   - Gerar `src/constants/icons.generated.ts` contendo:
     - `ICON_REGISTRY`: Mapa indexado com `{ name, viewBox, paths, stroke, tags, category }`.
     - `ICON_TOKEN_INDEX`: Índice invertido para busca $O(\text{tokens})$ em tempo de execução.
   - Reativar `src/constants/icons.ts` expondo `getIcon()`, `searchIcons()` e tipos estritos sem `any`.

3. **Renderizador Vetorial `IconRenderer`:**
   - Arquivo: `src/domain/services/renderers/IconRenderer.ts`.
   - Utiliza cache interno de `Map<string, Path2D[]>` para evitar re-instanciação de caminhos vetoriais.
   - Aplica matriz de transformação precisa:
     - `ctx.scale(w / viewBoxWidth, h / viewBoxHeight)`.
     - Suporta `ctx.fillStyle` para ícones sólidos e `ctx.strokeStyle` / `ctx.lineWidth` para ícones outline.
   - **Interpolação de Variáveis:** Executa `DataSourceParser.interpolate(element.iconName, context.data, context.context)`. Se não encontrar o ícone, não desenha lixo visual no Canvas.
   - Registrar `IconRenderer` em `src/domain/services/CanvasRenderer.ts`.

4. **Compatibilidade com o `BatchWorker`:**
   - Como `OffscreenCanvas` suporta `Path2D` nativamente em todos os navegadores modernos, a renderização de milhares de etiquetas com ícones dinâmicos roda de forma 100% síncrona sem disparar requisições assíncronas `fetch` ou `createImageBitmap`.

---

## 📋 Critérios de Aceite

- [x] `ElementType.ICON` adicionado a `BaseElement.ts` e refletido em `AnyElement`.
- [x] `IconElement` definido em `SpecificElements.ts` com tipagem estrita (sem `any`).
- [x] Script `generate-icons.mjs` gera `icons.generated.ts` contendo ícones curados e customizados com índice invertido.
- [x] `IconRenderer` implementado com cache de `Path2D` e suporte a cores customizadas (`color`).
- [x] Suporte a variáveis em lote (`{{coluna_icone}}`) via `DataSourceParser`.
- [x] Renderizador registrado no `CanvasRenderer` e testado com sucesso no Canvas e no Worker.
- [x] Build e testes unitários passando (`npm run build` e `npm test`).

---
**Status:** Concluído 🚀
