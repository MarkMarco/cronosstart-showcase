# Google Analytics 4 — configuração e eventos

## Como configurar

1. Crie uma propriedade GA4 (ou use uma existente) e copie o **ID de medição** (formato `G-XXXXXXXXXX`).
2. Defina a variável de ambiente `PUBLIC_GA_MEASUREMENT_ID` com esse valor:
   - **Local** (`.env.local`, não versionado): `PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
   - **Produção** (Vercel): Project Settings → Environment Variables → adicionar `PUBLIC_GA_MEASUREMENT_ID` e rodar um novo deploy (o valor é embutido no build, como já acontece com `PUBLIC_WEB3FORMS_ACCESS_KEY`).
3. Enquanto a variável não estiver definida, **nenhum script do GA é carregado** e nenhum erro é gerado — o site funciona normalmente, só sem medição.

Nenhum ID fictício foi inserido no código; a integração inteira depende dessa variável.

## Onde vive a integração

- `src/utils/analytics.ts` — função única `trackEvent(nome, params)`. Todo componente que precisa registrar uma conversão importa essa função; nenhum componente chama `window.gtag` diretamente. Se o GA não estiver carregado (variável ausente, script bloqueado por adblocker), `trackEvent` não faz nada — nunca lança erro, nunca bloqueia a navegação.
- `src/components/analytics/Analytics.astro` — carrega o `gtag.js` (só se a variável estiver definida) e contém o listener global de clique em links do WhatsApp (`whatsapp_click`). Incluído em: `index.astro`, `ShowcaseLayout.astro` (as 6 páginas de modelo) e `criacao-de-sites-blumenau.astro`.

## Eventos implementados

| Evento | Onde dispara | Parâmetros |
|---|---|---|
| `whatsapp_click` | Qualquer clique em link `wa.me` (delegado globalmente, inclusive links inseridos dinamicamente) | `origem`, `plano` (quando aplicável), `pagina`, `contexto` (texto/aria-label do botão) |
| `contact_form_open` | Abertura do modal de contato, qualquer gatilho | `origem`, `plano` (quando aplicável), `pagina` |
| `contact_form_submit` | Envio bem-sucedido do formulário (resposta `success` do Web3Forms) | `origem`, `plano` (quando aplicável), `segmento`, `pagina` |
| `proposal_click` | Clique em "Solicitar proposta" (planos — identificado pela presença de `data-contact-plan`) | `origem`, `plano`, `pagina` |
| `demo_view` | Carregamento de qualquer uma das 6 páginas de modelo demonstrativo | `modelo`, `segmento`, `pagina` |
| `model_interest_click` | Clique em "Quero um site como este" (cards de modelo) | `modelo`, `segmento`, `pagina` |

**Nunca enviados ao Analytics:** nome, telefone/WhatsApp, e-mail, mensagem/descrição ou qualquer outro dado pessoal digitado no formulário. Os parâmetros dos eventos usam apenas dados de contexto (origem do clique, plano, segmento, página) — nunca o conteúdo preenchido pelo usuário.

## Como validar no DebugView do GA4

1. Configure `PUBLIC_GA_MEASUREMENT_ID` (local ou em um deploy de preview).
2. Instale a extensão [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) no Chrome, ou adicione `?gtm_debug=x` — mais simples: no GA4, ative o modo debug enviando o parâmetro `debug_mode: true` temporariamente, ou use a extensão.
3. No painel do GA4: **Admin → DebugView**.
4. Navegue pelo site com o navegador em modo debug e interaja com os elementos (abrir o formulário, enviar, clicar no WhatsApp, abrir uma página de modelo). Os eventos devem aparecer em tempo real no DebugView, com os parâmetros listados acima.
5. Sem a extensão de debug, também é possível conferir rapidamente no console do navegador: abra o DevTools, digite `window.gtag` e confirme que é uma função (indica que o script carregou); os eventos disparados aparecem na aba **Network** filtrando por `google-analytics.com/g/collect` ou `/collect?`.
