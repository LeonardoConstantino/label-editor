# Task 43: Renderers Avançados (Shapes & Blending)

## Objetivo
Refatorar os renderizadores de Retângulo e Imagem para suportar as novas propriedades de estilo e efeitos visuais do inventário.

## Workflow
1. `git checkout -b task/43-adv-renderers`
2. Modificar `RectangleRenderer.ts` e `ImageRenderer.ts`.

## Detalhamento
- **Rectangle:** Suporte real para `borderRadius` e `strokeWidth`.
- **Image:** Suporte para `opacity`, `smoothing` e `compositeOperation` (blending modes como multiply, screen, etc).
- **Rotação:** Aplicar `ctx.rotate()` em todos os renderers, garantindo que o desenho ocorra a partir do centro (translate para o centro, rotate, desenha, restore).

## Critérios de Aceite
- [ ] Imagens podem ser mescladas com o fundo via Blending Modes.
- [ ] Rotação não desloca o elemento de sua posição X,Y esperada.
- [ ] Opacidade funciona individualmente por elemento.
