# Proposta de wildcard para tenants em staging

## Objetivo

Validar resolução real de tenants em `https://<slug>.staging.sites.cronosstart.com.br` sem usar nem alterar `*.sites.cronosstart.com.br`.

## Mudanças propostas após autorização

1. Tornar o sufixo de hosts de tenant configurável por ambiente, mantendo `sites.cronosstart.com.br` em Production e usando `staging.sites.cronosstart.com.br` em Preview/Staging.
2. Adicionar `*.staging.sites.cronosstart.com.br` ao projeto Vercel existente `cronosstart-modelos`, sem criar projeto ou Team.
3. Criar somente o registro DNS wildcard de staging exigido pela Vercel e aguardar emissão do certificado TLS.
4. Adicionar a origem de staging aos redirects permitidos no Supabase `cronosstart-launch-staging`.
5. Validar publicação, despublicação, 404, isolamento A×B, assets e leads em dois slugs temporários.

## Condições de segurança

- Não alterar, remover ou reutilizar registros de `*.sites.cronosstart.com.br`.
- Não compartilhar variáveis entre Preview e Production.
- Manter Deployment Protection conforme a política aprovada; se callbacks externos exigirem acesso público, usar uma exceção específica de staging, nunca desproteger o projeto inteiro.
- Remover tenants, dados e qualquer bypass temporário após os testes.

## Rollback

Remover o domínio wildcard de staging do projeto Vercel, remover exclusivamente o registro DNS `*.staging.sites.cronosstart.com.br`, retirar a origem dos redirects do Supabase e restaurar o sufixo de tenant do Preview. Production permanece independente.

Esta proposta não executa nenhuma alteração de DNS ou domínio.
