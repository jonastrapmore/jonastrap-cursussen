# Module 9: Modules (import/export) en tsconfig

Tot nu toe stopte je alles in één bestand per module. In een echt project verdeel je je code juist
over **meerdere bestanden** die elkaar dingen doorgeven, dat heten **modules**. In het eerste deel
leer je `export` en `import`. In het tweede deel kijken we eindelijk grondig naar je
**`tsconfig.json`**: wat al die opties doen, en wat `tsc` nu eigenlijk van je code maakt. Dit is de
laatste module van het "kale `tsc`"-deel; daarna stappen we over naar echte apps met Vite.

> Werk in `src/module09.ts` (en je maakt er extra bestanden bij). Laat `tsc --watch` meelopen en
> draai met `node dist/module09.js`.

## 1. Waarom code opsplitsen?

Eén reuzenbestand met alles erin wordt snel onoverzichtelijk en onwerkbaar in een team. Daarom
splits je je code op: wiskunde-hulpjes in het ene bestand, je gebruikers-types in het andere, enz.
Elk bestand houdt zijn eigen spullen **privé**, tenzij je expliciet zegt dat iets **naar buiten**
mag. Dat "naar buiten mogen" doe je met `export`, en het "binnenhalen" met `import`.

> Weet je nog `moduleDetection: "force"` in je tsconfig (Module 0)? Dat zorgt ervoor dat **elk
> bestand een eigen module** is, met een eigen scope. Daarom botsten je gelijknamige variabelen in
> `module01.ts`, `module02.ts`… nooit met elkaar. Zonder modules zouden al die bestanden één grote
> gedeelde ruimte delen.

## 2. Exporteren met `export`

Zet **`export`** voor iets (een functie, `const`, `type`, `interface`, `class`) om het beschikbaar
te maken voor andere bestanden:

```ts
// bestand: wiskunde.ts
export function tel(a: number, b: number): number {
  return a + b;
}

export const PI = 3.14159;

export interface Punt {
  x: number;
  y: number;
}

// dit blijft privé (geen export) -> alleen bruikbaar binnen wiskunde.ts
function intern() {
  return "geheim";
}
```

Alles met `export` ervoor kan elders geïmporteerd worden; de rest blijft binnen het bestand.

## 3. Importeren met `import`

In een ander bestand haal je die dingen binnen met **`import { ... } from "..."`**. Het pad wijst
naar het bronbestand, **zonder** de extensie, en met `./` voor "in dezelfde map":

```ts
// bestand: module09.ts
import { tel, PI } from "./wiskunde";

console.log(tel(2, 3)); // 5
console.log(PI); // 3.14159
```

De namen tussen de accolades moeten **exact** matchen met wat het andere bestand exporteert (dit
heten *named imports*). Wil je iets een andere naam geven bij het importeren, gebruik dan `as`:

```ts
import { tel as optellen } from "./wiskunde";
console.log(optellen(4, 5)); // 9
```

## 4. `export default`: de standaard-export

Naast benoemde exports mag een bestand **één** `default`-export hebben: het "hoofdding" van dat
bestand. Die importeer je **zonder** accolades, en je mag hem elke naam geven:

```ts
// bestand: begroeting.ts
export default function begroet(naam: string): string {
  return `Hallo, ${naam}!`;
}
```

```ts
// bestand: module09.ts
import begroet from "./begroeting"; // geen accolades, naam kies je zelf
console.log(begroet("Sara")); // "Hallo, Sara!"
```

Je kunt named en default door elkaar gebruiken. Vuistregel: gebruik een **default** voor het ene
belangrijkste ding van een bestand, en **named exports** voor de rest. (In veel moderne codebases,
en later bij Vite, zie je overigens vooral named exports; beide zijn goed.)

## 5. Types importeren en exporteren

Ook je `type`s en `interface`s (Module 4) kun je exporteren en importeren, net als waarden. Omdat
types puur voor de compiler zijn (ze verdwijnen uit de uiteindelijke JavaScript), mag je ze met het
woordje `type` markeren, dan is meteen duidelijk dat het om een type gaat:

```ts
import { tel, type Punt } from "./wiskunde";

const p: Punt = { x: 1, y: 2 };
console.log(tel(p.x, p.y)); // 3
```

Dat `type` vóór `Punt` is optioneel maar netjes: het maakt expliciet dat `Punt` alleen een type is.

## 6. Onder de motorkap: wat maakt `tsc` hiervan?

Open na het compileren eens `dist/module09.js`. Omdat je tsconfig `"module": "commonjs"` heeft
staan, vertaalt `tsc` je moderne `import`/`export` naar de manier waarop **Node** modules laadt:
`require(...)` en `exports`. Bovenaan zie je dan zoiets:

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wiskunde_1 = require("./wiskunde");
console.log((0, wiskunde_1.tel)(2, 3));
```

Twee dingen om te herkennen:

- **`require(...)` en `exports`** zijn CommonJS, het oudere modulesysteem van Node. Jouw nette
  `import`/`export` is dus omgezet naar iets dat Node rechtstreeks begrijpt.
- **`Object.defineProperty(exports, "__esModule", { value: true })`** is een **markering**. Het
  zet een verborgen vlaggetje `__esModule` op de exports, waarmee TypeScript aangeeft: *"dit
  CommonJS-bestand kwam eigenlijk uit een ES-module (met `import`/`export`)."* Andere modules
  gebruiken dat vlaggetje om te weten hoe ze een `default`-import correct moeten koppelen. Kortom:
  een technisch hulpregeltje voor de samenwerking tussen het oude en het nieuwe modulesysteem, jij
  hoeft het nooit zelf te schrijven.

Dit is precies waarom we met `tsc` beginnen: je ziet letterlijk wat TypeScript van je code maakt.
Later (Vite) gebeurt dit soort omzetting ook, maar dan onzichtbaar.

## 7. De `tsconfig.json` ontleed

Je gebruikt je `tsconfig.json` al vanaf Module 0. Nu je genoeg gezien
hebt, snappen we elke regel. De belangrijkste opties:

```jsonc
{
  "compilerOptions": {
    "rootDir": "./src",          // waar jouw .ts-bestanden staan
    "outDir": "./dist",          // waar de gecompileerde .js terechtkomt
    "target": "esnext",          // naar welke JavaScript-versie we vertalen (modern)
    "module": "commonjs",        // welk modulesysteem de output gebruikt (require/exports)
    "moduleDetection": "force",  // behandel ELK bestand als een eigen module
    "strict": true,              // alle strenge typecontroles aan (heel belangrijk)
    "noEmitOnError": true,       // bij een typefout: schrijf GEEN .js weg
    "removeComments": true       // laat commentaar weg uit de gecompileerde .js
  }
}
```

Per optie, kort:

- **`rootDir` / `outDir`** — de in- en uitgang: `src/` in, `dist/` uit. Zo blijft je broncode
  netjes gescheiden van de gegenereerde JavaScript.
- **`target`** — naar welke JavaScript-versie `tsc` vertaalt. `esnext` = de nieuwste features; voor
  oudere omgevingen zou je bijv. `es2016` kiezen (dan zet `tsc` moderne syntax om naar iets ouds).
- **`module`** — het modulesysteem van de output. `commonjs` (`require`) draait Node rechtstreeks;
  in de browser/Vite gebruik je straks ES-modules.
- **`moduleDetection`** — met `force` is elk bestand een module met eigen scope (zie sectie 1).
- **`strict`** — zet in één klap alle strenge checks aan (o.a. dat parameters niet stilletjes
  `any` worden, en dat class-properties geïnitialiseerd zijn). Laat dit **altijd** aan.
- **`noEmitOnError`** — bij een typefout maakt `tsc` géén nieuwe `.js`. Zo draai je nooit per
  ongeluk kapotte code.
- **`removeComments`** — haalt commentaar uit de output (je broncode blijft ongemoeid).

Twee opties die je nu níét hebt, maar goed zijn om te kennen:

- **`sourceMap`** — genereert `.js.map`-bestanden die de gecompileerde `.js` terugkoppelen aan je
  `.ts`. Handig bij debuggen: je browser/editor toont dan je originele TypeScript i.p.v. de output.
- **`declaration`** — genereert `.d.ts`-bestanden: losse "type-only" bestanden die alleen de types
  van je code beschrijven. Dat is precies wat bibliotheken meeleveren zodat jij hun types ziet. We
  komen erop terug in **Module 14**.

> Belangrijk inzicht: **meer regels in je tsconfig ≠ beter.** De lange `tsconfig.json` die
> `tsc --init` genereert, staat vol uitgecommentarieerde, uitgezette opties, alleen de
> niet-uitgecommentarieerde regels tellen echt. Een korte, bewuste config zoals de jouwe is prima.

## Samenvatting

- **Modules** verdelen je code over bestanden; elk bestand houdt zijn spullen privé tenzij je ze
  **`export`**t.
- **`import { naam } from "./bestand"`** haalt named exports binnen (pad zonder extensie, `./` voor
  dezelfde map); hernoemen kan met **`as`**.
- **`export default`** markeert het hoofd-ding van een bestand; dat importeer je **zonder**
  accolades, met een naam naar keuze.
- Ook **types/interfaces** kun je exporteren/importeren (eventueel met `import { type X }`).
- `tsc` vertaalt je `import`/`export` naar het modulesysteem uit **`module`** (bij jou `commonjs`:
  `require`/`exports`), met een `__esModule`-markering voor de interop.
- In **`tsconfig.json`** stuur je het compileren: `rootDir`/`outDir`, `target`, `module`, `strict`,
  `noEmitOnError`, `removeComments`, en optioneel `sourceMap` en `declaration`. Kort en bewust > lang.

## Oefeningen

Werk in `src/` (met `tsc --watch`). Je maakt in deze module een paar bestanden aan.

1. **Named export/import.** Maak een bestand `wiskunde.ts` dat een functie `tel(a, b): number` en
   een `const PI` exporteert. Importeer ze in `module09.ts` en log `tel(2, 3)` en `PI`.

2. **Hernoemen met `as`.** Importeer `tel` in `module09.ts` nogmaals, maar onder de naam
   `optellen`, en log `optellen(4, 5)`.

3. **`export default`.** Maak een bestand `begroeting.ts` met een `export default` functie
   `begroet(naam): string`. Importeer die (zonder accolades) in `module09.ts` en log `begroet("Sara")`.

4. **Type exporteren.** Exporteer vanuit `wiskunde.ts` ook een `interface Punt { x: number; y: number }`.
   Importeer die in `module09.ts` (met `import { type Punt }`), maak een punt, en log het.

5. **Onder de motorkap.** Compileer en open `dist/module09.js`. Zoek de regel met
   `Object.defineProperty(exports, "__esModule", ...)` en een `require(...)`. Noteer in commentaar
   in `module09.ts` wat die `__esModule`-regel volgens jou doet (zie sectie 6).

6. **`sourceMap` proberen.** Zet tijdelijk `"sourceMap": true` in je `tsconfig.json`, compileer, en
   kijk welke extra bestanden er in `dist/` verschijnen. Zet 'm daarna weer uit. Noteer in
   commentaar wat je zag.

7. **`noEmitOnError` bewijzen (uitdaging).** Zet in `module09.ts` een bewuste typefout (bijv.
   `tel("twee", 3)`). Kijk of `tsc` een nieuwe `dist/module09.js` maakt of niet, en verklaar het in
   commentaar met de optie `noEmitOnError`. Haal de fout daarna weer weg.

Klaar? Hiermee zit het **taal-deel** erop. In **Module 10** maken we de grote overstap naar
**Vite + pnpm**: geen handmatige `tsc` meer, maar een moderne projecttool met een live dev-server,
waarmee we echte apps in de browser gaan bouwen.
