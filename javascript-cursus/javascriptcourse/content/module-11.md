# Module 11: Bootstrap en kaartjes renderen

Tot nu toe maakte je zelf simpele pagina's. In de praktijk (en op je examen) krijg je vaak
**kant-en-klare HTML en CSS** aangeleverd, en is het jouw taak om er met **JavaScript data in
te zetten**. Vaak is die opmaak gebouwd met **Bootstrap**. In deze module leer je hoe dat
werkt: een gegeven Bootstrap-pagina vullen met data, in de vorm van kaartjes ("cards").

> Vanaf nu werken we **netjes in een apart `.js`-bestand**, niet meer in de HTML. De
> oefenbestanden staan klaar in `oefeningen/module11/` (`index.html` en `index.js`).

---

## 1. Wat is Bootstrap?

**Bootstrap** is een **CSS-framework**: een grote verzameling kant-en-klare CSS-klassen die je
op je HTML plakt om er meteen mooi en professioneel uit te laten zien, knoppen, kaartjes,
navigatiebalken, een raster (grid), enzovoort. Het belangrijkste om te onthouden:

> Met Bootstrap **schrijf je zelf bijna geen CSS**. Je voegt alleen de juiste **klassenamen**
> toe aan je HTML-elementen, en Bootstrap zorgt voor de opmaak.

Een knop wordt bijvoorbeeld:

```html
<button class="btn btn-primary">Klik mij</button>
```

`btn` en `btn-primary` zijn Bootstrap-klassen. Jij bedenkt die opmaak niet, je gebruikt 'm.

### Bootstrap inladen

Je laadt Bootstrap via een **CDN** (een link naar een server die het bestand levert). Dat
staat al voor je in `index.html`:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet" />
```

Voor interactieve onderdelen (zoals een uitklapmenu) is er ook een Bootstrap-**JavaScript**-
bestand, dat onderaan staat. Dat hoef je niet zelf te bedienen; het werkt vanzelf zodra de
juiste klassen aanwezig zijn.

> Op je examen krijg je de Bootstrap-opmaak en de HTML-structuur **aangeleverd**. Jij hoeft
> geen HTML/CSS te maken, je vult met JavaScript de data in. Precies wat we hier oefenen.

---

## 2. Een apart JavaScript-bestand koppelen

Tot nu toe stond je code tussen `<script>...</script>` in de HTML. Vanaf nu zetten we de code
in een **apart bestand** en koppelen we dat. Onderaan de `<body>`:

```html
<script src="index.js"></script>
```

- `src="index.js"` → laad de code uit dat bestand.
- Het staat **onderaan**, vlak voor `</body>`, om dezelfde reden als altijd: dan bestaat de
  HTML al wanneer je script draait (Module 5).

Voordelen: je HTML blijft schoon, je JavaScript staat overzichtelijk bij elkaar, en je editor
kan je beter helpen (kleuren, foutcontrole). Dit is hoe het in elke echte website gaat.

---

## 3. Het Bootstrap-grid (kort): rows en columns

Bootstrap verdeelt de breedte in een **raster** van 12 kolommen. Je zet items in een `row`, en
elk item krijgt een `col`-klasse. Voor kaartjes naast elkaar zie je bijvoorbeeld:

```html
<div class="row g-4">          <!-- een rij; g-4 = ruimte tussen items -->
  <div class="col-md-4">...</div>  <!-- neemt 4 van de 12 kolommen = 1/3 breed -->
  <div class="col-md-4">...</div>
  <div class="col-md-4">...</div>
</div>
```

`col-md-4` betekent: op middelgrote schermen en groter is dit item 4/12 (een derde) breed,
dus drie kaartjes naast elkaar. Op smalle schermen stapelen ze automatisch. Je hoeft dit niet
uit je hoofd te kennen; je herkent het in de aangeleverde HTML.

In onze `index.html` staat al een lege container klaar:

```html
<div class="row g-4" id="films-container"></div>
```

Daar gaan we de kaartjes in stoppen.

---

## 4. Het hart van deze module: een kaartje bouwen met createElement

Je kent `createElement` al (Module 5). Een Bootstrap-kaartje is gewoon een aantal geneste
elementen met de **juiste klassenamen**. In `oefeningen/module11/index.html` staat een
`<template>` met de voorbeeldlayout, die bouw je in JavaScript na.

Zo ziet de structuur van één kaartje eruit (de klassen komen uit Bootstrap):

```
col-md-4
└── card
    └── card-body
        ├── h5.card-title      → de titel
        ├── h6.card-subtitle   → het genre
        └── p.card-text        → jaar en score
```

En zo bouw je dat met `createElement`. Let goed op het **toekennen van de klassenamen**, dat
is wat de opmaak geeft:

```js
function createFilmKaart(film) {
  // buitenste kolom
  const kolom = document.createElement("div");
  kolom.className = "col-md-4";

  // de kaart zelf
  const card = document.createElement("div");
  card.className = "card h-100";

  // de inhoud van de kaart
  const body = document.createElement("div");
  body.className = "card-body";

  const titel = document.createElement("h5");
  titel.className = "card-title";
  titel.textContent = film.titel;

  const genre = document.createElement("h6");
  genre.className = "card-subtitle mb-2 text-muted";
  genre.textContent = film.genre;

  const tekst = document.createElement("p");
  tekst.className = "card-text";
  tekst.textContent = `${film.jaar} · ⭐ ${film.score}`;

  // alles in elkaar hangen (appendChild, Module 5/9)
  body.appendChild(titel);
  body.appendChild(genre);
  body.appendChild(tekst);
  card.appendChild(body);
  kolom.appendChild(card);

  return kolom; // geef het buitenste element terug
}
```

Belangrijke punten:
- Je bouwt **van binnen naar buiten** (kleine elementen maken, daarna in elkaar hangen) en
  geeft het **buitenste** element terug met `return`.
- De **klassenamen moeten exact kloppen** met wat de opmaak verwacht (`card`, `card-body`,
  `card-title`...). Een typo in een klassenaam = geen opmaak. Op je examen staat letterlijk:
  *"let heel goed op de klasnamen, neem ze allemaal over."*
- Je zet **alleen de data** in met `textContent`, geen HTML als tekst schrijven. Dat is ook
  de examen-eis (`createElement` gebruiken, geen markup-strings).

---

## 5. De renderfunctie: de hele lijst tonen

`createFilmKaart` maakt één kaartje. Nu een functie die **alle** films toont, door de array te
loopen (Module 4) en elk kaartje in de container te hangen:

```js
const container = document.getElementById("films-container");

function renderFilms() {
  container.innerHTML = ""; // eerst leegmaken (anders stapelen ze op)
  for (const film of films) {
    const kaart = createFilmKaart(film);
    container.appendChild(kaart);
  }
}

renderFilms(); // aanroepen om te tonen
```

Drie dingen die je hier steeds terugziet, onthoud dit patroon, het is de kern van álle
data-gedreven UI:

1. **Container leegmaken** (`innerHTML = ""`). Zo voorkom je dubbele kaartjes als je opnieuw
   rendert.
2. **Loop door de data** en maak per item een element.
3. **Hang elk element in de container** met `appendChild`.

> Dit "leegmaken → loopen → opnieuw opbouwen" heet **re-renderen**. In Module 12 ga je de
> data veranderen (toevoegen/verwijderen/filteren) en daarna gewoon opnieuw `renderFilms()`
> aanroepen. De array is je "bron van waarheid", het scherm is een afspiegeling ervan.

---

## 6. Alternatief: een template klonen (ter info)

Je zag een `<template>` in de HTML. In plaats van alles met `createElement` te bouwen, kun je
zo'n template ook **klonen** en invullen:

```js
const template = document.getElementById("film-template");
const kopie = template.content.cloneNode(true); // diepe kopie van de inhoud
kopie.querySelector(".card-title").textContent = film.titel;
container.appendChild(kopie);
```

Dit is korter, maar **let op**: op je examen wordt expliciet `document.createElement` gevraagd
voor de volle punten ("schrijf geen markup in je JavaScript"). Daarom is `createElement` onze
hoofdmethode. Goed om het bestaan van de template-aanpak te kennen, maar gebruik `createElement`.

---

## Samenvatting

- **Bootstrap** is een CSS-framework: je voegt **klassenamen** toe (`btn`, `card`, `col-md-4`)
  in plaats van zelf CSS te schrijven. Op je examen krijg je de opmaak aangeleverd.
- Koppel je code als **apart bestand**: `<script src="index.js"></script>`, onderaan de body.
- Bouw een kaartje met **`createElement`**, ken de **juiste klassenamen** toe, vul data met
  **`textContent`**, en hang alles met **`appendChild`** in elkaar (van binnen naar buiten).
- De **renderfunctie** volgt altijd: *container leegmaken → loop door de data → elk element
  toevoegen.* Dit heet **re-renderen**; de array is de bron van waarheid.

## Oefeningen

Werk in `oefeningen/module11/index.js`. Open `index.html` in de browser om het resultaat te
zien (F12 voor de console).

1. **Kaartje bouwen.** Schrijf de functie `createFilmKaart(film)` zoals in paragraaf 4, die
   één kolom-met-kaart teruggeeft.

2. **Renderen.** Schrijf `renderFilms()` zoals in paragraaf 5 en roep hem aan. Je zou nu vijf
   filmkaartjes naast/onder elkaar moeten zien.

3. **Extra veld.** Voeg aan elk kaartje ook de score apart toe als een Bootstrap-"badge".
   Tip: maak een `<span>` met `className = "badge bg-success"` en `textContent = film.score`,
   en hang die in de card-body.

4. **Eigen data.** Voeg twee films van jezelf toe aan de `films`-array en controleer dat ze
   vanzelf mee gerenderd worden (zonder je render-code aan te passen). Zie je waarom? De render
   volgt de data.

5. **Lege container testen.** Maak de `films`-array tijdelijk leeg (`const films = [];`) en
   ververs. Wat zie je? En waarom crasht het niet? (Schrijf je antwoord in een commentaar.)

Klaar? In **Module 12** ga je deze kaartjes **toevoegen, verwijderen, sorteren en filteren**,
dan wordt het een echte mini-app. Roep maar als je je code wilt laten nakijken!
