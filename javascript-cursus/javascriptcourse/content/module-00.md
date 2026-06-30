# Module 0: Je computer klaarmaken

Voordat we ook maar één regel JavaScript schrijven, zorgen we dat je gereedschap klaarstaat.
Dit duurt 10 minuten en daarna kun je echt aan de slag.

## Wat heb je nodig?

JavaScript draait **in de browser**. Je hebt dus maar twee dingen nodig:

1. Een **moderne webbrowser**, je hebt er al een: Chrome, Edge of Firefox.
2. Een **code-editor**, een programma om tekst (code) in te typen.

Meer niet. Geen installatie van "JavaScript" zelf, dat zit al in elke browser ingebouwd.

## Stap 1: Installeer een code-editor

We gebruiken **Visual Studio Code** (kortweg "VS Code"). Gratis, en de standaard in de
hele webwereld. Je hebt het waarschijnlijk al, want je leest dit waarschijnlijk er al in.

- Download: https://code.visualstudio.com
- Installeer met alle standaardinstellingen.

> **Waarom geen Kladblok?** Een echte editor kleurt je code in, springt automatisch in,
> en waarschuwt je voor fouten. Dat scheelt enorm veel frustratie.

## Stap 2: Je eerste bestand

We maken een mapje en een bestand. JavaScript "woont" in een HTML-pagina, dus we beginnen
met een minimale HTML-pagina.

1. Maak ergens een map, bijvoorbeeld `Documents/oefeningen-js`.
2. Open die map in VS Code (menu: *File → Open Folder*).
3. Maak een nieuw bestand: `index.html`.
4. Typ dit erin (zelf typen, niet plakken):

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <title>Mijn eerste JavaScript</title>
</head>
<body>
  <h1>Hallo!</h1>

  <script>
    console.log("Mijn eerste regel JavaScript werkt!");
  </script>
</body>
</html>
```

### Wat staat hier?

- Alles tussen `<` en `>` is **HTML**, dat is de structuur van de pagina. Die ken je al.
- Het stukje tussen `<script>` en `</script>` is **JavaScript**. Daar gaat het ons om.
- `console.log(...)` betekent: "schrijf dit weg naar de console". De **console** is een soort
  kladblaadje van de browser waar programmeurs berichten en fouten zien.

## Stap 3: Open de pagina en de console

1. Dubbelklik op `index.html` in je verkenner → hij opent in de browser. Je ziet "Hallo!".
2. Open nu de **Developer Tools**: druk op `F12` (of rechtermuisklik → *Inspecteren*).
3. Klik bovenin op het tabblad **Console**.
4. Je ziet daar: `Mijn eerste JavaScript werkt!`

🎉 Gefeliciteerd, je hebt zojuist code uitgevoerd.

> De **Console** wordt je beste vriend. Hier verschijnen je `console.log`-berichten én alle
> foutmeldingen. We gaan hem de hele cursus gebruiken.

## Stap 4: De console als rekenmachine

Je kunt in de Console ook rechtstreeks typen. Klik in de console, typ dit en druk op Enter:

```js
2 + 3
```

De console antwoordt `5`. Probeer ook:

```js
"Jonas" + " leert " + "JavaScript"
```

Je ziet `"Jonas leert JavaScript"`. Speel hier gerust even mee, je kunt niets kapotmaken.

## Samenvatting

- JavaScript draait in de browser; je hebt alleen een browser + editor nodig.
- JavaScript zet je in een HTML-pagina tussen `<script>`-tags.
- `console.log(...)` schrijft een bericht naar de **Console** (open met `F12`).
- De Console toont je berichten én je fouten, hou hem altijd open.

## Oefening

1. Verander het bericht in de `console.log` naar je eigen naam.
2. Voeg een tweede `console.log`-regel toe met een rekensom, bijvoorbeeld `console.log(10 * 5)`.
3. Ververs de pagina en controleer of je beide regels in de console ziet.

Klaar? Door naar **Module 1**.
