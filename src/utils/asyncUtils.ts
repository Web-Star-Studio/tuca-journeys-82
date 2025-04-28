
/**
 * Utility function to execute an async operation with a timeout to prevent UI blocking
 * @param asyncOperation The async function to execute
 * @param timeoutMs Timeout in milliseconds
 * @param fallback Optional fallback value if the operation times out
 */
export const withTimeout = async <T>(
  asyncOperation: () => Promise<T>,
  timeoutMs: number = 5000,
  fallback?: T
): Promise<T> => {
  let timeoutId: NodeJS.Timeout;
  
  const timeoutPromise = new Promise<T>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Operation timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    // Race between the actual operation and the timeout
    const result = await Promise.race([asyncOperation(), timeoutPromise]);
    clearTimeout(timeoutId!);
    return result;
  } catch (error) {
    console.error("Operation failed or timed out:", error);
    if (fallback !== undefined) {
      return fallback;
    }
    throw error;
  }
};

/**
 * Debounce function to prevent multiple rapid calls to the same function
 */
export function debounce<F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
}
