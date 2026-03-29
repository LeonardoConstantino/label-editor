import { AnyElement } from '../models/Label';

export interface HistorySnapshot {
  imageData: ImageData;
  elements: AnyElement[];
  timestamp: number;
}

/**
 * HistoryManager: Gerencia snapshots do canvas e do estado dos elementos.
 */
export class HistoryManager {
  private history: HistorySnapshot[] = [];
  private currentIndex: number = -1;
  private maxSnapshots: number = 50;

  /**
   * Captura o estado atual do canvas e dos elementos.
   */
  public snapshot(ctx: CanvasRenderingContext2D, elements: AnyElement[]): void {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Deep clone dos elementos
    const elementsClone = JSON.parse(JSON.stringify(elements));

    // Remove histórico futuro se houveram Undos antes da nova ação
    this.history = this.history.slice(0, this.currentIndex + 1);
    
    this.history.push({
      imageData,
      elements: elementsClone,
      timestamp: Date.now()
    });

    if (this.history.length > this.maxSnapshots) {
      this.history.shift();
    } else {
      this.currentIndex++;
    }
  }

  /**
   * Retorna ao estado anterior.
   */
  public undo(): HistorySnapshot | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  /**
   * Avança para o próximo estado.
   */
  public redo(): HistorySnapshot | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }

  public canUndo(): boolean {
    return this.currentIndex > 0;
  }

  public canRedo(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  public clear(): void {
    this.history = [];
    this.currentIndex = -1;
  }
}

export const historyManager = new HistoryManager();
