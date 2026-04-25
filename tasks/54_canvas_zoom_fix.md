# Task 54: Zoom Visual e Respiro do Canvas (Gutter)

## Objetivo
Implementar o escalonamento visual da etiqueta via CSS `transform: scale` e adicionar uma área de respiro (gutter) ao redor do canvas, garantindo que etiquetas grandes não toquem as bordas e que o zoom funcione de forma fluida e centralizada.

## Workflow
1. `git checkout -b task/54-canvas-zoom-fix`
2. **Análise de Layout:** Avaliar a integração entre `display: flex` (centralização) e `transform: scale`. Definir o `transform-origin` adequado para que o scroll do container funcione corretamente quando a escala for > 1.0.
3. Refatorar `src/components/editor/EditorCanvas.ts`.
4. Ajustar estilos de scroll no `src/styles/main.css` se necessário.

## Detalhamento da Execução
1. **Escalonamento Visual:**
   - Aplicar `transform: scale(config.previewScale)` na `.label-artboard`.
   - Definir `transform-origin: center center`.
2. **Gutter (Respiro):**
   - Adicionar padding generoso (ex: `150px`) ao container `.canvas-workspace` ou usar uma margem dinâmica.
   - Garantir que a etiqueta comece centralizada mas permita scroll para todas as extremidades.
3. **Sincronização de Precisão:**
   - O canvas interno continuará sendo desenhado em alta resolução (DPI real), mas o tamanho visual na tela será controlado pelo CSS da artboard.
4. **Física de Zoom:**
   - Garantir que ao mudar o zoom, o scroll não "salte" de forma brusca.

## Critérios de Aceite
- [x] Alterar o zoom no Inspector reflete imediatamente no tamanho visual da etiqueta.
- [x] Etiquetas de até 500mm possuem margens visuais e não tocam as bordas do Cockpit.
- [x] O scroll horizontal e vertical funciona corretamente quando a etiqueta excede o viewport.
- [x] A centralização é mantida em níveis baixos de zoom (< 1.0).
- [x] Os elementos internos (texto/imagem) mantêm a nitidez absoluta.
- [x] A detecção de clique (hit-test) é precisa em qualquer nível de zoom.
