'use client';

import React, { useState, useEffect, memo } from 'react';
import Image from 'next/image';
import type { Doopie } from '@/types/doopie';
import type { FeaturedImageMapping } from '@/utils/featuredImages';
import { getFeaturedImageUrlFromMapping } from '@/utils/featuredImages';

interface PokedexScreenProps {
  doopie: Doopie | null;
  featuredImagesMapping: FeaturedImageMapping;
  hasFilters?: boolean; // Nova prop para indicar se há filtros ativos
}

function PokedexScreen({ doopie, featuredImagesMapping, hasFilters = false }: PokedexScreenProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (doopie) {
      setImageLoading(true);
      setImageError(false);
    }
  }, [doopie?.id]);

  if (!doopie) {
    return (
      <div className="flex items-center justify-center h-full bg-white rounded">
        <p className="text-gray-500 text-sm">No Doopie selected</p>
      </div>
    );
  }

  const featuredImageUrl = getFeaturedImageUrlFromMapping(
    featuredImagesMapping,
    doopie.traits.species,
    doopie.traits.background,
    doopie.traits.body,
    doopie.traits.accessories,
    doopie.traits.evolution
  );

  const imageUrlToUse = featuredImageUrl || doopie.imageUrl;

  return (
    <div className="flex flex-col h-full">
      {/* Imagem do Doopie */}
      <div className="relative w-full h-[320px] bg-white rounded overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 animate-pulse">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs text-slate-600">Loading...</p>
            </div>
          </div>
        )}
        
        {imageUrlToUse && imageUrlToUse.startsWith('http') && !imageError ? (
          <Image
            src={imageUrlToUse}
            alt={`${doopie.traits.species} - Evolution ${doopie.traits.evolution}`}
            fill
            className={`object-contain transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            sizes="320px"
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
            <span className="text-slate-500 text-xs">Image not available</span>
          </div>
        )}
      </div>

      {/* Campos Name e Owner/NFT ID */}
      <div className="mt-4 space-y-2">
        <div className="bg-gray-50 rounded px-3 py-2">
          <div className="text-xs text-gray-600 font-semibold">Name:</div>
          <div className="text-sm text-gray-800 font-mono">
            {doopie.traits.species} - Evolution {doopie.traits.evolution}
          </div>
        </div>
        
        {/* Se há filtros ativos, mostrar ID do NFT, senão mostrar Owner */}
        {hasFilters ? (
          <div className="bg-gray-50 rounded px-3 py-2">
            <div className="text-xs text-gray-600 font-semibold">NFT:</div>
            <div className="text-sm text-gray-800 font-mono">
              Doopies#{doopie.id.toString().padStart(5, '0')}
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded px-3 py-2">
            <div className="text-xs text-gray-600 font-semibold">Owner:</div>
            <div className="text-xs text-gray-700 font-mono truncate">
              {(() => {
                const ownerAddress = (doopie as any).ownership?.owner || doopie.mintAddress || 'Unknown';
                return typeof ownerAddress === 'string' && ownerAddress.length > 20 
                  ? `${ownerAddress.slice(0, 8)}...${ownerAddress.slice(-8)}`
                  : ownerAddress;
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(PokedexScreen);

