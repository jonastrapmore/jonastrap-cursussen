# Module 4: Objecten, type aliases en interfaces

Tot nu toe typte je losse waarden (Module 1), lijstjes (Module 2) en functies (Module 3). Maar
echte data komt zelden alleen: een gebruiker heeft een *naam én een leeftijd én een e-mail*, een
product heeft een *naam én een prijs én een voorraad*. Zulke samenhangende data bundel je in een
**object**. In deze module leer je objecten typen, en die types een **naam** geven met **type
aliases** en **interfaces**. Dit is een van de belangrijkste onderdelen van TypeScript, je gaat
het vanaf nu overal gebruiken.

> Werk in `src/module04.ts`. Laat `tsc --watch` meelopen en draai met `node dist/module04.js`.

## 1. Een object typen

Een object ken je uit JavaScript: eigenschappen (`properties`) met een waarde. In TypeScript
beschrijf je de **vorm** van dat object, welke properties het heeft en van welk type:

```ts
let persoon: { naam: string; leeftijd: number } = {
  naam: "Jonas",
  leeftijd: 39,
};
```

Tussen de accolades staat het **type**, niet de waarde: *"dit object heeft een `naam` (string) en
een `leeftijd` (number)."* De compiler bewaakt dat nu streng:

```ts
console.log(persoon.naam.toUpperCase()); // ✅ TS weet: naam is een string
persoon.leeftijd = "veertig"; // ❌ Type 'string' is not assignable to type 'number'
persoon.email = "jonas@x.be"; // ❌ Property 'email' does not exist on this type
```

Je krijgt ook **autocomplete**: typ `persoon.` en je editor toont `naam` en `leeftijd`. En je
kunt geen property vergeten of verzinnen die niet bestaat.

> Merk op dat de properties in het **type** gescheiden worden met een puntkomma (`;`), en in de
> **waarde** met een komma (`,`). Beide mag met komma's ook, maar dit is de gangbare stijl.

### Valkuil: te veel of te weinig properties

Bij het maken van het object moet de vorm **exact** kloppen, niet te weinig, en (bij een letterlijk
object) ook niet te veel:

```ts
let p1: { naam: string; leeftijd: number } = { naam: "Sara" };
// ❌ Property 'leeftijd' is missing

let p2: { naam: string; leeftijd: number } = { naam: "Tom", leeftijd: 30, email: "t@x.be" };
// ❌ Object literal may only specify known properties, and 'email' does not exist in this type
```

Die laatste heet een *excess property check*: TypeScript waarschuwt als je een letterlijk object
een property geeft die niet in het type zit, vaak een typo.

## 2. Type alias: geef de vorm een naam

Dat hele type (`{ naam: string; leeftijd: number }`) telkens overtypen is vervelend en
foutgevoelig. Met een **type alias** geef je die vorm één keer een **naam**, en gebruik je die
naam overal:

```ts
type Persoon = {
  naam: string;
  leeftijd: number;
};

let jonas: Persoon = { naam: "Jonas", leeftijd: 39 };
let sara: Persoon = { naam: "Sara", leeftijd: 28 };
```

Lees `type Persoon = { ... }` als: *"ik maak een nieuw type dat ik `Persoon` noem."* Voordelen:

- **Herbruikbaar**: schrijf de vorm één keer, gebruik `Persoon` zo vaak je wil.
- **Leesbaar**: `let jonas: Persoon` zegt meteen waar het over gaat.
- **Onderhoudbaar**: verandert de vorm, dan pas je alleen de alias aan, niet elke plek.

> Afspraak: type-namen schrijf je met een **hoofdletter** (`Persoon`, `Product`), zodat je ze
> makkelijk herkent als type en niet als variabele. Dit is een conventie, geen regel van de
> compiler.

Een type alias werkt trouwens niet alleen voor objecten, je kunt er élk type een naam mee geven:

```ts
type Leeftijd = number; // een alias voor een bestaand type
let x: Leeftijd = 30; // gedraagt zich gewoon als number
```

Bij objecten is het het nuttigst, maar onthoud dat een alias breder inzetbaar is (we gebruiken dat
volop in Module 5 bij union-types).

## 3. Optionele properties met `?`

Net als bij functie-parameters (Module 3) kun je een property **optioneel** maken met een `?`.
Dan *mag* hij ontbreken:

```ts
type Persoon = {
  naam: string;
  leeftijd: number;
  email?: string; // optioneel
};

let a: Persoon = { naam: "Jonas", leeftijd: 39 }; // ✅ email weggelaten mag
let b: Persoon = { naam: "Sara", leeftijd: 28, email: "sara@x.be" }; // ✅ mag ook
```

Een optionele property is van het type *"dat type **of** `undefined`"*. Wil je hem gebruiken, dan
moet je vaak eerst even checken of hij bestaat:

```ts
if (a.email) {
  console.log(a.email.toUpperCase()); // veilig: alleen als email bestaat
}
```

Zonder die check klaagt TypeScript, want `a.email` zou `undefined` kunnen zijn, en `undefined`
heeft geen `.toUpperCase()`.

## 4. Interface: de vorm beschrijven

Naast de type alias heeft TypeScript een tweede manier om de vorm van een object te beschrijven:
de **interface**. Voor objecten doet die vrijwel hetzelfde:

```ts
interface Persoon {
  naam: string;
  leeftijd: number;
  email?: string;
}

let jonas: Persoon = { naam: "Jonas", leeftijd: 39 };
```

Verschillen met een type alias om te zien:
- Bij `interface` staat er **geen `=`** (je schrijft `interface Persoon { ... }`, niet
  `interface Persoon = { ... }`).
- Een interface beschrijft **altijd een object-vorm**; een type alias kan óók andere dingen (zoals
  `type Leeftijd = number` of straks union-types).

Verder gebruik en gedraag je ze bij objecten hetzelfde: properties, optionele `?`, autocomplete,
en dezelfde strenge controle.

## 5. Type alias of interface, wanneer wat?

Dit is een klassieke vraag. Het eerlijke antwoord: **voor gewone objecten maakt het weinig uit**,
kies er één en wees consistent. Toch de vuistregels:

- **Interface** → als je vooral **object-vormen** beschrijft, zeker als je ze later wil
  **uitbreiden** (zie punt 8). Veel teams gebruiken interfaces standaard voor objecten.
- **Type alias** → als je meer nodig hebt dan een object-vorm: een alias voor een ander type, of
  een **union** (`"actief" | "gestopt"`, Module 5). Dat kan een interface niet.

> Vuistregel voor deze cursus: gebruik een **interface** voor object-vormen, en een **type alias**
> zodra je iets anders dan een simpel object beschrijft. Kom je in bestaande code beide tegen, dan
> weet je nu dat ze voor objecten grotendeels inwisselbaar zijn.

## 6. Objecten combineren: geneste objecten en arrays

Properties mogen zelf ook objecten of arrays zijn. Zo bouw je rijkere structuren:

```ts
interface Adres {
  straat: string;
  stad: string;
}

interface Persoon {
  naam: string;
  adres: Adres; // een object als property
  hobbys: string[]; // een array als property
}

let jonas: Persoon = {
  naam: "Jonas",
  adres: { straat: "Kerkstraat 1", stad: "Gent" },
  hobbys: ["lesgeven", "code"],
};

console.log(jonas.adres.stad); // "Gent"
```

En omgekeerd: een **array van objecten** typ je met je eigen type + `[]` (Module 2 komt terug):

```ts
let mensen: Persoon[] = [jonas /* , ... */];

for (const m of mensen) {
  console.log(m.naam); // TS kent de vorm van elk item
}
```

Dit patroon, een `Persoon[]` of `Product[]` doorlopen, ga je in bijna elke app gebruiken.

## 7. Objecten als functie-parameter

Een functie (Module 3) krijgt vaak een heel object binnen in plaats van losse parameters. Je typt
die parameter dan gewoon met je alias of interface:

```ts
interface Product {
  naam: string;
  prijs: number;
}

function toonProduct(product: Product): void {
  console.log(`${product.naam} kost € ${product.prijs}`);
}

toonProduct({ naam: "Oortjes", prijs: 15 }); // ✅
toonProduct({ naam: "Oortjes" }); // ❌ Property 'prijs' is missing
```

Dit is netter dan tien losse parameters, en de compiler bewaakt dat je het juiste object meegeeft.
Je ziet dit overal, van functies tot (later) componenten die een object aan "props" krijgen.

## 8. Kort: een interface uitbreiden

Soms is een type een **uitbreiding** van een ander. Een `Werknemer` is een `Persoon` mét een
bedrijf erbij. Bij interfaces doe je dat met **`extends`**:

```ts
interface Persoon {
  naam: string;
  leeftijd: number;
}

interface Werknemer extends Persoon {
  bedrijf: string; // erft naam + leeftijd, en voegt bedrijf toe
}

let w: Werknemer = { naam: "Jonas", leeftijd: 39, bedrijf: "Thomas More" };
```

Bij een **type alias** bereik je hetzelfde met `&` (een *intersection*, "allebei tegelijk"):

```ts
type Werknemer = Persoon & { bedrijf: string };
```

Voor nu is de boodschap: je kunt vormen **op elkaar voortbouwen** en zo herhaling vermijden. De
intersection `&` bekijken we grondiger in Module 5.

## Samenvatting

- Een **object** typ je met zijn vorm: `{ naam: string; leeftijd: number }`. De compiler bewaakt
  properties en types (en waarschuwt bij een ontbrekende of onbekende property).
- Een **type alias** (`type Persoon = { ... }`) geeft een vorm een herbruikbare **naam**; hij werkt
  ook voor niet-object-types.
- Een **interface** (`interface Persoon { ... }`) beschrijft een object-vorm; voor objecten
  vrijwel gelijk aan een alias (maar zonder `=`).
- **Vuistregel**: interface voor object-vormen, type alias zodra je iets anders (zoals een union)
  nodig hebt.
- Een **`?`** maakt een property optioneel (type `| undefined`; check voor gebruik).
- Properties mogen zelf **objecten** of **arrays** zijn; een lijst objecten typ je als `Persoon[]`.
- Je geeft objecten door aan **functies** door de parameter met je type/interface te annoteren.
- Vormen bouw je op elkaar voort met **`extends`** (interface) of **`&`** (type alias).

## Oefeningen

Maak `src/module04.ts`. Laat `tsc --watch` meelopen en draai met `node dist/module04.js`.

1. **Object typen.** Maak een variabele `boek` van het type `{ titel: string; paginas: number }`
   en geef hem waarden. Log de titel. Probeer daarna `boek.paginas = "veel"` en bekijk de
   foutmelding (haal 'm weer weg).

2. **Type alias.** Maak een type alias `Persoon` met `naam` (string) en `leeftijd` (number). Maak
   twee variabelen van dat type en log van beide de naam.

3. **Optionele property.** Voeg aan `Persoon` een optionele property `email?: string` toe. Maak
   één persoon mét en één zónder e-mail. Log de e-mail alleen als hij bestaat (gebruik een `if`).

4. **Interface.** Schrijf dezelfde `Persoon`-vorm nog eens, maar nu als `interface`. Maak er een
   variabele mee. Merk op dat het gebruik identiek voelt.

5. **Array van objecten.** Maak een `Persoon[]` met drie personen. Loop erdoorheen en log van elk
   de naam en leeftijd in één zin (template literal).

6. **Object als functie-parameter.** Schrijf een interface `Product` (`naam: string`,
   `prijs: number`) en een functie `toonProduct(product: Product): void` die een zin logt. Roep
   hem aan met een geldig product. Probeer een product zonder `prijs` en bekijk de fout.

7. **Uitbreiden (uitdaging).** Maak een interface `Werknemer` die `Persoon` uitbreidt met een
   property `bedrijf: string` (`extends`). Maak een werknemer aan en log naam + bedrijf.

Klaar? In **Module 5** leren we **union- en intersection-types**, **literal types** en
**narrowing**, waarmee je nog preciezer beschrijft welke waarden precies mogen, en TypeScript
slim laat meedenken.
