'use client';

import React from 'react';
import { PokedexClosedSVG } from './assets/PokedexSVGs';

interface PokedexClosedProps {
  onClick: () => void;
}

export default function PokedexClosed({ onClick }: PokedexClosedProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 via-blue-50 to-green-50 p-8">
      <div className="transition-transform duration-300 hover:scale-105">
        <PokedexClosedSVG 
          onClick={onClick}
          className="drop-shadow-2xl"
        />
        <div className="mt-4 text-center">
          <p className="text-slate-700 text-lg font-bold drop-shadow-lg animate-pulse">
            Click to open
          </p>
        </div>
      </div>
    </div>
  );
}

