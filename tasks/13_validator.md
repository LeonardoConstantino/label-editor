# Task 13: OverflowValidator (checkOverflow)

## Objetivo
Implementar um validador de limites para alertar o usuário quando um elemento extrapola as bordas físicas da etiqueta.

## Arquivos de Entrada
- `src/domain/services/OverflowValidator.ts` (A criar)
- `src/core/Store.ts`
- `src/core/UISoundManager.ts`

## Detalhamento
1. **Lógica de Verificação:** Calcular se `position + dimensions` ultrapassa a largura ou altura configurada na `Label.config` (em mm).
2. **EventBus Integration:** Emitir evento `element:warning` quando um overflow for detectado.
3. **Store Middleware:** Executar a verificação após cada `element:update`.
4. **Feedback:** Integrar `UISoundManager.play('error_alert')` na primeira ocorrência de overflow.

## Critérios de Aceite
- [ ] O sistema detecta overflow nos eixos X, Y ou ambos.
- [ ] Eventos de alerta são emitidos e limpos automaticamente quando o elemento volta aos limites.
- [ ] Testes unitários validam o cálculo de overflow para diferentes tamanhos de etiqueta.
