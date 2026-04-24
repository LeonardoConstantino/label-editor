# Task 14: AppButton & AppInput (Prism Style + Som)

## Objetivo
Implementar os componentes de UI base (Botões e Inputs) seguindo o estilo visual **Tactile Prism** (Tailwind v4) e integrando feedback sonoro.

## Arquivos de Entrada
- `src/components/common/AppButton.ts`
- `src/components/common/AppInput.ts`
- `src/core/UISoundManager.ts`
- `Design_System.md`

## Detalhamento
1. **AppButton:**
   - Injetar classes `.btn-prism` e variantes (`.btn-primary`, `.btn-success`).
   - Integrar `UISoundManager.play('click_mechanical')` no evento de clique.
   - Aplicar a animação de afundamento `:active`.
2. **AppInput:**
   - Encapsular label técnica (`.label-prism`) e input (`.input-prism`).
   - Garantir que o brilho Neon Indigo seja aplicado no `:focus`.
3. **Shadow DOM:** Garantir que todos os estilos e fontes (Inter/JetBrains Mono) sejam herdados corretamente das variáveis globais.

## Critérios de Aceite
- [x] Clicar no botão reproduz o som mecânico configurado.
- [x] O visual do botão reflete a variante (Primary, Secondary, Success).
- [x] O input brilha em Neon ao receber foco.
- [x] O botão tem feedback tátil (escala 0.92) no clique.
