# Task 62: Ferramentas de Alinhamento e Distribuição (Power Layout)

## Objetivo
Implementar um conjunto de ferramentas para alinhar e distribuir múltiplos elementos selecionados, garantindo precisão matemática e agilidade no design de etiquetas complexas.

## Workflow
1. `git checkout -b task/62-power-layout`
2. **Análise Profunda:** Estudar a lógica de cálculo de "Bounding Box" para múltiplos elementos. Determinar se o alinhamento será em relação ao "Elemento Âncora" (último selecionado) ou aos limites extremos da seleção total.
3. Criar `src/domain/services/LayoutService.ts` para centralizar a lógica matemática.
4. Adicionar botões de ação no `ElementInspector.ts` (visíveis apenas quando 2+ elementos estão selecionados).

## Detalhamento da Execução
1. **Lógica de Alinhamento:**
   - Implementar funções: `alignLeft`, `alignCenter`, `alignRight`, `alignTop`, `alignMiddle`, `alignBottom`.
   - O sistema deve calcular a coordenada alvo e emitir `element:update` para todos os itens selecionados em um único snapshot de histórico.
2. **Distribuição de Espaço:**
   - Implementar `distributeHorizontal` e `distributeVertical`.
   - Calcular o gap total entre o primeiro e o último elemento e dividir igualmente entre os itens intermediários.
3. **Interface (Inspector):**
   - Criar uma nova seção "Alignment" no Inspector que aparece dinamicamente.
   - Usar ícones técnicos e sutis (Tactile Prism) para representar cada tipo de alinhamento.
4. **Atalhos de Teclado:**
   - Avaliar a inclusão de atalhos como `Alt + A` (Align Left), etc., via `ShortcutService`.

## Critérios de Aceite
- [ ] O usuário consegue alinhar 2 ou mais elementos com um único clique.
- [ ] A distribuição horizontal/vertical posiciona os elementos com espaçamentos idênticos.
- [ ] Todas as mudanças de layout em lote são tratadas como uma única ação no Undo/Redo.
- [ ] O visual dos botões de alinhamento segue o padrão de micro-interações do sistema.
