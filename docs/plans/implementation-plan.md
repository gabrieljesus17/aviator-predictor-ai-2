# Implementation Plan

# Remover Pixels do Facebook (Meta Pixel)

## Contexto
O projeto possui dois Meta Pixels inseridos no `layout.tsx`: LATAM 5 (968953209274863) e México (867051872492763). O usuário quer removê-los completamente, sem alterar nenhuma outra parte da estrutura do arquivo.

## Arquivo a Modificar
`/workspace/src/app/layout.tsx`

## O que será removido

**No `<head>` (linhas 34–67):** dois blocos `<script dangerouslySetInnerHTML>` com os scripts de inicialização do fbq para cada pixel.

**No `<body>` (linhas 72–83):** dois blocos `<noscript><img>` de fallback para ambientes sem JavaScript.

## O que NÃO será alterado
- Import do `Script` (linha 4) — permanece pois já é usado pelo `/lasy-bridge.js`
- Toda a estrutura do layout, providers, fontes e metadata
- Nenhum outro arquivo será tocado

## Resultado final do `<head>` após a remoção
```tsx
<head>
  <Script src="/lasy-bridge.js" strategy="beforeInteractive" />
</head>
```

## Resultado final do `<body>` após a remoção
```tsx
<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  <CountryProvider>
    {children}
  </CountryProvider>
</body>
```

## Verificação
Após a edição, confirmar que:
1. Os IDs `968953209274863` e `867051872492763` não aparecem mais em nenhum arquivo do projeto
2. O app compila sem erros (`npx tsc --noEmit`)
3. O layout continua funcional no preview
