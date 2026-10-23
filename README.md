# Portfólio — David Cardoso

Portfólio pessoal desenvolvido com Next.js, React e TypeScript. A página inicial
apresenta o perfil, projetos, metodologia, currículo e formas de contato em uma
experiência organizada por seções de rolagem.

## Desenvolvimento

```bash
npm install
npm run dev
```

O servidor local fica disponível em `http://localhost:3000`.

## Verificações

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Estrutura

- `app/page.tsx`: entrada da página.
- `app/_components/SceneController`: composição e navegação entre as seções.
- `app/_components`: componentes e estilos de cada seção.
- `app/_styles/globals.css`: estilos base e tokens globais.
- `public/images` e `public/fonts`: imagens e fontes usadas pelo site.
