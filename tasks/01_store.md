# Task 01: Implementação do Store Centralizado

## Objetivo
Implementar a classe `Store` para gerenciar o estado global da aplicação (etiqueta atual, elementos selecionados, histórico). Ela deve reagir a eventos do `EventBus` e emitir mudanças de estado.

## Arquivos de Entrada
- `src/core/Store.ts` (A criar)
- `src/core/EventBus.ts`
- `src/domain/models/Label.ts` (Referência de tipo)

## Detalhamento da Execução
1. **Estrutura do Estado:** Definir a interface `AppState` conforme a proposta de arquitetura.
2. **Registro de Eventos:** O Store deve ouvir `element:add`, `element:update`, `element:delete` e `element:select`.
3. **Imutabilidade:** Garantir que o estado emitido seja um `Readonly` ou um snapshot profundo.
4. **Histórico (Undo/Redo):** Implementar pilha de histórico simples para mudanças na etiqueta.
5. **Testes:** Criar `src/core/__tests__/Store.test.ts` verificando se o estado reflete as ações enviadas pelo EventBus.

## Critérios de Aceite
- [ ] O Store atualiza o estado corretamente ao receber um evento `element:add`.
- [ ] O histórico registra snapshots após cada mutação.
- [ ] O método `undo()` restaura o estado anterior da etiqueta.
- [ ] Testes automatizados cobrem a criação, atualização e deleção de elementos no Store.
