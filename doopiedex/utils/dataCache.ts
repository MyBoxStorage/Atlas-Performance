/**
 * Cache de dados usando IndexedDB
 */

import type { OrganizedDoopies } from '@/types/doopie';
import type { RarityData } from './rarityCalculator';

const DB_NAME = 'doopiedex-data';
const DB_VERSION = 1;
const DOOPIES_STORE = 'doopies';
const RARITY_STORE = 'rarity';

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
      
      if (!db.objectStoreNames.contains(DOOPIES_STORE)) {
        db.createObjectStore(DOOPIES_STORE);
      }
      
      if (!db.objectStoreNames.contains(RARITY_STORE)) {
        db.createObjectStore(RARITY_STORE);
      }
    };
  });

  return dbPromise;
}

/**
 * Inicializa o cache de dados
 */
export async function initDataCache(): Promise<void> {
  try {
    await openDatabase();
  } catch (error) {
    console.warn('Could not initialize data cache:', error);
  }
}

/**
 * Obtém dados dos Doopies do cache
 */
export async function getCachedDoopiesData(): Promise<OrganizedDoopies | null> {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(DOOPIES_STORE, 'readonly');
    const store = transaction.objectStore(DOOPIES_STORE);
    
    return new Promise((resolve, reject) => {
      const request = store.get('data');
      request.onsuccess = () => {
        const result = request.result;
        resolve(result || null);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('Could not get cached doopies data:', error);
    return null;
  }
}

/**
 * Salva dados dos Doopies no cache
 */
export async function setCachedDoopiesData(data: OrganizedDoopies): Promise<void> {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(DOOPIES_STORE, 'readwrite');
    const store = transaction.objectStore(DOOPIES_STORE);
    
    await new Promise<void>((resolve, reject) => {
      const request = store.put(data, 'data');
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('Could not cache doopies data:', error);
  }
}

/**
 * Obtém dados de raridade do cache
 */
export async function getCachedRarityData(): Promise<RarityData | null> {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(RARITY_STORE, 'readonly');
    const store = transaction.objectStore(RARITY_STORE);
    
    return new Promise((resolve, reject) => {
      const request = store.get('data');
      request.onsuccess = () => {
        const result = request.result;
        resolve(result || null);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('Could not get cached rarity data:', error);
    return null;
  }
}

/**
 * Salva dados de raridade no cache
 */
export async function setCachedRarityData(data: RarityData): Promise<void> {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(RARITY_STORE, 'readwrite');
    const store = transaction.objectStore(RARITY_STORE);
    
    await new Promise<void>((resolve, reject) => {
      const request = store.put(data, 'data');
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('Could not cache rarity data:', error);
  }
}

