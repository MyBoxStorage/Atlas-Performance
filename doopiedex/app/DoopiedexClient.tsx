'use client';

import React, { useState } from 'react';
import DoopiedexLogo from '@/components/DoopiedexLogo';
import PokedexDevice from '@/components/Pokedex/PokedexDevice';
import RarityCalculator from '@/components/RarityCalculator';
import type { OrganizedDoopies } from '@/types/doopie';
import type { RarityData } from '@/utils/rarityCalculator';
import type { FeaturedImageMapping } from '@/utils/featuredImages';

interface DoopiedexClientProps {
  data: OrganizedDoopies;
  rarityData: RarityData;
  featuredImagesMapping: FeaturedImageMapping;
}

export default function DoopiedexClient({ data, rarityData, featuredImagesMapping }: DoopiedexClientProps) {
  const [activeTab, setActiveTab] = useState<'doopiedex' | 'rarity'>('doopiedex');


  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="text-center pt-4 pb-2">
        <DoopiedexLogo size="lg" animate={true} />
        <p className="text-slate-500 text-sm mt-2">Explore 8,888 Doopies NFTs on Solana</p>
      </header>

      {/* Tabs */}
      {activeTab === 'doopiedex' ? (
        <PokedexDevice
          data={data}
          rarityData={rarityData}
          featuredImagesMapping={featuredImagesMapping}
        />
      ) : (
        <div className="max-w-2xl mx-auto p-4">
          <div className="mb-4">
            <button
              onClick={() => setActiveTab('doopiedex')}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              ← Back to Doopiedéx
            </button>
          </div>
          <RarityCalculator rarityData={rarityData} />
        </div>
      )}

      {/* Floating Tab Switcher */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border-2 border-gray-300">
          <button
            onClick={() => setActiveTab('doopiedex')}
            className={`
              px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200
              ${
                activeTab === 'doopiedex'
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            Pokédex
          </button>
          <button
            onClick={() => setActiveTab('rarity')}
            className={`
              px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200
              ${
                activeTab === 'rarity'
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            Calculator
          </button>
        </div>
      </div>
    </div>
  );
}

