'use client';

import React, { useState } from 'react';
import { BACKGROUND_TRAITS, BODY_TRAITS, EVOLUTION_STAGES, ACCESSORIES_TRAITS } from '@/utils/traitsData';
import { SPECIES_LIST } from '@/utils/speciesMetadata';
import { calculateRarity, getTotalCombinations, type RarityData, type RarityResult } from '@/utils/rarityCalculator';
import RarityBadge from './RarityBadge';

interface RarityCalculatorProps {
  rarityData: RarityData;
}

export default function RarityCalculator({ rarityData }: RarityCalculatorProps) {
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
      setError('Please select all traits (Species, Background, Body, Accessories, and Evolution)');
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
        setError('This combination does not exist in the collection.');
        setResult(null);
        return;
      }

      setResult(rarityResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while calculating rarity');
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

  const totalCombinations = getTotalCombinations(rarityData);

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-md border-2 border-rose-300/60">
      <h2 className="text-2xl font-bold text-slate-700 mb-6 text-center">
        Calculate Trait Rarity
      </h2>

      {/* Selectors */}
      <div className="space-y-4 mb-6">
        {/* Species Selector */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Species
          </label>
          <select
            value={selectedSpecies}
            onChange={(e) => setSelectedSpecies(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border-2 border-rose-300/60 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 text-slate-700"
          >
            <option value="">Select Species</option>
            {SPECIES_LIST.map((species) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
          </select>
        </div>

        {/* Background Selector */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Background
          </label>
          <select
            value={selectedBackground}
            onChange={(e) => setSelectedBackground(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border-2 border-rose-300/60 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 text-slate-700"
          >
            <option value="">Select Background</option>
            {BACKGROUND_TRAITS.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        {/* Body Selector */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Body
          </label>
          <select
            value={selectedBody}
            onChange={(e) => setSelectedBody(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border-2 border-rose-300/60 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 text-slate-700"
          >
            <option value="">Select Body</option>
            {BODY_TRAITS.map((body) => (
              <option key={body} value={body}>
                {body}
              </option>
            ))}
          </select>
        </div>

        {/* Accessories Selector */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Accessories
          </label>
          <select
            value={selectedAccessories}
            onChange={(e) => setSelectedAccessories(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border-2 border-rose-300/60 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 text-slate-700"
          >
            <option value="">Select Accessories</option>
            {ACCESSORIES_TRAITS.map((acc) => (
              <option key={acc} value={acc}>
                {acc}
              </option>
            ))}
          </select>
        </div>

        {/* Evolution Selector */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Evolution
          </label>
          <select
            value={selectedEvolution}
            onChange={(e) => setSelectedEvolution(e.target.value ? parseInt(e.target.value) : '')}
            className="w-full px-3 py-2 rounded-lg border-2 border-rose-300/60 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 text-slate-700"
          >
            <option value="">Select Evolution</option>
            {EVOLUTION_STAGES.map((evo) => (
              <option key={evo} value={evo}>
                Evolution {evo}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleCalculate}
          disabled={!selectedSpecies || !selectedBackground || !selectedBody || !selectedAccessories || selectedEvolution === ''}
          className={`
            flex-1 px-6 py-3 rounded-lg font-bold text-white shadow-lg transition-all duration-200
            ${
              selectedSpecies && selectedBackground && selectedBody && selectedAccessories && selectedEvolution !== ''
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 cursor-pointer active:scale-[0.98]'
                : 'bg-gray-300/50 text-gray-500 cursor-not-allowed opacity-70'
            }
          `}
        >
          Calculate Rarity
        </button>
        
        <button
          onClick={handleClear}
          className="px-6 py-3 bg-slate-400 text-white rounded-lg hover:bg-slate-500 transition-colors font-semibold"
        >
          Clear
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-blue-50/50 rounded-xl p-6 border-2 border-purple-300/60 shadow-lg">
          <div className="space-y-6">
            {/* Header with Badge, Rank and Average Rarity */}
            <div className="text-center space-y-3">
              <RarityBadge category={result.category} size="lg" />
              <div>
                <p className="text-2xl font-bold text-slate-700">
                  Rank: #{result.rank}
                </p>
                <p className="text-lg text-slate-600 mt-1">
                  Percentile: {result.percentile.toFixed(2)}%
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Average Rarity: {result.averageRarity.toFixed(2)}%
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  out of {totalCombinations} unique combinations
                </p>
              </div>
            </div>

            {/* Individual Trait Rarities */}
            <div className="pt-4 border-t border-purple-200/60">
              <h3 className="text-lg font-bold text-slate-700 mb-4 text-center">Individual Trait Rarities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Species */}
                <div className="bg-white/60 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-slate-700">Species:</span>
                    <span className="text-sm text-slate-600">{result.traitRarities.species.trait}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Rarity: {result.traitRarities.species.rarityPercent.toFixed(2)}%</span>
                    <span className="text-slate-600">({result.traitRarities.species.frequency} NFTs)</span>
                  </div>
                </div>

                {/* Background */}
                <div className="bg-white/60 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-slate-700">Background:</span>
                    <span className="text-sm text-slate-600">{result.traitRarities.background.trait}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Rarity: {result.traitRarities.background.rarityPercent.toFixed(2)}%</span>
                    <span className="text-slate-600">({result.traitRarities.background.frequency} NFTs)</span>
                  </div>
                </div>

                {/* Body */}
                <div className="bg-white/60 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-slate-700">Body:</span>
                    <span className="text-sm text-slate-600">{result.traitRarities.body.trait}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Rarity: {result.traitRarities.body.rarityPercent.toFixed(2)}%</span>
                    <span className="text-slate-600">({result.traitRarities.body.frequency} NFTs)</span>
                  </div>
                </div>

                {/* Accessories */}
                <div className="bg-white/60 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-slate-700">Accessories:</span>
                    <span className="text-sm text-slate-600">{result.traitRarities.accessories.trait}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Rarity: {result.traitRarities.accessories.rarityPercent.toFixed(2)}%</span>
                    <span className="text-slate-600">({result.traitRarities.accessories.frequency} NFTs)</span>
                  </div>
                </div>

                {/* Evolution */}
                <div className="bg-white/60 rounded-lg p-3 md:col-span-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-slate-700">Evolution:</span>
                    <span className="text-sm text-slate-600">{result.traitRarities.evolution.trait}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Rarity: {result.traitRarities.evolution.rarityPercent.toFixed(2)}%</span>
                    <span className="text-slate-600">({result.traitRarities.evolution.frequency} NFTs)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Combination Details */}
            <div className="pt-4 border-t border-purple-200/60 text-center">
              <p className="text-sm text-slate-600">
                <strong>Exact Combination:</strong> {result.combination.replace(/\+/g, ' + ')}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {result.count} {result.count === 1 ? 'Doopie' : 'Doopies'} with this exact combination ({result.percentage.toFixed(2)}% of collection)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

