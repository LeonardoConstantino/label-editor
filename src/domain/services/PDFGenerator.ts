import { jsPDF } from 'jspdf';
import { Label, AnyElement } from '../models/Label';
import { canvasRenderer } from './CanvasRenderer';
import { UnitConverter } from '../../utils/units';
import { DEFAULTS } from '../../constants/defaults';
import eventBus from '../../core/EventBus';
import { FontTransfer } from '../../utils/FontTransfer';
import { ElementType } from '../models/elements/BaseElement';

export type PaperFormat = 'a4' | 'a3' | 'letter';
export type PageOrientation = 'portrait' | 'landscape';
export type ExportFormat = 'png' | 'jpeg';

export interface BatchLayoutOptions {
  marginMM: number;
  gapMM: number;
  columns: number;
  showCropMarks: boolean;
  bleedMM: number;
  paperFormat: PaperFormat;
  orientation: PageOrientation;
  zoom: number; // UI only
  exportFormat: ExportFormat;
  exportQuality: number; // 0.1 a 1.0 (relevante para JPEG)
}

/**
 * PDFGenerator: Gera o PDF final com todas as etiquetas do lote.
 * Suporta execução em Thread Principal ou via Web Worker (Task 24).
 */
export class PDFGenerator {
  private readonly PAPER_SIZES: Record<PaperFormat, { w: number, h: number }> = {
    'a4': { w: 210, h: 297 },
    'a3': { w: 297, h: 420 },
    'letter': { w: 215.9, h: 279.4 }
  };

  /**
   * Versão Worker da geração de PDF (Não trava a UI).
   */
  public async generateLotePDFWorker(label: Label, dataList: any[], layout: BatchLayoutOptions): Promise<void> {
    // 1. Identifica fontes únicas usadas no design
    const families = new Set<string>();
    label.elements.forEach(el => {
      if (el.type === ElementType.TEXT) {
        families.add((el as any).fontFamily || 'Inter');
      }
    });

    // 2. Captura os buffers das fontes (binários)
    const fontBuffers = await FontTransfer.getFontBuffers(Array.from(families));

    return new Promise((resolve, reject) => {
      // @ts-ignore - Vite worker import
      const worker = new Worker(new URL('./BatchWorker.ts', import.meta.url), { type: 'module' });
      
      const dpi = label.config.dpi || DEFAULTS.CANVAS.dpi;

      // Inicia feedback global
      eventBus.emit('production:start', { total: dataList.length });

      worker.onmessage = (e) => {
        const { type, current, total, progress, message, blob } = e.data;
        
        if (type === 'progress') {
          eventBus.emit('production:progress', { current, total, progress, message });
        } else if (type === 'complete') {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `batch_${layout.paperFormat}_${Date.now()}.pdf`;
          link.click();
          URL.revokeObjectURL(url);
          worker.terminate();
          eventBus.emit('production:complete', {});
          resolve();
        } else if (type === 'error') {
          worker.terminate();
          eventBus.emit('production:error', { message });
          reject(new Error(message));
        }
      };

      worker.onerror = (err) => {
        worker.terminate();
        eventBus.emit('production:error', { message: 'Worker crashed' });
        reject(err);
      };

      // Inicia a tarefa enviando também os buffers das fontes
      worker.postMessage({ label, dataList, layout, dpi, fontBuffers });
    });
  }

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
      zoom: 0.45,
      exportFormat: 'jpeg',
      exportQuality: 0.8
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

      if (currentY + label.config.heightMM > PAGE_HEIGHT - layout.marginMM) {
        pdf.addPage();
        currentX = layout.marginMM;
        currentY = layout.marginMM;
        colIndex = 0;
      }

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
      
      const mimeType = `image/${layout.exportFormat}`;
      const imgData = canvas.toDataURL(mimeType, layout.exportFormat === 'jpeg' ? layout.exportQuality : undefined);
      
      pdf.addImage(imgData, layout.exportFormat.toUpperCase(), pdfX, pdfY, renderWidthMM, renderHeightMM);

      if (layout.showCropMarks) {
        this.drawCropMarks(pdf, currentX, currentY, label.config.widthMM, label.config.heightMM);
      }

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

  private drawCropMarks(pdf: jsPDF, x: number, y: number, w: number, h: number): void {
    const markLength = 3; 
    const markOffset = 1; 
    
    pdf.setDrawColor(150, 150, 150);
    pdf.setLineWidth(0.1);

    pdf.line(x, y - markOffset, x, y - markOffset - markLength); 
    pdf.line(x - markOffset, y, x - markOffset - markLength, y); 

    pdf.line(x + w, y - markOffset, x + w, y - markOffset - markLength);
    pdf.line(x + w + markOffset, y, x + w + markOffset + markLength, y);

    pdf.line(x, y + h + markOffset, x, y + h + markOffset + markLength);
    pdf.line(x - markOffset, y + h, x - markOffset - markLength, y + h);

    pdf.line(x + w, y + h + markOffset, x + w, y + h + markOffset + markLength);
    pdf.line(x + w + markOffset, y, x + w + markOffset + markLength, y);
  }
}

export const pdfGenerator = new PDFGenerator();
