# Task 59: Otimização de Histórico (Snapshots Inteligentes)

## Objetivo
Implementar um mecanismo de debounce na criação de snapshots do histórico para evitar que mudanças granulares (como arrastar um scrubber ou trocar de cor) poluam a pilha de Undo/Redo.

## Workflow
1. `git checkout -b task/59-history-debounce`
2. **Análise Profunda:** Mapear os eventos do `EventBus` para distinguir entre ações "Atômicas" (Adicionar, Deletar, Duplicar, Reordenar) e ações "Contínuas" (Atualizar posição, tamanho, cor). Determinar a lógica para capturar o "estado inicial" antes de uma sequência de mudanças para que o Undo funcione corretamente.
3. Modificar `src/core/Store.ts` para implementar o debounce.
4. Adicionar a configuração de sensibilidade em `src/domain/models/UserPreferences.ts` e no `ElementInspector.ts`.

## Detalhamento da Execução
1. **Refatoração do Store:**
   - Criar o método `takeSnapshotDebounced(ms: number)`.
   - Modificar o `performAction` para suportar snapshots imediatos (default) ou debounced.
   - Ações como `element:add` e `element:delete` devem permanecer imediatas.
2. **Lógica de Fluxo:**
   - Ao receber uma série de `element:update` rápidos, o Store deve disparar o timer de debounce.
   - O snapshot só deve ser consolidado após o tempo de inatividade definido pelo usuário.
3. **Sensibilidade do Usuário:**
   - Criar a preferência `historySensitivity` (em ms).
   - Adicionar o controle no Inspector (Seção Preferences) para o usuário escolher entre: "Instantâneo" (0ms), "Ágil" (300ms), "Equilibrado" (600ms) ou "Conservador" (1200ms).
4. **Validação de Performance:**
   - Garantir que o uso de `ImageData` no histórico não cause gargalos de memória ao lidar com muitos snapshots pendentes no debounce.

## Critérios de Aceite
- [ ] Mudanças rápidas e repetitivas em uma propriedade (ex: arrastar largura) geram apenas um ponto de restauração no histórico.
- [ ] Ações críticas (ex: deletar elemento) geram snapshot instantâneo sem aguardar o debounce.
- [ ] O usuário consegue configurar a sensibilidade do histórico nas preferências do sistema.
- [ ] Feedback sonoro de Undo/Redo permanece sincronizado com a restauração do estado.
