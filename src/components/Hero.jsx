/**
 * Componente Hero - Seção principal da landing page
 * Atlas Performance - Landing Page Premium
 * 
 * Features:
 * - Fullscreen com imagem de fundo em P&B
 * - Headline animada com entrada escalonada
 * - Métricas flutuantes com efeito glassmorphism
 * - CTAs primário e secundário
 * - Efeito de grain sutil no fundo
 */

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { IMAGENS } from '../assets/images';

// Configuração de animação escalonada
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Componente de contador animado
function ContadorAnimado({ valor, sufixo = '', duracao = 2 }) {
  const [contador, setContador] = useState(0);
  const ref = useRef(null);
  const estaNaViewport = useInView(ref, { once: true });

  useEffect(() => {
    if (!estaNaViewport) return;

    const numeroFinal = parseInt(valor.replace(/\D/g, ''));
    const incremento = numeroFinal / (duracao * 60);
    let atual = 0;

    const timer = setInterval(() => {
      atual += incremento;
      if (atual >= numeroFinal) {
        setContador(numeroFinal);
        clearInterval(timer);
      } else {
        setContador(Math.floor(atual));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [estaNaViewport, valor, duracao]);

  return (
    <span ref={ref}>
      {valor.startsWith('+') ? '+' : ''}{contador}{sufixo}
    </span>
  );
}

// Métricas flutuantes
const metricas = [
  { valor: '+200', label: 'Alunos Transformados' },
  { valor: '98%', label: 'Taxa de Satisfação' },
  { valor: '8', label: 'Anos de Experiência' },
];

export default function Hero() {
  const scrollParaSecao = (href) => {
    const elemento = document.querySelector(href);
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Imagem de fundo com overlay gradiente */}
      <div className="absolute inset-0">
        <img
          src={IMAGENS.heroBg}
          alt="Treino intenso"
          className="w-full h-full object-cover grayscale"
        />
        {/* Overlay gradiente escuro da esquerda para direita */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        {/* Overlay inferior para melhorar contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
      </div>

      {/* Efeito de grain sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)"/>
        </svg>
      </div>

      {/* Conteúdo principal */}
      <div className="container-atlas relative z-10 pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-[100px] text-[#F0F0F0] leading-[0.95] tracking-wide mb-6"
          >
            FORJE A VERSÃO
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF3D00]">
              MAIS FORTE
            </span>
            <br />
            DE VOCÊ
          </motion.h1>

          {/* Subtítulo */}
          <motion.p 
            variants={itemVariants}
            className="font-barlow text-base sm:text-lg text-[#9A9A9A] max-w-xl mb-8 leading-relaxed"
          >
            Treinamento personalizado de alto desempenho para quem leva a evolução a sério.
            Presencial em Paraíba do Sul ou online para todo o Brasil.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a
              href="#agendamento"
              onClick={(e) => { e.preventDefault(); scrollParaSecao('#agendamento'); }}
              className="font-barlow-condensed font-semibold text-base px-8 py-4 bg-gradient-to-r from-[#FF6B00] to-[#FF3D00] text-white rounded-lg hover:shadow-glow-laranja transition-all duration-300 hover:scale-105 text-center"
            >
              Verificar Disponibilidade
            </a>
            <a
              href="#sobre"
              onClick={(e) => { e.preventDefault(); scrollParaSecao('#sobre'); }}
              className="font-barlow-condensed font-semibold text-base px-8 py-4 border-2 border-[#2A2A2A] text-[#F0F0F0] rounded-lg hover:border-[#FF6B00] hover:text-[#FF6B00] transition-all duration-300 text-center"
            >
              Conheça o Método
            </a>
          </motion.div>

          {/* Métricas flutuantes */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 sm:gap-6"
          >
            {metricas.map((metrica, index) => (
              <motion.div
                key={metrica.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.15, duration: 0.5 }}
                className="glass px-5 py-3 rounded-xl border border-[#1E1E1E] hover:border-[#FF6B00]/30 transition-colors duration-300"
              >
                <div className="font-bebas text-2xl sm:text-3xl text-[#FF6B00]">
                  {metrica.valor.includes('%') ? (
                    <ContadorAnimado valor={metrica.valor} sufixo="%" />
                  ) : metrica.valor.startsWith('+') ? (
                    <ContadorAnimado valor={metrica.valor} />
                  ) : (
                    <ContadorAnimado valor={metrica.valor} />
                  )}
                </div>
                <div className="font-barlow text-xs sm:text-sm text-[#9A9A9A]">
                  {metrica.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator sutil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-[#2A2A2A] rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
