# Master Plan: Grande Auditoria de Integridade (Task 70)

Este arquivo coordena a execução de tarefas por múltiplos agentes para a auditoria de integridade do Label Forge OS.

## Status do Projeto
- **Fase Atual:** Fase 1 (Infraestrutura de Tipagem)
- **Stack:** TypeScript (Strict), Vitest, Tailwind v4.2
- **Progresso Geral:** 0%

## Diretrizes para Agentes
1. **Isolamento de Branch:** Antes de iniciar qualquer modificação, crie uma branch específica seguindo o padrão: `audit/[TASK-ID]-[descrição-curta]`.
   - Exemplo: `git checkout -b audit/TS-01-eventbus-types`.
2. **Leia a Task:** Abra o arquivo correspondente na pasta `tasks/70_audit/`.
3. **Siga os padrões:** GEMINI.md (Strict TS, Atomic Sync, Zero Trust).
4. **Não altere outros módulos** além dos listados em "Arquivos de Entrada" da task.
5. **Testes:** Nenhuma task é concluída sem critérios de aceite verificados via Vitest.
6. **Oráculo de Verdade:** `npm run build` deve passar após cada correção.

---

## Lista de Tarefas (Pipeline)

### Fase 1: Infraestrutura de Tipagem (TS-AUDIT)
| ID | Task | Status | Dependências | Branch Sugerida |
|----|------|--------|--------------|-----------------|
| **TS-01** | [Tipagem Estrita do EventBus](./70_audit/TS_01_eventbus_types.md) | [ ] | — | `audit/TS-01-eventbus` |
| **TS-02** | [Store Type Safety & MergeUpdates](./70_audit/TS_02_store_integrity.md) | [ ] | TS-01 | `audit/TS-02-store-safety` |
| **TS-03** | [Auditoria de Modificadores de Acesso](./70_audit/TS_03_access_modifiers.md) | [ ] | TS-02 | `audit/TS-03-access` |

### Fase 2: Blindagem de Dados (SEC-AUDIT)
| ID | Task | Status | Dependências | Branch Sugerida |
|----|------|--------|--------------|-----------------|
| **SEC-01** | [DataSanitizer Pro: HTML Escape](./70_audit/SEC_01_sanitizer_pro.md) | [x] | — | `audit/SEC-01-sanitizer` |
| **SEC-02** | [Blindagem de Injeção SVG (Icon Component)](./70_audit/SEC_02_svg_hardening.md) | [ ] | SEC-01 | `audit/SEC-02-svg-xss` |
| **SEC-03** | [Refatoração innerHTML -> textContent](./70_audit/SEC_03_dom_injection.md) | [ ] | SEC-01 | `audit/SEC-03-dom-safe` |

### Fase 3: Sincronização Prism (CSS-AUDIT)
| ID | Task | Status | Dependências | Branch Sugerida |
|----|------|--------|--------------|-----------------|
| **CSS-01** | [Migração de Cores para Tailwind v4](./70_audit/CSS_01_theme_sync.md) | [ ] | — | `audit/CSS-01-colors` |
| **CSS-02** | [Centralização de Spacing em shared-styles](./70_audit/CSS_02_spacing_audit.md) | [ ] | — | `audit/CSS-02-spacing` |

### Fase 4: Resiliência de Lógica (TST-AUDIT)
| ID | Task | Status | Dependências | Branch Sugerida |
|----|------|--------|--------------|-----------------|
| **TST-01** | [Cobertura de Serviços (Layout & Snap)](./70_audit/TST_01_services_coverage.md) | [ ] | TS-01 | `audit/TST-01-coverage` |
| **TST-02** | [Testes de Stress de Renderização](./70_audit/TST_02_render_stress.md) | [ ] | — | `audit/TST-02-stress` |

---
## Notas de Orquestração
- Priorizar Fases 1 e 2 (Críticos/Bloqueantes).
- Atualizar o arquivo `tasks/70_AUDIT_CHECKLIST.md` conforme o progresso.
