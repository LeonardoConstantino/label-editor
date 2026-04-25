# Task 40: Prevenção de XSS & Sanitização

## Objetivo
Implementar uma camada de segurança robusta em toda a aplicação, utilizando o utilitário `src/utils/sanitize.ts` para evitar ataques de injeção de script (XSS) e quebras acidentais de layout causadas por caracteres especiais em textos do usuário.

## Workflow
1. `git checkout -b task/40-security-xss`
2. Modificar Componentes de UI e Renderers.

## Detalhamento
- **Inputs de Texto:** Sanitizar o conteúdo de `TextElement` no momento da emissão do evento `element:update`.
- **Renderização de Camadas:** Utilizar `escapeHTML` ao renderizar nomes de camadas e conteúdos de texto no `ElementInspector.ts`.
- **Batch Processing:** Garantir que os dados importados via CSV/JSON sejam sanitizados antes de serem exibidos no **Batch Preview**.
- **Template Literals:** Adotar o uso da função `safe` nos Web Components para gerar HTML dinâmico de forma segura.

## Critérios de Aceite
- [x] Scripts inseridos em campos de texto (ex: `<script>alert(1)</script>`) são renderizados como texto literal, sem execução.
- [x] Caracteres como `<` e `>` não quebram o layout do Inspector ou do Canvas.
- [x] 100% dos pontos de renderização de conteúdo dinâmico cobertos pelo `sanitize.ts`.
