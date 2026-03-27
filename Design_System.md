# 🎨 Design System: Tactile Prism (Label Editor & Batch Generator)

## 📌 1. Filosofia e Arquitetura
- **Paradigma:** Editor-Centric Design.
- **Foco:** O Canvas de edição ocupa 70% da tela. A UI de suporte (painéis, toolbars) deve parecer "flutuar" sobre a área de trabalho.
- **Vibe:** Profissional, escuro (Dark Mode nativo para reduzir fadiga ocular), tátil e altamente responsivo.
- **Tech Stack:** Web Components (Shadow DOM), Tailwind CSS v4.2, Vite.

---

## 🎨 2. Cores (Tailwind v4 `@theme`)
Fugimos do cinza padrão. Usamos tons de "Obsidian" (um azul-ardósia quase preto) para profundidade e "Electric Indigo" para ações, criando um contraste suculento.

- **Canvas (Fundo Geral):** `#0f1115` (Profundo, absorve a luz, destaca a etiqueta branca).
- **Surface (Painéis/Toolbars):** `#161920` com 80% de opacidade + `backdrop-blur-md`.
- **Bordas (Divider):** `#262a33` (Sutil, apenas para separação estrutural).
- **Primary Accent (Ações):** `#6366f1` (Indigo vibrante).
- **Success (Geração em Lote):** `#10b981` (Emerald).
- **Texto Principal:** `#f8fafc` (Slate 50).
- **Texto Secundário (Labels):** `#94a3b8` (Slate 400).

---

## 🔤 3. Tipografia
Usamos fontes modernas que combinam perfeitamente com interfaces técnicas.

- **UI / Interface (Font-sans):** `Inter` ou `Geist`. Usada em botões, tooltips e menus.
  - *Pesos:* 400 (Regular) para textos longos, 500 (Medium) para botões, 600 (Semibold) para títulos de painéis.
- **Dados / Batch / Código (Font-mono):** `JetBrains Mono` ou `Geist Mono`.
  - *Uso:* Propriedades (ex: dimensões X e Y), contadores de lote, variáveis dinâmicas das etiquetas (ex: `{{barcode_01}}`).

---

## 📏 4. Espaçamento e Layout
Padrões rígidos baseados em múltiplos de 4px (padrão Tailwind).

- **Toolbar Superior:** `h-12` (Compacta, focada em ícones).
- **Inspector Lateral:** `w-72` (Ocupa o necessário, colapsável).
- **Canvas Padding:** `p-16` (Garante que a etiqueta respire, independente do zoom).
- **Gaps Internos (Painéis):** `gap-3` para agrupamentos visuais, `gap-1` para inputs próximos.

---

## ⚡ 5. Componentes e "Juice" (Micro-interações)
É aqui que o app ganha vida. Toda interação deve dar feedback visual e tátil.

### Animação Base (Spring Physics)
- Criar a variável de easing: `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);`
- Toda transição de hover usa esse timing para dar um leve "pulo" natural.

### Botões e Ferramentas (Toolbar)
- **Idle:** Fundo transparente, ícone cor secundária.
- **Hover:** Fundo `bg-white/5`, ícone cor principal, `transform: translateY(-1px)`.
- **Active (Click):** `transform: scale(0.95)` (sensação de afundamento físico).
- **Focus:** `ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#0f1115]`.

### Painéis (Panels)
- Bordas com `border border-white/10`.
- Sombra: `shadow-[0_8px_30px_rgb(0,0,0,0.12)]` (Sombra suave, espalhada).
- Ao colapsar, não apenas esconda; use uma transição de `width` e `opacity` com a física de mola.

### Inputs de Propriedades (Inspector)
- Fundo do input: `bg-black/20`.
- Hover no input: Borda brilha levemente (`border-indigo-500/50`).
- Os labels ficam minúsculos e acima do dado `text-[10px] uppercase tracking-wider`.

---

## 💻 6. Setup CSS Inicial (Tailwind v4 `app.css`)
No Tailwind v4, a configuração fica direto no CSS. Instrua os agentes a usar essa base:

```css
@import "tailwindcss";

@theme {
  /* Cores Customizadas */
  --color-canvas: #0f1115;
  --color-surface: rgba(22, 25, 32, 0.85);
  --color-border-ui: #262a33;
  --color-accent: #6366f1;
  --color-accent-hover: #4f46e5;
  
  /* Fontes */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Juice (Animações e Efeitos) */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --shadow-panel: 0 8px 30px rgba(0,0,0,0.4);
  --shadow-neon: 0 0 12px rgba(99, 102, 241, 0.4);
}

/* Base Global */
@layer base {
  body {
    background-color: var(--color-canvas);
    color: var(--color-slate-50);
    overflow: hidden; /* O Canvas lida com o pan/zoom, não o body */
    user-select: none; /* Previne seleção acidental de texto ao arrastar elementos */
  }
}

/* Utilitários Customizados para Web Components */
@layer utilities {
  .panel-glass {
    background-color: var(--color-surface);
    backdrop-filter: blur(12px);
    border: 1px solid var(--color-border-ui);
    box-shadow: var(--shadow-panel);
  }

  .btn-juice {
    transition: all 0.2s var(--ease-spring);
  }
  .btn-juice:active {
    transform: scale(0.95);
  }
  
  .glow-focus:focus-within {
    box-shadow: var(--shadow-neon);
    border-color: var(--color-accent);
  }
}