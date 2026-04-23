# Task 61: Otimização de Updates de DOM (Rendering Incremental)

## Objetivo
Refatorar a lógica de atualização dos componentes (especialmente o `ElementInspector`) para realizar mudanças incrementais no DOM em vez de reconstruir todo o conteúdo via `innerHTML` em cada alteração de estado.

## Workflow
1. `git checkout -b task/61-dom-update-optimization`
2. **Análise Profunda:** Identificar componentes que utilizam `innerHTML` para renderização frequente (ex: `ElementInspector.ts`, `Toolbar.ts`). Avaliar como manter referências diretas a elementos (inputs, labels) para atualizar apenas o `.value` ou `.textContent`.
3. Refatorar `src/components/editor/ElementInspector.ts`.

## Detalhamento da Execução
1. **Mapeamento de Referências:**
   - Em vez de gerar a string HTML completa no `redraw`, criar os elementos uma única vez e armazenar referências (`this.inputWidth`, `this.inputColor`, etc.).
2. **Sincronização Unidirecional (State -> UI):**
   - Criar um método `syncValues()` que atualiza apenas as propriedades dos elementos existentes sem recriar o DOM.
   - Isso resolve o problema de perda de foco (cursor pulando) durante a digitação.
3. **Gerenciamento de Cards de Camada:**
   - Implementar uma lógica de "Reconciliation" simples: se o número de elementos mudou, reconstrói a lista. Se apenas um valor mudou, atualiza apenas o card correspondente.
4. **Performance:**
   - Reduzir o garbage collection causado por strings gigantes de HTML sendo descartadas e recriadas.

## Critérios de Aceite
- [ ] O `ElementInspector` não recria o DOM ao alterar valores via scrubbers ou inputs.
- [ ] O foco do teclado é mantido corretamente durante a edição.
- [ ] Redução visual de "flicker" (piscadas) no painel lateral ao interagir com o canvas.
- [ ] Código mais limpo e fácil de debugar, com referências claras aos elementos de UI.
