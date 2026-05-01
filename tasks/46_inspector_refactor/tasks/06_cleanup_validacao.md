# Task 06: Cleanup e Validação Final

## Objetivo
Remover código morto remanescente, verificar que o limite de 200 linhas do orquestrador é atingido, garantir zero `as any` em todo o submódulo e executar a suite de regressão final. Ajustar imports e organizar a estrutura de arquivos.

## Arquivos de Entrada
- `ElementInspector.ts` refatorado
- Todos os novos componentes (pastas `sections/` e `containers/`)
- Testes da Task 02
- `inspector-events.ts`

## Detalhamento da Execução

1. **Limpeza**:
   - Remova funções não utilizadas (ex: `isText`, `isRect`... se não estão mais no orquestrador; elas podem ter sido movidas para os sub‑componentes; verifique se ainda são necessárias no orquestrador. Idealmente, essas guardas ficam nos componentes, mas se o orquestrador precisar distinguir tipos, podemos manter but reduzir).
   - Verifique se métodos obsoletos foram completamente apagados.
   - Confirme que não há imports de componentes que não são mais usados no orquestrador.

2. **Refatoração final de imports**:
   - Organize os imports do `ElementInspector.ts` em grupos (tipos, core, componentes).
   - Garanta que a importação de `sharedSheet` é a única dependência de estilo.

3. **Validação**:
   - Execute `npm test` e confirme que todos os smoke tests passam.
   - Execute uma verificação manual na aplicação: abrir label, selecionar elementos, alterar propriedades, usar interpolação, abrir vault, alternar visibilidade.
   - Verifique que o console não exibe erros ou warnings inesperados.

4. **Contagem de linhas** do arquivo orquestrador final (apenas código, sem comentários excessivos). Ajuste se passar de 200.

## Critérios de Aceite
- [ ] Nenhum arquivo contém código comentado sem propósito.
- [ ] `ElementInspector.ts` ≤ 200 linhas (contagem de linhas efetivas).
- [ ] Zero ocorrências de `as any` em todo o submódulo de inspeção (use grep).
- [ ] Testes de regressão 100% aprovados.
- [ ] A hierarquia de pastas está limpa (ex: `inspector/sections/`, `inspector/containers/`, `inspector/inspector-events.ts`).