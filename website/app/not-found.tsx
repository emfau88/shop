/* oxlint-disable nextjs/no-html-link-for-pages -- Native navigation avoids a confirmed Vinext production Link runtime failure; routes render independently. */
export default function NotFound() {
  return (
    <main className="wrap legal section">
      <p className="eyebrow">404 · Seite nicht gefunden</p>
      <h1>Hier geht es weiter.</h1>
      <p>
        Diese Seite ist nicht vorhanden. Das Webdesign-Angebot und das
        Konzeptprojekt erreichen Sie über die Startseite.
      </p>
      <a className="action" href="/">
        Zur Startseite ↗
      </a>
    </main>
  );
}
