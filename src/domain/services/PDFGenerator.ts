import { jsPDF } from 'jspdf';
import { Label, AnyElement } from '../models/Label';
import { canvasRenderer } from './CanvasRenderer';
import { DataSourceParser } from './DataSourceParser';
import { ElementType } from '../models/elements/BaseElement';
import { UnitConverter } from '../../utils/units';
import { DEFAULTS } from '../../constants/defaults';

export interface BatchLayoutOptions {
  marginMM: number;
  gapMM: number;
  columns: number;
  showCropMarks: boolean;
}

/**
 * PDFGenerator: Gera o PDF final com todas as etiquetas do lote.
 */
export class PDFGenerator {
  /**
   * Gera e faz o download do PDF baseado na etiqueta e nos dados fornecidos.
   * Suporta layout A4 multi-etiqueta.
   */
  public async generateLotePDF(
    label: Label, 
    dataList: Record<string, any>[], 
    layout: BatchLayoutOptions = { marginMM: 10, gapMM: 5, columns: 2, showCropMarks: true }
  ): Promise<void> {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const PAGE_WIDTH = 210;
    const PAGE_HEIGHT = 297;

    // Canvas oculto para renderização em alta resolução
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const dpi = label.config.dpi || DEFAULTS.CANVAS.dpi;
    const scale = UnitConverter.mmToPx(1, dpi);

    canvas.width = UnitConverter.mmToPx(label.config.widthMM, dpi);
    canvas.height = UnitConverter.mmToPx(label.config.heightMM, dpi);

    let currentX = layout.marginMM;
    let currentY = layout.marginMM;
    let colIndex = 0;

    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i];

      // Verifica se cabe na página atual (eixo Y), senão nova página
      if (currentY + label.config.heightMM > PAGE_HEIGHT - layout.marginMM) {
        pdf.addPage();
        currentX = layout.marginMM;
        currentY = layout.marginMM;
        colIndex = 0;
      }

      // Renderiza Etiqueta no Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = label.config.backgroundColor || '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      label.elements.forEach(element => {
        const elementCopy = JSON.parse(JSON.stringify(element)) as AnyElement;
        if (elementCopy.type === ElementType.TEXT) {
          (elementCopy as any).content = DataSourceParser.interpolate((elementCopy as any).content, data);
        }
        canvasRenderer.render(elementCopy, { ctx, scale, dpi });
      });

      // Adiciona ao PDF na posição calculada
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', currentX, currentY, label.config.widthMM, label.config.heightMM);

      // Opcional: Marcas de corte
      if (layout.showCropMarks) {
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.1);
        pdf.rect(currentX, currentY, label.config.widthMM, label.config.heightMM);
      }

      // Incrementa para a próxima posição
      colIndex++;
      if (colIndex >= layout.columns || (currentX + (label.config.widthMM * 2) + layout.gapMM > PAGE_WIDTH - layout.marginMM)) {
        colIndex = 0;
        currentX = layout.marginMM;
        currentY += label.config.heightMM + layout.gapMM;
      } else {
        currentX += label.config.widthMM + layout.gapMM;
      }
    }

    pdf.save(`lote_a4_${Date.now()}.pdf`);
  }
}

export const pdfGenerator = new PDFGenerator();
