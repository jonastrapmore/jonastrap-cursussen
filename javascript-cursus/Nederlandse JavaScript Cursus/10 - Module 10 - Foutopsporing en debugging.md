# Module 10: Foutopsporing en debugging

Deze module is misschien wel de nuttigste van allemaal. Niet omdat je hier nieuwe "trucjes"
leert, maar omdat je leert **zelf je fouten te vinden en op te lossen**, in plaats van vast te
lopen. Programmeren is voor een groot deel debuggen. Je hebt vandaag al veel fouten gezien;
hier maken we er een methode van.

> Maak `module10.html` met de HTML-romp uit Module 0.

> 📂 **Voorbeelden bij dit hoofdstuk, map `c10/`** (hoofdstuk 10 van het boek). Nuttig om te
> bekijken: `console-log.html`, `console-methods.html`, `console-table.html`, `errors.html`,
> `try-catch-finally.html`, `throw.html`, `breakpoints.html`.

---

## 1. De juiste instelling: fouten zijn je vrienden

Een beginner schrikt van een rode foutmelding. Een programmeur leest hem. Het verschil is
alles. Een foutmelding is geen straf, het is de computer die je **precies vertelt wat er mis
is en waar**. Leren die te lezen is een echte vaardigheid, en je hebt er vandaag al flink mee
geoefend.

> Regel 1 van debuggen: **lees de foutmelding.** Echt lezen, niet wegklikken. Negen van de tien
> keer staat het antwoord erin.

---

## 2. Een foutmelding lezen

Open altijd de console (F12 → tabblad **Console**). Een typische fout ziet er zo uit:

```
Uncaught TypeError: Cannot read properties of null (reading 'textContent')
    at module5.html:42
```

Lees hem in drie delen:

1. **Het type**, `TypeError`. De categorie van de fout (zie paragraaf 5 voor de soorten).
2. **De boodschap**, `Cannot read properties of null (reading 'textContent')`. Wat er
   precies misging: je probeerde `.textContent` te lezen van iets dat `null` is (element niet
   gevonden, ken je nog uit Module 5).
3. **De plek**, `at module5.html:42`. Bestand en **regelnummer**. Klik erop en de browser
   springt naar de exacte regel.

Met die drie stukjes weet je bijna altijd genoeg: *welk soort* fout, *wat* er misging, en
*waar*. Begin altijd bij de regel die genoemd wordt.

---

## 3. console: meer dan alleen log

`console.log` ken je. Maar het `console`-object heeft meer handige methodes om te debuggen:

```js
console.log("gewoon bericht");
console.warn("waarschuwing");      // gele waarschuwing
console.error("fout");             // rode foutmelding (zonder je script te stoppen)
console.table([{ naam: "Jonas" }, { naam: "Sara" }]); // toont een array van objecten als TABEL
```

`console.table` is goud waard zodra je met arrays van objecten werkt (zoals de data uit
Module 8), je ziet alles netjes in kolommen.

### Tip: log mét een label

Als je veel logt, raak je het overzicht kwijt. Geef je waarde een label mee:

```js
const prijs = 19.95;
console.log("prijs:", prijs);          // prijs: 19.95
console.log({ prijs });                 // { prijs: 19.95 }  ← toont ook de naam
```

De `{ prijs }`-truc logt de variabele **met haar naam**, heel handig als je er meerdere
tegelijk volgt.

---

## 4. De krachtigste techniek: breakpoints

`console.log` is prima, maar soms wil je je code **stap voor stap** zien lopen en bij elke stap
de waarde van je variabelen bekijken. Daarvoor zijn **breakpoints** (onderbrekingspunten).

Zo doe je het:
1. Open DevTools (F12) → tabblad **Sources** (Chrome/Edge) of **Debugger** (Firefox).
2. Zoek je `.html`/`.js`-bestand en klik op een **regelnummer**. Er verschijnt een blauw vlaggetje
  , dat is je breakpoint.
3. Ververs de pagina / voer de actie uit. Het programma **pauzeert** op die regel.
4. Nu kun je:
   - met je muis over een variabele zweven → je ziet de huidige waarde;
   - rechts in het **Scope**-paneel alle variabelen op dat moment bekijken;
   - met de knoppen bovenaan **stap voor stap** verder (Step over = volgende regel).

Een breakpoint laat je dus "de tijd stilzetten" midden in je code en rondkijken. Voor lastige
bugs is dit veel sneller dan tientallen `console.log`'s.

> Je kunt ook `debugger;` in je code zetten, dat werkt als een breakpoint zodra DevTools open
> is:
> ```js
> function bereken(a, b) {
>   debugger;           // pauzeert hier als DevTools open is
>   return a + b;
> }
> ```

---

## 5. De veelvoorkomende fouttypes (en wat ze betekenen)

Je hebt ze vandaag bijna allemaal al gezien. Hier op een rij, zodat je ze meteen herkent:

| Fouttype | Betekent | Veelvoorkomende oorzaak |
|----------|----------|--------------------------|
| `SyntaxError` | de code is grammaticaal fout | typo zoals `funtion`, vergeten haakje/accolade |
| `ReferenceError: X is not defined` | je gebruikt een naam die niet bestaat | typo in variabelenaam, of tekst zonder quotes (`Naam` i.p.v. `"Naam"`) |
| `TypeError` | iets is niet van het verwachte type | `.textContent` op `null`, of een getal-methode op tekst |
| `TypeError: ... is not a function` | je roept iets aan met `()` dat geen functie is | typo in methodenaam |

Twee die je vandaag letterlijk tegenkwam:
- `Assignment to constant variable` → je probeert een `const` te wijzigen → maak er `let` van.
- `Cannot read properties of null` → element niet gevonden / data nog niet binnen (async!).

> Een **`SyntaxError` is gemeen**: omdat de code niet leesbaar is, stopt vaak je **hele**
> script, ook regels die op zich goed zijn. Zie je dat niets werkt, zoek dan eerst naar een
> syntaxfout (een rode kringel in VS Code wijst je vaak de weg).

---

## 6. Fouten zelf afhandelen: try / catch / finally en throw

Sommige fouten kun je niet voorkomen (een server valt weg, een gebruiker tikt onzin). Die
**vang** je op met `try/catch` (uit Module 8), zodat je programma netjes doorgaat in plaats van
te crashen:

```js
try {
  // code die kan mislukken
  const data = JSON.parse(invoer);
  console.log(data.naam);
} catch (fout) {
  // dit draait alleen als er in het try-blok iets misging
  console.error("Ongeldige invoer:", fout.message);
} finally {
  // dit draait ALTIJD, of er nu een fout was of niet
  console.log("klaar met proberen");
}
```

- **`try`** → de code die kan mislukken.
- **`catch (fout)`** → draait alléén bij een fout; `fout.message` bevat de uitleg.
- **`finally`** → draait altijd, foutloos of niet (handig om iets op te ruimen).

### Zelf een fout opwerpen met `throw`

Soms wil je zélf een fout veroorzaken als iets niet klopt (zoals je deed bij `response.ok` in
Module 8):

```js
function deelDoor(a, b) {
  if (b === 0) {
    throw new Error("Delen door nul mag niet");
  }
  return a / b;
}

try {
  console.log(deelDoor(10, 0));
} catch (fout) {
  console.error(fout.message); // "Delen door nul mag niet"
}
```

`throw new Error("...")` maakt een fout aan die naar het dichtstbijzijnde `catch`-blok springt.
Zo bescherm je je functies tegen verkeerd gebruik.

---

## 7. Een debug-strategie (stappenplan)

Loop je vast, werk dan dit lijstje af in plaats van te gokken:

1. **Lees de foutmelding**, type, boodschap, regelnummer. Klik naar de regel.
2. **Klopt de aanname?** Log de betrokken variabele vlak ervoor: `console.log({ variabele })`.
   Is hij `undefined`/`null`/leeg? Dan ligt het probleem eerder, niet op deze regel.
3. **Werk terug.** Is een waarde verkeerd, ga dan naar de plek waar hij gezet wordt.
4. **Isoleer.** Zet stukken code tijdelijk uit (met `//`) tot je het kleinste stukje hebt dat
   misgaat.
5. **Zet een breakpoint** op de verdachte regel en kijk stap voor stap rond.
6. **Lees rustig.** De meeste bugs zijn een typo, een verkeerd type (tekst vs. getal), een
   `=` waar `===` moet staan, of iets asynchroons dat nog niet binnen is.

> Het verschil tussen een beginner en een gevorderde is niet "minder fouten maken", het is
> **sneller fouten vinden**. Dat leer je puur door te oefenen, en dat doe je al de hele dag.

---

## Samenvatting

- Een **foutmelding** lees je in drie delen: **type**, **boodschap**, **bestand:regel**. Begin
  altijd bij de genoemde regel.
- `console` heeft meer dan `log`: `warn`, `error`, en vooral `table` voor arrays van objecten.
  Log met labels: `console.log({ variabele })`.
- **Breakpoints** (tabblad Sources, of `debugger;`) laten je de code pauzeren en stap voor stap
  variabelen bekijken, krachtiger dan losse logs.
- Ken de fouttypes: `SyntaxError`, `ReferenceError`, `TypeError`. Een `SyntaxError` legt vaak je
  hele script plat.
- Vang fouten op met **`try/catch/finally`**; veroorzaak ze bewust met **`throw new Error(...)`**.
- Volg bij vastlopen een **strategie** (lees → log → werk terug → isoleer → breakpoint).

## Oefeningen

Gebruik `module10.html` en de console (F12).

1. **Fout lezen.** Schrijf bewust deze fout en bekijk de melding in de console; noteer in een
   commentaar het *type*, de *boodschap* en het *regelnummer*:
   ```js
   const el = document.querySelector("#bestaatniet");
   el.textContent = "hoi";
   ```

2. **console-methodes.** Maak een array van 3 objecten (bijv. personen met naam en leeftijd) en
   toon hem met `console.table`. Log er ook eentje met `console.warn` en `console.error`.

3. **try/catch.** Schrijf code die `JSON.parse("dit is geen json")` probeert. Vang de fout op
   met `try/catch` en log een nette boodschap met `fout.message`. Voeg een `finally` toe die
   altijd `"controle afgerond"` logt.

4. **throw.** Schrijf een functie `leeftijdCheck(leeftijd)` die een `Error` opwerpt met de tekst
   `"Leeftijd mag niet negatief zijn"` als `leeftijd < 0`, en anders de leeftijd teruggeeft.
   Test 'm met een negatieve waarde binnen een `try/catch`.

5. **Breakpoint (doe-oefening).** Maak een functie die een paar berekeningen doet. Zet in
   DevTools een breakpoint op een regel binnenin, ververs, en bekijk de waarde van je
   variabelen door erover te zweven. (Niets in te leveren, gewoon ervaren hoe het voelt.)

Klaar? Dan heb je de belangrijkste overlevingsvaardigheid van een programmeur te pakken: jezelf
uit de problemen helpen. Roep maar als je je `module10.html` wilt laten nakijken!
