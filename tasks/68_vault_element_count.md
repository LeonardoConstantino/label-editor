# Task 68: Contador de Elementos no Vault (Inventory Details)

## Objetivo
Adicionar visibilidade técnica à Galeria de Templates (The Vault), exibindo a quantidade total de elementos e um detalhamento por tipo (Texto, Imagem, Formas) via tooltip, permitindo ao usuário entender a complexidade de cada etiqueta antes de carregá-la.

## Workflow
1. `git checkout -b task/68-vault-element-count`
2. **Lógica de Contagem (VaultGallery.ts):**
   - Criar uma função utilitária que recebe `AnyElement[]` e retorna um objeto de contagem (ex: `{ text: 2, image: 1, ... }`).
3. **Template do Cartucho:**
   - Modificar `renderCartridgeHtml` para incluir o novo indicador.
   - Usar `ui-icon` com o nome `grid` ou `blocks`.
4. **Tooltip Dinâmica:**
   - Envolver o contador com um `ui-tooltip`.
   - Gerar o conteúdo da tooltip dinamicamente: "2 TEXT, 1 IMAGE, 3 SHAPES".
5. **Estilo:**
   - Manter a tipografia técnica (JetBrains Mono) e as cores do sistema (Indigo/Text-Muted).

## Critérios de Aceite
- [x] O total de elementos é visível em cada card do Vault.
- [x] A tooltip detalha os tipos de elementos presentes na etiqueta.
- [x] Se uma etiqueta estiver vazia, deve mostrar "0 UNITS" ou similar.
- [x] Integração perfeita com o sistema de design "Tactile Prism".
