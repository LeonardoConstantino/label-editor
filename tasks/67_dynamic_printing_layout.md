# Task 67: Suporte a Impressão Dinâmica (Orientation & Custom Paper)

## Objetivo
Flexibilizar o gerador de PDF para suportar etiquetas horizontais (paisagem), formatos de papel maiores que A4 e detecção automática do melhor layout de página.

## Workflow
1. `git checkout -b task/67-dynamic-printing-layout`
2. **Core (PDFGenerator.ts):**
   - Refatorar `generateLotePDF` para remover constantes de A4 e Portrait.
   - Adicionar parâmetros `format` (ex: 'a4', 'a3', 'letter') e `orientation` ('p', 'l').
   - Implementar cálculo dinâmico de `PAGE_WIDTH` e `PAGE_HEIGHT` baseado na escolha do papel.
3. **Inteligência de Layout:**
   - Adicionar lógica que sugere a orientação 'landscape' se `widthMM > heightMM`.
   - Tratar etiquetas gigantes (overflow): permitir que uma etiqueta ocupe múltiplas páginas ou force um papel maior.
4. **Interface (Batch Modal):**
   - Incluir select para "Paper Size" e toggle para "Orientation".

## Critérios de Aceite
- [ ] O usuário pode gerar um PDF em formato A3.
- [ ] Etiquetas horizontais são impressas corretamente no modo Paisagem sem cortes laterais indevidos.
- [ ] O layout de múltiplas colunas se adapta corretamente à nova largura de página disponível.
