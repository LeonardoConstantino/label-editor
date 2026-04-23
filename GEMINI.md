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

### Code Style (Tactile Engineering)
- **TypeScript:** 
  - **No-Any Policy:** O uso de `any` é proibido. Use tipos genéricos, `unknown` ou interfaces.
  - **Strict Access:** Defina explicitamente `private`, `protected` ou `public`.
  - **Readonly:** Use para propriedades imutáveis após inicialização.
- **Web Components:**
  - **Tag Naming:** `ui-` (reutilizáveis), `app-` (layout/funcional), `editor-` (específicos do domínio).
  - **Shadow DOM:** Encapsulamento total de lógica e estilo.
  - **Performance:** Use `adoptedStyleSheets` para compartilhar CSS e evite `innerHTML` em atualizações de estado frequentes.
- **Communication:**
  - **Decoupling:** Componentes nunca se comunicam diretamente; use o `EventBus`.
  - **Event Namespacing:** Padrão `categoria:acao` (ex: `element:update`, `history:undo`).

### Design System (Tactile Prism)
- **Theme:** Native Dark Mode.
- **Colors:** Canvas (`#0f1115`), Surface (`#161920`), Primary Accent Indigo (`#6366f1`).
- **Typography:** `Inter`/`Geist` para UI, `JetBrains Mono`/`Geist Mono` para dados/code.
- **Interactions:** Use spring physics for animations (`--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)`).

## Session Logs

### 2026-04-21: Major Feature Push & Production Readiness
- **The Vault:** Galeria glassmorphic com Digital Twin.
- **ShortcutService:** Sistema de atalhos contextuais e Prop Clipboard.
- **BIOS Boot:** Lógica de restauração de sessão e Welcome Screen.

### 2026-04-22: Planejamento de Consolidação & Performance
- **Backlog v4.0:** Criação das tasks 49-63 focadas em polimento e estabilidade.
- **Master Plan:** Reorganização por impacto e introdução de prioridades (0-10).
- **Decisão Técnica:** Adoção de `adoptedStyleSheets` e renderização incremental.

### 2026-04-23: Expansão Tática & Planejamento de Produção
- **UX & Comfort:** Controle global de áudio (Mute Quick Toggle) e presets de tamanho de etiqueta (ui-select).
- **Compliance:** Definição da aba "About" com Termos de Uso e Política de Privacidade local-only.
- **Larga Escala:** Suporte para etiquetas de até 500mm com Workspace Gutter e impressão em A3/Paisagem.
- **Qualidade:** Task 70 (Grande Auditoria) para garantir segurança (XSS) e cobertura de testes.
