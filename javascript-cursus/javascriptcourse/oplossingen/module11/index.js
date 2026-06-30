// ===== Module 11 - Filmcollectie renderen (uitgewerkt) =====
// Je werkt nu in dit aparte .js-bestand (gekoppeld onderaan de index.html).

// De data (normaal komt dit van een API met fetch; nu even hardcoded om te oefenen).
// Oefening 4: twee eigen films toegevoegd onderaan de lijst.
const films = [
  { titel: "Inception", genre: "Sci-Fi", jaar: 2010, score: 8.8 },
  { titel: "The Godfather", genre: "Drama", jaar: 1972, score: 9.2 },
  { titel: "Parasite", genre: "Thriller", jaar: 2019, score: 8.5 },
  { titel: "Spirited Away", genre: "Animatie", jaar: 2001, score: 8.6 },
  { titel: "Mad Max: Fury Road", genre: "Actie", jaar: 2015, score: 8.1 },
  { titel: "The Matrix", genre: "Sci-Fi", jaar: 1999, score: 8.7 },
  { titel: "Whiplash", genre: "Drama", jaar: 2014, score: 8.5 },
];

// Het element waar de kaartjes in komen (al opgezocht).
const container = document.getElementById("films-container");

// ===== Oefening 1 & 3: één kaartje bouwen (met score-badge) =====
function createFilmKaart(film) {
  // buitenste kolom (Bootstrap-grid)
  const kolom = document.createElement("div");
  kolom.className = "col-md-4";

  // de kaart zelf
  const card = document.createElement("div");
  card.className = "card h-100";

  // de inhoud van de kaart
  const body = document.createElement("div");
  body.className = "card-body";

  const titel = document.createElement("h5");
  titel.className = "card-title";
  titel.textContent = film.titel;

  const genre = document.createElement("h6");
  genre.className = "card-subtitle mb-2 text-muted";
  genre.textContent = film.genre;

  const tekst = document.createElement("p");
  tekst.className = "card-text";
  tekst.textContent = `${film.jaar}`;

  // Oefening 3: de score als Bootstrap-badge
  const badge = document.createElement("span");
  badge.className = "badge bg-success";
  badge.textContent = `⭐ ${film.score}`;

  // alles in elkaar hangen (van binnen naar buiten)
  body.appendChild(titel);
  body.appendChild(genre);
  body.appendChild(tekst);
  body.appendChild(badge);
  card.appendChild(body);
  kolom.appendChild(card);

  return kolom; // geef het buitenste element terug
}

// ===== Oefening 2: alle films renderen =====
function renderFilms() {
  container.innerHTML = ""; // eerst leegmaken (anders stapelen ze op)
  for (const film of films) {
    const kaart = createFilmKaart(film);
    container.appendChild(kaart);
  }
}

renderFilms(); // tonen

// ===== Oefening 5: lege container testen =====
// Als je hierboven 'const films = []' zou zetten, blijft de pagina leeg.
// Het crasht NIET, omdat de for...of-loop bij een lege array gewoon 0 keer
// draait: er is niets om over te loopen, dus er gebeurt niets. De render
// volgt simpelweg de data — geen data, geen kaartjes.
