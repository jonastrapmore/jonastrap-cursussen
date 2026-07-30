# Module 14: Declaratiebestanden (.d.ts)

Je zag in elke examen-frontend een bestand `src/index.d.ts` staan, en in Module 9 kwam de
tsconfig-optie `declaration` al even voorbij. Tijd om te begrijpen wat een **declaratiebestand**
(`.d.ts`) is: een bestand met **alleen types, geen code**. Ze zijn de lijm tussen TypeScript en de
buitenwereld (JavaScript-libraries, niet-code-imports). Je gebruikt ze dagelijks zonder het te
beseffen, en op het examen heb je er zelf eentje nodig.

## 1. Wat is een `.d.ts`-bestand?

De extensie `.d.ts` staat voor **declaration** (declaratie). Zo'n bestand bevat **enkel
type-informatie**: interfaces, types, functie-*handtekeningen*, `declare`-statements… maar **geen
uitvoerbare code** (geen functie-*lichamen*, geen logica). Vergelijk:

```ts
// gewone .ts : type ÉN implementatie
export function tel(a: number, b: number): number {
  return a + b            // <- echte code
}
```

```ts
// .d.ts : alleen de belofte "deze functie bestaat en ziet er zo uit"
export declare function tel(a: number, b: number): number  // <- geen lichaam
```

Een `.d.ts` beschrijft dus **hoe iets eruitziet**, zonder te zeggen *hoe het werkt*. Bij het
compileren verdwijnen types sowieso; een `.d.ts` bevat per definitie alleen dat verdwijnende deel.
Het is puur voor de compiler en je editor (typecontrole + autocomplete).

## 2. Waarom bestaan ze? Types voor JavaScript-libraries

Het grootste nut: **types geven aan code die zelf geen TypeScript is.** Heel veel libraries zijn in
gewoon JavaScript geschreven. Zonder types zou TypeScript niet weten wat `express()` of
`dayjs().format()` teruggeeft. De oplossing: een `.d.ts` dat de vorm van die library beschrijft.

Twee gevallen:

- **De library levert zelf types mee.** Moderne pakketten bevatten vaak een `index.d.ts` in hun
  `node_modules`-map. Dan werkt autocomplete meteen na `pnpm add`.
- **De library heeft losse types.** Voor oudere JS-libraries staan de types in een apart pakket
  onder de **`@types/`**-noemer (bv. `@types/node`, `@types/express`). Die komen van een groot
  gemeenschapsproject (**DefinitelyTyped**). Je installeert ze als dev-dependency:

  ```bash
  pnpm add -D @types/express
  ```

  Je zag dit in de **server** van het examen: `@types/express`, `@types/cors`, `@types/node`… dat
  zijn allemaal `.d.ts`-pakketten die de types leveren voor JavaScript-libraries.

> Kortom: een `.d.ts` is een **type-jasje** rond code die zelf geen types heeft. `tsc` zoekt
> automatisch naar `.d.ts`-bestanden (in de library zelf of in `node_modules/@types`) om te weten
> hoe je die code mag gebruiken.

## 3. `declare module`: een module beloven — je examen-`index.d.ts`

Soms importeer je iets dat **helemaal geen JavaScript-module** is, en dan weet `tsc` niet wat het
ermee aan moet. Precies dat gebeurt met de **`?raw`-imports** uit Module 10:

```ts
import HTML from './navbar.html?raw'   // ❌ tsc: "Cannot find module './navbar.html?raw'"
```

`tsc` kent het bestandstype `.html?raw` niet, dat is een Vite-truc, geen echte module. Je moet `tsc`
dus **vertellen** dat zo'n import bestaat. Dat doe je met **`declare module`** in een `.d.ts`. Kijk
naar de `src/index.d.ts` uit je examen-frontend:

```ts
declare module '*html?raw'
declare module '*css'
```

Lees dit als: *"elke import die eindigt op `html?raw` (of `css`) is een geldige module, vertrouw me
maar."* De `*` is een **wildcard** die op om het even welk pad matcht (`./navbar.html?raw`,
`./parts.html?raw`, …). Hierdoor verdwijnt de foutmelding en mag je die bestanden importeren.

> **Detail:** deze declaraties hebben geen "body", dus het type van de import is `any`. Dat is prima
> om te compileren. Wil je het netter (de import als `string` typen), dan kun je in plaats daarvan de
> Vite-types laden met één regel: `/// <reference types="vite/client" />` (dat is wat een vers
> `pnpm create vite`-project in `vite-env.d.ts` zet). Beide lossen hetzelfde probleem op; het examen
> koos de korte `declare module`-variant.

Dit is meteen waarom je in Module 10 (het demo-project) een `vite-env.d.ts` **nodig** had: zonder
één van beide (`declare module` óf de vite-referentie) faalt de `tsc`-build op de `?raw`-import. Nu
weet je precies waarom.

## 4. Zelf een `.d.ts` genereren voor je eigen code

Draai je de rollen om, dan kun je van **jouw** code een `.d.ts` láten maken. In Module 9 zag je de
tsconfig-optie:

```jsonc
{
  "compilerOptions": {
    "declaration": true   // genereer naast .js ook .d.ts-bestanden
  }
}
```

Als je een **library** schrijft die anderen gebruiken, compileer je je `.ts` naar `.js` (de code die
draait) **plus** `.d.ts` (de types die andermans editor nodig heeft). Zo levert jouw pakket precies
dat "type-jasje" van sectie 2 mee. Voor gewone apps (zoals het examen) heb je dit niet nodig, maar
het maakt het plaatje rond: `.d.ts`-bestanden die je *gebruikt* van libraries, zijn op dezelfde
manier ooit *gegenereerd* uit hun broncode.

## 5. Kort: globale declaraties

`.d.ts`-bestanden kunnen ook dingen aan de **globale** omgeving toevoegen, zonder import. Twee die je
soms tegenkomt:

```ts
// een globale variabele beloven (bv. iets dat elders wordt ingeprikt)
declare const APP_VERSION: string

// het bestaande Window-type uitbreiden met een eigen property
declare global {
  interface Window {
    mijnApp: { ready: boolean }
  }
}
```

Je hebt dit voor het examen niet nodig, maar het verklaart hoe types als `window`, `document` of
`localStorage` "vanzelf" bestaan: ze komen uit de meegeleverde `.d.ts`-bestanden van TypeScript
(de `lib`-optie: `"DOM"`, die je in de Vite-tsconfig zag).

## Samenvatting

- Een **`.d.ts`** bevat **alleen types**, geen uitvoerbare code. Het beschrijft *hoe iets eruitziet*.
- Ze geven vooral **types aan JavaScript-libraries**: meegeleverd door de library zelf, of via een
  **`@types/...`**-pakket (van DefinitelyTyped). `tsc` vindt ze automatisch.
- **`declare module '*html?raw'`** (je examen-`index.d.ts`) vertelt `tsc` dat zulke imports bestaan;
  zo werken de Vite-`?raw`-imports. Alternatief: `/// <reference types="vite/client" />`.
- Met **`declaration: true`** genereer je zelf `.d.ts` voor je eigen library (contract voor
  gebruikers).
- **Globale declaraties** (`declare global`, `declare const`) verklaren waarom types als `window` en
  `document` vanzelf bestaan (uit TypeScript's eigen `lib`-`.d.ts`-bestanden).

## Oefeningen

Werk in de cursus-app (`pc-builder-app`) of het Module 10-demo.

> **Zelfreflectie, geen oplossing:** dit zijn onderzoek-/observeeroefeningen; je noteert je
> bevindingen zelf.

1. **Je examen-`index.d.ts` lezen.** Open `frontend/src/index.d.ts`. Noteer wat de twee regels
   `declare module '*html?raw'` en `declare module '*css'` volgens jou oplossen (denk aan de
   `?raw`-imports).

2. **De fout uitlokken.** Hernoem `index.d.ts` tijdelijk naar `index.d.ts.bak` en draai `pnpm build`.
   Welke foutmelding krijg je, en bij welke regels? Verklaar waarom. Zet het bestand daarna terug.

3. **`@types` herkennen.** Open de `package.json` van het **server**-project. Zoek de `devDependencies`
   die met `@types/` beginnen. Noteer voor welke JavaScript-libraries ze de types leveren.

4. **`.d.ts` vs `.ts`.** Leg in je eigen woorden uit waarom een `.d.ts` geen functie-*lichaam* mag
   bevatten, terwijl een `.ts` dat wel heeft. (Tip: types verdwijnen bij het compileren.)

Klaar? In **Module 15** bekijken we kort enkele **IDE-functies** die je werk sneller maken, en daarna
is het tijd voor het **eindexamen**: je bouwt zelf een volledige examen-app, met de PC Builder als
uitgewerkt voorbeeld.
