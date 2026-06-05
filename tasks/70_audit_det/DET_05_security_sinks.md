# Task 05: Refatoração de Sinks HTML (CWE-79) [DET-SEC]

## Objetivo
Resolver os 23 candidatos a "Dangerous HTML sink" identificados deterministicamente pelo Fallow. O foco é garantir que nenhum dado controlado pelo usuário toque o DOM sem escape rigoroso.

## Arquivos e Sinks (Fallow Report)
- `src/components/common/icon.ts:506`: `svg.innerHTML = content` (Embora sanitizado, o Fallow alerta o uso de innerHTML).
- `src/components/editor/modules/AssetLibrary.ts:241`: `grid.innerHTML = filtered.map(...)`.
- `src/components/common/KeyboardShortcuts.ts:238, 294`: Injeção de teclas e sequências.
- `src/components/common/UiAlignCluster.ts:189, 232`: Headers e botões.
- `src/components/common/ui-variable-badge.ts:339`: Nome da variável no tooltip.
- `src/components/editor/inspector/InspectorLayerCard.ts:167, 185`: Labels de camadas.
- `src/components/editor/modules/HistoryVisualizer.ts:133`: Descrição do snapshot.
- `src/components/editor/modules/TypefaceEngine.ts:121`: Listagem de fontes.
- `src/components/editor/modules/VariableManager.ts:214, 242`: Pipeline de dados.
- `src/components/common/toast.ts:474`: Corpo da mensagem (usar textContent).
- `src/components/common/ui-hud-tips.ts:581, 592`: Motor de parse de dicas.
- `src/components/editor/VaultGallery.ts:184, 194`: Previews de cartuchos.
- `src/components/preview/DataSourceInput.ts:269, 362`: Header da tabela de preview.

## Detalhamento da Execução
1. **Refatoração Seletiva:** Substituir `innerHTML` por `.textContent` onde for texto puro (ex: toasts, badges, nomes de variáveis).
2. **Escaping Rigoroso:** Onde HTML estrutural for necessário, garantir que todos os dados dinâmicos interpolados passem por `DataSanitizer.escapeHTML()`.
3. **Template Guard:** Preferir o uso de `TEMPLATE.content.cloneNode()` para estruturas estáticas.

## Critérios de Aceite
- [ ] `fallow security` reporta zero candidatos de nível crítico para os arquivos acima.
- [ ] `npm test` passa sem regressões.
- [ ] Verificação manual de que caracteres como `<` e `>` não executam código na UI.
