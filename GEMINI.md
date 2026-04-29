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

### 2026-04-21: Major Feature Push & Production Readiness
- **The Vault:** Galeria glassmorphic com Digital Twin.
- **ShortcutService:** Sistema de atalhos contextuais e Prop Clipboard.
- **BIOS Boot:** Lógica de restauração de sessão e Welcome Screen.

### 2026-04-22: Planejamento de Consolidação & Performance
- **Backlog v4.0:** Criação das tasks 49-63 focadas em polimento e estabilidade.
- **Master Plan:** Reorganização por impacto e introdução de prioridades (0-10).
- **Decisão Técnica:** Adoção de `adoptedStyleSheets` e renderização incremental.

### 2026-04-23: Expansão Tática & Planejamento de Produção
- **UX & Comfort:** Controle global de áudio e presets de tamanho de etiqueta.
- **Compliance:** Definição da aba "About" com Termos e Privacidade local-only.
- **Larga Escala:** Suporte para etiquetas de até 500mm e impressão em A3/Paisagem.

### 2026-04-24: Auditoria de Progresso & Consolidação de Regras
- **Auditoria Geral:** Revisão dos critérios de aceite das Tasks 01 a 50. Sincronização do estado real do projeto com a documentação.
- **Finalização Task 60:** Formalização das diretrizes de **Code Style** e **Pragmatic Excellence** no GEMINI.md.
- **Restauração de Backlog:** Reativação das tasks de performance (Web Workers) e acabamento de PDF (Sangria/Corte).

### 2026-04-26: Performance, Portabilidade & Refinamento de Core
- **Task 51 (Focus Protection):** Implementada detecção recursiva de foco em Shadow DOM, protegendo inputs contra interferência de atalhos globais.
- **Task 54 (Canvas Zoom):** Migração para zoom visual via CSS `transform: scale`, implementação de camada `artboard-scaler` para respiro (gutter) dinâmico e correção matemática do `hit-test`.
- **Task 33 (JSON Portability):** Implementado ecossistema de importação/exportação de arquivos `.label` na Toolbar, Welcome Screen e Vault.
- **Task 61 (DOM Optimization):** Refatoração do ciclo de vida da Toolbar, Canvas e Vault para atualizações incrementais (eliminando `innerHTML` em loops de estado).
- **Task 68 (Asset Intelligence):** Adicionado contador de inventário no Vault com Tooltips Ricas e detalhamento por ícones de camadas.
- **Task 71 (Event Registry):** Iniciada orquestração de eventos; criado `docs/Event_System_Registry.md` com mapeamento de 21 eventos e auditoria de órfãos.

### 2026-04-27: Polimento de UX & Unificação de Design
- **Task 56 (Inspector Layout):** Ajuste de padding no cabeçalho do Inspector para consistência visual em resoluções menores.
- **Task 49 (KBD Unification):** Centralização da lógica de renderização de atalhos no `UIKeyboardShortcuts` (SSoT). Refatoração de `Toolbar`, `HelpCenter` e `UiHudTips` para utilizar o motor unificado.
- **Design System:** Implementado estilo "3D Prism" para elementos `<kbd>` globalmente, adicionando profundidade visual e feedback tátil via CSS.
- **Integridade:** Sincronização de interfaces de atalhos e correção de tipos TS para garantir build estável.

### 2026-04-28: Persistência de Preferências & Controle de Áudio
- **Task 64 (Global Audio):** Implementado controle de áudio persistente no ElementInspector. Refatoração da sequência de boot (main.ts) para carregar preferências e aplicar o estado do `UISoundManager` antes da primeira interação.
- **Core (Boot Logic):** Otimização do ciclo de vida de inicialização para evitar carregamento redundante de labels e garantir sincronia entre Store e PreferenceManager.
