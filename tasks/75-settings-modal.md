# Task 75: System Preferences Modal (The Calibration Matrix)

## Objetivo
Migrar o gerenciamento de `UserPreferences` para um Modal de Configurações global. O design não deve ser um formulário contínuo, mas sim uma interface dividida em "Placas de Hardware" (Cards) categorizadas. Toda mudança feita aqui deve refletir no *Store* e na tela em tempo real, sem necessidade de um botão "Salvar".

## Workflow
1. `git checkout -b task/75-settings-modal`
2. Criar `src/components/preferences/PreferencesModal.ts`. ✅
3. Injetar o modal no nível superior da aplicação e criar um gatilho de abertura (ex: Ícone de Engrenagem na Toolbar ou Atalho `Ctrl+,`). ✅
4. Conectar os inputs diretamente ao `Store.updatePreferences()` disparando atualizações reativas. ✅

---

## 🎨 Especificações de UX/UI e "Juice"

### 1. O Layout Macro (Sidebar + Content)
- **O Modal:** Deve ser largo (`w-[800px] h-[600px]`), usando o nosso `<ui-modal>`.
- **Layout Interno:** Dividido em duas colunas:
  - **Sidebar (Esquerda - 25%):** Uma lista de categorias estilo Mac OS / VS Code. ✅
  - **Content (Direita - 75%):** Área com scroll contendo os *Cards* de configuração. ✅

### 2. Anatomia dos Cards de Configuração (As "Placas")
Cada grupo de configurações vive dentro de um card `.bg-black/20 .border .border-border-ui .rounded-xl .p-6 .mb-6`. 

#### 🎛️ Card 1: System & Environment (Geral)
- `theme`: Segmented Control (Dark, Light, System). ✅
- `audioEnabled`: Custom Checkbox/Toggle. ✅
- `unit` & `lastUsedDpi`: Renderizar usando `<ui-select>`. ✅

#### 📐 Card 2: Grid Engine (Visual & Tátil)
- **O Preview:** Caixa de 100px mostrando a grade em tempo real. ✅
- `showGrid`, `gridSizeMM`, `gridColor`, `gridOpacity`. ✅

#### 🧲 Card 3: Magnetic Snapping (Precisão)
- `snapToGrid`, `snapToObjects`, `snapToCanvas`. ✅
- `snapThresholdMM`. ✅

---

## 🚀 Roadmap de Calibração Futura (Sugestões)

### 1. Customização de Auxiliares Visuais (Pendente)
Expandir o controle sobre como as guias e seleções aparecem:
- **Snapping Guides:**
  - `snapGuideColor`: Cor das linhas magnéticas (Default: `#d946ef`).
  - `snapGuideWidth`: Espessura da linha (px).
  - `snapGuideDash`: Padrão de tracejado (ex: "4, 4").
- **Selection Outline:**
  - `selectionColor`: Cor do bounding box de seleção (Default: `#f43f5e`).
  - `selectionWidth`: Espessura do contorno.
  - `selectionDash`: Estilo da borda animada.

### 2. Performance & Engine
- `historyMaxSteps`: Profundidade da pilha de Undo (Atual: 50).
- `autoSaveInterval`: Frequência de gravação no banco local (ms).
- `renderLowPoly`: Modo de alta performance para hardware legado.

### 3. Design & Creation Defaults
- `defaultFontFamily`: Fonte padrão para novas camadas.
- `defaultFontSize`: Tamanho inicial.
- `defaultShapeFill`: Cor inicial para retângulos.
- `autoLockOnCreation`: Opção para criar camadas já travadas.

### 4. Acessibilidade & Interface
- `uiScale`: Escala global da tipografia do editor (0.8x a 1.2x).
- `scrubberSensitivity`: Sensibilidade do arraste nos inputs numéricos.

---

## Critérios de Aceite
- [x] O Modal segue a estética de "Painel de Calibragem" sem botões de "Salvar".
- [x] O Card de Grid possui uma área de preview funcional.
- [x] O componente respeita os tipos exatos definidos na interface `UserPreferences`.
- [x] As interações sonoras e visuais seguem o padrão *Tactile Prism*.
- [/] Roadmap de calibração futura documentado e mapeado.
