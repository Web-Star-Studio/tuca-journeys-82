
/**
 * Execute an async function with a timeout
 * @param fn The async function to execute
 * @param timeoutMs Timeout in milliseconds
 * @param fallbackValue Value to return if the function times out
 * @returns The function result or fallback value
 */
export const withTimeout = async <T>(
  fn: () => Promise<T>,
  timeoutMs: number,
  fallbackValue: T
): Promise<T> => {
  return new Promise<T>((resolve) => {
    const timeoutId = setTimeout(() => {
      console.warn(`Function execution timed out after ${timeoutMs}ms`);
      resolve(fallbackValue);
    }, timeoutMs);

    fn()
      .then((result) => {
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error) => {
        console.error('Function execution failed:', error);
        clearTimeout(timeoutId);
        resolve(fallbackValue);
      });
  });
};

/**
 * Creates a debounced version of a function
 * @param fn The function to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve) => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        const result = fn(...args);
        resolve(result);
        timeoutId = null;
      }, delay);
    });
  };
};
