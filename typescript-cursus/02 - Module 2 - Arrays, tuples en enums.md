# Module 2: Arrays, tuples en enums

In Module 1 typte je losse waarden. Nu kijken we naar **collecties**, meerdere waarden bij
elkaar, en hoe TypeScript die bewaakt. Je leert arrays typen, kennismaken met tuples, en het
handige `enum`.

> Werk in `src/module2.ts`, met `tsc --watch` aan.

## 1. Arrays: een lijst van hetzelfde type

Een array ken je uit JavaScript: een lijst van waarden. In TypeScript zeg je er bij **wat voor
soort** waarden erin mogen. Dat doe je met het type + `[]`:

```ts
let scores: number[] = [10, 25, 5, 40];   // een lijst getallen
let namen: string[] = ["Jonas", "Sara"];  // een lijst tekst
let vlaggen: boolean[] = [true, false];    // een lijst booleans
```

`number[]` lees je als *"een array van numbers"*. De compiler bewaakt nu dat er alleen getallen
in komen:

```ts
scores.push(50);     // ✅ een getal
scores.push("zes");  // ❌ Argument of type 'string' is not assignable to parameter of type 'number'
```

Dit is precies waarom arrays in TypeScript zo fijn zijn: je kunt nooit per ongeluk het verkeerde
soort waarde in je lijst stoppen.

### Inference werkt ook bij arrays

Geef je meteen waarden, dan raadt TypeScript het type zelf (Module 1):

```ts
let prijzen = [9.99, 19.99, 4.5]; // TypeScript weet: number[]
prijzen.push("gratis");           // ❌ toch een fout
```

Net als bij losse variabelen hoef je dus niet altijd te annoteren. Maar voor een **lege** array
moet je het wél zeggen, anders wordt het `any[]`:

```ts
let lijst = [];        // type: any[]  -> onveilig
let beterelijst: string[] = []; // expliciet: alleen strings
```

### Een tweede schrijfwijze: `Array<...>`

Je ziet soms ook `Array<number>` in plaats van `number[]`. Ze betekenen exact hetzelfde:

```ts
let a: number[] = [1, 2, 3];
let b: Array<number> = [1, 2, 3]; // identiek
```

`number[]` is het meest gebruikt en het kortst, gebruik die. Goed om de andere te herkennen.
(De `< >`-notatie kom je later weer tegen bij **generics**, Module 7.)

## 2. Door een getypte array loopen

Loops werken zoals in JavaScript, maar nu **weet** TypeScript het type van elk item, dus je
krijgt autocomplete en bescherming:

```ts
let namen: string[] = ["Jonas", "Sara", "Tom"];

for (const naam of namen) {
  console.log(naam.toUpperCase()); // TS weet: naam is een string -> .toUpperCase() bestaat
}
```

Zou `namen` een `number[]` zijn, dan zou `.toUpperCase()` een fout geven, want getallen hebben
die methode niet. TypeScript checkt dat vóór je code draait.

## 3. Tuples: een array met een vaste vorm

Een gewone array is een lijst van **onbepaalde lengte**, allemaal hetzelfde type. Soms wil je
juist een **vaste lengte met vaste types per positie**. Dat heet een **tuple**:

```ts
let coordinaat: [number, number] = [50.85, 4.35]; // exact 2 getallen
let persoon: [string, number] = ["Jonas", 39];     // eerst string, dan number
```

Het verschil met een gewone array:
- `string[]` → zoveel strings als je wilt, allemaal string.
- `[string, number]` → **exact twee** items: positie 0 is een string, positie 1 een number, in
  díe volgorde.

De compiler bewaakt die vorm streng:

```ts
let persoon: [string, number] = ["Jonas", 39];
persoon = [39, "Jonas"]; // ❌ verkeerde volgorde
persoon = ["Jonas"];     // ❌ te weinig items
```

Tuples gebruik je voor "een paar dingen die bij elkaar horen in een vaste volgorde", bijv. een
coördinaat (lat, lng) of een sleutel-waarde-paar. Je komt ze niet super vaak tegen, maar het is
goed te weten dat ze bestaan.

> Valkuil: een tuple is technisch nog steeds een array, dus methodes als `.push()` werken er
> ook op, en kunnen de "vaste vorm" stiekem doorbreken. Gebruik tuples voor vaste, kleine
> structuren en wees voorzichtig met aanpassen.

## 4. Enums: een vaste set benoemde keuzes

Soms heeft iets maar een paar geldige waarden: een status is `actief`, `gepauzeerd` of
`gestopt`; een richting is `noord`, `oost`, `zuid` of `west`. Een **`enum`** geeft die vaste set
een naam, zodat je niet met losse strings hoeft te werken (waar je makkelijk in typt):

```ts
enum Status {
  Actief,
  Gepauzeerd,
  Gestopt,
}

let huidige: Status = Status.Actief;

if (huidige === Status.Gepauzeerd) {
  console.log("Even pauze");
}
```

Voordelen:
- **Autocomplete**: typ `Status.` en je editor toont de drie opties.
- **Bescherming tegen typo's**: `Status.Actif` (typo) geeft meteen een fout, terwijl de losse
  string `"actif"` gewoon zou doorgaan en stilletjes verkeerd zijn.

### Wat zit er "onder" een enum?

Standaard geeft TypeScript elke optie een **nummer**, beginnend bij 0:

```ts
console.log(Status.Actief);     // 0
console.log(Status.Gepauzeerd); // 1
console.log(Status.Gestopt);    // 2
```

Vaak wil je liever **tekstwaarden** (leesbaarder, bijv. in opgeslagen data). Dat geef je expliciet:

```ts
enum Status {
  Actief = "ACTIEF",
  Gepauzeerd = "GEPAUZEERD",
  Gestopt = "GESTOPT",
}

console.log(Status.Actief); // "ACTIEF"
```

> In de praktijk zie je vaak ook een **union van string-literals** als alternatief voor enums
> (bijv. `"actief" | "gepauzeerd"`). Dat behandelen we in Module 5. Voor nu: ken het `enum` en
> wat het oplost.

## Samenvatting

- Een **array** typ je met `type[]`: `number[]`, `string[]`. De compiler bewaakt dat er alleen
  dat type in komt. Inference werkt, maar een **lege** array moet je annoteren (anders `any[]`).
- `Array<number>` is hetzelfde als `number[]` (de korte vorm is gangbaar).
- In een loop kent TypeScript het type van elk item → autocomplete + bescherming.
- Een **tuple** (`[string, number]`) is een array met een **vaste lengte en vaste types per
  positie**, in vaste volgorde.
- Een **`enum`** geeft een vaste set keuzes een naam (autocomplete, geen typo's). Standaard
  nummers vanaf 0; je kunt ook stringwaarden geven.

## Oefeningen

Maak `src/module2.ts` (met `tsc --watch`).

1. **Getypte array.** Maak een `number[]` met vijf testscores. Bereken met een loop de som en
   log die. Probeer daarna `scores.push("zes")` en bekijk de foutmelding (haal 'm weer weg).

2. **String-array + loop.** Maak een `string[]` met drie namen. Loop erdoorheen en log elke
   naam in HOOFDLETTERS (`toUpperCase`). Verander het type tijdelijk naar `number[]` en kijk
   waarom `toUpperCase` dan een fout geeft.

3. **Lege array veilig maken.** Maak `let taken = [];`. Bekijk het type (muis erover), waarom
   is dat onveilig? Herschrijf het zo dat er alleen strings in mogen.

4. **Tuple.** Maak een tuple `[string, number]` voor een product (naam + prijs). Log beide
   waarden. Probeer de volgorde om te draaien en bekijk de fout.

5. **Enum.** Maak een `enum Richting` met `Noord`, `Oost`, `Zuid`, `West`. Maak een variabele
   van dat type, en schrijf een `if` die iets logt bij `Richting.Noord`. Probeer een typo
   (`Richting.Noordd`) en zie dat TypeScript meteen klaagt.

6. **Enum met tekstwaarden.** Herschrijf je `enum Richting` zo dat elke optie een stringwaarde
   heeft (`"NOORD"`, ...). Log `Richting.Noord` en controleer dat je nu de tekst ziet i.p.v. een
   nummer.

Klaar? In **Module 3** komen **functies met types**, parameters, return-types, optionele
parameters, waar TypeScript echt gaat schitteren.
