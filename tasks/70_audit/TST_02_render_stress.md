# Task TST-02: Testes de Stress de Renderização

## Objetivo
Validar a estabilidade do motor de renderização sob condições extremas, garantindo que o app não trave ou apresente artefatos visuais com grandes volumes de dados.

## Arquivos de Entrada
- `src/domain/services/CanvasRenderer.ts`
- `src/domain/services/BatchWorker.ts`

## Detalhamento da Execução

1. **Teste de Lote Massivo:**
   - Simular geração de PDF com 5000+ registros.
   - Verificar vazamentos de memória no worker.

2. **Teste de Conteúdo Extremo:**
   - Renderizar textos com 4000+ caracteres em caixas pequenas.
   - Verificar comportamento do O(log N) Binary Search para elipses.

3. **Dados Inválidos:**
   - Tentar renderizar elementos com coordenadas `NaN` ou `Infinity` e garantir falha graciosa.

## Critérios de Aceite
- [ ] App não crasha com 5000 registros (simulado em teste).
- [ ] Renderizador falha silenciosamente (logando erro) em dados corrompidos ao invés de lançar exceções fatais.
