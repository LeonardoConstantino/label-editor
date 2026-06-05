# Task 06: Proteção contra SSRF (CWE-918)

## Objetivo
Auditar as chamadas de rede dinâmicas (`fetch`) identificadas pelo Fallow, garantindo que URLs externas não sejam controladas pelo usuário sem validação de host (Allowlist).

## Arquivos de Entrada
- `src/utils/FontTransfer.ts`
- `src/domain/services/BatchWorker.ts`

## Detalhamento da Execução
1. **Rastreio de Origem:** No `FontTransfer.ts`, as URLs de fontes vêm do `config.customFonts`. No `BatchWorker.ts`, as fontes são injetadas para fidelidade 100%.
2. **Implementação de Whitelist:**
   - Criar constante `ALLOWED_URL_PREFIXES` (ex: `fonts.gstatic.com`, `fonts.googleapis.com`, caminhos locais).
   - Adicionar função de validação antes de cada `fetch()`.
3. **Tratamento de Erro:** Se a URL for suspeita, disparar log de segurança e abortar a requisição.

## Critérios de Aceite
- [ ] Implementação de validação de URL em `FontTransfer.ts`.
- [ ] Implementação de validação de URL em `BatchWorker.ts`.
- [ ] `fallow security` reporta que os sinks de fetch agora possuem guardiões de validação.
- [ ] `npm test` passa, confirmando que fontes legítimas continuam carregando.
