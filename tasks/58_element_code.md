# Task 58: Implementação de Elemento de Código (QR Code & Outros)

## Objetivo
Adicionar um novo tipo de elemento `CodeElement` que suporte a geração dinâmica de QR Codes e outros formatos de códigos (barcodes), totalmente integrado ao sistema de interpolação e otimizado para alta performance.

## Workflow
1. `git checkout -b task/58-element-code`
2. **Análise Profunda:** Avaliar bibliotecas de geração de códigos (ex: `bwip-js` ou `qrcode`). O critério principal é a capacidade de gerar o código como um buffer de pixels ou canvas offscreen para manter a fluidez do `CanvasRenderer`. Investigar como o sistema de cache de renderização evitará regenerar o código desnecessariamente durante movimentos de outros elementos.
3. Modificar `src/domain/models/elements/SpecificElements.ts` e `ElementFactory.ts`.
4. Criar `src/domain/services/renderers/CodeRenderer.ts`.
5. Atualizar `Toolbar.ts` e `ElementInspector.ts`.

## Detalhamento da Execução
1. **Modelo Extensível:**
   - Criar `CodeElement` com suporte a `codeType` (QR, Code128, EAN, etc).
   - Propriedades de estilo: `color`, `backgroundColor`, `margin`.
2. **Integração com Interpolador:**
   - O campo `content` do elemento deve aceitar variáveis `{{key}}`.
   - Garantir que o `DataSourceParser` processe o conteúdo antes de enviá-lo para o gerador de código.
3. **Performance (Digital Twin):**
   - Implementar um mecanismo de "Lazy Rendering": o código só é regenerado se o conteúdo ou propriedades visuais mudarem.
   - Utilizar `ImageBitmap` ou canvas temporário para desenhar no canvas principal de forma ultra-rápida.
4. **UI de Edição:**
   - Adicionar o botão na Toolbar com ícone técnico.
   - No Inspector, permitir a troca do tipo de código e ajuste do nível de correção de erro (ECC) para QR Codes.

## Critérios de Aceite
- [x] O elemento de código renderiza corretamente no Canvas e no PDF.
- [x] A interpolação de variáveis no conteúdo do código funciona perfeitamente.
- [x] O sistema permanece fluido (60 FPS) ao arrastar um elemento de código.
- [x] A arquitetura permite a adição de novos formatos de código com esforço mínimo.

## Observações de Estabilidade (Hotfix)
- **Status:** Incompleta / Bloqueada por Validação.
- **Problema:** Bibliotecas como `bwip-js` lançam exceções fatais se o conteúdo não seguir o padrão rígido do formato (ex: EAN-13 exige exatamente 12 ou 13 dígitos).
- **Medida Provisória:** Apenas `qrcode` e `code128` estão habilitados por aceitarem conteúdo alfanumérico genérico.
- **Ação Futura:** Implementar uma camada de validação no `CodeRenderer` ou no `ElementValidator` que avise o usuário ou renderize um placeholder de erro em vez de quebrar a aplicação.

