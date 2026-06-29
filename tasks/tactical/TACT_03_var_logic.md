# Task TACT-03: Refatoração da Lógica de Variáveis (VariableManager)

## Objetivo
Diferenciar programaticamente o que é uma variável de dataset (`{{nome}}`) e o que é uma variável de contexto do sistema (`{{index}}`), evitando falsos positivos de "missing variable".

## Arquivos de Entrada
- `src/components/editor/modules/VariableManager.ts`

## Detalhamento da Execução
1. **Identificação:** Atualizar a lógica de parseamento para identificar o prefixo/origem da tag.
2. **UI/UX:** Atualizar a UI para que variáveis de contexto não sejam exibidas como "Missing" se não houver valor no dataset (pois o contexto é resolvido em runtime).

## Critérios de Aceite
- [ ] Variáveis de contexto não são mais marcadas como "missing" erradamente.
- [ ] Interface de variáveis claramente separa dados de usuário de dados de sistema.
