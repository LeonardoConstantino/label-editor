# GEMINI.md - Label Editor

## Project Overview
**Label Editor** is a high-performance, client-side graphical editor for designing labels and generating them in batches. It uses a modern web stack to provide a professional, "Tactile Prism" design experience with a focus on precision and performance.

### Main Technologies
- **Bundler:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4.2](https://tailwindcss.com/) (using the new CSS-first `@theme` configuration)
- **Component Model:** [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) (Shadow DOM)
- **Testing:** [Vitest](https://vitest.dev/) with `jsdom`
- **Architecture:** Event-Driven with a Centralized Store
- **Storage:** [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) for template persistence

### Architecture
The project follows a modular, event-driven architecture as outlined in `proposta de arquitetura.md`:
- **Core Layer:** `EventBus` for decoupled communication, `Store` for centralized state management, and `Logger`/`IndexedDBStorage` for utilities.
- **Domain Layer:** Models (Label, Elements), Services (CanvasRenderer, PDFGenerator), and Validators.
- **UI Layer:** Pure Web Components (Shadow DOM) that react to state changes via the `EventBus`.

## Building and Running
The project uses standard `npm` scripts for its lifecycle:

- **Development:** `npm run dev` - Starts the Vite dev server.
- **Production Build:** `npm run build` - Runs `tsc` and `vite build`.
- **Preview:** `npm run preview` - Serves the production build locally.
- **Testing:** `npm run test` - Executes the test suite via Vitest.
- **Deployment:** `npm run deploy` - Deploys the `dist` folder to GitHub Pages.

## Development Conventions

### Coding Style & Standards
- **Component Pattern:** Always use Web Components with Shadow DOM for encapsulation.
- **Communication:** Use the singleton `EventBus` (`src/core/EventBus.ts`) for inter-component communication. Avoid direct component-to-component coupling.
- **State Management:** Follow the `Store` pattern proposed in the architecture for handling application state.
- **Styling:** Adhere to the "Tactile Prism" Design System (`Design_System.md`). Use Tailwind CSS v4 variables defined in the `@theme` block.
- **Naming:** Follow established TypeScript naming conventions (PascalCase for classes/types, camelCase for variables/functions).

### Design System (Tactile Prism)
- **Theme:** Native Dark Mode.
- **Colors:** Canvas (`#0f1115`), Surface (`#161920`), Primary Accent Indigo (`#6366f1`).
- **Typography:** `Inter`/`Geist` for UI, `JetBrains Mono`/`Geist Mono` for data/code.
- **Interactions:** Use spring physics for animations (`--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)`).

### Testing Practices
- **Framework:** Vitest.
- **Scope:** Prioritize testing for `domain/services` (like `CanvasRenderer`) and `core` utilities.
- **Environment:** Use `jsdom` for tests that require DOM APIs.

### Project Folders
- `src/core/`: Essential infrastructure (EventBus, Store, Storage).
- `src/domain/`: Business logic, models, and rendering services.
- `src/components/`: Reusable Web Components.
- `src/utils/`: Pure helper functions (Image processing, sanitization).
- `src/types/`: Global TypeScript definitions.

## Session Logs

### 2026-04-21: Major Feature Push & Production Readiness
**Major Achievements:**
- **The Vault (Template Gallery):** Implemented a fullscreen, glassmorphic gallery with real-time design thumbnails (Digital Twin) and flicker-free DOM updates.
- **Power-User Keyboard Shortcuts:** Built a robust `ShortcutService` with context-awareness, `Prop Clipboard` (Ctrl+Alt+C/V), and single-key creation tools (T, R, I, B, V, P).
- **BIOS Boot Sequence:** Intelligent startup logic that restores the `last_active_project` or presents a `Welcome Screen` for new users.
- **Dynamic Help Center:** Integrated a multi-tab Help Center with a "Quick Start Guide" and an interactive keyboard shortcut map.
- **Technical Grid Overlay:** Added design-time configurable grid (size, color, opacity) that doesn't render in the final output.
- **Production Refactoring:** Successfully fixed Shadow DOM style injection using a `sharedStyles` utility and relative base paths for seamless GitHub Pages deployment.
- **Codebase Sanitization:** Cleaned up the project root (docs moved to `/docs`, legacy to `/old`) and resolved 16+ strict TypeScript build errors.

**Architectural Decisions:**
- **Key Normalization:** Switched to using `event.code` (e.g., `KeyC`) for modifier-based shortcuts to prevent international keyboard character conflicts (like `©`).
- **Style Injection:** Standardized on Vite `?inline` imports for CSS to bypass relative path breakage in production bundles.
- **Event-Driven UI:** Reinforced decoupled communication by using the `EventBus` for modal context switching and global notifications.

### 2026-04-22: Planejamento de Consolidação & Performance (v4.0)
**Major Achievements:**
- **Backlog Estratégico:** Criação de 15 novas tasks técnicas (49-63) focadas em polimento de elite e prontidão para produção.
- **Master Plan v4.0:** Reorganização completa do plano de trabalho por impacto e prioridade (0-10).
- **Workflow de Feature Branches:** Estabelecido o uso obrigatório de branches `task/NN-descricao` e análise profunda pré-execução.

**Architectural Decisions:**
- **Constructable Stylesheets:** Migração planejada para `adoptedStyleSheets` visando reduzir overhead de memória nos Shadow DOMs.
- **Rendering Incremental:** Abandono do `innerHTML` em atualizações de estado para evitar perda de foco e flicker.
- **Context Awareness:** Proteção de inputs contra interferência de atalhos de tecla única.
- **Math Interpolation:** Opção por formatadores matemáticos (`:add(1)`) em vez de `eval()` por segurança.
- **Code Style Formalizado:** Definição de regras pragmáticas para TypeScript e Web Components (Task 60).
