// =====================================================================
//  TypeScript Cursus — de site
//  Laadt de modulelijst (modules.json) en rendert per module de markdown
//  (marked) met code-kleuring (highlight.js). Navigatie via de URL-hash.
//  Voortgang ('gelezen'), dark-mode en zoeken via localStorage.
// =====================================================================

// --- Elementen uit de pagina ---
const moduleLijst = document.getElementById("module-list"); // zijbalk
const content = document.getElementById("content"); // inhoudsvak
const zoekveld = document.getElementById("search"); // zoekbalk
const themaKnop = document.getElementById("theme-toggle"); // dark-mode knop
const contentToolbar = document.getElementById("content-toolbar");
const gelezenKnop = document.getElementById("mark-read"); // 'gelezen' knop

// Hier bewaren we de lijst modules (de bron van waarheid).
let modules = [];

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

// Meet de navbar-hoogte zodat de vaste zijbalk er net ONDER begint.
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

// --- Een module renderen ---
const moduleCache = {}; // slug -> klare HTML
async function toonModule(slug) {
  const module = modules.find((m) => m.slug === slug);
  if (!module) return;

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

// --- Navigatie met de URL-hash ---
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

// --- Syntax highlighting ---
function kleurCode() {
  const blokken = content.querySelectorAll("pre code");
  for (const blok of blokken) {
    hljs.highlightElement(blok);
  }
}

// --- Voortgang met localStorage ---
function haalGelezen() {
  return JSON.parse(localStorage.getItem("gelezen-ts")) || [];
}

function markeerGelezen(slug) {
  const gelezen = haalGelezen();
  if (!gelezen.includes(slug)) {
    gelezen.push(slug);
    localStorage.setItem("gelezen-ts", JSON.stringify(gelezen));
  }
}

function verwijderGelezen(slug) {
  let gelezen = haalGelezen();
  gelezen = gelezen.filter((s) => s !== slug);
  localStorage.setItem("gelezen-ts", JSON.stringify(gelezen));
}

function wisselGelezen(slug) {
  if (haalGelezen().includes(slug)) {
    verwijderGelezen(slug);
  } else {
    markeerGelezen(slug);
  }
}

// --- Donkere modus ---
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

// --- Zoeken (filtert de modulelijst in de zijbalk) ---
function filterZijbalk() {
  const term = zoekveld.value.toLowerCase();
  const links = moduleLijst.querySelectorAll("a");
  for (const link of links) {
    const past = link.textContent.toLowerCase().includes(term);
    link.hidden = !past;
  }
}

// =====================================================================
//  Code-viewer voor de Oplossingen-pagina.
//  Knoppen met data-bron (bestandspad) + data-taal tonen de broncode
//  ingekleurd; nog een klik verbergt het blok weer (toggle).
// =====================================================================
function maakCodeBlok(code, taal) {
  const pre = document.createElement("pre");
  const codeEl = document.createElement("code");
  codeEl.className = "language-" + taal;
  codeEl.textContent = code; // toon de code als TEKST, voer hem niet uit
  pre.appendChild(codeEl);
  hljs.highlightElement(codeEl);
  return pre;
}

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
