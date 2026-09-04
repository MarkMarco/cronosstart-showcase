# Domínios multi-tenant

Em produção, crie o DNS wildcard `*.sites.cronosstart.com.br` apontando para o projeto Vercel e adicione `*.sites.cronosstart.com.br` aos domínios do projeto. A Vercel provisionará SSL depois da validação DNS. Não altere o domínio institucional nem remova seus registros atuais.

O middleware extrai apenas um label seguro de `<slug>.sites.cronosstart.com.br` e reescreve internamente para `/_sites/<slug>`. A consulta exige `status=published`; RLS só expõe sites publicados. `studio`, `api`, `www` e outros nomes sensíveis são reservados.

Para desenvolvimento, use `<slug>.localhost:4400` (navegadores modernos resolvem para loopback) ou acesse diretamente `/_sites/<slug>`. Domínios customizados futuros devem ser registrados em `site_domains`, passar por verificação de propriedade e só então tornar-se primários.

Rollback: remova o wildcard do projeto Vercel e restaure o DNS anterior; o domínio principal segue independente. Despublicar ou suspender um registro retira o site da resolução pública sem apagar dados.

