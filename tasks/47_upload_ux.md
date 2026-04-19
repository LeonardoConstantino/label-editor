# Task 47: Upload UX Refinado (CSV/JSON Batch)

## Objetivo
Transformar o upload de arquivos de dados em uma experiência fluida e visual, com feedback imediato, detecção de erros e preview dos dados carregados.

## Workflow
1. `git checkout -b task/26-a4-batch-ux` (Trabalhando em conjunto com a 26)
2. Refatorar `src/components/preview/DataSourceInput.ts`.

## Detalhamento
- **Estética Tactile Prism:** Zona de drop (Drag & Drop) com animações de pulso e ícones de estado (idle, uploading, success, error).
- **Feedback de Dados:** Após o upload, exibir uma mini-tabela ou contador de registros encontrados e os primeiros 3 exemplos.
- **Validação Visual:** Indicar claramente se as colunas do CSV coincidem com as variáveis `{{...}}` presentes na etiqueta atual.
- **Persistence:** Manter o estado do upload durante a sessão para facilitar testes rápidos de impressão.

## Critérios de Aceite
- [x] Drag & Drop funcional com feedback visual de hover.
- [x] Exibição clara de "X registros carregados" com preview.
- [x] Notificação de erro se o PapaParse falhar ou o arquivo for inválido.
