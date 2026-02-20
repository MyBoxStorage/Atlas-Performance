/**
 * Utilitários de validação e sanitização
 */

/**
 * Valida se uma URL de imagem é segura
 */
export function validateImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  
  // Apenas HTTPS ou data URIs
  if (!url.startsWith('https://') && !url.startsWith('data:')) {
    return false;
  }

  // Whitelist de domínios permitidos
  const allowedDomains = [
    'cdn.helius-rpc.com',
    'ipfs.io',
    'ipfs.w3s.link',
    'arweave.net',
  ];

  if (url.startsWith('data:')) {
    return true; // Data URIs são permitidos
  }

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    
    // Verificar se o domínio está na whitelist
    return allowedDomains.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
}

/**
 * Valida um endereço Solana (formato básico)
 */
export function validateSolanaAddress(address: string): boolean {
  if (!address || typeof address !== 'string') return false;
  
  // Endereços Solana têm 32-44 caracteres base58
  if (address.length < 32 || address.length > 44) return false;
  
  // Apenas caracteres alfanuméricos (base58 não inclui 0, O, I, l)
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
  return base58Regex.test(address);
}

/**
 * Sanitiza HTML removendo tags e scripts perigosos
 */
export function sanitizeHtml(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  // Remover tags HTML perigosas
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // Remove event handlers
    .replace(/javascript:/gi, '')
    .trim();
}

/**
 * Valida query de busca
 */
export function validateSearchQuery(query: string): boolean {
  if (!query || typeof query !== 'string') return false;
  
  // Limitar tamanho
  if (query.length > 100) return false;
  
  // Permitir apenas caracteres alfanuméricos, espaços e alguns símbolos
  const allowedRegex = /^[a-zA-Z0-9\s#\-_]+$/;
  return allowedRegex.test(query);
}

/**
 * Sanitiza nome de espécie
 */
export function sanitizeSpeciesName(name: string): string {
  if (!name || typeof name !== 'string') return '';
  
  return name
    .replace(/[<>\"']/g, '') // Remove caracteres perigosos
    .trim()
    .slice(0, 50); // Limitar tamanho
}

/**
 * Valida e sanitiza uma URL
 */
export function sanitizeUrl(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  
  try {
    const urlObj = new URL(url);
    
    // Apenas HTTPS
    if (urlObj.protocol !== 'https:') {
      return null;
    }
    
    // Validar domínio
    if (!validateImageUrl(url)) {
      return null;
    }
    
    return urlObj.toString();
  } catch {
    return null;
  }
}

