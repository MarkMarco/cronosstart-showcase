# CronosStart — Modelos Demonstrativos

Vitrine de modelos demonstrativos de sites institucionais, criada como portfólio da **CronosStart** para apresentar a qualidade do trabalho a possíveis clientes de diferentes segmentos. Cada modelo é uma demonstração visual completa — com identidade, hierarquia de conteúdo, textos e seções próprias do setor — e não um template genérico onde apenas o nome e as cores mudam.

## Objetivo do projeto

Servir como portfólio vivo da CronosStart: ao visitar `/modelos`, um possível cliente encontra demonstrações completas de sites por segmento e pode solicitar um projeto personalizado com a sua marca, necessidades e preferências. A arquitetura é reutilizável (layout, componentes de UI, sistema de configuração por segmento), mas cada modelo tem identidade visual, composição e diferenciais próprios do setor que representa.

## Tecnologias utilizadas

- **[Astro](https://astro.build/)** (v7) — geração de site estático
- **[Tailwind CSS](https://tailwindcss.com/)** (v4, via `@tailwindcss/vite`) — estilização utilitária, tokens de tema via CSS custom properties por segmento
- **TypeScript** (modo `strict`) — tipagem do sistema de configuração e dos componentes
- **[Fontsource](https://fontsource.org/)** (fontes variáveis: Inter, Space Grotesk, Sora, Manrope) — uma combinação tipográfica distinta por segmento
- Sem backend, sem banco de dados e sem dependências pesadas — todo o conteúdo é estático e configurado via arquivos TypeScript

## Como instalar e executar

Pré-requisitos: Node.js 22.12 ou superior.

```bash
npm install
```

```bash
npm run dev
```

Abre o site em `http://localhost:4321`.

Outros comandos úteis:

```bash
npm run check   # verificação de tipos (astro check)
npm run build   # build de produção (gera a pasta dist/)
npm run preview # serve o build de produção localmente
```

## Rotas disponíveis

| Rota | Descrição |
| --- | --- |
| `/` | Redireciona para `/modelos` |
| `/modelos` | Vitrine com todos os modelos demonstrativos |
| `/modelos/contabilidade` | Modelo **Atlas Contabilidade** |
| `/modelos/seguros` | Modelo **Horizonte Seguros** |
| `/modelos/imobiliaria` | Modelo **Vértice Imóveis** |

## Modelos existentes

| Segmento | Empresa fictícia | Identidade | Diferenciais |
| --- | --- | --- | --- |
| Contabilidade | Atlas Contabilidade | Azul-marinho + verde discreto, fundo claro | Indicadores, etapas de atendimento, seção de destaque em azul-marinho |
| Corretora de seguros | Horizonte Seguros | Azul + coral, fundo claro | Seletor interativo "o que deseja proteger", grade editorial de planos, seção humana em destaque escuro |
| Imobiliária | Vértice Imóveis | Grafite + bege + dourado | Hero com busca demonstrativa (comprar/alugar, região, tipo), imóveis com fotos reais, corretores com retratos, processo com numeração em segundo plano |

Em desenvolvimento futuro: **Laboratório**, **Recursos Humanos** e **Tecnologia**, além de **Restaurante**.

## Aviso importante — conteúdo demonstrativo

**Todas as empresas, nomes, pessoas, números, preços, depoimentos, parceiros e informações de contato apresentados nos modelos são fictícios e usados apenas para fins de demonstração.** Nenhum modelo representa um cliente real da CronosStart. Números de WhatsApp são fictícios, formulários não enviam dados a nenhum servidor, e as fotografias usadas (imóveis e retratos de "corretores") são imagens de banco de imagens de uso livre, sem relação com pessoas ou propriedades reais.

## Como adicionar um novo segmento

1. Crie o arquivo de configuração em `src/config/showcases/<segmento>.ts`, implementando o tipo `ShowcaseConfig` (ver `src/config/showcases/types.ts`). Copie um modelo existente como ponto de partida.
2. Crie o logo demonstrativo em `src/components/logos/<Nome>Logo.astro`, seguindo o padrão dos logos existentes (marca abstrata + wordmark, fácil de substituir).
3. Reutilize os componentes compartilhados em `src/components/showcase/` sempre que fizerem sentido (cabeçalho, rodapé, menu mobile, FAQ, botão, ícones, `CardGrid`/`GridCard`). Crie componentes exclusivos quando o setor exigir uma seção ou composição própria — evite forçar todos os segmentos a terem o mesmo design.
4. Monte a página em `src/pages/modelos/<segmento>.astro`, compondo as seções na ordem e variante que fizer sentido para o setor (varie composição do hero, estilo de cards, formato de CTA e ritmo de fundos em relação aos modelos já existentes).
5. Adicione a entrada correspondente em `src/config/showcases/index.ts` (registry da vitrine), com `available: true` quando o modelo estiver pronto.
6. Coloque imagens em `public/images/showcases/<segmento>/`, sempre com texto alternativo (`alt`) e organizadas para fácil substituição futura.
7. Rode `npm run check` e `npm run build` antes de considerar o modelo pronto, e valide desktop, tablet e mobile.

## Sobre este código

Modelo demonstrativo desenvolvido pela **CronosStart**.
