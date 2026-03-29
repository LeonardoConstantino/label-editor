# Master Plan: Label Editor MVP+ (Tactile Prism)

Este plano coordena a transição do MVP inicial para a versão MVP+, focada em refinamento visual, arquitetura robusta baseada em eventos e feedback sensorial completo (visual e auditivo).

## Status do Projeto
- **Fase Atual:** Refatoração de Core & UI (Tactile Prism)
- **Stack:** TS, Vite, Tailwind v4.2, canvas-txt, jsPDF, UISoundManager.
- **Progresso:** 15% (Design Tokens, CSS Base e Som prontos)

## Diretrizes Críticas
1. **Física de Hardware:** Use `--ease-spring` em todas as transições. 
2. **Feedback Auditivo:** Toda interação física (botões, switches, modais) deve invocar o `UISoundManager.play()`.
3. **Snapshot Visual:** O Undo/Redo agora é via `ImageData`. Toda ação que altera o canvas deve disparar um snapshot.
4. **Escala mm:** Todo cálculo de domínio permanece em mm. A conversão px ocorre apenas no `CanvasRenderer`.

---

## Pipeline de Tasks

### Fase 1: Infraestrutura, Renderers & Feedback
| ID | Task | Status | Dependências |
|----|------|--------|--------------|
| **11** | [Refatoração do Store (History & snapshots)](./tasks/11_store_history.md) | [ ] | 01 |
| **12** | [Renderers Modulares & canvas-txt](./tasks/12_renderers_strategy.md) | [ ] | 03 |
| **13** | [OverflowValidator (checkOverflow)](./tasks/13_validator.md) | [ ] | 02 |

### Fase 2: UI Tactile Prism (Componentes com Som)
| ID | Task | Status | Dependências |
|----|------|--------|--------------|
| **14** | [AppButton & AppInput (Prism Style + Som)](./tasks/14_ui_core.md) | [ ] | — |
| **15** | [Sistema de Modais, Toasts e Confirmação](./tasks/15_ui_feedback.md) | [ ] | 14 |
| **16** | [EditorCanvas (Workspace & Artboard)](./tasks/16_canvas_ui.md) | [ ] | 12 |

### Fase 3: Features & Lote
| ID | Task | Status | Dependências |
|----|------|--------|--------------|
| **17** | [Inspector Numérico e Atributos](./tasks/17_inspector_refactor.md) | [ ] | 16 |
| **18** | [Batch Processor & String Interpolation](./tasks/18_batch_logic.md) | [ ] | 11, 12 |
| **19** | [Print System & Lote Preview](./tasks/19_print_batch.md) | [ ] | 18 |

---

## Notas de Orquestração
- **Sons Recomendados:** 
  - Cliques: `click_mechanical` ou `switch_on`.
  - Sucesso/Salvo: `action_complete`.
  - Erro/Overflow: `error_alert`.
  - Undo/Redo: `history_shuffling`.
