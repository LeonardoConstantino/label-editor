# Task 04: Desacoplamento de Ciclos do CanvasRenderer [DET-ARCH]

## Objetivo
Quebrar os 13 ciclos de dependência identificados pelo Fallow em torno do `CanvasRenderer.ts`. Estes ciclos ocorrem principalmente porque o orquestrador importa os renderizadores específicos, e estes importam o tipo `RenderContext` ou a interface `IRenderer` de volta do orquestrador.

## Arquivos de Entrada
- `src/domain/services/CanvasRenderer.ts` (Proprietário dos tipos)
- `src/domain/services/renderers/IRenderer.ts`
- `src/domain/services/renderers/BorderRenderer.ts`, `CodeRenderer.ts`, `ImageRenderer.ts`, `LineRenderer.ts`, `RectangleRenderer.ts`, `TextRenderer.ts`.

## Detalhamento da Execução
1. **Extração de Tipos:** Criar `src/domain/services/renderers/renderer-types.ts`.
2. **Migração:** Mover a interface `RenderContext` de `CanvasRenderer.ts` para este novo arquivo.
3. **Refatoração de Imports:**
   - Atualizar todos os renderizadores para importar `RenderContext` de `renderer-types.ts`.
   - Atualizar `CanvasRenderer.ts` para importar `RenderContext` do novo local.
4. **Verificação de Símbolos:** Garantir que nenhuma classe concreta é importada nos arquivos de definição de tipo.

## Critérios de Aceite
- [x] `fallow dead-code` reporta 0 circular dependencies.
- [x] O projeto compila via `npm run build`.
- [x] O renderizador continua funcionando corretamente no canvas.
