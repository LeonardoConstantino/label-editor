# Task CSS-02: Centralização de Spacing em shared-styles

## Objetivo
Centralizar definições de padding, margin e font-size, garantindo que o design tátil seja consistente em todo o editor.

## Arquivos de Entrada
- `src/utils/shared-styles.ts`
- Componentes com estilos internos.

## Detalhamento da Execução

1. **Identificação de "Magic Numbers":**
   - Buscar paddings e margens fixas (ex: `padding: 12px`, `margin-top: 8px`).
   - Substituir por variáveis de espaçamento (ex: `var(--spacing-3)` ou similar).

2. **Unificação de Font-Size:**
   - Garantir que todos os textos usam a escala tipográfica do projeto (ex: `var(--text-xs)`, `var(--text-sm)`).

3. **Consolidação:**
   - Mover regras repetitivas para classes utilitárias em `shared-styles.ts`.

## Critérios de Aceite
- [ ] Layout consistente entre Cockpit, Inspector e Modais.
- [ ] Redução de código CSS duplicado nos componentes.
