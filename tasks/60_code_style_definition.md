# Task 60: Definição de Code Style e Atualização das Diretrizes

## Objetivo
Formalizar as diretrizes de codificação no arquivo `GEMINI.md` para garantir que as novas implementações sigam padrões modernos de TypeScript e Web Components, focando em manutenibilidade e clareza.

## Workflow
1. `git checkout -b task/60-code-style`
2. Modificar o arquivo `GEMINI.md`.

## Detalhamento da Execução
1. **Redação das Diretrizes:** Incluir seção de Code Style abrangendo:
   - **TypeScript:** Proibição de `any`, uso de modificadores de acesso, tipagem de retorno.
      - #### Regras Obrigatórias
         - ❌ **Proibido:** `any` em qualquer contexto
         - ✅ **Permitido:** `unknown` + type guards quando tipo for realmente desconhecido
         - ✅ **Obrigatório:** Modificadores de acesso explícitos (`private`, `protected`, `public`)
         - ✅ **Obrigatório:** Tipagem de retorno em funções/métodos públicos
   - **Web Components:** Encapsulamento, nomenclatura de tags (`ui-`, `app-`), uso de `adoptedStyleSheets`.
      - #### Regras de Implementação
         - ✅ **Shadow DOM obrigatório** para isolamento de estilos
         - ✅ **`adoptedStyleSheets`** para CSS (evitar `<style>` inline)
         - ✅ **Propriedades privadas** com prefixo `_`
         - ✅ **Métodos lifecycle** não devem conter lógica de negócio
   - **Arquitetura:** Comunicação via EventBus, isolamento de lógica de domínio.
      - #### Princípios
         1. **EventBus Centralizado:** Comunicação desacoplada entre componentes
         2. **Lógica de Domínio Isolada:** Services/UseCases separados da camada de UI
         3. **Componentes como View Layer:** Apenas renderização e binding de dados
         4. **Zero Lógica de Negócio em Lifecycles:** `connectedCallback` só inicializa UI
   - **Performance:** Evitar `innerHTML` para atualizações frequentes.
      - #### Regras de Otimização
         - ❌ **Evitar:** `innerHTML` em loops ou atualizações frequentes
         - ✅ **Preferir:** `createElement` + `appendChild` para manipulação granular
         - ✅ **Usar:** `DocumentFragment` para inserções em lote
         - ✅ **Aplicar:** Debounce/throttle em eventos de alta frequência (scroll, resize, input)

## Filosofia
> "O código deve ser óbvio antes de ser elegante."

### Prioridades (em ordem)
1. ✅ **Funciona corretamente** (atende aos requisitos)
2. ✅ **É legível** (outro dev entende em < 2min)
3. ✅ **Respeita encapsulamento** (baixo acoplamento)
4. ⚠️ **Otimização prematura** (só quando necessária)

### Diretrizes de Qualidade
- **Refatoração Incremental:** Melhorias graduais > rewrites completos
- **Documentação Inline:** Apenas quando a lógica não for autoexplicativa
- **Testes Pragmáticos:** Integração > cobertura de 100%
- **Code Review:** Foco em clareza e manutenibilidade, não perfeição


## Critérios de Aceite
- [x] Seção "Code Style" integrada ao `GEMINI.md` com os 5 blocos:
  - [x] TypeScript: Tipagem Estrita
  - [x] Web Components: Encapsulamento
  - [x] Arquitetura: Comunicação e Separação
  - [x] Performance: Renderização Eficiente
  - [x] Pragmatic Excellence: Filosofia e Qualidade
- [x] As regras refletem o consenso de "Pragmatic Excellence" (mínimo de boas práticas para máximo de resultado).
- [x] O Master Plan reflete a conclusão desta tarefa.
