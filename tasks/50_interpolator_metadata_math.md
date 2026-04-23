# Task 50: Metadados de Lote e Cálculos no Interpolador

## Objetivo
Expandir o interpolador para suportar variáveis de contexto do lote (`index`, `total`) e analisar a viabilidade de implementar operações matemáticas simples para ajustes dinâmicos.

## Workflow
1. `git checkout -b task/50-interpolator-meta`
2. Modificar `src/domain/services/DataSourceParser.ts`.

## Detalhamento da Execução
- `src/domain/services/DataSourceParser.ts`
- `src/domain/services/renderers/TextRenderer.ts`
- `src/domain/services/__tests__/DataSourceParser_Interpolate.test.ts`

## Detalhamento da Execução
1. **Injeção de Contexto Global:**
   - Alterar a lógica de interpolação para aceitar um objeto `context` (ex: `{ index, total, date }`).
   - O interpolador deve tentar resolver a variável primeiro no registro (row) e, se não encontrar, buscar no contexto global.
2. **Variáveis de Lote:**
   - Injetar `index` (índice atual do registro no loop) e `total` (quantidade total de registros carregados).
3. **Análise de Viabilidade (Matemática):**
   - Investigar a melhor abordagem para cálculos simples (ex: `index + 1`).
   - Opção A: Formatadores `:add(1)`, `:sub(1)` (Seguro e consistente com a Task 34).
   - Opção B: Mini-parser de expressões matemáticas (Flexível, mas requer cuidado com segurança).
   - Implementar um protótipo funcional para a opção escolhida se os riscos forem baixos.
4. **Testes:**
   - Validar se `{{ index }} / {{ total }}` renderiza corretamente no Batch Preview.

## Critérios de Aceite
- [ ] Variáveis `index` e `total` acessíveis em qualquer campo de texto interpolado.
- [ ] Relatório de viabilidade/decisão sobre a implementação matemática documentado no PR.
- [ ] (Se viável) Suporte a pelo menos um método de ajuste numérico (ex: somar 1 ao index).
- [ ] Testes unitários garantindo que variáveis de contexto não sobrescrevam dados reais do CSV.
