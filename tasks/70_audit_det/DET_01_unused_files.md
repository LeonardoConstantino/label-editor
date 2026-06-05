# Task 01: Remoção de Arquivos e Assets Mortos

## Objetivo
Eliminar arquivos que não possuem nenhum ponto de entrada (entry point) no sistema, reduzindo o ruído no projeto e o peso do repositório.

## Arquivos de Entrada
- `old/main.js` (REMOVIDO)
- `old/style.css` (REMOVIDO)
- `src/components/editor/ElementInspector.legacy.ts` (REMOVIDO)
- `src/core/pwa-register.ts` (RENOMEADO para .disabled para uso futuro)

## Detalhamento da Execução
1. **Verificação de Referência:** Confirmada a ausência de referências ativas.
2. **Exclusão Física / Desativação:**
   - Removidos arquivos legados e diretório `old/`.
   - `pwa-register.ts` renomeado para `.ts.disabled` para preservar lógica futura de PWA.
3. **Build de Teste:** Executado `npm run build` com sucesso.

## Critérios de Aceite
- [x] Arquivos removidos fisicamente ou desativados conforme instrução.
- [x] `npm run build` concluído com sucesso.
- [x] `fallow dead-code` não reportará mais estes arquivos como ativos.
