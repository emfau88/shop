# Signature Bulk 1 · Fundament

Stand: 13.09.2026

## Ergebnis

- fünf neue Signature-Routen als eigenständig aufrufbare Seiten;
- gemeinsames semantisches Shell-Markup für Header, Hero, Rail, Story und Kennzahlen;
- getrennte Marken-CSS für WERKFORM, FARBFORM, GRÜNRAUM, AUFSCHLAG und LINDENWIRT;
- gemeinsamer browserneutraler State-Controller mit Click, Pfeiltasten, Home und End;
- lokaler React-Bridge und statischer Pages-Einstieg aus derselben Logik;
- responsive `<picture>`-Fallbacks und Reduced-Motion-Grundlage;
- Pages-Exporter und QA von 25 auf 30 Routen erweitert.

## Verifikation

- `npm run lint`: bestanden
- `npx tsc --noEmit`: bestanden
- `npm run build`: bestanden
- `npm run export:pages`: 30 Routen exportiert
- `npm run qa:export`: bestanden; eine H1 pro Route, keine fehlenden lokalen Ziele
- `signature-runtime.js`: 1.527 Byte
- QA prüft automatisiert, dass Signature-Runtime auf keiner Core-Route injiziert wird.

Die vier noch nicht ausgebauten Signature-Routen sind bewusst reduzierte visuelle Fundamente. Ihre jeweils geplante Kerninteraktion folgt in Bulk 3–6.

