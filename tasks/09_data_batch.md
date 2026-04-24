# Task 09: Parser de Dados (CSV/JSON) e Preview

## Objetivo
Implementar a funcionalidade de importar fontes de dados externas para substituir variáveis dinâmicas (ex: `{{nome}}`) nas etiquetas.

## Arquivos de Entrada
- `src/domain/services/DataSourceParser.ts` (A criar)
- `src/components/preview/BatchPreview.ts` (A criar)

## Detalhamento da Execução
1. **Parser:** Suporte para arquivos `.csv` e `.json`. Converter para array de objetos.
2. **Variable Mapping:** Identificar variáveis `{{key}}` nos `TextElement` da etiqueta atual.
3. **Batch Renderer:** Criar um preview que mostra múltiplas instâncias da etiqueta com os dados aplicados.
4. **UI de Importação:** Modal para upload do arquivo de dados e mapeamento de campos.
5. **Testes:** Validar o parse de diferentes formatos de CSV (vírgula vs ponto e vírgula).

## Critérios de Aceite
- [x] Upload de CSV gera uma lista de registros corretamente.
- [x] Variáveis nas etiquetas são substituídas pelos valores do dado correspondente no preview.
- [x] O sistema alerta se uma variável na etiqueta não existir no arquivo de dados.
- [x] Testes unitários para o parser de CSV e JSON.
