# Module 12: Lijsten beheren (toevoegen, verwijderen, filteren, sorteren)

In Module 11 toonde je een lijst kaartjes. Nu maken we er een echte **app** van: items
toevoegen, verwijderen, doorzoeken en sorteren. Dit zijn precies de vaardigheden die je op je
examen nodig hebt. Onderweg leer je de belangrijkste **array-methodes** van JavaScript.

> Werk in `oefeningen/module12/`. De render-code uit Module 11 staat er al; jij schrijft de
> logica.

---

## 1. Het grote idee: de array is de bron van waarheid

Dit is het belangrijkste concept van de hele module, dus lees het rustig.

Je hebt twee dingen:
- de **data** (je `films`-array in JavaScript);
- de **UI** (de kaartjes op het scherm).

De gouden regel:

> **Verander altijd eerst de data (de array), en render daarna opnieuw.**
> De UI is slechts een *afspiegeling* van de array.

Dus toevoegen = "voeg toe aan de array, render opnieuw". Verwijderen = "haal uit de array,
render opnieuw". Je rommelt nooit los in het scherm; je verandert de array en roept
`renderFilms()` aan. Eén bron van waarheid, geen gedoe. Dit heet ook wel *re-renderen* (Module
11).

---

## 2. Toevoegen: push + re-render

Een nieuw item toevoegen ken je al deels: `push` (Module 9) zet iets achteraan een array.

```js
toevoegKnop.addEventListener("click", () => {
  const nieuweFilm = {
    titel: "Dune",
    genre: "Sci-Fi",
    jaar: 2021,
    score: 8.0,
  };
  films.push(nieuweFilm); // 1. verander de data
  renderFilms();          // 2. render opnieuw
});
```

Zie het patroon uit paragraaf 1: array veranderen, dan opnieuw tekenen. Het nieuwe kaartje
verschijnt vanzelf, want `renderFilms` loopt gewoon over de (nu langere) array.

> Op je examen haal je het nieuwe item op met een `fetch`-POST in plaats van het zelf te
> verzinnen, dat zie je in paragraaf 6.

---

## 3. Verwijderen: het item uit de array halen

Verwijderen betekent: haal het item uit de array, render opnieuw. Er zijn twee gangbare
manieren.

### Manier A: `filter` (aanbevolen, het schoonst)

`filter` maakt een **nieuwe array** met alleen de items die aan een voorwaarde voldoen. Om iets
te verwijderen, hou je alles behálve dat item:

```js
function verwijderFilm(teVerwijderen) {
  films = films.filter((film) => film !== teVerwijderen); // hou alles behalve deze
  renderFilms();
}
```

Lees `films.filter((film) => film !== teVerwijderen)` als: *"maak een nieuwe lijst van alle
films die níet de te verwijderen film zijn."* Het resultaat ken je toe aan `films` (vandaar dat
`films` met `let` is gedeclareerd, niet `const`).

### Manier B: `indexOf` + `splice`

`indexOf` zoekt de **positie** van een item; `splice` verwijdert op die positie:

```js
function verwijderFilm(teVerwijderen) {
  const index = films.indexOf(teVerwijderen); // op welke plek staat het?
  if (index > -1) {                            // gevonden?
    films.splice(index, 1);                    // verwijder 1 item vanaf die plek
  }
  renderFilms();
}
```

`splice(index, 1)` betekent: "vanaf positie `index`, verwijder 1 item". De check `index > -1`
is nodig omdat `indexOf` `-1` teruggeeft als het item niet gevonden is.

> Beide werken. **`filter` is meestal het schoonst** (je hoeft niet met posities te werken).
> Op je examen zie je vaak `indexOf` + `splice`; ken dus allebei.

### De verwijderknop koppelen

In `createFilmKaart` (Module 11) zit al een verwijderknop. Koppel er een listener aan. Het
mooie: door een **closure** "onthoudt" elke knop bij welke film hij hoort:

```js
function createFilmKaart(film) {
  // ... (kaart opbouwen zoals in Module 11) ...

  const verwijderKnop = document.createElement("button");
  verwijderKnop.className = "btn btn-sm btn-outline-danger";
  verwijderKnop.textContent = "Verwijderen";
  verwijderKnop.addEventListener("click", () => {
    verwijderFilm(film); // 'film' is hier de film van dít kaartje
  });

  // ... knop in de card hangen, return ...
}
```

Omdat `createFilmKaart` per film wordt aangeroepen, verwijst `film` binnen elke listener naar
de juiste film. Dat is precies wat je wilt.

---

## 4. Filteren / zoeken: filter + includes + toLowerCase

Zoeken is `filter` met een tekst-voorwaarde. Je hebt `includes` (Module 3: "zit deze tekst
erin?") en `toLowerCase` (om hoofdletters te negeren) al gezien.

```js
function renderFilms() {
  const zoekterm = zoekveld.value.toLowerCase();

  const zichtbareFilms = films.filter((film) => {
    return (
      film.titel.toLowerCase().includes(zoekterm) ||
      film.genre.toLowerCase().includes(zoekterm)
    );
  });

  container.innerHTML = "";
  for (const film of zichtbareFilms) {
    container.appendChild(createFilmKaart(film));
  }
}
```

Wat gebeurt hier?
- `zoekveld.value.toLowerCase()` → de zoektekst, in kleine letters (zo is zoeken
  hoofletterongevoelig).
- `.includes(zoekterm)` → `true` als de zoekterm érgens in de titel of het genre voorkomt.
- `||` (OF) → een film is zichtbaar als de term in **titel óf genre** zit.
- Is het zoekveld leeg (`""`), dan zit `""` in élke tekst → alle films worden getoond. Handig:
  leeg veld = alles zien, automatisch.

Nu de render zelf filtert, koppel je het zoekveld eraan. Twee opties (beide goed voor het
examen):

```js
// optie 1: filteren terwijl je typt
zoekveld.addEventListener("input", renderFilms);

// optie 2: filteren op Enter
zoekveld.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    renderFilms();
  }
});
```

> Belangrijk inzicht: je past **niet de `films`-array zelf** aan bij het zoeken, je toont
> alleen tijdelijk een gefilterde selectie. De volledige lijst blijft bewaard, dus als je het
> zoekveld leegmaakt, zie je weer alles. (Verwijderen verandert wél de array; zoeken niet.)

---

## 5. Sorteren: sort met een vergelijkfunctie

`sort` zet een array op volgorde. Voor getallen/eigen volgorde geef je een **vergelijkfunctie**
mee die twee items (`a` en `b`) vergelijkt:

```js
// op jaar, nieuwste eerst (hoog naar laag)
films.sort((a, b) => b.jaar - a.jaar);

// op score, hoogste eerst
films.sort((a, b) => b.score - a.score);

// op titel, alfabetisch (A-Z), tekst vergelijk je met localeCompare
films.sort((a, b) => a.titel.localeCompare(b.titel));
```

De regel voor getallen:
- `a - b` → **oplopend** (klein naar groot).
- `b - a` → **aflopend** (groot naar klein).

Voor tekst gebruik je `a.titel.localeCompare(b.titel)` (oplopend A-Z). 

> ⚠️ Let op: `sort` **verandert de array zelf** (anders dan `filter`, die een nieuwe maakt). Op
> je examen hoeft dat niet erg te zijn, maar het is goed om te weten.

Koppel de sorteer-keuze (`<select>`) met het `change`-event:

```js
sorteerKeuze.addEventListener("change", () => {
  const keuze = sorteerKeuze.value; // "titel", "jaar" of "score"
  if (keuze === "titel") {
    films.sort((a, b) => a.titel.localeCompare(b.titel));
  } else if (keuze === "jaar") {
    films.sort((a, b) => b.jaar - a.jaar);
  } else if (keuze === "score") {
    films.sort((a, b) => b.score - a.score);
  }
  renderFilms();
});
```

`change` vuurt af zodra de gebruiker een andere optie kiest. Daarna: array sorteren, opnieuw
renderen. Steeds hetzelfde patroon.

---

## 6. Data ophalen en toevoegen via fetch (koppeling met je examen)

Op je examen komt de data van een **API** (Module 8). Het renderen verandert niet, alleen
waar de data vandaan komt. Ophalen bij het laden:

```js
async function laadFilms() {
  try {
    const response = await fetch("https://example.com/api/films");
    films = await response.json(); // vul de globale array
    renderFilms();
  } catch (fout) {
    console.error("Kon films niet laden:", fout.message);
  }
}

laadFilms();
```

En toevoegen met een **POST**-verzoek (de server maakt een nieuw item en geeft het terug):

```js
toevoegKnop.addEventListener("click", async () => {
  try {
    const response = await fetch("https://example.com/api/films", {
      method: "POST", // dit keer POST in plaats van (standaard) GET
    });
    const nieuweFilm = await response.json();
    films.push(nieuweFilm); // toevoegen aan de array
    renderFilms();          // opnieuw tonen
  } catch (fout) {
    console.error("Toevoegen mislukt:", fout.message);
  }
});
```

Nieuw hier is alleen het tweede argument van `fetch`: `{ method: "POST" }`. Standaard doet
`fetch` een GET (ophalen); met `POST` vraag je de server iets aan te maken. De rest is hetzelfde
patroon: data veranderen, dan re-renderen.

---

## Samenvatting

- **Bron van waarheid**: verander altijd eerst de **array**, render dan opnieuw. De UI volgt
  de data.
- **Toevoegen**: `films.push(item)` → `renderFilms()`.
- **Verwijderen**: `films = films.filter((f) => f !== item)` (schoon), of `indexOf` + `splice`.
- **Filteren/zoeken**: `films.filter(...)` met `includes` + `toLowerCase`; pas de **render**
  aan, niet de array. Leeg zoekveld = alles tonen.
- **Sorteren**: `films.sort((a, b) => ...)`, `a-b` oplopend, `b-a` aflopend, `localeCompare`
  voor tekst. `sort` wijzigt de array zelf.
- **Met een API**: ophalen met `await fetch(...)`, toevoegen met `fetch(url, { method: "POST" })`.

## Oefeningen

Werk in `oefeningen/module12/index.js`. Open `index.html` in de browser.

1. **Toevoegen.** Laat de knop "+ Film toevoegen" een nieuwe film (zelf verzonnen object) aan
   de array toevoegen en opnieuw renderen.

2. **Verwijderen.** Laat de verwijderknop op elk kaartje de juiste film uit de array halen
   (met `filter` óf `indexOf`+`splice`) en opnieuw renderen.

3. **Zoeken.** Laat het zoekveld filteren op **titel of genre**, hoofdletterongevoelig. Zorg
   dat een leeg veld weer alle films toont. (Pas de render aan zoals in paragraaf 4.)

4. **Sorteren.** Laat de `<select>` de films sorteren op titel (A-Z), jaar (nieuw eerst) of
   score (hoog eerst), en opnieuw renderen.

5. **Alles samen (uitdaging).** Controleer dat zoeken, sorteren, toevoegen en verwijderen
   netjes samenwerken: voeg een film toe, zoek erop, sorteer, verwijder er een. Werkt alles via
   dezelfde `renderFilms()`? Zo niet, denk aan de bron-van-waarheid-regel.

Klaar? Dan heb je alle bouwstenen van een echte data-app in handen. In **Module 13** zetten we
ze allemaal in op je **examenopdracht** als grote eindoefening. Roep maar als je je code wilt
laten nakijken!
