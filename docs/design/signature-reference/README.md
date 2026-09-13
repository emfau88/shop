# Signature-Referenzpaket

Diese Dateien sind interne Art-Direction-Referenzen für die zusätzlichen Signature-Homepages. Sie werden **nicht** als fertige Seitenhintergründe veröffentlicht. Navigation, Texte, Buttons, Zustände, Hotspots und Kennzahlen entstehen als echtes HTML; 3D und Bilder bleiben eigenständige Medien.

## Herkunft und Verwendung

| Datei | Format | Herkunft / Autor | Verwendung |
| --- | --- | --- | --- |
| `werkform-signature-reference.png` | PNG, 1456 × 1086 | vom Repository-Eigentümer am 13.09.2026 bereitgestellt; Urheber/Erstellungswerkzeug nicht abschließend dokumentiert | interne WERKFORM-Art-Direction |
| `farbform-signature-reference.png` | PNG, 1456 × 1086 | wie oben | interne FARBFORM-Art-Direction |
| `gruenraum-signature-reference.png` | PNG, 1456 × 1086 | wie oben | interne GRÜNRAUM-Art-Direction |
| `aufschlag-signature-reference.png` | PNG, 1456 × 1086 | wie oben | interne AUFSCHLAG-Art-Direction |
| `lindenwirt-signature-reference.png` | PNG, 1456 × 1086 | wie oben | interne LINDENWIRT-Art-Direction |
| `werkform-interaction-prototype.html` | HTML | vom Repository-Eigentümer bereitgestellter Proof of Concept | nur Interaktionsreferenz; CDN-Code und Primitive sind nicht für Produktion bestimmt |

Die Referenzbilder gelten bis zur Klärung der ursprünglichen Erzeugung ausschließlich als interne Entwurfsunterlagen. Produktionsassets benötigen einen eigenen Eintrag mit Quelle, Autor, Lizenz und Bearbeitung im jeweiligen Asset-Manifest.

Konzeptgrundlagen: [Mockup-to-Production-Playbook](../../../mockup-to-production-signature-playbook.md) und [3D-Implementierungs-Playbook](../../../3d-implementation-playbook-shop.md).

## Art-Direction-Briefings

### WERKFORM

- Bildidee: präzise Metallbaugruppe als technisches Hero-Objekt, nicht Werkstatt-Dekoration.
- Kerninteraktion: `Zeichnung → Fertigung → Bauteil → Exploded View`.
- Microinteractions: ruhige Auto-Rotation bis zur ersten Eingabe; projizierte Bauteil-Hotspots.
- Nicht übernehmen: eingebrannte Typografie, fiktive Gütesiegel und das Referenzbauteil als flaches Bild.

### FARBFORM

- Bildidee: heller, glaubwürdiger Wohnraum mit kontrollierter Material- und Lichtwirkung.
- Kerninteraktion: Wandfarbe, Boden und Lichtzustand kombinieren.
- Microinteractions: Before/After-Regler; kurze Materialüberblendung.
- Nicht übernehmen: konkrete Projektzahl und fotorealistische Einrichtung ohne geklärte Quelle.

### GRÜNRAUM

- Bildidee: hochwertiger Garten bei warmem Abendlicht; Hero und Projektlogik dürfen hybrid sein.
- Kerninteraktion: `Bestand → Entwurf → Umsetzung → Ergebnis`.
- Microinteractions: Bauteil-Hotspots; sanfter Phasenübergang.
- Nicht übernehmen: konkrete Projektzahl und alle Pflanzen/Architekturelemente ohne Lizenznachweis.

### AUFSCHLAG

- Bildidee: Premium-Clubwelt mit Sportgerät als starkem Fokus, nicht generische Vereinsseite.
- Kerninteraktion: Tennis, Badminton, Training und Mitgliedschaft als vier Zustände.
- Microinteractions: sportartspezifischer Bild-/Akzentwechsel; subtile Objektbewegung nur bei echtem Mehrwert.
- Nicht übernehmen: Live-Verfügbarkeiten und Mitgliederzahlen als reale Daten.

### LINDENWIRT

- Bildidee: warmes, hochwertiges Restaurant-/Event-Ambiente mit ruhiger fotografischer Tiefe.
- Kerninteraktion: Anlasswahl verändert Copy, Kapazität, Bildausschnitt und Hotspots.
- Microinteractions: Ambient-Überblendung; bedienbarer Media-Teaser.
- Nicht übernehmen: Verfügbarkeiten, Kapazitäten oder Veranstaltungszahlen als reale Angaben.

## Benennung

- Route: `/konzept/<branche>/signature/`
- React: `components/signature/<marke>/<marke>-signature.tsx`
- Szene: `components/signature/<marke>/<marke>-scene.ts`
- CSS: `<marke>-signature.css`, immer markenspezifisch
- Runtime: `signature-runtime.js`, ausschließlich auf Signature-Routen
- QA: `docs/qa/signature-bulk-<nr>-<name>/`
- Assets: `public/assets/signature/<marke>/<asset>`

