# Module 6: Classes

In Module 4 bundelde je data in objecten. Maar objecten hebben vaak niet alleen **data** (een
naam, een saldo), maar ook **gedrag**: dingen die ze kunnen *doen* (zich voorstellen, geld
opnemen). Een **class** is een blauwdruk waarmee je objecten maakt die data én gedrag combineren,
met types op allebei. Classes zijn de basis van veel grotere applicaties, en je komt ze in bijna
elk echt project tegen.

> Werk in `src/module06.ts`. Laat `tsc --watch` meelopen en draai met `node dist/module06.js`.

## 1. Wat is een class?

Een **class** is een soort mal (blauwdruk) voor objecten. Je beschrijft één keer hoe een object
eruitziet en wat het kan, en maakt er daarna zoveel exemplaren (`instances`) van als je wil:

```ts
class Hond {
  naam: string;

  constructor(naam: string) {
    this.naam = naam;
  }

  blaf(): void {
    console.log(`${this.naam} zegt: Woef!`);
  }
}

const rex = new Hond("Rex");
rex.blaf(); // "Rex zegt: Woef!"
```

De class `Hond` is de mal; `rex` is een concreet object dat volgens die mal gemaakt is. We lopen de
onderdelen nu stap voor stap door.

## 2. Properties en de constructor

Bovenaan de class declareer je de **properties** (de data) met hun type, net als in een object-type:

```ts
class Hond {
  naam: string; // property met type
  leeftijd: number;
  // ...
}
```

De **constructor** is een speciale methode die draait op het moment dat je een nieuw object maakt.
Hier vul je de properties met de waarden die je meegeeft:

```ts
class Hond {
  naam: string;
  leeftijd: number;

  constructor(naam: string, leeftijd: number) {
    this.naam = naam; // vul de property 'naam' met de meegegeven waarde
    this.leeftijd = leeftijd;
  }
}
```

> Belangrijk (met `strict` aan): elke gedeclareerde property moet een waarde krijgen, meestal in de
> constructor. Doe je dat niet, dan klaagt TypeScript: *"Property 'naam' has no initializer and is
> not definitely assigned in the constructor."* Logisch: anders zou de property `undefined` kunnen
> zijn terwijl het type dat niet toelaat.

## 3. Een object maken met `new`

Met het sleutelwoord **`new`** maak je een concreet object van de class. Wat je tussen de haakjes
zet, gaat naar de constructor:

```ts
const rex = new Hond("Rex", 3);
const bella = new Hond("Bella", 5);

console.log(rex.naam); // "Rex"
console.log(bella.leeftijd); // 5
```

`rex` en `bella` zijn twee losse objecten, elk met hun eigen `naam` en `leeftijd`, maar gemaakt uit
dezelfde mal. Het type van `rex` is trouwens gewoon `Hond`, een class is ook meteen een type
(sectie 7).

## 4. Methodes: het gedrag

Functies binnen een class heten **methodes**. Je schrijft ze zoals gewone functies (met
parameter- en return-types, Module 3), maar zonder het woord `function`:

```ts
class Rechthoek {
  breedte: number;
  hoogte: number;

  constructor(breedte: number, hoogte: number) {
    this.breedte = breedte;
    this.hoogte = hoogte;
  }

  oppervlakte(): number {
    return this.breedte * this.hoogte;
  }
}

const r = new Rechthoek(3, 4);
console.log(r.oppervlakte()); // 12
```

Een methode kan de eigen properties gebruiken (via `this`, zie hieronder) en gewoon iets
teruggeven of loggen, precies zoals een functie.

## 5. Wat is `this`?

Binnen een class verwijst **`this`** naar *het object zelf* waarop je werkt. Zo weet een methode
welke `naam` of `breedte` hij moet gebruiken, namelijk die van het exemplaar waarop hij is aangeroepen:

```ts
const rex = new Hond("Rex", 3);
const bella = new Hond("Bella", 5);

rex.blaf(); // in blaf() is 'this' -> rex,  dus this.naam is "Rex"
bella.blaf(); // in blaf() is 'this' -> bella, dus this.naam is "Bella"
```

Zonder `this` zou de methode niet weten van wélk object hij de `naam` moet pakken. Vuistregel: wil
je binnen een class bij een eigen property of methode, zet er **`this.`** voor.

## 6. Overerving met `extends` en `super`

Soms is een class een uitgebreidere versie van een andere. Een `Student` *is* een `Persoon`, met
iets extra. Met **`extends`** laat je een class voortbouwen op een andere (overerving), en met
**`super`** roep je de constructor (of een methode) van de ouder aan:

```ts
class Persoon {
  naam: string;
  leeftijd: number;

  constructor(naam: string, leeftijd: number) {
    this.naam = naam;
    this.leeftijd = leeftijd;
  }

  begroet(): string {
    return `Hallo, ik ben ${this.naam}.`;
  }
}

class Student extends Persoon {
  richting: string;

  constructor(naam: string, leeftijd: number, richting: string) {
    super(naam, leeftijd); // roept de constructor van Persoon aan (verplicht vóór 'this')
    this.richting = richting;
  }

  // we 'overschrijven' begroet() met een eigen versie
  begroet(): string {
    return `${super.begroet()} Ik studeer ${this.richting}.`;
  }
}

const s = new Student("Sara", 20, "TypeScript");
console.log(s.begroet()); // "Hallo, ik ben Sara. Ik studeer TypeScript."
```

Wat hier gebeurt:
- `Student extends Persoon` → `Student` erft `naam`, `leeftijd` en `begroet()` van `Persoon`.
- `super(...)` in de constructor draait eerst de constructor van `Persoon` (dat **moet** vóór je
  `this` gebruikt).
- `begroet()` wordt **overschreven**: de Student-versie roept met `super.begroet()` de
  ouder-versie aan en vult die aan.

## 7. Een class is ook een type (en kan een interface `implements`)

Zodra je een class schrijft, heb je er meteen een **type** bij met dezelfde naam. Je kunt het dus
overal als type gebruiken (Module 4):

```ts
function beschrijf(persoon: Persoon): void {
  console.log(persoon.begroet());
}

beschrijf(new Student("Sara", 20, "TS")); // ✅ een Student is ook een Persoon
```

Je kunt een class ook laten beloven dat hij een bepaalde vorm heeft met **`implements`** en een
interface (Module 4). De compiler controleert dan of de class alles heeft wat de interface eist:

```ts
interface Begroetbaar {
  begroet(): string;
}

class Robot implements Begroetbaar {
  begroet(): string {
    return "BEEP. Hallo mens.";
  }
}
```

Vergeet `Robot` de methode `begroet`, dan klaagt TypeScript, precies wat je wil.

> Eén zin over **decorators**: je ziet in sommige frameworks `@Iets` boven een class of property
> staan; dat zijn *decorators*, een extra (geavanceerde) syntax die we in deze cursus niet
> gebruiken. Goed om te herkennen, meer niet.

## Samenvatting

- Een **class** is een blauwdruk voor objecten die **data** (properties) en **gedrag** (methodes)
  combineren.
- **Properties** declareer je met een type; de **constructor** vult ze (met `strict` aan is dat
  verplicht).
- Met **`new ClassNaam(...)`** maak je een concreet object (instance); de argumenten gaan naar de
  constructor.
- **Methodes** zijn functies in een class (met parameter-/return-types), en gebruiken **`this`** om
  bij de eigen properties te komen.
- **`extends`** laat een class voortbouwen op een andere (overerving); **`super`** roept de
  constructor/methode van de ouder aan; je kunt methodes **overschrijven**.
- Een class is ook meteen een **type**, en kan met **`implements`** beloven dat hij een interface
  volgt.

## Oefeningen

Maak `src/module06.ts`. Laat `tsc --watch` meelopen en draai met `node dist/module06.js`.

1. **Basis-class.** Maak een class `Hond` met een property `naam: string`, een constructor die die
   vult, en een methode `blaf(): void` die `"<naam> zegt: Woef!"` logt. Maak een `Hond` met `new`
   en roep `blaf()` aan.

2. **Property + methode met return-type.** Maak een class `Rechthoek` met `breedte` en `hoogte`
   (beide number) en een methode `oppervlakte(): number`. Maak een rechthoek van 3 bij 4 en log de
   oppervlakte.

3. **`this` en toestand.** Maak een class `Teller` met een property `stand: number` die op 0 start
   (vul in de constructor). Geef hem methodes `verhoog(): void` (stand + 1) en `toon(): void` (logt
   de stand). Verhoog drie keer en toon.

4. **Constructor met meerdere parameters.** Maak een class `Persoon` met `naam` en `leeftijd`, en
   een methode `begroet(): string` die `"Hallo, ik ben <naam>."` teruggeeft. Maak een persoon en
   log het resultaat van `begroet()`.

5. **Overerving.** Maak een class `Student` die `Persoon` uitbreidt (`extends`) met een extra
   property `richting`. Roep in de constructor `super(...)` aan. Overschrijf `begroet()` zodat hij
   met `super.begroet()` de zin aanvult met `" Ik studeer <richting>."`. Test het.

6. **`implements`.** Maak een interface `Begroetbaar` met een methode `begroet(): string`. Maak een
   class `Robot implements Begroetbaar` die die methode invult. Maak een robot en log zijn groet.

7. **Uitdaging: een bankrekening.** Maak een class `Bankrekening` met een property `saldo: number`
   (start op 0). Geef hem `storten(bedrag: number): void` (verhoogt saldo) en
   `opnemen(bedrag: number): void` die alleen opneemt als er genoeg saldo is, en anders een
   waarschuwing logt. Voeg `toonSaldo(): void` toe. Test met een paar stortingen en opnames.

Klaar? In **Module 7** kijken we naar **type modifiers**: `readonly`, optionele en
toegangsmodifiers (`private`, `public`) en `as const`, waarmee je nog beter afdwingt wat er met je
data mag gebeuren, ook binnen classes.
