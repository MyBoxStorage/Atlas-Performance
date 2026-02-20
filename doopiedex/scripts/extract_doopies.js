const fs = require('fs').promises;

// ==================== CONFIGURAÇÃO ====================
// IMPORTANTE: Use variável de ambiente para API key
// Crie um arquivo .env.local com: HELIUS_API_KEY=your_key_here
const HELIUS_API_KEY = process.env.HELIUS_API_KEY || '';
const USE_DEVNET = false;
const collectionAddress = '7ifrcfFwVLBUKCo8smEK44npokR1xK8KHopRV98Moj8f';

if (!HELIUS_API_KEY) {
  console.error('❌ ERRO: HELIUS_API_KEY não encontrada!');
  console.error('Por favor, defina HELIUS_API_KEY como variável de ambiente ou crie um arquivo .env.local');
  process.exit(1);
}

const MAINNET_ENDPOINT = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
const DEVNET_ENDPOINT = `https://devnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
const url = USE_DEVNET ? DEVNET_ENDPOINT : MAINNET_ENDPOINT;

// ==================== FUNÇÕES AUXILIARES ====================

function getColorHarmonyScore(background, body) {
  const bg = (background || '').toLowerCase();
  const bd = (body || '').toLowerCase();
  
  if (bg === 'yellow' && bd === 'blue') return 1;
  if (bg === 'blue' && bd === 'pink') return 2;
  return 3;
}

function extractDoopieId(name) {
  const match = (name || '').match(/#(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

/**
 * Extrair número da Evolution (pode vir como "Evolution 1" ou 1)
 */
function extractEvolutionNumber(evolution) {
  if (typeof evolution === 'number') {
    return evolution;
  }
  
  const evolutionStr = String(evolution || '');
  // Tentar extrair número de strings como "Evolution 1", "Evolution 2", etc.
  const match = evolutionStr.match(/(\d+)/);
  return match ? parseInt(match[1]) : 1;
}

function validateApiResponse(data, response) {
  if (response.status === 401) {
    throw new Error('❌ Erro 401: Chave API inválida ou expirada.');
  }
  
  if (response.status === 429) {
    throw new Error('❌ Erro 429: Limite de requisições excedido. Aguarde alguns minutos.');
  }
  
  if (data.error) {
    const errorCode = data.error.code;
    const errorMsg = data.error.message;
    throw new Error(`❌ Erro da API Helius (code ${errorCode}): ${errorMsg}`);
  }
  
  return true;
}

/**
 * Extrair traits do asset - Estrutura real do Helius
 */
function extractTraits(asset) {
  // Estrutura: content.metadata.attributes (array direto)
  if (asset.content?.metadata?.attributes && Array.isArray(asset.content.metadata.attributes)) {
    const traitsMap = {};
    asset.content.metadata.attributes.forEach(attr => {
      const key = (attr.trait_type || '').toLowerCase();
      traitsMap[key] = attr.value;
    });
    return traitsMap;
  }

  return null;
}

/**
 * Processar asset baseado na estrutura real do Helius
 */
function processAsset(asset, index, total) {
  try {
    const traitsMap = extractTraits(asset);
    
    if (!traitsMap) {
      return null;
    }

    // Traits dos Doopies: background, species, body, accessories, evolution
    const background = String(traitsMap.background || 'Unknown');
    const species = String(traitsMap.species || 'Unknown');
    const body = String(traitsMap.body || 'Unknown');
    const accessories = String(traitsMap.accessories || 'None');
    
    // Evolution pode vir como "Evolution 1", "Evolution 2", etc ou como número
    const evolution = extractEvolutionNumber(traitsMap.evolution);

    const name = asset.content?.metadata?.name || asset.id || 'Unknown';
    const id = extractDoopieId(name);
    
    if (id === 0 && species === 'Unknown') {
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

    return {
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
      name: name,
      ownership: asset.ownership || null
    };
  } catch (error) {
    return null;
  }
}

/**
 * Buscar todos os assets com paginação
 */
async function getAssetsByGroup() {
  let page = 1;
  let allAssets = [];
  const maxRetries = 3;
  
  console.log('🚀 Iniciando extração de NFTs da coleção Doopies...\n');
  console.log(`📍 Network: ${USE_DEVNET ? 'DEVNET' : 'MAINNET'}`);
  console.log(`🔑 Collection Address: ${collectionAddress}\n`);

  while (true) {
    let retries = 0;
    let success = false;
    let items = [];

    while (retries < maxRetries && !success) {
      try {
        console.log(`📦 Buscando página ${page} (até 1000 NFTs por página)...`);
        
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'doopiedex-fetch',
            method: 'getAssetsByGroup',
            params: {
              groupKey: 'collection',
              groupValue: collectionAddress,
              page: page,
              limit: 1000,
            },
          }),
        });

        const data = await response.json();
        validateApiResponse(data, response);
        
        const result = data.result || {};
        items = result.items || [];
        success = true;
        
      } catch (error) {
        retries++;
        if (error.message.includes('429')) {
          const waitTime = retries * 2000;
          console.log(`⏳ Rate limit. Aguardando ${waitTime/1000}s...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        } else {
          throw error;
        }
      }
    }

    if (!success) {
      throw new Error(`Falha ao buscar página ${page} após ${maxRetries} tentativas`);
    }

    console.log(`✓ Recebidos ${items.length} NFTs (Total: ${allAssets.length + items.length})`);

    if (items.length === 0) {
      break;
    }

    allAssets.push(...items);

    if (items.length < 1000) {
      break;
    }
    
    page++;
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n✅ Total de assets: ${allAssets.length}\n`);
  return allAssets;
}

/**
 * Organizar Doopies por Species e Evolution
 */
function organizeDoopies(doopies) {
  console.log('🔄 Organizando por Species → Evolution...\n');
  
  const organized = {};
  const bySpecies = {};
  
  doopies.forEach(doopie => {
    const species = doopie.traits.species;
    if (!bySpecies[species]) {
      bySpecies[species] = [];
    }
    bySpecies[species].push(doopie);
  });

  console.log(`✓ ${Object.keys(bySpecies).length} espécies encontradas\n`);

  for (const species in bySpecies) {
    const speciesDoopies = bySpecies[species];
    const byEvolution = {};
    
    speciesDoopies.forEach(doopie => {
      const evolution = doopie.traits.evolution;
      if (!byEvolution[evolution]) {
        byEvolution[evolution] = [];
      }
      byEvolution[evolution].push(doopie);
    });

    organized[species] = {};
    for (const evolution in byEvolution) {
      const evolutionDoopies = byEvolution[evolution];
      
      evolutionDoopies.sort((a, b) => {
        const scoreA = getColorHarmonyScore(a.traits.background, a.traits.body);
        const scoreB = getColorHarmonyScore(b.traits.background, b.traits.body);
        if (scoreA !== scoreB) return scoreA - scoreB;
        return a.id - b.id;
      });

      organized[species][evolution] = evolutionDoopies;
      console.log(`  ${species} - Evo ${evolution}: ${evolutionDoopies.length} Doopies`);
    }
  }

  return organized;
}

/**
 * Função principal
 */
async function main() {
  try {
    console.log('═══════════════════════════════════════════════════════');
    console.log('           DOOPIEDEX DATA EXTRACTION TOOL');
    console.log('═══════════════════════════════════════════════════════\n');

    const assets = await getAssetsByGroup();
    
    if (assets.length === 0) {
      console.log('❌ Nenhum asset encontrado.');
      return;
    }

    // Verificar primeiro NFT
    if (assets.length > 0) {
      const firstAsset = assets[0];
      const firstName = firstAsset.content?.metadata?.name || 'Unknown';
      console.log(`ℹ️  Primeiro NFT: ${firstName}\n`);
    }

    // Salvar assets brutos
    await fs.writeFile('doopies_assets.json', JSON.stringify({ 
      total: assets.length, 
      assets: assets 
    }, null, 2));
    console.log('💾 Assets salvos em doopies_assets.json\n');

    // Processar assets
    console.log('🔄 Processando metadados...\n');
    const doopies = [];
    
    for (let i = 0; i < assets.length; i++) {
      const doopie = processAsset(assets[i], i + 1, assets.length);
      if (doopie) {
        doopies.push(doopie);
      }
      
      if ((i + 1) % 100 === 0) {
        console.log(`  ✓ ${i + 1}/${assets.length} processados...`);
      }
      
      if ((i + 1) % 50 === 0) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    console.log(`\n✅ ${doopies.length} Doopies processados\n`);

    // Organizar
    const organized = organizeDoopies(doopies);

    // Salvar organizado
    await fs.writeFile('doopies_metadata.json', JSON.stringify(organized, null, 2));
    console.log('💾 Dados organizados salvos em doopies_metadata.json\n');

    // Estatísticas
    console.log('═══════════════════════════════════════════════════════');
    console.log('                    ESTATÍSTICAS');
    console.log('═══════════════════════════════════════════════════════\n');
    
    console.log(`📊 Total de Assets: ${assets.length}`);
    console.log(`✅ Doopies processados: ${doopies.length}`);
    console.log(`🐾 Espécies únicas: ${Object.keys(organized).length}`);
    
    const evolutionCount = {};
    doopies.forEach(d => {
      evolutionCount[d.traits.evolution] = (evolutionCount[d.traits.evolution] || 0) + 1;
    });
    
    console.log('\n📈 Distribuição por Evolução:');
    Object.keys(evolutionCount).sort((a, b) => parseInt(a) - parseInt(b)).forEach(evo => {
      console.log(`   Evolution ${evo}: ${evolutionCount[evo]}`);
    });

    const speciesCount = {};
    doopies.forEach(d => {
      speciesCount[d.traits.species] = (speciesCount[d.traits.species] || 0) + 1;
    });

    console.log('\n🏆 Top 10 Espécies:');
    Object.entries(speciesCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([species, count], index) => {
        console.log(`   ${index + 1}. ${species}: ${count}`);
      });

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('✨ Processo concluído com sucesso!');
    console.log('═══════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

main();

