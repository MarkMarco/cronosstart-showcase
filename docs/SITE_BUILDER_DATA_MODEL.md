# Modelo de dados do Launch

A sequência de migrations em `supabase/migrations` cria `sites`, `site_domains`, `site_sections`, `site_assets`, `site_leads`, `site_publications`, `site_snapshots` e `templates`. Usuários são gerenciados por `auth.users`. Conteúdo e configurações flexíveis usam `jsonb`; identidade, propriedade, status, posição e limites permanecem colunas relacionais indexáveis.

Cada tabela dependente referencia `sites` com exclusão em cascata. RLS resolve propriedade por `auth.uid()`. O schema reserva `site_domains` para subdomínios e domínios customizados verificados sem recriar um site.

`site_publications` guarda somente o snapshot publicado, isolando o draft. `site_snapshots` guarda pontos de recuperação criados antes de uma troca de template. A exclusão do site remove em cascata seções, leads, metadados de assets, publicação e snapshots; os objetos do Storage são removidos pelo endpoint autenticado antes da exclusão do registro.

O plano Free admite até três registros em `sites` por proprietário e somente um com `status = 'published'`. O limite de projetos é aplicado por trigger e o limite de publicação por função transacional mais índice parcial único, não apenas pela interface.
