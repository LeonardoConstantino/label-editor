# Task 05: Refatoração de Sinks HTML (CWE-79)

## Objetivo
Corrigir candidatos a "Dangerous HTML sink" identificados pelo Fallow em componentes de UI que injetam dados não-literais no DOM.

## Arquivos de Entrada
- `src/components/common/KeyboardShortcuts.ts`
- `src/components/common/UiAlignCluster.ts`
- `src/components/common/ui-variable-badge.ts`
- `src/components/editor/modules/VariableManager.ts`
- `src/components/common/ui-hud-tips.ts`
- `src/components/editor/VaultGallery.ts`
- `src/components/preview/DataSourceInput.ts`
- `src/components/common/toast.ts`

## Detalhamento da Execução
1. **Auditoria de Sink:** Para cada arquivo listado, localizar a linha onde `innerHTML` ou `TEMPLATE.innerHTML` recebe uma variável não escapada.
2. **Refatoração para textContent:** Onde o conteúdo for apenas texto (ex: badges, labels), substituir `innerHTML` por `textContent`.
3. **Escaping Mandatório:** Onde HTML estrutural for necessário (ex: `KeyboardShortcuts.ts` formatando teclas `<kbd>`), garantir que a variável interna (o nome da tecla) passe por `DataSanitizer.escapeHTML()` antes da interpolação.
4. **Resgate de ui-hud-tips:** O motor de dicas que utiliza `parseTip()` deve garantir que as tags geradas são seguras e o conteúdo injetado está limpo.

## Critérios de Aceite
- [ ] Substituição de `innerHTML` por `textContent` em pelo menos 60% dos sinks reportados.
- [ ] Uso de `escapeHTML` em todos os sinks remanescentes que exigem HTML estrutural.
- [ ] `fallow security` reporta zero candidatos de nível crítico para estes arquivos.
