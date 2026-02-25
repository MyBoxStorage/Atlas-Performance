/**
 * Hook personalizado para animações de scroll com Framer Motion
 * Atlas Performance - Animações de entrada ao rolar a página
 */

import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Hook useScrollAnimation
 * Fornece configurações padrão de animação para elementos que entram na viewport
 * 
 * @param {Object} opcoes - Opções de configuração
 * @param {number} opcoes.deslocamento - Distância de deslocamento em pixels (padrão: 60)
 * @param {number} opcoes.duracao - Duração da animação em segundos (padrão: 0.6)
 * @param {number} opcoes.atraso - Atraso antes de iniciar a animação (padrão: 0)
 * @param {string} opcoes.direcao - Direção da animação: 'cima', 'baixo', 'esquerda', 'direita' (padrão: 'cima')
 * @returns {Object} - Ref e configurações de animação
 */
export function useScrollAnimation(opcoes = {}) {
  const {
    deslocamento = 60,
    duracao = 0.6,
    atraso = 0,
    direcao = 'cima',
  } = opcoes;

  const ref = useRef(null);
  const estaNaViewport = useInView(ref, { 
    once: true, 
    margin: "-100px" 
  });

  // Define os valores iniciais baseados na direção
  const getValoresIniciais = () => {
    switch (direcao) {
      case 'cima':
        return { y: deslocamento, x: 0 };
      case 'baixo':
        return { y: -deslocamento, x: 0 };
      case 'esquerda':
        return { x: deslocamento, y: 0 };
      case 'direita':
        return { x: -deslocamento, y: 0 };
      default:
        return { y: deslocamento, x: 0 };
    }
  };

  const valoresIniciais = getValoresIniciais();

  const animacao = {
    initial: { 
      opacity: 0, 
      ...valoresIniciais 
    },
    animate: estaNaViewport ? { 
      opacity: 1, 
      x: 0, 
      y: 0 
    } : { 
      opacity: 0, 
      ...valoresIniciais 
    },
    transition: { 
      duration: duracao, 
      delay: atraso,
      ease: [0.25, 0.1, 0.25, 1] // Curva de easing suave
    }
  };

  return { ref, ...animacao };
}

/**
 * Configuração de animação escalonada para listas
 * Útil para animar múltiplos elementos em sequência
 */
export const animacaoEscalonada = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }
};

/**
 * Variantes de animação para o Hero
 */
export const animacaoHero = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 60 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }
};

/**
 * Variantes de animação para cards
 */
export const animacaoCard = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export default useScrollAnimation;
