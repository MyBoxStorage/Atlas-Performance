'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PokedexClosed from './PokedexClosed';
import PokedexOpen from './PokedexOpen';
import type { OrganizedDoopies } from '@/types/doopie';
import type { RarityData } from '@/utils/rarityCalculator';
import type { FeaturedImageMapping } from '@/utils/featuredImages';
import { usePokedexSounds } from '@/utils/usePokedexSounds';

interface PokedexDeviceProps {
  data: OrganizedDoopies;
  rarityData: RarityData;
  featuredImagesMapping: FeaturedImageMapping;
}

export default function PokedexDevice({ 
  data, 
  rarityData, 
  featuredImagesMapping 
}: PokedexDeviceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentView, setCurrentView] = useState<'doopie' | 'species-menu' | 'rarity-calc'>('doopie');
  
  const { playOpenSound, playCloseSound, playSelectSound, playNavigateSound } = usePokedexSounds();

  const handleOpen = () => {
    setIsAnimating(true);
    playOpenSound();
    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
    }, 300);
  };

  const handleClose = () => {
    setIsAnimating(true);
    playCloseSound();
    setTimeout(() => {
      setIsOpen(false);
      setCurrentView('doopie');
      setIsAnimating(false);
    }, 300);
  };

  const handleViewChange = (view: 'doopie' | 'species-menu' | 'rarity-calc') => {
    if (view !== currentView) {
      playSelectSound();
      setCurrentView(view);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isOpen ? (
        <motion.div
          key="closed"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <PokedexClosed onClick={handleOpen} />
        </motion.div>
      ) : (
        <motion.div
          key="open"
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
          transition={{ duration: 0.3 }}
        >
          <PokedexOpen
            data={data}
            rarityData={rarityData}
            featuredImagesMapping={featuredImagesMapping}
            currentView={currentView}
            onClose={handleClose}
            onViewChange={handleViewChange}
            onNavigate={playNavigateSound}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

