## 💡 Ideias de Elementos Futuros (O Baú de Relíquias)

Esta seção documenta a visão de longo prazo do Label Forge OS, organizando os elementos por prioridade estratégica e mantendo o histórico do que já foi "conquistado".

---

### ✅ Conquistas Recentes (Implementados)
Elementos que já foram integrados ao core do sistema:
- **CodeElement:** Fusão de Barcode e QRCode com validação industrial e fallback visual. (Task 58)
- **LineElement:** Divisores táteis com suporte a estilos industriais e Efeitos Prism. (Task 90)

---

### 🚀 Alta Prioridade
Foco em organização e complexidade de dados.

#### GroupElement
**Propósito:** Agrupar elementos para manipulação em bloco.
**Impacto:** Essencial para templates corporativos e layouts complexos.

#### TableElement
**Propósito:** Renderizar grades de dados (Nutricionais, Ingredientes).
**Impacto:** Vital para os setores alimentício e químico. Conecta-se ao Parser Pro.

---

### 📊 Média Prioridade
Foco em utilidade e estética premium.

#### IconElement ⚠️♻️
**Propósito:** Biblioteca nativa de símbolos técnicos (ISO, Hazard, Reciclagem).
**Propriedades:** `iconName`, `color`, `glowIntensity`.
**Casos de Uso:** Sinalização de segurança e certificações.

#### CurvedTextElement ⭕✍️ (New Sugestão!)
**Propósito:** Texto que segue caminhos circulares ou arqueados.
**Propriedades Específicas:**
| Propriedade | Type | Descrição |
| ----------- | ---- | --------- |
| `radius` | `number` | Raio da curvatura em mm |
| `startAngle`| `number` | Ângulo inicial (0-360) |
| `spacing` | `number` | Espaçamento entre letras no arco |
| `direction` | `enum` | `clockwise` | `counter-clockwise` |
**Impacto:** Visual "Premium" para selos de garantia, marcas artesanais e rótulos redondos.

#### UniqueIdElement 🔑🏷️ (Nova Sugestão!)
**Propósito:** Gerador dinâmico de identificadores exclusivos de nível industrial (lotes, serialização e rastreabilidade), com suporte a prefixos, sufixos, algoritmos de hashing determinísticos baseados em seed, e variáveis de dataset/sistema.
**Propriedades Específicas:**
| Propriedade | Type | Descrição |
| ----------- | ---- | --------- |
| `strategy` | `enum` | Algoritmo de geração: `numeric` \| `alphabetic` \| `alphanumeric` \| `uuid_v4` |
| `seed` | `string` | Base de inicialização (suporta variáveis como `{{id_produto}}` para gerar hashes determinísticos) |
| `prefix` | `string` | Prefixo a ser inserido (suporta variáveis, ex: `LOT-{{date:year}}-`) |
| `suffix` | `string` | Sufixo a ser inserido (suporta variáveis, ex: `-{{index}}`) |
| `length` | `number` | Comprimento do ID gerado (truncagem ou preenchimento com zeros) |
| `casing` | `enum` | Caixa do texto gerado: `upper` \| `lower` \| `none` |
**Impacto:** Essencial para rastreabilidade de estoque, serialização automática de itens de lote e segurança de autenticidade (anti-falsificação) sem dependência de banco de dados centralizado.

#### DateTimeElement
**Propósito:** Datas inteligentes com cálculos automáticos (Validade/Lote).
**Impacto:** Reduz erro humano na produção de etiquetas de perecíveis.

---

### 🎨 Baixa Prioridade
Recursos estéticos e casos de uso de nicho.
- **CircleElement:** Círculos perfeitos (atualmente simulados por retângulos).
- **PolygonElement:** Formas geométricas complexas (Triângulos, Hexágonos).
- **GradientElement:** Fundos degradê lineares e radiais.
- **MaskElement:** Máscaras de recorte para efeitos visuais avançados.

---

## 📋 Matriz de Priorização Atualizada

| Elemento          | Prioridade | Complexidade | Impacto | Status |
| ----------------- | ---------- | ------------ | ------- | ------ |
| CodeElement       | ✅         | —            | Alto    | Concluído |
| LineElement       | ✅         | —            | Médio   | Concluído |
| GroupElement      | ⭐⭐⭐       | Alta         | Alto    | Backlog |
| TableElement      | ⭐⭐⭐       | Alta         | Alto    | Backlog |
| IconElement       | ⭐⭐         | Média        | Médio   | Backlog |
| CurvedTextElement | ⭐⭐         | Média        | Premium | **NOVO!** |
| UniqueIdElement   | ⭐⭐         | Média        | Alto    | **NOVO!** |
| DateTimeElement   | ⭐⭐         | Baixa        | Médio   | Backlog |

---
**Última Atualização:** 26/07/2026 (Sessão de Ideação de Elemento)
