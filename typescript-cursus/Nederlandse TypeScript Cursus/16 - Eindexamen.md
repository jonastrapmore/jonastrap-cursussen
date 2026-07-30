# Eindexamen

Dit is het eindstation. Je hebt de taal geleerd (Module 0–9), de overstap naar Vite gemaakt
(Module 10), het gegeven framework leren begrijpen en een volledige app gebouwd (Module 11–15). Nu
breng je alles samen: op het examen bouw je **zelfstandig een volledige app** vanuit de
startbestanden.

## Hoe het examen eruitziet

Elk examen van dit type is **hetzelfde recept met een ander thema** (een webshop, een quiz, een PC
Builder, een receptenboek…). Je krijgt telkens:

- Een **server-project** (de API, draait op poort 3000), dat je **niet** aanpast.
- Een **frontend-project** met het gegeven **framework** (`Router`, `Page`, `CustomElement`, de
  `PersistenceProvider`s) en de **HTML** van de pagina's en componenten. Het framework pas je **niet**
  aan; de `.ts`-bestanden van de pagina's/componenten schrijf je **zelf**.
- Een **opgave** met een reeks vragen, elk een paar punten waard.

> **Je wordt op functionaliteit beoordeeld, niet op lay-out.** En: elke wijziging moet **meteen**
> zichtbaar zijn (via het observer-patroon), niet pas na een refresh.

## Het universele recept (7 stappen)

Bijna elk examen stelt dezelfde soort vragen, in deze volgorde. Herken je ze, dan weet je meteen wat
te doen:

1. **Routing + navbar** — pagina's bereikbaar maken, custom elements registreren, links laten werken.
2. **Eén item renderen** — data via de `RestPersistenceProvider` ophalen en per item een custom
   element tonen (de zwaarste vraag).
3. **Filteren** — op tekst/categorie/type (soms bij elke wijziging, soms op een knop).
4. **Verwijderen** — een item via de API verwijderen.
5. **Toevoegen aan een collectie** — via een **custom event** + opslaan in **localStorage**.
6. **Tweede pagina** — de collectie uit localStorage tonen (vaak met een totaal).
7. **Updaten/verwijderen uit de collectie** — meestal rechtstreeks via de provider.

Niet elk examen heeft alle zeven (de PC Builder had bv. geen filter; de webshop heeft er geen
"verwijderen uit de database"). Maar samen dekken de voorbeelden ze allemaal.

## Je hulpmiddelen

- **De handleiding** — [Bijlage - Handleiding examen (stappenplan)](Bijlage%20-%20Handleiding%20examen%20(stappenplan).md).
  Een compleet stappenplan met kant-en-klare code per vraag en alle valkuilen. Dit is je naslagwerk
  tijdens het oefenen (en een geheugensteun voor het patroon).
- **De uitgewerkte PC Builder** — de `pc-builder-app` die we in Module 11–13 samen bouwden. Een
  volledig, becommentarieerd voorbeeld om naar terug te grijpen.
- **Twee oefenexamens (ander thema, zelfde recept)**, elk met een uitgewerkte walkthrough én de
  startcode om **zelf** te bouwen (in `oefeningen-vite/`):
  - [17 - Oefenexamen - Webshop (uitgewerkt)](17%20-%20Oefenexamen%20-%20Webshop%20(uitgewerkt).md) —
    voegt **filteren** en een **wijziging terugschrijven naar de database** (korting) toe.
  - [18 - Oefenexamen - Quiz builder (uitgewerkt)](18%20-%20Oefenexamen%20-%20Quiz%20builder%20(uitgewerkt).md) —
    voegt **verwijderen uit de database**, **radio-filters** en het **verzamelen in een `Set`** ("Create
    quiz") toe.

  > Probeer ze eerst **zelf** vanuit de startcode; de walkthrough is om te controleren of vast te raken.

## Gouden tips (uit ervaring)

- **Werk vraag per vraag af, en test na elke stap in de browser.** Eerst renderen laten werken, dan
  pas de filter, dan pas toevoegen… Zo verlies je nooit punten van een werkende vraag door een latere
  fout.
- **Onthoud "een pagina doet 3 dingen":** (a) observer registreren, (b) `getAll()` oproepen, (c) in
  `render()` per item een custom element maken en data via **attributen** (strings, kebab-case!)
  doorgeven.
- **Tag-namen en attribuutnamen moeten exact overal gelijk zijn** (`define` ↔ `createElement`;
  `setAttribute` ↔ `observedAttributes` + `case`). Een typo = een leeg veld of onbekend element,
  zonder foutmelding.
- **Het framework pas je niet aan** — je gebruikt het. Ken je het niet meer? Kijk terug naar
  Module 11–13.
- **Vergeet het type niet** bij een provider: `new RestPersistenceProvider<Product>(...)`.
- **`vite dev` typecheckt niet;** vertrouw op je rode kringels en draai af en toe `pnpm build`.

Begin met een van de twee oefenexamens (Webshop of Quiz builder): bouw het **zelf** vanuit de
startcode, en gebruik de walkthrough pas ter controle. Daarna ben je klaar om het echt zelf te doen.
Succes!
