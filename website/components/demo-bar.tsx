/* oxlint-disable nextjs/no-html-link-for-pages -- Native links keep the static Pages export self-contained. */
export function DemoBar({ concept }: { concept: string }) {
  return (
    <aside className="showroom-bar" aria-label="Hinweis zum Konzeptprojekt">
      <div className="showroom-bar-inner">
        <a className="showroom-back" href="/konzepte/">
          <span aria-hidden="true">←</span> Alle Beispiele
        </a>
        <p>
          <strong>{concept}</strong>
          <span>
            Fiktives Konzeptprojekt · Unternehmen, Angaben und Bildmaterial
            dienen der Design-Demonstration.
          </span>
        </p>
        <a className="showroom-offer" href="/">
          Zum Angebot <span aria-hidden="true">↗</span>
        </a>
      </div>
    </aside>
  );
}
