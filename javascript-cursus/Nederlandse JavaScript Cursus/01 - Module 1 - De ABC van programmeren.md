# Module 1: De ABC van programmeren

Voordat je een taal kunt schrijven, moet je weten *hoe een programmeur denkt*. Deze module
gaat nog niet zozeer over typen, maar over de manier van denken. Lees hem rustig, dit
fundament maakt al het latere veel makkelijker.

## Wat is een programma eigenlijk?

Een computer is dom. Hij doet precies wat je zegt, in precies de volgorde die je zegt, en
geen stap meer. Een **programma** is niets anders dan een lijst instructies die de computer
één voor één afwerkt, van boven naar beneden.

Denk aan een **recept**. Een recept gaat ervan uit dat:
- je de stappen in volgorde uitvoert;
- elke stap klein en duidelijk is ("klop 2 eieren", niet "maak een taart");
- je soms een keuze maakt ("als het deeg te droog is, voeg water toe");
- je soms iets herhaalt ("roer 5 minuten").

Programmeren is exact dat: een taak opdelen in kleine, ondubbelzinnige stappen.

## De drie dingen die elk programma doet

Bijna alle code die je ooit zult schrijven, bestaat uit deze drie bouwstenen:

1. **Gegevens onthouden.** Bijvoorbeeld: een naam, een prijs, een lijst boodschappen.
   Dit doen we met *variabelen* (Module 2).
2. **Beslissingen nemen.** "Als de gebruiker is ingelogd, toon zijn naam; anders toon een
   loginknop." Dit zijn *condities* (Module 4).
3. **Dingen herhalen.** "Doe dit voor elk product in de winkelwagen." Dit zijn *loops* (Module 4).

Plus een vierde, die alles aan elkaar lijmt:

4. **Code groeperen onder een naam,** zodat je het opnieuw kunt gebruiken. Dat zijn
   *functies* (Module 3).

Als je deze vier dingen begrijpt, begrijp je programmeren. De rest is detail en oefening.

## Een taak leren opdelen (de belangrijkste vaardigheid)

Stel: je wilt een script dat bezoekers welkom heet met de juiste boodschap, afhankelijk van
het tijdstip. Een mens zegt: "begroet de bezoeker netjes." Een computer snapt dat niet. Je
moet het opdelen in piepkleine stappen:

1. Vraag de computer hoe laat het is.
2. Haal daar het **uur** uit (bijv. 14).
3. Bepaal in welk dagdeel dat valt:
   - is het uur kleiner dan 12 → "Goedemorgen"
   - is het uur kleiner dan 18 → "Goedemiddag"
   - anders → "Goedenavond"
4. Plak de juiste begroeting achter de naam van de bezoeker.
5. Toon die zin op de pagina.

Merk op: stap 3 is een **beslissing**, en we gebruiken **gegevens** (het uur, de naam). Dit
is precies de denkstap die beginners overslaan: ze willen meteen "de begroeting maken", maar
de kunst is om eerst de stappen op papier te zetten, gewoon in het Nederlands. Dat heet
**pseudocode**: de logica opschrijven in mensentaal vóór je het in JavaScript vertaalt.

> **Gouden tip:** schrijf bij elke oefening eerst in normale zinnen op wat er moet gebeuren.
> Pas daarna vertaal je het naar code. 80% van het werk is het denken, niet het typen.

## Belangrijke woordenschat

Programmeurs gebruiken bepaalde woorden steeds. Hier de belangrijkste, zodat ze later niet
vreemd aanvoelen:

| Woord | Betekenis in gewone taal |
|-------|--------------------------|
| **Statement** (instructie) | Eén opdracht aan de computer, meestal één regel. |
| **Variabele** | Een doosje met een naam waarin je iets bewaart. |
| **Value** (waarde) | Het ding dat in dat doosje zit: een getal, tekst, enz. |
| **Expression** (expressie) | Iets dat een waarde *oplevert*, zoals `2 + 3` of `prijs * 2`. |
| **Operator** | Een symbool dat iets dóét, zoals `+`, `-`, `*`, `=`. |
| **Function** (functie) | Een stukje code met een naam dat je kunt aanroepen. |
| **Syntax** | De grammaticaregels van de taal (waar komma's, haakjes enz. moeten). |

Je hoeft dit niet uit je hoofd te leren, je gaat ze vanzelf herkennen. Lees het nu één keer.

## Hoe de browser je JavaScript leest

Belangrijk om te onthouden voor later:

- De browser leest je script **van boven naar beneden**, regel voor regel.
- Een regel die hij niet snapt, geeft een **foutmelding** in de console, en vaak stopt de
  rest van je script daarna. Daarom is die console zo belangrijk.
- Code in een `<script>`-tag wordt uitgevoerd op het moment dat de browser daar aankomt
  tijdens het laden van de pagina.

## Een statement = één instructie

In JavaScript eindigt elke instructie netjes met een puntkomma `;`. Voorbeeld van drie
statements:

```js
console.log("Stap 1");
console.log("Stap 2");
console.log("Stap 3");
```

De browser doet stap 1, dan 2, dan 3, in die volgorde. Verwissel de regels en de volgorde
in de console verandert mee. Probeer dat gerust.

> De puntkomma is in moderne JavaScript technisch niet altijd verplicht, maar we zetten hem
> er **altijd** bij. Het voorkomt subtiele fouten en is een goede gewoonte richting TypeScript.

## Commentaar: notities voor mensen

Je kunt notities in je code zetten die de computer **negeert**. Handig om uit te leggen wat
je doet (en voor je toekomstige zelf).

```js
// Dit is een commentaar van één regel. De browser slaat dit over.

/*
  Dit is een commentaar
  over meerdere regels.
*/

console.log("Deze regel wordt wél uitgevoerd.");
```

Gebruik commentaar om je *pseudocode* in je bestand te zetten voordat je de echte code
schrijft. Heel handig als beginner.

## Samenvatting

- Een programma is een lijst kleine instructies, uitgevoerd van boven naar beneden.
- De vier bouwstenen: **gegevens onthouden, beslissen, herhalen, groeperen** (variabelen,
  condities, loops, functies).
- De belangrijkste vaardigheid is een taak **opdelen** in piepkleine stappen, schrijf eerst
  pseudocode in gewoon Nederlands.
- Elke instructie eindigt met `;`. Commentaar (`//` of `/* */`) wordt door de computer genegeerd.

## Oefening

Je hoeft hier nog niet veel te typen, dit is een denkoefening.

1. **Pseudocode schrijven.** Schrijf (in gewone Nederlandse zinnen, in een commentaarblok in
   je `index.html`) de stappen op voor dit probleem: *"Bereken de totaalprijs van een
   bestelling van 3 boeken van €15 per stuk, met €4 verzendkosten."* Denk in kleine stappen:
   wat onthoud je, wat reken je uit, wat toon je?
2. **Volgorde herkennen.** Zet deze drie `console.log`-regels in je script en voorspel
   *eerst op papier* in welke volgorde ze in de console verschijnen. Controleer daarna:
   ```js
   console.log("C");
   console.log("A");
   console.log("B");
   ```
3. **Bouwstenen herkennen.** Kijk nog eens naar het begroetings-voorbeeld hierboven. Welke
   stap is een *beslissing*, en welke stappen gebruiken *gegevens*? Schrijf het antwoord in
   een commentaar.

Klaar? In **Module 2** gaan we eindelijk echt gegevens opslaan in variabelen.
