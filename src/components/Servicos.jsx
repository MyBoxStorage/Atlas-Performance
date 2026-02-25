/**
 * Componente Servicos - Tabela Comparativa de Planos
 * Atlas Performance - Landing Page Premium
 * 
 * Features:
 * - 3 planos comparativos em cards
 * - Plano central (Online Coaching) em destaque
 * - Badges exclusivos para cada plano
 * - Lista de recursos com checkmarks
 * - CTAs para cada plano
 */

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X, Star, Crown, Zap } from 'lucide-react';

// Dados dos planos
const planos = [
  {
    nome: 'PRESENCIAL INDIVIDUAL',
    badge: 'EXCLUSIVO',
    badgeIcon: Star,
    badgeCor: 'bg-[#2A2A2A]',
    descricao: 'Para quem quer a experiência completa de treinamento presencial com acompanhamento total',
    frequencia: '3x ou 5x por semana',
    recursos: [
      { texto: 'Avaliação física e postural completa', incluido: true },
      { texto: 'Treinos 100% personalizados', incluido: true },
      { texto: 'Ajuste de cargas em tempo real', incluido: true },
      { texto: 'Relatório mensal de evolução', incluido: true },
      { texto: 'Canal de suporte exclusivo', incluido: true },
      { texto: 'Treino remoto', incluido: false },
      { texto: 'App de acompanhamento', incluido: false },
    ],
    cta: 'Verificar Disponibilidade',
    nota: 'Disponível em Paraíba do Sul — RJ',
    destaque: false,
  },
  {
    nome: 'ONLINE COACHING',
    badge: 'MAIS POPULAR',
    badgeIcon: Zap,
    badgeCor: 'bg-gradient-to-r from-[#FF6B00] to-[#FF3D00]',
    descricao: 'Método Atlas completo na palma da sua mão, onde você estiver no Brasil',
    frequencia: null,
    recursos: [
      { texto: 'Anamnese e avaliação online detalhada', incluido: true },
      { texto: 'Planilha de treino periodizada', incluido: true },
      { texto: 'Revisão e ajuste mensal do plano', incluido: true },
      { texto: 'Suporte via app exclusivo', incluido: true },
      { texto: 'Vídeos demonstrativos dos exercícios', incluido: true },
      { texto: 'Acompanhamento nutricional básico', incluido: true },
      { texto: 'Check-ins semanais de evolução', incluido: true },
    ],
    cta: 'Verificar Disponibilidade',
    nota: 'Para todo o Brasil',
    destaque: true,
  },
  {
    nome: 'CONSULTORIA PREMIUM HÍBRIDA',
    badge: 'ELITE',
    badgeIcon: Crown,
    badgeCor: 'bg-[#FFD700] text-[#0A0A0A]',
    descricao: 'A experiência mais completa: presencial + online integrados em um único método',
    frequencia: null,
    recursos: [
      { texto: 'Tudo do Plano Presencial', incluido: true },
      { texto: 'Tudo do Plano Online', incluido: true },
      { texto: 'Sessões mensais de avaliação presencial', incluido: true },
      { texto: 'Plano alimentar personalizado', incluido: true },
      { texto: 'Acesso prioritário e ilimitado ao Brendon', incluido: true },
      { texto: 'Relatórios bimestrais completos', incluido: true },
      { texto: 'Planejamento de longo prazo (6–12 meses)', incluido: true },
    ],
    cta: 'Verificar Disponibilidade',
    nota: 'Vagas extremamente limitadas',
    destaque: false,
  },
];

// Variantes de animação
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

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export default function Servicos() {
  const ref = useRef(null);
  const estaNaViewport = useInView(ref, { once: true, margin: "-100px" });

  const scrollParaAgendamento = () => {
    document.querySelector('#agendamento')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="servicos" 
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
            Nossos Serviços
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-[#F0F0F0] mb-4 tracking-wide">
            ESCOLHA SEU PLANO
          </h2>
          <p className="font-barlow text-lg text-[#9A9A9A] max-w-2xl mx-auto">
            Três formas de começar. Um único destino: resultado.
          </p>
        </motion.div>

        {/* Grid de planos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={estaNaViewport ? "show" : "hidden"}
          className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start"
        >
          {planos.map((plano, index) => (
            <motion.div
              key={plano.nome}
              variants={cardVariants}
              className={`relative ${plano.destaque ? 'lg:-mt-8 lg:mb-8' : ''}`}
            >
              {/* Card do plano */}
              <div 
                className={`relative h-full rounded-2xl overflow-hidden ${
                  plano.destaque 
                    ? 'bg-gradient-to-b from-[#FF6B00]/20 to-[#111111] border-2 border-[#FF6B00]' 
                    : 'bg-[#111111] border border-[#1E1E1E]'
                }`}
              >
                {/* Badge */}
                <div className={`absolute top-0 left-0 right-0 py-2 ${plano.badgeCor} text-center`}>
                  <div className="flex items-center justify-center gap-2">
                    <plano.badgeIcon size={16} className={plano.badgeCor.includes('FFD700') ? 'text-[#0A0A0A]' : 'text-white'} />
                    <span className={`font-barlow-condensed font-semibold text-xs tracking-wider ${plano.badgeCor.includes('FFD700') ? 'text-[#0A0A0A]' : 'text-white'}`}>
                      {plano.badge}
                    </span>
                  </div>
                </div>

                <div className="p-8 pt-14">
                  {/* Nome do plano */}
                  <h3 className="font-bebas text-3xl text-[#F0F0F0] mb-3 tracking-wide">
                    {plano.nome}
                  </h3>

                  {/* Descrição */}
                  <p className="font-barlow text-sm text-[#9A9A9A] mb-4 leading-relaxed">
                    {plano.descricao}
                  </p>

                  {/* Frequência (se houver) */}
                  {plano.frequencia && (
                    <div className="mb-6 py-2 px-4 bg-[#1E1E1E] rounded-lg">
                      <span className="font-barlow-condensed font-semibold text-sm text-[#FF6B00]">
                        {plano.frequencia}
                      </span>
                    </div>
                  )}

                  {/* Lista de recursos */}
                  <ul className="space-y-3 mb-8">
                    {plano.recursos.map((recurso, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {recurso.incluido ? (
                          <Check size={18} className="text-[#FF6B00] mt-0.5 flex-shrink-0" />
                        ) : (
                          <X size={18} className="text-[#2A2A2A] mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`font-barlow text-sm ${recurso.incluido ? 'text-[#F0F0F0]' : 'text-[#5A5A5A]'}`}>
                          {recurso.texto}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={scrollParaAgendamento}
                    className={`w-full py-4 rounded-lg font-barlow-condensed font-semibold text-base transition-all duration-300 ${
                      plano.destaque
                        ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF3D00] text-white hover:shadow-glow-laranja hover:scale-[1.02]'
                        : 'bg-[#2A2A2A] text-[#F0F0F0] hover:bg-[#FF6B00] hover:text-white'
                    }`}
                  >
                    {plano.cta}
                  </button>

                  {/* Nota */}
                  <p className="text-center mt-4 font-barlow text-xs text-[#9A9A9A]">
                    {plano.nota}
                  </p>
                </div>
              </div>

              {/* Glow para plano em destaque */}
              {plano.destaque && (
                <div className="absolute -inset-4 bg-[#FF6B00]/10 rounded-3xl blur-xl -z-10" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Nota de garantia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center mt-12"
        >
          <p className="font-barlow text-sm text-[#9A9A9A]">
            Todos os planos incluem{' '}
            <span className="text-[#FF6B00]">garantia de satisfação</span>{' '}
            de 7 dias. Cancele quando quiser.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
