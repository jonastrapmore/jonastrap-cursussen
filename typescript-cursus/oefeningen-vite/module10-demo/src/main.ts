// ===== Module 10 — demo-project (oplossing bij de oefeningen) =====
// Dit is een minimaal Vite + TypeScript-project dat de oefeningen 3, 4 en 5 toont.
// Draaien: `pnpm install` en dan `pnpm dev` -> open http://localhost:5173

// ----- Oefening 5: een library (Bootstrap) toevoegen en de CSS importeren -----
// (toegevoegd met `pnpm add bootstrap`; staat nu in package.json onder dependencies)
import 'bootstrap/dist/css/bootstrap.css'

// ----- Oefening 4: HTML importeren als string met ?raw en in de pagina zetten -----
import HALLO from './hallo.html?raw'

const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = HALLO

// ----- Oefening 3: bewijs dat `vite dev` NIET typecheckt -----
// Haal het commentaar van de regel hieronder weg en sla op. Dan zie je:
//   (a) `pnpm dev` blijft gewoon draaien  -> esbuild strípt types, checkt ze niet
//   (b) je editor zet er wél een rode kringel onder (dat is tsc in VS Code)
//   (c) `pnpm build` FAALT met: Type 'string' is not assignable to type 'number'
// Dit is precies het verschil uit Module 10 §2: "het draait" ≠ "het is typeveilig".
//
// const getal: number = 'tekst'
