# Oefenexamen: Webshop — startcode

Dit is de **startcode** van het webshop-examen (zoals je die op een echt examen krijgt). Het is
bedoeld om **zelf op te lossen**: bouw de app stap voor stap op vanuit deze bestanden.

- **De opgave + uitgewerkte oplossing** staat in de cursus:
  [17 - Oefenexamen - Webshop (uitgewerkt)](../../17%20-%20Oefenexamen%20-%20Webshop%20(uitgewerkt).md).
- **Naslag met alle patronen:** [Bijlage - Handleiding examen (stappenplan)](../../Bijlage%20-%20Handleiding%20examen%20(stappenplan).md).
- Vastlopen? Kijk terug naar de uitgewerkte **PC Builder** (`../pc-builder-app`, Module 11–13).

> **Tip:** probeer het eerst **zelf**, vraag per vraag, en gebruik de uitwerking pas om te
> controleren of vast te raken. Zo leer je het meest.

## Herkomst van de code (bronvermelding)

De **framework-bestanden** (`frontend/src/router/*`, `frontend/src/data/*`), de **HTML**, de
**modellen** en het **server**-project komen uit de examen-startcode (webshop). Die code krijg je op
het examen en pas je niet aan. Ze is hier als lesmateriaal opgenomen, met toestemming.

Wat je **zelf** schrijft: de `.ts`-bestanden van de pagina's (`pages/products/products.ts`,
`pages/cart/cart.ts`) en de componenten (`components/navbar/navbar.ts`,
`components/productCard/product.ts`, `components/cartItem/cartItem.ts`), plus `main.ts` en
`data/data.ts`.

## Draaien

```bash
# 1) server (API op poort 3000)
cd server
pnpm install
pnpm dev          # controleer: draait op http://localhost:3000

# 2) frontend (in een TWEEDE terminal)
cd frontend
pnpm install
pnpm dev          # open de getoonde URL (meestal http://localhost:5173)
```

In het begin zie je een lege pagina: `main.ts` doet nog niets. Dat is normaal, je vult het zelf in
(begin bij vraag 1: routing + navbar).

## De vragen (kort)

1. Pagina's & componenten — routing + navbar
2. Producten inladen en renderen (API + custom element)
3. Producten filteren (naam + categorie, op een knop)
4. Producten toevoegen aan het winkelmandje (custom event + localStorage)
5. Korting toepassen (custom event + `update` naar de database)
6. Winkelmandje inladen en renderen (+ totaalprijs)
7. Producten verwijderen uit het winkelmandje (rechtstreeks via de provider)

Volledige uitwerking: zie het cursusdocument hierboven.
