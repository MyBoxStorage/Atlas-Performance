/**
 * Script de validação de dados antes do build
 * Verifica integridade e segurança dos dados
 */

import * as fs from 'fs';
import * as path from 'path';
import type { OrganizedDoopies } from '../types/doopie';

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

function validateDoopieData(data: OrganizedDoopies): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Verificar estrutura básica
  if (!data || typeof data !== 'object') {
    errors.push('Dados inválidos: estrutura incorreta');
    return { valid: false, errors, warnings };
  }

  let totalDoopies = 0;
  const imageUrls = new Set<string>();
  const mintAddresses = new Set<string>();

  // Validar cada espécie
  for (const species in data) {
    const speciesData = data[species];
    
    if (typeof speciesData !== 'object') {
      errors.push(`Espécie ${species}: estrutura inválida`);
      continue;
    }

    for (const key in speciesData) {
      if (key === 'metadata') continue;
      
      const evolution = parseInt(key);
      if (isNaN(evolution) || evolution < 1 || evolution > 4) {
        errors.push(`Espécie ${species}: evolução inválida ${key}`);
        continue;
      }

      const doopies = speciesData[evolution];
      if (!Array.isArray(doopies)) {
        errors.push(`Espécie ${species}, evolução ${evolution}: não é um array`);
        continue;
      }

      for (const doopie of doopies) {
        totalDoopies++;

        // Validar campos obrigatórios
        if (!doopie.id || typeof doopie.id !== 'number') {
          errors.push(`Doopie sem ID válido na espécie ${species}`);
        }

        if (!doopie.traits || typeof doopie.traits !== 'object') {
          errors.push(`Doopie #${doopie.id}: traits inválidos`);
        }

        // Validar URL de imagem
        if (doopie.imageUrl) {
          if (!doopie.imageUrl.startsWith('https://') && !doopie.imageUrl.startsWith('data:')) {
            warnings.push(`Doopie #${doopie.id}: URL de imagem não HTTPS`);
          }
          imageUrls.add(doopie.imageUrl);
        }

        // Verificar mint addresses duplicados
        if (doopie.mintAddress) {
          if (mintAddresses.has(doopie.mintAddress)) {
            warnings.push(`Mint address duplicado: ${doopie.mintAddress}`);
          }
          mintAddresses.add(doopie.mintAddress);
        }
      }
    }
  }

  console.log(`\n📊 Validação concluída:`);
  console.log(`   Total de Doopies: ${totalDoopies}`);
  console.log(`   URLs de imagens únicas: ${imageUrls.size}`);
  console.log(`   Mint addresses únicos: ${mintAddresses.size}`);

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

function checkForSensitiveData(data: any): string[] {
  const issues: string[] = [];

  // Verificar se há API keys hardcoded (padrões básicos)
  const dataString = JSON.stringify(data);
  const apiKeyPattern = /[a-zA-Z0-9]{32,}/g;
  const matches = dataString.match(apiKeyPattern);

  if (matches) {
    // Filtrar falsos positivos (IDs, endereços Solana, etc)
    const suspicious = matches.filter(m => 
      m.length >= 32 && 
      !m.startsWith('http') &&
      !m.includes('-') &&
      m.length < 100
    );

    if (suspicious.length > 0) {
      issues.push(`Possíveis chaves sensíveis encontradas: ${suspicious.length} ocorrências`);
    }
  }

  return issues;
}

function validateImageUrls(data: OrganizedDoopies): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const allowedDomains = [
    'cdn.helius-rpc.com',
    'ipfs.io',
    'ipfs.w3s.link',
    'arweave.net',
  ];

  for (const species in data) {
    const speciesData = data[species];
    for (const key in speciesData) {
      if (key === 'metadata') continue;
      const evolution = parseInt(key);
      if (isNaN(evolution)) continue;

      const doopies = speciesData[evolution];
      if (!Array.isArray(doopies)) continue;

      for (const doopie of doopies) {
        if (!doopie.imageUrl) continue;

        // Permitir data URIs
        if (doopie.imageUrl.startsWith('data:')) continue;

        try {
          const url = new URL(doopie.imageUrl);
          
          if (url.protocol !== 'https:') {
            errors.push(`Doopie #${doopie.id}: URL não HTTPS`);
          }

          const hostname = url.hostname;
          const isAllowed = allowedDomains.some(domain => 
            hostname === domain || hostname.endsWith('.' + domain)
          );

          if (!isAllowed) {
            warnings.push(`Doopie #${doopie.id}: domínio não permitido: ${hostname}`);
          }
        } catch {
          errors.push(`Doopie #${doopie.id}: URL inválida`);
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

function checkDataIntegrity(data: OrganizedDoopies): boolean {
  // Verificações básicas de integridade
  let hasSpecies = false;
  let hasDoopies = false;

  for (const species in data) {
    hasSpecies = true;
    const speciesData = data[species];
    
    for (const key in speciesData) {
      if (key === 'metadata') continue;
      const evolution = parseInt(key);
      if (isNaN(evolution)) continue;

      const doopies = speciesData[evolution];
      if (Array.isArray(doopies) && doopies.length > 0) {
        hasDoopies = true;
        break;
      }
    }
    
    if (hasDoopies) break;
  }

  return hasSpecies && hasDoopies;
}

function main() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('        DOOPIEDEX DATA VALIDATION');
  console.log('═══════════════════════════════════════════════════════\n');

  const dataPath = path.join(__dirname, '../data/doopies_metadata.json');
  
  if (!fs.existsSync(dataPath)) {
    console.error('❌ Arquivo de dados não encontrado:', dataPath);
    process.exit(1);
  }

  const fileContents = fs.readFileSync(dataPath, 'utf-8');
  const data: OrganizedDoopies = JSON.parse(fileContents);

  // Validações
  const dataValidation = validateDoopieData(data);
  const urlValidation = validateImageUrls(data);
  const sensitiveData = checkForSensitiveData(data);
  const integrity = checkDataIntegrity(data);

  // Relatório
  console.log('\n📋 Relatório de Validação:\n');

  if (!integrity) {
    console.error('❌ Integridade dos dados: FALHOU');
    process.exit(1);
  } else {
    console.log('✅ Integridade dos dados: OK');
  }

  if (!dataValidation.valid) {
    console.error('❌ Validação de dados: FALHOU');
    dataValidation.errors.forEach(err => console.error(`   - ${err}`));
    process.exit(1);
  } else {
    console.log('✅ Validação de dados: OK');
  }

  if (dataValidation.warnings.length > 0) {
    console.warn('⚠️  Avisos:');
    dataValidation.warnings.slice(0, 10).forEach(warn => console.warn(`   - ${warn}`));
    if (dataValidation.warnings.length > 10) {
      console.warn(`   ... e mais ${dataValidation.warnings.length - 10} avisos`);
    }
  }

  if (!urlValidation.valid) {
    console.error('❌ Validação de URLs: FALHOU');
    urlValidation.errors.slice(0, 10).forEach(err => console.error(`   - ${err}`));
    if (urlValidation.errors.length > 10) {
      console.error(`   ... e mais ${urlValidation.errors.length - 10} erros`);
    }
    process.exit(1);
  } else {
    console.log('✅ Validação de URLs: OK');
  }

  if (urlValidation.warnings.length > 0) {
    console.warn('⚠️  Avisos de URLs:');
    urlValidation.warnings.slice(0, 10).forEach(warn => console.warn(`   - ${warn}`));
    if (urlValidation.warnings.length > 10) {
      console.warn(`   ... e mais ${urlValidation.warnings.length - 10} avisos`);
    }
  }

  if (sensitiveData.length > 0) {
    console.warn('⚠️  Dados sensíveis possíveis:');
    sensitiveData.forEach(issue => console.warn(`   - ${issue}`));
  } else {
    console.log('✅ Dados sensíveis: OK');
  }

  console.log('\n═══════════════════════════════════════════════════════');
  console.log('✨ Validação concluída com sucesso!');
  console.log('═══════════════════════════════════════════════════════\n');
}

main();

