# Task 24: Otimização de Lote & Qualidade (Web Workers & Compression)

## Objetivo
Mover a lógica de renderização massiva e geração de PDF para um **Web Worker** e implementar controles de compressão/qualidade. O objetivo é garantir que a UI permaneça fluida e que arquivos PDF com muitas etiquetas coloridas não atinjam tamanhos proibitivos (ex: 150MB para 61 unidades).

## Workflow
1. `git checkout -b task/24-batch-workers`
2. **Core Optimization:** 
   - Refatorar `PDFGenerator.ts` para suportar níveis de compressão (JPEG vs PNG).
   - Adicionar parâmetro `exportQuality` (0.1 a 1.0) às `BatchLayoutOptions`.
3. **Web Worker:** Criar `src/domain/services/BatchWorker.ts` para processar a renderização via `OffscreenCanvas`.
4. **UI Integration:** Adicionar controles de "Output Quality" no `DataSourceInput`.

## Detalhamento Técnico
- **Compression Strategy:** Trocar `canvas.toDataURL('image/png')` por `image/jpeg` com qualidade variável. PNGs em alta resolução sem compressão são a causa principal de arquivos gigantes.
- **OffscreenCanvas:** Renderizar etiquetas no Worker para liberar a Main Thread.
- **Memory Management:** Descartar blobs e referências de imagem imediatamente após a inserção no PDF.
- **Progress Protocol:** O Worker deve emitir progresso percentual para a UI.

## Opções de Qualidade (Nova Feature)
O usuário deve poder escolher entre:
- **Draft (Fast/Small):** 72 DPI, JPEG Quality 0.5.
- **Standard (Balanced):** 150 DPI, JPEG Quality 0.8.
- **High-Res (Print Ready):** 300 DPI, PNG (Lossless).

## Critérios de Aceite
- [x] Geração de 100+ etiquetas sem travar a interface.
- [x] Redução drástica no tamanho do arquivo (etiquetas coloridas em lote não devem exceder 20-30MB em modo Standard).
- [x] Barra de progresso real exibida durante o processamento.
- [x] Seletor de qualidade funcional no Production Cockpit.
