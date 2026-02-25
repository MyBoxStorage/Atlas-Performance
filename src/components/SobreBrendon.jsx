/**
 * Componente SobreBrendon - Sobre o Personal Trainer
 * Atlas Performance - Landing Page Premium
 * 
 * Features:
 * - Bio completa do Brendon Sete
 * - Foto profissional com efeito visual
 * - Lista de credenciais com ícones
 * - Citação destacada
 */

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, GraduationCap, BookOpen, Users, Star, Apple } from 'lucide-react';
import { IMAGENS } from '../assets/images';

// Credenciais do Brendon
const credenciais = [
  { icone: Award, texto: 'CREF Ativo — Conselho Regional de Educação Física — RJ' },
  { icone: GraduationCap, texto: 'Pós-Graduação em Fisiologia do Exercício — UNIFESO' },
  { icone: BookOpen, texto: 'Especialização em Biomecânica Aplicada ao Treinamento' },
  { icone: Star, texto: 'Certificação Internacional NASM-CPT (National Academy of Sports Medicine)' },
  { icone: Apple, texto: 'Formação em Nutrição Esportiva Aplicada — módulo complementar' },
  { icone: Users, texto: '+200 alunos atendidos presencialmente e online' },
];

export default function SobreBrendon() {
  const ref = useRef(null);
  const estaNaViewport = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <section 
      id="sobre" 
      className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Elemento decorativo */}
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 -translate-x-1/2 bg-[#FF6B00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-atlas relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Conteúdo textual */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -60 }}
            animate={estaNaViewport ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-2 lg:order-1"
          >
            {/* Subtítulo */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-barlow-condensed font-semibold text-sm text-[#FF6B00] tracking-widest uppercase mb-4 block"
            >
              Quem está por trás
            </motion.span>
            
            {/* Nome */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-[#F0F0F0] mb-2 tracking-wide"
            >
              BRENDON SETE
            </motion.h2>

            {/* Título profissional */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="font-barlow-condensed font-semibold text-xl text-[#9A9A9A] mb-8"
            >
              Personal Trainer & Coach de Performance
            </motion.p>

            {/* Bio */}
            <div className="space-y-4 font-barlow text-base text-[#9A9A9A] leading-relaxed mb-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Aos 17 anos, Brendon Sete entrou pela primeira vez em uma academia sem saber o que estava
                procurando. Saiu de lá sabendo exatamente quem queria se tornar.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Após mais de 8 anos de prática, formação em Educação Física pelo CREF-RJ, pós-graduação em
                Fisiologia do Exercício e Certificação Internacional NASM-CPT, Brendon construiu um método que
                une ciência, disciplina e individualidade.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Hoje, à frente da Atlas Performance, ele treina alunos presencialmente em Paraíba do Sul e
                atende clientes em todo o Brasil pelo coaching online. Seu compromisso é simples: resultados
                reais, sem atalhos, sem promessas vazias.
              </motion.p>
            </div>

            {/* Citação */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="relative pl-6 border-l-4 border-[#FF6B00] mb-10"
            >
              <p className="font-barlow text-xl text-[#F0F0F0] italic">
                "Eu não vendo treino. Eu entrego transformação."
              </p>
            </motion.blockquote>

            {/* Credenciais */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <h3 className="font-barlow-condensed font-semibold text-lg text-[#F0F0F0] mb-4">
                Credenciais & Formação
              </h3>
              <ul className="space-y-3">
                {credenciais.map((credencial, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={estaNaViewport ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-[#FF6B00] mt-0.5 flex-shrink-0">
                      <credencial.icone size={18} />
                    </span>
                    <span className="font-barlow text-sm text-[#9A9A9A]">
                      {credencial.texto}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Foto do Brendon */}
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={estaNaViewport ? { opacity: 1, x: 0 } : { opacity: 0, x: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-1 lg:order-2 relative min-h-[400px]"
          >
            <div className="relative">
              {/* Efeito de borda laranja */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#FF6B00]/30 to-transparent rounded-2xl blur-xl" />
              
              {/* Container da imagem com recorte diagonal */}
              <div className="relative overflow-hidden rounded-2xl bg-[#1a1a1a] h-full">
                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10 opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00]/10 to-transparent z-10" />
                
                <img
                  src={IMAGENS.brendonFoto}
                  alt="Brendon Sete - Personal Trainer"
                  loading="eager"
                  className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Badge de experiência flutuante */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={estaNaViewport ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute -bottom-6 -left-6 glass px-6 py-4 rounded-xl border border-[#1E1E1E] z-20"
              >
                <div className="font-bebas text-4xl text-[#FF6B00]">8+</div>
                <div className="font-barlow text-sm text-[#9A9A9A]">Anos de Experiência</div>
              </motion.div>

              {/* Badge de certificação flutuante */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={estaNaViewport ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="absolute -top-4 -right-4 glass px-4 py-3 rounded-xl border border-[#1E1E1E] z-20"
              >
                <div className="flex items-center gap-2">
                  <Star className="text-[#FF6B00]" size={20} />
                  <span className="font-barlow-condensed font-semibold text-sm text-[#F0F0F0]">NASM-CPT</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
