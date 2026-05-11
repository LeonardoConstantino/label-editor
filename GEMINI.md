# GEMINI.md - Label Editor v4.0

## Project Overview
**Label Editor** is a high-performance, client-side graphical editor for designing labels and generating them in batches. It uses a modern web stack to provide a professional, "Tactile Prism" design experience with a focus on precision, performance, and privacy.

### Main Technologies
- **Bundler:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS v4.2](https://tailwindcss.com/) (CSS-first `@theme` configuration)
- **Component Model:** [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) (Shadow DOM + Constructable Stylesheets)
- **Testing:** [Vitest](https://vitest.dev/) with `jsdom`
- **Architecture:** Event-Driven with a Centralized Store
- **Storage:** [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) for local-only template persistence

### Architecture
The project follows a modular, event-driven architecture:
- **Core Layer:** `EventBus` for decoupled communication, `Store` for centralized state management, `UISoundManager` for tactile feedback, and `IndexedDBStorage`.
- **Domain Layer:** Models (Label, Elements), Services (CanvasRenderer, PDFGenerator, HistoryManager), and Validators.
- **UI Layer:** Pure Web Components (Shadow DOM) that react to state changes via the `EventBus`.

## Development Conventions

### Code Style (Pragmatic Excellence)

#### 1. TypeScript & Tipagem Estrita
- ❌ **Proibido:** Uso de `any` em qualquer contexto.
- ✅ **Permitido:** `unknown` combinado com *type guards* quando o tipo for realmente imprevisível.
- ✅ **Obrigatório:** Modificadores de acesso explícitos (`private`, `protected`, `public`) em todos os membros de classe.
- ✅ **Obrigatório:** Tipagem explícita de retorno em todas as funções e métodos públicos.

#### 2. Web Components (Shadow DOM)
- ✅ **Shadow DOM:** Uso obrigatório para isolamento total de estilos e encapsulamento.
- ✅ **Estilização:** Preferir `adoptedStyleSheets` para carregar CSS compartilhado (evitar injeção de `<style>` no `innerHTML`).
- ✅ **Nomenclatura:** Prefixos semânticos `ui-` (reutilizáveis), `app-` (layout/funcional), `editor-` (domínio específico).
- ✅ **Lifecycles:** `connectedCallback` e `disconnectedCallback` devem ser usados apenas para inicializar/limpar a UI e listeners, nunca para lógica de negócio pesada.

### Design System (Tactile Prism)
- **Theme:** Native Dark Mode.
- **Colors:** Canvas (`#0f1115`), Surface (`#161920`), Primary Accent Indigo (`#6366f1`).
- **Typography:** `Inter`/`Geist` para UI, `JetBrains Mono`/`Geist Mono` para dados/code.
- **Interactions:** Use spring physics for animations (`--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)`).

### Arquivos de referencia
- **Proposta inicial** [Proposta](./docs/proposta%20de%20arquitetura.md)
- **Design** [Design System](./docs/Design_System.md)
- **Layout** [Layout/Ux](./docs/Layout_UX_Guide.md), [Welcome](./docs/Feature_Boot_And_Help.md), [The vault](./docs/Feature_The_Vault.md)
- **Elements** [Definição de elementos](./docs/definition_elements.md)
- **Event docs** [EventMap](./docs/Event_System_Registry.md)
- **Skill de planejamento** [Multi-Agent Project Planner](./docs/Multi-Agent%20Project%20Planner.md)

## Session Logs

### 2026-05-11: Visual History & Time Machine
- **Task 80 (History Visualizer):** Implementada a "Time Machine" para navegação visual do histórico.
  - **Componente:** Novo módulo `HistoryVisualizer` no Rack de Cartuchos.
  - **Fita Cronológica:** Exibição de miniaturas (thumbnails) de cada snapshot geradas em tempo real.
  - **Interação:** Suporte a "Time Travel" via clique direto na linha do tempo e feedback sonoro de "engrenagem" no scroll.
  - **Integridade:** Refatoração do `HistoryManager` e `Store` para suportar descrições de ações e saltos temporais diretos.
  - **Qualidade:** Estabilização completa da suíte de testes (50 testes passando).

### 2026-05-09: Unificação de UI & Robustez de Teclado
- **Task 73 (Universal Select):** Finalizada a migração de todos os seletores nativos para o componente `AppSelect`.
- **Task 76 (Active Slot):** Arquitetura modular de módulos no cockpit lateral.

### 2026-05-08: Otimização de Performance & Histórico
- **Task 59 (History Debounce):** Mecanismo de debounce para snapshots de histórico.

### 2026-05-07: Orquestração Técnica & Padronização de Eventos
- **Task 71 (EventMap):** Formalização do sistema de comunicação via EventBus tipado.

### 2026-05-06: Inteligência de Layout, Telemetria & Ajuda Contextual
- **Task 63 (Smart Snapping):** Atração magnética inteligente.
- **Task 74 (Status Bar):** Central de telemetria profissional.
- **Task 62 (Power Layout):** Ferramentas de alinhamento e distribuição.

### 2026-05-03: Refinamento de UX & Suporte a Transparência
- **Task 72 (Help Tooltips):** Padronização da experiência de ajuda contextual.
- **Hotfix (Transparency):** Corrigido bug de fundo preto em imagens transparentes.

### 2026-05-02: Maturidade de Renderização & Unificação de UI
- **Task 44 (Text Pro):** Renderização profissional de texto.
- **Task 43 (Adv Renderers):** Blending Modes e borderRadius real.
- **Task 42 (Border Element):** Estilo DOUBLE concêntrico.
- **Task 69 (UI Select):** Criado o componente `AppSelect`.

### 2026-04-30: Arquitetura de Componentes & Integridade de UI
- **Task 46 (Deep Refactor):** Modularização do `ElementInspector` em 3 níveis.
