export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-6 py-24 text-center text-slate-900">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Bienvenue sur votre nouveau projet Next.js 14 !
      </h1>
      <p className="max-w-2xl text-lg text-slate-600">
        Ce projet est initialisé avec TypeScript, App Router, Tailwind CSS, ESLint, Prettier,
        ainsi que les dépendances Auth.js (next-auth), Prisma, Zod et Axios.
      </p>
      <div className="flex flex-col items-center gap-2 text-sm text-slate-500">
        <span>Commencez par modifier le fichier</span>
        <code className="rounded bg-slate-100 px-2 py-1 font-mono text-slate-800">
          app/page.tsx
        </code>
        <span>et exécutez</span>
        <code className="rounded bg-slate-100 px-2 py-1 font-mono text-slate-800">
          npm run dev
        </code>
        <span>pour lancer le serveur de développement.</span>
      </div>
    </main>
  );
}
