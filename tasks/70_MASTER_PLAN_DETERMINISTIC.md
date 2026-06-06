# Master Plan: Auditoria Determinística (Fallow CLI)

Este plano coordena a resolução dos achados técnicos identificados pela ferramenta Fallow, focando em código morto, integridade arquitetural e segurança de injeção.

## Status do Projeto
- **Fase Atual:** Fase 1 (Dead Code & Surface Reduction)
- **Stack:** TS, Tailwind v4, Fallow CLI, Vitest
- **Progresso Geral:** 0% (Pós-Auditoria Determinística)

## Diretrizes de Execução
1. **Isolamento:** Cada task deve ser executada em sua branch `audit/DET-NN`.
2. **Confirmação:** Após cada remoção de código morto, o `npm run build` é obrigatório.
3. **Segurança:** Sinks de HTML (`innerHTML`) devem ser convertidos para `textContent` ou escapados rigorosamente.

---

## Pipeline de Tasks

### Fase 1: Limpeza & Código Morto [DET-DEAD]
| ID | Task | Status | Dependências | Branch |
|----|------|--------|--------------|--------|
| **01** | [Remoção de Arquivos e Assets Mortos](./70_audit_det/DET_01_unused_files.md) | [x] | — | `audit/DET-01-unused` |
| **02** | [Cleanup de Exportações e Membros Órfãos](./70_audit_det/DET_02_dead_exports.md) | [x] | 01 | `audit/DET-02-exports` |

### Fase 2: Integridade Arquitetural [DET-ARCH]
| ID | Task | Status | Dependências | Branch |
|----|------|--------|--------------|--------|
| **03** | [Resolução de Exportações Duplicadas (AlignAction)](./70_audit_det/DET_03_dup_exports.md) | [x] | — | `audit/DET-03-dupes` |
| **04** | [Desacoplamento de Ciclos do CanvasRenderer](./70_audit_det/DET_04_circular_deps.md) | [x] | — | `audit/DET-04-cycles` |

### Fase 3: Blindagem de Sinks de Segurança [DET-SEC]
| ID | Task | Status | Dependências | Branch |
|----|------|--------|--------------|--------|
| **05** | [Refatoração de Sinks HTML (CWE-79)](./70_audit_det/DET_05_security_sinks.md) | [x] | — | `audit/DET-05-sec-html` |
| **06** | [Proteção contra SSRF (CWE-918)](./70_audit_det/DET_06_security_ssrf.md) | [ ] | — | `audit/DET-06-sec-ssrf` |

---
## Notas de Orquestração
- **Oráculo Fallow:** Ao final de cada fase, rodar `npx fallow` para confirmar a extinção dos achados.
- **Hotspots:** Arquivos como `InspectorDocumentSetup.ts` e `UISoundManager.ts` exigem atenção redobrada devido à alta complexidade (CRAP score).
