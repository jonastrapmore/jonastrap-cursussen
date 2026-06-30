# Module 3: Functies, methodes en objecten

In Module 1 noemden we vier bouwstenen. Deze module behandelt er twee: **functies** (code
groeperen onder een naam) en **objecten** (samenhangende gegevens bundelen). Dit zijn twee
van de belangrijkste begrippen in JavaScript, neem er de tijd voor.

> Maak een nieuw bestand `module3.html` met de HTML-romp uit Module 0 en typ de voorbeelden mee.

> 📂 **Voorbeelden bij dit hoofdstuk, map `c03/`** (hoofdstuk 3 van het boek). Open deze
> `.html`-bestanden in je browser (F12 voor de console) terwijl je deze module leest:
> - Functies: `basic-function.html`
> - Objecten: `object-literal.html`, `object-literal2.html`, `multiple-objects.html`,
>   `adding-and-removing-properties.html`
> - Ingebouwde objecten & methodes: `math-object.html`, `string-object.html`,
>   `number-object.html`, `date-object.html`, `document-object.html`, `window-object.html`
> - Wat geavanceerder (mag je nu overslaan): `object-constructor.html`
>
> Let op: de boekvoorbeelden gebruiken nog `var`; jij gebruikt `let`/`const` (zie Module 2).

---

## Deel A: Functies

### 1. Waarom functies?

Stel je schrijft drie keer dezelfde berekening in je code. Verandert er iets, dan moet je het
op drie plekken aanpassen, en vergeet je er één, dan heb je een bug. Een **functie** lost
dit op: je schrijft de code één keer, geeft hem een naam, en *roept* hem aan zo vaak je wilt.

Een functie is dus: **een stukje code met een naam, dat je later kunt uitvoeren.**

### 2. Een functie maken en aanroepen

```js
function begroet() {
  console.log("Hallo!");
}

begroet(); // Hallo!
begroet(); // Hallo!
```

- `function` = "ik maak een functie".
- `begroet` = de naam die ik kies.
- `()` = de **haakjes** (komen we zo op terug).
- `{ ... }` = de **body**: de code die uitgevoerd wordt bij aanroepen.
- `begroet();` = de functie **aanroepen** (uitvoeren). Zonder de `()` gebeurt er niets!

> Een functie *definiëren* is het recept opschrijven. Een functie *aanroepen* (`begroet()`)
> is het recept koken. Het opschrijven alleen doet nog niks.

### 3. Parameters: gegevens meegeven

Een functie wordt pas echt nuttig als je hem iets kunt meegeven. Dat doe je met **parameters**:

```js
function begroet(naam) {
  console.log(`Hallo, ${naam}!`);
}

begroet("Jonas"); // Hallo, Jonas!
begroet("Sara");  // Hallo, Sara!
```

- `naam` tussen de haakjes is een **parameter**: een variabele die alleen binnen de functie
  bestaat en zijn waarde krijgt bij het aanroepen.
- `"Jonas"` bij het aanroepen is het **argument**: de echte waarde die je meegeeft.

Meerdere parameters scheid je met komma's:

```js
function begroet(voornaam, achternaam) {
  console.log(`Hallo, ${voornaam} ${achternaam}!`);
}

begroet("Jonas", "Trap"); // Hallo, Jonas Trap!
```

### 4. Een resultaat teruggeven: return

Vaak wil je dat een functie iets **uitrekent en teruggeeft**, zodat je er verder mee kunt.
Daarvoor gebruik je `return`:

```js
function tel(a, b) {
  return a + b;
}

const som = tel(3, 4);
console.log(som); // 7
```

Verschil met `console.log`:
- `console.log` **toont** alleen iets op het scherm, daarna ben je de waarde kwijt.
- `return` **geeft de waarde terug** aan de plek waar je de functie aanriep, zodat je hem in
  een variabele kunt opslaan en hergebruiken.

Belangrijk: zodra `return` wordt bereikt, **stopt** de functie meteen. Code daarna wordt
overgeslagen:

```js
function test() {
  return "klaar";
  console.log("dit wordt NOOIT uitgevoerd");
}
```

Een functie zonder `return` geeft automatisch `undefined` terug.

### 5. De moderne schrijfwijze: arrow functions

Naast `function` is er een kortere, moderne notatie: de **arrow function** (`=>`). Je komt
deze overal tegen, dus leer hem herkennen:

```js
// klassiek
function tel(a, b) {
  return a + b;
}

// arrow function, exact hetzelfde resultaat
const tel = (a, b) => {
  return a + b;
};

// nog korter: bij één return mag de { } en het woord return weg
const tel = (a, b) => a + b;

console.log(tel(3, 4)); // 7
```

Voor nu hoef je niet alle subtiele verschillen te kennen. Onthoud: `function naam() {...}` en
`const naam = () => {...}` doen in de basis hetzelfde. We gebruiken beide door elkaar.

### 6. Scope: waar "leeft" een variabele?

Een variabele die je **binnen** een functie maakt, bestaat alleen daar. Buiten de functie
ken je hem niet. Dit heet **scope** (bereik):

```js
function rekenUit() {
  const geheim = 42;   // bestaat alleen binnen deze functie
  console.log(geheim); // ✅ 42
}

rekenUit();
console.log(geheim);   // ❌ FOUT: geheim is hier onbekend
```

Dit is juist handig: functies houden hun eigen rommel binnen, zonder de rest te storen.

---

## Deel B: Objecten

### 7. Wat is een object?

Tot nu toe bewaarde elke variabele één waarde. Maar dingen in het echt horen vaak bij elkaar:
een persoon heeft een naam, leeftijd én e-mail. Een **object** bundelt zulke samenhangende
gegevens in één variabele.

```js
const persoon = {
  voornaam: "Jonas",
  achternaam: "Trap",
  leeftijd: 30,
  isLid: true,
};
```

- Een object schrijf je tussen accolades `{ }`.
- Binnenin staan **eigenschappen** (properties): paren van een **naam** en een **waarde**,
  gescheiden door een dubbele punt `:`.
- De paren scheid je met komma's.

### 8. Bij eigenschappen komen

Twee manieren, de puntnotatie wordt het meest gebruikt:

```js
console.log(persoon.voornaam);     // "Jonas"   ← puntnotatie (gebruik deze)
console.log(persoon["leeftijd"]);  // 30        ← haakjesnotatie
```

Een eigenschap wijzigen of toevoegen:

```js
persoon.leeftijd = 31;          // wijzigen
persoon.woonplaats = "Gent";    // nieuwe eigenschap toevoegen
console.log(persoon.woonplaats); // "Gent"
```

> Let op: je mag eigenschappen van een `const`-object wél wijzigen. `const` betekent alleen
> dat de variabele niet naar een *ander* object mag wijzen, de inhoud mag veranderen.

### 9. Methodes: functies binnen een object

Een eigenschap kan ook een **functie** zijn. Zo'n functie heet dan een **methode**, een
actie die het object kan uitvoeren:

```js
const persoon = {
  voornaam: "Jonas",
  achternaam: "Trap",
  volledigeNaam: function () {
    return `${this.voornaam} ${this.achternaam}`;
  },
};

console.log(persoon.volledigeNaam()); // "Jonas Trap"
```

Nieuw woord: **`this`**. Binnen een methode verwijst `this` naar "het object zelf". Dus
`this.voornaam` betekent "de voornaam van dít object". Hierdoor kan de methode bij de eigen
gegevens van het object.

### 10. Je gebruikt allang objecten en methodes

Goed nieuws: je hebt dit al de hele tijd gebruikt zonder het te weten.

- `console.log(...)` → `console` is een **object**, `log` is een **methode** ervan.
- `totaal.toFixed(2)` (uit Module 2) → `toFixed` is een methode van getallen.
- `"hallo".toUpperCase()` → strings hebben ook methodes:

```js
const naam = "jonas";
console.log(naam.toUpperCase()); // "JONAS"
console.log(naam.length);        // 5   ← length is een eigenschap, geen methode (geen haakjes)
```

Merk het verschil op: een **methode** roep je aan met haakjes `()`, een **eigenschap** lees
je zonder haakjes.

### 11. Ingebouwde objecten: Math en Date (kort)

JavaScript levert handige objecten kant-en-klaar. Twee voorbeelden:

```js
console.log(Math.round(4.7));   // 5   afronden
console.log(Math.floor(4.7));   // 4   naar beneden
console.log(Math.max(3, 9, 1)); // 9   hoogste
console.log(Math.random());     // willekeurig getal tussen 0 en 1

const nu = new Date();
console.log(nu.getFullYear());  // bv. 2026
```

Je hoeft deze niet uit je hoofd te leren, je zoekt ze op wanneer je ze nodig hebt. Goed om
te weten dát ze bestaan.

---

## Samenvatting

- Een **functie** is herbruikbare code met een naam. Je *definieert* hem (`function naam() {}`
  of `const naam = () => {}`) en *roept hem aan* met `naam()`.
- **Parameters** zijn de "ingangen" van een functie; **argumenten** zijn de echte waarden die
  je meegeeft. `return` geeft een resultaat terug en stopt de functie.
- Variabelen binnen een functie bestaan alleen daar (**scope**).
- Een **object** `{ }` bundelt samenhangende gegevens als **eigenschappen** (naam: waarde).
  Bij eigenschappen kom je met `object.naam`.
- Een functie binnen een object heet een **methode**; `this` verwijst naar het object zelf.
- `console`, `Math`, strings en getallen zijn allemaal objecten met methodes, die gebruik je
  al.

## Oefeningen

Schrijf eerst pseudocode, dan code. Test in de console.

1. **Functie met return.** Schrijf een functie `oppervlakte(breedte, hoogte)` die de
   oppervlakte van een rechthoek teruggeeft. Roep hem aan met `oppervlakte(4, 5)` en log het
   resultaat.

2. **BTW-functie.** Schrijf een functie `metBtw(prijs)` die de prijs inclusief 21% BTW
   teruggeeft, afgerond op 2 decimalen (denk aan `.toFixed(2)` uit Module 2). Test met
   `metBtw(100)` → moet `"121.00"` opleveren.

3. **Arrow function.** Herschrijf je functie uit oefening 1 als arrow function in de korte
   vorm (`const oppervlakte = (b, h) => ...`).

4. **Object maken.** Maak een object `boek` met eigenschappen `titel`, `auteur` en
   `aantalPaginas`. Log een zin met een template literal:
   `"<titel> van <auteur> heeft <aantal> pagina's."`

5. **Methode toevoegen.** Voeg aan je `boek`-object een methode `beschrijving()` toe die
   diezelfde zin teruggeeft met behulp van `this`. Roep `boek.beschrijving()` aan en log het.

6. **Verken methodes.** Maak `const tekst = "JavaScript is leuk";`. Zoek uit (gerust googelen)
   en probeer: `tekst.length`, `tekst.toUpperCase()`, `tekst.toLowerCase()` en
   `tekst.includes("leuk")`. Schrijf in commentaar wat elke regel teruggeeft.

Klaar? Door naar **Module 4 (Beslissingen & loops)**.
