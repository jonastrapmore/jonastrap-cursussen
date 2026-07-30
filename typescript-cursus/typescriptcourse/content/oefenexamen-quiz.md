# Oefenexamen: Quiz builder (uitgewerkt)

Een derde examen, stap voor stap: een **quiz builder**. Je beheert trivia-**vragen** (uit een API) en
stelt er **quizzes** mee samen (in localStorage). Dit examen bevat drie dingen die de PC Builder en de
webshop niet hadden: **verwijderen uit de database** (rest-delete), **filteren met radio-knoppen**, en
het **verzamelen in een `Set`** om er later een quiz van te maken ("Create quiz").

> Lichte walkthrough: *wat je moet doen* + kerncode per vraag. De basispatronen ken je uit
> Module 11–13; daar verwijs ik naar. De **nieuwe** stukken (vraag 3, 4, 5, 6, 8) leg ik wat meer uit.
> Startcode om zelf te bouwen: `oefeningen-vite/quiz-oefenexamen`.

## Het thema in het kort

- **Model `Question`**: `{ id, type: 'true-false' | 'multiple-choice', difficulty: 'easy' | 'medium' |
  'hard', question, correctAnswer, incorrectAnswers: string[] }` (uit de API `/questions`).
- **Model `Quiz`**: `{ id, name, questions: Question[] }` — een quiz met een naam en een lijst vragen
  (in localStorage, storagekey `quizzes`).
- **Twee pagina's**: home (`/`, de vragen) en quizzes (`/quizzes`).
- **Component** `question` (`custom-question`): toont één vraag, met een vuilbak-knop én een +/- knop.

---

## Vraag 1 — Routing (1 punt)

Zoals stap 1 (Module 11): navbar registreren (`custom-navbar`), routes `'/' → HomePage` en
`'/quizzes' → QuizzesPage`, `data-link` op de navbar-links. De quizzes-pagina is grotendeels gegeven.

---

## Vraag 2 — Vragen renderen (4 punten)

Zoals stap 2 (Module 12): provider + component + render.

`data/data.ts`:

```ts
export const questionPersistenceProvider =
  new RestPersistenceProvider<Question>('http://localhost:3000/questions')
```

`components/question/question.ts` (`QuestionComponent`): `observedAttributes` met o.a. `question`,
`type`, `difficulty`, `correct-answer`, `incorrect-answers`, en de callback die ze invult.

> ⭐ **Nieuw detail — een array doorgeven.** `incorrectAnswers` is een `string[]`, maar attributen zijn
> altijd strings. Geef de array door als **JSON-string** en parse ze in het component:
> ```ts
> // in de pagina:
> question.setAttribute('incorrect-answers', JSON.stringify(q.incorrectAnswers))
> // in het component (case 'incorrect-answers'):
> this.#answersList.innerHTML = ''
> JSON.parse(newValue).forEach((answer: string) => {
>   const li = document.createElement('li'); li.innerText = answer
>   this.#answersList.appendChild(li)
> })
> ```

De pagina (`pages/home/home.ts`) doet de drie dingen (observer + `getAll()` + `render()` per vraag).

---

## Vraag 3 — Vragen filteren (3 punten) ⭐ nieuw: radio + dropdown

**Doel:** filteren op **type** (radio: true-false / multiple-choice) én **moeilijkheidsgraad**
(dropdown), samen.

> ⚠️ **De radio-valkuil.** De `.value` van een radio-`input` is **altijd dezelfde** (de vaste
> `value`), ook als hij niet aangevinkt is. Je leest dus **niet** `radio.value` om de keuze te weten.
> Twee oplossingen: (a) een eigen veld bijhouden en updaten in een `change`-listener per radio, of
> (b) de aangevinkte lezen met `querySelector('input[name="..."]:checked')`. Hieronder aanpak (a).

**(1) Filterstatus + listeners** (in de klasse en constructor):

```ts
  #selectedType: 'multiple-choice' | 'true-false' = 'multiple-choice'   // standaard aangevinkt
  #selectedDifficulty: 'easy' | 'medium' | 'hard' | 'all' = 'all'
  #trueFalseInput = this.body.querySelector<HTMLInputElement>('#true-false')!
  #multipleChoiceInput = this.body.querySelector<HTMLInputElement>('#multiple-choice')!
  #difficultyFilter = this.body.querySelector<HTMLSelectElement>('#difficulty-filter')!

  // in de constructor: bij elke wijziging de status updaten + herrenderen
  this.#trueFalseInput.addEventListener('change', () => { this.#selectedType = 'true-false'; this.render() })
  this.#multipleChoiceInput.addEventListener('change', () => { this.#selectedType = 'multiple-choice'; this.render() })
  this.#difficultyFilter.addEventListener('change', () => {
    this.#selectedDifficulty = this.#difficultyFilter.value as 'easy' | 'medium' | 'hard' | 'all'
    this.render()
  })
```

**(2) Filter in `render()` via een hulpfunctie:**

```ts
  this.#questions.filter(q => this.#questionMatchesFilter(q)).map(q => { /* ... vraag tonen ... */ })

  #questionMatchesFilter(question: Question): boolean {
    if (question.type !== this.#selectedType) return false
    return this.#selectedDifficulty === 'all' || question.difficulty === this.#selectedDifficulty
  }
```

De "all"-optie negeert de moeilijkheidsfilter; type + moeilijkheid werken zo samen.

---

## Vraag 4 — Vragen verwijderen (2 punten) ⭐ rest-delete

**Doel:** het vuilbakje verwijdert de vraag **uit de database** (via de REST-provider). Dit zit in het
**component** (de knop hoort bij de vraag):

```ts
// in question.ts:
import {questionPersistenceProvider} from '../../data/data.ts'

  #deleteBtn = this.componentBody.querySelector<HTMLButtonElement>('#delete-question')!

  constructor() {
    super(HTML)
    // this.id = het id van deze vraag. delete() verwittigt de observers -> home herrendert.
    this.#deleteBtn.addEventListener('click', () => questionPersistenceProvider.delete(this.id))
  }
```

> **Verschil met verwijderen uit een collectie** (PC Builder/webshop, localStorage): hier verwijder je
> uit de **database** via `RestPersistenceProvider.delete`. Zelfde patroon, andere provider. De UI
> werkt vanzelf bij dankzij `notifyObservers`.

---

## Vraag 5 — Vragen toevoegen aan een quiz (3 punten) ⭐ aanpak B: een `Set`

**Doel:** vragen **selecteren** voor een nieuwe quiz. De knop toont `+` (nog niet geselecteerd) of `-`
(al geselecteerd). Nog **niet** opslaan, dat gebeurt pas bij "Create quiz" (vraag 6). Daarom verzamel
je de gekozen id's in een **`Set`** in het geheugen (aanpak B uit de handleiding).

**In het component** (`question.ts`): een +/- knop die een custom event afvuurt, en een `selected`-
attribuut voor de knoptekst:

```ts
  #addRemoveBtn = this.componentBody.querySelector<HTMLButtonElement>('#add-remove-question')!
  // in de constructor:
  this.#addRemoveBtn.addEventListener('click', () => this.dispatchEvent(new CustomEvent('add-remove-question')))
  // in attributeChangedCallback, case 'selected':
  this.#addRemoveBtn.innerText = newValue === 'true' ? '-' : '+'
```

**In de pagina** (`home.ts`): een `Set` van id's, en per vraag het event afhandelen:

```ts
  #selectedQuestionIds: Set<string> = new Set()

  // in render(), per vraag:
  question.setAttribute('selected', this.#selectedQuestionIds.has(q.id).toString())
  question.addEventListener('add-remove-question', () => {
    this.#selectedQuestionIds.has(q.id)
      ? this.#selectedQuestionIds.delete(q.id)
      : this.#selectedQuestionIds.add(q.id)
    this.render()   // hier WEL zelf herrenderen: er is nog geen provider die observers verwittigt
  })
```

> **Waarom een `Set` en niet meteen localStorage?** Omdat je de vragen pas later, in één keer, als een
> quiz opslaat (vraag 6). Een `Set` bewaart elk id max. één keer en heeft snelle `has`/`add`/`delete`.
> Omdat er (nog) geen provider bij betrokken is, roep je hier **zelf** `this.render()` aan.

---

## Vraag 6 — Quiz aanmaken (4 punten) ⭐ de "Create"-knop

**Doel:** met een knop de geselecteerde vragen als één nieuwe **quiz** opslaan in **localStorage**
(storagekey `quizzes`). De knop is uitgeschakeld als er niets geselecteerd is.

`data/data.ts` erbij:

```ts
export const quizPersistenceProvider = new LocalStoragePersistenceProvider<Quiz>('quizzes')
```

In `home.ts`:

```ts
  #quizNameInput = this.body.querySelector<HTMLInputElement>('#quiz-name')!
  #createQuizButton = this.body.querySelector<HTMLButtonElement>('#create-quiz')!

  // in de constructor: opslaan bij klik, daarna alles leegmaken
  this.#createQuizButton.addEventListener('click', () => {
    void quizPersistenceProvider.create({
      name: this.#quizNameInput.value,
      questions: this.#questions.filter(q => this.#selectedQuestionIds.has(q.id)),  // gekozen vragen
    })
    this.#selectedQuestionIds = new Set()   // selectie leegmaken
    this.#quizNameInput.value = ''          // invoerveld leegmaken
    this.render()
  })

  // in render(): knop enkel actief als er iets geselecteerd is
  this.#createQuizButton.disabled = this.#selectedQuestionIds.size === 0
```

> **De kern:** je filtert de volledige vragenlijst op de `Set` van geselecteerde id's en stopt die in
> één `create(...)`. Het id van de quiz maakt de provider zelf (`crypto.randomUUID()`). Daarna reset je
> de selectie en het invoerveld.

---

## Vraag 7 — Quizzes weergeven (1 punt)

Op `/quizzes` toon je de vragen van de gekozen quiz. Je hergebruikt het **`custom-question`**-component,
maar met twee extra attributen:

```ts
  question.setAttribute('selected', 'true')     // de vraag zit in de quiz -> knop toont '-'
  question.setAttribute('hide-delete', 'true')  // vuilbakje verbergen (mag enkel op home)
```

In het component vang je `hide-delete` op: `this.#deleteBtn.hidden = newValue === 'true'`. Verder is het
hetzelfde renderpatroon (Module 13). De lijst met quiznamen links is grotendeels gegeven.

---

## Vraag 8 — Quiz updaten (2 punten) ⭐ update in localStorage

**Doel:** met de `-` knop een vraag **uit de quiz** halen — enkel in **localStorage**, niet uit de
database. Je **update** de quiz met een vragenlijst zonder die ene vraag:

```ts
  // in quizzes.ts, per vraag van de actieve quiz:
  question.addEventListener('add-remove-question', () => {
    void quizPersistenceProvider.update(activeQuiz.id, {
      ...activeQuiz,
      questions: activeQuiz.questions.filter(x => x.id !== q.id),   // deze vraag eruit filteren
    })
  })
```

> **`update` i.p.v. `delete`:** je verwijdert niet de hele quiz, je vervangt hem door dezelfde quiz
> **min** één vraag. `update` schrijft naar localStorage en verwittigt de observers → de pagina
> ververst meteen.

---

## Wat dit oefenexamen toevoegt

Vergeleken met de PC Builder en de webshop leerde je hier:

- **Verwijderen uit de database** (vraag 4): `RestPersistenceProvider.delete` i.p.v. localStorage.
- **Filteren met radio-knoppen** (vraag 3): niet `radio.value`, maar een eigen status via `change`
  (of `:checked`).
- **Aanpak B — verzamelen in een `Set`** (vraag 5) en er later één object van maken met een
  **"Create"-knop** (vraag 6), plus **een item uit een collectie updaten** (vraag 8).
- **Een array via een attribuut** doorgeven met `JSON.stringify` / `JSON.parse` (vraag 2).

Met de PC Builder (uitgewerkt), de webshop en de quiz heb je nu **alle** vraagtypes van het recept
gezien, telkens in een ander thema. Grijp bij het echte examen terug naar de
[handleiding](#oplossingen) en deze uitwerkingen.
