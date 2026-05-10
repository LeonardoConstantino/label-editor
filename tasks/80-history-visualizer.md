# Task 80: History Visualizer (The Time Machine)

## Objetivo
Criar o módulo "History Visualizer" para o Rack de Cartuchos. Ele atua como um painel visual do histórico de Undo/Redo do `Store`. Ao invés de ser apenas uma lista de ações, ele aproveita o fato da arquitetura usar *ImageData Snapshots* para exibir uma fita de película cronológica (Chronological Tape) com miniaturas de cada estado da etiqueta. O usuário pode viajar no tempo com um clique preciso.

## Workflow
1. `git checkout -b task/80-history-visualizer`
2. **Criação do Componente:** Criar `src/components/editor/modules/HistoryVisualizer.ts`.
3. **Escuta Contínua (Spy):** O componente deve assinar os eventos `history:snapshot`, `history:undo`, `history:redo` no `EventBus` para sempre manter a lista perfeitamente sincronizada com o `HistoryManager`.
4. **Resgate do Canvas:** Extrair a imagem base64 diretamente do snapshot (`ImageData`) para criar as miniaturas em tempo real no painel.

## Detalhamento de UI/UX (Tactile Prism)

### 1. Layout da Fita Cronológica (Chronological Tape)
- **A Linha do Tempo:** Uma linha fina de 2px na extrema esquerda do container (`border-l-2 border-border-ui`), conectando os nós do passado ao presente.
- **O Bloco do "Agora" (Current State):** O estado atual (topo da lista visível) fica brilhando. O nó da linha é aceso em `bg-accent-success`, e a borda da miniatura acende em verde/indigo.
- **Os Nós (Snapshots):** Cada item do histórico tem 3 elementos visuais:
  - O Círculo na linha do tempo (Ponto de parada).
  - A Miniatura (A imagem reduzida do Canvas naquele milissegundo).
  - O Rótulo da Ação geradora: Ex. `Adicionou "Texto"`, `Moveu Elementos`, `Power Layout Alinhado`.

### 2. O Juice Temporal (Hover e Clique)
- **O Deslize Fantasma:** Quando o usuário passa o mouse por um nó de 15 passos atrás no tempo, a miniatura dele cresce (scale) ligeiramente.
- **A Morte do Futuro Alternativo:** Se o usuário viajar para o passado (ex: clica no Snapshot 5 de um total de 20), ele não perde os passos 6 a 20 imediatamente (afinal ele pode querer avançar de novo). 
  - *Feedback Visual:* Os nós 6 a 20 ficam com 30% de opacidade e recebem uma classe de Glitch estático ou blur. Eles viraram uma "Linha do Tempo Alternativa". Assim que ele fizer uma nova edição no Canvas a partir do passo 5, o futuro (6 ao 20) é instantaneamente desintegrado no painel.

### 3. A Mecânica do Scroll Mecânico
- Esse painel pode ter dezenas de itens. O componente de scrollbar que definimos globalmente cuidará da aparência, mas precisamos que a rolagem dentro deste módulo passe a sensação de engrenagem.
- **Sound Design da Roda do Mouse:** Conectar o evento `wheel` (scroll) sobre este painel ao `UISoundManager`. A cada `X` pixels rolados, emite um *micro-tic* (o som rotatório que definimos pro Number Scrubber). O usuário sente que está rebobinando uma fita VHS fisicamente!

### 4. Controle Master (Topbar do Painel)
- Um botão herói vermelho escuro: `[ CLEAR HISTORY CACHE ]`.
- Libera a memória RAM consumida pelas dezenas de *ImageDatas* (muito importante para máquinas fracas). Ao clicar, emite o som de *Delete* (Vaporize) e a fita apaga, deixando apenas o "Estado Atual" como marco zero (Genesis).

## Critérios de Aceite
- [ ] O módulo carrega e lista o histórico perfeitamente baseado no `HistoryManager` real do core.
- [ ] Miniaturas são geradas em baixa resolução (para performance) capturando a tela exata daquele snapshot.
- [ ] Clicar em um nó passado invoca o `history.undo()` múltiplas vezes sob os panos, sem travar o navegador, até o Canvas chegar naquele ponto exato.
- [ ] A navegação no painel visual aciona a lógica existente de Undo/Redo sem introduzir loops infinitos de eventos no EventBus.

---

### ⚠️ Dica para o Agente de IA (Arquitetura)
Lidar com 50 instâncias de `ImageData` gigantes no DOM ao mesmo tempo para fazer miniaturas pode crashar a aba do Chrome. Renderize a miniatura **desenhando a `ImageData` num `<canvas width="80" height="80">` escondido na memória e convertendo para `.toDataURL('image/jpeg', 0.5)`** antes de jogar na tag `<img>` do painel visual. Isso salva MBs massivos de RAM.
