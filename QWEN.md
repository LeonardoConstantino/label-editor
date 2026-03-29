# Label Editor - Project Context

## Project Overview

**Label Editor** is a web-based label/tag editor application built with a "Tactile Prism" design system. It allows users to design labels with various elements (text, rectangles, circles, images, borders) and export them as PDFs, including batch processing capabilities.

### Core Purpose
- Visual WYSIWYG editor for creating printable labels
- Support for multiple element types with precise positioning (in millimeters)
- Batch processing with data source interpolation for mass label generation
- PDF export optimized for thermal printers

### Technology Stack
| Category | Technology |
|----------|------------|
| **Framework** | Vanilla TypeScript with Web Components |
| **Bundler** | Vite v8.0.0 |
| **Styling** | TailwindCSS v4.2.1 |
| **Testing** | Vitest v4.1.0 (jsdom environment) |
| **PDF Generation** | jsPDF v4.2.1 |
| **Text Rendering** | canvas-txt v4.1.1 |
| **Deployment** | gh-pages |

## Architecture

### Directory Structure
```
label-editor/
├── src/
│   ├── components/       # Web Components (editor, common, preview)
│   ├── core/             # Core services (Store, EventBus, Logger, etc.)
│   ├── domain/           # Domain layer (models, services)
│   ├── styles/           # Global styles and CSS
│   ├── utils/            # Utility functions
│   └── main.ts           # Application entry point
├── tasks/                # Task documentation for development phases
├── index.html            # Main HTML with custom elements
├── vite.config.ts        # Vite + Vitest configuration
└── tsconfig.json         # TypeScript configuration
```

### Architectural Pattern
The project follows a **domain-driven design** with clear separation:

1. **Domain Layer** (`src/domain/`): Contains business models (`Label`, `BaseElement`) and services (`TemplateManager`, `PDFGenerator`, `CanvasRenderer`, `HistoryManager`)

2. **Core Layer** (`src/core/`): Infrastructure services including:
   - `Store`: Centralized state management with undo/redo via snapshots
   - `EventBus`: Event-driven communication between components
   - `IndexedDBStorage`: Local persistence
   - `UISoundManager`: Tactile audio feedback system

3. **Components Layer** (`src/components/`): Web Components for UI:
   - `EditorCanvas`: Main workspace with label artboard
   - `Toolbar`: Action buttons for adding elements
   - `ElementInspector`: Property editor for selected elements

### Event-Driven Communication
Components communicate via `EventBus` rather than direct references:
```typescript
// Emit event
eventBus.emit('element:add', elementData);

// Listen to event
eventBus.on('state:change', (state) => { ... });
```

## Building and Running

### Development
```bash
npm run dev        # Start Vite dev server
```

### Production Build
```bash
npm run build      # TypeScript compile + Vite build
npm run preview    # Preview production build locally
```

### Testing
```bash
npm run test       # Run Vitest tests
```

### Deployment
```bash
npm run deploy     # Deploy to GitHub Pages
```

## Development Conventions

### TypeScript Configuration
- **Strict mode enabled**: `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- **Module resolution**: `bundler` mode with ESNext target
- **No emit**: Compilation handled by Vite

### Coding Patterns

#### Web Components
All UI components are native Web Components using Shadow DOM:
```typescript
export class EditorToolbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  connectedCallback(): void {
    this.render();
    this.setupListeners();
  }
}
```

#### State Management
Use the centralized `Store` for state changes; never mutate state directly:
```typescript
// Correct: Use events
eventBus.emit('element:update', { id, updates });

// Store handles snapshots and undo/redo automatically
```

#### Design System: Tactile Prism
- **Dark mode only** with glassmorphism panels
- **Spring physics** for all animations (`--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)`)
- **Neon accents** for primary actions (Indigo `#6366f1`, Emerald `#10b981`, Rose `#f43f5e`)
- **Audio feedback**: All interactions trigger sounds via `UISoundManager`

### Testing Practices
- Tests located in `__tests__` directories alongside source code
- Use Vitest with jsdom for component testing
- Test files use `.ts` extension (same as source)

### File Naming
- **Components**: PascalCase (e.g., `EditorCanvas.ts`, `AppButton.ts`)
- **Services/Utils**: PascalCase for classes, camelCase for instances (e.g., `HistoryManager.ts`, `historyManager`)
- **Models**: PascalCase (e.g., `BaseElement.ts`, `Label.ts`)

## Key Domain Concepts

### Label Model
```typescript
interface Label {
  id: string;
  name: string;
  config: {
    widthMM: number;
    heightMM: number;
    dpi: number;
    previewScale: number;
  };
  elements: AnyElement[];
  createdAt: number;
  updatedAt: number;
}
```

### Element Types
- `TEXT`: Text with font, size, color, alignment
- `RECTANGLE`: Filled/stroked rectangles
- `CIRCLE`: Circular shapes
- `IMAGE`: Images with fit modes
- `BORDER`: Border elements

### Units
All positioning and dimensions use **millimeters (mm)**. Conversion to pixels happens only in the renderer:
```typescript
const scale = config.dpi / 25.4; // mm to px conversion
const px = mm * scale;
```

## Documentation Files
- `Design_System.md`: Complete design system tokens and component guide
- `MASTER_PLAN.md`: Development roadmap with task pipeline
- `tasks/`: Individual task specifications for each development phase
