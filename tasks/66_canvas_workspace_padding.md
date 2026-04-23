# Task 66: Workspace Expansível e Gutter do Canvas

## Objetivo
Melhorar a experiência de design em etiquetas grandes adicionando um "espaço de respiro" (gutter) ao redor da etiqueta e centralizando-a no viewport, evitando que ela "cole" nas bordas do editor.

## Workflow
1. `git checkout -b task/66-canvas-workspace-padding`
2. **Estilização (EditorCanvas.ts):**
   - Aplicar `display: flex; justify-content: center; align-items: center;` no host ou na workspace.
   - Adicionar `padding: 100px;` (ou variável CSS `--canvas-gutter`) para garantir margens de manobra.
   - Garantir que `overflow: auto;` na workspace permita o scroll suave.
3. **Comportamento:**
   - Ao carregar uma etiqueta grande (ex: 500mm), o usuário deve ver a etiqueta centralizada com espaço vazio em volta.

## Critérios de Aceite
- [ ] Etiquetas de qualquer tamanho não tocam as bordas do painel lateral ou da toolbar.
- [ ] A área de respiro permite arrastar elementos ligeiramente para fora da etiqueta para ajustes finos sem "perder" o elemento na borda.
- [ ] O scroll funciona em ambas as direções.
