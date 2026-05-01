# Task 01: Contrato de Eventos e Interfaces

## Objetivo
Definir e exportar o protocolo de comunicação entre os futuros sub‑componentes e o orquestrador, bem como as interfaces TypeScript que garantirão tipagem segura no lugar de `any`. Este contrato servirá de base para todas as tarefas subsequentes.

## Arquivos de Entrada
- `src/ui/inspector/ElementInspector.ts` (original, para entender payloads atuais)
- Novo: `src/ui/inspector/inspector-events.ts`
- Novo: `src/ui/inspector/inspector.types.ts` (se necessário, ou usar definições diretas no arquivo de eventos)

## Detalhamento da Execução

1. **Criar `inspector-events.ts`** com:
   - Constantes para os nomes dos eventos: `INSPECTOR_CHANGE = 'inspector:change'` e `INSPECTOR_ACTION = 'inspector:action'`.
   - Interfaces de payload:
     - `InspectorChangeDetail`: `{ prop: string; value: any }` – o `prop` deve seguir o padrão ponto‑separado (ex: `'position.x'`).
     - `InspectorActionDetail`: `{ action: string; id?: string }` – ações como `'delete'`, `'reorder'`, `'toggle-vis'`, etc.
   - Função helper `dispatchInspectorChange(el: HTMLElement, detail: InspectorChangeDetail)` que dispara o evento com `bubbles` e `composed`.
   - Função helper `dispatchInspectorAction(el: HTMLElement, detail: InspectorActionDetail)`.
   - (Opcional) Tipo genérico para o elemento alvo, sem `any`.

2. **Revisar e documentar** o fluxo esperado:
   - Nível 3 (seções) emite apenas `inspector:change`.
   - Nível 2 (containers) emite `inspector:action` (para ações de card) e repassa `inspector:change` de suas seções.
   - Nível 1 (orquestrador) escuta os dois eventos e traduz para `EventBus`/`store`.

3. **Validar** que as interfaces cobrem todos os casos atuais do `ElementInspector`:
   - Mudanças de propriedades de elemento (valores numéricos, texto, cor, checkbox).
   - Ações: `select`, `toggle-vis`, `up`, `del`, e a ação global `open-vault`.
   - Atualizações de documento (config de label) – delegaremos ao orquestrador via `inspector:change` com prop `doc.xxx`.

## Critérios de Aceite
- [ ] Arquivo `inspector-events.ts` exporta as constantes e tipos.
- [ ] Todas as propriedades e ações atualmente suportadas no Inspector original possuem correspondência no contrato.
- [ ] Nenhum uso de `any` nos detalhes (exceção se necessário, mas a Task 01 deve eliminar totalmente `any`).
- [ ] O contrato pode ser importado por qualquer componente futuro sem dependências circulares.