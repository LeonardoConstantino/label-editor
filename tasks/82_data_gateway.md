# Task 82: Data Gateway Module (Unified Data Entry)

## Objetivo
Criar o componente `<ui-data-gateway>` para unificar a entrada manual de listas e o upload de arquivos via Drag & Drop. Este componente substituirá a zona de drop atual do `DataSourceInput` e servirá como porta de entrada para o Production Studio.

## Especificações Funcionais
- **Entrada Manual:** Um `textarea` estilizado (monospace) onde o usuário pode digitar ou colar listas (um registro por linha).
- **Scanner de Arquivos:** Quando um arquivo (CSV, JSON, TXT) é arrastado sobre o componente, a interface sofre uma "Metamorfose Visual".
- **Parsing Automático:**
    - Texto manual -> Converte em `[{ nome: linha1 }, { nome: linha2 }, ...]`
    - Arquivos -> Usa o `DataSourceParser` para converter em array de objetos.
- **Evento de Saída:** Emite `data-ready` com o array de objetos processado e o nome da fonte (arquivo ou "Manual List").

## Metamorfose Visual (Juice)
- **Estado Base:** Aparência de um bloco de notas dark. Placeholder: *"Type a list or drop a file here..."*
- **Estado Dragging:**
    - Overlay azul/índigo translúcido.
    - Ícone de documento cresce e pulsa.
    - Uma linha horizontal de "Scanner" desce repetidamente.
    - O texto do placeholder muda para *"Release to Scan Data..."*

## Workflow de Implementação
1. `git checkout -b task/82-data-gateway`
2. Criar `src/components/common/UiDataGateway.ts`.
3. Integrar com `DataSourceParser` para lidar com a conversão de tipos.
4. Refatorar `src/components/preview/DataSourceInput.ts` para utilizar o novo componente no lugar do `drop-zone` atual.
5. Adicionar feedback sonoro: `NOTIFY` ao detectar dados válidos.

## Critérios de Aceite
- [x] O componente alterna visualmente entre modo "Notepad" e "Scanner" durante o drag-over.
- [x] Colar uma lista de nomes no textarea e clicar em um botão (ou via auto-save) gera os registros corretamente.
- [x] Arrastar um arquivo CSV processa os dados e emite o evento `data-ready`.
- [x] O visual segue rigorosamente o padrão *Tactile Prism* (glassmorphism, monospace).
