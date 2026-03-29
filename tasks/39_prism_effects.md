# Task 39: Efeitos Prism (Sombras/Glow/Bordas)

## Objetivo
Trazer a estética "Neon" e "Hardware" do Design System para dentro dos elementos da etiqueta.

## Workflow
1. `git checkout -b task/39-prism-effects`
2. Modificar Renderers e Modelos.

## Detalhamento
- **Sombras/Glow:** 
  - Adicionar `shadowColor`, `shadowBlur`, `shadowOffsetX`, `shadowOffsetY`.
  - Permitir o efeito "Neon Glow" em textos e retângulos.
- **Bordas Avançadas (Shapes/Images):**
  - `borderRadius`: Suporte para cantos arredondados em retângulos e imagens.
  - `borderDash`: Suporte para bordas tracejadas (dashed).
- **Filtros de Imagem:** Adicionar suporte básico a `grayscale` e `contrast` para `ImageElement`.

## Critérios de Aceite
- [ ] Retângulos e Imagens podem ter cantos arredondados.
- [ ] Efeitos de sombra funcionam sem degradar a performance do Canvas.
- [ ] Exportação de PDF preserva os efeitos visuais.
