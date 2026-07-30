# Module 0: Setup en je eerste compile

Voordat we types leren, zorgen we dat je TypeScript kunt **schrijven, compileren en draaien**.
Dit is iets meer werk dan bij JavaScript (dat draaide meteen in de browser), en het is
belangrijk dat je dít deel echt snapt, want het verklaart *waarom* TypeScript bestaat.

## 1. Wat is TypeScript precies?

JavaScript kent geen "types" die het vooraf controleert. Dit mag in JavaScript gewoon:

```js
let leeftijd = 30;
leeftijd = "dertig"; // JavaScript vindt dit prima... tot het misgaat
```

Pas als je code *draait* en iets geks doet met die tekst, krijg je een fout, soms uren later,
bij een gebruiker. **TypeScript** voegt een laag toe die zegt: *"leeftijd is een getal, dus je
mag er geen tekst in stoppen"*, en dat vertelt het je **meteen**, terwijl je typt:

```ts
let leeftijd: number = 30;
leeftijd = "dertig"; // ❌ Type 'string' is not assignable to type 'number'
```

Belangrijk om te onthouden:

> TypeScript is een **superset** van JavaScript: alle JavaScript die je kent ís geldige
> TypeScript. Je leert dus geen compleet nieuwe taal, je leert een **extra laag** (types)
> bovenop wat je al kunt.

## 2. Waarom zou je dat willen?

Drie grote voordelen:

1. **Fouten vóór runtime.** De compiler vangt typefouten, vergeten properties en typo's al
   voordat je code ooit draait.
2. **Veel betere autocomplete.** Omdat de editor de types kent, weet hij precies welke
   eigenschappen en methodes een object heeft. Je tikt minder fout en zoekt minder op.
3. **Documentatie die altijd klopt.** De types beschrijven hoe je code bedoeld is. Een functie
   `tel(a: number, b: number): number` vertelt in één oogopslag wat erin gaat en wat eruit komt.

Daarom gebruiken zo goed als alle moderne front-end projecten TypeScript.

## 3. Het kernidee: TypeScript draait niet rechtstreeks

Dit is het belangrijkste verschil met JavaScript. Een browser snapt **geen** TypeScript. Je
`.ts`-bestand moet eerst **omgezet (gecompileerd)** worden naar gewoon JavaScript (`.js`), en
dát laad je dan in de browser of draai je met Node.

```
   jouw code            de compiler           wat de browser draait
   app.ts      ──tsc──▶   (vertaalt)   ──▶      app.js
```

De compiler heet **`tsc`** (TypeScript Compiler). Tijdens dat vertalen controleert hij ook al je
types. Vindt hij een typefout, dan klaagt hij, en (met de juiste instelling) maakt hij geen
`.js` aan zolang er fouten zijn.

> Onthoud dit plaatje. Veel verwarring bij beginners komt doordat ze vergeten dat TS een
> **tussenstap** (compileren) heeft die JavaScript niet had.

## 4. Installeren

### 4.1 Node.js

Je hebt eerst **Node.js** nodig. Dat is de omgeving die JavaScript (en dus je gecompileerde
TypeScript) buiten de browser laat draaien, en het brengt meteen **`npm`** en **`npx`** mee.
Download de **LTS**-versie van [nodejs.org](https://nodejs.org) en installeer die. Controleer
daarna in een **nieuwe** terminal:

```bash
node --version   # bv. v22.x.x
npm --version    # bv. 10.x.x
```

Krijg je een versienummer te zien, dan staat Node goed.

### 4.2 pnpm

In deze cursus gebruiken we **pnpm** als pakketbeheerder: een populair, snel en zuinig alternatief
voor `npm`, dat veel projecten, opleidingen én de examens gebruiken. Node brengt een handige
installer mee (*Corepack*), dus meestal volstaat één commando:

```bash
corepack enable pnpm     # zet pnpm aan (komt met Node mee)
```

Lukt dat niet, installeer pnpm dan globaal via npm:

```bash
npm install -g pnpm
```

Controleer:

```bash
pnpm --version   # bv. 10.x.x
```

> Liever gewoon `npm` gebruiken? Dat mag: vervang dan overal in de cursus `pnpm` door `npm` (en
> `pnpm add` door `npm install`). Alle voorbeelden werken met beide.

### 4.3 TypeScript

TypeScript installeer je als ontwikkel-gereedschap. Twee manieren:

```bash
# Optie A: globaal (overal beschikbaar als 'tsc')
pnpm add -g typescript

# Optie B: per project (aanrader voor echte projecten)
pnpm add -D typescript
```

Controleer of het werkt:

```bash
tsc --version        # bv. Version 5.8.3
```

> Werkt `tsc` niet als globaal commando? Dan kun je het altijd via Node draaien met
> `npx tsc` of `pnpm exec tsc`. Voor de oefenmap maakt het niet uit welke je kiest.

## 5. De tsconfig: de instellingen van de compiler

Maak een oefenmap (bijvoorbeeld `oefeningen/`) en zet daarin een **`tsconfig.json`**. Dat
bestand vertelt `tsc` hóe hij moet compileren. Een strenge, aanbevolen basis ziet er zo uit
(de belangrijkste regels, in mensentaal):

```jsonc
{
  "compilerOptions": {
    "rootDir": "./src",          // hier staan jouw .ts-bestanden
    "outDir": "./dist",          // hier komt de gecompileerde .js terecht
    "target": "esnext",          // naar welke JavaScript-versie we vertalen (modern)
    "module": "commonjs",        // outputvorm die Node rechtstreeks kan draaien
    "moduleDetection": "force",  // behandel ELK bestand als een eigen module
    "strict": true,              // alle strenge typecontroles aan (heel belangrijk!)
    "noEmitOnError": true,       // bij een typefout: maak GEEN .js aan
    "removeComments": true       // laat commentaar weg uit de gecompileerde .js
  }
}
```

Onthoud vooral deze:
- **`rootDir` / `outDir`**: jij schrijft in `src/`, de compiler schrijft naar `dist/`.
- **`strict: true`**: alle strenge controles aan. Dit is precies wat je wilt, laat het aan
  staan. Het dwingt je goede, veilige TypeScript te schrijven en is de norm in serieuze projecten.
- **`module: commonjs` + `moduleDetection: force`**: hiermee draait elk gecompileerd bestand
  meteen in **Node** (handig om je oefeningen te draaien zonder browser), en wordt elk bestand
  als een **eigen module** behandeld. Dat laatste voorkomt een klassieke beginnersfout: zonder
  deze instelling delen al je `.ts`-bestanden één globale ruimte, en dan botst bijvoorbeeld een
  `let prijs` in twee verschillende bestanden. (Meer over modules in een latere module.)

## 6. De workflow: schrijven → compileren → draaien

Stap voor stap, in je oefenmap:

1. **Schrijf** een `.ts`-bestand in `src/`, bijvoorbeeld `module0.ts`.
2. **Compileer** door in je oefenmap dit te draaien:
   ```bash
   tsc
   ```
   `tsc` leest de `tsconfig.json`, compileert alles uit `src/` naar `dist/`.
3. **Draai** het resultaat met **Node**, rechtstreeks in je terminal:
   ```bash
   node dist/module0.js
   ```
   Je `console.log` verschijnt meteen in de terminal, geen browser nodig. Werk je aan een
   ander bestand? Draai dan dat bestand: `node dist/module1.js`, enzovoort.

> Waarom Node en geen browser? Voor het léren van de taal (Module 1–9) draaien we kleine
> stukjes code met `console.log`. Node draait die direct, zonder HTML-gedoe. Vanaf Module 10
> (waar we apps bouwen) keren we terug naar de browser, dan met een echte dev-server.

### Handig: laat de compiler meekijken

In plaats van na elke wijziging `tsc` te typen, kun je hem **continu laten meekijken**:

```bash
tsc --watch
```

Nu compileert hij **automatisch** elke keer dat je opslaat, en toont hij meteen eventuele
fouten in je terminal. Laat dit lekker aan staan terwijl je werkt. Stoppen doe je met `Ctrl+C`.

## 7. Je eerste compile (de "aha"-oefening)

Maak in je `src/`-map een bestand `module0.ts` met deze inhoud:

```ts
let cursusNaam: string = "TypeScript Bootcamp";
let prijs: number = 19.99;

console.log(cursusNaam, prijs);
```

Compileer (`tsc`) en draai met `node dist/module0.js`. Je ziet de waarden in de terminal. Tot
zover lijkt het op JavaScript.

**Nu de magie.** Voeg deze regel toe en sla op:

```ts
prijs = "gratis"; // we stoppen tekst in een getal-variabele
```

Kijk wat er gebeurt:
- In **VS Code** verschijnt meteen een **rood kringeltje** onder `prijs`, met de melding
  *"Type 'string' is not assignable to type 'number'."*
- Draai je `tsc`, dan **weigert hij te compileren** (door `noEmitOnError`): geen nieuwe `.js`.

Dát is TypeScript. De fout wordt gevangen **voordat** je code ooit draait. In gewone JavaScript
was deze regel probleemloos doorgegaan, en pas veel later stuk gelopen.

## 8. Even vooruitkijken: tsc nu, Vite/pnpm later

Een veelgestelde vraag: wanneer gebruik je `tsc` en wanneer `pnpm`/Vite? Het antwoord:

- **Nu, om de taal te leren:** kale **`tsc`** in je oefenmap. Geen framework, geen
  bundeling, puur jij en de types. Zo zie je precies wat TypeScript doet.
- **Later, voor echte apps (zoals het examen):** **Vite + pnpm**. Vite doet het compileren én
  het bundelen én geeft je een live dev-server (`pnpm dev`) met automatisch herladen. In zo'n
  project draai je `tsc` niet meer met de hand; Vite regelt het. (We maken die overstap in
  Module 10.)

Voor nu: **alles in deze beginmodules doe je met `tsc`.** Onthoud dat, dan raak je niet in de
war als andere cursussen of ik over `tsc` praten.

## Samenvatting

- TypeScript = **JavaScript + types**; een superset, dus je JS-kennis blijft 100% geldig.
- De grote winst: **typefouten worden gevangen vóór runtime**, plus betere autocomplete.
- TypeScript **draait niet rechtstreeks**: je `.ts` wordt met **`tsc`** gecompileerd naar `.js`.
- De **`tsconfig.json`** stuurt de compiler: `rootDir` (src) → `outDir` (dist), met
  **`strict: true`** aan.
- Workflow: schrijf `.ts` in `src/` → `tsc` (of `tsc --watch`) → laad de `.js` uit `dist/`.
- **Nu leer je met `tsc`; vanaf Module 10 stappen we over op Vite + pnpm** voor echte projecten.

## Oefeningen

1. **Versie checken.** Draai `tsc --version` en noteer je versie. Lukt `tsc` niet, probeer dan
   `npx tsc --version`.

2. **Eerste compile.** Maak `src/module0.ts` met de `cursusNaam`/`prijs`-code uit
   paragraaf 7. Compileer met `tsc` en controleer dat er een `.js` in `dist/` verschijnt.

3. **Een typefout uitlokken.** Voeg `prijs = "gratis";` toe. Bekijk: (a) het rode kringeltje in
   VS Code, en (b) wat `tsc` in de terminal zegt. Noteer de exacte foutmelding in een commentaar.
   Haal de regel daarna weer weg zodat het weer compileert.

4. **Watch-modus.** Start `tsc --watch`. Maak een typefout, sla op, en kijk hoe de terminal
   meteen reageert. Herstel de fout en zie hoe hij weer "0 errors" meldt. Stop met `Ctrl+C`.

5. **Begrip checken (op papier/commentaar).** Schrijf in je eigen woorden: waarom kan een
   browser je `.ts`-bestand niet rechtstreeks draaien, en wat lost `tsc` op?

Klaar? In **Module 1** duiken we de types zelf in: annotaties, inference en de basistypes.
