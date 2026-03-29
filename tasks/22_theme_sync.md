# Task 22: Sincronização de Temas & Variáveis

## Objetivo
Garantir que todos os Web Components registrados no projeto utilizem o novo sistema de variáveis do Tailwind v4, facilitando futuras mudanças de tema global.

## Workflow
1. `git checkout -b task/22-theme-sync`
2. Revisar `src/components/editor/` e `src/components/preview/`.

## Detalhamento
- **Inspector:** Mover estilos inline para classes no `main.css`.
- **Batch Studio:** Sincronizar as cores das miniaturas e do grid técnico com o tema global.
- **Icons:** Garantir que o `ui-icon` herde a cor do elemento pai via `currentColor`.

## Critérios de Aceite
- [ ] 100% de consistência cromática entre o editor e o batch studio.
- [ ] Redução de redundância de CSS dentro dos Shadow DOMs.
