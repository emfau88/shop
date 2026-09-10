import {
  GastroLink,
  GastroPhoto,
  GastroShell,
  gastroBase,
} from '@/components/gastro/gastro-shared';

export const metadata = { title: 'Feiern · LINDENWIRT' };

export default function Page() {
  return (
    <GastroShell active="Feiern">
      <section className="gastro-event-hero">
        <GastroPhoto
          name="gesellschaft"
          alt="Familie und Freunde an einer langen, festlich gedeckten Tafel"
          priority
        />
        <div className="gastro-wrap gastro-event-title">
          <p className="gastro-kicker">Feiern im LINDENWIRT</p>
          <h1>Ein Tisch, an den alle passen.</h1>
        </div>
      </section>

      <section className="gastro-wrap gastro-event-intro">
        <div>
          <p className="gastro-kicker">Ihr Anlass</p>
          <h2>Persönlich geplant. Entspannt gefeiert.</h2>
        </div>
        <div>
          <p>
            Von der ersten Idee bis zum letzten Gang begleitet Sie eine feste
            Ansprechperson. Menü, Getränke, Sitzordnung und Zeitplan entstehen
            passend zu Ihrer Gesellschaft.
          </p>
          <dl>
            <div>
              <dt>Gesellschaft</dt>
              <dd>bis 30 Personen</dd>
            </div>
            <div>
              <dt>Räume</dt>
              <dd>Gaststube · Garten · lange Tafel</dd>
            </div>
            <div>
              <dt>Küche</dt>
              <dd>Menü oder geteilte Gerichte</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="gastro-event-options">
        <div className="gastro-wrap">
          <p className="gastro-kicker">Drei gute Gründe</p>
          <div>
            <article>
              <span>01</span>
              <h3>Familie</h3>
              <p>
                Geburtstag, Taufe oder Jahrestag in einer vertrauten,
                ungezwungenen Atmosphäre.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Freunde</h3>
              <p>
                Eine lange Tafel, Essen zum Teilen und genug Zeit für einen
                gemeinsamen Abend.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Geschäft</h3>
              <p>
                Ein ruhiger Rahmen für Teamabend, Jubiläum oder ein Essen mit
                wichtigen Gästen.
              </p>
            </article>
          </div>
          <GastroLink href={`${gastroBase}reservieren/?anlass=Familienfeier`}>
            Feier unverbindlich anfragen
          </GastroLink>
        </div>
      </section>
    </GastroShell>
  );
}
