# Task 23: Acessibilidade & Atalhos de Teclado

## Objetivo
Implementar atalhos de teclado essenciais para navegação e precisão, reforçando a vibe de "estação de trabalho".

## Workflow
1. `git checkout -b task/23-shortcuts`
2. Modificar `src/core/Store.ts` ou criar um `ShortcutManager`.

## Detalhamento
- **Undo/Redo:** `Ctrl+Z` / `Ctrl+Y` (ou `Ctrl+Shift+Z`).
- **Navegação:** `Esc` para deselecionar tudo (e mostrar o Blueprint).
- **Delete:** Tecla `Del` ou `Backspace` para remover elemento selecionado.
- **Sons:** Integrar `UISM.play('select')` ao trocar de elemento.

## Critérios de Aceite
- [x] Atalhos funcionam sem conflitar com o input de texto.
- [x] Feedback visual e sonoro imediato ao usar atalhos.
