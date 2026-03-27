# Task 08: Processamento e Otimização de Imagens

## Objetivo
Aprimorar o `imageProcessor` para tratar uploads de usuários, redimensionando e comprimindo imagens antes de inseri-las na etiqueta.

## Arquivos de Entrada
- `src/utils/imageProcessor.ts` (Existente, aprimorar)
- `src/components/common/AppInput.ts` (Referência para upload)

## Detalhamento da Execução
1. **Otimização:** Garantir que imagens não ultrapassem 1200px de largura e sejam convertidas para WebP/JPEG otimizado.
2. **Base64 Storage:** Converter o arquivo para string base64 para armazenamento no Store/IndexedDB.
3. **Aspect Ratio:** Calcular e retornar as dimensões originais da imagem para manter a proporção ao inserir no canvas.
4. **Feedback:** Adicionar logs via `Logger.ts` sobre o ganho de compressão.
5. **Testes:** Verificar se imagens grandes são redimensionadas corretamente.

## Critérios de Aceite
- [ ] Imagens enviadas são comprimidas para < 200KB sempre que possível.
- [ ] O `imageProcessor` retorna tanto o base64 quanto as dimensões (width/height) em mm.
- [ ] Erros de formato de arquivo são tratados com mensagens claras.
- [ ] Testes validam a redução de tamanho (bytes) após o processamento.
