# Signature Bulk 0 · Baseline und Entscheidungen

Stand: 13.09.2026 · Ausgangs-Commit `c3e0fc5`

## Unveränderliche Core-Baseline

Die 25 bestehenden Export-Routen bleiben verbindlich. Die aktuellen Referenz-Screenshots für alle fünf Konzepte liegen unter [`docs/qa/bulk-9-final`](../bulk-9-final/). WERKFORMs nachträglich ergänzter Core-3D-Viewer bleibt auf `/konzept/metallbau/` bestehen; die Signature-Entwicklung verändert diese Route nicht.

Vorhandene Kerninteraktionen:

- WERKFORM: Fertigungssequenz und interaktiver GLB-Viewer.
- FARBFORM: Mood-Switcher und Raumvergleich.
- GRÜNRAUM: Projektphasen-Journey.
- AUFSCHLAG: Sportmodus und Wochenplan.
- LINDENWIRT: Reservierungs-/Anlassführung.

## Architekturvergleich

| Kriterium | Direct Three.js | React Three Fiber |
| --- | --- | --- |
| bestehender Pages-Exporter | bereits erprobt | zusätzliche React-Hydration nötig |
| Wiederverwendung lokal/statisch | derselbe browserneutrale Szenenkern | zwei Laufzeitpfade oder geänderte Exportarchitektur |
| zusätzlicher Runtime-Overhead | nur Three.js + Szenencode | R3F/Reconciler zusätzlich zu Three.js |
| deklarative Szenenpflege | manuell | komfortabler |
| Risiko für Bulk 1–2 | niedrig | unnötig erhöht |

**Entscheidung:** Direct Three.js bleibt verbindlich. React rendert semantisches Markup und bindet im Entwicklungsmodus denselben Controller, den der statische Export über `signature-runtime.js` startet. R3F wird erst neu bewertet, falls die Zielplattform React-Hydration im Export vorsieht.

## Payload-Baseline und Budgets

Der aktuelle WERKFORM-Core-Viewer nutzt ein GLB mit 541.352 Byte. Der Three.js-Browserbundle wird beim Pages-Export separat gebaut und ausschließlich auf der Core-WERKFORM-Homepage geladen. Die vollständigen Messwerte des neuen Signature-Bundles werden nach Bulk 2 ergänzt.

Bestätigte Budgets:

- Signature-GLB WERKFORM: höchstens 1,5 MB, Ziel unter 1 MB.
- statischer Desktop-Fallback: höchstens 700 KB; Mobile höchstens 300 KB.
- Signature-Runtime: ausschließlich auf fünf Signature-Routen; niemals auf Core-Routen.
- DPR: maximal 1,75 Desktop und 1,35 Mobile.
- Rendering pausiert außerhalb des Viewports; Reduced Motion rendert nur bei Zustandsänderung.

## Accessibility-Baseline

- semantische H1 pro Route und echte Buttons/Links;
- Zustandsrails mit Pfeiltasten, Home und End;
- Escape schließt Detailflächen;
- Hotspots bleiben ohne Hover erreichbar;
- Fallback enthält ein aussagekräftiges Alternativbild;
- keine Kerninformation liegt ausschließlich im Canvas.

## Platzhaltergrenze

Markennamen, Claims, Kennzahlen, Verfügbarkeiten und technische Toleranzen sind ausschließlich Demonstrationsinhalte. Sie werden nicht als reale Unternehmensangaben dargestellt. Mockups liefern Komposition und Tonalität, aber keine produktionsfähigen Assets.

## Ergebnis

- Referenzpaket und fünf Briefings dokumentiert.
- Asset-Manifestformat und Namensschema festgelegt.
- Direct Three.js als Exportarchitektur bestätigt.
- Bestehende Core-Seiten wurden nicht verändert.

