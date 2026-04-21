/**
 * Debounces a function, ensuring it is only called after a certain delay has passed since the last call.
 * @param fn The function to debounce.
 * @param delay The delay in milliseconds to wait before calling the function after the last call.
 * @returns A debounced version of the input function.
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay = 300,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: any, ...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Opções de formatação de data
 */
interface FormatDateOptions {
  /** Adiciona HH:mm ao formato absoluto */
  includeTime?: boolean;
  /** Retorna "há 2 dias" ao invés de "28/12/2025" */
  isRelative?: boolean;
  /** Código BCP 47 (ex: 'en-US', 'es-ES') */
  locale?: string;
}

/**
 * Formata data ISO para formato legível ou relativo
 * @param {string} isoString - Data ISO 8601
 * @param {Partial<FormatDateOptions>} [options={}] - Configurações de formatação
 * @returns {string} Data formatada (ex: "28/12/2025", "28/12/2025, 14:30", "há 3 horas")
 * @throws {Error} Se isoString ausente ou inválida
 *
 * @example
 * formatDate('2025-12-28T10:00:00Z') // "28/12/2025"
 * formatDate('2025-12-28T10:00:00Z', { includeTime: true }) // "28/12/2025, 10:00"
 * formatDate('2025-12-27T10:00:00Z', { isRelative: true }) // "ontem"
 */
export function formatDate(
  isoString: string,
  {
    includeTime = false,
    isRelative = false,
    locale = 'pt-BR',
  }: FormatDateOptions = {},
): string {
  if (!isoString) throw new Error('isoString é obrigatório');

  const date = new Date(isoString);
  if (isNaN(date.getTime())) throw new Error('Data inválida');

  if (isRelative) {
    const diffInSeconds = Math.floor((date.getTime() - Date.now()) / 1000);
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    // Ordem decrescente para priorizar unidades maiores
    const units: Array<[number, Intl.RelativeTimeFormatUnit]> = [
      [31536000, 'year'], // 365 * 24 * 60 * 60
      [2592000, 'month'], // 30 * 24 * 60 * 60
      [86400, 'day'], // 24 * 60 * 60
      [3600, 'hour'], // 60 * 60
      [60, 'minute'],
      [1, 'second'],
    ];

    for (const [seconds, unit] of units) {
      const value = Math.trunc(diffInSeconds / seconds);
      if (Math.abs(value) >= 1) return rtf.format(value, unit);
    }

    return rtf.format(0, 'second'); // "agora" / "now"
  }

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  if (includeTime) {
    Object.assign(options, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  return new Intl.DateTimeFormat(locale, options).format(date);
}
