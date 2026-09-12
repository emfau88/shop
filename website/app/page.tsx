/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
/* oxlint-disable nextjs/no-img-element -- WebP assets are optimized offline and served locally with dimensions and loading priorities. */
import { Navigation } from '@/components/navigation';
import { ArrowLink, Footer } from '@/components/shared';
import { InquiryForm } from '@/components/inquiry-form';
import { ResponsiveImage } from '@/components/responsive-image';
const included = [
  'Bis zu 4 Inhaltsseiten, eine Sprache',
  'Eine gebündelte Korrekturrunde',
  'Textüberarbeitung aus Ihrem Briefing · bis ca. 700 Wörter',
  'Einbindung von bis zu 8 gelieferten Bildern',
  'Darstellung für Smartphone, Tablet und Desktop',
  'Kurzes Anfrageformular und technische Suchgrundlagen',
  'Projektdateien und dokumentierte Übergabe',
  '30 Tage Hilfe bei technischen Fehlern nach Veröffentlichung',
];
const advantages = [
  {
    number: '01',
    title: 'Keine fertigen Webtexte nötig',
    text: 'Sie erzählen mir von Ihrem Betrieb. Ich ordne die Inhalte und formuliere sie verständlich für Ihre Kunden.',
  },
  {
    number: '02',
    title: 'Vorher wirklich ansehen',
    text: 'Fünf vollständig bedienbare Beispiele zeigen mehr als einzelne Bilder oder allgemeine Versprechen.',
  },
  {
    number: '03',
    title: 'Fester Rahmen statt Überraschungen',
    text: 'Leistungen, Korrekturen, Preis und Veröffentlichungstermin werden vor dem Start gemeinsam festgelegt.',
  },
  {
    number: '04',
    title: 'Ihre Website gehört Ihnen',
    text: 'Domain und Konten laufen auf Ihren Namen. Sie erhalten Zugänge, Projektdateien und eine dokumentierte Übergabe.',
  },
  {
    number: '05',
    title: 'Direkter Ansprechpartner',
    text: 'Beratung, Gestaltung und technische Umsetzung kommen aus einer Hand – ohne Weiterreichen an verschiedene Stellen.',
  },
  {
    number: '06',
    title: 'Ein passender Betriebsweg',
    text: 'Auf Wunsch planen wir Selbstpflege oder Betreuung direkt mit ein. Ein verpflichtendes Wartungsabo gibt es nicht.',
  },
];
const concepts = [
  {
    name: 'WERKFORM',
    sector: 'High-End Engineering',
    text: 'Präzise, prozessorientiert und auf technische Projektanfragen ausgerichtet.',
    href: '/konzept/metallbau/',
    image: '/images/metal/werkhalle.webp',
    width: 1536,
    height: 1024,
  },
  {
    name: 'FARBFORM',
    sector: 'Editorial Interior',
    text: 'Ruhig, materialbewusst und interaktiv für private Wohnkunden.',
    href: '/konzept/maler/',
    image: '/images/demo-desktop.webp',
    width: 1426,
    height: 980,
  },
  {
    name: 'GRÜNRAUM',
    sector: 'Landscape Storytelling',
    text: 'Projektgeführt vom Bestand bis zum fertigen Garten am Wasser.',
    href: '/konzept/galabau/',
    image: '/images/galabau/garten.webp',
    width: 1536,
    height: 1024,
  },
  {
    name: 'AUFSCHLAG',
    sector: 'Interactive Sport',
    text: 'Energetisch, terminorientiert und mit direktem Sportmodus.',
    href: '/konzept/sportverein/',
    image: '/images/sportverein/badminton.webp',
    width: 1536,
    height: 1024,
  },
  {
    name: 'LINDENWIRT',
    sector: 'Hospitality Experience',
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
        <section className="provider-hero">
          <div className="wrap provider-hero-layout">
            <div className="provider-hero-copy">
              <p className="eyebrow">Webdesign aus einer Hand</p>
              <h1>
                Ihr Betrieb ist eigenständig. <span>Die Website sollte es auch sein.</span>
              </h1>
              <p className="lead">
                Individuelle Unternehmenswebsites für inhabergeführte Betriebe – klar erklärt, hochwertig gestaltet und persönlich umgesetzt.
              </p>
              <div className="actions">
                <ArrowLink href="#konzepte">Websites ausprobieren</ArrowLink>
                <ArrowLink secondary href="#angebot">Paket & Preis</ArrowLink>
              </div>
              <p className="scope-line">
                Bis zu 4 Inhaltsseiten <span>·</span> feste Leistung <span>·</span>{' '}
                persönliche Umsetzung
              </p>
            </div>
            <a className="provider-hero-showcase" href="/konzepte/">
              <ResponsiveImage
                src="/images/demo-desktop.webp"
                sourceWidth={1426}
                height={980}
                alt="Ausschnitt des interaktiven Farbform-Websitekonzepts"
                sizes="(max-width: 759px) 100vw, 48vw"
                loading="eager"
                fetchPriority="high"
              />
              <div>
                <span>5 Branchen · 5 eigenständige Welten</span>
                <strong>Showroom öffnen</strong>
                <b aria-hidden="true">↗</b>
              </div>
            </a>
          </div>
          <div className="wrap provider-promises" aria-label="Wichtige Merkmale">
            <span>Texthilfe aus einem Gespräch</span>
            <span>Zugänge und Dateien für Sie</span>
            <span>Kein verpflichtendes Wartungsabo</span>
          </div>
        </section>
        <section className="provider-concepts section" id="konzepte">
          <div className="wrap section-top provider-concepts-head">
            <div>
              <p className="eyebrow">Der Beweis vor dem Versprechen</p>
              <h2>Fünf Branchen. Fünf digitale Handschriften.</h2>
            </div>
            <div>
              <p>
                Jede Website besitzt eine eigene Art Direction und eine branchengerechte Funktion. Alle Beispiele sind transparent gekennzeichnete, fiktive Konzeptprojekte.
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
                <ResponsiveImage
                  src={concept.image}
                  sourceWidth={concept.width}
                  height={concept.height}
                  alt={`Vorschau der Konzeptwebsite ${concept.name}`}
                  sizes="(max-width: 620px) 100vw, (max-width: 900px) 80vw, 50vw"
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
        <section className="wrap section provider-advantages" id="vorteile">
          <div className="provider-advantages-intro">
            <div>
              <p className="eyebrow">Was die Zusammenarbeit einfacher macht</p>
              <h2>
                Sie kennen Ihren Betrieb. Ich mache ihn online verständlich.
              </h2>
            </div>
            <p className="lead">
              Eine gute Website verlangt von Ihnen keine fertige Seitenstruktur
              und keine ausgearbeiteten Werbetexte. Wir klären gemeinsam, was
              Ihre Kunden wissen müssen – und machen daraus einen klaren
              Auftritt.
            </p>
          </div>
          <div className="provider-advantage-grid">
            {advantages.map((advantage) => (
              <article key={advantage.number}>
                <span>{advantage.number}</span>
                <h3>{advantage.title}</h3>
                <p>{advantage.text}</p>
              </article>
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
                <p className="offer-label">Für die ersten zwei Kunden</p>
                <h3>Referenzkunden-Angebot</h3>
                <p className="price">
                  699 <span>€</span>
                </p>
                <p>Geplanter Endpreis</p>
                <p className="price-note">
                  Ehrlicher Einführungspreis für zwei echte Kundenprojekte. Noch
                  kein buchbares Angebot; steuerliche Angaben werden vor dem
                  Verkaufsstart ergänzt.
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
                    Sie liefern Logo, Bilder, betriebliche Fakten und
                    erforderliche Rechtstexte. CMS-Selbstpflege, Shops und
                    Buchungssysteme sind zusätzliche Anforderungen.
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
        <section className="wrap section solution-guide" id="betriebsmodell">
          <div className="solution-guide-intro">
            <div>
              <p className="eyebrow">Pflege & laufende Kosten</p>
              <h2>Wie möchten Sie Ihre Website später betreiben?</h2>
            </div>
            <p>
              Baukästen sind günstig und können für einfache Vorhaben sinnvoll
              sein. Wenn Struktur, Texte und ein eigenständiger Auftritt wichtig
              sind, beginnt der eigentliche Aufwand jedoch vor dem Editor.
            </p>
          </div>
          <div className="solution-grid">
            <article className="solution-card solution-card-featured">
              <span>Im Startpaket</span>
              <h3>Klare Unternehmenswebsite</h3>
              <p>
                Schnell, wartungsarm und passend zu Ihrem Betrieb gestaltet.
                Änderungen können später einzeln oder über eine optionale
                Betreuung beauftragt werden.
              </p>
              <ul>
                <li>Geringer technischer Pflegeaufwand</li>
                <li>Projektdateien und Zugänge für Sie</li>
                <li>Keine feste Vertragslaufzeit</li>
              </ul>
            </article>
            <article className="solution-card">
              <span>Auf Wunsch planbar</span>
              <h3>Inhalte selbst pflegen</h3>
              <p>
                Für häufige Änderungen kann ein Redaktionssystem sinnvoll sein.
                Auswahl, Einrichtung und Einweisung werden vor dem Angebot
                verbindlich geklärt.
              </p>
              <ul>
                <li>Änderungen im Browser</li>
                <li>Einweisung und Admin-Zugang</li>
                <li>Mehr laufende technische Pflege</li>
              </ul>
            </article>
            <article className="solution-card">
              <span>Selbstbau-Alternative</span>
              <h3>IONOS, Jimdo, Wix & Co.</h3>
              <p>
                Ein Baukasten eignet sich, wenn Sie Gestaltung, Texte und Pflege
                selbst übernehmen möchten. Das System bleibt an den jeweiligen
                Anbieter und dessen laufenden Tarif gebunden.
              </p>
              <ul>
                <li>Niedriger Einstiegspreis</li>
                <li>Hosting und Editor meist zusammen</li>
                <li>Eigenständige Einrichtung erforderlich</li>
              </ul>
            </article>
          </div>
          <p className="solution-note">
            Domain, Hosting, E-Mail-Dienste und externe Systeme verursachen je
            nach gewählter Lösung eigene laufende Kosten. Sie werden vor dem
            Projekt transparent ausgewiesen.
          </p>
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
                'Im Startpaket ist kein Redaktionssystem enthalten. Wenn Sie regelmäßig selbst Inhalte pflegen möchten, planen wir ein passendes System, die Einweisung und den zusätzlichen Aufwand vor dem Angebot ein.',
              ],
              [
                'Gibt es laufende Kosten?',
                'Domain, Hosting und gegebenenfalls externe Dienste werden separat benötigt. Eine laufende Betreuung kann zusätzlich vereinbart werden.',
              ],
              [
                'Sind das echte Kundenprojekte?',
                'Die gezeigten Arbeitsbeispiele wurden als fiktive Konzepte entwickelt. Echte Kundenarbeiten werden erst nach Umsetzung und Freigabe ergänzt.',
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
