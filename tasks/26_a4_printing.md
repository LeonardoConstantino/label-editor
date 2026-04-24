# Task 26: Layout de Impressão A4 (Multi-etiqueta)

## Objetivo
Implementar a capacidade de organizar múltiplas etiquetas em uma única página A4 para impressão, otimizando o uso do papel. O preview deve ser uma representação fiel da folha física.

## Workflow
1. `git checkout -b task/26-a4-printing`
2. Modificar `src/components/preview/DataSourceInput.ts` e `src/styles/main.css`.

## Detalhamento
- **Configuração de Layout:** Adicionar controles para definir margens da página, espaçamento entre etiquetas (gap) e número de colunas/linhas (ou cálculo automático baseado no tamanho da etiqueta).
- **A4 Preview:** Criar um container visual que represente a folha A4 (210x297mm) e distribua as etiquetas nela seguindo a escala do preview.
- **CSS Print Refinement:** Atualizar o `@media print` para usar CSS Grid ou Flexbox que se ajuste perfeitamente à página física, garantindo que não haja cortes entre as folhas.
- **Precisão:** Garantir que 10mm no editor correspondam exatamente ao espaço físico na folha impressa.

## Critérios de Aceite
- [x] O usuário pode visualizar como as etiquetas serão distribuídas em folhas A4 antes de imprimir.
- [x] A impressão real (Ctrl+P) respeita o layout de grade configurado.
- [ ] Suporte a "sangria" e marcas de corte opcionais (via PDF Generator).
- [x] Cálculo dinâmico de etiquetas por folha A4 no preview.
