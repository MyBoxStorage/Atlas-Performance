/**
 * Utilitário SERVER-SIDE para mapeamento de imagens específicas dos Doopies dos prints
 */

import * as fs from 'fs';
import * as path from 'path';
import type { FeaturedImageMapping } from './featuredImages';

let cachedMapping: FeaturedImageMapping | null = null;

// Server-side: carrega do filesystem
export function loadFeaturedImagesMapping(): FeaturedImageMapping {
  if (cachedMapping) {
    return cachedMapping;
  }

  try {
    const dataPath = path.join(process.cwd(), 'data', 'featured-images-mapping.json');
    const fileContents = fs.readFileSync(dataPath, 'utf-8');
    cachedMapping = JSON.parse(fileContents) as FeaturedImageMapping;
    return cachedMapping;
  } catch (error) {
    console.warn('Featured images mapping not found, using default images');
    return {};
  }
}

