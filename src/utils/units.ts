/**
 * UnitConverter: Utilitário estático para conversões de precisão entre unidades físicas e digitais.
 * Baseado na constante industrial: 1 polegada = 25.4 milímetros.
 */
export class UnitConverter {
  public static readonly MM_PER_INCH = 25.4;
  public static readonly PT_PER_INCH = 72;

  // Validação interna (pode ser removida se o ambiente já garantir números válidos)
  private static isFiniteNumber = (n: unknown): n is number => typeof n === 'number' && isFinite(n);

  /**
   * Converte milímetros (físico) para pixels (digital) baseado no DPI fornecido.
   */
  public static mmToPx(mm: number, dpi: number = 300): number {
    if (!this.isFiniteNumber(mm) || !this.isFiniteNumber(dpi)) {
      throw new Error('Invalid input values for mmToPx');
    }

    return (mm / this.MM_PER_INCH) * dpi;
  }

  /**
   * Converte pixels (digital) para milímetros (físico) baseado no DPI fornecido.
   */
  public static pxToMm(px: number, dpi: number = 300): number {
    if (!this.isFiniteNumber(px) || !this.isFiniteNumber(dpi)) {
      throw new Error('Invalid input values for pxToMm');
    }

    return (px / dpi) * this.MM_PER_INCH;
  }

  /**
   * Converte milímetros (físico) para pontos (tipográfico).
   * Útil para cálculos de tamanho de fonte e alinhamento com bibliotecas que usam pt.
   */
  public static mmToPt(mm: number): number {
    if (!this.isFiniteNumber(mm)) {
      throw new Error('Invalid input value for mmToPt');
    }

    return (mm / this.MM_PER_INCH) * this.PT_PER_INCH;
  }

  /**
   * Converte pontos (tipográfico) para milímetros (físico).
   */
  public static ptToMm(pt: number): number {
    if (!this.isFiniteNumber(pt)) {
      throw new Error('Invalid input value for ptToMm');
    }

    return (pt / this.PT_PER_INCH) * this.MM_PER_INCH;
  }

  /**
   * Converte pontos (tipográfico) para pixels (digital).
   */
  public static ptToPx(pt: number, dpi: number = 300): number {
    if (!this.isFiniteNumber(pt) || !this.isFiniteNumber(dpi)) {
      throw new Error('Invalid input values for ptToPx');
    }

    return this.mmToPx(this.ptToMm(pt), dpi);
  }
}
