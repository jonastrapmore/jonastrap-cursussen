# Module 2: Variabelen en datatypes

Nu wordt het concreet. In deze module leer je **gegevens opslaan** (variabelen) en de
verschillende **soorten gegevens** (datatypes). Dit is de bouwsteen "gegevens onthouden" uit
Module 1, en het fundament voor alles wat komt, inclusief TypeScript.

> Tip: maak een nieuw bestand `module2.html` met dezelfde HTML-romp uit Module 0, en typ alle
> voorbeelden hieronder zelf over in de `<script>`. Kijk bij elk voorbeeld in de console (F12).

## 1. Wat is een variabele?

Een **variabele** is een doosje met een naam waarin je een waarde bewaart, zodat je er later
weer bij kunt. Voorbeeld:

```js
let leeftijd = 30;
console.log(leeftijd); // 30
```

Wat gebeurt hier?
- `let` = "ik maak een nieuwe variabele aan".
- `leeftijd` = de **naam** die ik kies (zelfgekozen).
- `=` = het **toewijzings-teken**: "stop de waarde rechts in het doosje links".
- `30` = de **waarde**.

Let op: `=` betekent hier **niet** "is gelijk aan" (zoals in wiskunde), maar "krijgt de waarde".
Je leest `let leeftijd = 30;` als: *"de variabele leeftijd krijgt de waarde 30."*

## 2. let, const en var: welke gebruik je?

Er zijn drie manieren om een variabele te maken. Dit is belangrijk, dus goed lezen:

```js
const naam = "Jonas";   // const = constante: kan NIET meer veranderen
let score = 0;          // let   = kan later wél veranderen
var oud = 1;            // var   = de oude manier, NIET meer gebruiken
```

**De regel die je voortaan altijd volgt:**

> Gebruik **`const`** standaard. Alleen als een waarde later écht moet veranderen, gebruik je
> **`let`**. **`var`** gebruik je nooit meer (dat is de verouderde manier uit het boek).

Waarom `const` als standaard? Omdat het je beschermt: probeer je per ongeluk iets te
veranderen dat niet mag veranderen, dan krijg je meteen een foutmelding in plaats van een
sluipende bug.

```js
const pi = 3.14159;
pi = 4;          // ❌ FOUT: "Assignment to constant variable."

let teller = 0;
teller = teller + 1;  // ✅ mag wel, want let
console.log(teller);  // 1
```

> **Vooruitblik naar TypeScript:** dit onderscheid `const`/`let` neem je 1-op-1 mee. TypeScript
> bouwt hier bovenop met *types*. Goede gewoontes nu = makkelijke overstap straks.

## 3. Regels voor namen van variabelen

- Mag letters, cijfers, `_` en `$` bevatten, maar **niet beginnen met een cijfer**.
- Geen spaties. Gebruik **camelCase**: eerste woord klein, daarna elk woord een hoofdletter:
  `voornaam`, `totaalPrijs`, `aantalProducten`.
- Hoofdlettergevoelig: `score` en `Score` zijn twee verschillende variabelen.
- Kies **betekenisvolle** namen. `x` zegt niks; `aantalBezoekers` zegt alles.

```js
let totaalPrijs = 19.95;   // ✅ goed leesbaar
let tp = 19.95;            // 😕 onduidelijk
let 1eNaam = "Jonas";      // ❌ mag niet (begint met cijfer)
```

## 4. De datatypes (soorten waarden)

Een variabele kan verschillende **soorten** waarden bevatten. De belangrijkste:

### a) Number (getal)

Eén type voor álle getallen, heel en met komma (let op: een **punt**, geen komma!):

```js
const aantal = 5;
const prijs = 19.95;
const temperatuur = -3;
```

### b) String (tekst)

Tekst zet je tussen aanhalingstekens. Enkele `'` of dubbele `"` mag allebei, als ze maar bij
elkaar passen:

```js
const naam = "Jonas";
const groet = 'Hallo';
```

Wat als de tekst zelf een aanhalingsteken bevat? Gebruik dan het andere soort eromheen, of
een **backslash** om het teken te "ontsnappen":

```js
const zin1 = "Ze zei: 'hallo'";        // dubbel eromheen, enkel erin
const zin2 = 'Het is een mooie "dag"'; // enkel eromheen, dubbel erin
const zin3 = "Hij zei: \"stop\"";      // ontsnappen met \
```

### c) Boolean (waar/onwaar)

Slechts twee mogelijke waarden: `true` of `false`. De basis van alle beslissingen:

```js
const isIngelogd = true;
const heeftKorting = false;
```

### d) Twee "lege" waarden: undefined en null

- `undefined` = "deze variabele heeft (nog) geen waarde". Krijg je automatisch.
- `null` = "bewust leeg", die zet jíj er zelf in om "niets" te betekenen.

```js
let adres;            // geen waarde toegekend
console.log(adres);   // undefined

let partner = null;   // bewust: er is (nu) geen partner
```

### Het type opvragen

Met `typeof` vraag je welk type iets is. Handig om te controleren:

```js
console.log(typeof "Jonas");  // "string"
console.log(typeof 30);       // "number"
console.log(typeof true);     // "boolean"
```

## 5. Rekenen met getallen (rekenkundige operatoren)

```js
console.log(10 + 3);  // 13  optellen
console.log(10 - 3);  // 7   aftrekken
console.log(10 * 3);  // 30  vermenigvuldigen
console.log(10 / 3);  // 3.333...  delen
console.log(10 % 3);  // 1   "modulo": de REST na delen (10 = 3*3 + 1)
```

`%` (modulo) lijkt vreemd maar is supernuttig, bijvoorbeeld om te checken of een getal even
is: een even getal heeft `getal % 2 === 0`.

Net als in wiskunde geldt "punt voor streep", en haakjes gaan voor:

```js
console.log(2 + 3 * 4);    // 14  (eerst 3*4, dan +2)
console.log((2 + 3) * 4);  // 20  (haakjes eerst)
```

## 5b. Valkuil: kommagetallen en afronding

Probeer dit eens in de console:

```js
console.log(0.1 + 0.2); // 0.30000000000000004  (!?)
```

Je verwacht `0.3`, maar je krijgt een rij nullen met een `...004` erachter. Dit is **geen
fout van jou**, het gebeurt in zo goed als elke programmeertaal.

**Waarom?** De computer rekent niet in ons tientallig stelsel, maar **binair** (alleen nullen
en enen). Sommige "ronde" decimale getallen zoals `0,1` of `4,95` kun je binair niet exact
opschrijven, net zoals jij `1/3` decimaal niet exact kunt schrijven (`0,3333...`). De
computer pakt dan het allerdichtstbijzijnde getal dat hij wél kan, en dat zit een
onmeetbaar klein eindje ernaast. Bij optellen zie je dat soms terug als `...0001`.

**De oplossing** voor geld: toon het getal afgerond op 2 decimalen met `.toFixed(2)`:

```js
let totaal = 14.850000000000001;
console.log(totaal.toFixed(2)); // "14.85"
```

Twee dingen om te onthouden:

1. `.toFixed(2)` geeft een **string** terug (tekst), geen getal. Gebruik het dus pas **op het
   eind**, als je de waarde toont, niet als je er nog mee verder moet rekenen. Reken eerst
   alles uit; `.toFixed(2)` als laatste stap voor de weergave.
2. Voor échte geldsoftware reken je later met hele centen (`1495` in plaats van `14.95`) om
   dit helemaal te vermijden. Voor nu is `.toFixed(2)` precies goed.

```js
const broden = 3 * 2.50;
const melk = 2 * 1.20;
let totaal = broden + melk;
totaal += 4.95;
console.log(`Totaal: € ${totaal.toFixed(2)}`); // Totaal: € 14.85
```

## 6. Tekst aan elkaar plakken

Met `+` plak je strings aan elkaar (dat heet **concatenatie**):

```js
const voornaam = "Jonas";
const achternaam = "Trap";
const volledig = voornaam + " " + achternaam;
console.log(volledig); // "Jonas Trap"
```

Let op de `" "` ertussen: dat is een spatie, anders krijg je `"JonasTrap"`.

### Moderne manier: template literals (backticks)

Al dat plakken met `+` wordt snel onhandig. Daarom is er een modernere manier met
**backticks** (`` ` ``, het teken linksboven op je toetsenbord) en `${...}`:

```js
const voornaam = "Jonas";
const leeftijd = 30;
const zin = `Hallo, ik ben ${voornaam} en ik ben ${leeftijd} jaar.`;
console.log(zin); // "Hallo, ik ben Jonas en ik ben 30 jaar."
```

Alles tussen `${ }` wordt uitgerekend en in de tekst gezet. Veel leesbaarder. Gebruik dit.
(Dit staat niet in het boek uit 2014, maar is vandaag de standaard.)

> **Valkuil:** `+` doet twee dingen. Bij getallen telt het op (`2 + 3` = `5`), bij strings
> plakt het (`"2" + "3"` = `"23"`). Let dus op je types! Hierover meer hieronder.

## 7. Een veelvoorkomende valkuil: getal vs. tekst

```js
console.log(5 + 3);       // 8    (twee getallen → optellen)
console.log("5" + "3");   // "53" (twee strings → plakken)
console.log("5" + 3);     // "53" (zodra er tekst bij is → plakken)
```

Dit is precies het soort verwarring dat TypeScript later voor je gaat opvangen. Voor nu:
onthoud dat `"5"` (met aanhalingstekens) **tekst** is en `5` een **getal**.

Tekst naar getal omzetten kan met `Number(...)`, en andersom met `String(...)`:

```js
console.log(Number("5") + 3);   // 8   (tekst "5" eerst naar getal 5)
console.log(String(5) + "3");   // "53"
```

## 8. Een waarde wijzigen (alleen bij let)

```js
let saldo = 100;
saldo = saldo - 30;       // saldo is nu 70
saldo = saldo + 50;       // saldo is nu 120
console.log(saldo);       // 120
```

Dit komt zó vaak voor dat er afkortingen voor zijn:

```js
let punten = 10;
punten += 5;   // hetzelfde als: punten = punten + 5  → 15
punten -= 2;   // → 13
punten *= 2;   // → 26
punten++;      // +1 → 27
punten--;      // -1 → 26
```

## Samenvatting

- Een **variabele** is een benoemd doosje voor een waarde. Maak ze met `const` (standaard) of
  `let` (als de waarde mag veranderen). **`var` gebruik je nooit.**
- Belangrijkste **datatypes**: `number` (getal), `string` (tekst), `boolean` (`true`/`false`),
  en de lege waarden `undefined` en `null`.
- `+` telt op bij getallen, maar **plakt** bij tekst, let op je types.
- Plak tekst het liefst met **template literals**: `` `Hallo ${naam}` ``.
- Wijzig waarden met `=`, of korter met `+=`, `-=`, `++`, `--`.

## Oefeningen

Maak deze in `module2.html`. Schrijf eerst pseudocode (Module 1!), dan code. Kijk in de console.

1. **Persoonsgegevens.** Maak drie `const`-variabelen: je voornaam, je achternaam en je
   geboortejaar. Maak met een template literal de zin:
   `"Ik ben <voornaam> <achternaam> en ben geboren in <jaar>."` en log die.

2. **Boodschappen-rekensom.** Een klant koopt 3 broden van €2,50 en 2 pakken melk van €1,20.
   Sla de aantallen en prijzen op in variabelen, bereken de totaalprijs in een nieuwe variabele,
   en log: `"Totaal: € <bedrag>"`. (Hint: gebruik `*` en `+`.)

3. **Verzendkosten.** Breid oefening 2 uit: voeg €4,95 verzendkosten toe. Gebruik `+=` om die
   bij het totaal op te tellen.

4. **Type-puzzel.** Voorspel *eerst op papier* wat elke regel logt, controleer daarna:
   ```js
   console.log(7 + 2);
   console.log("7" + 2);
   console.log(Number("7") + 2);
   console.log(7 + " katten");
   ```

5. **Veranderen of niet?** Maak `const max = 10;` en probeer daarna `max = 20;`. Lees de
   foutmelding in de console. Verander dan `const` naar `let` en kijk dat het nu wél werkt.
   Schrijf in een commentaar in je eigen woorden waarom.

Klaar en gecontroleerd? Top. **Module 3 (Functies, methodes & objecten)** volgt, zeg maar
wanneer je zover bent, of stel vragen over deze module.
