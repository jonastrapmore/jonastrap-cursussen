// ===== Module 5 — Oplossingen =====

// ===== Oefening 1: union-type =====
let id: string | number;
id = 123; // ✅ een getal mag
console.log(id);
id = "abc-123"; // ✅ een string mag ook
console.log(id);
// id = true; // ❌ Type 'boolean' is not assignable to type 'string | number'

// ===== Oefening 2: narrowing met typeof =====
function toonId(id: string | number): void {
  if (typeof id === "string") {
    // in dit blok weet TS: id is een string
    console.log(id.toUpperCase());
  } else {
    // dus hier is id een number
    console.log(id.toFixed(2));
  }
}
toonId("abc-123"); // "ABC-123"
toonId(42); // "42.00"

// ===== Oefening 3: literal-union =====
type Richting = "noord" | "oost" | "zuid" | "west";
let koers: Richting = "noord"; // ✅
koers = "west"; // ✅ ook goed
console.log(koers);
// koers = "omhoog"; // ❌ Type '"omhoog"' is not assignable to type 'Richting'

// ===== Oefening 4: literal-union als parameter =====
function beweeg(richting: Richting): void {
  console.log(`Ik ga naar het ${richting}en.`);
}
beweeg("noord"); // ✅ "Ik ga naar het noorden."
// beweeg("omhoog"); // ❌ alleen de vier richtingen mogen

// ===== Oefening 5: narrowing met truthiness =====
function begroet(naam: string | undefined): void {
  if (naam) {
    console.log(`Hallo, ${naam}!`); // hier is naam zeker een string
  } else {
    console.log("Hallo, onbekende!"); // naam was undefined (of leeg)
  }
}
begroet("Sara"); // "Hallo, Sara!"
begroet(undefined); // "Hallo, onbekende!"

// ===== Oefening 6: intersection =====
type Persoon = {
  naam: string;
  leeftijd: number;
};
type Werknemer = Persoon & {
  bedrijf: string;
};
let jonas: Werknemer = {
  naam: "Jonas",
  leeftijd: 39,
  bedrijf: "Thomas More", // moet ALLE properties van beide types hebben
};
console.log(`${jonas.naam} werkt bij ${jonas.bedrijf}`); // "Jonas werkt bij Thomas More"

// ===== Oefening 7: discriminated union (uitdaging) =====
type Cirkel = { soort: "cirkel"; straal: number };
type Rechthoek = { soort: "rechthoek"; breedte: number; hoogte: number };
type Vorm = Cirkel | Rechthoek;

function oppervlakte(vorm: Vorm): number {
  if (vorm.soort === "cirkel") {
    // TS weet: vorm is een Cirkel -> 'straal' bestaat
    return Math.PI * vorm.straal ** 2;
  } else {
    // dus hier een Rechthoek -> 'breedte' en 'hoogte' bestaan
    return vorm.breedte * vorm.hoogte;
  }
}
console.log(oppervlakte({ soort: "cirkel", straal: 2 })); // ~12.566...
console.log(oppervlakte({ soort: "rechthoek", breedte: 3, hoogte: 4 })); // 12
