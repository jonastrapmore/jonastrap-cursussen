// ===== Module 12 - Filmcollectie beheren (uitgewerkt) =====
// Kernregel die overal terugkomt: verander de array (bron van waarheid),
// roep daarna renderFilms() aan. De UI volgt de data.

let films = [
  { titel: "Inception", genre: "Sci-Fi", jaar: 2010, score: 8.8 },
  { titel: "The Godfather", genre: "Drama", jaar: 1972, score: 9.2 },
  { titel: "Parasite", genre: "Thriller", jaar: 2019, score: 8.5 },
  { titel: "Spirited Away", genre: "Animatie", jaar: 2001, score: 8.6 },
  { titel: "Mad Max: Fury Road", genre: "Actie", jaar: 2015, score: 8.1 },
];

const container = document.getElementById("films-container");
const zoekveld = document.getElementById("search");
const sorteerKeuze = document.getElementById("sort");
const toevoegKnop = document.getElementById("add-button");

// Maakt één Bootstrap-kaartje met een verwijderknop.
function createFilmKaart(film) {
  const kolom = document.createElement("div");
  kolom.className = "col-md-4";

  const card = document.createElement("div");
  card.className = "card h-100";

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
  tekst.textContent = `${film.jaar} · ⭐ ${film.score}`;

  const verwijderKnop = document.createElement("button");
  verwijderKnop.className = "btn btn-sm btn-outline-danger";
  verwijderKnop.textContent = "Verwijderen";
  // Oefening 2: deze knop verwijdert de film van DIT kaartje.
  // 'film' verwijst dankzij de closure naar de juiste film.
  verwijderKnop.addEventListener("click", () => {
    verwijderFilm(film);
  });

  body.appendChild(titel);
  body.appendChild(genre);
  body.appendChild(tekst);
  body.appendChild(verwijderKnop);
  card.appendChild(body);
  kolom.appendChild(card);

  return kolom;
}

// Toont de films op het scherm. Filtert eerst op de zoekterm (oefening 3).
function renderFilms() {
  const zoekterm = zoekveld.value.toLowerCase();

  const zichtbareFilms = films.filter((film) => {
    return (
      film.titel.toLowerCase().includes(zoekterm) ||
      film.genre.toLowerCase().includes(zoekterm)
    );
  });

  container.innerHTML = "";
  for (const film of zichtbareFilms) {
    container.appendChild(createFilmKaart(film));
  }
}

// ===== Oefening 1: toevoegen =====
toevoegKnop.addEventListener("click", () => {
  const nieuweFilm = {
    titel: "Dune",
    genre: "Sci-Fi",
    jaar: 2021,
    score: 8.0,
  };
  films.push(nieuweFilm); // 1. data aanpassen
  renderFilms(); // 2. opnieuw tonen
});

// ===== Oefening 2: verwijderen =====
function verwijderFilm(teVerwijderen) {
  films = films.filter((film) => film !== teVerwijderen); // hou alles behalve deze
  renderFilms();
}

// ===== Oefening 3: filteren (op titel of genre, hoofdletterongevoelig) =====
// We laten de render filteren; hier koppelen we alleen wanneer dat gebeurt.
// Filteren terwijl je typt:
zoekveld.addEventListener("input", renderFilms);
// (Alternatief voor het examen: filteren op Enter — zie de module.)

// ===== Oefening 4: sorteren =====
sorteerKeuze.addEventListener("change", () => {
  const keuze = sorteerKeuze.value;
  if (keuze === "titel") {
    films.sort((a, b) => a.titel.localeCompare(b.titel)); // A-Z
  } else if (keuze === "jaar") {
    films.sort((a, b) => b.jaar - a.jaar); // nieuw eerst
  } else if (keuze === "score") {
    films.sort((a, b) => b.score - a.score); // hoog eerst
  }
  renderFilms();
});

renderFilms(); // eerste keer tonen
