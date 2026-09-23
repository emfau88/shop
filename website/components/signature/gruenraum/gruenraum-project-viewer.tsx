export function GruenraumProjectViewer() {
  return (
    <div
      className="gruenraum-project"
      data-gruenraum-project
      aria-label="Projektviewer: Bestand, Entwurf, Umsetzung und Ergebnis"
    >
      <div className="gruenraum-phase-media" aria-hidden="true">
        <div className="gruenraum-existing-veil" />
        <div className="gruenraum-survey-grid" />
        <div className="gruenraum-build-layer gruenraum-build-layer--bed" />
        <div className="gruenraum-build-layer gruenraum-build-layer--terrace" />
        <div className="gruenraum-build-layer gruenraum-build-layer--wall" />
        <div className="gruenraum-build-layer gruenraum-build-layer--path" />
        <svg
          className="gruenraum-plan"
          viewBox="0 0 1536 1024"
          preserveAspectRatio="none"
        >
          <path
            className="gruenraum-plan-line gruenraum-plan-line--terrace"
            d="M956 357 1518 332 1517 538 842 529Z"
          />
          <path
            className="gruenraum-plan-line gruenraum-plan-line--wall"
            d="M848 520c180-21 419-13 669 22l-2 180c-264-56-490-74-694-56Z"
          />
          <path
            className="gruenraum-plan-line gruenraum-plan-line--path"
            d="M706 1024c105-194 6-274-154-329-68-24-73-79 27-130"
          />
          <path
            className="gruenraum-plan-line gruenraum-plan-line--bed"
            d="M548 561c200-81 359-73 484-10 165 84 303 89 484 47"
          />
          <path
            className="gruenraum-plan-line gruenraum-plan-line--planting"
            d="M758 418c76-94 179-109 286-35m-21 55c119-80 238-58 319 28"
          />
          <circle cx="956" cy="357" r="9" />
          <circle cx="848" cy="520" r="9" />
          <circle cx="579" cy="565" r="9" />
        </svg>
      </div>

      <aside className="gruenraum-phase-status" aria-hidden="true">
        <span>Projektphase</span>
        <strong data-phase="existing">01 · Ort lesen</strong>
        <strong data-phase="design">02 · Räume zeichnen</strong>
        <strong data-phase="build">03 · Material fügen</strong>
        <strong data-phase="result">04 · Garten erleben</strong>
        <i>
          <b />
        </i>
      </aside>

      <div
        className="gruenraum-hotspots"
        aria-label="Details zum Gartenprojekt"
      >
        <details className="gruenraum-hotspot gruenraum-hotspot--terrace">
          <summary>
            <span aria-hidden="true">+</span>
            <strong>
              Terrasse<small>Raum im Freien</small>
            </strong>
          </summary>
          <p>
            Großformatiger Naturstein verbindet den Wohnraum ruhig mit dem
            Garten.
          </p>
        </details>
        <details className="gruenraum-hotspot gruenraum-hotspot--wall">
          <summary>
            <span aria-hidden="true">+</span>
            <strong>
              Mauer<small>Formt und hält</small>
            </strong>
          </summary>
          <p>
            Die niedrige Stützmauer fängt den Höhenversprung ab und schafft eine
            klare Sitzkante.
          </p>
        </details>
        <details className="gruenraum-hotspot gruenraum-hotspot--path">
          <summary>
            <span aria-hidden="true">+</span>
            <strong>
              Weg<small>Natürlich verbindend</small>
            </strong>
          </summary>
          <p>
            Locker gesetzte Platten führen vom Garten zur Terrasse, ohne die
            Bepflanzung zu zerschneiden.
          </p>
        </details>
        <details className="gruenraum-hotspot gruenraum-hotspot--bed">
          <summary>
            <span aria-hidden="true">+</span>
            <strong>
              Beet<small>Lebendige Vielfalt</small>
            </strong>
          </summary>
          <p>
            Stauden, Gräser und wenige Solitärgehölze sorgen für Struktur über
            alle Jahreszeiten.
          </p>
        </details>
      </div>

      <p className="gruenraum-signoff" aria-hidden="true">
        Mehr Leben
        <br />
        draußen.
      </p>
    </div>
  );
}
