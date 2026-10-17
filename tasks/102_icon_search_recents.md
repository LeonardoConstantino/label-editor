# Task 102 — Instant Search & Recents Engine (O(tokens) Cache)

- **Branch:** `task/102-icon-search-recents`
- **Prioridade:** 07
- **Dependências:** 101 (Asset Library Icon Feed)
- **Bloqueia:** 103

---

## 🎯 Objetivo

Eliminar a fricção de descoberta em um catálogo com mais de 1.000 símbolos implementando:
1. Um **motor de busca em tempo real** com complexidade de tempo $O(\text{tokens})$ utilizando o índice invertido pré-compilado em build time.
2. Uma barra superior de **"Recents & Pinned"** persistida no IndexedDB com os ícones mais utilizados pelo usuário, reduzindo a necessidade de buscas em 80% dos fluxos diários.

---

## 🔍 Busca Instantânea $O(\text{tokens})$

1. **Pesquisa por Substring e Tags:**
   - O usuário digita no campo de busca do `AssetLibrary` (ex: `"bio"`, `"caixa"`, `"perigo"`, `"iso"`).
   - O método `searchIcons(query)` em `src/constants/icons.ts` não itera sobre os 1.171 objetos completos. Ele consulta o `ICON_TOKEN_INDEX` gerado em build time, localizando apenas as chaves associadas aos tokens correspondentes.
   - Aplica debounce de 150ms para manter a UI responsiva enquanto o usuário digita.

2. **Renderização de Resultados Filtrados:**
   - Limpa a grid atual e exibe apenas os itens correspondentes.
   - Se o resultado for menor que 48 itens, desliga o `IntersectionObserver` temporariamente.
   - Se nenhum ícone for encontrado, exibe estado vazio elegante ("No symbols found matching '{query}'") com sugestão de termos.

---

## 📌 Sistema de Ícones Recentes (Pinned Rack)

1. **Persistência no IndexedDB:**
   - Armazena um array de até 8 chaves de ícones recentes na store `preferences` ou tabela dedicada do IndexedDB (`db.put('preferences', ...)`).
   - Ao soltar um ícone no Canvas ou selecioná-lo no catálogo, o ID é inserido no topo da fila (evitando duplicatas).

2. **Barra de Acesso Rápido na UI:**
   - Uma fileira horizontal com rolagem suave no topo da aba de Ícones:
     `<div class="recent-icons-rack">...</div>`
   - Miniaturas compactas com visual tátil Prism.
   - Também herdam a cor dinâmica do tema através de `currentColor` e `--color-text-main`.

---

## 📋 Critérios de Aceite

- [ ] Campo de busca integrado à aba de ícones no `AssetLibrary`.
- [ ] Busca em tempo real responsiva (< 5ms de execução do filtro) utilizando `ICON_TOKEN_INDEX`.
- [ ] Suporte a busca por nome de ícone e tags semânticas (ex: "hazard", "europe", "warning").
- [ ] Barra de ícones recentes funcional, persistindo os últimos 8 itens usados no IndexedDB.
- [ ] Ícones recentes reaparecem automaticamente após recarregar a página.
- [ ] Feedback tátil com som `UISM.TAP` ao selecionar ou arrastar itens dos recentes.
