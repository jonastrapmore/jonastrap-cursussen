# Module 12: Data ophalen en renderen (providers & observer)

Dit is de zwaarste examenvraag (vaak 4–5 punten): **alle items uit de API halen en tonen**, elk met
een eigen custom element. Je leert de gegeven **`RestPersistenceProvider`** en het
**observer-patroon** kennen, je bouwt je eerste **data-component** (met attributen), en je vult de
`render()` van je pagina in. Aan het eind verschijnen de PC-onderdelen echt op het scherm.

> We werken verder in de cursus-app (`pc-builder-app`). Zorg dat de **server draait** (poort 3000)
> en de frontend met `pnpm dev`.

## 1. Het idee: data, observers en de UI

De aanpak van dit framework draait om één patroon, het **observer-patroon**:

1. Een **provider** is je databron (de API, of straks localStorage). Hij haalt data op en bewaart ze.
2. Je pagina **abonneert** zich op die provider met `addObserver(...)`. Je geeft een functie mee die
   moet lopen **telkens de data verandert**.
3. Roep je `getAll()` (of later `create`/`delete`), dan haalt de provider de data op en
   **verwittigt** al zijn observers. Jouw functie loopt, en tekent de UI opnieuw.

Het mooie: je UI en je data zijn **losgekoppeld**. Jij zegt één keer "als de data wijzigt, herteken
ik", en daarna hoef je je nooit meer af te vragen wanneer je moet hertekenen, de provider roept je
vanzelf op. Dit is exact waarom de opgave zegt: *"zorg dat elke wijziging meteen zichtbaar is via het
observer-patroon."*

## 2. De gegeven provider ontleed

In `src/data/` krijg je (net als het framework: **niet aanpassen, wel begrijpen**) een basisklasse
`PersistenceProvider` en twee concrete versies. Eerst de basis:

```ts
export interface Persistable {
  id: string            // alles wat een provider bewaart, heeft minstens een id
}

export type ChangeObserver<T extends Persistable> = (data: T[]) => void
export type Unsubscribe = () => void

export abstract class PersistenceProvider<T extends Persistable> {
  protected observers: ChangeObserver<T>[] = []

  addObserver(observer: ChangeObserver<T>): Unsubscribe {
    this.observers.push(observer)                    // onthoud deze luisteraar
    return () => {                                   // geef een "opzeg"-functie terug
      this.observers = this.observers.filter(x => x !== observer)
    }
  }

  protected notifyObservers(data: T[]) {
    this.observers.forEach(observer => observer(data))  // roep ALLE luisteraars op
  }

  abstract getAll(): Promise<T[]>
  abstract create(data: Omit<T, 'id'>): Promise<T>
  abstract delete(id: string): Promise<void>
  // ... get, update
}
```

Herken je Module 8 (**generics** én de utility type `Omit`)? `PersistenceProvider<T extends Persistable>`
is een generieke klasse: `T` is het type dat hij bewaart (bij ons `Part`), met als enige eis dat het
een `id` heeft. En `create(data: Omit<T, 'id'>)` zegt: *"om iets te maken geef je alle velden mee
behalve het id"* (dat maakt de server). Dit is precies waarom je die modules eerst leerde.

- **`addObserver(fn)`** — registreert je functie en geeft een **`Unsubscribe`** terug: een functie
  die, als je ze aanroept, je luisteraar weer opzegt. (Herinner je `unsubscribe`/`cleanup()` uit
  `Page`, Module 11? Daar stop je die opzeg-functies in, zodat ze opgeruimd worden als je de pagina
  verlaat.)
- **`notifyObservers(data)`** — roept elke geregistreerde functie op met de nieuwe data. Dit doet de
  provider zelf, na elke wijziging.

Nu de **`RestPersistenceProvider`** (praat met de API via `fetch`):

```ts
export class RestPersistenceProvider<T extends Persistable> extends PersistenceProvider<T> {
  #baseUrl: string
  #cachedData: T[] = []

  constructor(baseUrl: string) {
    super()
    this.#baseUrl = baseUrl        // bv. 'http://localhost:3000/parts'
  }

  async getAll(): Promise<T[]> {
    const response = await fetch(this.#baseUrl)         // haal op via de API
    if (!response.ok) throw new Error(...)
    this.#cachedData = await response.json()            // bewaar de lijst
    this.notifyObservers(this.#cachedData)              // ⭐ verwittig alle observers
    return this.#cachedData
  }

  async delete(id: string): Promise<void> {
    await fetch(`${this.#baseUrl}/${id}`, {method: 'DELETE'})   // verwijder via API
    this.#cachedData = this.#cachedData.filter(item => item.id !== id)
    this.notifyObservers(this.#cachedData)              // ⭐ opnieuw: verwittig observers
  }
  // create, get, update: zelfde idee (fetch + cache bijwerken + notifyObservers)
}
```

De kern om te onthouden: **elke methode die de data wijzigt, roept op het einde `notifyObservers`
aan.** Daardoor hertekent jouw pagina automatisch. Jij hoeft `fetch` of `notifyObservers` **nooit
zelf** te schrijven, je gebruikt gewoon `getAll()`, `delete()`, enz.

## 3. De provider aanmaken in `data.ts`

In `src/data/data.ts` maak je één instantie van de provider voor jouw model. **Het type tussen
`< >` is verplicht** (Module 8):

```ts
import {RestPersistenceProvider} from './restPersistenceProvider.ts'
import type {Part} from '../models/part.ts'

// De API-route komt uit de opgave: http://localhost:3000/parts
export const PartRestProvider = new RestPersistenceProvider<Part>('http://localhost:3000/parts')
```

> ⚠️ **Vergeet `<Part>` niet.** Zonder dat type weet de provider niet wélke objecten hij bevat, en
> krijg je later fouten als *"property 'name' bestaat niet"*. Kies hier een **model** uit `models/`
> (`Part`), niet een component-klasse.

## 4. Het data-component: `part.ts`

Nu bouwen we het custom element dat **één onderdeel** toont. De HTML (`partCard/part.html`) krijg je;
daarin staan elementen met id's (`#name`, `#price`, `#category`). Jouw `.ts` vult die.

```ts
import HTML from './part.html?raw'
import {CustomElement} from '../../router/customElement.ts'

export class CustomPart extends CustomElement {
  // 1) welke attributen houden we in de gaten? (in kebab-case!)
  static observedAttributes = ['name', 'price', 'category']

  // 2) verwijzingen naar de plekken in part.html (via hun id)
  #name = this.componentBody.querySelector<HTMLHeadingElement>('#name')!
  #price = this.componentBody.querySelector<HTMLParagraphElement>('#price')!
  #category = this.componentBody.querySelector<HTMLSpanElement>('#category')!

  constructor() {
    super(HTML)
  }

  // 3) reageer telkens een attribuut wijzigt
  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'name':
        this.#name.innerText = newValue
        break
      case 'price':
        // newValue is ALTIJD een string -> omzetten en mooi tonen
        this.#price.innerText = Number(newValue).toFixed(2) + ' EUR'
        break
      case 'category':
        this.#category.innerText = newValue
        break
    }
  }
}
```

Drie dingen die je moet snappen:

- **`static observedAttributes`** — een lijst (kebab-case) van de attributen die je wil "volgen". Alleen
  attributen die hier staan, laten `attributeChangedCallback` lopen.
- **`attributeChangedCallback(name, old, new)`** — een **standaard Web Components-methode** (Module 11):
  de browser roept ze **automatisch** aan telkens zo'n attribuut wijzigt. In de `switch` bepaal je per
  attribuut wat je met de nieuwe waarde doet.
- **Alles is een string.** Je kunt aan een custom element **enkel strings** doorgeven. Een getal
  (`price`) komt binnen als string; vandaar `Number(newValue).toFixed(2)`.

> **Waarom kebab-case?** De browser maakt attribuutnamen sowieso lowercase. Een JSON-veld
> `correctAnswer` wordt het attribuut `correct-answer`. Bij `Part` (`name`, `price`, `category`) is dat
> niet zichtbaar, maar onthoud de regel voor examens met samengestelde veldnamen.

## 5. De pagina `parts.ts`: de drie dingen die een pagina doet

Nu knopen we het aan elkaar in `pages/parts/parts.ts`. **Onthoud deze gouden regel** (ze komt overal
terug): een pagina doet **drie dingen** →
**(a)** een observer registreren, **(b)** `getAll()` oproepen, **(c)** in `render()` per item een
custom element maken en de data via **attributen** doorgeven.

```ts
import {Page} from '../../router/page.ts'
import HTML from './parts.html?raw'
import type {Part} from '../../models/part.ts'
import {PartRestProvider} from '../../data/data.ts'

export class PartsPage extends Page {
  #parts: Part[] = []
  // de container uit parts.html waarin de kaarten komen
  #container = this.body.querySelector<HTMLDivElement>('#parts')!

  constructor() {
    super(HTML)

    // (a) observer: bij elke datawijziging de nieuwe lijst bewaren + hertekenen
    this.unsubscribe.push(PartRestProvider.addObserver(parts => {
      this.#parts = parts
      this.render()
    }))

    // (b) ophalen via de API -> verwittigt de observer -> (a) loopt -> render()
    void PartRestProvider.getAll()
  }

  render(): void {
    super.render()   // teken eerst de basis-HTML (navbar + lege container)

    // (c) container leegmaken en per onderdeel een custom element bouwen
    this.#container.innerHTML = ''
    this.#parts.map(part => {
      const el = document.createElement('custom-part')  // ZELFDE naam als in main.ts!
      el.setAttribute('id', part.id)                     // id altijd meegeven (nodig later)
      el.setAttribute('name', part.name)
      el.setAttribute('price', part.price.toFixed(2))
      el.setAttribute('category', part.category)
      this.#container.appendChild(el)
    })
  }
}
```

Belangrijke details:

- **`super.render()` eerst.** Dat tekent de pagina-HTML (met navbar en de lege `#parts`-container).
  Daarna vul jij die container. Vergeet je `super.render()`, dan blijft je scherm leeg.
- **`void PartRestProvider.getAll()`** — `getAll()` geeft een `Promise` terug; met `void` zeg je "ik
  wacht hier niet op, de observer regelt de UI wel". De data komt binnen → observer loopt → `render()`.
- **`document.createElement('custom-part')`** — deze string moet **exact** gelijk zijn aan wat je in
  `main.ts` registreert (volgende stap). Een typo = een leeg, onbekend element (geen foutmelding).
- **Elke `setAttribute('naam', ...)`** moet overeenkomen met een naam in `observedAttributes` (+ een
  `case`) in `part.ts`. Anders blijft dat veld leeg.

Ten slotte registreer je het component in `main.ts` (naast de navbar uit Module 11):

```ts
import {CustomPart} from './components/partCard/part.ts'
window.customElements.define('custom-part', CustomPart)
```

✅ **Test:** open `/`. Alle PC-onderdelen verschijnen als kaartjes, met naam, prijs en categorie.

> **Alternatief uit de opgave (voor deelpunten):** krijg je de provider niet werkend, dan mag je een
> gewone `Part[]`-array hardcoderen en die renderen, voor maximaal 3 van de 5 punten. De renderlogica
> (stap c) blijft identiek; alleen de databron verschilt. Maar mik op de volle punten met de provider.

## 6. Ook vaak gevraagd (niet in PC Builder): filteren

De PC Builder vraagt geen filter, maar **veel examens wel** (webshop, quiz). Het idee: je filtert de
lijst in `render()` vóór je de kaarten maakt, via een aparte hulpfunctie. Kort:

```ts
  // verwijzingen naar de filtervelden uit je HTML
  #nameFilter = this.body.querySelector<HTMLInputElement>('#name-filter')!

  // in de constructor: hertekenen bij elke wijziging (of op een filterknop)
  this.#nameFilter.addEventListener('change', () => this.render())

  // in render(): filteren vóór het mappen
  this.#parts
    .filter(part => this.#matchesFilter(part))
    .map(part => { /* ... kaart maken zoals hierboven ... */ })

  #matchesFilter(part: Part): boolean {
    // deel van de naam, niet-hoofdlettergevoelig:
    return part.name.toLowerCase().includes(this.#nameFilter.value.toLowerCase())
  }
```

> **Valkuil (radio-knoppen):** een radio-`input` z'n `.value` is altijd dezelfde, ook als hij niet
> aangevinkt is. Lees de aangevinkte met `querySelector('input[name="..."]:checked')`. Bij een
> `<select>` werkt `.value` wél meteen. Combineer meerdere filters met `&&` zodat ze samen werken.

## 7. Ook vaak gevraagd (niet in PC Builder): verwijderen uit de database

Ook dit heeft de PC Builder niet, maar veel examens wel: een vuilbak-knop die een item **via de API**
verwijdert. De knop zit **in het component**, en je roept gewoon `delete` op de provider aan:

```ts
// in part.ts (of het item-component):
import {PartRestProvider} from '../../data/data.ts'

  #deleteBtn = this.componentBody.querySelector<HTMLButtonElement>('#delete')!

  constructor() {
    super(HTML)
    // this.id = het 'id'-attribuut dat de pagina meegaf
    this.#deleteBtn.addEventListener('click', () => PartRestProvider.delete(this.id))
  }
```

Waarom werkt de UI vanzelf bij? `delete()` roept `notifyObservers` aan → je pagina-observer loopt →
`render()`. **Daarom geef je in stap c altijd het `id` mee.** Geen extra herteken-code nodig.

## Samenvatting

- Een **provider** is je databron; via het **observer-patroon** (`addObserver`) laat je je pagina
  automatisch hertekenen telkens de data wijzigt.
- Elke provider-methode die data wijzigt (`getAll`, `create`, `delete`, …) roept `notifyObservers`
  aan. Jij schrijft nooit zelf `fetch`.
- Maak in `data.ts` één provider met het **verplichte** type: `new RestPersistenceProvider<Part>(url)`.
- Een **data-component** heeft `static observedAttributes` (kebab-case) + `attributeChangedCallback`
  (standaard Web Components) + verwijzingen naar de HTML-id's. **Alles is een string.**
- Een pagina doet **drie dingen**: (a) observer registreren, (b) `getAll()`, (c) in `render()` per
  item een custom element maken en data via **attributen** doorgeven (id altijd mee). Begin `render()`
  met `super.render()`.
- **Filteren** (stap 3) en **verwijderen uit de database** (stap 4) horen niet bij de PC Builder,
  maar wél bij veel andere examens; het patroon is telkens hetzelfde.

## Oefeningen

Werk in de cursus-app (`pc-builder-app`), server op poort 3000 + `pnpm dev`.

> **Zelfreflectie, geen oplossing:** oefeningen 1 en 6 zijn kijk-/leesoefeningen; die werk je zelf
> uit. De code-oefeningen (2–5) bouwen samen stap 2 op en staan uitgewerkt in de cursus-app.

1. **Provider lezen.** Open `data/restPersistenceProvider.ts`. Zoek in `getAll()` en `delete()` de
   regel `this.notifyObservers(...)`. Noteer in je eigen woorden waarom die regel ervoor zorgt dat je
   scherm vanzelf bijwerkt.

2. **Provider aanmaken.** Maak in `data/data.ts` de `PartRestProvider` aan met
   `new RestPersistenceProvider<Part>('http://localhost:3000/parts')`.

3. **Component bouwen.** Maak `components/partCard/part.ts` (`CustomPart`) met `observedAttributes`
   voor `name`, `price`, `category`, verwijzingen naar `#name`/`#price`/`#category`, en een
   `attributeChangedCallback` die ze invult (prijs met `.toFixed(2)`).

4. **Registreren.** Voeg in `main.ts` toe: `window.customElements.define('custom-part', CustomPart)`.

5. **Pagina renderen.** Vul in `pages/parts/parts.ts` de drie dingen in: (a) observer, (b) `getAll()`,
   (c) `render()` die per onderdeel een `custom-part` maakt en `id`, `name`, `price`, `category` als
   attributen meegeeft. Test dat alle onderdelen verschijnen.

6. **Naam-mismatch uitlokken.** Verander in `parts.ts` één keer `setAttribute('name', ...)` in
   `setAttribute('naam', ...)`. Wat gebeurt er met dat veld op de kaart, en waarom? (Denk aan
   `observedAttributes`.) Zet het daarna terug.

Klaar? In **Module 13** voegen we onderdelen toe aan je **configuratie** (met een **custom event** en
**localStorage**), tonen we de tweede pagina en verwijderen we eruit, dat completeert de app.
