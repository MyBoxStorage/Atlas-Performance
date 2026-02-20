'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { PokedexOpenSVG, PokeballIcon } from './assets/PokedexSVGs';
import PokedexScreen from './PokedexScreen';
import PokedexInfoPanel from './PokedexInfoPanel';
import PokedexControls from './PokedexControls';
import PokedexFilters from './PokedexFilters';
import type { OrganizedDoopies } from '@/types/doopie';
import type { RarityData } from '@/utils/rarityCalculator';
import type { FeaturedImageMapping } from '@/utils/featuredImages';
import {
  getCurrentDoopie,
  getPreviousEvolution,
  getNextEvolution,
  getAllSpecies,
  filterDoopies,
} from '@/utils/dataHelpers';

// Lazy load componentes pesados
const PokedexSpeciesMenu = dynamic(() => import('./PokedexSpeciesMenu'), {
  loading: () => <div className="p-4 text-center">Loading menu...</div>,
  ssr: false,
});

const PokedexRarityCalc = dynamic(() => import('./PokedexRarityCalc'), {
  loading: () => <div className="p-4 text-center">Loading calculator...</div>,
  ssr: false,
});

interface PokedexOpenProps {
  data: OrganizedDoopies;
  rarityData: RarityData;
  featuredImagesMapping: FeaturedImageMapping;
  currentView: 'doopie' | 'species-menu' | 'rarity-calc';
  onClose: () => void;
  onViewChange: (view: 'doopie' | 'species-menu' | 'rarity-calc') => void;
  onNavigate: () => void;
}

export default function PokedexOpen({
  data,
  rarityData,
  featuredImagesMapping,
  currentView,
  onClose,
  onViewChange,
  onNavigate,
}: PokedexOpenProps) {
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(
    getAllSpecies(data)[0] || null
  );
  const [selectedEvolution, setSelectedEvolution] = useState<number>(1);
  
  // Filtros de traits
  const [filterSpecies, setFilterSpecies] = useState<string | null>(null);
  const [filterBackground, setFilterBackground] = useState<string | null>(null);
  const [filterBody, setFilterBody] = useState<string | null>(null);
  const [filterAccessories, setFilterAccessories] = useState<string | null>(null);
  const [filterEvolution, setFilterEvolution] = useState<number | null>(null);

  // Estado para índice do Doopie filtrado atual
  const [filteredIndex, setFilteredIndex] = useState<number>(0);

  // Aplicar filtros e obter lista filtrada
  const filteredDoopies = useMemo(() => {
    if (filterSpecies || filterBackground || filterBody || filterAccessories || filterEvolution) {
      return filterDoopies(data, {
        species: filterSpecies || undefined,
        background: filterBackground || undefined,
        body: filterBody || undefined,
        accessories: filterAccessories || undefined,
        evolution: filterEvolution || undefined,
      });
    }
    return null;
  }, [data, filterSpecies, filterBackground, filterBody, filterAccessories, filterEvolution]);

  // Resetar índice quando filtros mudam
  React.useEffect(() => {
    setFilteredIndex(0);
  }, [filterSpecies, filterBackground, filterBody, filterAccessories, filterEvolution]);

  // Obter Doopie atual
  const currentDoopie = useMemo(() => {
    // Se há filtros ativos, usar lista filtrada
    if (filteredDoopies && filteredDoopies.length > 0) {
      const index = Math.min(filteredIndex, filteredDoopies.length - 1);
      return filteredDoopies[index];
    }
    
    // Sem filtros, usar seleção normal por espécie
    if (selectedSpecies) {
      return getCurrentDoopie(data, selectedSpecies, selectedEvolution);
    }
    return null;
  }, [data, selectedSpecies, selectedEvolution, filteredDoopies, filteredIndex]);

  // Atualizar selectedSpecies e selectedEvolution quando Doopie muda
  React.useEffect(() => {
    if (currentDoopie) {
      setSelectedSpecies(currentDoopie.traits.species);
      setSelectedEvolution(currentDoopie.traits.evolution);
    }
  }, [currentDoopie]);

  // Verificar se pode navegar
  const canGoPrevious = useMemo(() => {
    if (filteredDoopies) {
      return filteredIndex > 0;
    }
    return selectedSpecies ? getPreviousEvolution(data, selectedSpecies, selectedEvolution) !== null : false;
  }, [filteredDoopies, filteredIndex, selectedSpecies, selectedEvolution, data]);

  const canGoNext = useMemo(() => {
    if (filteredDoopies) {
      return filteredIndex < filteredDoopies.length - 1;
    }
    return selectedSpecies ? getNextEvolution(data, selectedSpecies, selectedEvolution) !== null : false;
  }, [filteredDoopies, filteredIndex, selectedSpecies, selectedEvolution, data]);

  const handlePrevious = () => {
    if (filteredDoopies) {
      if (filteredIndex > 0) {
        setFilteredIndex(filteredIndex - 1);
        onNavigate();
      }
      return;
    }
    
    if (!selectedSpecies) return;
    const prevEvolution = getPreviousEvolution(data, selectedSpecies, selectedEvolution);
    if (prevEvolution !== null) {
      setSelectedEvolution(prevEvolution);
      onNavigate();
    }
  };

  const handleNext = () => {
    if (filteredDoopies) {
      if (filteredIndex < filteredDoopies.length - 1) {
        setFilteredIndex(filteredIndex + 1);
        onNavigate();
      }
      return;
    }
    
    if (!selectedSpecies) return;
    const nextEvolution = getNextEvolution(data, selectedSpecies, selectedEvolution);
    if (nextEvolution !== null) {
      setSelectedEvolution(nextEvolution);
      onNavigate();
    }
  };

  const handleSpeciesSelect = (species: string, evolution: number = 1) => {
    setSelectedSpecies(species);
    setSelectedEvolution(evolution);
    onViewChange('doopie');
  };

  const handleClearFilters = () => {
    setFilterSpecies(null);
    setFilterBackground(null);
    setFilterBody(null);
    setFilterAccessories(null);
    setFilterEvolution(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Botão de fechar */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg font-bold transition-all duration-200 shadow-lg flex items-center gap-2"
          >
            <PokeballIcon size={16} />
            Close
          </button>
        </div>

        {/* Layout principal: Filtros à esquerda, Pokédex à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Painel de Filtros */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <PokedexFilters
              selectedSpecies={filterSpecies}
              selectedBackground={filterBackground}
              selectedBody={filterBody}
              selectedAccessories={filterAccessories}
              selectedEvolution={filterEvolution}
              onSpeciesChange={setFilterSpecies}
              onBackgroundChange={setFilterBackground}
              onBodyChange={setFilterBody}
              onAccessoriesChange={setFilterAccessories}
              onEvolutionChange={setFilterEvolution}
              onClearFilters={handleClearFilters}
            />
          </motion.div>

          {/* Frame do Pokédex */}
          <div className="relative">
            <div className="absolute inset-0 bg-pink-200 rounded-2xl shadow-2xl transform rotate-1 opacity-20"></div>
            <div className="relative bg-gradient-to-br from-pink-200/90 via-purple-200/90 to-blue-200/90 rounded-2xl p-4 md:p-6 shadow-2xl border-2 border-pink-300/60">
              {/* Layout em dois painéis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Painel Esquerdo */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="bg-gradient-to-br from-pink-200/80 to-purple-200/80 rounded-xl p-3 md:p-4 border-2 border-pink-300/40"
              >
                {/* Área da tela */}
                <div className="bg-white rounded-lg p-3 md:p-4 min-h-[350px] md:min-h-[400px]">
                  {currentView === 'doopie' ? (
                    <>
                      <PokedexScreen
                        doopie={currentDoopie}
                        featuredImagesMapping={featuredImagesMapping}
                        hasFilters={!!filteredDoopies && filteredDoopies.length > 0}
                      />
                      {/* Indicador de resultados filtrados */}
                      {filteredDoopies && filteredDoopies.length > 0 && (
                        <div className="text-center text-xs text-slate-600 mt-2 mb-2">
                          Showing {filteredIndex + 1} of {filteredDoopies.length} results
                        </div>
                      )}
                      {filteredDoopies && filteredDoopies.length === 0 && (
                        <div className="text-center text-xs text-red-600 mt-2 mb-2">
                          No Doopies match the selected filters
                        </div>
                      )}
                      <PokedexControls
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                        onMenuClick={() => onViewChange('species-menu')}
                        onCalculatorClick={() => onViewChange('rarity-calc')}
                        canGoPrevious={canGoPrevious}
                        canGoNext={canGoNext}
                      />
                    </>
                  ) : currentView === 'species-menu' ? (
                    <PokedexSpeciesMenu
                      species={getAllSpecies(data)}
                      selectedSpecies={selectedSpecies}
                      onSpeciesSelect={handleSpeciesSelect}
                      onClose={() => onViewChange('doopie')}
                    />
                  ) : (
                    <PokedexRarityCalc
                      rarityData={rarityData}
                      onClose={() => onViewChange('doopie')}
                    />
                  )}
                </div>
              </motion.div>

              {/* Painel Direito */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="bg-gradient-to-br from-purple-200/80 to-blue-200/80 rounded-xl p-3 md:p-4 border-2 border-purple-300/40"
              >
                <div className="bg-white rounded-lg p-3 md:p-4 min-h-[350px] md:min-h-[400px] relative">
                  {/* Ícone Pokéball no topo direito */}
                  <div className="absolute top-2 right-2">
                    <PokeballIcon size={24} />
                  </div>

                  {/* Ícone Pokéball no inferior direito */}
                  <div className="absolute bottom-2 right-2">
                    <PokeballIcon size={24} />
                  </div>

                  {currentView === 'doopie' ? (
                    <PokedexInfoPanel doopie={currentDoopie} rarityData={rarityData} />
                  ) : currentView === 'species-menu' ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <p className="text-sm">Select a species from the menu</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <p className="text-sm">Rarity calculator is on the left panel</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

