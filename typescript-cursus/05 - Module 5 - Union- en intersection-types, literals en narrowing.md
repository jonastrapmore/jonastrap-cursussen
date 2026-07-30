# Module 5: Union- en intersection-types, literals en narrowing

Tot nu toe had elke waarde precies **één** type: een `number`, een `string`, een `Persoon`. Maar
soms mag iets **meerdere** types zijn (een id die een getal óf tekst is), of juist **exact één
bepaalde waarde** (een richting die alleen `"noord"`, `"oost"`, `"zuid"` of `"west"` mag zijn). In
deze module leer je die preciezer beschrijven met **union-types**, **literal-types** en
**intersection-types**, en je leert **narrowing**: hoe TypeScript slim meedenkt en vanzelf weet
met welk type je op een bepaalde plek te maken hebt.

> Werk in `src/module05.ts`. Laat `tsc --watch` meelopen en draai met `node dist/module05.js`.

## 1. Union-types: meerdere types toegestaan

Een **union** zegt: *"deze waarde is dit type **of** dat type."* Je schrijft de types met een
pijp (`|`) ertussen:

```ts
let id: string | number;

id = 123; // ✅ mag
id = "abc-123"; // ✅ mag ook
id = true; // ❌ Type 'boolean' is not assignable to type 'string | number'
```

`string | number` lees je als *"string óf number"*. Handig als een waarde echt in twee vormen kan
voorkomen, bijvoorbeeld een id die soms een getal en soms een code is.

### De valkuil: je mag niet zomaar alles

Zolang TypeScript niet zeker weet **welk** van de twee je nú hebt, mag je alleen dingen doen die
voor **beide** types geldig zijn:

```ts
function toonId(id: string | number) {
  console.log(id.toUpperCase()); // ❌ Property 'toUpperCase' does not exist on type 'number'
}
```

`toUpperCase()` bestaat wel op een string, maar niet op een number, dus TypeScript blokkeert het.
Logisch: als `id` een getal was, zou dit crashen. Hoe je dit oplost, is het onderwerp van de
volgende sectie.

## 2. Narrowing: TypeScript laten meedenken

**Narrowing** (letterlijk "versmallen") betekent: je code controleert iets, en daardoor **weet**
TypeScript binnen dat blok met welk type het te maken heeft. De bekendste manier is `typeof`:

```ts
function toonId(id: string | number) {
  if (typeof id === "string") {
    // in dit blok weet TS: id is een string
    console.log(id.toUpperCase()); // ✅ mag nu
  } else {
    // en hier moet het dus een number zijn
    console.log(id.toFixed(0)); // ✅ number-methode mag hier
  }
}
```

Binnen de `if` heeft TypeScript het type **versmald** van `string | number` naar alleen `string`,
en in de `else` naar alleen `number`. Zo krijg je in elk blok autocomplete en bescherming voor het
juiste type. Dit is een van de slimste dingen aan TypeScript: het volgt je eigen checks.

## 3. Literal-types: exact één waarde

Types zijn niet alleen `string` of `number`. Je kunt een type ook een **exacte waarde** laten zijn.
Dat heet een **literal-type**:

```ts
let richting: "noord"; // dit type mag ALLEEN de waarde "noord" zijn
richting = "noord"; // ✅
richting = "zuid"; // ❌ Type '"zuid"' is not assignable to type '"noord"'
```

Op zich is één vaste waarde weinig nuttig. Literal-types worden pas krachtig in combinatie met een
**union** (sectie 4).

> Je zag literals eigenlijk al zonder het te weten: schrijf je `const stad = "Gent"`, dan is het
> type van `stad` niet `string` maar de literal `"Gent"` (want een `const` kan nooit meer
> veranderen). Bij `let stad = "Gent"` is het type wél `string`, want die mag je later overschrijven.

## 4. Union van literals: het alternatief voor enum

Combineer je meerdere literals met `|`, dan krijg je een net, klein type met een **vaste set
toegestane waarden**:

```ts
type Richting = "noord" | "oost" | "zuid" | "west";

let koers: Richting = "noord"; // ✅
koers = "west"; // ✅
koers = "noordwest"; // ❌ Type '"noordwest"' is not assignable to type 'Richting'
```

Dit doet in de praktijk hetzelfde werk als het `enum` uit Module 2, autocomplete en bescherming
tegen typo's, maar korter en zonder extra constructie. Je werkt gewoon met de strings zelf.

> Enum of union van literals? Beide zijn goed. Een **union van string-literals** is lichter en zie
> je heel vaak in moderne TypeScript. Een **`enum`** is handig als je een echte, benoemde groep
> wil met eventueel onderliggende nummers. Voor deze cursus mag je zelf kiezen; ken beide.

Zulke literal-unions gebruik je veel als functie-parameter, zodat alleen geldige opties erin kunnen:

```ts
function beweeg(richting: Richting) {
  console.log(`Ik ga naar het ${richting}en.`);
}

beweeg("noord"); // ✅
beweeg("omhoog"); // ❌ alleen de vier richtingen mogen
```

## 5. Meer manieren van narrowing

`typeof` is niet de enige manier om te versmallen. De belangrijkste die je vaak gebruikt:

**Truthiness** (bestaat de waarde?), vooral bij `| undefined` (denk aan optionele properties uit
Module 4):

```ts
function begroet(naam: string | undefined) {
  if (naam) {
    console.log(`Hallo, ${naam}!`); // hier is naam zeker een string
  } else {
    console.log("Hallo, onbekende!"); // hier was naam undefined (of leeg)
  }
}
```

**Vergelijken met een literal** (`===`), handig bij een literal-union:

```ts
function beweeg(richting: Richting) {
  if (richting === "noord") {
    console.log("Naar boven op de kaart");
  }
}
```

**De `in`-operator** (heeft dit object een bepaalde property?):

```ts
type Kat = { miauw: () => void };
type Hond = { blaf: () => void };

function geluid(dier: Kat | Hond) {
  if ("miauw" in dier) {
    dier.miauw(); // TS weet: dit is een Kat
  } else {
    dier.blaf(); // dus dit een Hond
  }
}
```

Telkens hetzelfde idee: je doet een **check**, en TypeScript versmalt het type binnen dat blok.

## 6. Intersection-types: alles tegelijk

Waar een **union** (`|`) "het één óf het ander" betekent, betekent een **intersection** (`&`)
"het één **én** het ander tegelijk". Je plakt er object-types mee aan elkaar (je zag dit al even in
Module 4):

```ts
type Persoon = {
  naam: string;
  leeftijd: number;
};

type Werknemer = Persoon & {
  bedrijf: string;
};

let jonas: Werknemer = {
  naam: "Jonas",
  leeftijd: 39,
  bedrijf: "Thomas More", // moet ALLE properties van beide hebben
};
```

`Persoon & { bedrijf: string }` betekent: een object dat **zowel** alles van `Persoon` heeft
(`naam`, `leeftijd`) **als** een `bedrijf`. Dit is het type-alias-alternatief voor `interface
Werknemer extends Persoon` uit Module 4, ze bereiken hetzelfde.

> Let op het verschil in betekenis: `A | B` = "minstens één van beide" (een keuze); `A & B` =
> "beide samengevoegd" (een combinatie). Verwar de pijp en de ampersand niet.

## 7. Alles samen: de discriminated union (uitdaging)

Nu combineren we union, literals én narrowing tot een van de mooiste patronen van TypeScript. Stel
je hebt verschillende soorten vormen. Je geeft elke soort een gemeenschappelijke property met een
**literal** als "label", en zet ze in een union:

```ts
type Cirkel = { soort: "cirkel"; straal: number };
type Rechthoek = { soort: "rechthoek"; breedte: number; hoogte: number };

type Vorm = Cirkel | Rechthoek;

function oppervlakte(vorm: Vorm): number {
  if (vorm.soort === "cirkel") {
    // TS weet nu: vorm is een Cirkel, dus 'straal' bestaat
    return Math.PI * vorm.straal ** 2;
  } else {
    // en hier een Rechthoek, dus 'breedte' en 'hoogte' bestaan
    return vorm.breedte * vorm.hoogte;
  }
}

console.log(oppervlakte({ soort: "cirkel", straal: 2 }));
console.log(oppervlakte({ soort: "rechthoek", breedte: 3, hoogte: 4 }));
```

Door op het `soort`-label te checken (`vorm.soort === "cirkel"`), versmalt TypeScript naar precies
het juiste object, en weet het welke properties bestaan. Dit heet een **discriminated union** (de
`soort`-property is de "discriminator"). Je komt dit veel tegen bij het modelleren van data die in
meerdere varianten voorkomt.

## Samenvatting

- Een **union** (`string | number`) laat meerdere types toe. Tot je **narrowt**, mag je alleen wat
  voor álle varianten geldig is.
- **Narrowing** = met een check (`typeof`, truthiness, `===`, `in`) laat je TypeScript binnen een
  blok het exacte type afleiden.
- Een **literal-type** is één exacte waarde (`"noord"`). Los weinig nut, maar krachtig in een union.
- Een **union van literals** (`"noord" | "oost" | ...`) is een licht alternatief voor een `enum`:
  vaste set waarden, autocomplete, geen typo's.
- Een **intersection** (`A & B`) voegt object-types samen (alles van allebei), het alternatief voor
  `interface ... extends ...`.
- Een **discriminated union** (union van objecten met een literal-label) + narrowing op dat label
  is hét patroon voor data die in varianten komt.

## Oefeningen

Maak `src/module05.ts`. Laat `tsc --watch` meelopen en draai met `node dist/module05.js`.

1. **Union-type.** Maak een variabele `id: string | number`. Wijs er eerst een getal aan toe, log
   het, daarna een string, log het. Probeer `id = true` en bekijk de foutmelding (haal 'm weer weg).

2. **Narrowing met `typeof`.** Schrijf een functie `toonId(id: string | number): void` die de id
   in HOOFDLETTERS logt als het een string is, en anders het getal met twee decimalen
   (`toFixed(2)`). Test met beide soorten.

3. **Literal-union.** Maak een type alias `Richting = "noord" | "oost" | "zuid" | "west"`. Maak een
   variabele van dat type. Probeer een ongeldige waarde (`"omhoog"`) en bekijk de fout.

4. **Literal-union als parameter.** Schrijf een functie `beweeg(richting: Richting): void` die een
   zin logt. Roep hem aan met een geldige richting, en probeer daarna een ongeldige.

5. **Narrowing met truthiness.** Schrijf `begroet(naam: string | undefined): void` die
   `"Hallo, <naam>!"` logt als er een naam is, en anders `"Hallo, onbekende!"`. Test beide gevallen.

6. **Intersection.** Maak een type alias `Persoon` (`naam`, `leeftijd`) en een type alias
   `Werknemer = Persoon & { bedrijf: string }`. Maak een werknemer en log naam + bedrijf.

7. **Discriminated union (uitdaging).** Maak types `Cirkel` (`soort: "cirkel"`, `straal`) en
   `Rechthoek` (`soort: "rechthoek"`, `breedte`, `hoogte`), en een union `Vorm`. Schrijf
   `oppervlakte(vorm: Vorm): number` die met een check op `soort` de juiste berekening doet. Test
   met een cirkel en een rechthoek.

Klaar? In **Module 6** stappen we over naar **classes**: een manier om objecten met data én gedrag
(methodes) te maken, met types erop, de basis van veel grotere applicaties.
