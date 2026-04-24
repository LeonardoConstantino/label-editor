# Task 11: Refatoração do Store (History & Snapshots)

## Objetivo
Refatorar o `Store` para utilizar o `HistoryManager` baseado em `ImageData`. O estado agora gerencia snapshots visuais para Undo/Redo instantâneo e mantém a sincronia com o array de elementos.

## Arquivos de Entrada
- `src/core/Store.ts`
- `src/domain/services/HistoryManager.ts` (A criar)
- `src/core/UISoundManager.ts`

## Detalhamento
1. **HistoryManager:** Implementar classe que armazena `HistorySnapshot { imageData, elements }`.
2. **Snapshot Visual:** Criar método que captura o `ImageData` do canvas principal via `ctx.getImageData()`.
3. **Store Integration:** 
   - Ao executar `element:add/update/delete`, disparar a criação de um snapshot **antes** da nova alteração.
   - Integrar `UISoundManager.play('history_shuffling')` nos comandos de Undo/Redo.
4. **Memory Management:** Implementar limite de 50 snapshots (FIFO) para evitar estouro de memória.

## Critérios de Aceite
- [x] O Undo/Redo restaura o visual exato do canvas instantaneamente.
- [x] O Store sincroniza o array de elementos com o snapshot restaurado.
- [x] Feedback sonoro presente ao navegar no histórico.
- [x] Testes validam que o `currentIndex` do histórico é atualizado corretamente.
