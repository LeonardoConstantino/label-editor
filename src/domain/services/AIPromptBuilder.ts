import { Label, AnyElement, ElementType } from '../models/Label';
import { ElementFactory } from '../models/elements/ElementFactory';
import { logger } from '../../core/Logger';
import { AI_PROMPT_CONSTANTS, AI_SYSTEM_PROMPT_RULES } from './AIPromptTemplates';

export interface AIPromptContext {
  currentLabel: Label;
  availableVariables?: string[];
  userInstruction: string;
  turnIndex: number;
}

export type AIParsedPayloadType = 'full_label' | 'partial_elements';

export interface AIParsedResult {
  type: AIParsedPayloadType;
  label?: Label;
  elements?: Partial<AnyElement>[];
  rawJson: string;
}

export class AIPromptBuilder {
  /**
   * Sanitiza a etiqueta substituindo base64 de imagens e thumbnails por placeholders,
   * reduzindo significativamente o consumo de tokens na LLM.
   */
  public sanitizeLabelForPrompt(label: Label): any {
    const cloned: Label = JSON.parse(JSON.stringify(label));
    
    // Remove thumbnail pesada
    delete cloned.thumbnail;

    // Sanitiza elementos de imagem com dataURL
    if (Array.isArray(cloned.elements)) {
      cloned.elements = cloned.elements.map((el) => {
        if (el.type === ElementType.IMAGE && typeof (el as any).src === 'string') {
          const src = (el as any).src;
          if (src.startsWith('data:image/')) {
            return {
              ...el,
              src: AI_PROMPT_CONSTANTS.IMAGE_PLACEHOLDER,
            };
          }
        }
        return el;
      });
    }

    return cloned;
  }

  /**
   * Gera o System Prompt completo (Turno 1 / Primeira mensagem da conversa).
   * Contém as regras do editor, schema, contexto da etiqueta e instrução do usuário.
   */
  public buildSystemPrompt(context: AIPromptContext): string {
    const sanitized = this.sanitizeLabelForPrompt(context.currentLabel);
    const userVars = context.availableVariables?.length
  ? `Dados do projeto: ${context.availableVariables.map((v) => `{{${v}}}`).join(' | ')}\n`
  : '';
const variablesSection = `\n### 🏷️ VARIÁVEIS DISPONÍVEIS:\nSistema (sempre presentes): {{index}} | {{total}} | {{date}} | {{nome}}\n${userVars}Use formatadores quando aplicável: {{variavel:upper}}, {{date:date_format(pt-BR,long)}}, etc.\n`;

    return `${AI_SYSTEM_PROMPT_RULES}
${variablesSection}
---

### 📦 ESTADO INICIAL DA ETIQUETA:
\`\`\`json
${JSON.stringify(sanitized, null, 2)}
\`\`\`

---

### 💬 INSTRUÇÃO DO USUÁRIO:
"${context.userInstruction.trim() || 'Aprimore o design desta etiqueta tornando-a visualmente harmônica e profissional.'}"

---

### 🚀 FORMATO DE RESPOSTA OBRIGATÓRIO:
Retorne APENAS o bloco JSON puro envolto em markdown \`\`\`json ... \`\`\`.
Você pode responder no formato:
1. Objeto completo: \`\`\`json\n{ "id": "...", "name": "...", "config": {...}, "elements": [...] }\n\`\`\`
OU
2. Apenas elementos alterados: \`\`\`json\n{ "elements": [ { "id": "...", ...alterações } ] }\n\`\`\``;
  }

  /**
   * Gera o Prompt de Iteração / Delta (Turno 2 em diante).
   * Envia o estado atual com instruções objetivas para a LLM refinar.
   */
  public buildIterationPrompt(context: AIPromptContext): string {
    const sanitized = this.sanitizeLabelForPrompt(context.currentLabel);
    const userVars = context.availableVariables?.length
  ? ` | ${context.availableVariables.map((v) => `{{${v}}}`).join(' | ')}`
  : '';
const variablesSection = `Variáveis: {{index}} | {{total}} | {{date}} | {{nome}}${userVars}\n`;

    return `[Turno #${context.turnIndex}] Refine a etiqueta de acordo com a instrução abaixo.

${variablesSection}Estado atual da etiqueta:
\`\`\`json
${JSON.stringify(sanitized, null, 2)}
\`\`\`

Instrução de alteração:
"${context.userInstruction.trim()}"

Lembrete:
- Responda apenas com o bloco JSON (completo ou apenas "elements" com IDs preservados para merge).
- NÃO altere src = "${AI_PROMPT_CONSTANTS.IMAGE_PLACEHOLDER}" salvo instrução explícita.
- "thumbnail" nunca deve ser incluído na resposta.`;
  }

  /**
   * Extrai e faz parse resiliente do texto colado pelo usuário.
   * Suporta JSON direto, markdown com crases e texto conversacional com JSON embutido.
   */
  public parseResponse(responseText: string): AIParsedResult {
    if (!responseText || typeof responseText !== 'string') {
      throw new Error('Texto de resposta vazio ou inválido.');
    }

    const cleaned = responseText.trim();
    let jsonString = '';

    // 1. Tenta extrair de bloco de código markdown ```json ... ``` ou ``` ... ```
    const codeBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (codeBlockMatch && codeBlockMatch[1]) {
      jsonString = codeBlockMatch[1].trim();
    } else {
      // 2. Tenta encontrar o primeiro objeto ou array JSON {...} ou [...]
      const firstBrace = cleaned.indexOf('{');
      const lastBrace = cleaned.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        jsonString = cleaned.substring(firstBrace, lastBrace + 1);
      } else {
        const firstBracket = cleaned.indexOf('[');
        const lastBracket = cleaned.lastIndexOf(']');
        if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
          jsonString = cleaned.substring(firstBracket, lastBracket + 1);
        } else {
          jsonString = cleaned;
        }
      }
    }

    let parsedData: any;
    try {
      parsedData = JSON.parse(jsonString);
    } catch (err) {
      logger.error('AIPromptBuilder', 'Falha ao processar JSON da resposta da IA:', err);
      throw new Error('Não foi possível identificar um JSON válido na resposta fornecida.');
    }

    // 3. Caso o JSON seja um array direto de elementos: [ { id: ... } ]
    if (Array.isArray(parsedData)) {
      return {
        type: 'partial_elements',
        elements: parsedData,
        rawJson: jsonString,
      };
    }

    // 4. Caso contenha chave "elements" mas não seja uma etiqueta completa com config
    if (parsedData && Array.isArray(parsedData.elements) && !parsedData.config) {
      return {
        type: 'partial_elements',
        elements: parsedData.elements,
        rawJson: jsonString,
      };
    }

    // 5. Caso contenha objeto aninhado "label"
    if (parsedData && parsedData.label && parsedData.label.config && Array.isArray(parsedData.label.elements)) {
      return {
        type: 'full_label',
        label: parsedData.label,
        rawJson: jsonString,
      };
    }

    // 6. Caso seja a etiqueta completa direta
    if (parsedData && parsedData.config && Array.isArray(parsedData.elements)) {
      return {
        type: 'full_label',
        label: parsedData as Label,
        rawJson: jsonString,
      };
    }

    // Se for um objeto com propriedades de elementos parciais
    if (parsedData && typeof parsedData === 'object') {
      const keys = Object.keys(parsedData);
      if (keys.some((k) => ['elements', 'items'].includes(k)) && Array.isArray(parsedData[keys[0]])) {
        return {
          type: 'partial_elements',
          elements: parsedData[keys[0]],
          rawJson: jsonString,
        };
      }
    }

    throw new Error('A resposta JSON da IA não contém uma estrutura de etiqueta válida (config/elements).');
  }

  /**
   * Aplica o resultado retornado pela IA sobre a etiqueta atual:
   * - Restaura URLs originais de imagens que vieram com o placeholder.
   * - Faz merge cirúrgico por ID no caso de resposta parcial de elementos.
   * - Valida e completa elementos ausentes com ElementFactory se necessário.
   */
  public applyMerge(currentLabel: Label, parsed: AIParsedResult, turnIndex: number): Label {
    // Mapa de imagens originais para restauração de dados
    const originalImageMap = new Map<string, string>();
    currentLabel.elements.forEach((el) => {
      if (el.type === ElementType.IMAGE && (el as any).src) {
        originalImageMap.set(el.id, (el as any).src);
      }
    });

    const restoreImageSrc = (element: AnyElement): AnyElement => {
      if (element.type === ElementType.IMAGE) {
        const imageEl = element as any;
        if (imageEl.src === AI_PROMPT_CONSTANTS.IMAGE_PLACEHOLDER || !imageEl.src) {
          const originalSrc = originalImageMap.get(element.id);
          if (originalSrc) {
            imageEl.src = originalSrc;
          }
        }
      }
      return element;
    };

    if (parsed.type === 'full_label' && parsed.label) {
      const newLabel: Label = {
        ...currentLabel,
        ...parsed.label,
        id: currentLabel.id, // Preserva ID original do projeto
        iaTurnIndex: turnIndex, // Atualiza o turno de IA
        config: {
          ...currentLabel.config,
          ...(parsed.label.config || {}),
        },
        elements: (parsed.label.elements || []).map((el) => {
          // Garante propriedades estruturais padrão caso a LLM omita alguma
          const base = ElementFactory.create(el.type || ElementType.TEXT, el);
          return restoreImageSrc({ ...base, ...el });
        }),
        updatedAt: Date.now(),
      };
      return newLabel;
    }

    if (parsed.type === 'partial_elements' && parsed.elements) {
      const existingElementsMap = new Map<string, AnyElement>();
      currentLabel.elements.forEach((el) => existingElementsMap.set(el.id, { ...el }));

      const updatedElements: AnyElement[] = [];

      // Atualiza ou adiciona elementos retornados
      parsed.elements.forEach((partialEl) => {
        if (!partialEl || typeof partialEl !== 'object') return;

        if (partialEl.id && existingElementsMap.has(partialEl.id)) {
          const existing = existingElementsMap.get(partialEl.id)!;
          const merged = { ...existing, ...partialEl } as AnyElement;
          
          // Se as dimensões ou posições vierem parciais, mescla profundamente
          if (partialEl.position) {
            merged.position = { ...existing.position, ...partialEl.position };
          }
          if ((partialEl as any).dimensions && (existing as any).dimensions) {
            (merged as any).dimensions = { ...(existing as any).dimensions, ...(partialEl as any).dimensions };
          }

          existingElementsMap.set(partialEl.id, restoreImageSrc(merged));
        } else {
          // Elemento novo criado pela IA
          const newType = partialEl.type || ElementType.TEXT;
          const created = ElementFactory.create(newType, partialEl as Partial<AnyElement>);
          const finalId = partialEl.id || created.id;
          existingElementsMap.set(finalId, restoreImageSrc({ ...created, ...partialEl, id: finalId }));
        }
      });

      // Reconstrói lista de elementos preservando a ordem
      currentLabel.elements.forEach((el) => {
        if (existingElementsMap.has(el.id)) {
          updatedElements.push(existingElementsMap.get(el.id)!);
          existingElementsMap.delete(el.id);
        }
      });

      // Adiciona novos elementos inseridos pela IA ao final
      existingElementsMap.forEach((el) => {
        updatedElements.push(el);
      });

      return {
        ...currentLabel,
        elements: updatedElements,
        updatedAt: Date.now(),
      };
    }

    return currentLabel;
  }
}

export const aiPromptBuilder = new AIPromptBuilder();
