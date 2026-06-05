# Task 03: Resolução de Exportações Duplicadas (AlignAction) [DET-ARCH]

## Objetivo
Resolver a ambiguidade na exportação do tipo `AlignAction`, que está definido e exportado simultaneamente no `UiAlignCluster.ts` e no `LayoutService.ts`, o que confunde o compilador e ferramentas de análise.

## Arquivos de Entrada
- `src/components/common/UiAlignCluster.ts`
- `src/domain/services/LayoutService.ts`

## Detalhamento da Execução
1. **Unificação:** Mover a definição do type `AlignAction` para o `LayoutService.ts`, que é o proprietário da lógica de alinhamento.
2. **Importação:** Atualizar o `UiAlignCluster.ts` para importar `AlignAction` de `../../domain/services/LayoutService`.
3. **Consistência de Valores:** Garantir que todas as 10 ações (Left, Center, Right, Top, Middle, Bottom, DistHorizontal, DistVertical, etc.) estão sincronizadas.

## Critérios de Aceite
- [ ] Tipo `AlignAction` exportado de apenas UM local.
- [ ] `fallow dead-code` reporta zero duplicate exports.
- [ ] `npm run build` passa sem erros.
