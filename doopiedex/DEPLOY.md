# Deploy no Render

Este guia descreve como fazer deploy do Doopiedéx no Render.

## Pré-requisitos

- Conta no [Render.com](https://render.com)
- Repositório Git (GitHub, GitLab ou Bitbucket) com o código commitado
- Arquivos de dados commitados no repositório:
  - `data/doopies_metadata.json`
  - `data/rarity-data.json`
  - `data/featured-images-mapping.json`

## Método 1: Deploy via Dashboard (Recomendado)

### Passo 1: Preparar o Repositório

1. Certifique-se de que todos os arquivos estão commitados:
```bash
git add .
git commit -m "Prepare for Render deployment"
git push
```

### Passo 2: Criar Serviço no Render

1. Acesse [dashboard.render.com](https://dashboard.render.com)
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu repositório (GitHub/GitLab/Bitbucket)
4. Selecione o repositório `doopiedex`

### Passo 3: Configurar o Serviço

Use as seguintes configurações:

- **Name**: `doopiedex` (ou o nome que preferir)
- **Environment**: `Node`
- **Region**: Escolha a região mais próxima dos usuários
- **Branch**: `main` (ou sua branch principal)
- **Root Directory**: Deixe em branco (raiz do projeto)
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Plan**: `Free` (ou outro conforme necessário)

### Passo 4: Variáveis de Ambiente

Adicione as seguintes variáveis de ambiente (se necessário):

- `NODE_ENV` = `production`

Se você usar API keys (ex: Helius API), adicione também:
- `HELIUS_API_KEY` = `sua-chave-aqui` (se necessário)

### Passo 5: Deploy

1. Clique em **"Create Web Service"**
2. Aguarde o build e deploy (pode levar alguns minutos na primeira vez)
3. Quando concluído, você receberá uma URL: `https://doopiedex.onrender.com`

## Método 2: Deploy via Blueprint (render.yaml)

Se você usar o arquivo `render.yaml` incluído no projeto:

1. No dashboard do Render, clique em **"New +"** → **"Blueprint"**
2. Selecione o repositório
3. O Render detectará automaticamente o arquivo `render.yaml` e criará o serviço

## Verificações Pós-Deploy

Após o deploy, verifique:

- ✅ O site está acessível pela URL fornecida
- ✅ As imagens dos Doopies estão carregando corretamente
- ✅ Os filtros estão funcionando
- ✅ A navegação entre evoluções está funcionando
- ✅ O Rarity Calculator está funcionando

## Troubleshooting

### Build falha por timeout

Se o build falhar por timeout (comum com arquivos JSON grandes):

1. Verifique se `output: 'standalone'` está configurado no `next.config.ts` (já está configurado)
2. Considere usar um plano pago que tem mais tempo de build
3. Ou otimize os arquivos JSON (comprimir, dividir, etc.)

### Erro de memória durante build

Se houver erro de memória:

1. O plano Free tem limites de memória
2. Considere fazer upgrade para um plano pago
3. Ou otimize o código reduzindo o uso de memória durante build

### Imagens não carregam

Se as imagens externas não carregarem:

1. Verifique se `next.config.ts` tem `remotePatterns` configurado (já está)
2. Verifique os logs do Render para erros de CORS
3. Algumas URLs podem precisar de configuração adicional

### Site funciona mas dados não aparecem

Se o site carrega mas não mostra os Doopies:

1. Verifique se os arquivos JSON estão commitados no repositório
2. Verifique os logs do Render para erros ao ler arquivos
3. Verifique se o caminho dos arquivos está correto (`data/doopies_metadata.json`)

## Atualizações

Para atualizar o site após mudanças:

1. Faça commit e push das mudanças
2. O Render detectará automaticamente e fará um novo deploy
3. Ou vá no dashboard e clique em **"Manual Deploy"** → **"Deploy latest commit"**

## Domínio Customizado

Para usar um domínio próprio:

1. No dashboard do Render, vá em **"Settings"** → **"Custom Domains"**
2. Adicione seu domínio
3. Configure os DNS conforme instruções do Render

## Suporte

Para problemas específicos do Render, consulte a [documentação oficial](https://render.com/docs).

