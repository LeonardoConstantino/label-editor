# Task 02: Modelos de Domínio e Tipagens

## Objetivo
Definir as interfaces fundamentais para etiquetas e elementos (Texto, Imagem, Retângulo, Borda), garantindo consistência de dados em mm.

## Arquivos de Entrada
- `src/domain/models/elements/BaseElement.ts` (A criar)
- `src/domain/models/elements/TextElement.ts` (A criar)
- `src/domain/models/elements/ImageElement.ts` (A criar)
- `src/domain/models/Label.ts` (A criar)

## Detalhamento da Execução
1. **BaseElement:** Interface com id, tipo, posição (x, y), zIndex e visibilidade.
2. **Específicos:** Criar interfaces detalhadas para `TextElement` (fonte, alinhamento), `ImageElement` (src, fit) e `ShapeElement`.
3. **Label Model:** Interface que agrupa a configuração do canvas (largura, altura em mm) e a lista de elementos.
4. **Validação:** Adicionar tipos para `CanvasConfig` incluindo DPI e escala de preview.

## Critérios de Aceite
- [x] Interfaces TypeScript completas para todos os tipos de elementos propostos.
- [x] Uso exclusivo de `mm` para medidas dimensionais.
- [x] Arquivo `src/domain/models/index.ts` exportando todos os tipos.
