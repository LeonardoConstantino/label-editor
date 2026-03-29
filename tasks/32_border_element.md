# Task 32: Elemento de Borda & Novos Tipos

## Objetivo
Implementar o `BorderElement` como um objeto independente e preparar o sistema para futuros tipos de elementos decorativos.

## Workflow
1. `git checkout -b task/32-border-element`
2. Adicionar modelo em `src/domain/models/elements/` e renderer correspondente.

## Detalhamento
- **BorderElement:** Um elemento que desenha uma borda (retangular ou com cantos arredondados) ao redor da etiqueta ou de uma área específica.
- **Extensibilidade:** Garantir que o `CanvasRenderer` (orquestrador) consiga registrar o novo tipo sem refatoração profunda.

## Critérios de Aceite
- [ ] Novo botão "Border" na Toolbar.
- [ ] Borda independente renderizada corretamente no Canvas e exportada para PDF.
