# Master Plan: Refatoração Tática (Backlog Remanescente)

Este plano coordena a execução de tarefas para finalizar o backlog de dívidas técnicas e TODOs pendentes.

## Status do Projeto
- **Fase Atual:** Fase E: Manutenibilidade & Escala
- **Stack:** TS, Tailwind v4, Vitest
- **Progresso Geral:** 92%

## Diretrizes para Agentes
1. **Leia a Task:** Abra o arquivo correspondente na pasta `tasks/tactical/`.
2. **Isolamento:** Crie uma branch específica para cada task (`task/TACT-NN-descricao`).
3. **Padrões:** Siga o Design System (Tactile Prism) e garanta que `npm run build` e `npm test` estejam verdes.
4. **Reporte:** Ao finalizar, marque a task como concluída no Master Plan e no Checklist.

---

## Lista de Tarefas (Pipeline)

| ID | Task | Status | Dependências | Branch |
|----|------|--------|--------------|--------|
| **TACT-01** | [Otimização do CanvasRenderer (Desenho da Grade)](./tasks/tactical/TACT_01_grid_renderer.md) | [ ] | — | `task/TACT-01-grid` |
| **TACT-02** | [Correção do Theme Sync (PreferencesModal)](./tasks/tactical/TACT_02_theme_sync.md) | [ ] | — | `task/TACT-02-theme` |
| **TACT-03** | [Refatoração da Lógica de Variáveis (VariableManager)](./tasks/tactical/TACT_03_var_logic.md) | [ ] | — | `task/TACT-03-vars` |
