# Task 49: Unificação de Estilo KBD e Injeção Dinâmica (Prism Style)

## Objetivo
Padronizar visualmente todas as representações de teclas (`<kbd>`) no sistema e implementar um mecanismo para injetar atalhos formatados dinamicamente em tooltips e manuais, utilizando o motor do `UIKeyboardShortcuts`.

## Workflow
1. `git checkout -b task/49-kbd-unification`
2. **Arquitetura de Formatação:**
   - Extrair a lógica de `formatKey` do `UIKeyboardShortcuts.ts` para uma função utilitária em `src/utils/utils.ts` ou um método estático no componente.
   - Garantir que a formatação suporte ícones (↑, ↓, Ctrl, etc.) de forma consistente.
3. **Estilização (Tactile Prism):**
   - Refinar a classe `.kbd-prism` no `shared-styles.ts` para incluir profundidade 3D, bordas de 1px e tipografia técnica (JetBrains Mono/Geist Mono).
4. **Injeção Dinâmica:**
   - No `Toolbar.ts`, substituir os atalhos estáticos por uma chamada que resolva o atalho via `ShortcutService`.
   - Implementar a variante `minimal` no `UIKeyboardShortcuts` que renderiza apenas as teclas formatadas.
5. **Auditoria Visual:** Garantir que o Help Center e as Tooltips usem o mesmo motor de renderização.

## Critérios de Aceite
- [ ] Todas as teclas no app seguem o mesmo padrão visual "Tactile Prism".
- [ ] Tooltips da Toolbar exibem atalhos atualizados automaticamente se o `ShortcutService` for modificado.
- [ ] O componente `UIKeyboardShortcuts` é reutilizável para casos de "atalho único" (chips).
- [ ] Suporte a ícones de setas e modificadores (Ctrl/Shift/Alt) em todas as visualizações.
