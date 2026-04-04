# Task 24: Otimização de Lote (Web Workers)

## Objetivo
Mover a lógica de renderização massiva e geração de PDF para um **Web Worker**, garantindo que a Thread Principal (UI) permaneça fluida (60 FPS) mesmo durante o processamento de grandes conjuntos de dados.

## Workflow
1. `git checkout -b task/24-batch-workers`
2. Criar `src/domain/services/BatchWorker.ts`.
3. Refatorar `PDFGenerator.ts` para delegar o trabalho pesado.

## Detalhamento
- **OffscreenCanvas:** Utilizar o `OffscreenCanvas` dentro do Worker para renderizar as etiquetas sem tocar no DOM.
- **Worker Messaging:** Implementar um protocolo de comunicação (postMessage) que reporte o progresso em tempo real (ex: "Processando 45/200").
- **UI Feedback:** Criar um indicador de progresso (spinner ou barra) no `Batch Studio` que reaja às mensagens do Worker.
- **Memory Management:** Garantir que o Worker limpe as referências de canvas após cada página para evitar vazamentos de memória (Memory Leaks).

## Critérios de Aceite
- [ ] A aplicação permite interagir com a Toolbar ou Inspector enquanto o PDF está sendo gerado em segundo plano.
- [ ] O usuário vê uma barra de progresso real.
- [ ] Suporte a lotes de 100+ etiquetas sem aviso de "Página sem resposta".
