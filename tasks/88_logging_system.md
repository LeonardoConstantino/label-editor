# Task 88: Sistema de Logging & Telemetria Centralizado

## Objetivo
Refatorar o sistema de logs (`Logger.ts`) para suportar níveis de severidade dinâmicos, persistência via preferências do usuário e overrides via URL, eliminando a dependência de flags estáticas no `defaults.ts`.

## Arquitetura Proposta
- **Log Levels:** 
  - `0 (SILENT)`: Nenhum log.
  - `1 (ERROR)`: Apenas erros críticos. (Padrão de Produção)
  - `2 (WARN)`: Erros e avisos.
  - `3 (INFO)`: Fluxo principal do sistema.
  - `4 (DEBUG)`: Detalhes técnicos, payloads e eventos.
- **Persistence:** O nível de log será armazenado no `UserPreferences` (IndexedDB).
- **Runtime Overrides:**
  - Suporte a `?debug=level` na URL (ex: `?debug=4` ativa logs totais).
  - Sequência de teclas `L-O-G-S` alterna entre SILENT e o nível anterior.

## Escopo de Implementação
- [x] Refatorar `src/core/Logger.ts` para ser uma classe singleton com estado interno de nível.
- [x] Atualizar `src/domain/models/UserPreferences.ts` para incluir `logLevel: number`.
- [x] Implementar o "Boot Switch" no `main.ts` para configurar o Logger logo no início.
- [x] Adicionar seletor de "Log Level" no `PreferencesModal`.
- [x] Limpar as flags `DEBUG` do `src/constants/defaults.ts`.

## Critérios de Aceite
- [x] Logs de nível DEBUG não aparecem no console se o nível global for INFO ou ERROR.
- [x] Mudar o nível nas configurações reflete instantaneamente no comportamento do console.
- [x] O parâmetro de URL `debug` força o nível desejado ignorando o banco de dados.
- [x] Zero impacto na performance quando o nível for SILENT.

---
**Esta task limpa o "ruído" do desenvolvimento e prepara o app para monitoramento profissional.**
