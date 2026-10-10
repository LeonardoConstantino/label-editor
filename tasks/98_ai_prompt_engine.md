# Task 98 — AIPromptBuilder & Resilient Parser (Domain Engine)

- **Branch:** `task/98-ai-prompt-engine`
- **Prioridade:** 08
- **Dependências:** Nenhuma (Core Domain Service)
- **Bloqueia:** 99 (PromptStudio UI)

---

## 🎯 Objetivo

Criar o serviço puro `AIPromptBuilder` responsável por:
1. **Montagem de Prompts Estruturados:**
   - **System Prompt Completo:** Regras do editor, schema das tags, milímetros (mm), tipos de elementos suportados, variáveis de lote ativas.
   - **Prompt de Iteração / Delta:** Envia apenas a etiqueta atual com payloads de imagem truncados/substituídos por placeholders e instrui a LLM a retornar a etiqueta inteira ou apenas os elementos alterados com seus respectivos IDs.
   - **Otimização de Imagens (Sanitização):** Substitui strings pesadas de dataURL base64 (`data:image/...`) por `"[IMAGE_DATA_RETAINED]"` ao enviar para a LLM para não explodir a janela de contexto.
2. **Parser Resiliente de Resposta:**
   - Extrai objetos JSON válidos mesmo se a LLM responder com markdown (```json ... ```) ou texto de conversa antes/depois.
3. **Merge Inteligente (Full ou Parcial):**
   - Suporta tanto a substituição completa da etiqueta (`Label`) quanto um array parcial de elementos modificados (`elements: AnyElement[]`), preservando as imagens originais que tinham o placeholder `[IMAGE_DATA_RETAINED]` e mesclando propriedades por `id`.

---

## 🏗️ Arquivo a Criar

**`src/domain/services/AIPromptBuilder.ts`**

### Métodos e Contratos Públicos:

```typescript
export interface AIPromptContext {
  currentLabel: Label;
  availableVariables?: string[];
  userInstruction: string;
  turnIndex: number;
}

export interface AIParsedResult {
  type: 'full_label' | 'partial_elements';
  label?: Label;
  elements?: Partial<AnyElement>[];
  rawJson: string;
}

export class AIPromptBuilder {
  /**
   * Sanitiza a etiqueta substituindo base64 de imagens por placeholders
   */
  public sanitizeLabelForPrompt(label: Label): any;

  /**
   * Gera o System Prompt inicial com todo o manual de regras e o pedido do usuário
   */
  public buildSystemPrompt(context: AIPromptContext): string;

  /**
   * Gera a mensagem de iteração para mensagens subsequentes na LLM
   */
  public buildIterationPrompt(context: AIPromptContext): string;

  /**
   * Extrai e faz parse resiliente do JSON colado pelo usuário
   */
  public parseResponse(responseText: string): AIParsedResult;

  /**
   * Aplica o resultado parseado sobre a etiqueta atual (Merge inteligente com restauração de imagens)
   */
  public applyMerge(currentLabel: Label, parsed: AIParsedResult): Label;
}

export const aiPromptBuilder = new AIPromptBuilder();
```

---

## 🧪 Testes Unitários a Criar

**`src/domain/services/__tests__/AIPromptBuilder.test.ts`**
- Teste de sanitização de imagens base64.
- Teste de extração de JSON envelopado em markdown e texto conversacional.
- Teste de merge parcial de elementos por `id` (ex: alterar cor do texto mantendo posição).
- Teste de restauração do `src` original de imagem caso a LLM retorne `[IMAGE_DATA_RETAINED]`.

---

## ✅ Critérios de Aceite

- [ ] Métodos 100% tipados sem `any`
- [ ] Base64 de imagens é substituído por placeholder ao gerar prompts
- [ ] Parser aceita JSON puro, blocos com crases (```json ... ```) e texto ao redor
- [ ] Merge parcial atualiza propriedades dos elementos correspondentes via `id`
- [ ] `npm test` passa com 100% de sucesso nos testes de prompt e parser
- [ ] `npm run build` sem erros de tipagem
