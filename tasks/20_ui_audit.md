# Task 20: Auditoria de Componentes Core

## Objetivo
Revisar os componentes `AppButton`, `AppInput` e `UINumberScrubber` para garantir que estão utilizando 100% das variáveis do `@theme` definidas no `main.css` e seguindo os estados visuais (hover, focus, disabled) do `Design_System.md`.

## Workflow
1. `git checkout -b task/20-ui-audit`
2. Analisar `src/components/common/` contra `src/styles/main.css`.

## Detalhamento
- **AppButton:** Garantir que o `scale(0.92)` no `:active` e o glow neon nas variantes existam via classes CSS, não via JS.
- **AppInput:** Sincronizar o brilho da borda com `--color-accent-primary`.
- **Scrubber:** Verificar se as Shadow Parts (`::part`) estão sendo estilizadas corretamente no `main.css`.

## Critérios de Aceite
- [x] Nenhum componente possui cores hexadecimais hardcoded (devem usar `var(--color-...)`).
- [x] Todos os componentes reagem ao feedback sonoro do `UISM`.
- [x] O visual é idêntico em todos os estados definidos no Design System.
