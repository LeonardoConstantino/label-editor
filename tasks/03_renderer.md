# Task 03: Serviço de Renderização de Canvas

## Objetivo
Criar o `CanvasRenderer` responsável por desenhar os modelos de domínio no contexto 2D do Canvas, tratando a conversão de mm para pixels.

## Arquivos de Entrada
- `src/domain/services/CanvasRenderer.ts` (A criar)
- `src/domain/models/elements/BaseElement.ts`

## Detalhamento da Execução
1. **Lógica de Escala:** Implementar conversão `mm -> px` baseada no DPI e escala de zoom.
2. **Renderers Específicos:** Métodos privados para desenhar texto (com wrap), imagens e formas.
3. **Hit Detection:** Implementar `hitTest(element, x, y)` para detectar cliques em elementos no canvas.
4. **Context Management:** Usar `ctx.save()` e `ctx.restore()` para isolar estilos de cada elemento.
5. **Testes:** `src/domain/services/__tests__/CanvasRenderer.test.ts` usando um mock de CanvasRenderingContext2D.

## Critérios de Aceite
- [ ] Elementos de texto são renderizados com a fonte e cor corretas.
- [ ] Elementos de imagem respeitam o `object-fit` (cover/contain).
- [ ] O renderer converte corretamente 25.4mm para o número esperado de pixels em 300 DPI.
- [ ] Testes validam o `hitTest` para elementos em diferentes posições.
