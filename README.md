# Atlas Performance — Landing Page Premium

Projeto desenvolvido pela **Global Landing** como demonstração de portfólio.

## Sobre o Projeto

Atlas Performance é uma landing page premium para um personal trainer, desenvolvida com as mais modernas tecnologias de front-end. O projeto apresenta um design sofisticado em tons de preto e laranja-fogo, transmitindo energia, determinação e profissionalismo.

### Tecnologias Utilizadas

- **React 18** — Biblioteca JavaScript para construção de interfaces
- **Vite 5** — Build tool ultrarrápida para desenvolvimento moderno
- **Tailwind CSS 3** — Framework CSS utilitário para estilização
- **Framer Motion 11** — Biblioteca de animações para React
- **Swiper.js 11** — Carrossel touch moderno
- **Lucide React** — Biblioteca de ícones

## Estrutura do Projeto

```
atlas-performance/
├── public/
│   └── favicon.svg                  # SVG do monograma "AP" estilizado
├── src/
│   ├── assets/
│   │   └── images.js                # Arquivo centralizado com todas as URLs de imagens
│   ├── components/
│   │   ├── Navbar.jsx               # Navegação principal com drawer mobile
│   │   ├── Hero.jsx                 # Seção principal fullscreen
│   │   ├── SobreAtlas.jsx           # História por trás do nome Atlas
│   │   ├── SobreBrendon.jsx         # Bio do personal trainer
│   │   ├── Diferenciais.jsx         # 4 pilares/cards de diferenciais
│   │   ├── Servicos.jsx             # Tabela comparativa de planos
│   │   ├── Resultados.jsx           # Casos de transformação
│   │   ├── Depoimentos.jsx          # Carrossel com 6 depoimentos
│   │   ├── Agendamento.jsx          # Embed Calendly
│   │   ├── FAQ.jsx                  # Perguntas frequentes com accordion
│   │   ├── Contato.jsx              # Formulário de contato premium
│   │   ├── Localizacao.jsx          # Google Maps embed
│   │   ├── Footer.jsx               # Rodapé do site
│   │   └── WhatsAppFloat.jsx        # Botão flutuante WhatsApp
│   ├── hooks/
│   │   └── useScrollAnimation.js    # Hook para animações de scroll
│   ├── styles/
│   │   └── globals.css              # CSS global, variáveis de cor, fontes
│   ├── App.jsx                      # Componente principal
│   └── main.jsx                     # Ponto de entrada da aplicação
├── index.html                       # HTML principal
├── package.json                     # Dependências do projeto
├── vite.config.js                   # Configuração do Vite
├── tailwind.config.js               # Configuração do Tailwind CSS
├── postcss.config.js                # Configuração do PostCSS
├── vercel.json                      # Configuração para deploy no Vercel
└── README.md                        # Este arquivo
```

## Como Rodar Localmente

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/atlas-performance.git

# Entre na pasta do projeto
cd atlas-performance

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: http://localhost:5173

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Cria a build de produção na pasta `dist/` |
| `npm run preview` | Visualiza a build de produção localmente |
| `npm run lint` | Executa o linter no código |

## Como Fazer Build

```bash
# Gera a build otimizada para produção
npm run build

# Os arquivos serão gerados na pasta dist/
```

## Deploy no Vercel

1. Crie um repositório no GitHub e faça push do projeto
2. Acesse [vercel.com](https://vercel.com) e conecte seu repositório
3. Configure as seguintes opções:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Clique em **Deploy**

## Personalização

### Substituição de Imagens

Todas as URLs de imagens estão centralizadas em `src/assets/images.js`. Substitua as URLs do Unsplash pelas imagens reais do cliente.

```javascript
export const IMAGENS = {
  heroBg: "sua-imagem-hero.jpg",
  brendonFoto: "foto-do-brendon.jpg",
  // ...
};
```

### Cores e Identidade Visual

As cores estão definidas em `src/styles/globals.css` como variáveis CSS:

```css
:root {
  --cor-fundo: #0A0A0A;
  --cor-superficie: #111111;
  --cor-acento: #FF6B00;
  --cor-acento-hover: #E55A00;
  /* ... */
}
```

Para alterar a identidade visual, modifique apenas esse arquivo.

### Conteúdo dos Textos

Todo o conteúdo textual está nos componentes React em `src/components/`. Cada seção tem seu próprio arquivo com o conteúdo em português.

## Design System

### Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Fundo | `#0A0A0A` | Background principal |
| Superfície | `#111111` | Cards e elementos elevados |
| Borda | `#1E1E1E` | Bordas sutis |
| Texto | `#F0F0F0` | Texto principal |
| Texto Suave | `#9A9A9A` | Texto secundário |
| Acento | `#FF6B00` | Botões, links, destaques |
| Acento Hover | `#E55A00` | Estado hover do acento |

### Tipografia

| Fonte | Uso |
|-------|-----|
| Bebas Neue | Títulos e headlines |
| Barlow Condensed | Subtítulos e UI elements |
| Barlow | Corpo de texto |

### Breakpoints Responsivos

| Breakpoint | Largura |
|------------|---------|
| Mobile | < 640px |
| Tablet | 640px - 1024px |
| Desktop | > 1024px |

## Performance

- Imagens com lazy loading
- Animações otimizadas com `will-change`
- CSS crítico inline no HTML
- Fontes pré-carregadas
- Código dividido por componentes

## Acessibilidade

- Navegação por teclado funcional
- Estados de foco visíveis
- Contraste de cores adequado
- Atributos ARIA em elementos interativos
- Textos alternativos em imagens

## Aviso

Este projeto é uma demonstração para portfólio da Global Landing. Todos os dados, depoimentos e resultados são fictícios e utilizados exclusivamente para demonstração de habilidades técnicas e de design.

---

Desenvolvido com ❤️ pela **Global Landing** — Agência de Sites Profissionais
