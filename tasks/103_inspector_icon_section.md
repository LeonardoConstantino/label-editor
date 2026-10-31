# Task 103 — InspectorSectionIcon & Variable Integration (Atomic Sync)

- **Branch:** `task/103-inspector-icon-section`
- **Prioridade:** 07
- **Dependências:** 100, 101, 102
- **Bloqueia:** Nenhuma (Entrega Final do Módulo de Ícones)

---

## 🎯 Objetivo

Criar a seção de Nível 3 [InspectorSectionIcon](file:///mnt/h/programa%C3%A7%C3%A3o%20-%20copia/projetos/dev/web/label-editor/src/components/editor/inspector/sections/) para visualização e edição de propriedades do `IconElement`. O componente deve seguir estritamente o padrão **Sincronização Atômica (Atomic Sync)** (`renderSkeleton()` e `syncValues()`) para evitar perda de foco e re-renders pesados no DOM. Permite parametrização de cor no Canvas, ajuste de traço, vinculação com variáveis dinâmicas de lote (`{{simbolo}}`) e um **Quick Picker** popover.

---

## 🏗️ Arquitetura e Controles do Inspector

1. **Estrutura do Componente:**
   - Arquivo: `src/components/editor/inspector/sections/InspectorSectionIcon.ts`.
   - Adotando `sharedSheet` e conectado ao `bridgeTheme(this)`.
   - Registrado como Custom Element `<inspector-section-icon>`.

2. **Controles na Interface:**
   - **Identificação do Ícone:** Campo `app-input` vinculado a `data-prop="iconName"`.
     - Suporta entrada direta de texto (ex: `biohazard`) ou expressões dinâmicas (ex: `{{simbolo_perigo}}`).
     - Integração com `ui-variable-badge` para inserção de variáveis do dataset ativo.
   - **Quick Picker Popover:** Um botão ao lado do input com preview do ícone atual. Ao clicar, abre um popover flutuante com campo de busca rápida e lista dos ícones recentes, permitindo trocar o símbolo sem sair do Inspector nem abrir a gaveta lateral.
   - **Color Picker:** Componente [AppColorPicker](file:///mnt/h/programa%C3%A7%C3%A3o%20-%20copia/projetos/dev/web/label-editor/src/components/common/AppColorPicker.ts) vinculado a `data-prop="color"` para definir a cor vetorial no Canvas.
   - **Stroke Width (Condicional):** [UINumberScrubber](file:///mnt/h/programa%C3%A7%C3%A3o%20-%20copia/projetos/dev/web/label-editor/src/components/common/UINumberScrubber.ts) exibido quando o ícone selecionado possui traço (`stroke: true`).

3. **Integração no [InspectorLayerCard.ts](file:///mnt/h/programa%C3%A7%C3%A3o%20-%20copia/projetos/dev/web/label-editor/src/components/editor/inspector/InspectorLayerCard.ts):**
   - No método `renderSections()`, adicionar a verificação:
     ```typescript
     } else if (el.type === ElementType.ICON) {
       container.appendChild(createSection('inspector-section-icon'));
     }
     ```

4. **Integração na [Toolbar.ts](file:///mnt/h/programa%C3%A7%C3%A3o%20-%20copia/projetos/dev/web/label-editor/src/components/editor/Toolbar.ts):**
   - Adicionar o botão de ferramenta para inserção rápida de ícone na Toolbar com tooltip explicativo e atalho configurado.

---

## 📋 Critérios de Aceite

- [x] `InspectorSectionIcon` implementado seguindo o padrão `renderSkeleton()` e `syncValues()`.
- [x] Alteração de cor no `AppColorPicker` reflete imediatamente no Canvas em tempo real.
- [x] O campo `iconName` aceita variáveis interpoladas (`{{icone}}`) com validação visual.
- [x] Botão "Quick Picker" abre popover de seleção rápida com busca e recentes.
- [x] Seção devidamente incorporada ao fluxo de camadas de `InspectorLayerCard.ts`.
- [x] Botão e atalho de adicionar ícone integrados à `Toolbar.ts`.
- [x] Build e testes unitários 100% verdes sem erros de tipagem (`npm run build` e `npm test`).
