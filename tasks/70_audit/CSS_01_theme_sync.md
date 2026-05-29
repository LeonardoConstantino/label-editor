# Task CSS-01: Migração de Cores para Tailwind v4

## Objetivo
Sincronizar todos os componentes com o sistema de temas Prism, eliminando valores hexadecimais hardcoded nos Shadow DOMs.

## Arquivos de Entrada
- `src/components/**/*.ts`
- `src/utils/shared-styles.ts`

## Detalhamento da Execução

1. **Auditoria de Cores:**
   - Buscar por hexadecimais (ex: `#6366f1`) dentro das strings de estilo dos componentes.
   - Substituir pelas variáveis de tema equivalentes (ex: `var(--color-accent-primary)`).

2. **Padronização de Opacidade:**
   - Substituir `rgba(..., 0.1)` por utilitários Tailwind ou variáveis de cor com alpha se disponíveis no `@theme`.

3. **Validação Visual:**
   - Garantir que o contraste permanece correto após a substituição.

## Critérios de Aceite
- [ ] Zero ocorrências de cores fixas (hex/rgb) em componentes de UI comuns.
- [ ] Componentes respondem corretamente à troca de tema (Dark/Light).
