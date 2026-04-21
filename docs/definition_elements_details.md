# 📋 Inventário Completo de Elementos

## 🎯 Elementos Definidos

Baseado na arquitetura proposta, temos **4 tipos de elementos**:

1. **BorderElement** - Borda/Moldura
2. **RectangleElement** - Retângulo/Quadrado
3. **TextElement** - Bloco de Texto
4. **ImageElement** - Imagem/Logo

---

## 🔧 Propriedades Comuns (BaseElement)

Todas herdadas por todos os elementos:

| Propriedade | Tipo          | Descrição             | Valor Padrão Sugerido |
| ----------- | ------------- | --------------------- | --------------------- |
| `id`        | `string`      | UUID único            | `crypto.randomUUID()` |
| `type`      | `ElementType` | Tipo do elemento      | `enum ElementType`    |
| `position`  | `Position`    | Posição x,y em mm     | `{ x: 10, y: 10 }`    |
| `zIndex`    | `number`      | Ordem de empilhamento | `0` (auto-incremento) |
| `locked`    | `boolean?`    | Bloqueia edição       | `false`               |
| `visible`   | `boolean?`    | Visibilidade          | `true`                |

### Interface Position

```typescript
interface Position {
  x: number; // em milímetros
  y: number; // em milímetros
}
```

---

## 📐 Propriedades de Dimensionamento

Compartilhadas por elementos que ocupam área (Rectangle, Text, Image):

| Propriedade  | Tipo         | Descrição        | Aplicável em           |
| ------------ | ------------ | ---------------- | ---------------------- |
| `dimensions` | `Dimensions` | Largura e altura | Rectangle, Text, Image |

### Interface Dimensions

```typescript
interface Dimensions {
  width: number; // em milímetros
  height: number; // em milímetros
}
```

---

## 1️⃣ BorderElement (Borda/Moldura)

### Propósito

Desenha uma borda ao redor do canvas ou em posição específica.

### Configurações Específicas

| Propriedade | Tipo          | Descrição                           | Valores Possíveis                     | Padrão Sugerido |
| ----------- | ------------- | ----------------------------------- | ------------------------------------- | --------------- |
| `style`     | `BorderStyle` | Estilo da linha                     | `solid`, `dashed`, `dotted`, `double` | `solid`         |
| `width`     | `number`      | Espessura da borda em mm            | `0.1 - 10`                            | `1`             |
| `color`     | `string`      | Cor em hexadecimal                  | `#000000 - #FFFFFF`                   | `#000000`       |
| `radius`    | `number?`     | Raio para cantos arredondados em mm | `0 - 50`                              | `0`             |

### Enum BorderStyle

```typescript
enum BorderStyle {
  SOLID = 'solid', // ────────
  DASHED = 'dashed', // ── ── ──
  DOTTED = 'dotted', // · · · ·
  DOUBLE = 'double', // ════════
}
```

### Configurações Comuns Herdadas

- ✅ `id`, `type`, `position`, `zIndex`, `locked`, `visible`
- ❌ NÃO possui `dimensions` (calcula automaticamente baseado no canvas)

### Exemplo de Objeto Completo

```json
{
  "id": "border-001",
  "type": "border",
  "position": { "x": 5, "y": 5 },
  "zIndex": 0,
  "locked": false,
  "visible": true,
  "style": "solid",
  "width": 1,
  "color": "#000000",
  "radius": 0
}
```

### Comportamento Especial

- **Posição:** Define o offset interno da borda (ex: `x:5, y:5` = borda com margem de 5mm)
- **Dimensões:** Automaticamente `canvas.width - 2*position.x` e `canvas.height - 2*position.y`

---

## 2️⃣ RectangleElement (Retângulo/Quadrado)

### Propósito

Desenha formas retangulares com preenchimento e/ou contorno.

### Configurações Específicas

| Propriedade    | Tipo      | Descrição                   | Valores Possíveis                    | Padrão Sugerido |
| -------------- | --------- | --------------------------- | ------------------------------------ | --------------- |
| `fillColor`    | `string?` | Cor de preenchimento        | `#000000 - #FFFFFF` ou `transparent` | `#FFFFFF`       |
| `strokeColor`  | `string?` | Cor do contorno             | `#000000 - #FFFFFF`                  | `#000000`       |
| `strokeWidth`  | `number?` | Espessura do contorno em mm | `0 - 10`                             | `1`             |
| `borderRadius` | `number?` | Raio dos cantos em mm       | `0 - min(width, height)/2`           | `0`             |

### Configurações Comuns Herdadas

- ✅ `id`, `type`, `position`, `zIndex`, `locked`, `visible`
- ✅ `dimensions` (largura e altura)

### Exemplo de Objeto Completo

```json
{
  "id": "rect-001",
  "type": "rectangle",
  "position": { "x": 20, "y": 30 },
  "dimensions": { "width": 50, "height": 30 },
  "zIndex": 1,
  "locked": false,
  "visible": true,
  "fillColor": "#E0E0E0",
  "strokeColor": "#000000",
  "strokeWidth": 0.5,
  "borderRadius": 3
}
```

### Casos de Uso

- Caixas de fundo
- Divisores visuais
- Quadrados (quando `width === height`)
- Cantos arredondados para design moderno

---

## 3️⃣ TextElement (Bloco de Texto)

### Propósito

Renderiza texto com formatação e suporte a variáveis dinâmicas.

### Configurações Específicas

| Propriedade     | Tipo               | Descrição                              | Valores Possíveis                     | Padrão Sugerido |
| --------------- | ------------------ | -------------------------------------- | ------------------------------------- | --------------- |
| `content`       | `string`           | Texto a exibir (aceita `{{variavel}}`) | Qualquer string                       | `"Texto"`       |
| `fontFamily`    | `string`           | Família da fonte                       | `Arial`, `Helvetica`, `Times`, custom | `Arial`         |
| `fontSize`      | `number`           | Tamanho da fonte em pt                 | `6 - 500`                             | `12`            |
| `fontWeight`    | `number \| string` | Peso da fonte                          | `100-900`, `normal`, `bold`           | `400`           |
| `fontStyle`     | `string?`          | Estilo da fonte                        | `normal`, `italic`                    | `normal`        |
| `color`         | `string`           | Cor do texto                           | `#000000 - #FFFFFF`                   | `#000000`       |
| `textAlign`     | `TextAlign`        | Alinhamento horizontal                 | `left`, `center`, `right`             | `left`          |
| `verticalAlign` | `VerticalAlign`    | Alinhamento vertical                   | `top`, `middle`, `bottom`             | `top`           |
| `overflow`      | `TextOverflow`     | Comportamento texto longo              | `clip`, `ellipsis`, `wrap`, `scale`   | `clip`          |
| `lineHeight`    | `number?`          | Altura da linha (multiplicador)        | `0.8 - 3`                             | `1.2`           |
| `dataSource`    | `DataSource?`      | Fonte do conteúdo                      | `static`, `variable`                  | `static`        |

### Enums Específicos

#### TextAlign

```typescript
type TextAlign = 'left' | 'center' | 'right';
```

#### VerticalAlign

```typescript
type VerticalAlign = 'top' | 'middle' | 'bottom';
```

#### TextOverflow

```typescript
enum TextOverflow {
  CLIP = 'clip', // Corta texto sem indicação
  ELLIPSIS = 'ellipsis', // Adiciona "..." ao final
  WRAP = 'wrap', // Quebra em múltiplas linhas
  SCALE = 'scale', // Reduz fontSize automaticamente
}
```

#### DataSource

```typescript
type DataSource = 'static' | 'variable';
```

- `static`: Texto fixo definido em `content`
- `variable`: Conteúdo interpolado de dados externos (batch)

### Configurações Comuns Herdadas

- ✅ `id`, `type`, `position`, `zIndex`, `locked`, `visible`
- ✅ `dimensions` (define área de texto)

### Exemplo de Objeto Completo

```json
{
  "id": "text-001",
  "type": "text",
  "position": { "x": 10, "y": 10 },
  "dimensions": { "width": 100, "height": 20 },
  "zIndex": 2,
  "locked": false,
  "visible": true,
  "content": "Nome: {{nome}}",
  "fontFamily": "Arial",
  "fontSize": 14,
  "fontWeight": "bold",
  "fontStyle": "normal",
  "color": "#000000",
  "textAlign": "left",
  "verticalAlign": "middle",
  "overflow": "ellipsis",
  "lineHeight": 1.2,
  "dataSource": "variable"
}
```

### Interpolação de Variáveis

- Sintaxe: `{{nome_da_variavel}}`
- Exemplo: `"Olá {{nome}}, código: {{codigo}}"`
- Dados batch: `{ nome: "João", codigo: "12345" }`
- Resultado: `"Olá João, código: 12345"`

### Comportamento por Overflow

| Modo       | Comportamento                 | Quando Usar           |
| ---------- | ----------------------------- | --------------------- |
| `clip`     | Corta texto sem avisar        | Espaço fixo garantido |
| `ellipsis` | Adiciona `...` no final       | Indicar texto cortado |
| `wrap`     | Quebra linhas automaticamente | Altura flexível       |
| `scale`    | Reduz `fontSize` para caber   | Manter texto completo |

---

## 4️⃣ ImageElement (Imagem/Logo)

### Propósito

Exibe imagens (logo, QR code, fotos) com controle de ajuste e opacidade.

### Configurações Específicas

| Propriedade          | Tipo       | Descrição                 | Valores Possíveis                  | Padrão Sugerido    |
| -------------------- | ---------- | ------------------------- | ---------------------------------- | ------------------ |
| `src`                | `string`   | Data URL da imagem        | `data:image/...`                   | `""` (obrigatório) |
| `fit`                | `ImageFit` | Modo de ajuste            | `cover`, `contain`, `fill`, `none` | `contain`          |
| `opacity`            | `number?`  | Transparência             | `0 - 1`                            | `1`                |
| `smoothing`          | `boolean?` | Anti-aliasing             | `true`, `false`                    | `true`             |
| `compositeOperation` | `string?`  | Modo de composição Canvas | Ver GlobalCompositeOperation       | `source-over`      |

### Enum ImageFit

```typescript
enum ImageFit {
  COVER = 'cover', // Preenche área, pode cortar
  CONTAIN = 'contain', // Cabe dentro, pode ter letterbox
  FILL = 'fill', // Estica para preencher
  NONE = 'none', // Tamanho original (pode sair da área)
}
```

### GlobalCompositeOperation (Canvas API)

Valores comuns para `compositeOperation`:

- `source-over` (padrão): Imagem sobre o fundo
- `multiply`: Multiplica cores (escurece)
- `screen`: Clareia
- `overlay`: Mesclagem
- `darken`, `lighten`: Controle de luminosidade

### Configurações Comuns Herdadas

- ✅ `id`, `type`, `position`, `zIndex`, `locked`, `visible`
- ✅ `dimensions` (área de exibição da imagem)

### Exemplo de Objeto Completo

```json
{
  "id": "img-001",
  "type": "image",
  "position": { "x": 150, "y": 20 },
  "dimensions": { "width": 40, "height": 40 },
  "zIndex": 3,
  "locked": false,
  "visible": true,
  "src": "data:image/png;base64,iVBORw0KGgoAAAANS...",
  "fit": "contain",
  "opacity": 1,
  "smoothing": true,
  "compositeOperation": "source-over"
}
```

### Processo de Upload

1. Usuário seleciona arquivo (`<input type="file">`)
2. `ImageCompressor.compress(file, 800, 0.85)`
3. Retorna dataURL comprimido
4. Armazena em `src`

### Comportamento por Fit

| Modo      | Comportamento              | Aspect Ratio | Quando Usar     |
| --------- | -------------------------- | ------------ | --------------- |
| `cover`   | Preenche área, corta sobra | Mantém       | Fotos de fundo  |
| `contain` | Cabe dentro, letterbox     | Mantém       | Logos, ícones   |
| `fill`    | Estica para preencher      | Distorce     | Raramente       |
| `none`    | Tamanho original           | Mantém       | Controle manual |

---

## 📊 Tabela Comparativa Completa

| Propriedade          | Border | Rectangle | Text | Image | Tipo             | Observação                 |
| -------------------- | ------ | --------- | ---- | ----- | ---------------- | -------------------------- |
| **COMUM**            |
| `id`                 | ✅     | ✅        | ✅   | ✅    | `string`         | UUID                       |
| `type`               | ✅     | ✅        | ✅   | ✅    | `ElementType`    | Enum                       |
| `position`           | ✅     | ✅        | ✅   | ✅    | `Position`       | x, y em mm                 |
| `zIndex`             | ✅     | ✅        | ✅   | ✅    | `number`         | 0-999                      |
| `locked`             | ✅     | ✅        | ✅   | ✅    | `boolean?`       | Bloqueia edição            |
| `visible`            | ✅     | ✅        | ✅   | ✅    | `boolean?`       | Show/hide                  |
| **DIMENSÕES**        |
| `dimensions`         | ❌     | ✅        | ✅   | ✅    | `Dimensions`     | width, height mm           |
| **BORDER**           |
| `style`              | ✅     | ❌        | ❌   | ❌    | `BorderStyle`    | solid/dashed/dotted/double |
| `width`              | ✅     | ❌        | ❌   | ❌    | `number`         | Espessura em mm            |
| `color`              | ✅     | ❌        | ❌   | ❌    | `string`         | Hex color                  |
| `radius`             | ✅     | ❌        | ❌   | ❌    | `number?`        | Cantos arredondados        |
| **RECTANGLE**        |
| `fillColor`          | ❌     | ✅        | ❌   | ❌    | `string?`        | Hex preenchimento          |
| `strokeColor`        | ❌     | ✅        | ❌   | ❌    | `string?`        | Hex contorno               |
| `strokeWidth`        | ❌     | ✅        | ❌   | ❌    | `number?`        | Espessura contorno         |
| `borderRadius`       | ❌     | ✅        | ❌   | ❌    | `number?`        | Cantos arredondados        |
| **TEXT**             |
| `content`            | ❌     | ❌        | ✅   | ❌    | `string`         | Texto + {{vars}}           |
| `fontFamily`         | ❌     | ❌        | ✅   | ❌    | `string`         | Arial, etc                 |
| `fontSize`           | ❌     | ❌        | ✅   | ❌    | `number`         | pt (6-500)                 |
| `fontWeight`         | ❌     | ❌        | ✅   | ❌    | `number\|string` | 100-900, bold              |
| `fontStyle`          | ❌     | ❌        | ✅   | ❌    | `string?`        | normal/italic              |
| `color` (texto)      | ❌     | ❌        | ✅   | ❌    | `string`         | Hex color                  |
| `textAlign`          | ❌     | ❌        | ✅   | ❌    | `TextAlign`      | left/center/right          |
| `verticalAlign`      | ❌     | ❌        | ✅   | ❌    | `VerticalAlign`  | top/middle/bottom          |
| `overflow`           | ❌     | ❌        | ✅   | ❌    | `TextOverflow`   | clip/ellipsis/wrap/scale   |
| `lineHeight`         | ❌     | ❌        | ✅   | ❌    | `number?`        | 0.8-3                      |
| `dataSource`         | ❌     | ❌        | ✅   | ❌    | `DataSource?`    | static/variable            |
| **IMAGE**            |
| `src`                | ❌     | ❌        | ❌   | ✅    | `string`         | dataURL                    |
| `fit`                | ❌     | ❌        | ❌   | ✅    | `ImageFit`       | cover/contain/fill/none    |
| `opacity`            | ❌     | ❌        | ❌   | ✅    | `number?`        | 0-1                        |
| `smoothing`          | ❌     | ❌        | ❌   | ✅    | `boolean?`       | Anti-aliasing              |
| `compositeOperation` | ❌     | ❌        | ❌   | ✅    | `string?`        | Canvas blending            |

---

## 🎨 Valores Padrão Consolidados

### BorderElement Default

```typescript
{
  id: crypto.randomUUID(),
  type: ElementType.BORDER,
  position: { x: 5, y: 5 },
  zIndex: 0,
  locked: false,
  visible: true,
  style: BorderStyle.SOLID,
  width: 1,
  color: '#000000',
  radius: 0
}
```

### RectangleElement Default

```typescript
{
  id: crypto.randomUUID(),
  type: ElementType.RECTANGLE,
  position: { x: 10, y: 10 },
  dimensions: { width: 50, height: 30 },
  zIndex: 1,
  locked: false,
  visible: true,
  fillColor: '#FFFFFF',
  strokeColor: '#000000',
  strokeWidth: 1,
  borderRadius: 0
}
```

### TextElement Default

```typescript
{
  id: crypto.randomUUID(),
  type: ElementType.TEXT,
  position: { x: 10, y: 10 },
  dimensions: { width: 100, height: 20 },
  zIndex: 2,
  locked: false,
  visible: true,
  content: 'Texto',
  fontFamily: 'Arial',
  fontSize: 12,
  fontWeight: 400,
  fontStyle: 'normal',
  color: '#000000',
  textAlign: 'left',
  verticalAlign: 'top',
  overflow: TextOverflow.CLIP,
  lineHeight: 1.2,
  dataSource: 'static'
}
```

### ImageElement Default

```typescript
{
  id: crypto.randomUUID(),
  type: ElementType.IMAGE,
  position: { x: 10, y: 10 },
  dimensions: { width: 50, height: 50 },
  zIndex: 3,
  locked: false,
  visible: true,
  src: '', // Obrigatório fornecer
  fit: ImageFit.CONTAIN,
  opacity: 1,
  smoothing: true,
  compositeOperation: 'source-over'
}
```

---

## 🔍 Regras de Validação por Propriedade

### Validações Comuns

| Propriedade         | Regra     | Mensagem de Erro                   |
| ------------------- | --------- | ---------------------------------- |
| `position.x`        | `>= 0`    | "X não pode ser negativo"          |
| `position.y`        | `>= 0`    | "Y não pode ser negativo"          |
| `zIndex`            | `0 - 999` | "Z-index deve estar entre 0 e 999" |
| `dimensions.width`  | `> 0`     | "Largura deve ser maior que 0"     |
| `dimensions.height` | `> 0`     | "Altura deve ser maior que 0"      |

### Validações Específicas - Border

| Propriedade | Regra               | Mensagem                     |
| ----------- | ------------------- | ---------------------------- |
| `width`     | `0.1 - 10`          | "Espessura entre 0.1 e 10mm" |
| `color`     | `/^#[0-9A-F]{6}$/i` | "Cor deve ser hex (#RRGGBB)" |
| `radius`    | `>= 0`              | "Raio não pode ser negativo" |

### Validações Específicas - Rectangle

| Propriedade    | Regra                                | Mensagem                                         |
| -------------- | ------------------------------------ | ------------------------------------------------ |
| `fillColor`    | `/^#[0-9A-F]{6}$/i \| 'transparent'` | "Cor inválida"                                   |
| `strokeWidth`  | `0 - 10`                             | "Espessura entre 0 e 10mm"                       |
| `borderRadius` | `0 - min(width, height)/2`           | "Raio não pode exceder metade da menor dimensão" |

### Validações Específicas - Text

| Propriedade  | Regra                                      | Mensagem                     |
| ------------ | ------------------------------------------ | ---------------------------- |
| `content`    | `!== ''`                                   | "Texto não pode estar vazio" |
| `fontSize`   | `6 - 500`                                  | "Tamanho entre 6 e 500pt"    |
| `fontWeight` | `100-900 (step 100) \| 'normal' \| 'bold'` | "Peso inválido"              |
| `lineHeight` | `0.8 - 3`                                  | "Entre 0.8 e 3"              |

### Validações Específicas - Image

| Propriedade | Regra                       | Mensagem                |
| ----------- | --------------------------- | ----------------------- |
| `src`       | `startsWith('data:image/')` | "DataURL inválido"      |
| `opacity`   | `0 - 1`                     | "Opacidade entre 0 e 1" |

---

## 🎯 Resumo Executivo

### Contagem Total

- **4 tipos de elementos**
- **6 propriedades comuns** (todos)
- **2 propriedades de dimensão** (3 elementos)
- **22 propriedades específicas** (distribuídas)
- **Total: 30 propriedades únicas**

### Complexidade por Elemento

| Elemento  | Props Totais | Props Comuns       | Props Específicas |
| --------- | ------------ | ------------------ | ----------------- |
| Border    | 10           | 6                  | 4                 |
| Rectangle | 12           | 8 (com dimensions) | 4                 |
| Text      | 19           | 8 (com dimensions) | 11                |
| Image     | 14           | 8 (com dimensions) | 6                 |

### Ordem de Implementação Sugerida

1. **Rectangle** - Mais simples, testa rendering básico
2. **Border** - Sem dimensions, lógica especial
3. **Text** - Mais complexo, usa canvas-txt
4. **Image** - Depende de upload, async

---
