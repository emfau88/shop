# Branchenkonzept 03: Garten- und Landschaftsbau

Stand: 9. September 2026.

## Ziel

Grünraum ist eine vollständig bedienbare, fiktive Unternehmenswebsite für einen anspruchsvollen Garten- und Landschaftsbaubetrieb. Sie verbindet emotionale Gartenbilder mit nachvollziehbarer Bauleistung und einer gut vorbereiteten Anfrage. Privatkunden sollen sich angesprochen fühlen, ohne dass die fachliche Ausführung in den Hintergrund tritt.

## Seiten

- `/konzept/galabau/` – Startseite mit Positionierung, Leistungen, Handwerksdetail und Ablauf
- `/konzept/galabau/leistungen/` – Gartengestaltung, Wege und Terrassen sowie Pflanzung und Pflege
- `/konzept/galabau/gartenideen/` – zwei klar gekennzeichnete KI-Konzeptgärten
- `/konzept/galabau/anfrage/` – Formularsimulation ohne Datenübertragung

## Qualitätsentscheidung

Das Konzept setzt auf eine erkennbare eigene Marke: tiefes Gartengrün, warmes Naturpapier, ein heller Pflanzenakzent und organisch angeschnittene Bildrahmen. Die Startseite zeigt nicht nur fertige Gärten, sondern auch ein glaubwürdiges Ausführungsdetail. Der Anfrageweg fragt Fläche, Themenfeld und Gartenwunsch ab und bereitet damit ein Erstgespräch besser vor als ein allgemeines Kontaktformular.

Die Inhalte vermeiden erfundene Betriebsjahre, Auszeichnungen, Bewertungen oder Referenzbehauptungen. Auch Nachhaltigkeit wird nicht pauschal versprochen; konkrete Themen wie Versickerung, Schatten und standortgerechte Bepflanzung werden sachlich beschrieben.

## Bildmaterial

Drei Bilder wurden mit OpenAI ImageGen neu erzeugt: ein eingewachsener Privatgarten, die Ausführung einer Natursteinkante und ein klimaorientierter Regengarten. Die unveränderten PNG-Originale sowie die vollständigen Prompts liegen in `design/generated/galabau/`. Optimierte WebP-Ableitungen werden lokal aus `website/public/images/galabau/` geladen. Alle Motive sind auf der Website als KI-Visualisierung oder Konzeptstudie gekennzeichnet.

## Prüfung

Produktionsbuild und Linter laufen fehlerfrei. Alle vier Grünraum-Seiten, die Konzeptübersicht und alle drei Bilddateien antworten im Produktionsserver mit HTTP 200. Desktop- und Mobilansicht, mobiles Menü und Formularsimulation wurden im Browser geprüft; es traten keine Browserwarnungen oder Konsolenfehler auf. Die Formularseite sendet und speichert keine Daten.
