# Module 5: De DOM (de pagina veranderen met JavaScript)

Tot nu toe schreven we alles naar de console. Leuk om te leren, maar de bezoeker ziet die
console niet. In deze module gaan we eindelijk de **echte pagina** veranderen: tekst
aanpassen, kleuren wijzigen, dingen tonen en verbergen. Dit is waar JavaScript "magisch"
wordt.

> Maak `module5.html` aan. We gaan dit keer ook **HTML in de body** gebruiken, niet alleen een
> script. Begin met deze pagina:

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <title>Module 5 - DOM</title>
</head>
<body>
  <h1 id="titel">Hallo</h1>
  <p class="intro">Dit is een paragraaf.</p>
  <p class="intro">Dit is nog een paragraaf.</p>
  <button id="knop">Klik mij</button>

  <!-- Belangrijk: script ONDERAAN, vlak voor </body> -->
  <script>
    // hier komt onze JavaScript
  </script>
</body>
</html>
```

> **Waarom staat het script onderaan?** De browser leest van boven naar beneden. Staat je
> script bovenaan, dan bestaan de `<h1>` en `<p>`'s nog niet wanneer je script ze probeert te
> vinden → fout. Onderaan is alles al ingeladen. Zet je script dus vlak voor `</body>`.

---

## 1. Wat is de DOM?

Als de browser je HTML inleest, bouwt hij daar in zijn geheugen een soort boomstructuur van:
elk element (`<h1>`, `<p>`, `<button>`...) wordt een **knooppunt** in die boom. Die boom heet
de **DOM**: *Document Object Model*.

Het belangrijke inzicht: **JavaScript kan in die boom graaien.** Je kunt elementen opzoeken,
hun tekst lezen, hun inhoud veranderen, hun kleur aanpassen, ze verwijderen of nieuwe
toevoegen. En de browser tekent de pagina meteen opnieuw. Zo wordt een statische pagina
interactief.

Het toegangspunt tot die boom is het ingebouwde object **`document`**. Alles begint daarmee.

> 📂 **Voorbeelden bij dit hoofdstuk, map `c05/`** (hoofdstuk 5 van het boek). Open in je
> browser terwijl je leest:
> - Elementen opzoeken: `query-selector.html`, `node-list.html`, en de oudere manieren
>   `get-element-by-id.html`, `get-elements-by-class-name.html`, `get-elements-by-tag-name.html`
> - Inhoud lezen/wijzigen: `inner-html.html`, `inner-text-and-text-content.html`
> - Attributen: `get-attribute.html`, `set-attribute.html`, `remove-attribute.html`
> - Elementen toevoegen/verwijderen: `add-element.html`, `remove-element.html`
> - Door de boom navigeren (verdieping): `child.html`, `sibling.html`, `node-value.html`
> - Een compleet voorbeeld: `example.html` (vergelijk met `initial-page.html`)
>
> Tip: in dit boek gebruiken veel voorbeelden nog `getElementById` e.d.; ik leer je
> `querySelector` als één manier voor alles. Open `query-selector.html` om die te zien.

---

## 2. Een element opzoeken

Voordat je iets kunt veranderen, moet je het element **vinden**. De moderne, allesomvattende
manier is `querySelector`. Je geeft hem een **CSS-selector** mee, exact dezelfde selectors
die je uit CSS kent:

```js
// vind op id (let op de # zoals in CSS)
const titel = document.querySelector("#titel");

// vind op class (let op de .)
const eersteIntro = document.querySelector(".intro");

// vind op tagnaam
const knop = document.querySelector("button");
```

- `querySelector` geeft het **eerste** element terug dat past.
- Vind je niets, dan krijg je `null` terug (let daar later op).

Wil je **alle** passende elementen? Gebruik `querySelectorAll`, die geeft een **lijst** terug
waar je met een loop (Module 4!) doorheen kunt:

```js
const alleIntros = document.querySelectorAll(".intro");
console.log(alleIntros.length); // 2

for (const p of alleIntros) {
  console.log(p.textContent);
}
```

> Naast `querySelector` bestaan `getElementById` en `getElementsByClassName`. **Die zijn NIET
> verouderd**, ze zijn volledig geldig, worden veel gebruikt (ook op veel scholen) en
> `getElementById` is zelfs iets sneller. Het enige verschil: zij zoeken op één ding
> (alleen id, alleen class), terwijl `querySelector` elke CSS-selector slikt, dus één
> gereedschap voor alles. Daarom kies ik in deze cursus `querySelector`, maar gebruik gerust
> wat je cursus/school voorschrijft; je mag ze ook door elkaar gebruiken.
>
> ```js
> const titel = document.getElementById("titel");        // op id
> const items = document.getElementsByClassName("intro"); // op class
> ```

---

## 3. De inhoud lezen en veranderen

Heb je een element gevonden, dan kun je bij zijn tekst via **`textContent`**:

```js
const titel = document.querySelector("#titel");

console.log(titel.textContent);     // lezen → "Hallo"
titel.textContent = "Welkom Jonas"; // schrijven → de <h1> op de pagina verandert direct!
```

Dat is het. Eén regel en de pagina is veranderd. Ververs niet, het gebeurt live.

- `textContent` → de **tekst** (veilig, gebruik dit standaard).
- `innerHTML` → laat je ook HTML-tags meegeven, bijv. `titel.innerHTML = "<em>Welkom</em>"`.
  Krachtiger, maar wees voorzichtig: zet hier nooit zomaar tekst in die van een gebruiker komt
  (veiligheidsrisico). Voor gewone tekst: gebruik `textContent`.

---

## 4. Stijl en classes veranderen

### Rechtstreeks de stijl aanpassen

```js
const titel = document.querySelector("#titel");
titel.style.color = "blue";
titel.style.fontSize = "40px";
```

Let op: CSS-eigenschappen met een streepje (`font-size`) schrijf je in JavaScript in
**camelCase** (`fontSize`), net als variabelenamen uit Module 2.

### Beter: met classes werken

Rechtstreeks stijlen werkt, maar de nette manier is je opmaak in CSS te zetten en met
JavaScript alleen een **class** aan of uit te zetten. Stel je hebt in je CSS:

```css
.gemarkeerd { background-color: yellow; font-weight: bold; }
.verborgen  { display: none; }
```

Dan kun je in JavaScript:

```js
const titel = document.querySelector("#titel");

titel.classList.add("gemarkeerd");     // class toevoegen
titel.classList.remove("gemarkeerd");  // class weghalen
titel.classList.toggle("gemarkeerd");  // aan↔uit wisselen
```

`classList.toggle` is goud waard: één regel om iets om en om te zetten (bijv. een menu open/
dicht). Dit is de aanbevolen manier, opmaak hoort in CSS, gedrag in JavaScript.

---

## 5. Attributen aanpassen

Elementen hebben **attributen** (zoals `src` bij een afbeelding, `href` bij een link). Die kun
je ook lezen en zetten:

```js
const link = document.querySelector("a");
link.getAttribute("href");          // lezen
link.setAttribute("href", "https://nu.nl"); // zetten

// veelgebruikte attributen kunnen ook rechtstreeks:
const afbeelding = document.querySelector("img");
afbeelding.src = "kat.jpg";
```

> ⚠️ **Let op:** deze voorbeelden gaan ervan uit dat je pagina een `<a>` en een `<img>` bevat.
> De startpagina bovenaan deze module heeft die **niet**, dus als je dit zó draait, geeft
> `querySelector` `null` terug en krijg je een foutmelding. Wil je het uitproberen? Voeg dan
> eerst zo'n element toe in je `<body>`, bijvoorbeeld:
>
> ```html
> <a href="https://example.com">Een link</a>
> <img src="oud.jpg" alt="foto" />
> ```
>
> Daarna vinden `querySelector("a")` en `querySelector("img")` wél iets.

---

## 6. Nieuwe elementen maken en toevoegen

Je kunt ook compleet nieuwe elementen bouwen en in de pagina hangen. Drie stappen:

```js
// 1. maak een nieuw element
const nieuweP = document.createElement("p");

// 2. geef het inhoud
nieuweP.textContent = "Ik ben met JavaScript toegevoegd!";

// 3. hang het in de pagina (hier: onderaan de body)
document.body.appendChild(nieuweP);
```

Combineer dit met een loop en je kunt bijvoorbeeld een hele lijst opbouwen uit een array:

```js
const taken = ["Boodschappen", "Afwassen", "JavaScript leren"];
const lijst = document.createElement("ul");

for (const taak of taken) {
  const li = document.createElement("li");
  li.textContent = taak;
  lijst.appendChild(li);
}

document.body.appendChild(lijst);
```

Zie je hoe de bouwstenen samenkomen? Een **array** (Module 4), een **loop** (Module 4), en de
**DOM** (deze module) maken samen een dynamische lijst op je pagina.

---

## 7. Veelgemaakte fout: `null`

De allervaakste beginnersfout met de DOM:

```js
const knop = document.querySelector("#knpo"); // typfout in de selector!
knop.textContent = "Klik";  // ❌ TypeError: Cannot set properties of null
```

Wat is er aan de hand? `querySelector` vond niks (de id `knpo` bestaat niet), dus `knop` is
`null`. En `null` heeft geen `textContent`. De foutmelding **"... of null"** in de console is
je hint: *het element is niet gevonden*. Controleer dan:
- Heb je de selector goed gespeld (incl. `#` of `.`)?
- Staat je `<script>` wel **onder** het element (zie de tip helemaal bovenaan)?

Leren een foutmelding te lezen is een echte vaardigheid. Schrik er niet van, lees hem rustig.

---

## Samenvatting

- De **DOM** is de boomstructuur die de browser van je HTML maakt; via het object `document`
  kan JavaScript erin lezen en schrijven.
- Zoek elementen met **`document.querySelector("...")`** (eerste) of **`querySelectorAll`**
  (alle) met CSS-selectors (`#id`, `.class`, `tag`).
- Verander tekst met **`element.textContent`**.
- Verander opmaak het liefst via **`element.classList.add/remove/toggle(...)`** (opmaak in
  CSS), of desnoods rechtstreeks met `element.style.fontSize = "..."`.
- Maak nieuwe elementen met `document.createElement(...)` + `appendChild(...)`.
- Foutmelding met **"of null"** = element niet gevonden → check je selector en de plek van je
  script.

## Oefeningen

Gebruik de `module5.html` van bovenaan deze module.

1. **Titel wijzigen.** Zoek de `<h1>` op via zijn id en verander de tekst naar je eigen naam.

2. **Alle paragrafen.** Selecteer alle `.intro`-paragrafen met `querySelectorAll` en geef ze
   met een loop allemaal de tekst `"Aangepast door JavaScript"`.

3. **Markeren.** Voeg in een `<style>` in je `<head>` een class `.gemarkeerd` toe (gele
   achtergrond). Gebruik `classList.add` om de `<h1>` te markeren.

4. **Lijst opbouwen.** Maak een array met 4 van je hobby's. Bouw met een loop en
   `createElement`/`appendChild` een `<ul>` met die hobby's en hang die in de body.

5. **Fout lezen.** Typ bewust een verkeerde selector (`"#bestaatniet"`) en probeer er
   `.textContent` op te zetten. Lees de foutmelding in de console en schrijf in een commentaar
   in je eigen woorden wat er misging.

Klaar? In **Module 6 (Events)** maken we de knop écht werkend: code die draait wanneer de
gebruiker klikt. Dáár komt alles samen tot een interactieve pagina.
