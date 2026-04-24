# Task 06: Inspector de Propriedades

## Objetivo
Criar o painel lateral que permite editar as propriedades (posição, tamanho, cor, conteúdo) do elemento selecionado.

## Arquivos de Entrada
- `src/components/editor/ElementInspector.ts` (A criar)
- `src/core/Store.ts`

## Detalhamento da Execução
1. **Binding:** Ouvir mudanças de seleção no Store.
2. **Inputs Dinâmicos:** Renderizar diferentes formulários baseados no tipo do elemento (ex: cor para formas, texto para labels).
3. **Live Update:** Emitir `element:update` no EventBus a cada mudança de input (com debounce para performance).
4. **Juice:** Aplicar micro-interações de hover nos inputs conforme `Design_System.md`.

## Critérios de Aceite
- [x] O painel exibe as propriedades corretas ao selecionar um elemento.
- [x] Mudar um valor no inspector reflete instantaneamente no canvas.
- [x] Inputs seguem o estilo `bg-black/20` com labels em uppercase minúsculo.
- [x] Teste de integração: simular input e verificar se o Store recebeu o evento de atualização.
