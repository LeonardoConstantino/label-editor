# Task 21: Refinamento de Profundidade Cockpit

## Objetivo
Ajustar o macro-layout para garantir a sensação de profundidade do Cockpit. A etiqueta deve parecer flutuar sobre o grid, e os painéis devem ter o desfoque (`backdrop-blur`) e sombras corretas.

## Workflow
1. `git checkout -b task/21-cockpit-refinement`
2. Modificar `src/styles/main.css` e `index.html`.

## Detalhamento
- **Canvas Workspace:** Refinar o padrão de grid (dot grid) para ser sutil e técnico.
- **Shadows:** Aplicar `box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.9)` na `.label-artboard`.
- **Panels:** Garantir que o `.panel-glass` tenha `backdrop-filter: blur(24px)` e a borda esquerda correta.

## Critérios de Aceite
- [x] A etiqueta visualmente "salta" do fundo escuro.
- [x] A toolbar e o inspector não bloqueiam a visão do grid por completo (transparência correta).
- [x] Layout responsivo mantido em 100vw/vh.
