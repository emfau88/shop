# Verkaufsgrundlage für Unternehmenswebsites

Stand: 8. September 2026. Schritte 1–3 sind abgeschlossen. Schritt 4 umfasst inzwischen die Anbieterwebsite sowie zwei eigenständige, mehrseitige Branchenkonzepte. Beide Varianten verwenden eigens erzeugte ImageGen-Assets und sind über feste Pfade separat aufrufbar.

- [Bestandsanalyse](docs/01-bestandsanalyse.md)
- [Markt, Strategie und Entscheidung für die Umsetzung](docs/02-markt-und-strategie.md)
- [Designbriefing und Seitenstruktur](docs/03-designbriefing.md)
- [Lokale Gestaltungstafel](design/gestaltungstafel.html)
- [Drei ImageGen-Briefings](design/asset-plan.md)
- [Gestaltungswerte](design/tokens.css)

Entscheidung: ein klar abgegrenztes Website-Angebot für inhabergeführte lokale Handwerksbetriebe, eine kompakte Anbieterwebsite und eine vollständig umgesetzte, transparent fiktive Konzeptreferenz. Kleinanzeigen wird als erster Gesprächskanal priorisiert; eBay wird ergänzend mit einem konkreten Festpreisangebot getestet. Die Präsentation bleibt auch für Empfehlungen und spätere direkte Akquise verwendbar.

Nächster Arbeitsblock: Schritt 5 – konkrete Vertriebsunterlagen für Kleinanzeigen und eBay. Die fertige lokale Website liegt in website/. Start und Einschränkungen sind dort im README beschrieben. Die alte Gestaltungstafel bleibt ein Entwurfsdokument.

- [Umsetzung und Prüfbericht](docs/04-umsetzung-und-pruefung.md)
- [Branchenkonzept Metallverarbeitung](docs/05-metallverarbeitung.md)
- [Website und Startanleitung](website/README.md)
- [ImageGen-Originale und Prompts: Farbform](design/generated/manifest.json)
- [ImageGen-Originale und Prompts: Werkform](design/generated/metal/manifest.json)

Lokale Vorschau: http://127.0.0.1:3000/

## Repository- und Seitenstruktur

Dieses Repository ist die gemeinsame Quelle für das gesamte Vorhaben. Die lauffähige Anwendung liegt unter `website/`; Recherche, Entscheidungen, Originalassets und Prüfberichte liegen daneben und bleiben so nachvollziehbar.

Separat aufrufbare Seiten:

- `/` — eigener Anbieterauftritt
- `/konzepte/` — Übersicht aller Arbeitsbeispiele
- `/konzept/maler/` — Variante 01 „Farbform“ mit vier Inhaltsseiten
- `/konzept/metallbau/` — Variante 02 „Werkform“ mit vier Inhaltsseiten

Künftige Varianten erhalten jeweils einen eigenen Pfad unter `/konzept/<name>/` und einen Eintrag in der Konzeptübersicht. So werden nicht mehrere lose Projekte gepflegt, sondern eine gemeinsame, erweiterbare Präsentation mit eigenständigen Homepages. Als nächste deutliche Zielgruppenvariation ist Garten- und Landschaftsbau vorgesehen.
