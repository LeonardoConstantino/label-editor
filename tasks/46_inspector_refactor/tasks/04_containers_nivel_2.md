# Task 04: Containers (Nível 2)

## Objetivo
Construir `InspectorDocumentSetup` e `InspectorLayerCard`, que agregam seções do Nível 3 e gerenciam ações de card (UP, DEL, toggle vis). Eles recebem dados via propriedades JS e emitem `inspector:change` e `inspector:action` para o orquestrador.

## Arquivos de Entrada
- Seções do Nível 3 (Task 03)
- `inspector-events.ts`
- Markup extraído do `ElementInspector.ts` para document setup e card header.

## Detalhamento da Execução

### 4.1 `InspectorDocumentSetup`
- Responsável por exibir o "Vault Monitor" (digital twin) e os controles de Canvas Setup + Preferences.
- Propriedades: `labelConfig` (width, height, dpi, etc.), `preferences`, `thumbnailUrl`.
- Emite `inspector:change` para alterações de config com prefixo `doc.` (ex: `'doc.widthMM'`) e também para preferências (ex: `'pref.audioEnabled'`).
- Mantém o zoom, grid, etc., com os mesmos inputs do original, agora criados diretamente no DOM do componente (sem innerHTML gigante, mas podendo usar `insertAdjacentHTML` para o esqueleto).
- A ação de abrir o vault deve ser um `inspector:action` com `{ action: 'open-vault' }` para que o orquestrador trate.

- **Template**: Extraia o HTML de `renderDocumentSetup` do original, substitua os valores hardcoded por interpolação via propriedades do componente e conecte os eventos.

### 4.2 `InspectorLayerCard`
- Representa um card de camada. Propriedades: `element` (do tipo `AnyElement`), `selected` (boolean).
- Exibe header com: type tag, nome da camada, warning tag (se overflow) e ícone de visibilidade.
- Quando `selected = true`, renderiza todas as seções relevantes para o tipo do elemento (usando os componentes Nível 3) dentro de seu conteúdo. As seções são instanciadas dinamicamente: o card decide quais renderizar com base no tipo.
- Escuta `inspector:change` das seções e re‑emite com o mesmo payload (ou simplesmente deixa o evento borbulhar, já que as seções disparam com `bubbles: true, composed: true`). No entanto, para garantir que o orquestrador saiba a qual elemento pertence, o `detail` pode ser enriquecido com o `id` do elemento, ou manter como está, pois o orquestrador pode pegar o `id` do card via `closest('[data-id]')`.
- Emite `inspector:action` para os botões do header (select, toggle-vis, up, del). O payload inclui o `id`.

- **Reatividade**: Atualize o nome da camada (`layer-name`) automaticamente via setter do `element`.

## Critérios de Aceite
- [ ] `inspector-document-setup` renderiza e emite eventos de config e ação de vault.
- [ ] `inspector-layer-card` renderiza header e, quando selecionado, mostra as seções corretas.
- [ ] Ações dos botões do card disparam `inspector:action` com o `id` do elemento.
- [ ] O estado visual de visibilidade (ícone olho) reflete `element.visible`.
- [ ] Ambos componentes não acessam `eventBus` ou `store`.
- [ ] Nenhum uso de `as any`.