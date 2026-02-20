/**
 * Metadados das espécies Doopies baseado no Species Guide
 * Inclui contagens totais e cores de linha alternadas
 */

export interface SpeciesInfo {
  totalCount: number;
  maxEvolution: number;
  rarity?: number; // Rarity score da espécie
}

// Lista de todas as species (54 espécies)
export const SPECIES_LIST = [
  'ELK', 'ZEBO', 'NANNA', 'KING FLAT', 'BOINK', 'GARETH', 'DALLOP', 'FRANK', 'FLUBERT', 'FOO',
  'BECKA', 'FISHPUPPY', 'SQUIDPULL', 'CHONK', 'LINT', 'SALLY', 'PEKO', 'PYON', 'HANKY', 'WARREN',
  'ONG', 'KIRK', 'YUYO', 'BEAK', 'BETH', 'WHEELIE', 'MEEP', 'SIR PAWN', 'CYTO', 'ELLIE',
  'MCMUFFIN', 'STEVEN', 'CORY', 'BINKY', 'YOONI', 'LOUIE', 'CHIA', 'GHIDDO', 'DONNY', 'NIBB',
  'GIO', 'TEV', 'LIDDLE', 'TUTI', 'BLUB', 'IRING', 'FRAE', 'KEITH', 'BENJAMIN', 'HAZEL',
  'KRYSTAL', 'PAM', 'QB', 'BENEDICTO',
] as const;

export const SPECIES_METADATA: Record<string, SpeciesInfo> = {
  // Top tier (valores altos - Imagem 1, primeiras 2 linhas)
  'ELK': { totalCount: 10, maxEvolution: 4, rarity: 68.68 },
  'ZEBO': { totalCount: 10, maxEvolution: 4, rarity: 37.28 },
  'NANNA': { totalCount: 10, maxEvolution: 4, rarity: 23.43 },
  'KING FLAT': { totalCount: 10, maxEvolution: 4, rarity: 21.83 },
  'BOINK': { totalCount: 10, maxEvolution: 4, rarity: 18.11 },
  'GARETH': { totalCount: 10, maxEvolution: 4, rarity: 16.51 },
  'DALLOP': { totalCount: 10, maxEvolution: 4, rarity: 15.98 },
  'FRANK': { totalCount: 10, maxEvolution: 4, rarity: 15.98 },
  'FLUBERT': { totalCount: 9, maxEvolution: 4, rarity: 14.80 },
  'FOO': { totalCount: 10, maxEvolution: 4, rarity: 13.51 },
  'BECKA': { totalCount: 10, maxEvolution: 4, rarity: 12.91 },
  'FISHPUPPY': { totalCount: 10, maxEvolution: 4, rarity: 12.91 },
  'SQUIDPULL': { totalCount: 10, maxEvolution: 4, rarity: 11.38 },
  'CHONK': { totalCount: 10, maxEvolution: 4, rarity: 11.34 },
  
  // Mid tier (Imagem 1, linhas 3-6)
  'LINT': { totalCount: 148, maxEvolution: 4, rarity: 1.28 },
  'SALLY': { totalCount: 297, maxEvolution: 4, rarity: 1.07 },
  'PEKO': { totalCount: 185, maxEvolution: 4, rarity: 1.07 },
  'PYON': { totalCount: 181, maxEvolution: 3, rarity: 1.07 },
  'HANKY': { totalCount: 173, maxEvolution: 4, rarity: 1.07 },
  'WARREN': { totalCount: 172, maxEvolution: 4, rarity: 1.07 },
  'ONG': { totalCount: 171, maxEvolution: 4, rarity: 1.07 },
  'KIRK': { totalCount: 157, maxEvolution: 3, rarity: 1.05 },
  'YUYO': { totalCount: 198, maxEvolution: 4, rarity: 1.04 },
  'BEAK': { totalCount: 178, maxEvolution: 3, rarity: 1.04 },
  'BETH': { totalCount: 255, maxEvolution: 4, rarity: 1.01 },
  'WHEELIE': { totalCount: 190, maxEvolution: 3, rarity: 1.01 },
  'MEEP': { totalCount: 208, maxEvolution: 4, rarity: 0.99 },
  'SIR PAWN': { totalCount: 176, maxEvolution: 4, rarity: 0.99 },
  'CYTO': { totalCount: 174, maxEvolution: 3, rarity: 0.99 },
  'ELLIE': { totalCount: 205, maxEvolution: 4, rarity: 0.99 },
  'MCMUFFIN': { totalCount: 176, maxEvolution: 4, rarity: 0.99 },
  'STEVEN': { totalCount: 169, maxEvolution: 3, rarity: 0.99 },
  'CORY': { totalCount: 382, maxEvolution: 4, rarity: 0.98 },
  'BINKY': { totalCount: 188, maxEvolution: 4, rarity: 0.97 },
  'YOONI': { totalCount: 217, maxEvolution: 4, rarity: 0.96 },
  'LOUIE': { totalCount: 175, maxEvolution: 4, rarity: 0.96 },
  
  // Lower tier (Imagem 2)
  'CHIA': { totalCount: 167, maxEvolution: 4, rarity: 0.96 },
  'GHIDDO': { totalCount: 344, maxEvolution: 4, rarity: 0.95 },
  'DONNY': { totalCount: 219, maxEvolution: 4, rarity: 0.95 },
  'NIBB': { totalCount: 228, maxEvolution: 4, rarity: 0.92 },
  'GIO': { totalCount: 285, maxEvolution: 4, rarity: 0.85 },
  'TEV': { totalCount: 173, maxEvolution: 4, rarity: 0.85 },
  'LIDDLE': { totalCount: 164, maxEvolution: 4, rarity: 0.85 },
  'TUTI': { totalCount: 199, maxEvolution: 3, rarity: 0.84 },
  'BLUB': { totalCount: 222, maxEvolution: 3, rarity: 0.83 },
  'IRING': { totalCount: 175, maxEvolution: 4, rarity: 0.82 },
  'FRAE': { totalCount: 369, maxEvolution: 4, rarity: 0.82 },
  'KEITH': { totalCount: 221, maxEvolution: 4, rarity: 0.81 },
  'BENJAMIN': { totalCount: 161, maxEvolution: 3, rarity: 0.80 },
  'HAZEL': { totalCount: 175, maxEvolution: 3, rarity: 0.80 },
  'KRYSTAL': { totalCount: 236, maxEvolution: 4, rarity: 0.80 },
  'PAM': { totalCount: 253, maxEvolution: 4, rarity: 0.79 },
  'QB': { totalCount: 771, maxEvolution: 3, rarity: 0.74 },
  'BENEDICTO': { totalCount: 10, maxEvolution: 4, rarity: 0 }, // Especial: 0/10
};

// Cores de fundo alternadas (como no guia)
export const SPECIES_ROW_COLORS = [
  'bg-green-100',  // Light Green
  'bg-yellow-100', // Light Yellow
  'bg-purple-100', // Light Purple
  'bg-pink-100',   // Light Pink
  'bg-blue-100',   // Light Blue
];

/**
 * Obter cor de linha para índice da espécie (cicla através das cores)
 */
export function getSpeciesRowColor(index: number): string {
  return SPECIES_ROW_COLORS[index % SPECIES_ROW_COLORS.length];
}

/**
 * Obter metadados de uma espécie (case-insensitive)
 */
export function getSpeciesMetadata(speciesName: string): SpeciesInfo | null {
  const upperName = speciesName.toUpperCase();
  return SPECIES_METADATA[upperName] || null;
}

