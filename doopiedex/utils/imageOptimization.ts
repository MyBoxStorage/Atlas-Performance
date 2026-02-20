/**
 * Utilitários para otimização de imagens
 */

/**
 * Gera um placeholder blur base64 a partir de uma URL de imagem
 */
export async function generateBlurPlaceholder(imageUrl: string): Promise<string> {
  try {
    // Usar um placeholder simples base64
    // Em produção, poderia fazer fetch da imagem e gerar blur real
    const placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+';
    return placeholder;
  } catch (error) {
    console.warn('Could not generate blur placeholder:', error);
    return '';
  }
}

/**
 * Precarrega uma imagem
 */
export function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }

    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload image: ${url}`));
    img.src = url;
  });
}

/**
 * Retorna URL de imagem otimizada baseado no tamanho do viewport
 */
export function getImageUrlForSize(url: string, size: 'small' | 'medium' | 'large'): string {
  // Por enquanto retorna a URL original
  // Em produção, poderia usar um serviço de CDN que redimensiona dinamicamente
  return url;
}

/**
 * Cache de imagem no IndexedDB
 */
const DB_NAME = 'doopiedex-images';
const DB_VERSION = 1;
const STORE_NAME = 'images';

let dbPromise: Promise<IDBDatabase> | null = null;

function openDatabase(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('IndexedDB not available'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });

  return dbPromise;
}

export async function cacheImageInIndexedDB(url: string, blob: Blob): Promise<void> {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    await new Promise<void>((resolve, reject) => {
      const request = store.put(blob, url);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('Could not cache image in IndexedDB:', error);
  }
}

export async function getCachedImage(url: string): Promise<Blob | null> {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    return new Promise((resolve, reject) => {
      const request = store.get(url);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('Could not get cached image:', error);
    return null;
  }
}

/**
 * Prefetch estratégico de imagens
 */
export async function prefetchImages(urls: string[]): Promise<void> {
  if (typeof window === 'undefined') return;

  const prefetchPromises = urls.slice(0, 3).map(url => {
    return preloadImage(url).catch(() => {
      // Silently fail for prefetch
    });
  });

  await Promise.all(prefetchPromises);
}

