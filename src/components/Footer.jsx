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
              <svg viewBox="0 0 60 60" className="w-10 h-10">
                <defs>
                  <linearGradient id="gradFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#FF6B00' }}/>
                    <stop offset="100%" style={{ stopColor: '#FF3D00' }}/>
                  </linearGradient>
                </defs>
                <path d="M6 51 L21 12 L30 33 L39 12 L54 51 L45 51 L39 36 L30 57 L21 36 L15 51 Z" fill="#F0F0F0"/>
                <path d="M21 12 L25 23 L30 12 Z" fill="url(#gradFooter)"/>
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
