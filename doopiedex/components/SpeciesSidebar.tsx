'use client';

import React, { useState } from 'react';
import { getSpeciesRowColor, getSpeciesMetadata } from '@/utils/speciesMetadata';

interface SpeciesSidebarProps {
  species: string[];
  selectedSpecies: string | null;
  onSpeciesSelect: (species: string) => void;
}

export default function SpeciesSidebar({
  species,
  selectedSpecies,
  onSpeciesSelect,
}: SpeciesSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-rose-600/95 text-white px-4 py-2 rounded-lg shadow-lg border border-rose-700 transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
      >
        {isOpen ? '✕' : '☰'} Species
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed md:static inset-y-0 left-0 z-40
          w-64 bg-rose-100/90 backdrop-blur-sm md:bg-rose-100/90
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          transition-transform duration-300 ease-in-out
          pt-16 md:pt-4
          overflow-y-auto
          border-r-4 border-rose-300/60
        `}
      >
        <div className="p-4">
          <h2 className="text-slate-700 font-bold text-lg mb-4 px-2">Species</h2>
          
          <div className="space-y-1">
            {species.map((speciesName, index) => {
              const metadata = getSpeciesMetadata(speciesName);
              const totalCount = metadata?.totalCount || 0;
              const rowColor = getSpeciesRowColor(index);
              
              return (
                <button
                  key={speciesName}
                  onClick={() => {
                    onSpeciesSelect(speciesName);
                    setIsOpen(false); // Close mobile menu on selection
                  }}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ease-in-out
                    ${
                      selectedSpecies === speciesName
                        ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold shadow-md shadow-purple-500/30'
                        : `${rowColor} hover:bg-opacity-70 text-slate-700 hover:scale-[1.02] active:scale-[0.98]`
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{speciesName}</span>
                    {totalCount > 0 && (
                      <span className={`text-xs ${selectedSpecies === speciesName ? 'opacity-70' : 'opacity-60'}`}>
                        |{totalCount}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

