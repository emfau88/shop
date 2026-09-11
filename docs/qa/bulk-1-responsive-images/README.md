# Bulk 1 · Responsive Bildauslieferung

Erfasst am 11. September 2026.

## Änderungen

- Jede lokale WebP-Quelle besitzt zusätzliche 480- und 960-Pixel-Varianten.
- Die gemeinsame Bildkomponente liefert `srcset`, `sizes`, feste Abmessungen und asynchrones Decoding.
- Alle konzeptbezogenen Bildkomponenten sowie Anbieterstartseite und Konzeptübersicht verwenden sie.
- Die globalen Interaktionsregeln für Fokus, Touch und reduzierte Bewegung liegen separat in `app/interaction-foundations.css`.

## Prüfung

- `image-selection.json` belegt die gewählte Quelle der Konzeptübersicht bei Desktopbreite.
- Bei 390 px wurden auf allen sieben Kernseiten sichtbare Bilder aus den 480-Pixel-Varianten geladen.
- Bei 1440 px verwendet die zweispaltige Konzeptübersicht die 960-Pixel-Varianten.
- Beide Screenshots prüfen die unveränderte Desktop- und Mobile-Komposition der Konzeptübersicht.
- Der Breakpoint-Retest bei 360 und 430 px enthält sieben Kernrouten. Ein bei 360 px gefundener FARBFORM-Überlauf wurde vor Abschluss korrigiert.
