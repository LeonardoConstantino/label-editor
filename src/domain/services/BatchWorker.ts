import { jsPDF } from 'jspdf';
import { canvasRenderer } from './CanvasRenderer';
import { SecurityPolicy } from '../../core/SecurityPolicy';

/**
 * Protocolo de mensagens do Worker
 */
interface WorkerTask {
  label: any;
  dataList: any[];
  layout: any;
  dpi: number;
  fontBuffers?: any[]; // Task 83: Binários das fontes para fidelidade total
}

// @ts-ignore
self.onmessage = async (e: MessageEvent<WorkerTask>) => {
  const { label, dataList, layout, dpi, fontBuffers } = e.data;

  try {
    // 1. Carregamento de Fontes (Task 83)
    if (fontBuffers && fontBuffers.length > 0) {
      for (const font of fontBuffers) {
        try {
          const fontFace = new FontFace(font.family, font.buffer, {
            weight: font.weight,
            style: font.style
          });
          const loadedFace = await fontFace.load();
          // @ts-ignore
          self.fonts.add(loadedFace);
        } catch (err) {
          console.error(`[Worker] Failed to register font: ${font.family}`, err);
        }
      }
    }

    const pdf = new jsPDF({
      orientation: layout.orientation,
      unit: 'mm',
      format: layout.paperFormat,
      compress: true
    });

    const paperSizes: any = {
      'a4': { w: 210, h: 297 },
      'a3': { w: 297, h: 420 },
      'letter': { w: 215.9, h: 279.4 }
    };

    const size = paperSizes[layout.paperFormat];
    const PAGE_WIDTH = layout.orientation === 'portrait' ? size.w : size.h;
    const PAGE_HEIGHT = layout.orientation === 'portrait' ? size.h : size.w;
    const bleed = layout.bleedMM || 0;

    const renderWidthMM = label.config.widthMM + (bleed * 2);
    const renderHeightMM = label.config.heightMM + (bleed * 2);

    // No Worker usamos OffscreenCanvas
    const canvas = new OffscreenCanvas(
      Math.round((renderWidthMM * dpi) / 25.4),
      Math.round((renderHeightMM * dpi) / 25.4)
    );
    const ctx = canvas.getContext('2d')!;
    const scale = dpi / 25.4;

    // Cache de ImageBitmaps para o ImageRenderer
    const imageCache: Map<string, ImageBitmap> = new Map();
    for (const el of label.elements) {
      if (el.type === 'image' && el.src && !imageCache.has(el.src)) {
        try {
          SecurityPolicy.validateUrl(el.src); // ✅ SSRF Protection (Task DET-06)
          // fallow-ignore-next-line security-sink
          const response = await fetch(el.src);
          const blob = await response.blob();
          const bitmap = await createImageBitmap(blob);
          imageCache.set(el.src, bitmap);
        } catch (err) {
          console.error('[Worker] Failed to load image:', el.src, err);
        }
      }
    }

    let currentX = layout.marginMM;
    let currentY = layout.marginMM;
    let colIndex = 0;

    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i];
      const progress = Math.round((i / dataList.length) * 100);
      
      self.postMessage({ 
        type: 'progress', 
        current: i + 1, 
        total: dataList.length,
        progress,
        message: `Rendering label ${i + 1} of ${dataList.length}...`
      });

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
      ctx.translate(bleed * scale, bleed * scale);

      // --- 100% FIDELITY RENDER ---
      canvasRenderer.renderAll(label.elements, {
        ctx: ctx as any,
        scale,
        dpi,
        data,
        context: {
          index: i,
          total: dataList.length,
          date: new Date().toISOString()
        },
        images: imageCache
      });
      
      ctx.restore();

      const pdfX = currentX - bleed;
      const pdfY = currentY - bleed;
      
      const mimeType = `image/${layout.exportFormat}`;
      const blob = await canvas.convertToBlob({ 
        type: mimeType, 
        quality: layout.exportFormat === 'jpeg' ? layout.exportQuality : undefined 
      });
      
      const arrayBuffer = await blob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      pdf.addImage(uint8Array, layout.exportFormat.toUpperCase(), pdfX, pdfY, renderWidthMM, renderHeightMM);

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

    const finalPdf = pdf.output('blob');
    self.postMessage({ type: 'complete', blob: finalPdf });

  } catch (err: any) {
    self.postMessage({ type: 'error', message: err.message });
  }
};
