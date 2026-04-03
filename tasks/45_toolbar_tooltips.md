# Task 45: Tooltips da Toolbar (Power User)

## Objetivo
Implementar "Cards de Ação Rápida" em todos os botões da Toolbar utilizando o componente `ui-tooltip`, visando educar o usuário sobre atalhos de teclado e funcionalidades.

## Workflow
1. `git checkout -b task/45-toolbar-tooltips`
2. Modificar `src/components/editor/Toolbar.ts`.

## Detalhamento
- **Anatomia:** 
  - Nome da ferramenta (esquerda) + Atalho (direita) em um header flex.
  - Descrição técnica em texto muted.
- **Configuração:**
  - `placement="bottom"`
  - `delay="300"`
  - Largura fixa de `200px`.
- **Mapeamento de Atalhos:**
  - Texto (T), Retângulo (R), Imagem (I), Undo (Ctrl+Z), Redo (Ctrl+Y), Save (Ctrl+S), Batch (Ctrl+E).

## Critérios de Aceite
- [ ] Todos os botões da toolbar possuem tooltips ricos.
- [ ] O visual segue o padrão "Technical Card" definido na solicitação.
- [ ] O delay evita disparos acidentais durante a navegação rápida.
