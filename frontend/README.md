# Frontend – Projet Site Marketing

Ce dossier contient une application [Next.js 14](https://nextjs.org/) initialisée avec l'App Router, TypeScript, Tailwind CSS, ESLint et Prettier. Des dépendances supplémentaires sont déjà référencées pour Auth.js (`next-auth`), Prisma, Zod et Axios.

## Prérequis

- [Node.js 18+](https://nodejs.org/) (recommandé : la LTS actuelle)
- [npm](https://www.npmjs.com/) (installé avec Node.js)

## Installation

1. Installez les dépendances :

   ```bash
   npm install
   ```

2. Copiez le fichier `.env.example` vers `.env` et renseignez les variables :

   ```bash
   cp .env.example .env
   ```

## Développement

Lancez le serveur de développement Next.js :

```bash
npm run dev
```

Le site est ensuite disponible sur [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

- `npm run dev` : démarre le serveur de développement.
- `npm run build` : construit l'application pour la production.
- `npm run start` : lance le serveur Next.js en mode production (après `npm run build`).
- `npm run lint` : exécute ESLint.
- `npm run typecheck` : lance la vérification TypeScript sans émettre de fichiers.
