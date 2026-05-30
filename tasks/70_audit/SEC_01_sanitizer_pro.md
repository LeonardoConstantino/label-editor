# Task SEC-01: DataSanitizer Pro: HTML Escape

## Objetivo
Implementar escape de HTML obrigatório no pipeline de processamento de dados externos para prevenir ataques de XSS via variáveis dinâmicas.

## Arquivos de Entrada
- `src/core/DataSanitizer.ts`
- `src/utils/sanitize.ts`
- `src/domain/services/DataSourceParser.ts`

## Detalhamento da Execução

1. **Método escapeHTML:**
   - Implementar uma função de escape robusta em `DataSanitizer.ts`.
   - Deve lidar com `<`, `>`, `"`, `'`, e `&`.

2. **Integração no Processamento:**
   - Garantir que `sanitizeValue` aplique o escape em todas as strings por padrão.
   - O `DataSourceParser` deve invocar este sanitizador ao carregar CSV/JSON.

3. **Testes Unitários:**
   - Adicionar casos de teste com payloads XSS comuns (`<script>`, `onload=...`, `javascript:...`).

## Critérios de Aceite
- [x] Strings processadas pelo DataSanitizer não contêm tags HTML brutas.
- [x] Testes de segurança passam com 100% de sucesso.
- [x] Nenhuma regressão na exibição de dados legítimos.
