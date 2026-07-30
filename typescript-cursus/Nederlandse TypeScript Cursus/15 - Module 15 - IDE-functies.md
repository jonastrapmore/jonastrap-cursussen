# Module 15: IDE-functies (kort)

Een groot deel van de kracht van TypeScript zit niet in de taal zelf, maar in wat je **editor**
ermee doet. Omdat de compiler je types kent, kan VS Code je constant helpen: fouten tonen terwijl je
typt, de juiste code aanvullen, veilig hernoemen… Deze korte module verzamelt de handigste functies,
zodat je sneller en met minder fouten werkt (ook op het examen).

> De voorbeelden gaan over **VS Code** (de meest gebruikte editor voor TypeScript). Andere editors
> (WebStorm, enz.) hebben dezelfde functies onder soms andere namen/sneltoetsen.

## 1. De rode kringels & het Problems-paneel

Het bekendste: een **rood kringeltje** onder foute code, met de melding als je eroverheen gaat. Alle
fouten samen zie je in het **Problems**-paneel (`Ctrl+Shift+M`). Dit is je live typecheck, zónder dat
je `tsc` moet draaien.

> Onthoud uit Module 10: die kringels komen van **`tsc`** (de taalserver in je editor), niet van
> Vite. Daarom zie je hier fouten die `vite dev` negeert. "Geen rode kringels" is je beste
> snelle-check dat je code typeveilig is.

## 2. Hover: het type van alles zien

Beweeg je muis over een variabele, functie of parameter, en VS Code toont het **afgeleide type**
(*quick info*). Zo controleer je wat TypeScript zelf inferde, zonder het op te schrijven:

```ts
function verdubbel(getal: number) {
  return getal * 2
}
// hover over 'verdubbel' -> function verdubbel(getal: number): number
```

Dit is precies wat je in Module 3 deed om het afgeleide return-type te zien. Gebruik het vaak: het is
de snelste manier om te snappen "wat is dit eigenlijk?".

## 3. Autocomplete (IntelliSense)

Typ een punt na een object (`part.`) en VS Code toont **alle beschikbare properties en methodes**,
met hun types. Omdat de editor het type kent, krijg je alleen wat écht bestaat:

```ts
part.        // -> name, price, category, id  (en niets anders)
"hallo".     // -> toUpperCase, includes, slice, ...  (string-methodes)
```

Dit bespaart opzoekwerk en voorkomt typo's. Werkt ook voor functie-argumenten (welk type verwacht
deze parameter?) en imports.

## 4. Ga naar definitie & vind verwijzingen

- **Go to Definition** (`F12`, of Ctrl/Cmd+klik): spring naar waar iets **gedefinieerd** is. Klik op
  `Page` en je landt in `page.ts`. Ideaal om het gegeven framework te verkennen (Module 11).
- **Peek Definition** (`Alt+F12`): toon de definitie in een pop-up zonder weg te navigeren.
- **Find All References** (`Shift+F12`): waar wordt dit overal **gebruikt**? Handig vóór je iets
  wijzigt.

## 5. Veilig hernoemen (Rename Symbol, F2)

Wil je een variabele, functie of klasse anders noemen? Gebruik **F2** (Rename Symbol), niet zoeken-en-
vervangen. VS Code past de naam dan **overal correct** aan, in alle bestanden, en enkel waar het echt
om dat symbool gaat (geen toevallige tekst-matches). Veilig en snel.

## 6. Quick Fix & auto-import (Ctrl+.)

Zie je een rode kringel, druk dan **`Ctrl+.`** (Quick Fix) voor voorgestelde oplossingen. De
bekendste: **auto-import**, gebruik je een klasse die nog niet geïmporteerd is, dan biedt VS Code aan
de `import`-regel er automatisch bij te zetten.

> ⚠️ **Kleine valkuil (die we live zagen):** auto-import zet soms een import klaar die je uiteindelijk
> tóch niet gebruikt. Met `noUnusedLocals` (Module 10) geeft dat bij `pnpm build` een fout ("declared
> but never read"). Ruim ongebruikte imports dus op, zie sectie 7.

## 7. Imports opruimen & code formatteren

- **Organize Imports** (`Shift+Alt+O`): sorteert je imports en **verwijdert ongebruikte** in één keer.
  Precies de oplossing voor die dwalende auto-import.
- **Format Document** (`Shift+Alt+F`): netjes inspringen en uitlijnen. Veel projecten doen dit
  automatisch bij opslaan (het examen gebruikt **Biome** hiervoor; andere projecten Prettier).

## 8. Refactors: extract & meer

Selecteer een stuk code, klik op het **gloeilampje** (of `Ctrl+.`), en VS Code stelt **refactors**
voor: *extract to function*, *extract to variable*, enz. Handig om een lange `render()` op te splitsen
in kleinere stukken (bv. een aparte `#matchesFilter`-functie zoals in de filter-tip van Module 12).

## Samenvatting

- **Rode kringels + Problems-paneel** = je live typecheck (van `tsc`, niet Vite).
- **Hover** toont afgeleide types; **autocomplete** toont wat echt bestaat.
- **F12** (ga naar definitie), **Shift+F12** (verwijzingen): navigeer door (gegeven) code.
- **F2** (Rename Symbol) hernoemt veilig overal; gebruik dit i.p.v. zoek-en-vervang.
- **Ctrl+.** (Quick Fix / auto-import); let op ongebruikte imports → **Shift+Alt+O** (Organize
  Imports) ruimt ze op.
- **Refactors** (extract function/variable) en **Format Document** houden je code netjes.

## Oefeningen

Open de cursus-app (`pc-builder-app`) in VS Code.

> **Zelfreflectie, geen oplossing:** dit zijn probeer-oefeningen; je ervaart de functies zelf.

1. **Hover.** Beweeg over `PartRestProvider` in `parts.ts`. Welk type toont VS Code? En over `part`
   binnen de `.map(...)`?

2. **Ga naar definitie.** Ctrl/Cmd+klik op `Page` (in `parts.ts`). Waar land je? Doe hetzelfde met
   `CustomElement` in `part.ts`.

3. **Verwijzingen.** Zet je cursor op `BuildLocalProvider` en druk `Shift+F12`. In hoeveel bestanden
   wordt hij gebruikt?

4. **Veilig hernoemen.** Hernoem met **F2** de private property `#parts` in `parts.ts` naar
   `#allParts`. Controleer dat alle gebruiken mee wijzigen. (Maak daarna ongedaan als je wil.)

5. **Ongebruikte import.** Voeg bovenaan `parts.ts` een nutteloze import toe (bv.
   `import { Part } from ...` als die er al staat, of iets willekeurigs). Zie de kringel, en ruim op
   met **Shift+Alt+O** (Organize Imports).

Klaar? Hiermee zit het **cursusgedeelte** erop. Wat rest is het **eindexamen**: je bouwt zelf een
volledige examen-app van nul, met de PC Builder (`pc-builder-app`) als uitgewerkt voorbeeld en de
handleiding als naslag. Succes!
