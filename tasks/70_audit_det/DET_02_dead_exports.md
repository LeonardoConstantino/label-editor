# Task 02: Cleanup de Exportações e Membros Órfãos [DET-DEAD]

## Objetivo
Remover a visibilidade pública de símbolos que são usados apenas internamente em seus arquivos e excluir membros de classe que não são invocados, reduzindo a superfície de API e otimizando o bundle.

## Arquivos de Entrada e Símbolos (Fallow Report)
- `src/components/common/icon.ts`: `ICONS` (export desnecessário)
- `src/core/Database.ts`: `DATABASE_NAME`, `DATABASE_VERSION`
- `src/core/Logger.ts`: `LogLevel`, `Logger` class (instância `logger` exportada é suficiente)
- `src/core/Store.ts`: `Store` class (instância `store` exportada é suficiente)
- `src/core/UISoundManager.ts`: `UISoundManager` class (instância `UISM` exportada é suficiente)
- `src/domain/services/HistoryManager.ts`: `HistoryManager` class
- `src/domain/services/OverflowValidator.ts`: `OverflowValidator` class
- `src/domain/services/PDFGenerator.ts`: `PDFGenerator` class
- `src/domain/services/PreferenceManager.ts`: `PreferenceManager` class
- `src/utils/os-detection.ts`: `metaKey`, `metaKeyName`, `isMac`, `isMobile`, `detectOS`, `detectIsMobile`.

## Membros de Classe Órfãos (Top Triage)
- `src/components/common/modal.ts`: `toggle`, `isOpen`, `variant`, `size`.
- `src/components/editor/inspector/InspectorLayerCard.ts`: `element` (getter/setter), `selected`, `hasOverflow`, `warningMessage`.
- `src/components/common/AppInput.ts`: `value`, `type`.
- `src/components/common/ui-hud-tips.ts`: `setTips`, `pause`, `resume`.

## Detalhamento da Execução
1. **Redução de Escopo:** Remover `export` de constantes e classes que possuem instâncias exportadas por padrão ou são de uso puramente interno.
2. **Pruning de Métodos:** Remover métodos e propriedades de classe que não possuem referências ativas (verificar via `grep` antes de deletar).
3. **PWA Register:** Como o arquivo foi renomeado para `.disabled`, as exportações `registerSW` e `updateServiceWorker` não contam como ativas.

## Critérios de Aceite
- [x] `fallow dead-code` reporta 0 unused exports para os arquivos acima.
- [x] Redução de pelo menos 40 membros de classe órfãos.
- [x] `npm run build` passa com sucesso.
