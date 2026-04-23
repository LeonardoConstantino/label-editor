# Task 55: Bloqueio de Proporção (Aspect Ratio Lock)

## Objetivo
Implementar um mecanismo para vincular a largura e a altura de um elemento, mantendo sua proporção original durante o redimensionamento. A interface deve ser sutil e intuitiva, perfeitamente integrada ao painel de Transformação no Inspector.

## Workflow
1. `git checkout -b task/55-aspect-ratio-lock`
2. **Análise de UX:** Projetar o posicionamento de um ícone de "corrente" (`link`) entre os campos W e H. Ele deve ser pequeno, sutil e visualmente conectado a ambos os inputs, mudando para o estado "aceso" (Indigo Neon) quando o vínculo estiver ativo.
3. Modificar `src/domain/models/elements/BaseElement.ts` para incluir `keepRatio`.
4. Refatorar `src/components/editor/ElementInspector.ts` para renderizar o ícone e capturar o clique de toggle.
5. Ajustar a lógica de atualização no `Store.ts` ou no orquestrador do Inspector para calcular a dimensão dependente em tempo real.

## Detalhamento da Execução
1. **Visual Tátil:**
   - Adicionar o ícone de `link` com estilo minimalista.
   - Usar `opacity: 0.3` para estado inativo e `opacity: 1` com glow para estado ativo.
2. **Lógica Matemática:**
   - No momento da alteração de um valor (W ou H), se `keepRatio` for true, calcular o fator de escala baseado no valor original e aplicá-lo à outra dimensão.
   - Garantir que a proporção seja recalculada sempre que o bloqueio for ativado, para evitar saltos bruscos.
3. **Feedback Sonoro:**
   - Integrar `UISM.play('toggle')` ao ativar/desativar o vínculo.

## Critérios de Aceite
- [ ] O ícone de vínculo aparece de forma sutil entre os inputs W e H.
- [ ] Alterar a largura com o vínculo ativo atualiza a altura proporcionalmente (e vice-versa).
- [ ] O estado de vínculo é mantido individualmente por elemento.
- [ ] A precisão decimal (mm) é mantida sem erros de arredondamento cumulativos.
