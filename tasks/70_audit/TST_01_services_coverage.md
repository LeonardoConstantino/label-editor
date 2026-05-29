# Task TST-01: Cobertura de Serviços (Layout & Snap)

## Objetivo
Garantir a precisão matemática do editor através de testes unitários exaustivos para os serviços de alinhamento, distribuição e snapping magnético.

## Arquivos de Entrada
- `src/domain/services/LayoutService.ts`
- `src/domain/services/SnapService.ts`
- `src/domain/services/__tests__/LayoutService.test.ts` (a criar/atualizar)

## Detalhamento da Execução

1. **Criação de Testes Unitários:**
   - Testar todas as funções de alinhamento (Top, Middle, Bottom, Left, Center, Right).
   - Testar distribuição horizontal/vertical.
   - Testar snapping magnético contra grid, objetos e bordas do canvas.

2. **Edge Cases:**
   - Elementos com dimensões zero ou negativas.
   - Alinhamento com apenas um elemento selecionado.
   - Snapping em zoom extremo.

3. **Medição:**
   - Atingir >90% de cobertura nestes dois arquivos.

## Critérios de Aceite
- [ ] `npm test` passa para todos os novos casos.
- [ ] Cobertura de código verificada para LayoutService e SnapService.
