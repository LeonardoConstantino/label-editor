# 🗄️ Guia de Implementação: The Vault (Galeria de Templates)
**Design System:** Tactile Prism | **Arquitetura:** Event-Driven Web Components

Este documento detalha a construção da Galeria de Templates (Task 35), transformada na experiência "The Vault".

---

## 📺 1. O Digital Twin (Atualização do Blueprint)

No painel de Configuração (`CanvasConfigPanel.ts`), o retângulo branco genérico deve ser substituído pelo monitor ao vivo da etiqueta atual.

**Estrutura HTML (Instrução para a IA):**
```html
<!-- O Container do Monitor -->
<div class="relative w-full h-48 bg-[#0a0c10] border border-border-ui rounded-lg flex items-center justify-center mb-6 overflow-hidden group cursor-pointer" id="btn-open-vault">
  
  <!-- A Miniatura Real (Proporcional) -->
  <!-- O JS deve injetar o aspect-ratio exato baseado em config.widthMM / heightMM -->
  <div class="relative bg-white shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:blur-sm" 
       style="aspect-ratio: 100 / 150; max-height: 80%; max-width: 80%;">
    
    <!-- Imagem em base64 vinda de label.thumbnail -->
    <img src="data:image/png;base64,..." class="w-full h-full object-contain" />
    
    <!-- Efeito Scanline CRT (Juice) -->
    <div class="absolute inset-0 pointer-events-none opacity-10" 
         style="background: repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px);"></div>
  </div>

  <!-- Overlay de Hover (O Convite) -->
  <div class="absolute inset-0 bg-accent-primary/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
    <div class="bg-surface-solid border border-accent-primary text-text-main font-mono text-[10px] px-3 py-1.5 rounded uppercase tracking-widest shadow-[0_0_12px_rgba(99,102,241,0.4)]">
      [ Open Vault ]
    </div>
  </div>

</div>
```

---

## 🏛️ 2. O Modal "The Vault" (Takeover Modal)

O Vault não é um modal pequeno. Ele deve ocupar a tela quase toda. O componente `<ui-modal>` precisará de uma classe para forçar a expansão (`w-[90vw] h-[90vh]`).

**Layout Base (HTML do Modal):**
```html
<ui-modal id="vault-modal">
  <div slot="body" class="flex h-full w-full -m-6"> <!-- -m-6 anula o padding padrão do modal para usarmos tela cheia -->
    
    <!-- Sidebar de Filtros -->
    <aside class="w-64 border-r border-border-ui bg-black/20 p-4 flex flex-col gap-4">
      <h3 class="font-mono text-[10px] text-text-muted uppercase tracking-wider">Storage Filters</h3>
      <!-- Filtros (Todos, Recentes, Dimensões) -->
      <button class="text-left font-sans text-sm text-accent-primary bg-accent-primary/10 px-3 py-2 rounded border border-accent-primary/20">
        Todos os Ativos
      </button>
      <button class="text-left font-sans text-sm text-text-muted hover:text-text-main px-3 py-2 transition-colors">
        Recentes
      </button>
    </aside>

    <!-- Área da Grade (A Biblioteca) -->
    <main class="flex-1 bg-canvas p-8 overflow-y-auto relative">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" id="vault-grid">
        <!-- Os Cartuchos (Templates) entrarão aqui -->
      </div>
    </main>

  </div>
</ui-modal>
```

---

## 🖨️ 3. O Cartucho de Template (Card Component)

Cada item do array `Label[]` deve ser renderizado como um "Cartucho". A mágica aqui é usar `aspect-ratio` no container da imagem para refletir a forma física da etiqueta.

**Estrutura de cada Cartão (Para a IA renderizar via JS):**
```html
<div class="group relative bg-surface-solid border border-border-ui rounded-xl overflow-hidden shadow-panel hover:border-accent-primary hover:-translate-y-1 transition-all duration-300 ease-[var(--ease-spring)]">
  
  <!-- A "Vitrine" (Proporção da Imagem) -->
  <div class="bg-[#0a0c10] w-full h-40 flex items-center justify-center p-4 relative border-b border-border-ui">
    
    <!-- A Miniatura com proporção real injetada via TS -->
    <img src="${label.thumbnail}" 
         class="bg-white shadow-[0_5px_15px_rgba(0,0,0,0.6)]" 
         style="aspect-ratio: ${label.config.widthMM} / ${label.config.heightMM}; max-width: 100%; max-height: 100%;" />

    <!-- Overlay de Ações Rápidas (Revelado no Hover) -->
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity duration-200">
      <button class="btn-prism btn-success px-6 py-1.5 action-load" data-id="${label.id}">
        <ui-icon name="download" class="w-4 h-4"></ui-icon> Load
      </button>
      <div class="flex gap-2 mt-2">
        <button class="btn-tool bg-white/10 hover:bg-white/20 action-duplicate" title="Duplicar" data-id="${label.id}">
          <ui-icon name="copy" class="w-4 h-4"></ui-icon>
        </button>
        <button class="btn-tool bg-accent-danger/10 text-accent-danger hover:bg-accent-danger hover:text-white action-delete" title="Excluir" data-id="${label.id}">
          <ui-icon name="trash" class="w-4 h-4"></ui-icon>
        </button>
      </div>
    </div>
  </div>

  <!-- Meta-Dados (Rodapé do Cartucho) -->
  <div class="p-3">
    <h4 class="font-sans text-sm font-semibold text-text-main truncate mb-1" title="${label.name}">
      ${label.name}
    </h4>
    <div class="flex items-center justify-between">
      <kbd class="kbd-prism shadow-none text-[8px]">${label.config.widthMM} × ${label.config.heightMM}mm</kbd>
      <span class="font-mono text-[9px] text-text-muted/60">
        ${formatTime(label.updatedAt)} <!-- Ex: 2h ago -->
      </span>
    </div>
  </div>

</div>
```

---

## 🛠️ 4. O Slot Vazio (Primeiro Item do Grid)

Antes de mapear o array de `Label`, o JS deve sempre renderizar este slot estático para permitir a criação de um novo documento.

```html
<button id="btn-new-template" class="w-full h-full min-h-[220px] rounded-xl border-2 border-dashed border-border-ui bg-black/10 flex flex-col items-center justify-center gap-3 text-text-muted hover:text-accent-primary hover:border-accent-primary hover:bg-accent-primary/5 transition-colors cursor-pointer group">
  <div class="w-12 h-12 rounded-full bg-surface-solid border border-border-ui flex items-center justify-center group-hover:scale-110 transition-transform var(--ease-spring)">
    <ui-icon name="plus" class="w-6 h-6"></ui-icon>
  </div>
  <span class="font-mono text-[10px] uppercase tracking-wider font-semibold">Novo Cartucho</span>
</button>
```

---

## 🔊 5. Integração Sensorial e Fluxo (Juice + AudioContext)

Instruções para o comportamento TypeScript com `UISoundManager`:

1. **Abrir o Vault:** 
   - Gatilho: Click no `btn-open-vault`.
   - Áudio: `sound.play('open')` (Sweep ascendente - sensação de gaveta abrindo).
2. **Botão LOAD (Carregar):**
   - Gatilho: Click na ação primária do Cartucho.
   - Áudio: `sound.play('save')` (Acorde maior - encaixe de hardware).
   - Ação TS: O Modal fecha, o `EventBus` emite `template:loaded` e o Canvas renderiza o documento instantaneamente.
3. **Botão DUPLICATE (Duplicar):**
   - Gatilho: Click no mini botão de copy.
   - Áudio: `sound.play('copy')`.
   - Ação TS: Adiciona a cópia ao `Store`, regera a grid. (Dica de Juice: o novo elemento deve entrar na tela com uma opacidade inicial de 0 e ir para 1).
4. **Botão DELETE (Destruir):**
   - Gatilho: Click na lixeira.
   - Áudio: `sound.play('warning')` (Abre o modal `<ui-confirm>`).
   - Se confirmado: `sound.play('delete')` (Ruído grave - cartucho destruído) e remove do IDB.
5. **Botão Novo Cartucho (Slot Vazio):**
   - Gatilho: Click no `btn-new-template`.
   - Áudio: `sound.play('new')` (Acorde ascendente).
   - Ação TS: Fecha o modal, limpa o Canvas (`store.initializeEmptyLabel()`).

--- 
**Nota para a IA:** Respeite fielmente as classes do Tailwind e a ordem das camadas do Z-Index para garantir que as animações de *Glassmorphism* do `ui-modal` funcionem corretamente sobre a aplicação.