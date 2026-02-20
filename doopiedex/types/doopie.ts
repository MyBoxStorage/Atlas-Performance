export interface Traits {
  background: string;
  species: string;
  body: string;
  accessories: string;
  evolution: number; // 1, 2, 3, or 4
}

export interface Doopie {
  id: number; // e.g., 1, 2, ..., 8888
  imageUrl: string;
  traits: Traits;
  rarity?: number; // Optional rarity score
  mintAddress?: string; // Optional Solana mint address
}

export interface SpeciesMetadata {
  name: string;
  totalCount: number; // Total de NFTs dessa espécie (ex: 771 para QB)
  maxEvolution: number; // Máxima evolução disponível (1-4)
}

export interface OrganizedDoopies {
  [species: string]: {
    metadata?: SpeciesMetadata;
    [evolution: number]: Doopie[];
  };
}

export interface SpeciesData {
  name: string;
  evolutions: {
    [evolution: number]: Doopie[];
  };
}

export interface ColorHarmonyScore {
  doopie: Doopie;
  score: number;
}

