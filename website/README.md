# Webdesign und Farbform

Private Entwicklungsvorschau, Stand 8. September 2026.

## Lokal starten

Node.js >= 22.13, npm. Unter Windows npm.cmd verwenden.

`npm.cmd ci` und `npm.cmd run dev`. Produktionsprüfung: `npm.cmd run build`, `npm.cmd run lint`. Die gebaute Vorschau läuft mit `npm.cmd start` auf http://127.0.0.1:3000.

Auf diesem Windows-Rechner Build mit `$env:RAYON_NUM_THREADS="2"` ausführen, um die Rechnerlast zu begrenzen. `preview:worker` ist der gesonderte Cloudflare-Test. Er scheitert derzeit lokal an einem Dateizugriff des Windows-Sandboxes; der reguläre Node-Produktionsserver ist geprüft.

## Seiten

- / — Anbieterwebsite
- /konzepte/ — Übersicht aller separat aufrufbaren Branchenkonzepte
- /konzept/maler/ — fiktive Malerwebsite
- /konzept/maler/leistungen/
- /konzept/maler/gestaltung/
- /konzept/maler/kontakt/ — reine Formularsimulation
- /impressum/ und /datenschutz/ — ehrliche Vorschauhinweise, keine vollständigen Rechtstexte

## Vor öffentlichem Verkaufsstart

Bestätigte Anbieteridentität, Kontakt und steuerliche Preisdarstellung ergänzen. Versandweg mit serverseitiger Validierung, Missbrauchsschutz und tatsächlicher Zustellbestätigung einrichten. Passende Rechtstexte bereitstellen und technisch einbinden. Arbeitsnamen Farbform auf Verwechslungen prüfen oder ersetzen. Erst dann Anbieter-Noindex und Vorschauhinweise kontrolliert ändern; die Demo bleibt ausdrücklich fiktiv.

## Gestaltung

Texte in app/, wiederverwendete Bestandteile in components/. Shadcn-Startkomponenten in components/ui/; verwendet werden Button, Input, Textarea und NativeSelect. CSS und lokale Schriftdefinitionen in app/globals.css. Manrope und Source Serif 4 stehen unter SIL OFL; Lizenzen liegen in public/fonts/.

Drei KI-Originale und exakte Prompts liegen im gemeinsamen Repository unter ../design/generated/manifest.json. WebP-Bildableitungen werden lokal ausgeliefert. Der Screenshot in public/images/demo-desktop.webp wird ausschließlich aus der tatsächlich gerenderten Demo erstellt.

## Struktur für weitere Homepages

Alle Varianten bleiben in dieser Anwendung und sind separat aufrufbar. Neue Branchenkonzepte werden unter `app/konzept/<slug>/` ergänzt und auf `/konzepte/` eingetragen. Gemeinsame Bedienelemente liegen in `components/`; eine Variante darf ihre eigene Typografie, Farben und Inhaltsbausteine erhalten. Dadurch gibt es ein Repository und einen Build, aber dauerhaft eindeutige URLs pro Homepage.

Formulare speichern keine Daten und senden keine Netzwerk-Anfragen. Keine Analysewerkzeuge, Cookies oder externen Schriftabrufe im Anwendungscode. Die Hosting-Infrastruktur bleibt separat zu berücksichtigen.

## Bekannte Plattformgrenzen

Vinext 1.0.0-beta.5 zeigte im Produktionsbuild einen Fehler beim clientseitigen Link-Wechsel. Deshalb nutzt diese Website bewusst normale HTML-Seitenlinks. Die Navigation wurde anschließend in der Produktionsfassung fehlerfrei geprüft. WebP-Dateien werden vorab optimiert; eine dynamische Bildoptimierung ist unnötig. Die entsprechenden Next-spezifischen Lintregeln sind nur in den betroffenen Dateien mit Begründung ausgenommen. Der Lint-Befehl erfasst die gesamte Produktimplementierung, verwendete UI-Primitives, Hilfs- und Konfigurationsdateien. Nicht verwendete mitgelieferte Shadcn-Komponenten sind unverändert und haben eigene bestehende Lintbefunde.

Die Sites-Registrierung wurde am 8. September zunächst erfolgreich angelegt; spätere Zugriffe meldeten jedoch `project_not_found`. Die nicht mehr erreichbare Projekt-ID wird nicht als aktive Hostingbindung im Repository geführt. Kein Ersatzprojekt und keine öffentliche Veröffentlichung wurden erzeugt. Vor einer späteren Bereitstellung wird das Hostingziel neu und eindeutig geprüft.
