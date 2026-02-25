/**
 * Componente Diferenciais - Os 4 Pilares do Método Atlas
 * Atlas Performance - Landing Page Premium
 * 
 * Features:
 * - 4 cards com ícones e descrições
 * - Grid responsivo (2x2 mobile, 4x1 desktop)
 * - Efeito de hover com glow laranja
 * - Animações de entrada escalonadas
 */

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScanLine, CalendarDays, MessageCircle, TrendingUp } from 'lucide-react';

// Dados dos 4 pilares/diferenciais
const pilares = [
  {
    icone: ScanLine,
    titulo: 'Diagnóstico Total',
    descricao: 'Avaliação física completa, análise postural, histórico de saúde e definição de objetivos reais antes de qualquer treino começar. Sem achismo. Só ciência.',
  },
  {
    icone: CalendarDays,
    titulo: 'Periodização Individualizada',
    descricao: 'Cada fase do treino é planejada com precisão. Evolução progressiva, ajustes semanais e protocolos adaptados ao seu ritmo e objetivo.',
  },
  {
    icone: MessageCircle,
    titulo: 'Acompanhamento Contínuo',
    descricao: 'Acesso direto ao Brendon via canal exclusivo. Dúvidas respondidas, ajustes em tempo real e suporte motivacional quando você mais precisar.',
  },
  {
    icone: TrendingUp,
    titulo: 'Resultados Mensuráveis',
    descricao: 'Reavaliações periódicas com dados reais. Você vai ver e sentir cada miligrâmetro de evolução com registros documentados do início ao fim.',
  },
];

// Variantes de animação para o container
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  }
};

// Variantes de animação para cada card
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export default function Diferenciais() {
  const ref = useRef(null);
  const estaNaViewport = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="metodo" 
      className="relative pt-24 sm:pt-32 pb-16 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B00]/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF6B00]/3 rounded-full blur-3xl pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="container-atlas relative z-10">
        {/* Header da seção */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <span className="font-barlow-condensed font-semibold text-sm text-[#FF6B00] tracking-widest uppercase mb-4 block">
            Nossa Metodologia
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-[#F0F0F0] mb-4 tracking-wide">
            O MÉTODO ATLAS
          </h2>
          <p className="font-barlow text-lg text-[#9A9A9A] max-w-2xl mx-auto">
            Quatro pilares que separam a transformação real da ilusão de resultado
          </p>
        </motion.div>

        {/* Grid de cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={estaNaViewport ? "show" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pilares.map((pilar, index) => (
            <motion.div
              key={pilar.titulo}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative"
            >
              <div className="relative h-full p-8 bg-[#111111] rounded-2xl border border-[#1E1E1E] transition-all duration-500 group-hover:border-[#FF6B00]/50 group-hover:shadow-glow-laranja overflow-hidden">
                {/* Efeito de gradiente no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Conteúdo do card */}
                <div className="relative z-10">
                  {/* Ícone */}
                  <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B00]/20 to-[#FF6B00]/5 border border-[#FF6B00]/20 group-hover:border-[#FF6B00]/40 transition-colors duration-300">
                    <pilar.icone 
                      size={28} 
                      className="text-[#FF6B00] transition-transform duration-300 group-hover:scale-110" 
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Número do pilar */}
                  <span className="font-bebas text-5xl text-[#2A2A2A] absolute top-6 right-6 group-hover:text-[#FF6B00]/20 transition-colors duration-300">
                    0{index + 1}
                  </span>

                  {/* Título */}
                  <h3 className="font-barlow-condensed font-semibold text-xl text-[#F0F0F0] mb-4 group-hover:text-[#FF6B00] transition-colors duration-300">
                    {pilar.titulo}
                  </h3>

                  {/* Descrição */}
                  <p className="font-barlow text-sm text-[#9A9A9A] leading-relaxed">
                    {pilar.descricao}
                  </p>
                </div>

                {/* Linha decorativa inferior */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B00] to-[#FF3D00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA abaixo dos cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12"
        >
          <a
            href="#servicos"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#servicos')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 font-barlow-condensed font-semibold text-[#FF6B00] hover:text-[#E55A00] transition-colors duration-300 group"
          >
            Conheça nossos planos
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
