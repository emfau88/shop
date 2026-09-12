# High-End-Showroom-Redesign

**Stand:** 12. September 2026
**Ausgangs-Commit:** `f490f59` (`main`)
**Status:** Bulk 9 abgeschlossen · Gesamt-QA und Abschlussdokumentation
**Gestalterische Produktänderungen in Bulk 0:** keine

## Ziel und Arbeitsprinzip

Der bestehende Showroom wird nicht neu erfunden, sondern als Sammlung von fünf eigenständigen digitalen Markenwelten weiterentwickelt. Branchenspezifische Inhalte, funktionierende Nutzerwege und die transparente Kennzeichnung als fiktive Konzeptprojekte bleiben erhalten.

Geteilt werden dürfen nur unsichtbare, robuste Mechaniken. Seitenkomposition, Typografie, Bildrhythmus, Interaktionscharakter und CTA-Dramaturgie bleiben je Marke eigenständig.

## Verbindliche Leitplanken

- Pro Konzept genau ein klarer Signature-Moment und höchstens zwei bis drei unterstützende Microinteractions.
- Keine Technologie als Selbstzweck; WebGL und Video sind kein Pflichtbestandteil.
- Bestehende Inhalte werden bevorzugt weiterentwickelt, nicht durch generische Marketingtexte ersetzt.
- Keine echten Zertifikate, Bewertungen, Referenzkunden, Firmendaten oder Ansprechpartner erfinden.
- Harte Demonstrationsdaten müssen im unmittelbaren Kontext als Beispiel bzw. fiktives Projektdetail erkennbar sein.
- Die DemoBar bleibt auf allen Konzeptseiten erhalten und führt weiterhin zur Übersicht zurück.
- Hover ist nie der einzige Zugang zu einer Funktion. Jede Signature-Funktion erhält eine Touch- und Tastaturlösung.
- `prefers-reduced-motion` liefert eine vollständige, verständliche statische Variante.
- Keine große Vorabmigration des CSS. Markengrenzen werden beim jeweiligen vertikalen Umbau schrittweise geklärt.
- Keine neue Library, solange CSS, SVG und vorhandenes React sinnvoll ausreichen.

## Technischer Ausgangspunkt

### Projektstruktur

- Vinext/React-Anwendung mit 25 Seitenrouten.
- 108 TSX-Dateien in `website/app` und `website/components`.
- 17 lokale WebP-Bilder mit zusammen 4.013.052 Byte.
- `website/app/globals.css`: 4.300 Zeilen / 77.299 Byte.
- `galabau.css`: 1.892 Zeilen / 34.678 Byte.
- `sportverein.css`: 1.385 Zeilen / 26.435 Byte.
- `gastronomie.css`: 1.380 Zeilen / 23.551 Byte.
- `metallbau.css`: 269 Zeilen / 4.480 Byte; weitere Werkform-Regeln liegen derzeit noch im globalen Stylesheet.
- Farbform und Anbieterauftritt teilen wesentliche Teile des globalen Stylesheets.

### Routeninventar

| Bereich | Routen |
| --- | --- |
| Anbieter | `/`, `/konzepte`, `/impressum`, `/datenschutz` |
| WERKFORM | `/konzept/metallbau`, `/leistungen`, `/einblicke`, `/anfrage` |
| FARBFORM | `/konzept/maler`, `/leistungen`, `/gestaltung`, `/kontakt` |
| GRÜNRAUM | `/konzept/galabau`, `/leistungen`, `/gartenideen`, `/anfrage` |
| AUFSCHLAG | `/konzept/sportverein`, `/training`, `/verein`, `/probetraining` |
| LINDENWIRT | `/konzept/gastronomie`, `/speisekarte`, `/haus`, `/feiern`, `/reservieren` |

Die verkürzten Unterseitenpfade in der Tabelle beziehen sich jeweils auf den davor genannten Konzeptpfad.

### Bestehende Mechaniken

- Sechs eigenständige Navigationsvarianten mit mobilem Disclosure-Menü, Escape-Behandlung und Fokus-Rückgabe.
- Fünf simulierte Formulare mit nativer Validierung, Demo-Erfolgszustand und `aria-live`.
- Funktionaler, clientseitiger Wochenplanfilter bei AUFSCHLAG.
- Statische Vorher-/Nachher-Darstellung bei FARBFORM.
- Semantische Fertigungsmatrix bei WERKFORM.
- Projektgeschichte mit Projektdaten bei GRÜNRAUM.
- Menü-, Öffnungs- und Reservierungswege bei LINDENWIRT.
- Gemeinsame DemoBar und globale Noindex-Konfiguration.

Die Menü- und Formularlogik ist mehrfach implementiert. Später dürfen dafür kleine headless Hooks entstehen; das visuelle Markup und die Gestaltung werden nicht vereinheitlicht.

## Baseline-Qualität

### Automatisierte Prüfungen

| Prüfung | Ergebnis |
| --- | --- |
| Projekt-Build | erfolgreich; alle 25 Routen enthalten |
| Lint | erfolgreich, keine Findings |
| Typecheck | erfolgreich |
| Mobile-Routensweep bei 390 × 844 | 25/25 Routen erreichbar |
| H1-Struktur | 25/25 Routen mit genau einer H1 |
| Horizontaler Overflow bei 390 px | 0/25 Routen |
| Browserfehler im Routensweep | keine |
| Mobile Menüs | 6/6 öffnen und schließen; Escape gibt Fokus zurück |
| AUFSCHLAG-Filter | 5 Termine gesamt, 4 nach Auswahl „Tennis“, `aria-pressed=true` |

Der Vinext-Build meldet die bekannten Routen als `Unknown`, weil die Beta-Version die statische Klassifikation nicht sicher erkennt. Der Build selbst ist erfolgreich. Der Sites-Build-Wrapper scheitert lokal an einem unvollständigen npm-Shim; der normale, projektdefinierte Build funktioniert. Das ist ein Werkzeug-/Umgebungsbefund und kein Produktfehler.

Die Messdaten und Referenzbilder liegen unter `docs/qa/bulk-0-baseline/`.

## Bulk 1 · Technische Leitplanken

### Responsive Bildauslieferung

- Für alle 17 vorhandenen WebP-Quellbilder liegen jetzt lokale Varianten mit 480 und 960 Pixel Breite vor.
- `ResponsiveImage` bündelt `srcset`, `sizes`, explizite Abmessungen, Lazy Loading und asynchrones Decoding, ohne markenspezifisches Markup oder CSS zu vereinheitlichen.
- Alle fünf Marken, die Anbieterstartseite und `/konzepte/` verwenden die Komponente.
- Bei 390 px wird für sichtbare Bilder die 480er-Variante gewählt; bei der zweispaltigen Konzeptübersicht auf Desktop die 960er-Variante. Vollbreite Hero-Bilder dürfen die Originaldatei weiter nutzen.
- Es wurden keine Motive ersetzt, keine Bilder generiert und keine neue Abhängigkeit installiert.

### Bewegungs-, Fokus- und Touch-Fundament

- Die bereits vorhandenen globalen Regeln für sichtbaren Fokus, Touch-Manipulation und `prefers-reduced-motion` liegen nun als klar abgegrenztes `app/interaction-foundations.css` vor.
- Die dokumentierten Bewegungsstufen `fast` (160 ms), `standard` (280 ms) und `slow` (480 ms) stehen künftigen Konzept-Bulks zur Verfügung.
- Bestehende Bild-Hover in Anbieter- und Konzeptübersicht verwenden die Bewegungsvariablen; bei reduzierter Bewegung sind sie weiterhin vollständig deaktiviert.
- Kein sichtbares Marken-Redesign und keine pauschale CSS-Migration wurden in diesem Bulk vorgenommen.

### Bulk-1-Prüfung

| Prüfung | Ergebnis |
| --- | --- |
| Build, Lint, Typecheck | erfolgreich |
| Mobile-Bilder bei 390 px | sichtbare Bilder wählen 480er-Varianten |
| Desktop-Bilder bei 1440 px | bildflächengerechte 960er- bzw. Originalvarianten |
| Kernrouten bei 360 und 430 px | kein horizontaler Overflow |
| Browserfehler | keine |
| Reduced Motion | global vollständig deaktivierte Transitionen und Animationen |

Die zugehörigen Bildauswahlmessungen und Referenzscreenshots liegen unter `docs/qa/bulk-1-responsive-images/`.

Bei der 360-Pixel-Prüfung zeigte FARBFORM zunächst einen 22-Pixel-Überlauf durch die Mindestbreite des Editorial-Zitats. Die Grid-Items dürfen jetzt schrumpfen; die deutschsprachige Langform wird bei Bedarf sauber umgebrochen. Der Retest ist ohne Überlauf.

## Bulk 2 · `/konzepte/`

### Gestalterische Entscheidung

Die Konzeptübersicht funktioniert nun als kuratierter Showroom statt als identische Liste von Case Cards. Der Einstieg benennt den Charakter der Sammlung und macht die Fiktion unmittelbar sichtbar. Eine kompakte Sprungnavigation führt zu allen fünf Konzepten, ohne die eigentlichen Links zu den vollständigen Websites zu ersetzen.

Jede Marke erhält eine andere Silhouette, die ihre spätere Vertiefung vorbereitet:

- **WERKFORM:** breite, technisch gerahmte Fertigungsaufnahme und präzise Informationsspalte.
- **FARBFORM:** editoriale, asymmetrische Fläche mit typografischer Gegenposition zur Bildansicht.
- **GRÜNRAUM:** großformatige, bildgeführte Projektfläche mit zurückhaltender Begleitinformation.
- **AUFSCHLAG:** kompakter, energischer Gegenlauf aus Inhalt und leicht geneigtem Court-Motiv.
- **LINDENWIRT:** atmosphärische Vollfläche mit warmer, kontrastreicher Inhaltszone.

Die Texte wurden auf Rolle, Besonderheit und nächsten Schritt verdichtet. Jede Fallstudie ist sowohl vor dem Öffnen als auch im Intro als fiktives Konzeptprojekt gekennzeichnet. Es wurden keine Unternehmensdaten, Referenzen oder neuen Bildmotive erfunden.

### Technische Umsetzung

- Die fünf Konzepte bleiben datengetrieben in einer kompakten React-Struktur, erhalten aber bewusst markenspezifische Klassen statt einer gemeinsamen Card-Optik.
- Alle Vorschaubilder verwenden weiterhin `ResponsiveImage`; der erste sichtbare Case wird priorisiert geladen.
- Die Sprungnavigation besteht aus nativen Ankern. Bild und CTA führen jeweils vollständig per Tastatur und Touch zur zugehörigen Konzeptseite.
- Die ausschließlich für `/konzepte/` genutzten Regeln liegen als klar begrenzter Bereich im bestehenden Anbieter-Stylesheet. Es wurden keine Abhängigkeiten hinzugefügt und keine Konzeptseite verändert.

### Bulk-2-Prüfung

| Prüfung | Ergebnis |
| --- | --- |
| Desktop bei 1440 px | fünf deutlich unterschiedliche Case-Silhouetten; kein horizontaler Overflow |
| Mobile bei 360, 390 und 430 px | kein horizontaler Overflow; eine H1, fünf Cases und fünf CTAs vorhanden |
| Mobile-Reihenfolge | Intro → Sprungnavigation → WERKFORM → FARBFORM → GRÜNRAUM → AUFSCHLAG → LINDENWIRT |
| Interne Konzeptlinks | alle fünf Ziele mit HTTP 200 erreichbar |
| Lint und Typecheck | erfolgreich |

Die Messwerte liegen unter `docs/qa/bulk-2-konzepte/`. Der abschließende Build, Lint und Typecheck waren erfolgreich; der bekannte Vinext-Hinweis zur statischen Routenklassifikation bleibt unverändert.

## Bulk 3 · WERKFORM

### Gestalterische Entscheidung

WERKFORM wird konsequent vom technischen Arbeitsweg her erzählt. Der Startseiten-Einstieg lautet jetzt „Von der Zeichnung zum Bauteil“ und verbindet den Hero direkt mit einer bedienbaren Prozesssequenz. Sie macht nicht Maschine oder Effekt zur Hauptsache, sondern zeigt die entscheidenden Übergaben: Eingangsdaten, Bearbeitungsfolge und kontrolliertes Bauteil.

Die bestehende Fertigungsmatrix, die Projektprüfung, die Materialbilder und die Anfrage bleiben erhalten. Wiederholte Prozessdreier werden nicht zusätzlich ausgebaut; die vorherige generische Dreischritt-Sektion der Startseite wurde durch die präzisere Sequenz ersetzt.

### Signature Feature

- **Drawing → Manufacturing → Component** ist als native Dreiwegsteuerung mit echten Buttons umgesetzt.
- Jede Stufe zeigt eine funktionale SVG-Skizze sowie Material-, Maß-, Toleranz- oder Übergabehinweise.
- Die SVG ist rein funktionale technische Darstellung, nicht dekoratives 3D. Kein WebGL und keine zusätzliche Bibliothek.
- Auf kleinen Mobilgeräten bleibt die Steuerung samt vollständigem Text sichtbar; die nicht notwendige Diagrammfläche wird ausgeblendet, statt zu verkleinern oder abzuschneiden.
- Die allgemeine Reduced-Motion-Regel deaktiviert die sanften Zustandsübergänge vollständig.

### Unterseiten und Grenzen

- **Fertigung:** Projektbriefing, Capability-Tabelle, Arbeitsweg und Ausgangsbeispiele bleiben als präzise, semantische Informationseinheiten erhalten. Der Anfragepfad wurde auf die gültige allgemeine Projektanfrage zurückgeführt.
- **Qualität:** Die zwei Bilder sind nun ausdrücklich als fiktive Projektansichten statt als Referenzen gekennzeichnet.
- **Projektanfrage:** Native Validierung, Demo-Hinweis und Erfolgszustand bleiben unverändert funktional; ein Dateiupload wird weiterhin korrekt nur als Produktionsausbau beschrieben.
- Es wurden keine realen Qualitätsversprechen, Kundenreferenzen oder Unternehmensangaben ergänzt.

### Bulk-3-Prüfung

| Prüfung | Ergebnis |
| --- | --- |
| Desktop bei 1440 px, alle vier Routen | eine H1 je Route, kein horizontaler Overflow |
| Mobile bei 390 px, alle vier Routen | eine H1 je Route, kein horizontaler Overflow |
| Signature Feature bei 360, 390 und 430 px | drei 64-px-Steuerflächen, kein Overflow, vollständiger Text sichtbar |
| Zustandswechsel | „Fertigung“ aktualisiert sichtbaren Zustand und Inhalt korrekt |
| Anfrageformular | Beispielabsendung zeigt vorhandenen Demo-Erfolgszustand |
| Build, Lint und Typecheck | erfolgreich |

Die Messwerte liegen unter `docs/qa/bulk-3-werkform/`.

## Bulk 4 · FARBFORM

### Gestalterische Entscheidung

FARBFORM wird von der Raumfotografie geführt: Die große Auftaktszene ist nicht länger ein statisches Einzelmotiv, sondern eine bedienbare Farbwelt. Die bestehende Material- und Studiojournal-Sprache bleibt erhalten; der neue Vergleich macht die gestalterische Veränderung direkt erfahrbar, ohne den ruhigen Editorial-Charakter mit unnötiger Motion zu überlagern.

### Signature Feature

- **Raumstimmungen:** Aubergine, Salbei und Mineral wechseln die großformatige, perspektivgleiche Raumdarstellung über drei native Buttons. Die aktive Stimmung ist per `aria-pressed` erkennbar und beschreibt den gewählten Farb- und Lichtcharakter.
- **Vorher/Nachher:** Der bisherige starre Zweibildvergleich ist ein nativer Range-Regler. Er ist mit Maus, Touch und Tastatur bedienbar und zeigt beide Zustände ohne Scroll- oder Hover-Abhängigkeit.
- Zwei neue, gezielt erzeugte Bildvarianten ergänzen die bestehende Aubergine-Szene; alle liegen weiterhin als 480-, 960- und Original-WebP vor.

### Mobile, Performance und Auslieferung

- Auf schmalen Bildschirmen liegen die Stimmungssteuerungen als gut antippbare, gleich breite Buttons unter dem Bild, statt eine wichtige Bildfläche zu verdecken.
- Der Vergleich bleibt im normalen Dokumentfluss, ohne Präzisionsdrag oder Desktop-only-Mechanik.
- Die zentrale Pages-Exportlogik schreibt nun auch alle Einträge in `srcSet` und `imageSrcSet` mit dem GitHub-Pages-Präfix `/shop/`. Damit laden responsive Kachelbilder auf der veröffentlichten Anbieterstartseite nicht mehr vom falschen Wurzelpfad.

### Bulk-4-Prüfung

| Prüfung | Ergebnis |
| --- | --- |
| Lint, Typecheck und Build | erfolgreich |
| Statischer GitHub-Pages-Export | 25 Routen erfolgreich exportiert |
| Anbieterstartseite | fünf Konzept-Kacheln im Export vorhanden |
| Responsive Bildpfade | 0 unpräfixierte `srcSet`- bzw. `imageSrcSet`-Pfade |
| Bildbestand des Exports | 0 fehlende referenzierte Bilddateien |

## Bulk 5 · GRÜNRAUM

GRÜNRAUM erzählt Garten 07 jetzt als steuerbare Projekttransformation statt als Reihe gleichwertiger Projektkarten. Die vier Phasen **Bestand**, **Entwurf**, **Umsetzung** und **Ergebnis** verbinden die bekannten Projektdaten – 420 m², Hanglage, Regenwasser, Naturstein, Holz und Kies – mit jeweils einer eigenen Informationsform. Der Entwurf nutzt eine reduzierte, funktionale Planebene; die übrigen Phasen verwenden die vorhandenen Garten- und Detailmotive.

Die Phasensteuerung besteht aus nativen, tastatur- und touchbedienbaren Buttons. Auf Mobilgeräten wird sie zweispaltig und die jeweilige Phase bleibt vollständig im Dokumentfluss; es gibt weder Scroll-Jacking noch Informationen, die nur im Overlay sichtbar sind.

## Bulk 6 · AUFSCHLAG

AUFSCHLAG beginnt jetzt mit dem nächsten konkreten Beispieltermin. Der prominente **Tennis-/Badminton-Modus** wechselt Hero-Bild, Akzent, Termin, CTA und sichtbare Einträge des Wochenplans gemeinsam. Beide Schalter sind native Buttons mit sichtbarem aktivem Zustand; der bestehende Wochenplanfilter bleibt als ergänzende direkte Trainingssuche erhalten.

Der Wechsel benötigt keine Hover-Geste und bleibt auf kleinen Bildschirmen als gleich große Zweiwegsteuerung über dem Bild sichtbar. Die Court-Linie ist nur ein unterstützendes grafisches Orientierungselement und versteckt keine Information.

## Bulk 7 · LINDENWIRT

LINDENWIRT reduziert den ersten Blick bewusst auf Atmosphäre, Name, heutige Beispielzeit und Reservierung. Die bestehende Gaststubenfotografie bleibt das zentrale Erlebnis; neue technische Effekte oder ein nicht vorhandenes Video wurden bewusst nicht ergänzt. Die Speisekarte bleibt eine typografische Karte mit Gerichten, Beschreibungen und Preisen statt einer Card-Sammlung; ihr Bereich ist nun als ruhiger warmer Papierwechsel gefasst.

Damit zeigt das Konzept bewusst die zurückhaltende Disziplin des Showrooms: Conversion und eine klare nächste Handlung stehen über einem sichtbaren Interaktionsgimmick.

## Bulk 8 · Anbieterhomepage

Die Anbieterhomepage führt nun unmittelbar mit sichtbarer Arbeitsqualität: Neben dem verdichteten Leistungsversprechen steht bereits im ersten Bildschirm eine großformatige Konzeptvorschau mit direktem Zugang zum Showroom. Die fünf Arbeitsbeispiele folgen direkt danach in der Reihenfolge WERKFORM, FARBFORM, GRÜNRAUM, AUFSCHLAG und LINDENWIRT und benennen jeweils die demonstrierte Disziplin statt nur die Branche.

Angebot, Zusammenarbeit, Betriebsmodell, FAQ und Anfrage bleiben erhalten und folgen weiterhin einer verständlichen Verkaufslogik. Der Einstieg wurde sprachlich verkürzt, die Kernaussage geschärft und die bestehende Vertrauensbasis ohne erfundene Kundenlogos, Bewertungen, Personen- oder Standortangaben beibehalten.

Auf Mobilgeräten ordnen sich Leistungsversprechen und Vorschau bewusst untereinander; das Bild reicht kontrolliert bis an die Bildschirmkante. Responsive Bildpfade, alle Showroom-Ziele und der vollständige 25-Routen-Export wurden erneut geprüft.

## Bulk 9 · Gesamt-QA und Abschlussbewertung

Der direkte Desktopvergleich bei 1440 × 1000 und die mobile Abnahme bei 390 × 844 bestätigen eine klare Gesamtverbesserung. Der Fortschritt fällt bewusst unterschiedlich stark aus: Anbieter und AUFSCHLAG wurden im ersten Bildschirm deutlich neu komponiert; WERKFORM, FARBFORM und GRÜNRAUM gewinnen vor allem durch ihre eigenständige Erzähl- und Interaktionslogik; LINDENWIRT wurde gezielt reduziert statt spektakulärer gemacht.

| Seite | Ergebnis des Alt/Neu-Vergleichs |
| --- | --- |
| Anbieter | Deutlich stärker: Showroom-Arbeit ist erstmals im Desktop-Einstieg sichtbar; Aussage und CTA sind konkreter. Mobile bleibt textgeführt, der Showroom folgt knapp unter dem ersten Bildschirm. |
| WERKFORM | Klarer und fachlicher: Der Hero verspricht einen nachvollziehbaren Fertigungsweg statt einer generischen Metallbotschaft; die dreistufige Sequenz trägt die Differenzierung. |
| FARBFORM | Visuell im ersten Bildschirm ähnlich stark wie zuvor, funktional deutlich besser: drei Raumstimmungen und ein nativer Vorher-/Nachher-Regler machen Gestaltung unmittelbar erlebbar. |
| GRÜNRAUM | Der bildstarke Einstieg bleibt bewusst erhalten; die eigentliche Verbesserung liegt in der vierphasigen Projekttransformation und der funktionalen Planansicht weiter unten. |
| AUFSCHLAG | Am stärksten verwandelt: Statt einer allgemeinen Kampagnenfläche stehen Sportmodus, nächster Termin, passendes Bild und gefilterter Wochenplan in einem gemeinsamen Zustand. |
| LINDENWIRT | Ruhiger und conversion-näher: Name, heutige Beispielzeit und Tischanfrage sind schneller erfassbar. Dafür ist der Einstieg weniger erzählerisch als die alte Headline. |

### Im Abschlusslauf behobene Fehler

- Der GitHub-Pages-Export entfernt bewusst die Vinext-/React-Laufzeit. Die neuen Client-Interaktionen waren dadurch online zunächst nur statisch sichtbar. Die kleine Pages-Laufzeit bildet WERKFORM-Prozess, FARBFORM-Stimmungen und Vergleich, GRÜNRAUM-Phasen sowie AUFSCHLAG-Modus nun vollständig nach.
- Beim AUFSCHLAG-Wochenplan konnten „Alle“ und „Jugend“ durch den gekoppelten Sportzustand überschrieben werden. Sportmodus und Planfilter sind jetzt getrennt: Ein Sportwechsel filtert passend, „Alle“ zeigt fünf und „Jugend“ einen Termin, ohne den Hero ungewollt umzuschalten.
- `qa:export` prüft künftig automatisch alle exportierten HTML-Seiten auf Routenzahl, genau eine H1, fehlende lokale Ziele und nicht mit `/shop/` präfixierte Wurzelpfade.

### Abschlussprüfung

| Prüfung | Ergebnis |
| --- | --- |
| Build, Lint, Typecheck | erfolgreich |
| Statischer Export | 25/25 Routen |
| Exportierte Links und Assets | keine fehlenden lokalen Ziele; keine unpräfixierten Wurzelpfade |
| Browser-Routensweep bei 390 × 844 | 25/25 mit genau einer H1, ohne horizontalen Overflow oder defektes sichtbares Bild |
| Sechs Einstiegsseiten bei 1440 × 1000 und 390 × 844 | visuell geprüft; keine Überläufe; alle sichtbaren Bilder geladen |
| Mobile Navigationen | 6/6 öffnen und schließen; Escape gibt Fokus zurück |
| Signature-Interaktionen | 4/4 Zustandswechsel korrekt, inklusive ARIA-Zuständen |
| Demo-Formulare | 6/6 mit lokalem Erfolgszustand; kein Versand und keine Speicherung |
| Browserkonsole | keine Fehler im finalen lokalen Pages-Export |

Die finalen Desktop- und Mobile-Aufnahmen sowie die Prüfdokumentation liegen unter `docs/qa/bulk-9-final/`.

### Die stärksten Verbesserungen

1. Sechs unterschiedliche Marken- und Seitensilhouetten statt sichtbar wiederholter Template-Logik.
2. Ein konkreter, fachlich passender Signature-Moment für jedes interaktive Konzept.
3. Showroom und Arbeitsqualität erscheinen auf der Anbieter-Desktopseite bereits im ersten Bildschirm.
4. Bilder werden responsiv ausgeliefert und auf GitHub Pages mit korrekten Unterpfaden geladen.
5. Mobile Bedienung, Tastaturzustände, Reduced Motion, Formulare und Demo-Transparenz bleiben trotz stärkerer Inszenierung erhalten.

### Bewusste Grenzen und Trade-offs

- LINDENWIRT verwendet weiterhin ein statisches Hero-Bild. Ohne geeignetes Ausgangsmaterial wäre Video nur zusätzlicher Ballast und kein Qualitätsgewinn.
- FARBFORM benötigt durch zwei zusätzliche Raumvarianten mehr Bilddaten als zuvor; responsive 480-/960-Pixel-Dateien begrenzen den Aufpreis auf kleinen Geräten.
- Die GitHub-Pages-Laufzeit dupliziert einen kleinen Teil der Interaktionsdaten aus React. Das ist wartungsintensiver, aber derzeit der robuste Preis für einen skriptarmen statischen Export ohne die zuvor problematische Vinext-Laufzeit.
- Anbieter-Mobile zeigt bewusst Botschaft und zwei Handlungen vor der Vorschau. Dadurch liegt das erste Showroom-Bild knapp unterhalb eines 390 × 844 Viewports.
- Die kürzere LINDENWIRT-Headline ist funktionaler und markenzentrierter, aber weniger erzählerisch als „Regional auf dem Teller. Herzlich am Tisch.“
- Echte Identität, Region, Kontaktwege, Kundenarbeiten, Formularzustellung und rechtliche Produktionsdaten fehlen weiterhin und dürfen nicht erfunden werden. Der Stand ist ein hochwertiger Showroom, noch keine produktionsfertige Anbieterwebsite.

### Visuelle Ausgangslage (Bulk 0)

- Die fünf Startseiten besitzen bereits unterschiedliche Farben, Bildwelten und funktionale Schwerpunkte.
- Über mehrere Seiten wird dennoch dieselbe Autorenhandschrift sichtbar: Kicker/Eyebrow, große Headline, Dreiereinheiten, dünne Linien, Pfeillinks und großer Schluss-CTA.
- `/konzepte/` ist in Bulk 2 zu einer kuratierten Übersicht mit fünf individuellen Case-Silhouetten geworden.
- WERKFORM hat in Bulk 3 eine eigene technische Interaktion erhalten; AUFSCHLAG wird in seinem separaten Bulk weiter differenziert.
- FARBFORM hat eine tragfähige Editorial-Basis, wird derzeit jedoch stark von einer großen Serif-Headline und statischem Vergleich bestimmt.
- GRÜNRAUM besitzt gutes Projektmaterial, erzählt die Transformation aber noch nicht als zeitliche Abfolge.
- LINDENWIRT hat bereits die stärkste atmosphärische Ruhe und die klarste Conversion-Nähe.
- Auf Mobile funktionieren die Grundlayouts, wirken aber teilweise wie gestapelte Desktop-Sektionen statt bewusst choreografierter mobiler Fassungen.

Lange automatisierte Vollseitenaufnahmen können fixierte oder animierte Elemente mehrfach zeigen. Für Layoutentscheidungen gelten deshalb die separat gespeicherten `*-viewport.png`-Aufnahmen als visuelle Referenz; Vollseitenbilder dienen nur als Rhythmusübersicht.

## Asset-Bestand und Lücken

### Vorhanden

- WERKFORM: Werkhalle, Stahltreppe, Bauteile.
- FARBFORM: Raum Aubergine, Vorher-Raum, Eingang Senf, Farbmuster.
- GRÜNRAUM: Garten, Regengarten, Pflasterdetail.
- AUFSCHLAG: Tennis, Badminton, Gemeinschaft.
- LINDENWIRT: Gastraum, Gericht, Gesellschaft.
- Anbieter: Showroom-Desktopansicht.

### Für spätere Bulks entscheiden

- WERKFORM benötigt kein zusätzliches 3D-Asset. Die Fertigungsinszenierung kann als funktionale SVG-/CSS-Sequenz aus bestehenden Produktdaten entstehen.
- FARBFORM benötigt für drei glaubwürdige Raumstimmungen zwei konsistente Varianten derselben Raumperspektive. Falls diese nicht aus vorhandenen Assets entstehen, ist eine gezielte Bildbearbeitung im FARBFORM-Bulk sinnvoll.
- GRÜNRAUM kann die Entwurfsphase mit einer reduzierten funktionalen Planebene ergänzen; kein dekoratives Natur-Artwork.
- AUFSCHLAG hat für beide Sportmodi bereits geeignete Bilder.
- LINDENWIRT bleibt zunächst beim hochwertigen statischen Hero. Ein Video-/Cinemagraph-Loop wird nur mit geeignetem, stark komprimiertem Ausgangsmaterial umgesetzt.

## Umbauplan je Konzept

### WERKFORM

**Behalten**

- Fertigungsmatrix, Werkstoffe, Losgrößen, STEP/DXF/PDF, Baugruppen und technische Anfrage.

**Verändern**

- Hero objekt- und prozessorientiert statt klassisch „Text plus Bild“.
- Leistungsseiten nach Capability, Eingangsdaten, Prozess, Material, Beispiel und Anfragepfad strukturieren.
- Technische Daten als präzises Interface inszenieren, ohne HUD-/Cyberpunk-Optik.

**Entfernen bzw. zurückbauen**

- Wiederholte Dreierkarten, dekorative Nummerierung und redundante Prozesscopy.

**Signature Feature**

- „Drawing → Manufacturing → Component“ als kontrollierte SVG-/CSS-Prozesssequenz mit Material-, Maß-, Toleranz- und Dateiformat-Annotationen.

**Technische Umsetzung**

- Semantisches HTML als statische Basis, darüber SVG-Pfade und CSS-Transitions; IntersectionObserver nur für Progression. Kein WebGL.

**Mobile**

- Nutzersteuerbare Prozessschritte statt Scroll-Zwang. Matrix als semantische, horizontal fokussierbare Datendarstellung oder klar gegliederte Zeilen; keine abgeschnittenen Spalten.

### FARBFORM

**Behalten**

- Raumfotografie, Aubergine/Kreideweiß/Holz, Vorher/Nachher, Materialwelten und Studiojournal-Ton.

**Verändern**

- Fotografie übernimmt 70–80 Prozent der ersten Wirkung.
- Editoriale Dramaturgie mit wechselnden Bildmaßstäben, Materialnotizen und bewusst asymmetrischen Rhythmen.
- Unterseiten aus Raum, Oberfläche, Materialsystem und Farbwelt entwickeln.

**Entfernen bzw. zurückbauen**

- Serif-Headline als alleinige Hauptidee, durchgehende 50/50-Raster und generische Leistungslisten.

**Signature Feature**

- Interaktive Raumstimmungen Aubergine, Salbei und Mineral; optional direkt mit einem bedienbaren Vorher-/Nachher-Vergleich kombiniert.

**Technische Umsetzung**

- Kleiner Client-Baustein mit echten Buttons, CSS Custom Properties und bildbasierten Zuständen. Vergleich mit nativer Range-Steuerung und sauberer Beschriftung.

**Mobile**

- Große, antippbare Stimmungswahl; Vergleich ohne Präzisionsdrag bedienbar. Editoriale Reihenfolge statt verkleinerter Desktop-Asymmetrie.

### GRÜNRAUM

**Behalten**

- Garten 07, 420 m², Hanglage, Boden, Materialien, Regenwasser, Schatten und Projektgeschichte. Alle Daten bleiben klar als fiktive Projektdaten markiert.

**Verändern**

- Das konkrete Projekt wird Hero und Inhaltsrückgrat.
- Bestand, Entwurf, Umsetzung und Ergebnis erhalten jeweils eine eigene Informationsform.
- Leistungen werden als Projektlebenszyklus statt Leistungsdreiergruppe erzählt.

**Entfernen bzw. zurückbauen**

- Templatehafte Organic-UI-Signale, unnötige Rundungen, schwebende Infokarten und Lime als pauschales Naturzeichen.

**Signature Feature**

- Scrollgeführte Projekttransformation mit klar sichtbaren vier Phasen und reduzierter Planebene.

**Technische Umsetzung**

- CSS Sticky nur auf ausreichend großen Viewports, IntersectionObserver für aktive Phase, funktionale SVG-Planannotation. Alle Inhalte bleiben im Dokumentfluss.

**Mobile**

- Lineare, vollständig sichtbare Projektchronologie mit direkter Phasenwahl. Kein Scroll-Jacking und keine Information nur im Overlay.

### AUFSCHLAG

**Behalten**

- Wochenplan, konkrete Termine, Tennis/Badminton, Probetraining und Vereinsleben.

**Verändern**

- Nächster Termin wird primäres Hero-Signal.
- Trainingssuche und Sportmodus werden enger gekoppelt.
- Unterseiten nach Training, Sportart, Verein und Probetraining differenzieren.

**Entfernen bzw. zurückbauen**

- Wiederholte Sportkarten und unnötige Doppelungen zwischen Hero, Wochenplan und Leistungsblöcken.

**Signature Feature**

- Sofort verständlicher Tennis-/Badminton-Modus, der Akzent, Hero-Bild, Court-Grafik und relevante Trainingsdaten wechselt.

**Technische Umsetzung**

- Gemeinsamer React-Zustand für Modus und Wochenplan; CSS Masks/Transforms für kurze Übergänge. Keine Scrollübernahme.

**Mobile**

- Modusschalter als große, sticky-freie Zweiwegsteuerung. Der nächste relevante Termin bleibt unmittelbar sichtbar und alle Inhalte funktionieren ohne Hover.

### LINDENWIRT

**Behalten**

- Öffnungszeiten, Gerichte und Preise, Speisekarte, Haus, Feiern und Reservierungsweg.

**Verändern**

- Hero auf Name, heutige Beispielzeit und Reservierung reduzieren.
- Speisekarte typografisch wie eine echte Karte statt als Cards gestalten.
- Unterseiten erhalten jeweils eigene Aufgaben und ruhigere Dramaturgien.

**Entfernen bzw. zurückbauen**

- Technisch sichtbare Gimmicks, Kartenraster und unnötig große Erklärtexte.

**Signature Feature**

- Atmosphäre selbst: kontrollierter Übergang von dunkler Abendstimmung zu warmem Papier der Speisekarte.

**Technische Umsetzung**

- CSS-Farb- und Oberflächenübergang mit sparsamer Intersection-Erkennung. Kein Video ohne geeignetes Ausgangsmaterial und statisches Fallback.

**Mobile**

- Statisches Hero-Bild mit kürzerem Crop, Öffnungszeit und Reservierung im ersten Viewport. Keine große Hintergrundvideodatei.

## Übergreifende Seiten

### `/konzepte/`

- Keine identischen Case-Cards mehr.
- WERKFORM breit und technisch; FARBFORM editorial/asymmetrisch; GRÜNRAUM bildgeführt; AUFSCHLAG kompakt/energetisch; LINDENWIRT atmosphärisch.
- Texte auf Rolle, Besonderheit und Link reduzieren.
- Mobile als bewusst rhythmisierte Sequenz; keine Desktop-Collage zusammenquetschen.
- Demo-Transparenz im Intro erhalten.

### Anbieterhomepage

- Showroom und sichtbare Arbeitsqualität früher platzieren.
- Angebot, Ablauf und wiederholte Erklärungen verdichten.
- Person, Region und direkte Kontaktwege priorisieren, sobald echte Angaben vorliegen.
- Keine Personen-, Kunden- oder Vertrauensdaten erfinden.
- Die Seite bleibt klarer und weniger experimentell als die Konzeptwelten.

## Lieferbulks

| Bulk | Umfang | Abnahme |
| --- | --- | --- |
| 0 | Bestand, Baseline, Umbauvertrag | abgeschlossen |
| 1 | Technische Leitplanken: Bilder, Motion, Touch, Overflow, schrittweise CSS-Grenzen | abgeschlossen |
| 2 | `/konzepte/` | abgeschlossen · Desktop/Mobile, fünf unterschiedliche Case-Silhouetten, Demo-Kontext |
| 3 | WERKFORM inklusive aller Unterseiten | abgeschlossen · Signature Feature, Matrix, Anfrage, Reduced Motion |
| 4 | FARBFORM inklusive aller Unterseiten | abgeschlossen · Raumstimmungen, Range-Vergleich, Touch/Tastatur, responsive Bildvarianten |
| 5 | GRÜNRAUM inklusive aller Unterseiten | abgeschlossen · vier direkt steuerbare Projektphasen, Planebene und lineare Mobile-Fassung |
| 6 | AUFSCHLAG inklusive aller Unterseiten | abgeschlossen · Sportmodus, Wochenplanintegration und sofortige Terminfindung |
| 7 | LINDENWIRT inklusive aller Unterseiten | abgeschlossen · Atmosphäre, typografische Karte und klarer Reservierungsweg |
| 8 | Anbieterhomepage | abgeschlossen · Showroom im ersten Bildschirm, klare Verkaufslogik, keine erfundenen Proof-Daten |
| 9 | Gesamt-QA und Abschlussdokumentation | abgeschlossen · Alt/Neu-Vergleich, 25 Routen, Links, Bilder, Interaktionen, Formulare, Console, Overflow |

## Definition of Done je Umsetzungsbulk

- Nur die Routen und gemeinsam notwendigen Mechaniken des jeweiligen Bulks verändern.
- Bestehende Funktionen und Fiktionskennzeichnung erhalten.
- Desktopprüfung bei circa 1440 × 1000.
- Mobileprüfung mindestens bei 390 × 844; Signature Feature zusätzlich bei 360 und 430 px.
- Kein horizontaler Overflow.
- Tastatur, sichtbarer Fokus und Touchziele prüfen.
- Reduced-Motion-Fassung prüfen.
- Keine Browserfehler oder defekten internen Links in den betroffenen Routen.
- Build, Lint und Typecheck erfolgreich.
- Referenzscreenshots vor und nach dem Bulk ablegen.
- Diese Datei um Änderungen, Entscheidungen, Grenzen und bewusst nicht umgesetzte Ideen ergänzen.

## Offene Eingaben, die nicht erfunden werden dürfen

- Echter Name bzw. Anbieteridentität.
- Region/Standort und direkte Kontaktwege.
- Freigegebene reale Kundenarbeiten oder die Entscheidung, bis dahin ausschließlich Konzepte zu zeigen.
- Entscheidung über echte Formularzustellung und Hosting/Datenschutz im Produktionsbetrieb.
- Gegebenenfalls geeignetes Video-Ausgangsmaterial für LINDENWIRT.

Diese Angaben blockieren die Konzept-Bulks nicht. Sie werden erst für die Anbieterhomepage bzw. einen echten Produktionsstart benötigt.
