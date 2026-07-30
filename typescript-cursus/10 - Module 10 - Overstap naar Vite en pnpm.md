# Module 10: Overstap naar Vite en pnpm

Vanaf hier verandert er iets fundamenteels. De vorige negen modules gingen over de **taal**
TypeScript, en je draaide alles met de kale `tsc` in **Node**. Nu gaan we **echte apps in de
browser** bouwen, en dan wordt handmatig compileren met `tsc` onwerkbaar. We stappen over op een
moderne projecttool: **Vite**, met **pnpm** als pakketbeheerder. Dit is exact de opzet die de
examens gebruiken.

> Deze module is de **brug**. We schrijven nog geen app-logica; we zorgen dat je de gereedschappen
> begrijpt en een project kunt opzetten en draaien. Vanaf Module 11 bouwen we de app zelf.

## 0. Belangrijk om vooraf te weten: wat je hierna écht leert

Wees eerlijk met jezelf over wat er de komende modules gebeurt, want hier lopen veel studenten
vast. Het examen (en dit deel van de cursus) test **twee dingen tegelijk**:

1. **TypeScript** — dat ken je nu (Module 0–9).
2. **Een vaste werkwijze met een klein, gegeven "framework"** — een setje bestanden (een `Router`,
   `PersistenceProvider`s, `CustomElement`, `Page`) dat je bij het examen **krijgt** en dat je op
   een **vaste manier** aan elkaar knoopt.

Dat tweede is waar het misgaat. Studenten kennen de taal, maar snappen niet *wat die gegeven code
doet* of *in welke volgorde je de stukken aansluit*. Dan staren ze naar een leeg scherm zonder
foutmelding. **Deze cursus lost dat op door je precies te leren wat elk gegeven stuk doet en hoe
het samenwerkt** — niet door het uit het hoofd te leren, maar door het te *begrijpen*.

> **Waarom krijg je dat framework en schrijf je het niet zelf?** Omdat het in de echte wereld ook
> zo werkt: gebruik je later een tool zoals **React**, dan doet die dit soort dingen (componenten,
> routing, reageren op datawijzigingen) **automatisch** voor je. Je schrijft die machinerie niet
> zelf. Hier krijg je een piepklein, doorzichtig versie ervan, zodat je één keer echt **onder de
> motorkap** kijkt en snapt wat zo'n framework voor je regelt. Die kennis is goud waard, ook als je
> later "gewoon React" gebruikt.

Onthoud dus: vanaf nu leer je een **werkwijze bovenop TypeScript**. We gaan die stap voor stap, heel
expliciet, uitleggen.

## 1. Waarom niet gewoon `tsc` blijven gebruiken?

Met `tsc` deed je zelf alles: één commando compileerde je `.ts` naar `.js`, en je draaide dat met
Node. Prima om de taal te leren. Maar voor een echte browser-app wil je veel méér:

- je code opsplitsen in tientallen bestanden en die **samenvoegen** (bundelen) voor de browser;
- **CSS en libraries** (zoals Bootstrap) importeren;
- een **dev-server** die je pagina toont en **automatisch herlaadt** bij elke wijziging;
- voor productie: alles **minificeren** (zo klein mogelijk maken).

Dat allemaal met de hand met `tsc` regelen is geen doen. Daarvoor bestaat een **projecttool**.

## 2. Wat is Vite?

**Vite** is een moderne projecttool voor front-end apps. Twee kanten:

- **Tijdens ontwikkelen** (`vite dev`): Vite start een **dev-server** (meestal op
  `http://localhost:5173`). Je opent die in de browser, en telkens je een bestand opslaat, ververst
  de pagina bijna direct (*hot reload*). Onder de motorkap gebruikt Vite **esbuild** om je
  TypeScript pijlsnel om te zetten naar JavaScript.
- **Voor productie** (`vite build`): Vite **bundelt** al je bestanden samen en **minificeert** ze
  (commentaar en witruimte weg, namen ingekort). Dat is precies waarom je in dit deel je
  `removeComments`-optie uit Module 9 **niet meer met de hand** hoeft te zetten: Vite strippt
  commentaar én verkleint alles automatisch bij het builden.

> **We keren terug naar de browser.** In Module 0–9 draaide je code in **Node** (via `tsc` +
> `node`). Vanaf nu draait je code weer in de **browser**, dus je hebt de DOM, `window`,
> `localStorage`, events, enzovoort. Dat is de omgeving waar de app leeft.

### ⚠️ Het belangrijkste inzicht: `vite dev` typecheckt NIET

Dit is subtiel maar cruciaal (en het verklaart een klassieke verwarring). De **esbuild** die Vite
tijdens `dev` gebruikt, **strípt alleen de types** en zet je code razendsnel om — maar hij
**controleert de types niet**. Een echte typefout of een ongebruikte import laat je app in
`vite dev` gewoon dóórdraaien, zonder klacht.

De **typecheck** gebeurt door **`tsc`**, en die draait pas bij:

- je **editor** (VS Code toont de rode kringeltjes live), en
- het **build**-commando: `pnpm build` = `tsc && vite build` (eerst typecheck, dan bundelen).

> **Gevolg dat je moet onthouden:** dat je app "draait" in `vite dev` betekent **niet** dat hij
> typeveilig is. Iets kan perfect werken in de browser en tóch een typefout bevatten die pas
> opduikt bij `pnpm build`. Vertrouw dus op de **rode kringeltjes in je editor** én draai af en toe
> `pnpm build` om zeker te zijn. (Vergelijk: `noEmitOnError` uit Module 9 vangt dit bij kale `tsc`;
> in Vite is `dev` bewust "los" voor snelheid, en is `tsc`/`build` je vangnet.)

## 3. Wat is pnpm?

**pnpm** is een **pakketbeheerder** (zoals `npm`, maar sneller en zuiniger met schijfruimte). Een
pakketbeheerder haalt de **libraries** binnen waarvan je project afhangt (Vite, Bootstrap, …) en
beheert de scripts. Het draait om drie dingen:

- **`package.json`** — de "identiteitskaart" van je project: naam, afhankelijkheden (`dependencies`)
  en scripts (zie hieronder).
- **`node_modules/`** — de map waarin de binnengehaalde libraries komen. Die commit je **niet** naar
  git (staat in `.gitignore`); je herbouwt hem met één commando.
- **`pnpm-lock.yaml`** — legt de **exacte** versies vast, zodat iedereen exact dezelfde installatie
  krijgt.

De commando's die je nodig hebt:

```bash
pnpm install      # installeer alle afhankelijkheden uit package.json (maakt node_modules)
pnpm add bootstrap # voeg een library toe (komt in dependencies)
pnpm dev          # draai het "dev"-script (start de Vite dev-server)
pnpm build        # draai het "build"-script (tsc && vite build)
```

> **De scripts staan in `package.json`** onder `"scripts"`. `pnpm dev` betekent letterlijk: *"voer
> het commando uit dat achter `dev` staat"* (bij ons `vite`). Zo hoef je lange commando's niet te
> onthouden.

## 4. Een Vite + TypeScript-project opzetten

> **Voor je begint: heb je Node en pnpm?** Die installeerde je in **Module 0 (§4)**. Check even in
> een terminal: `node --version` en `pnpm --version` moeten allebei een versienummer tonen. Zo niet,
> keer terug naar Module 0 §4 (Node van [nodejs.org](https://nodejs.org), pnpm via
> `corepack enable pnpm`).

Een nieuw project maak je met één commando. Vite vraagt dan een paar dingen (kies de **vanilla
TypeScript**-template, dus geen React/Vue):

```bash
pnpm create vite
# ✔ Project name: mijn-app
# ✔ Framework: Vanilla
# ✔ Variant: TypeScript

cd mijn-app
pnpm install     # haalt Vite e.d. binnen
pnpm dev         # start de dev-server -> open http://localhost:5173
```

Je krijgt een projectstructuur zoals deze (de kern):

```
mijn-app/
├─ index.html          ← de startpagina (laadt src/main.ts)
├─ package.json        ← scripts + afhankelijkheden
├─ tsconfig.json       ← TypeScript-instellingen (nu in "bundler"-modus, zie 6)
└─ src/
   └─ main.ts          ← je startpunt (draait in de browser)
```

**`index.html`** is de ingang. Daarin staat één regel die je TypeScript binnenhaalt:

```html
<script type="module" src="/src/main.ts"></script>
```

En **`src/main.ts`** is waar je app begint. Alles wat je daar (of in geïmporteerde bestanden)
schrijft, draait in de browser. Vanaf hier bouw je verder.

## 5. HTML importeren met `?raw` (de sleutel tot componenten)

Eén Vite-truc ga je constant gebruiken en is essentieel voor de examen-aanpak: je kunt de **inhoud
van een bestand als string** importeren door **`?raw`** achter het pad te zetten:

```ts
import HTML from './navbar.html?raw'

console.log(HTML) // de volledige inhoud van navbar.html, als tekst
```

Waarom is dat handig? Omdat je zo de **HTML van een component** in een apart `.html`-bestand kunt
bewaren (overzichtelijk) en die als string in je TypeScript kunt binnentrekken om in de pagina te
zetten. Dat is precies wat de gegeven `CustomElement`- en `Page`-klassen doen: ze krijgen die
HTML-string via `super(HTML)`. Je zag dit al in de examenoplossing:

```ts
import HTML from './parts.html?raw'
// ...
export class PartsPage extends Page {
  constructor() {
    super(HTML) // geef de HTML-string door aan de basisklasse, die zet 'm op de pagina
  }
}
```

Onthoud voor nu enkel: **`?raw` = "importeer dit bestand als een stuk tekst".** Hoe `super(HTML)`
dat vervolgens tekent, ontleden we in Module 11.

## 6. Kort: de tsconfig is nu anders (bundler-modus)

De `tsconfig.json` van een Vite-project ziet er iets anders uit dan die van Module 0–9. Je hoeft de
details niet vanbuiten te kennen, maar herken de belangrijkste verschillen:

- **`"module": "ESNext"`** en **`"moduleResolution": "bundler"`** — de output is voor een **bundler**
  (Vite), niet voor Node's `require`. Vandaar geen CommonJS meer zoals in Module 9.
- **`"noEmit": true`** — `tsc` schrijft hier **zelf geen `.js`** weg; hij doet **alleen de
  typecheck**. Het echte omzetten/bundelen laat je aan Vite over.
- **`"noUnusedLocals": true`** — waarschuwt bij ongebruikte imports/variabelen. (Dít is de optie die
  een ongebruikte import bij `pnpm build` tot een fout maakt, terwijl `vite dev` er niet over
  klaagt — zie sectie 2.)

Kortom: in dit deel is `tsc` je **typecheck-vangnet**, en **Vite** doet het echte werk om je app te
draaien en te bouwen.

## Samenvatting

- We stappen van kale **`tsc` in Node** over naar **Vite + pnpm** in de **browser**, de opzet van de
  examens.
- Vanaf nu leer je, bovenop TypeScript, een **vaste werkwijze met een gegeven mini-framework**. Dat
  goed **begrijpen** (niet vanbuiten leren) is waar het examen echt om draait.
- **Vite** = dev-server met hot reload (via esbuild) + bundelen/minificeren voor productie (`vite build`).
- ⚠️ **`vite dev` typecheckt niet** (esbuild strípt alleen types). De typecheck komt van je **editor**
  en van **`pnpm build`** (`tsc && vite build`). "Het draait" ≠ "het is typeveilig".
- **pnpm** = pakketbeheerder: `package.json` (scripts + deps), `node_modules/`, `pnpm-lock.yaml`.
  Commando's: `pnpm install`, `pnpm add`, `pnpm dev`, `pnpm build`.
- Een project zet je op met `pnpm create vite` (Vanilla + TypeScript); `index.html` laadt
  `src/main.ts`, dat in de browser draait.
- **`import HTML from './x.html?raw'`** haalt de inhoud van een bestand als **string** binnen, de
  basis van de component-aanpak.

## Oefeningen

Deze module is **hands-on setup**: je werkt niet in één `.ts`-bestand, maar met echte projecten.

1. **Nieuw project.** Maak met `pnpm create vite` een nieuw **Vanilla + TypeScript**-project, doe
   `pnpm install` en start `pnpm dev`. Open `http://localhost:5173` en bevestig dat de standaardpagina
   verschijnt.

2. **Scripts lezen.** Open `package.json` en zoek het `"scripts"`-blok. Noteer voor jezelf wat `dev`,
   `build` en `preview` elk doen. Wat draait `pnpm build` precies (twee commando's)?

3. ⭐ **Bewijs dat `dev` niet typecheckt.** Zet in `src/main.ts` een bewuste typefout (bijv.
   `const n: number = "tekst"`) of een ongebruikte import. Kijk: (a) blijft `pnpm dev` gewoon draaien?
   (b) toont je editor een rode kringel? (c) faalt `pnpm build`? Verklaar het verschil met sectie 2.
   *(Dit is exact wat we bij het examen zagen: dev werkte, build klaagde.)*

4. **HTML met `?raw`.** Maak een bestand `src/hallo.html` met wat HTML erin (bv. `<h1>Hallo</h1>`).
   Importeer het in `main.ts` met `?raw` en zet het in de pagina:
   `document.querySelector<HTMLDivElement>('#app')!.innerHTML = HTML`. Controleer dat het verschijnt.

5. **Een library toevoegen.** Voeg Bootstrap toe met `pnpm add bootstrap`, en importeer bovenaan
   `main.ts` de CSS: `import 'bootstrap/dist/css/bootstrap.css'`. Zie je de standaard-opmaak veranderen?

6. **De examen-startcode draaien (belangrijk!).** Neem de startbestanden van een examen (server +
   frontend). Installeer **beide** met `pnpm install` in hun eigen map. Start de **server** en
   controleer in de terminal dat hij op **poort 3000** draait. Start daarna de **frontend** met
   `pnpm dev` en open hem in de browser. *(Dit is letterlijk de "Setup"-vraag van het examen.)*

Klaar? In **Module 11** duiken we in het **gegeven framework**: we ontleden `CustomElement`, `Page`
en de `Router` regel voor regel, zodat je precies snapt wat ze doen. Daarna zetten we de eerste
examenvraag op: routing + navbar + één item renderen.
