# Task 52: Action Icon de Lock nos Cards de Camada

## Objetivo
Implementar um controle visual de bloqueio (`lock`) nos cards de camada do Inspector, permitindo que o usuário congele elementos individualmente para evitar edições acidentais.

## Workflow
1. `git checkout -b task/52-ui-layer-lock`
2. **Análise Profunda:** Verificar como o `ElementInspector` gerencia múltiplos ícones de ação no header do card para evitar sobreposição visual. Garantir que o estado de bloqueio reflita corretamente a propriedade `locked` do modelo e que o `ShortcutService` esteja sincronizado com essa mudança de UI.
3. Modificar `src/components/editor/ElementInspector.ts`.

## Detalhamento da Execução
1. **Injeção do Ícone no Template:**
   - No método `renderCardHtml`, adicionar o `<ui-icon>` de cadeado ao lado do ícone de visibilidade.
   - Utilizar as variáveis de estado: `el.locked ? 'lock' : 'unlock'`.
2. **Estilização Tátil (Juice):**
   - Definir cores de estado: `var(--color-accent-warning)` ou `var(--color-accent-primary)` quando bloqueado.
   - Aplicar `cursor: pointer` e feedback de hover (`scale(1.1)`).
3. **Handler de Ação:**
   - Adicionar o listener para `data-action="toggle-lock"` no gerenciador de cliques do Inspector.
   - Emitir `element:update` via `EventBus` com a inversão do valor de `locked`.
4. **Proteção de UX:**
   - Garantir que, quando um elemento estiver bloqueado, os inputs de propriedades (X, Y, W, H, etc.) fiquem visualmente desabilitados ou exibam um aviso de bloqueio.

## Critérios de Aceite
- [ ] Ícone de cadeado funcional presente em todos os cards de camada.
- [ ] O clique alterna o estado de bloqueio e atualiza o Store instantaneamente.
- [ ] Elementos bloqueados no Inspector não podem ser movidos via atalhos de seta (validação de regressão).
- [ ] O visual do card reflete o estado bloqueado (ex: ícone aceso quando bloqueado).
