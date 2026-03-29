# Task 44: TextElement Pro (Overflow & Vertical)

## Objetivo
Elevar o `TextRenderer` ao nível profissional, suportando alinhamentos complexos e modos de overflow definidos no inventário.

## Workflow
1. `git checkout -b task/44-text-pro`
2. Modificar `src/domain/services/renderers/TextRenderer.ts`.

## Detalhamento
- **Alinhamento:** Implementar suporte total para `verticalAlign` (top, middle, bottom).
- **Overflow:** 
  - `clip`: Corta o texto.
  - `ellipsis`: Adiciona "..." (integrar com as capacidades do `canvas-txt`).
  - `wrap`: Quebra automática.
  - `scale`: Reduz o tamanho da fonte para caber no bounding box.
- **Rotação & Opacidade:** Integrar com a lógica de transformação global do Renderer.

## Critérios de Aceite
- [ ] Textos longos respeitam o modo de overflow selecionado.
- [ ] O alinhamento vertical posiciona o texto corretamente dentro da área definida pelas dimensões.
