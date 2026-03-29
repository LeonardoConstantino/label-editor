# Task 38: Tipografia Avançada (Leading/Tracking)

## Objetivo
Expandir o controle sobre o texto, permitindo ajustes finos que são comuns em etiquetas profissionais.

## Workflow
1. `git checkout -b task/38-typography`
2. Modificar `src/domain/models/elements/SpecificElements.ts`.
3. Atualizar `TextRenderer.ts` e `ElementInspector.ts`.

## Detalhamento
- **Novas Propriedades (TextElement):**
  - `lineHeight`: (Leading) Espaçamento entre linhas.
  - `letterSpacing`: (Tracking) Espaçamento entre letras.
  - `verticalAlign`: (Top, Middle, Bottom) Já previsto, mas precisa de suporte total no Inspector.
  - `textTransform`: (None, Uppercase, Lowercase).
- **Canvas Update:** Integrar as propriedades de `lineHeight` e `align` nas configurações do `canvas-txt`.

## Critérios de Aceite
- [ ] Textos com múltiplas linhas respeitam o `lineHeight`.
- [ ] O usuário pode forçar CAIXA ALTA via Inspector.
- [ ] Alinhamento vertical funciona dentro do retângulo de dimensões.
