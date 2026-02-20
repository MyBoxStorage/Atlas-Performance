/**
 * Server-side utility to load rarity data
 */

import * as fs from 'fs';
import * as path from 'path';
import type { RarityData } from './rarityCalculator';

let cachedRarityData: RarityData | null = null;

/**
 * Carrega os dados de raridade pré-calculados (server-side only)
 */
export function loadRarityData(): RarityData {
  if (cachedRarityData) {
    return cachedRarityData;
  }

  try {
    const dataPath = path.join(process.cwd(), 'data', 'rarity-data.json');
    const fileContents = fs.readFileSync(dataPath, 'utf-8');
    cachedRarityData = JSON.parse(fileContents) as RarityData;
    return cachedRarityData;
  } catch (error) {
    console.error('Error loading rarity data:', error);
    throw new Error('Failed to load rarity data. Please run the calculate-rarity script first.');
  }
}

