/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
import {
  DemoShell,
  Photo,
  ArrowLink,
  DemoContact,
  services,
  base,
} from '@/components/shared';
export const metadata = { title: 'Farbform · Malerarbeiten & Raumgestaltung' };
export default function Page() {
  return (
    <DemoShell>
      <section className="wrap demo-hero">
        <div className="hero-copy">
          <p className="eyebrow">Malerarbeiten & Raumgestaltung</p>
          <h1>Farbe verändert Räume.</h1>
          <p className="lead">
            Von ruhigen Wandflächen bis zu ausdrucksstarken Akzenten:
            durchdachte Farben, passende Oberflächen und ein stimmiges
            Gesamtbild.
          </p>
          <div className="actions">
            <ArrowLink href={base + 'gestaltung/'}>
              Gestaltung ansehen
            </ArrowLink>
            <ArrowLink secondary href={base + 'leistungen/'}>
              Leistungen entdecken
            </ArrowLink>
          </div>
          <div className="color-note">
            <span className="swatch aubergine" />
            <span className="swatch chalk" />
            <span className="swatch mustard" />
            <span>Raum für neue Perspektiven.</span>
          </div>
        </div>
        <Photo
          name="raum-aubergine"
          alt="Auberginefarbene Wand, helles Sofa und Holzboden in einem lichtdurchfluteten Wohnzimmer"
          priority
        />
      </section>
      <section className="wrap section">
        <div className="section-top">
          <div>
            <p className="eyebrow">Was einen Raum ausmacht</p>
            <h2>
              Die Fläche. Die Farbe.
              <br className="wide-break" /> Das Gefühl.
            </h2>
          </div>
          <p>
            Manchmal braucht es nur einen anderen Ton. Manchmal eine neue
            Oberfläche. Entscheidend ist, dass alles zusammenpasst.
          </p>
        </div>
        <div className="service-list">
          {services.map((s, i) => (
            <a href={base + 'leistungen/#' + s.slug} key={s.slug}>
              <span className="number">0{i + 1}</span>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
              <span className="row-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>
      <section className="surface section">
        <div className="wrap editorial">
          <Photo
            name="eingang-senf"
            alt="Heller Eingangsbereich mit senfgelber Wand und schlichter Holzbank"
          />
          <div>
            <p className="eyebrow">Ein Raumkonzept</p>
            <h2>Ein heller Empfang.</h2>
            <p>
              Ein warmer Gelbton gibt dem Eingang eine eigene Stimmung.
              Kreideweiße Flächen schaffen Ruhe; Holz und dunkle Details setzen
              klare Akzente.
            </p>
            <ArrowLink secondary href={base + 'gestaltung/#heller-empfang'}>
              Farbwelt entdecken
            </ArrowLink>
          </div>
        </div>
      </section>
      <section className="wrap section editorial material">
        <div>
          <p className="eyebrow">Auf die Oberfläche kommt es an</p>
          <h2>
            Farbe sehen.
            <br /> Material spüren.
          </h2>
          <p>
            Matt, fein strukturiert oder mit sichtbarer Tiefe: Die Oberfläche
            verändert, wie ein Farbton im Raum wirkt. Eine Materialprobe macht
            diesen Unterschied greifbar.
          </p>
          <ArrowLink secondary href={base + 'leistungen/#oberflaechen'}>
            Mehr über Oberflächen
          </ArrowLink>
        </div>
        <Photo
          name="farbmuster"
          alt="Matte Farbmuster in Aubergine, Senfgelb und Kreideweiß auf hellem Leinen"
          caption="KI-Materialstudie · illustrative Farbmuster"
        />
      </section>
      <DemoContact />
    </DemoShell>
  );
}
