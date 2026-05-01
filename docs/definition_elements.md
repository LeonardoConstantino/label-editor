# 📋 Inventário Completo de Elementos (v1.1)

## 🔧 Propriedades Universais (BaseElement)
Herdadas por **todos** os elementos do sistema.

| Propriedade | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `string` | UUID único (`crypto.randomUUID()`) |
| `type` | `ElementType` | `border`, `rectangle`, `text`, `image` |
| `name` | `string` | Nome amigável da camada |
| `position` | `Position` | `{ x: number, y: number }` em mm |
| `zIndex` | `number` | Ordem de empilhamento (0-999) |
| `rotation` | `number` | Rotação em graus (0-360) |
| `opacity` | `number` | Transparência (0.0 a 1.0) |
| `locked` | `boolean` | Trava edição e arraste |
| `visible` | `boolean` | Alterna renderização |

---

## 📐 Propriedades de Área (Dimensions)
Aplicável a `Rectangle`, `Text` e `Image`.

| Propriedade | Tipo | Descrição |
| :--- | :--- | :--- |
| `dimensions`| `Dimensions`| `{ width: number, height: number }` em mm |

---

## 1️⃣ BorderElement (Standalone)
*Nota: Diferente do contorno do retângulo, esta é uma moldura decorativa.*
- **Especificidades:** `style` (solid, dashed, dotted), `width` (mm), `color`, `radius`.

## 2️⃣ RectangleElement
- **Especificidades:** `fillColor`, `strokeColor`, `strokeWidth`, `borderRadius`.

## 3️⃣ TextElement
- **Especificidades:** `content`, `fontFamily`, `fontSize` (pt), `fontWeight`, `fontStyle`, `color`, `textAlign`, `verticalAlign`, `overflow` (clip, ellipsis, wrap, scale), `lineHeight`.

## 4️⃣ ImageElement
- **Especificidades:** `src` (dataURL), `fit` (cover, contain, fill), `smoothing`, `compositeOperation`.

**Mais detalhes em [definition_elements_details.md](./definition_elements_details.md)**