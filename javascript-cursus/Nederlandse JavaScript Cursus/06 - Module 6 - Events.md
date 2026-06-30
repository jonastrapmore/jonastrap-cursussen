# Module 6: Events (reageren op de gebruiker)

In Module 5 leerde je de pagina aanpassen met JavaScript. Maar tot nu toe gebeurde alles
**meteen** als de pagina laadde. In deze module maken we de pagina pas echt interactief: code
die draait **wanneer de gebruiker iets doet**, klikken, typen, een formulier versturen. Dat
zijn **events** (gebeurtenissen). Hier komt alles samen.

> Maak `module6.html`. We bouwen voort op de DOM, dus gebruik weer HTML in de `<body>`. Begin
> met deze pagina (en denk eraan: **script onderaan**, vlak voor `</body>`):

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <title>Module 6 - Events</title>
</head>
<body>
  <h1 id="titel">Klik op de knop</h1>
  <button id="knop">Klik mij</button>
  <input id="naamveld" type="text" placeholder="Typ je naam">
  <p id="uitvoer"></p>

  <script>
    // hier komt onze JavaScript
  </script>
</body>
</html>
```

> 📂 **Voorbeelden bij dit hoofdstuk, map `c06/`** (hoofdstuk 6 van het boek). Open in je
> browser terwijl je leest:
> - Basis: `event-listener.html`, `event-handler.html`, `click.html`
> - Het event-object: `event-listener-with-event-object.html`
> - Soorten events: `keypress.html`, `focus-blur.html`, `load.html`, `html5-events.html`,
>   `form.html`
> - Verdieping (mag je nu overslaan): `event-flow.html`, `event-delegation.html`,
>   `event-attributes.html`, `position.html`
>
> Let op: het boek toont ook oudere manieren (event-attributen in de HTML, IE-fallbacks). Wij
> leren de moderne, aanbevolen manier: `addEventListener`.

---

## 1. Wat is een event?

Een **event** is "er gebeurt iets" op de pagina. De browser houdt voortdurend in de gaten wat
de gebruiker (of de pagina zelf) doet, en geeft elk van die gebeurtenissen een naam:

| Event | Wanneer? |
|-------|----------|
| `click` | gebruiker klikt op iets |
| `input` | gebruiker typt iets in een invoerveld |
| `submit` | een formulier wordt verstuurd |
| `keydown` | een toets wordt ingedrukt |
| `mouseover` / `mouseout` | muis komt op/verlaat een element |
| `load` | de pagina (of een afbeelding) is volledig geladen |
| `focus` / `blur` | een veld krijgt/verliest de aandacht (cursor) |

Jij schrijft code die **wacht** op zo'n event en er dan op reageert. Die code heet een
**event handler** (of *listener*): "luister naar gebeurtenis X, en voer dan deze functie uit".

---

## 2. addEventListener: de kern van deze module

De moderne manier om op een event te reageren is **`addEventListener`**. Het patroon is altijd
hetzelfde, leer dit goed, want je gebruikt het overal:

```js
element.addEventListener("naam-van-event", functieDieMoetDraaien);
```

Een concreet voorbeeld met de knop uit onze startpagina:

```js
const knop = document.querySelector("#knop");

knop.addEventListener("click", function () {
  console.log("Er is geklikt!");
});
```

Lees dit als: *"Beste knop, luister naar `click`-events. Telkens als er geklikt wordt, voer je
deze functie uit."*

Wat zijn de onderdelen?
1. `knop` → het element waarop je luistert (eerst opzoeken met `querySelector`, Module 5).
2. `addEventListener` → de methode die de listener koppelt.
3. `"click"` → de **naam van het event** (een string).
4. `function () { ... }` → de **functie** die draait zodra het event gebeurt. Dit heet de
   *callback* (vergelijk `forEach` uit Module 4, ook daar gaf je een functie mee).

> ⚠️ Belangrijke valkuil: zet **geen haakjes** achter de functie. Schrijf
> `addEventListener("click", doeIets)` en **niet** `doeIets()`. Met haakjes roep je de functie
> meteen aan (nu, bij het laden); zonder haakjes geef je hem *door* zodat de browser hem later
> kan aanroepen, bij de klik.

### Een functie met naam i.p.v. ter plekke

Je mag de functie ook apart definiëren en bij naam doorgeven, vaak overzichtelijker:

```js
const knop = document.querySelector("#knop");

function bijKlik() {
  const titel = document.querySelector("#titel");
  titel.textContent = "Je hebt geklikt!";
}

knop.addEventListener("click", bijKlik); // let op: GEEN () achter bijKlik
```

Zie hoe Module 5 en 6 samenkomen: een **event** (klik) triggert code die de **DOM** aanpast
(de titel verandert). Dát is een interactieve webpagina.

---

## 3. Het event-object: informatie over wat er gebeurde

Je callback krijgt automatisch een **event-object** mee: een object (Module 3!) boordevol
informatie over de gebeurtenis. Je vangt het op door er een parameter voor te zetten,
meestal `event` of kortweg `e` genoemd:

```js
const knop = document.querySelector("#knop");

knop.addEventListener("click", function (event) {
  console.log(event.type);          // "click"
  console.log(event.target);        // het element waarop geklikt is (de knop)
});
```

Twee veelgebruikte eigenschappen:
- `event.target` → het element waar het event vandaan kwam.
- `event.type` → de naam van het event (`"click"`, `"input"`, ...).

Je hebt het event-object niet altijd nodig. Heb je het niet nodig, laat de parameter dan
gewoon weg (zoals in paragraaf 2).

---

## 4. Reageren op invoer: het `input`-event

Met een tekstveld kun je live reageren op wat de gebruiker typt:

```js
const veld = document.querySelector("#naamveld");
const uitvoer = document.querySelector("#uitvoer");

veld.addEventListener("input", function () {
  uitvoer.textContent = `Hallo, ${veld.value}!`;
});
```

Nieuw hier: **`veld.value`**. Bij invoervelden (`<input>`) staat de getypte tekst in de
eigenschap `value`, niet in `textContent`. Elke toetsaanslag vuurt een `input`-event af, dus
de `<p id="uitvoer">` verandert live mee terwijl je typt. Probeer het!

---

## 5. Formulieren versturen: `submit` en `preventDefault`

Bij een formulier wil je vaak iets doen zónder dat de pagina herlaadt (het standaardgedrag van
een formulier is namelijk: de pagina opnieuw inladen). Daarvoor gebruik je het `submit`-event
en **`event.preventDefault()`**:

```html
<form id="mijnform">
  <input id="email" type="text" placeholder="E-mail">
  <button type="submit">Versturen</button>
</form>
```

```js
const form = document.querySelector("#mijnform");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // voorkom dat de pagina herlaadt
  const email = document.querySelector("#email").value;
  console.log(`Verstuurd: ${email}`);
});
```

`event.preventDefault()` zegt: *"voer het standaardgedrag van dit event NIET uit."* Bij een
formulier betekent dat: niet herladen, zodat jouw JavaScript de controle houdt. Dit ga je heel
vaak gebruiken.

---

## 6. Meer event-types in de praktijk

Het mooie van `addEventListener`: het patroon blijft hetzelfde, je verandert alleen de
event-naam. Een paar voorbeelden:

```js
const titel = document.querySelector("#titel");

// muis komt op het element
titel.addEventListener("mouseover", function () {
  titel.style.color = "red";
});

// muis verlaat het element
titel.addEventListener("mouseout", function () {
  titel.style.color = "black";
});

// een toets indrukken (op het hele document)
document.addEventListener("keydown", function (event) {
  console.log(`Je drukte op: ${event.key}`);
});
```

`event.key` (bij toets-events) vertelt welke toets is ingedrukt, bijv. `"a"` of `"Enter"`.

---

## 7. De oude manier (en waarom wij `addEventListener` gebruiken)

In oudere code (en in het boek uit 2014) zie je events soms rechtstreeks in de HTML staan:

```html
<button onclick="doeIets()">Klik mij</button>   <!-- oude manier -->
```

Dit werkt nog steeds, maar wij doen het **niet** zo, om dezelfde reden als bij opmaak
(Module 5): **scheiding van taken**. HTML = structuur, JavaScript = gedrag. Met
`addEventListener`:
- blijft je HTML schoon (geen JavaScript ertussen),
- kun je **meerdere** listeners op hetzelfde element zetten,
- en staat al je gedrag netjes bij elkaar in je script.

> Gebruik op een examen/cursus wat daar onderwezen wordt. Maar in het echt en in deze cursus:
> **`addEventListener`** is de standaard.

---

## Samenvatting

- Een **event** is een gebeurtenis op de pagina (`click`, `input`, `submit`, `keydown`...).
- Reageer erop met **`element.addEventListener("event-naam", functie)`**, geef de functie door
  **zonder haakjes**.
- De callback krijgt een **event-object** mee (`event.target`, `event.type`, `event.key`).
- Bij invoervelden lees je de getypte tekst met **`.value`** (niet `textContent`).
- Bij formulieren gebruik je **`event.preventDefault()`** om herladen te voorkomen.
- Voorkeur: `addEventListener` boven `onclick=""` in de HTML, gedrag hoort in je JavaScript.

## Oefeningen

Gebruik de `module6.html` van bovenaan. Test in de browser (en F12 voor de console).

1. **Klik-teller.** Zet een listener op de knop die bij elke klik een teller met 1 ophoogt en
   het aantal in de `<h1 id="titel">` toont: `"Aantal kliks: 3"`. (Hint: maak buiten de
   functie een `let teller = 0;` en hoog hem op binnen de functie.)

2. **Live begroeting.** Laat de `<p id="uitvoer">` live `"Hallo, <naam>!"` tonen terwijl de
   gebruiker in het tekstveld typt (event `input`, eigenschap `.value`).

3. **Markeren bij hover.** Laat de titel van kleur (of achtergrond) veranderen bij `mouseover`
   en weer terug bij `mouseout`. Mag met `style` of met een class togglen (Module 5).

4. **Toets tonen.** Luister op het `document` naar `keydown` en log telkens `event.key`, zodat
   je ziet welke toets je indrukt.

5. **Mini-formulier (uitdaging).** Voeg een `<form>` met een tekstveld en een verzendknop toe.
   Vang `submit` op, gebruik `event.preventDefault()`, en toon de ingevoerde waarde in de
   `<p id="uitvoer">`. Controleer dat de pagina **niet** herlaadt.

Klaar? Dan heb je de complete kern van interactieve webpagina's te pakken: gegevens, logica,
de DOM én events. In de volgende modules komen jQuery (optioneel) en de toepassingen (Ajax,
API's, debugging). Roep maar als je je `module6.html` wilt laten nakijken!
