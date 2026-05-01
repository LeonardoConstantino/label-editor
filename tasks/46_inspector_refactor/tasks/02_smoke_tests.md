# Task 02: Smoke Tests do Inspector Original

## Objetivo
Escrever testes de comportamento (smoke tests) que validem o funcionamento atual do `ElementInspector` em cenários chave. Estes testes serão usados como regressão após a refatoração, garantindo que nenhum comportamento se perca.

## Arquivos de Entrada
- `src/ui/inspector/ElementInspector.ts` (original)
- Pasta de testes existente (se houver) — utilizar o mesmo runner (provavelmente Vitest + Testing Library ou JSDOM). Se não existir, criar configuração mínima.

## Detalhamento da Execução

1. **Configurar ambiente de teste** (se inexistente):
   - Adicionar dependências: `vitest`, `@testing-library/dom`, `jsdom`.
   - Criar um setup que registre o custom element `<element-inspector>` e forneça stubs para `eventBus`, `store`, `UISM`, `logger`, e os componentes filhos (`app-input`, `ui-number-scrubber`, etc.).
   - Garantir que o `sharedSheet` seja mockado para não quebrar.

2. **Escrever cenários críticos**:
   - **Renderização da view de documento**: quando `selectedId = null`, exibe `LABEL SETUP` e os inputs de config (W, H, DPI, etc.).
   - **Renderização de um card de elemento selecionado**: com um `TextElement`, verifica se aparecem os campos de `Transform`, `Typography`, e botões UP/DEL.
   - **Renderização de uma lista de elementos** (sem seleção): cada card deve mostrar o header (type, name, ícone de visibilidade) mas não as propriedades.
   - **Evento de input**: ao modificar um `ui-number-scrubber`, deve disparar `element:update` no `eventBus` com o payload correto (prop composto, ex: `{ position: { x: 10 } }`).
   - **Ações de card**: clique em `UP` emite `element:reorder`, clique em `DEL` emite `element:delete`, clique no ícone de olho emite `element:update` com `visible`.
   - **Guarda de re‑seleção**: se o card já selecionado for clicado novamente, não deve emitir novo `element:select`.
   - **Atualização via estado**: quando o store emite `state:change` sem mudança estrutural, apenas os valores dos inputs são atualizados (não há rebuild).
   - **Tooltip de ajuda** e **abertura do vault** disparam ação esperada.

3. **Estruturar os testes** de forma que possam ser executados com `npm test`.

## Critérios de Aceite
- [ ] Todos os cenários listados passam com o `ElementInspector` original.
- [ ] Os testes não dependem de implementação interna (acessam apenas o DOM renderizado e escutam eventos).
- [ ] O mock do `eventBus` registra todas as emissões, confirmando propósitos.
- [ ] Nenhum falso positivo por timing; usar `await` e `waitFor` quando necessário.