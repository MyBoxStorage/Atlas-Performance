/**
 * Script para buscar todos os NFTs da coleção Doopies usando Solana RPC
 * Collection Address: 7ifrcfFwVLBUKCo8smEK44npokR1xK8KHopRV98Moj8f
 * 
 * Nota: Este script usa RPC direto. Para melhor performance, considere usar:
 * - Helius API (https://helius.xyz)
 * - QuickNode API
 * - Alchemy Solana API
 */

import * as fs from 'fs';
import * as path from 'path';
import type { Doopie } from '../types/doopie';

const COLLECTION_ADDRESS = '7ifrcfFwVLBUKCo8smEK44npokR1xK8KHopRV98Moj8f';
const HELIUS_API_KEY = process.env.HELIUS_API_KEY || 'dcea2450-22fb-4647-b121-0ba17b4dc85f';
const HELIUS_ENDPOINT = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;


/**
 * Extract Doopie ID from name (e.g., "Doopies #1234" -> 1234)
 */
function extractDoopieId(name: string): number {
  const match = name.match(/#(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

/**
 * Extract evolution number (can come as "Evolution 1" or as number)
 */
function extractEvolutionNumber(evolution: string | number): number {
  if (typeof evolution === 'number') {
    return evolution;
  }
  
  const evolutionStr = String(evolution || '');
  // Extract number from strings like "Evolution 1", "Evolution 2", etc.
  const match = evolutionStr.match(/(\d+)/);
  return match ? parseInt(match[1]) : 1;
}

/**
 * Extrair traits do asset - Estrutura real do Helius
 * Os attributes estão em: content.metadata.attributes (array direto)
 */
function extractTraits(asset: HeliusAsset): Record<string, string | number> | null {
  // Estrutura real: content.metadata.attributes (array direto)
  if (asset.content?.metadata?.attributes && Array.isArray(asset.content.metadata.attributes)) {
    const traitsMap: Record<string, string | number> = {};
    asset.content.metadata.attributes.forEach(attr => {
      const key = (attr.trait_type || '').toLowerCase();
      traitsMap[key] = attr.value;
    });
    return traitsMap;
  }

  return null;
}

/**
 * Processar asset e extrair informações do Doopie
 */
function processHeliusAsset(asset: HeliusAsset, index: number, total: number): Doopie | null {
  try {
    // Extrair traits
    const traitsMap = extractTraits(asset);
    
    if (!traitsMap) {
      if (index <= 5) { // Log apenas os primeiros para não poluir
        console.warn(`⚠️  NFT ${index + 1}/${total}: Traits não encontrados`);
      }
      return null;
    }

    // Traits dos Doopies: background, species, body, accessories, evolution
    const background = String(traitsMap.background || 'Unknown');
    const species = String(traitsMap.species || 'Unknown');
    const body = String(traitsMap.body || 'Unknown');
    const accessories = String(traitsMap.accessories || 'None');
    
    // Evolution pode vir como "Evolution 1", "Evolution 2", etc ou como número
    const evolution = extractEvolutionNumber(traitsMap.evolution as string | number);

    const name = asset.content?.metadata?.name || asset.id || 'Unknown';
    const id = extractDoopieId(name);
    
    if (id === 0 && species === 'Unknown') {
      if (index <= 5) {
        console.warn(`⚠️  NFT ${index + 1}/${total}: ID e Species não encontrados`);
      }
      return null;
    }

    const doopieId = id > 0 ? id : index + 1;

    // Obter URL da imagem - estrutura real do Helius
    let imageUrl = '';
    if (asset.content?.files && asset.content.files.length > 0) {
      // Priorizar cdn_uri, depois uri
      imageUrl = asset.content.files[0].cdn_uri || asset.content.files[0].uri || '';
    }
    
    // Fallback: usar links.image
    if (!imageUrl && asset.content?.links?.image) {
      imageUrl = asset.content.links.image;
    }

    // Converter IPFS se necessário (já vem como https normalmente, mas verificar)
    if (imageUrl && imageUrl.startsWith('ipfs://')) {
      imageUrl = imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }

    const doopie: Doopie = {
      id: doopieId,
      imageUrl: imageUrl,
      traits: {
        background: background,
        species: species,
        body: body,
        accessories: accessories,
        evolution: evolution
      },
      mintAddress: asset.id,
    };

    return doopie;
  } catch (error) {
    if (index <= 5) {
      console.warn(`⚠️  Erro ao processar NFT ${index + 1}/${total}:`, error);
    }
    return null;
  }
}

/**
 * Buscar NFTs da coleção usando Helius getAssetsByGroup (com paginação)
 */
async function fetchAssetsFromHelius(page: number = 1, limit: number = 1000): Promise<HeliusAsset[]> {
  const requestBody = {
    jsonrpc: '2.0',
    id: 'doopiedex-fetch',
    method: 'getAssetsByGroup',
    params: {
      groupKey: 'collection',
      groupValue: COLLECTION_ADDRESS,
      page: page,
      limit: limit,
    },
  };

  const response = await fetch(HELIUS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: HeliusResponse = await response.json();

  if (data.error) {
    throw new Error(`Helius API error: ${data.error.message} (code: ${data.error.code})`);
  }

  return data.result?.items || [];
}

interface HeliusAsset {
  id: string;
  content?: {
    metadata?: {
      name?: string;
      uri?: string;
      attributes?: Array<{ trait_type: string; value: string | number }>;
    };
    json_uri?: string;
    files?: Array<{ uri?: string; cdn_uri?: string }>;
    links?: {
      image?: string;
    };
  };
  ownership?: any;
}

interface HeliusResponse {
  result?: {
    items?: HeliusAsset[];
    total?: number;
  };
  error?: {
    code: number;
    message: string;
  };
}



/**
 * Buscar todos os NFTs da coleção usando Helius API
 */
async function fetchDoopiesFromHelius(): Promise<Doopie[]> {
  console.log('🚀 Iniciando busca de NFTs da coleção Doopies via Helius API...\n');
  console.log(`Collection Address: ${COLLECTION_ADDRESS}`);
  console.log(`API Key: ${HELIUS_API_KEY.substring(0, 8)}...\n`);

  const allDoopies: Doopie[] = [];
  let page = 1;
  const limit = 1000; // Máximo por página
  let hasMore = true;

  try {
    while (hasMore) {
      console.log(`📦 Buscando página ${page} (até ${limit} NFTs por página)...`);
      
      const assets = await fetchAssetsFromHelius(page, limit);
      
      if (assets.length === 0) {
        hasMore = false;
        break;
      }

      console.log(`✓ Recebidos ${assets.length} NFTs na página ${page}\n`);
      console.log('🔄 Processando metadados...\n');

      // Processar cada asset
      for (let i = 0; i < assets.length; i++) {
        const doopie = processHeliusAsset(assets[i], allDoopies.length, assets.length);
        
        if (doopie) {
          allDoopies.push(doopie);
        }

        // Progress update a cada 50 NFTs
        if ((i + 1) % 50 === 0) {
          console.log(`  ✓ Processados ${i + 1}/${assets.length} NFTs desta página...`);
        }

        // Rate limiting leve
        await new Promise(resolve => setTimeout(resolve, 10));
      }

      console.log(`\n✅ Página ${page} concluída. Total acumulado: ${allDoopies.length} NFTs\n`);

      // Se recebeu menos que o limite, não há mais páginas
      if (assets.length < limit) {
        hasMore = false;
      } else {
        page++;
        // Pequena pausa entre páginas
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    console.log(`\n✅ Busca concluída! Total de Doopies coletados: ${allDoopies.length}\n`);

  } catch (error) {
    console.error('❌ Erro ao buscar NFTs:', error);
    throw error;
  }

  return allDoopies;
}

/**
 * Função principal
 */
async function main() {
  try {
    const doopies = await fetchDoopiesFromHelius();

    // Salvar dados brutos
    const outputPath = path.join(__dirname, '../data/raw-doopies.json');
    fs.writeFileSync(outputPath, JSON.stringify(doopies, null, 2));
    console.log(`💾 Dados salvos em: ${outputPath}`);

    // Estatísticas
    const speciesCount: Record<string, number> = {};
    const evolutionCount: Record<number, number> = {};
    
    for (const doopie of doopies) {
      speciesCount[doopie.traits.species] = (speciesCount[doopie.traits.species] || 0) + 1;
      evolutionCount[doopie.traits.evolution] = (evolutionCount[doopie.traits.evolution] || 0) + 1;
    }

    console.log(`\n📈 Estatísticas:`);
    console.log(`   Total de Doopies: ${doopies.length}`);
    console.log(`   Espécies únicas: ${Object.keys(speciesCount).length}`);
    console.log(`\n   Distribuição por Evolução:`);
    Object.entries(evolutionCount)
      .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
      .forEach(([evolution, count]) => {
        console.log(`     Evolution ${evolution}: ${count}`);
      });
    
    console.log(`\n   Top 10 Espécies:`);
    Object.entries(speciesCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([species, count]) => {
        console.log(`     ${species}: ${count}`);
      });

    console.log(`\n✨ Próximo passo: Execute 'npm run organize-data' para organizar os dados`);

  } catch (error) {
    console.error('\n❌ Erro fatal:', error);
    if (error instanceof Error) {
      console.error(`   Mensagem: ${error.message}`);
      console.error(`   Stack: ${error.stack}`);
    }
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

export { fetchDoopiesFromHelius };

