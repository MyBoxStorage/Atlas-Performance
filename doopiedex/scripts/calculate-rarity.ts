/**
 * Script para calcular raridade de combinações de traits
 * Gera data/rarity-data.json com frequências, ranks e percentis
 */

import * as fs from 'fs';
import * as path from 'path';
import type { OrganizedDoopies, Doopie } from '../types/doopie';

type RarityCategory = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

interface CombinationWithAverage {
  combination: string;
  averageRarity: number;
}

function getRarityCategory(percentile: number): RarityCategory {
  if (percentile <= 1) return 'Mythic';
  if (percentile <= 5) return 'Legendary';
  if (percentile <= 15) return 'Epic';
  if (percentile <= 35) return 'Rare';
  if (percentile <= 60) return 'Uncommon';
  return 'Common';
}

interface RarityData {
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
    species: Record<string, number>; // Percentual de raridade (menor = mais raro)
    background: Record<string, number>;
    body: Record<string, number>;
    accessories: Record<string, number>;
    evolution: Record<string, number>;
  };
  averageRarityRanks: Record<string, number>; // Rank baseado em raridade média (1 = mais raro)
  averageRarityPercentiles: Record<string, number>; // Percentil do rank
  averageRarityCategories: Record<string, RarityCategory>; // Categoria baseada no percentil
}

interface CombinationCount {
  combination: string;
  count: number;
}

function loadDoopiesData(): OrganizedDoopies {
  const dataPath = path.join(__dirname, '../data/doopies_metadata.json');
  const fileContents = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(fileContents) as OrganizedDoopies;
}

function createCombinationKey(
  species: string,
  background: string,
  body: string,
  accessories: string,
  evolution: number
): string {
  return `${species}+${background}+${body}+${accessories}+${evolution}`;
}

function calculateRarityData(): RarityData {
  console.log('🔄 Carregando dados dos Doopies...\n');
  const organizedData = loadDoopiesData();
  
  console.log('📊 Calculando frequências de combinações e traits individuais...\n');
  const combinationCounts: Record<string, number> = {};
  const traitFrequencies = {
    species: {} as Record<string, number>,
    background: {} as Record<string, number>,
    body: {} as Record<string, number>,
    accessories: {} as Record<string, number>,
    evolution: {} as Record<string, number>,
  };
  
  let totalCount = 0;
  
  // Iterar por todas as espécies e evoluções
  for (const species in organizedData) {
    const speciesData = organizedData[species];
    
    // Iterar por cada evolução (ignorar metadata se existir)
    for (const key in speciesData) {
      if (key === 'metadata') continue;
      
      const evolution = parseInt(key);
      if (isNaN(evolution)) continue;
      
      const doopies = speciesData[evolution];
      if (!Array.isArray(doopies)) continue;
      
      // Processar cada Doopie
      for (const doopie of doopies) {
        totalCount++;
        
        // Contar combinação completa
        const combinationKey = createCombinationKey(
          doopie.traits.species,
          doopie.traits.background,
          doopie.traits.body,
          doopie.traits.accessories,
          doopie.traits.evolution
        );
        combinationCounts[combinationKey] = (combinationCounts[combinationKey] || 0) + 1;
        
        // Contar frequências individuais de cada trait
        const speciesName = doopie.traits.species;
        const background = doopie.traits.background;
        const body = doopie.traits.body;
        const accessories = doopie.traits.accessories;
        const evolutionStr = doopie.traits.evolution.toString();
        
        traitFrequencies.species[speciesName] = (traitFrequencies.species[speciesName] || 0) + 1;
        traitFrequencies.background[background] = (traitFrequencies.background[background] || 0) + 1;
        traitFrequencies.body[body] = (traitFrequencies.body[body] || 0) + 1;
        traitFrequencies.accessories[accessories] = (traitFrequencies.accessories[accessories] || 0) + 1;
        traitFrequencies.evolution[evolutionStr] = (traitFrequencies.evolution[evolutionStr] || 0) + 1;
      }
    }
  }
  
  console.log(`✓ Total de Doopies processados: ${totalCount}`);
  console.log(`✓ Combinações únicas encontradas: ${Object.keys(combinationCounts).length}\n`);
  
  // Calcular raridades individuais (percentual de frequência - menor = mais raro)
  console.log('🔄 Calculando raridades individuais das traits...\n');
  const traitRarities = {
    species: {} as Record<string, number>,
    background: {} as Record<string, number>,
    body: {} as Record<string, number>,
    accessories: {} as Record<string, number>,
    evolution: {} as Record<string, number>,
  };
  
  // Calcular percentual de raridade para cada trait (menor percentual = mais raro)
  for (const traitType in traitFrequencies) {
    const frequencies = traitFrequencies[traitType as keyof typeof traitFrequencies];
    const rarities = traitRarities[traitType as keyof typeof traitRarities];
    
    for (const traitValue in frequencies) {
      const frequency = frequencies[traitValue];
      const rarityPercent = (frequency / totalCount) * 100;
      rarities[traitValue] = rarityPercent;
    }
  }
  
  // Calcular raridade média de cada combinação única
  console.log('🔄 Calculando raridades médias de cada combinação...\n');
  const combinationsWithAverage: CombinationWithAverage[] = [];
  
  for (const combination in combinationCounts) {
    const [species, background, body, accessories, evolution] = combination.split('+');
    
    const speciesRarity = traitRarities.species[species] || 0;
    const backgroundRarity = traitRarities.background[background] || 0;
    const bodyRarity = traitRarities.body[body] || 0;
    const accessoriesRarity = traitRarities.accessories[accessories] || 0;
    const evolutionRarity = traitRarities.evolution[evolution] || 0;
    
    // Calcular média das raridades (quanto menor a média, mais raro)
    const averageRarity = (speciesRarity + backgroundRarity + bodyRarity + accessoriesRarity + evolutionRarity) / 5;
    
    combinationsWithAverage.push({ combination, averageRarity });
  }
  
  // Ordenar por raridade média (menor = mais raro = rank 1)
  console.log('🔄 Ordenando combinações por raridade média...\n');
  combinationsWithAverage.sort((a, b) => a.averageRarity - b.averageRarity);
  
  // Atribuir ranks, percentis e categorias baseados na raridade média
  const averageRarityRanks: Record<string, number> = {};
  const averageRarityPercentiles: Record<string, number> = {};
  const averageRarityCategories: Record<string, RarityCategory> = {};
  const totalCombinations = combinationsWithAverage.length;
  
  combinationsWithAverage.forEach((item, index) => {
    const rank = index + 1; // Rank 1 = mais raro
    const percentile = (rank / totalCombinations) * 100;
    const category = getRarityCategory(percentile);
    
    averageRarityRanks[item.combination] = rank;
    averageRarityPercentiles[item.combination] = percentile;
    averageRarityCategories[item.combination] = category;
  });
  
  // Manter ranks antigos por frequência para compatibilidade
  const combinations: CombinationCount[] = Object.entries(combinationCounts)
    .map(([combination, count]) => ({ combination, count }))
    .sort((a, b) => a.count - b.count);
  
  const combinationRanks: Record<string, number> = {};
  const combinationPercentiles: Record<string, number> = {};
  
  combinations.forEach((item, index) => {
    const rank = index + 1;
    const percentile = (rank / totalCombinations) * 100;
    combinationRanks[item.combination] = rank;
    combinationPercentiles[item.combination] = percentile;
  });
  
  console.log(`✓ Ranks por raridade média calculados para ${totalCombinations} combinações\n`);
  
  // Mostrar top 10 mais raros por raridade média
  console.log('🏆 Top 10 Combinações Mais Raras (por raridade média):');
  combinationsWithAverage.slice(0, 10).forEach((item, index) => {
    const rank = averageRarityRanks[item.combination];
    const percentile = averageRarityPercentiles[item.combination];
    const category = averageRarityCategories[item.combination];
    const count = combinationCounts[item.combination];
    console.log(`   ${index + 1}. Rank #${rank} (${percentile.toFixed(2)}%) [${category}] - ${item.combination}: ${count} Doopies, Avg: ${item.averageRarity.toFixed(2)}%`);
  });
  console.log('');
  
  // Estatísticas por categoria
  console.log('📊 Distribuição por Categoria:');
  const categoryCounts: Record<string, number> = {
    Mythic: 0,
    Legendary: 0,
    Epic: 0,
    Rare: 0,
    Uncommon: 0,
    Common: 0,
  };
  
  for (const combination in averageRarityCategories) {
    const category = averageRarityCategories[combination];
    const count = combinationCounts[combination];
    categoryCounts[category] = (categoryCounts[category] || 0) + count;
  }
  
  Object.entries(categoryCounts).forEach(([category, count]) => {
    const percentage = (count / totalCount) * 100;
    console.log(`   ${category}: ${count} NFTs (${percentage.toFixed(2)}%)`);
  });
  console.log('');
  
  return {
    totalDoopies: totalCount,
    combinationFrequencies: combinationCounts,
    combinationRanks,
    combinationPercentiles,
    traitFrequencies,
    traitRarities,
    averageRarityRanks,
    averageRarityPercentiles,
    averageRarityCategories,
  };
}

function main() {
  try {
    console.log('═══════════════════════════════════════════════════════');
    console.log('        DOOPIEDEX RARITY CALCULATOR GENERATOR');
    console.log('═══════════════════════════════════════════════════════\n');
    
    const rarityData = calculateRarityData();
    
    // Salvar dados
    const outputPath = path.join(__dirname, '../data/rarity-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(rarityData, null, 2));
    
    console.log('💾 Dados de raridade salvos em:', outputPath);
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('✨ Processo concluído com sucesso!');
    console.log('═══════════════════════════════════════════════════════\n');
    
  } catch (error) {
    console.error('\n❌ Erro:', error);
    if (error instanceof Error) {
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

main();

