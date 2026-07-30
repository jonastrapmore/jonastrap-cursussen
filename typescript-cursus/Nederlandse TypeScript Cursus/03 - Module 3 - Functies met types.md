# Module 3: Functies met types

Functies zijn waar TypeScript echt gaat schitteren. Een functie heeft **ingangen** (parameters)
en een **uitgang** (de returnwaarde), en aan allebei kun je een type hangen. Daardoor weet de
compiler precies wat erin mag en wat eruit komt, en vangt hij fouten die je in JavaScript pas
veel later zou ontdekken.

> Werk in `src/module03.ts`. Laat `tsc --watch` meelopen en draai met `node dist/module03.js`.

## 1. Waarom types op functies?

In JavaScript kun je een functie alles voeren:

```js
function dubbel(getal) {
  return getal * 2;
}
dubbel("hallo"); // JavaScript: NaN, en geen waarschuwing
```

Pas als je code draait, krijg je een onzin-resultaat (`NaN`). In TypeScript geef je de
parameter een type, en dan klaagt de compiler **meteen**:

```ts
function dubbel(getal: number) {
  return getal * 2;
}
dubbel("hallo"); // ❌ Argument of type 'string' is not assignable to parameter of type 'number'
```

Dat is de kern: je legt vast wat er **in** een functie mag, en de compiler bewaakt elke
aanroep.

## 2. Parameter-types

Elke parameter krijgt een type achter een dubbele punt, net als bij variabelen:

```ts
function begroet(naam: string) {
  console.log(`Hallo, ${naam}!`);
}

begroet("Sara"); // ✅
begroet(42); // ❌ Argument of type 'number' is not assignable to parameter of type 'string'
```

Meerdere parameters scheid je met komma's, elk met hun eigen type:

```ts
function maakZin(naam: string, leeftijd: number) {
  return `${naam} is ${leeftijd} jaar.`;
}
```

> Belangrijk: bij parameters is **inference geen optie**. TypeScript kan niet raden wat je
> bedoelt met een parameter, want er is geen beginwaarde. Daarom **annoteer je parameters
> altijd**. Doe je dat niet, dan worden ze stilzwijgend `any`, en met `strict: true` aan
> krijg je daar zelfs een fout over (`Parameter 'x' implicitly has an 'any' type`).

## 3. Het return-type

Je kunt ook het type van wat de functie **teruggeeft** vastleggen, achter de haakjes:

```ts
function tel(a: number, b: number): number {
  return a + b;
}
```

De `: number` na de `()` zegt: *"deze functie geeft een number terug."* Probeer je iets anders
terug te geven, dan klaagt de compiler:

```ts
function tel(a: number, b: number): number {
  return `${a + b}`; // ❌ Type 'string' is not assignable to type 'number'
}
```

### Inference: het return-type mag je vaak weglaten

TypeScript leidt het return-type meestal **zelf** af uit wat je teruggeeft:

```ts
function tel(a: number, b: number) {
  return a + b; // TypeScript weet: deze functie geeft een 'number' terug
}
```

Beweeg je muis over `tel` en je ziet `function tel(a: number, b: number): number`, ook al
schreef je het return-type niet. Dus:

> **Vuistregel:** parameters **altijd** annoteren; het return-type mag je vaak laten raden.
> Schrijf het return-type expliciet op wanneer je het belangrijk vindt om vast te leggen wat
> een functie hoort terug te geven (een soort contract), handig bij grotere of belangrijke
> functies.

## 4. `void`: een functie die niets teruggeeft

Sommige functies geven niets terug; ze *doen* alleen iets (bijvoorbeeld loggen). Hun
return-type is **`void`**:

```ts
function logBericht(tekst: string): void {
  console.log(tekst);
  // geen return
}
```

`void` betekent letterlijk "geen returnwaarde". Je hoeft het zelden zelf te schrijven,
TypeScript leidt `void` vanzelf af voor functies zonder `return`. Maar het is goed om te
herkennen, want je ziet het vaak in foutmeldingen en bij event-handlers.

## 5. Optionele parameters met `?`

Soms is een parameter niet verplicht. Zet je een **`?`** achter de naam, dan mag je hem
weglaten bij het aanroepen:

```ts
function begroet(naam: string, titel?: string) {
  if (titel) {
    return `Hallo, ${titel} ${naam}!`;
  }
  return `Hallo, ${naam}!`;
}

begroet("Sara"); // ✅ "Hallo, Sara!"
begroet("Sara", "dr."); // ✅ "Hallo, dr. Sara!"
```

Belangrijk om te snappen: een optionele parameter is van het type *"dat type **of** undefined"*.
`titel?: string` betekent dus eigenlijk `string | undefined`. Daarom moet je vaak even checken
of hij bestaat (de `if (titel)` hierboven) voor je hem gebruikt.

> Valkuil: **optionele parameters moeten achteraan staan.** Een verplichte parameter ná een
> optionele mag niet:
> ```ts
> function fout(titel?: string, naam: string) {} // ❌ A required parameter cannot follow an optional parameter
> ```

## 6. Standaardwaarden (default parameters)

In plaats van optioneel kun je een parameter ook een **standaardwaarde** geven. Laat je hem
weg bij het aanroepen, dan wordt die standaard gebruikt:

```ts
function begroet(naam: string, groet: string = "Hallo") {
  return `${groet}, ${naam}!`;
}

begroet("Sara"); // "Hallo, Sara!"
begroet("Sara", "Goedemorgen"); // "Goedemorgen, Sara!"
```

Mooi detail: omdat de standaardwaarde `"Hallo"` een string is, **weet TypeScript zelf** dat
`groet` een `string` is, je hoeft het type niet eens te schrijven (inference, net als bij
variabelen). Een parameter met standaardwaarde is automatisch optioneel.

Verschil optioneel vs. standaardwaarde:
- `titel?: string` → kan ontbreken; is dan `undefined`.
- `groet: string = "Hallo"` → kan ontbreken; is dan `"Hallo"` (nooit `undefined`).

## 7. Een functie als type

Functies zijn in JavaScript ook gewoon waarden, je kunt ze in een variabele stoppen of als
argument doorgeven. In TypeScript kun je dan het **type van de functie zelf** beschrijven: welke
parameters erin gaan en wat eruit komt.

```ts
// een variabele die een functie bevat: (number, number) => number
let bewerking: (a: number, b: number) => number;

bewerking = (a, b) => a + b; // ✅ past op het type
bewerking = (a, b) => a - b; // ✅ ook goed
bewerking = (a, b) => `${a}`; // ❌ geeft een string terug, geen number
```

Lees `(a: number, b: number) => number` als: *"een functie die twee numbers krijgt en een
number teruggeeft."* De pijl `=>` hoort hier bij de **type-beschrijving** (niet te verwarren
met een arrow function; het is dezelfde pijl in een andere context).

Let op het verschil:
- In de **typebeschrijving** geef je elke parameter een naam én type, en na de `=>` staat het
  **return-type**: `(a: number, b: number) => number`.
- In de **arrow function zelf** (`(a, b) => a + b`) hoeven `a` en `b` geen type, want
  TypeScript leidt ze af uit het type van `bewerking`.

Dit komt veel terug bij **callbacks**, een functie die je aan een andere functie meegeeft
(zoals bij `array.map`, of bij event-listeners later).

## 8. Kort: rest-parameters

Wil je een onbepaald aantal argumenten van hetzelfde type? Gebruik `...` (rest), met een array-
type:

```ts
function som(...getallen: number[]): number {
  let totaal = 0;
  for (const g of getallen) {
    totaal += g;
  }
  return totaal;
}

som(1, 2, 3); // 6
som(10, 20, 30, 40); // 100
```

`...getallen: number[]` verzamelt alle losse argumenten in één array `number[]`. Handig, en je
houdt de typecontrole: `som(1, "twee")` zou een fout geven.

## Samenvatting

- **Parameters annoteer je altijd** (`naam: string`); zonder annotatie worden ze `any` (fout met
  `strict`).
- Het **return-type** (`): number`) mag je vaak laten **raden** (inference); schrijf het
  expliciet op als contract bij belangrijke functies.
- **`void`** = geen returnwaarde (functies die alleen iets doen).
- **`?`** maakt een parameter optioneel (= type `| undefined`; moet achteraan staan).
- Een **standaardwaarde** (`groet: string = "Hallo"`) maakt een parameter optioneel met een
  vaste fallback; het type wordt vaak vanzelf afgeleid.
- Het **type van een functie** schrijf je als `(a: number, b: number) => number`, handig voor
  variabelen die functies bevatten en voor callbacks.
- **Rest-parameters** (`...getallen: number[]`) vangen een onbepaald aantal argumenten van één
  type op.

## Oefeningen

Maak `src/module03.ts`. Laat `tsc --watch` meelopen en draai met `node dist/module03.js`.

1. **Parameter- en return-type.** Schrijf een functie `oppervlakte(breedte: number, hoogte:
   number): number` die de oppervlakte teruggeeft. Roep hem aan en log het resultaat. Probeer
   daarna `oppervlakte("4", 5)` en bekijk de foutmelding (haal het weer weg).

2. **Inference.** Schrijf `function verdubbel(getal: number) { return getal * 2; }` zónder
   return-type. Beweeg je muis over de functienaam en noteer in commentaar welk return-type
   TypeScript zelf afleidt.

3. **`void`.** Schrijf een functie `toon(tekst: string): void` die de tekst logt. Controleer
   (muis erover) dat het return-type inderdaad `void` is.

4. **Optionele parameter.** Schrijf `begroet(naam: string, titel?: string)` die `"Hallo, dr.
   Sara!"` maakt als er een titel is, en anders `"Hallo, Sara!"`. Test beide aanroepen.

5. **Standaardwaarde.** Schrijf `prijsMetBtw(prijs: number, btw: number = 0.21): number` die de
   prijs inclusief btw teruggeeft. Roep aan met en zonder het tweede argument.

6. **Functie als type.** Maak een variabele `bewerking: (a: number, b: number) => number`. Wijs
   er eerst een optel-functie aan toe, daarna een aftrek-functie, en log telkens het resultaat
   van `bewerking(10, 3)`.

7. **Rest-parameter (uitdaging).** Schrijf `gemiddelde(...getallen: number[]): number` die het
   gemiddelde teruggeeft. Test met `gemiddelde(10, 20, 30)`.

Klaar? In **Module 4** bundelen we samenhangende data in **objecten**, en leren we ze typen met
**type aliases** en **interfaces**, een van de belangrijkste onderdelen van TypeScript.
