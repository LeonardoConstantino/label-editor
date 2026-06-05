# Task 02: Cleanup de Exportações e Membros Órfãos

## Objetivo
Remover a visibilidade pública de símbolos que são usados apenas internamente em seus arquivos e excluir membros de classe que não são invocados, visando otimização de bundle e clareza de API.

## Arquivos de Entrada
- `src/utils/os-detection.ts`
- `src/core/Database.ts`
- `src/core/Logger.ts`
- `src/core/Store.ts`
- `src/core/UISoundManager.ts`
- `src/components/common/modal.ts`
- `src/components/editor/inspector/InspectorLayerCard.ts`

## Detalhamento da Execução
1. **Redução de Escopo:** Para os 21 "Unused exports" identificados, remover a palavra-chave `export` se o símbolo for usado localmente, ou remover o símbolo inteiramente se for órfão.
2. **Pruning de Membros de Classe:** Remover os 55 membros de classe não referenciados (ex: `UiModal.toggle`, `InspectorLayerCard.element` setter, etc).
3. **Verificação de Reflexão:** Garantir que nenhum desses membros é acessado via strings dinâmicas (ex: `this[someVar]`).

## Critérios de Aceite
- [ ] `fallow dead-code` não reporta mais "Unused exports" para os arquivos auditados.
- [ ] O número de "Unused class members" cai para zero.
- [ ] `npm run build` passa, confirmando que nenhuma referência externa foi quebrada.
