/**
 * Componente para exibir badge de raridade com cores por categoria
 */

import React from 'react';
import type { RarityCategory } from '@/utils/rarityCalculator';

interface RarityBadgeProps {
  category: RarityCategory;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CATEGORY_COLORS: Record<RarityCategory, string> = {
  Mythic: 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-yellow-900',
  Legendary: 'bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 text-white',
  Epic: 'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 text-white',
  Rare: 'bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 text-white',
  Uncommon: 'bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 text-white',
  Common: 'bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 text-gray-900',
};

const SIZE_CLASSES = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-lg',
};

export default function RarityBadge({ category, className = '', size = 'md' }: RarityBadgeProps) {
  const colorClasses = CATEGORY_COLORS[category];
  const sizeClasses = SIZE_CLASSES[size];
  
  return (
    <span
      className={`inline-block font-bold rounded-lg shadow-lg ${colorClasses} ${sizeClasses} ${className}`}
    >
      {category}
    </span>
  );
}

