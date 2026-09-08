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
export default function Page() {
  return (
    <div data-theme="provider">
      <Navigation />
      <main id="inhalt">
        <section className="wrap provider-hero">
          <p className="eyebrow">
            Unternehmenswebsites für Handwerk & lokale Betriebe
          </p>
          <h1>
            Ihre Arbeit verdient einen <span>guten Auftritt.</span>
          </h1>
          <p className="lead">
            Ich gestalte und entwickle Ihre Unternehmenswebsite: mit klaren
            Leistungen, Platz für Ihre Arbeiten und einem einfachen Weg zur
            Anfrage.
          </p>
          <div className="actions">
            <ArrowLink href="#arbeitsbeispiel">
              Arbeitsbeispiel ansehen
            </ArrowLink>
            <ArrowLink secondary href="#angebot">
              Leistung & Preis
            </ArrowLink>
          </div>
          <p className="scope-line">
            Bis zu 4 Inhaltsseiten <span>·</span> 2 Korrekturrunden{' '}
            <span>·</span> persönliche Umsetzung
          </p>
          <a
            href="/konzept/maler/"
            className="demo-preview"
            aria-label="Fiktive Konzeptwebsite Farbform öffnen"
          >
            <div className="preview-bar">
              <span>FARBFORM — EIGENES KONZEPTPROJEKT</span>
              <span>Website erkunden ↗</span>
            </div>
            <img
              src="/images/demo-desktop.webp"
              width="1440"
              height="980"
              alt="Echte Ansicht der umgesetzten Farbform-Website mit Raumfotografie und dem Titel Farbe verändert Räume"
              fetchPriority="high"
            />
          </a>
        </section>
        <section className="wrap section" id="arbeitsbeispiel">
          <div className="section-top">
            <div>
              <p className="eyebrow">Das Arbeitsbeispiel</p>
              <h2>So könnte Ihr Unternehmen auftreten.</h2>
            </div>
            <div>
              <p className="tag">Eigenes Konzeptprojekt</p>
              <h3>Malerarbeiten & Raumgestaltung</h3>
              <p>
                Ein fiktiver Betrieb, eine vollständig entwickelte Website. Das
                Beispiel zeigt Gestaltung und Bedienung; es ist kein
                Kundenauftrag.
              </p>
              <ArrowLink secondary href="/konzept/maler/">
                Konzeptwebsite öffnen
              </ArrowLink>
            </div>
          </div>
          <div className="example-details">
            {[
              [
                '01',
                'Leistungen verständlich erklären',
                'Eine klare Gliederung hilft Besuchern, das passende Angebot zu finden.',
                'leistungen/',
              ],
              [
                '02',
                'Arbeiten sichtbar machen',
                'Große Bilder geben der Gestaltung Raum und zeigen konkrete Details.',
                'gestaltung/',
              ],
              [
                '03',
                'Den Kontakt erleichtern',
                'Ein kurzer Anfrageweg führt von der ersten Idee zum Gespräch.',
                'kontakt/',
              ],
            ].map(([n, title, text, path]) => (
              <a key={n} href={'/konzept/maler/' + path}>
                <span className="number">{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span aria-hidden="true">↗</span>
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
