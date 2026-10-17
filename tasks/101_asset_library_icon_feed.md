# Task 101 — Theme-Adaptive DOM SVGs & Infinite Virtual Feed (AssetLibrary UX)

- **Branch:** `task/101-asset-library-icon-feed`
- **Prioridade:** 08
- **Dependências:** 100 (Icon Engine Core)
- **Bloqueia:** 102, 103

---

## 🎯 Objetivo

Implementar a aba "Symbols & Icons" dentro do módulo [AssetLibrary.ts](file:///mnt/h/programa%C3%A7%C3%A3o%20-%20copia/projetos/dev/web/label-editor/src/components/editor/modules/AssetLibrary.ts), renderizando mais de 1.000 ícones de forma ultra-fluida (60 FPS) através de um feed virtual infinito com `IntersectionObserver`. 
**Requisito Essencial:** Os SVGs gerados no DOM devem possuir colorização dinâmica nativa, adaptando-se perfeitamente ao tema visual ativo da aplicação (Dark / Light) e a interações de hover sem hacks ou re-renderizações desnecessárias.

---

## 🎨 Colorização Dinâmica no DOM via Tema

Para garantir que a miniatura do SVG no DOM reflita o tema da aplicação (`data-theme="dark"` ou `data-theme="light"`):

1. **Herança Vetorial via `currentColor`:**
   - Para ícones de contorno (`stroke: true`): `<path stroke="currentColor" fill="none" stroke-width="2" ... />`.
   - Para ícones sólidos (`stroke: false`): `<path fill="currentColor" stroke="none" ... />`.
   - Isso desacopla o SVG de cores hardcoded (como preto ou branco fixo).

2. **Vinculação de Tokens de Tema (Tailwind v4 / CSS Custom Properties):**
   - O elemento pai `.icon-card` controla a propriedade CSS `color`:
     ```css
     .icon-card {
       color: var(--color-text-muted);
       background: var(--color-surface-elevated);
       border: 1px solid var(--color-border-ui);
       transition: color 0.15s ease, border-color 0.15s ease, transform 0.15s var(--ease-spring);
     }
     
     .icon-card:hover {
       color: var(--color-text-main);
       border-color: var(--color-accent-primary);
       background: color-mix(in srgb, var(--color-accent-primary) 10%, var(--color-surface-elevated));
     }
     ```
3. **Sincronização com o `bridgeTheme`:**
   - O [AssetLibrary.ts](file:///mnt/h/programa%C3%A7%C3%A3o%20-%20copia/projetos/dev/web/label-editor/src/components/editor/modules/AssetLibrary.ts) já utiliza `bridgeTheme(this)`, que observa alterações no atributo `data-theme` do documento e replica para o host Shadow DOM.
   - Ao alternar entre Light e Dark mode, as variáveis `--color-text-muted`, `--color-text-main` e `--color-surface-elevated` mudam instantaneamente, colorindo todos os SVGs da visualização de forma síncrona através do cascade do CSS.

---

## ⚡ Infinite Virtual Feed (Zero DOM Bloat)

Para evitar carregar 1.170+ elementos SVG no DOM de uma só vez:

1. **Lote Inicial Leve:**
   - Renderiza inicialmente apenas **48 itens** em uma grade de 4 colunas.
   - O DOM inicial permanece com menos de 300 nós, carregando em menos de 10ms.

2. **Detecção com `IntersectionObserver`:**
   - Insere um sentinela no final da lista: `<div id="icon-scroll-sentinel" class="h-4"></div>`.
   - Quando o sentinela entra na viewport com margem de antecipação (`rootMargin: '200px'`), o handler adiciona o próximo lote de 48 ícones.
   - Desconecta o observer quando todo o catálogo da categoria ativa for exibido.

3. **Sub-filtros por Nicho:**
   - Pills de navegação rápida acima da grid:
     - `Todos` (Feed geral)
     - `Alertas & Segurança` (warning, biohazard, hazard, skull)
     - `Logística` (box, package, truck, scale, fragile)
     - `Sustentabilidade` (recycle, leaf, sun, ce-mark)
     - `Comércio` (tag, barcode, qr, cart, price)
   - Ao clicar em uma categoria, a lista é resetada instantaneamente para os primeiros 48 itens filtrados.

---

## 🖱️ Drag & Drop Nativo para o Canvas

1. **Payload no `dragstart`:**
   ```typescript
   e.dataTransfer.setData('application/json', JSON.stringify({
     type: 'icon',
     iconName: iconKey,
     name: iconDef.name,
     widthPx: 64,
     heightPx: 64
   }));
   ```
2. **Recepção no `EditorCanvas.ts`:**
   - Em `handleAssetDrop()`, detectar se `asset.type === 'icon'`.
   - Criar `ElementFactory.create(ElementType.ICON, { iconName: asset.iconName, dimensions: { width: 15, height: 15 } })`.
   - Disparar `eventBus.emit('element:add', element)` com som de encaixe háptico do `UISM`.

---

## 📋 Critérios de Aceite

- [x] Categoria/Aba "Symbols & Icons" ativa no `AssetLibrary`.
- [x] SVGs no DOM usam `currentColor` e mudam de cor dinamicamente com o tema (Dark / Light) via `bridgeTheme`.
- [x] Feed virtual infinito renderiza inicialmente 48 ícones e expande sob demanda via `IntersectionObserver`.
- [x] Sub-filtros por nicho (Alertas, Logística, ISO, etc.) funcionais e reativos.
- [x] Arraste nativo (Drag & Drop) funcional da Asset Library para o Canvas, gerando `IconElement` na posição do cursor.
- [x] Zero impacto de jank (scroll liso a 60 FPS na gaveta lateral).

---
**Status:** Concluído 🚀
