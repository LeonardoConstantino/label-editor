# Event System Registry (Label Forge OS)

Este documento atua como o **Single Source of Truth** para a comunicação desacoplada entre componentes e serviços.

## Event Map Strategy
Todos os eventos devem ser registrados na interface `EventMap` no arquivo `src/core/EventBus.ts` para garantir integridade via TypeScript. Eventos de Custom Elements (DOM) devem ser mapeados em uma interface global para facilitar o uso de `addEventListener`.

## 1. App-Level Events (EventBus)

| Evento | Categoria | Origem Principal | Destinatários | Payload | Descrição |
|--------|-----------|------------------|---------------|---------|-----------|
| `state:change` | Store | `Store.ts` | UI Components | `AppState` | Notifica mudança global de estado. |
| `notify` | UI | Vários | `main.ts` | `{ message, type, duration? }` | Exibe toast global (success, error, info). |
| `element:add` | Domain | Toolbar / Service | `Store.ts` | `AnyElement` | Adiciona um novo elemento ao design. |
| `element:update` | Domain | Inspector / Service| `Store.ts` | `{ id, updates, silent? }` | Atualiza propriedades de um elemento. `silent` pula snapshot. |
| `elements:update` | Domain | Inspector (Layout) | `Store.ts` | `{ id, updates }[]` | Atualização em lote (batch) de múltiplos elementos. |
| `element:delete` | Domain | Inspector / Service| `Store.ts` | `id: string` | Remove um elemento pelo ID. |
| `element:select` | UI | Canvas / Inspector | `Store.ts` | `id \| id[]` | Altera a seleção atual (suporta multi-seleção). |
| `element:reorder`| Domain | Inspector / Service| `Store.ts` | `{ id, direction }`| Altera o z-index (up/down). |
| `element:duplicate`| Domain| ShortcutService | `Store.ts` | `id: string` | Duplica o elemento selecionado. |
| `element:warning`| Domain | Store (Validator) | UI (Badges) | `{ id, result }` | Sinaliza erro de overflow ou limite. |
| `element:warning:clear`| Domain | Store (Validator) | `ElementInspector`| `{ id: string }` | Remove alerta de um elemento específico. |
| `history:undo` | Store | Toolbar / Kbd | `Store.ts` | `{ source? }` | Reverte para o estado anterior. |
| `history:redo` | Store | Toolbar / Kbd | `Store.ts` | `{ source? }` | Avança para o próximo estado. |
| `history:snapshot`| Store | Store / Canvas | `Store.ts` | `{ description? }` | Força a criação de um snapshot de histórico. |
| `label:config:update`| Domain| Inspector | `Store.ts` | `CanvasConfig` | Altera dimensões ou DPI da etiqueta. |
| `preferences:update`| Core | Inspector / Modal | `Store.ts` | `Partial<UserPreferences>` | Atualiza preferências do usuário. |
| `template:save` | Storage | Shortcut / UI | `TemplateManager`| `{ source? }` | Dispara o salvamento no IndexedDB. |
| `template:saved` | Storage | `TemplateManager`| `VaultGallery.ts`| `Label` | Notifica que uma etiqueta foi salva. |
| `ui:modal:open` | UI | Modals | ShortcutService | `{ id }` | Bloqueia atalhos ao abrir modal. |
| `ui:modal:close`| UI | Modals | ShortcutService | `{ id }` | Libera atalhos ao fechar modal. |
| `ui:open:help` | UI | Toolbar / Welcome | `main.ts` | `{ tab?, source? }` | Abre a central de ajuda. |
| `command:toolbar:upload-image` | UI | ShortcutService | `Toolbar.ts` | - | Dispara o clique no input de arquivo oculto. |
| `request:canvas:snapshot` | Core | Store | `EditorCanvas` | `(ctx) => void` | Solicita ImageData do canvas para histórico. |
| `command:canvas:restore` | Core | Store | `EditorCanvas` | `ImageData` | Restaura pixels do canvas (Undo/Redo). |
| `perf:render` | Core | CanvasRenderer | `StatusBar.ts` | `{ duration: number }` | Reporta tempo de renderização para telemetria. |
| `preferences:change` | Core | `PreferenceManager` | `main.ts` | `UserPreferences` | Notifica mudança de preferências (persistência). |

## 2. DOM-Level Events (Custom Elements)

| Evento | Origem | Destinatário | Payload (detail) | Descrição |
|--------|-----------|--------------|------------------|-----------|
| `app-input` | `AppInput` | Parents | `string \| { value: string }` | Disparado a cada tecla no input. |
| `app-select` | `AppSelect` | Parents | `string` (value) | Seleção de item no dropdown. |
| `change` | `AppSelect` / `Scrubber` | Parents | `{ value: T }` | Sincronia padrão com o Inspector. |
| `input` | `UINumberScrubber` | Parents | `{ value: number, property? }` | Mudança contínua (drag). |
| `ui-select:open` | `AppSelect` | Parents | - | Usado para elevar o z-index do card. |
| `ui-select:close`| `AppSelect` | Parents | - | Usado para restaurar o z-index do card. |
| `layout-action` | `UiAlignCluster`| `ElementInspector` | `{ action, toCanvas }` | Comando de alinhamento/distribuição. |
| `sound-request` | Components | `main.ts` | `{ preset } \| SoundPreset` | Solicita reprodução de feedback sonoro. |
| `inspector:change`| Sections (N3) | Orchestrator (N1) | `InspectorChangeDetail` | Mudança de propriedade vinda do Cockpit. |
| `inspector:action`| Sections (N3) | Orchestrator (N1) | `InspectorActionDetail` | Ação (del, up, select) vinda do Cockpit. |

## Interfaces de Payload (Audit Task 71)

```typescript
export interface InspectorChangeDetail {
  prop: string;
  value: unknown;
}

export interface InspectorActionDetail {
  action: string;
  id?: string;
}

export interface EventPerfRender {
  duration: number;
}
```

## Eventos Órfãos ou Obsoletos

- `preferences:change`: Emitido no `PreferenceManager`, substituído por `state:change`.
- `app:ready`: Presente na proposta original, não utilizado na implementação final (o boot é síncrono no `main.ts`).

---
*Última Atualização: 07/05/2026 (Audit Turn 3 - Task 71 Implementation)*
