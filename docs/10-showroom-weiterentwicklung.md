# Showroom-Weiterentwicklung und Abschluss-Audit

Stand: 10. September 2026.

## Ergebnis

Der Showroom trennt nun die Präsentation des Webdesign-Angebots sichtbar von den fünf fiktiven Kundenauftritten. Eine einheitliche dunkle Demo-Leiste liegt außerhalb der jeweiligen Markenwelt, führt zurück zur Übersicht und kennzeichnet zentral, dass Firma, Daten und Bilder Teil eines Gestaltungskonzepts sind. Innerhalb der Kundenseiten bleiben Navigation, Footer und Inhalte vollständig in der jeweiligen Rolle.

Die zuvor wiederkehrende Dramaturgie aus Text-Bild-Einstieg, Kartenraster, Prozess und Abschlussaufruf wurde aufgebrochen. Jede Startseite beantwortet zuerst die wichtigste Frage ihrer Endnutzer und besitzt nun ein eigenes Erkennungsmerkmal.

| Konzept | Primäre Nutzerfrage | Gestaltungsprinzip | Prägendes Element | Hauptaktion |
| --- | --- | --- | --- | --- |
| Farbform · Maler | Wie verändert Farbe meinen Raum? | Editoriales Wohnmagazin, großzügige Serifentypografie | konkreter Vorher-nachher-Vergleich mit Materialpalette | Raumprojekt besprechen |
| Werkform · Metall | Kann der Betrieb mein Bauteil fertigen? | Technisches Datenblatt, dunkle Werkstattästhetik | Leistungs- und Fertigungsmatrix | Projekt anfragen |
| Grünraum · GaLaBau | Wie wird aus meinem Grundstück ein nutzbarer Garten? | Ruhige, naturbezogene Projektgeschichte | dokumentierte Gartenfallstudie mit Fläche, Material und Maßnahmen | Garten anfragen |
| AUFSCHLAG · Verein | Wann kann ich mitspielen? | Dynamische Termin- und Vereinsansicht | filterbarer Wochenplan für Tennis, Badminton und Jugend | Probetraining anfragen |
| LINDENWIRT · Gastronomie | Was gibt es, ist geöffnet und kann ich reservieren? | Atmosphärische Gastgeberstrecke | Speisekarte, Reservierung und eigene Seite für Feiern | Tisch reservieren |

## Eignung für die Zielgruppen

Für etwa 50-jährige Geschäftsführer und Inhaber ist die Anbieterübersicht nun klarer: Alle Arbeitsbeispiele sind direkt vergleichbar, die Links benennen konkrete Ziele, und die Demo-Kennzeichnung bleibt in jeder Variante an derselben Stelle. Die Kundenseiten selbst richten sich weiterhin an die Kunden des jeweiligen Betriebs. Deshalb unterscheiden sich Wortwahl, Informationsreihenfolge und Handlungsziel deutlich.

Die Seiten sind als hochwertige Verkaufsmuster geeignet. Eine Aussage wie „perfekt geeignet“ wäre ohne echte Betriebsdaten, Nutzertests und gemessene Anfragen unseriös. Für produktive Kundenwebsites müssen reale Referenzen, Ansprechpartner, Einsatzgebiete, Öffnungs- oder Trainingsdaten, Rechtstexte und ein sicherer Formularversand ergänzt werden.

## Qualitätsprüfung

- Produktionsbuild und Lint laufen fehlerfrei.
- Der statische GitHub-Pages-Export umfasst 25 Routen.
- Startseiten und zentrale Unterseiten wurden bei 1440 × 1000 und 390 × 844 Pixeln geprüft.
- Es gibt auf den geprüften Routen keinen horizontalen Überlauf; mobile Menütasten sind mindestens 44 Pixel hoch.
- Lesbare Fließtexte, Formularhinweise und sekundäre Informationen liegen bei mindestens 12 Pixeln.
- Die Formulare validieren Eingaben im Browser, speichern und versenden aber bewusst keine Daten.
- Der Vereins-Wochenplan besitzt funktionierende Filter; die Bedienung ist auch im statischen Export verfügbar.

## Bildherkunft

Die Bildwelten bleiben lokal im Repository. Für den Farbform-Vergleich wurde aus dem vorhandenen Raumfoto per ImageGen eine projektgebundene Vorher-Variante erstellt. Original, WebP-Ableitung und Prompt sind unter `design/generated/showroom/` dokumentiert. Die sichtbare Demo-Leiste nennt den fiktiven Charakter zentral; wiederholte Bildunterschriften mit technischen Herkunftshinweisen wurden aus den Kundendesigns entfernt.
