# Task 51: Correção de Interferência de Atalhos em Inputs

## Objetivo
Garantir que os atalhos de teclado (especialmente as teclas únicas e setas) não interfiram na digitação em campos de entrada (inputs) e áreas editáveis, protegendo a experiência de preenchimento do Inspector.

## Workflow
1. `git checkout -b task/51-keyboard-fix`
2. **Análise Profunda:** Mapear a matriz de atalhos vs. estados de foco. Identificar quais atalhos devem ser bloqueados (ex: 'T', 'Delete', 'Setas') e quais devem ser permitidos mesmo em foco (ex: 'Ctrl+S', 'Ctrl+Z').
3. Refatorar `src/core/KeyboardShortcutManager.ts`.
4. Ajustar registros em `src/core/ShortcutService.ts`.

## Detalhamento da Execução
1. **Análise de Regressão:**
   - Antes de alterar o core, validar se a mudança no contexto `'global'` afetará atalhos que *devem* ser globais.
   - Avaliar se o uso de `event.preventDefault()` em atalhos de setas está impedindo o comportamento nativo de navegação de texto.
2. **Refinamento do Core (`KeyboardShortcutManager`):**
   - No método `_checkContext`, implementar lógica que diferencia atalhos de "Tecla Única" de "Combinações com Modificadores".
   - Bloquear automaticamente qualquer "Tecla Única" se `isInputFocused` for verdadeiro, independentemente do contexto ser `'global'`.
   - Garantir que `registerLongPress` valide o foco antes de iniciar o timer de ativação.
3. **Ajuste no `ShortcutService`:**
   - Padronizar atalhos de movimentação (setas) para respeitarem o contexto de foco.

## Critérios de Aceite
- [x] Digitar em qualquer input não dispara ferramentas (T, R, I, B, V, P).
- [x] Tecla `Delete` funciona normalmente em textos sem excluir o elemento do canvas.
- [x] Setas direcionais movem o cursor dentro de inputs de texto/número em vez de mover o elemento.
- [x] Atalhos de sistema (`Ctrl+Z`, `Ctrl+S`, `Ctrl+Y`) continuam funcionando mesmo com foco no input.
- [x] O sistema de Long Press é ignorado durante a digitação.
- [x] Detecção de foco perfura o Shadow DOM para suportar Web Components.
