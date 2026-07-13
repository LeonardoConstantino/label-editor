# Task TACT-02: Correção do Theme Sync (PreferencesModal)

## Objetivo
Investigar e corrigir a falha na aplicação do tema Prism em partes da UI dentro do `PreferencesModal.ts`. Garantir que o estado de tema (Dark/Light) seja aplicado de forma reativa.

## Arquivos de Entrada
- `src/components/preferences/PreferencesModal.ts`

## Detalhamento da Execução
1. **Auditoria:** Investigar quais elementos não estão respondendo às variáveis de tema.
2. **Correção:** Garantir que todos os estilos injetados no Shadow DOM utilizem `adoptedStyleSheets` ou classes que herdam do sistema de temas.

## Critérios de Aceite
- [x] O tema é aplicado corretamente em 100% dos elementos do modal.
- [x] A mudança de tema ocorre instantaneamente sem necessidade de refresh.
