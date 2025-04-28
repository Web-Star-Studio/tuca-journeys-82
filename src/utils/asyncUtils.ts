
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
 * Returns a debounced function that returns a Promise
 */
export function debounce<F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): (...args: Parameters<F>) => Promise<ReturnType<F>> {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let resolveList: Array<(value: ReturnType<F> | PromiseLike<ReturnType<F>>) => void> = [];
  let rejectList: Array<(reason?: any) => void> = [];

  return (...args: Parameters<F>): Promise<ReturnType<F>> => {
    return new Promise<ReturnType<F>>((resolve, reject) => {
      if (timeout !== null) {
        clearTimeout(timeout);
        resolveList.push(resolve);
        rejectList.push(reject);
      } else {
        resolveList = [resolve];
        rejectList = [reject];
      }

      timeout = setTimeout(async () => {
        const currentResolveList = [...resolveList];
        const currentRejectList = [...rejectList];
        
        // Clear lists first to avoid issues if there are errors
        resolveList = [];
        rejectList = [];
        timeout = null;
        
        try {
          const result = await func(...args);
          // Resolve all promises with the result
          currentResolveList.forEach(resolveFunc => resolveFunc(result));
        } catch (error) {
          console.error("Debounced function error:", error);
          // Reject all promises with the error
          currentRejectList.forEach(rejectFunc => rejectFunc(error));
        }
      }, waitFor);
    });
  };
}
