# 🔑 Oplossingen & downloads

Hier vind je alles wat bij de cursus hoort: de **oplossingen** van de oefeningen (Module 0–9), de
**projecten** om zelf te clonen en te draaien, en de downloadbare **handleiding**.

> **Probeer het eerst zelf.** Je leert het meest door de oefening eerst te maken en pas daarna de
> oplossing te bekijken.

## Oefeningen (Module 0–9)

Klik op **Code bekijken** om de uitgewerkte `.ts`-oplossing te tonen (nog een klik verbergt ze weer).

<div class="list-group mb-4">
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><strong>Module 0</strong> — Setup &amp; eerste compile</span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/tsc/module0.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><strong>Module 1</strong> — Type-annotaties, inference &amp; basistypes</span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/tsc/module01.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><strong>Module 2</strong> — Arrays, tuples &amp; enums</span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/tsc/module02.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><strong>Module 3</strong> — Functies met types</span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/tsc/module03.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><strong>Module 4</strong> — Objecten, type aliases &amp; interfaces</span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/tsc/module04.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><strong>Module 5</strong> — Union/intersection, literals &amp; narrowing</span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/tsc/module05.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><strong>Module 6</strong> — Classes</span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/tsc/module06.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><strong>Module 7</strong> — Type modifiers</span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/tsc/module07.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><strong>Module 8</strong> — Generics &amp; utility types</span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/tsc/module08.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><strong>Module 9</strong> — Modules &amp; tsconfig <span class="text-secondary">(hoofdbestand)</span></span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/tsc/module09.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><strong>Module 9</strong> — hulpbestand <code>wiskunde.ts</code> (named exports)</span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/tsc/wiskunde.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><strong>Module 9</strong> — hulpbestand <code>begroeting.ts</code> (default export)</span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/tsc/begroeting.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
</div>

## De projecten (Module 10–15)

Vanaf Module 10 werken we met **Vite + pnpm**-projecten. Die kun je **niet** rechtstreeks op deze
pagina draaien (ze hebben compilatie, Vite én een API-server nodig). Je haalt ze dus van **GitHub** en
draait ze **lokaal** (`pnpm install` in `server/` en `frontend/`, dan `pnpm dev`).

### PC Builder — de volledig uitgewerkte cursus-app (Module 11–13)

De app die we in de cursus stap voor stap bouwen. Bekijk de zelf-geschreven kernbestanden hieronder,
of clone het volledige project.

<div class="list-group mb-3">
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><code>main.ts</code> — registreren + router</span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/pc-builder/main.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><code>data/data.ts</code> — de providers</span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/pc-builder/data.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><code>components/navbar/navbar.ts</code></span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/pc-builder/navbar.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><code>components/partCard/part.ts</code> — het onderdeel-component</span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/pc-builder/part.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><code>pages/parts/parts.ts</code> — de onderdelen-pagina</span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/pc-builder/parts.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><code>components/buildItem/buildItem.ts</code> — de configuratie-regel</span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/pc-builder/buildItem.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><code>pages/build/build.ts</code> — de configuratie-pagina</span>
    <button class="btn btn-sm btn-outline-secondary" data-bron="oplossingen/pc-builder/build.ts" data-taal="typescript">&lt;/&gt; Code bekijken</button>
  </div>
</div>

<p>
  <a class="btn btn-primary" href="https://github.com/jonastrapmore/jonastrap-cursussen/tree/main/typescript-cursus/Nederlandse%20TypeScript%20Cursus/oefeningen-vite/pc-builder-app" target="_blank" rel="noopener">
    <i class="bi bi-github"></i> Volledig project op GitHub
  </a>
</p>

### Oefenexamens (startcode — zelf oplossen)

Twee examens in een ander thema, met **enkel de startcode** (los ze zelf op). De uitgewerkte
begeleiding staat in de cursus: **Oefenexamen: Webshop** en **Oefenexamen: Quiz builder** in de
zijbalk.

<div class="list-group mb-3">
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><strong>Webshop</strong> — startcode (filteren + korting via de database)</span>
    <a class="btn btn-sm btn-outline-primary" href="https://github.com/jonastrapmore/jonastrap-cursussen/tree/main/typescript-cursus/Nederlandse%20TypeScript%20Cursus/oefeningen-vite/webshop-oefenexamen" target="_blank" rel="noopener"><i class="bi bi-github"></i> Op GitHub</a>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><strong>Quiz builder</strong> — startcode (rest-delete, radio-filter, <code>Set</code>)</span>
    <a class="btn btn-sm btn-outline-primary" href="https://github.com/jonastrapmore/jonastrap-cursussen/tree/main/typescript-cursus/Nederlandse%20TypeScript%20Cursus/oefeningen-vite/quiz-oefenexamen" target="_blank" rel="noopener"><i class="bi bi-github"></i> Op GitHub</a>
  </div>
  <div class="list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2">
    <span><strong>Module 10 — demo</strong> (Vite + <code>?raw</code> + Bootstrap)</span>
    <a class="btn btn-sm btn-outline-primary" href="https://github.com/jonastrapmore/jonastrap-cursussen/tree/main/typescript-cursus/Nederlandse%20TypeScript%20Cursus/oefeningen-vite/module10-demo" target="_blank" rel="noopener"><i class="bi bi-github"></i> Op GitHub</a>
  </div>
</div>

> **Hele repo clonen?** Alles staat samen op
> [github.com/jonastrapmore/jonastrap-cursussen](https://github.com/jonastrapmore/jonastrap-cursussen/tree/main/typescript-cursus).

## 📄 Handleiding examen (download)

Het complete stappenplan waarmee je elk examen van dit type aanpakt, met kant-en-klare code per vraag
en alle valkuilen. Download het als PDF of Markdown:

<p class="d-flex gap-2 flex-wrap">
  <a class="btn btn-primary" href="downloads/Handleiding-examen.pdf" download>
    <i class="bi bi-file-earmark-pdf-fill"></i> Download PDF
  </a>
  <a class="btn btn-secondary" href="downloads/Handleiding-examen.md" download>
    <i class="bi bi-file-earmark-text-fill"></i> Download Markdown
  </a>
</p>
