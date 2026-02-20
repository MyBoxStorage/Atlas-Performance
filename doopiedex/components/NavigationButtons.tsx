'use client';

import React from 'react';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export default function NavigationButtons({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`
          px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-200 ease-in-out
          ${canGoPrevious
            ? 'bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white cursor-pointer active:scale-[0.98] hover:shadow-xl hover:shadow-purple-500/30'
            : 'bg-gray-300/50 text-gray-500 cursor-not-allowed opacity-50'
          }
        `}
      >
        ◄ Previous
      </button>
      
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`
          px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-200 ease-in-out
          ${canGoNext
            ? 'bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white cursor-pointer active:scale-[0.98] hover:shadow-xl hover:shadow-purple-500/30'
            : 'bg-gray-300/50 text-gray-500 cursor-not-allowed opacity-50'
          }
        `}
      >
        Next ►
      </button>
    </div>
  );
}

