/**
 * Script para criar mapeamento de imagens específicas dos 28 Doopies dos prints
 */

import * as fs from 'fs';
import * as path from 'path';
import type { OrganizedDoopies, Doopie } from '../types/doopie';

// Asset IDs dos 28 Doopies dos prints
const FEATURED_ASSET_IDS = [
  'BCZjkj5AutjfkYZKwcJidxcTBKPCQEJMfouraFosx483',
  'DGACtFrAoGuriAtTgafvFRSmax7VcgKJJU7SEZB5ZfKr',
  '7HvsHuJi9VXbMrBtyTU2ACrKfRovf2LzVZ3F79cy5VPn',
  '3STyKKJjTw5ZtAMSgvUYWFTjbQ8xpsFL4tuhmqCZWQ8s',
  'DbJQw5J79f13JeyWckY91D2QfGQru41ptyADRKzbzEui',
  'A6NEXf39V8Yo1jUNJfofyZioXLA2YXvvjB4ynTGBmZGA',
  '6kqDVUnjka1hYAYjPWgtPxEpFxhthUMgwJrJ7iWfz2VN',
  'Bs3gkmDMBBMM7oL1YagHFZ5avv1jGwsQJ3km7ALbGUSt',
  '5d81AgPXa1LpBjQoPqsZry6QQ5PnhR9qU6mBxDYVnbq1',
  '6uudFLX8xceCXUMo2jzfgyiShmVCTuZ6yZGkrsYCTKJP',
  '4gmxFhD4kxo36ppxhpQSXsZy763kUCSCke3xcTYDP67F',
  'BCpwRmob9TLyrsU9A4R9FWRkMMzE8ZwvsUJgWKtvf1mN',
  '4ZfNyb1PaapCUzmsnyUk5VXipSWNhCKFpx6KW2pTA6J3',
  '83rgr1hTn8toTmP6k43Nbsd8iHaxJxfayV8PxSpijGiK',
  '8xbo21jYWyoaKyvfYsRicB8VBFFTthWta9rtP2qQcgHT',
  'A6AwmeHG3AptwqrzbhPRhAiN54En3Tny6hbUPn4oUhRf',
  '567HAM1dHLYo7czXQ1PQALs3CytrmSRPmLh3CmHUj3Gf',
  '349MwhabfCn7TUgvqJNxoUBySDmqkPZNVKt1kE1enUMY',
  'FcXVmAY4yjgsEMvmkysziW86yn1Kfryq4AQ1xLQi87tF',
  '6ADJrHWwD8iXk1knsY5YqCLMDB6sWbHXNVQioXbRTBkN',
  '4LgbQV8Rs1zwVwdEVp1MBt1iw8sR6yaeSzprrDPgZKQh',
  'DJaUD6BDN71H5RH7mSmuy9YjetMyCYzFBDpPm9nLW27G',
  'HceWqMyDd7xk2NUKj8ZjqZW4A9K9Lzu8dN9WnN7t8PyA',
  'CqufFeovo4fd6wLZ3NG85bHB5Z343K97VR5HpETdaqcc',
  'De2K88qMen7KLUZyHR8oV17xHaLw6VBXhi6MFEqPghUc',
  '4tenpCDBk3ArsDNvRN8PzawteFy6wbpoWi7E6Cw7mA7J',
  '9rov3tCizMUhyj42S2S9pWgLZeYjgmENDTELwV7gAXmS',
  'AaXgQvcqsGeVfS2BUotSWB7Jk2HPBUfDNBwhh7XLtkvg',
];

interface FeaturedImageMapping {
  [combinationKey: string]: {
    imageUrl: string;
    assetId: string;
    id: number;
  };
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

function loadDoopiesData(): OrganizedDoopies {
  const dataPath = path.join(__dirname, '../data/doopies_metadata.json');
  const fileContents = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(fileContents) as OrganizedDoopies;
}

function findDoopieByAssetId(
  data: OrganizedDoopies,
  assetId: string
): Doopie | null {
  for (const species in data) {
    const speciesData = data[species];
    for (const key in speciesData) {
      if (key === 'metadata') continue;
      const evolution = parseInt(key);
      if (isNaN(evolution)) continue;
      
      const doopies = speciesData[evolution];
      if (!Array.isArray(doopies)) continue;
      
      const found = doopies.find(d => d.mintAddress === assetId);
      if (found) return found;
    }
  }
  return null;
}

function main() {
  console.log('🔄 Carregando dados dos Doopies...\n');
  const data = loadDoopiesData();
  
  console.log('🔍 Buscando 28 Doopies pelos Asset IDs...\n');
  const mapping: FeaturedImageMapping = {};
  const notFound: string[] = [];
  const duplicates: Array<{ assetId: string; combination: string }> = [];
  
  for (const assetId of FEATURED_ASSET_IDS) {
    const doopie = findDoopieByAssetId(data, assetId);
    
    if (!doopie) {
      notFound.push(assetId);
      console.log(`⚠️  Não encontrado: ${assetId}`);
      continue;
    }
    
    const combinationKey = createCombinationKey(
      doopie.traits.species,
      doopie.traits.background,
      doopie.traits.body,
      doopie.traits.accessories,
      doopie.traits.evolution
    );
    
    // Se já existe, verificar qual é mais raro (menor ID geralmente = mais raro, ou podemos usar rarity)
    if (mapping[combinationKey]) {
      duplicates.push({ assetId, combination: combinationKey });
      // Manter o que tem menor ID (assumindo que é mais raro/prioritário)
      if (doopie.id < mapping[combinationKey].id) {
        mapping[combinationKey] = {
          imageUrl: doopie.imageUrl,
          assetId: assetId,
          id: doopie.id,
        };
        console.log(`✓ Atualizado (mais raro): ${combinationKey} - Asset: ${assetId}`);
      } else {
        console.log(`⚠️  Duplicado (mantendo mais raro): ${combinationKey} - Asset: ${assetId}`);
      }
    } else {
      mapping[combinationKey] = {
        imageUrl: doopie.imageUrl,
        assetId: assetId,
        id: doopie.id,
      };
      console.log(`✓ Encontrado: ${combinationKey} - Asset: ${assetId}`);
    }
  }
  
  console.log(`\n✅ Total de mapeamentos criados: ${Object.keys(mapping).length}`);
  console.log(`⚠️  Não encontrados: ${notFound.length}`);
  console.log(`⚠️  Duplicados resolvidos: ${duplicates.length}\n`);
  
  if (notFound.length > 0) {
    console.log('Asset IDs não encontrados:');
    notFound.forEach(id => console.log(`  - ${id}`));
    console.log('');
  }
  
  if (duplicates.length > 0) {
    console.log('Combinações duplicadas (mais raro mantido):');
    duplicates.forEach(dup => console.log(`  - ${dup.combination}: ${dup.assetId}`));
    console.log('');
  }
  
  // Salvar mapeamento
  const outputPath = path.join(__dirname, '../data/featured-images-mapping.json');
  fs.writeFileSync(outputPath, JSON.stringify(mapping, null, 2));
  
  console.log('💾 Mapeamento salvo em:', outputPath);
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('✨ Processo concluído!');
  console.log('═══════════════════════════════════════════════════════\n');
}

main();

