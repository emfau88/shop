/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure. */
import {
  DemoShell,
  ArrowLink,
  DemoContact,
  services,
  base,
} from '@/components/shared';
import { FarbformMoodSwitcher } from '@/components/farbform-mood-switcher';
import { FarbformRoomCompare } from '@/components/farbform-room-compare';

export const metadata = { title: 'Farbform · Malerarbeiten & Raumgestaltung' };

export default function Page() {
  return (
    <DemoShell>
      <section className="farbform-masthead">
        <div className="wrap farbform-masthead-title">
          <div>
            <p className="eyebrow">Farbe · Oberfläche · Raum</p>
            <h1>
              Räume brauchen
              <br /> den richtigen Ton.
            </h1>
          </div>
          <aside>
            <span>Studiojournal 01</span>
            <p>
              Farbkonzepte und handwerkliche Oberflächen für Räume, die sich
              selbstverständlich anfühlen.
            </p>
          </aside>
        </div>
        <div className="wrap farbform-lead-image">
          <FarbformMoodSwitcher />
        </div>
      </section>

      <section className="wrap farbform-manifesto">
        <p className="eyebrow">Unser Blick auf Räume</p>
        <blockquote>
          Farbe ist keine letzte Schicht. Sie entscheidet, wie Licht, Möbel und
          Menschen in einem Raum zusammenkommen.
        </blockquote>
        <ArrowLink secondary href={base + 'leistungen/'}>
          Leistungen im Überblick
        </ArrowLink>
      </section>

      <section className="farbform-transformation">
        <div className="wrap">
          <div className="farbform-section-label">
            <p className="eyebrow">Vorher / Nachher</p>
            <p>Wohnraum · Farb- und Materialkonzept</p>
          </div>
          <FarbformRoomCompare />
          <div className="farbform-concept-note">
            <span>01</span>
            <h2>Ruhige Tiefe.</h2>
            <p>
              Der satte Wandton fasst den Wohnbereich, während Kreideweiß,
              helles Gewebe und warmes Holz das Licht im Raum halten.
            </p>
            <div
              className="farbform-materials"
              aria-label="Farb- und Materialwelt"
            >
              <span>
                <i className="swatch aubergine" />
                Aubergine
              </span>
              <span>
                <i className="swatch chalk" />
                Kreideweiß
              </span>
              <span>
                <i className="farbform-oak" />
                Eiche natur
              </span>
            </div>
            <ArrowLink secondary href={base + 'gestaltung/#ruhige-tiefe'}>
              Projekt ansehen
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className="wrap farbform-index">
        <div className="farbform-index-head">
          <p className="eyebrow">Arbeitsfelder</p>
          <h2>Drei Wege zu einem stimmigen Raum.</h2>
        </div>
        <div>
          {services.map((service, index) => (
            <a href={base + 'leistungen/#' + service.slug} key={service.slug}>
              <span>0{index + 1}</span>
              <h3>{service.name}</h3>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>
      <DemoContact />
    </DemoShell>
  );
}
