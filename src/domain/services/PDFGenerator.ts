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
  bleedMM: number;
}

/**
 * PDFGenerator: Gera o PDF final com todas as etiquetas do lote.
 */
export class PDFGenerator {
  /**
   * Gera e faz o download do PDF baseado na etiqueta e nos dados fornecidos.
   * Suporta layout A4 multi-etiqueta com sangria e marcas de corte.
   */
  public async generateLotePDF(
    label: Label, 
    dataList: Record<string, any>[], 
    layout: BatchLayoutOptions = { marginMM: 10, gapMM: 5, columns: 2, showCropMarks: true, bleedMM: 2 }
  ): Promise<void> {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const PAGE_WIDTH = 210;
    const PAGE_HEIGHT = 297;
    const bleed = layout.bleedMM || 0;

    // Canvas oculto para renderização em alta resolução (incluindo sangria)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const dpi = label.config.dpi || DEFAULTS.CANVAS.dpi;
    const scale = UnitConverter.mmToPx(1, dpi);

    // O canvas agora tem o tamanho da etiqueta + sangria nos 4 lados
    const renderWidthMM = label.config.widthMM + (bleed * 2);
    const renderHeightMM = label.config.heightMM + (bleed * 2);

    canvas.width = UnitConverter.mmToPx(renderWidthMM, dpi);
    canvas.height = UnitConverter.mmToPx(renderHeightMM, dpi);

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

      // Renderiza Etiqueta no Canvas (com sangria)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fundo (preenche toda a área de sangria)
      ctx.fillStyle = label.config.backgroundColor || '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Salva contexto para aplicar offset da sangria aos elementos
      ctx.save();
      ctx.translate(UnitConverter.mmToPx(bleed, dpi), UnitConverter.mmToPx(bleed, dpi));

      label.elements.forEach(element => {
        const elementCopy = JSON.parse(JSON.stringify(element)) as AnyElement;
        if (elementCopy.type === ElementType.TEXT) {
          (elementCopy as any).content = DataSourceParser.interpolate((elementCopy as any).content, data);
        }
        canvasRenderer.render(elementCopy, { ctx, scale, dpi });
      });
      ctx.restore();

      // Adiciona ao PDF na posição calculada
      // Compensamos o X e Y do PDF para que a "arte" comece na margem, mas a sangria extrapole
      const pdfX = currentX - bleed;
      const pdfY = currentY - bleed;
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', pdfX, pdfY, renderWidthMM, renderHeightMM);

      // Marcas de corte profissionais (L-marks)
      if (layout.showCropMarks) {
        this.drawCropMarks(pdf, currentX, currentY, label.config.widthMM, label.config.heightMM);
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

  /**
   * Desenha marcas de corte (L-shaped) nos 4 cantos da etiqueta
   */
  private drawCropMarks(pdf: jsPDF, x: number, y: number, w: number, h: number): void {
    const markLength = 3; // mm
    const markOffset = 1; // mm de distância da borda da sangria
    
    pdf.setDrawColor(150, 150, 150);
    pdf.setLineWidth(0.1);

    // Canto Superior Esquerdo
    pdf.line(x, y - markOffset, x, y - markOffset - markLength); // Vertical
    pdf.line(x - markOffset, y, x - markOffset - markLength, y); // Horizontal

    // Canto Superior Direito
    pdf.line(x + w, y - markOffset, x + w, y - markOffset - markLength);
    pdf.line(x + w + markOffset, y, x + w + markOffset + markLength, y);

    // Canto Inferior Esquerdo
    pdf.line(x, y + h + markOffset, x, y + h + markOffset + markLength);
    pdf.line(x - markOffset, y + h, x - markOffset - markLength, y + h);

    // Canto Inferior Direito
    pdf.line(x + w, y + h + markOffset, x + w, y + h + markOffset + markLength);
    pdf.line(x + w + markOffset, y + h, x + w + markOffset + markLength, y + h);
  }
}

export const pdfGenerator = new PDFGenerator();
