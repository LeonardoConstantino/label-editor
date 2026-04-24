# Task 15: Sistema de Modais, Toasts e Confirmação

## Objetivo
Implementar o sistema de feedback do usuário (Notificações, Diálogos de Confirmação e Modais) com o estilo **Tactile Prism** e feedback sonoro.

## Arquivos de Entrada
- `src/components/common/modal.ts`
- `src/components/common/toast.ts`
- `src/components/common/confirm.ts`
- `src/core/UISoundManager.ts`

## Detalhamento
1. **Toast Manager:**
   - Estilo "Hardware Labels" com borda lateral de cor neon (Primary/Success/Danger).
   - Títulos em `font-mono`.
   - `UISoundManager.play('notification_slide')` ao aparecer.
2. **Confirm Dialog:**
   - Caixa de comando do sistema com sombra neon primária.
   - Título em `font-mono` uppercase.
   - `UISoundManager.play('system_alert')` ao abrir.
3. **Modais:**
   - Painéis de vidro translúcido (`panel-glass`).
   - Botão de fechar com animação de rotação e som.

## Critérios de Aceite
- [x] Toasts aparecem na lateral com animação fluida e som correspondente.
- [x] Diálogos de confirmação exibem o brilho neon e usam a fonte Mono no título.
- [x] Modais bloqueiam a interação com o fundo através de um backdrop com blur de 8px.
- [x] Feedback sonoro presente em todas as aberturas de UI de destaque.
