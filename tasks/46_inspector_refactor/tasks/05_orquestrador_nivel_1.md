# Task 05: Orquestrador Refatorado (Nível 1)

## Objetivo
Reduzir o `ElementInspector` original para atuar exclusivamente como ponte entre a Store/EventBus e os sub‑componentes dos Níveis 2 e 3. O arquivo final deve ter menos de 200 linhas e delegar toda renderização e interação de UI para os novos componentes.

## Arquivos de Entrada
- `ElementInspector.ts` original
- Containers `InspectorDocumentSetup` e `InspectorLayerCard` (Task 04)
- Seções (Task 03) — já registradas como custom elements
- `inspector-events.ts`
- Testes de regressão (Task 02)

## Detalhamento da Execução

1. **Manter o esqueleto do `ElementInspector`** (header com título, badge e botão de ajuda), pois ele ainda é o host.
2. **Remover** completamente os métodos: `renderDocumentSetup`, `renderCardHtml`, `renderElementProperties`, `renderTypeSpecificFields`, `syncValues`, `handleGenericInput`, `handleDelegatedClick`, `emitDocUpdate`, `emitElUpdate`.
3. **Substituir** a renderização de conteúdo no `rebuildPanel` por:
   - Se `!selectedId`: criar `<inspector-document-setup>` e setar suas propriedades (`labelConfig`, `preferences`, `thumbnailUrl`), anexar ao container.
   - Se houver `selectedId`: mapear `elements` para criar `<inspector-layer-card>` para cada elemento, setando `element` e `selected`, anexar ao container.
   - Não usar `innerHTML` para os cards; use `createElement`.
4. **Conectar eventos**:
   - Escutar `inspector:change` (bubbles) no shadow root. No handler, obter o `id` do elemento a partir do alvo (`target.closest('[data-id]')`) se for uma mudança de propriedade de elemento, ou tratar como doc/pref se disparado pelo `document-setup`. Traduzir para chamadas apropriadas ao `eventBus` (como `element:update` ou `label:config:update` ou `preferences:update`).
   - Escutar `inspector:action` e mapear ações: `'select'` → `eventBus.emit('element:select', id)`, `'toggle-vis'` → lógica de toggle, `'up'`, `'del'`, `'open-vault'`.
5. **Manter** o mecanismo de hash estrutural e guarda de re‑seleção, agora simplificado porque a reconstrução é feita administrando elementos DOM.
6. **Atualizar** `updateDigitalTwin` para setar a propriedade `thumbnailUrl` no `<inspector-document-setup>` em vez de manipular `<img>` diretamente.
7. **Garantir** que a proteção contra eventos nativos redundantes (filtro de ruído) continue funcionando — essa lógica agora fica nos sub‑componentes, mas o orquestrador pode precisar de um guard ao receber `app-input` borbulhado; avalie se necessário.

## Critérios de Aceite
- [ ] `ElementInspector.ts` tem menos de 200 linhas (excluindo imports e declaração da classe).
- [ ] O componente renderiza a interface exatamente como antes (documento ou cards de camadas).
- [ ] Todos os testes da Task 02 passam sem modificação (ou com ajustes mínimos aprovados).
- [ ] Zero uso de `as any` em todo o módulo de inspeção.
- [ ] O `innerHTML` só é usado para o esqueleto estático do header; o conteúdo dinâmico é gerenciado via DOM API.