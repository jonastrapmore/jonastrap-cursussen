# Oefenexamen: Quiz builder — startcode

De **startcode** van het quiz-examen: beheer trivia-vragen en stel er quizzes mee samen. Bedoeld om
**zelf op te lossen** — probeer het eerst zelf, en gebruik de uitwerking pas om te controleren of vast
te raken.

- **De opgave + uitgewerkte oplossing** staat in de cursus:
  [18 - Oefenexamen - Quiz builder (uitgewerkt)](../../18%20-%20Oefenexamen%20-%20Quiz%20builder%20(uitgewerkt).md).
- **Naslag met alle patronen:** [Bijlage - Handleiding examen (stappenplan)](../../Bijlage%20-%20Handleiding%20examen%20(stappenplan).md).
  (De handleiding gebruikt dit quiz-examen zelfs als één van haar doorlopende voorbeelden.)
- **Terugvallen op een uitgewerkt voorbeeld:** de PC Builder (`../pc-builder-app`, Module 11–13).

> **Tip:** dit examen bevat een paar dingen die de PC Builder en de webshop níét hadden, dus een
> echte test:
> - **Verwijderen uit de database** (via de `RestPersistenceProvider`).
> - **Filteren met radio-knoppen** (valkuil: lees de aangevinkte met `:checked`, niet `.value`).
> - **Vragen verzamelen in een `Set`** en er pas later een quiz van maken ("Create quiz"), plus een
>   vraag uit een quiz verwijderen (update in localStorage).
>
> De handleiding beschrijft al deze patronen (stap 3, 4, 5-aanpak B en 5d, 7).

## Herkomst van de code (bronvermelding)

De framework-bestanden, HTML, modellen en het server-project komen uit de examen-startcode (quiz
builder). Die code krijg je op het examen en pas je niet aan. Opgenomen als lesmateriaal, met
toestemming.

## Draaien

```bash
# 1) server (API op poort 3000, route /questions)
cd server
pnpm install
pnpm dev

# 2) frontend (tweede terminal)
cd frontend
pnpm install
pnpm dev
```

## De vragen (kort)

1. Routing (navbar op `/` en `/quizzes`)
2. Vragen renderen (API `/questions` + custom element)
3. Vragen filteren (radio = type, dropdown = moeilijkheid; samen)
4. Vragen verwijderen uit de database (RestPersistenceProvider)
5. Vragen toevoegen aan een quiz (custom event, +/- knop, selectie in een `Set`)
6. Quiz aanmaken ("Create quiz" → localStorage, storagekey `quizzes`)
7. Quizzes weergeven (+ vuilbak verbergen op de quizzes-pagina)
8. Quiz updaten (vraag uit de quiz halen, enkel in localStorage)

Los het zelf op met de handleiding als gids. Veel succes!
