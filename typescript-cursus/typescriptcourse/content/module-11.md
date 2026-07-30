# Module 11: Het framework, routing en navbar

Nu begint het echte werk. Bij het examen krijg je een setje bestanden, een klein **framework**, dat
je niet zelf moet schrijven maar wél moet **gebruiken** en **begrijpen**. In deze module ontleden we
die gegeven code (`CustomElement`, `Page`, `Router`) zodat je precies weet wat elk stuk doet. Daarna
zetten we de **eerste examenvraag** op: de twee pagina's bereikbaar maken via een **router** en een
**navbar** bovenaan. Dit is exact "stap 1" van de examenaanpak.

> We werken vanaf hier met de PC Builder-app als doorlopend voorbeeld (onderdelen + configuratie),
> maar de structuur is identiek voor élk examen van dit type (webshop, quiz, films…).

## 1. Herhaling: dit is "gegeven code", je begrijpt het, je bouwt het niet

De bestanden in `src/router/` (`customElement.ts`, `page.ts`, `router.ts`) en straks `src/data/`
(de providers) **krijg je**. Bovenaan staat zelfs letterlijk:

> *"Je KRIJGT deze code op het examen en moet hier geen aanpassingen aan doen. Je moet deze klasse
> enkel gebruiken."*

Waarom besteden we er dan een hele module aan? Omdat je **niets kunt gebruiken wat je niet snapt**.
Als je weet wat `render()`, `super(HTML)` of `data-link` doen, weet je ook meteen *waarom* je iets
op een bepaalde manier moet aanroepen, en waar het misgaat als je scherm leeg blijft. Dit is precies
het verschil tussen studenten die vastlopen en studenten die het examen halen.

## 2. De grote lijn: hoe hangt alles samen?

Voor we in de details duiken, het overzicht. Eén pagina in de browser, `index.html`, bevat maar één
belangrijk element:

```html
<body class="bg-dark">
  <div id="app"></div>                          <!-- hier komt ALLES in -->
  <script type="module" src="/src/main.ts"></script>
</body>
```

Alles wat je ziet, wordt door JavaScript ín die `<div id="app">` gezet. De stroom is:

```
index.html (#app)
      │  laadt
      ▼
main.ts ── registreert custom elements ──▶ (browser kent nu <custom-navbar> enz.)
      │
      └── maakt een Router met een { pad: Pagina }-map
                 │
                 ▼
            Router leest de URL (window.location.pathname)
                 │  kiest de juiste Pagina-klasse
                 ▼
            new Pagina()  ──▶  Pagina.render()  ──▶  zet HTML in #app
                 │
                 └── Router maakt alle [data-link]-links klikbaar (navigeren zonder herladen)
```

Onthoud deze drie spelers: **`Router`** (kiest de pagina op basis van de URL), **`Page`** (tekent een
pagina in `#app`), en **`CustomElement`** (een herbruikbaar stukje UI, bv. de navbar of een
onderdeel-kaart). We bekijken ze nu één voor één.

## 3. `CustomElement` ontleed

De browser laat je **je eigen HTML-tags** maken, bijvoorbeeld `<custom-navbar>` of `<custom-part>`.
Dat heet een *custom element*. Het framework geeft je een basisklasse die het saaie werk doet:

```ts
export abstract class CustomElement extends HTMLElement {
  protected componentBody: HTMLDivElement

  protected constructor(body: string) {
    super()
    this.componentBody = document.createElement('div')
    this.componentBody.innerHTML = body
  }

  // Wordt opgeroepen wanneer het element aan het DOM toegevoegd wordt.
  connectedCallback() {
    this.innerHTML = ''
    this.appendChild(this.componentBody)
  }
}
```

Stukje per stukje:

- **`extends HTMLElement`** — je element *is* een echt HTML-element (net als `<div>` of `<button>`),
  met alle DOM-mogelijkheden. Daarom kun je het straks met `document.createElement(...)` maken en in
  de pagina zetten.
- **`abstract`** — je maakt nooit rechtstreeks een `CustomElement`; je maakt een **subklasse** (bv.
  `CustomNavbar`) die de details invult. Vandaar ook `protected constructor` (alleen subklassen mogen
  hem aanroepen).
- **`constructor(body: string)`** — je geeft de HTML van het component als **string** mee (via
  `?raw`, Module 10). Die string wordt in een `<div>` (`componentBody`) gezet. Zo heeft het component
  zijn eigen stukje HTML klaar in het geheugen.
- **`connectedCallback()`** — een **speciale naam** die de browser **automatisch** aanroept zodra het
  element in de pagina verschijnt. Hier wordt de bewaarde HTML echt getoond (`appendChild`). Dit is
  het startsein van je component.

> **Belangrijk:** de namen `connectedCallback` (en later `attributeChangedCallback`,
> `observedAttributes`) zijn **geen verzinsels van de leraar**, het zijn officiële namen uit de
> **Web Components**-standaard van de browser. Het framework maakt daar handig gebruik van. Wil je een
> element gebruiken, dan moet je het eerst **registreren** (dat doe je in `main.ts`, zie sectie 6):
> ```ts
> window.customElements.define('custom-navbar', CustomNavbar)
> ```
> Pas na die regel weet de browser dat de tag `<custom-navbar>` bij jouw klasse `CustomNavbar` hoort.

## 4. `Page` ontleed

Een **pagina** is de volledige inhoud van één scherm (de onderdelen-pagina, de configuratie-pagina).
Ook hier geeft het framework je een basisklasse:

```ts
export abstract class Page {
  protected readonly body: HTMLDivElement
  protected unsubscribe: Unsubscribe[] = []
  static readonly #root = document.querySelector<HTMLDivElement>('#app')!

  protected constructor(body: string) {
    this.body = document.createElement('div')
    this.body.innerHTML = body
  }

  render() {
    Page.#root.innerHTML = ''
    Page.#root.appendChild(this.body)
  }

  cleanup() {
    this.unsubscribe.forEach(x => x())
    this.unsubscribe = []
  }
}
```

- **`#root`** — de vaste `<div id="app">` uit `index.html`. Alle pagina's tekenen zichzelf daarin.
  Het is `static` (van de klasse, niet van één pagina) omdat er maar **één** `#app` is.
- **`constructor(body: string)`** — net als bij `CustomElement` geef je de HTML van de pagina als
  string mee (`import HTML from './parts.html?raw'`). Die komt in `this.body`.
- **`render()`** — maakt `#app` leeg en zet er de HTML van deze pagina in. **Dit is de methode die je
  in je eigen pagina's gaat overschrijven** om er meer te laten gebeuren dan enkel de basis-HTML
  tonen (in Module 12 bouwen we daar per onderdeel een kaartje bij). Roep je zelf iets, vergeet dan
  niet eerst `super.render()` te doen (dat tekent de basis-HTML).
- **`unsubscribe` + `cleanup()`** — dit hoort bij het **observer-patroon** van de data-providers
  (Module 12). Kort: als je een pagina verlaat, moet je "luisteraars" opruimen zodat ze niet blijven
  hangen. `cleanup()` doet dat. Je hoeft er nu nog niets mee; onthoud dat het bestaat.

## 5. `Router` ontleed

De **Router** zorgt dat de juiste pagina getoond wordt op basis van de URL, en dat links werken
**zonder de pagina te herladen** (een *single-page app*).

```ts
type ConcretePage = new () => Page          // "een Page-klasse die je met new kunt aanmaken"
type RouteMap = Record<string, ConcretePage> // { '/pad': PaginaKlasse }

export class Router {
  readonly #pages: RouteMap
  #activePage: Page | null = null

  constructor(pages: RouteMap) {
    this.#pages = pages
    const pathName = window.location.pathname
    this.navigate(this.#pages[pathName] ? pathName : '/')  // bestaat het pad? anders naar '/'
  }

  navigate(path: string) {
    this.#activePage?.cleanup()             // ruim de vorige pagina op
    this.#activePage = new this.#pages[path]()  // maak de nieuwe pagina
    this.#activePage.render()               // teken ze in #app
    this.#setupRouter()                     // maak de links klikbaar
  }

  #setupRouter() {
    document.querySelectorAll('[data-link]')?.forEach(link => {
      const path = link.getAttribute('data-link')!
      link.addEventListener('click', evt => {
        evt.preventDefault()                // geen volledige herlaad
        window.history.pushState(null, '', `${window.location.origin}${path}`)
        this.navigate(path)                 // toon de nieuwe pagina meteen
      })
    })
  }
}
```

De kern:

- **`RouteMap`** is een `Record<string, ConcretePage>` (zie Module 8: utility types!) — dus een
  object dat elk **pad** (`'/'`, `'/build'`) koppelt aan een **pagina-klasse**. Dat geef je zelf mee
  in `main.ts`.
- **`ConcretePage = new () => Page`** is een type dat zegt: *"een klasse die je met `new` en zónder
  argumenten kunt aanmaken en die een `Page` oplevert."* Daarom moeten je pagina-constructors
  **parameterloos** zijn.
- **De constructor** leest bij het opstarten de huidige URL (`window.location.pathname`) en navigeert
  naar die pagina (of naar `'/'` als het pad onbekend is).
- **`navigate(path)`** doet telkens vier dingen: oude pagina opruimen → nieuwe pagina maken → renderen
  → links opnieuw klikbaar maken.
- **`#setupRouter()`** zoekt elk element met een **`data-link`**-attribuut en vangt de klik op:
  `preventDefault()` voorkomt de normale (volledige) herlaad, `pushState` past de URL in de balk aan,
  en `navigate` toont meteen de nieuwe pagina. Dát is het "zonder herladen"-gevoel van een moderne app.

> **Dit verklaart de navbar-links.** Een link met `data-link="/build"` wordt door de Router
> omgetoverd tot een interne navigatie. Een gewone `<a href="/build">` zónder `data-link` zou de hele
> pagina herladen (werkt ook, maar minder vloeiend).

## 6. Nu zelf: stap 1 — routing + navbar opzetten

Je snapt de machinerie; nu sluiten we ze aan. Doel: de twee pagina's (`/` en `/build`) bereikbaar
maken met een navbar bovenaan. Vier kleine stukjes.

### 6a. Een minimaal `.ts`-bestand per pagina

De startbestanden geven je de **HTML** van de pagina's (`parts.html`, `build.html`), maar niet altijd
het `.ts`-bestand. Maak dat, zodat `main.ts` de pagina kan importeren. Meer dan dit heb je voor stap
1 niet nodig, de `render()` van de basisklasse toont de HTML al:

```ts
// pages/parts/parts.ts
import {Page} from '../../router/page.ts'
import HTML from './parts.html?raw'

export class PartsPage extends Page {
  constructor() {
    super(HTML)   // geef de pagina-HTML door aan de basisklasse
  }
  // render() overschrijven we later (Module 12), nu volstaat de basis.
}
```

Doe hetzelfde voor `pages/build/build.ts` → `BuildPage`.

> **Examen-tip (uit de opgave).** De opgave raadt aan om in stap 1 al **voor élke pagina én elk
> custom element** zo'n minimaal `.ts`-bestand te maken (dat enkel de HTML toont) en ze **allemaal
> meteen in `main.ts` te registreren**. Zo is alles importeerbaar en kun je meteen testen, je
> verliest er geen tijd mee. In deze cursus introduceren we de item-componenten (`part.ts`,
> `buildItem.ts`) bewust pas in de module waar we ze echt gebruiken (Module 12 en 13), zodat je ze
> rustig leert. Op het examen mag je gerust de "maak alles ineens aan"-aanpak volgen, dat is net
> sneller.

### 6b. De navbar als je eerste custom element

De navbar is het eenvoudigste custom element: het toont enkel vaste HTML, zonder attributen. Perfect
om het patroon te leren:

```ts
// components/navbar/navbar.ts
import {CustomElement} from '../../router/customElement.ts'
import HTML from './navbar.html?raw'

export class CustomNavbar extends CustomElement {
  constructor() {
    super(HTML)   // geef de component-HTML door aan de basisklasse
  }
}
```

De bijbehorende `navbar.html` bevat de links **met `data-link`** (zodat de Router ze oppikt, zie
sectie 5):

```html
<nav class="navbar ...">
  <span class="navbar-brand ...">🖥 PC Builder</span>
  <div class="d-flex gap-4">
    <a href="/" data-link="/" class="nav-link">Onderdelen</a>
    <a href="/build" data-link="/build" class="nav-link">Mijn configuratie</a>
  </div>
</nav>
```

### 6c. De navbar bovenaan elke pagina zetten

In `parts.html` en `build.html`, als eerste regel:

```html
<custom-navbar></custom-navbar>
```

Omdat we `CustomNavbar` zo dadelijk registreren onder de tag `custom-navbar`, weet de browser deze
tag in te vullen met jouw navbar.

### 6d. `main.ts` — registreren + de router aanmaken

Dit is de lijm. Hier registreer je elk custom element en koppel je elk pad aan een pagina:

```ts
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {Router} from './router/router.ts'

import {PartsPage} from './pages/parts/parts.ts'
import {BuildPage} from './pages/build/build.ts'
import {CustomNavbar} from './components/navbar/navbar.ts'

// 1) registreer de custom elements (tag-naam ↔ klasse)
window.customElements.define('custom-navbar', CustomNavbar)

// 2) koppel elk pad aan de juiste pagina
new Router({
  '/': PartsPage,
  '/build': BuildPage,
})
```

> **Voor de navbar is de tag verplicht `custom-navbar`** (dat vraagt de opgave). Voor je eigen
> elementen (de onderdeel-kaart later) mag je de naam zelf kiezen, zolang je **exact dezelfde string**
> gebruikt bij `define(...)` én bij `document.createElement(...)`. Een typo daar = een leeg, onbekend
> element zonder foutmelding.

✅ **Test:** open de app. Je ziet de navbar bovenaan, en je kunt via de links wisselen tussen de
onderdelen-pagina (`/`) en de configuratie-pagina (`/build`), zonder dat de pagina volledig herlaadt.

## Samenvatting

- Het examen geeft je een klein **framework** (`CustomElement`, `Page`, `Router`). Je past het niet
  aan, maar je moet **begrijpen** wat het doet.
- Alles wordt in **`<div id="app">`** getekend. **`main.ts`** registreert de custom elements en maakt
  een **`Router`** met een `{ pad: Pagina }`-map.
- **`CustomElement`** (extends `HTMLElement`): je geeft HTML als string mee (`super(body)`);
  `connectedCallback()` toont ze zodra het element in de DOM komt. Registreren met
  `customElements.define('tag', Klasse)`.
- **`Page`**: `constructor(super(HTML))` zet de pagina-HTML klaar; **`render()`** tekent ze in `#app`
  (die overschrijf je later); `cleanup()`/`unsubscribe` horen bij het observer-patroon (Module 12).
- **`Router`**: kiest de pagina op basis van `window.location.pathname` en maakt elk **`data-link`**
  klikbaar (navigeren zonder herladen).
- **Stap 1** = per pagina een minimaal `.ts`-bestand, de navbar als custom element (met `data-link`),
  `<custom-navbar>` in elke pagina-HTML, en in `main.ts` registreren + de `Router` aanmaken.

## Oefeningen

Werk in de frontend van de examen-startcode (of een kopie ervan). Zorg dat de server draait (poort
3000) en start de frontend met `pnpm dev`.

> **Zelfreflectie, geen oplossing.** Oefeningen 1 en 6 zijn **kijk-/leesoefeningen**: je onderzoekt
> de code en noteert je bevindingen zélf. Daar is bewust **geen uitgewerkte oplossing** voor, het
> gaat om je eigen begrip. De code-oefeningen (2–5) bouwen samen stap 1 op; die kun je vergelijken
> met de uitgewerkte cursus-app.

1. **Framework lezen.** Open `router/customElement.ts`, `router/page.ts` en `router/router.ts`. Zoek
   in elk bestand: waar wordt de meegegeven HTML-string in de DOM gezet? Noteer per klasse de methode
   (bv. `connectedCallback`, `render`).

2. **Pagina-stubs.** Maak `pages/parts/parts.ts` (`PartsPage`) en `pages/build/build.ts` (`BuildPage`)
   die enkel `super(HTML)` doen met hun eigen `.html`.

3. **Navbar-component.** Maak `components/navbar/navbar.ts` (`CustomNavbar`) dat `super(HTML)` doet met
   `navbar.html`.

4. **Registreren + routes.** Vul `main.ts` aan: registreer `custom-navbar` en maak een `Router` met
   `'/' → PartsPage` en `'/build' → BuildPage`.

5. **Navbar tonen + links.** Zet `<custom-navbar></custom-navbar>` bovenaan `parts.html` en
   `build.html`, en zorg dat de links in `navbar.html` een `data-link` hebben. Test dat je tussen
   beide pagina's kunt navigeren.

6. **Begrip checken.** Verander in `navbar.html` één link zodat je het `data-link`-attribuut weglaat
   (enkel `href` blijft). Klik erop en merk het verschil: de pagina **herlaadt volledig** i.p.v.
   vloeiend te navigeren. Verklaar dit met sectie 5 (`#setupRouter` / `preventDefault`). Zet het daarna
   terug.

Klaar? In **Module 12** halen we **echte data uit de API** (de `RestPersistenceProvider` en het
**observer-patroon**) en renderen we per onderdeel een custom element met **attributen**, plus
filteren en verwijderen. Dat is de zwaarste examenvraag, en nu snap je het fundament eronder.
