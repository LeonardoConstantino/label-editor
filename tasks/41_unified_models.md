# Task 41: Modelos Unificados (Sync Inventory)

## Objetivo
Atualizar as interfaces TypeScript do domínio para refletir o `definition_elements.md`, integrando as novas propriedades universais (`rotation`, `opacity`, `locked`, `name`).

## Workflow
1. `git checkout -b task/41-models-sync`
2. Modificar `src/domain/models/elements/BaseElement.ts` e `SpecificElements.ts`.

## Detalhamento
- **BaseElement:** Adicionar campos opcionais/obrigatórios conforme inventário.
- **Enums:** Garantir que `ElementType`, `BorderStyle`, `TextOverflow` e `ImageFit` estejam tipados.
- **Store Sync:** Garantir que o `Store` consiga processar atualizações para essas novas propriedades universais.

## Critérios de Aceite
- [x] Interfaces TypeScript sem erros de compilação.
- [x] Todo elemento novo criado já possui os novos campos por padrão (mesmo que nulos/vazios).
