# Projet Site Marketing

Cette application propose un mini site marketing avec un système de connexion simulé. Elle comporte :

- Un header avec logo typographique, liens vers les pages « Accueil », « Dashboard », « Mon compte » et un bouton contextuel « Se connecter / Se déconnecter ».
- Une page d'accueil présentant brièvement le service avec un bouton d'accès à la connexion.
- Un tableau de bord qui salue l'utilisateur connecté et redirige vers la page de connexion si l'utilisateur n'est pas authentifié.
- Une page de connexion qui simule une authentification OAuth et crée un cookie de session.

## Démarrage

```bash
npm install
npm run dev
```

L'application est disponible sur `http://localhost:3000`.

## Tests

Des tests Playwright vérifient le scénario d'accès au tableau de bord. Pour les exécuter :

```bash
npx playwright install --with-deps
npm test
```

Le test `Accès au tableau de bord` contrôle qu'un visiteur non connecté est redirigé vers `/login`, puis qu'une fois la connexion OAuth simulée effectuée, il accède bien au tableau de bord.
