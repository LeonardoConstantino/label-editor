# Task 56: Ajuste de Espaçamento no Inspector Header

## Objetivo
Refinar o alinhamento visual do cabeçalho do Inspector (`inspector-header`), adicionando um padding lateral para garantir que os ícones e títulos não fiquem colados na borda da barra de rolagem ou do painel.

## Workflow
1. `git checkout -b task/56-inspector-ui-spacing`
2. Modificar `src/styles/main.css`.

## Detalhamento da Execução
1. **Ajuste de CSS:**
   - Localizar a classe `.inspector-header` no `src/styles/main.css`.
   - Adicionar `padding-right: 8px` (conforme sugerido) para compensar o espaço da barra de rolagem e alinhar com os cards abaixo.
   - Avaliar se um `padding-left` simétrico é necessário para manter o equilíbrio visual.
2. **Validação Visual:**
   - Verificar o alinhamento do título "LAYERS" e do ícone de ajuda em relação aos `element-card` que estão logo abaixo no painel.

## Critérios de Aceite
- [ ] O cabeçalho do Inspector possui um respiro visual de 8px à direita.
- [ ] O alinhamento horizontal entre o header e o conteúdo do painel está consistente.
- [ ] Nenhuma quebra de layout em resoluções menores.
