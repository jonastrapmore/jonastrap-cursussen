# Nederlandse TypeScript Cursus

Welkom bij deze cursus. Hier leer je stap voor stap **TypeScript**, als vervolg op JavaScript.
De cursus is bedoeld voor wie JavaScript al kent, TypeScript bouwt daar rechtstreeks op voort.
We gaan rustig en grondig te werk, niet oppervlakkig.

## Wat is TypeScript (in één zin)?

TypeScript = **JavaScript + types**. Het is dezelfde taal die je al kent, met een extra
veiligheidslaag die fouten opspoort *terwijl je typt* in plaats van pas als je code draait.

## Voorkennis

Deze cursus gaat ervan uit dat je **JavaScript kent**: variabelen (`let`/`const`), functies,
arrays, objecten, loops, en de basis van DOM en events. Die JavaScript-stof leggen we hier
**niet opnieuw uit**, we richten ons op wat TypeScript eraan toevoegt. Kom je een stukje
gewone JavaScript tegen, dan ga ik ervan uit dat het bekend is.

> Ken je JavaScript nog niet (goed genoeg)? Leer dat dan eerst, bijvoorbeeld via de
> JavaScript-cursus op [jonastrap.be/javascriptcourse](https://jonastrap.be/javascriptcourse),
> en kom daarna terug. Deze cursus bouwt er rechtstreeks op voort.

## Het doel van deze cursus

1. De **taal** TypeScript leren (types, interfaces, classes, generics...).
2. Begrijpen **wanneer je `tsc` gebruikt en wanneer Vite/pnpm**, en de overstap maken.
3. Op het einde: zelfstandig een **echte app** kunnen bouwen, een component-gebaseerde
   applicatie met een eigen **router** en **data-persistentie**, en begrijpen hoe zulke
   bouwstenen werken en hoe je ze zelf zou schrijven.

> Dat soort app (vaak de eindopdracht van een opleiding of een examen) is ons eindstation. We
> bouwen er stap voor stap naartoe.

## Twee gereedschappen: wanneer welk

Dit is een rode draad in de cursus, dus alvast hier:

| Fase | Gereedschap | Wat |
|------|-------------|-----|
| De taal leren (Module 0–9) | **`tsc`** | Je schrijft `.ts`, compileert met `tsc` naar `.js` en draait dat met Node. Geen poespas, focus op de taal. |
| Echte apps bouwen (vanaf Module 10) | **Vite + pnpm** | Een projecttool die het compileren, bundelen én een live dev-server voor je doet (`pnpm dev`). Dit gebruiken de examens. |

We beginnen bewust met `tsc` (puur de taal), en stappen later over naar Vite/pnpm.

## Inhoudsopgave (groeit mee)

| Module | Onderwerp | Gereedschap |
|--------|-----------|-------------|
| 0 | Setup: wat is TS, installeren, eerste compile | tsc |
| 1 | Type-annotaties, inference, basistypes | tsc |
| 2 | Arrays, tuples, enums | tsc |
| 3 | Functies met types | tsc |
| 4 | Objecten, type aliases, interfaces | tsc |
| 5 | Union- & intersection-types, literals, narrowing | tsc |
| 6 | Classes | tsc |
| 7 | Type modifiers (readonly, optioneel, access, `as const`) | tsc |
| 8 | Generics + veelgebruikte utility types (`Partial`, `Pick`, `Omit`, `Record`) | tsc |
| 9 | Modules, tsconfig & configuratie | tsc |
| 10 | Overstap naar Vite + pnpm | Vite/pnpm |
| 11 | Het framework (CustomElement, Page, Router) + routing & navbar | Vite/pnpm |
| 12 | Data ophalen & renderen (providers, observer) + filteren/verwijderen | Vite/pnpm |
| 13 | Collecties: custom events, localStorage & tweede pagina | Vite/pnpm |
| 14 | Declaratiebestanden (`.d.ts`) | Vite/pnpm |
| 15 | IDE-functies (kort) | n.v.t. |
| 16 | Eindexamen: aanpak & het universele recept | Vite/pnpm |
| 17 | Oefenexamen: Webshop (uitgewerkt, stap voor stap) | Vite/pnpm |
| 18 | Oefenexamen: Quiz builder (uitgewerkt, stap voor stap) | Vite/pnpm |
| 19 | Slotwoord | — |
| Bijlage | Handleiding examen (stappenplan, naslag) | — |

## Hoe je deze cursus gebruikt

1. **Lees** de module rustig door.
2. **Typ de code zelf over** in je oefenmap en **compileer** met `tsc`.
3. **Maak de oefeningen** aan het eind van elke module.
4. **Loop je vast?** Lees de foutmelding rustig, de compiler is heel precies, en meestal staat
   het antwoord erin. Zoek gericht op of vraag iemand om mee te kijken.

## Belangrijkste verschil met JavaScript

> In JavaScript ontdek je een fout pas als je code **draait**. In TypeScript vertelt de
> compiler je de fout al **terwijl je typt**, vaak met een rood kringeltje in VS Code. Dat
> rode kringeltje is je nieuwe beste vriend.

Begin bij **Module 0**.
