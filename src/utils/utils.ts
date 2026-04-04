/**
 * Debounces a function, ensuring it is only called after a certain delay has passed since the last call.
 * @param fn The function to debounce.
 * @param delay The delay in milliseconds to wait before calling the function after the last call.
 * @returns A debounced version of the input function.
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  
  return function (this: any, ...args: Parameters<T>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}