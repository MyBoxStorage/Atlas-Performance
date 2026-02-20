'use client';

import React from 'react';

interface PokedexFrameProps {
  children: React.ReactNode;
  className?: string;
}

export default function PokedexFrame({ children, className = '' }: PokedexFrameProps) {
  return (
    <div className={`bg-gradient-to-b from-rose-400 via-pink-400 to-rose-500 rounded-3xl p-6 shadow-2xl shadow-rose-900/20 border-4 border-rose-600/80 ${className}`}>
      {/* Screen area */}
      <div className="bg-gradient-to-br from-blue-50/90 via-purple-50/90 to-pink-50/90 rounded-2xl p-4 border-4 border-rose-400/60 shadow-inner">
        {children}
      </div>
      
      {/* Decorative elements */}
      <div className="flex justify-between items-center mt-4">
        <div className="w-3 h-3 bg-rose-600/60 rounded-full shadow-[0_0_8px_rgba(225,29,72,0.3)]"></div>
        <div className="w-3 h-3 bg-rose-600/60 rounded-full shadow-[0_0_8px_rgba(225,29,72,0.3)]"></div>
      </div>
    </div>
  );
}

