/**
 * Script to organize Doopies data by Species and Evolution
 * Applies color harmony algorithm for visual ordering
 */

import * as fs from 'fs';
import * as path from 'path';
import type { Doopie, OrganizedDoopies, SpeciesMetadata } from '../types/doopie';
import { sortByHarmony } from '../utils/colorHarmony';
import { getSpeciesMetadata } from '../utils/speciesMetadata';

/**
 * Organize Doopies by Species → Evolution with color-based ordering
 */
function organizeDoopies(doopies: Doopie[]): OrganizedDoopies {
  const organized: OrganizedDoopies = {};

  console.log(`Organizing ${doopies.length} Doopies...`);

  // Group by Species
  const bySpecies: Record<string, Doopie[]> = {};
  for (const doopie of doopies) {
    const species = doopie.traits.species;
    if (!bySpecies[species]) {
      bySpecies[species] = [];
    }
    bySpecies[species].push(doopie);
  }

  console.log(`Found ${Object.keys(bySpecies).length} unique species`);

  // For each species, group by Evolution and sort by harmony
  for (const species in bySpecies) {
    const speciesDoopies = bySpecies[species];
    
    // Group by Evolution
    const byEvolution: Record<number, Doopie[]> = {};
    for (const doopie of speciesDoopies) {
      const evolution = doopie.traits.evolution;
      if (!byEvolution[evolution]) {
        byEvolution[evolution] = [];
      }
      byEvolution[evolution].push(doopie);
    }

    // Sort each evolution group by color harmony
    organized[species] = {};
    for (const evolution in byEvolution) {
      const evolutionNum = parseInt(evolution);
      const evolutionDoopies = byEvolution[evolutionNum];

      // Sort by harmony score
      const sorted = sortByHarmony(evolutionDoopies);
      organized[species][evolutionNum] = sorted.map(item => item.doopie);

      console.log(`  ${species} - Evolution ${evolution}: ${evolutionDoopies.length} Doopies (sorted by harmony)`);
    }

    // Adicionar metadados da espécie
    const speciesMetadata = getSpeciesMetadata(species);
    if (speciesMetadata) {
      const evolutions = Object.keys(organized[species])
        .filter(key => key !== 'metadata')
        .map(Number);
      const maxEvolution = evolutions.length > 0 ? Math.max(...evolutions) : 1;

      organized[species].metadata = {
        name: species,
        totalCount: speciesMetadata.totalCount,
        maxEvolution: maxEvolution,
      };
    }
  }

  return organized;
}

/**
 * Main organization function
 */
function organizeData() {
  const rawDataPath = path.join(__dirname, '../data/raw-doopies.json');
  const outputPath = path.join(__dirname, '../data/doopies.json');

  // Check if raw data exists
  if (!fs.existsSync(rawDataPath)) {
    console.error(`Raw data file not found: ${rawDataPath}`);
    console.error('Please run fetch-doopies-data.ts first');
    process.exit(1);
  }

  // Load raw data
  console.log(`Loading raw data from ${rawDataPath}...`);
  const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf-8')) as Doopie[];

  if (rawData.length === 0) {
    console.error('No data found in raw-doopies.json');
    process.exit(1);
  }

  // Organize data
  const organized = organizeDoopies(rawData);

  // Save organized data
  fs.writeFileSync(outputPath, JSON.stringify(organized, null, 2));
  console.log(`\nOrganized data saved to ${outputPath}`);

  // Print summary
  const speciesCount = Object.keys(organized).length;
  let totalDoopies = 0;
  for (const species in organized) {
    for (const evolution in organized[species]) {
      totalDoopies += organized[species][parseInt(evolution)].length;
    }
  }

  console.log(`\nSummary:`);
  console.log(`  Species: ${speciesCount}`);
  console.log(`  Total Doopies: ${totalDoopies}`);
}

// Run if executed directly
if (require.main === module) {
  organizeData();
}

export { organizeDoopies };

