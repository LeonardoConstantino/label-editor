# Task 12: Renderers Modulares & canvas-txt

## Objetivo
Implementar o padrão **Strategy** para renderização, integrando a biblioteca `canvas-txt` para tratamento profissional de textos (wrap, alinhamento vertical, ellipsis).

## Arquivos de Entrada
- `src/domain/services/renderers/TextRenderer.ts` (A criar)
- `src/domain/services/renderers/CanvasRenderer.ts` (Refatorar)
- `src/domain/services/renderers/ImageRenderer.ts` (A criar)
- `src/domain/services/renderers/RectangleRenderer.ts` (A criar)

## Detalhamento
1. **TextRenderer:** Integrar `canvas-txt` via script no `index.html` e implementar o renderer que lida com `fontSize`, `vAlign` e `lineHeight`.
2. **Strategy Pattern:** Criar uma classe renderer para cada tipo de elemento, injetando-as no `CanvasRenderer` orquestrador.
3. **Conversão de Unidades:** Centralizar a lógica de `mm -> px` baseada no DPI e escala configurada.
4. **Performance:** Redesenhar apenas elementos visíveis e ordenados por `zIndex`.

## Critérios de Aceite
- [ ] Textos longos fazem wrap automático dentro da área delimitada pelo elemento.
- [ ] Alinhamento vertical (top/middle/bottom) funcionando conforme configuração.
- [ ] O `CanvasRenderer` delega corretamente a renderização baseado no tipo do elemento.
- [ ] Nenhuma lógica de desenho direto permanece no orquestrador.
