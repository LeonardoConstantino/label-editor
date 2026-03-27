# Task 04: Layout Principal e EditorCanvas

## Objetivo
Criar a estrutura visual base do editor e o Web Component `EditorCanvas` que exibe a etiqueta e reage a mudanças no Store.

## Arquivos de Entrada
- `index.html`
- `src/components/editor/EditorCanvas.ts` (A criar)
- `Design_System.md`

## Detalhamento da Execução
1. **Main Layout:** Estruturar o `body` com fundo `canvas` (#0f1115), toolbar superior e painéis laterais.
2. **Web Component EditorCanvas:**
   - Shadow DOM encapsulado.
   - Canvas responsivo centralizado.
   - Assinatura do `state:change` do Store para redesenhar via `CanvasRenderer`.
3. **Interaction:** Emitir `element:select` via EventBus ao clicar no canvas.
4. **Design System:** Aplicar `panel-glass` e sombras conforme o guia.

## Critérios de Aceite
- [ ] O canvas aparece centralizado com fundo branco (etiqueta) sobre fundo escuro (editor).
- [ ] O canvas redesenha automaticamente quando o Store emite novo estado.
- [ ] Layout responsivo usando Grid/Flexbox do Tailwind v4.
- [ ] Teste básico de montagem do Web Component.
