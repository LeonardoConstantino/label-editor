# Task 05: Toolbar e Adição de Elementos

## Objetivo
Implementar a barra de ferramentas superior para adicionar novos elementos (texto, imagem, formas) ao canvas e controlar o zoom/desfazer.

## Arquivos de Entrada
- `src/components/editor/Toolbar.ts` (A criar)
- `src/core/EventBus.ts`
- `Design_System.md`

## Detalhamento da Execução
1. **Componente Visual:** Criar botões compactos (`h-12`) com ícones para cada tipo de elemento.
2. **Emissão de Eventos:** Ao clicar em "Adicionar Texto", emitir `element:add` com um objeto `TextElement` padrão.
3. **Controles de Histórico:** Botões para Undo/Redo que invocam os métodos correspondentes no Store via EventBus.
4. **Design System:** Implementar estados de hover/active com a física de mola (`btn-juice`) e feedback visual `bg-white/5`.
5. **Testes:** Verificar se o clique nos botões dispara os eventos esperados no `EventBus`.

## Critérios de Aceite
- [ ] Botões para Texto, Retângulo, Círculo e Imagem funcionais.
- [ ] Botões de Undo/Redo desabilitados quando não houver histórico disponível.
- [ ] Visual segue estritamente a Toolbar Superior do `Design_System.md`.
- [ ] Testes unitários confirmam a emissão correta de `element:add`.
