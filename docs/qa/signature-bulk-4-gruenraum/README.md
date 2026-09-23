# GRÜNRAUM Signature · finale Experience

Stand: 23.09.2026

## Ergebnis

Die vorherige generische Signature-Hero-Bühne wurde durch eine eigenständige, lange GRÜNRAUM-Erfahrung ersetzt. Die Seite folgt der Leitidee **„Vom Ort zum Lebensraum · Lesen. Ordnen. Wachsen lassen.“** und besitzt sieben klar unterscheidbare redaktionelle Zustände:

1. Der erste Blick
2. Den Ort lesen
3. Räume entwickeln
4. Material fügen
5. Wachsen lassen
6. Garten im Alltag
7. Der erste Schritt

Die bestehende Core-Website unter `/konzept/galabau/` und ihre Unterseiten wurden nicht verändert.

## Marken- und Gestaltungsentscheidungen

- eigenständige GRÜNRAUM-Signature-Komposition statt Wiederverwendung der generischen `SignatureShell`;
- tiefes Gartengrün, warmes Naturpapier und helle Pflanzenakzente aus dem bestehenden Core-Farbsystem;
- große Gartenfotografie nur dort, wo sie räumliche Wirkung trägt;
- helle Analyse- und Wachstumsbereiche im Wechsel mit dunklen Projekt-, Handwerks- und Alltagsszenen;
- Konturlinien, Grundstückslogik, Materialfugen und Pflanzstaffelung als Designmotive;
- konkrete Gartenbauinhalte statt austauschbarer Luxus- oder Immobilienkommunikation;
- keine erfundenen Projektzahlen, Bewertungen, Verfügbarkeiten oder Auszeichnungen.

## Zentrale Interaktion

Der Projektviewer zeigt weiterhin einen pixelstabilen fotografischen Bildraum mit vier nativen Zuständen:

`Bestand → Entwurf → Umsetzung → Ergebnis`

Je Phase verändern sich Bestands-Veil, Vermessungsraster, SVG-Planlinien, Material-Reveals, Projektstatus, Copy und sichtbare Hotspots. Die Zustände funktionieren mit Maus, Touch und Pfeiltasten. Hotspot-Details schließen sich gegenseitig und lassen sich mit `Escape` schließen; der Fokus kehrt dabei zum auslösenden `summary` zurück.

## Mobile Komposition

- eigener Hero-Crop und früher sichtbare Projektanfrage;
- lesbare Headline und primärer Projektweg im ersten Viewport;
- kompakte Vier-Phasen-Steuerung mit ausreichend großen Touch-Zielen;
- pro Phase höchstens ein sichtbarer Hotspot;
- lineare Materialdetails und Leistungswege;
- keine horizontale Überbreite bei 360, 390, 430, 768, 1440 oder 1920 Pixeln.

## Assets und Performance

Es wurden keine neuen externen Medien und keine zusätzlichen schweren Bibliotheken eingeführt. Die Experience nutzt ausschließlich bestehende, lokal dokumentierte WebP-Assets:

- `gruenraum-garden-hero.webp` und Mobile-Crop;
- `garten.webp` und responsive Ableitungen;
- `pflaster-detail.webp` und responsive Ableitungen;
- `regengarten.webp` und responsive Ableitungen.

Die Projekttransformation bleibt eine DOM-/CSS-/SVG-Hybridlösung ohne WebGL, Modell-Payload oder permanenten Render-Loop.

## Browserprüfung

Geprüft wurden:

- Desktop: 1440 × 900 und 1440 × 1000;
- Tablet: 768 × 900;
- Mobile: 390 × 844;
- zusätzliche Overflow-Breiten: 360, 430 und 1920 Pixel;
- genau eine H1;
- keine Framework-Fehlerüberlagerung;
- keine Browserwarnungen oder Konsolenfehler;
- sichtbare Projektanfrage und gültige Core-Ziele;
- Phasenwechsel per Klick und Pfeiltasten;
- Hotspot öffnen und per Escape schließen;
- Reduced-Motion-CSS ohne animierte Übergänge;
- vollständige Seite im Browser, nicht nur Hero oder Build-Ausgabe.

## Technische Prüfung

- Lint: bestanden
- TypeScript `--noEmit`: bestanden
- Produktionsbuild: bestanden
- GitHub-Pages-Export: 30 Routen bestanden
- Export-QA: eine H1 je Route, keine fehlenden lokalen Ziele, keine unpräfixierten Root-Pfade
- `git diff --check`: bestanden
- GRÜNRAUM-Core-Dateien: unverändert

## Abnahmebilder

- `gruenraum-signature-desktop.png` · Hero bei 1440 × 1000
- `gruenraum-signature-mobile.png` · Mobile Hero bei emulierten 390 × 844 CSS-Pixeln

## Selbstkritische Einordnung

### Stärkste Bereiche

1. Der fotografische Hero verbindet Marke, Leistung und Anfrage ohne generische Glassmorphism-Bühne.
2. Der Projektviewer erklärt den tatsächlichen Wert von Planung und Bau nachvollziehbar.
3. Der Wechsel aus Materialdetail, Pflanzentwicklung und Alltag macht GRÜNRAUM spezifischer als eine reine Premium-Gartenbildergalerie.

### Bewusst reduziert

- kein 3D, weil die fotografische Hybridlösung glaubwürdiger und leichter bleibt;
- keine zusätzliche Jahreszeiten-Animation, weil die vorhandenen Motive keinen glaubwürdigen pixelstabilen Zustandswechsel tragen;
- keine automatische Bewegung und kein Scroll-Jacking;
- keine erfundenen Referenzdaten oder Nachhaltigkeitssiegel.

### Sinnvolle zusätzliche Motive

Für einen späteren Asset-Ausbau würden höchstens folgende Motive einen deutlichen Mehrwert schaffen:

1. echte Bestandsaufnahme desselben Grundstücks vor der Planung;
2. sauberer Materialanschluss zwischen Haus, Terrasse und Beet;
3. identischer Pflanzbereich in zwei Jahreszeiten;
4. glaubwürdige Nutzung des Gartens im Alltag;
5. eingewachsener Garten einige Jahre nach der Anlage.

## Ergebnisentscheidung

- [ ] Behalten
- [ ] Überarbeiten
- [ ] Verwerfen

Die Entscheidung erfolgt nach lokaler Nutzerabnahme. Bis dahin wird nicht committed oder gepusht.
