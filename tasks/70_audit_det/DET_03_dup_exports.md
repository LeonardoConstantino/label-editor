# Task 03: Resolução de Exportações Duplicadas (AlignAction)

## Objetivo
Resolver a ambiguidade na exportação do tipo `AlignAction`, que está definido e exportado simultaneamente no `UiAlignCluster.ts` e no `LayoutService.ts`.

## Arquivos de Entrada
- `src/components/common/UiAlignCluster.ts`
- `src/domain/services/LayoutService.ts`

## Detalhamento da Execução
1. **Unificação de Contrato:** Identificar qual arquivo deve ser a fonte de verdade para tipos de layout.
2. **Refatoração:**
   - Mover a definição de `AlignAction` para o `LayoutService.ts` (ou um novo arquivo de tipos compartilhados).
   - Atualizar o `UiAlignCluster.ts` para importar o tipo do novo local.
3. **Consistência:** Verificar se as strings literais coincidem entre os arquivos.

## Critérios de Aceite
- [ ] O tipo `AlignAction` é definido em apenas um local.
- [ ] `fallow dead-code` reporta zero "Duplicate exports".
- [ ] `npm run build` passa sem erros de importação.
