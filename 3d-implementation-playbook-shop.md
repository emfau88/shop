# 3D-Implementation Playbook für `emfau88/shop`

**Zweck:**  
Dieses Dokument erklärt, wie die schnellen 3D-Prototypen für WERKFORM und GRÜNRAUM entstanden sind, welche technischen Prinzipien dahinterstehen und wie diese Ansätze auf eine professionelle, produktionsreife Ebene gehoben werden können.

**Repository:** `https://github.com/emfau88/shop.git`

---

# 1. Grundidee

Die schnellen Prototypen wurden **nicht** dadurch möglich, dass komplexe 3D-Szenen fertig heruntergeladen wurden.

Der Kern ist vielmehr:

> Einfache Geometrie + klare Zustände + gute Kamera + Licht + DOM-UI + Interpolation.

Das ist ein sehr effizientes Muster für Web-3D.

Statt sofort einen kompletten fotorealistischen digitalen Zwilling zu bauen, wird die Szene in kleine technische Bausteine zerlegt.

Beispiel WERKFORM:

- Grundplatte
- senkrechte Platte
- zwei Verstärkungen
- Schrauben
- technische Konturen
- 4 Zustände

Beispiel GRÜNRAUM:

- Gelände
- Hauskörper
- Terrasse
- Mauer
- Weg
- Beet
- Pflanzen
- 4 Zustände

Damit lässt sich bereits sehr schnell ein glaubwürdiger Interaktionsprototyp bauen.

---

# 2. Warum das so schnell möglich war

## 2.1 Primitive Geometrie statt fertiger 3D-Produktion

Viele Dinge, die im Browser komplex wirken, sind geometrisch sehr einfach.

### WERKFORM

Grundplatte:

```js
new THREE.BoxGeometry(...)
```

senkrechte Platte:

```js
new THREE.BoxGeometry(...)
```

Schrauben:

```js
CylinderGeometry
```

Verstärkungen:

```js
ExtrudeGeometry
```

### GRÜNRAUM

Terrassenplatten:

```js
BoxGeometry
```

Mauersteine:

```js
BoxGeometry
```

Gelände:

```js
PlaneGeometry
```

Beet:

```js
CircleGeometry / ShapeGeometry
```

Weg:

```js
BoxGeometry / PlaneGeometry
```

Die visuelle Wirkung entsteht danach durch:

- Material
- Licht
- Kamera
- Position
- Wiederholung
- Animation

---

# 3. Das wichtigste technische Muster: Zustandsbasierte 3D-Szene

Die Szene wird nicht für jeden Schritt neu geladen.

Stattdessen existieren alle relevanten Objekte bereits in **einem Scene Graph**.

Beispiel:

```text
scene
  werkform
    base_plate
    upright_plate
    gusset_left
    gusset_right
    bolts

  garden
    terrain
    terrace
    wall
    path
    flower_bed
    plants
```

Ein globaler Fortschrittswert steuert die Szene:

```ts
progress: 0.0 → 1.0
```

Beispiel:

```text
0.00  Bestand / Zeichnung
0.33  Entwurf / Fertigung
0.66  Umsetzung / Bauteil
1.00  Ergebnis / Exploded View
```

---

# 4. Interpolation statt harter Zustandswechsel

Das zentrale Prinzip:

Nicht:

```ts
object.visible = true
```

sondern:

```ts
object.position.y = lerp(startY, targetY, progress)
```

oder:

```ts
object.scale = lerp(0, 1, progress)
```

Dadurch entsteht automatisch eine hochwertige Transformation.

---

# 5. Smoothstep

Für natürliche Zustandsübergänge wurde ein einfaches `smoothstep`-Prinzip verwendet.

```js
function smoothstep(a, b, x) {
  x = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return x * x * (3 - 2 * x);
}
```

Damit kann jedes Element innerhalb eines eigenen Teilbereichs des Gesamtfortschritts erscheinen.

Beispiel:

```js
const terraceProgress = smoothstep(0.35, 0.60, progress);
const plantsProgress  = smoothstep(0.70, 1.00, progress);
```

Das bedeutet:

Die Terrasse entsteht früh.

Die Pflanzen kommen später.

Genau dadurch wirkt die Szene wie ein Prozess.

---

# 6. WERKFORM: Exploded View

Eine Exploded View ist technisch relativ einfach.

Jede Komponente braucht:

```ts
homePosition
explodedOffset
```

Beispiel:

```ts
basePlate.home = [0, 0, 0]
basePlate.exploded = [0, -1.2, 0]

gussetLeft.home = [...]
gussetLeft.exploded = [-1.2, 0.3, -2]
```

Danach:

```ts
position = lerp(home, home + explodedOffset, explodedProgress)
```

Das ist der Kern des gesamten Effekts.

Keine Physics Engine notwendig.

Keine Simulation notwendig.

Keine komplexe Animation notwendig.

---

# 7. Professionelle Exploded View

Für die Produktionsversion sollten die Positionen nicht zufällig oder rein visuell gewählt werden.

Stattdessen:

- Explosionsachsen anhand der Montage bestimmen
- Schrauben entlang ihrer tatsächlichen Achsen bewegen
- Bauteile logisch auseinanderfahren
- Reihenfolge der Demontage berücksichtigen
- Kollisionen visuell vermeiden

Optional:

```text
Assembly
→ Fasteners
→ Bracket
→ Spacer
→ Main Body
```

---

# 8. CAD-Modus / Wireframe-Modus

Für WERKFORM wurde keine zweite CAD-Datei benötigt.

Die gleiche Geometrie kann als technische Darstellung gezeigt werden.

Prinzip:

```js
new THREE.EdgesGeometry(mesh.geometry)
```

und:

```js
new THREE.LineSegments(...)
```

Damit entsteht eine technische Kontur.

Professioneller Ausbau:

- Maßlinien
- technische Labels
- Schnittlinien
- Bauteilnummern
- Achsen
- CAD-Farbschema
- optional echtes STEP-Modell als Quelle

---

# 9. DOM-Hotspots auf echten 3D-Punkten

Ein wichtiger Trick:

Die Hotspots sind **normale HTML-Buttons**.

Sie liegen nicht im WebGL-Canvas.

Stattdessen wird ein Punkt aus dem 3D-Raum in Bildschirmkoordinaten projiziert.

Prinzip:

```js
const p = worldPosition.clone();
p.project(camera);

const x = (p.x * 0.5 + 0.5) * viewportWidth;
const y = (-p.y * 0.5 + 0.5) * viewportHeight;
```

Danach:

```css
left: x;
top: y;
```

Vorteile:

- normale HTML-Buttons
- Accessibility
- leichtes Styling
- bessere Typografie
- keine Text-Rendering-Probleme im Canvas
- responsive

---

# 10. DOM + WebGL Hybrid

Das ist für dieses Projekt die bevorzugte Architektur.

## Im DOM bleiben

- Navigation
- Überschriften
- Texte
- Buttons
- Formulare
- Preisangaben
- CTA
- SEO-Inhalte
- Hotspots
- mobile UI

## In WebGL

- Produkt
- Raum
- Garten
- Materialien
- Licht
- räumliche Animation

Das ist deutlich sinnvoller als eine komplette Canvas-Website.

---

# 11. Warum der WERKFORM-Prototyp trotz einfacher Geometrie funktioniert

Weil mehrere visuelle Signale gleichzeitig stimmen:

- dunkle Bühne
- großes Hero-Objekt
- Metallmaterial
- definierte Lichtkanten
- kontrollierte Kamera
- wenige sichtbare Objekte
- technisches UI
- klare Zustände
- Exploded View

Die Polygonzahl allein entscheidet nicht über Qualität.

---

# 12. Was im Prototyp bewusst noch vereinfacht ist

Die schnellen HTML-Prototypen sind **Proof of Concept**, nicht Produktionscode.

Vereinfacht:

- primitive Geometrie
- keine echten CAD-Daten
- einfache PBR-Materialien
- kein echtes HDRI
- ältere CDN-Three.js-Version
- kein React
- keine GLB-Pipeline
- keine Meshopt-/KTX2-Kompression
- keine echte Assetverwaltung
- keine automatischen Performanceprofile
- keine exakte physikalische Materialkalibrierung

---

# 13. Produktionsziel für WERKFORM

Die professionelle Version sollte stattdessen verwenden:

```text
STEP / CAD
   ↓
Blender / FreeCAD
   ↓
saubere benannte Komponenten
   ↓
GLB
   ↓
Meshopt / Texture Optimization
   ↓
React Three Fiber
```

---

# 14. WERKFORM – empfohlene Asset-Pipeline

## Schritt 1

Ausgangsdaten:

- STEP
- STL
- CAD
- ggf. DXF

## Schritt 2

In Blender / FreeCAD:

- Geometrie prüfen
- unnötige Details entfernen
- Bevels
- Normalen
- Komponenten trennen
- eindeutige Namen

Beispiel:

```text
assembly
  base_plate
  gusset_left
  gusset_right
  bolt_01
  bolt_02
```

## Schritt 3

GLB exportieren.

## Schritt 4

Optimieren:

```bash
gltf-transform optimize input.glb output.glb --texture-compress webp
```

Optional:

```bash
gltf-transform meshopt input.glb output.glb
```

---

# 15. Professionelle Materialien für WERKFORM

Nicht nur:

```ts
color: gray
metalness: 1
```

sondern:

- realistische Roughness
- subtile Roughness Variation
- korrekte Metallreflexion
- ggf. Brushed-Metal-Normalmap
- korrekte Bevels

Beispiel:

```text
Stainless Steel

metalness: ~0.9–1.0
roughness: ~0.2–0.4
```

Werte immer visuell kalibrieren.

---

# 16. HDRI / Environment Lighting

Einer der größten Qualitätssprünge.

Statt nur Directional Lights:

```text
HDRI
+
große Lightformer
+
gezielte Key Lights
```

Damit entstehen:

- echte Metallreflexionen
- hochwertige Lichtkanten
- bessere Materiallesbarkeit

Für WERKFORM:

> Studio-HDRI

Für FARBFORM:

> weiches Innenraum-/Studio-Licht

Für GRÜNRAUM:

> natürliche Tageslichtumgebung

---

# 17. Tone Mapping

Produktionsversion auf aktuellem Three.js prüfen.

Empfohlen zu testen:

```text
AgX Tone Mapping
```

Ziel:

- bessere Highlights
- weniger ausgebrannte Flächen
- hochwertigere Kontraste

Die schnellen Prototypen verwendeten aus Kompatibilitätsgründen ACES.

---

# 18. Kamera

Ein großer Teil der Qualität kommt aus der Kamera.

Empfehlung:

```text
FOV etwa 30–50°
```

Nicht:

```text
70–90°
```

für Produktdarstellungen.

Geringeres FOV + größere Kameradistanz wirkt eher wie Produktfotografie.

---

# 19. Begrenzte Kamerasteuerung

Nicht freie OrbitControls ohne Grenzen.

Besser:

```text
yaw min/max
pitch min/max
zoom min/max
```

Damit kann der Nutzer das Produkt ansehen, aber nicht:

- hinter die Szene fliegen
- unter den Boden schauen
- die Kamera zerstören

---

# 20. Mobile-Interaktion

Die Prototypen nutzen:

- Pointer Events
- Drag
- Pinch
- Wheel

Das bedeutet:

derselbe Code funktioniert auf:

- Maus
- Touch
- Stift

Prinzip:

```text
1 Pointer → Rotation
2 Pointer → Pinch Zoom
```

---

# 21. Mobile ist nicht nur kleiner Desktop

Produktionsversion:

## Desktop

- größere Szene
- mehrere sichtbare Hotspots
- großzügigere Perspektive

## Mobile

- Fokus auf ein Objekt
- größere Buttons
- weniger Hotspots gleichzeitig
- kleinere DPR
- weniger Schatten
- geringere Texturauflösung
- reduzierte Postprocessing-Kette

---

# 22. GRÜNRAUM: wie die Transformation funktioniert

Das gleiche Prinzip wie WERKFORM.

Objekte existieren bereits:

```text
terrain
house
terrace
wall
path
bed
plants
```

Der Fortschritt entscheidet, wann sie erscheinen.

Beispiel:

```text
0.00 Bestand
0.20 Entwurf
0.40 Terrasse
0.50 Mauer
0.55 Weg
0.70 Beet
0.85 Pflanzen
1.00 Ergebnis
```

---

# 23. GRÜNRAUM: Professioneller Ausbau

Der aktuelle Prototyp nutzt primitive Geometrie.

Produktionsversion:

## Terrasse

eigene Geometrie + echtes PBR-Pflastermaterial

## Weg

ShapeGeometry / splinebasierter Weg

## Mauer

modulare Steine oder kontrollierte Low-Poly-Geometrie

## Beet

ShapeGeometry mit sauberer Beetkontur

## Pflanzen

wenige hochwertige Modelle, instanziert

---

# 24. Instancing

Für:

- Pflanzen
- Stühle
- Steine
- wiederholte Elemente

nicht jedes Objekt einzeln rendern.

Stattdessen:

```text
InstancedMesh
```

oder Drei:

```text
<Instances>
```

Dadurch sinken Draw Calls erheblich.

---

# 25. FARBFORM: gleiche Technik, anderer Nutzen

FARBFORM braucht keinen Exploded View.

Stattdessen:

```text
same room
+
material state
```

Objekt:

```text
wall
floor
furniture
```

State:

```text
wallColor
floorMaterial
lightPreset
accentWall
```

Der Nutzer verändert also Materialparameter statt Objektpositionen.

---

# 26. Ein gemeinsames System für alle drei Demos

Empfohlene interne Architektur:

```text
3D Scene
   ↓
State Controller
   ↓
DOM Controls
   ↓
Scene Transition
```

Beispiel:

```ts
type SceneState = {
  progress: number
  activeMode: string
  selectedHotspot?: string
}
```

---

# 27. Empfohlene React-Komponenten

```text
components/3d/
  common/
    SceneShell.tsx
    SceneFallback.tsx
    SceneControls.tsx
    HotspotLayer.tsx
    useSceneProgress.ts
    usePointerCamera.ts

  werkform/
    WerkformScene.tsx
    WerkformAssembly.tsx
    WerkformExplodedView.tsx
    WerkformCADOverlay.tsx

  farbform/
    FarbformRoom.tsx
    FarbformMaterials.ts
    FarbformConfigurator.tsx

  gruenraum/
    GruenraumScene.tsx
    GruenraumTerrain.tsx
    GruenraumBuildStages.tsx
```

---

# 28. Warum React Three Fiber sinnvoll ist

Das bestehende Projekt ist React-basiert.

R3F erlaubt:

- Komponentenstruktur
- State-Anbindung
- React Lifecycle
- Suspense
- lazy loading
- Wiederverwendung
- saubere Integration mit DOM

Nicht:

> Three.js zusätzlich als komplett getrennte Welt behandeln.

---

# 29. Performance-Strategie

## initial

HTML / CSS sofort sichtbar.

## danach

3D lazy laden.

```text
Website
↓
Viewport nähert sich 3D-Sektion
↓
Three.js Chunk laden
↓
GLB laden
↓
Szene anzeigen
```

---

# 30. `frameloop="demand"`

Für statische oder fast statische Szenen:

```tsx
<Canvas frameloop="demand">
```

Dadurch wird nicht permanent 60 FPS gerendert.

Nur wenn:

- Kamera bewegt wird
- State verändert wird
- Animation läuft

wird neu gerendert.

---

# 31. Fallback

Pflicht.

Wenn:

- WebGL fehlt
- GPU schwach
- Asset nicht lädt
- Reduced Motion
- Browserproblem

dann:

```text
hochwertiges statisches Bild
```

Die Website darf niemals unbenutzbar werden.

---

# 32. Progressive Enhancement

Grundregel:

```text
Website funktioniert ohne 3D
+
3D verbessert sie
```

Nicht:

```text
ohne 3D existiert die Seite nicht
```

---

# 33. Fotorealismus-Hebel

Reihenfolge:

## 1. Kamera
## 2. Geometrie
## 3. Bevels
## 4. PBR
## 5. Roughness
## 6. HDRI
## 7. Lightformer
## 8. Tone Mapping
## 9. Exposure
## 10. Contact Shadows
## 11. Material Variation

Nicht zuerst:

- Bloom
- Partikel
- Shader-Spielereien

---

# 34. Warum UI so wichtig ist

Eine gute 3D-Szene mit schlechter UI wirkt trotzdem billig.

Deshalb:

- klare Typografie
- ruhige Panels
- gute Abstände
- wenige Controls
- kein Debug-Look
- keine Three.js-Demo-Controls

Der Nutzer soll die Technik nicht sehen.

---

# 35. Hybrid-Strategie für GRÜNRAUM

Empfohlene Endlösung:

```text
normale Premium-Website
        +
fotografische / editoriale Gestaltung
        +
ein zentraler echter 3D-Projektviewer
```

Das verbindet:

- den hochwertigen Mockup-Look
- mit echter Interaktion

und verhindert:

- Game-Look
- Technik-Demo-Look
- komplette Canvas-Website

---

# 36. Hybrid-Strategie für WERKFORM

Sehr ähnlich:

```text
Editorial / Industrie-Website
+
echtes technisches 3D-Modell
+
CAD Mode
+
Exploded View
+
Hotspots
```

---

# 37. Hybrid-Strategie für FARBFORM

```text
Editorial Interior Website
+
3D-Raum
+
Materialkonfigurator
+
Vorher / Nachher
```

---

# 38. Warum diese drei Demos zusammen stark sind

Sie zeigen drei verschiedene Fähigkeiten.

## WERKFORM

> technisches Produkt verstehen

## FARBFORM

> Materialwirkung erleben

## GRÜNRAUM

> Projektentwicklung visualisieren

Damit wirkt die 3D-Leistung nicht wie ein einzelner Effekt.

Sie wird zu einem echten Leistungsbereich.

---

# 39. Was der Coding Agent zuerst tun soll

Nicht sofort alle drei Demos bauen.

## Phase 1

WERKFORM produktionsnah umsetzen.

Warum:

- einfachste kontrollierbare Geometrie
- klarster Geschäftsnutzen
- Exploded View wirkt stark
- gute Grundlage für gemeinsame 3D-Komponenten

## Phase 2

FARBFORM.

## Phase 3

GRÜNRAUM.

---

# 40. Definition of Done für WERKFORM

WERKFORM ist erst produktionsreif, wenn:

- echtes GLB/CAD-basiertes Modell benutzt wird
- Nodes sauber benannt sind
- Exploded View logisch funktioniert
- CAD-/Wireframe-Modus vorhanden ist
- PBR-Metall hochwertig aussieht
- HDRI / Studiolicht vorhanden ist
- Kamera begrenzt ist
- Hotspots korrekt projiziert werden
- Mobile Drag/Pinch funktioniert
- statischer Fallback existiert
- lazy loading funktioniert
- Build sauber läuft
- Performance auf Mobile geprüft ist

---

# 41. Definition of Done für FARBFORM

- echter 3D-Raum
- Materialwechsel ohne Szenenneuladung
- Wandfarben live
- Bodenvarianten
- Lichtpreset
- Vorher/Nachher
- Mobile
- Fallback
- Performance

---

# 42. Definition of Done für GRÜNRAUM

- eine Scene Graph
- Bestand → Entwurf → Umsetzung → Ergebnis
- Weg entsteht
- Terrasse entsteht
- Mauer entsteht
- Beet entsteht
- Vegetation nur ergänzend
- Mobile
- Fallback
- keine High-Poly-Vegetation
- gute Performance

---

# 43. Kernlektion aus den schnellen Prototypen

Die schnellen Prototypen zeigen:

> Hochwertige 3D-Webinteraktion muss nicht mit komplexem 3D beginnen.

Für einen überzeugenden ersten Prototyp reichen oft:

- primitives
- transforms
- interpolation
- light
- camera
- PBR
- DOM UI

Erst wenn das **Interaction Design** funktioniert, lohnt sich der Austausch der primitiven Geometrie gegen hochwertige Assets.

---

# 44. Empfohlener Workflow für neue 3D-Features

```text
1. Idee
2. Primitive Prototype
3. Interaction Test
4. Mobile Test
5. Art Direction
6. echte Assets
7. Material / Licht
8. Performance
9. Integration
10. Final QA
```

Nicht:

```text
1. riesiges 3D-Modell herunterladen
2. versuchen es irgendwie einzubauen
```

---

# 45. Wichtigste Regel für den Agenten

> Zuerst Interaktion und Dramaturgie beweisen.  
> Danach Assetqualität erhöhen.

Die Prototypen wurden schnell möglich, weil genau diese Reihenfolge eingehalten wurde.

---

# 46. Zusammenfassung

Der technische Kern hinter den Prototypen ist erstaunlich einfach:

```text
Primitive Geometry
+
Scene Graph
+
Progress Value
+
Smooth Interpolation
+
PBR Lighting
+
Controlled Camera
+
DOM Overlay
=
hochwertig wirkender 3D-Prototyp
```

Die professionelle Ebene ergänzt danach:

```text
CAD / hochwertige GLB
+
HDRI
+
Bevel / Normals
+
Material Maps
+
React Three Fiber
+
Asset Compression
+
Instancing
+
Progressive Enhancement
+
Mobile Performance
+
Fallbacks
```

Das ist der empfohlene Weg für die 3D-Weiterentwicklung des `shop`-Repositories.
