# Bulk 9 · Finale Showroom-Abnahme

**Datum:** 12. September 2026  
**Vergleichsbasis:** `docs/qa/bulk-0-baseline/`  
**Desktop:** 1440 × 1000  
**Mobile:** 390 × 844

## Umfang

- Direkter visueller Alt/Neu-Vergleich der Anbieterhomepage und der fünf Konzept-Startseiten.
- Browserprüfung aller 25 Routen auf genau eine H1, horizontalen Overflow und defekte sichtbare Bilder.
- Prüfung der sechs mobilen Navigationen einschließlich Escape und Fokus-Rückgabe.
- Prüfung von WERKFORM-Prozess, FARBFORM-Stimmungen und Vorher/Nachher, GRÜNRAUM-Projektphasen sowie AUFSCHLAG-Sportmodus und Wochenplanfilter.
- Lokale Beispielabsendung aller sechs Formulare im statischen Pages-Export; es wurden keine Daten versendet oder gespeichert.
- Build, Lint, Typecheck, Export- und lokale Zielpfadprüfung.

## Ergebnis

Alle 25 Routen, sechs Navigationen, vier interaktiven Signature-Bausteine und sechs Demo-Formulare funktionieren im finalen Export. Es gibt keinen horizontalen Overflow, keine defekten sichtbaren Bilder, keine fehlenden lokalen Exportziele und keine Browserfehler.

Die Dateien `*-desktop.png` und `*-mobile.png` zeigen die sechs finalen Einstiegsseiten. Die korrespondierenden Vorher-Aufnahmen liegen in `docs/qa/bulk-0-baseline/`.

## Während der Abnahme behoben

- Signature-Interaktionen für den statischen GitHub-Pages-Export ergänzt.
- Unabhängige Zustände für AUFSCHLAG-Sportmodus und Wochenplanfilter hergestellt.
- Wiederholbare Prüfung für Routenzahl, H1-Struktur, lokale Ziele und Pages-Prefix ergänzt.
