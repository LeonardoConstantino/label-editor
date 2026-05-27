import { AnyElement } from '../models/Label';

export interface HistorySnapshot {
  imageData: ImageData;
  elements: AnyElement[];
  timestamp: number;
  description: string;
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
  public snapshot(ctx: CanvasRenderingContext2D, elements: AnyElement[], description: string = 'Ação'): void {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Deep clone dos elementos
    const elementsClone = JSON.parse(JSON.stringify(elements));

    // Remove histórico futuro se houveram Undos antes da nova ação
    this.history = this.history.slice(0, this.currentIndex + 1);
    
    this.history.push({
      imageData,
      elements: elementsClone,
      timestamp: Date.now(),
      description
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
    if (this.canUndo()) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  /**
   * Avança para o próximo estado.
   */
  public redo(): HistorySnapshot | null {
    if (this.canRedo()) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }

  /**
   * Salta para um índice específico no histórico.
   */
  public jumpTo(index: number): HistorySnapshot | null {
    if (index >= 0 && index < this.history.length) {
      this.currentIndex = index;
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

  public getStackSize(): number {
    return this.history.length;
  }

  public getMaxSize(): number {
    return this.maxSnapshots;
  }

  public setMaxSize(size: number): void {
    this.maxSnapshots = Math.max(10, Math.min(size, 500));
    // Se o novo limite for menor, trunca o histórico
    if (this.history.length > this.maxSnapshots) {
      const diff = this.history.length - this.maxSnapshots;
      this.history = this.history.slice(diff);
      this.currentIndex = Math.max(0, this.currentIndex - diff);
    }
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  public getHistory(): ReadonlyArray<Omit<HistorySnapshot, 'elements' | 'imageData'>> {
    // Retorna uma versão leve do histórico para a UI (sem dados pesados)
    return this.history.map(({ timestamp, description }) => ({ timestamp, description }));
  }

  public getFullHistory(): ReadonlyArray<HistorySnapshot> {
    return this.history;
  }

  public clear(): void {
    this.history = [];
    this.currentIndex = -1;
  }
}

export const historyManager = new HistoryManager();
