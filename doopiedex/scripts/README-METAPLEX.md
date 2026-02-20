# Script de Coleta de Dados - Doopies Collection

## Collection Address
`7ifrcfFwVLBUKCo8smEK44npokR1xK8KHopRV98Moj8f`

## Métodos de Coleta

### Opção 1: Helius API (Recomendado - Mais Rápido)

1. Obtenha uma API key gratuita em: https://helius.xyz
2. Configure a variável de ambiente:
```bash
export HELIUS_API_KEY=sua_api_key_aqui
```

3. Execute o script:
```bash
npm run fetch-metaplex
```

### Opção 2: QuickNode API

Similar ao Helius, mas usando QuickNode endpoints.

### Opção 3: RPC Público (Mais Lento)

O script tentará usar RPCs públicos, mas pode ser muito lento para 8,888+ NFTs.

## Estrutura de Dados Esperada

O script busca NFTs e extrai:
- ID (do nome, ex: "Doopies #1234")
- Image URL
- Traits: Background, Species, Body, Accessories, Evolution
- Mint Address

## Saída

Os dados são salvos em `data/raw-doopies.json`

Em seguida, execute:
```bash
npm run organize-data
```

Para organizar os dados por Species → Evolution com ordenação por harmonia de cores.

## Notas

- O Metaplex SDK está deprecated. Este script usa RPC direto ou APIs dedicadas.
- Para produção, recomenda-se usar Helius ou QuickNode para melhor performance.
- Rate limiting está implementado para evitar sobrecarregar APIs.

