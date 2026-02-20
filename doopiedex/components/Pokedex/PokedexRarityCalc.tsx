'use client';

import React, { useState } from 'react';
import { BACKGROUND_TRAITS, BODY_TRAITS, EVOLUTION_STAGES, ACCESSORIES_TRAITS } from '@/utils/traitsData';
import { SPECIES_LIST } from '@/utils/speciesMetadata';
import { calculateRarity, getTotalCombinations, type RarityData, type RarityResult } from '@/utils/rarityCalculator';
import RarityBadge from '@/components/RarityBadge';

interface PokedexRarityCalcProps {
  rarityData: RarityData;
  onClose: () => void;
}

export default function PokedexRarityCalc({ rarityData, onClose }: PokedexRarityCalcProps) {
  const [selectedSpecies, setSelectedSpecies] = useState<string>('');
  const [selectedBackground, setSelectedBackground] = useState<string>('');
  const [selectedBody, setSelectedBody] = useState<string>('');
  const [selectedAccessories, setSelectedAccessories] = useState<string>('');
  const [selectedEvolution, setSelectedEvolution] = useState<number | ''>('');
  const [result, setResult] = useState<RarityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    
    if (!selectedSpecies || !selectedBackground || !selectedBody || !selectedAccessories || selectedEvolution === '') {
      setError('Please select all traits');
      return;
    }

    try {
      const rarityResult = calculateRarity(
        selectedSpecies,
        selectedBackground,
        selectedBody,
        selectedAccessories,
        selectedEvolution as number,
        rarityData
      );

      if (!rarityResult) {
        setError('Combination not found');
        setResult(null);
        return;
      }

      setResult(rarityResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error calculating');
      setResult(null);
    }
  };

  const handleClear = () => {
    setSelectedSpecies('');
    setSelectedBackground('');
    setSelectedBody('');
    setSelectedAccessories('');
    setSelectedEvolution('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-gray-300">
        <h2 
          className="text-sm font-bold text-gray-800"
          style={{ fontFamily: 'var(--font-press-start-2p), monospace' }}
        >
          RARITY CALC
        </h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 text-xl font-bold"
        >
          ✕
        </button>
      </div>

      {/* Compact Selectors */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Species</label>
          <select
            value={selectedSpecies}
            onChange={(e) => setSelectedSpecies(e.target.value)}
            className="w-full px-2 py-1.5 text-xs rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select...</option>
            {SPECIES_LIST.map((species) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Background</label>
          <select
            value={selectedBackground}
            onChange={(e) => setSelectedBackground(e.target.value)}
            className="w-full px-2 py-1.5 text-xs rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select...</option>
            {BACKGROUND_TRAITS.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Body</label>
          <select
            value={selectedBody}
            onChange={(e) => setSelectedBody(e.target.value)}
            className="w-full px-2 py-1.5 text-xs rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select...</option>
            {BODY_TRAITS.map((body) => (
              <option key={body} value={body}>
                {body}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Accessories</label>
          <select
            value={selectedAccessories}
            onChange={(e) => setSelectedAccessories(e.target.value)}
            className="w-full px-2 py-1.5 text-xs rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select...</option>
            {ACCESSORIES_TRAITS.map((acc) => (
              <option key={acc} value={acc}>
                {acc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Evolution</label>
          <select
            value={selectedEvolution}
            onChange={(e) => setSelectedEvolution(e.target.value ? parseInt(e.target.value) : '')}
            className="w-full px-2 py-1.5 text-xs rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select...</option>
            {EVOLUTION_STAGES.map((evo) => (
              <option key={evo} value={evo}>
                {evo}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2">
        <button
          onClick={handleCalculate}
          disabled={!selectedSpecies || !selectedBackground || !selectedBody || !selectedAccessories || selectedEvolution === ''}
          className={`
            w-full px-3 py-2 text-xs rounded-lg font-bold transition-all
            ${
              selectedSpecies && selectedBackground && selectedBody && selectedAccessories && selectedEvolution !== ''
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          Calculate
        </button>
        <button
          onClick={handleClear}
          className="w-full px-3 py-2 text-xs bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-3 p-2 bg-red-100 border border-red-400 rounded text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-4 p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded border-2 border-purple-300 space-y-2">
          <div className="text-center">
            <RarityBadge category={result.category} size="sm" />
          </div>
          <div className="text-xs space-y-1">
            <div><strong>Rank:</strong> #{result.rank}</div>
            <div><strong>Percentile:</strong> {result.percentile.toFixed(2)}%</div>
            <div><strong>Count:</strong> {result.count}</div>
          </div>
        </div>
      )}
    </div>
  );
}

