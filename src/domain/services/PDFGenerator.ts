import { jsPDF } from 'jspdf';
import { Label, AnyElement } from '../models/Label';
import { canvasRenderer } from './CanvasRenderer';
import { UnitConverter } from '../../utils/units';
import { DEFAULTS } from '../../constants/defaults';

export type PaperFormat = 'a4' | 'a3' | 'letter';
export type PageOrientation = 'portrait' | 'landscape';

export interface BatchLayoutOptions {
  marginMM: number;
  gapMM: number;
  columns: number;
  showCropMarks: boolean;
  bleedMM: number;
  paperFormat: PaperFormat;
  orientation: PageOrientation;
  zoom: number; // UI only
}

/**
 * PDFGenerator: Gera o PDF final com todas as etiquetas do lote.
 */
export class PDFGenerator {
  private readonly PAPER_SIZES: Record<PaperFormat, { w: number, h: number }> = {
    'a4': { w: 210, h: 297 },
    'a3': { w: 297, h: 420 },
    'letter': { w: 215.9, h: 279.4 }
  };

  /**
   * Gera e faz o download do PDF baseado na etiqueta e nos dados fornecidos.
   * Suporta layout multi-etiqueta com sangria, marcas de corte e papel dinâmico (Task 67).
   */
  public async generateLotePDF(
    label: Label, 
    dataList: Record<string, any>[], 
    layout: BatchLayoutOptions = { 
      marginMM: 10, 
      gapMM: 5, 
      columns: 2, 
      showCropMarks: true, 
      bleedMM: 2,
      paperFormat: 'a4',
      orientation: 'portrait',
      zoom: 1
    }
  ): Promise<void> {
    const pdf = new jsPDF({
      orientation: layout.orientation,
      unit: 'mm',
      format: layout.paperFormat
    });

    const size = this.PAPER_SIZES[layout.paperFormat];
    const PAGE_WIDTH = layout.orientation === 'portrait' ? size.w : size.h;
    const PAGE_HEIGHT = layout.orientation === 'portrait' ? size.h : size.w;
    
    const bleed = layout.bleedMM || 0;

    // Canvas oculto para renderização em alta resolução
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { alpha: true })!;
    const dpi = label.config.dpi || DEFAULTS.CANVAS.dpi;
    const scale = UnitConverter.mmToPx(1, dpi);

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

      // Renderiza Etiqueta no Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = label.config.backgroundColor || '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(UnitConverter.mmToPx(bleed, dpi), UnitConverter.mmToPx(bleed, dpi));

      label.elements.forEach(element => {
        const elementCopy = JSON.parse(JSON.stringify(element)) as AnyElement;
        canvasRenderer.render(elementCopy, { ctx, scale, dpi, data });
      });
      ctx.restore();

      const pdfX = currentX - bleed;
      const pdfY = currentY - bleed;
      
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', pdfX, pdfY, renderWidthMM, renderHeightMM);

      if (layout.showCropMarks) {
        this.drawCropMarks(pdf, currentX, currentY, label.config.widthMM, label.config.heightMM);
      }

      // Incrementa para a próxima posição
      colIndex++;
      const nextX = currentX + label.config.widthMM + layout.gapMM;
      
      if (colIndex >= layout.columns || (nextX + label.config.widthMM > PAGE_WIDTH - layout.marginMM)) {
        colIndex = 0;
        currentX = layout.marginMM;
        currentY += label.config.heightMM + layout.gapMM;
      } else {
        currentX = nextX;
      }
    }

    pdf.save(`batch_${layout.paperFormat}_${Date.now()}.pdf`);
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
