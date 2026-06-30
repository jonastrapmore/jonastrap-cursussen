# Module 9: Browser-API's (data bewaren, locatie en meer)

In Module 8 haalde je data op van een server. Maar de **browser zelf** biedt ook een hoop
ingebouwde functionaliteit die je via JavaScript kunt gebruiken: data lokaal bewaren, de
locatie van de gebruiker opvragen, met de geschiedenis werken, enzovoort. Die ingebouwde
functionaliteiten heten **API's**.

> Maak `module9.html` met de HTML-romp uit Module 0.

> 📂 **Voorbeelden bij dit hoofdstuk, map `c09/`** (hoofdstuk 9 van het boek). Nog nuttig om
> te bekijken: `local-storage.html`, `session-storage.html`, `geolocation.html`,
> `history.html`. **Overslaan** (verouderd of te specifiek): de `angular-*.html` (AngularJS,
> oude versie) en `google-map*.html` (vereist een betaalde sleutel).

---

## 1. Eerst: wat betekent "API" eigenlijk?

Het woord **API** (Application Programming Interface) klinkt zwaar, maar betekent gewoon: **een
afgesproken manier om met iets te praten**, een set functies/objecten die iemand voor je
klaarzette, zodat jij ze kunt gebruiken zonder te weten hoe ze vanbinnen werken.

Je gebruikt al de hele cursus API's zonder het zo te noemen:
- `document.querySelector(...)` → onderdeel van de **DOM-API**.
- `addEventListener(...)` → de **events-API**.
- `fetch(...)` → de **fetch-API** (Module 8).

In deze module ontmoet je een paar nieuwe **browser-API's**: ingebouwde objecten met handige
functies. Belangrijk: dit zijn API's *ín de browser*. Verwar ze niet met de *web*-API's van
Module 8 (servers op internet die je met `fetch` benadert). Zelfde woord, andere context.

---

## 2. localStorage: data bewaren in de browser

Tot nu toe was alle data weg zodra je de pagina ververste. Met **`localStorage`** kun je data
**permanent** in de browser opslaan, hij blijft bewaard, ook na het sluiten van de browser of
het herstarten van de computer. Ideaal voor voorkeuren, een takenlijst, een donkere modus, enz.

De API bestaat uit een paar simpele methodes:

```js
// opslaan (sleutel, waarde)
localStorage.setItem("gebruikersnaam", "Jonas");

// ophalen
const naam = localStorage.getItem("gebruikersnaam");
console.log(naam); // "Jonas"

// verwijderen
localStorage.removeItem("gebruikersnaam");

// alles wissen
localStorage.clear();
```

Je werkt met **sleutel-waarde-paren**: een sleutel (een naam, als tekst) en de bijbehorende
waarde. Haal je een sleutel op die niet bestaat, dan krijg je `null` terug.

### ⚠️ Belangrijk: localStorage bewaart alleen TEKST

Dit is dé valkuil. `localStorage` kan **alleen strings** opslaan. Probeer je een object op te
slaan, dan gaat het mis:

```js
const persoon = { naam: "Jonas", leeftijd: 30 };
localStorage.setItem("persoon", persoon);
console.log(localStorage.getItem("persoon")); // "[object Object]"  ← kapot!
```

De oplossing ken je al uit Module 8: zet het object eerst om naar JSON-**tekst** met
`JSON.stringify`, en bij het ophalen weer terug met `JSON.parse`:

```js
const persoon = { naam: "Jonas", leeftijd: 30 };

// opslaan: object -> JSON-tekst
localStorage.setItem("persoon", JSON.stringify(persoon));

// ophalen: JSON-tekst -> object
const terug = JSON.parse(localStorage.getItem("persoon"));
console.log(terug.naam); // "Jonas"  ← weer een echt object
```

> Onthoud het patroon: **`JSON.stringify` bij het opslaan, `JSON.parse` bij het ophalen.** Zo
> bewaar je objecten en arrays in localStorage. Hier zie je waarom Module 8 (JSON) eerst kwam.

---

## 3. sessionStorage: net als localStorage, maar tijdelijk

`sessionStorage` werkt **exact hetzelfde** (`setItem`, `getItem`, `removeItem`), met één
verschil: de data verdwijnt zodra je het browsertabblad sluit.

| | `localStorage` | `sessionStorage` |
|---|---|---|
| Blijft na verversen | ✅ | ✅ |
| Blijft na tabblad sluiten | ✅ | ❌ (weg) |
| Gebruik voor | voorkeuren, opgeslagen data | tijdelijke data van één bezoek |

```js
sessionStorage.setItem("tijdelijk", "alleen voor dit bezoek");
```

Kies `localStorage` als je iets wilt onthouden voor de volgende keer, en `sessionStorage` voor
iets dat maar één sessie hoeft te leven.

---

## 4. Alles samen: een takenlijst die bewaard blijft

Dit voorbeeld combineert events (Module 6), de DOM (Module 5), JSON (Module 8) én localStorage.
Een takenlijst die je onthoudt, ook na verversen.

```html
<input id="taakveld" type="text" placeholder="Nieuwe taak" />
<button id="voegToe">Toevoegen</button>
<ul id="takenlijst"></ul>
```

```js
const taakveld = document.querySelector("#taakveld");
const voegToeKnop = document.querySelector("#voegToe");
const takenlijst = document.querySelector("#takenlijst");

// Haal bestaande taken op uit localStorage (of begin met een lege lijst).
let taken = JSON.parse(localStorage.getItem("taken")) || [];

// Toont alle taken op de pagina.
function toonTaken() {
  takenlijst.innerHTML = "";
  for (const taak of taken) {
    const item = document.createElement("li");
    item.textContent = taak;
    takenlijst.appendChild(item);
  }
}

// Voegt een taak toe en bewaart de lijst.
function voegTaakToe() {
  const tekst = taakveld.value;
  if (tekst === "") {
    return; // niets toevoegen bij een leeg veld
  }
  taken.push(tekst); // toevoegen aan de array
  localStorage.setItem("taken", JSON.stringify(taken)); // bewaren
  taakveld.value = ""; // veld leegmaken
  toonTaken(); // opnieuw tekenen
}

voegToeKnop.addEventListener("click", voegTaakToe);
toonTaken(); // toon bestaande taken bij het laden
```

Lees dit goed door, het is een mini-app die echt iets doet. Twee nieuwe details:
- **`taken.push(tekst)`** → `push` voegt een item toe aan het einde van een array.
- **`... || []`** → als `getItem` `null` teruggeeft (nog geen taken bewaard), gebruik dan een
  lege array `[]`. Dit `||` ("of") betekent hier: "neem het linker, tenzij dat leeg/null is,
  pak dan het rechter".

Voeg een paar taken toe, ververs de pagina (F5), ze zijn er nog. Dat is localStorage.

---

## 5. Geolocation: waar is de gebruiker?

Met de **Geolocation-API** kun je (na toestemming) de locatie van de gebruiker opvragen. De
browser vraagt automatisch om toestemming, de gebruiker moet ja zeggen.

```js
navigator.geolocation.getCurrentPosition(
  function (positie) {
    // gelukt: we hebben de coördinaten
    console.log("Breedtegraad:", positie.coords.latitude);
    console.log("Lengtegraad:", positie.coords.longitude);
  },
  function (fout) {
    // mislukt of geweigerd
    console.log("Geen locatie:", fout.message);
  },
);
```

`getCurrentPosition` neemt **twee functies** mee (zoals `fetch` ook met succes/fout werkte):
1. wat te doen **als het lukt** (je krijgt een `positie`-object met `coords`);
2. wat te doen **als het misgaat** (geweigerd, of geen GPS).

Let op: dit werkt alleen op een **beveiligde verbinding** (https) of op `localhost`. Open je
het bestand rechtstreeks via `file://`, dan kan de browser het weigeren. Voor het oefenen is
het genoeg om te zien hóe het werkt; de exacte coördinaten zijn bijzaak.

---

## 6. Er zijn er veel meer (ter info)

De browser heeft tientallen API's. Een paar die je vast nog tegenkomt:
- **History-API** (`history.pushState`) → de URL aanpassen zonder herladen (gebruikt door
  moderne web-apps).
- **Clipboard-API** (`navigator.clipboard`) → kopiëren/plakken.
- **Notifications-API** → systeemnotificaties tonen.

Je hoeft deze nu niet te kennen. Het punt is: zodra je `localStorage` snapt, snap je het
patroon van álle browser-API's, een ingebouwd object met methodes die je aanroept.

---

## Samenvatting

- Een **API** is een afgesproken manier om met iets te praten (een set kant-en-klare
  functies/objecten). De DOM, events en `fetch` zijn ook API's.
- **`localStorage`** bewaart data permanent in de browser met `setItem` / `getItem` /
  `removeItem`. Het bewaart **alleen tekst** → gebruik `JSON.stringify` bij opslaan en
  `JSON.parse` bij ophalen voor objecten/arrays.
- **`sessionStorage`** werkt hetzelfde, maar verdwijnt als het tabblad sluit.
- **Geolocation** (`navigator.geolocation.getCurrentPosition`) vraagt de locatie op, met een
  succes- en een foutfunctie. Vereist toestemming en https/localhost.

## Oefeningen

Gebruik `module9.html`. Test in de browser (F12 voor de console).

1. **Naam onthouden.** Maak een tekstveld en een knop. Bij klik: sla de ingevoerde naam op met
   `localStorage.setItem`. Bij het laden van de pagina: lees de naam met `getItem` en toon hem
   in een `<p>` als die bestaat (`"Welkom terug, <naam>!"`). Ververs om te testen.

2. **Object bewaren.** Maak een object met je naam, leeftijd en favoriete kleur. Sla het op
   met `JSON.stringify`, haal het weer op met `JSON.parse`, en log de favoriete kleur.

3. **Takenlijst (uitdaging).** Bouw de takenlijst uit paragraaf 4 na. Voeg een paar taken toe,
   ververs, en controleer dat ze bewaard blijven.

4. **Taken wissen (uitdaging).** Voeg aan oefening 3 een knop "Alles wissen" toe die zowel de
   array leegmaakt (`taken = []`), `localStorage` opschoont (`removeItem("taken")`), als de
   lijst op de pagina leegt.

5. **Locatie (optioneel).** Roep `navigator.geolocation.getCurrentPosition` aan en log je
   breedte- en lengtegraad. Sta de toestemming toe als de browser erom vraagt.

Klaar? Dan kun je nu data ophalen (Module 8) én lokaal bewaren (Module 9), samen de basis van
echte web-apps. Roep maar als je je `module9.html` wilt laten nakijken!
