# Task 03: Seções Especialistas (Nível 3)

## Objetivo
Criar os custom elements do Nível 3 — seções especialistas que encapsulam um grupo de propriedades. Cada seção será independente, recebe dados via propriedades JS e emite `inspector:change` quando o usuário altera um valor. Nesta fase, elas não devem ter conhecimento de `ElementInspector` ou `store`.

## Arquivos de Entrada
- `src/ui/inspector/inspector-events.ts` (Task 01)
- Referência visual dos campos extraídos do `ElementInspector.ts` original.
- Criar:
  - `src/ui/inspector/sections/InspectorSectionTransform`
  - `src/ui/inspector/sections/InspectorSectionText`
  - `src/ui/inspector/sections/InspectorSectionRect`
  - `src/ui/inspector/sections/InspectorSectionImage`
  - `src/ui/inspector/sections/InspectorSectionBorder`

## Detalhamento da Execução

Para **cada seção**, siga o mesmo padrão de implementação:

1. **Interface de propriedades**: Defina o tipo esperado (apenas os campos relevantes). Ex: `TransformProps { position: {x,y}; dimensions?: {w,h}; rotation; opacity }`.
2. **Componente Custom Element** com:
   - Shadow DOM + `sharedSheet`.
   - Atributo `element` (ou properties individuais) setado via propriedade JS (não via atributo HTML).
   - Renderização inicial usando `insertAdjacentHTML` para o esqueleto (inputs com `data-prop` apropriados) ou criação programática.
   - Nas seções que contêm `ui-number-scrubber` ou `app-input`, o componente deve escutar eventos `app-input` (nosso evento customizado) e traduzir para `inspector:change`. Precisamos garantir que os eventos de `change` nativos não sejam capturados duplamente (como o orquestrador original já fazia).
   - **Reatividade**: Sobrescreva `attributeChangedCallback` para o atributo `data-element` (ou use getter/setter) e atualize os valores dos inputs mantendo o foco do usuário (sem perder interação).
   - O componente não deve acessar `store` ou `eventBus`.

3. **Isolamento e teste**:
   - Crie uma página HTML de teste (ou story) para cada seção, onde você instancia o componente passando um objeto mockado e verifica que as alterações disparam o evento `inspector:change` com os detalhes corretos.
   - Verifique que o foco não é perdido durante digitação (implementando a lógica de `isInteracting` similar à existente).

### Seções Específicas

- **Transform**: inputs X, Y, (W, H se `hasDimensions`), Rot, Op.
- **Text**: Content, FontSize, Color, LineHeight, FontWeight. Inclui o tooltip de interpolação (pode ser copiado do original, mas agora como template da própria seção).
- **Rect**: FillColor, StrokeColor, BorderRadius, StrokeWidth.
- **Image**: Fit mode (input) e checkbox Smoothing.
- **Border**: Style, Color, Width, Radius.

## Critérios de Aceite
- [ ] Cada seção é um custom element registrado e funcional.
- [ ] Ao modificar qualquer campo, o componente dispara `inspector:change` com `prop` (ex: `'position.x'`) e `value` convertido adequadamente (número, string, booleano).
- [ ] A propriedade `element` pode ser setada via JS e o DOM reflete os valores atuais.
- [ ] O foco não é perdido durante edição contínua (testado com `requestAnimationFrame`).
- [ ] Nenhum uso de `as any`.