# Task 36: Retomada Automática & Tela Inicial

## Objetivo
Garantir que o usuário nunca perca o trabalho ao atualizar a página e fornecer uma experiência de entrada amigável através de uma tela inicial (ou modal de boas-vindas).

## Workflow
1. `git checkout -b task/36-work-resumption`
2. Modificar `src/main.ts` e `src/core/Store.ts`.

## Detalhamento
- **Auto-Save:** Implementar um mecanismo que salve o estado atual em um slot especial ("last_active_project") no IndexedDB sempre que houver uma mudança significativa.
- **Boot Logic:** Ao iniciar a aplicação, verificar se existe um "last_active_project".
- **Home Screen:** Se não houver projeto ativo, exibir um modal de "Boas-vindas" com opções:
  - "New Blank Design" (abre blueprint).
  - "Open from Gallery" (abre Task 35).
  - "Import .label file" (abre Task 33).

## Critérios de Aceite
- [x] Atualizar a página (`F5`) restaura o design exatamente onde o usuário parou.
- [x] A aplicação não inicia em um estado vazio/confuso para novos usuários.
