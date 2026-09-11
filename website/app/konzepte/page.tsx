/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
import { Footer } from '@/components/shared';
import { Navigation } from '@/components/navigation';
import { ResponsiveImage } from '@/components/responsive-image';

export const metadata = {
  title: 'Konzeptwebsites',
  description:
    'Separat aufrufbare, transparent gekennzeichnete Websitekonzepte für lokale Unternehmen.',
};

const concepts = [
  {
    id: 'werkform',
    number: '01',
    name: 'WERKFORM',
    sector: 'Metallverarbeitung & Konstruktion',
    description:
      'Ein technischer Auftritt, der Leistungsgrenzen, Fertigungstiefe und den Weg von der Zeichnung zum Bauteil lesbar macht.',
    detail: '4 Inhaltsseiten · technische Fertigungsmatrix',
    href: '/konzept/metallbau/',
    image: '/images/metal/werkhalle.webp',
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    id: 'farbform',
    number: '02',
    name: 'FARBFORM',
    sector: 'Malerarbeiten & Raumgestaltung',
    description:
      'Ein editorialer Auftritt, in dem Raum, Oberfläche und Farbklima vor der klassischen Leistungsbeschreibung stehen.',
    detail: '4 Inhaltsseiten · Editorial mit Vorher/Nachher',
    href: '/konzept/maler/',
    image: '/images/demo-desktop.webp',
    imageWidth: 1426,
    imageHeight: 980,
  },
  {
    id: 'gruenraum',
    number: '03',
    name: 'GRÜNRAUM',
    sector: 'Garten- & Landschaftsbau',
    description:
      'Ein bildgeführtes Projektjournal für Gärten, die Haus, Gelände, Wasser und den Alltag zu einem Ganzen verbinden.',
    detail: '4 Inhaltsseiten · projektgeführte Gartenstudie',
    href: '/konzept/galabau/',
    image: '/images/galabau/garten.webp',
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    id: 'aufschlag',
    number: '04',
    name: 'AUFSCHLAG',
    sector: 'Tennis, Badminton & Vereinsleben',
    description:
      'Ein aktiver Vereinsauftritt, bei dem Trainingszeiten, zwei Sportarten und der direkte Weg zum Probetraining im Mittelpunkt stehen.',
    detail: '4 Inhaltsseiten · filterbarer Wochenplan',
    href: '/konzept/sportverein/',
    image: '/images/sportverein/badminton.webp',
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    id: 'lindenwirt',
    number: '05',
    name: 'LINDENWIRT',
    sector: 'Gaststätte, Restaurant & Feiern',
    description:
      'Ein ruhiger Restaurantauftritt, der Atmosphäre, Karte und den Weg zur Tischanfrage selbstverständlich zusammenbringt.',
    detail: '5 Inhaltsseiten · Karte, Haus, Feiern und Reservierung',
    href: '/konzept/gastronomie/',
    image: '/images/gastronomie/gastraum.webp',
    imageWidth: 1536,
    imageHeight: 1024,
  },
];

export default function ConceptsPage() {
  return (
    <div data-theme="provider">
      <Navigation active="Website-Beispiele" />
      <main id="inhalt">
        <section className="wrap page-intro concepts-intro">
          <p className="eyebrow">Der digitale Showroom</p>
          <div className="concepts-intro-grid">
            <h1>
              Fünf Branchen. Fünf <em>eigene Ordnungen.</em>
            </h1>
            <div>
              <p className="lead">
                Jede Website ist als vollständiges, fiktives Konzeptprojekt
                angelegt: mit eigener Bildsprache, Inhaltslogik und einem
                konkreten nächsten Schritt.
              </p>
              <p className="concepts-disclosure">
                Portfolio-Showroom · keine realen Unternehmensauftritte
              </p>
            </div>
          </div>
          <nav className="concepts-index" aria-label="Konzeptübersicht">
            {concepts.map((concept) => (
              <a href={`#${concept.id}`} key={concept.id}>
                <span>{concept.number}</span>
                {concept.name}
              </a>
            ))}
          </nav>
        </section>

        <section className="wrap concepts-showcase" aria-label="Konzeptwebsites">
          {concepts.map((concept, index) => (
            <article
              className={`concept-case concept-case-${concept.id}`}
              id={concept.id}
              key={concept.id}
            >
              <a
                className="concept-case-media"
                href={concept.href}
                aria-label={`${concept.name} öffnen`}
              >
                <ResponsiveImage
                  src={concept.image}
                  sourceWidth={concept.imageWidth}
                  height={concept.imageHeight}
                  alt={`Vorschau des fiktiven Konzepts ${concept.name}`}
                  sizes="(max-width: 759px) 100vw, (max-width: 1100px) 70vw, 72vw"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                />
              </a>
              <div className="concept-case-copy">
                <div className="concept-case-meta">
                  <span>{concept.number}</span>
                  <span>Fiktives Konzeptprojekt</span>
                </div>
                <p className="eyebrow">{concept.sector}</p>
                <h2>{concept.name}</h2>
                <p>{concept.description}</p>
                <p className="concept-case-detail">{concept.detail}</p>
                <a className="action" href={concept.href}>
                  Konzept öffnen <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </section>

        <section className="surface section concepts-next">
          <div className="wrap split">
            <div>
              <p className="eyebrow">Nicht eine Schablone</p>
              <h2>Die Aufgabe bestimmt den digitalen Auftritt.</h2>
            </div>
            <p>
              Fertigung braucht Präzision, Gestaltung einen editorischen Blick,
              Vereinsleben eine schnelle Orientierung und Gastronomie einen
              unmittelbaren Weg zum Tisch. Die Konzepte zeigen diese Unterschiede
              nicht nur über Farbe, sondern über ihre ganze Seitenlogik.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
