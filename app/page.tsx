export default function HomePage() {
  return (
    <section
      style={{
        maxWidth: '960px',
        margin: '0 auto',
        padding: '3rem 1rem 4rem',
        display: 'grid',
        gap: '2.5rem',
      }}
    >
      <div style={{ display: 'grid', gap: '1rem' }}>
        <h1 style={{ fontSize: '2.25rem', margin: 0 }}>
          Activez seulement les expériences marketing qui comptent
        </h1>
        <p style={{ margin: 0, lineHeight: 1.7, color: '#4b5563' }}>
          PurePromo met la transparence au cœur de sa relation client. Choisissez
          les cookies qui conviennent à vos besoins et accédez à votre espace
          personnalisé pour suivre votre activité marketing.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        }}
      >
        {features.map((feature) => (
          <article
            key={feature.title}
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '1.75rem',
              boxShadow: '0 20px 45px rgba(15, 23, 42, 0.08)',
              border: '1px solid rgba(37, 99, 235, 0.08)',
            }}
          >
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.25rem' }}>
              {feature.title}
            </h2>
            <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6 }}>
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

const features = [
  {
    title: 'Analyses responsables',
    description:
      'Mesurez vos performances avec des tableaux de bord clairs et respectueux de la vie privée.',
  },
  {
    title: 'Personnalisation fine',
    description:
      'Activez uniquement les scénarios marketing utiles à votre stratégie de croissance.',
  },
  {
    title: 'Support expert',
    description:
      'Nos consultants vous accompagnent à chaque étape pour maximiser votre ROI.',
  },
];
