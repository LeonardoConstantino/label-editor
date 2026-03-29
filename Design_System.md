# 🎨 Design System: Tactile Prism
**Projeto:** Editor Gráfico de Etiquetas & Gerador em Lote
**Stack:** Web Components, TypeScript, Vite, TailwindCSS v4.2

## 📌 1. Filosofia e Arquitetura
- **Paradigma:** Editor-Centric Design. O usuário está operando uma máquina de precisão.
- **Vibe:** 100% Dark Mode, Tátil (Hardware feel), Glassmorphism (Painéis translúcidos) e destaques em Neon.
- **Foco:** O Canvas (`.canvas-workspace`) ocupa a maior parte da tela com um grid técnico. A UI flutua sobre ele.
- **Juice:** Todas as interações (hover, active, toggle) usam física de mola (Spring) para parecerem físicas e responsivas.

---

## 🎨 2. Design Tokens (Tailwind v4 `@theme`)

### Cores Base
- **Canvas (`bg-canvas`):** `#0f1115` (Fundo profundo do editor, absorve luz).
- **Surface Glass:** `rgba(22, 25, 32, 0.85)` (Painéis com `backdrop-blur` para ver a etiqueta por baixo).
- **Surface Solid (`bg-surface-solid`):** `#161920` (Fundo sólido para Modais e Toasts).
- **Bordas (`border-border-ui`):** `#262a33` (Divisões estruturais sutis).

### Cores de Destaque (Neon)
- **Primary (`accent-primary`):** `#6366f1` (Indigo - Ações principais, brilho de inputs).
- **Success (`accent-success`):** `#10b981` (Emerald - Botão de "Gerar Lote").
- **Danger (`accent-danger`):** `#f43f5e` (Rose - Exclusão, Erros).

### Tipografia
- **Texto UI (`font-sans`):** `Inter`. Usada em botões, modais e descrições.
- **Dados/Labels (`font-mono`):** `JetBrains Mono`. Usada em labels de inputs, títulos de confirmação e variáveis da etiqueta.

---

## 📐 3. Layout Estrutural

A construção da tela principal deve seguir esta hierarquia:

```html
<div class="layout-container"> <!-- Flex, h-dvh, w-full -->
  <!-- 1. Painel Lateral -->
  <aside class="panel-glass">
    <!-- Controles, Inputs, etc -->
  </aside>

  <!-- 2. Área de Trabalho -->
  <main class="canvas-workspace">
    <!-- 3. A Etiqueta (O que será impresso) -->
    <div class="label-artboard" style="width: 100mm; height: 150mm;">
      <!-- Design do Usuário -->
    </div>
  </main>
</div>
```

---

## 🧩 4. Guia de Web Components

Instruções para os agentes sobre como renderizar os componentes reutilizáveis do projeto.

### 1. `AppButton.ts`
Deve injetar as classes base `.btn-prism` e aplicar os modificadores conforme a prop de variante.
- **Base:** `.btn-prism` (Aplica flex, padding e a animação tátil de afundamento `scale(0.92)` no `:active`).
- **Variantes:**
  - `primary`: `.btn-primary` (Fundo Indigo + Glow Neon no hover).
  - `secondary`: `.btn-secondary` (Fundo escuro, borda sutil).
  - `success`: `.btn-success` (Emerald, usado para ações de Lote/Impressão).
  - `danger`: `.btn-danger` (Fundo translúcido/borda Rose, preenche no hover + Glow Neon, usado para ações destrutivas).

### 2. `AppInput.ts`
Deve encapsular um label e um input com visual técnico.
- **Label:** Usar a classe `.label-prism` (Fonte Mono, minúscula, uppercase, text-muted).
- **Input:** Usar a classe `.input-prism` (Fundo translúcido `bg-black/20`, cantos arredondados, borda que brilha em Indigo ao receber foco).

### 3. `icon.ts` (`<ui-icon>`)
Componente vetorial crisp.
- O CSS global já cuida do tamanho dinâmico usando a variável `--icon-size`.
- **Juice:** Se o `<ui-icon>` for colocado dentro de um `.btn-prism`, ele aumentará levemente de tamanho (`scale(1.15)`) no hover do botão automaticamente através do `::part(svg)`.

### 4. `modal.ts` (`<ui-modal>`)
Painel flutuante sólido. O CSS global define as variáveis de Shadow DOM.
- **Shadow Parts disponíveis para estilização interna:**
  - `::part(header)`: Barra de título (já configurada com borda inferior).
  - `::part(body)`: Área de conteúdo (texto em `text-muted`).
  - `::part(close-btn)`: Botão de fechar (já possui animação de rotação no hover).

### 5. `confirm.ts` (`<ui-confirm>`)
Caixa de diálogo do sistema (System Command Box).
- Diferente do Modal, ele projeta um brilho de Neon ao redor de si (`var(--shadow-neon-primary)`).
- **Shadow Parts:**
  - `::part(title)`: Usa `font-mono` em uppercase para parecer um comando de terminal.
  - `::part(btn-cancel)` e `::part(btn-ok)`.

### 6. `toast.ts` (`<ui-toast-manager>`)
Notificações do sistema estilo "Hardware Labels".
- Fundo escuro (`bg-surface-solid`).
- Uma borda lateral esquerda de `4px` indica o status (Primary, Success, Danger).
- **Shadow Parts:**
  - `::part(toast-root)`: O card da notificação.
  - O título do Toast (se encapsulado em uma tag `<strong>`) assumirá automaticamente a fonte Mono para destacar a ação.

---

## ⚡ 5. Micro-interações (O "Juice")

- **Física de Mola (Spring):** Controlada pela variável global `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);`. Use essa transição sempre que um painel abrir, um botão for clicado ou um ícone mudar de estado.
- **Toggle/Checkbox:** Checkboxes nativos foram substituídos visualmente por Toggles táteis no `main.css`. Eles parecem chaves de hardware com uma luz indicadora interna.

---

## 🖨️ 6. Regras de Impressão e Geração de Lote
A geração do lote acontece delegando o print ao navegador. O `@media print` no `main.css` cuida de tudo:
1. Ele oculta o `.panel-glass`, modais, toasts e limpa o fundo escuro do `.canvas-workspace`.
2. A `.label-artboard` perde suas sombras e margens.
3. Se múltiplas `.label-artboard` forem renderizadas no DOM (para um lote de dezenas de etiquetas), o CSS força `page-break-after: always` entre elas, garantindo que cada etiqueta ocupe exatamente uma página na impressora térmica ou PDF.