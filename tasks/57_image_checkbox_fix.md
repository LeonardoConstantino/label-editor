# Task 57: Correção de Estilo e Layout do Checkbox (Image Card)

## Objetivo
Padronizar o estilo do checkbox de suavização de imagem seguindo o padrão **Tactile Switch** do sistema de design e corrigir o vazamento de layout dentro do Inspector.

## Workflow
1. `git checkout -b task/57-image-checkbox-fix`
2. **Análise Profunda:** Identificar por que o estilo customizado de `input[type='checkbox']` definido no `main.css` não está sendo aplicado corretamente ou se está sendo deformado pelas regras de flexbox da classe `.row-ui`.
3. Modificar `src/components/editor/ElementInspector.ts`.

## Detalhamento da Execução
1. **Refatoração do Template:**
   - No `ElementInspector.ts`, localizar a renderização do campo `smoothing` para elementos de imagem.
   - Substituir a estrutura atual por uma que utilize `justify-content: space-between` e alinhe o switch à direita, consistente com a seção de Preferências.
2. **Correção de CSS:**
   - Garantir que o checkbox herde o estilo global de switch (36x20px, background preto, botão cinza/indigo).
   - Impedir que o flexbox estique o checkbox (usando `flex: none`).
3. **Validação de UX:**
   - Testar o comportamento de clique e a visibilidade do estado "Checked" (Glow Neon Indigo).

## Critérios de Aceite
- [ ] O checkbox de imagem possui o visual de "Switch" tátil.
- [ ] O componente está perfeitamente alinhado e contido dentro do card.
- [ ] A label "Smoothing" utiliza a tipografia técnica do sistema.
- [ ] O estado do switch é persistido corretamente no Store ao ser alterado.
