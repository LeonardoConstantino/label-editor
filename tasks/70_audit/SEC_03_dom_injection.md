# Task SEC-03: Refatoração innerHTML -> textContent

## Objetivo
Substituir o uso de `innerHTML` por `textContent` ou manipulação direta de DOM em locais onde dados dinâmicos são inseridos, eliminando vetores de XSS.

## Arquivos de Entrada
- `src/components/common/*.ts`
- `src/components/editor/*.ts`

## Detalhamento da Execução

1. **Mapeamento de Injeções:**
   - Localizar usos de `innerHTML` que recebem variáveis (ex: labels de botões, mensagens de erro, textos de status).

2. **Substituição Segura:**
   - Trocar por `.textContent = ...` para strings simples.
   - Usar `document.createElement` e `appendChild` para conteúdos que exigem estrutura.

3. **Templates Estáticos:**
   - Manter `innerHTML` APENAS para templates estáticos definidos no próprio arquivo (ex: estrutura inicial do Shadow DOM).

## Critérios de Aceite
- [x] Redução drástica no uso de `innerHTML` em tempo de execução.
- [x] Nenhuma quebra visual nos componentes refatorados.
- [x] Verificação manual de que mensagens dinâmicas não executam HTML.
