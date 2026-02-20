# Doopiedéx

A Pokédex-style interface for the Doopies NFT collection on the Solana blockchain. Browse through all 8,888+ unique Doopies NFTs organized by Species and Evolution stages, with advanced color harmony-based visual ordering.

## Features

- 🎨 **Pokédex-Style Interface**: Retro design inspired by classic Pokémon Pokédex
- 🔍 **Search & Filter**: Search by ID or Species name, filter by Background (20 types), Body (14 types), or Evolution stage (1-4)
- 🌈 **Color Harmony Ordering**: Advanced RGB/HSL complementarity algorithm for visually pleasing organization
- 📱 **Mobile Responsive**: Fully optimized for mobile devices with collapsible sidebar
- ⚡ **Performance Optimized**: Static generation, lazy loading, and optimized images
- 📊 **Complete Species Data**: All 54 species with rarity scores and total counts
- 🎨 **Real Traits**: 20 Background traits and 14 Body traits based on actual collection data

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Press Start 2P (Google Fonts) for retro feel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd doopiedex
```

2. Install dependencies:
```bash
npm install
```

3. Add Doopies data:
   - Place your organized Doopies data in `data/doopies.json`
   - Or use the example data: `data/doopies.example.json`
   - The data should follow the `OrganizedDoopies` structure (see `types/doopie.ts`)

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Data Collection

### Fetching Doopies NFT Data

To fetch real Doopies NFT data from public APIs:

1. Update the collection slug in `scripts/fetch-doopies-data.ts` if needed
2. Run the fetch script:
```bash
npm run fetch-data
```

This will fetch data from Magic Eden or Tensor public APIs and save to `data/raw-doopies.json`.

### Organizing Data

After fetching data, organize it by Species and Evolution with color harmony ordering:

```bash
npm run organize-data
```

This will:
- Group NFTs by Species
- Subgroup by Evolution stages (1-4)
- Sort each evolution group by color harmony score
- Save organized data to `data/doopies.json`

## Project Structure

```
doopiedex/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page (Server Component)
│   └── DoopiedexClient.tsx # Client component with state management
├── components/
│   ├── PokedexFrame.tsx    # Main Pokédex frame container
│   ├── DoopieDisplay.tsx   # Doopie image and info display
│   ├── SpeciesSidebar.tsx  # Species navigation sidebar
│   ├── NavigationButtons.tsx # Previous/Next buttons
│   ├── SearchBar.tsx       # Search functionality
│   └── FilterPanel.tsx     # Trait filtering
├── data/
│   ├── doopies.json        # Organized Doopies data (generated)
│   └── doopies.example.json # Example data structure
├── scripts/
│   ├── fetch-doopies-data.ts # Data fetching script
│   └── organize-doopies.ts   # Data organization script
├── types/
│   └── doopie.ts           # TypeScript type definitions
└── utils/
    ├── colorHarmony.ts     # Color harmony algorithm
    ├── dataHelpers.ts      # Data manipulation helpers
    └── loadData.ts         # Data loading utility
```

## Color Harmony Algorithm

The application uses an advanced color harmony algorithm to order Doopies within each evolution group:

1. **Priority 1**: Yellow Background + Blue Body (score: 1000)
2. **Priority 2**: Blue Background + Pink Body (score: 900)
3. **Priority 3**: RGB/HSL complementarity score (0-800)
   - Converts trait colors to HSL
   - Calculates color wheel complementarity (180° = perfect complement)
   - Considers saturation and lightness similarity

## Deployment

### Render (Configured)

The project is configured for deployment on Render. See [DEPLOY.md](./DEPLOY.md) for detailed instructions.

**Quick Deploy:**
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository in Render dashboard
3. Select "New Web Service"
4. Use the configuration from `render.yaml` or:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. Deploy!

The app will automatically build and deploy on every push to the main branch.

### Environment Variables

No environment variables required for basic functionality. If you use Helius API, add `HELIUS_API_KEY` in Render's environment variables section.

### Vercel (Alternative)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure build settings (default Next.js settings should work)
4. Deploy!

## Contributing

This is a development project. Feel free to fork and customize for your needs.

## License

MIT License - feel free to use this project for your NFT collection browser.

## Collection Data

- **Species**: 54 unique species (Elk, Zebo, QB, Cory, Ghiddo, etc.)
- **Background Traits**: 20 types (Deep Space, Purple Sky, Yellow, Blue, etc.)
- **Body Traits**: 14 types (Heaven, Hell, Gold, Pink, Blue, Zebra, etc.)
- **Evolution Stages**: 1-4 (some species max at 3)
- **Total NFTs**: 8,888+ Doopies

## Notes

- All application content is in English
- Development conversations are in Portuguese (BR)
- Data structure assumes Doopies have: Background, Species, Body, Accessories, and Evolution traits
- Missing evolutions are handled gracefully (buttons disabled appropriately)
- Species metadata includes rarity scores and total counts from the official guide
