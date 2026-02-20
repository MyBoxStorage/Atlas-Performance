'use client';

import React from 'react';
import { BACKGROUND_TRAITS, BODY_TRAITS } from '@/utils/traitsData';

interface FilterPanelProps {
  backgrounds?: string[]; // Opcional, usa constante se não fornecido
  bodies?: string[]; // Opcional, usa constante se não fornecido
  onBackgroundChange: (background: string | null) => void;
  onBodyChange: (body: string | null) => void;
  onEvolutionChange: (evolution: number | null) => void;
  selectedBackground: string | null;
  selectedBody: string | null;
  selectedEvolution: number | null;
}

export default function FilterPanel({
  backgrounds,
  bodies,
  onBackgroundChange,
  onBodyChange,
  onEvolutionChange,
  selectedBackground,
  selectedBody,
  selectedEvolution,
}: FilterPanelProps) {
  // Usar constantes se arrays não forem fornecidos
  const backgroundList = backgrounds || Array.from(BACKGROUND_TRAITS);
  const bodyList = bodies || Array.from(BODY_TRAITS);
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-md border-2 border-rose-300/60">
      <h3 className="font-bold text-lg mb-4 text-slate-700">Filters</h3>
      
      <div className="space-y-4">
        {/* Background Filter */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2">
            Background
          </label>
          <select
            value={selectedBackground || ''}
            onChange={(e) => onBackgroundChange(e.target.value || null)}
            className="w-full px-3 py-2 rounded-lg border-2 border-rose-300/60 bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 transition-all duration-200 ease-in-out text-slate-700"
          >
            <option value="">All</option>
            {backgroundList.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        {/* Body Filter */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2">
            Body
          </label>
          <select
            value={selectedBody || ''}
            onChange={(e) => onBodyChange(e.target.value || null)}
            className="w-full px-3 py-2 rounded-lg border-2 border-rose-300/60 bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 transition-all duration-200 ease-in-out text-slate-700"
          >
            <option value="">All</option>
            {bodyList.map((body) => (
              <option key={body} value={body}>
                {body}
              </option>
            ))}
          </select>
        </div>

        {/* Evolution Filter */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2">
            Evolution
          </label>
          <select
            value={selectedEvolution || ''}
            onChange={(e) => onEvolutionChange(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full px-3 py-2 rounded-lg border-2 border-rose-300/60 bg-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 transition-all duration-200 ease-in-out text-slate-700"
          >
            <option value="">All</option>
            <option value="1">Evolution 1</option>
            <option value="2">Evolution 2</option>
            <option value="3">Evolution 3</option>
            <option value="4">Evolution 4</option>
          </select>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => {
            onBackgroundChange(null);
            onBodyChange(null);
            onEvolutionChange(null);
          }}
          className="w-full px-4 py-2 bg-slate-400 text-white rounded-lg hover:bg-slate-500 transition-all duration-200 ease-in-out font-semibold hover:scale-[1.02] active:scale-[0.98]"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

