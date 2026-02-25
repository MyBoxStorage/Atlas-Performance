/**
 * Componente Depoimentos - Carrossel de Depoimentos
 * Atlas Performance - Landing Page Premium
 * 
 * Features:
 * - Carrossel com 6 depoimentos
 * - Auto-play suave
 * - Navegação com setas e dots
 * - Cards com avatar, nome, plano e estrelas
 */

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { IMAGENS } from '../assets/images';

// Importações de estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Dados dos depoimentos
const depoimentos = [
  {
    texto: 'Tentei academia sozinha por 3 anos sem resultado. Em 4 meses com o Brendon mudei mais do que em todo esse tempo. O método dele é sério, individualizado e funciona de verdade.',
    nome: 'Fernanda L.',
    idade: 28,
    plano: 'Online Coaching',
    avatar: IMAGENS.depoimentos[0],
  },
  {
    texto: 'Vim com uma lesão no joelho que me impedia de treinar. Ele não só montou um treino adaptado como me ajudou a reabilitar. Hoje treino 5x por semana sem nenhuma dor.',
    nome: 'Ricardo M.',
    idade: 34,
    plano: 'Presencial',
    avatar: IMAGENS.depoimentos[1],
  },
  {
    texto: 'Trabalho 12 horas por dia e achei que não teria tempo. Com o plano online eu treino onde estou, quando posso, e os resultados continuam aparecendo.',
    nome: 'Thiago R.',
    idade: 25,
    plano: 'Online Coaching',
    avatar: IMAGENS.depoimentos[2],
  },
  {
    texto: 'Pós-parto foi um período muito difícil. O Brendon foi além do treino — foi suporte, motivação e profissionalismo do início ao fim. Me sinto melhor do que antes da gravidez.',
    nome: 'Juliana P.',
    idade: 31,
    plano: 'Consultoria Premium',
    avatar: IMAGENS.depoimentos[3],
  },
  {
    texto: 'Fiz vários planos de academia antes. Nada se compara a ter um profissional que conhece seu histórico, seus limites e sabe exatamente como te desafiar na medida certa.',
    nome: 'Carlos A.',
    idade: 41,
    plano: 'Presencial',
    avatar: IMAGENS.depoimentos[4],
  },
  {
    texto: 'Não buscava só emagrecer. Buscava qualidade de vida. Ele entendeu isso e montou algo que se encaixou na minha rotina. Hoje é hábito, não esforço.',
    nome: 'Mariana S.',
    idade: 38,
    plano: 'Online Coaching',
    avatar: IMAGENS.depoimentos[5],
  },
];

export default function Depoimentos() {
  const ref = useRef(null);
  const estaNaViewport = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="depoimentos" 
      className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF6B00]/5 rounded-full blur-3xl pointer-events-none" />

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
            Depoimentos
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-[#F0F0F0] mb-4 tracking-wide">
            O QUE DIZEM OS ALUNOS
          </h2>
        </motion.div>

        {/* Carrossel de depoimentos */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
        >
          {/* Botões de navegação customizados */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-[#111111] border border-[#1E1E1E] rounded-full flex items-center justify-center text-[#F0F0F0] hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors duration-300 hidden lg:flex">
            <ChevronLeft size={24} />
          </button>
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-[#111111] border border-[#1E1E1E] rounded-full flex items-center justify-center text-[#F0F0F0] hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors duration-300 hidden lg:flex">
            <ChevronRight size={24} />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            pagination={{ 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-[#2A2A2A] !opacity-50',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#FF6B00] !opacity-100',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-14"
          >
            {depoimentos.map((depoimento, index) => (
              <SwiperSlide key={index}>
                <div className="h-full p-6 bg-[#111111] rounded-2xl border border-[#1E1E1E] hover:border-[#FF6B00]/30 transition-all duration-300 group">
                  {/* Estrelas */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className="text-yellow-500 fill-yellow-500" 
                      />
                    ))}
                  </div>

                  {/* Texto do depoimento */}
                  <p className="font-barlow text-sm text-[#9A9A9A] leading-relaxed mb-6 line-clamp-4">
                    "{depoimento.texto}"
                  </p>

                  {/* Informações do autor */}
                  <div className="flex items-center gap-4 pt-4 border-t border-[#1E1E1E]">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF6B00]/30">
                      <img
                        src={depoimento.avatar}
                        alt={depoimento.nome}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Nome e plano */}
                    <div className="flex-1">
                      <h4 className="font-barlow-condensed font-semibold text-sm text-[#F0F0F0]">
                        {depoimento.nome}, {depoimento.idade} anos
                      </h4>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-[#FF6B00]/10 rounded text-[10px] font-barlow text-[#FF6B00]">
                        {depoimento.plano}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Indicador de scroll/swipe para mobile */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={estaNaViewport ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-4 font-barlow text-xs text-[#9A9A9A] lg:hidden"
        >
          Deslize para ver mais depoimentos
        </motion.p>
      </div>
    </section>
  );
}
