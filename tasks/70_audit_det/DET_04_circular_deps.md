# Task 04: Desacoplamento de Ciclos do CanvasRenderer

## Objetivo
O Fallow detectou 13 ciclos de dependência envolvendo o `CanvasRenderer.ts` e seus renderizadores específicos (`BorderRenderer`, `TextRenderer`, etc). Isso prejudica o tree-shaking e pode causar erros de inicialização (undefined refs).

## Arquivos de Entrada
- `src/domain/services/CanvasRenderer.ts`
- `src/domain/services/renderers/IRenderer.ts`
- `src/domain/services/renderers/*.ts`

## Detalhamento da Execução
1. **Identificação do Ciclo:** O ciclo ocorre porque o `CanvasRenderer` importa os renderizadores, e os renderizadores importam tipos ou constantes do `CanvasRenderer`.
2. **Abordagem de Extração:**
   - Mover interfaces comuns (como `RenderContext`) de `CanvasRenderer.ts` para um arquivo neutro (ex: `src/domain/services/renderers/types.ts`).
   - Garantir que os renderizadores dependam apenas de interfaces e não da classe concreta `CanvasRenderer`.
3. **Refatoração de Injeção:** Se necessário, usar Injeção de Dependência para que o `CanvasRenderer` registre os renderizadores sem que eles precisem conhecê-lo.

## Critérios de Aceite
- [ ] `fallow dead-code` reporta zero ciclos de dependência para `CanvasRenderer.ts`.
- [ ] `npm run build` e `npm test` passam sem erros.
