# Task 71: Mapeamento e Tipagem de Eventos (EventMap)

## Objetivo
Transformar o sistema de eventos em um orquestrador tipado e auditado. Implementar um `EventMap` central no `EventBus`, identificar e remover eventos órfãos e documentar todo o ecossistema de comunicação do app.

## Workflow
1. `git checkout -b task/71-event-mapping`
2. **Auditoria de Eventos:** Varredura em todo o código para listar eventos (`emit` e `on`).
3. **Custom Elements Standards:** Padronizar o payload `detail` de eventos de Web Components (ex: `app-input`, `ui-number-scrubber`). Todos devem retornar um objeto `{ value: T }` para evitar colisões com `InputEvent.detail` nativo.
4. **Event Registry:** Criar `docs/Event_System_Registry.md`.
5. **Strict Typing:** Implementar `EventMap` no `src/core/EventBus.ts`.
6. **Limpeza:** Remover disparos de eventos que não possuem ouvintes ou vice-versa.

## Critérios de Aceite
- [ ] Interface `EventMap` definida e utilizada no `EventBus`.
- [ ] O `EventBus` impede o disparo ou escuta de strings não mapeadas (Type safety).
- [ ] Eventos de Custom Elements padronizados com payload `{ value: T }` e tipagem global `interface CustomEventMap`.
- [ ] Documentação completa em `docs/Event_System_Registry.md`.
- [ ] Zero eventos órfãos no sistema principal.
