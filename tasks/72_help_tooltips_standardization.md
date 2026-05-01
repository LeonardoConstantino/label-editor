# Task 72: Padronização de Tooltips de Ajuda (Contextual Help)

## Objetivo
Padronizar a experiência de ajuda rápida no Inspector, adicionando tooltips ricas em todas as seções especialistas (Nível 3). Assim como na seção de texto, cada grupo de propriedades deve ter um guia técnico acessível via ícone de interrogação, explicando comportamentos como scrubbing, fórmulas, modos de ajuste e estilos.

## Workflow
1. `git checkout -b task/72-help-tooltips`
2. **Mapeamento de Conteúdo:**
   - **Transform:** Explicar atalhos de scrubbing (Shift/Alt) e suporte a fórmulas matemáticas.
   - **Rect:** Explicar comportamento de Border Radius e Stroke.
   - **Image:** Detalhar a diferença entre os Fit Modes e o impacto do Smoothing na performance.
   - **Border:** Listar estilos de borda suportados e lógica de arredondamento.
3. **Componentização:** Integrar o componente `<ui-tooltip>` com o slot `tooltip-rich-panel` em cada seção correspondente.
4. **Design Sync:** Garantir que todos os tooltips usem a mesma iconografia (`help`) e estrutura visual (Header com ícone, corpo com grid/lista de comandos e footer com tip).

## Critérios de Aceite
- [ ] Todas as seções do Nível 3 possuem ao menos um ponto de ajuda contextual.
- [ ] O conteúdo das tooltips é tecnicamente preciso e segue o estilo visual "Tactile Prism".
- [ ] O posicionamento das tooltips não obstrui os inputs principais durante a interação.
- [ ] Zero regressão na performance de renderização do Inspector.
