# Task 06: Proteção contra SSRF (CWE-918) [DET-SEC]

## Objetivo
Auditar e blindar as chamadas de rede dinâmicas (`fetch`) identificadas pelo Fallow. Garantir que as URLs de fontes externas solicitadas não permitam ataques de Server-Side Request Forgery (ou injeção de host malicioso no cliente).

## Arquivos e Sinks (Fallow Report)
- `src/utils/FontTransfer.ts`: Linha 45 (`fetch(url)`).
- `src/domain/services/BatchWorker.ts`: Linha 82 (`fetch(url)` dentro do worker).

## Detalhamento da Execução
1. **Política de Hosts:** Definir uma lista de hosts confiáveis (Allowlist) para carregamento de fontes (ex: `fonts.gstatic.com`, `fonts.googleapis.com`, `leonardoconstantino.github.io`).
2. **Implementação do Guardião:**
   - Criar uma função utilitária `validateUrl(url: string): boolean` que verifica se o host da URL pertence à Allowlist.
   - Invocar esta função antes de qualquer chamada `fetch()`.
3. **Log de Segurança:** Se uma URL inválida for detectada, disparar log de erro e abortar a operação silenciosamente (evitando DoS por crash).

## Critérios de Aceite
- [ ] Chamadas de fetch protegidas por validação de host.
- [ ] Fontes legítimas continuam carregando normalmente.
- [ ] `fallow security` reporta que os sinks de rede agora possuem verificação.
