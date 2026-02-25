/**
 * Componente Navbar - Navegação principal
 * Atlas Performance - Landing Page Premium
 * 
 * Features:
 * - Navbar transparente no topo, fundo sólido com blur ao scroll
 * - Links de navegação suaves
 * - Menu hamburger para mobile com drawer lateral
 * - CTA "Verificar Disponibilidade"
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// Links de navegação
const linksNavegacao = [
  { nome: 'Início', href: '#inicio' },
  { nome: 'Sobre', href: '#sobre' },
  { nome: 'Serviços', href: '#servicos' },
  { nome: 'Resultados', href: '#resultados' },
  { nome: 'Depoimentos', href: '#depoimentos' },
  { nome: 'Contato', href: '#contato' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  // Detecta scroll para mudar aparência da navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Previne scroll do body quando menu mobile está aberto
  useEffect(() => {
    if (menuAberto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuAberto]);

  const scrollParaSecao = (href) => {
    setMenuAberto(false);
    const elemento = document.querySelector(href);
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-[#0F0F0F]/95 backdrop-blur-xl shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container-atlas">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a 
              href="#inicio" 
              onClick={(e) => { e.preventDefault(); scrollParaSecao('#inicio'); }}
              className="flex items-center gap-3 group"
            >
              {/* Monograma AP SVG */}
              <svg viewBox="0 0 56 40" className="w-14 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B00"/>
                    <stop offset="100%" stopColor="#CC4400"/>
                  </linearGradient>
                </defs>
                {/* Letra A — triângulo limpo com barra */}
                <path d="M2 38 L14 4 L20 4 L32 38 L26 38 L21.5 25 L12.5 25 L8 38 Z" fill="#FFFFFF"/>
                <path d="M14 20 L20 20 L17 11 Z" fill="#FFFFFF"/>
                <rect x="13" y="22" width="11" height="3" fill="#FFFFFF"/>
                {/* Acento laranja — ponto acima do A */}
                <rect x="15.5" y="1" width="3" height="3" rx="0.5" fill="url(#g1)"/>
                {/* Divisor sutil */}
                <line x1="34" y1="4" x2="34" y2="38" stroke="#FF6B00" strokeWidth="1" strokeOpacity="0.4"/>
                {/* Letra P — traço limpo */}
                <path d="M37 38 L37 4 L48 4 Q56 4 56 14 Q56 24 48 24 L43 24 L43 38 Z" fill="#FFFFFF"/>
                <path d="M43 9 L43 19 L47 19 Q51 19 51 14 Q51 9 47 9 Z" fill="#0A0A0A"/>
              </svg>
              <span className="font-barlow-condensed font-semibold text-lg tracking-wider text-[#F0F0F0] hidden sm:block">
                ATLAS PERFORMANCE
              </span>
            </a>

            {/* Links de navegação - Desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {linksNavegacao.map((link) => (
                <a
                  key={link.nome}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollParaSecao(link.href); }}
                  className="font-barlow text-sm text-[#9A9A9A] hover:text-[#FF6B00] transition-colors duration-300 relative group"
                >
                  {link.nome}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF6B00] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <a
              href="#agendamento"
              onClick={(e) => { e.preventDefault(); scrollParaSecao('#agendamento'); }}
              className="hidden lg:block font-barlow-condensed font-semibold text-sm px-6 py-2.5 bg-gradient-to-r from-[#FF6B00] to-[#FF3D00] text-white rounded-lg hover:shadow-glow-laranja transition-all duration-300 hover:scale-105"
            >
              Verificar Disponibilidade
            </a>

            {/* Menu Hamburger - Mobile */}
            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className="lg:hidden p-2 text-[#F0F0F0] hover:text-[#FF6B00] transition-colors"
              aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            >
              {menuAberto ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Drawer Mobile */}
      <AnimatePresence>
        {menuAberto && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuAberto(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#111111] z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full p-6">
                {/* Header do drawer */}
                <div className="flex items-center justify-between mb-10">
                  <span className="font-barlow-condensed font-semibold text-lg text-[#F0F0F0]">
                    MENU
                  </span>
                  <button
                    onClick={() => setMenuAberto(false)}
                    className="p-2 text-[#9A9A9A] hover:text-[#FF6B00] transition-colors"
                    aria-label="Fechar menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Links de navegação */}
                <nav className="flex flex-col gap-4 flex-1">
                  {linksNavegacao.map((link, index) => (
                    <motion.a
                      key={link.nome}
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollParaSecao(link.href); }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="font-barlow text-lg text-[#9A9A9A] hover:text-[#FF6B00] transition-colors duration-300 py-2 border-b border-[#1E1E1E]"
                    >
                      {link.nome}
                    </motion.a>
                  ))}
                </nav>

                {/* CTA no footer do drawer */}
                <motion.a
                  href="#agendamento"
                  onClick={(e) => { e.preventDefault(); scrollParaSecao('#agendamento'); }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="font-barlow-condensed font-semibold text-center px-6 py-3 bg-gradient-to-r from-[#FF6B00] to-[#FF3D00] text-white rounded-lg hover:shadow-glow-laranja transition-all duration-300 mt-6"
                >
                  Verificar Disponibilidade
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
