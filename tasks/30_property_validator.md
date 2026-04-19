# Task 30: Validador de Propriedades Técnico

## Objetivo
Implementar um motor de validação para garantir a integridade dos dados dos elementos antes de serem processados pelo Store ou Renderers.

## Workflow
1. `git checkout -b task/30-property-validator`
2. Criar `src/domain/validators/ElementValidator.ts`.

## Detalhamento
- **Regras:** Validar se a cor é um Hexadecimal válido, se o tamanho da fonte é `> 0`, se as dimensões são positivas e se campos obrigatórios estão preenchidos.
- **Integração:** Adicionar chamada de validação no `Store.ts` dentro do `element:update` e `element:add`.
- **Feedback:** Emitir alertas via `UISM` ou `toastManager` em caso de dados inválidos.

## Critérios de Aceite
- [x] O sistema impede a entrada de valores que quebrariam a renderização.
- [x] Mensagens de erro claras para o usuário final.
