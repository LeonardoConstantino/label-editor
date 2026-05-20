# Task 23: Expansão do Sistema de Atalhos & UX "Power User"

## Objetivo
Transformar a interação com o teclado em uma experiência de alta produtividade, inspirada em softwares profissionais (Adobe/Figma), evitando conflitos com o sistema operacional e navegador, e adicionando camadas de "Juice" e Easter Eggs via sequências e pressões longas.

## 1. Navegação de Contexto (Inspired by Discord/Slack)
- **`Alt + 1..6`**: Troca rápida entre os módulos do Cockpit (Evita `Ctrl+N` que conflita com navegador).
  1. Blueprint
  2. Layers
  3. Assets
  4. History
  5. Variables
  6. Typeface
- **`Alt + Arrows Up/Down`**: Ciclar entre os módulos do Rack.

## 2. Design & Transformação (Inspired by Illustrator)
- **`[ ]` (Colchetes)**: Ajustar `Z-Index` (Avançar/Recuar camada) sem necessidade de Modificadores (Contexto: `no-input`).
- **`Ctrl + Arrows`**: Ajustar **Dimensões (W/H)** do elemento selecionado (passos de 1mm).
- **`Ctrl + Alt + Arrows`**: Ajustar **Dimensões** com precisão cirúrgica (passos de 0.1mm).
- **`V`**: Ativar ferramenta de seleção (Esc para desmarcar).

## 3. Workflow de Produção
- **`Ctrl + < / >`**: Navegar no Paginador de registros do Production Studio.
- **`Alt + P`**: Abrir o Production Cockpit (Takeover).

## 4. Camada de "Juice" & Easter Eggs (Sequências e Long Press)
- **Long Press `S`**: Dispara uma animação de "Sincronização Atômica" na Status Bar enquanto salva.
- **Sequência `U`, `P`, `D`, `O`, `W`, `N`**: Inverte o Canvas (180 graus visual) apenas para exibição (Easter Egg "Inversion").
- **Sequência `C`, `O`, `L`, `O`, `R`**: Abre um Color Picker flutuante estilo "Prism" no centro da tela.
- **Long Press `Space`**: Alterna para o modo "Hand Tool" (Pan) com cursor customizado.

## 5. Prevenção de Conflitos
- Bloquear explicitamente atalhos do navegador durante o foco no app: `Ctrl+D` (favoritos), `Ctrl+P` (impressão padrão), `Ctrl+S` (salvar página).

## Critérios de Aceite
- [ ] Atalhos de navegação funcionam sem tirar as mãos do teclado.
- [ ] Redimensionamento via teclado é suave e preciso.
- [ ] Pelo menos 2 Easter Eggs funcionais com sequências.
- [ ] Feedback sonoro diferenciado para atalhos de sistema vs atalhos de design.
