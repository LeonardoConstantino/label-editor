# Master Plan: Label Editor v4.0 (Consolidação & Performance)

Este Master Plan coordena a fase final de desenvolvimento, focando em estabilidade, performance de renderização e ferramentas de produtividade para o usuário final.

## Status do Projeto
- **Progresso Geral:** 85% ✅
- **Fase Atual:** Refinamento Tático e Otimização de Core.
- **Stack:** TS, Vite, Tailwind v4.2, Shadow DOM, Event-Driven Architecture.

## Workflow de Execução (Obrigatório)
1. **Branching:** Criar branch específica: `git checkout -b task/NN-descricao`.
2. **Analysis:** Realizar a "Análise Profunda" descrita na task para evitar regressões.
3. **Execution:** Seguir os padrões do `GEMINI.md` (Code Style).
4. **Validation:** Build de produção e testes unitários.

---

## 🚀 Pipeline de Tasks (Organizado por Impacto)

### Fase A: Core, Performance & Segurança (O alicerce final)
| ID | Task | Pri | Status | Deps | Branch |
|----|------|-----|--------|------|--------|
| **53** | [Otimização de Performance CSS (AdoptedSheets)](./tasks/53_css_perf_optimization.md) | 10 | [x] | 22 | `task/53-css-perf` |
| **61** | [Otimização de Updates de DOM (Incremental)](./tasks/61_dom_update_optimization.md) | 10 | [x] | 46 | `task/61-dom-update` |
| **40** | [Prevenção de XSS & Sanitização](./tasks/40_security_xss.md) | 10 | [x] | — | `task/40-security-xss` |
| **51** | [Correção de Atalhos em Inputs (Focus Protection)](./tasks/51_keyboard_fix.md) | 09 | [x] | 23 | `task/51-keyboard-fix` |
| **54** | [Zoom Visual e Respiro do Canvas (Gutter)](./tasks/54_canvas_zoom_fix.md) | 09 | [x] | 21 | `task/54-canvas-zoom` |
| **60** | [Definição de Code Style (GEMINI.md)](./tasks/60_code_style_definition.md) | 08 | [x] | — | `task/60-code-style` |
| **70** | [Grande Auditoria de Integridade](./tasks/70_codebase_audit.md) | 09 | [ ] | 60 | `task/70-codebase-audit` |
| **71** | [Mapeamento e Tipagem de Eventos (EventMap)](./tasks/71_event_orchestration.md) | 10 | [ ] | — | `task/71-event-mapping` |

### Fase B: Gestão de Projetos & UX (Retenção do Usuário)
| ID | Task | Pri | Status | Deps | Branch |
|----|------|-----|--------|------|--------|
| **36** | [Retomada Automática & Tela Inicial](./tasks/36_work_resumption.md) | 08 | [/] | 35 | `task/36-boot-welcome` |
| **33** | [Importação/Exportação de JSON (.label)](./tasks/33_json_import_export.md) | 07 | [x] | 07 | `task/33-json-io` |
| **46** | [Refatoração Profunda ElementInspector](./tasks/46_inspector_refactor.md) | 07 | [x] | 29 | `task/46-inspector-refactor` |
| **41** | [Modelos Unificados (Sync Inventory)](./tasks/41_unified_models.md) | 07 | [x] | 02 | `task/41-models-sync` |
| **64** | [Controle Global de Áudio](./tasks/64_ui_sound_toggle.md) | 05 | [x] | — | `task/64-ui-sound-toggle` |
| **65** | [Aba About & Compliance](./tasks/65_help_about_legal.md) | 04 | [x] | — | `task/65-help-about-legal` |
| **68** | [Contador de Elementos no Vault](./tasks/68_vault_element_count.md) | 04 | [x] | — | `task/68-vault-element-count` |
| **56** | [Ajuste de Espaçamento Inspector Header](./tasks/56_inspector_spacing_fix.md) | 04 | [x] | — | `task/56-inspector-ui` |

### Fase C: Produtividade & Ferramentas de Design (O diferencial)
| ID | Task | Pri | Status | Deps | Branch |
|----|------|--------|------|--------|--------|
| **55** | [Bloqueio de Proporção (Aspect Ratio Link)](./tasks/55_aspect_ratio_lock.md) | 06 | [x] | 41 | `task/55-ratio-lock` |
| **67** | [Impressão Dinâmica (Orientation/Format)](./tasks/67_dynamic_printing_layout.md) | 06 | [ ] | 10 | `task/67-dynamic-pdf` |
| **69** | [Componente UI Select & Presets](./tasks/69_ui_select_presets.md) | 06 | [x] | — | `task/69-ui-select-presets` |
| **62** | [Ferramentas de Alinhamento e Distribuição](./tasks/62_power_layout.md) | 06 | [x] | 41 | `task/62-power-layout` |
| **63** | [Smart Snapping & Guias Magnéticas](./tasks/63_smart_snapping.md) | 06 | [ ] | 04 | `task/63-smart-snapping` |
| **26** | [Sangria e Marcas de Corte (PDF)](./tasks/26_a4_printing.md) | 06 | [x] | 10 | `task/26-a4-printing` |
| **73** | [Adoção Universal do AppSelect](./tasks/73_universal_select_adoption.md) | 06 | [ ] | 69 | `task/73-select-adoption` |
| **52** | [Action Icon de Lock nos Cards de Camada](./tasks/52_ui_layer_lock.md) | 05 | [x] | 41 | `task/52-ui-layer-lock` |
| **58** | [Elemento de Código (QR Code / Barcode)](./tasks/58_element_code.md) | 05 | [ ] | 41 | `task/58-element-code` |
| **42** | [BorderElement (Standalone Moldura)](./tasks/42_border_element.md) | 05 | [x] | 41 | `task/42-border-element` |
| **43** | [Renderers Avançados (Shapes & Blending)](./tasks/43_adv_renderers.md) | 05 | [x] | 12 | `task/43-adv-renderers` |
| **50** | [Metadados e Cálculos no Interpolador](./tasks/50_interpolator_metadata_math.md) | 05 | [ ] | 34 | `task/50-interpolator-meta` |

### Fase D: Refinamentos Avançados & Estética
| ID | Task | Pri | Status | Deps | Branch |
|----|------|--------|------|--------|--------|
| **44** | [TextElement Pro (Overflow & Vertical)](./tasks/44_text_pro.md) | 04 | [x] | 12 | `task/44-text-pro` |
| **59** | [Otimização de Histórico (Snapshot Debounce)](./tasks/59_history_debounce.md) | 04 | [ ] | 11 | `task/59-history-debounce` |
| **49** | [Unificação de Estilo KBD (3D Prism)](./tasks/49_kbd_style_unification.md) | 03 | [x] | 22 | `task/49-kbd-style` |
| **72** | [Padronização de Tooltips de Ajuda](./tasks/72_help_tooltips_standardization.md) | 03 | [/] | 46 | `task/72-help-tooltips` |
| **38** | [Tipografia Avançada (Leading/Tracking)](./tasks/38_adv_typography.md) | 02 | [ ] | — | `task/38-typography` |
| **39** | [Efeitos Prism (Sombras/Glow)](./tasks/39_prism_effects.md) | 02 | [ ] | — | `task/39-prism-effects` |

---

## ✅ Histórico de Conquistas (MVP & Core)
*(Tasks concluídas movidas para o histórico para manter o foco no futuro)*

- **01-15:** Estrutura base, Store, Canvas, Renderers, Persistence, UI Core, Toasts. ✅
- **20-23:** Auditoria UI, Profundidade Cockpit, Atalhos Base. ✅
- **25-27:** Preferências, Impressão A4, Limites de Canvas. ✅
- **28-31:** Unit Converter, Factory, Property Validator, PapaParse. ✅
- **34-35:** Interpolator, Template Gallery (Vault). ✅
- **45, 47:** Tooltips, Upload UX. ✅
