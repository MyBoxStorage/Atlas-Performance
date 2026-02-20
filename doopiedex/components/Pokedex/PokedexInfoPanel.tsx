'use client';

import React, { memo } from 'react';
import type { Doopie } from '@/types/doopie';
import RarityBadge from '@/components/RarityBadge';
import { calculateRarity } from '@/utils/rarityCalculator';
import type { RarityData } from '@/utils/rarityCalculator';

interface PokedexInfoPanelProps {
  doopie: Doopie | null;
  rarityData: RarityData;
}

function PokedexInfoPanel({ doopie, rarityData }: PokedexInfoPanelProps) {
  if (!doopie) {
    return (
      <div className="flex items-center justify-center h-full bg-white rounded">
        <p className="text-gray-500 text-sm">Select a Doopie</p>
      </div>
    );
  }

  const rarityResult = calculateRarity(
    doopie.traits.species,
    doopie.traits.background,
    doopie.traits.body,
    doopie.traits.accessories,
    doopie.traits.evolution,
    rarityData
  );

  const infoFields = [
    { label: 'Species:', value: doopie.traits.species },
    { label: 'Evolution:', value: `Evolution ${doopie.traits.evolution}` },
    { label: 'Background:', value: doopie.traits.background },
    { label: 'Body:', value: doopie.traits.body },
    { label: 'Accessories:', value: doopie.traits.accessories },
    { 
      label: 'Rarity:', 
      value: rarityResult ? (
        <RarityBadge category={rarityResult.category} size="sm" />
      ) : 'Unknown'
    },
  ];

  return (
    <div className="h-full bg-white rounded p-6 space-y-4">
      {infoFields.map((field, index) => (
        <div key={index} className="border-b border-gray-200 pb-2 last:border-0">
          <div className="text-xs font-bold text-gray-700 mb-1" style={{ fontFamily: 'var(--font-press-start-2p), monospace' }}>
            {field.label}
          </div>
          <div className="text-sm text-gray-800 ml-2">
            {typeof field.value === 'string' ? field.value : field.value}
          </div>
        </div>
      ))}
      
      {rarityResult && (
        <div className="mt-4 pt-4 border-t-2 border-gray-300">
          <div className="text-xs font-bold text-gray-700 mb-2" style={{ fontFamily: 'var(--font-press-start-2p), monospace' }}>
            Rank Info:
          </div>
          <div className="text-xs text-gray-600 space-y-1">
            <div>Rank: #{rarityResult.rank}</div>
            <div>Percentile: {rarityResult.percentile.toFixed(2)}%</div>
            <div>Count: {rarityResult.count} Doopies</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(PokedexInfoPanel);

