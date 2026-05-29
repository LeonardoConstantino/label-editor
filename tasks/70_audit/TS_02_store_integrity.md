# Task TS-02: Store Type Safety & MergeUpdates

## Objetivo
Eliminar o uso de `as any` e tipagem fraca no gerenciamento de estado da Store, especificamente no método de merge de atualizações de elementos.

## Arquivos de Entrada
- `src/core/Store.ts`
- `src/domain/models/elements/AnyElement.ts` (ou local onde AnyElement é definido)

## Detalhamento da Execução

1. **Tipagem de Atualizações:**
   - Substituir o uso de `updates: any` por um tipo utilitário que represente atualizações parciais válidas para cada tipo de elemento.
   - Utilizar `Partial<T>` ou uma união discriminada de atualizações.

2. **Refatoração do mergeUpdates:**
   - Remover o cast `{ ...current } as any`.
   - Implementar uma lógica de merge segura que preserve a integridade do objeto e respeite o tipo `AnyElement`.

3. **Strict State Access:**
   - Garantir que o estado retornado por `getState()` seja imutável (usando `readonly` ou `DeepReadonly`).

## Critérios de Aceite
- [ ] Método `mergeUpdates` na Store não utiliza `as any`.
- [ ] O payload de eventos de atualização (`element:update`) está estritamente tipado.
- [ ] `npm run build` passa sem erros na Store.
