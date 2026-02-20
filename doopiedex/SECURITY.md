# Security Checklist - Doopiedéx

## ✅ Checklist de Segurança

### Dados Sensíveis
- [x] Todas as API keys em environment variables (`.env.local`)
- [x] Scripts não contêm chaves hardcoded (remover se houver)
- [x] Validação de variáveis obrigatórias no build

### Headers de Segurança
- [x] CSP headers configurados (Content Security Policy)
- [x] X-Frame-Options: DENY
- [x] X-XSS-Protection configurado
- [x] Referrer-Policy configurada
- [x] Permissions-Policy configurada

### Rate Limiting
- [x] Rate limiting implementado no middleware (100 req/min por IP)
- [x] Detecção de bots (opcional, comentado por padrão)
- [x] Throttling de requisições

### Validação e Sanitização
- [x] URLs de imagens validadas e sanitizadas
- [x] Inputs de usuário sanitizados
- [x] Validação de endereços Solana
- [x] Whitelist de domínios para imagens

### Dados Expostos
- [x] Mint addresses podem ser truncados para privacidade
- [x] Owner addresses truncados quando exibidos
- [x] Validação de dados no build (script recomendado)

### Monitoramento
- [ ] Logging de eventos de segurança (implementar conforme necessário)
- [ ] Error tracking integrado (Sentry/LogRocket - opcional)
- [ ] Monitoramento de anomalias (implementar conforme necessário)

### Backup e Recovery
- [ ] Backup automático de dados (configurar conforme necessário)
- [ ] Recovery plan documentado (configurar conforme necessário)

## Notas de Implementação

### Variáveis de Ambiente
Crie um arquivo `.env.local` com suas chaves:
```
HELIUS_API_KEY=your_key_here
```

### Rate Limiting
O rate limiting atual está em memória. Para produção em escala, considere usar:
- Upstash Redis
- Vercel Edge Config
- Cloudflare Workers

### Domínios Permitidos
Atualmente permitidos para imagens:
- `cdn.helius-rpc.com`
- `*.ipfs.io`
- `*.ipfs.w3s.link`
- `*.arweave.net`

Para adicionar novos domínios, edite `utils/imageValidation.ts`.

## Próximos Passos

1. Configurar error tracking (Sentry, LogRocket)
2. Implementar logging de segurança
3. Configurar backup automático
4. Revisar e ajustar rate limits conforme uso real

