# Task 27: Personalização e Limites do Canvas

## Objetivo
Permitir que o usuário configure a cor de fundo da etiqueta (papel) e estabelecer limites máximos para as dimensões (mm) para garantir a estabilidade do sistema e performance de renderização.

## Workflow
1. `git checkout -b task/27-canvas-limits`
2. Modificar `src/domain/models/Label.ts`, `src/core/Store.ts` e `src/components/editor/ElementInspector.ts`.

## Detalhamento
- **Cor de Fundo:** Adicionar a propriedade `backgroundColor` ao `CanvasConfig`. Integrar um input de cor no painel **Document Setup (Blueprint)**.
- **Constraints de Tamanho:** Definir limites máximos (ex: 500x500mm) para evitar que o navegador trave ao tentar criar canvases gigantescos em 300 DPI.
- **Feedback Visual:** Se o usuário digitar um valor acima do limite, o sistema deve aplicar o valor máximo permitido e emitir um aviso via `UISM.play('error_alert')`.
- **Renderização:** Garantir que o `CanvasRenderer` preencha o fundo com a cor selecionada antes de desenhar os elementos.

## Critérios de Aceite
- [x] O usuário consegue mudar a cor da etiqueta (ex: simular papel pardo ou etiquetas coloridas).
- [x] O sistema bloqueia dimensões absurdas que comprometeriam a RAM.
- [x] A cor de fundo é preservada no histórico (Undo/Redo) e na exportação de PDF.
