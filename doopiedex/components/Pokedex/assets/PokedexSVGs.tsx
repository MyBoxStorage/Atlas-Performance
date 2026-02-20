/**
 * Componentes SVG do Pokédex
 * Baseados nas imagens de referência fornecidas
 */

import React from 'react';
import Image from 'next/image';

interface PokedexSVGProps {
  className?: string;
  onClick?: () => void;
}

const POKEBALL_IMAGE_URL = 'https://prod-image-cdn.tensor.trade/images/400x400/freeze=false/https%3A%2F%2Fprod-tensor-creators-s3.s3.us-east-1.amazonaws.com%2Fimage%2F9abc816d-cfad-4cb8-88ef-b439a83f1eb5';

/**
 * Pokédex Fechado - Versão vertical rosa pastel com lente azul e botão triangular amarelo
 */
export const PokedexClosedSVG: React.FC<PokedexSVGProps> = ({ className = '', onClick }) => {
  return (
    <svg
      width="300"
      height="500"
      viewBox="0 0 300 500"
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* Frame rosa pastel principal */}
      <rect
        x="10"
        y="10"
        width="280"
        height="480"
        rx="20"
        ry="20"
        fill="#F8BBD9"
        stroke="#F472B6"
        strokeWidth="4"
      />
      
      {/* Lente azul circular no topo esquerdo */}
      <circle
        cx="60"
        cy="80"
        r="35"
        fill="#3B82F6"
        stroke="#1E40AF"
        strokeWidth="3"
      />
      <circle
        cx="60"
        cy="80"
        r="25"
        fill="#60A5FA"
      />
      <circle
        cx="55"
        cy="75"
        r="8"
        fill="#DBEAFE"
        opacity="0.8"
      />
      
      {/* 3 Luzes indicadoras (vermelho, amarelo, verde) */}
      <circle cx="150" cy="80" r="6" fill="#EF4444" />
      <circle cx="170" cy="80" r="6" fill="#F59E0B" />
      <circle cx="190" cy="80" r="6" fill="#10B981" />
      
      {/* Linha curva decorativa */}
      <path
        d="M 50 130 Q 150 180, 250 130"
        stroke="#F472B6"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Botão triangular amarelo na lateral */}
      <polygon
        points="10,250 35,240 35,260"
        fill="#F59E0B"
        stroke="#D97706"
        strokeWidth="2"
      />
      <polygon
        points="12,250 32,243 32,257"
        fill="#FCD34D"
      />
      
      {/* Slot horizontal na parte inferior */}
      <rect
        x="80"
        y="450"
        width="140"
        height="8"
        rx="4"
        fill="#F472B6"
      />
      
      {/* Texto "Doopiedéx" no centro */}
      <text
        x="150"
        y="280"
        textAnchor="middle"
        fill="white"
        fontSize="18"
        fontFamily="var(--font-press-start-2p), monospace"
        opacity="0.9"
      >
        DOOPIEDÉX
      </text>
      
      {/* Detalhes de profundidade */}
      <rect
        x="20"
        y="20"
        width="260"
        height="460"
        rx="18"
        ry="18"
        fill="none"
        stroke="#F472B6"
        strokeWidth="2"
        opacity="0.3"
      />
    </svg>
  );
};

/**
 * Pokédex Aberto - Layout em duas partes com painéis
 */
export const PokedexOpenSVG: React.FC<PokedexSVGProps & { isAnimating?: boolean }> = ({ 
  className = '', 
  onClick,
  isAnimating = false 
}) => {
  return (
    <svg
      width="800"
      height="500"
      viewBox="0 0 800 500"
      className={className}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* Painel Esquerdo */}
      <g>
        {/* Frame rosa pastel esquerdo */}
        <rect
          x="10"
          y="10"
          width="380"
          height="480"
          rx="15"
          ry="15"
          fill="#F8BBD9"
          stroke="#F472B6"
          strokeWidth="4"
        />
        
        {/* Área da tela branca (quadrada) */}
        <rect
          x="40"
          y="60"
          width="320"
          height="320"
          rx="5"
          fill="#FFFFFF"
          stroke="#E5E7EB"
          strokeWidth="3"
        />
        
        {/* Botão azul circular */}
        <circle
          cx="100"
          cy="420"
          r="25"
          fill="#3B82F6"
          stroke="#1E40AF"
          strokeWidth="3"
        />
        <circle
          cx="100"
          cy="420"
          r="18"
          fill="#60A5FA"
        />
        <circle
          cx="95"
          cy="415"
          r="6"
          fill="#DBEAFE"
          opacity="0.8"
        />
        
        {/* Dois botões cinza retangulares */}
        <rect
          x="160"
          y="400"
          width="60"
          height="40"
          rx="5"
          fill="#9CA3AF"
          stroke="#6B7280"
          strokeWidth="2"
        />
        <rect
          x="240"
          y="400"
          width="60"
          height="40"
          rx="5"
          fill="#9CA3AF"
          stroke="#6B7280"
          strokeWidth="2"
        />
        
        {/* Campos Name e Owner (abaixo dos botões) */}
        <rect
          x="40"
          y="460"
          width="320"
          height="20"
          rx="3"
          fill="#F9FAFB"
          stroke="#E5E7EB"
          strokeWidth="1"
        />
      </g>
      
      {/* Painel Direito */}
      <g>
        {/* Frame rosa pastel direito */}
        <rect
          x="410"
          y="10"
          width="380"
          height="480"
          rx="15"
          ry="15"
          fill="#F8BBD9"
          stroke="#F472B6"
          strokeWidth="4"
        />
        
        {/* Área branca de informações */}
        <rect
          x="440"
          y="40"
          width="320"
          height="420"
          rx="5"
          fill="#FFFFFF"
          stroke="#E5E7EB"
          strokeWidth="3"
        />
        
        {/* Ícone Pokéball no topo direito - usando image externa */}
        <image
          href={POKEBALL_IMAGE_URL}
          x="730"
          y="40"
          width="40"
          height="40"
          preserveAspectRatio="xMidYMid meet"
        />
        
        {/* Ícone Pokéball no inferior direito - usando image externa */}
        <image
          href={POKEBALL_IMAGE_URL}
          x="730"
          y="420"
          width="40"
          height="40"
          preserveAspectRatio="xMidYMid meet"
        />
      </g>
      
      {/* Hinge/Conectores entre os painéis */}
      <circle
        cx="400"
        cy="100"
        r="8"
        fill="#F472B6"
      />
      <circle
        cx="400"
        cy="250"
        r="8"
        fill="#F472B6"
      />
      <circle
        cx="400"
        cy="400"
        r="8"
        fill="#F472B6"
      />
    </svg>
  );
};

/**
 * Ícone Pokéball usando Image do Next.js para melhor performance
 */
export const PokeballIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 24, 
  className = '' 
}) => {
  return (
    <Image
      src={POKEBALL_IMAGE_URL}
      alt="Pokeball"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
      unoptimized // Permite imagens externas
    />
  );
};
