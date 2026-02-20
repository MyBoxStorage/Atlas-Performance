'use client';

import React from 'react';
import { BACKGROUND_TRAITS, BODY_TRAITS, ACCESSORIES_TRAITS, EVOLUTION_STAGES } from '@/utils/traitsData';
import { SPECIES_LIST } from '@/utils/speciesMetadata';

interface PokedexFiltersProps {
  selectedSpecies: string | null;
  selectedBackground: string | null;
  selectedBody: string | null;
  selectedAccessories: string | null;
  selectedEvolution: number | null;
  onSpeciesChange: (species: string | null) => void;
  onBackgroundChange: (background: string | null) => void;
  onBodyChange: (body: string | null) => void;
  onAccessoriesChange: (accessories: string | null) => void;
  onEvolutionChange: (evolution: number | null) => void;
  onClearFilters: () => void;
}

export default function PokedexFilters({
  selectedSpecies,
  selectedBackground,
  selectedBody,
  selectedAccessories,
  selectedEvolution,
  onSpeciesChange,
  onBackgroundChange,
  onBodyChange,
  onAccessoriesChange,
  onEvolutionChange,
  onClearFilters,
}: PokedexFiltersProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-md border-2 border-pink-300/60">
      <h3 className="font-bold text-lg mb-4 text-slate-700" style={{ fontFamily: 'var(--font-press-start-2p), monospace' }}>
        FILTERS
      </h3>
      
      <div className="space-y-3">
        {/* Species Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Species
          </label>
          <select
            value={selectedSpecies || ''}
            onChange={(e) => onSpeciesChange(e.target.value || null)}
            className="w-full px-2 py-1.5 text-xs rounded-lg border-2 border-pink-300/60 bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 text-slate-700"
          >
            <option value="">All</option>
            {SPECIES_LIST.map((species) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
          </select>
        </div>

        {/* Background Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Background
          </label>
          <select
            value={selectedBackground || ''}
            onChange={(e) => onBackgroundChange(e.target.value || null)}
            className="w-full px-2 py-1.5 text-xs rounded-lg border-2 border-pink-300/60 bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 text-slate-700"
          >
            <option value="">All</option>
            {BACKGROUND_TRAITS.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        {/* Body Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Body
          </label>
          <select
            value={selectedBody || ''}
            onChange={(e) => onBodyChange(e.target.value || null)}
            className="w-full px-2 py-1.5 text-xs rounded-lg border-2 border-pink-300/60 bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 text-slate-700"
          >
            <option value="">All</option>
            {BODY_TRAITS.map((body) => (
              <option key={body} value={body}>
                {body}
              </option>
            ))}
          </select>
        </div>

        {/* Accessories Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Accessories
          </label>
          <select
            value={selectedAccessories || ''}
            onChange={(e) => onAccessoriesChange(e.target.value || null)}
            className="w-full px-2 py-1.5 text-xs rounded-lg border-2 border-pink-300/60 bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 text-slate-700"
          >
            <option value="">All</option>
            {ACCESSORIES_TRAITS.map((acc) => (
              <option key={acc} value={acc}>
                {acc}
              </option>
            ))}
          </select>
        </div>

        {/* Evolution Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Evolution
          </label>
          <select
            value={selectedEvolution || ''}
            onChange={(e) => onEvolutionChange(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full px-2 py-1.5 text-xs rounded-lg border-2 border-pink-300/60 bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 text-slate-700"
          >
            <option value="">All</option>
            {EVOLUTION_STAGES.map((evo) => (
              <option key={evo} value={evo}>
                Evolution {evo}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <button
          onClick={onClearFilters}
          className="w-full px-3 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 font-semibold text-xs active:scale-[0.98] shadow-md"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

