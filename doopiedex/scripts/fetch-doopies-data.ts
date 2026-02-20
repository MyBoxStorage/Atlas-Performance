/**
 * Script to fetch Doopies NFT collection data from public APIs
 * Supports Magic Eden and Tensor public endpoints
 */

import * as fs from 'fs';
import * as path from 'path';
import type { Doopie } from '../types/doopie';

const DOOPIES_COLLECTION_SLUG = 'doopies'; // Adjust based on actual collection slug
const MAGIC_EDEN_API = 'https://api-mainnet.magiceden.io/v2';
const TENSOR_API = 'https://api.tensor.so/api/v1'; // Tensor public API (if available)

interface MagicEdenListing {
  tokenMint: string;
  title: string;
  img?: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

interface TensorNFT {
  mint: string;
  name: string;
  image?: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

/**
 * Fetch NFTs from Magic Eden public API
 */
async function fetchFromMagicEden(): Promise<Doopie[]> {
  const doopies: Doopie[] = [];
  let offset = 0;
  const limit = 500;
  let hasMore = true;

  console.log('Fetching Doopies from Magic Eden...');

  try {
    while (hasMore) {
      // Magic Eden collection listings endpoint (public)
      const url = `${MAGIC_EDEN_API}/collections/${DOOPIES_COLLECTION_SLUG}/listings?offset=${offset}&limit=${limit}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`Magic Eden API error: ${response.status}`);
        break;
      }

      const data = await response.json();
      if (!data || data.length === 0) {
        hasMore = false;
        break;
      }

      for (const listing of data as MagicEdenListing[]) {
        try {
          const doopie = parseMagicEdenListing(listing);
          if (doopie) {
            doopies.push(doopie);
          }
        } catch (error) {
          console.warn(`Error parsing listing ${listing.tokenMint}:`, error);
        }
      }

      console.log(`Fetched ${doopies.length} Doopies so far...`);
      offset += limit;

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error('Error fetching from Magic Eden:', error);
  }

  return doopies;
}

/**
 * Parse Magic Eden listing to Doopie format
 */
function parseMagicEdenListing(listing: MagicEdenListing): Doopie | null {
  if (!listing.attributes || listing.attributes.length === 0) {
    return null;
  }

  const traits: Record<string, string> = {};
  for (const attr of listing.attributes) {
    traits[attr.trait_type] = String(attr.value);
  }

  // Extract Doopie ID from title (e.g., "Doopies #1234" -> 1234)
  const idMatch = listing.title?.match(/#(\d+)/);
  const id = idMatch ? parseInt(idMatch[1]) : 0;

  if (!id || !traits.Species || !traits.Background || !traits.Body) {
    return null;
  }

  return {
    id,
    imageUrl: listing.img || '',
    traits: {
      background: traits.Background || traits.background || 'Unknown',
      species: traits.Species || traits.species || 'Unknown',
      body: traits.Body || traits.body || 'Unknown',
      accessories: traits.Accessories || traits.accessories || 'None',
      evolution: parseInt(traits.Evolution || traits.evolution || '1'),
    },
    mintAddress: listing.tokenMint,
  };
}

/**
 * Fetch NFTs from Tensor public API (alternative method)
 */
async function fetchFromTensor(): Promise<Doopie[]> {
  // Tensor API structure may vary - this is a template
  // Adjust based on actual Tensor API documentation
  const doopies: Doopie[] = [];

  console.log('Tensor API integration - implement based on actual API docs');
  
  // Placeholder for Tensor API implementation
  // You would need to check Tensor's actual API documentation

  return doopies;
}

/**
 * Main fetch function - tries multiple sources
 */
async function fetchDoopiesData(): Promise<Doopie[]> {
  console.log('Starting Doopies data collection...\n');

  let allDoopies: Doopie[] = [];

  // Try Magic Eden first
  try {
    const magicEdenData = await fetchFromMagicEden();
    if (magicEdenData.length > 0) {
      allDoopies = magicEdenData;
      console.log(`Successfully fetched ${allDoopies.length} Doopies from Magic Eden\n`);
    }
  } catch (error) {
    console.error('Magic Eden fetch failed:', error);
  }

  // Try Tensor as fallback
  if (allDoopies.length === 0) {
    try {
      const tensorData = await fetchFromTensor();
      if (tensorData.length > 0) {
        allDoopies = tensorData;
        console.log(`Successfully fetched ${allDoopies.length} Doopies from Tensor\n`);
      }
    } catch (error) {
      console.error('Tensor fetch failed:', error);
    }
  }

  // Save raw data
  const outputPath = path.join(__dirname, '../data/raw-doopies.json');
  fs.writeFileSync(outputPath, JSON.stringify(allDoopies, null, 2));
  console.log(`Raw data saved to ${outputPath}`);

  return allDoopies;
}

// Run if executed directly
if (require.main === module) {
  fetchDoopiesData()
    .then((doopies) => {
      console.log(`\nTotal Doopies collected: ${doopies.length}`);
      process.exit(0);
    })
    .catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

export { fetchDoopiesData };

