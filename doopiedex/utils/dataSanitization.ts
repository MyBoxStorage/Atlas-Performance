/**
 * Sanitização de dados expostos
 */

/**
 * Sanitiza um endereço mint (trunca para privacidade)
 */
export function sanitizeMintAddress(address: string): string {
  if (!address || typeof address !== 'string') return 'Unknown';
  
  if (address.length > 20) {
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  }
  
  return address;
}

/**
 * Sanitiza uma URL de imagem
 */
export function sanitizeImageUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  
  // Remover parâmetros suspeitos
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.delete('callback');
    urlObj.searchParams.delete('jsonp');
    return urlObj.toString();
  } catch {
    return url;
  }
}

/**
 * Sanitiza endereço de owner
 */
export function sanitizeOwnerAddress(address: string): string | null {
  if (!address || typeof address !== 'string') return null;
  
  // Truncar para privacidade
  if (address.length > 20) {
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  }
  
  return address;
}

/**
 * Valida endereço Solana
 */
export function validateSolanaAddress(address: string): boolean {
  if (!address || typeof address !== 'string') return false;
  
  // Endereços Solana: 32-44 caracteres, base58
  if (address.length < 32 || address.length > 44) return false;
  
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
  return base58Regex.test(address);
}

/**
 * Sanitiza input de usuário
 */
export function sanitizeUserInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .replace(/[<>\"'`]/g, '') // Remove caracteres perigosos
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 200); // Limitar tamanho
}

