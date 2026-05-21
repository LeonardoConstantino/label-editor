# GEMINI.md - Label Editor v4.0

## Project Overview
**Label Editor** is a high-performance, client-side graphical editor for designing labels and generating them in batches. It uses a modern web stack to provide a professional, "Tactile Prism" design experience with a focus on precision, performance, and privacy.

### Main Technologies
- **Bundler:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS v4.2](https://tailwindcss.com/) (CSS-first `@theme` configuration)
- **Component Model:** [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) (Shadow DOM + Constructable Stylesheets)
- **Architecture:** Event-Driven with a Centralized Store
- **Storage:** [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) for local-only template persistence

## Development Conventions

### 1. Code Style (Pragmatic Excellence)
- ❌ **Proibido:** Uso de `any` em qualquer contexto.
- ✅ **Obrigatório:** Modificadores de acesso explícitos e tipagem de retorno em funções públicas.
- ✅ **Shadow DOM:** Uso obrigatório para isolamento de estilos. Preferir `adoptedStyleSheets`.

### 2. Core Strategies
- **Sincronização Atômica (Atomic Sync):** Para evitar a perda de foco e performance em re-renders, os componentes do editor seguem o padrão `renderSkeleton()` (executado uma vez) e `syncValues()` (atualizações granulares dos inputs/propriedades). Nunca use `innerHTML = ...` para atualizar valores em componentes complexos com inputs ativos.
- **Event-Driven Orchestration:** Toda comunicação entre módulos (Rack, Cockpit, Canvas) deve passar pelo `EventBus` tipado. Consulte o [Event System Registry](./docs/Event_System_Registry.md) para a lista completa de contratos.
- **Worker Fidelity:** A geração de PDFs massivos ocorre em `BatchWorker.ts` via `OffscreenCanvas`. Para fidelidade de 100%, o `FontTransfer` captura binários da Main Thread e os injeta no Worker.
- **CSS Isolation:** O uso de `isolation: isolate` em containers de nível 1 (Aside, Modais) é obrigatório para gerenciar contextos de empilhamento (Z-Index) sem hacks.

### 3. Design System (Tactile Prism)
- **Theme:** Native Dark Mode.
- **Interactions:** Use spring physics (`--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)`).
- **Typography:** `Inter` para UI, `JetBrains Mono` para dados técnicos.

### Arquivos de Referência
- **Design & Layout:** [Design System](./docs/Design_System.md) | [Layout/UX](./docs/Layout_UX_Guide.md)
- **Elementos:** [Definição](./docs/definition_elements.md) | [Futuro](./docs/definition_elements_details_future.md)
- **Documentação Viva:** [Help Center](./src/assets/data/helpData.ts) | [Event Registry](./docs/Event_System_Registry.md)

## Session Logs

### 2026-05-21: Biblioteca de Ativos & Drag and Drop
- **Task 78 (Asset Library):** Implementado o gerenciador de recursos visuais ("The Parts Bin").
  - **Grid Masonry:** Miniaturas organizadas em 2 colunas com suporte a categorias (SVGs, Logos, Uploads).
  - **Native Drag & Drop:** Arraste de assets diretamente do painel lateral para o Canvas com posicionamento preciso.
  - **Persistência IDB:** Uploads de usuários são salvos permanentemente no IndexedDB v4.
  - **Juice Tátil:** Feedback visual de glow no Canvas durante o arraste e sons de "velcro/encaixe".
- **Evolução da Documentação:** `GEMINI.md` atualizado com estratégias core (Atomic Sync, CSS Isolation).

### 2026-05-20: Consolidação & Documentação
- **Task 20 (Documentation Expansion):** Refatoração massiva do README.md técnico e sincronização do Event Registry.
- **Task 23 (Shortcuts Pro):** Planejamento do novo motor de atalhos "Power User".

### 2026-05-18: Fidelidade Tipográfica & Performance de Dados
- **Task 83 (Font Fidelity):** 100% de paridade visual no Worker via captura de binários (CORS ready).
- **Task 85 (Typeface Engine):** Injeção dinâmica de Google Fonts com persistência no projeto.
- **Task 50 & 58 Refinements:** Sincronização atômica no Elemento de Código e Metadados de Lote.

### 2026-05-16: Resiliência & Proteção de Dados
- **Task 36 (Work Resumption):** Auto-save real no IndexedDB (v2), Dirty State e Proteção de Saída.
- **Task 81 (CSS Isolation):** Cleanup de Z-Index via contextos de empilhamento explícitos.

### 2026-05-12: Estúdio de Produção & Impressão Dinâmica
- **Task 77 & 67 (Unified Production):** Migração do fluxo de lote para o cockpit lateral e suporte a papéis dinâmicos.
- **Task 24 (Batch Workers):** Geração de PDF em background com compressão JPEG variável.
