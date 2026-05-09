# Task 76: "The Active Slot" - Navegação Modular do Painel (Scalable UI)

## Objetivo
Substituir a alternância fixa entre "Setup" e "Layers" por uma arquitetura de módulos dinâmicos (The Active Slot). O cabeçalho do painel atua como um display que revela um "Rack de Cartuchos" (menu dropdown com descrições ricas). O objetivo é garantir intuição para usuários leigos e escalabilidade para futuros painéis (Batch, Assets, etc.), sem perder o *Juice* tátil.

## Workflow
1. `git checkout -b task/76-active-slot`
2. **Refatoração Estrutural:** Alterar o `index.html` ou o contêiner raiz do painel direito (aside). O painel não terá abas. O topo será um botão de exibição (`#module-selector-btn`) que controla a abertura do Rack de Módulos (`#module-rack`).
3. **Gerenciador de Estado:** O `Store` ou `EventBus` deve observar o "Módulo Ativo". (Eventos sugeridos: `module:switch`).
4. **Coreografia CSS:** Implementar a animação de profundidade. Quando o Rack abrir, o conteúdo do painel atual (`#module-workspace`) deve sofrer a classe `.workspace-pushed-back` (blur + scale(0.96) + brilho reduzido).
5. **Transição de Componente:** Ao clicar em uma opção do Rack, o Rack recolhe, a classe `pushed-back` é removida, e o componente dentro do workspace é trocado (ex: Remove `<element-inspector>` e injeta `<blueprint-setup>`).

## Especificações de Design & Juice
- **Botão Display (Fechado):** Fundo super escuro (`bg-[#050608]`), com label *Active Module* em fonte monospace e o ícone do módulo atual com borda luminosa (Indigo).
- **O Rack (Dropdown):** Deve ter `backdrop-blur-xl`, fundo translúcido e projetar uma sombra densa (`shadow-[0_20px_40px_rgba(0,0,0,0.8)]`).
- **Os Itens (Cartuchos):** Não são apenas ícones. Têm título (ex: "Blueprint Setup") e subtítulo explicativo em cinza (ex: "Configurações globais de milímetros e fundo"). O hover muda a cor da borda de transparente para a cor do sistema (Indigo ou Success dependendo do módulo).
- **Ícone Direto:** O botão de exibir o Rack deve ter o ícone `<ui-icon name="chevrons-up-down">`.

## Critérios de Aceite
- [x] O usuário consegue trocar entre os painéis através do Rack expansível.
- [x] O painel de conteúdo sofre desfoque visual (`blur`) e encolhe ao abrir o menu, para manter o foco na seleção.
- [x] O texto e ícone do cabeçalho atualizam refletindo o módulo escolhido.
- [x] O Rack se fecha automaticamente se o usuário clicar fora dele.

---

## 🚀 Observações para Futuros Módulos (Slots)

Com a arquitetura modular estabelecida, os próximos "cartuchos" a serem implementados no Rack são:

1.  **Production Studio (Batch):** Migrar a lógica de mapeamento de variáveis e geração de lotes do modal atual para um módulo lateral focado em produtividade.
2.  **Asset Library (Gallery):** Um navegador de imagens e SVGs diretamente no cockpit, facilitando o drag-and-drop para o canvas.
3.  **Variable Manager:** Central de gerenciamento de campos dinâmicos e regras de formatação avançada.
4.  **History Visualizer:** Uma lista cronológica de snapshots com preview, permitindo saltos temporais precisos no design.

