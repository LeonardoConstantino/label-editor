# Task 73: Adoção Universal do AppSelect (Visual Unification)

## Objetivo
Unificar a estética de todos os seletores do aplicativo utilizando o novo componente `AppSelect`. Isso eliminará o visual inconsistente dos selects nativos do navegador, trazendo glassmorphism, suporte a sublabels e uma experiência de interação fluida em todas as seções do Inspector e Preferências.

## Workflow
1. `git checkout -b task/73-select-adoption`
2. **Inspector - Seção de Texto:**
   - Substituir Font Family select.
   - Substituir Text Align e Vertical Align.
   - Substituir Overflow Mode.
3. **Inspector - Seção de Imagem:**
   - Substituir Fit Mode select.
   - Substituir Composite Operation (Blend Modes).
4. **Inspector - Seção de Borda/Forma:**
   - Substituir Border Style select.
5. **Preferências Globais (Document Setup):**
   - Substituir o seletor de Unidades (MM, PX, PT).
   - Implementar seletor de DPI Presets (72, 150, 300, 600).
6. **Sincronização:** Garantir que o `syncValues` de cada componente atualize o `AppSelect` corretamente quando o estado mudar externamente.

## Critérios de Aceite
- [ ] Zero selects nativos visíveis em todo o aplicativo.
- [ ] Todas as seleções via `AppSelect` refletem corretamente na Store e no Canvas.
- [ ] O componente `AppSelect` lida corretamente com listas longas (ex: Fontes) via scroll interno.
- [ ] A navegação por teclado e foco funciona de forma consistente em todos os novos seletores.
