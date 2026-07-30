// ===== Module 9 — Oplossingen (hoofdbestand) =====

// ===== Oefening 1: named export/import =====
import { tel, PI } from "./wiskunde"; // pad zonder extensie, ./ = zelfde map
console.log(tel(2, 3)); // 5
console.log(PI); // 3.14159

// ===== Oefening 2: hernoemen met 'as' =====
import { tel as optellen } from "./wiskunde";
console.log(optellen(4, 5)); // 9

// ===== Oefening 3: export default importeren (geen accolades) =====
import begroet from "./begroeting"; // naam kies je zelf
console.log(begroet("Sara")); // "Hallo, Sara!"

// ===== Oefening 4: een type importeren =====
import { type Punt } from "./wiskunde"; // 'type' maakt expliciet dat het een type is
const p: Punt = { x: 1, y: 2 };
console.log(`Punt: (${p.x}, ${p.y}) -> som ${tel(p.x, p.y)}`); // "Punt: (1, 2) -> som 3"

// ===== Oefening 5: onder de motorkap =====
// In dist/module09.js staat bovenaan:
//   Object.defineProperty(exports, "__esModule", { value: true });
//   const wiskunde_1 = require("./wiskunde");
// Uitleg: door "module": "commonjs" zet tsc onze import/export om naar require/exports (CommonJS).
// De __esModule-regel zet een verborgen vlaggetje op 'exports' dat aangeeft: "dit CommonJS-bestand
// kwam eigenlijk uit een ES-module". Andere modules gebruiken dat vlaggetje om een default-import
// correct te koppelen. Puur technische interop tussen het oude en nieuwe modulesysteem.

// ===== Oefening 6: sourceMap proberen =====
// Met "sourceMap": true in tsconfig.json verschijnen er na compileren extra .js.map-bestanden in
// dist/ (bv. module09.js.map). Die koppelen de gecompileerde .js terug aan de originele .ts, zodat
// je bij het debuggen je eigen TypeScript ziet i.p.v. de output. Daarna weer uitgezet.

// ===== Oefening 7: noEmitOnError bewijzen (uitdaging) =====
// Zet je hieronder een bewuste typefout:
//   tel("twee", 3); // ❌ Argument of type 'string' is not assignable to parameter of type 'number'
// dan maakt tsc GEEN nieuwe dist/module09.js, dankzij "noEmitOnError": true. De vorige (werkende)
// .js blijft staan, maar je fout wordt niet weggeschreven. Zo draai je nooit per ongeluk kapotte code.
