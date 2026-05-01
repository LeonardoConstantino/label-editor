# Master Plan: Refatoração ElementInspector (v1.0)

Este arquivo coordena a execução sequencial de tarefas para decompor o `ElementInspector` em sub‑componentes especialistas.

## Status do Projeto
- **Fase Atual:** Fase 1 – Preparação (Tasks 01 e 02)
- **Stack:** TypeScript, Web Components (Custom Elements v1), EventBus, Shared Styles
- **Progresso Geral:** 0%

## Diretrizes para Agentes
1. **Leia a Task:** Abra o arquivo correspondente na pasta `tasks/`.
2. **Siga o Code Style do projeto** (extraído do arquivo original):
   - Use `customElements.define` para todos os componentes.
   - Shadow DOM (`mode: 'open'`) com `this.shadowRoot!.adoptedStyleSheets = [sharedSheet]`.
   - Comunicação interna do componente: dispache `CustomEvent` com `bubbles: true, composed: true` e atributo `detail`.
   - Propriedades recebidas via atributos ou propriedades JS; evite `innerHTML` nos filhos – preferir criação programática ou `insertAdjacentHTML` apenas para esqueleto estático.
   - Nomes de eventos padronizados: `inspector:change` e `inspector:action`.
   - Nenhuma dependência direta em `store` ou `eventBus` nos componentes Nível 2/3.
   - Use os tipos exportados do domínio (`AnyElement`, etc.).
   - `data-prop` nos inputs para mapeamento de propriedades.
3. **Não altere outros módulos** além dos listados em "Arquivos de Entrada" da task.
4. **Testes:** Nenhuma task é concluída sem critérios de aceite verificados.
5. **Reporte:** Ao finalizar, atualize o status abaixo para [X].

---

## Lista de Tarefas (Pipeline Sequencial)

| ID | Task | Status | Dependências |
|----|------|--------|--------------|
| **01** | Contrato de Eventos e Interfaces | [X] | — |
| **02** | Smoke Tests do Inspector Original | [X] | — |
| **03** | Seções Especialistas (Nível 3) | [X] | 01 |
| **04** | Containers (Nível 2) | [X] | 03 |
| **05** | Orquestrador Refatorado (Nível 1) | [X] | 02, 04 |
| **06** | Cleanup e Validação Final | [X] | 05 |

---
## Notas de Orquestração
- A ordem é estritamente sequencial; iniciar a próxima task apenas após a conclusão da anterior.
- Em cada task, a aderência ao **Code Style** é obrigatória: verifique o uso de `sharedSheet`, ausência de `as any`, e estrutura clara.
- Todos os sub‑componentes devem ser **testáveis isoladamente** (Task 03 e 04 incluem mini‑testes manuais de renderização).