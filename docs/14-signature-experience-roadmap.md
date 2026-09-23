# Signature Experiences · Umsetzungsplan

**Stand:** 15. September 2026
**Status:** Bulk 0–5 abgeschlossen · GRÜNRAUM Signature lokal zur Abnahme bereit
**Ausgangs-Commit:** `c3e0fc5` (`main`)  
**Ziel:** Die fünf bestehenden Konzeptwebsites bleiben als Core-Versionen erhalten und erhalten jeweils eine zusätzliche, separat aufrufbare Premium-/Signature-Homepage.

## 1. Zielbild

Der Showroom soll künftig pro Branche zwei Qualitäts- und Erlebnisstufen demonstrieren:

| Stufe         | Rolle                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| **Core**      | Bestehende vollständige, mehrseitige und produktionsnahe Unternehmenswebsite                                   |
| **Signature** | Zusätzliche stark inszenierte Homepage mit hochwertiger Art Direction, gezielter Interaktion und selektivem 3D |

Die Signature-Seiten ersetzen nichts. Sie ergänzen die bestehenden Seiten als zweites, sichtbar höher positioniertes Angebot.

### Verbindliche Routen

| Konzept    | Bestehende Core-Homepage | Neue Signature-Homepage           |
| ---------- | ------------------------ | --------------------------------- |
| WERKFORM   | `/konzept/metallbau/`    | `/konzept/metallbau/signature/`   |
| FARBFORM   | `/konzept/maler/`        | `/konzept/maler/signature/`       |
| GRÜNRAUM   | `/konzept/galabau/`      | `/konzept/galabau/signature/`     |
| AUFSCHLAG  | `/konzept/sportverein/`  | `/konzept/sportverein/signature/` |
| LINDENWIRT | `/konzept/gastronomie/`  | `/konzept/gastronomie/signature/` |

### Bewusste Umfangsgrenze

- Die vorhandenen Core-Homepages und Core-Unterseiten bleiben bestehen.
- Im ersten Ausbau erhält jedes Konzept genau **eine neue Signature-Homepage**.
- Die Signature-Navigation darf zunächst auf die bestehenden Core-Unterseiten verweisen.
- Bestehende Unterseiten werden nicht dupliziert.
- Eine spätere Signature-Ausarbeitung einzelner Unterseiten ist ein eigenes Folgeprojekt.
- Die Anbieterhomepage `/` bleibt erhalten.
- Die Übersicht `/konzepte/` wird erst nach Fertigstellung der fünf Signature-Seiten um die Variantenwahl ergänzt.

## 2. Verbindliche Gestaltungs- und Technikregeln

- [ ] Die Mockups werden als visuelle Referenz verwendet, niemals als vollständiges Hintergrundbild mit eingebrannter UI.
- [ ] Logo, Navigation, Headline, Texte, Buttons, Tabs, Hotspots und Kennzahlen bleiben echtes semantisches HTML.
- [ ] Jede Seite erhält eine eigenständige mobile Komposition; der Desktop-Hero wird nicht lediglich verkleinert.
- [ ] Jede Signature-Seite funktioniert auch ohne WebGL verständlich und vollständig.
- [ ] 3D wird nur verwendet, wenn es einen fachlichen oder gestalterischen Mehrwert liefert.
- [ ] Alle Illustrationswerte, Termine und Kennzahlen bleiben als fiktive Demonstrationsinhalte erkennbar.
- [ ] Die bestehende DemoBar und der Rückweg zur Konzeptübersicht bleiben erhalten.
- [ ] Hover ist nie der einzige Zugang zu einer Funktion.
- [ ] Alle primären Zustände sind per Tastatur und Touch bedienbar.
- [ ] `prefers-reduced-motion` erhält eine ruhige, vollständige Variante.
- [ ] Assets werden lokal ausgeliefert und mit Quelle sowie Lizenz dokumentiert.
- [ ] GitHub Pages bleibt das verbindliche Produktionsziel.

## 3. Technische Grundentscheidung

Der aktuelle GitHub-Pages-Exporter entfernt die reguläre React-/Vinext-Laufzeit aus dem statischen HTML. Die WERKFORM-Erweiterung besitzt deshalb bereits einen eigenständigen Three.js-Browser-Bundle.

Für die Signature-Seiten gilt zunächst:

```text
semantisches React-Markup beim Build
          +
statischer HTML-Export
          +
gezielt eingebundene browserneutrale Signature-Runtime
          +
lokale optimierte Medien und GLB-Assets
```

### Architekturentscheidung

- Direkte Three.js-Szenenkerne werden bevorzugt, solange GitHub Pages die statische Zielplattform bleibt.
- React-Komponenten stellen Markup und lokalen Entwicklungsmodus bereit.
- Browserneutrale Entry-Dateien aktivieren dieselbe Interaktion im statischen Export.
- React Three Fiber wird nur eingeführt, wenn ein separater Spike einen klaren Vorteil ohne doppelte Runtime oder Exportprobleme belegt.
- Gemeinsame Mechaniken werden geteilt; die sichtbare Gestaltung bleibt pro Marke eigenständig.

## 4. Gemeinsame Definition of Done

Jeder visuelle Bulk gilt erst als abgeschlossen, wenn:

- [ ] die Referenz und das gewünschte Erlebnis vor Implementierung dokumentiert wurden;
- [ ] Desktop bei 1440 × 1000 visuell geprüft wurde;
- [ ] Mobile bei 390 × 844 visuell geprüft wurde;
- [ ] zusätzlich 360, 430, 768 und 1920 Pixel Breite ohne horizontalen Overflow funktionieren;
- [ ] genau eine H1 vorhanden ist;
- [ ] Navigation, CTA und Kerninteraktion mit Tastatur und Touch funktionieren;
- [ ] Reduced Motion geprüft wurde;
- [ ] WebGL-/Medien-Fallback geprüft wurde;
- [ ] keine aktuellen Browserfehler oder unbehandelten Promise-Fehler auftreten;
- [ ] Lint, Typecheck und Build erfolgreich sind;
- [ ] der statische Pages-Export erfolgreich ist;
- [ ] alle lokalen Links und Assets im Export vorhanden sind;
- [ ] ein Desktop- und ein Mobile-Abnahmescreenshot unter `docs/qa/` liegen;
- [ ] der Alt-/Neu-Vergleich mit Verbesserungen und möglichen Nachteilen dokumentiert wurde;
- [ ] vor Commit und Push eine bewusste Behalten-/Überarbeiten-/Verwerfen-Entscheidung getroffen wurde.

## 5. Performance-Ziele

Diese Werte sind Zielbudgets und werden in Bulk 0 gegen den realen Bestand kalibriert:

| Bereich       | Ziel                                                                         |
| ------------- | ---------------------------------------------------------------------------- |
| HTML/CSS      | sofort sichtbar, unabhängig vom Laden des 3D-Mediums                         |
| Hero-Fallback | Mobile möglichst ≤ 300 KB, Desktop möglichst ≤ 700 KB                        |
| WERKFORM-GLB  | möglichst ≤ 1,5 MB                                                           |
| FARBFORM-3D   | initial möglichst ≤ 3 MB, Props/Lichtdaten nachladen                         |
| GRÜNRAUM-3D   | initial möglichst ≤ 4 MB, Vegetation instanziert und gestuft laden           |
| 3D-JavaScript | geteilter oder routenspezifischer Lazy-Bundle; kein Download auf Core-Seiten |
| DPR           | Desktop begrenzen; Mobile niedrigeres Profil                                 |
| Animation     | kein dauerhaftes Rendering außerhalb sichtbarer oder aktiver Animationen     |
| Mobile        | brauchbare Interaktion ab stabilen ungefähr 30 FPS auf einem mittleren Gerät |

## 6. Bulk-Übersicht

| Bulk | Inhalt                                                 | Komplexität | Abhängigkeit |
| ---- | ------------------------------------------------------ | ----------- | ------------ |
| 0    | Scope, Baseline und technische Entscheidungen          | M           | keine        |
| 1    | Signature-Fundament, Routen und Export-Runtime         | L           | Bulk 0       |
| 2    | WERKFORM Signature                                     | L           | Bulk 1       |
| 3    | FARBFORM Signature                                     | L–XL        | Bulk 1–2     |
| 4    | GRÜNRAUM Signature                                     | XL          | Bulk 1–3     |
| 5    | LINDENWIRT Signature                                   | M           | Bulk 1       |
| 6    | AUFSCHLAG Signature                                    | M–L         | Bulk 1       |
| 7    | Variantenwahl auf `/konzepte/` und Anbieterhomepage    | M           | Bulk 2–6     |
| 8    | Gesamtperformance, Accessibility und Pages-Härtung     | L           | Bulk 2–7     |
| 9    | Abschlussvergleich, Dokumentation und Veröffentlichung | M           | Bulk 8       |

### Gesamtfortschritt

- [x] Bulk 0 · Scope, Baseline und technische Entscheidungen
- [x] Bulk 1 · Signature-Fundament, Routen und Export-Runtime
- [x] Bulk 2 · WERKFORM Signature
- [x] Bulk 3 · FARBFORM Signature
- [x] Bulk 4 · GRÜNRAUM Signature
- [x] Bulk 5 · LINDENWIRT Signature
- [ ] Bulk 6 · AUFSCHLAG Signature
- [ ] Bulk 7 · Variantenwahl im Showroom
- [ ] Bulk 8 · Gesamtperformance, Accessibility und Pages-Härtung
- [ ] Bulk 9 · Abschlussvergleich, Dokumentation und Veröffentlichung

---

# Bulk 0 · Scope, Baseline und technische Entscheidungen

## Ziel

Vor dem sichtbaren Ausbau werden Anforderungen, Referenzen, Messwerte und technische Grenzen fixiert. In diesem Bulk entstehen noch keine Signature-Seiten.

## Aufgaben

- [x] Die fünf Mockups unverändert unter `docs/design/signature-reference/` ablegen.
- [x] Pro Referenz Urheber, Erstellungsweg, Format und vorgesehene Verwendung dokumentieren.
- [x] Die beiden Playbooks als verbindliche Konzeptgrundlage verlinken.
- [x] Bestehende Core-Routen, Interaktionen und Screenshots erneut als unveränderliche Baseline erfassen.
- [x] Aktuellen JavaScript-, CSS-, Bild- und 3D-Payload messen.
- [x] Zielbudgets aus Abschnitt 5 anhand der Messwerte bestätigen oder begründet anpassen.
- [x] Direkte Three.js-Runtime gegen einen kleinen R3F-Spike vergleichen.
- [x] Architekturentscheidung in diesem Dokument final markieren.
- [x] Gemeinsames Asset-Manifestformat für Quelle, Lizenz, Autor und Bearbeitung definieren.
- [x] Namensschema für Signature-Komponenten, CSS und QA-Artefakte definieren.
- [x] Festhalten, welche Inhalte der Mockups reine Platzhalter sind.
- [x] Für jede Marke eine konkrete Kerninteraktion und maximal zwei unterstützende Microinteractions festlegen.
- [x] Prüfen, dass der Arbeitsbaum vor dem ersten Implementierungsbulk keine fremden Änderungen enthält.

## Abnahme

- [x] Fünf Referenzbilder und fünf kompakte Art-Direction-Briefings liegen im Repository.
- [x] Performance- und Accessibility-Baseline ist dokumentiert.
- [x] Alle offenen Architekturentscheidungen sind aufgelöst.
- [x] Keine sichtbare Core-Seite wurde verändert.

---

# Bulk 1 · Signature-Fundament, Routen und Export-Runtime

## Ziel

Eine gemeinsame, aber visuell neutrale technische Grundlage trägt alle fünf Signature-Seiten, ohne deren Markenwirkung zu vereinheitlichen.

## Aufgaben

- [x] Fünf neue `/signature/`-Routen als zunächst reduzierte, separat aufrufbare Seiten anlegen.
- [x] Gemeinsame semantische Bausteine für Header, Hero-Copy, Interaction Rail, Hotspots, Media-Teaser und Trust-Metriken definieren.
- [x] Sichtbare Marken-CSS-Dateien getrennt halten.
- [x] Einen gemeinsamen Signature-State-Controller für Tabs, aktive Hotspots und Medienzustände entwickeln.
- [x] Browserneutrale Runtime-Einstiege für den statischen Pages-Export vorsehen.
- [x] Runtime nur auf Signature-Routen laden.
- [x] Gemeinsames Lazy-Loading- und Sichtbarkeitsverhalten definieren.
- [x] Statisches Fallback-Muster mit `<picture>` und aussagekräftigem Alternativtext definieren.
- [x] Fehlerstatus für fehlendes WebGL, fehlerhafte Assets und schwache Geräte definieren.
- [x] Focus-, Escape-, Tastatur- und Pointer-Grundlagen implementieren.
- [x] Reduced-Motion-Grundlagen implementieren.
- [x] Pages-Exporter um die fünf neuen Routen erweitern.
- [x] Export-QA von 25 auf zunächst 30 erwartete Routen vorbereiten.
- [x] Prüfen, dass keine Signature-Runtime auf Core-Seiten geladen wird.

## Abnahme

- [x] Alle fünf Signature-Routen antworten lokal und im statischen Export mit HTTP 200.
- [x] Jede Route besitzt genau eine H1 und eine erkennbare Fallback-Darstellung.
- [x] Die bestehenden 25 Routen sind unverändert erreichbar.
- [x] Core-Seiten laden keinen zusätzlichen Three.js-/Signature-Bundle.

---

# Bulk 2 · WERKFORM Signature

## Ziel

Eine technisch glaubwürdige, fotorealistische Produktinszenierung verbindet CAD-Verständnis, Fertigungslogik und Exploded View.

## Geplantes Erlebnis

```text
Zeichnung → Fertigung → Bauteil → Exploded View
```

## Asset-Pipeline

- [x] Eine für Metallbau glaubwürdige Baugruppe mit getrennten Komponenten auswählen oder in Blender aufbauen.
- [x] Sicherstellen, dass Hauptkörper, Platten, Schrauben, Muttern, Scheiben und Verbindungsteile eigene benannte Nodes besitzen.
- [x] Bevels, Normalen, Maßstab und Pivotpunkte in Blender prüfen.
- [x] Optimiertes GLB exportieren.
- [x] Meshopt-/Geometrieoptimierung prüfen.
- [x] Metallmaterialien mit kontrollierter Roughness und subtiler Variation kalibrieren.
- [x] Studio-HDRI bzw. lokale Environment Map auswählen und lizenzieren.
- [x] Hochwertigen statischen Fallback aus derselben Kameraposition rendern.

## Seite und Interaktion

- [x] Desktop-Komposition anhand des WERKFORM-Mockups aufbauen.
- [x] Serif-Headline und technische UI als echtes DOM umsetzen.
- [x] Vier Zustandsbuttons implementieren.
- [x] Weiche, unterbrechbare Zustandsinterpolation implementieren.
- [x] Explosions-Offsets pro benanntem Bauteil definieren.
- [x] Optionalen Fortschrittsregler zwischen montiertem Zustand und Exploded View implementieren.
- [x] CAD-/Wireframe-Modus implementieren.
- [x] DOM-Hotspots auf echte 3D-Anker projizieren.
- [x] Detailpanel für Material, Verstärkung, Verbindung und Grundplatte umsetzen.
- [x] Begrenzte Kamera mit Drag, Pinch und kontrolliertem Zoom implementieren.
- [x] Auto-Rotation nur bis zur ersten Nutzereingabe aktivieren.
- [x] Mobile Komposition mit weniger gleichzeitigen Hotspots umsetzen.
- [x] Bestehende Core-WERKFORM-Seite vollständig erhalten.

## Abnahme

- [x] Exploded View zeigt fachlich nachvollziehbare Bauteilbeziehungen.
- [x] Kein Teil springt, driftet oder schneidet sichtbar durch ein anderes.
- [x] Hotspots bleiben bei Rotation an ihren Bauteilen.
- [x] Fallback und Reduced Motion sind visuell hochwertig.
- [x] GLB, Runtime und Environment bleiben innerhalb der bestätigten Budgets.
- [x] Statischer GitHub-Pages-Export funktioniert interaktiv.

## Ist-Stand nach Premium Fidelity Pass

**Veröffentlicht:** Commit `5fcad63` · [WERKFORM Signature live](https://emfau88.github.io/shop/konzept/metallbau/signature/)

Die funktionale Signature-Ausarbeitung und der erste visuelle Premium-Pass sind abgeschlossen. Die vorherige abstrakte Kastenbaugruppe wurde nach Nutzerfeedback durch einen technisch lesbaren Umlenkrollen-/Lagerbock ersetzt: Rolle, Achse, Lagerkartuschen, Distanzringe, Seitenwangen, Kreuzstrebe und Fußverschraubung besitzen einen nachvollziehbaren Last- und Montageweg. Werkstattbühne, Materialfinish, Kamerakomposition und Zustandsdarstellung liegen näher an der Referenz, ohne deren UI als Bild zu übernehmen.

### Premium-Finishing

- [x] Hybriden Werkstatt-/Studiohintergrund mit glaubwürdiger Tiefenunschärfe und Fensterlicht ergänzen.
- [x] Metalloberflächen um gebürstete Mikrostruktur, subtile Roughness-Variation und feinere Kontaktreflexe erweitern.
- [x] Schraubengewinde, Innensechskant, offene Scheiben und Lagerdetails im Nahbereich modellieren.
- [x] Technisch unklare Demo-Baugruppe durch einen funktional lesbaren Rollenbock ersetzen.
- [x] Kameraframing so nachziehen, dass die komplette Grundplatte bei 1440 × 1000 ruhig im sichtbaren Hero sitzt.
- [x] Hotspots auf feste kollisionsarme Labelzonen routen und mit geknickten SVG-Führungslinien anbinden.
- [x] Zustandsrail um konsistente technische Icons ergänzen.
- [x] Media-Teaser mit echter Vorschaugrafik statt reiner Infokarte ausarbeiten.
- [x] Handschriftlichen Markenakzent als eigenständiges DOM-Detail ergänzen.
- [x] Eine zurückhaltende bündige WERKFORM-Gravur auf der Grundplatte ergänzen.

Das 3D-Modell, die routenspezifische Runtime und das semantische DOM bleiben vollständig reproduzierbar und getrennt von der Core-Seite.

---

# Bulk 3 · FARBFORM Signature

## Ziel

Eine hochwertige Interior-Experience macht Farbe, Material, Boden und Licht unmittelbar vergleichbar.

## Geplantes Erlebnis

```text
Wandfarbe + Boden + Lichtpreset + Vorher/Nachher
```

## Asset-Pipeline

- [x] Entscheiden, ob ein einfacher echter 3D-Raum mit gebackener Beleuchtung die Mockup-Qualität erreicht. Entscheidung: Nein; Fotolayer sind sichtbar hochwertiger und erheblich leichter.
- [x] Verbindliche Hybridlösung aus photorealem Clean Hero und gezielter DOM-/Materialinteraktion verwenden.
- [x] Clean Hero ohne Text, Logo, UI oder Hotspots bereitstellen.
- [x] Perspektivisch identischen Vorher-Zustand bereitstellen.
- [x] Separate 3D-Geometrie verworfen; Wandzustände werden als deckungsgleiche Fotolayer, Bodenwirkung als isolierte CSS-Ebene geführt.
- [x] Salbei-, Aubergine-, Mineral- und Sandzustand kalibrieren.
- [x] Eichenboden und Putzwirkung mit optimierten Fotoebenen und leichten CSS-Overlays umsetzen; kein PBR-Payload erforderlich.
- [x] Hochwertigen statischen Fallback für Mobile bereitstellen; WebGL wird für diese Experience nicht benötigt.

## Seite und Interaktion

- [x] Helle, ruhige Desktop-Komposition anhand des FARBFORM-Mockups umsetzen.
- [x] UI, Farbauswahl und Hotspots als echtes DOM umsetzen.
- [x] Wandfarben ohne Szenenneuladung wechseln.
- [x] Bodenvarianten ohne Szenenneuladung wechseln.
- [x] Warmes und neutrales Lichtpreset umsetzen.
- [x] Vorher-/Nachher-Regler mit Maus, Touch und Tastatur umsetzen.
- [x] Direkte Manipulation und Sliderzustand synchronisieren.
- [x] Wechsel mit kurzen, ruhigen Materialübergängen gestalten.
- [x] Mobile Reihenfolge Hero → Auswahl → Vergleich → Details umsetzen.
- [x] Bestehende Core-FARBFORM-Seite und deren aktuellen Vergleich vollständig erhalten.

## Abnahme

- [x] Materialwechsel verursachen keinen vollständigen Reload und kein sichtbares Flackern.
- [x] Vorher/Nachher funktioniert über einen nativen Range-Regler mit Pfeiltasten sowie Touch.
- [x] Farben bleiben bei unterschiedlichen Displays visuell unterscheidbar.
- [x] Raum wirkt nicht wie eine technische 3D-Demo oder ein Computerspiel.
- [x] Hybrid- und Fallbackzustand bleiben gestalterisch gleichwertig.

## Ist-Stand · 2026-09-14

- Vier Wandfarben, zwei Bodenwirkungen und zwei Lichtpresets sind kombiniert bedienbar.
- Der Vorher-/Nachher-Regler ist ein natives Formelement und bleibt mit Maus, Touch und Tastatur steuerbar.
- Der Regler verwendet ein einziges neutrales Raumfoto mit transparenten, verlustfreien Wandebenen. Sofa, Fenster, Tisch und Boden werden nie zwischen Vollbildern ausgetauscht.
- Olive und Wandbild liegen als gemeinsame Dekorebenen über allen Zuständen und bleiben dadurch beim Ziehen pixelstabil.
- Ein neuer Clean Master und ein separater Pflanzen-Cutout wurden mit der eingebauten OpenAI-Bilderzeugung erstellt; Prompt und Pipeline sind im Asset-Manifest dokumentiert.
- Desktop (1440 × 960) und Mobile (390 × 844) sind unter `docs/qa/signature-bulk-3-farbform/` visuell dokumentiert.

---

# Bulk 4 · GRÜNRAUM Signature

## Ziel

Ein fotografisch starker Garten-Hero wird mit einem echten, kontrollierten Projektviewer verbunden, der die Entstehung eines Außenraums verständlich macht.

## Geplantes Erlebnis

```text
Bestand → Entwurf → Umsetzung → Ergebnis
```

## Verbindliche Hybridstrategie

Der Hero darf fotografisch bzw. vorgerendert sein. Die Projekttransformation wird als gezielte interaktive Szene umgesetzt. Ein vollständig in Echtzeit gerenderter fotorealistischer Garten ist nicht das Ziel des ersten Ausbaus.

## Asset-Pipeline

- [x] Clean Hero ohne eingebrannte UI erzeugen oder auswählen.
- [x] Terrain, Hauskörper, Terrasse, Weg, Mauer und Beet als getrennte Projektzonen definieren. Entscheidung: pixelstabile Foto-, Masken- und SVG-Ebenen statt schwacher Echtzeitgeometrie.
- [x] Pflaster-, Stein-, Holz- und Erdmaterialien vorbereiten. Entscheidung: Materialien bleiben im fotografischen Master; gezielte Reveal-Masken übernehmen den Baufortschritt.
- [x] Wenige hochwertige Pflanzenmodelle auswählen und Lizenz dokumentieren. Entscheidung: keine externen Pflanzenmodelle; Vegetation ist Bestandteil des original generierten Hero-Assets.
- [x] Vegetation per Instancing und Qualitätsstufen planen. Nicht erforderlich, da kein Vegetations- oder WebGL-Modell geladen wird.
- [x] Statische Zustandsbilder für schwache Geräte und WebGL-Ausfall erzeugen. Desktop- und mobiler Clean Hero sind das vollständige Fallback; die Experience benötigt kein WebGL.

## Seite und Interaktion

- [x] Golden-Hour-Komposition anhand des GRÜNRAUM-Mockups umsetzen.
- [x] Terrasse, Mauer, Weg und Beet mit echten DOM-Hotspots erklären.
- [x] Vier Projektphasen als native Buttons umsetzen.
- [x] Bestand reduziert und ohne hervorgehobene fertige Gartenelemente darstellen.
- [x] Entwurf mit Planlinien und markierten Konturen darstellen.
- [x] Umsetzung als kontrollierten Aufbau der Bauteile zeigen.
- [x] Ergebnis mit finalen Materialien und ergänzender Vegetation darstellen.
- [x] Transformationen per Sichtbarkeit, Position, Skalierung und Materialwirkung interpolieren.
- [x] Auf Mobile maximal einen aktiven Hotspot gleichzeitig zeigen.
- [x] Bestehende Core-GRÜNRAUM-Seite vollständig erhalten.

## Abnahme

- [x] Die vier Phasen sind ohne Erklärung unterscheidbar.
- [x] Vegetation dominiert weder Payload noch Bildrate.
- [x] Keine Szene benötigt Scroll-Jacking.
- [x] Der fotografische Hero und der Projektviewer wirken wie eine gemeinsame Marke.
- [x] Mittlere Mobilgeräte erreichen das bestätigte Performanceziel.

## Ist-Stand · 2026-09-23

- Die finale Experience umgeht die generische SignatureShell und übersetzt **„Vom Ort zum Lebensraum“** in sieben eigenständige Bereiche: Hero, Ortsanalyse, Projektentwicklung, Handwerk, Pflanzentwicklung, Gartenalltag und Anfrage.
- Ein original generierter Clean Hero verbindet Golden-Hour-Architektur, Terrasse, Natursteinmauer, Weg und Staudenbeet ohne eingebrannte UI.
- Die zentrale Transformation nutzt einen einzigen pixelstabilen Bildraum: Bestands-Veil und Vermessungsraster, echte SVG-Entwurfskonturen, gestaffelte CSS-Reveals für Terrasse, Mauer, Weg und Beet sowie das freie fotografische Ergebnis.
- Vier native Phasenbuttons funktionieren mit Maus, Touch und Pfeiltasten. Terrasse, Mauer, Weg und Beet sind als semantische DOM-Details bedienbar und per Escape schließbar.
- Handwerk, Jahreszeiten, Alltagssituationen und Leistungswege besitzen eigene visuelle Rhythmen statt weiterer Varianten derselben Hero-Komposition.
- Mobile ist vollständig neu komponiert: Projektanfrage und Projektweg bleiben früh sichtbar, die Phasensteuerung wird verdichtet und je Projektphase erscheint höchstens ein Hotspot.
- Desktop (1440 × 900/1000), Mobile (390 × 844) und die Breiten 360, 430, 768 sowie 1920 wurden ohne horizontalen Overflow geprüft.
- Der Hero liegt mit 279.912 B Desktop und 165.534 B Mobile innerhalb der Zielbudgets. Es gibt keinen WebGL-, Modell- oder externen Vegetations-Payload.
- Lint, Typecheck, Build, 30-Routen-Pages-Export und Export-QA sind erfolgreich. Die Seite ist lokal zur Abnahme bereit; Commit und Veröffentlichung folgen erst nach Freigabe.

---

# Bulk 5 · LINDENWIRT Signature

## Ziel

Eine stark atmosphärische Restaurant- und Eventseite erreicht Premiumwirkung durch Licht, Fotografie, Typografie und ruhige Interaktion statt durch unnötiges Voll-3D.

## Asset-Pipeline

- [x] Clean Hero ohne UI oder eingebrannten Text erzeugen oder auswählen.
- [x] Desktop-, Tablet- und Mobile-Crops definieren.
- [x] Optional einen kurzen, stummen und loopfähigen Ambient-Clip prüfen. Entscheidung: kein Video; das ruhige Standbild ist atmosphärisch vollständig und spart Payload.
- [x] Statische, responsive Bildquellen als belastbaren Fallback bereitstellen.
- [x] Alle Medien lokal optimieren und lizenzieren.

## Seite und Interaktion

- [x] Desktop-Komposition anhand des LINDENWIRT-Mockups umsetzen.
- [x] Familienfeier, Hochzeit, Firmenabend und Räume als native Zustände umsetzen.
- [x] Zustand wechselt Copy, Beispielkonfiguration, Bildquelle beziehungsweise Bildausschnitt und CTA.
- [x] Anlassdetails für Raum und Abend als semantische Definitionen statt dekorativer Hotspots umsetzen.
- [x] Karte, Küche, Anlass, Materialität und Gemeinschaft als eigenständige redaktionelle Screens komponieren.
- [x] Animationen langsam, ruhig und unterbrechbar halten.
- [x] Reservierungs- und Anfragewege auf bestehende Core-Seiten führen.
- [x] Mobile Fokusreihenfolge auf CTA, Zustände und Kerndetails reduzieren.
- [x] Bestehende Core-LINDENWIRT-Seite vollständig erhalten.

## Abnahme

- [x] Die Seite wirkt auch mit statischem Bild vollständig und hochwertig.
- [x] Video ist optional und blockiert niemals den Seitenstart; aktuell wird bewusst kein Video geladen.
- [x] Keine fiktive Verfügbarkeit wird als Live-Datum ausgegeben.
- [x] Warme Lichtwirkung behält ausreichenden Textkontrast.

## Ist-Stand · 2026-09-22

- Der helle Ankommens-Hero zeigt Gastraum, Öffnungszeit, Adresse, Abendkarte und Reservierungsweg ohne dunkle generische Signature-Bühne.
- Sieben eigenständige Screens übersetzen **Ankommen → Teilen → Bleiben** in Karte, Feuerküche, Anlasswahl, Materialität, Gesellschaft und Reservierungsabschluss.
- Familienfeier, Hochzeit, Firmenabend und Räume wechseln als native Button-Zustände Bild, Copy, Beispielkonfiguration und CTA; der statische Export erhält dafür eine kleine routenspezifische Runtime.
- Desktop (1440 × 900), Tablet (768 × 900) und Mobile (390 × 844) wurden ohne horizontalen Overflow geprüft.
- Die Seite verwendet ausschließlich lokale responsive WebP-Medien und lädt weder WebGL noch Video, Animationsframework oder permanenten Render-Loop.
- Die Core-LINDENWIRT-Seiten bleiben unverändert. Lint, Typecheck, Build, Pages-Export und Export-QA werden vor der lokalen Abnahme vollständig protokolliert; Commit und Veröffentlichung folgen erst nach Freigabe.

---

# Bulk 6 · AUFSCHLAG Signature

## Ziel

Eine Premium-Clubwelt kombiniert hochwertige Sportfotografie mit einer unmittelbaren Auswahl zwischen Tennis, Badminton, Training und Mitgliedschaft.

## Asset-Pipeline

- [ ] Clean Hero ohne UI oder eingebrannten Text erzeugen oder auswählen.
- [ ] Konsistente Tennis- und Badminton-Zustände vorbereiten.
- [ ] Optional ein leichtes 3D-Signature-Objekt wie Ball oder Schläger prüfen.
- [ ] 3D nur übernehmen, wenn es gegenüber der Fotovariante sichtbar gewinnt.
- [ ] Statischen Fallback und mobile Crops erstellen.

## Seite und Interaktion

- [ ] Desktop-Komposition anhand des AUFSCHLAG-Mockups umsetzen.
- [ ] Tennis, Badminton, Training und Mitgliedschaft als native Zustände umsetzen.
- [ ] Sportart wechselt Akzent, relevante Copy, Bildzustand und CTA.
- [ ] Freie-Plätze-Darstellung klar als fiktives Beispiel kennzeichnen.
- [ ] Clubhaus- und Platz-Hotspots umsetzen.
- [ ] Bestehenden Core-Wochenplan nicht duplizieren, sondern gezielt verlinken.
- [ ] Optionales 3D-Objekt subtil bewegen und nach Nutzereingabe stoppen.
- [ ] Mobile Darstellung auf einen Sportzustand und einen klaren CTA fokussieren.
- [ ] Bestehende Core-AUFSCHLAG-Seite vollständig erhalten.

## Abnahme

- [ ] Fotografie und UI vermitteln Premium-Club statt Vereinsportal.
- [ ] Kernfunktion bleibt ohne optionales 3D vollständig.
- [ ] Beispielzeiten und Kapazitäten sind nicht mit einem echten Live-System verwechselbar.
- [ ] Sportzustände und CTA bleiben mit Tastatur und Touch bedienbar.

---

# Bulk 7 · Variantenwahl im Showroom

## Ziel

Besucher verstehen sofort, dass jedes Konzept in zwei unterschiedlichen Erlebnisstufen vorliegt, ohne dass die Übersicht überladen wirkt.

## Aufgaben

- [ ] Datenmodell der Konzeptübersicht um `coreHref`, `signatureHref` und Signature-Merkmale erweitern.
- [ ] Pro Konzept zwei klar beschriftete CTAs einführen: „Core ansehen“ und „Signature ansehen“.
- [ ] Signature nicht als bloß „besser“, sondern als anderes Leistungsniveau erklären.
- [ ] Auf `/konzepte/` die bestehende markenspezifische Case-Gestaltung erhalten.
- [ ] Signature-Vorschauen mit eigenen, optimierten Teaserbildern versehen.
- [ ] Auf der Anbieterhomepage die beiden Angebotsstufen verständlich einordnen.
- [ ] Von jeder Signature-Seite einen sichtbaren Weg zur Core-Version anbieten.
- [ ] Von jeder Core-Homepage einen zurückhaltenden Weg zur Signature-Version anbieten.
- [ ] README-Livetabelle um die fünf Signature-Routen ergänzen.
- [ ] DemoBar und Offenlegungstexte auf allen neuen Routen prüfen.

## Abnahme

- [ ] Beide Varianten jedes Konzepts sind in höchstens zwei Interaktionen erreichbar.
- [ ] Mobile CTAs sind eindeutig und nicht zu dicht angeordnet.
- [ ] Bestehende Bildlinks verlieren ihre Funktion nicht.
- [ ] Besucher können Core und Signature sprachlich unterscheiden.

---

# Bulk 8 · Gesamtperformance, Accessibility und Pages-Härtung

## Ziel

Alle neuen Experiences funktionieren als gemeinsames System robust auf GitHub Pages, ohne die Core-Seiten oder schwächere Geräte zu belasten.

## Aufgaben

- [ ] Alle 30 Routen in `export-pages.mjs` erfassen.
- [ ] `qa-static-export.mjs` auf 30 erwartete HTML-Routen aktualisieren.
- [ ] Pro Signature-Route prüfen, dass Runtime, GLB, Bilder, Environment Maps und Poster vorhanden sind.
- [ ] Sicherstellen, dass Signature-Bundles nicht pauschal auf allen Seiten geladen werden.
- [ ] Gemeinsame Three.js-Abhängigkeiten sinnvoll bündeln oder routenspezifisch trennen.
- [ ] GLB-Dateigrößen, Texturen und Draw Calls dokumentieren.
- [ ] Offscreen-Szenen pausieren.
- [ ] Auto-Rotation bei verstecktem Tab pausieren.
- [ ] WebGL-Kontexte und Event Listener beim Verlassen sauber freigeben.
- [ ] Tastaturprüfung aller Tabs, Slider, Hotspots, Dialoge und Reset-Funktionen durchführen.
- [ ] Screenreader-Namen und `aria-live`-Bereiche prüfen.
- [ ] Kontrastprüfung aller über Bildern liegenden Texte durchführen.
- [ ] Reduced-Motion-Varianten aller fünf Seiten prüfen.
- [ ] WebGL-Ausfall simulieren und Fallback prüfen.
- [ ] Langsame Verbindung sowie fehlerhaften Assetabruf simulieren.
- [ ] Mobile Performance mit niedrigerem DPR-/Schattenprofil prüfen.
- [ ] Keine Browserfehler auf Core- und Signature-Routen bestätigen.

## Abnahme

- [ ] 30/30 Routen werden exportiert.
- [ ] 30/30 Routen besitzen genau eine H1.
- [ ] Keine lokale Referenz fehlt.
- [ ] Keine unpräfixierten `/shop/`-Pfade verbleiben.
- [ ] Core-Routen zeigen keinen messbaren Signature-Payload.
- [ ] Alle fünf Signature-Seiten besitzen funktionierende Fallbacks.

---

# Bulk 9 · Abschlussvergleich, Dokumentation und Veröffentlichung

## Ziel

Die fünf Signature-Versionen werden als geschlossenes, nachvollziehbar geprüftes Portfolio-Angebot veröffentlicht.

## Aufgaben

- [ ] Für jede Marke Core und Signature bei 1440 × 1000 direkt vergleichen.
- [ ] Für jede Signature-Seite einen mobilen Screenshot bei 390 × 844 erstellen.
- [ ] Pro Marke dokumentieren: Was wurde besser, was wurde komplexer, was wurde bewusst nicht umgesetzt?
- [ ] Payload-, Bild- und 3D-Messwerte in einem Abschlussbericht festhalten.
- [ ] Funktionsmatrix für Maus, Touch, Tastatur, Reduced Motion und Fallback erstellen.
- [ ] Quellen- und Lizenzmanifest vollständig prüfen.
- [ ] Fiktive Kennzahlen, Termine und Aussagen nochmals redaktionell prüfen.
- [ ] README, Routentabelle und lokale Startanleitung aktualisieren.
- [ ] Vollständigen Lint-, Typecheck-, Build-, Export- und Browserlauf durchführen.
- [ ] Änderungen in logisch nachvollziehbare Commits aufteilen.
- [ ] Vor Push finalen Diff und Git-Status prüfen.
- [ ] Auf `main` pushen und Pages-Workflow bis zum Abschluss beobachten.
- [ ] Live-Routen nach Deployment im Browser prüfen.
- [ ] Abschlussstatus und verbleibende optionale Ausbaustufen dokumentieren.

## Abnahme

- [ ] Alle fünf Core- und alle fünf Signature-Homepages sind live erreichbar.
- [ ] GitHub-Pages-Workflow ist erfolgreich.
- [ ] Live-Browserprüfung zeigt keine Fehler oder fehlenden Assets.
- [ ] Die Variantenwahl ist auf Desktop und Mobil verständlich.
- [ ] Der Arbeitsbaum ist nach dem Abschluss sauber.

---

# 7. Prüfraster pro Marke

Dieses Raster wird nach jedem Markenbulk kopiert und ausgefüllt.

## Wirkung

- [ ] Markenwirkung entspricht der Referenz.
- [ ] Hero besitzt einen klaren visuellen Schwerpunkt.
- [ ] Headline und CTA bleiben vor dem Medium lesbar.
- [ ] Interaktion unterstützt die Leistungsaussage.
- [ ] Die Seite wirkt nicht wie eine technische Demo.

## Funktion

- [ ] Primäre Zustände funktionieren.
- [ ] Manuelle Interaktion stoppt automatische Bewegung.
- [ ] Reset stellt einen definierten Ausgangszustand her.
- [ ] Hotspots bleiben am richtigen Objekt bzw. Bildbereich.
- [ ] Navigation führt auf gültige Ziele.

## Robustheit

- [ ] Desktop geprüft.
- [ ] Tablet geprüft.
- [ ] Mobile geprüft.
- [ ] Touch geprüft.
- [ ] Tastatur geprüft.
- [ ] Reduced Motion geprüft.
- [ ] Fallback geprüft.
- [ ] Statischer Export geprüft.
- [ ] Live-Deployment geprüft.

## Ergebnisentscheidung

- [ ] Behalten
- [ ] Überarbeiten
- [ ] Verwerfen

Notiz:

```text

```

# 8. Risiken und Gegenmaßnahmen

| Risiko                                            | Gegenmaßnahme                                                                                       |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Mockups enthalten eingebrannte UI                 | Clean Assets separat erzeugen; UI ausschließlich als DOM                                            |
| Photorealismus wird im Echtzeit-3D nicht erreicht | Hybrid oder hochwertiger statischer Fallback statt schwacher Voll-3D-Szene                          |
| Mobile GPU wird überlastet                        | reduzierte DPR, Schatten und Hotspots; LOD/Instancing; statischer Fallback                          |
| GitHub Pages aktiviert React nicht                | eigenständige browserneutrale Runtime pro benötigter Route                                          |
| Doppelte Seiten führen zu Inhaltsdrift            | nur Homepages duplizieren; Unterseiten zunächst gemeinsam verwenden                                 |
| 3D-Assets sind nicht zerlegbar                    | Node- und Pivot-Anforderungen vor Assetübernahme prüfen                                             |
| Lizenz oder Urheber ist unklar                    | Asset erst nach dokumentierter Quelle und Lizenz ins Repository übernehmen                          |
| Signature wird überall gleich                     | nur Mechanik teilen; Layout, Typografie, Bildsprache und Bewegungscharakter markenspezifisch halten |
| Fiktive Daten wirken real                         | unmittelbare Kennzeichnung als Demonstrationsinhalt                                                 |
| Bundle wächst auf Core-Seiten                     | routenspezifisches Laden automatisiert kontrollieren                                                |

# 9. Nicht Bestandteil dieses Programms

- [ ] Keine zweite Version aller bestehenden Unterseiten.
- [ ] Kein CMS oder Backend.
- [ ] Keine echten Reservierungen, Live-Termine oder Verfügbarkeiten.
- [ ] Keine ungeprüften Kundenlogos, Referenzen oder Zertifikate.
- [ ] Kein Scroll-Jacking.
- [ ] Keine vollständige Website im WebGL-Canvas.
- [ ] Kein Zwang zu 3D bei LINDENWIRT oder AUFSCHLAG.
- [ ] Keine Veröffentlichung eines Assets ohne Lizenznachweis.

# 10. Empfohlener Arbeitsrhythmus

Jeder Bulk folgt demselben Ablauf:

```text
Referenz und Ziel festlegen
→ Asset-Risiko zuerst lösen
→ semantisches Markup
→ Desktop-Komposition
→ echte Kerninteraktion
→ Mobile-Neukomposition
→ Fallback und Reduced Motion
→ automatisierte Prüfung
→ visueller Alt/Neu-Vergleich
→ Nutzerentscheidung
→ Commit und Push
```

So bleibt nach jedem Bulk ein überprüfbarer, rücknehmbarer und veröffentlichungsfähiger Stand erhalten.
