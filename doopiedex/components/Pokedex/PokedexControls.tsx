'use client';

import React from 'react';

interface PokedexControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onMenuClick: () => void;
  onCalculatorClick: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export default function PokedexControls({
  onPrevious,
  onNext,
  onMenuClick,
  onCalculatorClick,
  canGoPrevious,
  canGoNext,
}: PokedexControlsProps) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Botões de navegação - Previous e Next lado a lado */}
      <div className="flex items-center justify-center gap-4">
        {/* Botão azul circular - Previous */}
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={`
            w-12 h-12 rounded-full transition-all duration-200 flex items-center justify-center
            ${canGoPrevious
              ? 'bg-blue-500 hover:bg-blue-600 active:scale-95 shadow-lg shadow-blue-500/50'
              : 'bg-gray-400 cursor-not-allowed opacity-50'
            }
          `}
          aria-label="Previous"
        >
          <span className="text-white text-xl font-bold">‹</span>
        </button>

        {/* Botão azul circular - Next */}
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`
            w-12 h-12 rounded-full transition-all duration-200 flex items-center justify-center
            ${canGoNext
              ? 'bg-blue-500 hover:bg-blue-600 active:scale-95 shadow-lg shadow-blue-500/50'
              : 'bg-gray-400 cursor-not-allowed opacity-50'
            }
          `}
          aria-label="Next"
        >
          <span className="text-white text-xl font-bold">›</span>
        </button>
      </div>

      {/* Botões adicionais - Menu e Rarity */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={onMenuClick}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 active:scale-95 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-md"
        >
          Menu
        </button>
        <button
          onClick={onCalculatorClick}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 active:scale-95 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-md"
        >
          Rarity
        </button>
      </div>
    </div>
  );
}

