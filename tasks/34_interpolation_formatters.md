# Task 34: Formatadores na Interpolação (upper/currency/etc)

## Objetivo
Implementar a capacidade de aplicar formatadores de texto diretamente nas variáveis de interpolação (ex: `{{ valor:currency }}`), permitindo um controle dinâmico sobre a exibição dos dados sem necessidade de pré-processamento. Suportar valores padrão opcionais quando a variável não existir (ex: `{{ valor:currency||R$ 0,00 }}`).

## Workflow
1. `git checkout -b task/34-formatters`
2. Modificar `src/domain/services/DataSourceParser.ts` e `src/domain/services/renderers/TextRenderer.ts`.

## Detalhamento
- **Regex Update:** Atualizar a regex de interpolação para capturar a variável, o formatador opcional e o valor padrão opcional: `/\{\{\s*([\w\s."'-]+)(?::([\w,()\s.:-]+))?(?:\|\|([^}]+))?\s*\}\}/g`.
- **Formatadores Iniciais:**
  - `upper`: Converte texto para MAIÚSCULAS.
  - `lower`: Converte texto para minúsculas.
  - `title`: Capitaliza a primeira letra de cada palavra.
  - `capitalize`: Capitaliza apenas a primeira letra do texto.
  - `currency`: Formata números como moeda brasileira (R$ 0,00).
  - `percent`: Formata números como porcentagem (ex: 0.15 → 15%).
  - `number`: Formata números com separadores de milhar (ex: 1000 → 1.000).
  - `date`: Formata datas no padrão brasileiro (DD/MM/YYYY).
  - `datetime`: Formata data e hora no padrão brasileiro (DD/MM/YYYY HH:mm).
  - `truncate`: Limita o texto a N caracteres (ex: `{{ texto:truncate(50) }}`).
  - `trim`: Remove espaços em branco do início e fim.
  - `json`: Converte objetos em JSON formatado.
- **Valores Padrão:** Caso a variável não exista ou seja `null`/`undefined`, usar o valor especificado após `||` (ex: `{{ nome||Anônimo }}`).
- **Extensibilidade:** Implementar um método `format(value, formatter, params)` que possa ser facilmente expandido com novos filtros customizados.
- **Encadeamento de Formatadores:** Permitir aplicação de múltiplos formatadores (ex: `{{ texto:trim:upper }}`).

## Critérios de Aceite
- [x] Variáveis com e sem formatadores funcionam corretamente.
- [x] Valores padrão são aplicados quando a variável não existe ou é `null`/`undefined`.
- [x] O preview no **Batch Studio** reflete a formatação aplicada.
- [x] O sistema ignora ou retorna o valor original caso o formatador não exista.
- [x] Todos os formatadores iniciais (upper, lower, title, capitalize, currency, percent, number, date, datetime, truncate, trim, json) funcionam conforme especificado.
- [x] Formatadores com parâmetros (ex: `truncate(50)`) são processados corretamente.
- [x] **Testes Unitários:**
  - [x] Teste de formatadores básicos (upper, lower, title, capitalize, trim).
  - [x] Teste de formatadores numéricos (currency, percent, number).
  - [x] Teste de formatadores de data (date, datetime) com diferentes formatos de entrada.
  - [x] Teste de truncate com diferentes tamanhos.
  - [x] Teste de formatador json com objetos e arrays.
  - [x] Teste de valores padrão quando variável não existe.
  - [x] Teste de valores padrão quando variável é `null` ou `undefined`.
  - [x] Teste de formatador inexistente retornando valor original.
  - [x] Teste de interpolação sem formatador.
  - [x] Teste de encadeamento de formatadores.
  - [x] Teste de edge cases (valores vazios, números negativos, datas inválidas).
