# Module 8: Ajax en JSON (data ophalen van een server)

> **We slaan Module 7 (jQuery) over.** jQuery is een hulpbibliotheek uit ±2014 die je vandaag
> zelden nog nodig hebt; moderne JavaScript kan alles zelf. Het hoofdstuknummer houden we
> gelijk aan het boek, dus we springen van 6 naar 8. (Doet je school/project wél jQuery? Zeg
> het, dan maak ik alsnog een Module 7.)

Tot nu toe stond alle data al in je code of in je HTML. Maar echte websites **halen data op**
van een server: een lijst producten, het weer, je berichten. Dat ophalen *terwijl de pagina
openblijft* (zonder herladen) heet **Ajax**. De data komt bijna altijd in een formaat dat
**JSON** heet. Deze module behandelt beide, op de moderne manier met **`fetch`**.

> ⚠️ **Belangrijk:** dit boek doet Ajax met jQuery (`$.ajax`, `.load()`, `$.getJSON`). Dat
> leren we **niet**. Wij gebruiken het ingebouwde, moderne **`fetch`**. Uit map `c08/` zijn
> alleen deze nog nuttig om te bekijken: `data-json.html` en de bestanden in `c08/data/`
> (voorbeelden van hoe JSON-data eruitziet). De `jq-*.html`-bestanden mag je overslaan.

> Maak `module8.html` met de HTML-romp uit Module 0. We loggen eerst naar de console; later
> zetten we data in de pagina.

---

## 1. Eerst: wat is JSON?

**JSON** (JavaScript Object Notation) is een **tekstformaat om data uit te wisselen**. Het ziet
er bijna identiek uit aan een JavaScript-object (Module 3), en dat is precies de bedoeling,
het is makkelijk leesbaar voor mens én machine:

```json
{
  "naam": "Jonas",
  "leeftijd": 30,
  "isLid": true,
  "hobbys": ["petanque", "programmeren"]
}
```

Verschillen met een gewoon JS-object, goed om te onthouden:
- In JSON staan **alle sleutels tussen dubbele aanhalingstekens** (`"naam"`, niet `naam`).
- Alleen dubbele aanhalingstekens voor tekst (geen enkele `'`).
- Geen functies/methodes, alleen data (tekst, getallen, booleans, lijsten, objecten, `null`).

### JSON ↔ JavaScript: parse en stringify

JSON is **tekst** (een string). Om er in JavaScript mee te werken, zet je het om naar een
object. En andersom. Twee ingebouwde functies:

```js
// JSON-tekst → JavaScript-object
const tekst = '{"naam": "Jonas", "leeftijd": 30}';
const persoon = JSON.parse(tekst);
console.log(persoon.naam);    // "Jonas"  ← nu een echt object

// JavaScript-object → JSON-tekst
const obj = { naam: "Sara", leeftijd: 25 };
const json = JSON.stringify(obj);
console.log(json);            // '{"naam":"Sara","leeftijd":25}'
```

- `JSON.parse(tekst)` → van JSON-tekst naar bruikbaar object.
- `JSON.stringify(object)` → van object naar JSON-tekst (bijv. om te versturen).

Onthoud: **JSON = tekst, object = bruikbaar in code.** `parse` en `stringify` zijn de brug.

---

## 2. Wat is Ajax (en waarom "asynchroon")?

**Ajax** betekent: data ophalen van een server **op de achtergrond**, zonder de pagina te
herladen. Denk aan een tijdlijn die nieuwe berichten bijlaadt terwijl je blijft scrollen.

Het sleutelwoord is **asynchroon**. Een verzoek naar een server kost tijd (milliseconden tot
seconden). JavaScript wacht daar **niet** op met alles stilleggen, het stuurt het verzoek,
gaat verder, en draait jouw code zodra het antwoord binnen is. Dat "later, als het klaar is"
is het lastigste én belangrijkste nieuwe idee van deze module. We pakken het stap voor stap.

---

## 3. fetch: data ophalen

`fetch` is de ingebouwde functie om een verzoek naar een server te sturen. We oefenen met een
gratis test-API die nepdata teruggeeft: **JSONPlaceholder** (`https://jsonplaceholder.typicode.com`).

```js
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);        // een object met gebruiker 1
    console.log(data.name);   // de naam van die gebruiker
  });
```

Wat gebeurt hier, regel voor regel?
1. `fetch(url)` → stuur een verzoek naar die URL. Dit geeft **niet meteen** de data terug
   (die is er nog niet!), maar een **belofte** dat de data *later* komt: een **Promise**.
2. `.then((response) => ...)` → "zodra het antwoord binnen is, doe dit". Je krijgt een
   `response`-object (de rauwe reactie van de server).
3. `response.json()` → haal de JSON uit het antwoord en zet het om naar een object. Dit is óók
   asynchroon, dus er volgt nog een `.then`.
4. De tweede `.then((data) => ...)` → hier heb je eindelijk je bruikbare data.

> Een **Promise** is een "belofte": een object dat zegt *"ik heb het antwoord nu nog niet,
> maar ik kom er later mee terug"*. Met `.then(...)` hang je code op aan "als het klaar is".

Open je console (F12) en je ziet het gebruikersobject verschijnen, opgehaald van het
internet, terwijl je pagina rustig openbleef. Dat is Ajax.

---

## 4. De moderne, leesbare manier: async / await

Al die `.then`-kettingen worden snel onoverzichtelijk. Daarom is er een modernere schrijfwijze
die hetzelfde doet maar leest als gewone stap-voor-stap code: **`async`** en **`await`**.

```js
async function haalGebruikerOp() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const data = await response.json();
  console.log(data.name);
}

haalGebruikerOp();
```

- Zet **`async`** voor een functie waarin je op asynchrone dingen wilt wachten.
- Zet **`await`** vóór iets dat een Promise teruggeeft (zoals `fetch` of `.json()`). `await`
  betekent: *"wacht hier even tot dit klaar is, en geef me dan het resultaat."*

Het resultaat leest van boven naar beneden, alsof er niets ingewikkelds gebeurt, maar
ondertussen blokkeert het de rest van de pagina niet. Dit is vandaag de standaardmanier.
Gebruik deze.

> Regel: `await` mag alleen **binnen** een `async`-functie staan.

---

## 5. Foutafhandeling: wat als het misgaat?

Een server kan traag zijn, offline staan, of een fout teruggeven. Vang dat netjes op met
**`try ... catch`**:

```js
async function haalGebruikerOp() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    if (!response.ok) {
      throw new Error(`Server gaf status ${response.status}`);
    }
    const data = await response.json();
    console.log(data.name);
  } catch (fout) {
    console.log("Er ging iets mis:", fout.message);
  }
}

haalGebruikerOp();
```

- Code in het **`try`**-blok wordt geprobeerd. Gaat er iets mis, dan springt JavaScript meteen
  naar het **`catch`**-blok in plaats van de pagina te laten crashen.
- `response.ok` is `false` bij een foutstatus (zoals 404). `response.status` is het nummer
  (bijv. 404, 500). `throw` maakt zelf een fout aan die in `catch` belandt.

`try/catch` is niet alleen voor `fetch`, het is dé manier om met fouten om te gaan. (Dit is
ook het onderwerp van hoofdstuk 10, debugging.)

---

## 6. Alles samen: data in de pagina zetten

Nu de echte kracht: data ophalen én tonen op de pagina (Module 5 + 6 + 8 samen). Lijst van
gebruikers ophalen en als `<li>`'s tonen.

```html
<button id="laad">Laad gebruikers</button>
<ul id="lijst"></ul>
```

```js
const knop = document.querySelector("#laad");
const lijst = document.querySelector("#lijst");

async function laadGebruikers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const gebruikers = await response.json(); // een array van objecten

    lijst.innerHTML = ""; // maak de lijst eerst leeg
    for (const gebruiker of gebruikers) {
      const li = document.createElement("li");
      li.textContent = `${gebruiker.name} (${gebruiker.email})`;
      lijst.appendChild(li);
    }
  } catch (fout) {
    lijst.textContent = "Kon de gebruikers niet laden.";
  }
}

knop.addEventListener("click", laadGebruikers);
```

Zie hoe alles samenkomt:
- een **event** (klik, Module 6) start het ophalen;
- **fetch + async/await** halen de data op (deze module);
- een **loop** (Module 4) gaat door de array;
- **DOM-methodes** (Module 5) zetten elk item op de pagina.

Dit kleine voorbeeld is in essentie hoe echte web-apps werken.

---

## Samenvatting

- **JSON** is een tekstformaat voor data, lijkt op een JS-object. `JSON.parse(tekst)` →
  object; `JSON.stringify(object)` → tekst.
- **Ajax** = data ophalen zonder de pagina te herladen. Het gebeurt **asynchroon** (later, als
  het antwoord binnen is).
- **`fetch(url)`** haalt data op en geeft een **Promise** terug. Met `.then()` of, moderner,
  met **`async/await`** werk je het antwoord af.
- Standaardpatroon: `const r = await fetch(url); const data = await r.json();` (binnen een
  `async`-functie).
- Vang fouten op met **`try ... catch`** en check `response.ok` / `response.status`.
- Wij gebruiken `fetch`, niet de jQuery-aanpak uit het boek.

## Oefeningen

Gebruik `module8.html`. Test in de browser met de console open (F12). Je moet online zijn.
API om te gebruiken: `https://jsonplaceholder.typicode.com`.

1. **JSON omzetten.** Maak een JS-object met je naam en leeftijd. Zet het met
   `JSON.stringify` om naar tekst en log dat. Zet die tekst daarna met `JSON.parse` weer terug
   naar een object en log de naam-eigenschap.

2. **Eén gebruiker ophalen.** Schrijf een `async`-functie die met `await fetch`
   `.../users/1` ophaalt, naar `.json()` omzet, en de `name` en `email` in de console logt.

3. **Foutafhandeling.** Voeg `try/catch` toe aan oefening 2. Test het bewust met een foute
   URL (bijv. `.../usersXYZ/1`) en controleer dat je `catch`-blok zijn bericht logt.

4. **Lijst tonen (uitdaging).** Haal `.../posts` op (een array van berichten). Loop met
   `for...of` door de eerste 5 en toon de `title` van elk bericht als een `<li>` op de pagina.
   Tip: `gebruikers.slice(0, 5)` geeft je de eerste 5 items.

5. **Op een knop (uitdaging).** Zet oefening 4 achter een knop met een `addEventListener`
   (Module 6), zodat de lijst pas laadt als de gebruiker klikt.

Klaar? Dan beheers je het ophalen en tonen van echte data, een van de belangrijkste
vaardigheden voor moderne webontwikkeling. Roep maar als je je `module8.html` wilt laten
nakijken!
