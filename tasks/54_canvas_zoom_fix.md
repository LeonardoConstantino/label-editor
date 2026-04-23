# Task 54: Correção do Zoom Visual no EditorCanvas

## Objetivo
Corrigir a funcionalidade de zoom no editor, garantindo que a escala da etiqueta (`artboard`) seja refletida visualmente no workspace através de transformações CSS, resolvendo o problema da etiqueta permanecer com tamanho estático enquanto apenas a resolução interna do canvas muda.

## Workflow
1. `git checkout -b task/54-canvas-zoom-fix`
2. **Análise Profunda:** Avaliar o impacto do `transform: scale()` versus a alteração direta de `width/height` em pixels. O `transform` é preferível para manter a consistência com as unidades `mm` declaradas, mas exige atenção ao `transform-origin` para não quebrar a centralização no flex-container do workspace.
3. Modificar `src/components/editor/EditorCanvas.ts`.

## Detalhamento da Execução
1. **Aplicação de Escala CSS:**
   - No método `redraw()` do `EditorCanvas.ts`, aplicar `this.artboard.style.transform = `scale(${config.previewScale})``.
   - Definir o `transform-origin` para garantir que o escalonamento ocorra a partir do centro.
2. **Ajuste de Overflow:**
   - Verificar se o container `.canvas-workspace` permite o scroll natural quando o zoom ultrapassa 1.0 e a etiqueta fica maior que a viewport.
3. **Sincronização Canvas:**
   - Garantir que o `canvas.width/height` (pixels internos) continue sendo calculado corretamente para manter a nitidez, enquanto o tamanho visual é controlado pelo CSS da `artboard`.

## Critérios de Aceite
- [ ] Ajustar o Scrubber de Zoom no Inspector altera o tamanho visual da etiqueta no centro da tela.
- [ ] A etiqueta permanece nítida em níveis altos de zoom.
- [ ] O workspace lida corretamente com o scroll quando a etiqueta está muito grande.
- [ ] Nenhuma alteração manual de `width/height` em pixels é feita no container pai (mantendo a pureza das unidades `mm` no CSS).
