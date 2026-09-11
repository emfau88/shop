# Bulk 2 · Konzeptübersicht

`/konzepte/` wurde von einer gleichförmigen Case-Liste zu einem kuratierten Showroom umgebaut. WERKFORM, FARBFORM, GRÜNRAUM, AUFSCHLAG und LINDENWIRT behalten ihre vollständigen Zielseiten, erhalten in der Übersicht aber jeweils eine eigene Seiten-Silhouette.

## Geprüft

- Desktop bei 1440 px: kein horizontaler Overflow; alle fünf Case-Bereiche vorhanden.
- Mobil bei 360, 390 und 430 px: kein horizontaler Overflow, exakt eine H1, fünf Cases und fünf primäre Konzeptlinks.
- Alle fünf primären Konzeptlinks antworten lokal mit HTTP 200.
- Build, Lint und Typecheck erfolgreich.

Die mobile Reihenfolge bleibt absichtlich linear: Intro, Übersicht, WERKFORM, FARBFORM, GRÜNRAUM, AUFSCHLAG und LINDENWIRT. Damit wird die Desktop-Asymmetrie nicht als unlesbare Collage auf schmale Bildschirme übertragen.
