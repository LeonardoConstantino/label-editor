# Task 69: Componente UI Select & Presets de Canvas

## Objetivo
Criar um componente de seleção (`ui-select`) modular e utilizá-lo para implementar presets de tamanhos de etiquetas no Setup do Canvas, melhorando a agilidade na criação de novos projetos.

## Workflow
1. `git checkout -b task/69-ui-select-presets`
2. **Desenvolvimento do Componente:**
   - Criar `src/components/common/AppSelect.ts`.
   - Implementar uma interface limpa que aceite `options` (Array de objetos) e um valor `current`.
   - Aplicar o estilo "Prism": Menu dropdown com backdrop-blur, animação de slide, e estados de hover indigo.
3. **Mapeamento de Presets:**
   - Adicionar uma constante `LABEL_PRESETS` em `src/constants/defaults.ts`.
   - Incluir formatos comuns: `Small (30x20)`, `Medium (50x30)`, `Large (100x50)`, `Shipping (100x150)`, `A4 Full`, etc.
4. **Integração no Inspector:**
   - No `ElementInspector.ts`, adicionar o select no topo da seção "Canvas Setup".
   - Sincronizar a seleção com os scrubbers de largura/altura.
   - Detecção Automática: Se o usuário editar as dimensões manualmente, o select deve mudar para "Custom".

## Critérios de Aceite
- [x] O componente `ui-select` funciona corretamente e é acessível via teclado.
- [x] O layout do Inspector permanece coeso com a adição do novo campo.
- [x] Escolher um preset atualiza o Canvas e o PDFGenerator instantaneamente.
- [x] O componente é extensível para futuros usos (mapeado e pronto para expansão).
