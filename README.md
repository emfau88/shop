# Verkaufsgrundlage für Unternehmenswebsites

[![Deploy website to GitHub Pages](https://github.com/emfau88/shop/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/emfau88/shop/actions/workflows/deploy-pages.yml)

## Live-Demos

Die vollständige Präsentation läuft über GitHub Pages. Alle Links öffnen eigenständige, mehrseitige Websites und können direkt im Browser getestet werden.

| Bereich | Startseite | Weitere Seiten |
| --- | --- | --- |
| Anbieterauftritt | [Webdesign-Angebot ansehen](https://emfau88.github.io/shop/) | [Konzeptübersicht](https://emfau88.github.io/shop/konzepte/) · [Anfrage](https://emfau88.github.io/shop/#anfrage) |
| Farbform · Malerbetrieb | [Homepage ansehen](https://emfau88.github.io/shop/konzept/maler/) | [Leistungen](https://emfau88.github.io/shop/konzept/maler/leistungen/) · [Gestaltung](https://emfau88.github.io/shop/konzept/maler/gestaltung/) · [Kontakt](https://emfau88.github.io/shop/konzept/maler/kontakt/) |
| Werkform · Metallverarbeitung | [Homepage ansehen](https://emfau88.github.io/shop/konzept/metallbau/) | [Leistungen](https://emfau88.github.io/shop/konzept/metallbau/leistungen/) · [Einblicke](https://emfau88.github.io/shop/konzept/metallbau/einblicke/) · [Anfrage](https://emfau88.github.io/shop/konzept/metallbau/anfrage/) |
| Grünraum · Garten- und Landschaftsbau | [Homepage ansehen](https://emfau88.github.io/shop/konzept/galabau/) | [Leistungen](https://emfau88.github.io/shop/konzept/galabau/leistungen/) · [Gartenideen](https://emfau88.github.io/shop/konzept/galabau/gartenideen/) · [Anfrage](https://emfau88.github.io/shop/konzept/galabau/anfrage/) |
| AUFSCHLAG · Tennis- und Badmintonverein | [Homepage ansehen](https://emfau88.github.io/shop/konzept/sportverein/) | [Training](https://emfau88.github.io/shop/konzept/sportverein/training/) · [Verein](https://emfau88.github.io/shop/konzept/sportverein/verein/) · [Probetraining](https://emfau88.github.io/shop/konzept/sportverein/probetraining/) |
| LINDENWIRT · Gaststätte und Restaurant | [Homepage ansehen](https://emfau88.github.io/shop/konzept/gastronomie/) | [Speisekarte](https://emfau88.github.io/shop/konzept/gastronomie/speisekarte/) · [Unser Haus](https://emfau88.github.io/shop/konzept/gastronomie/haus/) · [Feiern](https://emfau88.github.io/shop/konzept/gastronomie/feiern/) · [Reservieren](https://emfau88.github.io/shop/konzept/gastronomie/reservieren/) |

Die Formulare sind bewusst als sichere Demos umgesetzt: Sie prüfen Beispieleingaben im Browser, versenden und speichern aber keine Daten. Jede Seite weist transparent auf den Konzeptstatus hin.

Stand: 10. September 2026. Schritte 1–3 sind abgeschlossen. Schritt 4 umfasst inzwischen die Anbieterwebsite sowie fünf eigenständige, mehrseitige Branchenkonzepte mit insgesamt 25 Routen. Alle Varianten verwenden eigens erzeugte ImageGen-Assets und sind über feste Pfade separat aufrufbar.

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
- [Branchenkonzept Garten- und Landschaftsbau](docs/06-galabau.md)
- [Vereinskonzept Tennis und Badminton](docs/07-sportverein.md)
- [Design-Audit und Variationsstrategie](docs/08-design-audit.md)
- [Branchenkonzept Gastronomie](docs/09-gastronomie.md)
- [Showroom-Weiterentwicklung und Abschluss-Audit](docs/10-showroom-weiterentwicklung.md)
- [Kleinanzeigen-Angebot, Preisstrategie und Wettbewerb](docs/11-kleinanzeigen-angebot-preise-und-wettbewerb.md)
- [Website und Startanleitung](website/README.md)
- [ImageGen-Originale und Prompts: Farbform](design/generated/manifest.json)
- [ImageGen-Originale und Prompts: Werkform](design/generated/metal/manifest.json)
- [ImageGen-Originale und Prompts: Grünraum](design/generated/galabau/manifest.json)
- [ImageGen-Originale und Prompts: AUFSCHLAG](design/generated/sportverein/manifest.json)
- [ImageGen-Originale und Prompts: LINDENWIRT](design/generated/gastronomie/manifest.json)
- [ImageGen-Edit für den Farbform-Vorher-nachher-Vergleich](design/generated/showroom/manifest.json)

Lokale Vorschau: `http://127.0.0.1:3000/`

Bei jedem Push auf `main` prüft GitHub Actions den Quellcode, baut alle Seiten und veröffentlicht sie automatisch über GitHub Pages. Der Workflow liegt unter `.github/workflows/deploy-pages.yml`.

## Repository- und Seitenstruktur

Dieses Repository ist die gemeinsame Quelle für das gesamte Vorhaben. Die lauffähige Anwendung liegt unter `website/`; Recherche, Entscheidungen, Originalassets und Prüfberichte liegen daneben und bleiben so nachvollziehbar.

Separat aufrufbare Pfade:

- `/` — eigener Anbieterauftritt
- `/konzepte/` — Übersicht aller Arbeitsbeispiele
- `/konzept/maler/` — Variante 01 „Farbform“ mit vier Inhaltsseiten
- `/konzept/metallbau/` — Variante 02 „Werkform“ mit vier Inhaltsseiten
- `/konzept/galabau/` — Variante 03 „Grünraum“ mit vier Inhaltsseiten
- `/konzept/sportverein/` — Variante 04 „AUFSCHLAG“ mit vier Inhaltsseiten
- `/konzept/gastronomie/` — Variante 05 „LINDENWIRT“ mit fünf Inhaltsseiten

Künftige Varianten erhalten jeweils einen eigenen Pfad unter `/konzept/<name>/` und einen Eintrag in der Konzeptübersicht. So werden nicht mehrere lose Projekte gepflegt, sondern eine gemeinsame, erweiterbare Präsentation mit eigenständigen Homepages.
