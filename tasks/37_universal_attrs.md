# Task 37: Atributos Universais (Opacidade/Rotação)

## Objetivo
Adicionar propriedades comuns a todos os elementos da etiqueta para aumentar a flexibilidade criativa e a organização.

## Workflow
1. `git checkout -b task/37-universal-attrs`
2. Modificar `src/domain/models/elements/BaseElement.ts`.
3. Atualizar Renderers e `ElementInspector.ts`.

## Detalhamento
- **Novas Propriedades:**
  - `opacity`: (0.0 a 1.0) Controla a transparência global do elemento.
  - `rotation`: (0 a 360 graus) Permite girar elementos.
  - `name`: Nome customizado para a camada (ex: "Preço Principal").
- **Renderer Update:** Utilizar `ctx.globalAlpha` para opacidade e `ctx.rotate()` para rotação (ajustando o ponto de pivot para o centro do elemento).
- **Inspector:** Adicionar scrubbers para Opacidade e Rotação no grupo "Transform".

## Critérios de Aceite
- [ ] Elementos giram e ficam transparentes em tempo real no Canvas.
- [ ] O nome customizado aparece no header do card no Inspector.
- [ ] Histórico (Undo/Redo) suporta essas mudanças.
