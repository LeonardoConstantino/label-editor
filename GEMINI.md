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

### 2026-05-16: Resiliência & Proteção de Dados
- **Task 36 (Work Resumption & Protection):** Implementada camada de segurança contra perda de dados.
  - **Auto-save:** Novo `SessionManager` salva o estado instântaneo no IndexedDB a cada edição (v2 do DB).
  - **Dirty State:** Rastreamento de mudanças não sincronizadas com o cofre (Vault).
  - **Proteção de Saída:** Bloqueio nativo de fechamento de aba se houver trabalho pendente.
  - **UI Feedback:** Indicador "Unsaved" âmbar na Status Bar para consciência situacional.
  - **Boot BIOS:** Refatoração da sequência de inicialização para restauração silenciosa de sessão.

### 2026-05-15: Tipografia Avançada & Estabilidade
- **Task 38 (Tipografia Avançada):** Implementados controles profissionais de texto.
  - **Tracking:** Suporte nativo a `letter-spacing` (mm) utilizando a API `ctx.letterSpacing` do Canvas 2D.
  - **Text Transform:** Opções de `Uppercase`, `Lowercase` e `None` integradas ao renderer e inspector.
  - **UI:** Novos scrubbers e seletores adicionados à seção de Texto do Cockpit.
  - **QA:** Estabilização total das suítes de testes unitários (49/49 passando).

### 2026-05-12: Estúdio de Produção & Impressão Dinâmica
- **Task 77 & 67 (Unified Production):** Migração do fluxo de lote para o cockpit lateral e suporte a papéis dinâmicos.

### 2026-05-11 (Extra): Entrada Unificada de Dados
- **Task 82 (Data Gateway):** Implementado o componente `<ui-data-gateway>` para centralizar a entrada de dados.

### 2026-05-11: Automação de Dados & Time Machine
- **Task 79 (Variable Manager):** Implementado o orquestrador visual de pipeline de dados.
- **Task 80 (History Visualizer):** Implementada a "Time Machine" para navegação visual do histórico.

### 2026-05-09: Unificação de UI & Robustez de Teclado
- **Task 73 (Universal Select):** Finalizada a migração de todos os seletores nativos para o componente `AppSelect`.
- **Task 76 (Active Slot):** Arquitetura modular de módulos no cockpit lateral.
