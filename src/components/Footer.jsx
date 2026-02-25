/**
 * Componente Footer - Rodapé do site
 * Atlas Performance - Landing Page Premium
 * 
 * Features:
 * - 4 colunas com logo, navegação, redes sociais e contato
 * - Disclaimer de portfólio
 * - Links funcionais para seções
 */

import { motion } from 'framer-motion';
import { Instagram, Youtube, Linkedin, Phone, Mail } from 'lucide-react';

// Links de navegação
const linksNavegacao = [
  { nome: 'Início', href: '#inicio' },
  { nome: 'Sobre', href: '#sobre' },
  { nome: 'Método', href: '#metodo' },
  { nome: 'Serviços', href: '#servicos' },
  { nome: 'Resultados', href: '#resultados' },
  { nome: 'Depoimentos', href: '#depoimentos' },
  { nome: 'FAQ', href: '#faq' },
  { nome: 'Contato', href: '#contato' },
];

// Redes sociais
const redesSociais = [
  { nome: 'Instagram', icone: Instagram, handle: '@atlasperformance', link: '#' },
  { nome: 'YouTube', icone: Youtube, handle: 'Atlas Performance', link: '#' },
  { nome: 'LinkedIn', icone: Linkedin, handle: 'Brendon Sete', link: '#' },
];

export default function Footer() {
  const scrollParaSecao = (href) => {
    const elemento = document.querySelector(href);
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const anoAtual = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-[#1E1E1E]">
      {/* Conteúdo principal do footer */}
      <div className="container-atlas py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Coluna 1 - Logo e tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            {/* Logo */}
            <a href="#inicio" onClick={(e) => { e.preventDefault(); scrollParaSecao('#inicio'); }} className="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 56 40" className="w-14 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="g1Footer" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B00"/>
                    <stop offset="100%" stopColor="#CC4400"/>
                  </linearGradient>
                </defs>
                {/* Letra A — triângulo limpo com barra */}
                <path d="M2 38 L14 4 L20 4 L32 38 L26 38 L21.5 25 L12.5 25 L8 38 Z" fill="#FFFFFF"/>
                <path d="M14 20 L20 20 L17 11 Z" fill="#FFFFFF"/>
                <rect x="13" y="22" width="11" height="3" fill="#FFFFFF"/>
                {/* Acento laranja — ponto acima do A */}
                <rect x="15.5" y="1" width="3" height="3" rx="0.5" fill="url(#g1Footer)"/>
                {/* Divisor sutil */}
                <line x1="34" y1="4" x2="34" y2="38" stroke="#FF6B00" strokeWidth="1" strokeOpacity="0.4"/>
                {/* Letra P — traço limpo */}
                <path d="M37 38 L37 4 L48 4 Q56 4 56 14 Q56 24 48 24 L43 24 L43 38 Z" fill="#FFFFFF"/>
                <path d="M43 9 L43 19 L47 19 Q51 19 51 14 Q51 9 47 9 Z" fill="#0A0A0A"/>
              </svg>
              <span className="font-barlow-condensed font-semibold text-lg tracking-wider text-[#F0F0F0]">
                ATLAS PERFORMANCE
              </span>
            </a>
            
            <p className="font-barlow text-sm text-[#9A9A9A] mb-6">
              Forje a Versão Mais Forte de Você.
            </p>
            
            <p className="font-barlow text-xs text-[#5A5A5A]">
              © {anoAtual} Atlas Performance. Todos os direitos reservados.
            </p>
          </motion.div>

          {/* Coluna 2 - Navegação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-barlow-condensed font-semibold text-sm text-[#F0F0F0] uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <nav className="space-y-2">
              {linksNavegacao.map((link) => (
                <a
                  key={link.nome}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollParaSecao(link.href); }}
                  className="block font-barlow text-sm text-[#9A9A9A] hover:text-[#FF6B00] transition-colors duration-300"
                >
                  {link.nome}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Coluna 3 - Redes Sociais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-barlow-condensed font-semibold text-sm text-[#F0F0F0] uppercase tracking-wider mb-4">
              Redes Sociais
            </h4>
            <div className="space-y-3">
              {redesSociais.map((rede) => (
                <a
                  key={rede.nome}
                  href={rede.link}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1E1E1E] flex items-center justify-center group-hover:bg-[#FF6B00]/20 transition-colors duration-300">
                    <rede.icone size={16} className="text-[#9A9A9A] group-hover:text-[#FF6B00] transition-colors duration-300" />
                  </div>
                  <div>
                    <span className="block font-barlow text-sm text-[#F0F0F0] group-hover:text-[#FF6B00] transition-colors duration-300">
                      {rede.nome}
                    </span>
                    <span className="block font-barlow text-xs text-[#5A5A5A]">
                      {rede.handle}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Coluna 4 - Contato Rápido */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-barlow-condensed font-semibold text-sm text-[#F0F0F0] uppercase tracking-wider mb-4">
              Contato Rápido
            </h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/5524999990000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#1E1E1E] flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors duration-300">
                  <Phone size={16} className="text-[#9A9A9A] group-hover:text-[#25D366] transition-colors duration-300" />
                </div>
                <span className="font-barlow text-sm text-[#9A9A9A] group-hover:text-[#F0F0F0] transition-colors duration-300">
                  +55 24 99999-0000
                </span>
              </a>
              
              <a
                href="mailto:contato@atlasperformance.com.br"
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#1E1E1E] flex items-center justify-center group-hover:bg-[#FF6B00]/20 transition-colors duration-300">
                  <Mail size={16} className="text-[#9A9A9A] group-hover:text-[#FF6B00] transition-colors duration-300" />
                </div>
                <span className="font-barlow text-sm text-[#9A9A9A] group-hover:text-[#F0F0F0] transition-colors duration-300">
                  contato@atlasperformance.com.br
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Rodapé inferior - Disclaimer */}
      <div className="border-t border-[#1E1E1E]">
        <div className="container-atlas py-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-barlow text-xs text-[#5A5A5A] text-center"
          >
            Esta é uma versão demonstrativa desenvolvida pela Global Landing para fins de portfólio.
            Todos os dados, depoimentos e resultados são fictícios e utilizados exclusivamente para demonstração.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
