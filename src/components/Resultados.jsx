/**
 * Componente Resultados - Antes & Depois com Dados Mensuráveis
 * Atlas Performance - Landing Page Premium
 * 
 * Features:
 * - 6 cards de transformação
 * - Hover que revela detalhes
 * - Dados mensuráveis de cada caso
 * - Disclaimer de portfólio
 */

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, AlertCircle, Calendar, TrendingDown, TrendingUp, Activity } from 'lucide-react';

// Dados dos casos de transformação
const casos = [
  {
    nome: 'Ricardo M.',
    idade: 34,
    objetivo: 'Emagrecimento + ganho de massa',
    desafio: 'Sobrepeso com histórico de lesão no joelho direito',
    protocolo: '5 meses | Treino funcional adaptado + cardio intervalado',
    resultados: [
      { icone: TrendingDown, valor: '-18kg', label: 'Peso' },
      { icone: TrendingUp, valor: '+4kg', label: 'Massa Magra' },
      { icone: Activity, valor: 'Reabilitado', label: 'Joelho' },
    ],
    cor: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    nome: 'Fernanda L.',
    idade: 28,
    objetivo: 'Definição e condicionamento',
    desafio: 'Histórico de dietas restritivas, metabolismo lento',
    protocolo: '4 meses | Treino de força progressivo + reeducação alimentar',
    resultados: [
      { icone: TrendingDown, valor: '-11kg', label: 'Gordura' },
      { icone: Target, valor: 'Remodelada', label: 'Composição' },
    ],
    cor: 'from-pink-500/20 to-rose-500/20',
  },
  {
    nome: 'Carlos A.',
    idade: 41,
    objetivo: 'Hipertrofia e performance atlética',
    desafio: 'Rotina corrida, pouco tempo disponível, treinos anteriores ineficazes',
    protocolo: '6 meses | Treino 3x semana de alta intensidade periodizado',
    resultados: [
      { icone: TrendingUp, valor: '+8kg', label: 'Massa Muscular' },
      { icone: Activity, valor: 'PRs', label: 'Todos os Lifts' },
    ],
    cor: 'from-orange-500/20 to-amber-500/20',
  },
  {
    nome: 'Juliana P.',
    idade: 31,
    objetivo: 'Pós-parto — recuperação e tonificação',
    desafio: 'Diastase abdominal, baixa autoestima, fadiga crônica',
    protocolo: '5 meses | Treino de baixo impacto progressivo + core especializado',
    resultados: [
      { icone: Activity, valor: 'Corrigida', label: 'Diastase' },
      { icone: TrendingDown, valor: '-9kg', label: 'Peso' },
      { icone: Target, valor: 'Restaurada', label: 'Autoestima' },
    ],
    cor: 'from-purple-500/20 to-violet-500/20',
  },
  {
    nome: 'Thiago R.',
    idade: 25,
    objetivo: 'Performance para corrida de rua',
    desafio: 'Plateau de performance, sem evolução há 8 meses',
    protocolo: '3 meses | Treino de força complementar + periodização de corrida',
    resultados: [
      { icone: Activity, valor: 'PR', label: 'Meia Maratona' },
      { icone: TrendingDown, valor: '-14min', label: 'Tempo' },
    ],
    cor: 'from-green-500/20 to-emerald-500/20',
  },
  {
    nome: 'Mariana S.',
    idade: 38,
    objetivo: 'Qualidade de vida e controle do estresse',
    desafio: 'Sedentarismo de 6 anos, ansiedade, sem rotina de exercícios',
    protocolo: '4 meses | Treino funcional 3x semana + mindfulness pós-treino',
    resultados: [
      { icone: TrendingDown, valor: '-13kg', label: 'Peso' },
      { icone: Activity, valor: 'Reduzida', label: 'Ansiedade' },
      { icone: Target, valor: 'Consolidada', label: 'Rotina' },
    ],
    cor: 'from-teal-500/20 to-cyan-500/20',
  },
];

// Variantes de animação
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

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

export default function Resultados() {
  const ref = useRef(null);
  const estaNaViewport = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="resultados" 
      className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#FF6B00]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FF6B00]/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

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
            Transformações Reais
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-[#F0F0F0] mb-4 tracking-wide">
            RESULTADOS REAIS
          </h2>
          <p className="font-barlow text-lg text-[#9A9A9A] max-w-2xl mx-auto">
            Dados mensuráveis. Histórias reais. Transformações documentadas.
          </p>
        </motion.div>

        {/* Grid de casos */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={estaNaViewport ? "show" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {casos.map((caso, index) => (
            <motion.div
              key={caso.nome}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="relative h-full bg-[#111111] rounded-2xl border border-[#1E1E1E] overflow-hidden transition-all duration-500 group-hover:border-[#FF6B00]/50 group-hover:shadow-glow-laranja">
                {/* Gradiente de fundo */}
                <div className={`absolute inset-0 bg-gradient-to-br ${caso.cor} opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
                
                {/* Conteúdo */}
                <div className="relative p-6">
                  {/* Header do card */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-barlow-condensed font-semibold text-xl text-[#F0F0F0]">
                        {caso.nome}
                      </h3>
                      <span className="font-barlow text-sm text-[#9A9A9A]">
                        {caso.idade} anos
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#FF6B00]/10 flex items-center justify-center">
                      <Target size={20} className="text-[#FF6B00]" />
                    </div>
                  </div>

                  {/* Objetivo */}
                  <div className="mb-3">
                    <span className="font-barlow text-xs text-[#9A9A9A] uppercase tracking-wider">Objetivo</span>
                    <p className="font-barlow text-sm text-[#F0F0F0]">{caso.objetivo}</p>
                  </div>

                  {/* Desafio */}
                  <div className="mb-4">
                    <span className="font-barlow text-xs text-[#9A9A9A] uppercase tracking-wider">Desafio</span>
                    <p className="font-barlow text-sm text-[#9A9A9A]">{caso.desafio}</p>
                  </div>

                  {/* Protocolo */}
                  <div className="flex items-center gap-2 mb-6 py-2 px-3 bg-[#0A0A0A]/50 rounded-lg">
                    <Calendar size={14} className="text-[#FF6B00]" />
                    <span className="font-barlow text-xs text-[#9A9A9A]">{caso.protocolo}</span>
                  </div>

                  {/* Resultados */}
                  <div className="grid grid-cols-3 gap-2">
                    {caso.resultados.map((resultado, idx) => (
                      <div key={idx} className="text-center p-3 bg-[#0A0A0A]/80 rounded-lg">
                        <resultado.icone size={18} className="text-[#FF6B00] mx-auto mb-1" />
                        <div className="font-bebas text-xl text-[#F0F0F0]">{resultado.valor}</div>
                        <div className="font-barlow text-[10px] text-[#9A9A9A] uppercase">{resultado.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Linha decorativa inferior */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B00] to-[#FF3D00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 flex items-start gap-3 justify-center max-w-3xl mx-auto"
        >
          <AlertCircle size={18} className="text-[#9A9A9A] mt-0.5 flex-shrink-0" />
          <p className="font-barlow text-xs text-[#9A9A9A] text-center">
            Resultados individuais podem variar conforme dedicação, histórico de saúde e adesão ao plano.
            Todos os casos apresentados são representações para fins de demonstração de portfólio.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
