# Projet Site Marketing

Application Next.js 14 équipée de NextAuth et Prisma pour la gestion des accès et des données. Une page de diagnostic `/status` permet de vérifier en un coup d’œil la disponibilité de la base de données, la configuration de NextAuth, la présence des variables d’environnement critiques et le statut du cookie `pp_consent`.

## Prérequis

- Node.js 20+
- npm 10+
- Une base PostgreSQL accessible pour Prisma

## Installation

```bash
npm install
npx prisma generate
```

## Lancement

```bash
npm run dev
```

L’application est disponible sur [http://localhost:3000](http://localhost:3000). Rendez-vous sur [http://localhost:3000/status](http://localhost:3000/status) pour la page de diagnostic.

## Variables d’environnement

Créer un fichier `.env.local` à la racine du projet avec les variables suivantes :

| Variable | Description | Exemple |
| --- | --- | --- |
| `NEXTAUTH_URL` | URL publique de l’application (utilisée par NextAuth) | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Clé secrète pour signer les tokens NextAuth (`openssl rand -base64 32`) | `E3H...` |
| `DATABASE_URL` | Chaîne de connexion PostgreSQL pour Prisma | `postgresql://user:password@localhost:5432/db?schema=public` |
| `GOOGLE_CLIENT_ID` | Client ID OAuth Google | `123456.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Client Secret OAuth Google | `GOCSPX-…` |
| `GITHUB_ID` | Client ID OAuth GitHub | `Iv1.1234567890ab` |
| `GITHUB_SECRET` | Client Secret OAuth GitHub | `a1b2c3d4...` |

### Configuration des providers OAuth

#### Google
1. Créez un projet sur [console.cloud.google.com](https://console.cloud.google.com/).
2. Activez l’API « Google+ » et créez des identifiants OAuth 2.0 de type application Web.
3. Renseignez l’URL autorisée de redirection : `https://<votre-domaine>/api/auth/callback/google`.
4. Copiez le Client ID/Secret dans les variables `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET`.

#### GitHub
1. Rendez-vous sur [github.com/settings/developers](https://github.com/settings/developers).
2. Créez une nouvelle application OAuth.
3. Saisissez l’URL de rappel : `https://<votre-domaine>/api/auth/callback/github`.
4. Copiez le Client ID et le Client Secret dans `GITHUB_ID` et `GITHUB_SECRET`.

⚠️ Pour un environnement local, remplacez `<votre-domaine>` par `http://localhost:3000`.

## Page `/status`

La page de diagnostic affiche :

- **État de la base de données** : ping `SELECT 1` via Prisma.
- **État NextAuth** : détection des providers OAuth configurés (Google/GitHub).
- **Variables critiques** : présence (sans valeur) des variables listées ci-dessus.
- **Cookie `pp_consent`** : indique si le cookie est présent dans la requête.

Cette page est utile pour valider rapidement la configuration avant un déploiement.
