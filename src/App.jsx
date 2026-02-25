/**
 * App.jsx - Componente principal da aplicação
 * Atlas Performance - Landing Page Premium
 * 
 * Estrutura:
 * - Navbar fixa no topo
 * - Seções em ordem: Hero, SobreAtlas, SobreBrendon, Diferenciais, Servicos, Resultados, Depoimentos, Agendamento, FAQ, Contato, Localizacao
 * - Footer
 * - Botão flutuante do WhatsApp
 */

import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SobreAtlas from './components/SobreAtlas';
import SobreBrendon from './components/SobreBrendon';
import Diferenciais from './components/Diferenciais';
import Servicos from './components/Servicos';
import Resultados from './components/Resultados';
import Depoimentos from './components/Depoimentos';
import Agendamento from './components/Agendamento';
import FAQ from './components/FAQ';
import Contato from './components/Contato';
import Localizacao from './components/Localizacao';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

// Importação dos estilos globais
import './styles/globals.css';

function App() {
  // Efeito para garantir que a página inicie no topo
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0F0F0]">
      {/* Navegação fixa */}
      <Navbar />
      
      {/* Conteúdo principal */}
      <main>
        {/* Seção Hero - Tela cheia com headline e CTAs */}
        <Hero />
        
        {/* Seção Sobre Atlas - A história por trás do nome */}
        <SobreAtlas />
        
        {/* Seção Sobre Brendon - Bio do personal trainer */}
        <SobreBrendon />
        
        {/* Seção Diferenciais - Os 4 pilares do método */}
        <Diferenciais />
        
        {/* Seção Serviços - Tabela comparativa de planos */}
        <Servicos />
        
        {/* Seção Resultados - Casos de transformação */}
        <Resultados />
        
        {/* Seção Depoimentos - Carrossel de depoimentos */}
        <Depoimentos />
        
        {/* Seção Agendamento - Embed do Calendly */}
        <Agendamento />
        
        {/* Seção FAQ - Perguntas frequentes */}
        <FAQ />
        
        {/* Seção Contato - Formulário de contato */}
        <Contato />
        
        {/* Seção Localização - Mapa e informações */}
        <Localizacao />
      </main>
      
      {/* Rodapé */}
      <Footer />
      
      {/* Botão flutuante do WhatsApp */}
      <WhatsAppFloat />
    </div>
  );
}

export default App;
