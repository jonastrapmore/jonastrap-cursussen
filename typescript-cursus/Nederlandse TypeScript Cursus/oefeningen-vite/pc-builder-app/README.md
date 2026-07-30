# Cursus-app: PC Builder (doorlopend voorbeeld, Module 11–13)

Dit is de **doorlopende voorbeeld-app** van de cursus, die we in Module 11–13 stap voor stap hebben
opgebouwd. Dit is de **volledig uitgewerkte** versie (alle stappen af):

- **Module 11** — routing + navbar (stap 1)
- **Module 12** — onderdelen ophalen uit de API + renderen (stap 2)
- **Module 13** — onderdeel toevoegen aan de configuratie (custom event + localStorage), de
  configuratiepagina met totaal, en verwijderen uit de configuratie (stap 5–7)

> Filteren en verwijderen uit de database (stap 3–4) komen in Module 12 aan bod als *concept*, maar de
> PC Builder-opgave vraagt ze niet, dus ze zitten niet in deze app. Wil je die oefenen: zie de
> **webshop** en **quiz** oefenexamens.

## Herkomst van de code (bronvermelding)

De **framework-bestanden** (`frontend/src/router/*`, `frontend/src/data/*`), de **HTML** van de
pagina's/componenten, de **modellen** en het volledige **server**-project komen uit de
**examen-startcode** (PC Builder, examen 2025–2026). Die code **krijg je op het examen** en pas je
niet aan — je gebruikt ze enkel. Ze is hier opgenomen als lesmateriaal, met toestemming, zodat de
cursus 1-op-1 aansluit bij wat je op het examen ziet.

Wat we in de cursus **zelf** schrijven (de bestanden met een `// ===== Module N =====`-kop, zoals
`main.ts`, de pagina- en component-`.ts`-bestanden), is de eigenlijke oefening.

## Draaien

Twee projecten, elk in hun eigen map installeren:

```bash
# 1) server (API op poort 3000)
cd server
pnpm install
pnpm dev          # controleer: "Server is running at http://localhost:3000"

# 2) frontend (in een TWEEDE terminal)
cd frontend
pnpm install
pnpm dev          # open http://localhost:5173
```

## Wat de app doet (volledig)

- **Navbar + routing**: wisselen tussen `/` (Onderdelen) en `/build` (Mijn configuratie) zonder
  volledige herlaad.
- **Onderdelen-pagina**: alle onderdelen uit de API, elk als kaart (naam, prijs, categorie), met een
  `+`/`✓`-knop om ze aan de configuratie toe te voegen/verwijderen. Zit er al een onderdeel van
  dezelfde categorie in, dan een melding (en niets opslaan).
- **Configuratie-pagina** (`/build`): de opgeslagen configuratie uit localStorage, met totaalprijs,
  en een X-knop om een onderdeel te verwijderen.
- Alles werkt **live** (observer-patroon) en blijft bewaard na een refresh (localStorage).
