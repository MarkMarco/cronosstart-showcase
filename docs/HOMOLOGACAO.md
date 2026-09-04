# Preparação do ambiente de homologação

## Supabase

1. Crie um projeto Supabase exclusivo para homologação, na mesma major version do Postgres definida em `supabase/config.toml`.
2. Vincule a CLI ao projeto de homologação e aplique, na ordem, as migrations de `supabase/migrations` com `supabase db push`. Não edite migrations já aplicadas.
3. Confirme no histórico remoto as versões `202609020001`, `202609020002` e `202609020003`.
4. Em Authentication > URL Configuration, defina a URL de homologação como Site URL e permita redirects HTTPS para `/studio/auth/callback` e `/es/studio/auth/callback`. As URLs de `return_to` são validadas pelo aplicativo e aceitam somente caminhos internos do Studio.
5. Configure o provedor de e-mail/SMTP de homologação e valide cadastro, confirmação, login, recuperação, refresh de sessão e logout.
6. Confirme o bucket público `site-assets`, limite de 5 MB, MIME types JPEG/PNG/WebP e políticas RLS criadas pelas migrations.
7. Execute `npm run test:rls` com `PUBLIC_SUPABASE_URL` e `PUBLIC_SUPABASE_ANON_KEY` do projeto de homologação. Qualquer acesso A×B é bloqueador.

## Variáveis Vercel

Configure no escopo Preview (homologação), sem versionar valores:

- `PUBLIC_SUPABASE_URL` — URL do projeto Supabase de homologação.
- `PUBLIC_SUPABASE_ANON_KEY` — anon/publishable key do mesmo projeto; nunca use `service_role` no frontend.
- `PUBLIC_WEB3FORMS_ACCESS_KEY` — chave pública do formulário institucional.
- `PUBLIC_GA_MEASUREMENT_ID` — propriedade GA4 de homologação, ou deixe ausente para manter analytics desativado.

O runtime exige Node.js 22.12 ou superior. Não são necessárias credenciais de banco nem `SUPABASE_SERVICE_ROLE_KEY` para o aplicativo.

## SMTP do Supabase Auth

O procedimento operacional completo, os campos a fornecer, as regras de
segurança e a matriz de testes PT-BR/es-VE estão em
[`SMTP_HOMOLOGACAO.md`](./SMTP_HOMOLOGACAO.md).

O SMTP é configurado no projeto Supabase, não nas variáveis públicas do frontend. O responsável pelo ambiente precisa fornecer manualmente:

- host SMTP;
- porta e modo de transporte compatível com o provedor;
- usuário SMTP;
- senha ou token SMTP, armazenado somente como segredo;
- email remetente (`admin_email`);
- nome do remetente (`sender_name`);
- limites de envio adequados ao ambiente;
- domínio remetente com SPF/DKIM/DMARC conforme as instruções do provedor.

Esses dados correspondem a `enabled`, `host`, `port`, `user`, `pass`, `admin_email` e `sender_name` em `[auth.email.smtp]`. Nunca versione o valor de `pass`. O provedor padrão do Supabase pode ser usado apenas para testes limitados e sujeitos às restrições da plataforma; ele não homologa entrega, reputação, confirmação de conta nem recuperação de senha. A homologação de email só termina após receber e usar links reais de confirmação e recuperação em PT-BR e ES.

## Vercel e wildcard

1. Conecte a branch de homologação a um ambiente Preview separado do domínio de produção.
2. Valide primeiro a aplicação no domínio Preview fornecido pela Vercel.
3. Mantenha Deployment Protection em `all_except_custom_domains`. Um callback de email aberto sem uma sessão Vercel autorizada será interceptado pela proteção do Preview. Não crie bypass permanente nem reduza a proteção de Production; conclua esse teste com uma sessão autorizada ou, após autorização de DNS, em um domínio customizado exclusivo de staging.
4. Para testar subdomínios reais, use o hostname de homologação dedicado `*.staging.sites.cronosstart.com.br` somente após ajustar de forma explícita o domínio reconhecido pelo middleware. A configuração atual de produção reconhece `*.sites.cronosstart.com.br`; não aponte esse wildcard durante a homologação.
5. Quando houver autorização para produção, siga `docs/MULTITENANT_DOMAINS.md`: adicione o wildcard ao projeto Vercel, configure DNS e aguarde SSL. Essas ações não fazem parte desta preparação.

## Validação e rollback

Antes de promover, execute `npm ci`, `npm run check`, `npm run build` e `npm run test:rls`. Valide manualmente PT-BR/ES, autenticação, onboarding, editor, uploads, draft, preview, publicação, despublicação, formulário e leads.

Rollback da aplicação: promova novamente o último deployment validado da Vercel. Rollback do banco: migrations aplicadas são forward-only; antes de `db push`, gere backup do projeto de homologação. Em falha, restaure o backup em um projeto isolado ou aplique uma nova migration corretiva revisada — nunca altere nem reverta destrutivamente uma migration já compartilhada. Para retirar sites do ar sem apagar dados, despublique ou suspenda os registros. O rollback de wildcard está documentado em `docs/MULTITENANT_DOMAINS.md`.
