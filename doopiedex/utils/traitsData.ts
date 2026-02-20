/**
 * Traits data baseado nas imagens fornecidas
 * Species: 54 tipos (Imagens 1 e 2)
 * Background: 20 tipos (Imagem 5)
 * Body: 14 tipos (Imagem 4)
 */

// Background traits (20 tipos) - ordenados por rarity (maior para menor)
export const BACKGROUND_TRAITS = [
  'Deep Space',      // 37.28, 4/13, 0.15%
  'Purple Sky',      // 27.69, 1/15, 0.17%
  'Dead',            // 4.90, 14/40, 0.45%
  'Heaven',          // 1.98, 45/231, 2.60%
  'Holo',            // 1.30, 41/191, 2.15%
  'Gold',            // 1.00, 43/179, 2.01%
  'Splat',           // 0.99, 89/428, 4.82%
  'Hell',            // 0.98, 62/242, 2.72%
  'Zebra',           // 0.94, 89/426, 4.79%
  'Sunset',          // 0.85, 94/576, 6.48%
  'Iridescent',      // 0.84, 73/396, 4.46%
  'Pink',            // 0.83, 148/867, 9.76%
  'Dusk',            // 0.82, 106/597, 6.72%
  'Purple',          // 0.80, 156/894, 10.06%
  'Neotide',         // 0.80, 112/555, 6.25%
  'Blue',            // 0.80, 138/883, 9.94%
  'Lagoon',          // 0.79, 97/601, 6.76%
  'Green',           // 0.79, 137/848, 9.54%
  'Yellow',          // 0.74, 159/903, 10.16%
  'deep space',      // -, 0/1, 0.011% (raríssimo)
] as const;

// Body traits (14 tipos) - ordenados por rarity
export const BODY_TRAITS = [
  'Heaven',          // 5.33, 11/37, 0.42%
  'Hell',            // 5.11, 9/29, 0.33%
  'Dead',            // 4.90, 14/40, 0.45%
  'Gold',            // 3.16, 36/152, 1.71%
  'Holo',            // 1.28, 37/259, 2.91%
  'Splats',          // 0.93, 85/497, 5.59%
  'Cheetah',         // 0.85, 112/665, 7.48%
  'Pink',            // 0.84, 224/1272, 14.31%
  'Purple',          // 0.81, 238/1262, 14.20%
  'Blue',            // 0.80, 201/1204, 13.55%
  'Yellow',          // 0.80, 198/1156, 13.01%
  'Green',           // 0.79, 214/1209, 13.61%
  'Camo',            // 0.79, 104/520, 5.85%
  'Zebra',           // 0.74, 82/435, 4.90%
] as const;

// Evolution stages
export const EVOLUTION_STAGES = [1, 2, 3, 4] as const;

// Accessories traits (6 tipos) - baseado no dataset
export const ACCESSORIES_TRAITS = [
  'Crown',
  'Daisy',
  'Halo',
  'Horns',
  'None',
  'Poop',
] as const;

export type BackgroundTrait = typeof BACKGROUND_TRAITS[number];
export type BodyTrait = typeof BODY_TRAITS[number];
export type EvolutionStage = typeof EVOLUTION_STAGES[number];
export type AccessoriesTrait = typeof ACCESSORIES_TRAITS[number];

