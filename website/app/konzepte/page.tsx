/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
/* oxlint-disable nextjs/no-img-element -- The preview is an optimized local WebP with explicit dimensions. */
import { Footer } from '@/components/shared';
import { Navigation } from '@/components/navigation';

export const metadata = {
  title: 'Konzeptwebsites',
  description:
    'Separat aufrufbare, transparent gekennzeichnete Websitekonzepte für lokale Unternehmen.',
};

const concepts = [
  {
    name: 'Farbform',
    sector: 'Malerarbeiten & Raumgestaltung',
    status: 'Umgesetzt und geprüft',
    description:
      'Eine ruhige, bildstarke Unternehmenswebsite mit Leistungen, zwei Farbwelten und einer simulierten Anfrage.',
    href: '/konzept/maler/',
    image: '/images/demo-desktop.webp',
    pages: '4 Inhaltsseiten',
  },
];

export default function ConceptsPage() {
  return (
    <div data-theme="provider">
      <Navigation active="Konzepte" />
      <main id="inhalt">
        <section className="wrap page-intro concepts-intro">
          <p className="eyebrow">Arbeitsbeispiele</p>
          <h1>Eigenständige Websites. Klar als Konzepte gekennzeichnet.</h1>
          <p className="lead">
            Hier entsteht eine Sammlung vollständig bedienbarer
            Branchenbeispiele. Jedes Konzept hat einen eigenen Pfad und zeigt
            eine passende Gestaltung, Inhaltsstruktur und Kontaktführung.
          </p>
        </section>

        <section className="wrap concepts-grid" aria-label="Konzeptwebsites">
          {concepts.map((concept, index) => (
            <article className="concept-card" key={concept.href}>
              <a className="concept-image" href={concept.href}>
                <img
                  src={concept.image}
                  width="1426"
                  height="980"
                  alt={`Startseite des fiktiven Konzepts ${concept.name}`}
                />
              </a>
              <div className="concept-copy">
                <div className="concept-meta">
                  <span>0{index + 1}</span>
                  <span>{concept.status}</span>
                </div>
                <p className="eyebrow">{concept.sector}</p>
                <h2>{concept.name}</h2>
                <p>{concept.description}</p>
                <p className="concept-pages">
                  {concept.pages} · fiktives Konzeptprojekt
                </p>
                <a className="action" href={concept.href}>
                  Website öffnen <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </section>

        <section className="surface section concepts-next">
          <div className="wrap split">
            <div>
              <p className="eyebrow">Ausbau</p>
              <h2>Weitere Branchen folgen gezielt.</h2>
            </div>
            <p>
              Neue Varianten werden ergänzt, wenn sie eine andere Zielgruppe
              oder einen anderen Verkaufsfall sinnvoll abdecken. So bleibt jedes
              Beispiel eigenständig und die Sammlung übersichtlich.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
