# Task 28: Utilitário de Unidades Centralizado

## Objetivo
Criar uma classe utilitária estática para centralizar todas as conversões de unidades (`mm ↔ px ↔ pt`) do sistema, garantindo precisão matemática constante e eliminando lógica duplicada nos renderers.

## Workflow
1. `git checkout -b task/28-unit-converter`
2. Criar `src/utils/units.ts`.

## Detalhamento
- **Métodos Estáticos:** `mmToPx(mm, dpi)`, `pxToMm(px, dpi)`, `mmToPt(mm)`.
- **Precisão:** Utilizar a constante `1 inch = 25.4mm`.
- **Refatoração:** Substituir os cálculos manuais em `CanvasRenderer.ts`, `EditorCanvas.ts` e no `Document Setup` pelo uso desta classe.

## Critérios de Aceite
- [x] Centralização total dos cálculos de conversão.
- [x] Testes unitários validando conversões críticas (ex: 25.4mm @ 300DPI = 300px).
