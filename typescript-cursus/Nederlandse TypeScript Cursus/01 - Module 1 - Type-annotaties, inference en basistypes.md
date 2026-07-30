# Module 1: Type-annotaties, inference en basistypes

Nu het echte werk: **types**. Dit is de kern van TypeScript. In deze module leer je hoe je een
variabele een type geeft, hoe TypeScript vaak zélf het type al weet, en wat de basistypes zijn.

> Werk in je `src/`-map. Maak `module1.ts` en laat `tsc --watch` in je oefenmap
> meelopen (Module 0), zodat je fouten meteen ziet.

## 1. Een type-annotatie: de variabele een belofte geven

Een **type-annotatie** is een dubbele punt + een type, achter de naam van je variabele:

```ts
let leeftijd: number = 30;
let naam: string = "Jonas";
let isLid: boolean = true;
```

Lees `let leeftijd: number = 30;` als: *"leeftijd is een **number**, en de waarde is 30."* Je
belooft de compiler: in dit doosje komt alleen een getal. Probeer je later iets anders, dan
klaagt hij meteen:

```ts
leeftijd = 31;        // ✅ ook een getal
leeftijd = "eenendertig"; // ❌ Type 'string' is not assignable to type 'number'
```

Dit is de hele truc van TypeScript, samengevat in één regel: **je legt vast wat ergens in mag,
en de compiler bewaakt dat voor je.**

## 2. De drie basistypes

Net als in JavaScript zijn dit de meest gebruikte:

```ts
let prijs: number = 19.99;     // alle getallen: heel én met komma
let titel: string = "Cursus";  // tekst (enkele of dubbele quotes, of backticks)
let actief: boolean = false;   // true of false
```

- **`number`**, één type voor álle getallen (geen aparte int/float).
- **`string`**, tekst. Template literals werken net als in JS: `` `Hallo ${naam}` ``.
- **`boolean`**, `true` of `false`.

Let op de schrijfwijze: de types heten met **kleine letter** (`number`, niet `Number`). Die met
hoofdletter (`Number`, `String`) bestaan ook, maar die gebruik je vrijwel nooit, onthoud:
**kleine letter**.

## 3. Type inference: TypeScript raadt zelf mee

Hier komt iets verrassends. Je hoeft het type **niet altijd** op te schrijven. Als je meteen een
waarde geeft, **raadt TypeScript het type zelf**, dat heet **type inference**:

```ts
let prijs = 19.99; // TypeScript weet: dit is een number
prijs = "gratis";  // ❌ toch een fout! Type 'string' is not assignable to type 'number'
```

Ook al schreef je nergens `: number`, TypeScript zag de `19.99` en concludeerde "dit is een
number". Vanaf dan bewaakt hij dat. Beweeg in VS Code je muis over `prijs`, je ziet
`let prijs: number`, hoewel je dat zelf niet typte.

### Wanneer wél annoteren, wanneer laten raden?

Vuistregel:

> **Geef je meteen een waarde? Laat TypeScript raden** (schoner, minder typwerk).
> **Geef je (nog) geen waarde, of wil je het expliciet vastleggen? Annoteer dan.**

```ts
let score = 0;          // inference is prima: number
let gebruikersnaam;     // geen waarde -> type is 'any' (onveilig! zie verderop)
let leeftijd: number;   // beter: leg het type vast, ook zonder beginwaarde
leeftijd = 30;          // nu mag alleen een getal
```

Annoteren is vooral belangrijk bij **functie-parameters** (Module 3), want die hebben geen
beginwaarde waaruit TypeScript kan raden.

## 4. Het gevaarlijke type: `any`

Soms zie je het type **`any`** opduiken. `any` betekent: *"schakel alle typecontrole uit voor
deze variabele."* Het accepteert letterlijk alles:

```ts
let vanalles: any = 5;
vanalles = "tekst";   // ok
vanalles = true;      // ok
vanalles.bestaatNiet(); // ook ok voor de compiler... maar crasht straks!
```

`any` is een **ontsnappingsluik** dat de hele bescherming van TypeScript uitzet. Daarom:

> ⚠️ **Vermijd `any` zoveel mogelijk.** Het is "TypeScript zonder de voordelen van TypeScript".
> Met `strict: true` (jouw tsconfig) waarschuwt de compiler je ook als er per ongeluk ergens een
> `any` insluipt.

Hoe ontstaat `any` per ongeluk? Vooral bij een variabele zonder waarde én zonder annotatie:

```ts
let gegevens;        // type is 'any'  -> onveilig
gegevens = 5;
gegevens = "tekst";  // geen klacht, want any
```

Los het op door wél te annoteren of meteen een waarde te geven.

## 5. `unknown`: het veilige broertje van `any` (kort)

Er bestaat een veiliger alternatief voor "ik weet het type nog niet": **`unknown`**. Je mag er
ook alles in stoppen, maar je mag er pas iets *mee doen* nadat je hebt gecontroleerd wat het is:

```ts
let invoer: unknown = "42";
// invoer.toUpperCase();          // ❌ niet toegestaan: TS weet het type nog niet
if (typeof invoer === "string") {
  console.log(invoer.toUpperCase()); // ✅ nu weet TS dat het een string is
}
```

Je hoeft `unknown` nu nog niet veel te gebruiken, maar onthoud: **`unknown` is veilig, `any`
is gevaarlijk.** Kom je later `any` tegen in voorbeelden, dan weet je dat het meestal beter kan.

## 6. Type-fouten leren lezen

De foutmeldingen van TypeScript zijn je vrienden, net als de console-fouten in JavaScript. De
allervaakste:

```
Type 'string' is not assignable to type 'number'.
```

Lees dit als: *"je probeert een **string** te stoppen op een plek waar een **number** hoort."*
Het patroon is altijd `Type 'X' is not assignable to type 'Y'` → je gaf X, maar Y werd verwacht.

In VS Code zie je deze fouten als een **rood kringeltje**; beweeg je muis erover voor de
volledige melding. Je hoeft niet te wachten op `tsc`, de editor checkt live mee.

## 7. Een handig hulpmiddel: de TypeScript Playground

Wil je iets snel uitproberen zonder bestanden te maken? Ga naar **typescriptlang.org/play**.
Daar typ je TypeScript links en zie je rechts meteen de gecompileerde JavaScript én de fouten.
Ideaal om een type-idee even te testen. (Voor de oefeningen gebruik je gewoon je eigen oefenmap.)

## Samenvatting

- Een **type-annotatie** (`let x: number = 5`) legt vast welk type in een variabele mag; de
  compiler bewaakt dat.
- De drie **basistypes**: `number`, `string`, `boolean` (kleine letter!).
- **Type inference**: geef je meteen een waarde, dan raadt TypeScript het type zelf, annoteren
  is dan niet nodig.
- Annoteer vooral als er **geen beginwaarde** is (en altijd bij functie-parameters, Module 3).
- **`any`** zet alle controle uit → **vermijden**. **`unknown`** is het veilige alternatief.
- Foutmelding `Type 'X' is not assignable to type 'Y'` = je gaf X, maar Y werd verwacht.

## Oefeningen

Maak `src/module1.ts`. Laat `tsc --watch` meelopen en draai met `node dist/module1.js`.

1. **Basistypes.** Maak drie variabelen met expliciete annotaties: een `number` (je leeftijd),
   een `string` (je naam), een `boolean` (of je TypeScript leuk vindt). Log ze.

2. **Inference bewijzen.** Maak `let punten = 100;` (zónder annotatie). Beweeg je muis over
   `punten` in VS Code en noteer in commentaar welk type TypeScript zelf koos. Probeer dan
   `punten = "veel";` en bekijk de foutmelding.

3. **Fout uitlokken & lezen.** Maak `let temperatuur: number = 20;` en daarna
   `temperatuur = "warm";`. Noteer de exacte foutmelding in commentaar. Herstel het daarna.

4. **`any` herkennen.** Maak `let mysterie;` (zonder waarde, zonder type). Beweeg je muis
   erover: welk type kreeg het? Stop er daarna achtereenvolgens een getal, tekst en boolean in.
   Waarom klaagt TypeScript niet? Schrijf je antwoord in commentaar.

5. **`any` oplossen.** Herschrijf oefening 4 zó dat `mysterie` veilig is: geef het een echt
   type (bijv. `number`) of een beginwaarde, zodat TypeScript wél bewaakt wat erin mag.

6. **Template literal.** Maak met je variabelen uit oefening 1 één zin via een template literal
   (`` `...${...}...` ``) en log die. (Werkt precies zoals in JavaScript.)

Klaar? In **Module 2** kijken we naar collecties: **arrays, tuples en enums**, en hoe je die
typt.
