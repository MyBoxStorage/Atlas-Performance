/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otimizações de imagens
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.helius-rpc.com',
      },
      {
        protocol: 'https',
        hostname: '*.ipfs.io',
      },
      {
        protocol: 'https',
        hostname: '*.ipfs.w3s.link',
      },
      {
        protocol: 'https',
        hostname: '*.arweave.net',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "connect-src 'self' https://*.helius-rpc.com https://*.ipfs.io https://*.ipfs.w3s.link https://*.arweave.net",
              "font-src 'self' data:",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },

  // Compressão
  compress: true,
  
  // Experimental features para melhor performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'use-sound'],
  },
};

module.exports = nextConfig;

