# Professional Showroom Audit

**Stand:** 10. September 2026  
**Geprüfter Commit:** `97e4e2d` auf `main`  
**Gegenstand:** Anbieterauftritt, `/konzepte/`, fünf Branchenkonzepte und alle 25 exportierten Routen  
**Audit-Typ:** unabhängiger UX-, UI-, Brand-, Content-, Conversion-, Proof-, Accessibility-, Performance- und Technical-Quality-Audit. Es wurden keine Designänderungen umgesetzt.

## Executive Summary

Der Showroom ist **deutlich über dem Niveau eines austauschbaren Baukasten-Portfolios**. Die fünf Startseiten haben eigene visuelle Stimmen, andere Hero-Kompositionen und mehrere echte branchenspezifische Nutzungswege. Besonders AUFSCHLAG mit dem filterbaren Wochenplan und LINDENWIRT mit Speisekarte, Öffnungsinformation und Reservierungsweg zeigen, dass hier nicht nur Farben ausgetauscht wurden. Farbforms Vorher/Nachher, Werkforms technische Matrix und Grünraums Projektgeschichte sind ebenfalls tragfähige Ausgangspunkte.

Er ist dennoch **noch nicht auf professioneller Agentur- bzw. Verkaufsreife**. Der geschäftlich wichtigste Auftritt – die Anbieterwebsite – erklärt viel, beweist aber zu wenig. Reale Person, Standort, direkte Erreichbarkeit und echte Arbeit fehlen in der Vertrauenshierarchie. Das 699-Euro-Angebot ist mit „Geplanter Endpreis“ missverständlich bezeichnet und trägt bei diesem Umfang ein erhebliches Scope- und Premiumrisiko. Gleichzeitig fallen die Leistungsunterseiten von Farbform, Werkform und Grünraum auf denselben dramaturgischen Bauplan zurück: Intro, drei abwechselnde Text/Bild-Blöcke, CTA, Abschlusskontakt. Dort wird das gemeinsame Produktionssystem sichtbarer als auf den Startseiten.

Technisch ist der Stand ordentlich und bewusst ungefährlich: alle 25 Routen antworteten lokal mit HTTP 200, Lint, Produktions-Build und statischer Export liefen erfolgreich, Formulare senden erklärtermaßen nichts, und globales `noindex` schützt die fiktiven Inhalte. Intrinsische Bildgrößen, Lazy Loading, Skip Links, semantische Hauptbereiche, ein H1 pro Route, `aria-expanded`, Escape-Behandlung und `prefers-reduced-motion` sind gute Grundlagen. Vor einem echten Kundenbetrieb fehlen jedoch ein verbindlicher Produktionspfad, reale Formularverarbeitung, Metadaten-/Indexierungsbausteine, responsive Bildquellen und eine risikoärmere Stack-Entscheidung. Bei 320 px wurden zudem echter horizontaler Overflow auf `/konzepte/` (36 px) und Farbforms Startseite (62 px) gemessen.

**Gesamturteil:** als Design- und Konzeptshowroom **gut bis sehr gut (7,2/10)**; als unmittelbar verkaufsbereiter Anbieterauftritt **noch mittel (5,8/10)**; als Blaupause für produktive Kundenwebsites **noch nicht freigabefähig**. Die vorhandene Arbeit sollte gezielt geschärft, nicht neu erfunden werden.

## Prüfgrundlage und Messbedingungen

- Sichtprüfung der Startseiten und zentralen Unterseiten bei ca. 1440 × 1000 px und 390 × 844 px; zusätzliche Grenztests bei 320 × 844 px und 768 × 844 px.
- Alle 25 geforderten bzw. exportierten Routen wurden per HTTP geprüft; jede antwortete mit Status 200.
- DOM-Prüfung aller Routen bei 390 px: jeweils genau ein H1, kein horizontaler Overflow und keine offensichtlichen doppelten IDs. Repräsentative 320-/768-px-Tests umfassten Anbieter, Übersicht, alle fünf Starts und zentrale Leistungs-/Taskseiten.
- Bedienprüfung: mobiles Farbform-Menü öffnet, setzt den erweiterten Zustand, schließt per Escape und gibt den Fokus an den Trigger zurück. Die fünf Navigationskomponenten enthalten dieselbe Escape-/Fokusmechanik. Das Anbieter-Demoformular wurde mit synthetischen Testdaten validiert und zeigte die Statusmeldung im Live-Bereich; es erfolgte kein Versand. Der AUFSCHLAG-Filter setzte `aria-pressed="true"` und blendete beim Tennis-Filter den reinen Badminton-Termin aus.
- `npm run lint`: erfolgreich. `npm run build`: erfolgreich; Vinext konnte die Routen im Build jedoch nur als „Unknown“ klassifizieren. `npm run export:pages`: erfolgreich, 25 Routen exportiert.
- Der Sites-Build-Wrapper scheiterte in dieser Windows-Umgebung an einer nicht vorhandenen lokalen Datei `node_modules/npm/bin/npm-cli.js`; der direkte, vom Projekt definierte Vinext-Build war erfolgreich. Das ist ein Tooling-/Portabilitätsbefund, kein Buildfehler der Anwendung.
- Lokale Produktionsmessung ohne Netzwerk- oder CPU-Drosselung, je Route ein Warmlauf verworfen und fünf Läufe gemessen: Anbieter Median 33,4 ms; Farbform 15,1 ms; Werkform 17,5 ms; Grünraum 15,2 ms; AUFSCHLAG 15,4 ms; LINDENWIRT 15,4 ms. HTML-Antworten lagen zwischen 21,6 und 46,7 KiB. Diese Werte messen nur den lokalen Serverpfad, **nicht** LCP, INP oder reale Mobilfunkleistung.
- Lighthouse war im vorhandenen Environment nicht installiert. Entsprechend dem Auftrag wurde keine neue Library installiert. Es wird deshalb kein Lighthouse-Score behauptet.

## Scorecard

Skala: 10 = veröffentlichungsreife, belastbare Agenturarbeit; 7 = guter professioneller Konzeptstand; 5 = sichtbar brauchbar, aber mit geschäftlich relevanten Lücken.

| Auftritt | Brand/UI | UX/IA | Conversion | Content/Proof | Technik/A11y | Produktionsreife | Gesamt |
|---|---:|---:|---:|---:|---:|---:|---:|
| Anbieterwebsite | 6,8 | 7,1 | 5,5 | 4,4 | 7,4 | 3,8 | **5,8** |
| Farbform | 8,2 | 7,4 | 6,6 | 6,4 | 7,2 | 4,8 | **6,9** |
| Werkform | 8,3 | 7,7 | 7,2 | 6,5 | 7,1 | 4,8 | **7,1** |
| Grünraum | 8,0 | 7,4 | 7,0 | 6,4 | 6,9 | 4,8 | **6,9** |
| AUFSCHLAG | 8,6 | 8,7 | 8,3 | 7,1 | 7,4 | 4,8 | **7,5** |
| LINDENWIRT | 8,5 | 8,8 | 8,5 | 7,2 | 7,3 | 4,8 | **7,6** |

Die Produktionsreife ist bei allen fiktiven Konzepten bewusst begrenzt. Das ist für einen noindex-Showroom legitim, darf aber nicht unverändert in ein Kundenprojekt überführt werden.

## Unbedingt erhalten

1. **Die visuelle Eigenständigkeit der fünf Starts.** Farbforms ruhiger Editorial-Ansatz, Werkforms dunkle technische Direktheit, Grünraums organische Bildwelt, AUFSCHLAGs Energie und LINDENWIRTs atmosphärische Menülogik sind ohne Logo weitgehend zuordenbar.
2. **Branchenspezifische Kernmodule.** Farbforms Vorher/Nachher, Werkforms Fertigungs-/Machbarkeitsmatrix, Grünraums Projektgeschichte, AUFSCHLAGs filterbarer Wochenplan und LINDENWIRTs Speisekarten-/Reservierungsweg sind die überzeugendsten Beweise für individuelles Denken.
3. **Transparente Fiktionskennzeichnung.** `components/demo-bar.tsx` und die Formularhinweise verhindern, dass Demos als reale Betriebe oder echte Datenerfassung missverstanden werden. Die Funktion muss erhalten bleiben, auch wenn ihre visuelle Form stärker markenspezifisch werden darf.
4. **Sicherer Demo-Modus.** Das globale `robots: { index: false, follow: false }` in `website/app/layout.tsx:10`, simulierte Formulare und Beispielhinweise sind für den Showroom richtig.
5. **Solide technische Basishygiene.** Lokale WOFF2-Schriften für Manrope/Source Serif 4, Bilddimensionen, `loading`, `fetchPriority`, Skip Links, Hauptlandmarks, Live-Status und reduzierte Bewegung sind gute Fundamente.
6. **Native, robuste Routen.** Die 25 getesteten Seiten funktionieren direkt, und der statische Export bildet sie vollständig ab.

## Größte Qualitätslücken

1. Anbieter erklärt Kompetenz, zeigt aber kaum reale, personengebundene Vertrauensbeweise.
2. Das 699-Euro-Angebot erzeugt Widerspruch zwischen hochwertigem Anspruch und sehr breitem Leistungsumfang.
3. Drei zentrale Leistungsseiten teilen trotz anderer Oberfläche dieselbe Inhaltsdramaturgie.
4. Fiktive technische Daten, Flächen, Öffnungszeiten und harte Reaktionsversprechen können als Pseudo-Proof gelesen werden.
5. Demo- und Produktionsmodus sind inhaltlich beschrieben, aber noch nicht als wiederholbarer technischer Übergabepfad formalisiert.
6. Bilder haben keine `srcset`-/`sizes`-Strategie; mobile Geräte erhalten dieselben Dateien.
7. Systemfonts machen Werkform, Grünraum, AUFSCHLAG und Teile von LINDENWIRT plattformabhängig.
8. Bei 320 px gibt es zwei echte Overflow-Fälle; auf `/konzepte/` werden außerdem 11-px-Texte eingesetzt.
9. Navigations- und Formularmechanik ist fünfmal ähnlich implementiert.
10. Vinext `1.0.0-beta.5` baut, hat aber bereits zu einem dokumentierten Link-Workaround geführt und klassifiziert die Routen nicht sicher.

## Benchmark-Prinzipien

Die Referenzen sind nicht wegen ihres Umfangs relevant, sondern wegen ihrer Beweis- und Aufgabenlogik:

- [HARSCH – Startseite](https://www.harsch.de/) und [Leistungsdetail Tief- und Straßenbau](https://www.harsch.de/unsere-leistungen/planung-neubau/tief-und-strassenbau/) verbinden Leistung, reale Projekte, Kennzahlen und einen namentlichen Ansprechpartner mit Telefon/E-Mail. Übertragbares Prinzip: **Behauptung unmittelbar mit überprüfbarem Projekt-, Prozess- oder Personenbeweis koppeln**.
- [SEEBURGER – Ressourcen](https://www.seeburger.com/de/ressourcen/alle-ressourcen) trennt Case Studies, Whitepaper, Webcasts, Solution Briefs und weitere Content-Typen und macht sie filterbar. Übertragbares Prinzip: **komplexe Leistungen über verschiedene Beweisformate und Nutzerintentionen erschließen**, nicht über eine lange Reihe gleichartiger Serviceblöcke.
- [NEFF – Hilfe und Unterstützung](https://www.neff-home.com/de/service/hilfe-unterstuetzung) und [Händlersuche](https://www.neff-home.com/de/haendler-suche/) beginnen bei Aufgaben wie Hilfe finden oder Händler lokalisieren. Übertragbares Prinzip: **Navigation nach „Was möchte ich erledigen?“ statt nach internen Leistungsbezeichnungen strukturieren**.
- [Wertheimer Bretten](https://wertheimer.de/fachhandel/bretten/) priorisiert Adresse, Route, Öffnungszeiten, Telefon, E-Mail, Termin und Sortiment. Übertragbares Prinzip: **lokale Handlungsfähigkeit vor allgemeiner Imageerzählung**.

## Cross-Site-Similarity-Analyse

### Was wirklich individuell ist

| Dimension | Farbform | Werkform | Grünraum | AUFSCHLAG | LINDENWIRT |
|---|---|---|---|---|---|
| Hero | editorial, typografisch, Farbnotiz | dunkle Werkhalle, technische Daten | großes Landschaftsbild, schwebende Projektinfo | sportlich, Termin- und Aktionsfokus | atmosphärisches Bild, Öffnung/Adresse |
| Hauptaufgabe | Raumwirkung verstehen | Fertigbarkeit prüfen | Planung/Umsetzung einschätzen | Termin/Gruppe finden | Essen, Öffnung, Tisch |
| Stärkstes Modul | Vorher/Nachher | Capability-Matrix | Projektgeschichte | Wochenplan/Filter | Karte/Reservierung |
| Ton | ruhig, beratend | präzise, industriell | naturbezogen, erzählerisch | direkt, motivierend | gastlich, knapp |
| Bildrhythmus | Magazin/Material | technische Ausschnitte | großzügige Landschaft | Bewegung/Community | Speise/Atmosphäre |

Diese Unterschiede sind substanziell. Die fünf Starts sind keine bloßen Farbvarianten.

### Wo das gemeinsame System sichtbar wird

- `components/demo-bar.tsx` liegt unverändert vor jedem Konzept: gleiche Position, gleiche Links, gleiche Formulierung. Als Transparenzmechanik sinnvoll, als permanenter erster Markenmoment jedoch ein starkes Showroom-Fingerprint.
- Alle fünf Marken nutzen eine mobile Menüschaltfläche, ähnliche Drei-Link-Navigationen und am Ende einen großen Kontakt-/Reservierungsblock. Die gemeinsame Mechanik ist richtig; gleiche räumliche Dramaturgie und CTA-Rhythmik sollten stärker variieren.
- Nummerierte Dreiergruppen, Eyebrows in Versalien, große H2 und textbegleitete Pfeillinks tauchen markenübergreifend häufig auf. Jeweils einzeln funktionieren sie, in der Serie entsteht ein AI-/Portfolio-Muster.
- Besonders eindeutig ist das Leistungsseiten-Skelett:
  - Farbform: `website/app/konzept/maler/leistungen/page.tsx:13–72`, `.service-detail` in `website/app/globals.css:1460`.
  - Werkform: `website/app/konzept/metallbau/leistungen/page.tsx:36–73`, `.metal-service-details` in `website/app/globals.css:3020`.
  - Grünraum: `website/app/konzept/galabau/leistungen/page.tsx:51–86`, `.landscape-service-details` in `website/app/konzept/galabau/galabau.css:900`.

Alle drei zeigen Page Intro → drei gemappte Text/Bild-Leistungsabschnitte → CTA → Abschlusskontakt. Unterschiedliche Typografie und Farbwelt kaschieren, aber beseitigen diese gemeinsame Dramaturgie nicht.

### Bessere branchenspezifische Dramaturgien

**Farbform:** Einstieg über Raumproblem bzw. gewünschte Wirkung; danach ein Raum-/Oberflächen-Entscheider („heller“, „ruhiger“, „robuster“), Material- und Finish-Vergleich, Vorher/Nachher, Ablauf vom Farbtermin bis Abnahme und erst dann Leistungsumfang. Damit wird Gestaltung erlebbar statt drei Gewerke aufzuzählen.

**Werkform:** Einstieg mit „Ist mein Bauteil machbar?“; technische Daten-Checkliste, Capability-/Toleranzmatrix, Werkstoff- und Qualitätsweg, dokumentierter Prozess, beispielhafte Zeichnungsübergabe und projektspezifische Anfrage. Ein reales Projekt würde Messprotokoll, Maschine, Material und Ansprechpartner belegen.

**Grünraum:** Einstieg über Grundstückszustand und Ziel; Planung → Erd-/Wegebau → Pflanzung → Pflege als Lebenszyklus, ergänzt um Standortbedingungen, Saison, Fläche/Budgetkorridor und eine zusammenhängende Projektentscheidung. Das passt besser zur langfristigen Entwicklung eines Gartens als drei parallele Angebotsblöcke.

## Einzelanalyse

### Anbieterwebsite

**Primäre Besucherfrage:** „Kann diese konkrete Person meinen Betrieb verstehen und verlässlich eine gute Website liefern?“

Der erste Screen ist klar und ruhig. Positionierung, Zielgruppe und CTA sind innerhalb von fünf Sekunden verständlich. Die fünf bedienbaren Konzepte sind ein stärkerer Leistungsbeweis als Mockup-Kacheln. Danach wird die Seite jedoch erklärungsdominant: Vorteile (`app/page.tsx:172`), Paket (`:193`), Ablauf (`:238`), persönlicher Abschnitt (`:269`), Betriebsmodell (`:289`) und FAQ (`:350`) wiederholen teilweise „persönlich, klarer Rahmen, kein Zwangsabo, Hilfe bei Texten“. Erst bei `:382` folgt die Anfrage.

Der Abschnitt „Sie arbeiten direkt mit mir“ nennt weder Namen noch Bild, Ort, Telefonnummer oder direkte E-Mail. Damit ist der persönlichste Claim paradoxerweise anonym. HARSCH zeigt das Gegenprinzip: konkrete Person plus direkte Kanäle nahe am Projekt-CTA. Für einen lokalen Firmeninhaber wiegt das schwerer als ein weiterer Prozessabschnitt.

Das Angebot in `app/page.tsx:193–231` zeigt „699 €“ und direkt darunter „Geplanter Endpreis“ (`:203–205`), bezeichnet es danach aber als Einführungspreis für zwei Referenzkunden. „Endpreis“ kann als dauerhafter Zielpreis verstanden werden. Bis zu vier Seiten, Textüberarbeitung, acht Bilder, responsive Umsetzung, Formular, technische Suchgrundlagen, Übergabe und 30 Tage Fehlerhilfe erzeugen zudem bei 699 € ein realistisches Scope-Risiko. Der Preis ist nicht automatisch falsch; die aktuelle Darstellung kann aber Premiumwahrnehmung senken und besonders betreuungsintensive Anfragen anziehen.

**Urteil:** UX klar, visuell professionell, aber als Vertrauens- und Verkaufsseite unterbelegt. Die nächste Verbesserung ist nicht mehr Text, sondern reale Identität, reale Erreichbarkeit und später reale Case-Evidence.

### `/konzepte/`

Die Übersicht erklärt die Fiktion sauber und erleichtert das gezielte Öffnen. Sie wiederholt allerdings in weiten Teilen die Kartenfunktion der Anbieterstartseite, ohne eine neue Vergleichslogik zu liefern. Sinnvoll wären kleine, faktenbasierte „Warum dieses Konzept anders ist“-Marker: Hauptaufgabe, besondere Funktion, Proof-Modul. Bei 320 px verursacht der lange H1 in `.concepts-intro` 36 px horizontalen Overflow; 15 sichtbare Texte lagen in der Messung bei 11 px. Bei 390 und 768 px bestand kein Overflow.

### Farbform

**Primäre Frage:** „Wie könnte mein Raum wirken, und kann der Betrieb Gestaltung und Ausführung?“

Farbform beantwortet die erste Hälfte stark: Editorial-Typografie, Materialnotizen und Vorher/Nachher vermitteln Haltung. Das Konzept wirkt eigenständig und langfristiger als ein Trend-Mockup. Die zweite Hälfte – Ausführungsqualität – bleibt schwächer. Es fehlen als vorgesehene Echtmodule Untergrunddiagnose, Musterfreigabe, Schutz-/Sauberkeitsprozess, Abnahme und reale Person.

Die Leistungsseite fällt in drei gleichwertige Text/Bild-Reihen zurück. Für private Wohnkunden wäre ein geführter Weg von gewünschter Raumwirkung über Oberfläche und Muster bis Ausführung verständlicher. `app/konzept/maler/gestaltung/page.tsx` ist als Projekt-/Farbweltseite der stärkere Unterseitentyp und sollte die Dramaturgie prägen.

Bei 320 px misst `.farbform-manifesto` 62 px Overflow; `.eyebrow` und `blockquote` werden 348 px breit, während der nutzbare Viewport wegen Scrollbar 306 px beträgt. 390 px war fehlerfrei.

### Werkform

**Primäre Frage:** „Kann dieser Betrieb mein Bauteil technisch fertigen?“

Die Startseite beantwortet diese Frage früher als die anderen Handwerkskonzepte. Dunkle Flächen, technische Typografie, Werkhalle und Capability-Matrix bilden eine glaubwürdige industrielle Sprache. Das ist eine gute, nicht bloß dekorative Markenentscheidung.

Die harten Angaben „bis 20 mm“ und „bis 3.000 mm“ in `app/konzept/metallbau/page.tsx:96–103` wirken jedoch wie reale Maschinenparameter. Trotz DemoBar können sie als Beweis gelesen werden. In einem Showroom sollten sie sichtbar als Beispieldatenschema markiert sein; in einer Kundenseite nur nach technischer Freigabe erscheinen. Die Qualitätsseite `/einblicke/` ist der richtige Typ, braucht in echt aber Prüfmittel, Toleranzen, Normen/Zertifikate und reale Zuständigkeit statt generischer Qualitätssprache.

Die Leistungsseite wiederholt den Dreierblock. Besser wäre ein Machbarkeitsweg mit Zeichnung, Werkstoff, Abmessung, Stückzahl, Oberfläche, Toleranz und Termin. Das erhöht die Qualität eingehender Anfragen und demonstriert Branchenverständnis.

### Grünraum

**Primäre Frage:** „Kann der Betrieb mein Grundstück sinnvoll planen und hochwertig umsetzen?“

Bildwelt, Grün-/Creme-System und Projektgeschichte wirken eigenständig. Die schwebenden Bildinformationen und großzügigen Landschaftsfotos passen zur Branche. Das Konzept balanciert Emotion und konkrete Planung grundsätzlich gut.

„Garten 07“ und „420 m²“ in `app/konzept/galabau/page.tsx:81–85` lesen sich wie ein reales Case-Fact-Sheet. Die Kennzeichnung als fiktives Projekt entschärft, ersetzt aber keine visuelle Markierung der Daten als Platzhalter. In echt sollte ein Case Ausgangslage, Boden/Entwässerung, Material, Pflanzkonzept, Bauzeit, Pflege und reale Bilder belegen.

Die Leistungsseite bleibt bei Text/Bild-Wiederholungen. Ein phasenbasierter Gartenlebenszyklus und ein „Was trifft auf Ihr Grundstück zu?“-Einstieg wären aufgabenorientierter. Candara/Georgia/System-Fallbacks machen die Markenwirkung plattformabhängig.

### AUFSCHLAG

**Primäre Frage:** „Wann, wo und in welcher Gruppe kann ich spielen?“

AUFSCHLAG beantwortet die Aufgabe am konsequentesten. Nächster Beispieltermin, Wochenplan, Tennis/Badminton/Jugend-Filter und Probetraining bilden einen klaren Pfad. Im Test setzte der Tennis-Filter den gedrückten Zustand korrekt und blendete den reinen Badminton-Termin aus. Die Trainingsseite ergänzt Gruppen und Sportarten sinnvoll statt den Start nur zu wiederholen.

Das kräftige Blau/Limette-System und die enge Sporttypografie sind merkfähig, aber am stärksten trendgefährdet. Die Gestaltung sollte nicht weiter mit Badges, schrägen Flächen oder übergroßen Headlines aufgeladen werden. Für eine reale Seite fehlen vor allem Standort/Halle/Plätze, Beiträge, Spielstärke-Logik, reale Ansprechpartner und ein aktueller Datenpflegeprozess. „Beispieltermin“ und Beispielzeiten sind sauberer markiert als die fiktiven Fakten mancher anderer Konzepte.

### LINDENWIRT

**Primäre Frage:** „Was gibt es zu essen, wann ist geöffnet und wie bekomme ich einen Tisch?“

LINDENWIRT ist zusammen mit AUFSCHLAG am geschäftlichsten. Öffnungsinformation, Adresse, Speisekarte und Reservierung sind früh erreichbar; die Unterseiten `/speisekarte/`, `/feiern/`, `/haus/` und `/reservieren/` erfüllen unterschiedliche Aufgaben. Das entspricht dem lokalen Prinzip von Wertheimer: konkrete Nutzbarkeit vor Imageprosa.

„Heute geöffnet“ in `app/konzept/gastronomie/page.tsx:52` wirkt im Hero wie Live-Status, obwohl die Zeiten beispielhaft sind. Der Footer und die DemoBar klären das später, aber ein unmittelbares „Beispiel-Öffnungszeit“ wäre sauberer. Für echte Produktion braucht die Seite Feiertags-/Sonderöffnungszeiten, reale Karte mit Pflegeverantwortung, allergenrechtliche Angaben nach Bedarf, Telefon/Route und eine verbindliche Reservierungslogik.

## Disziplinen

### Brand und UI

Das Markenportfolio ist die größte Stärke. Dennoch häufen sich dieselben Gestaltungsgrammatiken: Versal-Eyebrow, riesige Headline, nummerierte Blöcke, dünne Linien, Pfeil nach rechts oben und großer Abschluss-CTA. Die Wiederholung ist nicht bei jedem Modul problematisch; über sechs Websites wird sie zum Autoren-Fingerprint. Priorität hat daher nicht „noch mehr Unterschied“, sondern **andere Informationsformen dort, wo die Branche sie begründet**.

Werkform und AUFSCHLAG wirken bewusst kantig, dürfen aber nicht weiter in einen kurzfristigen Behance-Look gedrückt werden. Grünraum ist ruhiger, nutzt mit schwebenden Karten und großer Serifentypografie aber ebenfalls bekannte Premium-Template-Codes. Reale Projektbilder und reale lokale Fakten würden diese Konzepte nachhaltiger erden als neue Effekte.

### UX und Informationsarchitektur

Die Starts sind klar, die Navigationen klein und verständlich. Stärkste aufgabenorientierte Wege: AUFSCHLAG und LINDENWIRT. Farbform, Werkform und Grünraum organisieren Unterseiten noch stärker aus Anbieterperspektive („Leistungen“) statt nach Nutzerentscheidung. Das NEFF-Prinzip sollte selektiv übersetzt werden: „Raumwirkung finden“, „Machbarkeit klären“, „Grundstück einordnen“ sind nützlichere Einstiege als eine weitere Angebotsliste.

### Conversion

Alle Konzepte haben klare nächste Schritte. Die CTA-Texte sind besser als generisches „Mehr erfahren“. Conversion bleibt jedoch im Showroom simuliert. Beim Anbieter ist die Hauptbarriere nicht Button-Platzierung, sondern Vertrauen: Wer ist die Person, wo arbeitet sie, wie erreiche ich sie, welche reale Arbeit wurde abgeschlossen? Beim Kundenpfad sollten lokale Telefon-/E-Mail-/Route-Aktionen dort erscheinen, wo sie zur Branche passen, nicht als universelles Footer-Schema.

### Content und Proof Architecture

Die Inhalte sind branchenspezifischer als typische Lorem-Ipsum-Konzepte, aber die Beweise sind überwiegend gestaltete Behauptungen. Für reale Kunden werden folgende Module benötigt:

| Auftritt | Reale Proof-Module, bevor Behauptungen veröffentlicht werden |
|---|---|
| Anbieter | Name, Foto, Standort/Region, direkte E-Mail/Telefon, Arbeitsweise mit Artefakten, reale Cases mit Ausgangslage/Entscheidung/Ergebnis, Kundenfreigabe |
| Farbform | echte Räume, Muster-/Untergrundprozess, Produkt-/Materialfreigabe, Sauberkeits-/Abnahmeprozess, Ansprechpartner, Einzugsgebiet |
| Werkform | Maschinen/Abmessungen, Werkstoffe, Toleranzen, Prüfmittel, Zertifikate nur wenn vorhanden, reale Bauteile, technischer Kontakt |
| Grünraum | Vorher/Nachher, Lage/Fläche, Boden/Entwässerung, Material/Pflanzplan, Bauzeit, Pflege, Ansprechpartner/Servicegebiet |
| AUFSCHLAG | reale Plätze/Halle, aktuelle Zeiten, Beiträge, Teams/Spielstärken, Trainer/Ansprechpartner, Adresse/Anfahrt |
| LINDENWIRT | reale Karte/Preise, Öffnungs- und Feiertagslogik, Adresse/Route/Telefon, Küche/Gastgeber, Reservierungsbedingungen |

Keine dieser Lücken sollte mit erfundenen Testimonials, Zertifikaten oder Historien geschlossen werden.

### Typografie

Manrope und Source Serif 4 werden lokal per `@font-face` aus `website/public/fonts` geladen (`app/globals.css:2392 ff.`). Das ist deterministisch und datenschutzfreundlich. Dagegen nutzen:

- Werkform: Bahnschrift/Arial und Consolas/Courier (`app/konzept/metallbau/metallbau.css:9–23`).
- Grünraum: Candara/Segoe UI und Georgia/Times (`app/konzept/galabau/galabau.css:15–21`).
- AUFSCHLAG: Segoe UI, Bahnschrift, Arial Narrow/Impact (`app/konzept/sportverein/sportverein.css:10–17`).
- LINDENWIRT teilweise Segoe UI (`app/konzept/gastronomie/gastronomie.css:12–25`).

Bahnschrift und Candara sind auf vielen macOS-/iOS-/Android-Geräten nicht verfügbar; Arial Narrow und Impact ändern Metrik und Charakter. Gerade Werkform und AUFSCHLAG hängen stark an der Headline-Breite. Pro Marke sollte eine lizenzierte, selbst gehostete Familie gewählt und anschließend Zeilenumbrüche auf Windows, macOS, iOS und Android erneut geprüft werden. Es soll ausdrücklich **nicht** überall Manrope eingesetzt werden.

### Bilder und Performance

Positiv: 17 Bilder liegen lokal als WebP vor; die gemeinsamen Bildkomponenten setzen Breite/Höhe, Alt-Text, Lazy/Eager Loading und `fetchPriority`, etwa `components/shared.tsx:21–45`, `components/metal/metal-shared.tsx:48–80`, `components/landscape/landscape-shared.tsx:49–76`, `components/sport/sport-shared.tsx:8–30` und `components/gastro/gastro-shared.tsx:8–31`. Dadurch ist das Layout grundsätzlich stabiler.

Die Bibliothek umfasst 4.013.052 Bytes (3,83 MiB). Größte Dateien: `galabau/garten.webp` 507 KiB, `galabau/regengarten.webp` 496 KiB, `sportverein/tennis.webp` 317 KiB, `gastronomie/gericht.webp` 265 KiB. Im Code existieren keine `srcset`- oder `sizes`-Attribute. Ein 390-px-Gerät lädt daher für ein sichtbares Bild dieselbe Datei wie Desktop. Das ist der klarste Performance-Hebel. Empfohlen sind mehrere WebP-/AVIF-Varianten pro Bild und ein art-directed Crop nur dort, wo die mobile Komposition sonst leidet. Bildqualität darf nicht pauschal durch aggressivere Kompression geopfert werden.

Die lokalen Serverzeiten sind sehr gut, sagen aber nichts über reale Bild-LCPs. Vor Veröffentlichung: Produktions-URL mit Lighthouse/WebPageTest unter dokumentierter Mobilfunk-/CPU-Drosselung messen; LCP-Bild, CLS und INP je Startseite prüfen.

### Accessibility und Mobile

Stärken: Skip Links, `main`, Header/Footer, genau ein H1 pro geprüfter Route, beschriftete Felder, native Validierung, `aria-live`, `aria-expanded`, Escape/Fokus-Rückgabe und globales `prefers-reduced-motion` (`app/globals.css:2380–2389`). Bei 390 und 768 px trat auf den geprüften Routen kein horizontaler Overflow auf.

Offen:

- 320-px-Overflow auf `/konzepte/` und Farbform-Start beheben und danach alle 25 Routen erneut messen.
- `/konzepte/` verwendet sichtbar 11-px-Texte; Kleingedrucktes auf mindestens gut lesbare 12–14 px anheben, abhängig von Kontrast und Schrift.
- Mehrere Inline-Links/Nav-Links liegen unter der empfehlenswerten 44-px-Komforthöhe. Das ist nicht automatisch ein WCAG-Verstoß, aber für Touch-Nutzung verbesserungswürdig; mindestens WCAG 2.5.8 (24 × 24 CSS px bzw. ausreichender Abstand) verifizieren.
- Kontraste wurden visuell stichprobenartig als plausibel beurteilt, aber nicht mit einem vollständigen automatisierten AA-Scan freigegeben. Vor Produktion axe/Lighthouse plus manuelle Tastatur- und 200-%-Zoom-Prüfung durchführen.

### SEO und Produktionsreife

Der Showroom ist korrekt global `noindex`. Seitentitel existieren für die Konzepte; viele Unterseiten haben jedoch nur einen Titel und keine eigene Description. Canonical, OpenGraph, Sitemap und `robots.ts` fehlen. Ein eigenes `not-found.tsx` ist vorhanden; `public/favicon.svg` existiert. Fiktive `LocalBusiness`-Daten dürfen im Showroom nicht ergänzt werden.

Empfohlener Produktionspfad:

1. **Expliziter Modus:** Showroom bleibt noindex und mit DemoBar/No-Send-Formular. Ein Kundenprojekt wird nicht nur per Textsuche „entfiktiviert“, sondern über eine verbindliche Produktions-Checkliste bzw. ein separates Kundenrepository erzeugt.
2. **Validiertes Inhaltsmodell:** reale Identität, Adresse, Kontakt, Öffnungszeiten, Servicegebiet, Rechtstexte, Consent-/Drittanbieterentscheidung und freigegebene Proof-Daten sind Pflichtfelder vor `index`.
3. **Gemeinsames technisches Fundament:** Metadata-Factory, Canonical, OG-Bild, `robots`, Sitemap, Favicon/App Icons, 404, Redirects, Formular-Endpunkt mit serverseitiger Validierung/Spam-Schutz, optionales Analytics/Consent und Deployment-Check.
4. **Marke separat halten:** Seitenkomposition, Typografie, Navigation und Content-Module bleiben konzeptspezifisch. Geteilt werden nur unsichtbare, getestete Mechaniken.
5. **Launch Gate:** reale Domain, Performance/A11y-Scan, Formular-E2E, Indexierungsfreigabe, strukturierte Daten nur mit verifizierten Fakten und dokumentierte Pflegezuständigkeit.

### Codequalität und Wartbarkeit

Die Eigenständigkeit ist teilweise mit technischer Duplikation erkauft. Fünf Navigationsdateien – `components/navigation.tsx`, `metal/metal-navigation.tsx`, `landscape/landscape-navigation.tsx`, `sport/sport-navigation.tsx`, `gastro/gastro-navigation.tsx` – implementieren sehr ähnliche Open-/Escape-/Fokuslogik. Fünf Formulardateien mit 4,5–5,1 KiB wiederholen `setCustomValidity`, `reportValidity`, Complete-State und Live-Ausgabe. Das erhöht das Risiko, dass ein Accessibility-Fix nur vier von fünf Marken erreicht.

Empfehlung: kleine headless Utilities/Hooks für Disclosure-Menü, Fokus-Rückgabe, Feldvalidierung und Demo-Erfolgszustand. Markup-Hierarchie, Feldsatz, Buttonform, Texte, Farben und Layout bleiben je Marke getrennt. Ebenso können Image-Props und Breakpoint-Tokens technisch zentral geprüft werden, ohne ein gemeinsames Seiten-Template zu bauen.

`app/globals.css` ist mit rund 3.560 Zeilen zusätzlich Träger von Anbieter-, Farbform- und Teilen der Werkform-Styles, während andere Marken eigene CSS-Dateien haben. Die Grenze sollte nach Marke und Mechanik klarer werden; keine kosmetische Vollmigration, sondern bei der nächsten Änderung schrittweise extrahieren.

Vinext `1.0.0-beta.5` ist für diesen privaten Showroom vertretbar: Build und Export funktionieren. Für langfristige Kundenprojekte ist das Risiko höher. Bereits vorhandene Kommentare in `components/shared.tsx` und Seiten nennen einen bestätigten Produktionsfehler mit Framework-`Link`, weshalb native Links genutzt werden; der Build meldet alle Routen als nicht klassifizierbar. Vor dem ersten Kundenlaunch sollte entschieden werden: stabiler, unterstützter Next-Stack oder bewusst gepinntes Vinext mit Update-/Rollback-/E2E-Strategie. Eine sofortige Migration allein aus Modernitätsgründen ist nicht nötig.

## Befundmatrix

Jeder Befund enthält Problem, Evidenz, Relevanz, konkrete Verbesserung, erwarteten Nutzen und Risiko/Nebenwirkung.

| ID / Prio | Problem | Beobachtung / Evidenz | Warum relevant | Konkrete Verbesserung | Erwarteter Nutzen | Risiko / Nebenwirkung |
|---|---|---|---|---|---|---|
| F01 / P0 | Anbieter ohne belastbare persönliche Proof-Hierarchie | `app/page.tsx:269` sagt „direkt mit mir“, aber Name, Foto, Ort, Telefon, direkte E-Mail und reale Cases fehlen | Lokale Inhaber kaufen Vertrauen in eine Person, nicht nur Prozesscopy | Identitätsblock im ersten Drittel; echte Kanäle; später 1–3 reale Cases mit Freigabe | Höhere Glaubwürdigkeit und qualifiziertere Gespräche | Datenschutz/Selbstdarstellung muss bewusst entschieden werden |
| F02 / P1 | 699 € widersprüchlich und scope-gefährdet | `app/page.tsx:203–231`: „Geplanter Endpreis“, danach Einführungspreis, sehr breiter Umfang | Premiumsignal sinkt; Erwartungs- und Nachtragskonflikte | Bezeichnung eindeutig machen; Scopegrenzen/Annahmen prominenter, ohne neue Preisstrategie zu erfinden | Weniger Fehlinterpretation und Scope Creep | Mehr Einschränkungen können kurzfristig Conversion senken |
| F03 / P1 | Drei Leistungsseiten teilen dasselbe Skelett | Maler `:13–72`, Metall `:36–73`, Galabau `:51–86`; jeweils Intro → 3 Text/Bild → CTA | Unterseiten entlarven das gemeinsame Template stärker als Starts | Branchenspezifische Dramaturgien wie oben | Glaubwürdigeres Strategie-/Branchenverständnis | Mittlerer bis großer redaktioneller Aufwand |
| F04 / P0 | Fiktive Daten können als Pseudo-Proof gelesen werden | Werkform „20 mm/3.000 mm“, Grünraum „Garten 07/420 m²“, Gastro „Heute geöffnet“ | Harte Fakten besitzen Beweischarakter; DemoBar wird leicht übersehen | Daten unmittelbar als Beispiel/Platzhalter markieren; bei Kunden nur verifizierte Daten | Saubere Ethik und weniger Irreführung | Zu viele Hinweise können den Demo-Eindruck schwächen |
| F05 / P2 | Wiederkehrende Portfolio-Grammatik | identische DemoBar; Eyebrow, Riesen-H2, Nummern, Linien, Pfeil-CTA und Schlussblock über mehrere Marken | In Serie entsteht AI-/Autoren-Fingerprint | Nur begründete Content-Typen variieren; Demo-Hinweis brand-adaptiv, funktional identisch | Weniger Templategefühl | Unkontrollierte Variation würde Konsistenz und A11y verschlechtern |
| F06 / P0 | Kein verbindliches Demo-zu-Produktion-Gate | globales noindex, keine Canonical/OG/Sitemap/robots-Datei; reale Pflichtdaten nicht formalisiert | Gefahr von vergessener Fiktion, Noindex oder fehlenden Launch-Basics | Produktionscheckliste/Config und Launch-Gate wie oben | Wiederholbare sichere Kundenstarts | Aufbau kostet initial Zeit |
| F07 / P0 | Formulare sind nur Simulation | fünf Komponenten melden Erfolg, versenden aber nichts; Hinweis ist korrekt | Unverändert wäre jede Kunden-Conversion verloren | Server-Endpunkt, Validierung, Spam-Schutz, Datenschutz, E2E; Demo-Modus getrennt lassen | Verlässliche Leads/Reservierungen | Betrieb, Zustellbarkeit und Datenschutz werden laufende Verantwortung |
| F08 / P1 | Markenrelevante Systemfonts sind nicht deterministisch | Bahnschrift, Candara, Segoe UI, Consolas, Georgia u. a. in Marken-CSS | Umbrüche und Charakter unterscheiden sich je OS | Pro Marke geeignete lizenzierte WOFF2-Familie selbst hosten und plattformübergreifend testen | Stabilere Markenwirkung und Layouts | Lizenz-/Dateigewicht; Reflow erfordert QA |
| F09 / P1 | Keine responsiven Bildquellen | 3,83 MiB Bildbestand; bis 507 KiB pro WebP; kein `srcset`/`sizes` | Mobile lädt unnötig große Dateien; potenzieller LCP-Hebel | 3–4 Breiten pro Asset, `srcset/sizes`, selektive Mobile-Crops | Weniger Transfer ohne sichtbaren Qualitätsverlust | Pipeline-/Pflegeaufwand; falsche Sizes können Qualität mindern |
| F10 / P1 | 320-px-Overflow und sehr kleiner Übersichtstext | 36 px auf `/konzepte/`, 62 px Farbform; Übersicht mit 11-px-Texten | Kleine Geräte/Zoom können seitlich scrollen und Text erschweren | H1/Manifesto-Minbreiten korrigieren, Wrap/Container prüfen, 320/200-% Regressionstest | Robuste Mobile-Nutzung | Headline-Rhythmus kann sich ändern |
| F11 / P2 | Touch-/Kontrastfreigabe unvollständig | mehrere Inline-/Nav-Links unter 44 px; nur visuelle Kontraststichprobe | Komfort und AA-Freigabe brauchen messbare Prüfung | 24-px-WCAG-Mindestziel/Abstände sicherstellen, wichtige Ziele 44 px; axe + manuell 200 % | Bessere Nutzbarkeit und belastbare Freigabe | Größere Ziele verändern Header/Footer-Rhythmus |
| F12 / P1 | Beta-Stack mit sichtbaren Workarounds | `package.json`: Vinext beta.5; native Link-Workaround; Build-Klassifizierung „Unknown“ | Wartung und Upgrades riskanter als bei einer stabilen Kundenbasis | Vor Kundenstart Stackentscheidung, Pinning, E2E, Update-/Rollback-Plan; nicht blind migrieren | Kalkulierbarere Wartung | Migration kann neue Fehler und Aufwand erzeugen |
| F13 / P2 | Navigation und Formlogik dupliziert | je fünf Navigationen und Formulare mit gleicher Escape-/Validity-Mechanik | Fixes können auseinanderlaufen | Headless Hooks/Utilities, Markenmarkup und CSS getrennt | Weniger Regressionen ohne visuelle Gleichschaltung | Zu aggressive Abstraktion würde Marken wieder vereinheitlichen |
| F14 / P1 | Anbietertext wiederholt Nutzenargumente | Vorteile, Ablauf, Paket, Betriebsmodell und FAQ zwischen `app/page.tsx:172–378` | Lange Erklärung verdrängt Person, Proof und Entscheidung | Wiederholungen kürzen; Proof/Person/echte Kontaktwege nach oben | Schnellere Vertrauensbildung, weniger kognitive Last | Kürzung darf wichtige Scope-Aufklärung nicht entfernen |

## Priorisierter Maßnahmenplan

| Priorität | Maßnahme | Aufwand | Impact |
|---|---|---:|---:|
| P0 | Reale Anbieteridentität, direkte Erreichbarkeit und freigegebene Proof-Struktur ergänzen | mittel | groß |
| P0 | Demo-/Produktionsmodus mit Pflichtdaten und Launch-Gate formalisieren | mittel | groß |
| P0 | Echte Formularstrecke inklusive Spam-, Datenschutz- und E2E-Konzept für Kundenprojekte bauen | mittel | groß |
| P0 | Fiktive harte Daten unmittelbar kennzeichnen bzw. bis zur Verifizierung neutralisieren | klein | groß |
| P1 | Leistungsseiten von Farbform, Werkform und Grünraum branchenspezifisch neu dramaturgisieren | groß | groß |
| P1 | 699-Euro-Darstellung sprachlich entwirren und Scope-Risiko sichtbar machen | klein | groß |
| P1 | Anbieterargumente kürzen und Person/Proof früher priorisieren | mittel | groß |
| P1 | Responsive Bildpipeline (`srcset`, `sizes`, Varianten) einführen | mittel | groß |
| P1 | Markenrelevante Systemfonts durch passende selbst gehostete Fonts ersetzen | mittel | mittel–groß |
| P1 | 320-px-Overflow und 11-px-Texte beheben, Regressionstest ergänzen | klein | mittel |
| P1 | Vinext-vs.-stabiler-Stack vor erstem Kundenlaunch entscheiden und absichern | mittel–groß | groß |
| P2 | Headless Menü-/Formmechanik extrahieren, visuelle Komponenten getrennt lassen | mittel | mittel |
| P2 | Touchziele, Kontrast, 200-%-Zoom und Tastatur vollständig freigeben | mittel | mittel |
| P2 | DemoBar visuell markenverträglicher integrieren, Transparenz beibehalten | klein–mittel | mittel |
| P3 | `/konzepte/` um knappe Aufgaben-/Funktionsvergleichsmarker ergänzen | klein | klein–mittel |

## Entscheidende Abschlussfrage

**„Wenn ein Geschäftsführer diese fünf Websites heute nacheinander öffnet: Wirken sie wie fünf individuell konzipierte professionelle Firmenauftritte – oder erkennt er noch zu deutlich ein gemeinsames Template-/AI-System?“**

**Antwort:** Auf den Startseiten wirken sie überwiegend wie fünf individuell konzipierte Auftritte. Farbforms Editorial-/Vorher-Nachher-Logik, Werkforms Machbarkeitsmatrix, Grünraums Projektbildwelt, AUFSCHLAGs Wochenplan und LINDENWIRTs Speisekarten-/Reservierungslogik sind konkrete, branchenspezifische Unterschiede. Ein Geschäftsführer würde nicht nur fünf Farbschemata sehen.

Nach mehreren Unterseiten erkennt er das gemeinsame System jedoch noch zu deutlich. Der stärkste Beleg sind die fast identischen Leistungsdramaturgien von Farbform, Werkform und Grünraum. Dazu kommen die unveränderte DemoBar, Drei-Link-Navigationen, Versal-Eyebrows, nummerierte Blöcke, große Headlines, dünne Linien, Pfeil-CTAs und ähnliche Abschlusskontakte. Das Ergebnis ist deshalb **individuell konzipiert, aber noch mit sichtbarer gemeinsamer Portfolio-/AI-Grammatik**. AUFSCHLAG und LINDENWIRT sind näher an echter Betriebssoftware; die drei Leistungsseiten und die anonyme Anbieterwebsite halten das Gesamtportfolio unter Agenturspitzenniveau.

## Die maximal zehn Änderungen mit dem größten Qualitätssprung

1. Anbieter mit echter Person, Standort/Region und direkten Kontaktwegen sichtbar machen.
2. Echte Case-Architektur einführen; bis dahin keine pseudo-realen Zahlen oder Versprechen als Beweis inszenieren.
3. Farbform-Leistungen als Raumwirkungs-/Materialentscheidung statt Dreierliste erzählen.
4. Werkform-Leistungen als technische Machbarkeits- und Anfragecheckliste erzählen.
5. Grünraum-Leistungen als Grundstücks- und Projektlebenszyklus erzählen.
6. 699-Euro-Bezeichnung entwirren, Scope-Grenzen schärfen und wiederholte Anbietertexte kürzen.
7. Einen verbindlichen Demo-zu-Produktion-Pfad mit SEO-, Legal-, Formular- und Daten-Launch-Gate schaffen.
8. Responsive Bildvarianten mit `srcset`/`sizes` einführen.
9. Markenprägende Systemfonts pro Konzept durch passende selbst gehostete Schriften ersetzen.
10. 320-px-Overflow beheben und Vinext/Navigation/Formularmechanik mit Regressionstests technisch absichern.

Diese zehn Punkte bringen einen größeren Sprung als neue Animationen, weitere Karten, zusätzliche Farbvarianten oder ein pauschales Redesign.
