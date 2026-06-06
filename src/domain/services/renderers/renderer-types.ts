/**
 * RenderContext: Contexto compartilhado para os serviços de renderização.
 * Extraído para este arquivo para quebrar ciclos de dependência entre 
 * CanvasRenderer e os renderizadores específicos.
 */
export interface RenderContext {
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  scale: number; // mm -> px (incluindo previewScale se houver)
  dpi: number;
  data?: Record<string, unknown>;
  context?: Record<string, unknown>; // Task 50: System context (index, total, date)
  images?: Map<string, ImageBitmap | HTMLImageElement>;
}
