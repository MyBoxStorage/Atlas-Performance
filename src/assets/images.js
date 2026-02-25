/**
 * Atlas Performance - Arquivo Centralizado de Imagens
 * Todas as URLs do Unsplash usadas no projeto
 * Facilita a substituição futura por imagens reais do cliente
 */

export const IMAGENS = {
  // Imagem de fundo do Hero - treino intenso em P&B
  heroBg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80&auto=format&fit=crop",
  
  // Foto do personal trainer Brendon Sete
  brendonFoto: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800&q=80&auto=format&fit=crop",
  
  // Imagens de resultados / antes e depois (fotos genéricas de fitness)
  resultados: [
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=600&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80&auto=format&fit=crop",
  ],
  
  // Avatares para depoimentos (rostos neutros do Unsplash)
  depoimentos: [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop",
  ],
  
  // Imagem de fundo para seção Sobre Atlas (silhueta/figura musculosa)
  sobreAtlasBg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&auto=format&fit=crop",
  
  // Imagens de treino para cards de serviços
  treinoPresencial: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&auto=format&fit=crop",
  treinoOnline: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80&auto=format&fit=crop",
  consultoriaPremium: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop",
};

// Exportação individual para facilitar importações
export const { heroBg, brendonFoto, resultados, depoimentos } = IMAGENS;
