# Bulk 0 · Baseline

Erfasst am 11. September 2026 auf Commit `f490f59`.

## Inhalt

- `route-metrics.json`: Titel, H1-Anzahl, Textumfang und horizontale Breitenmessung aller 25 Routen bei 390 × 844.
- `interaction-checks.json`: mobile Menüs und AUFSCHLAG-Wochenplanfilter.
- `*-desktop-viewport.png`: erster Viewport der Anbieter-, Übersichts- und fünf Konzeptstartseiten bei circa 1440 × 1000.
- `*-mobile-viewport.png`: erster Viewport derselben Seiten bei circa 390 × 844.
- `*-desktop.png` und `*-mobile.png`: Vollseitenaufnahmen als Referenz für Seitenlänge und Rhythmus.

## Verwendung

Für visuelle Vorher-/Nachher-Vergleiche sind die `*-viewport.png`-Dateien maßgeblich. Bei automatisierten Vollseitenaufnahmen können fixierte oder animierte Elemente während des Stitchings mehrfach erscheinen; solche Wiederholungen gelten nicht ohne separate DOM-/Viewport-Bestätigung als Produktfehler.

## Technische Baseline

- Build: erfolgreich.
- Lint: erfolgreich.
- Typecheck: erfolgreich.
- 25 von 25 Routen mit genau einer H1.
- Kein horizontaler Overflow im 390-px-Routensweep.
- Keine Browserfehler im Routensweep.
- Sechs mobile Menüs öffnen und schließen; Escape stellt den Fokus wieder her.
- AUFSCHLAG-Filter: fünf Termine in „Alle“, vier in „Tennis“.
