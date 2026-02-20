import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Para melhor performance no Render
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    unoptimized: false, // Otimização de imagens
  },
};

export default nextConfig;
