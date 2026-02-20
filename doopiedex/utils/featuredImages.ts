/**
 * Utilitário para mapeamento de imagens específicas dos Doopies dos prints
 * CLIENT-SIDE ONLY - não usa módulos Node.js (fs, path)
 */

export interface FeaturedImageMapping {
  [combinationKey: string]: {
    imageUrl: string;
    assetId: string;
    id: number;
  };
}

// Client-side: cria chave de combinação
export function createCombinationKey(
  species: string,
  background: string,
  body: string,
  accessories: string,
  evolution: number
): string {
  return `${species}+${background}+${body}+${accessories}+${evolution}`;
}

// Client-side: busca URL da imagem específica no mapeamento
export function getFeaturedImageUrlFromMapping(
  mapping: FeaturedImageMapping,
  species: string,
  background: string,
  body: string,
  accessories: string,
  evolution: number
): string | null {
  const combinationKey = createCombinationKey(species, background, body, accessories, evolution);
  
  // Tentar busca exata
  if (mapping[combinationKey]) {
    return mapping[combinationKey].imageUrl;
  }
  
  // Tentar case-insensitive
  const lowerKey = combinationKey.toLowerCase();
  for (const key in mapping) {
    if (key.toLowerCase() === lowerKey) {
      return mapping[key].imageUrl;
    }
  }
  
  return null;
}


