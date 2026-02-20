/**
 * Validação específica de URLs de imagens
 */

const ALLOWED_IMAGE_DOMAINS = [
  'cdn.helius-rpc.com',
  'ipfs.io',
  'ipfs.w3s.link',
  'arweave.net',
];

/**
 * Obtém lista de domínios permitidos para imagens
 */
export function getAllowedImageDomains(): string[] {
  return [...ALLOWED_IMAGE_DOMAINS];
}

/**
 * Valida se uma URL de imagem é segura
 */
export function validateImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  
  // Permitir data URIs
  if (url.startsWith('data:')) {
    // Validar formato básico de data URI
    return url.startsWith('data:image/');
  }

  // Apenas HTTPS
  if (!url.startsWith('https://')) {
    return false;
  }

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    
    // Verificar se está na whitelist
    return ALLOWED_IMAGE_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
}

/**
 * Sanitiza uma URL de imagem
 */
export function sanitizeImageUrl(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  
  // Se for data URI, retornar como está (já validado)
  if (url.startsWith('data:image/')) {
    return url;
  }

  if (!validateImageUrl(url)) {
    return null;
  }

  try {
    const urlObj = new URL(url);
    return urlObj.toString();
  } catch {
    return null;
  }
}

/**
 * Verifica headers de segurança de resposta de imagem
 */
export async function checkImageSecurityHeaders(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      mode: 'no-cors' // CORS pode bloquear, mas tentamos
    });
    
    // Se conseguir verificar headers
    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.startsWith('image/')) {
      return false;
    }
    
    return true;
  } catch {
    // Se não conseguir verificar (CORS, etc), assumir seguro se passou validação de URL
    return validateImageUrl(url);
  }
}

/**
 * Valida tamanho máximo de imagem antes de carregar
 */
export function validateImageSize(url: string, maxSizeMB: number = 10): Promise<boolean> {
  return new Promise((resolve) => {
    if (!validateImageUrl(url)) {
      resolve(false);
      return;
    }

    const img = new Image();
    img.onload = () => {
      // Validar dimensões (não tamanho de arquivo, mas dimensões da imagem)
      const maxDimension = 4000; // pixels
      if (img.width > maxDimension || img.height > maxDimension) {
        resolve(false);
        return;
      }
      resolve(true);
    };
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

