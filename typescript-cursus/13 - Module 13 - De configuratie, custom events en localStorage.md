# Module 13: De configuratie — custom events & localStorage

Nu maken we de app compleet. Je kunt onderdelen tonen (Module 12); in deze module voeg je ze toe aan
je **eigen configuratie**, bewaar je die in **localStorage**, toon je ze op de **tweede pagina**, en
verwijder je ze er weer uit. Onderweg leer je **custom events** (hoe een component met zijn pagina
praat) en de **`LocalStoragePersistenceProvider`**. Dit dekt de examenvragen "toevoegen" (stap 5),
"configuratie renderen" (stap 6) en "verwijderen uit de configuratie" (stap 7).

> Verder in de cursus-app (`pc-builder-app`). Server op poort 3000 + `pnpm dev`.

## 1. Wat gaan we bouwen?

- Op de **onderdelen-pagina**: een `+`-knop per kaart die het onderdeel aan je configuratie toevoegt
  (en een ✓ toont als het er al in zit). Zit er al een onderdeel van **dezelfde categorie** in, dan
  een melding en **niets opslaan**.
- De configuratie bewaren we in **localStorage**, zodat ze blijft na een refresh.
- Op de **configuratie-pagina** (`/build`): de opgeslagen onderdelen tonen, met een **totaalprijs**.
- Een **X-knop** per regel om een onderdeel uit de configuratie te halen.

## 2. De `LocalStoragePersistenceProvider` ontleed

Je kent al de `RestPersistenceProvider` (praat met de API). De **`LocalStoragePersistenceProvider`**
is exact hetzelfde patroon (dezelfde methodes, hetzelfde observer-gedrag), maar bewaart in de
**localStorage** van de browser in plaats van op een server:

```ts
export class LocalStoragePersistenceProvider<T extends Persistable> extends PersistenceProvider<T> {
  readonly key: string
  #data: T[] = []

  constructor(key: string, initialData: T[] = []) {
    super()
    this.key = key
    const localData = localStorage.getItem(key)     // bij opstart: inladen uit localStorage
    this.#data = localData ? JSON.parse(localData) : initialData
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    const newObject = {...data, id: window.crypto.randomUUID()} as T  // zelf een id genereren
    this.#data.push(newObject)
    localStorage.setItem(this.key, JSON.stringify(this.#data))        // opslaan
    this.notifyObservers(this.#data)                                  // observers verwittigen
    return newObject
  }

  async delete(id: string): Promise<void> {
    this.#data = this.#data.filter(x => x.id !== id)
    localStorage.setItem(this.key, JSON.stringify(this.#data))
    this.notifyObservers(this.#data)
  }

  async getAll(): Promise<T[]> {
    this.notifyObservers(this.#data)   // de lijst zit al in het geheugen (uit de constructor)
    return this.#data
  }
  // get, update: idem
}
```

Belangrijke verschillen met de REST-provider:

- **De sleutel (`key`)** bepaalt onder welke naam alles in localStorage staat (bij ons `'build'`).
- **`create` genereert zelf een `id`** met `window.crypto.randomUUID()` (geen server die dat doet).
  Daarom geef je bij `create` alles **behalve** het id mee (`Omit<T, 'id'>`, Module 8).
- **`localStorage.setItem`** schrijft weg; jij roept dit **nooit zelf** aan, de provider doet het.

Net als bij de REST-provider roept elke wijzigende methode **`notifyObservers`** aan → je UI werkt
vanzelf bij. Je gebruikt dezelfde `addObserver` / `getAll` / `create` / `delete`.

## 3. Het model: een "collectie-item"

Kijk naar `models/buildItem.ts`:

```ts
import type {Part} from './part'

export interface BuildItem {
  id: string     // een EIGEN id van deze configuratie-regel
  part: Part     // het onderdeel dat erin zit
}
```

Let op het onderscheid: een **`BuildItem`** is niet hetzelfde als een **`Part`**. Het is een
*regel in je configuratie* die een `Part` **omhult** en een **eigen** `id` heeft. Dat eigen id gebruik
je straks om die regel te verwijderen (niet het id van het onderdeel zelf). Dit verwarren is een
klassieke bron van bugs, dus hou het scherp:
- `part.id` → het id van het onderdeel (uit de API).
- `buildItem.id` → het id van de configuratie-regel (door de localStorage-provider gemaakt).

## 4. Stap 5a — de tweede provider in `data.ts`

Naast `PartRestProvider` maak je nu een localStorage-provider voor de configuratie:

```ts
import {LocalStoragePersistenceProvider} from './localStoragePersistenceProvider.ts'
import type {BuildItem} from '../models/buildItem.ts'

// 'build' is de localStorage-sleutel; <BuildItem> is verplicht (Module 8)
export const BuildLocalProvider = new LocalStoragePersistenceProvider<BuildItem>('build')
```

## 5. Stap 5b — het custom event in `part.ts`

Een component mag **niet rechtstreeks** aan de data van de pagina zitten. Daarom **roept** de kaart
iets af als je op `+` klikt (een **custom event**), en de **pagina luistert** ernaar. Twee helften:

**In de kaart (`part.ts`) — afvuren.** Voeg een knop-verwijzing en een click-listener toe die een
event afvuurt, plus `'is-added'` aan `observedAttributes` om de knopstaat te tonen:

```ts
  static observedAttributes = ['name', 'price', 'category', 'is-added']  // 'is-added' erbij
  #addBtn = this.componentBody.querySelector<HTMLButtonElement>('#add-button')!

  constructor() {
    super(HTML)
    // vuur een custom event af naar de pagina. De NAAM ('addToBuild') kies je zelf,
    // maar hij moet exact gelijk zijn waar de pagina eropluistert (stap 5c).
    this.#addBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('addToBuild'))
    })
  }
```

En een `case 'is-added'` in je `attributeChangedCallback` om de knop te wisselen:

```ts
      case 'is-added':
        if (newValue === 'true') {
          this.#addBtn.setAttribute('class', 'btn btn-success btn-sm')
          this.#addBtn.innerHTML = '&check;'   // ✓ -> innerHTML (niet innerText!) voor het symbool
        } else {
          this.#addBtn.setAttribute('class', 'btn btn-outline-primary btn-sm')
          this.#addBtn.innerHTML = '+'
        }
        break
```

> **Detail:** een HTML-symbool zoals `&check;` toon je met **`innerHTML`**, niet `innerText` (anders
> zie je letterlijk de tekst `&check;`). En `setAttribute('class', ...)` **overschrijft** alle classes,
> zet er dus de volledige set in.

## 6. Stap 5c — de pagina luistert, met de categorie-check

Nu de andere helft, in `parts.ts`. Je hebt drie dingen nodig:

**(1) Een observer op de localStorage-provider** (zodat de `is-added`-knop klopt en meteen bijwerkt),
naast je bestaande observer op de API-data:

```ts
  #build: BuildItem[] = []

  // in de constructor, naast de PartRestProvider-observer:
  this.unsubscribe.push(BuildLocalProvider.addObserver(data => {
    this.#build = data
    this.render()
  }))
  void BuildLocalProvider.getAll()
```

**(2) Per onderdeel: bepaal of het al in de configuratie zit en zet `is-added`:**

```ts
  // in render(), binnen je .map(part => { ... }):
  const existing = this.#build.find(b => b.part.id === part.id)
  el.setAttribute('is-added', existing ? 'true' : 'false')
```

**(3) Luister op het event en voeg toe of verwijder** — met de **categorie-controle**:

```ts
  el.addEventListener('addToBuild', () => {
    if (existing) {
      // zit er al in -> eruit halen
      void BuildLocalProvider.delete(existing.id)     // existing.id = het BUILD-item id!
      return
    }
    // zit er al een onderdeel van DEZELFDE categorie in? -> melding en verder niets
    if (this.#build.some(b => b.part.category === part.category)) {
      window.alert(`Er zit al een onderdeel van de categorie "${part.category}" in de configuratie.`)
      return
    }
    // anders: toevoegen (id maakt de provider zelf)
    void BuildLocalProvider.create({ part })
  })
```

> ⚠️ **De klassieke fout hier** (en een echte bug die we in een oplossing tegenkwamen): wél de melding
> tonen, maar dan **tóch** `create(...)` uitvoeren. De opgave zegt *"doe verder niets"*, dus je moet na
> de `alert` **`return`en**. Zonder die `return` wordt het onderdeel alsnog opgeslagen, precies wat de
> vraag verbiedt. Onthoud: **melding → `return` → geen `create`.**

> **Waarom hoef je hier zelf niet te hertekenen?** `create`/`delete` roepen `notifyObservers` aan → je
> observer (1) loopt → `render()`. De knop wisselt vanzelf naar ✓ en de configuratiepagina toont
> meteen het nieuwe onderdeel. Geen `this.render()` in de listener nodig.

## 7. Stap 6 — de configuratiepagina renderen

De tweede pagina (`/build`) toont de opgeslagen configuratie. Ze gebruikt een **apart** component,
`buildItem`, want elke regel ziet er anders uit dan een onderdeel-kaart (één tekstregel + een X).

**Het component `buildItem.ts`** (toont een tekstlabel; de X-knop is stap 7):

```ts
import {CustomElement} from '../../router/customElement.ts'
import HTML from './buildItem.html?raw'

export class CustomBuildItem extends CustomElement {
  static observedAttributes = ['title']
  #label = this.componentBody.querySelector<HTMLSpanElement>('#build-item')!

  constructor() {
    super(HTML)
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'title':
        this.#label.innerText = newValue
        break
    }
  }
}
```

**De pagina `build.ts`** — exact hetzelfde patroon als `parts.ts`, maar met `BuildLocalProvider`, en
met een **totaalprijs** via `reduce`:

```ts
import {Page} from '../../router/page.ts'
import HTML from './build.html?raw'
import type {BuildItem} from '../../models/buildItem.ts'
import {BuildLocalProvider} from '../../data/data.ts'

export class BuildPage extends Page {
  #build: BuildItem[] = []
  #container = this.body.querySelector<HTMLUListElement>('#build-list')!
  #total = this.body.querySelector<HTMLSpanElement>('#build-total')!

  constructor() {
    super(HTML)
    this.unsubscribe.push(BuildLocalProvider.addObserver(data => {
      this.#build = data
      this.render()
    }))
    void BuildLocalProvider.getAll()
  }

  render(): void {
    super.render()
    this.#container.innerHTML = ''

    this.#build.map(entry => {
      const el = document.createElement('custom-build-item')
      el.setAttribute('id', entry.id)   // het BUILD-item id (nodig om te verwijderen, stap 7)
      // naam + prijs op één regel met een TEMPLATE LITERAL:
      el.setAttribute('title', `${entry.part.name} (${entry.part.price.toFixed(2)} EUR)`)
      this.#container.appendChild(el)
    })

    // totaalprijs over de hele configuratie (reduce; startwaarde 0)
    const total = this.#build.reduce((sum, entry) => sum + entry.part.price, 0)
    this.#total.innerText = total.toFixed(2)
  }
}
```

> **Eén tekstplek → één attribuut.** De onderdeel-kaart had meerdere plekken (`#name`, `#price`, …),
> dus losse attributen. Het build-item heeft één label, dus combineer je alles in één `title`-attribuut
> met een template literal. Kijk ook in de HTML wat er al staat: `build-total` staat al met " EUR"
> ernaast, dus zet je enkel het getal (`toFixed(2)`), niet nog eens " EUR" erbij.

Vergeet niet het component te **registreren** in `main.ts`:

```ts
import {CustomBuildItem} from './components/buildItem/buildItem.ts'
window.customElements.define('custom-build-item', CustomBuildItem)
```

## 8. Stap 7 — verwijderen uit de configuratie

De X-knop haalt een onderdeel uit de configuratie. De opgave vraagt hier **geen** custom event: het
component regelt de delete **zelf**, rechtstreeks via de provider. Dat komt in `buildItem.ts`:

```ts
import {BuildLocalProvider} from '../../data/data.ts'   // bovenaan toevoegen

  #deleteBtn = this.componentBody.querySelector<HTMLButtonElement>('#delete-btn')!

  constructor() {
    super(HTML)
    // this.id = het 'id'-attribuut dat de pagina meegaf = het BUILD-item id
    this.#deleteBtn.addEventListener('click', () => {
      void BuildLocalProvider.delete(this.id)
    })
  }
```

> ⚠️ **In welk component?** Deze delete hoort in het **build-item** (tweede pagina), niet in de
> onderdeel-kaart. Reden: `this.id` moet het id van de **configuratie-regel** zijn (door `build.ts`
> gezet met `setAttribute('id', entry.id)`). In de onderdeel-kaart zou `this.id` het id van het
> **onderdeel** zijn, en daarmee vindt `delete` niets. Dit is precies het `part.id` vs `buildItem.id`
> onderscheid uit sectie 3.

Waarom werkt de UI vanzelf bij? `delete()` → `notifyObservers` → de observer op de buildpagina loopt →
`render()`. Het onderdeel verdwijnt en de totaalprijs klopt weer.

## Samenvatting

- De **`LocalStoragePersistenceProvider`** werkt als de REST-provider, maar bewaart in **localStorage**
  (sleutel `key`) en genereert bij `create` zelf een **id**. Zelfde observer-gedrag.
- Een **`BuildItem`** omhult een `Part` en heeft een **eigen** id. Hou `part.id` en `buildItem.id` uit
  elkaar.
- **Toevoegen (stap 5)** = een **custom event** in de kaart (`dispatchEvent`) + de pagina die
  eropluistert (`addEventListener` met **exact dezelfde naam**), en `create`/`delete` op de
  localStorage-provider. Toon de knopstaat via een `is-added`-attribuut.
- **Categorie-check:** zit er al zo'n categorie in → `alert` **en `return`** (niet opslaan!).
- **Configuratie renderen (stap 6)** = zelfde 3-dingen-patroon met `BuildLocalProvider`; één `title`
  via template literal; **totaal** via `reduce`.
- **Verwijderen (stap 7)** = **rechtstreeks** `provider.delete(this.id)` in het build-item (geen event);
  `this.id` is het build-item id.

## Oefeningen

Werk in de cursus-app (`pc-builder-app`), server op poort 3000 + `pnpm dev`.

> **Zelfreflectie, geen oplossing:** oefeningen 1 en 6 zijn kijk-/leesoefeningen. De code-oefeningen
> (2–5) bouwen samen stap 5–7 op en staan uitgewerkt in de cursus-app.

1. **Provider vergelijken.** Open `localStoragePersistenceProvider.ts` en `restPersistenceProvider.ts`
   naast elkaar. Noteer twee verschillen (tip: waar komt het `id` vandaan, en waar wordt de data
   bewaard?).

2. **Tweede provider.** Maak in `data.ts` de `BuildLocalProvider` met
   `new LocalStoragePersistenceProvider<BuildItem>('build')`.

3. **Toevoegen.** Breid `part.ts` uit met een `addToBuild`-event en een `is-added`-knopstaat, en laat
   `parts.ts` erop luisteren: toevoegen/verwijderen via `BuildLocalProvider`, met de **categorie-check**
   (melding + `return`). Test dat de knop wisselt naar ✓ en dat een tweede onderdeel van dezelfde
   categorie geweigerd wordt.

4. **Configuratie tonen.** Maak `buildItem.ts` (`CustomBuildItem`, attribuut `title`), registreer
   `custom-build-item` in `main.ts`, en vul `build.ts` in: render de configuratie + de **totaalprijs**
   via `reduce`. Test op `/build`.

5. **Verwijderen.** Voeg in `buildItem.ts` de X-knop toe die `BuildLocalProvider.delete(this.id)`
   aanroept. Test dat een onderdeel verdwijnt (en de totaalprijs klopt) én weg blijft na een refresh.

6. **`part.id` vs `buildItem.id`.** Zet in `buildItem.ts` de delete tijdelijk op een verkeerd id (bv.
   een verzonnen string). Wat gebeurt er bij het klikken op X, en waarom? Verklaar met sectie 3/8. Zet
   het daarna terug.

Klaar? Je hebt nu een **volledige examen-app** gebouwd. In **Module 14** kijken we naar
**declaratiebestanden (`.d.ts`)**, waaronder de `index.d.ts` die je in elke frontend zag staan.
