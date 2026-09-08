# Branchenkonzept 02: Metallverarbeitung

Stand: 8. September 2026.

## Ziel

Werkform ist eine vollständig bedienbare, fiktive Unternehmenswebsite für einen mittelständischen Metallverarbeitungsbetrieb. Sie ergänzt das emotionale Malerkonzept um einen technisch geprägten Verkaufsfall. Interessenten sollen Leistungen, Fertigungsnähe und den Weg zur Anfrage schnell verstehen.

## Seiten

- `/konzept/metallbau/` – Startseite mit Positionierung, Leistungen und Ablauf
- `/konzept/metallbau/leistungen/` – Blechbearbeitung, Schweißbaugruppen und Sonderkonstruktionen
- `/konzept/metallbau/einblicke/` – zwei klar gekennzeichnete KI-Konzeptmotive
- `/konzept/metallbau/anfrage/` – Formularsimulation ohne Datenübertragung

## Gestaltungsentscheidung

Graphit, Stahlgrau, warmes Weiß und ein sparsames Sicherheitsorange vermitteln Präzision und Robustheit. Die kantige Typografie, technische Nummerierung und klaren Linien unterscheiden Werkform deutlich von Farbform. Der Inhalt verzichtet bewusst auf erfundene Zertifizierungen, Maschinenlisten, Toleranzangaben und reale Referenzbehauptungen.

## Bildmaterial

Drei Bilder wurden mit OpenAI ImageGen neu erzeugt: Werkhalle, Bauteildetail und Stahltreppe. Die unveränderten PNG-Originale sowie die vollständigen Prompts liegen in `design/generated/metal/`. Optimierte WebP-Ableitungen werden lokal aus `website/public/images/metal/` geladen. Jedes Motiv ist auf der Website als KI-Visualisierung oder fiktives Konzeptmotiv gekennzeichnet.

## Prüfung

Der reguläre Produktionsbuild und der Linter laufen fehlerfrei. Alle vier Werkform-Seiten, die Konzeptübersicht und alle drei Bilddateien antworten im Produktionsserver mit HTTP 200. Desktop- und Mobilansicht, mobiles Menü und Formularsimulation wurden im Browser geprüft; es traten keine Browserwarnungen oder Konsolenfehler auf. Die Formularseite sendet und speichert keine Daten.
