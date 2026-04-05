import { jsPDF } from 'jspdf';
import { Label, AnyElement } from '../models/Label';
import { canvasRenderer } from './CanvasRenderer';
import { DataSourceParser } from './DataSourceParser';
import { ElementType } from '../models/elements/BaseElement';
import { UnitConverter } from '../../utils/units';

/**
 * PDFGenerator: Gera o PDF final com todas as etiquetas do lote.
 */
export class PDFGenerator {
  /**
   * Gera e faz o download do PDF baseado na etiqueta e nos dados fornecidos.
   */
  public async generateLotePDF(label: Label, dataList: Record<string, any>[]): Promise<void> {
    // Configura o documento jsPDF (unidade em mm)
    const pdf = new jsPDF({
      orientation: label.config.widthMM > label.config.heightMM ? 'landscape' : 'portrait',
      unit: 'mm',
      format: [label.config.widthMM, label.config.heightMM]
    });

    // Canvas oculto para renderização em alta resolução (DPI do config ou 300 padrão)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const dpi = label.config.dpi || 300;
    const scale = UnitConverter.mmToPx(1, dpi);

    canvas.width = UnitConverter.mmToPx(label.config.widthMM, dpi);
    canvas.height = UnitConverter.mmToPx(label.config.heightMM, dpi);

    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i];
      if (i > 0) pdf.addPage();

      // Limpa o canvas para a nova etiqueta e preenche com a cor de fundo
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = label.config.backgroundColor || '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Renderiza cada elemento aplicando os dados (interpolação)
      label.elements.forEach(element => {
        // Clonagem para não alterar o modelo original
        const elementCopy = JSON.parse(JSON.stringify(element)) as AnyElement;
        
        // Se for texto, aplica a interpolação das variáveis {{key}}
        if (elementCopy.type === ElementType.TEXT) {
          (elementCopy as any).content = DataSourceParser.interpolate((elementCopy as any).content, data);
        }

        // Renderiza no canvas em alta res (sem previewScale)
        canvasRenderer.render(elementCopy, { ctx, scale, dpi });
      });

      // Adiciona a imagem do canvas ao PDF
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', 0, 0, label.config.widthMM, label.config.heightMM);
    }

    // Download do arquivo
    pdf.save(`lote_etiquetas_${Date.now()}.pdf`);
  }
}

export const pdfGenerator = new PDFGenerator();
