import { jsPDF } from 'jspdf';
import { Label, AnyElement } from '../models/Label';
import { canvasRenderer } from './CanvasRenderer';
import { UnitConverter } from '../../utils/units';
import { DEFAULTS } from '../../constants/defaults';
import eventBus from '../../core/EventBus';
import { FontTransfer } from '../../utils/FontTransfer';

export type PaperFormat = 'a4' | 'a3' | 'letter';
export type PageOrientation = 'portrait' | 'landscape';
export type ExportFormat = 'png' | 'jpeg';

/**
 * BatchLayoutOptions: Configurações de imposição e exportação do lote.
 */
export interface BatchLayoutOptions {
  /** Margem externa da folha (mm) */
  marginMM: number;
  /** Espaço entre etiquetas (mm) */
  gapMM: number;
  /** Quantidade máxima de colunas por folha */
  columns: number;
  /** Se deve renderizar marcas de corte (L-marks) */
  showCropMarks: boolean;
  /** Área de sangria que extrapola a borda (mm) */
  bleedMM: number;
  /** Tamanho do papel ISO ou US */
  paperFormat: PaperFormat;
  /** Orientação da folha */
  orientation: PageOrientation;
  /** Escala visual do preview (apenas UI) */
  zoom: number; 
  /** Formato de compressão das imagens no PDF */
  exportFormat: ExportFormat;
  /** Qualidade da compressão (0.1 a 1.0) para JPEG */
  exportQuality: number; 
}

/**
 * PDFGenerator: O motor de saída final do Label Forge OS.
 * Suporta geração massiva multi-página com imposição dinâmica e processamento via Web Workers.
 */
export class PDFGenerator {
  /** Mapeamento de dimensões físicas dos papéis suportados (mm) */
  private readonly PAPER_SIZES: Record<PaperFormat, { w: number, h: number }> = {
    'a4': { w: 210, h: 297 },
    'a3': { w: 297, h: 420 },
    'letter': { w: 215.9, h: 279.4 }
  };

  /**
   * Versão Worker da geração de PDF (Não trava a UI).
   * Recomendado para lotes com mais de 20 etiquetas ou designs complexos.
   * 
   * @param label Definição da etiqueta (design).
   * @param dataList Lista de registros para injeção.
   * @param layout Opções de calibração física.
   */
  public async generateLotePDFWorker(label: Label, dataList: Record<string, unknown>[], layout: BatchLayoutOptions): Promise<void> {
    // 1. Identifica fontes únicas usadas no design
    const families = new Set<string>();
    label.elements.forEach(el => {
      if ('fontFamily' in el && typeof (el as any).fontFamily === 'string') {
        families.add((el as any).fontFamily);
      }
    });
    if (families.size === 0) families.add('Inter');

    // 2. Captura os buffers das fontes (binários) para garantir fidelidade no Worker
    const fontBuffers = await FontTransfer.getFontBuffers(Array.from(families));

    return new Promise((resolve, reject) => {
      // @ts-ignore - Vite worker import pattern
      const worker = new Worker(new URL('./BatchWorker.ts', import.meta.url), { type: 'module' });
      
      const dpi = label.config.dpi || DEFAULTS.CANVAS.dpi;

      // Inicia feedback global (StatusBar reagirá a isso)
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

      // Inicia a tarefa enviando o payload completo
      worker.postMessage({ label, dataList, layout, dpi, fontBuffers });
    });
  }

  /**
   * Versão síncrona da geração de PDF (Executa na Main Thread).
   * Utilizado para lotes pequenos ou quando Workers não estão disponíveis.
   */
  public async generateLotePDF(
    label: Label, 
    dataList: Record<string, unknown>[], 
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

    // Canvas de renderização temporário
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

      // Paginação automática (Y-axis)
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

      // Cálculo de próxima posição (Z-pattern)
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
   * Desenha as marcas de corte (L-marks) profissionais nas quinas da etiqueta.
   */
  private drawCropMarks(pdf: jsPDF, x: number, y: number, w: number, h: number): void {
    const markLength = 3; 
    const markOffset = 1; 
    
    pdf.setDrawColor(150, 150, 150);
    pdf.setLineWidth(0.1);

    // Top-Left
    pdf.line(x, y - markOffset, x, y - markOffset - markLength); 
    pdf.line(x - markOffset, y, x - markOffset - markLength, y); 

    // Top-Right
    pdf.line(x + w, y - markOffset, x + w, y - markOffset - markLength);
    pdf.line(x + w + markOffset, y, x + w + markOffset + markLength, y);

    // Bottom-Left
    pdf.line(x, y + h + markOffset, x, y + h + markOffset + markLength);
    pdf.line(x - markOffset, y + h, x - markOffset - markLength, y + h);

    // Bottom-Right
    pdf.line(x + w, y + h + markOffset, x + w, y + h + markOffset + markLength);
    pdf.line(x + w + markOffset, y, x + w + markOffset + markLength, y);
  }
}

export const pdfGenerator = new PDFGenerator();
