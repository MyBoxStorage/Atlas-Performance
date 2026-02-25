/**
 * Componente Agendamento - Calendário interativo
 * Atlas Performance - Landing Page Premium
 *
 * Features:
 * - Calendário mensal navegável (anterior / próximo)
 * - Dias clicáveis com alguns desabilitados (agenda lotada)
 * - Horários disponíveis ao clicar em dia
 * - Mensagem de confirmação ao selecionar horário
 */

import { useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const HORARIOS = ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'];

// Retorna dias desabilitados do mês (determinístico por ano/mês, simula agenda lotada)
function getDiasDesabilitados(ano, mes) {
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const desabilitados = [];
  for (let d = 1; d <= diasNoMes; d++) {
    const seed = ano * 31 + mes * 31 + d;
    if (seed % 4 === 0 || seed % 7 === 2) desabilitados.push(d);
  }
  return desabilitados;
}

// Retorna o grid de dias do mês (com espaços vazios no início)
function getGridDias(ano, mes) {
  const primeiro = new Date(ano, mes, 1);
  const ultimo = new Date(ano, mes + 1, 0);
  const inicioSemana = primeiro.getDay();
  const totalDias = ultimo.getDate();
  const desabilitados = getDiasDesabilitados(ano, mes);

  const grid = [];
  for (let i = 0; i < inicioSemana; i++) grid.push({ dia: null, disabled: true });
  for (let d = 1; d <= totalDias; d++) {
    grid.push({ dia: d, disabled: desabilitados.includes(d) });
  }
  return grid;
}

export default function Agendamento() {
  const ref = useRef(null);
  const estaNaViewport = useInView(ref, { once: true, margin: "-100px" });

  const [dataExibida, setDataExibida] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [confirmado, setConfirmado] = useState(false);

  const ano = dataExibida.getFullYear();
  const mes = dataExibida.getMonth();
  const gridDias = useMemo(() => getGridDias(ano, mes), [ano, mes]);

  const mesAnterior = () => {
    setDataExibida(new Date(ano, mes - 1, 1));
    setDiaSelecionado(null);
    setHorarioSelecionado(null);
  };

  const proximoMes = () => {
    setDataExibida(new Date(ano, mes + 1, 1));
    setDiaSelecionado(null);
    setHorarioSelecionado(null);
  };

  const handleDiaClick = (dia, disabled) => {
    if (disabled || dia === null) return;
    setDiaSelecionado(dia);
    setHorarioSelecionado(null);
    setConfirmado(false);
  };

  const handleHorarioClick = (horario) => {
    setHorarioSelecionado(horario);
    setConfirmado(true);
  };

  return (
    <section
      id="agendamento"
      className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6B00]/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF6B00]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="container-atlas relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12"
        >
          <span className="font-barlow-condensed font-semibold text-sm text-[#FF6B00] tracking-widest uppercase mb-4 block">
            Agendamento
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-[#F0F0F0] mb-4 tracking-wide">
            AGENDE SUA AVALIAÇÃO GRATUITA
          </h2>
          <p className="font-barlow text-lg text-[#9A9A9A] max-w-2xl mx-auto mb-6">
            Uma conversa de 30 minutos pode mudar o rumo da sua evolução.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={estaNaViewport ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-full"
          >
            <Zap size={16} className="text-[#FF6B00]" />
            <span className="font-barlow text-sm text-[#FF6B00]">
              Vagas limitadas por semana — garanta a sua
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
        >
          <div className="relative bg-[#111111] rounded-2xl border border-[#1E1E1E] overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 bg-[#0A0A0A] border-b border-[#1E1E1E]">
              <div className="w-10 h-10 rounded-full bg-[#FF6B00]/10 flex items-center justify-center">
                <Calendar size={20} className="text-[#FF6B00]" />
              </div>
              <div>
                <h3 className="font-barlow-condensed font-semibold text-[#F0F0F0]">
                  Selecione um horário
                </h3>
                <p className="font-barlow text-xs text-[#9A9A9A]">
                  Avaliação gratuita de 30 minutos
                </p>
              </div>
            </div>

            <div className="p-6 font-barlow">
              {/* Navegação do mês */}
              <div className="flex items-center justify-between mb-6">
                <button
                  type="button"
                  onClick={mesAnterior}
                  className="p-2 rounded-lg border border-[#1E1E1E] text-[#F0F0F0] hover:bg-[#1E1E1E] hover:border-[#FF6B00]/50 transition-colors"
                  aria-label="Mês anterior"
                >
                  <ChevronLeft size={24} />
                </button>
                <span className="font-barlow-condensed font-semibold text-lg text-[#F0F0F0]">
                  {MESES[mes]} {ano}
                </span>
                <button
                  type="button"
                  onClick={proximoMes}
                  className="p-2 rounded-lg border border-[#1E1E1E] text-[#F0F0F0] hover:bg-[#1E1E1E] hover:border-[#FF6B00]/50 transition-colors"
                  aria-label="Próximo mês"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Cabeçalho dos dias da semana */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DIAS_SEMANA.map((dia) => (
                  <div
                    key={dia}
                    className="text-center font-barlow text-xs text-[#9A9A9A] py-1"
                  >
                    {dia}
                  </div>
                ))}
              </div>

              {/* Grid de dias */}
              <div className="grid grid-cols-7 gap-1">
                {gridDias.map((celula, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDiaClick(celula.dia, celula.disabled)}
                    disabled={celula.disabled || celula.dia === null}
                    className={`
                      aspect-square rounded-lg text-sm transition-colors
                      ${celula.dia === null ? 'invisible' : ''}
                      ${celula.disabled ? 'text-[#5A5A5A] cursor-not-allowed bg-[#1E1E1E]/50' : 'text-[#F0F0F0] hover:bg-[#FF6B00]/20 hover:border-[#FF6B00]/50 border border-transparent'}
                      ${diaSelecionado === celula.dia ? 'bg-[#FF6B00]/20 border-[#FF6B00] text-[#FF6B00]' : ''}
                    `}
                  >
                    {celula.dia ?? ''}
                  </button>
                ))}
              </div>

              {/* Horários disponíveis */}
              {diaSelecionado !== null && !confirmado && (
                <div className="mt-6 pt-6 border-t border-[#1E1E1E]">
                  <p className="font-barlow text-sm text-[#9A9A9A] mb-3">
                    Horários disponíveis para dia {diaSelecionado}/{String(mes + 1).padStart(2, '0')}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {HORARIOS.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => handleHorarioClick(h)}
                        className={`px-4 py-2 rounded-lg font-barlow text-sm border transition-colors ${
                          horarioSelecionado === h
                            ? 'bg-[#FF6B00] border-[#FF6B00] text-white'
                            : 'bg-[#1E1E1E] border-[#1E1E1E] text-[#F0F0F0] hover:border-[#FF6B00]/50'
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mensagem de confirmação */}
              {confirmado && (
                <div className="mt-6 p-6 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30">
                  <p className="font-barlow text-[#F0F0F0] text-center leading-relaxed">
                    Horário selecionado! Em breve entraremos em contato para confirmar sua avaliação gratuita.
                  </p>
                  <p className="font-barlow text-sm text-[#FF6B00] text-center mt-2">
                    {diaSelecionado}/{String(mes + 1).padStart(2, '0')} às {horarioSelecionado}
                  </p>
                </div>
              )}
            </div>

            {/* Texto abaixo do calendário */}
            <div className="px-6 pb-6 text-center">
              <span className="font-barlow text-sm text-[#9A9A9A] inline-flex items-center gap-2">
                <Zap size={14} className="text-[#FF6B00]" />
                Vagas limitadas por semana — garanta a sua
              </span>
            </div>
          </div>

          <div className="absolute -inset-4 bg-[#FF6B00]/5 rounded-3xl blur-xl -z-10" />
        </motion.div>

        {/* Informações adicionais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={estaNaViewport ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 grid sm:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-[#111111] rounded-xl border border-[#1E1E1E]">
            <div className="font-bebas text-3xl text-[#FF6B00] mb-2">30min</div>
            <div className="font-barlow text-sm text-[#9A9A9A]">Duração da avaliação</div>
          </div>
          <div className="text-center p-6 bg-[#111111] rounded-xl border border-[#1E1E1E]">
            <div className="font-bebas text-3xl text-[#FF6B00] mb-2">100%</div>
            <div className="font-barlow text-sm text-[#9A9A9A]">Gratuita e sem compromisso</div>
          </div>
          <div className="text-center p-6 bg-[#111111] rounded-xl border border-[#1E1E1E]">
            <div className="font-bebas text-3xl text-[#FF6B00] mb-2">Online</div>
            <div className="font-barlow text-sm text-[#9A9A9A]">Via videochamada</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
