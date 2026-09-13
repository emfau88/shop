# Mockup → echte Website
## Produktions-Playbook für die Signature-Versionen in `emfau88/shop`

**Repository:** `https://github.com/emfau88/shop.git`  
**Zweck:** Dieses Dokument erklärt, wie die zuletzt erstellten Premium-Mockups entstanden sind und wie man sie **nicht nur nachzeichnet**, sondern als echte, responsive, interaktive Websites umsetzt.

---

# 1. Was die Mockups eigentlich sind

Die fünf Mockups für:

- WERKFORM
- FARBFORM
- GRÜNRAUM
- LINDENWIRT
- AUFSCHLAG

sind **Art-Direction-Zielbilder**.

Sie wurden nicht aus einem fertigen HTML-/Three.js-Projekt gerendert.

Sie wurden als visuelle Website-Konzepte generiert, basierend auf:

1. dem bestehenden Branchenkonzept,
2. der gewünschten Premium-Positionierung,
3. der bereits diskutierten Interaktionslogik,
4. einer bewusst konsistenten Layoutsprache,
5. einer zum jeweiligen Gewerbe passenden Bildwelt.

Die Mockups sollen also beantworten:

> Wie könnte diese Marke wirken, wenn Gestaltung, Fotografie/3D, Typografie und Interaktion auf Premium-Niveau zusammenspielen?

Sie sind **nicht** automatisch production-ready Screenshots.

---

# 2. Wie die Mockups so schnell entstanden sind

Der schnelle Workflow war:

```text
bestehendes Konzept
        ↓
Branchenlogik verstehen
        ↓
starke Kernbotschaft definieren
        ↓
ein klares Hero-Szenario wählen
        ↓
Premium-Website-Komposition definieren
        ↓
Interaktionshinweise visuell integrieren
        ↓
Mockup als Zielbild generieren
```

Es wurde also nicht jedes einzelne UI-Element zuerst technisch gebaut.

Stattdessen wurde zuerst ein **starkes Endbild** formuliert.

Das ist sinnvoll, weil man so sehr schnell klären kann:

- Welche Richtung sieht hochwertig aus?
- Welche Bildwelt passt?
- Wie viel Information verträgt der Hero?
- Wo sitzt Text?
- Wo sitzt das Produkt / der Raum / die Szene?
- Welche Interaktion soll sichtbar werden?
- Welche Atmosphäre verkauft die Leistung?

---

# 3. Gemeinsame Designlogik der fünf Mockups

Obwohl jede Seite anders aussieht, benutzen alle eine ähnliche visuelle Grammatik.

## 3.1 Grundkomposition

Typischer Aufbau:

```text
┌──────────────────────────────────────────────┐
│ LOGO              NAV               CTA      │
│                                              │
│ TEXTBLOCK              HERO / SZENE          │
│                                              │
│ HEADLINE               HOTSPOTS              │
│ COPY                                         │
│                                              │
│ INTERAKTIONSLEISTE                            │
│                                              │
│ VIDEO / TEASER          HERO / SZENE          │
│                                              │
│ METRIKEN / TRUST                             │
└──────────────────────────────────────────────┘
```

Meistens ungefähr:

```text
linke Inhaltszone: 30–40 %
rechte visuelle Zone: 60–70 %
```

Das gibt dem Hero-Medium genug Raum.

---

# 4. Warum die Mockups hochwertig wirken

Nicht wegen eines einzelnen Tricks.

Die Wirkung entsteht aus der Summe von:

- sehr klarer Bildhierarchie
- großzügiger Hero-Szene
- wenigen Farben
- hochwertiger Lichtstimmung
- Serifenschrift für emotionale Headlines
- Sans Serif für UI / Navigation
- ruhigen Panels
- dezenten Hotspots
- viel Negativraum
- klarer CTA
- visueller Materialqualität
- wenigen, gezielten Akzentfarben
- kontrolliertem Kontrast
- großen realistischen Objekten statt vieler kleiner Dekoelemente

---

# 5. Typografische Logik

## Headlines

Editorial / hochwertig:

```text
Georgia
oder
hochwertige Display-Serif
```

für Produktion besser ggf.:

- Instrument Serif
- Cormorant Garamond
- Libre Baskerville
- DM Serif Display
- Fraunces

je nach Markenrichtung.

## UI / Navigation

Weiterhin:

```text
Manrope
```

oder eine ähnlich klare Sans Serif.

Das ergibt:

```text
emotionaler Marken-Text
+
präzises Interface
```

---

# 6. Wichtig: Das Mockup NICHT als komplettes Hintergrundbild verwenden

Für einen schnellen Prototypen ist das möglich.

Für eine echte Produktionsseite ist es falsch.

Warum:

- Text ist im Bild eingebrannt
- Navigation ist nicht klickbar
- Responsive funktioniert nicht
- Accessibility schlecht
- SEO-Inhalt fehlt
- Mobile wird unbrauchbar
- Hotspots sind nicht echt
- Buttons sind nicht interaktiv
- Text kann nicht dynamisch wechseln
- Bild wird bei anderem Seitenverhältnis beschnitten

Das Mockup dient als:

> **Visual Source of Truth**

nicht als fertige Website.

---

# 7. Wie aus dem Mockup eine echte Seite wird

Das Zielbild wird in Schichten zerlegt.

```text
Layer 1: semantisches HTML
Layer 2: Layout / CSS
Layer 3: Hero-Medium
Layer 4: Interaktions-UI
Layer 5: optional WebGL / 3D
Layer 6: Responsive / Mobile
```

---

# 8. Layer 1 – echtes HTML

Alles, was Text oder Navigation ist, muss echtes DOM sein:

- Logo
- Navigation
- Headline
- Beschreibung
- CTA
- Tabs
- Buttons
- Hotspot Labels
- Kennzahlen
- Video-Link
- Footer

Nicht im Hero-Bild einbacken.

---

# 9. Layer 2 – Layout

Mockup möglichst nah mit CSS Grid nachbauen.

Beispiel:

```css
.signature-hero {
  min-height: 100svh;
  display: grid;
  grid-template-columns:
    minmax(300px, 38%)
    minmax(0, 62%);
}
```

Auf Desktop:

```text
Text | Hero
```

Auf Mobile:

```text
Text
Hero
Controls
```

Nicht versuchen, Desktop einfach auf 390 px zusammenzuquetschen.

---

# 10. Layer 3 – Hero-Medium

Hier gibt es drei mögliche Produktionswege.

## A. hochwertige Fotografie / generiertes sauberes Hero-Bild

Gut für:

- LINDENWIRT
- AUFSCHLAG
- Teile von FARBFORM
- Teile von GRÜNRAUM

Wichtig:

Das Bild muss **ohne UI und ohne Text** erzeugt werden.

Die UI wird danach als echtes HTML darübergelegt.

---

## B. echtes WebGL / 3D

Gut für:

- WERKFORM
- FARBFORM-Konfigurator
- GRÜNRAUM-Projektviewer

---

## C. Hybrid

Empfohlener Standard:

```text
hochwertige normale Website
+
fotografische Art Direction
+
selektiv echter 3D-Bereich
```

Das ist für das Repository vermutlich die stärkste Lösung.

---

# 11. Produktionsworkflow zum Nachbauen eines Mockups

## Schritt 1 – Zielbild fixieren

Das gewünschte Mockup wird im Repo als Referenz abgelegt:

```text
docs/design/signature-reference/
```

Beispiel:

```text
werkform-signature-reference.png
```

---

## Schritt 2 – Mockup analysieren

Der Agent soll die Seite in Bereiche zerlegen:

```text
header
hero-copy
hero-media
interaction-tabs
hotspots
video-card
trust-metrics
footer-note
```

Noch kein Code.

---

## Schritt 3 – semantisches DOM bauen

Erst HTML/React-Struktur.

Noch keine aufwendigen Effekte.

---

## Schritt 4 – Desktop-Komposition angleichen

Viewport für Referenzvergleich festlegen.

Beispiel:

```text
1440 × 1024
```

oder exakt das Seitenverhältnis des Mockups.

---

## Schritt 5 – Screenshotvergleich

Lokale Seite screenshotten.

Dann mit Referenz vergleichen:

- x/y-Positionen
- Proportionen
- Headline-Größe
- Hero-Größe
- CTA
- Abstände
- Kontrast

---

## Schritt 6 – Overlay-Methode

Sehr effizient:

Referenzbild temporär als Overlay:

```css
.dev-reference {
  position: fixed;
  inset: 0;
  opacity: .35;
  pointer-events: none;
}
```

Damit kann der Agent sehen:

- liegt die Headline korrekt?
- stimmt Hero-Framing?
- sind Abstände ähnlich?
- stimmt Navigation?

Danach Overlay komplett entfernen.

---

# 12. Bildgenerierung für Production Assets

Die vorhandenen Mockups enthalten UI.

Sie sollten deshalb **nicht direkt als Hero-Bild** benutzt werden.

Stattdessen wird für jede Signature-Seite zusätzlich ein sauberes Hintergrund-/Hero-Motiv erzeugt:

```text
kein Text
kein Logo
keine Buttons
keine Hotspots
keine UI
```

Nur:

> Szene / Produkt / Raum / Umgebung.

Danach wird die Website-UI echt darübergebaut.

---

# 13. WERKFORM – wie das Mockup entstand

## Visuelle Idee

Ziel:

> hochwertige deutsche Industrie / Präzisionsfertigung / technisches Produktverständnis

Deshalb:

- sehr dunkler Hintergrund
- metallisches Hero-Objekt
- Studio-Licht
- starke Reflexionskanten
- große Exploded View
- wenig Farbe
- grüner Akzent
- technische Labels
- Serif-Headline als Kontrast zur technischen Szene

---

# 14. WERKFORM – echtes Produktionsmodell

Hier sollte das Hero-Medium **kein statisches Bild** sein.

Sondern:

```text
echte Three.js / R3F Baugruppe
```

## Zustände

```text
Zeichnung
Fertigung
Bauteil
Exploded View
```

## DOM

Links:

- Headline
- Text
- Tabs
- Video
- Kennzahlen

Rechts:

- echter Canvas

Über dem Canvas:

- DOM-Hotspots

---

# 15. WERKFORM – Mockup → echte Szene

Mockup:

```text
fotorealistische Metallbaugruppe
```

Produktion:

```text
CAD/STEP
→ Blender/FreeCAD
→ benannte GLB-Nodes
→ PBR-Material
→ HDRI
→ Lightformer
→ Exploded Offsets
```

---

# 16. WERKFORM – Qualitätshebel

Für Mockup-Niveau:

- reale kleine Bevels
- gute Normalen
- Edelstahl-PBR
- Studio-HDRI
- kontrollierte weiße Reflexionsflächen
- AgX
- FOV etwa 35–45°
- Contact Shadow
- sehr dezente Roughness Variation

---

# 17. FARBFORM – wie das Mockup entstand

## Visuelle Idee

Ziel:

> hochwertiger Interior-/Maler-Auftritt, der nicht wie klassische Handwerkerwebsite aussieht

Deshalb:

- heller Raum
- Tageslicht
- warmer Boden
- ruhige Möbel
- Salbei-Akzentwand
- sehr reduzierte UI
- große elegante Typografie
- Material-/Farbwahl direkt im Hero
- Vorher/Nachher als sichtbare Interaktion

---

# 18. FARBFORM – echtes Produktionsmodell

Die stärkste Umsetzung:

```text
echter einfacher 3D-Raum
+
Materialkonfigurator
```

Nicht:

> 20 fertig gerenderte Bilder.

Sondern:

```text
eine Geometrie
+
wechselnde Materialien
```

---

# 19. FARBFORM – Scene Graph

```text
room
  floor
  wall_left
  wall_main
  wall_right
  ceiling
  baseboards
  optional_furniture
```

Material State:

```ts
{
  wallColor,
  floorMaterial,
  lightPreset,
  accentWall
}
```

---

# 20. FARBFORM – Mockup-Look erreichen

Zusätzlich zur Geometrie:

- White Plaster PBR
- Eichenboden
- großes weiches Window Light
- HDRI
- warme Bounce-Anmutung
- sehr kontrollierte Kamera
- kein freies Game-Orbiting
- hochwertige Props nur als Hintergrund

---

# 21. FARBFORM – Vorher/Nachher

Das im Mockup sichtbare vertikale Vorher/Nachher kann echt umgesetzt werden.

Zwei Möglichkeiten:

## Variante A

Zwei Renderzustände / zwei Canvas-Layer clippen.

## Variante B

Eine Szene und beim Slider Materialzustände interpolieren.

Für echtes Vorher/Nachher ist A visuell klarer.

---

# 22. GRÜNRAUM – wie das Mockup entstand

## Visuelle Idee

Ziel:

> hochwertiger Gartenbau / Außenraumgestaltung / Lifestyle

Nicht:

> Pflanzenkatalog.

Deshalb:

- hochwertige Wohnarchitektur
- Abend-/Golden-Hour-Licht
- große Terrasse
- Mauer
- Weg
- Beet
- starke Vegetationskomposition
- sichtbare Hotspots
- Projektphasen in einer horizontalen Steuerleiste

---

# 23. GRÜNRAUM – Produktionsstrategie

Hier ist Hybrid besonders sinnvoll.

## Seite

Fotografisch/editorial.

## Zentrale Interaktion

Echter 3D-Projektviewer.

---

# 24. GRÜNRAUM – Scene Graph

```text
site
  terrain
  house
  terrace
  retaining_wall
  path
  flower_bed
  vegetation
```

State:

```text
Bestand
Entwurf
Umsetzung
Ergebnis
```

---

# 25. GRÜNRAUM – Transformation

Nicht vier separate Seiten.

Eine Szene.

```text
progress 0 → 1
```

steuert:

- Sichtbarkeit
- Höhe
- Skalierung
- Material
- Pflanzen
- Planlinien

---

# 26. GRÜNRAUM – Mockup-Qualität erreichen

Der schnelle Prototyp reicht dafür noch nicht.

Zusätzlich nötig:

- bessere Hausgeometrie
- echtes Pflaster-PBR
- hochwertige Steinmauer
- ShapeGeometry für Wege
- saubere Beetkonturen
- wenige hochwertige Pflanzen
- Instancing
- besseres Tageslicht/HDRI
- stärkere Komposition
- gute Kamera
- Nebel/Atmosphäre sehr subtil

---

# 27. LINDENWIRT – wie das Mockup entstand

## Visuelle Idee

Ziel:

> hochwertiges Restaurant / Events / besondere Atmosphäre

Deshalb:

- sehr warme Lichtfarbe
- Kerzen
- Holz
- dunkle Umgebung
- gedeckte Tische
- geringe Tiefenschärfe
- starke Lichtpunkte
- elegante Serifenschrift
- großzügige Event-Kommunikation

---

# 28. LINDENWIRT – Produktionsstrategie

Hier muss nicht sofort alles 3D sein.

Empfehlung:

```text
hochwertiges Hero-Foto / Video
+
echte DOM-UI
+
optional später Raumkonfigurator
```

Das Mockup lebt primär von:

- Licht
- Fotografie
- Atmosphäre

nicht von einem 3D-Gimmick.

---

# 29. LINDENWIRT – spätere echte Interaktion

Sinnvoll:

```text
Familienfeier
Hochzeit
Firmenabend
```

wechselt:

- Bestuhlung
- Tischposition
- Raumzone
- Kapazität

Dann kann ein kleiner echter 3D-Raum eingesetzt werden.

---

# 30. AUFSCHLAG – wie das Mockup entstand

## Visuelle Idee

Ziel:

> Premium-Sportclub statt klassische Vereinswebsite

Deshalb:

- dunkles Clubhaus
- warmes Abendlicht
- Tennis- und Badminton-Equipment
- sportlicher Lifestyle
- hochwertige Still-Life-Komposition
- Mitglieder-/Platzinformationen
- starke CTA „Probetraining“

---

# 31. AUFSCHLAG – Produktionsstrategie

Hier ist zunächst eine gute Foto-/Video-Seite sinnvoller als komplexes 3D.

Hero:

```text
hochwertiges Equipment-Still-Life
oder
Club-/Court-Fotografie
```

Interaktiv:

- Tennis / Badminton
- freie Plätze
- Training
- Mitgliedschaft

---

# 32. AUFSCHLAG – optionales 3D

Wenn 3D:

- eigener Tennisball
- eigener Schläger
- eigener Court
- subtile Rotation / Bounce

Nicht:

> komplette Seite als Sportspiel.

---

# 33. Core + Signature

Empfohlene Struktur für die drei wichtigsten Konzepte:

```text
/werkform
/werkform-signature

/farbform
/farbform-signature

/gruenraum
/gruenraum-signature
```

Später optional:

```text
/lindenwirt-signature
/aufschlag-signature
```

---

# 34. Unterschied Core vs Signature

## Core

- nüchterner
- produktionsnah
- klare Struktur
- funktional
- günstigere Umsetzung

## Signature

- stärkeres Hero
- bessere Bildwelt
- mehr Art Direction
- selektives 3D
- stärkere Typografie
- stärkere Inszenierung
- aufwendigere Animation
- höherer Preis

---

# 35. Shared Signature Shell

Nicht fünfmal alles neu programmieren.

Gemeinsame Struktur:

```text
SignaturePageShell
  Header
  HeroCopy
  HeroMedia
  InteractionRail
  HotspotLayer
  MediaTeaser
  TrustMetrics
```

Je Branche ändern sich:

- Farben
- Typografie
- Hero-Medium
- Interaktionslogik
- Inhalte

---

# 36. Beispiel-Komponentenstruktur

```text
website/components/signature/
  SignatureHeader.tsx
  SignatureHero.tsx
  SignatureCopy.tsx
  SignatureInteractionRail.tsx
  SignatureHotspots.tsx
  SignatureMediaCard.tsx
  SignatureMetrics.tsx
```

Dann:

```text
website/components/signature/werkform/
website/components/signature/farbform/
website/components/signature/gruenraum/
```

---

# 37. Mobile

Das Desktop-Mockup ist **keine Mobile-Vorgabe**.

Mobile muss neu komponiert werden.

## Empfohlen

```text
Logo / CTA
Headline
Hero
Controls
Details
Metrics
```

3D:

- ein Objekt im Fokus
- Drag
- Pinch
- weniger Hotspots
- weniger Schatten
- kleinere DPR

---

# 38. Bildgenerierung sinnvoll in den Workflow integrieren

Image Generation ist hier kein Ersatz für Webdesign.

Es ist ein:

> **Art-Direction-Werkzeug**

Nutzen:

- schnell starke Richtungen testen
- Kunden Optionen zeigen
- Hero-Komposition planen
- Farb-/Lichtwelt definieren
- Premium-Look festlegen

Danach:

```text
Mockup
→ zerlegen
→ reale Assets erzeugen
→ UI bauen
→ 3D bauen
→ responsive machen
```

---

# 39. Mockup als Agenten-Referenz

Bei jeder Signature-Seite:

```text
REFERENCE IMAGE = visuelles Ziel
```

Aber:

> Nicht blind 1:1 kopieren, wenn technische oder responsive Gründe dagegen sprechen.

Priorität:

1. Markenwirkung
2. Komposition
3. Hierarchie
4. Interaktionsidee
5. technische Robustheit

---

# 40. Welche Teile des Mockups dürfen abweichen?

Dürfen angepasst werden:

- genaue Textumbrüche
- mobile Layouts
- kleine Abstände
- Hotspot-Positionen
- Bildausschnitt
- Navigation

Nicht verlieren:

- Hero-Wirkung
- Farbwelt
- Licht
- Hierarchie
- Gefühl der Marke
- Kerninteraktion

---

# 41. Wichtig: fiktive Zahlen und Aussagen

Die Mockups enthalten teilweise illustrative Kennzahlen.

Beispiele:

```text
500+ Projekte
20+ Jahre
130+ Veranstaltungen
```

Diese sind **Design-Platzhalter**.

Nicht ungeprüft in eine reale Kundenwebsite übernehmen.

Für Referenz-Demos entweder:

```text
Beispielinhalt
```

kennzeichnen oder neutrale Texte nutzen.

---

# 42. Wie professionell kann das werden?

Sehr professionell, wenn der Workflow lautet:

```text
Mockup als Art Direction
+
echtes semantisches HTML
+
hochwertige Hero-Medien
+
echtes WebGL nur wo sinnvoll
+
PBR / HDRI / Licht
+
responsive UX
+
Performance
```

Dann ist der Unterschied zum Mockup nicht:

> „echte Seite sieht schlechter aus“

sondern idealerweise:

> „echte Seite sieht ähnlich stark aus und funktioniert zusätzlich.“

---

# 43. Empfohlene Umsetzung der fünf Mockups

## WERKFORM

**Hero-Medium:** echtes 3D  
**Priorität:** sehr hoch

---

## FARBFORM

**Hero-Medium:** echter 3D-Raum oder Hybrid  
**Priorität:** sehr hoch

---

## GRÜNRAUM

**Hero-Medium:** Hybrid + echter Projektviewer  
**Priorität:** sehr hoch

---

## LINDENWIRT

**Hero-Medium:** Foto / Video  
**3D:** später optional  
**Priorität:** mittel

---

## AUFSCHLAG

**Hero-Medium:** Foto / Video / generiertes Clean Hero  
**3D:** nur subtil  
**Priorität:** mittel

---

# 44. Konkreter Arbeitsauftrag für den Coding Agent

Bevor eine Signature-Seite implementiert wird:

1. Referenzbild ansehen.
2. Layoutbereiche dokumentieren.
3. bestimmen, was DOM ist.
4. bestimmen, was Bild/Video ist.
5. bestimmen, was 3D sein muss.
6. bestimmen, welche Interaktionen echt sein sollen.
7. Mobile-Komposition separat definieren.
8. erst dann implementieren.

---

# 45. Nicht tun

Der Agent soll nicht:

- das Mockup als ein großes `<img>` verwenden,
- UI in ein Hintergrundbild einbacken,
- fiktive Kennzahlen als echte Fakten übernehmen,
- Desktop 1:1 auf Mobile schrumpfen,
- jede Seite unnötig in WebGL bauen,
- alles gleichzeitig animieren,
- 3D nur wegen des Effekts einsetzen.

---

# 46. Empfohlene Implementierungsreihenfolge

## 1. WERKFORM Signature

Warum:

- stärkster 3D-Nutzen
- bereits funktionierender Prototype
- klar definierte Exploded View

## 2. FARBFORM Signature

Warum:

- Materialkonfigurator
- starkes Mockup
- relativ kontrollierbare 3D-Szene

## 3. GRÜNRAUM Signature

Warum:

- größter visueller Aufwand
- Hybrid aus Fotografie und echter Projekttransformation

## 4. LINDENWIRT

## 5. AUFSCHLAG

---

# 47. Der wichtigste Zusammenhang

Die Mockups wirken stark, weil sie zuerst beantworten:

> Wie soll es sich anfühlen?

Die Prototypen beantworten:

> Wie kann es technisch funktionieren?

Die Produktionsseite muss beides zusammenführen:

```text
Art Direction
+
Interaction Design
+
Engineering
```

---

# 48. Kurzformel

## Mockup

```text
Marke
+ Szene
+ Licht
+ Typografie
+ Komposition
+ angedeutete Interaktion
```

## echte Seite

```text
Mockup-Prinzip
+ DOM
+ responsive CSS
+ echte Medien
+ Three.js/R3F
+ State
+ Accessibility
+ Performance
```

---

# 49. Ziel für `shop`

Das Repository sollte langfristig nicht nur fünf Templates zeigen.

Es sollte zeigen:

> dieselbe Branche kann auf unterschiedlichen Qualitäts- und Erlebnisstufen präsentiert werden.

Damit werden die Seiten selbst zu einem Verkaufsargument für:

- Basiswebsite
- Premiumwebsite
- Interactive Design
- 3D Experience
- Signature Experience

---

# 50. Kernregel für kommende Sessions

> Das Mockup ist das visuelle Ziel.  
> Der Code darf nicht versuchen, das Bild zu faken.  
> Er soll die zugrunde liegende Gestaltung als echte Website rekonstruieren.

Das ist der entscheidende Unterschied zwischen:

> „Screenshot nachbauen“

und

> „hochwertige Website aus einer Art Direction entwickeln“.
