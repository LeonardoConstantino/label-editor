# Task 81: Encapsulamento de Stack via CSS Isolation

## Objetivo
Implementar a utilitária `isolate` do Tailwind CSS (CSS `isolation: isolate`) para estabilizar o empilhamento de camadas (z-index) no cockpit e nos componentes de UI, eliminando hacks de elevação manual.

## Por que usar Isolation?
O `isolation: isolate` cria um novo Stacking Context sem a necessidade de definir `z-index` ou `position`. Isso impede que elementos internos (como dropdowns e tooltips) "lutem" com o resto da aplicação e garante que efeitos como `mix-blend-mode` e `filter` fiquem contidos no componente.

## Workflow
1. `git checkout -b task/81-css-isolation`
2. **Global Sidebar:** Adicionar a classe `isolate` ao `<aside class="panel-glass">` no `index.html`.
3. **AppCockpit:** Adicionar `isolation: isolate` ao `:host` no `src/components/editor/AppCockpit.ts` para conter o ModuleRack.
4. **InspectorLayerCard:** 
   - Adicionar `isolation: isolate` ao `:host`.
   - Avaliar a remoção da lógica de `.elevated` (z-index: 100) usada para abrir selects.
5. **Clean-up:** Revisar valores exorbitantes de `z-index` (ex: 10000) no `AppSelect` e `ModuleRack` para valores mais semânticos dentro de seus contextos isolados.

## Critérios de Aceite
- [x] Dropdowns do `AppSelect` dentro de um `InspectorLayerCard` sobrepõem corretamente o card abaixo sem necessidade de elevação manual do card pai.
- [x] O menu do `ModuleRack` abre sobre o workspace sem interferir na renderização de outros componentes globais.
- [x] A performance de renderização permanece estável (isolation é uma propriedade leve para o browser).
- [x] O código visual fica mais limpo, usando a hierarquia natural do DOM dentro de contextos protegidos.
