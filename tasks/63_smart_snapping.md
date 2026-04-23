# Task 63: Smart Snapping & Guias Magnéticas

## Objetivo
Implementar um sistema de "atração magnética" (snapping) que ajude o usuário a alinhar elementos ao grid e às bordas/centros de outros objetos durante a movimentação, proporcionando uma sensação de precisão tátil.

## Workflow
1. `git checkout -b task/63-smart-snapping`
2. **Análise Profunda:** Avaliar o algoritmo de detecção de proximidade. O snapping deve ter um "limiar" (ex: 2mm) para não se tornar frustrante. Investigar a performance de realizar cálculos de snapping em tempo real durante o arraste no canvas.
3. Criar `src/domain/services/SnapService.ts`.
4. Integrar com o `EditorCanvas.ts` (para visualização) e `Store.ts` (para lógica de movimento).

## Detalhamento da Execução
1. **Tipos de Snapping:**
   - **Grid Snap:** Alinha às linhas do grid técnico.
   - **Object Snap:** Alinha às bordas (Left, Right, Top, Bottom) e centros (X, Y) de outros elementos.
   - **Canvas Snap:** Alinha às bordas e ao centro da própria etiqueta.
2. **Guias Visuais (Juice):**
   - Mostrar linhas pontilhadas sutis (Indigo Neon) quando um snap ocorre.
   - Adicionar uma pequena vibração visual ou feedback sonoro sutil (`UISM.play('snap')`) ao "grudar".
3. **Controle de Usuário:**
   - Permitir ligar/desligar o Snapping via tecla de atalho (ex: segurar `Ctrl` para desativar temporariamente) ou via seção de Preferências.
4. **Cálculo Matemático:**
   - Implementar a função `getSnappedCoordinates(element, rawX, rawY)`.

## Critérios de Aceite
- [ ] Elementos "grudam" nas linhas do grid quando aproximados.
- [ ] Linhas de guia aparecem para indicar alinhamento com outros elementos.
- [ ] O movimento é fluido e o snapping parece "orgânico", não travado.
- [ ] O usuário pode desativar o snapping nas preferências ou via atalho.
