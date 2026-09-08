# Schritt 4: Umsetzung und Prüfung

Stand: 8. September 2026. Anbieterwebsite und vierseitige Konzeptwebsite sind lokal implementiert und als Produktionsfassung geprüft. Die private Online-Bereitstellung ist noch blockiert.

## Ergebnis

- Anbieterstartseite mit Angebot, echtem Demoscreenshot, Ablauf, Ansprechpartnertext, vier FAQs und Vorschauformular.
- Vier Demoseiten: Start, Leistungen, Gestaltung und Kontakt.
- Drei eigene ImageGen-Motive: Aubergine-Wohnzimmer, senfgelber Eingang und Farbmuster. Exakte Prompts und Originaldateien in ../design/generated/manifest.json.
- Lokal ausgelieferte Manrope- und Source-Serif-4-WOFF2-Schriften mit OFL-Lizenzen.
- WebP-Raumbilder mit 99–247 kB je Datei; Screenshot aus dem Browser, keine erfundene UI.
- Responsive Navigation mit Escape/Fokusrückgabe, Sprunglink, sichtbaren Feldlabels und nativer Validierung.
- Sieben Seitenrouten sowie eine eigene 404-Seite. Noindex für die gesamte Vorschau.

## Prüfung

- Produktionsbuild erfolgreich mit Vinext 1.0.0-beta.5. Auf dem speicherknappen Windows-Rechner mit RAYON_NUM_THREADS=2.
- TypeScript --noEmit --incremental false erfolgreich.
- Lint für alle Produktdateien und die vier tatsächlich verwendeten Shadcn-Primitives erfolgreich. Nicht verwendete Starterkomponenten wurden unverändert gelassen; deren bestehende Lintbefunde sind im Projekt-README erklärt.
- Alle sieben Seiten über den Node-Produktionsserver mit HTTP 200 und Noindex; unbekannte Route HTTP 404.
- Anbieterstartseite: angeforderte Breiten 360, 390, 768, 1024, 1440. Gemessene innerWidth-Werte 360, 391, 768, 1025, 1441; Inhalt ohne horizontalen Überlauf.
- Demo-Unterseiten Leistungen, Gestaltung, Kontakt über dieselben fünf Größen: kein horizontaler Überlauf.
- Demostart über die fünf Größen betrachtet; 360-px-Überlauf bei Oberflächengestaltung behoben und anschließend scrollWidth = clientWidth bestätigt.
- Mobiles Menü geöffnet, mit Escape geschlossen, Fokus zurück zum Menüknopf.
- Leistungslink übernimmt Oberflächengestaltung ins Anfrageformular.
- Leere Demo-Anfrage blockiert; vollständige Anfrage zeigt ausdrücklich nur Simulation.
- Anbieterformular blockiert ungültige E-Mail; vollständige Eingabe mit und ohne optionale Website erfolgreich geprüft.
- Produktionsnavigation Anbieter → Demo → Kontakt und gültige Demo-Anfrage: nach finalem Fix keine neuen Browserfehler.
- Bilder vollständig geladen; Hauptansichten und Preisabschnitt visuell geprüft. Die Ganzseiten-Screenshotfunktion erzeugte Stitching-Dopplungen; die betroffenen Bereiche wurden deshalb direkt im Viewport geprüft und im DOM als einmalig bestätigt. Kein solcher Ganzseitenexport wird als Vertriebsasset geliefert.

## Technische Entscheidungen

Basis aus dem gepinnten Sites-Starter 0.3.0. Die PowerShell-npm-Weiterleitung verschluckte Optionen; das zugehörige Shadcn-Addon wurde daher aus exakt diesem Starter ergänzt. Verwendet werden Button, Input, Textarea und NativeSelect.

Vinexts clientseitiges Link-Modul verursachte im Produktionsbuild Laufzeitfehler. Statt die Prüfung zu übergehen, sind interne Links bewusst normale HTML-Seitenaufrufe. Die finale Navigation ist damit geprüft. Dynamische Bildoptimierung ist nicht nötig: alle Motive wurden vorab komprimiert, mit Maßen und passenden Ladeprioritäten eingebunden.

## Bewusst noch Vorschau

Kein realer Empfänger oder Formularversand; keine Speicherung von Eingaben. Anbietername, Anschrift, E-Mail, steuerliche Preiszeile, Domain und passende Rechtstexte fehlen weiterhin. Impressum und Datenschutz erklären den Vorschauzustand statt Angaben zu erfinden. Preis 1.490 Euro bleibt Planpreis. Konzeptname Farbform ist nicht auf Markenverfügbarkeit geprüft.

## Bereitstellung

Lokale Produktionsvorschau: http://127.0.0.1:3000/ — Start nach Bedarf aus website/ mit npm.cmd start.

Sites wurde einmal registriert. Nach der Unterbrechung meldeten sowohl get_site als auch die Erneuerung der Schreibberechtigung project_not_found. Die nicht mehr erreichbare ID wird deshalb nicht als aktive Hostingbindung im Repository geführt. Es wurde keine Ersatz-Site angelegt, keine Quelle dorthin hochgeladen und keine Online-Veröffentlichung behauptet. Vor einer späteren Bereitstellung wird das Hostingziel neu und eindeutig geprüft.

Der lokale Cloudflare-Worker-Test ist zusätzlich durch einen Dateizugriff im Windows-Sandbox eingeschränkt. Der Node-Produktionsserver funktioniert. Das Sites-Paketskript scheiterte an MSYS-Pfadrechten; dessen identischer Node-Staging-Helfer wurde direkt aufgerufen und das Ergebnis mit Windows-tar gepackt. Das Archiv in design/site-preview.tar.gz enthält nur Buildausgabe und Hostingmetadaten, keine Zugangsdaten.

## Nächster fachlicher Arbeitsblock

Schritt 5: konkrete Anzeigen- und Antworttexte sowie zugeschnittene echte Website-Screenshots für Kleinanzeigen und ergänzend eBay. Noch keine Anzeigen veröffentlicht oder Nachrichten verschickt. Vor einem echten Verkaufsstart Anbieterangaben und steuerliche Darstellung bestätigen sowie den Versandweg einrichten.
