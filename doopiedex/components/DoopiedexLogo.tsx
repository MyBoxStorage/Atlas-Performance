'use client';

import React from 'react';

interface DoopiedexLogoProps {
  variant?: 'css' | 'svg' | 'auto';
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  className?: string;
}

export default function DoopiedexLogo({
  variant = 'css',
  size = 'lg',
  animate = false,
  className = '',
}: DoopiedexLogoProps) {
  // Size mappings
  const sizeClasses = {
    sm: {
      doopies: 'text-lg',
      dex: 'text-4xl',
      shadows: 'simplified', // Simplified shadows for mobile
    },
    md: {
      doopies: 'text-xl',
      dex: 'text-5xl',
      shadows: 'medium',
    },
    lg: {
      doopies: 'text-2xl',
      dex: 'text-6xl md:text-7xl',
      shadows: 'full',
    },
  };

  const currentSize = sizeClasses[size];

  // Generate text shadow based on size (simplified for mobile)
  const getTextShadow = (colorRgba: string, isSimplified: boolean) => {
    if (isSimplified || size === 'sm') {
      return `0 2px 4px ${colorRgba}, 0 1px 2px rgba(0, 0, 0, 0.3)`;
    }
    const lightColor = colorRgba.replace('0.4', '0.2').replace('0.5', '0.2');
    const glowColor = colorRgba.replace('0.4', '0.1').replace('0.5', '0.1');
    return `
      0 4px 8px ${colorRgba},
      0 2px 4px rgba(0, 0, 0, 0.3),
      0 -1px 2px rgba(255, 255, 255, 0.5),
      0 6px 12px ${lightColor},
      0 0 20px ${glowColor}
    `;
  };

  const getFilter = (isSimplified: boolean) => {
    if (isSimplified || size === 'sm') return 'none';
    return 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.4))';
  };

  const getTextStroke = (isSimplified: boolean) => {
    if (isSimplified || size === 'sm') return 'none';
    return '0.5px rgba(255, 255, 255, 0.2)';
  };

  return (
    <div className={`flex flex-col items-center ${className} ${animate ? 'transition-all duration-300 hover:scale-105' : ''}`}>
      {/* "Doopies" - Script text */}
      <div
        className={`${currentSize.doopies} md:text-2xl text-xl mb-2 text-slate-700/90 font-handwritten drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]`}
        style={{ fontFamily: 'var(--font-caveat), cursive' }}
      >
        Doopies
      </div>

      {/* "Déx" - 3D balloon letters */}
      <div className={`${currentSize.dex} text-4xl md:text-6xl lg:text-7xl font-bold inline-flex items-center gap-1 md:gap-2`}>
        {/* Letter D */}
        <span
          className={`relative inline-block balloon-letter ${
            animate ? 'transition-all duration-300 hover:scale-110' : ''
          }`}
          style={{
            background: size === 'sm'
              ? 'linear-gradient(135deg, #f9a8d4 0%, #ec4899 50%, #db2777 100%)'
              : 'radial-gradient(circle at 30% 30%, rgba(251, 182, 206, 1) 0%, rgba(236, 72, 153, 1) 40%, rgba(219, 39, 119, 1) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: size === 'sm' 
              ? '0 2px 4px rgba(236, 72, 153, 0.5), 0 1px 2px rgba(0, 0, 0, 0.4)'
              : `
                0 6px 12px rgba(236, 72, 153, 0.6),
                0 3px 6px rgba(0, 0, 0, 0.5),
                0 10px 20px rgba(236, 72, 153, 0.4),
                0 0 25px rgba(236, 72, 153, 0.3),
                inset 0 -2px 4px rgba(0, 0, 0, 0.2)
              `,
            filter: size === 'sm' ? 'none' : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))',
            padding: size === 'sm' ? '0.05em 0.1em' : '0.1em 0.15em',
          }}
        >
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 25%, transparent 50%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mixBlendMode: 'overlay',
            }}
          >
            D
          </span>
          D
        </span>

        {/* Letter é */}
        <span
          className={`relative inline-block balloon-letter ${
            animate ? 'transition-all duration-300 hover:scale-110' : ''
          }`}
          style={{
            background: size === 'sm'
              ? 'linear-gradient(135deg, #c4b5fd 0%, #a855f7 50%, #9333ea 100%)'
              : 'radial-gradient(circle at 30% 30%, rgba(196, 181, 253, 1) 0%, rgba(168, 85, 247, 1) 40%, rgba(147, 51, 234, 1) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: size === 'sm'
              ? '0 2px 4px rgba(168, 85, 247, 0.5), 0 1px 2px rgba(0, 0, 0, 0.4)'
              : `
                0 6px 12px rgba(168, 85, 247, 0.6),
                0 3px 6px rgba(0, 0, 0, 0.5),
                0 10px 20px rgba(168, 85, 247, 0.4),
                0 0 25px rgba(168, 85, 247, 0.3),
                inset 0 -2px 4px rgba(0, 0, 0, 0.2)
              `,
            filter: size === 'sm' ? 'none' : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))',
            padding: size === 'sm' ? '0.05em 0.1em' : '0.1em 0.15em',
          }}
        >
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 25%, transparent 50%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mixBlendMode: 'overlay',
            }}
          >
            é
          </span>
          é
        </span>

        {/* Letter x */}
        <span
          className={`relative inline-block balloon-letter ${
            animate ? 'transition-all duration-300 hover:scale-110' : ''
          }`}
          style={{
            background: size === 'sm'
              ? 'linear-gradient(135deg, #a5f3fc 0%, #3b82f6 50%, #2563eb 100%)'
              : 'radial-gradient(circle at 30% 30%, rgba(165, 243, 252, 1) 0%, rgba(59, 130, 246, 1) 40%, rgba(37, 99, 235, 1) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: size === 'sm'
              ? '0 2px 4px rgba(59, 130, 246, 0.5), 0 1px 2px rgba(0, 0, 0, 0.4)'
              : `
                0 6px 12px rgba(59, 130, 246, 0.6),
                0 3px 6px rgba(0, 0, 0, 0.5),
                0 10px 20px rgba(59, 130, 246, 0.4),
                0 0 25px rgba(59, 130, 246, 0.3),
                inset 0 -2px 4px rgba(0, 0, 0, 0.2)
              `,
            filter: size === 'sm' ? 'none' : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))',
            padding: size === 'sm' ? '0.05em 0.1em' : '0.1em 0.15em',
          }}
        >
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 25%, transparent 50%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mixBlendMode: 'overlay',
            }}
          >
            x
          </span>
          x
        </span>
      </div>
    </div>
  );
}
