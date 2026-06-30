# Module 4: Beslissingen en loops

Dit is misschien wel de belangrijkste module van de hele cursus. Hier leer je je programma
**keuzes laten maken** (beslissingen) en **dingen laten herhalen** (loops). Dit zijn twee van
de vier bouwstenen uit Module 1, en je gebruikt ze in vrijwel élk programma.

> Maak `module4.html` met de HTML-romp uit Module 0 en typ alles mee.

> 📂 **Voorbeelden bij dit hoofdstuk, map `c04/`** (hoofdstuk 4 van het boek). Open in je
> browser terwijl je leest:
> - Vergelijken & logica: `comparison-operator.html`, `comparison-operator-continued.html`,
>   `logical-and.html`, `logical-or-logical-not.html`
> - Beslissingen: `if-statement.html`, `if-else-statement.html`,
>   `if-statement-with-function.html`, `switch-statement.html`
> - Loops: `for-loop.html`, `while-loop.html`, `do-while-loop.html`
>
> Twee opmerkingen: het boek gebruikt nog `var` (jij gebruikt `let`/`const`), en het behandelt
> ook de `switch`-instructie, die laat ik hier weg omdat je met `if/else if/else` alles al
> kunt. Open `switch-statement.html` gerust als je nieuwsgierig bent; nodig is het niet.

---

## Deel A: Vergelijken: waar of onwaar?

Voordat je kunt beslissen, moet je iets kunnen **vergelijken**. Een vergelijking levert altijd
een **boolean** op: `true` of `false`.

### 1. Vergelijkingsoperatoren

```js
console.log(5 > 3);    // true   groter dan
console.log(5 < 3);    // false  kleiner dan
console.log(5 >= 5);   // true   groter dan of gelijk aan
console.log(5 <= 4);   // false  kleiner dan of gelijk aan
console.log(5 === 5);  // true   exact gelijk aan
console.log(5 !== 3);  // true   niet gelijk aan
```

### 2. Let op: `===` is niet `=`

Een veelgemaakte beginnersfout:

- `=` betekent **toewijzen** ("krijgt de waarde"), uit Module 2.
- `===` betekent **vergelijken** ("is exact gelijk aan").

```js
let x = 5;          // x KRIJGT de waarde 5
console.log(x === 5); // is x gelijk aan 5? → true
```

> **Gebruik altijd `===` en `!==`** (met drie tekens), niet `==` en `!=` (met twee). De versie
> met twee tekens doet stiekem rare type-omzettingen (`0 == ""` is `true`!) die voor
> verrassende bugs zorgen. De drie-teken-versie vergelijkt netjes en voorspelbaar. Dit is ook
> de norm in TypeScript.

### 3. Logische operatoren: EN, OF, NIET

Soms wil je meerdere voorwaarden combineren:

```js
const leeftijd = 25;
const heeftRijbewijs = true;

console.log(leeftijd >= 18 && heeftRijbewijs); // true   && = EN (beide moeten waar zijn)
console.log(leeftijd < 12 || leeftijd > 65);   // false  || = OF (minstens één waar)
console.log(!heeftRijbewijs);                  // false  !  = NIET (draait om)
```

- `&&` (EN) → waar als **alle** voorwaarden waar zijn.
- `||` (OF) → waar als **minstens één** voorwaarde waar is.
- `!` (NIET) → draait `true` om naar `false` en andersom.

---

## Deel B: Beslissingen: if / else

### 4. De if-instructie

`if` voert een blok code alleen uit **als** een voorwaarde waar is:

```js
const leeftijd = 20;

if (leeftijd >= 18) {
  console.log("Je bent meerderjarig.");
}
```

- Tussen de haakjes `( )` staat de **voorwaarde** (iets dat `true` of `false` oplevert).
- Is die `true`, dan wordt het blok tussen `{ }` uitgevoerd. Is die `false`, dan wordt het
  overgeslagen.

### 5. else: anders...

Met `else` geef je aan wat er moet gebeuren als de voorwaarde **niet** waar is:

```js
const leeftijd = 16;

if (leeftijd >= 18) {
  console.log("Je mag naar binnen.");
} else {
  console.log("Sorry, je bent te jong.");
}
```

Precies één van de twee blokken wordt uitgevoerd, nooit allebei.

### 6. else if: meerdere gevallen

Voor meer dan twee mogelijkheden ketens je met `else if`. Herinner je het begroetings-
voorbeeld uit Module 1? Nu kun je het echt schrijven:

```js
const uur = 14;

if (uur < 12) {
  console.log("Goedemorgen");
} else if (uur < 18) {
  console.log("Goedemiddag");
} else {
  console.log("Goedenavond");
}
```

De computer loopt de voorwaarden **van boven naar beneden** af en stopt bij de **eerste** die
waar is. Daarom werkt de volgorde: bij `uur = 14` is `uur < 12` onwaar, `uur < 18` waar → hij
kiest "Goedemiddag" en negeert de rest.

### 7. Een compleet voorbeeld

```js
function beoordeel(punten) {
  if (punten >= 90) {
    return "Uitstekend";
  } else if (punten >= 70) {
    return "Voldoende";
  } else if (punten >= 50) {
    return "Net aan";
  } else {
    return "Onvoldoende";
  }
}

console.log(beoordeel(95)); // "Uitstekend"
console.log(beoordeel(60)); // "Net aan"
console.log(beoordeel(30)); // "Onvoldoende"
```

> Merk op hoe `if/else` en functies samenwerken: de functie neemt een keuze en geeft het
> resultaat terug. Zo bouw je echte logica.

---

## Deel C: Herhalen: loops

Stel je wilt de getallen 1 tot en met 5 tonen. Dat kan zo:

```js
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
```

Maar tot 1000? Onbegonnen werk. Daar zijn **loops** voor: code die zichzelf herhaalt zolang
een voorwaarde waar is.

### 8. De for-loop

De `for`-loop is de meest gebruikte. Hij ziet er eerst ingewikkeld uit, maar bestaat uit drie
duidelijke delen:

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// toont: 1 2 3 4 5
```

De drie delen tussen de haakjes, gescheiden door `;`:

1. `let i = 1`, **start**: maak een telvariabele `i`, beginnend bij 1. (Eénmalig.)
2. `i <= 5`, **voorwaarde**: blijf herhalen zolang dit waar is. (Vóór elke ronde gecheckt.)
3. `i++`, **stap**: doe dit na elke ronde (hier: `i` met 1 ophogen).

In gewone taal: *"Begin bij 1. Zolang i ≤ 5: voer het blok uit, hoog daarna i op met 1."*
Bij `i = 6` is `i <= 5` onwaar → de loop stopt.

> `i` is een traditionele naam voor de telvariabele (van "index"). Je mag hem anders noemen,
> maar `i` herkent iedereen.

### 9. Waar loops echt schitteren: lijsten (arrays)

Een **array** is een lijst van waarden in één variabele (meer hierover in een latere module,
maar hier de basis):

```js
const namen = ["Jonas", "Sara", "Tom"];

console.log(namen[0]);     // "Jonas"  ← tellen begint bij 0!
console.log(namen[1]);     // "Sara"
console.log(namen.length); // 3        ← aantal items
```

Let op: arrays tellen vanaf **0**. Het eerste item is `[0]`, het tweede `[1]`, enzovoort.

Met een loop loop je netjes door de hele lijst:

```js
const namen = ["Jonas", "Sara", "Tom"];

for (let i = 0; i < namen.length; i++) {
  console.log(`Hallo, ${namen[i]}!`);
}
// Hallo, Jonas!
// Hallo, Sara!
// Hallo, Tom!
```

Bestudeer dit goed: start bij `0`, ga door zolang `i < namen.length`, en gebruik `namen[i]` om
bij het item van deze ronde te komen. Dit patroon gebruik je heel vaak.

### 10. De makkelijkere variant: for...of

Voor "doe iets met elk item" is er een eenvoudiger vorm waar je niet zelf hoeft te tellen:

```js
const namen = ["Jonas", "Sara", "Tom"];

for (const naam of namen) {
  console.log(`Hallo, ${naam}!`);
}
```

Lees dit als: *"voor elke naam in namen, doe..."*. Geen `i`, geen `[i]`, minder kans op
fouten. Gebruik `for...of` als je gewoon elk item wilt langslopen, en de klassieke `for` als
je de teller `i` zelf nodig hebt.

### 11. De while-loop (kort)

Soms weet je niet vooraf hoe vaak je moet herhalen, alleen de voorwaarde. Dan gebruik je
`while`:

```js
let aftellen = 3;

while (aftellen > 0) {
  console.log(aftellen);
  aftellen--;        // ← niet vergeten! anders blijft de loop eeuwig draaien
}
console.log("Start!");
// 3 2 1 Start!
```

> **Pas op voor de oneindige loop.** Als de voorwaarde nooit `false` wordt (bijv. je vergeet
> `aftellen--`), blijft de loop voor altijd draaien en bevriest je pagina. Zorg er altijd
> voor dat de voorwaarde uiteindelijk onwaar wordt.

---

## Samenvatting

- Een **vergelijking** levert `true` of `false` op. Gebruik `===` / `!==` (drie tekens), niet
  `==` / `!=`.
- Combineer voorwaarden met `&&` (EN), `||` (OF) en `!` (NIET).
- **`if / else if / else`** laat je programma keuzes maken; de eerste ware voorwaarde wint.
- Een **`for`-loop** herhaalt code: `for (start; voorwaarde; stap)`. Arrays tellen vanaf `0`;
  `array.length` is het aantal items.
- **`for...of`** is de makkelijke manier om door een lijst te lopen. **`while`** herhaalt op
  basis van een voorwaarde, pas op voor oneindige loops.

## Oefeningen

Pseudocode eerst, dan code. Test in de console.

1. **Toegangscontrole.** Schrijf een functie `magNaarBinnen(leeftijd)` die `"Welkom"`
   teruggeeft bij 18 of ouder, en anders `"Te jong"`. Test met meerdere leeftijden.

2. **Even of oneven.** Schrijf een functie `evenOfOneven(getal)` die `"even"` of `"oneven"`
   teruggeeft. Hint: een getal is even als `getal % 2 === 0` (modulo uit Module 2).

3. **Cijferbeoordeling.** Schrijf met `if/else if/else` een functie die bij een cijfer
   (0–10) teruggeeft: 1–4 → `"onvoldoende"`, 5 → `"voldoende"`, 6–10 → `"goed"`.

4. **Tel tot 10.** Gebruik een `for`-loop om de getallen 1 t/m 10 in de console te tonen.

5. **Som van een lijst.** Gegeven `const prijzen = [10, 25, 5, 40];`. Loop er met een
   `for`- of `for...of`-loop doorheen en bereken de totaalprijs. Log het totaal.

6. **Combineer alles.** Gegeven `const leeftijden = [12, 20, 17, 30, 16];`. Loop erdoorheen en
   log voor elke leeftijd of die persoon meerderjarig is, in de vorm:
   `"20 → meerderjarig"` / `"16 → minderjarig"`. (Combineer een loop met een `if/else`.)

Klaar? Door naar **Module 5 (De DOM)**, daar gaan we eindelijk de pagina zelf veranderen met
JavaScript.
