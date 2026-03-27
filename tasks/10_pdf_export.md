# Task 10: Geração de PDF e Exportação Final

## Objetivo
Gerar um arquivo PDF pronto para impressão, contendo todas as etiquetas do lote, respeitando as dimensões reais (mm).

## Arquivos de Entrada
- `src/domain/services/PDFGenerator.ts` (A criar)
- `src/domain/services/CanvasRenderer.ts`

## Detalhamento da Execução
1. **jsPDF Integration:** Usar a biblioteca `jsPDF` para criar o documento em mm.
2. **High-Res Rendering:** Renderizar as etiquetas em um canvas oculto com DPI alto (300+) para garantir nitidez na impressão.
3. **Paging:** Organizar as etiquetas nas páginas do PDF (ex: várias etiquetas por folha A4).
4. **Download:** Trigger de download do arquivo `.pdf` final.
5. **Testes:** Verificar se o PDF gerado tem as dimensões de página corretas.

## Critérios de Aceite
- [ ] O PDF exportado mantém a qualidade das imagens e nitidez do texto.
- [ ] As dimensões físicas no PDF coincidem com as configuradas no editor (ex: etiqueta de 50x30mm).
- [ ] Suporte para geração de lotes com 100+ etiquetas sem travar o navegador (uso de workers se necessário).
- [ ] Critério binário: PDF aberto em leitor mostra as medidas corretas.
