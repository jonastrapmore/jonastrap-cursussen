# Module 7: Type modifiers (readonly, optioneel, access & as const)

Je kunt inmiddels beschrijven *welke* vorm data heeft (objecten, classes, unions). In deze module
leer je **modifiers**: kleine sleutelwoorden die je aan een property of parameter hangt om af te
dwingen wat er *mee mag gebeuren*. Mag een waarde nog veranderen (`readonly`)? Mag hij ontbreken
(`?`)? Wie mag erbij (`private`, `public`, `protected`)? En hoe bevries je een hele waarde in één
keer (`as const`)? Zo maak je je types niet alleen correct, maar ook **veilig**.

> Werk in `src/module07.ts`. Laat `tsc --watch` meelopen en draai met `node dist/module07.js`.

## 1. `readonly`: niet meer wijzigen na het instellen

Zet je **`readonly`** voor een property, dan mag je die na het aanmaken **niet meer veranderen**.
Handig voor waarden die vastliggen, zoals een id:

```ts
type Boek = {
  readonly isbn: string; // ligt vast
  titel: string; // mag wél wijzigen
};

let boek: Boek = { isbn: "978-90-000", titel: "TypeScript" };

boek.titel = "TypeScript 2e druk"; // ✅ mag
boek.isbn = "111"; // ❌ Cannot assign to 'isbn' because it is a read-only property
```

`readonly` bewaakt dus dat een waarde na het instellen niet per ongeluk overschreven wordt. Let op:
het geldt alleen tijdens het **compileren**, het is een afspraak die TypeScript afdwingt, niet een
slot in de draaiende JavaScript.

> Ook arrays kun je bevriezen: `readonly number[]` (of `ReadonlyArray<number>`). Daarop werken
> `push`, `pop` en dergelijke niet meer, de lijst ligt vast. Handig als een functie een array
> alleen mag *lezen*.

## 2. Optioneel (`?`) als modifier

De `?` die je bij functie-parameters (Module 3) en object-properties (Module 4) zag, is óók een
modifier: hij zegt *"deze mag ontbreken"* (en is dan `undefined`). We halen 'm hier even terug in
het rijtje, want je combineert modifiers vaak:

```ts
type Gebruiker = {
  readonly id: number; // vast
  naam: string; // verplicht
  bijnaam?: string; // optioneel (string | undefined)
};
```

Zo lees je in één oogopslag de "spelregels" van elke property: `id` ligt vast, `naam` moet er zijn,
`bijnaam` mag weg.

## 3. Toegangsmodifiers in classes: `public`, `private`, `protected`

Bij classes (Module 6) kun je per property/methode bepalen **wie erbij mag**. Dat doe je met een
**toegangsmodifier**:

- **`public`** (standaard): overal toegankelijk, ook buiten de class.
- **`private`**: alleen **binnen dezelfde class**.
- **`protected`**: binnen de class **én in subclasses** (via `extends`), maar niet daarbuiten.

```ts
class Bankrekening {
  private saldo: number; // alleen de class zelf mag hieraan

  constructor() {
    this.saldo = 0;
  }

  storten(bedrag: number): void {
    this.saldo += bedrag; // ✅ binnen de class mag het
  }

  toonSaldo(): void {
    console.log(`Saldo: € ${this.saldo}`);
  }
}

const rekening = new Bankrekening();
rekening.storten(100); // ✅ via een public methode
rekening.saldo = 999999; // ❌ Property 'saldo' is private and only accessible within class 'Bankrekening'
```

Dit heet **inkapseling** (`encapsulation`): je verbergt de interne data (`saldo`) en dwingt af dat
anderen er alleen via je nette methodes (`storten`, `toonSaldo`) bij komen. Zo kan niemand het saldo
zomaar op een onmogelijke waarde zetten.

`protected` zit ertussenin, subclasses mogen er wél bij:

```ts
class Dier {
  protected naam: string;
  constructor(naam: string) {
    this.naam = naam;
  }
}

class Hond extends Dier {
  blaf(): void {
    console.log(`${this.naam} blaft`); // ✅ subclass mag bij 'protected'
  }
}
```

> TypeScript kent ook nog `#` als **echt** privé (bijv. `#saldo`), dat is JavaScript-native en ook
> op runtime afgeschermd. `private` van TypeScript geldt alleen tijdens het compileren. Voor deze
> cursus gebruiken we `private`; goed om `#` te herkennen.

## 4. Korte schrijfwijze: parameter properties

Het patroon "property declareren + in de constructor toewijzen" (Module 6) kan met een
toegangsmodifier **veel korter**. Zet je een modifier vóór een constructor-parameter, dan maakt en
vult TypeScript de property automatisch:

```ts
class Persoon {
  constructor(
    public naam: string,
    private leeftijd: number,
  ) {}
  // geen aparte property-declaraties en geen this.naam = naam nodig!

  begroet(): string {
    return `Hallo, ik ben ${this.naam} (${this.leeftijd}).`;
  }
}

const p = new Persoon("Jonas", 39);
console.log(p.naam); // ✅ public
// console.log(p.leeftijd); // ❌ 'leeftijd' is private
```

Dit is exact hetzelfde als de lange vorm uit Module 6, maar compacter. Je ziet het heel vaak in
echte TypeScript-code. De lange vorm blijft prima; kies wat je duidelijk vindt.

## 5. `readonly` in classes combineren

Modifiers combineer je vrij. In een class is `readonly id` samen met een toegangsmodifier heel
gangbaar, een id die van buitenaf leesbaar is maar nooit wijzigt:

```ts
class Gebruiker {
  constructor(
    public readonly id: number,
    public naam: string,
  ) {}
}

const u = new Gebruiker(1, "Sara");
console.log(u.id); // ✅ lezen mag
u.naam = "Sara V."; // ✅ naam mag wijzigen
u.id = 2; // ❌ Cannot assign to 'id' because it is a read-only property
```

Lees `public readonly id` als: *"iedereen mag 'm lezen, niemand mag 'm veranderen."*

## 6. `as const`: bevries een hele waarde

Met **`as const`** achter een waarde zeg je: *"behandel dit als volledig vast."* Twee effecten
tegelijk: alle properties worden **`readonly`**, en de types worden de **exacte literals** (Module 5)
in plaats van de brede types:

```ts
const kleur = { naam: "rood", hex: "#f00" };
// type: { naam: string; hex: string } -> naam is 'string', en mag wijzigen

const kleurVast = { naam: "rood", hex: "#f00" } as const;
// type: { readonly naam: "rood"; readonly hex: "#f00" } -> exacte waarden, alles readonly

kleurVast.naam = "blauw"; // ❌ Cannot assign to 'naam' because it is a read-only property
```

Zonder `as const` leidt TypeScript het brede type `string` af (want een gewone property mag
wijzigen). Mét `as const` wordt het de literal `"rood"` en ligt alles vast. Dat werkt ook op arrays,
die worden een vaste, `readonly` lijst:

```ts
const richtingen = ["noord", "oost", "zuid", "west"] as const;
richtingen.push("omhoog"); // ❌ push bestaat niet op een readonly array
```

> Handig patroon: uit zo'n bevroren array kun je zelfs een literal-union afleiden
> (`type Richting = typeof richtingen[number]` → `"noord" | "oost" | "zuid" | "west"`). Dat is een
> vooruitblik; onthoud voor nu vooral: `as const` = "alles vast en exact".

## Samenvatting

- **`readonly`** maakt een property (of array) onveranderlijk na het instellen (compile-time
  bewaking).
- **`?`** is de modifier "mag ontbreken" (optioneel, type `| undefined`).
- **Toegangsmodifiers** in classes bepalen wie erbij mag: **`public`** (overal, standaard),
  **`private`** (alleen de class), **`protected`** (class + subclasses). Dit heet inkapseling.
- **Parameter properties** (`constructor(public naam: string)`) declareren én vullen een property in
  één keer, de korte vorm van Module 6.
- Modifiers combineer je (bijv. `public readonly id`).
- **`as const`** bevriest een hele waarde: alles `readonly` én exacte literal-types.

## Oefeningen

Maak `src/module07.ts`. Laat `tsc --watch` meelopen en draai met `node dist/module07.js`.

1. **`readonly` op een object.** Maak een type `Boek` met `readonly isbn: string` en
   `titel: string`. Maak een boek. Wijzig de titel (mag) en probeer daarna de isbn te wijzigen
   (bekijk de fout, haal 'm weer weg).

2. **`readonly` in een class.** Maak een class `Gebruiker` met een `readonly id: number` en een
   `naam: string`, gevuld in de constructor. Maak een gebruiker, log de id, en probeer de id te
   overschrijven (bekijk de fout).

3. **`private` (inkapseling).** Maak een class `Bankrekening` met een `private saldo: number` (start
   0), en methodes `storten(bedrag)` en `toonSaldo()`. Stort iets en toon het saldo. Probeer daarna
   van buitenaf `rekening.saldo = 999` (bekijk de fout, haal 'm weer weg).

4. **`protected`.** Maak een class `Dier` met een `protected naam: string`. Maak een subclass `Kat`
   (`extends Dier`) met een methode die `"<naam> miauwt"` logt (gebruikt `this.naam`). Maak een kat
   en roep de methode aan. Probeer `kat.naam` van buitenaf (bekijk de fout).

5. **Parameter properties.** Herschrijf een kleine class (bijv. `Punt` met `x` en `y`) met de korte
   schrijfwijze: `constructor(public x: number, public y: number) {}`. Maak een punt en log `x`
   en `y`.

6. **`as const` op een object.** Maak `const config = { taal: "nl", versie: 1 } as const`. Log
   `config.taal`. Probeer `config.taal = "en"` (bekijk de fout).

7. **`as const` op een array (uitdaging).** Maak `const dagen = ["ma", "di", "wo"] as const`. Log de
   eerste dag. Probeer `dagen.push("do")` (bekijk de fout) en leg in commentaar uit waarom het niet
   mag.

Klaar? In **Module 8** komen **generics**, types die je flexibel maakt (herbruikbaar voor
meerdere types), plus een set veelgebruikte **utility types** (`Partial`, `Pick`, `Omit`,
`Record`) die je dagelijkse werk een stuk korter maken.
