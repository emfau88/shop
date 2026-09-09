/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
/* oxlint-disable nextjs/no-img-element -- WebP assets are optimized offline and served locally with dimensions and loading priorities. */
import { Navigation } from '@/components/navigation';
import { ArrowLink, Footer } from '@/components/shared';
import { InquiryForm } from '@/components/inquiry-form';
const included = [
  'Bis zu 4 Inhaltsseiten, eine Sprache',
  '2 gebündelte Korrekturrunden',
  'Textüberarbeitung aus Ihrem Briefing · bis ca. 1.000 Wörter',
  'Einbindung von bis zu 10 gelieferten Bildern',
  'Darstellung für Smartphone, Tablet und Desktop',
  'Kurzes Anfrageformular und technische Suchgrundlagen',
  'Projektdateien und dokumentierte Übergabe',
  'Zusätzliche Einbindung bereitgestellter Rechtstexte',
];
const concepts = [
  {
    name: 'Farbform',
    sector: 'Maler & Raumgestaltung',
    text: 'Ruhig, editorial und bildstark für private Wohnkunden.',
    href: '/konzept/maler/',
    image: '/images/demo-desktop.webp',
    width: 1426,
    height: 980,
  },
  {
    name: 'Werkform',
    sector: 'Metallverarbeitung',
    text: 'Technisch, datenorientiert und auf Projektanfragen ausgerichtet.',
    href: '/konzept/metallbau/',
    image: '/images/metal/werkhalle.webp',
    width: 1536,
    height: 1024,
  },
  {
    name: 'Grünraum',
    sector: 'Garten- & Landschaftsbau',
    text: 'Organisch, projektbezogen und auf Hausbesitzer zugeschnitten.',
    href: '/konzept/galabau/',
    image: '/images/galabau/garten.webp',
    width: 1536,
    height: 1024,
  },
  {
    name: 'AUFSCHLAG',
    sector: 'Tennis- & Badmintonverein',
    text: 'Aktiv, terminorientiert und mit direktem Probetraining.',
    href: '/konzept/sportverein/',
    image: '/images/sportverein/badminton.webp',
    width: 1536,
    height: 1024,
  },
  {
    name: 'LINDENWIRT',
    sector: 'Gaststätte & Restaurant',
    text: 'Atmosphärisch, menügeführt und auf Reservierungen optimiert.',
    href: '/konzept/gastronomie/',
    image: '/images/gastronomie/gastraum.webp',
    width: 1536,
    height: 1024,
  },
];
export default function Page() {
  return (
    <div data-theme="provider">
      <Navigation />
      <main id="inhalt">
        <section className="wrap provider-hero">
          <p className="eyebrow">Webdesign aus einer Hand</p>
          <h1>
            Websites, die Ihren Betrieb <span>verständlich machen.</span>
          </h1>
          <p className="lead">
            Für inhabergeführte Unternehmen, die Leistungen klar zeigen,
            Vertrauen aufbauen und Interessenten ohne Umwege zur Anfrage führen
            möchten.
          </p>
          <div className="actions">
            <ArrowLink href="#konzepte">5 Websites ansehen</ArrowLink>
            <ArrowLink secondary href="#angebot">
              Paket & Preis
            </ArrowLink>
          </div>
          <p className="scope-line">
            Bis zu 4 Inhaltsseiten <span>·</span> 2 Korrekturrunden{' '}
            <span>·</span> persönliche Umsetzung
          </p>
          <div className="provider-promises" aria-label="Wichtige Merkmale">
            <span>Ein fester Ansprechpartner</span>
            <span>Klare Leistungen und Kosten</span>
            <span>Für Smartphone und Desktop</span>
          </div>
        </section>
        <section className="provider-concepts section" id="konzepte">
          <div className="wrap section-top provider-concepts-head">
            <div>
              <p className="eyebrow">Fünf vollständige Beispiele</p>
              <h2>Wählen Sie eine Branche und testen Sie die Website.</h2>
            </div>
            <div>
              <p>
                Alle Beispiele sind fiktive Konzeptprojekte. Sie zeigen, wie
                Gestaltung, Inhalte und Nutzerführung zu verschiedenen Betrieben
                passen können.
              </p>
              <ArrowLink secondary href="/konzepte/">
                Alle Seiten in der Übersicht
              </ArrowLink>
            </div>
          </div>
          <div className="wrap provider-concept-grid">
            {concepts.map((concept, index) => (
              <a
                className="provider-concept-card"
                href={concept.href}
                key={concept.href}
              >
                <img
                  src={concept.image}
                  width={concept.width}
                  height={concept.height}
                  alt={`Vorschau der Konzeptwebsite ${concept.name}`}
                  loading={index < 2 ? 'eager' : 'lazy'}
                />
                <div>
                  <span>
                    0{index + 1} · {concept.sector}
                  </span>
                  <h3>{concept.name}</h3>
                  <p>{concept.text}</p>
                  <b>Website öffnen ↗</b>
                </div>
              </a>
            ))}
          </div>
        </section>
        <section className="surface section" id="angebot">
          <div className="wrap">
            <p className="eyebrow">Leistung & Preis</p>
            <h2>
              Ein klarer Umfang.
              <br /> Ein fester Preis.
            </h2>
            <div className="offer">
              <div>
                <h3>Unternehmenswebsite</h3>
                <p className="price">
                  1.490 <span>€</span>
                </p>
                <p>Geplanter Gesamtpreis</p>
                <p className="price-note">
                  Preisvorschau. Noch kein buchbares Angebot; steuerliche
                  Angaben werden vor dem Verkaufsstart ergänzt.
                </p>
                <ArrowLink href="#anfrage">Projekt anfragen</ArrowLink>
              </div>
              <div>
                <ul className="included">
                  {included.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="exclusions">
                  <p>
                    <strong>Domain und Hosting werden separat benötigt.</strong>{' '}
                    Laufende Betreuung ist optional.
                  </p>
                  <p>
                    CMS-Selbstpflege, Shops und Buchungssysteme sind zusätzliche
                    Anforderungen und nicht im Startpaket enthalten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="wrap section" id="ablauf">
          <p className="eyebrow">Die Zusammenarbeit</p>
          <h2>Von Ihrer Idee zur fertigen Website.</h2>
          <div className="steps">
            {[
              [
                'Verstehen',
                'Betrieb, Leistungen, Inhalte und vorhandene Website gemeinsam klären.',
              ],
              [
                'Gestalten',
                'Die Struktur und eine passende Designrichtung abstimmen.',
              ],
              [
                'Ausarbeiten',
                'Inhalte einbauen, mobile Darstellung entwickeln und Korrekturen umsetzen.',
              ],
              [
                'Übergeben',
                'Die Website prüfen, veröffentlichen und Zugänge sowie Dateien dokumentieren.',
              ],
            ].map(([title, text], i) => (
              <div key={title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="personal">
          <div className="wrap split">
            <h2>Sie arbeiten direkt mit mir.</h2>
            <div>
              <p className="lead">
                Ich bin Ihr Ansprechpartner für Gestaltung und Entwicklung. Wir
                stimmen die Website direkt miteinander ab – von den ersten
                Inhalten bis zur Übergabe.
              </p>
              <p>
                Sie bringen das Wissen über Ihren Betrieb mit. Ich übersetze es
                in eine verständliche Struktur und eine passende Gestaltung.
              </p>
              <ArrowLink secondary href="#anfrage">
                Über Ihr Projekt sprechen
              </ArrowLink>
            </div>
          </div>
        </section>
        <section className="wrap section faq">
          <div>
            <p className="eyebrow">Gut zu wissen</p>
            <h2>Vor dem ersten Gespräch.</h2>
          </div>
          <div>
            {[
              [
                'Was muss ich liefern?',
                'Logo, Informationen zu Ihren Leistungen, echte Bilder und die erforderlichen Rechtstexte. Struktur und Textüberarbeitung erarbeiten wir gemeinsam.',
              ],
              [
                'Kann ich Inhalte selbst ändern?',
                'Im Startpaket ist kein Redaktionssystem enthalten. Wenn Sie regelmäßig selbst Inhalte pflegen möchten, sprechen wir das vor dem Angebot ab.',
              ],
              [
                'Gibt es laufende Kosten?',
                'Domain, Hosting und gegebenenfalls externe Dienste werden separat benötigt. Eine laufende Betreuung kann zusätzlich vereinbart werden.',
              ],
              [
                'Sind das echte Kundenprojekte?',
                'Das gezeigte Arbeitsbeispiel wurde als fiktives Konzept entwickelt. Echte Kundenarbeiten werden erst nach Umsetzung und Freigabe ergänzt.',
              ],
            ].map(([q, a]) => (
              <div className="faq-item" key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="surface section" id="anfrage">
          <div className="wrap contact-layout">
            <div>
              <p className="eyebrow">Ihr nächster Auftritt</p>
              <h2>Was soll Ihre Website zeigen?</h2>
              <p className="lead">
                Beschreiben Sie Ihren Betrieb und was Sie sich für Ihre Website
                wünschen.
              </p>
              <p>
                Für den Einstieg reichen eine kurze Beschreibung Ihrer
                Leistungen und eine Idee, wen Sie erreichen möchten.
              </p>
            </div>
            <InquiryForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
