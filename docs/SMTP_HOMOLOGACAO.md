# Homologacao de e-mail — CronosStart Launch

Este documento e o runbook operacional para homologar e-mail real sem alterar o
core do Launch nem qualquer ambiente de producao.

## Escopo imutavel

- Supabase: `Marco CronosSec CRM / cronosstart-launch-staging`
- Project ref: `fxvvnviqdfxyvtcrktmy`
- Vercel: `pantoja1987@gmail.com / Marco's projects / cronosstart-modelos`
- Ambiente Vercel: Preview/Homologacao, nunca Production
- Deployment Protection: manter `all_except_custom_domains`
- Nao alterar DNS, nao criar contas de e-mail e nao criar infraestrutura

## Dados que o responsavel pelo SMTP deve fornecer

Preencher e conferir estes dados fora do repositorio. A senha/token deve ser
digitada diretamente pelo responsavel no painel do Supabase e nunca enviada em
commit, arquivo `.env`, captura de tela, ticket ou log.

| Campo | Obrigatorio | Observacao |
| --- | --- | --- |
| SMTP host | Sim | Host informado pelo provedor |
| SMTP port | Sim | Porta e modo TLS/STARTTLS conforme o provedor |
| SMTP user | Sim | Usuario de autenticacao SMTP |
| SMTP password/token | Sim | Segredo; inserir manualmente e nao registrar |
| Sender email / From | Sim | Endereco verificado e autorizado pelo provedor |
| Sender name | Sim | Nome institucional exibido ao destinatario |
| Dominio remetente verificado | Sim | Confirmar SPF, DKIM e DMARC; qualquer ajuste de DNS fica fora desta etapa |
| Limites do provedor | Sim | Limite por hora/dia, throttling, bounce e bloqueios |
| Caixas de teste PT e ES | Sim | Enderecos reais e autorizados; nao criar contas durante esta tarefa |

Antes da homologacao, desativar no provedor qualquer reescrita ou rastreamento de
links para mensagens transacionais de autenticacao. Reescrita de URLs pode
invalidar links de uso unico.

## Configuracao segura no Supabase staging

1. Confirmar no painel o projeto `cronosstart-launch-staging` e o ref
   `fxvvnviqdfxyvtcrktmy` antes de salvar qualquer campo.
2. Registrar um snapshot apenas dos valores nao secretos atuais: Site URL,
   Redirect URLs, confirmacao de e-mail, expiracao de tokens, limites de envio,
   remetente e estado do SMTP.
3. Em **Authentication > Email/SMTP Settings**, habilitar Custom SMTP e preencher
   manualmente host, porta, usuario, senha/token, e-mail remetente e nome do
   remetente.
4. Nao copiar a senha/token para `supabase/config.toml`, `.env.example`, Vercel,
   terminal, documentacao ou logs. A configuracao deve permanecer apenas no
   control plane do Supabase staging.
5. Ajustar limites de Auth somente se forem menores que o roteiro de testes e
   sempre abaixo dos limites declarados pelo provedor. Registrar o valor final
   sem registrar segredo.
6. Nao executar `supabase config push` para esta alteracao isolada: esse comando
   pode enviar outras configuracoes locais do Auth alem do SMTP.

O bloco comentado de SMTP em `supabase/config.toml` e apenas uma referencia do
ambiente local. Ele nao deve receber credenciais reais.

O provedor padrao do Supabase pode servir para verificacoes muito limitadas,
mas nao homologa entrega real: possui restricoes de destinatarios, limite baixo
e entrega sem garantia.

## URLs de Auth a conferir antes dos disparos

No Supabase staging, conferir:

- **Site URL:** URL exata do deployment Preview aprovado.
- **Redirect URLs:** permitir explicitamente os callbacks do mesmo Preview:
  - `/studio/auth/callback`
  - `/es/studio/auth/callback`
- Se forem usados URLs completos, protocolo e host devem coincidir exatamente
  com o Preview em teste.
- Nao adicionar wildcard de producao e nao alterar DNS.

A protecao Vercel deve permanecer em `all_except_custom_domains`. O teste do link
de e-mail deve ser feito em navegador com sessao autorizada na Vercel. Se a
protecao interceptar o callback, registrar o conflito; nao criar bypass permanente
e nao reduzir a protecao de Production.

## Templates de e-mail

No painel do Supabase staging, revisar os templates **Confirm signup** e
**Reset password** antes do teste:

- usar a URL de confirmacao gerada pelo Supabase (`ConfirmationURL`), sem montar
  manualmente token ou segredo;
- preservar o `redirect_to` solicitado pela aplicacao;
- nao incluir credenciais, dados internos ou URLs de Production;
- manter textos institucionais claros e identificar corretamente a CronosStart;
- validar o remetente, assunto e corpo em clientes de e-mail reais.

Gateways de seguranca podem abrir links de uso unico antes do destinatario. Se
isso ocorrer, registrar a evidencia sanitizada e tratar como conflito de entrega;
nao desabilitar confirmacao de e-mail nem implementar uma pagina intermediaria
sem uma decisao especifica de seguranca e escopo.

Os templates hospedados do Supabase sao configurados por projeto, nao por rota.
Como a aplicacao ja envia callbacks localizados, o destino PT-BR/ES pode ser
homologado sem alterar o core. Para homologar tambem o corpo do e-mail nos dois
idiomas sem logica adicional, usar texto bilingue aprovado nos dois templates.
Uma decisao futura por templates condicionais nao faz parte desta etapa.

## Roteiro de homologacao real

Usar usuarios de teste exclusivos do staging. Nao reutilizar contas de producao.
Respeitar os limites do provedor e registrar horario, resultado e identificador
nao secreto da mensagem.

### 1. Confirmacao de cadastro PT-BR

1. Abrir o cadastro PT no Preview em uma sessao autorizada na Vercel.
2. Criar um usuario novo com caixa de teste PT.
3. Confirmar recebimento, remetente, assunto, corpo e ausencia de link de
   Production.
4. Abrir o link uma unica vez e confirmar callback em
   `/studio/auth/callback` e continuidade para o fluxo PT esperado.
5. Confirmar a sessao e o acesso ao Studio PT.

### 2. Confirmacao de cadastro es-VE

1. Repetir com um usuario novo pela rota ES.
2. Confirmar callback em `/es/studio/auth/callback` e continuidade em espanhol.
3. Confirmar a sessao e o acesso ao Studio ES.

### 3. Recuperacao de senha PT-BR

1. Solicitar recuperacao na tela PT e confirmar que a resposta nao revela se o
   e-mail existe.
2. Abrir o e-mail no mesmo navegador/sessao que iniciou o fluxo quando o PKCE
   assim exigir.
3. Confirmar callback localizado e abertura da tela de nova senha PT.
4. Definir uma nova senha valida, encerrar a sessao e testar:
   - senha antiga rejeitada;
   - senha nova aceita;
   - acesso ao Studio PT restaurado.

### 4. Recuperacao de senha es-VE

1. Repetir pela rota ES.
2. Confirmar callback e mensagens em espanhol.
3. Confirmar alteracao efetiva, rejeicao da senha antiga e login com a nova.

### 5. Token invalido, reutilizado e expirado

1. Alterar um link de teste sem expor seu token em logs e confirmar mensagem
   amigavel de link invalido.
2. Abrir novamente um link ja consumido e confirmar que ele nao reutiliza a
   sessao nem altera a senha.
3. Para expiracao real, gerar um link e aguardar alem do TTL configurado no
   staging; nao reduzir o TTL apenas para acelerar o teste sem autorizacao.
4. Confirmar tratamento amigavel em PT e ES, sem stack trace, token ou detalhe
   interno na interface/console.

### 6. Evidencias e seguranca

- Conferir Auth logs do Supabase e logs do provedor usando identificadores de
  mensagem, status e timestamps, nunca a senha/token SMTP nem o token do link.
- Conferir erros de navegador e rede sem copiar URLs que contenham tokens.
- Antes de encerrar, verificar que nenhum arquivo versionado ou nao versionado
  recebeu o segredo.
- Registrar somente resultado PASS/FAIL, rota, idioma, horario e causa tecnica
  sanitizada.

## Criterios de aprovacao

A homologacao de e-mail so esta concluida quando todos os itens abaixo passarem:

- confirmacao de cadastro recebida e concluida em PT-BR e es-VE;
- recuperacao recebida e concluida em PT-BR e es-VE;
- callbacks permanecem no Preview correto e preservam o idioma;
- senha antiga deixa de autenticar e a nova senha autentica;
- tokens invalidos, reutilizados e expirados falham de forma segura e amigavel;
- nao ha erro novo no console, 404/500 ou vazamento de token/segredo;
- Deployment Protection e Production permanecem inalterados;
- nenhum segredo e armazenado no repositorio ou na Vercel;
- evidencias do Supabase e do provedor confirmam entrega real.

## Rollback exclusivo de staging

Se o SMTP impedir o Auth no staging:

1. preservar evidencias sanitizadas do erro;
2. restaurar no painel apenas os valores de Auth/SMTP registrados no snapshot;
3. restaurar templates caso tenham sido alterados;
4. confirmar que o Auth de staging voltou ao estado anterior;
5. nao aplicar a configuracao em Production e nao mudar a protecao Vercel.

O retorno temporario ao provider padrao serve apenas para recuperar o ambiente;
nao remove o bloqueador de homologacao real de e-mail.

## Referencias oficiais

- [Custom SMTP — Supabase Auth](https://supabase.com/docs/guides/auth/auth-smtp)
- [Email Templates — Supabase Auth](https://supabase.com/docs/guides/auth/auth-email-templates)
- [Redirect URLs — Supabase Auth](https://supabase.com/docs/guides/auth/redirect-urls)
- [Production Checklist — Supabase](https://supabase.com/docs/guides/deployment/going-into-prod)
