# Task TACT-01: Otimização do CanvasRenderer (Desenho da Grade)

## Objetivo
Delegar a responsabilidade de desenhar a grade do editor para o `EditorCanvas.ts`, removendo essa responsabilidade do componente de prévia. Isso garantirá que a grade e os elementos estejam sempre sincronizados e centralizados.

## Arquivos de Entrada
- `src/components/editor/EditorCanvas.ts`
- `src/components/preview/DataSourceInput.ts` (onde a grade é desenhada atualmente)

## Detalhamento da Execução
1. **Extração:** Remover a lógica de desenho da grade do `DataSourceInput.ts`.
2. **Implementação:** Adicionar a lógica de renderização da grade no `CanvasRenderer.ts` ou `EditorCanvas.ts`.
3. **Sincronização:** Utilizar as preferências do usuário (`UserPreferences`) para definir espaçamento e visibilidade da grade.

## Critérios de Aceite
- [ ] A grade é renderizada via `EditorCanvas.ts`.
- [ ] Prévia e grade real estão perfeitamente alinhadas.
- [ ] `npm run build` passa com sucesso.
