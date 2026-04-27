# Event System Registry (Label Forge OS)

Este documento atua como o **Single Source of Truth** para a comunicação desacoplada entre componentes e serviços.

## Event Map Strategy
Todos os eventos devem ser registrados na interface `EventMap` no arquivo `src/core/EventBus.ts` para garantir integridade via TypeScript.

## Tabela de Eventos (Mapped)

| Evento | Categoria | Origem Principal | Destinatários | Payload | Descrição |
|--------|-----------|------------------|---------------|---------|-----------|
| `state:change` | Store | `Store.ts` | UI Components | `AppState` | Notifica mudança global de estado. |
| `notify` | UI | Vários | `main.ts` | `{ message, type }` | Exibe toast global (success, error, info). |
| `element:add` | Domain | Toolbar / Service | `Store.ts` | `AnyElement` | Adiciona um novo elemento ao design. |
| `element:update` | Domain | Inspector / Service| `Store.ts` | `{ id, updates }` | Atualiza propriedades de um elemento. |
| `element:delete` | Domain | Inspector / Service| `Store.ts` | `id: string` | Remove um elemento pelo ID. |
| `element:select` | UI | Canvas / Inspector | `Store.ts` | `id \| id[]` | Altera a seleção atual. |
| `element:reorder`| Domain | Inspector / Service| `Store.ts` | `{ id, direction }`| Altera o z-index (up/down). |
| `element:duplicate`| Domain| ShortcutService | `Store.ts` | `id: string` | Duplica o elemento selecionado. |
| `element:warning`| Domain | Store (Validator) | UI (Badges) | `{ id, result }` | Sinaliza erro de overflow ou limite. |
| `history:undo` | Store | Toolbar / Kbd | `Store.ts` | `{ source? }` | Reverte para o estado anterior. |
| `history:redo` | Store | Toolbar / Kbd | `Store.ts` | `{ source? }` | Avança para o próximo estado. |
| `history:snapshot`| Store | Store | `Store.ts` | - | Força a criação de um snapshot de histórico. |
| `label:config:update`| Domain| Inspector | `Store.ts` | `CanvasConfig` | Altera dimensões ou DPI da etiqueta. |
| `preferences:update`| Core | Inspector / Main | `Store.ts` | `Partial<Prefs>` | Atualiza preferências do usuário. |
| `template:save` | Storage | Shortcut / UI | `TemplateManager`| `{ source? }` | Dispara o salvamento no IndexedDB. |
| `ui:modal:open` | UI | Modals | ShortcutService | `{ id }` | Bloqueia atalhos ao abrir modal. |
| `ui:modal:close`| UI | Modals | ShortcutService | `{ id }` | Libera atalhos ao fechar modal. |
| `ui:open:help` | UI | Toolbar / Welcome | `main.ts` | `{ tab?, source? }` | Abre a central de ajuda. |
| `command:toolbar:upload-image` | UI | ShortcutService | `Toolbar.ts` | - | Dispara o clique no input de arquivo oculto. |
| `request:canvas:snapshot` | Core | Store | `EditorCanvas` | `(callback)` | Solicita ImageData do canvas para histórico. |
| `command:canvas:restore` | Core | Store | `EditorCanvas` | `ImageData` | Restaura pixels do canvas (Undo/Redo). |
| `template:saved` | Storage | `TemplateManager`| `VaultGallery.ts`| `Label` | Notifica que uma etiqueta foi salva (para atualizar a galeria). |
| `element:warning:clear`| Domain | Store (Validator) | `ElementInspector`| `{ id: string }` | Remove alerta de um elemento específico. |

## Interfaces de Payload (Audit Task 71)

```typescript
export interface EventWarning {
  id: string;
  result: OverflowResult; 
}

export interface EventWarningClear {
  id: string;
}
```

## Eventos Realmente Órfãos (Confirmados)

- `preferences:change`: Emitido no `PreferenceManager`, mas sem ouvintes ativos (o app usa `state:change`).

---
*Última Atualização: 26/04/2026 (Audit Turn 2 - Corrections Applied)*
