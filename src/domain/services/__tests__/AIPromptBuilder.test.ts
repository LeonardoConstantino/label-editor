import { describe, it, expect, beforeEach } from 'vitest';
import { AIPromptBuilder, AIPromptContext } from '../AIPromptBuilder';
import { AI_PROMPT_CONSTANTS } from '../AIPromptTemplates';
import { Label, ElementType } from '../../models/Label';
import { ImageElement, TextElement } from '../../models/elements/SpecificElements';

describe('AIPromptBuilder', () => {
  let builder: AIPromptBuilder;
  let sampleLabel: Label;

  beforeEach(() => {
    builder = new AIPromptBuilder();
    sampleLabel = {
      id: 'label-test-1',
      name: 'Etiqueta Teste',
      config: {
        widthMM: 100,
        heightMM: 60,
        dpi: 300,
        previewScale: 1,
        backgroundColor: '#ffffff',
      },
      elements: [
        {
          id: 'text-1',
          name: 'Titulo',
          type: ElementType.TEXT,
          position: { x: 10, y: 10 },
          dimensions: { width: 80, height: 10 },
          rotation: 0,
          opacity: 1,
          locked: false,
          content: 'PRODUTO ORIGINAL',
          fontFamily: 'Inter',
          fontSize: 14,
          fontWeight: 'bold',
          fontStyle: 'normal',
          color: '#000000',
          textAlign: 'left',
          verticalAlign: 'top',
          overflow: 'wrap' as any,
          lineHeight: 1.2,
          letterSpacing: 0,
          textTransform: 'none',
          justify: false,
        } as TextElement,
        {
          id: 'img-1',
          name: 'Logo',
          type: ElementType.IMAGE,
          position: { x: 50, y: 25 },
          dimensions: { width: 30, height: 30 },
          rotation: 0,
          opacity: 1,
          locked: false,
          src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
          fit: 'contain' as any,
          smoothing: true,
          compositeOperation: 'source-over' as any,
        } as ImageElement,
      ],
      thumbnail: 'data:image/webp;base64,samplethumbnail',
      createdAt: 1000,
      updatedAt: 2000,
    };
  });

  describe('Sanitização de Imagens e Dados', () => {
    it('deve remover thumbnail e substituir base64 de imagem por placeholder', () => {
      const sanitized = builder.sanitizeLabelForPrompt(sampleLabel);

      expect(sanitized.thumbnail).toBeUndefined();
      expect(sanitized.elements[1].src).toBe(AI_PROMPT_CONSTANTS.IMAGE_PLACEHOLDER);
      expect(sanitized.elements[0].content).toBe('PRODUTO ORIGINAL');
    });
  });

  describe('Geração de Prompts', () => {
    it('deve gerar System Prompt com regras, variáveis e estado inicial formatado', () => {
      const context: AIPromptContext = {
        currentLabel: sampleLabel,
        availableVariables: ['nome', 'preco', 'codigo'],
        userInstruction: 'Adicione um QR code no canto direito e mude a cor do título para azul',
        turnIndex: 1,
      };

      const prompt = builder.buildSystemPrompt(context);

      expect(prompt).toContain('Você é um designer e gerador de templates');
      expect(prompt).toContain('{{nome}}');
      expect(prompt).toContain('{{preco}}');
      expect(prompt).toContain('{{codigo}}');
      expect(prompt).toContain('Adicione um QR code no canto direito');
      expect(prompt).toContain(AI_PROMPT_CONSTANTS.IMAGE_PLACEHOLDER);
      expect(prompt).not.toContain('data:image/png;base64');
    });

    it('deve gerar Prompt de Iteração conciso para turnos subsequentes', () => {
      const context: AIPromptContext = {
        currentLabel: sampleLabel,
        userInstruction: 'Aumente o tamanho da fonte do título para 20pt',
        turnIndex: 3,
      };

      const prompt = builder.buildIterationPrompt(context);

      expect(prompt).toContain('[Turno #3]');
      expect(prompt).toContain('Aumente o tamanho da fonte do título para 20pt');
      expect(prompt).toContain('PRODUTO ORIGINAL');
    });
  });

  describe('Parser Resiliente de Resposta', () => {
    it('deve parsear JSON puro de etiqueta completa', () => {
      const rawJson = JSON.stringify({
        id: 'new-id',
        config: { widthMM: 80, heightMM: 40, dpi: 300 },
        elements: [{ id: 'el-1', type: 'text', content: 'Novo Texto' }],
      });

      const parsed = builder.parseResponse(rawJson);
      expect(parsed.type).toBe('full_label');
      expect(parsed.label?.config.widthMM).toBe(80);
    });

    it('deve extrair JSON embutido em markdown ```json ... ``` com texto ao redor', () => {
      const responseWithText = `
Olá! Aqui está o design modificado conforme seu pedido:

\`\`\`json
{
  "elements": [
    {
      "id": "text-1",
      "color": "#0055ff",
      "fontSize": 18
    }
  ]
}
\`\`\`

Espero que tenha gostado do resultado!
      `;

      const parsed = builder.parseResponse(responseWithText);
      expect(parsed.type).toBe('partial_elements');
      expect(parsed.elements?.[0].id).toBe('text-1');
      expect((parsed.elements?.[0] as any).color).toBe('#0055ff');
    });

    it('deve lançar erro compreensível ao receber texto sem JSON', () => {
      expect(() => builder.parseResponse('Olá, não consegui gerar o template.')).toThrow(
        /Não foi possível identificar um JSON válido/i
      );
    });
  });

  describe('Merge e Aplicação no Canvas', () => {
    it('deve realizar merge parcial preservando propriedades intocadas e restaurando imagem', () => {
      const parsedResult = builder.parseResponse(`
\`\`\`json
{
  "elements": [
    {
      "id": "text-1",
      "color": "#ff0000",
      "content": "PRODUTO EM PROMOCAO"
    },
    {
      "id": "img-1",
      "position": { "x": 60, "y": 20 }
    }
  ]
}
\`\`\`
      `);

      const updated = builder.applyMerge(sampleLabel, parsedResult, 2);

      // Texto modificado
      const textEl = updated.elements.find((e) => e.id === 'text-1') as TextElement;
      expect(textEl.color).toBe('#ff0000');
      expect(textEl.content).toBe('PRODUTO EM PROMOCAO');
      expect(textEl.fontFamily).toBe('Inter'); // Preservado

      // Imagem modificada na posição mas com dataURL restaurado
      const imgEl = updated.elements.find((e) => e.id === 'img-1') as ImageElement;
      expect(imgEl.position.x).toBe(60);
      expect(imgEl.position.y).toBe(20);
      expect(imgEl.src).toContain('data:image/png;base64'); // Restaurado do original!
    });

    it('deve aceitar criação de novos elementos no merge parcial', () => {
      const parsedResult = builder.parseResponse(`
\`\`\`json
{
  "elements": [
    {
      "id": "new-code-1",
      "type": "code",
      "codeType": "qrcode",
      "content": "https://meusite.com",
      "position": { "x": 5, "y": 20 },
      "dimensions": { "width": 25, "height": 25 }
    }
  ]
}
\`\`\`
      `);

      const updated = builder.applyMerge(sampleLabel, parsedResult, 3);
      expect(updated.elements.length).toBe(3);
      expect(updated.elements.some((e) => e.id === 'new-code-1')).toBe(true);
    });
  });
});
