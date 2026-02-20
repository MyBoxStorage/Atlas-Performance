'use client';

import { useCallback } from 'react';
import useSound from 'use-sound';

/**
 * Hook para gerenciar sons do Pokédex
 * Usa use-sound para tocar efeitos sonoros
 */
export function usePokedexSounds() {
  // Sons básicos gerados via Web Audio API como fallback se arquivos não estiverem disponíveis
  const generateBeep = useCallback((frequency: number = 800, duration: number = 100) => {
    if (typeof window === 'undefined') return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      console.warn('Could not play sound:', error);
    }
  }, []);

  // Tentar carregar sons de arquivos, com fallback para beeps gerados
  const [playOpenSoundFile] = useSound('/sounds/pokedex-open.mp3', { 
    volume: 0.5,
    onload: () => {},
    onerror: () => {} // Silenciosamente falhar se arquivo não existir
  });
  
  const [playCloseSoundFile] = useSound('/sounds/pokedex-close.mp3', { 
    volume: 0.5,
    onload: () => {},
    onerror: () => {}
  });
  
  const [playSelectSoundFile] = useSound('/sounds/pokedex-select.mp3', { 
    volume: 0.3,
    onload: () => {},
    onerror: () => {}
  });
  
  const [playNavigateSoundFile] = useSound('/sounds/pokedex-navigate.mp3', { 
    volume: 0.3,
    onload: () => {},
    onerror: () => {}
  });

  const playOpenSound = useCallback(() => {
    try {
      playOpenSoundFile();
    } catch {
      generateBeep(800, 150);
    }
  }, [playOpenSoundFile, generateBeep]);

  const playCloseSound = useCallback(() => {
    try {
      playCloseSoundFile();
    } catch {
      generateBeep(600, 150);
    }
  }, [playCloseSoundFile, generateBeep]);

  const playSelectSound = useCallback(() => {
    try {
      playSelectSoundFile();
    } catch {
      generateBeep(1000, 50);
    }
  }, [playSelectSoundFile, generateBeep]);

  const playNavigateSound = useCallback(() => {
    try {
      playNavigateSoundFile();
    } catch {
      generateBeep(900, 50);
    }
  }, [playNavigateSoundFile, generateBeep]);

  return {
    playOpenSound,
    playCloseSound,
    playSelectSound,
    playNavigateSound,
  };
}

