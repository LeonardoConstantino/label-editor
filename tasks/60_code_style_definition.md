# Task 60: Definição de Code Style e Atualização das Diretrizes

## Objetivo
Formalizar as diretrizes de codificação no arquivo `GEMINI.md` para garantir que as novas implementações sigam padrões modernos de TypeScript e Web Components, focando em manutenibilidade e clareza.

## Workflow
1. `git checkout -b task/60-code-style`
2. Modificar o arquivo `GEMINI.md`.

## Detalhamento da Execução
1. **Redação das Diretrizes:** Incluir seção de Code Style abrangendo:
   - **TypeScript:** Proibição de `any`, uso de modificadores de acesso, tipagem de retorno.
   - **Web Components:** Encapsulamento, nomenclatura de tags (`ui-`, `app-`), uso de `adoptedStyleSheets`.
   - **Arquitetura:** Comunicação via EventBus, isolamento de lógica de domínio.
   - **Performance:** Evitar `innerHTML` para atualizações frequentes.

## Critérios de Aceite
- [ ] Seção "Code Style" integrada ao `GEMINI.md`.
- [ ] As regras refletem o consenso de "Pragmatic Excellence" (mínimo de boas práticas para máximo de resultado).
- [ ] O Master Plan reflete a conclusão desta tarefa.
