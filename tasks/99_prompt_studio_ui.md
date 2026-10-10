# Task 99 — PromptStudio UI Component & Cartridge Integration

- **Branch:** `task/99-prompt-studio-ui`
- **Prioridade:** 08
- **Dependências:** 98 (AIPromptBuilder)
- **Bloqueia:** —

---

## 🎯 Objetivo

Criar o cartucho **PromptStudio** (`<ui-prompt-studio>`) no painel Cockpit, com gerenciamento de turnos da conversa, botões táteis de copiar prompt / aplicar resposta, e integração direta com o histórico (`HistoryManager`) para Undo/Redo.

---

## 🏗️ Arquivos a Criar e Editar

### 1. `src/components/editor/modules/PromptStudio.ts` (Novo Componente)
- Web Component tátil com Shadow DOM e `sharedSheet`.
- **Modos:**
  - 🆕 **Criar do Zero**: Copia o System Prompt Completo na 1ª mensagem.
  - ✏️ **Iterar / Editar Atual**: Copia deltas de iteração a partir do estado atual da etiqueta.
- **Contador de Turnos**: Mostra `Turno #1`, `Turno #2`... e botão para **Reiniciar Sessão de Chat**.
- **Área de Entrada**: Textarea para o usuário descrever o que deseja.
- **Botão de Ação Primária**: `📋 Copiar Prompt para IA` (com feedback de toast e som `UISM.SUCCESS`).
- **Área de Resposta**: Textarea com placeholder intuitivo e botão `⚡ Aplicar no Canvas`.
- **Botões Rápidos de Histórico**: `Desfazer (Undo)` e `Refazer (Redo)`.

### 2. `src/components/editor/ModuleRack.ts`
- Adicionar o cartucho `prompt-studio` na lista de módulos com ícone `sparkles` ou `wand` e tooltip descritiva.

### 3. `src/components/editor/AppCockpit.ts`
- Importar e instanciar `<ui-prompt-studio>` quando o módulo `prompt-studio` for ativado no slot do cockpit.

---

## ⚙️ Regras de Implementação & Atomic Sync

1. Usar o padrão `renderSkeleton()` e `syncValues()` para não destruir textareas enquanto o usuário digita.
2. Ao aplicar o JSON retornado pela LLM:
   - Disparar `historyManager.snapshot("Modificação IA: [instrução do usuário]")`.
   - Limpar o campo de colagem com animação de sucesso.
   - Atualizar a Store com a etiqueta resultante.
3. Tratamento de erros gracioso: se o usuário colar um texto inválido, exibir toast com aviso claro sem quebrar a aplicação.

---

## 🎨 UI/UX — Layout e Micro-interações

> Referência visual: mockup aprovado em `prompt-studio.html`.

---

### Estrutura Geral

O painel ocupa um slot do `ModuleRack` com largura fixa e altura total, dividido em quatro faixas horizontais: cabeçalho, seletor de modo, corpo rolável e rodapé. Cabeçalho e rodapé são fixos; apenas o corpo faz scroll. Esse travamento é intencional — o usuário precisa enxergar o modo ativo e o status do modelo independentemente de quanto conteúdo existe no corpo.

```
┌─────────────────────────────────┐
│  CABEÇALHO                      │  ← fixo
├─────────────────────────────────┤
│  SELETOR DE MODO                │  ← fixo
├─────────────────────────────────┤
│                                 │
│  CORPO                          │  ← rola
│                                 │
├─────────────────────────────────┤
│  RODAPÉ                         │  ← fixo
└─────────────────────────────────┘
```

---

### Cabeçalho

Alinha horizontalmente um ícone de módulo, o título "Prompt Studio" e um badge "BETA" discreto. O ícone usa o Lucide `sparkles` dentro de um quadrado com bordas arredondadas e glow indigo sutil — o mesmo padrão dos outros cartuchos do ModuleRack, mantendo consistência visual. O badge serve apenas para comunicar maturidade do módulo, não para chamar atenção; deve ser tipografia mono pequena com opacidade reduzida.

---

### Seletor de Modo

Três botões em grid de colunas iguais, cada um com ícone centralizado acima do label. A faixa tem fundo ligeiramente mais escuro que o corpo — essa diferença de tonalidade, ainda que sutil, ancora visualmente o seletor como zona de navegação, não de conteúdo.

O modo ativo recebe borda indigo fina e fundo indigo de baixíssima opacidade. Os inativos ficam em `text-muted` sem borda. A transição entre estados é rápida e sem spring — aqui não cabe bounce, a seleção de modo é uma decisão, não uma ação física.

Os três modos são **Criar** (`plus`), **Editar** (`pencil`) e **Variáveis** (`list-end`). Trocar de modo não limpa os campos — apenas altera o prompt que será montado ao copiar.

---

### Corpo

O corpo empilha verticalmente duas seções de passo, separadas por um divider que sangra até as bordas do padding lateral para parecer uma linha nativa do painel, não um elemento flutuante.

Cada seção começa com um marcador de passo: um círculo pequeno com o número em mono indigo, seguido de um label descritivo em `text-muted`. É uma sequência real de dois passos — copiar para a IA, depois colar a resposta — então a numeração é justificada e não decorativa.

**Passo 1 — Textarea de Prompt**

Ocupa a maior parte vertical do corpo. O campo usa `font-sans` (não mono) porque o usuário está escrevendo em linguagem natural. Um contador de caracteres flutua no canto inferior direito do campo, em mono minúsculo e opacidade baixa — presente mas nunca intrusivo. O limite é 600 caracteres.

Abaixo do textarea, dois itens de contexto opcionais aparecem como linhas clicáveis com checkbox customizado à esquerda e uma tag informativa à direita. A tag mostra o dado real disponível: quantidade de elementos selecionados ou uma prévia das variáveis de lote. Ao ativar, a linha ganha fundo e borda indigo de baixa opacidade — o mesmo padrão de seleção usado em outros lugares do app.

O botão "Copiar Prompt para LLM" fica logo abaixo das opções de contexto e tem borda **tracejada** — esse detalhe é deliberado. Borda tracejada comunica visualmente que o destino da ação é externo ao app, como uma saída. No hover, a borda vira sólida e o glow indigo aparece, reforçando que a ação está prestes a acontecer.

**Passo 2 — Textarea JSON**

Campo com `font-mono` e texto em `accent-primary` — o texto digitado sai em indigo. Isso sinaliza ao usuário que aqui entra dado estruturado, não linguagem natural. O fundo é mais escuro que o textarea de cima, reforçando a distinção semântica entre os dois campos.

Logo abaixo do campo, um indicador de validação aparece em fade assim que o usuário começa a digitar. Um ponto colorido à esquerda de um texto mono minúsculo: verde com "JSON válido — pronto para aplicar" ou vermelho com "JSON inválido — verifique a sintaxe". A validação roda em tempo real via `JSON.parse()`. Esse feedback imediato evita que o usuário clique em "Aplicar" sem saber se o conteúdo está correto.

**Botão "Aplicar no Canvas"**

É o `btn-prism btn-primary` de largura total — a ação mais importante do painel, e deve parecer isso. Permanece desabilitado (`opacity` reduzida, cursor bloqueado) enquanto o JSON for inválido ou o campo estiver vazio. Ao habilitar, o botão responde ao hover com elevação sutil e glow indigo. O clique usa o afundamento mecânico padrão do Tactile Prism: o botão desce levemente no eixo Y e escurece, simulando um botão físico sendo pressionado.

**Botões de Histórico**

Desfazer e Refazer ficam lado a lado em grid de duas colunas, abaixo do botão primário. São secundários em hierarquia e devem parecer secundários: sem fundo, borda sutil, texto muted. Cada um carrega um badge `kbd-prism` com o atalho de teclado correspondente. Iniciam desabilitados e habilitam reativamente conforme o `HistoryManager` reporta disponibilidade de snapshots.

---

### Rodapé

Três elementos em linha: um LED de status à esquerda, um texto de status em mono centralizado e um badge do modelo ativo à direita.

O LED é o único elemento animado em estado ocioso — pulsa lentamente em verde quando o painel está pronto. Muda para indigo durante o processamento e vermelho em caso de erro. Essa animação `pulse-led` já existe no design system e deve ser reutilizada diretamente.

O texto de status muda conforme o estado interno do componente: `"pronto para receber prompt"`, `"aplicando no canvas…"`, `"erro ao aplicar"`. O badge do modelo exibe o identificador do LLM configurado (ex: `gpt-4o`) e não é clicável nesta versão.

---

### Estados e Transições

| Estado | O que muda visualmente |
|---|---|
| `idle` | LED verde pulsando. Botão "Aplicar" desabilitado. Botões de histórico desabilitados. |
| `ready-to-copy` | Borda do botão "Copiar" ganha mais intensidade indigo conforme o prompt é preenchido. |
| `copied` | Label do botão "Copiar" muda para `"Copiado!"` por 1800ms e reverte. Toast + `UISM.SUCCESS`. |
| `json-valid` | Indicador verde aparece em fade. Botão "Aplicar" habilita. |
| `json-invalid` | Indicador vermelho aparece em fade. Botão "Aplicar" permanece desabilitado. |
| `applying` | LED vira indigo. Texto do rodapé muda para `"aplicando no canvas…"`. Botão "Aplicar" mostra estado de loading. |
| `success` | Textarea JSON limpa com fade-out suave. LED volta a verde. Toast de sucesso. Botões de histórico habilitam. |
| `error` | LED vira vermelho. Toast de erro com instrução clara. Campos permanecem para o usuário corrigir. |

Todas as transições de cor e opacidade usam `duration-200` com `ease-out`. Nenhuma transição usa `ease-spring` — as micro-interações de estado são respostas a dados, não a gestos físicos.

---

## ✅ Critérios de Aceite

- [ ] Cartucho `Prompt Studio` acessível e funcional no `ModuleRack`
- [ ] Botão de cópia copia o prompt formatado com feedback sonoro e toast
- [ ] Colar resposta e clicar em "Aplicar" atualiza o Canvas imediatamente
- [ ] Undo (`Ctrl+Z` ou botão na UI) desfaz a alteração da IA com precisão
- [ ] Sessão de chat pode ser resetada a qualquer momento
- [ ] `npm run build` passa sem erros