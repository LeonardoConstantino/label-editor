# Task 07: Gerenciamento de Templates (IndexedDB)

## Objetivo
Implementar a persistência local de templates de etiquetas usando IndexedDB, permitindo salvar, listar e carregar designs.

## Arquivos de Entrada
- `src/core/IndexedDBStorage.ts` (Existente, aprimorar)
- `src/domain/services/TemplateManager.ts` (A criar)
- `src/core/Store.ts`

## Detalhamento da Execução
1. **Schema DB:** Criar store para `templates` com índices por `name` e `updatedAt`.
2. **TemplateManager:** Serviço para CRUD (Create, Read, Update, Delete) de objetos `Label`.
3. **Thumbnail Generation:** Implementar lógica para gerar uma imagem base64 do canvas ao salvar.
4. **Integração UI:** Botão "Salvar" na Toolbar que aciona o persistence.
5. **Testes:** `src/domain/services/__tests__/TemplateManager.test.ts` usando um mock de IndexedDB (fake-indexeddb).

## Critérios de Aceite
- [x] Salvar uma etiqueta persiste os dados e a thumbnail no IndexedDB.
- [x] Carregar uma etiqueta restaura todos os elementos e configurações no Store.
- [x] Operações de banco de dados são assíncronas e tratam erros (ex: falta de espaço).
- [x] Testes confirmam a persistência e recuperação de um objeto Label completo.
