# Event System Registry (Label Forge OS)

Este documento atua como o **Single Source of Truth** para a comunicação desacoplada entre componentes e serviços.

## Event Map Strategy
Todos os eventos devem ser registrados na interface `EventMap` no arquivo `src/core/EventBus.ts` para garantir integridade via TypeScript. Eventos de Custom Elements (DOM) devem ser mapeados em uma interface global para facilitar o uso de `addEventListener`.

## 1. App-Level Events (EventBus)

| Evento | Categoria | Origem Principal | Destinatários | Payload | Descrição |
|--------|-----------|------------------|---------------|---------|-----------|
| `state:change` | Store | `Store.ts` | UI Components | `AppState` | Notifica mudança global de estado. |
| `notify` | UI | Vários | `main.ts` | `{ message, type, duration? }` | Exibe toast global (success, error, info). |
| `module:switch` | UI | `ModuleRack` | `AppCockpit` | `{ moduleId }` | Altera o módulo ativo no painel lateral. |
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
| `history:jump` | Store | `HistoryVisualizer`| `Store.ts` | `{ index }` | Salta para um ponto específico do tempo. |
| `history:snapshot`| Store | Store / Canvas | `Store.ts` | `{ description? }` | Força a criação de um snapshot de histórico. |
| `label:config:update`| Domain| Inspector | `Store.ts` | `CanvasConfig` | Altera dimensões ou DPI da etiqueta. |
| `label:opened` | Domain | Store / BIOS | `TemplateManager` | `Label` | Disparado ao abrir um projeto (ativa injeção de fontes). |
| `preferences:update`| Core | Inspector / Modal | `Store.ts` | `Partial<UserPreferences>` | Atualiza preferências do usuário. |
| `template:save` | Storage | Shortcut / UI | `TemplateManager`| `{ source? }` | Dispara o salvamento no IndexedDB. |
| `template:saved` | Storage | `TemplateManager`| `VaultGallery.ts`| `Label` | Notifica que uma etiqueta foi salva. |
| `production:data:update` | Batch | `ProductionStudio` | `Store.ts` | `{ data, sourceName }` | Injeta dados de CSV/Manual no sistema. |
| `production:preview:index`| Batch | `ProductionStudio` | `Store.ts` | `{ index }` | Navega pelos registros no Live Preview. |
| `production:print:open` | Batch | `ProductionStudio` | `AppCockpit` | `{}` | Abre o modal de imposição física. |
| `production:config:update`| Batch | `DataSourceInput` | `Store.ts` | `Partial<BatchLayoutOptions>` | Altera margens, papel ou qualidade do PDF. |
| `production:start` | Batch | `PDFGenerator` | `StatusBar` | `{ total }` | Sinaliza início da geração massiva. |
| `production:progress`| Batch | `PDFGenerator` | `StatusBar` | `{ current, total, progress, message }` | Reporta progresso do Web Worker. |
| `production:complete`| Batch | `PDFGenerator` | `StatusBar` | `{}` | Sinaliza fim do processamento do PDF. |
| `ui:modal:open` | UI | Modals | ShortcutService | `{ id }` | Bloqueia atalhos ao abrir modal. |
| `ui:modal:close`| UI | Modals | ShortcutService | `{ id }` | Libera atalhos ao fechar modal. |
| `ui:open:help` | UI | Toolbar / Welcome | `main.ts` | `{ tab?, source? }` | Abre a central de ajuda. |
| `command:toolbar:upload-image` | UI | ShortcutService | `Toolbar.ts` | - | Dispara o clique no input de arquivo oculto. |
| `request:canvas:snapshot` | Core | Store | `EditorCanvas` | `(ctx) => void` | Solicita ImageData do canvas para histórico. |
| `command:canvas:restore` | Core | Store | `EditorCanvas` | `ImageData` | Restaura pixels do canvas (Undo/Redo). |
| `perf:render` | Core | CanvasRenderer | `StatusBar.ts` | `{ duration: number }` | Reporta tempo de renderização para telemetria. |

## 2. DOM-Level Events (Custom Elements)

| Evento | Origem | Destinatário | Payload (detail) | Descrição |
|--------|-----------|--------------|------------------|-----------|
| `app-input` | `AppInput` | Parents | `{ value: string }` | Disparado a cada tecla no input. |
| `app-select` | `AppSelect` | Parents | `{ value: string }` | Seleção de item no dropdown. |
| `change` | Vários | Parents | `{ value: T }` | Sincronia padrão com o Inspector/Store. |
| `input` | `Scrubber` | Parents | `{ value: number }` | Mudança contínua (drag). |
| `data-ready`| `UiDataGateway` | Parents | `{ data, sourceName }` | Dados processados e prontos para injeção. |
| `layout-action` | `UiAlignCluster`| `ElementInspector` | `{ action, toCanvas }` | Comando de alinhamento/distribuição. |
| `sound-request` | Components | `main.ts` | `{ preset } \| SoundPreset` | Solicita reprodução de feedback sonoro. |
| `inspector:change`| Sections (N3) | Orchestrator (N1) | `InspectorChangeDetail` | Mudança de propriedade vinda do Cockpit. |
| `inspector:action`| Sections (N3) | Orchestrator (N1) | `InspectorActionDetail` | Ação (del, up, select) vinda do Cockpit. |

---
*Última Atualização: 20/05/2026 (Documentation Expansion Sprint)*
