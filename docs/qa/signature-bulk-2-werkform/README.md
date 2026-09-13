# Signature Bulk 2 · WERKFORM

Stand: 13.09.2026

## Umgesetzt

- originale, reproduzierbare Blender-Baugruppe mit 30 getrennten und benannten Teilen;
- Grundplatte, zwei Seitenwangen, Rückbrücke, Deckplatte, Innenwagen, Frontklemmung, Verstärkungen, Spindel, Lager, Distanzringe, Schrauben, Scheiben und Muttern;
- echte Boolean-Bohrungen, präzise Bevels, korrekter Maßstab und PBR-Metallmaterialien;
- lokales prozedurales Studio-Environment über Three.js `RoomEnvironment` – keine externe HDRI-Lizenz nötig;
- WebP-Fallback aus derselben Blender-Baugruppe und Kameralogik;
- vier Zustände Zeichnung, Fertigung, Bauteil und Exploded View;
- stufenloser Explosionsregler, unterbrechbare Interpolation und fachlich gruppierte Explosionsrichtungen;
- begrenzte Orbit-Kamera mit Drag, Pinch, Zoom und Pfeiltasten;
- ruhige Auto-Rotation bis zur ersten Nutzereingabe;
- vier auf 3D-Nodes projizierte DOM-Hotspots und ein per Escape schließbares Detailpanel;
- Mobile zeigt bewusst nur zwei gleichzeitige Hotspots.

## Asset- und Bundle-Budgets

| Datei | Größe | Budget | Ergebnis |
| --- | ---: | ---: | --- |
| `werkform-assembly.glb` | 457.736 B | 1,5 MB | bestanden |
| `werkform-assembly-fallback.webp` | 26.714 B | 700 KB Desktop / 300 KB Mobile | bestanden |
| `werkform-signature-runtime.js` | 762.607 B roh / 172.026 B gzip | routenspezifisch | nur WERKFORM Signature |
| `signature-runtime.js` | 1.527 B roh / 659 B gzip | geteilt | fünf Signature-Routen |

Blenders Export meldete MeshOptimizer-Verfügbarkeit. Wegen der bereits sehr kleinen GLB-Datei wurde keine zusätzliche verlustbehaftete Kompression erzwungen.

## Funktionsprüfung

- Click- und Tastaturzustände: bestanden.
- Range-Regler synchronisiert den Explosionszustand: bestanden.
- Hotspot öffnet Detailpanel; Schließen und Escape: bestanden.
- Eingabe setzt `data-manual=true` und stoppt Auto-Rotation: bestanden.
- Browserkonsole: keine Warnungen oder Fehler.
- Responsive Prüfung: siehe `responsive-checks.json`; kein horizontaler Overflow.
- statischer Export: 30 Routen, Assets und beide routenspezifischen Runtimes vorhanden.
- bestehende Core-WERKFORM-Route unverändert.

## Qualitätseinordnung

Gegenüber dem Core-Viewer ist die Signature-Version stärker inszeniert, zeigt eine komplexere und zerlegbare Baugruppe und erklärt reale Bauteilbeziehungen. Der Preis dafür ist ein zusätzlicher Three.js-Bundle von rund 763 KB – ausschließlich auf dieser einen Signature-Route. Ohne WebGL bleibt der 27-KB-Studio-Fallback sichtbar und die gesamte semantische Information bedienbar.

Im direkten Mockupvergleich erreicht der Stand ungefähr 70 % visuelle Nähe. Layoutsprache, Typografie, dunkle Premiumwelt und Interaktionsmodell sind klar getroffen. Noch sichtbar schwächer als die Referenz sind Werkstattatmosphäre, Tiefenunschärfe, Materialmikrostruktur, Schraubendetails, finale Objektkadrierung und die kollisionsfreie Führung aller Hotspot-Labels. Diese Restpunkte sind im Roadmap-Abschnitt „Für das finale Premium-Finishing vormerken“ als offene Checkboxen festgehalten.
