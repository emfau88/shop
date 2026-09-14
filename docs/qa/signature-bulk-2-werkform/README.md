# Signature Bulk 2 · WERKFORM

Stand: 14.09.2026

## Umgesetzt

- originale, reproduzierbare Umlenkrollen-/Lagerbock-Baugruppe mit 30 getrennten und benannten Teilen;
- technisch nachvollziehbarer Aufbau aus Grundplatte, Seitenwangen, Kreuzstrebe, Rolle, Achse, Lagerkartuschen, Distanzringen und Sicherungsteilen;
- echte Boolean-Bohrungen, präzise Bevels, Gewindegänge, Innensechskant-Aufnahmen, offene Scheiben und PBR-Metallmaterialien;
- generierte fotorealistische CNC-Werkstatt als lokale Bühne plus kontrollierte Reflexionsflächen im Three.js-Environment;
- WebP-Fallback aus derselben Blender-Baugruppe und Kameralogik;
- vier Zustände Zeichnung, Fertigung, Bauteil und Exploded View;
- stufenloser Explosionsregler, unterbrechbare Interpolation und fachlich gruppierte Explosionsrichtungen;
- begrenzte Orbit-Kamera mit Drag, Pinch, Zoom und Pfeiltasten;
- ruhiges ±6,5°-Idle-Pendeln bis zur ersten Nutzereingabe;
- vier auf 3D-Nodes projizierte DOM-Hotspots, kollisionsarme Labelzonen, SVG-Führungslinien und ein per Escape schließbares Detailpanel;
- Mobile zeigt bewusst nur zwei gleichzeitige Hotspots.
- CAD-Zustand mit transparenten Flächen, echten Geometriekanten und Konstruktionsraster;
- zustandsspezifische, weich interpolierte Kamera und eigener Fertigungs-Materialzustand;
- technische Icons, echter Media-Teaser und eigenständiger handschriftlicher Markenakzent.
- bündige, bewusst zurückhaltende WERKFORM-Oberflächenmarkierung auf der Grundplatte.

## Asset- und Bundle-Budgets

| Datei | Größe | Budget | Ergebnis |
| --- | ---: | ---: | --- |
| `werkform-assembly.glb` | 1.081.844 B | 1,5 MB | bestanden |
| `werkform-assembly-fallback.webp` | 25.652 B | 700 KB Desktop / 300 KB Mobile | bestanden |
| `werkform-studio-background.webp` | 68.998 B | 700 KB Desktop | bestanden |
| `werkform-studio-background-mobile.webp` | 24.888 B | 300 KB Mobile | bestanden |
| `werkform-signature-runtime.js` | 769.431 B roh / 174.109 B gzip | routenspezifisch | nur WERKFORM Signature |
| `signature-runtime.js` | 1.527 B roh / 659 B gzip | geteilt | fünf Signature-Routen |

Blenders Export meldete MeshOptimizer-Verfügbarkeit. Wegen der bereits sehr kleinen GLB-Datei wurde keine zusätzliche verlustbehaftete Kompression erzwungen.

## Funktionsprüfung

- Click- und Tastaturzustände: bestanden.
- Range-Regler synchronisiert den Explosionszustand: bestanden.
- Hotspot öffnet Detailpanel; Schließen und Escape: bestanden.
- Eingabe setzt `data-manual=true` und stoppt Auto-Rotation: bestanden.
- Browserkonsole: keine Warnungen oder Fehler.
- Responsive Prüfung: 1440 × 1000 und echte Emulation bei 390 × 844; `scrollWidth === innerWidth`.
- statischer Export: 30 Routen, Assets und beide routenspezifischen Runtimes vorhanden.
- bestehende Core-WERKFORM-Route unverändert.

## Qualitätseinordnung

Gegenüber dem Core-Viewer ist die Signature-Version stärker inszeniert, zeigt eine komplexere und zerlegbare Baugruppe und erklärt reale Bauteilbeziehungen. Der Preis dafür ist ein zusätzlicher Three.js-Bundle ausschließlich auf dieser einen Signature-Route. Ohne WebGL bleibt der kleine Studio-Fallback sichtbar und die gesamte semantische Information bedienbar.

Der Premium-Pass schließt die größten Abstände zur Referenz: echte Werkstattatmosphäre, Tiefenstaffelung, gerichtete Metallreflexe, gebürstete Mikrostruktur, detaillierte Verbindungselemente, ruhige Kadrierung und klar geführte Hotspots. Das Ergebnis bleibt bewusst keine pixelgenaue Kopie des Mockups; das dortige große Winkelbauteil wurde zugunsten eines funktional verständlichen Rollenbocks eigenständig interpretiert.

## Abnahmebilder

- `premium-fidelity-desktop.png` · Exploded View bei 1440 × 1000
- `premium-fidelity-mobile.png` · Exploded View bei 390 × 844
