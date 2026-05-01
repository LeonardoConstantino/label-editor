# Task 46: Refatoração Profunda 

## Resumo da tarefa

## Objetivo
Decompor o `ElementInspector` em uma arquitetura de sub-componentes especialistas (Nível 1-2-3), resolvendo a violação do SRP, eliminando o acoplamento excessivo no `innerHTML` e adotando Data Binding via propriedades JS (Opção B).

## Workflow de Execução
1. **Contrato de Eventos:** Definir `inspector:change` e `inspector:action` como protocolo único.
2. **Smoke Tests:** Escrever testes de comportamento do Inspector atual antes de qualquer mudança.
3. **Sections (Nível 3):** Criar `inspector-section-transform`, `text`, `rect`, `image`, `border`.
4. **Containers (Nível 2):** Criar `inspector-layer-card` (agrega as sections) e `inspector-document-setup`.
5. **Orquestrador (Nível 1):** Reduzir o `ElementInspector` original para atuar apenas como ponte Store <-> Sub-componentes.
6. **Cleanup:** Deletar código morto e validar limite de 200 linhas no arquivo principal.

## Arquitetura de Componentes
- **Nível 1 (Orquestrador):** `ElementInspector` (Escuta estado, decide o contexto).
- **Nível 2 (Containers):** 
  - `<inspector-document-setup>`: Gerencia Blueprint e Config Global.
  - `<inspector-layer-card>`: Gerencia o estado visual e ações de cada camada.
- **Nível 3 (Sections):** 
  - `<inspector-section-transform>`: (X, Y, W, H, Rotação, Opacidade).
  - `<inspector-section-text>`: (Conteúdo, Fonte, Tamanho, Leading, etc).
  - `<inspector-section-rect>`: (Cores, Stroke, Border Radius).
  - `<inspector-section-image>`: (Fit Mode, Smoothing).
  - `<inspector-section-border>`: (Estilo, Espessura, Raio).

## Decisões de Design (Pilar Técnico)
- **Data Binding (Opção B):** Orquestrador seta propriedades diretamente nos filhos: `card.element = elObject`. Sub-componentes são reativos a essas mudanças.
- **Event Flow:** 
  - Sub-componentes → `CustomEvent('inspector:change', { detail: { prop, value } })`.
  - LayerCard → `CustomEvent('inspector:action', { detail: { action, id } })`.
  - Orquestrador captura e traduz para o `EventBus` de domínio.
- **Isolamento:** Sub-componentes **não** chamam `eventBus` nem `store` diretamente.

## Critérios de Aceite
- [x] O arquivo `ElementInspector.ts` principal tem menos de 200 linhas.
- [x] Cada sub-componente é testável e utilizável de forma isolada.
- [x] Zero regressão nos comportamentos: guard de re-seleção, filtro de ruído nativo e hash estrutural sem 'name'.
- [x] Zero uso de `as any` em todo o sub-módulo de inspeção.

## Mais detalhes no [plano](./46_inspector_refactor/MASTER_PLAN.md)