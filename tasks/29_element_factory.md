# Task 29: Fábrica de Elementos & Constantes

## Objetivo
Implementar o padrão **Factory** para criação de elementos da etiqueta e centralizar os valores padrão (default values) em um arquivo de constantes.

## Workflow
1. `git checkout -b task/29-element-factory`
2. Criar `src/constants/defaults.ts` e `src/domain/models/elements/ElementFactory.ts`.

## Detalhamento
- **Defaults:** Mover cores iniciais, tamanhos padrão e fontes da `Toolbar` para o arquivo de constantes.
- **ElementFactory:** Classe responsável por instanciar `TextElement`, `RectangleElement`, etc.
- **Auto-ID:** A factory deve gerar automaticamente um `UUID` (usando `crypto.randomUUID()`) e definir o `zIndex` base para cada novo elemento.

## Critérios de Aceite
- [ ] `Toolbar` não contém mais objetos literais complexos (chama a Factory).
- [ ] Todo novo elemento possui um ID único e seguro.
- [ ] Mudança de "estilo padrão" global agora é feita apenas em `defaults.ts`.
