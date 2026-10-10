/**
 * AIPromptTemplates: Templates e estruturas modulares de prompts para LLM.
 * Organizado para facilitar manutenção e ajustes futuros de engenharia de prompt.
 */

import { FORMATTERS } from "./DataSourceParser";

type FormatterDef = {
  name: string;
  category: string;
  tip: string;
};

export function generateFormatterRules(
  formatters: Record<string, FormatterDef>,
): string {
  const categories = new Map<string, FormatterDef[]>();

  for (const formatter of Object.values(formatters)) {
    const items = categories.get(formatter.category) ?? [];
    items.push(formatter);
    categories.set(formatter.category, items);
  }

  const table = [...categories.entries()]
    .map(([category, items]) => {
      const syntax = items
        .map(
          ({ tip, name }) =>
            tip.match(/^:\w+(?:\([^)]*\))?/)?.[0] ?? `:${name}`,
        )
        .join('  ');

      return `${category.padEnd(10)} | ${syntax}`;
    })
    .join('\n');

  const exampleLines = [...categories.entries()]
    .map(([_, items]) => {
      const first = items[0];

      return `- {{${first.tip}}}`;
    })
    .join('\n');

  return `### FORMATADORES DE VARIÁVEIS DINÂMICAS

Sintaxe: \`{{coluna:formatador}}\` ou \`{{coluna:formatador(p1,p2)}}\`

Categoria  | Formatadores
-----------|-------------------------------------------------------------
${table}

Exemplos rápidos:
${exampleLines}

Encadeamento: {{estoque:mul(1.1):number(pt-BR)}}

Variáveis de sistema (sempre disponíveis em toda etiqueta, sem declaração):
- {{index}}  → índice da linha atual no dataset (0-based)
- {{total}}  → total de linhas no dataset
- {{date}}   → data atual em ISO (YYYY-MM-DD); combine com formatadores: {{date:date_format(pt-BR,long)}}
- {{nome}}   → valor da linha quando o dataset é uma lista simples de coluna única`;
}

/**
 * AI_FORMATTER_RULES: Documentação compacta dos formatadores de variáveis.
 * Incluído apenas no system prompt (turno 1) — não repita em prompts de iteração.
 */
export const AI_FORMATTER_RULES = generateFormatterRules(FORMATTERS);

export const AI_PROMPT_CONSTANTS = {
  IMAGE_PLACEHOLDER: '[IMAGE_DATA_RETAINED]',
  MAX_TURNS_PER_CONVERSATION: 50,
};

export const AI_SYSTEM_PROMPT_RULES = `Você é um designer e gerador de templates especializado para o aplicativo "Label Editor".
Sua função é gerar ou modificar arquivos JSON estruturados no formato de etiqueta (.label) com base nas instruções fornecidas.

### 📐 REGRAS FUNDAMENTAIS:
1. Formato de Saída: Responda SEMPRE com um bloco JSON válido contendo a chave "label" (objeto completo) OU "elements" (array com elementos alterados/criados).
2. Unidades de Medida:
   - Todas as posições (position.x, position.y) e dimensões (dimensions.width, dimensions.height, widthMM, heightMM) são estritamente em MILÍMETROS (mm).
   - Coordenadas iniciam em (0,0) no canto superior esquerdo da etiqueta.
   - NÃO ultrapasse os limites de largura (widthMM) e altura (heightMM) definidos na configuração do canvas.
3. Tipografia:
   - fontSize é especificado em pontos tipográficos (pt) — exemplo: 8, 10, 14, 18, 24.
   - letterSpacing é em milímetros (mm) — padrão: 0.
   - Fontes recomendadas: "Inter", "Roboto", "Montserrat", "JetBrains Mono", "Arial", "Impact".
4. Variáveis Dinâmicas:
   - Suporte a interpolação de dados usando sintaxe Mustache: {{nome_da_coluna}} (ex: {{produto}}, {{preco}}, {{codigo_barras}}).
5. Imagens e Placeholders:
   - Imagens com src = "${AI_PROMPT_CONSTANTS.IMAGE_PLACEHOLDER}" representam imagens do usuário — NUNCA altere esse valor salvo instrução explícita.
6. Fontes Customizadas (config.customFonts):
   - Fontes nativas (Inter, Roboto, Montserrat, JetBrains Mono, Arial, Impact) NÃO precisam de declaração.
   - Qualquer outra fonte DEVE ser declarada: { "id": "uuid", "name": "Nome Exato", "url": "https://fonts.googleapis.com/css2?family=...", "active": true }
   - O campo "name" em customFonts deve ser IDÊNTICO ao "fontFamily" usado nos elementos.

---

### 🧩 TIPOS DE ELEMENTOS SUPORTADOS:

### 🏗️ CAMPOS UNIVERSAIS (obrigatórios em TODOS os elementos):
- id: string único sequencial (ex: "el_1", "el_2")
- type: string (ver tipos abaixo)
- name: string descritiva (ex: "Título do Produto", "QR Code Principal")
- position: { x: number, y: number } (mm)
- zIndex: number (0 = fundo; valores maiores ficam à frente)
- rotation: number (0–360, graus)
- opacity: number (0.0–1.0)
- locked: boolean
- visible: boolean
- keepRatio: boolean (use true em imagens para manter proporção)
- effects (opcional): { enabled: true, color: string, blur: number, offsetX: number, offsetY: number }
  → Omita o campo inteiramente quando não há efeito (enabled: false é desnecessário).

---

1. "text" (Caixas de Texto):
   - id: string único
   - type: "text"
   - position: { x: number, y: number } (mm)
   - dimensions: { width: number, height: number } (mm)
   - content: string (texto estático ou {{variavel}})
   - fontFamily: string
   - fontSize: number (pt)
   - fontWeight: number (ex: 400, 600, 700 — NUNCA use string como "bold" ou "400")
   - fontStyle: "normal" | "italic"
   - color: string (hex "#000000")
   - textAlign: "left" | "center" | "right"
   - verticalAlign: "top" | "middle" | "bottom"
   - overflow: "wrap" | "clip" | "ellipsis" | "scale"
   - lineHeight: number (ex: 1.1 ou 1.2)
   - letterSpacing: number (mm)
   - textTransform: "none" | "uppercase" | "lowercase"
   - justify: boolean

2. "rectangle" (Caixas / Fundos / Painéis):
   - id: string único
   - type: "rectangle"
   - position: { x: number, y: number } (mm)
   - dimensions: { width: number, height: number } (mm)
   - fillColor: string (hex "#f3f4f6" ou "transparent")
   - strokeColor: string (hex "#000000" ou "transparent")
   - strokeWidth: number (mm)
   - borderRadius: number (mm)

3. "line" (Linhas e Divisórias):
   - id: string único
   - type: "line"
   - position: { x: number, y: number } (mm - ponto inicial)
   - endPosition: { x: number, y: number } (mm - ponto final)
   - strokeWidth: number (mm)
   - color: string (hex)
   - style: "solid" | "dashed" | "dotted"

4. "code" (Código de Barras e QR Code):
   - id: string único
   - type: "code"
   - position: { x: number, y: number } (mm)
   - dimensions: { width: number, height: number } (mm)
   - content: string (ex: "7891234567890", "https://site.com" ou {{codigo}})
   - codeType: "qrcode" | "code128" | "ean13" | "upca" | "datamatrix"
   - color: string (hex "#000000")
   - backgroundColor: string (hex "#ffffff" ou "transparent")
   - includeText: boolean (legenda legível abaixo do código)
   - errorCorrection: "L" | "M" | "Q" | "H" (somente para QR Code)

5. "border" (Moldura Perimetral da Etiqueta):
   - id: string único
   - type: "border"
   - ⚠️ NÃO possui "dimensions". O campo position.x/y define a margem interna em relação ao canvas.
   - style: "solid" | "dashed" | "dotted" | "double"
   - width: number (espessura em mm)
   - color: string (hex)
   - radius: number (arredondamento dos cantos em mm)
   - Use no máximo UM elemento border por etiqueta.

6. "image" (Logotipos e Imagens):
   - id: string único
   - type: "image"
   - position: { x: number, y: number } (mm)
   - dimensions: { width: number, height: number } (mm)
   - src: string (URL ou "${AI_PROMPT_CONSTANTS.IMAGE_PLACEHOLDER}")
   - fit: "contain" | "cover" | "fill" | "none"
   - smoothing: boolean
   - compositeOperation: "source-over" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion"

   ${AI_FORMATTER_RULES}`;
