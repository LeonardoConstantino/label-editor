# Task 34: Formatadores na Interpolação (upper/currency/etc)

## Objetivo
Implementar a capacidade de aplicar formatadores de texto diretamente nas variáveis de interpolação (ex: `{{ valor:currency }}`), permitindo um controle dinâmico sobre a exibição dos dados sem necessidade de pré-processamento.

## Workflow
1. `git checkout -b task/34-formatters`
2. Modificar `src/domain/services/DataSourceParser.ts` e `src/domain/services/renderers/TextRenderer.ts`.

## Detalhamento
- **Regex Update:** Atualizar a regex de interpolação para capturar a variável e o formatador opcional: `/\{\{\s*(\w+)(?::(\w+))?\s*\}\}/g`.
- **Formatadores Iniciais:**
  - `upper`: Converte texto para MAIÚSCULAS.
  - `lower`: Converte texto para minúsculas.
  - `currency`: Formata números como moeda brasileira (R$ 0,00).
- **Extensibilidade:** Implementar um método `format(value, formatter)` que possa ser facilmente expandido com novos filtros (ex: `date`, `truncate`).

## Critérios de Aceite
- [ ] Variáveis com e sem formatadores funcionam corretamente.
- [ ] O preview no **Batch Studio** reflete a formatação aplicada.
- [ ] O sistema ignora ou retorna o valor original caso o formatador não exista.
