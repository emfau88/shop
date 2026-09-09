# Branchenkonzept 05: Gaststätte und Restaurant

Stand: 9. September 2026.

## Ziel

LINDENWIRT ist eine vollständig bedienbare, fiktive Restaurantwebsite für eine moderne, regional geprägte Gaststätte. Sie zeigt ein anderes Geschäftsmodell als die Handwerks- und Vereinsseiten: Gäste entscheiden anhand von Atmosphäre, Karte, Öffnungszeit, Ort und einer möglichst kurzen Reservierungsstrecke.

## Seiten

- `/konzept/gastronomie/` – bildfüllender Einstieg mit Kerninformationen, Beispielkarte und Feiern
- `/konzept/gastronomie/speisekarte/` – direkt lesbare Beispielkarte ohne PDF-Zwang
- `/konzept/gastronomie/haus/` – Gaststube, Garten und Gesellschaften
- `/konzept/gastronomie/reservieren/` – kurze Reservierungssimulation ohne Datenübertragung

## Qualitätsentscheidung

Der Einstieg zeigt Öffnungszeit, Adresse und Reservierung schon in der ersten Ansicht. Die Gestaltung nutzt eine warme, ruhige Wirtshausästhetik, große lesbare Typografie und eine menüartige Inhaltsstruktur. Das unterscheidet sie bewusst von den bisherigen geteilten Text-Bild-Helden und Leistungskarten.

Alle Öffnungszeiten, Adressen, Gerichte, Preise und Kapazitäten sind als Beispiele oder fiktive Angaben gekennzeichnet. Die Marke LINDENWIRT ist erfunden.

## Bildmaterial

Drei Motive wurden mit OpenAI ImageGen erzeugt: Gastraum mit offener Küche, saisonales Gericht und eine Gesellschaft an langer Tafel. Die PNG-Originale und vollständigen Prompts liegen unter `design/generated/gastronomie/`; optimierte WebP-Dateien unter `website/public/images/gastronomie/`.

## Prüfung

Produktionsbuild, Linter und der statische Export mit 24 Routen laufen fehlerfrei. Desktop- und Mobilansicht, mobiles Menü, URL-Vorauswahl sowie die Formularsimulation wurden im Browser geprüft. Bei 390 Pixeln Testbreite entsteht kein horizontaler Überlauf; die kleinste sichtbare Schrift der Gastronomie-Seiten liegt bei 12 Pixeln. Die Formulare senden und speichern keine Daten.
