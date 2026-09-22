# Signature Bulk 5 · LINDENWIRT Final Experience

## Art Direction

Die finale Ausarbeitung folgt dem Rhythmus **Ankommen → Teilen → Bleiben**. Der Einstieg ist bewusst heller und konkreter als die frühere vollflächig dunkle SignatureShell: Öffnungszeit, Adresse, Abendkarte und Reservierung sind im ersten Bildschirm erfassbar. Die dunklere Event-Atmosphäre erscheint erst im Anlassbereich und erhält damit eine inhaltliche Funktion.

## Eigenständige Screens

1. Ankommen · heller Hero mit Gastraum, Öffnungsinformation und Reservierungsweg.
2. Heute auf dem Tisch · echte Beispielkarte statt Standard-Cards.
3. Aus der Küche · offenes Feuer und drei konkrete Küchenprinzipien.
4. Der Tisch passt sich an · Familienfeier, Hochzeit, Firmenabend und Räume als native Zustände.
5. Nah am Tisch · ruhiger Material- und Gerichtmaßstab.
6. Wenn der Tisch länger wird · Gesellschaft und konkrete Raumsituationen.
7. Der nächste Tisch · reduzierter Reservierungsabschluss ohne künstliche Verfügbarkeit.

## Technik

- Eigenständige React-Komponente ohne generische `SignatureShell`.
- Kleine routenspezifische `lindenwirt-signature-runtime.js` für den statischen GitHub-Pages-Export.
- Anlasswechsel aktualisiert Bild, Text, Beispielkonfiguration und CTA.
- Native Buttons, `aria-pressed`, Live-Region, Touch- und Tastaturbedienung.
- Responsive lokale WebP-Bilder; Hero eager, nachgelagerte Motive lazy.
- Kein WebGL, Video, Animationsframework oder permanenter Render-Loop.

## Alt/Neu

Die frühere Version konzentrierte nahezu alle Inhalte in einem dunklen Hero mit Glass-Panels, Hotspots und generischer Stage-Navigation. Die finale Seite verteilt Atmosphäre, Karte, Küche, Anlass, Materialität und Gemeinschaft auf eigenständige Rhythmen. Das erhöht die Seitenlänge, verbessert aber Orientierung, Markencharakter und praktische Nutzbarkeit deutlich.

## Assetentscheidung

Die vier vorhandenen fotografischen Quellen reichen für einen starken finalen Build. Fehlende Detailmotive werden nicht durch CSS-Fakes ersetzt. Fünf gezielte Vorschläge für einen späteren Photography Pass stehen unter `website/public/images/gastronomie/signature/README.md`.

## Abnahme

- `lindenwirt-signature-desktop.png`: finaler Pages-Export bei 1440 × 900 Viewport.
- `lindenwirt-signature-mobile.png`: finaler Pages-Export bei 390 × 844 Viewport.
- Zusätzlich geprüft: Tablet bei 768 × 900, jeweils ohne horizontalen Overflow.
- Genau eine H1 und sieben eigenständige Inhalts-Screens sind vorhanden.
- Alle vier Anlasszustände wechseln Bild, Copy, Beispielkonfiguration und CTA. Pro Zustand bleibt genau ein Button mit `aria-pressed="true"` aktiv.
- Pfeiltasten sowie Home/End wechseln den Anlass im React-Build und in der statischen Pages-Runtime.
- Der per Tastatur gesetzte Fokus ist mit einem kontrastreichen, versetzten Outline sichtbar.
- Der finale statische Browserlauf unter `/shop/konzept/gastronomie/signature/` meldet keine Console-Errors; alle Bild- und CTA-Pfade tragen den `/shop`-Prefix.
- `npm run lint`, `npx tsc --noEmit --incremental false`, `npm run build`, `npm run export:pages` und `npm run qa:export` sind am 22. September 2026 erfolgreich durchgelaufen.
- Export-QA: 30 Routen, jeweils eine H1, keine fehlenden lokalen Ziele und keine unpräfigierten Root-Pfade.
