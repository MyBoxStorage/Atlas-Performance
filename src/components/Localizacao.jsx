/**
 * Componente Localizacao - Mapa e Informações de Contato
 * Atlas Performance - Landing Page Premium
 * 
 * Features:
 * - Google Maps embed
 * - Informações de contato (endereço, WhatsApp, email, horário)
 * - Layout 50/50 em desktop
 */

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

// Informações de contato
const informacoes = [
  {
    icone: MapPin,
    titulo: 'Endereço',
    linhas: ['Paraíba do Sul — RJ', 'Endereço completo sob agendamento'],
  },
  {
    icone: Phone,
    titulo: 'WhatsApp',
    linhas: ['+55 24 99999-0000'],
    link: 'https://wa.me/5524999990000',
  },
  {
    icone: Mail,
    titulo: 'E-mail',
    linhas: ['contato@atlasperformance.com.br'],
    link: 'mailto:contato@atlasperformance.com.br',
  },
  {
    icone: Clock,
    titulo: 'Atendimento',
    linhas: ['Segunda a Sábado', '06h às 21h'],
  },
];

export default function Localizacao() {
  const ref = useRef(null);
  const estaNaViewport = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="localizacao" 
      className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF6B00]/5 rounded-full blur-3xl pointer-events-none" />

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
            Localização
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-[#F0F0F0] mb-4 tracking-wide">
            ONDE NOS ENCONTRAR
          </h2>
        </motion.div>

        {/* Grid de conteúdo */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Mapa */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={estaNaViewport ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#1E1E1E] h-[400px] lg:h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14868.123456789!2d-43.3!3d-22.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x97742b6b6b6b6b6b%3A0x1234567890abcdef!2sParaíba%20do%20Sul%2C%20RJ!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Atlas Performance"
                className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
              />
              
              {/* Overlay escuro sutil */}
              <div className="absolute inset-0 bg-[#0A0A0A]/20 pointer-events-none" />
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-[#FF6B00]/5 rounded-3xl blur-xl -z-10" />
          </motion.div>

          {/* Informações de contato */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={estaNaViewport ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6"
          >
            {informacoes.map((info, index) => (
              <motion.div
                key={info.titulo}
                initial={{ opacity: 0, y: 20 }}
                animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group"
              >
                {info.link ? (
                  <a
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 p-6 bg-[#111111] rounded-xl border border-[#1E1E1E] hover:border-[#FF6B00]/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6B00]/20 transition-colors duration-300">
                      <info.icone size={22} className="text-[#FF6B00]" />
                    </div>
                    <div>
                      <h3 className="font-barlow-condensed font-semibold text-lg text-[#F0F0F0] mb-1 group-hover:text-[#FF6B00] transition-colors duration-300">
                        {info.titulo}
                      </h3>
                      {info.linhas.map((linha, i) => (
                        <p key={i} className="font-barlow text-sm text-[#9A9A9A]">
                          {linha}
                        </p>
                      ))}
                    </div>
                  </a>
                ) : (
                  <div className="flex items-start gap-4 p-6 bg-[#111111] rounded-xl border border-[#1E1E1E]">
                    <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center flex-shrink-0">
                      <info.icone size={22} className="text-[#FF6B00]" />
                    </div>
                    <div>
                      <h3 className="font-barlow-condensed font-semibold text-lg text-[#F0F0F0] mb-1">
                        {info.titulo}
                      </h3>
                      {info.linhas.map((linha, i) => (
                        <p key={i} className="font-barlow text-sm text-[#9A9A9A]">
                          {linha}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* CTA para WhatsApp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="pt-4"
            >
              <a
                href="https://wa.me/5524999990000?text=Olá,%20Brendon!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20planos%20da%20Atlas%20Performance.%20Pode%20me%20ajudar?"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-[#FF6B00] text-white rounded-xl font-barlow-condensed font-semibold text-base hover:bg-[#E55A00] transition-colors duration-300"
              >
                <Phone size={20} />
                Falar no WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
