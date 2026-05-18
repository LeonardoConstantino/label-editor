# Task 85: Typeface Engine Module (Custom Font Manager)

## Objetivo
Criar um novo cartucho para o Rack de Módulos chamado "Typeface Engine". Ele permitirá ao usuário estender o Design System padrão da aplicação injetando fontes customizadas via URL (Google Fonts ou `.ttf/.woff` remoto). O painel atua como uma "Galeria Tipográfica", oferecendo live-previews interativos de cada fonte adicionada, permitindo habilitar/desabilitar fontes para não pesar a memória do documento.

## Workflow
1. `git checkout -b task/85-typeface-engine`
2. **Criação do Componente:** `src/components/editor/modules/TypefaceEngine.ts`.
3. **Gerenciamento de Estado:** Adicionar a propriedade `customFonts: CustomFont[]` ao `Store` ou em uma configuração específica do documento.
   - Interface: `{ id: string, name: string, url: string, active: boolean }`.
4. **Injeção Dinâmica:** O componente deve interceptar a URL inserida, injetar a tag `<link rel="stylesheet">` no `<head>` do documento, e imediatamente atualizar o menu de `<ui-select>` (Dropdown de Fontes) do *Element Inspector*.

## Detalhamento de UI/UX (Tactile Prism)

Este módulo será dividido verticalmente em 2 zonas:

### 1. Zona de Entrada (Font Ingestion Terminal)
- **Visual:** Um bloco fixado no topo do módulo (`bg-[#050608]`, borda `border-b border-border-ui`, padding `p-4`).
- **Comandos:** 
  - Input Text (`<input class="input-prism">`) com placeholder: *"Paste Google Fonts URL (e.g. https://fonts.googleapis.com/...)"*
  - Botão secundário colado na direita do input: `[ INJECT FONT ]`.
- **Feedback Juice:** Ao clicar em injetar, a borda do input pisca em uma "Linha de Scanner" rápida e o som de `save` (encaixe mecânico) é tocado.

### 2. O Inventário Tipográfico (The Specimen Grid)
- **A Lista:** Abaixo da entrada de dados, uma área de rolagem (overflow-y) contendo os "Cartões de Tipografia".
- **O Cartão de Fonte (Typeface Card):**
  - Cada fonte instalada vive em um cartão (`bg-surface-solid border border-border-ui rounded-xl p-4`).
  - **Cabeçalho do Cartão:** 
    - Esquerda: O Nome da Fonte (ex: *Roboto Mono*).
    - Direita: Um `<input type="checkbox">` (Tactile Toggle Switch) para Habilitar/Desabilitar a fonte na sessão atual. 
    - E um botão "Lixeira" vermelho super sutil que surge no hover.
  - **O Espécime (Live Preview):**
    - Abaixo do cabeçalho, um bloco cinza (`bg-black/20 p-3 rounded-lg border border-white/5 shadow-inner`).
    - **O Juice Crítico:** Dentro desse bloco, haverá o texto *“The quick brown fox jumps over the lazy dog”*. Esse texto DEVE estar renderizando na fonte daquele cartão (`font-family: 'Nome da Fonte'`). 
    - O pulo do gato: Esse texto é editável (`contenteditable="true"`), permitindo que o usuário apague e digite o nome do produto dele ali mesmo para testar como as letras se comportam antes de usar no Canvas!

### 3. Integração e Validação (Anti-Quebra)
- **Validação Regex:** A IA deve implementar uma Regex que extrai o nome real da família tipográfica de dentro do Link do Google Fonts fornecido, ex: `family=Oswald:wght@400` -> Extrai `Oswald`.
- **Fallback State:** O componente já deve nascer com 3 fontes nativas pré-listadas no painel (ex: `Inter`, `JetBrains Mono`, `Arial`), mas sem o botão de lixeira (pois são de sistema).

## Critérios de Aceite
- [ ] O usuário consegue colar um link do Google Fonts e o painel extrai o Nome da Fonte corretamente.
- [ ] Um novo "Cartão de Fonte" é renderizado na lista, baixando a tipografia e aplicando o estilo ao texto de *Live Preview* interno.
- [ ] O texto de preview (Espécime) permite edição livre pelo usuário.
- [ ] Desabilitar o toggle de uma fonte impede que ela apareça na lista de seleção de fontes do *Element Inspector*, sem excluí-la do projeto.

---

### 💻 Dica de UX para a IA (Como extrair a fonte do Google)
Ao construir o *parser* da URL, instrua o agente a usar esta lógica simples:
```javascript
// Exemplo: https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400&display=swap
const url = fontUrlInput.value;
const match = url.match(/family=([^:&]+)/);
if (match) {
  const fontName = match[1].replace(/\+/g, ' '); // Vira "Space Grotesk"
  // 1. Injeta a URL no <head>
  // 2. Salva { name: fontName, url } no Store
  // 3. Renderiza o Card
}
```

Essa interface de tipografia transforma a aplicação numa verdadeira **Workbench Gráfica**. O usuário vai se sentir um *Type Designer* testando letras na prancheta antes de mandá-las para a produção. 
