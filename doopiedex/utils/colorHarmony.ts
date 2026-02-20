/**
 * Color harmony utilities for ordering Doopies by visual appeal
 * Implements RGB/HSL complementarity algorithm for color harmony scoring
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number; // Hue (0-360)
  s: number; // Saturation (0-100)
  l: number; // Lightness (0-100)
}

/**
 * Map of trait color names to RGB values
 * Common Doopies colors: Yellow, Blue, Pink, Purple, Green, etc.
 */
const COLOR_MAP: Record<string, RGB> = {
  // Backgrounds (20 tipos)
  'Deep Space': { r: 75, g: 0, b: 130 }, // Roxo escuro
  'deep space': { r: 75, g: 0, b: 130 }, // Variante
  'Purple Sky': { r: 147, g: 112, b: 219 },
  'Dead': { r: 105, g: 105, b: 105 }, // Cinza
  'Heaven': { r: 135, g: 206, b: 250 }, // Azul céu
  'Holo': { r: 255, g: 20, b: 147 }, // Rosa holográfico
  'Gold': { r: 255, g: 215, b: 0 },
  'Splat': { r: 255, g: 192, b: 203 }, // Rosa claro
  'Hell': { r: 255, g: 69, b: 0 }, // Laranja/vermelho
  'Zebra': { r: 245, g: 245, b: 220 }, // Bege
  'Sunset': { r: 255, g: 140, b: 0 }, // Laranja
  'Iridescent': { r: 221, g: 160, b: 221 }, // Roxo claro
  'Pink': { r: 255, g: 192, b: 203 },
  'Dusk': { r: 138, g: 43, b: 226 }, // Roxo médio
  'Purple': { r: 128, g: 0, b: 128 },
  'Neotide': { r: 64, g: 224, b: 208 }, // Turquesa
  'Blue': { r: 0, g: 191, b: 255 },
  'Lagoon': { r: 0, g: 206, b: 209 },
  'Green': { r: 50, g: 205, b: 50 },
  'Yellow': { r: 255, g: 255, b: 0 },
  
  // Bodies (14 tipos) - alguns são iguais aos backgrounds
  'Splats': { r: 255, g: 192, b: 203 }, // Similar a Splat
  'Cheetah': { r: 255, g: 165, b: 0 }, // Laranja com manchas
  'Camo': { r: 120, g: 134, b: 107 }, // Verde camuflado
  
  // Legacy/fallback
  'Red': { r: 244, g: 67, b: 54 },
  'Orange': { r: 255, g: 152, b: 0 },
  
  // Default fallback
  'Unknown': { r: 128, g: 128, b: 128 },
};

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100,
  };
}

/**
 * Get RGB color from trait name
 */
function getColorFromTrait(traitName: string): RGB {
  // Try exact match first
  if (COLOR_MAP[traitName]) {
    return COLOR_MAP[traitName];
  }

  // Try case-insensitive match
  const normalized = traitName.trim();
  for (const [key, value] of Object.entries(COLOR_MAP)) {
    if (key.toLowerCase() === normalized.toLowerCase()) {
      return value;
    }
  }

  // Fallback to Unknown
  return COLOR_MAP.Unknown;
}

/**
 * Calculate complementarity score between two colors
 * Colors opposite on the color wheel (180° apart) score highest
 * Returns a score between 0 and 1, where 1 is perfect complementarity
 */
export function calculateComplementarity(color1: RGB, color2: RGB): number {
  const hsl1 = rgbToHsl(color1);
  const hsl2 = rgbToHsl(color2);

  // Calculate hue difference (circular distance)
  let hueDiff = Math.abs(hsl1.h - hsl2.h);
  if (hueDiff > 180) {
    hueDiff = 360 - hueDiff;
  }

  // Perfect complementarity is 180° apart
  // Score decreases as we move away from 180°
  const complementarityScore = 1 - (hueDiff / 180);

  // Also consider saturation and lightness similarity for harmony
  const satDiff = Math.abs(hsl1.s - hsl2.s) / 100;
  const lightDiff = Math.abs(hsl1.l - hsl2.l) / 100;
  const similarityBonus = 1 - ((satDiff + lightDiff) / 2);

  // Weighted combination: complementarity (70%) + similarity (30%)
  return complementarityScore * 0.7 + similarityBonus * 0.3;
}

/**
 * Calculate harmony score for a Doopie based on Background + Body combination
 * Priority rules:
 * 1. Yellow Background + Blue Body = highest priority
 * 2. Blue Background + Pink Body = second priority
 * 3. Others = complementarity score
 */
export function calculateHarmonyScore(background: string, body: string): number {
  // Priority 1: Yellow + Blue
  if (
    (background.toLowerCase() === 'yellow' && body.toLowerCase() === 'blue') ||
    (background.toLowerCase() === 'yellow' && body === 'Blue')
  ) {
    return 1000; // Highest priority
  }

  // Priority 2: Blue + Pink
  if (
    (background.toLowerCase() === 'blue' && body.toLowerCase() === 'pink') ||
    (background.toLowerCase() === 'blue' && body === 'Pink')
  ) {
    return 900; // Second highest priority
  }

  // Priority 3: Calculate complementarity score (0-1, scaled to 0-800)
  const bgColor = getColorFromTrait(background);
  const bodyColor = getColorFromTrait(body);
  const complementarity = calculateComplementarity(bgColor, bodyColor);
  
  return complementarity * 800; // Scale to 0-800 range
}

/**
 * Sort Doopies by harmony score
 */
export function sortByHarmony<T extends { traits: { background: string; body: string } }>(
  doopies: T[]
): Array<{ doopie: T; score: number }> {
  return doopies
    .map(doopie => ({
      doopie,
      score: calculateHarmonyScore(doopie.traits.background, doopie.traits.body),
    }))
    .sort((a, b) => b.score - a.score) // Descending order (highest score first)
    .map(item => ({
      doopie: item.doopie,
      score: item.score,
    }));
}

