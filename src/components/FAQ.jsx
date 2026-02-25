/**
 * Componente FAQ - Perguntas Frequentes
 * Atlas Performance - Landing Page Premium
 * 
 * Features:
 * - 6 perguntas com accordion
 * - Animação suave de abertura/fechamento
 * - AnimatePresence para transições
 */

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

// Dados das perguntas e respostas
const faqs = [
  {
    pergunta: 'Preciso ter experiência com treino para começar?',
    resposta: 'Não. O método Atlas é desenvolvido para qualquer nível de condicionamento. Antes de iniciar qualquer protocolo, realizamos uma avaliação completa para entender seu histórico, limitações e objetivos. Começamos exatamente de onde você está.',
  },
  {
    pergunta: 'Como funciona o acompanhamento online?',
    resposta: 'Você recebe acesso a um app exclusivo com sua planilha de treino, vídeos demonstrativos de cada exercício e canal direto com o Brendon. Os check-ins são semanais e o plano é ajustado mensalmente com base na sua evolução.',
  },
  {
    pergunta: 'Em quanto tempo verei resultados?',
    resposta: 'Os primeiros resultados mensuráveis — em desempenho, disposição e composição corporal — geralmente aparecem entre 30 e 60 dias. Resultados estéticos significativos são visíveis entre 90 e 120 dias com adesão consistente ao plano.',
  },
  {
    pergunta: 'Os treinos presenciais acontecem onde?',
    resposta: 'Os atendimentos presenciais são realizados em Paraíba do Sul — RJ. Entre em contato para confirmar o endereço exato e a disponibilidade de horários.',
  },
  {
    pergunta: 'O plano inclui orientação nutricional?',
    resposta: 'O plano Online Coaching inclui acompanhamento nutricional básico. A Consultoria Premium Híbrida inclui plano alimentar individualizado completo. Para orientação nutricional aprofundada, trabalhamos em parceria com nutricionistas esportivos.',
  },
  {
    pergunta: 'Posso cancelar o plano a qualquer momento?',
    resposta: 'Trabalhamos com contratos mensais renováveis. O cancelamento pode ser solicitado com 15 dias de antecedência, sem multas ou taxas adicionais. Nossa prioridade é que você continue porque quer resultado — não porque é obrigado.',
  },
];

// Componente de item individual do accordion
function FAQItem({ pergunta, resposta, estaAberta, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
      className={`border-b border-[#1E1E1E] ${estaAberta ? 'bg-[#111111]' : ''}`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 py-6 px-6 text-left group"
        aria-expanded={estaAberta}
      >
        <span className={`font-barlow-condensed font-semibold text-base sm:text-lg transition-colors duration-300 ${estaAberta ? 'text-[#FF6B00]' : 'text-[#F0F0F0] group-hover:text-[#FF6B00]'}`}>
          {pergunta}
        </span>
        <motion.div
          animate={{ rotate: estaAberta ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${estaAberta ? 'bg-[#FF6B00]' : 'bg-[#1E1E1E] group-hover:bg-[#FF6B00]/20'}`}
        >
          <ChevronDown size={18} className={estaAberta ? 'text-white' : 'text-[#9A9A9A] group-hover:text-[#FF6B00]'} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {estaAberta && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <p className="font-barlow text-sm sm:text-base text-[#9A9A9A] leading-relaxed">
                {resposta}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const estaNaViewport = useInView(ref, { once: true, margin: "-100px" });
  const [itemAberto, setItemAberto] = useState(0);

  const toggleItem = (index) => {
    setItemAberto(itemAberto === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#FF6B00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-atlas relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header da seção */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-12"
          >
            <span className="font-barlow-condensed font-semibold text-sm text-[#FF6B00] tracking-widest uppercase mb-4 block">
              Dúvidas
            </span>
            <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-[#F0F0F0] mb-4 tracking-wide">
              PERGUNTAS FREQUENTES
            </h2>
          </motion.div>

          {/* Ícone decorativo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={estaNaViewport ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="w-16 h-16 rounded-full bg-[#FF6B00]/10 flex items-center justify-center">
              <HelpCircle size={32} className="text-[#FF6B00]" />
            </div>
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-[#0A0A0A] rounded-2xl border border-[#1E1E1E] overflow-hidden"
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                pergunta={faq.pergunta}
                resposta={faq.resposta}
                estaAberta={itemAberto === index}
                onClick={() => toggleItem(index)}
                index={index}
              />
            ))}
          </motion.div>

          {/* CTA para contato */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-10"
          >
            <p className="font-barlow text-[#9A9A9A] mb-4">
              Ainda tem dúvidas?
            </p>
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 font-barlow-condensed font-semibold text-[#FF6B00] hover:text-[#E55A00] transition-colors duration-300"
            >
              Fale diretamente com a gente
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
