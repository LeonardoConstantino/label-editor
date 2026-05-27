# Task 91: Refatoração do PreferencesModal (Arquitetura de Orquestrador)

## Objetivo
Decompor o monolito `PreferencesModal.ts` (~820 linhas) em componentes menores e especializados, visando manutenibilidade, separação de responsabilidades e seguindo o limite ideal de ~200 linhas por arquivo.

## Arquitetura Proposta
- **Orquestrador:** `src/components/preferences/PreferencesModal.ts` (Gerencia Sidebar e navegação).
- **Estilos:** `src/components/preferences/PreferencesStyles.ts` (CSS centralizado da interface de configurações).
- **Seções (Dumb Components):**
  - `sections/PrefSectionGeneral.ts`
  - `sections/PrefSectionGrid.ts` (Incluindo lógica de Canvas Preview)
  - `sections/PrefSectionSnapping.ts`
  - `sections/PrefSectionUI.ts`
  - `sections/PrefSectionPerf.ts`
- **Contrato:** Cada seção deve estender `HTMLElement`, receber o objeto `preferences` via setter e disparar eventos padrão de mudança.

## Workflow de Refatoração
1. `git checkout -b task/91-preferences-refactor`
2. Criar sub-diretório `src/components/preferences/sections/`.
3. Extrair `settingsSheet` para `PreferencesStyles.ts`.
4. Implementar cada seção como um Web Component isolado.
5. Simplificar o `PreferencesModal.ts` para ser apenas o container de abas.
6. **Smoke Testing:** Criar testes automatizados que validam a abertura do modal e a persistência de uma mudança simples.

## Critérios de Aceite
- [ ] O arquivo principal `PreferencesModal.ts` deve ter menos de 250 linhas.
- [ ] Zero regressão de funcionalidades (Grid Preview, Reset System e Tooltips devem continuar funcionando).
- [ ] A sincronização atômica deve ser mantida (mudar um valor em uma aba não deve perder o foco).
- [ ] Smoke testes passando (`npm test`).

---
**Status:** Planejado (Fase E - Manutenibilidade) 🏗️💎
