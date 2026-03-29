# Task 35: Galeria de Templates & Digital Twin Preview

## Objetivo
Implementar uma interface visual para gerenciar etiquetas salvas e, como destaque, integrar a miniatura real do design no Blueprint do Inspector, criando uma experiência de "Digital Twin".

## Workflow
1. `git checkout -b task/35-template-gallery`
2. Criar `src/components/editor/TemplateGallery.ts`.
3. Modificar `src/domain/services/TemplateManager.ts` e `src/components/editor/ElementInspector.ts`.

## Detalhamento
- **Thumbnail Generation:** O `TemplateManager` deve ser capaz de gerar uma miniatura rápida (low-res) do canvas sempre que solicitado.
- **UI Gallery:** Modal para listar templates com metadados e preview.
- **Digital Twin (Oportunidade de Ouro):** 
  - Atualizar o `.blueprint-label` no `ElementInspector` para exibir a miniatura atual do design em vez de um retângulo branco liso.
  - A imagem deve se ajustar proporcionalmente dentro do blueprint CAD.
- **Persistence Sync:** Garantir que ao abrir a galeria, os dados venham atualizados do IndexedDB.

## Critérios de Aceite
- [ ] O usuário vê seu próprio design (em miniatura) dentro do desenho técnico do Blueprint quando nada está selecionado.
- [ ] Carregar um template da galeria substitui o design atual com sucesso.
- [ ] Miniaturas são geradas sem impactar a performance do editor.
