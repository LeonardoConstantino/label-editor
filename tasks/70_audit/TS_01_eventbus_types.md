# Task TS-01: Tipagem Estrita do EventBus

## Objetivo
Eliminar o uso de `any` no sistema de eventos central. Atualmente, o `EventBus` permite disparar e ouvir eventos sem validação do payload, o que mascara bugs de integração.

## Arquivos de Entrada
- `src/core/EventBus.ts`
- `src/core/Store.ts`
- `src/domain/services/TemplateManager.ts`

## Detalhamento da Execução

1. **Refatoração do EventMap:**
   - Revisar a interface `EventMap` em `EventBus.ts`.
   - Garantir que todos os payloads estejam tipados com interfaces específicas (ex: `LabelUpdatePayload`, `ModuleSwitchPayload`).

2. **Aplicação de Generics:**
   - Modificar os métodos `on`, `emit` e `off` para usarem Generics que referenciam as chaves do `EventMap`.
   - Exemplo: `emit<K extends keyof EventMap>(event: K, detail: EventMap[K]): void`.

3. **Remoção de 'any' Interno:**
   - Ajustar o `Map` interno que armazena os listeners para não usar `Set<EventCallback<any>>`.

4. **Validação:**
   - Rodar `tsc` e corrigir todos os erros de tipagem que surgirem nos componentes que consomem o EventBus.

## Critérios de Aceite
- [x] `npm run build` passa sem erros de tipagem no EventBus.
- [x] Zero ocorrências de `any` em `src/core/EventBus.ts`.
- [x] O sistema de eventos continua funcional (testado via manual hover/clique nos módulos).
