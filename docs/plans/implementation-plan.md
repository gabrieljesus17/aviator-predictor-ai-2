# Implementation Plan

# Correção da Inserção dos Meta Pixels

## Contexto
Os dois Meta Pixels (LATAM 5 e México) foram inseridos usando o componente `Script` do Next.js com `strategy="afterInteractive"`. Esse método injeta o script dinamicamente via JavaScript após a hidratação do React, o que significa que o pixel **não aparece no HTML estático** retornado pelo servidor. O verificador da Meta escaneia o HTML estático e por isso não detecta os pixels.

## Análise

- Arquivo: `/workspace/src/app/layout.tsx`
- Problema: `<Script strategy="afterInteractive">` injeta o script via JS runtime, não no HTML inicial
- Solução: Usar `<script dangerouslySetInnerHTML>` diretamente no `<head>` do JSX, sem o componente `Script`. Isso garante que o pixel esteja no HTML renderizado pelo servidor (SSR), visível para scrapers e verificadores como o da Meta.

## Passos

1. Remover os dois blocos `<Script>` com `strategy="afterInteractive"` do `<head>`
2. Substituir por tags `<script>` nativas com `dangerouslySetInnerHTML` diretamente no `<head>`
3. Manter os blocos `<noscript>` no `<body>` como estão (já estão corretos)
4. Rodar `npx tsc --noEmit` para verificar erros TypeScript

## Arquivo a Modificar

- `/workspace/src/app/layout.tsx`

## Código Novo (substituição no `<head>`)

```tsx
<head>
  <Script src="/lasy-bridge.js" strategy="beforeInteractive" />
  {/* Meta Pixel - LATAM 5 */}
  <script
    dangerouslySetInnerHTML={{
      __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '968953209274863');
        fbq('track', 'PageView');
      `,
    }}
  />
  {/* Meta Pixel - México */}
  <script
    dangerouslySetInnerHTML={{
      __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '867051872492763');
        fbq('track', 'PageView');
      `,
    }}
  />
</head>
```

## Critérios de Sucesso

- Build TypeScript sem erros
- Ao acessar o código-fonte da URL pública, os IDs dos pixels aparecem no HTML
- A Meta detecta os pixels ao verificar o domínio no Gerenciador de Eventos
