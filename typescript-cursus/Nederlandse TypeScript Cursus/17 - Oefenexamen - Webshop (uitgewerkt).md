# Oefenexamen: Webshop (uitgewerkt)

We lossen een tweede examen stap voor stap op: een **webshop**. Je toont producten uit een API,
filtert ze, legt ze in een **winkelmandje** (localStorage) en past een **korting** toe die je in de
database bewaart. Twee vraagtypes komen hier voor die de PC Builder niet had: **filteren** en een
**wijziging terugschrijven naar de database**.

> Dit is een **lichtere** walkthrough dan de modules: per vraag zie je *wat je moet doen* en de
> kerncode, met korte uitleg. De patronen zelf ken je al uit Module 11–13, daar verwijs ik naar.
> Het thema (producten/winkelmandje) is anders, de aanpak identiek.

## Het thema in het kort

- **Model `Product`**: `{ id, name, price, category }` (uit de API `/products`).
- **Model `CartItem`**: `{ id, product }` — een mandje-regel die een `Product` omhult (eigen id).
- **Twee pagina's**: producten (`/`) en winkelmandje (`/cart`).
- **Drie componenten**: `navbar`, `productCard` (`custom-product-card`), `cartItem`
  (`custom-cart-item`).

---

## Vraag 1 — Pagina's & componenten (1 punt)

**Wat je doet:** exact stap 1 uit Module 11. Maak per pagina en component een `.ts`-bestand, zet
`<custom-navbar>` bovenaan de pagina-HTML, geef de navbar-links een `data-link`, en registreer alles
in `main.ts`:

```ts
window.customElements.define('custom-navbar', CustomNavbar)
window.customElements.define('custom-product-card', CustomProductCard)
window.customElements.define('custom-cart-item', CustomCartItem)

new Router({
  '/': ProductPage,
  '/cart': CartPage,
})
```

> Zie Module 11. Niets nieuws hier.

---

## Vraag 2 — Producten inladen en renderen (5 punten)

**Wat je doet:** exact stap 2 uit Module 12. Maak de provider, het component, en render.

`data/data.ts`:

```ts
export const productRestPersistenceProvider =
  new RestPersistenceProvider<Product>('http://localhost:3000/products')
```

`components/productCard/product.ts` (`CustomProductCard`): `observedAttributes = ['name', 'price',
'category', 'is-added']`, verwijzingen naar `#name`/`#price`/`#category`, en een
`attributeChangedCallback` die ze invult (prijs met `Number(newValue).toFixed(2) + ' EUR'`).

`pages/products/products.ts` — de drie dingen: observer + `getAll()` + `render()` die per product een
`custom-product-card` maakt en `name`/`price`/`category` als attributen meegeeft.

> Zie Module 12. Identiek aan de PC Builder, andere veldnamen.

---

## Vraag 3 — Producten filteren (2 punten) ⭐ nieuw

**Doel:** filteren op **naam** (deel van de naam, niet hoofdlettergevoelig) én **categorie**
(dropdown), en de combinatie. Pas filteren **bij een klik op de knop**, niet bij elke toetsaanslag.

**Waar:** enkel op de productenpagina (`products.ts` + de filtervelden in `products.html`:
`#name-filter`, `#category-filter`, `#filter-btn`).

**Wat je doet — 3 dingen:**

**(1) Verwijzingen naar de filtervelden** bovenaan de klasse:

```ts
  #nameFilter = this.body.querySelector<HTMLInputElement>('#name-filter')!
  #categoryFilter = this.body.querySelector<HTMLSelectElement>('#category-filter')!
  #filterBtn = this.body.querySelector<HTMLButtonElement>('#filter-btn')!
```

**(2) In de constructor: hertekenen op de knop** (`preventDefault` tegen het herladen van het
formulier):

```ts
  this.#filterBtn.addEventListener('click', evt => {
    evt.preventDefault()
    this.render()
  })
```

**(3) In `render()`: filter vóór het mappen, via een aparte hulpfunctie** (tip uit de opgave, houdt
het leesbaar):

```ts
  render(): void {
    super.render()
    this.#productContainer.innerHTML = ''
    this.#products
      .filter(product => this.#productMatchesFilter(product))   // enkel deze regel erbij t.o.v. vraag 2
      .map(product => { /* ... kaart maken zoals vraag 2 ... */ })
  }

  #productMatchesFilter(product: Product): boolean {
    // naam: includes() = zoeken op een DEEL; toLowerCase() = niet hoofdlettergevoelig
    const nameMatches = product.name.toLowerCase().includes(this.#nameFilter.value.toLowerCase())
    // categorie: gelijk aan de keuze, OF de keuze is '0' (= "Alle") -> dan telt categorie niet mee
    const categoryMatches =
      this.#categoryFilter.value === '0' ||
      product.category.toLowerCase() === this.#categoryFilter.value.toLowerCase()

    return nameMatches && categoryMatches   // beide via && => filters werken samen
  }
```

**De kern:**
- `.filter(...)` staat **vóór** `.map(...)`: je tekent enkel de producten die erdoor geraken.
- `includes` + `toLowerCase` = zoeken op een deel, niet hoofdlettergevoelig.
- Alle deelfilters met **`&&`** combineren, zo werken naam + categorie samen.
- De "alle categorieën"-optie heeft meestal `value="0"` (of `""`); die sla je over.

> **Valkuil (andere examens):** bij **radio-knoppen** is `.value` altijd dezelfde; lees de aangevinkte
> met `querySelector('input[name="..."]:checked')`. Bij een `<select>` werkt `.value` wél meteen.

---

## Vraag 4 — Producten toevoegen aan het winkelmandje (3 punten)

**Wat je doet:** exact stap 5 (aanpak A) uit Module 13, met een `CartItem` in plaats van een
`BuildItem`. Custom event in de kaart + de pagina die luistert + localStorage.

`data/data.ts` erbij:

```ts
export const cartLocalPersistenceProvider =
  new LocalStoragePersistenceProvider<CartItem>('cart')   // storagekey 'cart'
```

In `product.ts`: de `+`-knop vuurt `dispatchEvent(new CustomEvent('addToCart'))` af, en een
`case 'is-added'` toont een `&check;` als het product al in het mandje zit.

In `products.ts`: een tweede observer op `cartLocalPersistenceProvider`, en per product:

```ts
  const cartItem = this.#cart.find(item => item.product.id === product.id)
  productRow.setAttribute('is-added', cartItem ? 'true' : 'false')

  productRow.addEventListener('addToCart', async () => {
    if (cartItem) {
      await cartLocalPersistenceProvider.delete(cartItem.id)      // zit er al in -> eruit
    } else {
      const newCartItem: CartItem = { product, id: crypto.randomUUID() }
      await cartLocalPersistenceProvider.create(newCartItem)      // anders -> toevoegen
    }
  })
```

> Zie Module 13. (De webshop vraagt hier géén categorie-check, dus die laat je weg.)

---

## Vraag 5 — Korting toepassen (2 punten) ⭐ nieuw

**Doel:** een `-10%`-knop verlaagt de prijs (`nieuwePrijs = prijs * 0.9`) en bewaart dat
**permanent in de database** (dus via de **REST**-provider, niet localStorage).

**Waar:** de knop zit in het component (`product.ts`), de opslag gebeurt in de pagina (`products.ts`)
— net als bij toevoegen: het component **roept**, de pagina **doet**.

**Wat je doet:**

**(1) In `product.ts`: de knop vuurt een custom event af** (naast de add-knop):

```ts
  #discountBtn = this.componentBody.querySelector<HTMLButtonElement>('#discount-button')!

  // in de constructor:
  this.#discountBtn.addEventListener('click', () => {
    this.dispatchEvent(new CustomEvent('applyDiscount'))
  })
```

**(2) In `products.ts`: luister en schrijf de nieuwe prijs terug via `update`:**

```ts
  productRow.addEventListener('applyDiscount', async () => {
    const updatedProduct = { ...product, price: product.price * 0.9 }   // 10% eraf
    await productRestPersistenceProvider.update(product.id, updatedProduct)
  })
```

**De kern:**
- `product.price * 0.9` = de nieuwe prijs. `{ ...product, price: ... }` maakt een kopie met enkel de
  prijs gewijzigd (Module 8: spread).
- **`update(id, data)` op de REST-provider** stuurt een `PUT` naar de API → de wijziging staat
  **permanent** in het JSON-bestand op de server.
- De provider roept daarna `notifyObservers` aan → je pagina-observer hertekent → de nieuwe prijs
  verschijnt meteen. (Geen `this.render()` nodig.)

> **Verschil met toevoegen (vraag 4):** daar bewaar je in **localStorage** (het mandje is van de
> gebruiker); hier schrijf je terug naar de **database** (de prijs verandert voor iedereen). Zelfde
> event-patroon, andere provider.
>
> ⚠️ **Rommeldata?** Omdat de korting echt in `products.json` wordt geschreven, is ze permanent. Wil
> je resetten: kopieer `backupProducts.json` terug over `products.json` (staat in `server/src/data`).

---

## Vraag 6 — Winkelmandje inladen en renderen (4 punten)

**Wat je doet:** exact stap 6 uit Module 13, met een apart `cartItem`-component.

`components/cartItem/cartItem.ts` (`CustomCartItem`): `observedAttributes = ['title', 'id']`, een
`case 'title'` dat een label invult.

`pages/cart/cart.ts` — de drie dingen met `cartLocalPersistenceProvider`, één `title` via template
literal, en de **totaalprijs** via `reduce`:

```ts
  render(): void {
    super.render()
    this.#cartList.innerHTML = ''
    this.#cart.map(cartItem => {
      const el = document.createElement('custom-cart-item')
      el.setAttribute('id', cartItem.id)
      el.setAttribute('title', `${cartItem.product.name} (${cartItem.product.price.toFixed(2)} EUR)`)
      this.#cartList.appendChild(el)
    })

    const total = this.#cart.map(x => x.product.price).reduce((a, b) => a + b, 0)
    this.#totalPrice.innerText = total.toFixed(2)
  }
```

> Zie Module 13. Identiek aan de configuratiepagina van de PC Builder.

---

## Vraag 7 — Producten verwijderen uit het winkelmandje (3 punten)

**Wat je doet:** exact stap 7 uit Module 13. **Geen** custom event: het `cartItem`-component spreekt
**rechtstreeks** de provider aan.

```ts
// in cartItem.ts:
import {cartLocalPersistenceProvider} from '../../data/data.ts'

  #deleteBtn = this.componentBody.querySelector<HTMLButtonElement>('#delete-btn')!

  constructor() {
    super(HTML)
    // this.id = het id van dit cart-item (door cart.ts meegegeven)
    this.#deleteBtn.addEventListener('click', () => {
      void cartLocalPersistenceProvider.delete(this.id)
    })
  }
```

> Zie Module 13. `delete()` verwittigt de observers → de winkelmandje-pagina hertekent, totaal klopt.

---

## Wat dit oefenexamen toevoegt

Vergeleken met de PC Builder leerde je hier twee extra vraagtypes:

- **Filteren** (vraag 3): `.filter()` vóór `.map()`, via een aparte `#matchesFilter`-functie, met
  `includes` + `toLowerCase`, alle deelfilters met `&&`.
- **Terugschrijven naar de database** (vraag 5): een custom event → `provider.update(id, data)` op de
  **REST**-provider, i.p.v. localStorage.

Samen met de PC Builder (toevoegen aan een collectie, tweede pagina, verwijderen) heb je nu **alle
zeven stappen** van het recept gezien. Grijp bij het echte examen terug naar de
[handleiding](Bijlage%20-%20Handleiding%20examen%20(stappenplan).md) en deze twee uitgewerkte
voorbeelden. Je kunt het.
