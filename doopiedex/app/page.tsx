import { Suspense } from 'react';
import DoopiedexClient from './DoopiedexClient';
import { loadDoopiesData } from '@/utils/loadData';
import { loadRarityData } from '@/utils/loadRarityData';
import { loadFeaturedImagesMapping } from '@/utils/featuredImages.server';
import type { FeaturedImageMapping } from '@/utils/featuredImages';

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl">Loading Doopiedéx...</div>
    </div>
  );
}

export default function Home() {
  const data = loadDoopiesData();
  const rarityData = loadRarityData();
  const featuredImagesMapping: FeaturedImageMapping = loadFeaturedImagesMapping();

  return (
    <Suspense fallback={<LoadingFallback />}>
      <DoopiedexClient data={data} rarityData={rarityData} featuredImagesMapping={featuredImagesMapping} />
    </Suspense>
  );
}
