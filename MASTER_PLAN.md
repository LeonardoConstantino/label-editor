# Master Plan: Label Editor v3.5 (Consolidação Total)

Este arquivo coordena a execução de tarefas para a excelência técnica, visual e de segurança do Label Editor.

## Status do Projeto
- **Fases 1 a 3:** Concluídas (MVP+) ✅
- **Fases 4 a 9:** Em progresso (Polimento & Padronização) 🛠️
- **Stack:** TS, Vite, Tailwind v4.2, UISoundManager, PapaParse, jsPDF, Git Branching.
- **Progresso Geral:** 80%

## Diretrizes para Agentes (Workflow de Elite)
1. **Branching:** **OBRIGATÓRIO** criar branch para cada task: `git checkout -b task/NN-descricao`.
2. **Isolamento:** Inserções cirúrgicas. Não reescreva o que já funciona sem motivo técnico.
3. **Padrões:** Siga estritamente o `Design_System.md`, `Layout_UX_Guide.md` e o `definition_elements.md`.

---

## Pipeline de Tasks

### Fase 4: Refinamento de Design & UX (Cockpit)
| ID | Task | Status | Dependências | Branch |
|----|------|--------|--------------|--------|
| **20** | [Auditoria de Componentes Core](./tasks/20_ui_audit.md) | [x] | — | `task/20-ui-audit` |
| **21** | [Refinamento de Profundidade](./tasks/21_cockpit_depth.md) | [x] | — | `task/21-cockpit-refinement` |
| **22** | [Sincronização de Temas & Variáveis](./tasks/22_theme_sync.md) | [x] | — | `task/22-theme-sync` |
| **23** | [Acessibilidade & Atalhos de Teclado](./tasks/23_shortcuts_acc.md) | [x] | — | `task/23-shortcuts` |
| **27** | [Personalização e Limites do Canvas](./tasks/27_canvas_limits.md) | [x] | — | `task/27-canvas-limits` |

### Fase 5: Estabilidade & Performance
| ID | Task | Status | Dependências | Branch |
|----|------|--------|--------------|--------|
| **24** | [Otimização de Lote (Web Workers)](./tasks/24_batch_perf.md) | [ ] | 19 | `task/24-batch-workers` |
| **25** | [Persistência de Preferências](./tasks/25_user_prefs.md) | [x] | 07 | `task/25-user-prefs` |
| **26** | [Layout de Impressão A4 (Multi)](./tasks/26_a4_printing.md) | [x] | 19 | `task/26-a4-printing` |

### Fase 6: Alinhamento Arquitetural (Base)
| ID | Task | Status | Dependências | Branch |
|----|------|--------|--------------|--------|
| **28** | [Utilitário de Unidades Centralizado](./tasks/28_unit_converter.md) | [x] | — | `task/28-unit-converter` |
| **29** | [Fábrica de Elementos & Constantes](./tasks/29_element_factory.md) | [x] | — | `task/29-element-factory` |
| **30** | [Validador de Propriedades Técnico](./tasks/30_property_validator.md) | [x] | 29 | `task/30-property-validator` |
| **31** | [Upgrade no Parser de CSV (PapaParse)](./tasks/31_papaparse_upgrade.md) | [x] | 18 | `task/31-papaparse-upgrade` |
| **33** | [Importação/Exportação de JSON](./tasks/33_json_import_export.md) | [ ] | 07 | `task/33-json-import-export` |
| **34** | [Formatadores na Interpolação](./tasks/34_interpolation_formatters.md) | [x] | 18 | `task/34-formatters` |
| **40** | [Prevenção de XSS & Sanitização](./tasks/40_security_xss.md) | [ ] | — | `task/40-security-xss` |

### Fase 7: Gestão de Projetos & Persistência
| ID | Task | Status | Dependências | Branch |
|----|------|--------|--------------|--------|
| **35** | [Galeria de Templates & Digital Twin](./tasks/35_template_gallery.md) | [x] | 07 | `task/35-template-gallery` |
| **36** | [Retomada Automática & Tela Inicial](./tasks/36_work_resumption.md) | [/] | 35 | `task/36-boot-welcome` |

### Fase 8: Atributos de Estilo (Opcionais/Futuro)
| ID | Task | Status | Dependências | Branch |
|----|------|--------|--------------|--------|
| **38** | [Tipografia Avançada (Leading/Tracking)](./tasks/38_adv_typography.md) | [ ] | — | `task/38-typography` |
| **39** | [Efeitos Prism (Sombras/Glow)](./tasks/39_prism_effects.md) | [ ] | — | `task/39-prism-effects` |

### Fase 9: Padronização Estrita (Inventário v1.1)
| ID | Task | Status | Dependências | Branch |
|----|------|--------|--------------|--------|
| **41** | [Modelos Unificados (Sync Inventory)](./tasks/41_unified_models.md) | [ ] | 02 | `task/41-models-sync` |
| **42** | [BorderElement (Standalone Moldura)](./tasks/42_border_element.md) | [ ] | 41 | `task/42-border-element` |
| **43** | [Renderers Avançados (Shapes & Blending)](./tasks/43_adv_renderers.md) | [ ] | 12 | `task/43-adv-renderers` |
| **44** | [TextElement Pro (Overflow & Vertical)](./tasks/44_text_pro.md) | [ ] | 12 | `task/44-text-pro` |
| **45** | [Tooltips da Toolbar (Power User)](./tasks/45_toolbar_tooltips.md) | [x] | 20 | `task/45-toolbar-tooltips` |
| **46** | [Refatoração Profunda ElementInspector](./tasks/46_inspector_refactor.md) | [ ] | 29 | `task/46-inspector-deep-refactor` |
| **47** | [Upload UX Refinado (CSV/JSON)](./tasks/47_upload_ux.md) | [x] | 31 | `task/26-a4-batch-ux` |

---

## Notas de Orquestração
- **Redundância:** A Task 37 foi fundida com a 41. A Task 32 foi fundida com a 42.
- **Prioridade:** Recomenda-se focar na **Fase 6 (Arquitetura)** para solidificar a base antes de expandir estilos.
