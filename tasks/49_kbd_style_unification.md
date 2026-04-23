# Task 49: Unificação de Estilo KBD (Tactile Prism)

## Objetivo
Padronizar o visual das teclas de atalho (`<kbd>`) em toda a aplicação, garantindo que o `TooltipBalloon` herde o estilo 3D definido na classe `.kbd-prism` do sistema de design global.

## Workflow
1. `git checkout -b task/49-kbd-unification`
2. Modificar `src/components/common/tooltip.ts`.

## Detalhamento da Execução
- `src/components/common/tooltip.ts`
- `src/styles/main.css` (Referência do estilo `.kbd-prism`)
- `src/utils/shared-styles.ts`

## Detalhamento da Execução
1. **Injeção de Estilos Globais:**
   - No arquivo `tooltip.ts`, garantir que a classe `TooltipBalloon` receba os `sharedStyles` em seu `adoptedStyleSheets`. Atualmente, o balloon é um elemento órfão no `body` que não herda os estilos do Shadow DOM do wrapper.
2. **Refatoração do CSS Interno (Balloon):**
   - Remover a regra `[part="content"] kbd` do `balloonStyles` que aplica o fundo indigo e borda simples.
   - Adicionar uma regra para `.kbd-prism` dentro do `balloonStyles` apenas para definir o `min-width: 48px`, preservando o alinhamento no grid de atalhos do tooltip.
3. **Mapeamento de Classes Dinâmico:**
   - Atualizar o método `#extractContent` no `UiTooltip` para adicionar a classe `kbd-prism` em vez de apenas `kbd` ao processar elementos de teclado de slots ricos.
4. **Consistência Visual:**
   - Verificar se o brilho, a sombra (juice) e a fonte Mono estão idênticos aos `kbd` utilizados na `Toolbar` e no `KeyboardShortcuts`.

## Critérios de Aceite
- [ ] O estilo dos `kbd` dentro dos tooltips possui profundidade 3D e sombra (Juice).
- [ ] O `TooltipBalloon` utiliza `sharedStyles` para reconhecer classes utilitárias do Tailwind v4.
- [ ] O alinhamento horizontal dos atalhos nos tooltips da Toolbar é mantido (através do `min-width`).
- [ ] Nenhuma cor hardcoded de "indigo" permanece na definição de `kbd` do tooltip.
