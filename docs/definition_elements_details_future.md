```markdown
---

## 💡 Ideias de Elementos Futuros

Esta seção documenta elementos propostos para evolução do Label Editor, organizados por prioridade de implementação e impacto no produto.

---

### 🚀 Alta Prioridade

Elementos essenciais que expandem significativamente as capacidades do editor para casos de uso reais.

#### BarcodeElement

**Propósito:** Gerar códigos de barras automaticamente a partir de dados dinâmicos.

**Propriedades Específicas:**

| Propriedade      | Type           | Descrição                      | Valores Possíveis                       | Padrão    |
| ---------------- | -------------- | ------------------------------ | --------------------------------------- | --------- |
| `content`        | `string`       | Dados a codificar              | Texto ou `{{variavel}}`                 | `""`      |
| `format`         | `BarcodeFormat`| Tipo de código                 | `CODE128`, `EAN13`, `UPC`, `CODE39`     | `CODE128` |
| `displayValue`   | `boolean`      | Exibir números abaixo          | `true`, `false`                         | `true`    |
| `height`         | `number`       | Altura das barras em mm        | `5 - 50`                                | `20`      |
| `margin`         | `number`       | Margem ao redor em mm          | `0 - 10`                                | `2`       |
| `lineColor`      | `string`       | Cor das barras                 | Hex color                               | `#000000` |
| `backgroundColor`| `string`       | Cor de fundo                   | Hex color ou `transparent`              | `#FFFFFF` |
| `fontSize`       | `number`       | Tamanho da fonte do texto (pt) | `6 - 16`                                | `10`      |

**Herda:** `id`, `type`, `position`, `dimensions`, `zIndex`, `locked`, `visible`

**Casos de Uso:**
- Etiquetas de produtos com SKU
- Rastreamento de lotes de produção
- Identificação de ativos

**Exemplo:**
```json
{
  "id": "barcode-001",
  "type": "barcode",
  "position": { "x": 50, "y": 40 },
  "dimensions": { "width": 80, "height": 25 },
  "zIndex": 4,
  "content": "{{sku}}",
  "format": "CODE128",
  "displayValue": true,
  "height": 20,
  "margin": 2,
  "lineColor": "#000000",
  "backgroundColor": "#FFFFFF",
  "fontSize": 10
}
```

---

#### QRCodeElement

**Propósito:** Gerar QR Codes para URLs, dados de rastreamento ou informações complexas.

**Propriedades Específicas:**

| Propriedade       | Type              | Descrição                    | Valores Possíveis            | Padrão    |
| ----------------- | ----------------- | ---------------------------- | ---------------------------- | --------- |
| `content`         | `string`          | Dados a codificar            | Texto ou `{{variavel}}`      | `""`      |
| `size`            | `number`          | Tamanho do QR (quadrado) mm  | `10 - 100`                   | `30`      |
| `errorCorrection` | `ErrorCorrection` | Nível de correção de erro    | `L`, `M`, `Q`, `H`           | `M`       |
| `foregroundColor` | `string`          | Cor dos módulos              | Hex color                    | `#000000` |
| `backgroundColor` | `string`          | Cor de fundo                 | Hex color ou `transparent`   | `#FFFFFF` |
| `includeMargin`   | `boolean`         | Incluir margem de segurança  | `true`, `false`              | `true`    |

**Enum ErrorCorrection:**
- `L` (Low): ~7% de recuperação
- `M` (Medium): ~15% de recuperação
- `Q` (Quartile): ~25% de recuperação
- `H` (High): ~30% de recuperação

**Herda:** `id`, `type`, `position`, `zIndex`, `locked`, `visible`

**Casos de Uso:**
- Links para páginas de produto
- Rastreabilidade de lotes
- Informações nutricionais estendidas
- Autenticação de produtos

**Exemplo:**
```json
{
  "id": "qr-001",
  "type": "qrcode",
  "position": { "x": 150, "y": 10 },
  "zIndex": 4,
  "content": "https://produto.com/{{codigo}}",
  "size": 30,
  "errorCorrection": "M",
  "foregroundColor": "#000000",
  "backgroundColor": "#FFFFFF",
  "includeMargin": true
}
```

---

#### GroupElement

**Propósito:** Agrupar elementos relacionados para manipulação em bloco e organização hierárquica.

**Propriedades Específicas:**

| Propriedade | Type       | Descrição                          | Valores Possíveis | Padrão  |
| ----------- | ---------- | ---------------------------------- | ----------------- | ------- |
| `children`  | `string[]` | IDs dos elementos filhos           | Array de UUIDs    | `[]`    |
| `rotation`  | `number?`  | Rotação do grupo em graus          | `0 - 360`         | `0`     |
| `scale`     | `number?`  | Escala proporcional do grupo       | `0.1 - 5`         | `1`     |

**Herda:** `id`, `type`, `position`, `zIndex`, `locked`, `visible`

**Comportamento:**
- `locked`: Bloqueia edição de todos os filhos
- `visible`: Controla visibilidade de todos os filhos
- `position`: Offset relativo aplicado a todos os filhos
- `rotation`/`scale`: Transformações aplicadas ao grupo

**Casos de Uso:**
- Templates com logo + texto corporativo
- Blocos de informações reutilizáveis
- Movimentação/edição simultânea de múltiplos elementos
- Base para sistema de componentes

**Exemplo:**
```json
{
  "id": "group-001",
  "type": "group",
  "position": { "x": 0, "y": 0 },
  "zIndex": 5,
  "locked": false,
  "visible": true,
  "children": ["text-001", "img-001", "rect-001"],
  "rotation": 0,
  "scale": 1
}
```

---

### 📊 Média Prioridade

Elementos que aumentam produtividade e ampliam casos de uso sem adicionar complexidade excessiva.

#### LineElement

**Propósito:** Desenhar linhas retas (horizontal, vertical ou diagonal) como separadores visuais.

**Propriedades Específicas:**

| Propriedade    | Type          | Descrição                | Valores Possíveis           | Padrão    |
| -------------- | ------------- | ------------------------ | --------------------------- | --------- |
| `endPosition`  | `Position`    | Ponto final da linha     | x, y em mm                  | -         |
| `strokeWidth`  | `number`      | Espessura da linha em mm | `0.1 - 10`                  | `1`       |
| `strokeColor`  | `string`      | Cor da linha             | Hex color                   | `#000000` |
| `strokeStyle`  | `StrokeStyle` | Estilo da linha          | `solid`, `dashed`, `dotted` | `solid`   |
| `dashPattern`  | `number[]?`   | Padrão customizado       | `[comprimento, espaço]`     | -         |

**Herda:** `id`, `type`, `position`, `zIndex`, `locked`, `visible`

**Observação:** `position` define o ponto inicial, `endPosition` define o ponto final.

**Casos de Uso:**
- Separadores de seções
- Sublinhados decorativos
- Linhas de corte/dobra
- Diagramas simples

**Exemplo:**
```json
{
  "id": "line-001",
  "type": "line",
  "position": { "x": 10, "y": 50 },
  "endPosition": { "x": 190, "y": 50 },
  "zIndex": 1,
  "strokeWidth": 0.5,
  "strokeColor": "#CCCCCC",
  "strokeStyle": "dashed",
  "dashPattern": [5, 3]
}
```

---

#### TableElement

**Propósito:** Renderizar dados tabulares (especificações técnicas, ingredientes, composição).

**Propriedades Específicas:**

| Propriedade     | Type        | Descrição                      | Valores Possíveis | Padrão    |
| --------------- | ----------- | ------------------------------ | ----------------- | --------- |
| `columns`       | `Column[]`  | Definição das colunas          | Ver Column abaixo | `[]`      |
| `dataSource`    | `DataSource`| Origem dos dados               | `static`, `batch` | `static`  |
| `staticData`    | `string[][]`| Dados fixos (se static)        | Matriz de strings | `[]`      |
| `maxRows`       | `number?`   | Limite de linhas a exibir      | `1 - 100`         | `10`      |
| `cellPadding`   | `number`    | Espaço interno das células mm  | `0.5 - 10`        | `2`       |
| `borderWidth`   | `number`    | Espessura das bordas em mm     | `0 - 5`           | `0.5`     |
| `borderColor`   | `string`    | Cor das bordas                 | Hex color         | `#000000` |
| `headerBgColor` | `string?`   | Cor de fundo do cabeçalho      | Hex color         | `#F0F0F0` |
| `altRowColor`   | `string?`   | Cor de linhas alternadas       | Hex color         | -         |
| `fontSize`      | `number`    | Tamanho da fonte em pt         | `6 - 24`          | `10`      |

**Interface Column:**
```typescript
interface Column {
  header: string;           // Título da coluna
  dataKey?: string;         // Chave para batch data ({{nome}})
  width: number;            // Largura em mm
  textAlign: TextAlign;     // left/center/right
}
```

**Herda:** `id`, `type`, `position`, `dimensions`, `zIndex`, `locked`, `visible`

**Casos de Uso:**
- Tabelas nutricionais
- Listas de ingredientes
- Especificações técnicas
- Comparativos de produtos

**Exemplo:**
```json
{
  "id": "table-001",
  "type": "table",
  "position": { "x": 10, "y": 80 },
  "dimensions": { "width": 180, "height": 60 },
  "zIndex": 2,
  "columns": [
    { "header": "Nutriente", "width": 90, "textAlign": "left" },
    { "header": "Quantidade", "width": 60, "textAlign": "right" },
    { "header": "% VD", "width": 30, "textAlign": "center" }
  ],
  "dataSource": "static",
  "staticData": [
    ["Calorias", "150 kcal", "7%"],
    ["Proteínas", "8g", "11%"]
  ],
  "cellPadding": 2,
  "borderWidth": 0.5,
  "borderColor": "#000000",
  "fontSize": 9
}
```

---

#### DateTimeElement

**Propósito:** Exibir datas/horários formatados automaticamente, com suporte a cálculos de offset.

**Propriedades Específicas:**

| Propriedade    | Type           | Descrição                       | Valores Possíveis               | Padrão        |
| -------------- | -------------- | ------------------------------- | ------------------------------- | ------------- |
| `source`       | `DateSource`   | Origem da data                  | `current`, `variable`, `fixed`  | `current`     |
| `variableName` | `string?`      | Nome da variável (se variable)  | `{{data_fabricacao}}`           | -             |
| `fixedDate`    | `string?`      | Data fixa ISO (se fixed)        | `YYYY-MM-DD`                    | -             |
| `format`       | `string`       | Padrão de formatação            | Tokens de formatação            | `DD/MM/YYYY`  |
| `locale`       | `string`       | Locale para formatação          | `pt-BR`, `en-US`, etc           | `pt-BR`       |
| `offsetDays`   | `number?`      | Dias a adicionar/subtrair       | `-999 - 999`                    | `0`           |
| `fontSize`     | `number`       | Tamanho da fonte em pt          | `6 - 100`                       | `12`          |
| `fontFamily`   | `string`       | Família da fonte                | `Arial`, `Helvetica`, etc       | `Arial`       |
| `color`        | `string`       | Cor do texto                    | Hex color                       | `#000000`     |
| `textAlign`    | `TextAlign`    | Alinhamento horizontal          | `left`, `center`, `right`       | `left`        |

**Enum DateSource:**
```typescript
type DateSource = 'current' | 'variable' | 'fixed';
```

**Tokens de Formatação Comuns:**
- `DD/MM/YYYY` → `22/04/2026`
- `YYYY-MM-DD` → `2026-04-22`
- `DD MMM YYYY` → `22 Abr 2026`
- `HH:mm:ss` → `14:30:00`
- `DD/MM/YYYY HH:mm` → `22/04/2026 14:30`

**Herda:** `id`, `type`, `position`, `dimensions`, `zIndex`, `locked`, `visible`

**Casos de Uso:**
- Data de fabricação (current)
- Data de validade (current + offsetDays: 30)
- Lote com timestamp
- Certificações com data fixa

**Exemplo:**
```json
{
  "id": "date-001",
  "type": "datetime",
  "position": { "x": 10, "y": 150 },
  "dimensions": { "width": 80, "height": 10 },
  "zIndex": 2,
  "source": "current",
  "format": "DD/MM/YYYY",
  "locale": "pt-BR",
  "offsetDays": 0,
  "fontSize": 10,
  "color": "#000000",
  "textAlign": "left"
}
```

**Exemplo com Offset (Validade):**
```json
{
  "id": "date-002",
  "type": "datetime",
  "position": { "x": 100, "y": 150 },
  "dimensions": { "width": 80, "height": 10 },
  "zIndex": 2,
  "source": "current",
  "format": "DD/MM/YYYY",
  "offsetDays": 365,
  "fontSize": 10,
  "color": "#000000"
}
```

---

#### IconElement

**Propósito:** Inserir ícones vetoriais de bibliotecas populares ou customizados.

**Propriedades Específicas:**

| Propriedade | Type         | Descrição               | Valores Possíveis                 | Padrão       |
| ----------- | ------------ | ----------------------- | --------------------------------- | ------------ |
| `library`   | `IconLibrary`| Biblioteca de ícones    | `fontawesome`, `material`, `svg`  | `fontawesome`|
| `iconName`  | `string`     | Nome/código do ícone    | `fa-check`, `md-warning`, etc     | -            |
| `svgPath`   | `string?`    | Path SVG customizado    | SVG path data (se library=svg)    | -            |
| `size`      | `number`     | Tamanho em mm           | `3 - 50`                          | `10`         |
| `color`     | `string`     | Cor do ícone            | Hex color                         | `#000000`    |
| `rotation`  | `number?`    | Rotação em graus        | `0 - 360`                         | `0`          |

**Herda:** `id`, `type`, `position`, `zIndex`, `locked`, `visible`

**Casos de Uso:**
- Símbolos de alerta/aviso
- Checkmarks para certificações
- Ícones informativos (reciclável, vegano, etc)
- Setas direcionais

**Exemplo:**
```json
{
  "id": "icon-001",
  "type": "icon",
  "position": { "x": 180, "y": 160 },
  "zIndex": 3,
  "library": "fontawesome",
  "iconName": "fa-check-circle",
  "size": 8,
  "color": "#00AA00",
  "rotation": 0
}
```

---

### 🎨 Baixa Prioridade

Elementos para casos de uso específicos ou recursos estéticos avançados.

#### CircleElement

**Propósito:** Desenhar círculos e elipses perfeitos.

**Propriedades Específicas:**

| Propriedade   | Type      | Descrição                  | Valores Possíveis | Padrão      |
| ------------- | --------- | -------------------------- | ----------------- | ----------- |
| `radius`      | `number?` | Raio (para círculo) em mm  | `> 0`             | -           |
| `radiusX`     | `number?` | Raio horizontal (elipse)   | `> 0`             | -           |
| `radiusY`     | `number?` | Raio vertical (elipse)     | `> 0`             | -           |
| `fillColor`   | `string?` | Cor de preenchimento       | Hex color         | `#FFFFFF`   |
| `strokeColor` | `string?` | Cor do contorno            | Hex color         | `#000000`   |
| `strokeWidth` | `number?` | Espessura do contorno mm   | `0 - 10`          | `1`         |

**Herda:** `id`, `type`, `position`, `zIndex`, `locked`, `visible`

**Observação:** Se `radius` definido, ignora `radiusX`/`radiusY`. Para elipse, usar `radiusX` e `radiusY`.

**Alternativa Atual:** Pode ser simulado com `RectangleElement` onde `width === height` e `borderRadius: 999`.

---

#### PolygonElement

**Propósito:** Desenhar formas poligonais customizadas (triângulos, hexágonos, setas).

**Propriedades Específicas:**

| Propriedade   | Type        | Descrição                      | Valores Possíveis | Padrão    |
| ------------- | ----------- | ------------------------------ | ----------------- | --------- |
| `points`      | `Position[]`| Vértices do polígono           | Array de x,y      | `[]`      |
| `closed`      | `boolean`   | Fechar caminho automaticamente | `true`, `false`   | `true`    |
| `fillColor`   | `string?`   | Cor de preenchimento           | Hex color         | `#FFFFFF` |
| `strokeColor` | `string?`   | Cor do contorno                | Hex color         | `#000000` |
| `strokeWidth` | `number?`   | Espessura do contorno mm       | `0 - 10`          | `1`       |

**Herda:** `id`, `type`, `position`, `zIndex`, `locked`, `visible`

**Exemplo (Triângulo):**
```json
{
  "id": "poly-001",
  "type": "polygon",
  "position": { "x": 50, "y": 50 },
  "zIndex": 1,
  "points": [
    { "x": 0, "y": 0 },
    { "x": 20, "y": 0 },
    { "x": 10, "y": 17.32 }
  ],
  "closed": true,
  "fillColor": "#FFD700",
  "strokeColor": "#000000",
  "strokeWidth": 1
}
```

---

#### GradientElement

**Propósito:** Criar fundos com gradientes lineares ou radiais.

**Propriedades Específicas:**

| Propriedade    | Type            | Descrição                    | Valores Possíveis       | Padrão    |
| -------------- | --------------- | ---------------------------- | ----------------------- | --------- |
| `gradientType` | `GradientType`  | Tipo de gradiente            | `linear`, `radial`      | `linear`  |
| `startColor`   | `string`        | Cor inicial                  | Hex color               | `#FFFFFF` |
| `endColor`     | `string`        | Cor final                    | Hex color               | `#000000` |
| `angle`        | `number?`       | Ângulo (linear) em graus     | `0 - 360`               | `0`       |
| `centerPoint`  | `Position?`     | Centro (radial)              | x,y relativo            | `center`  |
| `stops`        | `ColorStop[]?`  | Paradas de cor customizadas  | Ver ColorStop           | -         |

**Interface ColorStop:**
```typescript
interface ColorStop {
  offset: number;  // 0-1 (posição no gradiente)
  color: string;   // Hex color
}
```

**Herda:** `id`, `type`, `position`, `dimensions`, `zIndex`, `locked`, `visible`

**Alternativa Atual:** Gerar como `ImageElement` com dataURL de canvas renderizado.

---

#### WatermarkElement

**Propósito:** Adicionar marcas d'água de proteção ou identificação.

**Propriedades Específicas:**

| Propriedade | Type     | Descrição                     | Valores Possíveis | Padrão       |
| ----------- | -------- | ----------------------------- | ----------------- | ------------ |
| `content`   | `string` | Texto da marca d'água         | Qualquer string   | `"RASCUNHO"` |
| `fontSize`  | `number` | Tamanho da fonte em pt        | `12 - 100`        | `48`         |
| `color`     | `string` | Cor do texto                  | Hex color         | `#CCCCCC`    |
| `opacity`   | `number` | Transparência                 | `0 - 1`           | `0.2`        |
| `rotation`  | `number` | Rotação em graus              | `0 - 360`         | `-45`        |
| `repeat`    | `boolean`| Repetir em grade              | `true`, `false`   | `false`      |

**Herda:** `id`, `type`, `position`, `dimensions`, `zIndex`, `locked`, `visible`

**Alternativa Atual:** Implementável como `TextElement` com `opacity: 0.2`, `rotation: -45`, `zIndex: 999`.

---

#### PathElement (SVG Path)

**Propósito:** Renderizar formas SVG complexas e customizadas.

**Propriedades Específicas:**

| Propriedade           | Type      | Descrição                    | Valores Possíveis  | Padrão       |
| --------------------- | --------- | ---------------------------- | ------------------ | ------------ |
| `pathData`            | `string`  | String de path SVG           | `d="M10 10 L..."` | -            |
| `fillColor`           | `string?` | Cor de preenchimento         | Hex color          | `#000000`    |
| `strokeColor`         | `string?` | Cor do contorno              | Hex color          | `transparent`|
| `strokeWidth`         | `number?` | Espessura do contorno mm     | `0 - 10`           | `1`          |
| `preserveAspectRatio` | `boolean` | Manter proporção ao escalar  | `true`, `false`    | `true`       |

**Herda:** `id`, `type`, `position`, `dimensions`, `zIndex`, `locked`, `visible`

**Casos de Uso:**
- Importar logos vetoriais customizados
- Formas complexas de design
- Ícones SVG não disponíveis em bibliotecas

---

#### MaskElement

**Propósito:** Criar máscaras de recorte para outros elementos.

**Propriedades Específicas:**

| Propriedade  | Type           | Descrição                       | Valores Possíveis               | Padrão |
| ------------ | -------------- | ------------------------------- | ------------------------------- | ------ |
| `shape`      | `MaskShape`    | Formato da máscara              | `rectangle`, `circle`, `custom` | -      |
| `shapeConfig`| `object`       | Configuração da forma           | Rectangle/Circle/Path           | -      |
| `appliesTo`  | `string[]`     | IDs dos elementos afetados      | Array de UUIDs                  | `[]`   |
| `invert`     | `boolean?`     | Inverter máscara                | `true`, `false`                 | `false`|

**Herda:** `id`, `type`, `position`, `dimensions`, `zIndex`, `locked`, `visible`

**Complexidade:** Alta - requer manipulação de canvas compositing.

---

## 📋 Matriz de Priorização

| Elemento         | Prioridade | Complexidade | Impacto | Dependências           |
| ---------------- | ---------- | ------------ | ------- | ---------------------- |
| BarcodeElement   | ⭐⭐⭐       | Média        | Alto    | jsbarcode lib          |
| QRCodeElement    | ⭐⭐⭐       | Média        | Alto    | qrcode lib             |
| GroupElement     | ⭐⭐⭐       | Alta         | Alto    | Refactor Store         |
| LineElement      | ⭐⭐         | Baixa        | Médio   | Canvas API nativa      |
| TableElement     | ⭐⭐         | Alta         | Alto    | Grid rendering         |
| DateTimeElement  | ⭐⭐         | Baixa        | Médio   | Intl.DateTimeFormat    |
| IconElement      | ⭐⭐         | Média        | Médio   | Icon library (CDN/SVG) |
| CircleElement    | ⭐           | Baixa        | Baixo   | Canvas arc()           |
| PolygonElement   | ⭐           | Média        | Baixo   | Canvas path            |
| GradientElement  | ⭐           | Média        | Baixo   | Canvas gradients       |
| WatermarkElement | ⭐           | Baixa        | Baixo   | TextElement extend     |
| PathElement      | ⭐           | Alta         | Baixo   | SVG parsing            |
| MaskElement      | ⭐           | Alta         | Baixo   | Canvas compositing     |

---

## 🚀 Roadmap de Implementação Sugerido

### **Sprint 1-2: Fundamentos de Código**
- ✅ BarcodeElement
- ✅ QRCodeElement
- 📝 Testes de integração com dados CSV

### **Sprint 3-4: Organização e Produtividade**
- ✅ GroupElement (refactor Store para hierarquia)
- ✅ LineElement
- ✅ DateTimeElement

### **Sprint 5-6: Dados Complexos**
- ✅ TableElement
- ✅ IconElement
- 📝 Expansão de templates

### **Backlog (Prioridade Baixa)**
- CircleElement
- PolygonElement
- GradientElement
- WatermarkElement
- PathElement
- MaskElement

---

## 🎯 Notas de Implementação

### Elementos que Podem Ser Evitados

Alguns elementos podem ser implementados através de **combinações** dos elementos existentes:

- ❌ **WatermarkElement** → `TextElement` com `opacity: 0.2` + rotação
- ❌ **CircleElement** → `RectangleElement` com `borderRadius: 999` + dimensões iguais
- ❌ **GradientElement** → `ImageElement` com dataURL gerado programaticamente

### Bibliotecas Externas Necessárias

| Elemento       | Biblioteca Sugerida | Licença | Tamanho |
| -------------- | ------------------- | ------- | ------- |
| BarcodeElement | `jsbarcode`         | MIT     | ~50KB   |
| QRCodeElement  | `qrcode`            | MIT     | ~45KB   |
| IconElement    | Font Awesome (CDN)  | Free    | CDN     |

### Compatibilidade com Batch

Elementos com suporte a variáveis `{{nome}}`:
- ✅ BarcodeElement
- ✅ QRCodeElement
- ✅ DateTimeElement (com `source: 'variable'`)
- ✅ TableElement (com `dataSource: 'batch'`)
- ❌ GroupElement (container apenas)
- ❌ LineElement (visual estático)
- ❌ Elementos estéticos (Circle, Polygon, Gradient, etc)

---

**Última Atualização:** 22/04/2026
**Versão do Documento:** 1.0
```

---
