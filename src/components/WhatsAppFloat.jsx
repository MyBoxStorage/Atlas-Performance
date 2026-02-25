/**
 * Componente WhatsAppFloat - Botão flutuante do WhatsApp
 * Atlas Performance - Landing Page Premium
 * 
 * Features:
 * - Botão fixo no canto inferior direito
 * - Efeito de pulso/ping animado
 * - Badge "Online"
 * - Tooltip ao hover
 * - Mensagem pré-preenchida
 */

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function WhatsAppFloat() {
  const [mostrarTooltip, setMostrarTooltip] = useState(false);

  // Mensagem pré-preenchida
  const mensagem = encodeURIComponent(
    "Olá, Brendon! Vim pelo site e gostaria de saber mais sobre os planos da Atlas Performance. Pode me ajudar?"
  );
  const linkWhatsApp = `https://wa.me/5524999990000?text=${mensagem}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ 
          opacity: mostrarTooltip ? 1 : 0, 
          scale: mostrarTooltip ? 1 : 0.8,
          y: mostrarTooltip ? 0 : 10
        }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-full right-0 mb-3 whitespace-nowrap"
      >
        <div className="relative bg-[#111111] text-[#F0F0F0] px-4 py-2 rounded-lg font-barlow text-sm border border-[#1E1E1E] shadow-lg">
          Fale com o Brendon agora
          {/* Seta do tooltip */}
          <div className="absolute top-full right-6 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#111111]" />
        </div>
      </motion.div>

      {/* Botão principal */}
      <motion.a
        href={linkWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setMostrarTooltip(true)}
        onMouseLeave={() => setMostrarTooltip(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 2 
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative block w-16 h-16 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
        aria-label="Falar no WhatsApp"
      >
        {/* Efeito de pulso */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        
        {/* Anel de pulso adicional */}
        <motion.span
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full border-2 border-[#25D366]"
        />

        {/* Ícone do WhatsApp */}
        <svg
          viewBox="0 0 24 24"
          className="absolute inset-0 m-auto w-8 h-8 text-white"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>

        {/* Badge "Online" */}
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#0A0A0A] rounded-full flex items-center justify-center">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        </span>
      </motion.a>
    </div>
  );
}
