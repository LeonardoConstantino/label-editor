# Task 42: BorderElement (Standalone Moldura)

## Objetivo
Implementar o `BorderElement` como uma entidade independente para decoração de etiquetas, suportando diferentes estilos de linha e raios.

## Workflow
1. `git checkout -b task/42-border-element`
2. Criar `src/domain/services/renderers/BorderRenderer.ts`.
3. Adicionar botão na `Toolbar` e controles no `ElementInspector`.

## Detalhamento
- **Lógica de Dimensões:** Diferente de outros elementos, a borda calcula seu tamanho baseada no Canvas, a menos que o usuário defina dimensões manuais.
- **Estilos:** Suporte a `solid`, `dashed` e `dotted` usando `ctx.setLineDash()`.
- **Renderização:** Suporte a `radius` para molduras arredondadas.

## Critérios de Aceite
- [x] Borda é renderizada respeitando a espessura (`width`) em mm.
- [x] Troca de cor e estilo funciona em tempo real.
- [x] Suporte ao estilo DOUBLE concêntrico implementado.
