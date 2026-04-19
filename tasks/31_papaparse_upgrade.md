# Task 31: Upgrade no Parser de CSV (PapaParse)

## Objetivo
Substituir o parser manual de CSV por uma integração com a biblioteca **PapaParse**, permitindo o processamento de planilhas complexas.

## Workflow
1. `git checkout -b task/31-papaparse-upgrade`
2. Adicionar CDN do PapaParse no `index.html`.
3. Refatorar `src/domain/services/DataSourceParser.ts`.

## Detalhamento
- **Robustez:** Lidar com vírgulas dentro de aspas, delimitadores automáticos e quebras de linha em células.
- **Interface:** Manter a compatibilidade com o array de objetos esperado pelo `Batch Studio`.

## Critérios de Aceite
- [x] Suporte a arquivos CSV exportados pelo Excel e Google Sheets sem erros de formatação.
- [x] Teste com arquivo contendo caracteres especiais e aspas.
