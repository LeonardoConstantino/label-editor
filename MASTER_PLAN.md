# Master Plan: Label Editor (v1.0.0)

Este arquivo coordena a execução de tarefas para a implementação do Editor de Etiquetas e Gerador em Lote.

## Status do Projeto
- **Fase Atual:** Infraestrutura & Core
- **Stack:** TypeScript, Vite, Tailwind CSS v4.2, Web Components, Vitest, IndexedDB.
- **Progresso Geral:** 5% (Estrutura básica inicial e EventBus prontos)

## Diretrizes para Agentes
1. **Design System:** Siga rigorosamente o `Design_System.md`. Use as variáveis do `@theme` no Tailwind v4 e aplique a física de mola (`--ease-spring`) em interações.
2. **Encapsulamento:** Use Web Components com Shadow DOM para todos os elementos de UI.
3. **Comunicação:** Utilize o `EventBus` (`src/core/EventBus.ts`) para desacoplar componentes.
4. **Testes:** Toda task DEVE incluir testes unitários/integração usando Vitest e `jsdom`. Nenhuma task é considerada concluída sem 100% de passagem nos critérios de aceite.
5. **Estado:** O `Store` é a única fonte de verdade para o estado da etiqueta.

---

## Lista de Tarefas (Pipeline)

### Fase 1: Fundação & Domínio
| ID | Task | Status | Dependências |
|----|------|--------|--------------|
| **01** | [Implementação do Store Centralizado](./tasks/01_store.md) | [ ] | — |
| **02** | [Modelos de Domínio e Tipagens](./tasks/02_models.md) | [ ] | — |
| **03** | [Serviço de Renderização de Canvas](./tasks/03_renderer.md) | [ ] | 02 |

### Fase 2: Interface do Editor
| ID | Task | Status | Dependências |
|----|------|--------|--------------|
| **04** | [Layout Principal e EditorCanvas](./tasks/04_layout_canvas.md) | [ ] | 01, 03 |
| **05** | [Toolbar e Adição de Elementos](./tasks/05_toolbar.md) | [ ] | 04 |
| **06** | [Inspector de Propriedades](./tasks/06_inspector.md) | [ ] | 04 |

### Fase 3: Persistência & Ativos
| ID | Task | Status | Dependências |
|----|------|--------|--------------|
| **07** | [Gerenciamento de Templates (IndexedDB)](./tasks/07_persistence.md) | [ ] | 01 |
| **08** | [Processamento e Otimização de Imagens](./tasks/08_images.md) | [ ] | 06 |

### Fase 4: Geração em Lote & Exportação
| ID | Task | Status | Dependências |
|----|------|--------|--------------|
| **09** | [Parser de Dados (CSV/JSON) e Preview](./tasks/09_data_batch.md) | [ ] | 01, 02 |
| **10** | [Geração de PDF e Exportação Final](./tasks/10_pdf_export.md) | [ ] | 03, 09 |

---

## Notas de Orquestração
- **Unidades:** Use `mm` para lógica de domínio e converta para `px` apenas na renderização final baseada no DPI (padrão 300).
- **Estilo:** Prefira Vanilla CSS dentro do Shadow DOM utilizando as utilities do Tailwind v4 via `@apply` ou variáveis CSS injetadas.
