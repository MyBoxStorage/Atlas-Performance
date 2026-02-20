'use client';

import React, { useState, useMemo } from 'react';
import { getSpeciesRowColor, getSpeciesMetadata } from '@/utils/speciesMetadata';

interface PokedexSpeciesMenuProps {
  species: string[];
  selectedSpecies: string | null;
  onSpeciesSelect: (species: string, evolution?: number) => void;
  onClose: () => void;
}

export default function PokedexSpeciesMenu({
  species,
  selectedSpecies,
  onSpeciesSelect,
  onClose,
}: PokedexSpeciesMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSpecies = useMemo(() => {
    if (!searchQuery.trim()) return species;
    const query = searchQuery.toLowerCase();
    return species.filter(s => s.toLowerCase().includes(query));
  }, [species, searchQuery]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-gray-300">
        <h2 
          className="text-lg font-bold text-gray-800"
          style={{ fontFamily: 'var(--font-press-start-2p), monospace' }}
        >
          SPECIES
        </h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 text-xl font-bold"
        >
          ✕
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search species..."
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
        />
      </div>

      {/* Species List */}
      <div className="flex-1 overflow-y-auto space-y-1">
        {filteredSpecies.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p className="text-sm">No species found</p>
          </div>
        ) : (
          filteredSpecies.map((speciesName, index) => {
            const metadata = getSpeciesMetadata(speciesName);
            const totalCount = metadata?.totalCount || 0;
            const rowColor = getSpeciesRowColor(index);
            
            return (
              <button
                key={speciesName}
                onClick={() => {
                  onSpeciesSelect(speciesName, 1);
                }}
                className={`
                  w-full text-left px-3 py-2 rounded-lg transition-all duration-200 text-sm
                  ${
                    selectedSpecies === speciesName
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold shadow-md'
                      : `${rowColor} hover:bg-opacity-70 text-slate-700`
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{speciesName}</span>
                  {totalCount > 0 && (
                    <span className={`text-xs ${selectedSpecies === speciesName ? 'opacity-70' : 'opacity-60'}`}>
                      {totalCount}
                    </span>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

