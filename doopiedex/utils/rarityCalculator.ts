/**
 * Utilitários para cálculo de raridade de combinações de traits
 */

export type RarityCategory = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

export interface RarityData {
  totalDoopies: number;
  combinationFrequencies: Record<string, number>;
  combinationRanks: Record<string, number>;
  combinationPercentiles: Record<string, number>;
  traitFrequencies: {
    species: Record<string, number>;
    background: Record<string, number>;
    body: Record<string, number>;
    accessories: Record<string, number>;
    evolution: Record<string, number>;
  };
  traitRarities: {
    species: Record<string, number>;
    background: Record<string, number>;
    body: Record<string, number>;
    accessories: Record<string, number>;
    evolution: Record<string, number>;
  };
  averageRarityRanks: Record<string, number>; // Rank baseado em raridade média (1 = mais raro)
  averageRarityPercentiles: Record<string, number>; // Percentil do rank
  averageRarityCategories: Record<string, RarityCategory>; // Categoria baseada no percentil
}

export interface TraitRarityInfo {
  trait: string;
  frequency: number;
  rarityPercent: number;
}

export interface RarityResult {
  combination: string;
  count: number; // Quantas NFTs têm exatamente essa combinação
  percentage: number; // Percentual da combinação exata
  rank: number; // Rank baseado em raridade média (1 = mais raro)
  percentile: number; // Percentil do rank
  category: RarityCategory; // Categoria baseada no percentil do rank
  traitRarities: {
    species: TraitRarityInfo;
    background: TraitRarityInfo;
    body: TraitRarityInfo;
    accessories: TraitRarityInfo;
    evolution: TraitRarityInfo;
  };
  averageRarity: number; // Raridade média das 5 traits
}

/**
 * Cria a chave de combinação no formato: species+background+body+accessories+evolution
 */
function createCombinationKey(
  species: string,
  background: string,
  body: string,
  accessories: string,
  evolution: number
): string {
  return `${species}+${background}+${body}+${accessories}+${evolution}`;
}

/**
 * Encontra uma chave de combinação com busca case-insensitive
 */
function findCombinationKey(
  species: string,
  background: string,
  body: string,
  accessories: string,
  evolution: number,
  combinationFrequencies: Record<string, number>
): string | null {
  const searchKey = createCombinationKey(species, background, body, accessories, evolution);
  const searchKeyLower = searchKey.toLowerCase();
  
  // Primeiro tentar busca exata
  if (combinationFrequencies[searchKey] !== undefined) {
    return searchKey;
  }
  
  // Se não encontrou, fazer busca case-insensitive
  for (const key in combinationFrequencies) {
    if (key.toLowerCase() === searchKeyLower) {
      return key; // Retornar a chave original (com o case correto)
    }
  }
  
  return null;
}

/**
 * Classifica a categoria de raridade baseado no percentil
 */
export function getRarityCategory(percentile: number): RarityCategory {
  if (percentile <= 1) return 'Mythic';
  if (percentile <= 5) return 'Legendary';
  if (percentile <= 15) return 'Epic';
  if (percentile <= 35) return 'Rare';
  if (percentile <= 60) return 'Uncommon';
  return 'Common';
}

/**
 * Normaliza uma chave de trait para busca case-insensitive
 */
function normalizeTraitKey(trait: string, traitMap: Record<string, number>): string | null {
  // Tentar busca exata primeiro
  if (traitMap[trait] !== undefined) {
    return trait;
  }
  
  // Busca case-insensitive
  const traitLower = trait.toLowerCase();
  for (const key in traitMap) {
    if (key.toLowerCase() === traitLower) {
      return key;
    }
  }
  
  return null;
}

/**
 * Calcula a raridade de uma combinação específica de traits baseada na média das raridades individuais
 */
export function calculateRarity(
  species: string,
  background: string,
  body: string,
  accessories: string,
  evolution: number,
  rarityData: RarityData
): RarityResult | null {
  const data = rarityData;
  const evolutionStr = evolution.toString();
  
  // Normalizar traits para busca case-insensitive
  const normalizedSpecies = normalizeTraitKey(species, data.traitRarities.species);
  const normalizedBackground = normalizeTraitKey(background, data.traitRarities.background);
  const normalizedBody = normalizeTraitKey(body, data.traitRarities.body);
  const normalizedAccessories = normalizeTraitKey(accessories, data.traitRarities.accessories);
  const normalizedEvolution = normalizeTraitKey(evolutionStr, data.traitRarities.evolution);
  
  if (!normalizedSpecies || !normalizedBackground || !normalizedBody || !normalizedAccessories || !normalizedEvolution) {
    return null; // Alguma trait não foi encontrada
  }
  
  // Obter raridades individuais
  const speciesRarity = data.traitRarities.species[normalizedSpecies];
  const backgroundRarity = data.traitRarities.background[normalizedBackground];
  const bodyRarity = data.traitRarities.body[normalizedBody];
  const accessoriesRarity = data.traitRarities.accessories[normalizedAccessories];
  const evolutionRarity = data.traitRarities.evolution[normalizedEvolution];
  
  // Calcular média das raridades (quanto menor, mais raro)
  const averageRarity = (speciesRarity + backgroundRarity + bodyRarity + accessoriesRarity + evolutionRarity) / 5;
  
  // Obter frequências individuais
  const speciesFreq = data.traitFrequencies.species[normalizedSpecies] || 0;
  const backgroundFreq = data.traitFrequencies.background[normalizedBackground] || 0;
  const bodyFreq = data.traitFrequencies.body[normalizedBody] || 0;
  const accessoriesFreq = data.traitFrequencies.accessories[normalizedAccessories] || 0;
  const evolutionFreq = data.traitFrequencies.evolution[normalizedEvolution] || 0;
  
  // Buscar combinação exata
  const combination = findCombinationKey(
    normalizedSpecies,
    normalizedBackground,
    normalizedBody,
    normalizedAccessories,
    evolution,
    data.combinationFrequencies
  ) || createCombinationKey(normalizedSpecies, normalizedBackground, normalizedBody, normalizedAccessories, evolution);
  
  // Buscar rank, percentil e categoria já calculados baseados na raridade média
  const rank = data.averageRarityRanks[combination] || 0;
  const percentile = data.averageRarityPercentiles[combination] || 0;
  const category = data.averageRarityCategories[combination] || 'Common';
  
  // Contar quantas NFTs têm exatamente essa combinação
  const count = data.combinationFrequencies[combination] || 0;
  const percentage = (count / data.totalDoopies) * 100;
  
  return {
    combination,
    count,
    percentage,
    rank,
    percentile,
    category,
    traitRarities: {
      species: {
        trait: normalizedSpecies,
        frequency: speciesFreq,
        rarityPercent: speciesRarity,
      },
      background: {
        trait: normalizedBackground,
        frequency: backgroundFreq,
        rarityPercent: backgroundRarity,
      },
      body: {
        trait: normalizedBody,
        frequency: bodyFreq,
        rarityPercent: bodyRarity,
      },
      accessories: {
        trait: normalizedAccessories,
        frequency: accessoriesFreq,
        rarityPercent: accessoriesRarity,
      },
      evolution: {
        trait: normalizedEvolution,
        frequency: evolutionFreq,
        rarityPercent: evolutionRarity,
      },
    },
    averageRarity,
  };
}

/**
 * Obtém o número total de combinações únicas
 */
export function getTotalCombinations(rarityData: RarityData): number {
  return Object.keys(rarityData.combinationFrequencies).length;
}

