# Module 8: Generics en utility types

Soms wil je code schrijven die met **veel verschillende types** werkt, zonder voor elk type
opnieuw te beginnen én zonder terug te vallen op het onveilige `any`. Daarvoor bestaan
**generics**: types die je als een soort *parameter* meegeeft, zodat één functie of type flexibel
met van alles overweg kan, en tóch typeveilig blijft. In het tweede deel bekijken we een handige
set kant-en-klare **utility types** die zelf op generics gebouwd zijn en je dagelijkse werk korter
maken.

> Werk in `src/module08.ts`. Laat `tsc --watch` meelopen en draai met `node dist/module08.js`.

## 1. Het probleem: herbruikbaar zonder `any`

Stel je wil een functie die het eerste element uit een lijst teruggeeft. Voor getallen:

```ts
function eersteGetal(lijst: number[]): number {
  return lijst[0];
}
```

Wil je hetzelfde voor strings, dan moet je 'm overschrijven. Voor booleans nóg eens. Vervelend. De
verleiding is dan om `any` te gebruiken:

```ts
function eerste(lijst: any[]): any {
  return lijst[0];
}

const naam = eerste(["Jonas", "Sara"]); // type: any -> ALLE bescherming weg
naam.toFixed(2); // geen fout, terwijl dit onzin is op een string
```

Dat werkt, maar je verliest álle typecontrole (Module 1): het resultaat is `any`, dus TypeScript
laat je er alles mee doen. Generics lossen precies dit op.

## 2. Je eerste generic: een functie met `<T>`

Met een **type-parameter** (traditioneel `T`, van *Type*) zeg je: *"welk type erin gaat, weet ik
nu nog niet, maar wat het ook is, ik gebruik overal hetzelfde."* Je zet 'm tussen punthaken achter
de functienaam:

```ts
function eerste<T>(lijst: T[]): T {
  return lijst[0];
}
```

Lees dit als: *"`eerste` werkt met een type `T`; het krijgt een `T[]` en geeft een `T` terug."*
`T` is een **plaatshouder** die pas wordt ingevuld op het moment dat je de functie gebruikt:

```ts
const getal = eerste<number>([1, 2, 3]); // T = number  -> resultaat: number
const woord = eerste<string>(["a", "b"]); // T = string  -> resultaat: string

woord.toUpperCase(); // ✅ TS weet: string
getal.toUpperCase(); // ❌ 'toUpperCase' does not exist on type 'number'
```

Anders dan bij `any` blijft het type dus **behouden**: stop je strings erin, dan weet TypeScript dat
er een string uitkomt, met alle bescherming en autocomplete.

## 3. Inference: de punthaken mag je vaak weglaten

Net als bij gewone types (Module 1) kan TypeScript het type-argument meestal **zelf afleiden** uit
wat je meegeeft. Dan hoef je `<number>` niet eens te schrijven:

```ts
const getal = eerste([1, 2, 3]); // TS leidt af: T = number
const woord = eerste(["a", "b"]); // TS leidt af: T = string
```

Je ziet `<...>` daarom in de praktijk vaak niet staan bij het *aanroepen*, alleen bij het
*definiëren*. Schrijf het type-argument expliciet als TypeScript het niet kan raden of als je het
wil verduidelijken.

## 4. Meerdere type-parameters

Je mag er meer dan één hebben, gescheiden met komma's. Klassiek voorbeeld: een functie die van twee
losse waarden een paar (tuple, Module 2) maakt:

```ts
function paar<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

const p = paar("leeftijd", 39); // type: [string, number]
console.log(p); // ["leeftijd", 39]
```

`A` en `B` kunnen elk een ander type zijn; TypeScript houdt ze uit elkaar. De namen (`T`, `A`, `B`,
`K`, `V`) zijn conventie, je mag ze ook `Item` of `Sleutel` noemen als dat duidelijker is.

## 5. Constraints: `T` inperken met `extends`

Soms wil je niet *echt* elk type toelaten, maar alleen types die aan een voorwaarde voldoen. Met
**`extends`** leg je een **constraint** (beperking) op: *"`T` mag alles zijn, zolang het minstens
dit heeft."*

```ts
function toonId<T extends { id: number }>(item: T): void {
  console.log(item.id); // ✅ mag: elke T heeft gegarandeerd een id
}

toonId({ id: 1, naam: "Jonas" }); // ✅ heeft een id
toonId({ naam: "Sara" }); // ❌ Property 'id' is missing (voldoet niet aan de constraint)
```

Zonder de constraint zou `item.id` een fout geven, want een willekeurige `T` heeft niet per se een
`id`. Met `T extends { id: number }` beloof je dat elk toegelaten type er minstens één heeft, en
dus mag je `item.id` gebruiken. Merk op: dit is dezelfde `extends` als bij interfaces (Module 4),
in een andere context.

## 6. Generieke types, interfaces en de ingebouwde generics

Niet alleen functies, ook **types, interfaces en classes** kunnen generiek zijn. Zo maak je een
herbruikbare "houder":

```ts
interface Box<T> {
  inhoud: T;
}

const doosMetTekst: Box<string> = { inhoud: "hoi" };
const doosMetGetal: Box<number> = { inhoud: 42 };

doosMetTekst.inhoud.toUpperCase(); // ✅ TS weet: string
```

Je gaf dit soort dingen eigenlijk al door zonder het te beseffen. Weet je nog `Array<number>` uit
Module 2? Dat ís een generic: `Array<T>` is een ingebouwd generiek type, en `number[]` is gewoon de
korte schrijfwijze van `Array<number>`. Ook `Promise<T>` (voor later, bij async) en veel
bibliotheek-types werken zo. Vanaf nu herken je de `< >` overal: het is een type dat je "invult".

## 7. Utility types: kant-en-klare generics

TypeScript levert een set **utility types** mee: generieke types die een bestaand type
*omvormen* tot een variant. Je hoeft ze niet zelf te schrijven, je gebruikt ze gewoon. De
belangrijkste, met als basis:

```ts
interface Gebruiker {
  id: number;
  naam: string;
  email: string;
}
```

**`Partial<T>`** — maakt alle properties optioneel. Ideaal voor "een update met alleen de gewijzigde
velden":

```ts
type GebruikerUpdate = Partial<Gebruiker>;
// { id?: number; naam?: string; email?: string }
```

**`Required<T>`** — het omgekeerde: maakt alles verplicht (heft optionele `?` op).

**`Readonly<T>`** — maakt alle properties `readonly` (Module 7), in één keer voor het hele type:

```ts
type VasteGebruiker = Readonly<Gebruiker>; // id/naam/email allemaal readonly
```

**`Pick<T, Keys>`** — houdt alléén de genoemde properties over:

```ts
type NaamEnId = Pick<Gebruiker, "id" | "naam">;
// { id: number; naam: string }
```

**`Omit<T, Keys>`** — het spiegelbeeld: alles behalve de genoemde properties. Perfect om iets
gevoeligs weg te laten:

```ts
type PubliekeGebruiker = Omit<Gebruiker, "email">;
// { id: number; naam: string }
```

**`Record<Keys, V>`** — bouwt een object-type met bepaalde sleutels en waarden van één type:

```ts
type Voorraad = Record<string, number>; // een object met string-sleutels en number-waarden
const kraam: Voorraad = { appels: 3, peren: 5 };
```

> Deze zes (`Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`) dekken veruit de meeste
> gevallen. Er zijn er nog een paar meer, maar met deze kom je heel ver. Belangrijk inzicht: het
> zijn gewoon **generics die je invult** met een type (en soms met sleutels), precies wat je in dit
> hoofdstuk geleerd hebt.

## Samenvatting

- **Generics** maken code herbruikbaar voor meerdere types **zonder** de bescherming van `any` te
  verliezen.
- Een **type-parameter** (`<T>`) is een plaatshouder die pas bij gebruik wordt ingevuld; het type
  blijft behouden (`eerste([1,2,3])` → `number`).
- TypeScript **leidt** het type-argument meestal zelf af; expliciete `<...>` is vaak niet nodig.
- Je kunt **meerdere** type-parameters hebben (`<A, B>`), en ze **inperken** met een constraint
  (`<T extends { id: number }>`).
- Ook **types/interfaces/classes** kunnen generiek zijn (`Box<T>`); `Array<T>` en `Promise<T>` zijn
  ingebouwde voorbeelden.
- **Utility types** zijn kant-en-klare generics die een type omvormen: `Partial`, `Required`,
  `Readonly`, `Pick`, `Omit`, `Record`.

## Oefeningen

Maak `src/module08.ts`. Laat `tsc --watch` meelopen en draai met `node dist/module08.js`.

1. **Je eerste generic.** Schrijf een generieke functie `eerste<T>(lijst: T[]): T` die het eerste
   element teruggeeft. Roep 'm aan met een `number[]` en met een `string[]`, en log beide
   resultaten. Merk op dat je de `<...>` niet hoeft te schrijven (inference).

2. **Generic met bewerking.** Schrijf `omdraai<T>(lijst: T[]): T[]` die een **omgekeerde kopie** van
   de lijst teruggeeft (tip: `[...lijst].reverse()`). Test met een lijst getallen en een lijst
   strings.

3. **Meerdere type-parameters.** Schrijf `paar<A, B>(a: A, b: B): [A, B]`. Maak er een paar mee van
   een string en een number, en log het.

4. **Constraint.** Schrijf `toonId<T extends { id: number }>(item: T): void` die `item.id` logt.
   Roep aan met een object dat een `id` heeft. Probeer een object zónder `id` en bekijk de fout.

5. **Generieke interface.** Maak een interface `Box<T>` met een property `inhoud: T`. Maak een
   `Box<string>` en een `Box<number>`, en log van beide de inhoud.

6. **`Partial` gebruiken.** Maak een interface `Gebruiker` (`id`, `naam`, `email`). Schrijf een
   functie `update(gebruiker: Gebruiker, wijzigingen: Partial<Gebruiker>): Gebruiker` die een nieuw
   object teruggeeft met de wijzigingen toegepast (tip: `{ ...gebruiker, ...wijzigingen }`). Test
   door alleen de `naam` te wijzigen.

7. **`Omit` en `Record` (uitdaging).** Maak met `Omit<Gebruiker, "email">` een type
   `PubliekeGebruiker` en maak er een variabele mee (zonder email). Maak daarnaast een
   `Record<string, number>` met een paar producten en hun aantal, en log er één.

Klaar? In **Module 9** ronden we het "taal"-deel af met **modules** (`import`/`export`) en de
**`tsconfig.json`**: hoe je code over meerdere bestanden verdeelt en wat al die compiler-opties
eigenlijk doen. Daarna stappen we over naar echte apps met Vite.
