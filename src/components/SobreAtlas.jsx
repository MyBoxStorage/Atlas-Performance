/**
 * Componente SobreAtlas - A História por Trás do Nome
 * Atlas Performance - Landing Page Premium
 * 
 * Features:
 * - Narrativa sobre a mitologia grega do Atlas
 * - Texto à esquerda com elemento visual à direita
 * - Animações de entrada suaves
 */

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SobreAtlas() {
  const ref = useRef(null);
  const estaNaViewport = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="sobre-atlas" 
      className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Elemento decorativo de fundo */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <svg viewBox="0 0 400 600" className="w-full h-full">
          <path
            d="M200 50 L250 150 L350 180 L280 260 L300 380 L200 320 L100 380 L120 260 L50 180 L150 150 Z"
            fill="none"
            stroke="#FF6B00"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="container-atlas relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Conteúdo textual */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -60 }}
            animate={estaNaViewport ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Título da seção */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-barlow-condensed font-semibold text-sm text-[#FF6B00] tracking-widest uppercase mb-4 block"
            >
              A Filosofia
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-[#F0F0F0] mb-8 tracking-wide"
            >
              POR QUE ATLAS?
            </motion.h2>

            {/* Texto narrativo */}
            <div className="space-y-6 font-barlow text-base sm:text-lg text-[#9A9A9A] leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Na mitologia grega, Atlas era o titã condenado a carregar o peso do mundo sobre seus ombros.
                Mas existe uma outra forma de enxergar essa história.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-[#F0F0F0]"
              >
                Atlas não era apenas um condenado — era o único capaz de sustentar o que nenhum outro conseguia.
                Era força além do limite. Era resistência quando o mundo inteiro pesava contra.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                É exatamente essa filosofia que guia cada treino, cada plano e cada resultado entregue aqui.
                Você não está aqui para carregar um fardo — está aqui para provar que é capaz de mais
                do que imagina.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-[#FF6B00] font-medium text-xl"
              >
                A transformação começa quando você para de fugir do peso e começa a abraçá-lo.
              </motion.p>
            </div>
          </motion.div>

          {/* Elemento visual - Silhueta estilizada de Atlas */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={estaNaViewport ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="w-full max-w-sm mx-auto">
              {/* Círculo de glow atrás */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-[#FF6B00]/20 to-transparent blur-3xl" />
              </div>
              
              {/* Silhueta estilizada de Atlas carregando o mundo */}
              <svg 
                viewBox="0 0 300 400" 
                className="w-full h-full relative z-10"
              >
                <defs>
                  <linearGradient id="gradienteAtlas" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#FF6B00' }}/>
                    <stop offset="50%" style={{ stopColor: '#FF3D00' }}/>
                    <stop offset="100%" style={{ stopColor: '#2A2A2A' }}/>
                  </linearGradient>
                </defs>
                
                {/* Figura estilizada de Atlas */}
                <g fill="none" stroke="url(#gradienteAtlas)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {/* Cabeça */}
                  <circle cx="150" cy="60" r="25" opacity="0.9"/>
                  
                  {/* Braços segurando o mundo */}
                  <path d="M125 75 L80 50 L60 30" opacity="0.8"/>
                  <path d="M175 75 L220 50 L240 30" opacity="0.8"/>
                  
                  {/* O mundo/esfera acima */}
                  <circle cx="150" cy="25" r="35" fill="url(#gradienteAtlas)" opacity="0.3" stroke="none"/>
                  <circle cx="150" cy="25" r="35" opacity="0.6"/>
                  
                  {/* Linhas do globo */}
                  <ellipse cx="150" cy="25" rx="35" ry="12" opacity="0.4"/>
                  <line x1="150" y1="-10" x2="150" y2="60" opacity="0.4"/>
                  
                  {/* Tronco musculoso */}
                  <path d="M125 100 L125 180 L110 220" opacity="0.8"/>
                  <path d="M175 100 L175 180 L190 220" opacity="0.8"/>
                  <path d="M125 100 Q150 120 175 100" opacity="0.8"/>
                  
                  {/* Pernas em pose de força */}
                  <path d="M110 220 L90 300 L70 380" opacity="0.8"/>
                  <path d="M190 220 L210 300 L230 380" opacity="0.8"/>
                  
                  {/* Músculos do peitoral */}
                  <path d="M135 130 Q150 145 165 130" opacity="0.6"/>
                  <path d="M130 150 Q150 165 170 150" opacity="0.6"/>
                  
                  {/* Abdômen definido */}
                  <line x1="150" y1="160" x2="150" y2="200" opacity="0.5"/>
                  <path d="M140 170 Q150 175 160 170" opacity="0.5"/>
                  <path d="M140 185 Q150 190 160 185" opacity="0.5"/>
                </g>
                
                {/* Detalhes em preenchimento sólido */}
                <g fill="#FF6B00" opacity="0.2">
                  <circle cx="150" cy="25" r="8"/>
                  <ellipse cx="150" cy="140" rx="20" ry="8"/>
                </g>
              </svg>

              {/* Texto decorativo */}
              <div className="absolute bottom-0 left-0 right-0 text-center">
                <span className="font-bebas text-6xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-t from-[#FF6B00]/30 to-transparent">
                  ATLAS
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
