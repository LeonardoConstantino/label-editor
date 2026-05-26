# Task 90: Implementação do LineElement (Divisor Prism)

## Objetivo
Introduzir o elemento de linha para permitir a criação de divisores, grades manuais e destaques visuais com suporte total aos efeitos Prism (Sombras/Brilhos).

## Análise Técnica
- **Modelo:** `LineElement` herdando de `BaseElement` com `endPosition`, `strokeWidth`, `color` e `style`.
- **Render:** Uso de `ctx.lineTo` com suporte a `setLineDash` para estilos pontilhados/tracejados.
- **Hit Test:** Cálculo de distância ponto-segmento para permitir a seleção precisa da linha no Canvas.
- **UI:** Nova seção no Inspector para controle das coordenadas e estética da linha.

## Critérios de Aceite
- [x] Novo tipo `ElementType.LINE` registrado.
- [x] Renderer de linha funcional e preciso em mm.
- [x] Seleção de linha no Canvas funcionando (hitTest).
- [x] Suporte a estilos: Solid, Dashed, Dotted.
- [x] Compatibilidade total com Sombras e Brilhos (Prism Effects).
- [x] Atalho `L` e botão na Toolbar adicionados.

---
**Status:** Concluído 🚀
