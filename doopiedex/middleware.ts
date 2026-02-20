import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting simples em memória (para produção, usar Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const RATE_LIMIT_MAX = 100; // 100 requests por minuto

/**
 * Detecta se um User-Agent é um bot conhecido
 */
function isBotUserAgent(userAgent: string): boolean {
  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python/i,
    /node-fetch/i,
  ];
  
  return botPatterns.some(pattern => pattern.test(userAgent));
}

/**
 * Rate limiting simples
 */
function rateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Limpa entradas antigas do rate limit (garbage collection simples)
 */
function cleanupRateLimit() {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}

// Limpar a cada 5 minutos
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimit, 5 * 60 * 1000);
}

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  const userAgent = request.headers.get('user-agent') || '';

  // Rate limiting
  if (!rateLimit(ip)) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  // Detectar bots suspeitos (opcional - pode ser muito restritivo)
  // Se quiser bloquear bots, descomente:
  // if (isBotUserAgent(userAgent) && !userAgent.includes('Googlebot')) {
  //   return new NextResponse('Forbidden', { status: 403 });
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

