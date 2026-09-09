# Vereinskonzept 04: Tennis und Badminton

Stand: 9. September 2026.

## Ziel

AUFSCHLAG ist eine vollständig bedienbare, fiktive Vereinswebsite für einen lokalen Tennis- und Badmintonverein. Sie zeigt, wie Trainingsangebote, Gemeinschaft und Mitgliedsgewinnung modern und leicht zugänglich präsentiert werden können. Die Struktur lässt sich auf einzelne Sportarten oder andere lokale Sportvereine übertragen.

## Seiten

- `/konzept/sportverein/` – Startseite mit Positionierung, Sportarten, Trainingswoche und Vereinsleben
- `/konzept/sportverein/training/` – beispielhafter Trainingsplan sowie Tennis- und Badmintonangebote
- `/konzept/sportverein/verein/` – Werte, Gemeinschaft, beispielhafte Termine und Sponsorenbereich
- `/konzept/sportverein/probetraining/` – Formularsimulation ohne Datenübertragung

## Qualitätsentscheidung

Die Gestaltung kombiniert kräftiges Vereinsblau, einen hellen Ballakzent und eine kompakte, sportliche Typografie. Trainingszeiten werden schon auf der Startseite sichtbar. Interessierte erreichen das Probetraining direkt aus beiden Sportbereichen; die Sportart wird über den Link vorausgewählt.

Alle Termine, Gruppen und die Marke AUFSCHLAG sind klar als fiktiv gekennzeichnet. Das Konzept verwendet keine erfundenen Ergebnisse, realen Ansprechpartner, Auszeichnungen oder Mitgliederzahlen.

## Bildmaterial

Drei Bilder wurden mit OpenAI ImageGen im Modus `photorealistic-natural` erzeugt: Badminton-Doppel in einer kommunalen Halle, Tennis auf einem lokalen Sandplatz und eine generationenübergreifende Gruppe auf der Clubterrasse. Die PNG-Originale und vollständigen Prompts liegen in `design/generated/sportverein/`; optimierte WebP-Dateien werden aus `website/public/images/sportverein/` geladen.

## Prüfung

Produktionsbuild und Linter laufen fehlerfrei. Alle vier Vereinsseiten, die Konzeptübersicht und alle drei Bilddateien antworten in der Pages-Struktur mit HTTP 200. Desktop- und Mobilansicht, mobiles Menü, URL-Vorauswahl und Formularsimulation wurden im Browser geprüft; es traten keine Browserwarnungen oder Konsolenfehler auf. Die Formulare senden und speichern keine Daten.
