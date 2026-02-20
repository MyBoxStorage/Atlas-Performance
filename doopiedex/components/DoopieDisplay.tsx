'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Doopie } from '@/types/doopie';
import type { FeaturedImageMapping } from '@/utils/featuredImages';
import { getSpeciesMetadata } from '@/utils/speciesMetadata';
import { getFeaturedImageUrlFromMapping } from '@/utils/featuredImages';

interface DoopieDisplayProps {
  doopie: Doopie | null;
  isFirst?: boolean; // Para aplicar priority apenas na primeira imagem
  featuredImagesMapping: FeaturedImageMapping;
}

export default function DoopieDisplay({ doopie, isFirst = false, featuredImagesMapping }: DoopieDisplayProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Reset loading state when doopie changes
  useEffect(() => {
    if (doopie) {
      setImageLoading(true);
      setImageError(false);
    }
  }, [doopie?.id]);

  if (!doopie) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px] bg-white/50 rounded-xl">
        <p className="text-gray-500">No Doopie selected</p>
      </div>
    );
  }

  // Verificar se existe imagem específica para esta combinação
  const featuredImageUrl = getFeaturedImageUrlFromMapping(
    featuredImagesMapping,
    doopie.traits.species,
    doopie.traits.background,
    doopie.traits.body,
    doopie.traits.accessories,
    doopie.traits.evolution
  );

  // Usar imagem específica se disponível, senão usar a padrão
  const imageUrlToUse = featuredImageUrl || doopie.imageUrl;

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Doopie Image */}
      <div
        className="relative w-full max-w-md aspect-square bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg shadow-rose-200/50 border border-rose-300/40 cursor-help"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {imageUrlToUse && imageUrlToUse.startsWith('http') && !imageError ? (
          <>
            {/* Loading skeleton */}
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-lg animate-pulse">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-sm text-slate-600 mt-2">Loading image...</p>
                </div>
              </div>
            )}
            <Image
              src={imageUrlToUse}
              alt={`Doopie #${doopie.id}`}
              fill
              className={`object-contain transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
              priority={isFirst}
              sizes="(max-width: 768px) 100vw, 500px"
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false);
                setImageError(true);
              }}
              loading={isFirst ? undefined : 'lazy'}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg">
            <span className="text-slate-500 text-sm">Image not available</span>
          </div>
        )}
        
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-slate-900/95 text-white text-xs p-3 rounded-lg shadow-xl z-10 min-w-[200px] border border-purple-400/40">
            <div className="space-y-1">
              <div><strong>Background:</strong> {doopie.traits.background}</div>
              <div><strong>Body:</strong> {doopie.traits.body}</div>
              <div><strong>Accessories:</strong> {doopie.traits.accessories}</div>
              {doopie.rarity && (
                <div><strong>Rarity:</strong> {doopie.rarity.toFixed(2)}</div>
              )}
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
              <div className="border-4 border-transparent border-t-slate-900/95"></div>
            </div>
          </div>
        )}
      </div>

      {/* Label */}
      <div className="bg-rose-50/95 px-6 py-3 rounded-xl shadow-md border-2 border-rose-400/60">
        <h2 className="text-xl font-bold text-slate-700 text-center">
          {doopie.traits.species} - Evolution {doopie.traits.evolution}
        </h2>
        {(() => {
          const metadata = getSpeciesMetadata(doopie.traits.species);
            return metadata && (
            <p className="text-sm text-slate-600 text-center mt-1">
              Total: {metadata.totalCount} | Max Evolution: {metadata.maxEvolution}
            </p>
          );
        })()}
      </div>
    </div>
  );
}

