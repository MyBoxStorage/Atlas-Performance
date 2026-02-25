/**
 * Componente Contato - Formulário de Contato Premium
 * Atlas Performance - Landing Page Premium
 * 
 * Features:
 * - Campos de formulário com validação
 * - Selects para objetivo e modalidade
 * - Design premium com estados de foco
 * - Disclaimer de demonstração
 */

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, User, Mail, Phone, Target, MessageSquare, AlertTriangle } from 'lucide-react';

// Opções para os selects
const objetivos = [
  { valor: '', label: 'Selecione seu objetivo' },
  { valor: 'emagrecimento', label: 'Emagrecimento' },
  { valor: 'hipertrofia', label: 'Hipertrofia' },
  { valor: 'performance', label: 'Performance' },
  { valor: 'qualidade-vida', label: 'Qualidade de Vida' },
  { valor: 'outro', label: 'Outro' },
];

const modalidades = [
  { valor: '', label: 'Selecione a modalidade' },
  { valor: 'presencial', label: 'Presencial' },
  { valor: 'online', label: 'Online' },
  { valor: 'premium', label: 'Consultoria Premium' },
  { valor: 'nao-sei', label: 'Ainda não sei' },
];

export default function Contato() {
  const ref = useRef(null);
  const estaNaViewport = useInView(ref, { once: true, margin: "-100px" });
  
  // Estado do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    objetivo: '',
    modalidade: '',
    mensagem: '',
  });

  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);
    
    // Simulação de envio (formulário de demonstração)
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        objetivo: '',
        modalidade: '',
        mensagem: '',
      });
      
      // Reset da mensagem de sucesso após 5 segundos
      setTimeout(() => setEnviado(false), 5000);
    }, 1500);
  };

  return (
    <section 
      id="contato" 
      className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6B00]/5 rounded-full blur-3xl pointer-events-none translate-x-1/2" />

      <div className="container-atlas relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header da seção */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-12"
          >
            <span className="font-barlow-condensed font-semibold text-sm text-[#FF6B00] tracking-widest uppercase mb-4 block">
              Contato
            </span>
            <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-[#F0F0F0] mb-4 tracking-wide">
              FALE COM A GENTE
            </h2>
            <p className="font-barlow text-lg text-[#9A9A9A]">
              Tire suas dúvidas ou dê o primeiro passo para a sua transformação.
            </p>
          </motion.div>

          {/* Formulário */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative bg-[#111111] rounded-2xl border border-[#1E1E1E] p-6 sm:p-10"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-[#FF6B00]/5 rounded-3xl blur-xl -z-10" />

            {/* Mensagem de sucesso */}
            {enviado && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
              >
                <p className="font-barlow text-sm text-green-400 text-center">
                  Mensagem enviada com sucesso! Entraremos em contato em breve.
                </p>
              </motion.div>
            )}

            <div className="space-y-6">
              {/* Nome Completo */}
              <div>
                <label htmlFor="nome" className="block font-barlow text-sm text-[#9A9A9A] mb-2">
                  Nome Completo <span className="text-[#FF6B00]">*</span>
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9A9A]" />
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    placeholder="Digite seu nome completo"
                    className="w-full pl-12 pr-4 py-4 bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg font-barlow text-[#F0F0F0] placeholder:text-[#5A5A5A] focus:border-[#FF6B00] focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Email e Telefone */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block font-barlow text-sm text-[#9A9A9A] mb-2">
                    E-mail <span className="text-[#FF6B00]">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9A9A]" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="seu@email.com"
                      className="w-full pl-12 pr-4 py-4 bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg font-barlow text-[#F0F0F0] placeholder:text-[#5A5A5A] focus:border-[#FF6B00] focus:outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="telefone" className="block font-barlow text-sm text-[#9A9A9A] mb-2">
                    Telefone / WhatsApp <span className="text-[#FF6B00]">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9A9A]" />
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                      placeholder="(00) 00000-0000"
                      className="w-full pl-12 pr-4 py-4 bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg font-barlow text-[#F0F0F0] placeholder:text-[#5A5A5A] focus:border-[#FF6B00] focus:outline-none transition-colors duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Objetivo e Modalidade */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="objetivo" className="block font-barlow text-sm text-[#9A9A9A] mb-2">
                    <Target size={16} className="inline mr-2" />
                    Objetivo Principal
                  </label>
                  <select
                    id="objetivo"
                    name="objetivo"
                    value={formData.objetivo}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg font-barlow text-[#F0F0F0] focus:border-[#FF6B00] focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                  >
                    {objetivos.map(obj => (
                      <option key={obj.valor} value={obj.valor}>{obj.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="modalidade" className="block font-barlow text-sm text-[#9A9A9A] mb-2">
                    <MessageSquare size={16} className="inline mr-2" />
                    Modalidade de Interesse
                  </label>
                  <select
                    id="modalidade"
                    name="modalidade"
                    value={formData.modalidade}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg font-barlow text-[#F0F0F0] focus:border-[#FF6B00] focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                  >
                    {modalidades.map(mod => (
                      <option key={mod.valor} value={mod.valor}>{mod.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mensagem */}
              <div>
                <label htmlFor="mensagem" className="block font-barlow text-sm text-[#9A9A9A] mb-2">
                  Mensagem <span className="text-[#5A5A5A]">(opcional)</span>
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Conte um pouco sobre você, seus objetivos ou dúvidas..."
                  className="w-full px-4 py-4 bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg font-barlow text-[#F0F0F0] placeholder:text-[#5A5A5A] focus:border-[#FF6B00] focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>

              {/* Botão de envio */}
              <button
                type="submit"
                disabled={enviando}
                className="w-full py-4 bg-gradient-to-r from-[#FF6B00] to-[#FF3D00] text-white rounded-lg font-barlow-condensed font-semibold text-base hover:shadow-glow-laranja transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {enviando ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Enviar Mensagem
                  </>
                )}
              </button>

              {/* Disclaimer de demonstração */}
              <div className="flex items-start gap-2 pt-4 border-t border-[#1E1E1E]">
                <AlertTriangle size={16} className="text-[#9A9A9A] mt-0.5 flex-shrink-0" />
                <p className="font-barlow text-xs text-[#9A9A9A] italic">
                  Este formulário é uma demonstração para fins de portfólio — Global Landing.
                  Nenhum dado é coletado ou armazenado. Para contato real, utilize o WhatsApp.
                </p>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
