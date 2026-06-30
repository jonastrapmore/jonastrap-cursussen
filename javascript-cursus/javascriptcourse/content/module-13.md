# Module 13: Eindoefening (het museum-examen)

Dit is de grote finale. Je gaat alles uit modules 1 t/m 12 toepassen op een **echte
examenopdracht**: een museum-website waarvan je de collectie ophaalt, toont, toevoegt,
verwijdert en filtert. Geen nieuwe theorie, alleen integreren wat je al kunt.

> **De opdracht en een uitgewerkte oplossing staan in je examenmap:**
> `EXAMEN FOLDER/JS-Jonas-Trap/`, met `README.md` (de opdracht), `index.html` + `index.css`
> (aangeleverd), en `index.js` (de oplossing). Probeer elk onderdeel hieronder **eerst zelf**,
> en vergelijk daarna met `index.js`.

> **Aanpak:** open `index.html` in de browser, en schrijf je code in `index.js` (apart bestand,
> zoals in Module 11). De HTML en CSS zijn al gemaakt, jij doet alleen het JavaScript.

---

## 0. Eerst lezen: de structuur begrijpen

Voordat je een letter code schrijft, bekijk je de aangeleverde `index.html`. Let op:
- Elk element met de klasse **`home-page`** hoort bij de homepagina, elk met **`collection-page`**
  bij de collectiepagina. Elementen zonder die klassen (zoals de navbar) zijn altijd zichtbaar.
- Onderaan staat een **`<template>`** met de voorbeeld-markup van één artefact. Bestudeer de
  klassenamen daarin goed (`artifact`, `artifact-img`, `status`, `metadata`, `header`...). Die
  ga je exact nabouwen.
- De zoekbalk heeft `id="search"`, de toevoegknop `id="add-button"`, de container
  `id="artifacts-container"`.

> Dit is stap 1 van élke opdracht: lees de HTML, vind de id's en klassen die je nodig hebt.
> Schrijf bovenaan je `index.js` meteen de `document.getElementById(...)`-regels (Module 5).

---

## 1. Pagina's tonen/verbergen (navigatie)

**Wat moet het doen:** klik je op "Grand Museum", toon de home-elementen en verberg de
collectie; klik je op "Collections", andersom.

**Technieken:** `querySelectorAll` (Module 5) + `forEach` (Module 4) + de `hidden`-eigenschap +
events (Module 6).

**Aanpak:**
1. Verzamel beide groepen: `document.querySelectorAll(".home-page")` en `".collection-page"`.
2. Zet bij een klik de ene groep op `hidden = true` en de andere op `hidden = false`.

```js
const homeElementen = document.querySelectorAll(".home-page");
const collectieElementen = document.querySelectorAll(".collection-page");

collectieNav.addEventListener("click", () => {
  homeElementen.forEach((el) => (el.hidden = true));
  collectieElementen.forEach((el) => (el.hidden = false));
});
```

`el.hidden = true` verbergt een element (alsof het er niet is). Doe hetzelfde, omgekeerd, voor
de home-knop. (Tip uit de opdracht: je mag de collectiepagina als standaard tonen.)

---

## 2. Artefacten ophalen (fetch)

**Wat moet het doen:** haal de collectie op van de API en bewaar die in een **globale array**.

**Technieken:** `async/await` + `fetch` (Module 8), en de bron-van-waarheid-array (Module 12).

```js
let artefacten = []; // de globale array = bron van waarheid

async function haalArtefacten() {
  const response = await fetch(
    "https://vaolhgulafwfxgrqpngy.supabase.co/functions/v1/museum",
  );
  artefacten = await response.json();
  renderArtefacten(); // tonen zodra de data binnen is
}

haalArtefacten();
```

Let op het patroon uit Module 8: `renderArtefacten()` hoort **na** het ophalen (binnen de
async-functie of in een `.then`), want de data is asynchroon, ze is er pas later.

> Lukt de fetch niet? De opdracht staat toe dat je zelf een array met dezelfde properties
> aanmaakt en die toont. Dan scoor je nog steeds vol op het renderen.

---

## 3. Artefacten renderen (kaartjes bouwen)

**Wat moet het doen:** toon elk artefact als kaartje, opgebouwd met `createElement` (géén
HTML-strings), met exact de klassenamen uit de template.

**Technieken:** `createElement` + `className` + `textContent` + `appendChild` (Module 11), in
een renderfunctie met "leegmaken → loopen → toevoegen".

```js
function renderArtefacten() {
  artifactsContainer.innerHTML = ""; // leegmaken
  for (const artefact of artefacten) {
    const kaart = createArtefact(artefact);
    artifactsContainer.appendChild(kaart);
  }
}

function createArtefact(artefact) {
  const div = document.createElement("div");
  div.className = "artifact";

  const img = document.createElement("img");
  img.className = "artifact-img";
  img.src = artefact.imageUrl;
  img.alt = artefact.name;

  // ... bouw de rest na volgens de template:
  // status, metadata, header, h5 (name), p (era), verwijderknop, p (description)
  // hang alles met appendChild in elkaar en return de buitenste div.
}
```

Dit is het grootste onderdeel (6 punten). Werk de template **van boven naar beneden** na, en
controleer per element de klassenaam. Vergelijk daarna gerust met `createArtefact` in de
oplossing, let op de volgorde van de `appendChild`-regels.

> Examen-tip: de eis "gebruik `createElement`, schrijf geen markup" betekent: bouw elk element
> los op. Niet `div.innerHTML = "<h5>..."`. Precies wat je in Module 11 oefende.

---

## 4. Artefact toevoegen (POST)

**Wat moet het doen:** bij klik op "+ Add Artifact" een **POST**-fetch doen; de API geeft één
nieuw artefact terug; voeg het toe aan de array en toon het.

**Technieken:** `fetch` met `{ method: "POST" }` (Module 12, paragraaf 6) + `push` + re-render.

```js
addButton.addEventListener("click", async () => {
  const response = await fetch(
    "https://vaolhgulafwfxgrqpngy.supabase.co/functions/v1/museum",
    { method: "POST" },
  );
  const nieuw = await response.json();
  artefacten.push(nieuw); // bron van waarheid bijwerken
  renderArtefacten();     // opnieuw tonen
});
```

Zelfde patroon als altijd: data veranderen → re-renderen.

---

## 5. Artefact verwijderen

**Wat moet het doen:** via de prullenbak-knop op een kaartje het artefact uit de array (en dus
het scherm) halen. Geen fetch nodig.

**Technieken:** een listener op de verwijderknop in `createArtefact` + `filter` of
`indexOf`+`splice` (Module 12) + re-render.

```js
verwijderKnop.addEventListener("click", () => {
  artefacten = artefacten.filter((a) => a !== artefact); // schoonste manier
  renderArtefacten();
});
```

(De oplossing gebruikt `indexOf` + `splice`, ook goed. Allebei verwijderen ze het juiste item;
kies wat jij het duidelijkst vindt.)

---

## 6. Artefacten filteren (zoeken)

**Wat moet het doen:** zoeken op `name` **en** `era`, hoofdletterongevoelig, term mag overal
voorkomen. Leeg zoekveld toont weer alles. Filteren op Enter (voor de volle punten).

**Technieken:** `filter` + `includes` + `toLowerCase` in de render (Module 12, paragraaf 4) +
`keypress`/Enter (Module 6).

```js
function renderArtefacten() {
  const zoekterm = searchInput.value.toLowerCase();
  const zichtbaar = artefacten.filter(
    (a) =>
      a.name.toLowerCase().includes(zoekterm) ||
      a.era.toLowerCase().includes(zoekterm),
  );

  artifactsContainer.innerHTML = "";
  zichtbaar.forEach((a) => artifactsContainer.appendChild(createArtefact(a)));
}

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    renderArtefacten();
  }
});
```

Door het filteren **in de render** te zetten, werkt het automatisch samen met toevoegen en
verwijderen, alles loopt via dezelfde `renderArtefacten()`. Dat is de kracht van de
bron-van-waarheid-aanpak.

> De opdracht laat je de filter leegmaken om weer alles te zien. Omdat een lege zoekterm in
> élke tekst "zit", toont een leeg veld automatisch alles. (De oplossing voegt een
> `dblclick`-listener toe die het veld leegt, een nette extra.)

---

## 7. Hoe alles samenhangt

Zie je het patroon dat door de hele opdracht loopt? Eén globale array `artefacten`, en één
functie `renderArtefacten()` die de array (gefilterd) op het scherm zet. **Elke** actie,
ophalen, toevoegen, verwijderen, zoeken, sorteren, doet exact twee dingen:

1. de array (of de zoekterm) aanpassen;
2. `renderArtefacten()` aanroepen.

Snap je dat ene patroon, dan snap je niet alleen dit examen, maar de basis van zo goed als elke
data-gedreven webapplicatie (en van frameworks als React).

---

## Checklist (examen-eisen → jouw code)

| Onderdeel | Punten | Techniek | Module |
|-----------|--------|----------|--------|
| Pagina's tonen/verbergen | 2 | `querySelectorAll` + `hidden` + events | 5, 6 |
| Ophalen (fetch) | 3 | `async/await` + `fetch` | 8 |
| Renderen | 6 | `createElement` + `appendChild` + render-loop | 11 |
| Toevoegen | 2 | `fetch` POST + `push` + re-render | 12 |
| Verwijderen | 3 | `filter` / `splice` + re-render | 12 |
| Filteren | 4 | `filter` + `includes` + `toLowerCase` + Enter | 12, 6 |

## Eindopdracht

1. Open `EXAMEN FOLDER/JS-Jonas-Trap/`. Lees `README.md` en bekijk `index.html`.
2. Hernoem of bewaar `index.js` (de oplossing) even apart, en probeer **vanaf nul** elk
   onderdeel hierboven zelf te schrijven in een lege `index.js`.
3. Loop je vast? Pak de hint uit de juiste module erbij, of vergelijk met de bewaarde oplossing.
4. Werkt alles? Gefeliciteerd, dan kun je een complete data-app bouwen met pure JavaScript.

---

## En nu? Op naar TypeScript

Hiermee heb je de JavaScript-cursus afgerond: van variabelen tot een volledige data-app. Je
hebt nu precies de basis die je nodig hebt voor **TypeScript**, dat is JavaScript met types
erbovenop. Alles wat je hier leerde (variabelen, functies, objecten, arrays, `fetch`, de DOM)
blijft gelden; TypeScript voegt er een veiligheidslaag aan toe.

Zeg maar wanneer je zover bent, dan beginnen we aan TypeScript, in dezelfde stijl, met je
video-courses als bron en deze modules als opstap.
