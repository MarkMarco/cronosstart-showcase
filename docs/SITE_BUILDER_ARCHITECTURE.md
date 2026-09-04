# CronosStart Launch — arquitetura

## Estado encontrado

O repositório usa Astro 7, TypeScript strict e Tailwind 4. As páginas institucionais e demonstrações são estáticas, com rotas PT-BR e equivalentes em `/es`, tradução centralizada em `src/i18n`, SEO em `SEOHead`, sitemap filtrado e validações próprias. Não existiam backend, autenticação, banco ou storage.

## Decisão

O Launch é uma camada incremental em `/studio`, sem reutilizar o runtime do editor nos sites publicados. Astro passa a usar o adapter Vercel em modo server, preservando componentes e URLs existentes. Supabase fornece Auth, Postgres, Row Level Security e Storage por ser HTTP, compatível com funções Vercel e permitir isolamento no próprio banco.

O `SiteRenderer` recebe somente dados estruturados. Editor, previews de dispositivo/modelo e publicação usam o mesmo renderer. Seções seguem `type`, `variant`, `position`, `visible`, `content` e `settings`. Template define a estrutura inicial e tema define apenas os tokens visuais; as duas escolhas são independentes.

Drafts nunca são lidos pela rota pública. `publish_site` grava um snapshot imutável da revisão corrente em `site_publications`; novas edições apenas incrementam `draft_revision`. Uma republicação substitui o snapshot e iguala `published_revision`, permitindo indicar alterações pendentes sem vazar conteúdo em edição.

## Rotas

- `/studio/login`: cadastro e login.
- `/studio`: sites do usuário.
- `/studio/novo`: onboarding e escolha entre três templates.
- `/studio/sites/:id/editar`: conteúdo, ordem, visibilidade, aparência, WhatsApp e publicação.
- `/studio/sites/:id/preview`: preview autenticado do draft usando o renderer compartilhado.
- `/studio/sites/:id/modelo`: preview autenticado de troca de template com o conteúdo compatível atual.
- `/studio/sites/:id/leads`: contatos do tenant.
- `/_sites/:slug`: destino interno do middleware para site publicado.
- `/api/launch/*`: mutações autenticadas e recebimento público de leads.

## Limites Free

Até três projetos por proprietário e apenas um site Free publicado simultaneamente. As duas regras são garantidas no banco: trigger de limite por conta e índice parcial único para publicação. Cada site tem uma página, um idioma, máximo de 20 posições de seção, imagens até 5 MB nos MIME types JPEG, PNG e WebP, subdomínio e branding obrigatório. `plan` já admite `pro` e `custom`, sem cobrança nesta fase.

Trocas de template passam pela função transacional `switch_site_template`, que cria um snapshot antes de substituir a estrutura e preserva o conteúdo das seções compatíveis. `restore_site_snapshot` permite recuperar esse estado. Ambos validam propriedade no banco e as linhas de `site_snapshots` permanecem protegidas por RLS.
