import type { Doopie, OrganizedDoopies, SpeciesData } from '@/types/doopie';

/**
 * Get current Doopie by species and evolution
 */
export function getCurrentDoopie(
  data: OrganizedDoopies,
  species: string,
  evolution: number
): Doopie | null {
  const speciesData = data[species];
  if (!speciesData) return null;

  const evolutionGroup = speciesData[evolution];
  if (!evolutionGroup || evolutionGroup.length === 0) return null;

  // Return first Doopie in the evolution group (they're already sorted by harmony)
  return evolutionGroup[0];
}

/**
 * Get previous evolution for a species
 */
export function getPreviousEvolution(
  data: OrganizedDoopies,
  species: string,
  currentEvolution: number
): number | null {
  const prevEvolution = currentEvolution - 1;
  if (prevEvolution < 1) return null;

  const speciesData = data[species];
  if (!speciesData) return null;

  if (speciesData[prevEvolution] && speciesData[prevEvolution].length > 0) {
    return prevEvolution;
  }

  return null;
}

/**
 * Get next evolution for a species
 */
export function getNextEvolution(
  data: OrganizedDoopies,
  species: string,
  currentEvolution: number
): number | null {
  const nextEvolution = currentEvolution + 1;
  if (nextEvolution > 4) return null;

  const speciesData = data[species];
  if (!speciesData) return null;

  if (speciesData[nextEvolution] && speciesData[nextEvolution].length > 0) {
    return nextEvolution;
  }

  return null;
}

/**
 * Get all species names sorted
 */
export function getAllSpecies(data: OrganizedDoopies): string[] {
  return Object.keys(data).sort();
}

/**
 * Search Doopies by species name or ID
 */
export function searchDoopies(
  data: OrganizedDoopies,
  query: string
): Doopie[] {
  const results: Doopie[] = [];
  const normalizedQuery = query.toLowerCase().trim();

  for (const species in data) {
    for (const evolution in data[species]) {
      const doopies = data[species][parseInt(evolution)];
      for (const doopie of doopies) {
        // Search by ID
        if (doopie.id.toString().includes(normalizedQuery)) {
          results.push(doopie);
        }
        // Search by species name
        if (doopie.traits.species.toLowerCase().includes(normalizedQuery)) {
          results.push(doopie);
        }
      }
    }
  }

  return results;
}

/**
 * Filter Doopies by traits
 */
export function filterDoopies(
  data: OrganizedDoopies,
  filters: {
    background?: string;
    body?: string;
    accessories?: string;
    evolution?: number;
    species?: string;
  }
): Doopie[] {
  const results: Doopie[] = [];

  for (const species in data) {
    // Filter by species if specified
    if (filters.species && species.toLowerCase() !== filters.species.toLowerCase()) {
      continue;
    }

    for (const evolution in data[species]) {
      const evolutionNum = parseInt(evolution);
      
      // Filter by evolution if specified
      if (filters.evolution && evolutionNum !== filters.evolution) {
        continue;
      }

      const doopies = data[species][evolutionNum];
      for (const doopie of doopies) {
        // Filter by background if specified
        if (filters.background && doopie.traits.background.toLowerCase() !== filters.background.toLowerCase()) {
          continue;
        }

        // Filter by body if specified
        if (filters.body && doopie.traits.body.toLowerCase() !== filters.body.toLowerCase()) {
          continue;
        }

        // Filter by accessories if specified
        if (filters.accessories && doopie.traits.accessories.toLowerCase() !== filters.accessories.toLowerCase()) {
          continue;
        }

        results.push(doopie);
      }
    }
  }

  return results;
}

/**
 * Get first Doopie (for initial display)
 */
export function getFirstDoopie(data: OrganizedDoopies): Doopie | null {
  const species = getAllSpecies(data);
  if (species.length === 0) return null;

  return getCurrentDoopie(data, species[0], 1);
}

