# Task 79: Variable Manager Module (Visual Data Pipeline)

## Objetivo
Criar o módulo "Variable Manager" para o Rack de Cartuchos. Ele deve varrer todo o Canvas em tempo real, listando todas as variáveis `{{chave}}` que estão sendo usadas no documento. Mais do que listar, ele permite que o usuário adicione "Formatadores Visuais" (Filtros em cascata) a cada variável sem precisar digitar a sintaxe manualmente (ex: transformar `{{preco}}` em `{{preco:currency:trim}}` via botões).

## Workflow
1. `git checkout -b task/79-variable-manager`
2. **Scanner em Tempo Real:** Sempre que o módulo abrir (ou quando houver `state:change`), o componente deve rodar a regex mágica pelo texto de todas as camadas para extrair um array único de variáveis usadas.
3. **Criação do Componente:** Construir `src/components/editor/modules/VariableManager.ts`.
4. **Mutação Visual:** Criar a UI que permite adicionar/remover formatadores. Ao modificar um formatador, o módulo deve injetar a nova sintaxe (`:comando`) de volta na propriedade `content` da camada de texto correspondente no `Store`.

## Detalhamento de UI/UX (Tactile Prism)

### 1. O Display de Variáveis
- **Se não houver variáveis:** Uma "Empty State" com estilo terminal militar: *"Nenhum Data-Link detectado. Use chaves duplas `{{nome}}` em camadas de texto."*
- **A Lista de Conexões:** Cada variável encontrada vira um Card Acordeon (`<details class="prism-details">`).
- **Cabeçalho da Variável:**
  - O nome da variável ganha destaque: `<span class="font-mono text-accent-primary bg-accent-primary/10 px-2 py-1 rounded">{{produto}}</span>`.
  - À direita, um badge cinza informando onde ela está sendo usada (ex: `Usado em 2 Layers`).

### 2. O Construtor de Formatadores (Pipeline Builder)
Quando o usuário expande o acordeon de uma variável, ele entra no construtor de formato.
- **Visual Node-Based:** O fluxo começa de cima para baixo.
  - O dado bruto: `[ RAW INPUT ]`.
  - Uma linha vertical conectando os blocos (estilo *Pipeline* de programação).
  - O resultado final esperado: `[ OUTPUT ]`.
- **Os Blocos de Filtro (Tags):** Os formatadores ativos aparecem como blocos empilhados.
  - Exemplo: Um bloco `[ :uppercase ]` com um "X" minúsculo no canto para deletá-lo.
- **Botão de Adição Rápida:**
  - No final do pipeline, há um botão tracejado: `[+ Add Formatter]`.
  - Clicar nele abre o nosso `<ui-select>` customizado que lista todos os filtros suportados da arquitetura (Maiúsculas, Moeda R$, Data, Limite N de caracteres, etc.).

### 3. A Mecânica de Sincronização e Fallback (O Juice Técnico)
- **Fallback Setting:** Cada variável deve ter um campo extra no final do accordion: **"Valor Reserva (Fallback)"**. 
  - Se o usuário digitar "Sem Nome" aqui, a string da variável vira `{{produto||Sem Nome}}` automaticamente.
- **Live Regex Engine:** Quando o usuário clica no "X" para remover o bloco de `:currency`, o TypeScript faz um *Search & Replace* invisível e limpa aquilo de todos os `TextElements` no Store simultaneamente. É bruxaria em tempo real.

### 4. Integração Sonora (UISoundManager)
- **Scanner Success:** Ao abrir o painel, se encontrar variáveis, emite um som `sound.play('notify')` muito curto (tipo radar).
- **Adição de Filtro (Add Block):** Som de peça metálica travando (clack agudo). `sound.playCustom({ freq: 1200, duration: 0.04, type: 'square' })`.
- **Remoção de Filtro (X):** O som reverso de "Vaporize" (ruído estático sumindo).

## Critérios de Aceite
- [ ] O painel reflete com precisão todas as `{{variáveis}}` atuais do Canvas sem repetição.
- [ ] O usuário consegue anexar formatadores visuais (como Moeda ou Maiúsculas) através do botão de Adicionar, e a string da camada de texto no *Store* é atualizada com a sintaxe correta automaticamente.
- [ ] O campo de Fallback (Valor Reserva) é suportado.
- [ ] A interação é contínua e as edições disparam eventos de histórico corretamente.

---

**Por que essa Task é um divisor de águas?** 
Porque ensinar um usuário corporativo a digitar `:currency:upper||Padrão` no meio de um texto é uma barreira de entrada alta. O Variable Manager democratiza a inteligência do software, parecendo que ele está montando blocos de Lego para tratar os dados em massa!
