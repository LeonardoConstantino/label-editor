# Task SEC-02: Blindagem de Injeção SVG (Icon Component)

## Objetivo
Garantir que a inserção de ícones SVG via `innerHTML` seja segura contra scripts maliciosos embutidos em arquivos SVG.

## Arquivos de Entrada
- `src/components/common/icon.ts`

## Detalhamento da Execução

1. **Refinamento do sanitizeInnerSVG:**
   - Auditar a função `sanitizeInnerSVG` atual.
   - Adicionar whitelist estrita de tags SVG permitidas (`path`, `circle`, `rect`, `svg`, `g`, `polyline`).
   - Bloquear tags perigosas como `script`, `foreignObject`, `animate`.

2. **Bloqueio de Atributos:**
   - Remover atributos de evento (`onmouseover`, `onclick`, etc.).

3. **Validação:**
   - Testar a inserção de um SVG "envenenado" e verificar se o componente o neutraliza.

## Critérios de Aceite
- [ ] Ícones continuam renderizando corretamente.
- [ ] Tags não-SVG são removidas do payload antes da injeção no Shadow DOM.
