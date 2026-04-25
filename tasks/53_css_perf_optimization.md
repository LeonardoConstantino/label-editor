# Task 53: Otimização de Performance e Injeção de CSS (Constructable Stylesheets)

## Objetivo
Eliminar a redundância de CSS e o overhead de parsing nos Web Components, migrando da injeção de strings via `<style>` para o uso de **Constructable Stylesheets** (`adoptedStyleSheets`), reduzindo o consumo de memória e CPU.

## Workflow
1. `git checkout -b task/53-css-perf-optimization`
2. **Análise Profunda:** Verificar a compatibilidade do navegador com `adoptedStyleSheets` (suporte amplo em navegadores modernos) e planejar a migração de `shared-styles.ts` de uma string para um objeto `CSSStyleSheet` compartilhado.
3. Refatorar `src/utils/shared-styles.ts`.
4. Atualizar todos os componentes em `src/components/` para remover o uso de `${sharedStyles}` dentro de templates literais.

## Detalhamento da Execução
1. **Refatoração do Core de Estilos:**
   - No arquivo `src/utils/shared-styles.ts`, criar e exportar uma instância de `CSSStyleSheet`.
   - Utilizar `sheet.replaceSync(mainStyles)` para carregar o CSS do Tailwind v4 uma única vez.
2. **Migração dos Componentes:**
   - Localizar todos os componentes que utilizam `sharedStyles` no Shadow DOM.
   - Aplicar `this.shadowRoot.adoptedStyleSheets = [sharedSheet]` no momento da inicialização (constructor ou connectedCallback).
   - Manter estilos específicos de componentes em tags `<style>` locais pequenas e otimizadas.
3. **Validação de Performance:**
   - Observar se a árvore do DOM no DevTools ficou mais limpa (sem tags `<style>` gigantescas repetidas em cada Shadow Root).
   - Garantir que a renderização inicial (First Contentful Paint) não sofra regressão.

## Critérios de Aceite
- [x] O CSS global é processado apenas uma vez, independentemente do número de componentes na tela.
- [x] Estilos visuais permanecem idênticos em todos os componentes.
- [x] Remoção de todas as instâncias de `${sharedStyles}` de dentro de strings `innerHTML`.
- [x] O projeto continua funcionando corretamente após o build de produção (`npm run build`).
