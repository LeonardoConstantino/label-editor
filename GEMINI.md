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

#### 3. Arquitetura & Comunicação
- **Decoupling:** Componentes nunca devem ter referências diretas entre si. Toda comunicação ocorre via `EventBus`.
- **Namespacing:** Eventos seguem o padrão `categoria:acao` (ex: `element:update`, `ui:modal:open`).
- **Domain Isolation:** Lógica de negócio, cálculos matemáticos e manipulação de dados devem residir em `Services` ou `Models` no Domain Layer, mantendo a UI como uma View Layer pura.

#### 4. Performance & Otimização
- ❌ **Evitar:** `innerHTML` em loops de renderização ou atualizações de estado de alta frequência.
- ✅ **Incremental Updates:** Utilizar referências diretas a elementos do DOM para atualizar apenas valores específicos (`textContent`, `value`) em vez de reconstruir o componente.
- ✅ **Batching:** Usar `DocumentFragment` para inserções em massa no DOM.
- ✅ **Flow Control:** Aplicar *Debounce* ou *Throttle* em eventos de alto volume (input, resize, scroll).

#### 5. Filosofia de Qualidade
> "O código deve ser óbvio antes de ser elegante."
- **Clareza > Elegância:** Se a lógica não puder ser entendida em menos de 2 minutos, ela precisa ser simplificada ou comentada.
- **Refatoração Incremental:** Priorizar melhorias graduais e cirúrgicas sobre reescritas completas ("Rewrites").
- **Encapsulamento:** Baixo acoplamento é o objetivo principal para garantir testabilidade.

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

### 2026-05-02: Maturidade de Renderização & Unificação de UI
- **Task 44 (Text Pro):** Renderização profissional com alinhamento vertical, justificado e overflow complexo. Implementada busca binária para SCALE robusto e truncamento ELLIPSIS manual.
- **Task 43 (Adv Renderers):** Suporte a Blending Modes (12 tipos), borderRadius real em retângulos e suavização controlada de imagem.
- **Task 42 (Border Element):** Molduras decorativas com suporte a estilo DOUBLE concêntrico matemático e tracejados customizáveis.
- **Task 69 (UI Select):** Criado o componente `AppSelect` com visual Tactile Prism e glassmorphism.
  - **Presets:** Implementado seletor de tamanhos de etiqueta (A4, Shipping, Business Card, etc) no Document Setup.
  - **UX:** Sincronia bi-direcional entre presets e inputs manuais.
- **Task 55 (Aspect Ratio Lock):** Implementado vínculo de proporção entre Largura e Altura com feedback visual de "conexão" tátil.
- **Task 41 (Unified Models):** Sincronização completa do domínio com o Inventário v1.1. Atributos Universais (`rotation`, `opacity`) agora funcionam em todos os elementos de forma centralizada.
- **Task 52 (Layer Lock):** Sistema de congelamento de edição com proteção de UX em atalhos globais e bloqueio de inputs no Inspector.

### 2026-04-30: Arquitetura de Componentes & Integridade de UI
- **Task 46 (Deep Refactor):** Finalizada refatoração profunda do `ElementInspector`.
  - **Decomposição em 3 Níveis:** Orquestrador (N1), Containers (N2) e Seções especialistas (N3).
  - **Filtragem por Identidade:** Eliminação de ruído de eventos nativos.
  - **Regressão:** Adição de testes de fumaça abrangentes (UI Smoke Tests).

### 2026-04-27: Polimento de UX & Unificação de Design
- **Task 49 (KBD Unification):** Centralização da lógica de renderização de atalhos no `UIKeyboardShortcuts`.
- **Design System:** Implementado estilo "3D Prism" para elementos `<kbd>` globalmente.
