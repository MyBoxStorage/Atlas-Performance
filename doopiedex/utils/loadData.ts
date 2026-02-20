import * as fs from 'fs';
import * as path from 'path';
import type { OrganizedDoopies } from '@/types/doopie';

let cachedData: OrganizedDoopies | null = null;

/**
 * Load Doopies data from JSON file
 * Caches the data after first load
 */
export function loadDoopiesData(): OrganizedDoopies {
  if (cachedData) {
    return cachedData;
  }

  try {
    // Try to load from data directory
    const dataPath = path.join(process.cwd(), 'data', 'doopies_metadata.json');
    const fileContents = fs.readFileSync(dataPath, 'utf-8');
    cachedData = JSON.parse(fileContents) as OrganizedDoopies;
    return cachedData;
  } catch (error) {
    console.error('Error loading doopies data:', error);
    // Return empty structure if file doesn't exist
    return {};
  }
}

