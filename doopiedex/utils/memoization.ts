/**
 * Utilitários para memoização de dados e processamento
 */

/**
 * Memoiza o resultado de uma função de processamento de dados
 */
export function memoizeDataProcessor<T, R>(
  processor: (data: T) => R
): (data: T, cacheKey?: string) => R {
  const cache = new Map<string, R>();

  return (data: T, cacheKey?: string): R => {
    const key = cacheKey || JSON.stringify(data);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = processor(data);
    cache.set(key, result);
    return result;
  };
}

/**
 * Cria um seletor memoizado para dados
 */
export function createMemoizedSelector<T, R>(
  selector: (data: T) => R
): (data: T) => R {
  let lastData: T | null = null;
  let lastResult: R | null = null;

  return (data: T): R => {
    if (data === lastData && lastResult !== null) {
      return lastResult;
    }

    lastData = data;
    lastResult = selector(data);
    return lastResult;
  };
}

/**
 * Cache simples em memória para resultados
 */
const memoCache = new Map<string, any>();

export function memoized<T extends (...args: any[]) => any>(
  fn: T,
  getKey?: (...args: Parameters<T>) => string
): T {
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = getKey ? getKey(...args) : JSON.stringify(args);
    
    if (memoCache.has(key)) {
      return memoCache.get(key);
    }

    const result = fn(...args);
    memoCache.set(key, result);
    return result;
  }) as T;
}

/**
 * Limpa o cache de memoização
 */
export function clearMemoCache(): void {
  memoCache.clear();
}

