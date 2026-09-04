# Segurança do Launch

Autenticação é feita pelo Supabase Auth. Toda leitura e escrita do Studio é autorizada novamente no servidor e pelas políticas RLS; ids enviados pelo navegador não concedem acesso a outro tenant. Sites públicos só leem registros publicados.

O renderer não aceita HTML ou JavaScript arbitrários. Slugs são normalizados e comparados a uma lista reservada. Campos têm limites no cliente, API e banco. O formulário usa honeypot, validação Zod e só aceita `site_id` publicado. Antes da produção, habilite CAPTCHA e rate limiting no WAF/Vercel para `/api/launch/leads` e endpoints de autenticação.

Uploads ficam no bucket público `site-assets`: até 5 MB e somente JPEG, PNG ou WebP. O caminho começa pelo UUID do proprietário, a UI registra o asset no site correspondente e as políticas de Storage impedem escrita ou exclusão cruzada. Nunca habilitar SVG, HTML ou executáveis. Compressão e recorte opcionais permanecem fora do MVP.

Para moderação, `status=suspended` torna o site invisível. Logs de funções e Auth devem ser retidos para investigação, sem registrar conteúdo sensível dos leads.
