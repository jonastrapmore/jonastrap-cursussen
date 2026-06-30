// =====================================================================
//  JavaScript Cursus — de app
//  Je bouwt dit stap voor stap op. Elke stap hieronder is een TODO.
//  De elementen uit index.html zijn alvast opgezocht.
// =====================================================================

// --- Elementen uit de pagina (Module 5: opzoeken met de DOM) ---
const moduleLijst = document.getElementById("module-list"); // zijbalk
const content = document.getElementById("content"); // inhoudsvak
const zoekveld = document.getElementById("search"); // zoekbalk
const themaKnop = document.getElementById("theme-toggle"); // dark-mode knop
const contentToolbar = document.getElementById("content-toolbar");
const gelezenKnop = document.getElementById("mark-read"); // 'gelezen' knop

// Hier bewaren we straks de lijst modules (de bron van waarheid).
let modules = [];

// ---------------------------------------------------------------------
// STAP 3 (jij): zijbalk vullen
//   - fetch "content/modules.json"
//   - bewaar het in de variabele 'modules'
//   - bouw per module een link in #module-list (createElement)
laadModules().then(() => {
  renderModules();
  toonHuidige();
});

window.addEventListener("hashchange", toonHuidige);

contentToolbar.hidden = false;

gelezenKnop.addEventListener("click", () => {
  wisselGelezen(huidigeSlug());
  renderModules();
  markeerActief(huidigeSlug());
  updateGelezenKnop(); // knoptekst meteen bijwerken
});

themaKnop.addEventListener("click", wisselThema);
updateThemaKnop();

zoekveld.addEventListener("input", filterZijbalk);

// Meet de navbar-hoogte zodat de vaste zijbalk er net ONDER begint
// (anders verdwijnt de zoekbalk bij het scrollen achter de navbar).
const navbar = document.querySelector(".navbar");
document.documentElement.style.setProperty(
  "--navbar-hoogte",
  navbar.offsetHeight + "px",
);

async function laadModules() {
  const response = await fetch("content/modules.json");
  modules = await response.json();
}

function renderModules() {
  moduleLijst.innerHTML = "";
  for (const module of modules) {
    const link = createLinkModule(module);
    moduleLijst.appendChild(link);
  }
}

function createLinkModule(module) {
  const link = document.createElement("a");
  link.className = "nav-link";
  link.href = `#${module.slug}`;
  const gelezen = haalGelezen().includes(module.slug);
  link.textContent = (gelezen ? "✓ " : "") + module.titel;
  link.dataset.slug = module.slug;
  return link;
}
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// STAP 4 (jij): een module renderen
//   - fetch het .md-bestand van een module
//   - zet het om met marked.parse(...)
//   - plaats het in #content
const moduleCache = {}; // slug -> klare HTML
async function toonModule(slug) {
  const module = modules.find((m) => m.slug === slug);

  // Nog niet eerder opgehaald? Dan nu fetchen en bewaren.
  if (!moduleCache[slug]) {
    const response = await fetch("content/" + module.bestand);
    const tekst = await response.text();
    moduleCache[slug] = marked.parse(tekst);
  }

  content.innerHTML = moduleCache[slug]; // uit het geheugen = direct
  kleurCode();

  const codeKnoppen = content.querySelectorAll("[data-bron]");
  for (const knop of codeKnoppen) {
    knop.addEventListener("click", () => toonBroncode(knop));
  }

  window.scrollTo(0, 0);
}
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// STAP 5 (jij): navigatie met de URL-hash
//   - klik op een link -> zet location.hash
//   - luister naar 'hashchange' -> render de juiste module
//   - markeer de actieve link in de zijbalk
function huidigeSlug() {
  return location.hash.replace("#", "") || "intro";
}

function markeerActief(slug) {
  const links = moduleLijst.querySelectorAll("a");
  for (const link of links) {
    link.classList.toggle("active", link.dataset.slug === slug);
  }
}

// Sluit het uitschuifmenu (alleen op mobiel, als het echt openstaat).
function sluitMenu() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar.classList.contains("show")) {
    const offcanvas = bootstrap.Offcanvas.getInstance(sidebar);
    if (offcanvas) {
      offcanvas.hide();
    }
  }
}

// Zet de juiste tekst op de 'gelezen'-knop voor de huidige module.
function updateGelezenKnop() {
  const gelezen = haalGelezen().includes(huidigeSlug());
  gelezenKnop.textContent = gelezen
    ? "✓ Gelezen (klik om te wissen)"
    : "Markeer als gelezen";
}

function toonHuidige() {
  updateGelezenKnop();
  const slug = huidigeSlug();
  toonModule(slug);
  markeerActief(slug);
  sluitMenu(); // op mobiel: menu dichtklappen na het kiezen
}
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// STAP 6 (jij): syntax highlighting
//   - na het renderen: hljs.highlightElement(...) over elke <pre><code>
function kleurCode() {
  const blokken = content.querySelectorAll("pre code");
  for (const blok of blokken) {
    hljs.highlightElement(blok);
  }
}
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// STAP 7 (jij): voortgang met localStorage
//   - 'gelezen' knop -> bewaar de module-id in localStorage
//   - toon een vinkje in de zijbalk bij gelezen modules
function haalGelezen() {
  return JSON.parse(localStorage.getItem("gelezen")) || [];
}

function markeerGelezen(slug) {
  const gelezen = haalGelezen();
  if (!gelezen.includes(slug)) {
    gelezen.push(slug);
    localStorage.setItem("gelezen", JSON.stringify(gelezen));
  }
}

function verwijderGelezen(slug) {
  let gelezen = haalGelezen();
  gelezen = gelezen.filter((s) => s !== slug);
  localStorage.setItem("gelezen", JSON.stringify(gelezen));
}

function wisselGelezen(slug) {
  if (haalGelezen().includes(slug)) {
    verwijderGelezen(slug);
  } else {
    markeerGelezen(slug);
  }
}
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// STAP 8 (jij): donkere modus
//   - knop -> wissel data-bs-theme tussen "light" en "dark" op <html>
//   - onthoud de keuze in localStorage
function getThema() {
  return localStorage.getItem("theme") || "light";
}

function pasThemaToe(thema) {
  document.documentElement.setAttribute("data-bs-theme", thema);
}

function updateThemaKnop() {
  const icoon = document.getElementById("theme-icon");
  icoon.className = getThema() === "dark" ? "bi bi-sun" : "bi bi-moon-stars";
}

function wisselThema() {
  const nieuw = getThema() === "dark" ? "light" : "dark";
  localStorage.setItem("theme", nieuw);
  pasThemaToe(nieuw);
  updateThemaKnop();
}
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// STAP 9 (jij): zoeken
//   - zoekveld 'input' -> filter de modulelijst in de zijbalk op titel
function filterZijbalk() {
  const term = zoekveld.value.toLowerCase();
  const links = moduleLijst.querySelectorAll("a");
  for (const link of links) {
    const past = link.textContent.toLowerCase().includes(term);
    link.hidden = !past;
  }
}
// ---------------------------------------------------------------------

// ---------------------------------------------------------------------
// EXTRA: code-viewer voor de Oplossingen-pagina
//   De knoppen op die pagina hebben data-bron (het bestand) en data-taal.
//   Bij een klik halen we de broncode op en tonen die ingekleurd; nog een
//   klik laat het blok weer verdwijnen (toggle). Hergebruikt fetch (Module 8)
//   en highlight.js (stap 6). De koppeling van de knoppen gebeurt in toonModule.

// helper (sync): bouw een ingekleurd codeblok van een stuk code-tekst.
function maakCodeBlok(code, taal) {
  const pre = document.createElement("pre");
  const codeEl = document.createElement("code");
  codeEl.className = "language-" + taal;
  codeEl.textContent = code; // textContent: toon de code als TEKST, voer hem niet uit
  pre.appendChild(codeEl);
  hljs.highlightElement(codeEl); // inkleuren
  return pre;
}

// async: toon of verberg de broncode onder een rij (toggle).
const broncodeCache = {}; // bestand -> broncode-tekst

async function toonBroncode(knop) {
  const rij = knop.closest(".list-group-item");

  const volgende = rij.nextElementSibling;
  if (volgende && volgende.tagName === "PRE") {
    volgende.remove();
    return;
  }

  const bestand = knop.dataset.bron;
  if (!broncodeCache[bestand]) {
    const response = await fetch(bestand);
    broncodeCache[bestand] = await response.text();
  }

  const blok = maakCodeBlok(broncodeCache[bestand], knop.dataset.taal);
  rij.insertAdjacentElement("afterend", blok);
}
// ---------------------------------------------------------------------
